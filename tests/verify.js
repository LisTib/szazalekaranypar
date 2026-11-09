// A feladatgenerátorok és az aránypáros levezetés ellenőrzése: node tests/verify.js
const fs = require('fs');
const html = fs.readFileSync(require('path').join(__dirname, '..', 'index.html'), 'utf8');
const eng = html.split('// ENGINE START')[1].split('// ENGINE END')[0];
const E = new Function(eng + '; return {SC, CH, TOPICS, genBasic, genChange, makeTask, start, commit, expected, derive, story, sayAnswer, quickMistake, formula, tableHtml, D, dparse, dstr, deq, ddiv, dmul, hund, pct, answerOf, CELL_VAL};')();
let bad = 0, count = 0;
const fail = (...a) => { bad++; if (bad < 20) console.log('HIBA', ...a); };
const H = E.D(100);

function checkTask(q, tag) {
  count++;
  const txt = E.story(q);
  if (/undefined|NaN|null|\[object/.test(txt + E.sayAnswer(q))) fail('hibás szöveg', tag, txt);
  if (!E.deq(E.dmul(q.E, H), E.dmul(q.A, q.P))) fail('ellentmondó adatok', tag, txt);
  if (q.sc.int && (q.E.s || q.A.s)) fail('nem egész mennyiség', tag, txt);
  // aránypár: (átló két ismert száma szorozva) : (harmadik) = a keresett érték
  const f = E.formula(q);
  if ([f.a, f.b, f.c].includes(q.unk)) fail('az ismeretlen a képletben', tag);
  const x = E.ddiv(f.prod, E.CELL_VAL(q, f.c));
  if (!E.deq(x, E.answerOf(q))) fail('az aránypár rossz eredményt ad', tag, txt);
  const W = E.derive(q);
  if (W.stage !== 'done' || W.rows.length !== 3) fail('nem ér véget', tag);
  if (/NaN|undefined|null/.test(JSON.stringify(W.rows))) fail('hibás sor', tag);
  if (E.quickMistake(q, E.answerOf(q))) fail('a helyes válasz hibának látszik', tag, txt);
  for (const k of ['A', 'E', 'P']) if (!E.deq(E.dparse(E.dstr(q[k], true)), q[k])) fail('dparse/dstr', tag, k);
}
for (const unk of ['A', 'E', 'P']) {
  for (const L of [1, 2, 3]) for (const sc of E.SC) for (let i = 0; i < 150; i++) {
    const q = E.genBasic(sc, L, unk);
    if (!q) { fail('nem generálható', sc.id, unk, 'L' + L); break; }
    checkTask(q, sc.id + ' ' + unk + ' L' + L);
  }
  for (const sc of E.CH) for (let i = 0; i < 300; i++) {
    const q = E.genChange(sc, 3, unk);
    if (!q) { fail('nem generálható', sc.id, unk); break; }
    checkTask(q, sc.id + ' ' + unk + ' változás');
  }
}
for (const t of E.TOPICS) for (const L of [1, 2, 3]) for (let i = 0; i < 300; i++) {
  const q = E.makeTask(t.id, L, '');
  if (!q) { fail('makeTask null', t.id, L); continue; }
  if (t.id !== 'mixed' && q.unk !== t.id) fail('rossz típus', t.id);
  if (L < 3 && q.change) fail('változás könnyebb szinten', t.id, L);
}
console.log('ellenőrzött feladat:', count, 'hibás:', bad);
process.exit(bad ? 1 : 0);
