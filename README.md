# 🎮 SUDOKU Game

> Classico gioco di puzzle logico - Riempi la griglia rispettando le regole!

**Gioco Sudoku web completo** con 6 livelli di difficoltà, timer con pausa, modalità note per candidati, undo illimitato e suggerimenti intelligenti.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## ⚡ Caratteristiche

| Funzionalità | Dettagli |
|-------------|----------|
| 🎲 **Difficoltà** | 6 livelli: Principiante → Estremo |
| ⏱️ **Timer** | Traccia tempo con pausa/riprendi |
| ✏️ **Note** | Aggiungi candidati nelle celle |
| ↶ **Undo** | Annulla mosse illimitatamente |
| 💡 **Suggerimenti** | Fino a 3 per partita |
| ⚠️ **Validazione** | Errori in tempo reale (max 3) |
| ⌨️ **Tastiera** | Navigazione e inserimento completo |
| 📱 **Responsive** | Desktop e mobile ottimizzati |

---

## 🎮 Come Giocare

### Obiettivo
Riempi la griglia 9×9 con numeri 1-9 senza ripetizioni in righe, colonne e blocchi 3×3.

### Controlli

| Azione | Mouse | Tastiera |
|--------|-------|----------|
| Seleziona | Click cella | Frecce ↑↓←→ |
| Inserisci | Click numero | 1-9 |
| Cancella | - | Canc |
| Undo | - | Backspace |
| Note | - | **N** |
| Suggerimento | - | **S** |

---

## 🚀 Avvio Rapido

### 1️⃣ Download
```bash
git clone https://github.com/username/sudoku-game.git
cd sudoku-game
```

### 2️⃣ Esegui
Semplicemente apri `index.html` nel browser!

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

**✨ Nessuna dipendenza richiesta!**

---

## 🎯 Livelli di Difficoltà

| Livello | Celle Vuote | Tempo Medio | Difficoltà |
|---------|------------|-----------|-----------|
| 🟢 Principiante | 20 | 5 min | ⭐ |
| 🟡 Facile | 30 | 10 min | ⭐⭐ |
| 🟠 Medio | 40 | 15 min | ⭐⭐⭐ |
| 🔴 Difficile | 50 | 25 min | ⭐⭐⭐⭐ |
| 🔵 Esperto | 60 | 35 min | ⭐⭐⭐⭐⭐ |
| ⚫ Estremo | 65 | 45+ min | 🔥 Hardcore |

---

## 📋 Regole Sudoku

**La griglia deve rispettare 3 regole:**

1. **Riga**: Contiene tutti i numeri 1-9
2. **Colonna**: Contiene tutti i numeri 1-9
3. **Blocco 3×3**: Contiene tutti i numeri 1-9

Nessun numero può ripetersi in riga, colonna o blocco.

---

## 📁 Struttura Progetto

```
SUDOKU/
├── 📄 index.html          # Pagina gioco
├── 📄 regole.html         # Pagina regole
├── 📄 README.md           # Questo file
│
└── 📁 assets/
    ├── 📁 css/
    │   ├── style.css      # Stili principale
    │   └── style-regole.css # Stili regole
    │
    ├── 📁 js/
    │   ├── script.js      # Logica gioco
    │   └── script-regole.js # Script regole
    │
    └── 📁 img/            # Icone e immagini
```

---

## 🛠️ Tech Stack

- **Frontend**
  - HTML5 - Semantica
  - CSS3 - Flexbox, Grid, Animazioni
  - JavaScript ES6+ - OOP, Algoritmi

- **Features Tecniche**
  - Generazione puzzle con backtracking
  - Validazione in tempo reale
  - Cronologia mosse completa
  - DOM manipulation efficiente

---

## 📄 Licenza & Copyright

MIT License © 2026 Jacopo

Vedi [LICENSE](LICENSE) per i dettagli completi.

---

## 🎓 Tips & Trucchi

- 💡 Usa **modalità note** (N) per strategie avanzate
- ⏸️ Usa **pausa** per riflettere senza fretta
- 🔄 **Undo** (Backspace) è illimitato
- 🎯 Inizia da **Facile** per imparare
- 🧠 Cerca celle con poche possibilità

---

**Buon divertimento! 🎮✨**
