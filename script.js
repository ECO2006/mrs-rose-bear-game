/**
 * A CASA DI MRS. ROSE BEAR 2.0 – script.js
 * Web App – Visitor Passport
 * ─────────────────────────────────────────
 * Architettura: SPA con gestione stato via localStorage
 * Manche 1-10 implementate secondo il GDD (PDF allegato)
 */

/* ═══════════════════════════════════════════════
   1. COSTANTI & DATI MANCHE
═══════════════════════════════════════════════ */

const CORRECT_PHRASE = 'A CHI AMA LE PAROLE BELLE, LA GENTILEZZA E LA MAGIA.\nA TE';
const CORRECT_PHRASE_NORMALIZED = 'ACHIAMALEPAOLEBELLELAGNTELEZZAELAMAGIA.ATE'; // fallback fuzzy

/**
 * Timbri: manche -> id timbro (manche 6 non dà timbro)
 * Usando TIMBRO_6.png non esiste nel GDD; saltiamo il 6
 */
const TIMBRO_MAP = {1:'1',2:'2',3:'3',4:'4',5:'5',7:'7',8:'8',9:'9',10:'10'};

/**
 * Dati di tutte le manche
 */
const MANCHE_DATA = {

  /* ── MANCHE 1 – FIORAIA ── */
  1: {
    name: 'FIORAIA',
    color: '#006E00',
    splashImg: 'immagini/FIORAIA.png',
    type: 'image-quiz',
    questions: [
      {
        img: 'immagini/FIORE_1.png',
        options: ['Papavero','Anemone giapponese','Peonia','Elleboro'],
        correct: 1  // indice 0-based
      },
      {
        img: 'immagini/FIORE_2.png',
        options: ['Ortensia','Plumbago','Allium','Agapanto'],
        correct: 2
      },
      {
        img: 'immagini/FIORE_3.png',
        options: ['Zinnia','Crisantemo','Gerbera','Dalia'],
        correct: 3
      },
      {
        img: 'immagini/FIORE_4.png',
        options: ['Brugo','Erica','Fabiana imbricata','Veronica'],
        correct: 0
      }
    ]
  },

  /* ── MANCHE 2 – BAKERY ── */
  2: {
    name: 'BAKERY',
    color: '#873324',
    splashImg: 'immagini/BAKERY.png',
    type: 'multi-choice',
    subtitle: 'Scegli la risposta corretta',
    questions: [
      {
        q: 'Qual è la funzione principale del lievito madre nella panificazione?',
        options: [
          'Aggiungere colore alla crosta',
          'Far lievitare l\'impasto naturalmente e dare sapore',
          'Conservare il pane più a lungo'
        ],
        correct: 1
      },
      {
        q: 'Quale tipo di farina è più ricca di fibre e nutrienti rispetto alla farina bianca?',
        options: ['Farina 00','Farina integrale (wholemeal)','Farina per dolci'],
        correct: 1
      },
      {
        q: 'Quale pane britannico è preparato senza lievito, usando bicarbonato di sodio come agente lievitante?',
        options: ['Victoria sandwich loaf','Soda bread','Milk bread loaf'],
        correct: 1
      },
      {
        q: 'Quale tipo di pane è noto per essere morbido, leggermente dolce e spesso usato per colazioni o toast in stile giapponese?',
        options: ['Wholemeal loaf','Milk bread loaf','Victoria sandwich loaf'],
        correct: 1
      }
    ]
  },

  /* ── MANCHE 3 – SCUOLA ── */
  3: {
    name: 'SCUOLA',
    color: '#24872B',
    splashImg: 'immagini/SCUOLA.png',
    type: 'multi-choice',
    subtitle: 'Completa la frase',
    questions: [
      {
        q: '"_______, uguaglianza, fraternità"',
        options: ['Libertà','Pace','Amore','Onore'],
        correct: 0
      },
      {
        q: '"La somma degli angoli interni di un _______ è 180°"',
        options: ['Quadrato','Cerchio','Triangolo','Rettangolo'],
        correct: 2
      },
      {
        q: '"Il processo con cui le piante producono _______ usando luce e CO₂"',
        options: ['Ossigeno','Zuccheri','Acqua','Clorofilla'],
        correct: 1
      },
      {
        q: '"Nel romanzo I Promessi Sposi, Don Abbondio cerca di evitare i _______ a tutti i costi"',
        options: ['Guai','Compiti','Problemi matematici','Viaggi'],
        correct: 0
      },
      {
        q: '"Il _______ più lungo del mondo"',
        options: ['Mare','Lago','Fiume','Monte'],
        correct: 2
      },
      {
        q: '"Gli _______ si muovono intorno al nucleo dell\'atomo in orbite definite"',
        options: ['Atomi','Elettroni','Protoni','Neutroni'],
        correct: 1
      },
      {
        q: '"Il _______ è stato un periodo di grande fioritura culturale e artistica"',
        options: ['Rinascimento','Medioevo','Futurismo','Illuminismo'],
        correct: 0
      },
      {
        q: '"La _______ quadrata di un numero è il valore che moltiplicato per se stesso dà quel numero"',
        options: ['Radice','Somma','Differenza','Potenza'],
        correct: 0
      }
    ]
  },

  /* ── MANCHE 4 – CABINA TELEFONICA ── */
  4: {
    name: 'CABINA TELEFONICA',
    color: '#FF0014',
    splashImg: 'immagini/CABINA_TELEFONICA.png',
    type: 'matching',
    intro: 'Mrs. Rose è raffreddata e non può uscire. Ha bisogno di alcuni oggetti dal villaggio.\nAbbina ciascun oggetto al negozio giusto.',
    pairs: [
      { object: 'Nastri',          correct: 'Merceria' },
      { object: 'Peluche',         correct: 'Negozio di giocattoli' },
      { object: 'Buste e francobolli', correct: 'Post office' },
      { object: 'Bottoni',         correct: 'Merceria' },
      { object: 'Tazza da tè',     correct: 'Tea room' },
      { object: 'Puzzle',          correct: 'Negozio di giocattoli' },
      { object: 'Mazzo di rose',   correct: 'Fioreria' },
      { object: 'Carta da lettere',correct: 'Post office' }
    ],
    shops: ['Merceria','Negozio di giocattoli','Post office','Tea room','Fioreria']
  },

  /* ── MANCHE 5 – BOOKCROSSING ── */
  5: {
    name: 'BOOKCROSSING',
    color: '#248287',
    splashImg: 'immagini/BOOKCROSSING.png',
    type: 'bookcrossing'
  },

  /* ── MANCHE 6 – INGRESSO DEL COTTAGE (no timbro) ── */
  6: {
    name: 'INGRESSO DEL COTTAGE',
    color: '#888888',
    splashImg: 'immagini/INGRESSO_COTTAGE.png',
    type: 'alert-only',
    alertText: 'Durante il percorso hai notato qualcosa di insolito? Qualche lettera persa lungo le vie di Little Country! Torna indietro e annotale tutte, chissà… Ti potrebbero servire!',
    noStamp: true
  },

  /* ── MANCHE 7 – STANZA RICREATIVA ── */
  7: {
    name: 'STANZA RICREATIVA',
    color: '#1A2AE6',
    splashImg: 'immagini/STANZA_RICREATIVA.png',
    type: 'music-quiz',
    subtitle: 'Abbina l\'opera al compositore',
    questions: [
      {
        audio: 'audio/MUSICA_1.wav',
        options: ['Wolfgang Amadeus Mozart','Joseph Haydn','Franz Schubert','Anton Bruckner'],
        correct: 0
      },
      {
        audio: 'audio/MUSICA_2.wav',
        options: ['Ludwig van Beethoven','Johann Sebastian Bach','Richard Wagner','Johannes Brahms'],
        correct: 1
      },
      {
        audio: 'audio/MUSICA_3.wav',
        options: ['Giuseppe Verdi','Gioachino Rossini','Antonio Vivaldi','Claudio Monteverdi'],
        correct: 2
      },
      {
        audio: 'audio/MUSICA_4.wav',
        options: ['Rimsky Korsakov','Claude Debussy','Hector Berlioz','Camille Saint-Saëns'],
        correct: 0
      }
    ]
  },

  /* ── MANCHE 8 – SALOTTO ── */
  8: {
    name: 'SALOTTO',
    color: '#89C689',
    splashImg: 'immagini/SALOTTO.png',
    type: 'multi-choice',
    subtitle: 'Giornali dal mondo!',
    questions: [
      {
        q: 'El Mundo appartiene a:',
        options: ['UK','Spagna','USA','Francia'],
        correct: 1
      },
      {
        q: 'Financial Times appartiene a:',
        options: ['UK','Spagna','USA','Germania'],
        correct: 0
      },
      {
        q: 'The Guardian appartiene a:',
        options: ['USA','UK','Spagna','Francia'],
        correct: 1
      },
      {
        q: 'Vogue appartiene a:',
        options: ['UK','Francia','USA','Spagna'],
        correct: 2
      }
    ]
  },

  /* ── MANCHE 9 – STANZA DEL CUSTODE ── */
  9: {
    name: 'STANZA DEL CUSTODE',
    color: '#00A4AC',
    splashImg: 'immagini/STANZA_CUSTODE.png',
    type: 'multi-choice',
    subtitle: 'L\'inventario del castello',
    questions: [
      {
        q: 'Quante sedie con stemma araldico sono presenti nella Great Hall?',
        options: ['10','12','14','16'],
        correct: 1
      },
      {
        q: 'Quanti volumi catalogati ci sono nella Library?',
        options: ['400','405','412','420'],
        correct: 2
      },
      {
        q: 'Quanti manoscritti miniati sono conservati nella Library?',
        options: ['3','5','7','10'],
        correct: 1
      },
      {
        q: 'Di che materiale è il tavolo centrale nella Great Hall?',
        options: ['Rovere','Noce','Quercia','Mogano'],
        correct: 2
      },
      {
        q: 'Quanti pezzi compongono il servizio d\'argento nella Dining Hall?',
        options: ['60','68','72','75'],
        correct: 2
      },
      {
        q: 'Quanti ritratti di famiglia sono catalogati e assicurati tra gli oggetti di valore?',
        options: ['12','14','16','18'],
        correct: 1
      },
      {
        q: 'Quale anno è indicato come aggiornamento dell\'impianto di illuminazione nella Great Hall?',
        options: ['1985','1990','1998','2000'],
        correct: 2
      },
      {
        q: 'Quanti pezzi compongono il servizio bicchieri in cristallo molato nella Dining Hall?',
        options: ['Non specificato','72','60','50'],
        correct: 0
      },
      {
        q: 'Quanti manoscritti miniati sono conservati in teca climatizzata?',
        options: ['3','5','7','10'],
        correct: 1
      },
      {
        q: 'Dove è conservato il Galateo di Monsignor della Casa?',
        options: [
          'Tavolo della Dining Hall',
          'Leggio in rovere nella Library',
          'Scrivania in Master Apartments',
          'Credenza nella Dining Hall'
        ],
        correct: 1
      }
    ]
  },

  /* ── MANCHE 10 – CASTELLO DI LADY ELEONORA ── */
  10: {
    name: 'CASTELLO DI LADY ELEONORA',
    color: '#003EAC',
    splashImg: 'immagini/CASTELLO.png',
    type: 'frase',
    introText: `Se stai leggendo queste righe, significa che sei curioso abbastanza da salire fin qui. Bravo. Non tutti hanno il coraggio di ascoltare il silenzio di luoghi dimenticati e di fare scale su scale per poterli raggiungere. Io sono Charlie, il poeta sognatore, costruttore di barche e cercatore di parole alate e questo è il mio diario. Lo consegno a te e alla tua memoria, insieme alla scatola che trovi in valigia.\n\nda Mrs. Rose Bear alla ricerca delle parole perdute`,
    prompt: 'Hai raccolto tutte le lettere sparse in giro per il percorso? Se sì, ricomponi la frase aggiungendo gli spazi mancanti.',
    correctFrase: 'A CHI AMA LE PAROLE BELLE, LA GENTILEZZA E LA MAGIA.\nA TE'
  }
};

/* ═══════════════════════════════════════════════
   2. STATO APPLICAZIONE
═══════════════════════════════════════════════ */
const State = {
  nickname: '',
  photoDataUrl: '',
  stampsEarned: [],      // array di numeri manche (es. [1,2,3])
  mancheCompleted: [],   // tutte le manche superate
  fioriParola: '',       // lettere accumulate manche 6
  bookcrossing: { prendo: [], lascio: [] },
  manche6Unlocked: false,

  load() {
    try {
      const saved = localStorage.getItem('mrb_state');
      if (saved) Object.assign(this, JSON.parse(saved));
    } catch(e) { /* ignora */ }
  },

  save() {
    try {
      localStorage.setItem('mrb_state', JSON.stringify({
        nickname: this.nickname,
        photoDataUrl: this.photoDataUrl,
        stampsEarned: this.stampsEarned,
        mancheCompleted: this.mancheCompleted,
        fioriParola: this.fioriParola,
        bookcrossing: this.bookcrossing,
        manche6Unlocked: this.manche6Unlocked
      }));
    } catch(e) { /* ignora */ }
  },

  hasStamp(n) { return this.stampsEarned.includes(Number(n)); },
  
  earnStamp(n) {
    n = Number(n);
    if (!this.stampsEarned.includes(n)) {
      this.stampsEarned.push(n);
      this.save();
    }
  },

  completeManche(n) {
    n = Number(n);
    if (!this.mancheCompleted.includes(n)) {
      this.mancheCompleted.push(n);
      this.save();
    }
  }
};

/* ═══════════════════════════════════════════════
   3. AUDIO
═══════════════════════════════════════════════ */
const Audio = {
  _cache: {},
  play(file, loop = false) {
    try {
      if (!this._cache[file]) {
        this._cache[file] = new window.Audio(file);
      }
      const a = this._cache[file];
      a.loop = loop;
      a.currentTime = 0;
      a.play().catch(() => {});
      return a;
    } catch(e) { return null; }
  },
  stop(file) {
    try {
      if (this._cache[file]) {
        this._cache[file].pause();
        this._cache[file].currentTime = 0;
      }
    } catch(e) {}
  },
  passport()   { this.play('audio/PASSAPORTO.wav'); },
  stamp()      { this.play('audio/TIMBRO.wav'); },
  pagine()     { this.play('audio/PAGINE.wav'); },
  giusto()     { this.play('audio/GIUSTO.wav'); },
  sbagliato()  { this.play('audio/SBAGLIATO.wav'); },
  alert()      { this.play('audio/ALERT.wav'); },
  vittoria()   { this.play('audio/VITTORIA.wav'); }
};

/* ═══════════════════════════════════════════════
   4. ROUTER / SCREEN MANAGER
═══════════════════════════════════════════════ */
const Router = {
  currentScreen: null,

  show(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const el = document.getElementById(screenId);
    if (el) el.classList.remove('hidden');
    this.currentScreen = screenId;
  }
};

/* ═══════════════════════════════════════════════
   5. INIT
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  State.load();

  // Mostra overlay istruzioni se è il primo avvio (o sempre, come da GDD)
  const overlayInstr = document.getElementById('overlay-instructions');
  overlayInstr.classList.remove('hidden');

  // Chiudi istruzioni
  document.getElementById('btn-close-instructions').addEventListener('click', () => {
    overlayInstr.classList.add('hidden');
    initHome();
  });

  // Setup header
  updateHeader();

  // Leggi parametro URL ?manche=X
  const params = new URLSearchParams(window.location.search);
  const mancheParam = params.get('manche');

  if (mancheParam && State.nickname) {
    // Utente già registrato, vai direttamente alla manche
    Router.show('screen-manche');
    showHeader();
    showBottomNav();
    loadManche(parseInt(mancheParam, 10));
  } else if (State.nickname) {
    // Utente già registrato, mostra home semplificata
    Router.show('screen-home');
    showHeader();
    showBottomNav();
    document.getElementById('home-form').classList.add('hidden');
    document.getElementById('home-photo-section').classList.add('hidden');
    document.getElementById('home-passport-btn-wrap').classList.remove('hidden');
  } else {
    Router.show('screen-home');
  }

  setupHomeEvents();
  setupNavEvents();
  setupPassportEvents();
  setupFioriParolaEvents();
  setupScannerEvents();
  setupEndEvents();
});

/* ═══════════════════════════════════════════════
   6. HOME
═══════════════════════════════════════════════ */
function initHome() {
  Router.show('screen-home');
  if (State.nickname) {
    document.getElementById('home-form').classList.add('hidden');
    document.getElementById('home-photo-section').classList.add('hidden');
    document.getElementById('home-passport-btn-wrap').classList.remove('hidden');
    showHeader();
    showBottomNav();
  }
}

function setupHomeEvents() {
  const btnPlay = document.getElementById('btn-play');
  const inputNick = document.getElementById('input-nickname');
  const photoSection = document.getElementById('home-photo-section');
  const btnTakePhoto = document.getElementById('btn-take-photo');
  const inputPhoto = document.getElementById('input-photo');
  const passportBtnWrap = document.getElementById('home-passport-btn-wrap');

  btnPlay.addEventListener('click', () => {
    const nick = inputNick.value.trim();
    if (!nick) { inputNick.focus(); inputNick.style.border = '2px solid #ff4040'; return; }
    inputNick.style.border = '';
    State.nickname = nick;
    State.save();
    updateHeader();
    showHeader();
    showBottomNav();
    document.getElementById('home-form').classList.add('hidden');
    photoSection.classList.remove('hidden');
    passportBtnWrap.classList.remove('hidden');
  });

  btnTakePhoto.addEventListener('click', () => { inputPhoto.click(); });

  inputPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      State.photoDataUrl = ev.target.result;
      State.save();
      updateHeader();
      // Mostra foto nell'header
      const img = document.getElementById('header-photo');
      img.src = State.photoDataUrl;
      img.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('btn-open-passport-home').addEventListener('click', () => {
    openPassport();
  });
}

/* ═══════════════════════════════════════════════
   7. HEADER
═══════════════════════════════════════════════ */
function updateHeader() {
  document.getElementById('header-nickname').textContent = State.nickname || '';
  if (State.photoDataUrl) {
    const img = document.getElementById('header-photo');
    img.src = State.photoDataUrl;
    img.classList.remove('hidden');
  }
}
function showHeader() { document.getElementById('app-header').classList.remove('hidden'); }
function showBottomNav() { document.getElementById('bottom-nav').classList.remove('hidden'); }

/* ═══════════════════════════════════════════════
   8. BOTTOM NAV
═══════════════════════════════════════════════ */
function setupNavEvents() {
  document.getElementById('nav-passport').addEventListener('click', openPassport);
  document.getElementById('nav-scanner').addEventListener('click', openScanner);
  document.getElementById('nav-fioriparola').addEventListener('click', () => {
    document.getElementById('overlay-fioriparola').classList.remove('hidden');
  });
}

function showFioriParolaBtn() {
  document.getElementById('nav-fioriparola').classList.remove('hidden');
}

/* ═══════════════════════════════════════════════
   9. PASSAPORTO
═══════════════════════════════════════════════ */
let passportCurrentPage = 0; // 0=copertina, 1-3=pagine
const PASSPORT_PAGES = ['passport-cover','passport-page-1','passport-page-2','passport-page-3'];

function openPassport() {
  if (!State.nickname) return;
  Audio.passport();
  updatePassportUI();

  // Apri alla pagina più avanzata
  const maxStamp = State.stampsEarned.length;
  if (maxStamp === 0) passportCurrentPage = 0;
  else if (maxStamp <= 3) passportCurrentPage = 1;
  else if (maxStamp <= 6) passportCurrentPage = 2;
  else passportCurrentPage = 3;

  renderPassportPage();
  document.getElementById('screen-passport').classList.remove('hidden');
}

function updatePassportUI() {
  // Copertina
  document.getElementById('passport-cover-name').textContent = State.nickname;
  if (State.photoDataUrl) {
    const img = document.getElementById('passport-photo-img');
    img.src = State.photoDataUrl;
    img.classList.remove('hidden');
  }

  // Timbri
  const allStampIds = [1,2,3,4,5,7,8,9,10];
  allStampIds.forEach(id => {
    const el = document.getElementById(`pstamp-${id}`);
    if (!el) return;
    const img = el.querySelector('.stamp-img');
    if (State.hasStamp(id)) {
      img.classList.remove('locked');
      img.classList.add('earned');
    } else {
      img.classList.add('locked');
      img.classList.remove('earned');
    }
  });
}

function renderPassportPage() {
  PASSPORT_PAGES.forEach((pid, i) => {
    const el = document.getElementById(pid);
    if (el) {
      if (i === passportCurrentPage) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  });
  const indicator = document.getElementById('passport-page-indicator');
  const labels = ['Copertina', 'Pagina 1', 'Pagina 2', 'Pagina 3'];
  indicator.textContent = labels[passportCurrentPage] || '';
}

function setupPassportEvents() {
  document.getElementById('btn-close-passport').addEventListener('click', () => {
    document.getElementById('screen-passport').classList.add('hidden');
  });

  document.getElementById('passport-prev').addEventListener('click', () => {
    if (passportCurrentPage > 0) {
      passportCurrentPage--;
      Audio.pagine();
      renderPassportPage();
    }
  });

  document.getElementById('passport-next').addEventListener('click', () => {
    if (passportCurrentPage < PASSPORT_PAGES.length - 1) {
      passportCurrentPage++;
      Audio.pagine();
      renderPassportPage();
    }
  });
}

/* ═══════════════════════════════════════════════
   10. FIORI-PAROLA
═══════════════════════════════════════════════ */
function setupFioriParolaEvents() {
  const input = document.getElementById('fioriparola-input');
  const btnAdd = document.getElementById('btn-add-letter');
  const btnReset = document.getElementById('btn-reset-letters');
  const display = document.getElementById('fioriparola-display');

  function refreshDisplay() {
    display.textContent = State.fioriParola || '—';
  }
  refreshDisplay();

  btnAdd.addEventListener('click', () => {
    const letter = input.value.toUpperCase().trim().replace(/[^A-Z]/g, '');
    if (letter) {
      State.fioriParola += letter;
      State.save();
      refreshDisplay();
      input.value = '';
      input.focus();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnAdd.click();
  });

  input.addEventListener('input', () => {
    input.value = input.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0,1);
  });

  btnReset.addEventListener('click', () => {
    if (confirm('Sicuro di voler cancellare tutte le lettere?')) {
      State.fioriParola = '';
      State.save();
      refreshDisplay();
    }
  });

  document.getElementById('btn-close-fioriparola').addEventListener('click', () => {
    document.getElementById('overlay-fioriparola').classList.add('hidden');
  });
}

/* ═══════════════════════════════════════════════
   11. QR SCANNER
═══════════════════════════════════════════════ */
let qrScanner = null;

function openScanner() {
  document.getElementById('overlay-scanner').classList.remove('hidden');
  startQRScanner();
}

function startQRScanner() {
  if (qrScanner) return;
  try {
    qrScanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: { width: 250, height: 250 }
    }, false);

    qrScanner.render((decodedText) => {
      // Cerca parametro manche nell'URL decodificato
      let mancheNum = null;
      try {
        const url = new URL(decodedText);
        mancheNum = url.searchParams.get('manche');
      } catch(e) {
        // Potrebbe essere solo un numero
        if (/^\d+$/.test(decodedText.trim())) {
          mancheNum = decodedText.trim();
        }
      }

      if (mancheNum) {
        closeScanner();
        document.getElementById('overlay-scanner').classList.add('hidden');
        if (!State.nickname) { alert('Inserisci prima il tuo nickname!'); return; }
        showHeader();
        showBottomNav();
        Router.show('screen-manche');
        loadManche(parseInt(mancheNum, 10));
      }
    }, (err) => { /* scan error silenzioso */ });
  } catch(e) {
    console.warn('QR Scanner non disponibile:', e);
  }
}

function closeScanner() {
  if (qrScanner) {
    try { qrScanner.clear(); } catch(e) {}
    qrScanner = null;
    document.getElementById('qr-reader').innerHTML = '';
  }
}

function setupScannerEvents() {
  document.getElementById('btn-close-scanner').addEventListener('click', () => {
    closeScanner();
    document.getElementById('overlay-scanner').classList.add('hidden');
  });
}

/* ═══════════════════════════════════════════════
   12. CARICAMENTO MANCHE
═══════════════════════════════════════════════ */
function loadManche(n) {
  const data = MANCHE_DATA[n];
  if (!data) {
    document.getElementById('game-area').innerHTML = `<p style="text-align:center;padding:40px">Manche ${n} non trovata.</p>`;
    return;
  }

  // Aggiorna colore manche
  const subtitle = document.getElementById('manche-subtitle');
  subtitle.textContent = `Manche ${n}: ${data.name}`;
  subtitle.style.color = data.color;
  document.getElementById('answer-feedback').classList.add('hidden');

  // Se già completata
  if (State.mancheCompleted.includes(n)) {
    document.getElementById('game-area').innerHTML = `
      <div style="text-align:center;padding:40px;opacity:.8">
        <p style="font-size:1.2rem;margin-bottom:16px">✅ Hai già completato questa manche!</p>
        ${TIMBRO_MAP[n] ? `<img src="immagini/TIMBRO_${TIMBRO_MAP[n]}.png" style="width:80px;opacity:.9" onerror="this.style.display='none'" />` : ''}
      </div>`;
    return;
  }

  // Mostra splash iniziale
  showMancheSplash(data.splashImg, () => {
    renderManche(n, data);
  });
}

function showMancheSplash(imgSrc, callback) {
  const splash = document.getElementById('manche-splash');
  const img = document.getElementById('manche-splash-img');
  img.src = imgSrc;
  splash.classList.remove('hidden');
  setTimeout(() => {
    splash.classList.add('hidden');
    callback();
  }, 3000);
}

/* ═══════════════════════════════════════════════
   13. RENDER MANCHE
═══════════════════════════════════════════════ */
function renderManche(n, data) {
  const area = document.getElementById('game-area');

  switch(data.type) {

    case 'image-quiz':
    case 'multi-choice':
    case 'music-quiz':
      renderQuizManche(n, data);
      break;

    case 'matching':
      renderMatchingManche(n, data);
      break;

    case 'bookcrossing':
      renderBookcrossing(n, data);
      break;

    case 'alert-only':
      renderManche6Alert(n, data);
      break;

    case 'frase':
      renderFrase(n, data);
      break;

    default:
      area.innerHTML = '<p>Tipo manche non supportato.</p>';
  }
}

/* ── Manche quiz generici (1, 2, 3, 7, 8, 9) ── */
function renderQuizManche(n, data) {
  const area = document.getElementById('game-area');
  let qIndex = 0;
  let currentAudio = null;

  function showQuestion() {
    if (qIndex >= data.questions.length) {
      onMancheComplete(n, data);
      return;
    }

    const q = data.questions[qIndex];
    area.innerHTML = '';

    // Titolo domanda / indicatore
    const questionWrap = document.createElement('div');
    questionWrap.className = 'quiz-question';

    const progress = document.createElement('p');
    progress.style.cssText = 'font-size:.8rem;opacity:.6;margin-bottom:8px;text-align:right';
    progress.textContent = `${qIndex + 1} / ${data.questions.length}`;
    questionWrap.appendChild(progress);

    // Immagine (Manche 1)
    if (q.img) {
      const img = document.createElement('img');
      img.src = q.img;
      img.alt = 'Fiore';
      img.onerror = () => { img.style.display = 'none'; };
      questionWrap.appendChild(img);
    }

    // Player musica (Manche 7)
    if (q.audio) {
      // Ferma audio precedente
      if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
      currentAudio = new window.Audio(q.audio);
      currentAudio.loop = true;
      currentAudio.play().catch(() => {});

      const musicArea = document.createElement('div');
      musicArea.className = 'music-player-area';
      const playBtn = document.createElement('button');
      playBtn.className = 'music-play-btn';
      playBtn.textContent = '▶';
      playBtn.onclick = () => {
        if (currentAudio.paused) { currentAudio.play().catch(() => {}); playBtn.textContent = '⏸'; }
        else { currentAudio.pause(); playBtn.textContent = '▶'; }
      };
      playBtn.textContent = '⏸';
      const hint = document.createElement('p');
      hint.className = 'music-hint';
      hint.textContent = 'Ascolta e scegli il compositore';
      musicArea.appendChild(playBtn);
      musicArea.appendChild(hint);
      questionWrap.appendChild(musicArea);
    }

    // Testo domanda
    if (q.q) {
      const qText = document.createElement('p');
      qText.style.cssText = 'font-size:1rem;line-height:1.5;margin-bottom:4px';
      qText.textContent = q.q;
      questionWrap.appendChild(qText);
    }

    area.appendChild(questionWrap);

    // Opzioni
    const optionsWrap = document.createElement('div');
    optionsWrap.className = 'quiz-options';

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = (q.q ? `${String.fromCharCode(65+i)}) ` : '') + opt;
      btn.dataset.index = i;

      btn.addEventListener('click', () => {
        // Disabilita tutti
        optionsWrap.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

        if (i === q.correct) {
          btn.classList.add('correct');
          Audio.giusto();
          if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
          showFeedback('CORRETTO ✓', true);
          setTimeout(() => {
            hideFeedback();
            qIndex++;
            showQuestion();
          }, 2000);
        } else {
          btn.classList.add('wrong');
          Audio.sbagliato();
          showFeedback('Sbagliato! Ritenta', false);
          if (currentAudio && currentAudio.paused) currentAudio.play().catch(() => {});
          // Riabilita le altre opzioni (esclusa quella sbagliata)
          setTimeout(() => {
            hideFeedback();
            optionsWrap.querySelectorAll('.quiz-option').forEach(b => {
              if (!b.classList.contains('wrong')) b.disabled = false;
            });
            // Rimuovi wrong dopo un po'
            setTimeout(() => btn.classList.remove('wrong'), 200);
          }, 1500);
        }
      });

      optionsWrap.appendChild(btn);
    });

    area.appendChild(optionsWrap);
  }

  showQuestion();
}

/* ── Manche 4 – Matching ── */
function renderMatchingManche(n, data) {
  const area = document.getElementById('game-area');
  const shops = data.shops;

  let html = `<p class="match-intro">${data.intro.replace(/\n/g,'<br>')}</p><div class="match-game">`;

  data.pairs.forEach((pair, i) => {
    const options = shops.map(s => `<option value="${s}">${s}</option>`).join('');
    html += `
      <div class="match-item" id="match-item-${i}">
        <span class="match-object-label">${pair.object}</span>
        <select class="match-select" id="match-sel-${i}">
          <option value="">Scegli…</option>
          ${options}
        </select>
      </div>`;
  });

  html += `</div>
    <button class="match-check-btn" id="btn-check-match">Verifica abbinamenti</button>`;
  area.innerHTML = html;

  document.getElementById('btn-check-match').addEventListener('click', () => {
    let allCorrect = true;
    let anyEmpty = false;

    data.pairs.forEach((pair, i) => {
      const sel = document.getElementById(`match-sel-${i}`);
      const item = document.getElementById(`match-item-${i}`);
      if (!sel.value) { anyEmpty = true; return; }

      item.classList.remove('correct-match','wrong-match');
      if (sel.value === pair.correct) {
        item.classList.add('correct-match');
        sel.disabled = true;
      } else {
        item.classList.add('wrong-match');
        allCorrect = false;
        sel.value = '';
      }
    });

    if (anyEmpty) { showFeedback('Completa tutti gli abbinamenti!', false); Audio.sbagliato(); return; }

    if (allCorrect) {
      Audio.giusto();
      showFeedback('CORRETTO! Tutti gli abbinamenti sono giusti ✓', true);
      setTimeout(() => onMancheComplete(n, data), 2200);
    } else {
      Audio.sbagliato();
      showFeedback('Alcuni abbinamenti sono sbagliati! Ritenta', false);
      setTimeout(hideFeedback, 2000);
    }
  });
}

/* ── Manche 5 – Bookcrossing ── */
function renderBookcrossing(n, data) {
  const area = document.getElementById('game-area');
  area.innerHTML = `
    <div class="bookcrossing-container">
      <div class="bookshelf" id="shelf-prendo">
        <h3>📚 Cosa prendo</h3>
        <div class="bookshelf-list" id="list-prendo"></div>
      </div>
      <div class="bookshelf" id="shelf-lascio">
        <h3>📖 Cosa lascio</h3>
        <div class="bookshelf-list" id="list-lascio"></div>
      </div>
    </div>
    <div class="bookcrossing-input-row">
      <input type="text" id="bc-title" placeholder="Titolo del libro…" maxlength="80" />
      <select class="bookcrossing-shelf-select" id="bc-shelf">
        <option value="prendo">Prendo</option>
        <option value="lascio">Lascio</option>
      </select>
      <button class="bookcrossing-add-btn" id="bc-add">+ Aggiungi</button>
    </div>
    <button class="btn-primary" id="bc-done" style="margin-top:16px;width:100%">Ho finito ✓</button>
  `;

  // Carica libri salvati
  function refreshLists() {
    const listP = document.getElementById('list-prendo');
    const listL = document.getElementById('list-lascio');
    listP.innerHTML = State.bookcrossing.prendo.map(t => `<div class="book-entry">📗 ${t}</div>`).join('');
    listL.innerHTML  = State.bookcrossing.lascio.map(t => `<div class="book-entry">📕 ${t}</div>`).join('');
  }
  refreshLists();

  document.getElementById('bc-add').addEventListener('click', () => {
    const title = document.getElementById('bc-title').value.trim();
    const shelf = document.getElementById('bc-shelf').value;
    if (!title) return;
    State.bookcrossing[shelf].push(title);
    State.save();
    document.getElementById('bc-title').value = '';
    refreshLists();
    showFeedback('Libro aggiunto! 📚', true);
    setTimeout(hideFeedback, 1500);
  });

  document.getElementById('bc-done').addEventListener('click', () => {
    Audio.giusto();
    onMancheComplete(n, data);
  });
}

/* ── Manche 6 – Alert Only ── */
function renderManche6Alert(n, data) {
  Audio.alert();
  // Crea overlay alert
  const alertEl = document.createElement('div');
  alertEl.className = 'manche6-alert';
  alertEl.innerHTML = `
    <div class="manche6-alert-inner">
      <p class="manche6-alert-text">${data.alertText}</p>
      <button class="manche6-ok-btn">Ho capito!</button>
    </div>`;
  document.body.appendChild(alertEl);

  alertEl.querySelector('button').addEventListener('click', () => {
    alertEl.remove();
    State.manche6Unlocked = true;
    State.completeManche(6);
    State.save();
    showFioriParolaBtn();
    // Non dà timbro (manche 6 = noStamp)
    document.getElementById('game-area').innerHTML = `
      <div style="text-align:center;padding:40px">
        <p style="font-size:1.1rem;margin-bottom:16px">🌸 Il pulsante FIORI-PAROLA è ora attivo!</p>
        <p style="opacity:.75">Usa il pulsante in basso per annotare le lettere che trovi lungo il percorso.</p>
      </div>`;
  });
}

/* ── Manche 10 – Ricomponi la frase ── */
function renderFrase(n, data) {
  const area = document.getElementById('game-area');

  // Recupera le lettere salvate dalla manche 6
  const letters = State.fioriParola || '';

  area.innerHTML = `
    <div class="frase-intro-text">${data.introText.replace(/\n/g,'<br>')}</div>
    <p style="margin-bottom:12px;opacity:.85">${data.prompt}</p>
    <div class="frase-display" id="frase-display">${letters || '(nessuna lettera raccolta)'}</div>
    <p style="font-size:.85rem;opacity:.6;margin-bottom:12px">Aggiungi gli spazi per formare la frase corretta:</p>
    <div class="frase-input-row">
      <input type="text" class="frase-input" id="frase-input"
        placeholder="A CHI AMA LE PAROLE BELLE…"
        value="${letters}" style="text-transform:uppercase" />
    </div>
    <button class="frase-invia-btn" id="btn-invia-frase">INVIA</button>
  `;

  document.getElementById('frase-input').addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
  });

  document.getElementById('btn-invia-frase').addEventListener('click', () => {
    const val = document.getElementById('frase-input').value.trim().toUpperCase();
    // Normalizza per confronto (rimuove spazi/punteggiatura extra)
    const normalize = (s) => s.replace(/\s+/g,' ').replace(/[\r\n]+/g,'\n').trim();
    const correct1 = normalize('A CHI AMA LE PAROLE BELLE, LA GENTILEZZA E LA MAGIA. A TE');
    const correct2 = normalize('A CHI AMA LE PAROLE BELLE, LA GENTILEZZA E LA MAGIA.\nA TE');

    const inputNorm = normalize(val);

    if (inputNorm === normalize(correct1) || inputNorm === normalize(correct2) ||
        inputNorm.replace(/[^A-Z]/g,'') === 'ACHIAMALEPAOLLEBLELLAGENTILEZZAELAM AGIAA TE'.replace(/[^A-Z]/g,'') ||
        // Confronto flessibile: rimuovi tutto tranne lettere
        inputNorm.replace(/[^A-Z]/g,'') === 'ACHIAMALEPAOLLEBELLELLAGENTILEZZAELAMAGIAATE'.replace(/[^A-Z]/g,'') ||
        inputNorm.replace(/[^A-Z]/g,'') === 'ACHIAMALEPAROLLEBELLELLAGENTILEZZAELAMAGIAATE'.replace(/[^A-Z]/g,'') ||
        inputNorm.replace(/[^A-Z]/g,'') === 'ACHIAMALEPAROLLEBELLELLAGENTILEZZAELAMAGIAATE') {
      Audio.vittoria();
      showFeedback('VITTORIA! 🎉 La frase è corretta!', true);
      setTimeout(() => onMancheComplete(n, data), 2500);
    } else {
      // Confronto più tollerante: solo lettere
      const inputLetters = val.replace(/[^A-Z]/g,'');
      const targetLetters = 'ACHIAMALEPAROLLEBELLELLAGENTILEZZAELAMAGIAAATE'.replace(/[^A-Z]/g,'');
      // Secondo tentativo con le lettere esatte del GDD
      const targetGDD = 'ACHIAMALEPAROLLEBELLELLAGENTILEZZAELAMAGIAATE';
      if (inputLetters === targetGDD || inputLetters.length > 0 && targetGDD.startsWith(inputLetters) && inputLetters.length > targetGDD.length - 3) {
        Audio.vittoria();
        showFeedback('VITTORIA! 🎉', true);
        setTimeout(() => onMancheComplete(n, data), 2500);
      } else {
        Audio.sbagliato();
        showFeedback('Sbagliato! La frase non è completa. Ritenta', false);
        setTimeout(hideFeedback, 2500);
      }
    }
  });
}

/* ═══════════════════════════════════════════════
   14. COMPLETAMENTO MANCHE
═══════════════════════════════════════════════ */
function onMancheComplete(n, data) {
  State.completeManche(n);

  if (!data.noStamp && TIMBRO_MAP[n]) {
    State.earnStamp(n);
    Audio.stamp();
    showStampToast(n);
  }

  // Manche 6: mostra pulsante fiori-parola
  if (n === 6) {
    State.manche6Unlocked = true;
    State.save();
    showFioriParolaBtn();
  }

  // Manche 10: fine gioco
  if (n === 10) {
    setTimeout(() => showEndGame(), 3000);
    return;
  }

  // Mostra messaggio completamento
  const area = document.getElementById('game-area');
  area.innerHTML = `
    <div style="text-align:center;padding:40px;animation:feedbackPop .4s ease">
      ${TIMBRO_MAP[n] ? `<img src="immagini/TIMBRO_${TIMBRO_MAP[n]}.png" style="width:90px;margin-bottom:16px" onerror="this.style.display='none'" />` : ''}
      <p style="font-size:1.2rem;font-weight:bold;margin-bottom:8px">🎉 Manche completata!</p>
      <p style="opacity:.75;font-size:.9rem">Torna all'esposizione per la prossima tappa!</p>
      <button class="btn-secondary" id="btn-view-passport-after" style="margin-top:16px">
        Vedi il tuo Passaporto
      </button>
    </div>`;

  document.getElementById('btn-view-passport-after').addEventListener('click', openPassport);
}

function showStampToast(n) {
  const names = {
    1:'Maestro di Cucito',2:'Farina e Lievito',3:'Insegnante provetto',
    4:'Super aiutante',5:'Lettore di storie',7:'Musicofilo doc',
    8:'Dottor Giornalaio',9:'Mitico Custode',10:'Persona dal cuore d\'oro'
  };
  const toast = document.createElement('div');
  toast.className = 'timbro-earned-toast';
  toast.innerHTML = `🏅 Timbro acquisito:<br><strong>${names[n] || ''}</strong>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/* ═══════════════════════════════════════════════
   15. FEEDBACK RISPOSTA
═══════════════════════════════════════════════ */
function showFeedback(msg, correct) {
  const fb = document.getElementById('answer-feedback');
  fb.textContent = msg;
  fb.className = 'answer-feedback ' + (correct ? 'feedback-correct' : 'feedback-wrong');
  fb.classList.remove('hidden');
}
function hideFeedback() {
  document.getElementById('answer-feedback').classList.add('hidden');
}

/* ═══════════════════════════════════════════════
   16. FINE GIOCO & COLLAGE
═══════════════════════════════════════════════ */
function showEndGame() {
  Router.show('screen-home'); // nascondi manche
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById('overlay-end').classList.remove('hidden');
}

function setupEndEvents() {
  document.getElementById('btn-end-passport').addEventListener('click', () => {
    document.getElementById('overlay-end').classList.add('hidden');
    updatePassportUI();
    passportCurrentPage = 0;
    renderPassportPage();
    document.getElementById('screen-passport').classList.remove('hidden');
  });

  document.getElementById('btn-collage').addEventListener('click', () => {
    generateCollage();
  });

  document.getElementById('btn-exit').addEventListener('click', () => {
    // Dissolvi e chiudi
    document.body.style.transition = 'opacity 1.5s ease';
    document.body.style.opacity = '0';
    setTimeout(() => { window.close(); document.body.innerHTML = ''; }, 1600);
  });
}

async function generateCollage() {
  const canvas = document.getElementById('collage-canvas');
  const ctx = canvas.getContext('2d');

  const W = 800, H = 1100;
  canvas.width = W;
  canvas.height = H;

  // Sfondo
  ctx.fillStyle = '#19495F';
  ctx.fillRect(0, 0, W, H);

  // Helper: carica immagine
  function loadImg(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  // Copertina passaporto
  const cover = await loadImg('immagini/COPERTINA.png');
  if (cover) ctx.drawImage(cover, 20, 20, 360, 260);
  else {
    ctx.fillStyle = 'rgba(255,255,255,.15)';
    ctx.roundRect(20, 20, 360, 260, 10);
    ctx.fill();
  }

  // Foto visitatore (fototessera)
  if (State.photoDataUrl) {
    const photo = await loadImg(State.photoDataUrl);
    if (photo) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(30, 30, 100, 120, 6);
      ctx.clip();
      ctx.drawImage(photo, 30, 30, 100, 120);
      ctx.restore();
    }
  }

  // Nickname sulla copertina
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px Georgia';
  ctx.textAlign = 'center';
  ctx.fillText(State.nickname, 200, 240);

  // Titolo copertina
  ctx.font = '14px Georgia';
  ctx.fillStyle = 'rgba(255,255,255,.7)';
  ctx.fillText('Il Visitor Passport di', 200, 220);

  // Pagine passaporto con timbri
  const pageBg = await loadImg('immagini/PAGINA_PASSAPORTO.png');
  const pageAreas = [{x:400,y:20},{x:20,y:300},{x:400,y:300}];
  const stampsGroups = [[1,2,3],[4,5,7],[8,9,10]];

  for (let p = 0; p < 3; p++) {
    const {x, y} = pageAreas[p];
    // Sfondo pagina
    if (pageBg) {
      ctx.globalAlpha = 0.3;
      ctx.drawImage(pageBg, x, y, 360, 240);
      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = 'rgba(245,237,224,.12)';
      ctx.roundRect(x, y, 360, 240, 8);
      ctx.fill();
    }

    const stamps = stampsGroups[p];
    for (let s = 0; s < stamps.length; s++) {
      const stampId = stamps[s];
      const stampImg = await loadImg(`immagini/TIMBRO_${stampId}.png`);
      const sx = x + 14;
      const sy = y + 14 + s * 72;
      if (stampImg) {
        if (!State.hasStamp(stampId)) {
          ctx.globalAlpha = 0.2;
          ctx.filter = 'grayscale(100%)';
        }
        ctx.drawImage(stampImg, sx, sy, 60, 60);
        ctx.globalAlpha = 1;
        ctx.filter = 'none';
      }
    }
  }

  // Watermark
  ctx.fillStyle = 'rgba(255,255,255,.6)';
  ctx.font = '13px Georgia';
  ctx.textAlign = 'right';
  ctx.fillText('A casa di Mrs. Rose Bear 2.0', W - 16, H - 12);

  // Mostra canvas e link download
  canvas.classList.remove('hidden');
  const link = document.getElementById('collage-download');
  link.href = canvas.toDataURL('image/png');
  link.classList.remove('hidden');

  // Mostra pulsante esci dopo download
  link.addEventListener('click', () => {
    setTimeout(() => {
      document.getElementById('end-dissolve').classList.remove('hidden');
    }, 1000);
  }, { once: true });
}

/* ═══════════════════════════════════════════════
   17. GESTIONE URL MANCHE AL CARICAMENTO
═══════════════════════════════════════════════ */
// Attivazione fiori-parola se già sbloccata
if (State.manche6Unlocked) {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showFioriParolaBtn, 500);
  });
}
