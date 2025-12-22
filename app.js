let currentLang = "pl";

const keySound = new Audio("button-click-sound.mp3");
keySound.volume = 0.3;

const input = document.getElementById("input");
const output = document.getElementById("output");

/* Zawartość w obu językach */
const content = {
    pl: {
        boot: [
            "BOOTING SAMURAI SYSTEM...",
            "CONNECTING TO NIGHT CITY NET...",
            "BYPASSING SECURITY...",
            "ACCESS GRANTED",
            "",
            "Wpisz 'help' aby zobaczyć komendy.",
            "Type 'help' to list commands."
        ],
        help: `
KOMENDY:
help / ls        - lista danych
history          - historia SAMURAI
johnny / whoami  - Johnny Silverhand
quotes           - cytaty
tracks           - utwory
manifest         - manifest
hack arasaka     - atak
open archive     - otwórz archiwum zespołu
clear / cls      - wyczyść terminal
lang pl / lang en - zmiana języka
`,
        history: `SAMURAI to legendarny zespół punk-rockowy Night City...`,
        johnny: `JOHNNY SILVERHAND\nFrontman SAMURAI.\nWróg Arasaki.`,
        quotes: `"Muzyka to broń."\n"Nie chcę świata, który mnie posiada."`,
        tracks: `-🎸 Chippin’ In\n- 🎸 Never Fade Away\n-  🎸 Black Dog\n- 🎸 Archangel\n- 🎸 The Ballad of Buck Ravers\n- `,
        manifest: `NIE JESTEŚMY PRODUKTEM.\nBUNT JEST TOŻSAMOŚCIĄ.`,
        hackStart: "ŁĄCZENIE Z ARASAKA...",
        hackEnd: "WYKRYTO INTRUZA. UCIEKAJ.",
        ls: "archive  manifesto  tracks  rebellion\n",
        whoami: "Jesteś duchem buntu. SAMURAI never fades.\n"
    },
    en: {
        boot: [
            "BOOTING SAMURAI SYSTEM...",
            "CONNECTING TO NIGHT CITY NET...",
            "BYPASSING SECURITY...",
            "ACCESS GRANTED",
            "",
            "Type 'help' to list commands."
        ],
        help: `
COMMANDS:
help / ls        - list data
history          - SAMURAI history
johnny / whoami  - Johnny Silverhand
quotes           - quotes
tracks           - tracks
manifest         - manifesto
hack arasaka     - attack
open archive     - open band archive
clear / cls      - clear terminal
lang pl / lang en - change language
`,
        history: `SAMURAI was a legendary punk rock band...`,
        johnny: `JOHNNY SILVERHAND\nFrontman of SAMURAI.\nEnemy of Arasaka.`,
        quotes: `"Music is a weapon."\n"I don’t want a world that owns me."`,
        tracks: `-🎸 Chippin’ In\n- 🎸 Never Fade Away\n-  🎸 Black Dog\n- 🎸 Archangel\n- 🎸 The Ballad of Buck Ravers\n-`,
        manifest: `WE ARE NOT A PRODUCT.\nREBELLION IS IDENTITY.`,
        hackStart: "CONNECTING TO ARASAKA...",
        hackEnd: "INTRUSION DETECTED. RUN.",
        ls: "archive  manifesto  tracks  rebellion\n",
        whoami: "You are the ghost of rebellion. SAMURAI never fades.\n"
    }
};

/* BOOT ANIMATION */
function bootSystem() {
    output.innerText = "";
    let i = 0;
    const lines = content[currentLang].boot;
    const interval = setInterval(() => {
        output.innerText += lines[i] + "\n";
        i++;
        if (i >= lines.length) clearInterval(interval);
        output.scrollTop = output.scrollHeight;
    }, 400);
}

bootSystem();

/* KEY SOUND */
input.addEventListener("keydown", () => {
    keySound.currentTime = 0;
    keySound.play();
});

/* COMMAND HANDLER */
input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        const cmd = input.value.trim().toLowerCase();
        output.innerText += `samurai@nc:~$ ${cmd}\n`;
        input.value = "";
        handle(cmd);
        output.scrollTop = output.scrollHeight;
    }
});

function handle(cmd) {
    const c = content[currentLang];

    if (["help", "ls"].includes(cmd)) output.innerText += cmd === "ls" ? c.ls : c.help;
    else if (cmd === "history") output.innerText += c.history;
    else if (["johnny", "whoami"].includes(cmd)) output.innerText += c.johnny;
    else if (cmd === "quotes") output.innerText += c.quotes;
    else if (cmd === "tracks") output.innerText += c.tracks;
    else if (cmd === "manifest") output.innerText += c.manifest;
    else if (["clear", "cls"].includes(cmd)) output.innerText = "";
    else if (cmd === "hack arasaka") hack();
    else if (cmd === "open archive") openArchive();
    else if (cmd === "lang pl") switchLang("pl");
    else if (cmd === "lang en") switchLang("en");
    else output.innerText += currentLang === "pl" ? "Nieznana komenda\n" : "Unknown command\n";
}

/* HACK FUNCTION */
function hack() {
    const c = content[currentLang];
    output.innerText += c.hackStart + "\n";
    output.classList.add("glitch");
    setTimeout(() => {
        output.innerText += c.hackEnd + "\n";
        output.classList.remove("glitch");
    }, 2000);
}

/* OPEN ARCHIVE */
function openArchive() {
    output.classList.add("glitch");

    output.innerText += currentLang === "pl"
        ? "OTWIERANIE ARCHIWUM SAMURAI...\nDOSTĘP PRZYZNANY.\n"
        : "OPENING SAMURAI ARCHIVE...\nACCESS GRANTED.\n";

    setTimeout(() => {
        output.classList.remove("glitch");
        window.open("../archive/arch.html", "_blank");
    }, 1400);
}

/* LANGUAGE SWITCH */
function switchLang(lang) {
    currentLang = lang;
    output.innerText += lang === "pl"
        ? "Język ustawiony na POLSKI.\n"
        : "Language set to ENGLISH.\n";
}
