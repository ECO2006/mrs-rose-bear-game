# 🐻 A casa di Mrs. Rose Bear 2.0 – Visitor Passport

Web App interattiva per la mostra. Funziona tramite QR Code / NFC.

---

## 📁 Struttura del progetto

```
/
├── index.html
├── style.css
├── script.js
├── README.md
│
├── immagini/
│   ├── ROSE.png                  ← Immagine homepage
│   ├── COPERTINA.png             ← Copertina passaporto
│   ├── PAGINA_PASSAPORTO.png     ← Sfondo pagine passaporto
│   ├── TIMBRO_1.png              ← Timbri (1,2,3,4,5,7,8,9,10)
│   ├── TIMBRO_2.png
│   ├── TIMBRO_3.png
│   ├── TIMBRO_4.png
│   ├── TIMBRO_5.png
│   ├── TIMBRO_7.png
│   ├── TIMBRO_8.png
│   ├── TIMBRO_9.png
│   ├── TIMBRO_10.png
│   ├── FIORE_1.png               ← Immagini Manche 1
│   ├── FIORE_2.png
│   ├── FIORE_3.png
│   ├── FIORE_4.png
│   ├── FIORAIA.png               ← Splash Manche 1
│   ├── BAKERY.png
│   ├── SCUOLA.png
│   ├── CABINA_TELEFONICA.png
│   ├── BOOKCROSSING.png
│   ├── INGRESSO_COTTAGE.png
│   ├── STANZA_RICREATIVA.png
│   ├── SALOTTO.png
│   ├── STANZA_CUSTODE.png
│   └── CASTELLO.png
│
└── audio/
    ├── PASSAPORTO.wav
    ├── TIMBRO.wav
    ├── PAGINE.wav
    ├── GIUSTO.wav
    ├── SBAGLIATO.wav
    ├── ALERT.wav
    ├── VITTORIA.wav
    ├── MUSICA_1.wav              ← Manche 7
    ├── MUSICA_2.wav
    ├── MUSICA_3.wav
    └── MUSICA_4.wav
```

---

## 🚀 Deploy su GitHub Pages

1. Crea un repository su GitHub (es. `mrs-rose-bear`)
2. Carica tutti i file mantenendo la struttura delle cartelle
3. Vai in **Settings → Pages → Branch: main → / (root)**
4. Il sito sarà disponibile a:
   `https://TUO_USERNAME.github.io/mrs-rose-bear/`

---

## 📱 QR Code per le postazioni

Ogni QR Code deve puntare all'URL con il parametro `?manche=X`:

| Postazione           | URL QR Code                              |
|----------------------|------------------------------------------|
| Manche 1 – Fioraia   | `https://…/index.html?manche=1`         |
| Manche 2 – Bakery    | `https://…/index.html?manche=2`         |
| Manche 3 – Scuola    | `https://…/index.html?manche=3`         |
| Manche 4 – Cabina    | `https://…/index.html?manche=4`         |
| Manche 5 – Bookcrossing | `https://…/index.html?manche=5`     |
| Manche 6 – Cottage   | `https://…/index.html?manche=6`         |
| Manche 7 – Ricreativa | `https://…/index.html?manche=7`        |
| Manche 8 – Salotto   | `https://…/index.html?manche=8`         |
| Manche 9 – Custode   | `https://…/index.html?manche=9`         |
| Manche 10 – Castello | `https://…/index.html?manche=10`        |

Puoi generare QR Code gratuitamente su [qr-code-generator.com](https://www.qr-code-generator.com/)

---

## 🔧 Note tecniche

- **localStorage**: lo stato (nickname, timbri, lettere FIORI-PAROLA) è salvato nel browser del visitatore.
  Ogni nuovo visitatore deve aprire il link da capo su un browser "pulito" (o in modalità privata).
- **NFC**: aggiungi il link `index.html` (senza parametro manche) come homepage. I tag NFC delle postazioni
  devono contenere l'URL con `?manche=X`.
- **Font "Libel Suit"**: non è su Google Fonts. Aggiungi il file `fonts/libel-suit.woff2` e
  decommenta il blocco `@font-face` in `style.css` per usarlo. Il fallback attuale è "Playfair Display".
- **Audio su mobile**: i browser mobili richiedono un gesto utente prima di riprodurre audio.
  Gli audio si attiveranno correttamente dopo il primo tap.

---

## 🃏 Frase finale (Manche 10)

La frase corretta che il visitatore deve ricomporre è:

```
A CHI AMA LE PAROLE BELLE, LA GENTILEZZA E LA MAGIA.
A TE
```

Le lettere vengono accumulate dal visitatore nella funzione FIORI-PAROLA (Manche 6 in poi).
