const container = document.getElementById("game-container");

// Funzione helper per creare elementi
function createElement(tag, options = {}) {
    const el = document.createElement(tag);
    for (const key in options) {
        if (key === "class") el.className = options[key];
        else if (key === "innerHTML") el.innerHTML = options[key];
        else el.setAttribute(key, options[key]);
    }
    return el;
}

// =======================
// HOME PAGE
// =======================
function showHomePage() {
    container.innerHTML = "";
    const bg = createElement("div", {class:"home-bg"});
    const title = createElement("h1", {innerHTML:"A casa di Mrs. Rose Bear 2.0", class:"title"});
    const roseImg = createElement("img", {src:"IMMAGINI/ROSE.png", class:"rose-img"});
    const instructions = createElement("div", {class:"instructions", innerHTML:`
        Benvenuto al gioco interattivo della mostra ‘A casa di Mrs. Rose Bear 2.0’, il Visitor Passport!<br>
        Rispondi correttamente alle domande per guadagnare il timbro e completare il tuo Passaporto da visitatore di Little Country.<br>
        Nelle postazioni lungo il percorso di visita troverai dei piccoli cartelli tramite cui potrai accedere alle varie manche del gioco, scannerizzando il QR-CODE o appoggiando il telefono nell’area dedicata (se il dispositivo è abilitato per la tecnologia NFC).<br>
        Buon divertimento!
    `});
    const nicknameInput = createElement("input", {placeholder:"Inserisci il tuo nickname", class:"nickname-input"});
    const playBtn = createElement("button", {innerHTML:"Gioca", class:"play-btn"});
    playBtn.onclick = () => {
        nickname = nicknameInput.value || "Visitatore";
        showHomePageUI();
    };
    container.append(bg, title, roseImg, instructions, nicknameInput, playBtn);
}

// Mostra home page dopo aver inserito nickname
function showHomePageUI() {
    container.innerHTML = "";
    const title = createElement("h1", {innerHTML:"A casa di Mrs. Rose Bear 2.0", class:"title"});
    const nick = createElement("div", {innerHTML:nickname, class:"nickname"});
    const photoBtn = createElement("button", {innerHTML:"Scatta una foto", class:"photo-btn"});
    photoBtn.onclick = () => {
        // Mock foto, salva un placeholder
        fotoData = "immagini/COPERTINA.png";
        alert("Foto salvata!");
    };
    const passBtn = createElement("button", {innerHTML:"Apri il Passaporto", class:"pass-btn"});
    passBtn.onclick = () => showPassaporto();
    container.append(title, nick, photoBtn, passBtn);
}

// =======================
// PASSAPORTO
// =======================
function showPassaporto() {
    container.innerHTML = "";
    suoni.passaporto.play();
    const pass = createElement("div", {class:"passaporto"});
    const cover = createElement("img", {src:"immagini/COPERTINA.png", class:"cover"});
    const nickLabel = createElement("div", {innerHTML:`Il Visitor Passport di ${nickname}`, class:"nick-pass"});
    pass.append(cover, nickLabel);
    container.append(pass);

    // Navigazione tra pagine timbri
    const left = createElement("button", {innerHTML:"<", class:"nav-pass"});
    const right = createElement("button", {innerHTML:">", class:"nav-pass"});
    left.onclick = () => { paginaPassaporto--; suoni.pagina.play(); renderPassaportoPage(); };
    right.onclick = () => { paginaPassaporto++; suoni.pagina.play(); renderPassaportoPage(); };
    container.append(left, right);

    renderPassaportoPage();
}

function renderPassaportoPage() {
    // Mostra timbri della pagina
    const page = createElement("div", {class:"page-passaporto"});
    // 3 timbri per pagina
    const start = paginaPassaporto*3;
    for(let i=start; i<start+3 && i<timbri.length; i++){
        const img = createElement("img", {src:`immagini/${timbri[i]}.png`, class:"timbro"});
        page.append(img);
    }
    container.append(page);
}

// =======================
// MANCHE
// =======================
function showManche(idx){
    mancheAttuale = idx;
    const m = manche[idx];
    container.innerHTML = "";
    const title = createElement("h2", {innerHTML:`Manche: ${m.nome}`, style:`color:${m.colore}`});
    container.append(title);
    if(m.tipo === "quiz"){
        renderQuizManche(m);
    } else if(m.tipo === "match"){
        renderMatchManche(m);
    } else if(m.tipo === "lettere"){
        renderLettereManche(m);
    } else if(m.tipo === "musica"){
        renderMusicaManche(m);
    } else if(m.tipo === "frase"){
        renderFraseFinale(m);
    }
}

// Quiz generico
function renderQuizManche(m){
    let qIndex = 0;
    const showQuestion = () => {
        container.innerHTML = "";
        const q = m.domande[qIndex];
        const qText = createElement("div", {innerHTML:q.testo, class:"question"});
        container.append(qText);
        q.opzioni.forEach((opt,i)=>{
            const btn = createElement("button",{innerHTML:opt});
            btn.onclick = ()=>{
                if(i === q.risposta){
                    suoni.giusto.play();
                    alert("CORRETTO!");
                    qIndex++;
                    if(qIndex < m.domande.length){
                        showQuestion();
                    } else {
                        timbri.push(`TIMBRO_${mancheAttuale+1}.png`);
                        suoni.timbro.play();
                        showHomePageUI();
                    }
                } else {
                    suoni.sbagliato.play();
                    alert("Sbagliato! Ritenta");
                }
            };
            container.append(btn);
        });
    };
    showQuestion();
}

// Matching generico
function renderMatchManche(m){
    const instructions = createElement("div", {innerHTML:"Abbina ogni oggetto al negozio corretto"});
    container.append(instructions);
    m.domande.forEach(item=>{
        const div = createElement("div",{innerHTML:`${item.oggetto}: `});
        const select = createElement("select");
        select.innerHTML = `
        <option>Seleziona</option>
        <option>Merceria</option>
        <option>Negozio di giocattoli</option>
        <option>Post office</option>
        <option>Tea room</option>
        <option>Fioreria</option>
        `;
        div.append(select);
        container.append(div);
        select.onchange = ()=>{
            if(select.value === item.negozio){
                suoni.giusto.play();
                alert("CORRETTO!");
            } else {
                suoni.sbagliato.play();
                alert("Sbagliato! Ritenta");
                select.value="Seleziona";
            }
        }
    });
    const btn = createElement("button",{innerHTML:"Termina Manche"});
    btn.onclick = ()=>{
        timbri.push(`TIMBRO_${mancheAttuale+1}.png`);
        suoni.timbro.play();
        showHomePageUI();
    };
    container.append(btn);
}

// Manche lettere
function renderLettereManche(m){
    container.innerHTML = "";
    suoni.alert.play();
    const txt = createElement("div",{innerHTML:m.testo});
    const input = createElement("input",{placeholder:"Inserisci lettere", value:lettereRaccolte});
    const btn = createElement("button",{innerHTML:"Salva"});
    btn.onclick = ()=>{
        lettereRaccolte = input.value.toUpperCase().replace(/\s/g,"");
        alert("Lettere salvate!");
        showHomePageUI();
    };
    container.append(txt,input,btn);
}

// Musica
function renderMusicaManche(m){
    let qIndex = 0;
    const playAudio = () => {
        const q = m.domande[qIndex];
        const audio = new Audio(q.audio);
        audio.play();
        container.innerHTML = "";
        q.opzioni.forEach((opt,i)=>{
            const btn = createElement("button",{innerHTML:opt});
            btn.onclick = ()=>{
                audio.pause();
                if(i === q.risposta){
                    suoni.giusto.play();
                    alert("CORRETTO!");
                    qIndex++;
                    if(qIndex < m.domande.length){
                        playAudio();
                    } else {
                        timbri.push(`TIMBRO_${mancheAttuale+1}.png`);
                        suoni.timbro.play();
                        showHomePageUI();
                    }
                } else {
                    suoni.sbagliato.play();
                    audio.play();
                }
            };
            container.append(btn);
        });
    };
    playAudio();
}

// Frase finale
function renderFraseFinale(m){
    container.innerHTML = "";
    const txt = createElement("div",{innerHTML:m.testo});
    const input = createElement("input",{placeholder:"Ricomponi la frase"});
    const btn = createElement("button",{innerHTML:"INVIA"});
    btn.onclick = ()=>{
        if(input.value.toUpperCase() === fraseCorretta){
            suoni.vittoria.play();
            alert("Frase corretta! Hai completato il gioco!");
            timbri.push(`TIMBRO_${mancheAttuale+1}.png`);
            showHomePageUI();
        } else {
            suoni.sbagliato.play();
            alert("Frase sbagliata! Ritenta");
        }
    };
    container.append(txt,input,btn);
}

// Avvio

showHomePage();

