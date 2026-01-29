# 🎮 SUDOKU Game
<!-- Intestazione principale con badge informativi -->

<div align="center">

<!-- Badge per le tecnologie utilizzate -->
![Sudoku Logo](https://img.shields.io/badge/SUDOKU-Game-blue?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Un'implementazione completa e interattiva del classico gioco Sudoku**

<!-- Link rapidi alle sezioni principali -->
[Gioca Ora](#come-giocare) • [Caratteristiche](#caratteristiche) • [Installazione](#installazione) • [Demo](#demo)

</div>



## 🎯 Descrizione
<!-- Panoramica generale del progetto -->

**SUDOKU Game** è un'applicazione web moderna e completamente funzionale del celebre puzzle logico Sudoku. Il progetto offre un'esperienza di gioco coinvolgente con interfaccia intuitiva, timer integrato con pausa, sistema di suggerimenti e sei livelli di difficoltà personalizzabili.

Il gioco implementa tutte le funzionalità essenziali di un Sudoku professionale, includendo la modalità note per appunti, sistema di undo con gestione errori, controllo automatico degli errori, rimozione intelligente delle note e una pagina dedicata alle regole del gioco con layout moderno.

---

## ✨ Caratteristiche
<!-- Elenco dettagliato delle funzionalità principali -->

### 🎲 Gameplay
<!-- Funzionalità di gioco e logica -->
- **Generazione Dinamica**: Puzzle Sudoku generati algoritmicamente con soluzione unica garantita
- **Sei Livelli di Difficoltà**: 
  - Principiante (20 celle vuote)
  - Facile (30 celle vuote)
  - Medio (40 celle vuote) - livello predefinito
  - Difficile (50 celle vuote)
  - Esperto (60 celle vuote)
  - Estremo (65 celle vuote)
- **Sistema di Suggerimenti**: 3 suggerimenti disponibili per partita
- **Modalità Note**: Inserisci numeri candidati nelle celle con rimozione automatica
- **Undo Completo**: Annulla qualsiasi mossa (numeri corretti, errati e note)
- **Gestione Errori Avanzata**: Massimo 3 errori permessi, contatore persistente anche dopo undo

### 🎨 Interfaccia Utente
<!-- Design e aspetto visuale dell'applicazione -->
- **Design Responsive**: Ottimizzato per desktop e mobile
- **Sfondo Personalizzabile**: Sfondo fisso con opzione di ripetizione
- **Palette Numeri Interattiva**: Selezione intuitiva dei numeri 1-9
- **Evidenziazione Celle**: Visualizzazione intelligente di righe, colonne e blocchi correlati
- **Feedback Visivo**: Indicatori colorati per errori e numeri completati
- **Animazioni Fluide**: Transizioni CSS moderne con messaggi persistenti (10 secondi)
- **Tema Grigio**: Schema colori grigio moderno e professionale

### ⏱️ Funzionalità Avanzate
<!-- Caratteristiche tecniche e funzioni speciali -->
- **Timer con Pausa**: 
  - Timer in tempo reale che traccia il tempo di gioco
  - Pulsante pausa/riprendi con icone dinamiche (⏸️/▶️)
  - Sfocatura della griglia durante la pausa per privacy
  - Blocco completo delle azioni durante la pausa
- **Contatore Errori Intelligente**: Visualizzazione errori con limite di 3
- **Verifica Automatica**: Controllo immediato della correttezza dei numeri inseriti
- **Rimozione Automatica Note**: Le note vengono rimosse automaticamente quando inserisci un numero nella stessa riga/colonna/blocco
- **Tracciamento Celle Fisse**: Distinzione tra numeri del puzzle e numeri inseriti dal giocatore
- **Sistema di Cronologia Completo**: Salvataggio di ogni azione per undo preciso
- **Pagina Regole Interattiva**: 
  - Layout moderno a griglia
  - Sezioni animate con effetti hover
  - Card informative con icone
  - Guida completa al gioco
- **Navigazione Tastiera**: Gioca usando numeri da tastiera

### 🎨 Design e Stile
- **Icona Personalizzata**: Favicon su entrambe le pagine (index e regole)
- **Pulsanti Minimali**: Pulsanti di controllo senza bordi e sfondo per un look pulito
- **Messaggi Prolungati**: Notifiche visibili per 10 secondi
- **Layout Bilanciato**: Timer e pulsante pausa allineati con la palette numeri

---

## 🎬 Demo
<!-- Rappresentazione visiva del gioco -->

### Screenshot
<!-- Esempio ASCII art della griglia Sudoku -->

```
┌─────────────────────────────────────────────┐
│         🎮  SUDOKU                         │
├─────────────────────────────────────────────┤
│  [Principiante][Facile][●Medio][Difficile] │
│  [Esperto][Estremo]                         │
│                                             │
│  ╔═══╤═══╤═══╦═══╤═══╤═══╦═══╤═══╤═══╗    │
│  ║ 5 │   │   ║ 3 │   │ 8 ║   │ 1 │   ║    │
│  ╟───┼───┼───╫───┼───┼───╫───┼───┼───╢    │
│  ║   │ 2 │   ║   │   │   ║ 9 │   │ 4 ║    │
│  ╟───┼───┼───╫───┼───┼───╫───┼───┼───╢    │
│  ║   │   │ 1 ║   │ 7 │   ║   │ 3 │   ║    │
│  ╠═══╪═══╪═══╬═══╪═══╪═══╬═══╪═══╪═══╣    │
│  ║   │ 8 │   ║   │   │ 2 ║   │   │ 7 ║    │
│  ╚═══╧═══╧═══╩═══╧═══╧═══╩═══╧═══╧═══╝    │
│                                             │
│  [⏸️] Timer: 05:23                          │
│  [✏️] [💡] [🗑️] [↶]                         │
│                                             │
│  Numeri: [1][2][3][4][5][6][7][8][9]       │
│  Errori: 1/3  Suggerimenti: 2/3            │
└─────────────────────────────────────────────┘
```

### Funzionalità in Azione
<!-- Checklist delle funzionalità implementate -->
- ✅ Generazione istantanea di nuovi puzzle con 6 livelli
- ✅ Inserimento numeri con click o tastiera
- ✅ Sistema di note con rimozione automatica intelligente
- ✅ Controllo errori in tempo reale con limite di 3
- ✅ Suggerimenti intelligenti (max 3)
- ✅ Timer con funzione pausa/riprendi
- ✅ Undo completo con gestione errori persistente
- ✅ Cancellazione solo numeri inseriti dal giocatore
- ✅ Pagina regole con layout moderno e interattivo
- ✅ Timer progressivo

---

## 📥 Installazione
<!-- Guida completa all'installazione e configurazione -->

### Prerequisiti
<!-- Requisiti necessari per eseguire l'applicazione -->
- Browser web moderno (Chrome, Firefox, Safari, Edge)
- Nessuna dipendenza esterna richiesta
- Nessun server necessario

### Metodo 1: Download Diretto
<!-- Clona il repository e apri il file HTML -->
```bash
git clone https://github.com/tuousername/sudoku-game.git

cd sudoku-game

start index.html
open index.html
xdg-open index.html
```

### Metodo 2: Live Server (Consigliato)
<!-- Usa un server HTTP locale per un'esperienza migliore -->
```bash
python -m http.server 8000

npx http-server

```

### Metodo 3: VS Code Live Server
<!-- Usa l'estensione Live Server di VS Code -->
1. Installa l'estensione "Live Server" in VS Code
2. Fai click destro su `index.html`
3. Seleziona "Open with Live Server"

---

## 🎮 Come Giocare
<!-- Guida completa ai controlli e alle regole -->

### Regole Base del Sudoku
<!-- Le tre regole fondamentali del gioco -->
1. **Obiettivo**: Riempire la griglia 9×9 con numeri da 1 a 9
2. **Regola della Riga**: Ogni riga deve contenere i numeri 1-9 senza ripetizioni
3. **Regola della Colonna**: Ogni colonna deve contenere i numeri 1-9 senza ripetizioni
4. **Regola del Blocco**: Ogni blocco 3×3 deve contenere i numeri 1-9 senza ripetizioni

### Controlli
<!-- Tutti i metodi di input disponibili -->

#### 🖱️ Mouse
<!-- Controlli tramite mouse -->
- **Click su Cella**: Seleziona la cella
- **Click su Numero**: Inserisce il numero nella cella selezionata
- **Doppio Click Numero**: Deseleziona il numero

#### ⌨️ Tastiera
<!-- Controlli tramite tastiera e scorciatoie -->
- **Numeri 1-9**: Inserisce il numero nella cella selezionata
- **Frecce**: Naviga tra le celle
- **Backspace / Delete**: Cancella il contenuto della cella
- **N**: Attiva/disattiva modalità note
- **H**: Richiedi suggerimento
- **U**: Annulla ultima mossa

#### 🎛️ Pulsanti Interfaccia<!-- Pulsanti disponibili nell'interfaccia grafica -->- **✏️ Modalità Nota**: Attiva la modalità appunti per candidati
- **💡 Suggerimento**: Riempie automaticamente una cella (max 3)
- **🗑️ Cancella**: Elimina il contenuto della cella selezionata
- **↶ Undo**: Annulla l'ultima mossa

---

## 📁 Struttura del Progetto
<!-- Organizzazione dei file e cartelle -->

```
SUDOKU/
│
├── 📄 index.html              # Pagina principale del gioco
├── 📄 regole.html            # Pagina delle regole
│
└── 📁 assets/
    │
    ├── 📁 css/
    │   ├── style.css         # Stili principali del gioco
    │   ├── style-regole.css  # Stili pagina regole
    │   └── README.md         # Questo file
    │
    ├── 📁 js/
    │   ├── script.js         # Logica principale del gioco (860 righe)
    │   └── script-regole.js  # Script pagina regole
    │
    ├── 📁 img/               # Immagini e icone
    ├── 📁 audio/             # Effetti sonori (futuro)
    └── 📁 video/             # Video tutorial (futuro)
```

### File Principali
<!-- Descrizione dettagliata dei file chiave -->

#### `index.html`
<!-- Pagina principale del gioco -->
- Layout principale della griglia Sudoku
- Palette numeri interattiva
- Pulsanti di controllo
- Sistema di navigazione

#### `script.js`
- Classe `SudokuGame` per la gestione del gioco
- Algoritmo di generazione puzzle
- Sistema di validazione
- Gestione eventi e interazioni
- Timer e statistiche

#### `style.css`
- Design responsive della griglia
- Animazioni e transizioni
- Temi e colori
- Layout flessibile

---

## 🛠️ Tecnologie Utilizzate
<!-- Stack tecnologico del progetto -->

### Frontend
<!-- Tecnologie frontend utilizzate -->
- **HTML5**: Struttura semantica e accessibile
- **CSS3**: 
  - Flexbox e Grid Layout
  - CSS Variables per temi
  - Animazioni e transizioni
  - Media queries per responsività
- **JavaScript (ES6+)**:
  - Programmazione orientata agli oggetti
  - Array methods e algoritmi
  - Event handling avanzato
  - DOM manipulation

### Algoritmi Implementati
<!-- Algoritmi chiave per la logica del gioco -->
- **Backtracking**: Generazione e risoluzione puzzle
- **Validazione Vincoli**: Controllo regole Sudoku
- **Randomizzazione**: Distribuzione casuale numeri
- **Ricorsione**: Riempimento griglia

---

## 🔧 Funzionalità Dettagliate

### 1. Generazione Puzzle
```javascript
- Riempimento ricorsivo con backtracking
- Validazione delle regole Sudoku
- Rimozione strategica di celle in base alla difficoltà
- Garanzia di soluzione unica
```

### 2. Sistema di Validazione
- Controllo in tempo reale durante l'inserimento
- Evidenziazione errori immediata
- Limite massimo di 3 errori per partita
- Verifica finale al completamento

### 3. Modalità Note
- Inserimento di numeri candidati multipli
- Visualizzazione in formato griglia 3×3 in ogni cella
- Cancellazione automatica al inserimento numero definitivo
- Utile per strategie avanzate

### 4. Sistema Suggerimenti
- 3 suggerimenti disponibili per partita
- Selezione casuale di celle vuote
- Inserimento automatico numero corretto
- Contatore suggerimenti rimanenti

### 5. Cronologia Mosse (Undo)
- Salvataggio di ogni mossa effettuata
- Stack per gestione cronologia
- Ripristino stato precedente
- Undo illimitato

---

## 🎯 Modalità di Gioco

### 🟢 Facile
- **Celle Riempite**: 51/81 (30 da completare)
- **Difficoltà**: ⭐ 
- **Tempo Medio**: 5-10 minuti
- **Ideale per**: Principianti

### 🟡 Medio
- **Celle Riempite**: 41/81 (40 da completare)
- **Difficoltà**: ⭐⭐⭐
- **Tempo Medio**: 10-20 minuti
- **Ideale per**: Giocatori intermedi

### 🔴 Difficile
- **Celle Riempite**: 31/81 (50 da completare)
- **Difficoltà**: ⭐⭐⭐⭐⭐
- **Tempo Medio**: 20-40 minuti
- **Ideale per**: Esperti

---

## 🚀 Sviluppo Futuro

### Funzionalità Pianificate
- [ ] 📊 Sistema di punteggio e classifiche
- [ ] 💾 Salvataggio progressi (LocalStorage)
- [ ] 🎨 Temi personalizzabili (chiaro/scuro)
- [ ] 🔊 Effetti sonori e musica di sottofondo
- [ ] 🏆 Sistema achievements e badges
- [ ] 📱 App mobile nativa (PWA)
- [ ] 🌐 Modalità multiplayer online
- [ ] 📈 Statistiche dettagliate di gioco
- [ ] 🎓 Tutorial interattivo per principianti
- [ ] 🌍 Supporto multilingua

### Miglioramenti Tecnici
- [ ] Ottimizzazione algoritmi
- [ ] Test automatizzati
- [ ] Documentazione API
- [ ] Code splitting e lazy loading
- [ ] Accessibilità WCAG 2.1

---

## 🤝 Contribuire

I contributi sono benvenuti! Se vuoi migliorare il progetto:

1. Fai una fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committa le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Pusha il branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

---

## 📜 Licenza

Questo progetto è distribuito sotto licenza **MIT**. Vedi il file `LICENSE` per maggiori dettagli.

```
MIT License

Copyright (c) 2026 Jacopo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👨‍💻 Autore

**Jacopo**
- 📧 Email: [tua.email@example.com]
- 🐙 GitHub: [@tuousername]
- 💼 LinkedIn: [tuo-profilo]

---

## 🙏 Ringraziamenti

- Grazie alla comunità open source per l'ispirazione
- Algoritmi di generazione Sudoku ispirati da risorse accademiche
- Design UI/UX influenzato dai migliori giochi Sudoku online

---

## 📞 Supporto

Hai domande o hai riscontrato un bug?

- 🐛 [Segnala un bug](https://github.com/tuousername/sudoku-game/issues)
- 💡 [Richiedi una feature](https://github.com/tuousername/sudoku-game/issues)
- 📧 Contattami via email

---

<div align="center">

### ⭐ Se ti piace questo progetto, lascia una stella!

**Divertiti a giocare! 🎮**

![Sudoku](https://img.shields.io/badge/Made%20with-❤️-red)
![Status](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

[⬆ Torna su](#-sudoku-game)

</div>
