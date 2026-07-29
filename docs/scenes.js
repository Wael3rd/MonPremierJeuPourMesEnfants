/* =====================================================================
   Modèles 3D low-poly construits à la volée avec Three.js.
   Chaque builder renvoie { group, update(t) }.
   ===================================================================== */
import * as THREE from 'three';

/* ------------------------- petits helpers -------------------------- */
const mat = (color, o = {}) => new THREE.MeshStandardMaterial({
  color, roughness: o.rough ?? 0.55, metalness: o.metal ?? 0.15,
  emissive: o.emissive ?? 0x000000, emissiveIntensity: o.ei ?? 1,
  transparent: o.opacity !== undefined, opacity: o.opacity ?? 1,
  flatShading: o.flat ?? false, side: o.side ?? THREE.FrontSide
});

const box = (w, h, d, m, x = 0, y = 0, z = 0) => {
  const s = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  s.position.set(x, y, z); s.castShadow = s.receiveShadow = true; return s;
};
const cyl = (rt, rb, h, m, seg = 20) => {
  const s = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m);
  s.castShadow = s.receiveShadow = true; return s;
};
const sph = (r, m, seg = 20) => {
  const s = new THREE.Mesh(new THREE.SphereGeometry(r, seg, seg), m);
  s.castShadow = s.receiveShadow = true; return s;
};
const tor = (r, t, m, seg = 32, rad = 14) => {
  const s = new THREE.Mesh(new THREE.TorusGeometry(r, t, rad, seg), m);
  s.castShadow = s.receiveShadow = true; return s;
};
const cone = (r, h, m, seg = 18) => {
  const s = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), m);
  s.castShadow = s.receiveShadow = true; return s;
};
const at = (mesh, x, y, z) => { mesh.position.set(x, y, z); return mesh; };
const rot = (mesh, x, y, z) => { mesh.rotation.set(x, y, z); return mesh; };
const G = () => new THREE.Group();

/* palette matières */
const M = {
  wood:    () => mat(0x8a5a35, { rough: 0.85, flat: true }),
  darkWood:() => mat(0x5c3a22, { rough: 0.9,  flat: true }),
  stone:   () => mat(0x9c9689, { rough: 0.95, flat: true }),
  clay:    () => mat(0xc9a06a, { rough: 0.9, flat: true }),
  brass:   () => mat(0xd7a13b, { rough: 0.3, metal: 0.85 }),
  steel:   () => mat(0xb8c0c9, { rough: 0.35, metal: 0.9 }),
  dark:    () => mat(0x2b2f3a, { rough: 0.6, metal: 0.3 }),
  paper:   () => mat(0xf2e9d8, { rough: 0.95 }),
  glass:   () => mat(0xbfe4ff, { rough: 0.05, metal: 0.1, opacity: 0.25 }),
  red:     () => mat(0xd8434f, { rough: 0.5 }),
  white:   () => mat(0xf3f3ef, { rough: 0.6 }),
  green:   () => mat(0x5fa76b, { rough: 0.7 }),
  teal:    () => mat(0x2ec9b0, { rough: 0.4, metal: 0.4 })
};
const glow = (color, i = 1.6) => mat(color, { emissive: color, ei: i, rough: 0.4 });

/* ==================================================================== */
const builders = {

  /* --------------------------- LE FEU ------------------------------ */
  feu() {
    const g = G(), flames = [];
    const ring = G();
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      ring.add(at(rot(cyl(0.09, 0.11, 0.5, M.stone(), 7), Math.PI / 2, 0, a), Math.cos(a) * 1.05, -0.62, Math.sin(a) * 1.05));
    }
    g.add(ring);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const log = cyl(0.11, 0.14, 1.5, M.darkWood(), 8);
      log.position.set(Math.cos(a) * 0.32, -0.15, Math.sin(a) * 0.32);
      log.rotation.set(Math.cos(a) * 0.45, 0, -Math.sin(a) * 0.45);
      g.add(log);
    }
    /* langues de flamme : petites, décalées, plutôt orangées — un cône
       unique et trop lumineux se lit comme un bloc blanc */
    const colors = [0xff5b12, 0xff7a1c, 0xff9a2b, 0xffc257];
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2, rr = Math.random() * 0.45;
      const s = 0.16 + Math.random() * 0.2;
      const tier = Math.min(3, Math.floor(Math.random() * 4));
      const f = cone(s * 0.85, s * 2.6, glow(colors[tier], 0.9 + tier * 0.35), 7);
      f.position.set(Math.cos(a) * rr, 0.3 + Math.random() * 0.95 - tier * 0.12, Math.sin(a) * rr);
      f.rotation.z = (Math.random() - 0.5) * 0.3;
      f.userData = { sp: 0.8 + Math.random() * 2.2, base: f.position.y, ph: Math.random() * 9 };
      flames.push(f); g.add(f);
    }
    /* braises */
    for (let i = 0; i < 7; i++) {
      const a = Math.random() * Math.PI * 2;
      const e = sph(0.06 + Math.random() * 0.05, glow(0xff4d0f, 1.4), 7);
      e.position.set(Math.cos(a) * Math.random() * 0.5, -0.42, Math.sin(a) * Math.random() * 0.5);
      g.add(e);
    }
    const l = new THREE.PointLight(0xff8c2a, 3.2, 12); l.position.set(0, 0.7, 0); g.add(l);
    return { group: g, update: (t) => {
      flames.forEach(f => {
        const { sp, base, ph } = f.userData;
        const k = 0.75 + Math.abs(Math.sin(t * sp * 0.9 + ph)) * 0.55;
        f.scale.set(k, k * 1.25, k);
        f.position.y = base + Math.sin(t * sp + ph) * 0.18;
      });
      l.intensity = 2.6 + Math.sin(t * 7) * 0.5 + Math.sin(t * 3.1) * 0.3;
    }};
  },

  /* --------------------------- LA ROUE ----------------------------- */
  roue() {
    const g = G(), axle = G();
    const wheel = (side) => {
      const w = G();
      w.add(tor(1.15, 0.13, M.darkWood(), 28, 10));
      w.add(rot(cyl(0.24, 0.24, 0.26, M.wood(), 12), Math.PI / 2, 0, 0));
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const sp = box(0.09, 1.9, 0.09, M.wood());
        sp.rotation.z = a; w.add(sp);
      }
      w.rotation.y = Math.PI / 2; w.position.x = side * 0.95; return w;
    };
    const w1 = wheel(1), w2 = wheel(-1);
    axle.add(w1, w2);
    axle.add(rot(cyl(0.09, 0.09, 2.1, M.darkWood(), 10), 0, 0, Math.PI / 2));
    g.add(axle);
    const bed = G();
    bed.add(box(1.7, 0.12, 1.15, M.wood(), 0, 0.42, 0));
    bed.add(box(1.7, 0.4, 0.09, M.wood(), 0, 0.62, 0.55));
    bed.add(box(1.7, 0.4, 0.09, M.wood(), 0, 0.62, -0.55));
    bed.add(box(0.1, 0.4, 1.15, M.wood(), -0.82, 0.62, 0));
    bed.add(at(rot(cyl(0.06, 0.06, 1.6, M.darkWood(), 8), 0, 0, Math.PI / 2.3), 1.35, 0.75, 0));
    g.add(bed);
    return { group: g, update: (t) => { w1.rotation.x = -t * 1.1; w2.rotation.x = -t * 1.1; } };
  },

  /* ------------------------- L'ÉCRITURE ---------------------------- */
  ecriture() {
    const g = G();
    const tablet = box(2.5, 0.28, 1.8, M.clay(), 0, 0, 0);
    g.add(tablet);
    const ink = mat(0x6b4a2c, { rough: 1 });
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 7; c++) {
        const s = G();
        const x = -1.0 + c * 0.32, z = -0.62 + r * 0.31;
        s.add(at(rot(box(0.13, 0.05, 0.03, ink), 0, Math.random() > 0.5 ? 0.5 : -0.4, 0), x, 0.15, z));
        s.add(at(rot(box(0.1, 0.05, 0.03, ink), 0, Math.random() > 0.5 ? 1.2 : 2.2, 0), x + 0.05, 0.15, z + 0.08));
        if (Math.random() > 0.5) s.add(at(box(0.07, 0.05, 0.03, ink), x - 0.04, 0.15, z - 0.07));
        g.add(s);
      }
    }
    const stylus = G();
    stylus.add(rot(cyl(0.035, 0.06, 1.5, M.wood(), 10), 0, 0, 0));
    stylus.add(at(cone(0.06, 0.22, M.darkWood(), 10), 0, -0.82, 0));
    stylus.position.set(1.45, 0.75, 0.5); stylus.rotation.z = 0.55; stylus.rotation.x = -0.35;
    g.add(stylus);
    return { group: g, update: (t) => {
      stylus.position.y = 0.75 + Math.sin(t * 2.4) * 0.12;
      stylus.position.x = 1.45 + Math.sin(t * 0.8) * 0.25;
    }};
  },

  /* --------------------------- LE PAPIER --------------------------- */
  papier() {
    const g = G(), sheets = [];
    for (let i = 0; i < 9; i++) {
      const s = box(2.1, 0.035, 1.5, M.paper(), 0, -0.5 + i * 0.06, 0);
      s.rotation.y = (Math.random() - 0.5) * 0.14;
      s.userData = { y: s.position.y, ph: i * 0.5 };
      sheets.push(s); g.add(s);
    }
    const frame = G();
    frame.add(box(2.5, 0.09, 0.09, M.wood(), 0, 0, 0.95));
    frame.add(box(2.5, 0.09, 0.09, M.wood(), 0, 0, -0.95));
    frame.add(box(0.09, 0.09, 1.99, M.wood(), 1.2, 0, 0));
    frame.add(box(0.09, 0.09, 1.99, M.wood(), -1.2, 0, 0));
    const mesh = box(2.4, 0.02, 1.9, mat(0xd8c9a8, { rough: 1, opacity: 0.75 }));
    frame.add(mesh);
    frame.position.y = 0.95; frame.rotation.z = 0.1;
    g.add(frame);
    const brush = G();
    brush.add(rot(cyl(0.04, 0.05, 1.1, M.darkWood(), 8), 0, 0, 0.4));
    brush.add(at(cone(0.09, 0.3, mat(0x30302e, { rough: 1 }), 10), 0.24, -0.62, 0));
    brush.position.set(-1.7, 0.5, 0.9); g.add(brush);
    return { group: g, update: (t) => {
      frame.position.y = 0.95 + Math.sin(t * 1.4) * 0.14;
      frame.rotation.z = 0.1 + Math.sin(t * 1.4) * 0.06;
      sheets.forEach(s => { s.position.y = s.userData.y + Math.sin(t * 1.2 + s.userData.ph) * 0.012; });
    }};
  },

  /* -------------------------- LA BOUSSOLE -------------------------- */
  boussole() {
    const g = G();
    g.add(at(cyl(1.35, 1.4, 0.42, M.brass(), 40), 0, -0.15, 0));
    g.add(at(tor(1.33, 0.09, M.brass(), 40, 12), 0, 0.08, 0).rotateX(Math.PI / 2));
    const face = at(cyl(1.24, 1.24, 0.05, mat(0xe8dcc0, { rough: 0.85 }), 40), 0, 0.08, 0);
    g.add(face);

    /* Rose des vents : 8 branches en losange alternées. Sans elle, un
       cadran rond + une aiguille rouge se lit immanquablement comme une
       horloge — c'est la rose qui dit « boussole ». */
    const pale = mat(0xf6efdd, { rough: 0.8 }), deep = mat(0x2c3542, { rough: 0.7 });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const long = i % 2 === 0;
      const arm = G();
      const k = cone(long ? 0.17 : 0.11, long ? 1.02 : 0.66, i % 2 ? deep : pale, 4);
      k.rotation.x = Math.PI / 2;              // pointe vers +Z
      k.scale.z = 0.06;                        // aplatie sur le cadran
      k.position.z = (long ? 1.02 : 0.66) / 2;
      arm.add(k);
      arm.rotation.y = a;
      arm.position.y = 0.115;
      g.add(arm);
    }
    /* repère du nord */
    const nMark = cone(0.13, 0.3, M.red(), 3);
    nMark.rotation.x = Math.PI / 2; nMark.scale.z = 0.1;
    nMark.position.set(0, 0.13, 1.05); g.add(nMark);

    /* aiguille aimantée, fine, flottant au-dessus de la rose */
    const needle = G();
    const n = cone(0.085, 1.12, M.red(), 4); n.position.z = 0.56; n.rotation.x = Math.PI / 2;
    n.scale.z = 0.5; needle.add(n);                      // pointe vers le nord (+Z)
    const s = cone(0.075, 1.12, mat(0x1e232c, { rough: 0.4, metal: 0.6 }), 4);
    s.position.z = -0.56; s.rotation.x = -Math.PI / 2; s.scale.z = 0.5; needle.add(s);
    needle.add(at(sph(0.1, M.brass(), 12), 0, 0, 0));
    needle.position.y = 0.26; g.add(needle);
    const dome = sph(1.28, mat(0xcfeaff, { rough: 0.05, metal: 0.2, opacity: 0.18 }), 26);
    dome.scale.y = 0.42; dome.position.y = 0.1; g.add(dome);
    return { group: g, update: (t) => {
      needle.rotation.y = Math.sin(t * 0.9) * 0.35 + Math.sin(t * 3.7) * 0.05;
    }};
  },

  /* ------------------------- L'IMPRIMERIE -------------------------- */
  imprimerie() {
    const g = G();
    const post = (x) => { g.add(box(0.26, 3.4, 0.26, M.darkWood(), x, 0.4, 0)); };
    post(-1.15); post(1.15);
    g.add(box(2.9, 0.28, 0.7, M.darkWood(), 0, 2.05, 0));
    g.add(box(2.9, 0.28, 0.7, M.darkWood(), 0, -1.25, 0));
    g.add(box(3.4, 0.2, 1.9, M.wood(), 0, -1.45, 0.4));
    const screw = G();
    for (let i = 0; i < 16; i++) {
      const y = i * 0.075;
      const t2 = tor(0.2, 0.045, M.steel(), 18, 8);
      t2.rotation.x = Math.PI / 2 + 0.28; t2.position.y = y; screw.add(t2);
    }
    screw.add(at(cyl(0.11, 0.11, 1.4, M.steel(), 12), 0, 0.5, 0));
    screw.position.y = 1.0; g.add(screw);
    const bar = G();
    bar.add(rot(cyl(0.06, 0.06, 1.9, M.steel(), 10), 0, 0, Math.PI / 2));
    bar.add(at(sph(0.13, M.wood(), 12), 0.95, 0, 0));
    bar.position.y = 1.95; g.add(bar);
    const platen = G();
    platen.add(box(1.7, 0.22, 1.3, M.darkWood()));
    platen.add(at(cyl(0.09, 0.09, 0.7, M.steel(), 10), 0, 0.42, 0));
    platen.position.set(0, 0.5, 0.35); g.add(platen);
    const sheet = box(1.5, 0.03, 1.1, M.paper(), 0, -1.32, 0.35); g.add(sheet);
    /* casse de caractères */
    const tray = G();
    for (let i = 0; i < 18; i++) {
      const c = box(0.16, 0.28, 0.16, M.brass());
      c.position.set(-1.5 + (i % 6) * 0.2, -1.2, -0.55 + Math.floor(i / 6) * 0.2);
      tray.add(c);
    }
    g.add(tray);
    return { group: g, update: (t) => {
      const k = (Math.sin(t * 1.3) + 1) / 2;
      bar.rotation.y = k * 1.5;
      screw.rotation.y = k * 4.5;
      platen.position.y = 0.5 - k * 0.65;
    }};
  },

  /* -------------------------- LE TÉLESCOPE ------------------------- */
  telescope() {
    const g = G(), tube = G();
    tube.add(rot(cyl(0.4, 0.46, 3.2, M.brass(), 24), 0, 0, 0));
    tube.add(at(cyl(0.28, 0.3, 1.3, M.brass(), 20), 0, -2.0, 0));
    tube.add(at(cyl(0.15, 0.17, 0.5, M.dark(), 16), 0, -2.75, 0));
    tube.add(at(tor(0.42, 0.05, M.dark(), 24, 8), 0, 1.1, 0).rotateX(Math.PI / 2));
    tube.add(at(tor(0.42, 0.05, M.dark(), 24, 8), 0, -0.6, 0).rotateX(Math.PI / 2));
    tube.add(at(cyl(0.44, 0.44, 0.05, mat(0xa9d8ff, { rough: 0.02, metal: 0.4, opacity: 0.5 }), 24), 0, 1.58, 0));
    tube.rotation.z = 0.5; tube.position.y = 0.85; g.add(tube);
    const mount = G();
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const leg = cyl(0.1, 0.14, 3.0, M.darkWood(), 8);
      leg.position.set(Math.cos(a) * 0.72, -1.72, Math.sin(a) * 0.72);
      leg.rotation.set(Math.sin(a) * 0.42, 0, -Math.cos(a) * 0.42);
      mount.add(leg);
      /* entretoise */
      const bar = cyl(0.045, 0.045, 1.15, M.darkWood(), 6);
      bar.position.set(Math.cos(a + Math.PI / 3) * 0.62, -2.35, Math.sin(a + Math.PI / 3) * 0.62);
      bar.rotation.set(Math.PI / 2, 0, a + Math.PI / 3);
      mount.add(bar);
    }
    mount.add(at(cyl(0.22, 0.26, 0.4, M.brass(), 14), 0, -0.28, 0));
    /* colonne + chape qui relient réellement le trépied au tube */
    mount.add(at(cyl(0.12, 0.14, 1.25, M.brass(), 14), 0, 0.3, 0));
    mount.add(at(rot(cyl(0.09, 0.09, 0.62, M.brass(), 12), Math.PI / 2, 0, 0), 0, 0.9, 0));
    [-0.3, 0.3].forEach(z => mount.add(at(box(0.1, 0.5, 0.09, M.brass()), 0, 1.05, z)));
    g.add(mount);
    const stars = G();
    const sg = new THREE.BufferGeometry(); const pts = [];
    for (let i = 0; i < 220; i++) {
      const r = 9 + Math.random() * 5, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      pts.push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th));
    }
    sg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    stars.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xfff3d0, size: 0.13, sizeAttenuation: true })));
    stars.userData.decor = true;          // décor : hors cadrage caméra
    g.add(stars);
    return { group: g, update: (t) => {
      tube.rotation.z = 0.5 + Math.sin(t * 0.55) * 0.16;
      stars.rotation.y = t * 0.03;
    }};
  },

  /* ------------------------ MACHINE À VAPEUR ----------------------- */
  vapeur() {
    const g = G();
    const boiler = rot(cyl(0.85, 0.85, 3.0, M.dark(), 24), 0, 0, Math.PI / 2);
    at(boiler, 0, 0.2, 0); g.add(boiler);
    [-1.0, 0, 1.0].forEach(x => g.add(at(rot(tor(0.87, 0.07, M.brass(), 24, 8), 0, Math.PI / 2, 0), x, 0.2, 0)));
    g.add(at(cyl(0.28, 0.34, 1.5, M.dark(), 16), -0.9, 1.5, 0));
    g.add(at(cyl(0.38, 0.28, 0.35, M.dark(), 16), -0.9, 2.35, 0));
    /* cylindre + bielle */
    const pistonCyl = at(rot(cyl(0.3, 0.3, 1.1, M.brass(), 16), 0, 0, Math.PI / 2), 1.9, 0.2, 0);
    g.add(pistonCyl);
    const rod = at(rot(cyl(0.07, 0.07, 1.6, M.steel(), 10), 0, 0, Math.PI / 2), 2.9, 0.2, 0);
    g.add(rod);
    const fly = G();
    fly.add(rot(tor(1.15, 0.12, M.steel(), 30, 10), 0, 0, 0));
    for (let i = 0; i < 6; i++) fly.add(rot(box(0.08, 2.25, 0.08, M.steel()), 0, 0, (i / 6) * Math.PI));
    fly.add(rot(cyl(0.2, 0.2, 0.3, M.brass(), 12), Math.PI / 2, 0, 0));
    fly.position.set(3.9, 0.2, 0); g.add(fly);
    const crank = at(sph(0.13, M.red(), 10), 0, 0, 0); fly.add(at(crank, 0, 0.85, 0.22));
    /* base */
    g.add(box(7.2, 0.3, 2.4, M.darkWood(), 0.9, -1.35, 0));
    const puffs = [];
    for (let i = 0; i < 7; i++) {
      const p = sph(0.22 + Math.random() * 0.16, mat(0xf5f7fa, { rough: 1, opacity: 0.5 }), 12);
      p.userData = { ph: i * 0.85 }; puffs.push(p); g.add(p);
    }
    return { group: g, update: (t) => {
      fly.rotation.z = -t * 1.6;
      const k = Math.cos(-t * 1.6);
      rod.position.x = 2.9 + k * 0.3;
      puffs.forEach((p, i) => {
        const u = ((t * 0.45 + i / puffs.length) % 1);
        p.position.set(-0.9 + Math.sin(u * 5 + i) * 0.5, 2.5 + u * 3.4, Math.cos(u * 4 + i) * 0.4);
        p.material.opacity = 0.55 * (1 - u);
        const s = 0.6 + u * 2.1; p.scale.set(s, s, s);
      });
    }};
  },

  /* --------------------------- LE VACCIN --------------------------- */
  vaccin() {
    const g = G(), syr = G();
    syr.add(cyl(0.34, 0.34, 2.6, mat(0xd8f0ff, { rough: 0.05, metal: 0.1, opacity: 0.3 }), 24));
    const liquid = at(cyl(0.28, 0.28, 1.5, glow(0x54d6b4, 0.5), 20), 0, -0.45, 0); syr.add(liquid);
    syr.add(at(cyl(0.4, 0.4, 0.1, M.white(), 24), 0, 1.32, 0));
    syr.add(at(box(1.0, 0.09, 0.28, M.white()), 0, 1.38, 0));
    const plunger = G();
    plunger.add(cyl(0.09, 0.09, 1.7, M.white(), 12));
    plunger.add(at(cyl(0.31, 0.31, 0.2, mat(0x4a4f5c, { rough: 0.9 }), 20), 0, -0.85, 0));
    plunger.add(at(cyl(0.42, 0.42, 0.09, M.white(), 20), 0, 0.9, 0));
    plunger.position.y = 1.55; syr.add(plunger);
    syr.add(at(cone(0.2, 0.5, M.white(), 16), 0, -1.5, 0).rotateX(Math.PI));
    syr.add(at(cyl(0.035, 0.02, 1.5, M.steel(), 10), 0, -2.45, 0));
    for (let i = 0; i < 4; i++) syr.add(at(box(0.24, 0.02, 0.02, mat(0x3a4050, { rough: 1 })), 0.22, 0.4 - i * 0.42, 0.33));
    syr.rotation.z = 0.4; g.add(syr);
    /* virus décoratifs */
    const virus = [];
    for (let i = 0; i < 5; i++) {
      const v = G();
      v.add(sph(0.28, mat(0xd8434f, { rough: 0.6, flat: true }), 10));
      for (let k = 0; k < 12; k++) {
        const a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1);
        const spike = cyl(0.03, 0.05, 0.22, mat(0xa8303c, { rough: 0.8 }), 6);
        const dir = new THREE.Vector3(Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a));
        spike.position.copy(dir.clone().multiplyScalar(0.36));
        spike.lookAt(dir.clone().multiplyScalar(2)); spike.rotateX(Math.PI / 2);
        v.add(spike);
      }
      v.userData = { ph: i * 1.3, r: 2.0 + (i % 2) * 0.6 };
      virus.push(v); g.add(v);
    }
    return { group: g, update: (t) => {
      plunger.position.y = 1.55 - ((Math.sin(t * 1.5) + 1) / 2) * 0.55;
      virus.forEach((v, i) => {
        const a = t * 0.5 + v.userData.ph;
        v.position.set(Math.cos(a) * v.userData.r, Math.sin(t * 0.8 + i) * 1.1, Math.sin(a) * v.userData.r);
        v.rotation.set(t * 0.7 + i, t * 0.5, 0);
        const s = 0.75 + Math.sin(t * 1.5 + i) * 0.12; v.scale.setScalar(s);
      });
    }};
  },

  /* --------------------------- L'AMPOULE --------------------------- */
  ampoule() {
    const g = G();
    const bulb = sph(1.25, mat(0xdff2ff, { rough: 0.02, metal: 0.15, opacity: 0.22 }), 32);
    bulb.scale.set(1, 1.18, 1); bulb.position.y = 0.5; g.add(bulb);
    g.add(at(cyl(0.42, 0.6, 0.6, mat(0xdff2ff, { rough: 0.02, opacity: 0.22 }), 24), 0, -0.85, 0));
    const base = G();
    for (let i = 0; i < 7; i++) base.add(at(tor(0.42, 0.075, M.brass(), 22, 8), 0, -1.25 - i * 0.14, 0).rotateX(Math.PI / 2));
    base.add(at(cyl(0.42, 0.34, 0.3, M.brass(), 20), 0, -2.4, 0));
    base.add(at(sph(0.16, mat(0x1e2027, { rough: 0.9 }), 12), 0, -2.6, 0));
    g.add(base);
    /* filament : hélice */
    const pts = [];
    for (let i = 0; i <= 130; i++) {
      const u = i / 130, a = u * Math.PI * 15;
      pts.push(new THREE.Vector3(Math.cos(a) * 0.3, -0.55 + u * 1.5, Math.sin(a) * 0.3));
    }
    const fil = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 200, 0.032, 7, false),
      glow(0xffd27a, 3)
    );
    g.add(fil);
    g.add(at(cyl(0.03, 0.03, 1.0, M.steel(), 8), 0.3, -1.0, 0));
    g.add(at(cyl(0.03, 0.03, 1.0, M.steel(), 8), -0.3, -1.0, 0));
    const light = new THREE.PointLight(0xffcf7a, 3.5, 16); light.position.y = 0.4; g.add(light);
    return { group: g, update: (t) => {
      const k = 0.85 + Math.sin(t * 2.1) * 0.12 + Math.sin(t * 9.3) * 0.03;
      fil.material.emissiveIntensity = 2.4 * k;
      light.intensity = 3.4 * k;
    }};
  },

  /* -------------------------- LE TÉLÉPHONE ------------------------- */
  /* Téléphone « chandelier » : socle évasé, fût vertical, cornet
     acoustique horizontal en haut, écouteur suspendu à sa fourche. */
  telephone() {
    const g = G();
    const shell = mat(0x23272f, { rough: 0.42, metal: 0.35 });

    g.add(at(cyl(1.15, 1.25, 0.18, shell, 30), 0, -2.28, 0));
    g.add(at(cyl(0.72, 1.12, 0.42, shell, 28), 0, -2.0, 0));
    g.add(at(tor(0.95, 0.06, M.brass(), 30, 8), 0, -2.14, 0).rotateX(Math.PI / 2));
    g.add(at(cyl(0.34, 0.62, 0.35, shell, 22), 0, -1.62, 0));

    /* fût */
    g.add(at(cyl(0.13, 0.17, 2.9, shell, 20), 0, -0.05, 0));
    g.add(at(tor(0.16, 0.045, M.brass(), 20, 7), 0, 1.18, 0).rotateX(Math.PI / 2));

    /* cornet : cône horizontal, embouchure vers l'avant */
    const mouth = G();
    /* le pavillon doit s'évaser vers l'extérieur : base du cône en +X */
    mouth.add(rot(cone(0.46, 0.78, shell, 24), 0, 0, Math.PI / 2));
    mouth.add(at(rot(tor(0.45, 0.05, M.brass(), 24, 8), 0, 0, Math.PI / 2), 0.4, 0, 0));
    mouth.add(at(rot(cyl(0.1, 0.1, 0.32, shell, 14), 0, 0, Math.PI / 2), -0.5, 0, 0));
    mouth.position.set(0.5, 1.5, 0); g.add(mouth);
    g.add(at(cyl(0.1, 0.1, 0.42, M.brass(), 14), 0, 1.5, 0));

    /* fourche à gauche */
    const hook = G();
    hook.add(at(rot(cyl(0.05, 0.05, 0.72, M.brass(), 10), 0, 0, Math.PI / 2), -0.36, 0, 0));
    hook.add(at(cyl(0.045, 0.045, 0.3, M.brass(), 10), -0.7, 0.13, 0));
    hook.position.set(0, 1.02, 0); g.add(hook);

    /* écouteur suspendu */
    const rec = G();
    rec.add(cyl(0.15, 0.15, 1.15, shell, 16));
    rec.add(at(cone(0.3, 0.3, shell, 20), 0, 0.66, 0));
    rec.add(at(rot(cone(0.3, 0.3, shell, 20), Math.PI, 0, 0), 0, -0.66, 0));
    rec.add(at(tor(0.28, 0.035, M.brass(), 20, 7), 0, -0.78, 0).rotateX(Math.PI / 2));
    rec.position.set(-0.82, 0.42, 0); g.add(rec);

    /* cordon torsadé écouteur → socle */
    const cpts = [];
    for (let i = 0; i <= 60; i++) {
      const u = i / 60;
      cpts.push(new THREE.Vector3(
        -0.82 + u * 0.66,
        -0.28 - u * 1.25 - Math.sin(u * Math.PI) * 0.45,
        Math.sin(u * 26) * 0.09 + 0.12
      ));
    }
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cpts), 90, 0.045, 6, false),
      mat(0x1b1e25, { rough: 0.9 })));

    /* sonnerie */
    const bells = [];
    [-0.44, 0.44].forEach(x => {
      const b = sph(0.26, M.brass(), 16); b.scale.y = 0.7; b.position.set(x, -1.3, 0.15);
      bells.push(b); g.add(b);
    });

    return { group: g, update: (t) => {
      const ringing = Math.sin(t * 0.9) > 0.6;
      const k = ringing ? Math.sin(t * 42) * 0.05 : 0;
      bells.forEach((b, i) => (b.position.x = (i ? 0.44 : -0.44) + k * (i ? 1 : -1)));
      rec.rotation.z = Math.sin(t * 1.3) * 0.06 + k * 1.6;
    }};
  },

  /* ------------------------- L'AUTOMOBILE -------------------------- */
  automobile() {
    const g = G(), wheels = [];
    const mkWheel = (r, x, y, z) => {
      const w = G();
      w.add(tor(r, 0.1, M.dark(), 28, 9));
      w.add(rot(cyl(0.13, 0.13, 0.16, M.brass(), 10), Math.PI / 2, 0, 0));
      for (let i = 0; i < 10; i++) w.add(rot(box(0.035, r * 2, 0.035, M.steel()), 0, 0, (i / 10) * Math.PI));
      w.rotation.y = Math.PI / 2; w.position.set(x, y, z);
      wheels.push(w); g.add(w); return w;
    };
    mkWheel(1.0, 0.9, 0, 1.0); mkWheel(1.0, 0.9, 0, -1.0); mkWheel(0.6, -1.7, -0.4, 0);
    const frame = M.steel();
    g.add(at(rot(cyl(0.05, 0.05, 3.4, frame, 8), 0, 0, Math.PI / 2), -0.3, 0.2, 0.7));
    g.add(at(rot(cyl(0.05, 0.05, 3.4, frame, 8), 0, 0, Math.PI / 2), -0.3, 0.2, -0.7));
    g.add(at(rot(cyl(0.05, 0.05, 1.4, frame, 8), Math.PI / 2, 0, 0), 1.4, 0.2, 0));
    g.add(box(1.5, 0.14, 1.4, M.darkWood(), 0.9, 0.45, 0));
    g.add(box(0.14, 1.0, 1.4, M.darkWood(), 1.65, 0.95, 0));
    /* volant de moteur horizontal */
    const flyw = G();
    flyw.add(rot(tor(0.62, 0.08, M.steel(), 26, 8), Math.PI / 2, 0, 0));
    for (let i = 0; i < 4; i++) flyw.add(rot(box(0.06, 0.06, 1.2, M.steel()), 0, (i / 4) * Math.PI, 0));
    flyw.position.set(1.55, 0.25, 0); g.add(flyw);
    g.add(at(cyl(0.24, 0.24, 0.9, M.dark(), 16), 1.05, 0.25, 0).rotateZ(Math.PI / 2));
    /* tiller */
    const tiller = G();
    tiller.add(rot(cyl(0.04, 0.04, 1.5, M.steel(), 8), 0, 0, 0.9));
    tiller.add(at(rot(cyl(0.06, 0.06, 0.5, M.darkWood(), 8), 0, 0, Math.PI / 2), -0.62, 0.55, 0));
    tiller.position.set(-1.1, 0.7, 0); g.add(tiller);
    return { group: g, update: (t) => {
      wheels.forEach((w, i) => w.rotation.x = -t * (i === 2 ? 1.7 : 1.0));
      flyw.rotation.y = t * 5;
      g.position.y = Math.sin(t * 6) * 0.02;
    }};
  },

  /* ---------------------------- L'AVION ---------------------------- */
  /* Wright Flyer : biplan, gouverne de profondeur à l'avant (canard),
     dérive à l'arrière, deux hélices propulsives. Axe X = avant/arrière,
     axe Z = envergure. */
  avion() {
    const g = G(), props = [];
    const strut = M.wood(), fabric = mat(0xe8e2d2, { rough: 0.95, flat: true });
    const LOW = 0, TOP = 1.25;

    /* les deux plans */
    g.add(box(1.5, 0.07, 6.4, fabric, 0, LOW, 0));
    g.add(box(1.5, 0.07, 6.4, fabric, 0, TOP, 0));

    /* mâts entre les plans, uniquement dans l'entre-plan */
    [-2.9, -1.75, -0.6, 0.6, 1.75, 2.9].forEach(z => {
      [0.55, -0.55].forEach(x => g.add(box(0.07, TOP - LOW, 0.07, strut, x, (LOW + TOP) / 2, z)));
    });

    /* longerons vers le canard (avant, +X) et la dérive (arrière, −X) —
       un seul niveau de chaque côté, sinon la maquette se lit comme un
       échafaudage */
    [-0.95, 0.95].forEach(z => {
      g.add(box(2.9, 0.06, 0.06, strut,  2.05, 0.62, z));
      g.add(box(2.6, 0.06, 0.06, strut, -1.95, 0.98, z));
    });

    /* gouverne de profondeur avant */
    g.add(box(0.75, 0.06, 2.4, fabric, 3.3, 0.35, 0));
    g.add(box(0.75, 0.06, 2.4, fabric, 3.3, 1.0, 0));
    [-1.0, 1.0].forEach(z => g.add(box(0.07, 0.7, 0.07, strut, 3.3, 0.67, z)));

    /* dérive arrière */
    [-0.45, 0.45].forEach(z => g.add(box(0.55, 0.95, 0.05, fabric, -3.1, 0.85, z)));
    g.add(box(0.06, 0.06, 1.0, strut, -3.1, 1.28, 0));

    /* moteur + pilote */
    g.add(at(box(0.55, 0.5, 0.42, M.dark()), 0.1, 0.3, 0.42));
    g.add(at(box(1.1, 0.1, 0.55, M.darkWood()), 0.15, 0.12, -0.45));

    /* hélices propulsives, en arrière des plans */
    [-0.95, 0.95].forEach((z, i) => {
      const p = G();
      p.add(box(0.05, 0.2, 2.1, M.darkWood()));
      p.add(rot(box(0.05, 0.2, 2.1, M.darkWood()), Math.PI / 2, 0, 0));
      p.add(rot(cyl(0.07, 0.07, 0.22, M.brass(), 10), 0, 0, Math.PI / 2));
      p.position.set(-0.95, (LOW + TOP) / 2, z);
      props.push(p); g.add(p);
      g.add(at(rot(cyl(0.05, 0.05, 0.9, M.steel(), 8), 0, 0, Math.PI / 2), -0.5, (LOW + TOP) / 2, z));
    });

    /* patins d'atterrissage */
    [-1.25, 1.25].forEach(z => {
      g.add(box(4.4, 0.09, 0.14, strut, 0.3, -0.62, z));
      g.add(at(box(0.3, 0.09, 0.14, strut), 2.6, -0.5, z).rotateZ(-0.35));
      [1.1, -1.4].forEach(x => g.add(box(0.08, 0.66, 0.08, strut, x, -0.31, z)));
    });

    return { group: g, update: (t) => {
      props.forEach((p, i) => (p.rotation.x = t * (i ? -13 : 13)));
      g.position.y = Math.sin(t * 1.4) * 0.14;
      g.rotation.z = Math.sin(t * 0.9) * 0.045;
    }};
  },

  /* ------------------------- LA PÉNICILLINE ------------------------ */
  penicilline() {
    const g = G();
    const dish = cyl(2.1, 2.1, 0.35, mat(0xdff0f5, { rough: 0.06, metal: 0.1, opacity: 0.35 }), 44);
    at(dish, 0, -0.4, 0); g.add(dish);
    g.add(at(cyl(2.0, 2.0, 0.16, mat(0xe4d9a8, { rough: 0.95 }), 44), 0, -0.42, 0));
    const lid = cyl(2.22, 2.22, 0.3, mat(0xdff0f5, { rough: 0.04, metal: 0.15, opacity: 0.22 }), 44);
    at(lid, 0, 0.55, 0); g.add(lid);
    /* colonie de moisissure */
    const mold = G();
    for (let i = 0; i < 42; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.random() * 0.75;
      const b = sph(0.13 + Math.random() * 0.17, mat(i % 4 ? 0x76a84f : 0x9dc46b, { rough: 1, flat: true }), 8);
      b.position.set(-0.85 + Math.cos(a) * r, -0.24 + Math.random() * 0.14, -0.4 + Math.sin(a) * r);
      mold.add(b);
    }
    g.add(mold);
    /* bactéries : denses au loin, absentes près de la moisissure */
    const bact = [];
    for (let i = 0; i < 150; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 1.85;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const d = Math.hypot(x + 0.85, z + 0.4);
      if (d < 1.35) continue;                       // zone d'inhibition
      const b = sph(0.055, mat(0xd9b45c, { rough: 1 }), 6);
      b.scale.z = 1.9; b.rotation.y = Math.random() * 3;
      b.position.set(x, -0.28, z);
      bact.push(b); g.add(b);
    }
    const halo = tor(1.35, 0.02, glow(0x2ec9b0, 1.2), 60, 6);
    halo.rotation.x = Math.PI / 2; halo.position.set(-0.85, -0.25, -0.4); g.add(halo);
    return { group: g, update: (t) => {
      const k = 1 + Math.sin(t * 1.6) * 0.03; halo.scale.set(k, k, 1);
      halo.material.emissiveIntensity = 1 + Math.sin(t * 1.6) * 0.5;
      mold.children.forEach((b, i) => b.position.y = -0.24 + Math.sin(t * 1.4 + i) * 0.02);
    }};
  },

  /* ------------------------- L'ORDINATEUR -------------------------- */
  ordinateur() {
    const g = G(), lamps = [];
    const cab = mat(0x3d4552, { rough: 0.55, metal: 0.4 });
    for (let i = 0; i < 5; i++) {
      const x = -3.4 + i * 1.7;
      g.add(box(1.55, 3.4, 1.0, cab, x, 0, 0));
      g.add(box(1.35, 0.12, 0.08, M.dark(), x, 1.78, 0.5));
      /* panneaux de voyants */
      for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
        const col = (r + c + i) % 3 === 0 ? 0xff6b4a : ((r * c + i) % 2 ? 0xffd166 : 0x2ec9b0);
        const l = sph(0.065, glow(col, 1.4), 8);
        l.position.set(x - 0.5 + c * 0.25, 1.3 - r * 0.4, 0.53);
        l.userData = { ph: (i * 25 + r * 5 + c) * 1.7, col };
        lamps.push(l); g.add(l);
      }
      /* tubes à vide */
      for (let k = 0; k < 4; k++) {
        const tube = cyl(0.09, 0.09, 0.4, mat(0xffe3a8, { rough: 0.1, opacity: 0.55, emissive: 0xff9d3d, ei: 0.6 }), 10);
        tube.position.set(x - 0.45 + k * 0.3, -0.9, 0.5);
        g.add(tube);
      }
      g.add(box(1.45, 0.06, 0.5, M.steel(), x, -1.5, 0.35));
    }
    g.add(box(9.4, 0.25, 1.4, M.dark(), -0.85, -1.85, 0));
    /* câbles */
    for (let i = 0; i < 9; i++) {
      const p = [];
      const x0 = -3.4 + Math.random() * 6.8;
      for (let k = 0; k <= 20; k++) {
        const u = k / 20;
        p.push(new THREE.Vector3(x0 + u * 1.2, 1.6 - Math.sin(u * Math.PI) * -0.5 + u * 0.1, 0.6 + Math.sin(u * 3) * 0.15));
      }
      g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(p), 24, 0.03, 5, false),
        mat([0xd8434f, 0x5b8bd0, 0xd8a03d][i % 3], { rough: 0.9 })));
    }
    return { group: g, update: (t) => {
      lamps.forEach(l => {
        const on = Math.sin(t * 3 + l.userData.ph) > 0.1;
        l.material.emissiveIntensity = on ? 1.8 : 0.08;
      });
    }};
  },

  /* --------------------------- INTERNET ---------------------------- */
  internet() {
    const g = G();
    const globe = new THREE.Mesh(new THREE.IcosahedronGeometry(2.1, 2),
      new THREE.MeshStandardMaterial({ color: 0x2ec9b0, wireframe: true, roughness: 1, transparent: true, opacity: 0.35 }));
    g.add(globe);
    const core = sph(2.0, mat(0x0f2430, { rough: 0.9, opacity: 0.85 }), 28); globe.add(core);
    const nodes = [], np = [];
    for (let i = 0; i < 26; i++) {
      const ph = Math.acos(1 - 2 * (i + 0.5) / 26), th = Math.PI * (1 + Math.sqrt(5)) * i;
      const v = new THREE.Vector3(Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)).multiplyScalar(2.15);
      const n = sph(0.09, glow(0x9df5e6, 1.6), 10); n.position.copy(v);
      nodes.push(n); np.push(v); globe.add(n);
    }
    const arcs = [], pulses = [];
    for (let i = 0; i < 16; i++) {
      const a = np[Math.floor(Math.random() * np.length)], b = np[Math.floor(Math.random() * np.length)];
      if (a.distanceTo(b) < 1.4) continue;
      const midv = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(2.15 + a.distanceTo(b) * 0.35);
      const curve = new THREE.QuadraticBezierCurve3(a, midv, b);
      globe.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.016, 5, false), glow(0x53e0ff, 0.8)));
      const p = sph(0.075, glow(0xffffff, 2.4), 8); globe.add(p);
      pulses.push({ mesh: p, curve, off: Math.random() });
      arcs.push(curve);
    }
    const ring = tor(3.0, 0.012, glow(0x2ec9b0, 0.7), 90, 6); ring.rotation.x = Math.PI / 2.3; g.add(ring);
    const ring2 = tor(3.4, 0.008, glow(0x53e0ff, 0.5), 90, 6); ring2.rotation.x = -Math.PI / 3; g.add(ring2);
    ring.userData.decor = ring2.userData.decor = true;
    return { group: g, update: (t) => {
      globe.rotation.y = t * 0.22; globe.rotation.x = Math.sin(t * 0.15) * 0.12;
      ring.rotation.z = t * 0.1; ring2.rotation.z = -t * 0.14;
      pulses.forEach(p => {
        const u = (t * 0.35 + p.off) % 1;
        p.mesh.position.copy(p.curve.getPoint(u));
      });
      nodes.forEach((n, i) => n.material.emissiveIntensity = 1.2 + Math.sin(t * 2.5 + i) * 0.8);
    }};
  },

  /* -------------------------- SMARTPHONE --------------------------- */
  smartphone() {
    const g = G(), body = G();
    const shape = new THREE.Shape();
    const w = 1.55, h = 3.1, r = 0.34;
    shape.moveTo(-w + r, -h); shape.lineTo(w - r, -h);
    shape.quadraticCurveTo(w, -h, w, -h + r); shape.lineTo(w, h - r);
    shape.quadraticCurveTo(w, h, w - r, h); shape.lineTo(-w + r, h);
    shape.quadraticCurveTo(-w, h, -w, h - r); shape.lineTo(-w, -h + r);
    shape.quadraticCurveTo(-w, -h, -w + r, -h);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 4 });
    geo.center();
    const shell = new THREE.Mesh(geo, mat(0x22262f, { rough: 0.3, metal: 0.85 }));
    shell.castShadow = true; body.add(shell);
    const screen = box(2.85, 5.85, 0.03, mat(0x0b0f18, { rough: 0.08, metal: 0.2 }), 0, 0, 0.2);
    body.add(screen);
    /* icônes qui s'allument */
    const icons = [];
    const palette = [0x2ec9b0, 0xffd166, 0xff6b8a, 0x5b8bd0, 0xa96fe0, 0xff9d3d];
    for (let r2 = 0; r2 < 5; r2++) for (let c = 0; c < 4; c++) {
      const i = r2 * 4 + c;
      const ic = box(0.5, 0.5, 0.02, glow(palette[i % palette.length], 0.9), -1.05 + c * 0.7, 2.05 - r2 * 0.78, 0.22);
      ic.userData = { ph: i * 0.9 }; icons.push(ic); body.add(ic);
    }
    body.add(box(1.4, 0.12, 0.02, mat(0x1a1e26, { rough: 0.5 }), 0, -2.6, 0.22));
    body.add(at(sph(0.12, mat(0x11141a, { rough: 0.1, metal: 0.6 }), 12), -0.9, 2.85, -0.18));
    body.add(at(sph(0.12, mat(0x11141a, { rough: 0.1, metal: 0.6 }), 12), -0.9, 2.5, -0.18));
    g.add(body);
    const sl = new THREE.PointLight(0x7fdfff, 1.6, 9); sl.position.set(0, 0, 2); g.add(sl);
    return { group: g, update: (t) => {
      body.rotation.y = Math.sin(t * 0.5) * 0.25;
      body.rotation.x = Math.sin(t * 0.37) * 0.12;
      icons.forEach(ic => { ic.material.emissiveIntensity = 0.6 + Math.abs(Math.sin(t * 1.3 + ic.userData.ph)) * 1.1; });
    }};
  },

  /* ----------------------------- L'IA ------------------------------ */
  ia() {
    const g = G();
    const layers = [4, 6, 6, 3], neurons = [], links = [];
    const cols = [0x2ec9b0, 0x53e0ff, 0xa96fe0, 0xffd166];
    layers.forEach((n, li) => {
      const arr = [];
      for (let i = 0; i < n; i++) {
        const s = sph(0.22, glow(cols[li], 0.8), 14);
        s.position.set(-3.3 + li * 2.2, (i - (n - 1) / 2) * 1.05, 0);
        s.userData = { ph: (li * 7 + i) * 0.8 };
        arr.push(s); neurons.push(s); g.add(s);
      }
      if (li > 0) {
        const prev = layers.slice(0, li).reduce((a, b) => a + b, 0) - layers[li - 1];
        for (let i = 0; i < layers[li - 1]; i++) for (let j = 0; j < n; j++) {
          const a = neurons[prev + i].position, b = arr[j].position;
          const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
          const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
            color: cols[li], transparent: true, opacity: 0.12 + Math.random() * 0.3
          }));
          line.userData = { ph: Math.random() * 9, base: line.material.opacity };
          links.push(line); g.add(line);
        }
      }
    });
    /* halo */
    const halo = new THREE.Mesh(new THREE.IcosahedronGeometry(4.4, 1),
      new THREE.MeshStandardMaterial({ color: 0x2ec9b0, wireframe: true, transparent: true, opacity: 0.07 }));
    halo.userData.decor = true;
    g.add(halo);
    return { group: g, update: (t) => {
      neurons.forEach(n => {
        const k = Math.abs(Math.sin(t * 1.6 + n.userData.ph));
        n.material.emissiveIntensity = 0.35 + k * 2;
        n.scale.setScalar(0.9 + k * 0.25);
      });
      links.forEach(l => {
        l.material.opacity = l.userData.base * (0.4 + Math.abs(Math.sin(t * 2 + l.userData.ph)) * 1.6);
      });
      halo.rotation.y = t * 0.08; halo.rotation.x = t * 0.05;
    }};
  }
};

/* modèle par défaut si un id manque */
function fallback() {
  const g = G();
  const c = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 0), mat(0xd7a13b, { flat: true }));
  g.add(c);
  return { group: g, update: (t) => { g.rotation.y = t * 0.4; g.rotation.x = t * 0.2; } };
}

export function buildModel(id) {
  try { return (builders[id] || fallback)(); }
  catch (e) { console.warn('modèle 3D indisponible :', id, e); return fallback(); }
}

/* La distance caméra est calculée automatiquement à partir de la boîte
   englobante du modèle (voir frameCamera dans app.js). ZOOM permet un
   ajustement artistique par modèle : < 1 = plus serré, > 1 = plus large. */
export const ZOOM = {
  ordinateur: 0.94,   // large et plat : on peut serrer
  internet:   0.92,
  ia:         0.95,
  smartphone: 0.96,
  boussole:   0.9,    // objet plat vu du dessus
  penicilline: 0.9,
  vapeur:     1.02,
  avion:      1.0
};
