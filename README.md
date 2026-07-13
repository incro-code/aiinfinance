# Landing na Webflow Cloud — instrukcja

To repo to działający landing dostępny pod **incro.io/aiinfinance** oraz **szablon** do publikowania kolejnych landingów pod `incro.io/<nazwa>`.

Jak to działa: cały landing to jeden samodzielny plik `src/index.html`. Reszta repo to minimalna otoczka (Astro + Cloudflare), która serwuje go przez Webflow Cloud. **Otoczki nie trzeba rozumieć ani ruszać.**

## Nowy landing — krok po kroku

1. **Skopiuj to repo** jako nowe repo w organizacji `incro-code` (np. `nowy-landing`).
2. **Podmień `src/index.html`** na swój plik landingu (musi być samodzielny — wszystkie style/skrypty/obrazki w środku).
3. **Zmień nazwę ścieżki w 3 plikach** (wszędzie z `aiinfinance` na swoją):
   - `astro.config.mjs` → `base: "/nowy-landing"`
   - `wrangler.json` → `"name": "nowy-landing"`
   - `package.json` → `"name": "nowy-landing"`
4. **Poproś ownera organizacji `incro-code`**, żeby dodał nowe repo do aplikacji **Webflow** na GitHubie (GitHub → org Settings → GitHub Apps → Webflow → Repository access → dodaj repo). **Bez tego deploy będzie się cicho wysypywał** — Webflow pokaże repo na liście, ale nie zdoła go pobrać.
5. **Webflow Cloud** (site `incro-dev` → Webflow Cloud): **New app → Import** repo → branch `main`, Path `/nowy-landing` → **Deploy**.
6. Od tej pory każdy push na `main` deployuje się automatycznie.

## Praca z Claude Code

Kroki 1–3 (plus weryfikację i push) można zlecić w całości. Gotowy prompt do wklejenia:

> Skopiuj strukturę repo https://github.com/incro-code/aiinfinance jako szablon nowego projektu `<NAZWA>`. Podmień `src/index.html` na plik `<ŚCIEŻKA-DO-MOJEGO-HTML>`. Zmień `aiinfinance` na `<NAZWA>` w astro.config.mjs (base), wrangler.json i package.json. Zrób `npm install`, `npm run build`, potem uruchom `npx wrangler dev` i sprawdź curlem, że `localhost:8787/<NAZWA>` zwraca 200 bez nagłówka location. Na koniec utwórz repo `incro-code/<NAZwa>` na GitHubie i wypchnij na main.

Po tym zostają tylko kroki 4–5 (dostęp od ownera + import w Webflow), których nie da się zrobić z terminala.

## Czego nie zmieniać i dlaczego

- **Nie zmieniaj `output: "server"` na `"static"`** w `astro.config.mjs`. Statyczne serwowanie na Webflow Cloud wpada w pętlę przekierowań (`ERR_TOO_MANY_REDIRECTS`) — warstwa plików dokleja ukośnik do adresu, a brzeg Webflow go zdejmuje, w nieskończoność.
- **Nie kopiuj repo `bootcamp`** jako szablonu — działa na starych zasadach platformy i nowe deploye w tym stylu się zapętlają.
- Wersje w `package.json` (Astro 7 + adapter Cloudflare) odpowiadają oficjalnemu starterowi Webflow — aktualizuj tylko świadomie.

## Gdy coś nie działa

- **Deploy „odbija" bez błędu** → repo nie jest dodane do aplikacji Webflow na GitHubie (krok 4).
- **Pętla przekierowań** → sprawdź w terminalu `curl -sS -D - -o /dev/null https://incro.io/<nazwa>` — przeglądarka cache'uje przekierowania i myli. Upewnij się, że config jest jak w tym repo (`output: "server"`).
- **Test przed deployem:** `npm run build && npx wrangler dev`, potem `curl -I localhost:8787/<nazwa>` — ma być `200 OK` bez `location:`. To ten sam silnik, na którym działa produkcja.
