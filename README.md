# Százalékszámítás aránypárral

Online gyakorlóoldal a százalékszámításhoz. Mindhárom mennyiséget (százalékalap, százalékérték, százalékláb) ugyanazzal a módszerrel számoljuk ki, aránypárral:

    100%  →  A
     p%   →  É

A keresett mennyiség helyére *x* kerül. Az *x*-et nem tartalmazó átló két számát összeszorozzuk, és elosztjuk a harmadik ismert számmal (azzal, amelyik az *x*-szel átlósan áll).

- **Százalékérték:** x = A · p : 100
- **Százalékalap:** x = 100 · É : p
- **Százalékláb:** x = 100 · É : A

A feladatok véletlenszerűen generált, életszerű szöveges feladatok (ugyanazok a helyzetek, mint a Százalékgyakorlóban). Gyakorolható külön mindhárom mennyiség, és van **Véletlen feladat** gomb is.

**Nehézségi szintek:** könnyű (kerek százalékok, egész eredmények), közepes (tetszőleges egész százalékok), nehéz (tizedes százalékok és változásos feladatok: árengedmény, áremelés, béremelés stb.).

**Lépésenkénti mód:**

1. *Aránypár felírása:* a diák beírja a két ismert adatot a táblázatba, a keresett helyére x-et ír.
2. *Átlós szorzás:* felírja a törtet: a számlálóba a két átlósan álló ismert szám szorzata, a nevezőbe a harmadik szám kerül.
3. *Számolás:* kiszámolja a szorzatot, majd a hányadost.

A program a tipikus hibákat külön jelzi (felcserélt alap és érték, a változás százaléka a 100% ± p% helyett, rossz átló). Van segítség és megoldás megmutatása. **Csak eredmény módban** csak a végeredményt kell beírni, utána megjelenik a teljes levezetés.

Minden számolás pontos tizedes aritmetikával történik. Az oldal egyetlen önálló fájl (`index.html`), build nélkül működik; az eredmények a böngésző `localStorage`-ában maradnak meg.

## Ellenőrzés

    node tests/verify.js
