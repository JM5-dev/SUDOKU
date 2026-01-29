/* ============================================
   CLASSE PRINCIPALE DEL GIOCO SUDOKU
   Gestisce tutta la logica e l'interfaccia del gioco
   ============================================ */

class SudokuGame {
    constructor() {
        // Matrice 9x9 per il tabellone di gioco corrente
        this.board = Array(9).fill(null).map(() => Array(9).fill(0));
        
        // Matrice 9x9 con la soluzione completa del puzzle
        this.solution = Array(9).fill(null).map(() => Array(9).fill(0));
        
        // Matrice 9x9 di Set per memorizzare le note in ogni cella
        this.notes = Array(9).fill(null).map(() => Array(9).fill(null).map(() => new Set()));
        
        // Matrice boolean per tracciare quali celle sono fisse (numeri iniziali)
        // Matrice boolean per tracciare quali celle sono fisse (numeri iniziali)
        this.fixedCells = Array(9).fill(null).map(() => Array(9).fill(false));
        
        // Livello di difficoltà corrente
        this.difficulty = 'medium';
        
        // Timer di gioco in secondi
        this.timer = 0;
        
        // Intervallo per il timer
        this.timerInterval = null;
        
        // Cella attualmente selezionata {row, col}
        this.selectedCell = null;
        
        // Numero selezionato dalla palette (1-9 o null)
        this.selectedNumber = null;
        
        // Contatore errori commessi
        this.errorsCount = 0;
        
        // Contatore suggerimenti usati
        this.hintsCount = 0;
        
        // Numero massimo di errori permessi
        this.maxErrors = 3;
        
        // Numero massimo di suggerimenti disponibili
        this.maxHints = 3;
        
        // Flag per indicare se il gioco è terminato
        this.gameOver = false;
        
        // Flag per la modalità nota (appunti)
        this.noteMode = false;
        
        // Flag per stato pausa
        this.isPaused = false;
        
        // Array per memorizzare cronologia delle mosse (per undo)
        this.moveHistory = [];
        
        this.init();
    }
    
    /* ============================================
       METODI DI INIZIALIZZAZIONE
       ============================================ */
    
    // Inizializza il gioco
    init() {
        this.setupEventListeners();
        this.generateNewGame();
    }
    
    // Configura tutti gli event listener per i controlli del gioco
    setupEventListeners() {
        // Pulsanti difficoltà - cliccando si genera una nuova partita con il livello scelto
        document.querySelectorAll('.btn-difficulty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.btn-difficulty').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.difficulty = e.target.id;
                this.generateNewGame();
            });
        });
        
        // Pulsanti di controllo del gioco
        document.getElementById('pause-btn').addEventListener('click', () => this.togglePause());
        document.getElementById('note-mode').addEventListener('click', () => this.toggleNoteMode());
        document.getElementById('hint').addEventListener('click', () => this.giveHint());
        document.getElementById('delete-cell').addEventListener('click', () => this.deleteSelectedCell());
        document.getElementById('undo').addEventListener('click', () => this.undoMove());
        
        // Palette numeri - gestisce selezione e inserimento numeri 1-9
        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (this.gameOver) return;
                
                const clickedNumber = parseInt(e.target.dataset.number);
                
                if (this.selectedNumber === clickedNumber) {
                    this.selectedNumber = null;
                    document.querySelectorAll('.number-btn').forEach(b => b.classList.remove('selected'));
                    return;
                }
                
                document.querySelectorAll('.number-btn').forEach(b => b.classList.remove('selected'));
                
                e.target.classList.add('selected');
                this.selectedNumber = clickedNumber;
                
                if (this.selectedCell) {
                    this.insertNumber(this.selectedCell.row, this.selectedCell.col, this.selectedNumber);
                    this.selectedNumber = null;
                    document.querySelectorAll('.number-btn').forEach(b => b.classList.remove('selected'));
                }
            });
        });
        
        // Eventi tastiera per input da tastiera e navigazione con frecce
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }
    
    /* ============================================
       GENERAZIONE E GESTIONE DEL GIOCO
       ============================================ */
    
    // Genera una nuova partita con il livello di difficoltà selezionato
    generateNewGame() {
        this.stopTimer();
        this.clearMessage();
        this.errorsCount = 0;
        this.hintsCount = 0;
        this.gameOver = false;
        this.noteMode = false;
        this.moveHistory = [];
        this.notes = Array(9).fill(null).map(() => Array(9).fill(null).map(() => new Set()));
        this.fixedCells = Array(9).fill(null).map(() => Array(9).fill(false));
        this.updateStats();
        
        // Rimuovi active dal pulsante nota
        document.getElementById('note-mode').classList.remove('active');
        
        // Genera una soluzione completa del Sudoku
        this.board = Array(9).fill(null).map(() => Array(9).fill(0));
        this.fillBoard(this.board);
        this.solution = this.board.map(row => [...row]);
        
        // Rimuovi numeri in base alla difficoltà per creare il puzzle
        const cellsToRemove = {
            'beginner': 20,
            'easy': 30,
            'medium': 40,
            'hard': 50,
            'expert': 60,
            'extreme': 65
        }[this.difficulty];
        
        this.removeNumbers(cellsToRemove);
        
        // Marca le celle con numeri come fisse (non modificabili)
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.board[row][col] !== 0) {
                    this.fixedCells[row][col] = true;
                    this.removeNoteFromRelatedCells(row, col, this.board[row][col]);
                }
            }
        }
        
        this.renderBoard();
        this.updateNumberPalette();
        
        this.startTimer();
    }
    
    // Riempie il tabellone con una soluzione valida usando backtracking
    fillBoard(board) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    const shuffled = this.shuffle([...numbers]);
                    
                    for (let num of shuffled) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            
                            if (this.fillBoard(board)) {
                                return true;
                            }
                            
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    // Verifica se un numero può essere inserito in una posizione secondo le regole del Sudoku
    isValid(board, row, col, num) {
        // Controlla riga - il numero non deve già esistere
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num) return false;
        }
        
        // Controlla colonna - il numero non deve già esistere
        for (let x = 0; x < 9; x++) {
            if (board[x][col] === num) return false;
        }
        
        // Controlla blocco 3x3 - il numero non deve già esistere
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        
        return true;
    }
    
    // Rimuove un numero casuale di celle per creare il puzzle
    removeNumbers(count) {
        let removed = 0;
        while (removed < count) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            
            if (this.board[row][col] !== 0) {
                this.board[row][col] = 0;
                removed++;
            }
        }
    }
    
    /* ============================================
       RENDERING E INTERFACCIA
       ============================================ */
    
    // Renderizza l'intera griglia Sudoku nell'HTML
    renderBoard() {
        const boardElement = document.getElementById('sudoku-board');
        
        // Salva la cella selezionata prima di ricreare la griglia
        const previousSelection = this.selectedCell ? { row: this.selectedCell.row, col: this.selectedCell.col } : null;
        
        boardElement.innerHTML = '';
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                
                if (this.fixedCells[row][col]) {
                    // Cella fissa (numero iniziale del puzzle) - non modificabile
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.dataset.row = row;
                    input.dataset.col = col;
                    input.value = this.board[row][col];
                    input.readOnly = true;
                    cell.classList.add('fixed');
                    cell.appendChild(input);
                } else if (this.board[row][col] !== 0) {
                    // Numero inserito dal giocatore - modificabile
                    const cellWrapper = document.createElement('div');
                    cellWrapper.className = 'cell-wrapper';
                    cellWrapper.dataset.row = row;
                    cellWrapper.dataset.col = col;
                    
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.dataset.row = row;
                    input.dataset.col = col;
                    input.className = 'cell-input user-input';
                    input.value = this.board[row][col];
                    input.addEventListener('input', (e) => this.handleInput(e));
                    input.addEventListener('focus', (e) => this.handleFocus(e));
                    
                    const notesContainer = document.createElement('div');
                    notesContainer.className = 'notes-container';
                    
                    cellWrapper.appendChild(input);
                    cellWrapper.appendChild(notesContainer);
                    cellWrapper.addEventListener('click', (e) => this.handleCellClick(e));
                    cell.appendChild(cellWrapper);
                } else {
                    // Cella vuota - può contenere note o essere riempita
                    // Crea container che include sia input che note
                    const cellWrapper = document.createElement('div');
                    cellWrapper.className = 'cell-wrapper';
                    cellWrapper.dataset.row = row;
                    cellWrapper.dataset.col = col;
                    
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.dataset.row = row;
                    input.dataset.col = col;
                    input.className = 'cell-input';
                    input.addEventListener('input', (e) => this.handleInput(e));
                    input.addEventListener('focus', (e) => this.handleFocus(e));
                    
                    const notesContainer = document.createElement('div');
                    notesContainer.className = 'notes-container';
                    
                    if (this.notes[row][col].size > 0) {
                        Array.from(this.notes[row][col]).sort().forEach(num => {
                            const noteSpan = document.createElement('span');
                            noteSpan.className = 'note';
                            noteSpan.textContent = num;
                            notesContainer.appendChild(noteSpan);
                        });
                    }
                    
                    cellWrapper.appendChild(input);
                    cellWrapper.appendChild(notesContainer);
                    cellWrapper.addEventListener('click', (e) => this.handleCellClick(e));
                    cell.appendChild(cellWrapper);
                }
                
                boardElement.appendChild(cell);
            }
        }
        
        // Ripristina la selezione della cella se esisteva prima del re-render
        if (previousSelection) {
            const cellToSelect = document.querySelector(`[data-row="${previousSelection.row}"][data-col="${previousSelection.col}"]`);
            if (cellToSelect) {
                const cell = cellToSelect.closest('.cell');
                if (cell && !cell.classList.contains('fixed')) {
                    cell.classList.add('selected');
                    this.selectedCell = previousSelection;
                    const input = cellToSelect;
                    if (input && input.tagName === 'INPUT') {
                        setTimeout(() => input.focus(), 0);
                    }
                }
            }
        }
    }
    
    /* ============================================
       GESTIONE EVENTI E INTERAZIONI UTENTE
       ============================================ */
    
    // Gestisce il click su una cella
    handleCellClick(e) {
        if (this.gameOver) return;
        
        const cellWrapper = e.target.closest('.cell-wrapper');
        if (!cellWrapper) return;
        
        const row = parseInt(cellWrapper.dataset.row);
        const col = parseInt(cellWrapper.dataset.col);
        
        document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('selected'));
        cellWrapper.closest('.cell').classList.add('selected');
        
        const input = cellWrapper.querySelector('.cell-input');
        if (input) {
            input.focus();
        }
        
        this.selectedCell = { row, col };
        
        if (this.selectedNumber !== null) {
            this.insertNumber(row, col, this.selectedNumber);
            this.selectedNumber = null;
            document.querySelectorAll('.number-btn').forEach(b => b.classList.remove('selected'));
        }
    }
    
    // Inserisce un numero in una cella (o aggiunge/rimuove nota se in modalità nota)
    insertNumber(row, col, num) {
        if (this.gameOver || this.isPaused) return;
        if (this.board[row][col] !== 0) return;
        
        if (this.noteMode) {
            // Modalità nota: aggiungi o rimuovi nota dalla cella
            const previousNotes = new Set(this.notes[row][col]);
            
            if (this.notes[row][col].has(num)) {
                this.notes[row][col].delete(num);
            } else {
                this.notes[row][col].add(num);
            }
            
            this.moveHistory.push({
                type: 'note',
                row: row,
                col: col,
                previousNotes: previousNotes,
                currentNotes: new Set(this.notes[row][col])
            });
            
            this.renderBoard();
        } else {
            // Modalità normale: inserisci numero
            // Salva lo stato precedente nella cronologia per undo
            const previousNotesState = this.notes.map(row => row.map(cell => new Set(cell)));
            
            if (num !== this.solution[row][col]) {
                // Numero errato - incrementa contatore errori
                this.errorsCount++;
                this.updateStats();
                
                this.board[row][col] = num;
                this.notes[row][col].clear();
                
                this.removeNoteFromRelatedCells(row, col, num);
                
                this.moveHistory.push({
                    type: 'number',
                    row: row,
                    col: col,
                    previousValue: 0,
                    currentValue: num,
                    previousNotesState: previousNotesState,
                    isError: true
                });
                
                if (this.errorsCount >= this.maxErrors) {
                    this.renderBoard();
                    this.endGame(false);
                    return;
                }
                
                this.showMessage(`Errore! Ancora ${this.maxErrors - this.errorsCount} errori disponibili`, 'error');
                
                this.renderBoard();
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`).closest('.cell');
                cell.classList.add('error');
                return;
            }

            this.board[row][col] = num;
            this.notes[row][col].clear();
            
            this.removeNoteFromRelatedCells(row, col, num);
            
            this.moveHistory.push({
                type: 'number',
                row: row,
                col: col,
                previousValue: 0,
                currentValue: num,
                previousNotesState: previousNotesState,
                isError: false
            });

            this.selectedCell = { row, col };
            this.renderBoard();
            
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`).closest('.cell');
            cell.classList.add('correct');
            setTimeout(() => {
                cell.classList.remove('correct');
            }, 500);
            
            this.updateNumberPalette();
            this.checkIfCompleted();
        }
    }
    
    // Gestisce l'input da tastiera nelle celle
    handleInput(e) {
        if (this.gameOver) return;
        
        const value = e.target.value;
        
        if (value && !/^[1-9]$/.test(value)) {
            e.target.value = '';
            return;
        }
        
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        
        if (!value) {
            const previousValue = this.board[row][col];
            if (previousValue !== 0) {
                this.moveHistory.push({
                    type: 'delete',
                    row: row,
                    col: col,
                    previousValue: previousValue,
                    currentValue: 0
                });
            }
            
            this.board[row][col] = 0;
            this.renderBoard();
            this.updateNumberPalette();
            return;
        }
        
        const num = parseInt(value);
        e.target.value = '';
        
        this.insertNumber(row, col, num);
    }
    
    // Gestisce il focus su una cella
    handleFocus(e) {
        document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('selected'));
        e.target.closest('.cell').classList.add('selected');
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        this.selectedCell = { row, col };
    }
    
    // Gestisce i tasti premuti (numeri e frecce direzionali)
    handleKeyPress(e) {
        if (!this.selectedCell || this.gameOver || this.isPaused) return;
        
        const row = this.selectedCell.row;
        const col = this.selectedCell.col;
        
        // Frecce direzionali per navigare tra le celle
        let newRow = row, newCol = col;
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                newRow = Math.max(0, row - 1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                newRow = Math.min(8, row + 1);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                newCol = Math.max(0, col - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                newCol = Math.min(8, col + 1);
                break;
            default:
                return;
        }
        
        if (newRow !== row || newCol !== col) {
            const newInput = document.querySelector(`input[data-row="${newRow}"][data-col="${newCol}"]`);
            if (newInput) {
                newInput.focus();
                this.selectedCell = { row: newRow, col: newCol };
                
                document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('selected'));
                newInput.closest('.cell').classList.add('selected');
            }
        }
    }
    
    checkSolution() {
        let errors = 0;
        let complete = true;
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('error', 'correct');
        });
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
                
                if (this.board[row][col] === 0) {
                    complete = false;
                } else if (this.board[row][col] !== this.solution[row][col]) {
                    input.parentElement.classList.add('error');
                    errors++;
                }
            }
        }
        
        if (!complete) {
            this.showMessage('Il puzzle non è ancora completo!', 'info');
        } else if (errors === 0) {
            this.showMessage('🎉 Congratulazioni! Hai risolto il puzzle!', 'success');
            this.stopTimer();
        } else {
            this.showMessage(`Ci sono ${errors} errori. Riprova!`, 'error');
        }
    }
    
    /* ============================================
       CONTROLLO SOLUZIONE E COMPLETAMENTO
       ============================================ */
    
    // Controlla se tutte le celle sono riempite correttamente
    checkIfCompleted() {
        let complete = true;
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.board[row][col] === 0) {
                    complete = false;
                    break;
                }
            }
            if (!complete) break;
        }
        
        if (complete) {
            this.gameOver = true;
            this.stopTimer();
            this.showMessage('🎉 Congratulazioni! Hai risolto il puzzle!', 'success');
        }
    }
    
    /* ============================================
       FUNZIONALITÀ SUGGERIMENTI E AIUTI
       ============================================ */
    
    // Fornisce un suggerimento riempiendo una cella casuale
    giveHint() {
        if (this.gameOver || this.isPaused) {
            this.showMessage('Il gioco è terminato!', 'error');
            return;
        }
        
        if (this.hintsCount >= this.maxHints) {
            this.showMessage('Hai esaurito i suggerimenti disponibili!', 'error');
            return;
        }
        
        const emptyCells = [];
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.board[row][col] === 0) {
                    emptyCells.push({row, col});
                }
            }
        }
        
        if (emptyCells.length === 0) {
            this.showMessage('Non ci sono celle vuote!', 'info');
            return;
        }
        
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const num = this.solution[randomCell.row][randomCell.col];
        
        this.board[randomCell.row][randomCell.col] = num;
        this.notes[randomCell.row][randomCell.col].clear();
        
        this.removeNoteFromRelatedCells(randomCell.row, randomCell.col, num);
        
        this.hintsCount++;
        this.updateStats();
        this.updateNumberPalette();
        this.renderBoard();
        
        this.showMessage(`Suggerimento aggiunto! (${this.hintsCount}/${this.maxHints})`, 'success');
    }
    
    /* ============================================
       GESTIONE TIMER
       ============================================ */
    
    // Avvia il timer di gioco
    startTimer() {
        this.timer = 0;
        this.updateTimerDisplay();
        
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.updateTimerDisplay();
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.timer / 60);
        const seconds = this.timer % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    /* ============================================
       SISTEMA MESSAGGI
       ============================================ */
    
    // Mostra un messaggio all'utente (successo/errore/info)
    showMessage(text, type) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = `message ${type} show`;
        
        setTimeout(() => {
            this.clearMessage();
        }, 10000);
    }
    
    clearMessage() {
        const messageEl = document.getElementById('message');
        messageEl.classList.remove('show');
        
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'message';
        }, 500);
    }
    
    /* ============================================
       FUNZIONI UTILITY
       ============================================ */
    
    // Mescola casualmente un array (algoritmo Fisher-Yates)
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Aggiorna la visualizzazione delle statistiche (errori e suggerimenti)
    updateStats() {
        document.getElementById('errors-count').textContent = `${this.errorsCount}/${this.maxErrors}`;
        document.getElementById('hints-count').textContent = `${this.hintsCount}/${this.maxHints}`;
        
        const errorsElement = document.getElementById('errors-count');
        if (this.errorsCount >= this.maxErrors - 1) {
            errorsElement.style.color = '#dc143c';
            errorsElement.style.fontWeight = 'bold';
        } else {
            errorsElement.style.color = '';
            errorsElement.style.fontWeight = '';
        }
        
        const hintsElement = document.getElementById('hints-count');
        if (this.hintsCount >= this.maxHints) {
            hintsElement.style.color = '#dc143c';
            hintsElement.style.fontWeight = 'bold';
        } else {
            hintsElement.style.color = '';
            hintsElement.style.fontWeight = '';
        }
    }
    
    // Aggiorna la palette numeri mostrando quali sono completati
    updateNumberPalette() {
        const numberCounts = {};
        for (let i = 1; i <= 9; i++) {
            numberCounts[i] = 0;
        }
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const num = this.board[row][col];
                if (num !== 0) {
                    numberCounts[num]++;
                }
            }
        }
        
        document.querySelectorAll('.number-btn').forEach(btn => {
            const number = parseInt(btn.dataset.number);
            if (numberCounts[number] === 9) {
                btn.classList.add('completed');
            } else {
                btn.classList.remove('completed');
            }
        });
    }
    
    /* ============================================
       CONTROLLI INTERATTIVI
       ============================================ */
    
    // Attiva/disattiva la pausa del gioco
    togglePause() {
        if (this.gameOver) return;
        
        this.isPaused = !this.isPaused;
        const btn = document.getElementById('pause-btn');
        
        if (this.isPaused) {
            this.stopTimer();
            btn.textContent = '▶️';
            btn.title = 'Riprendi';
            this.showMessage('Gioco in pausa', 'info');
            
            document.getElementById('sudoku-board').style.filter = 'blur(10px)';
        } else {
            this.timerInterval = setInterval(() => {
                this.timer++;
                this.updateTimerDisplay();
            }, 1000);
            btn.textContent = '⏸️';
            btn.title = 'Pausa';
            this.showMessage('Gioco ripreso', 'success');

            document.getElementById('sudoku-board').style.filter = 'none';
        }
    }
    
    // Attiva/disattiva la modalità nota (per scrivere appunti)
    toggleNoteMode() {
        if (this.isPaused) return;
        
        this.noteMode = !this.noteMode;
        const btn = document.getElementById('note-mode');
        
        if (this.noteMode) {
            btn.classList.add('active');
            this.showMessage('Modalità Nota attivata - clicca sui numeri per aggiungere note', 'info');
        } else {
            btn.classList.remove('active');
            this.showMessage('Modalità Nota disattivata', 'info');
        }
    }
    
    // Cancella il contenuto della cella selezionata
    deleteSelectedCell() {
        if (this.gameOver || this.isPaused) return;
        if (!this.selectedCell) {
            this.showMessage('Seleziona una cella da cancellare', 'info');
            return;
        }
        
        const row = this.selectedCell.row;
        const col = this.selectedCell.col;

        if (this.fixedCells[row][col]) {
            this.showMessage('Non puoi cancellare una cella fissa', 'error');
            return;
        }
        
        const previousValue = this.board[row][col];
        const previousNotes = new Set(this.notes[row][col]);
        
        if (previousValue !== 0 || previousNotes.size > 0) {
            this.moveHistory.push({
                type: 'delete',
                row: row,
                col: col,
                previousValue: previousValue,
                previousNotes: previousNotes,
                currentValue: 0
            });
            
            this.board[row][col] = 0;
            this.notes[row][col].clear();
            this.renderBoard();
            this.updateNumberPalette();
            this.showMessage('Cella cancellata', 'success');
        }
    }
    
    // Annulla l'ultima mossa effettuata
    undoMove() {
        if (this.gameOver || this.isPaused) return;
        
        if (this.moveHistory.length === 0) {
            this.showMessage('Nessuna mossa da annullare', 'info');
            return;
        }
        
        const lastMove = this.moveHistory.pop();
        
        if (lastMove.type === 'number') {
            this.board[lastMove.row][lastMove.col] = lastMove.previousValue;
            
            if (lastMove.previousNotesState) {
                this.notes = lastMove.previousNotesState.map(row => row.map(cell => new Set(cell)));
            }
        } else if (lastMove.type === 'delete') {
            this.board[lastMove.row][lastMove.col] = lastMove.previousValue;
            
            if (lastMove.previousNotes) {
                this.notes[lastMove.row][lastMove.col] = new Set(lastMove.previousNotes);
            }
        } else if (lastMove.type === 'note') {
            this.notes[lastMove.row][lastMove.col] = new Set(lastMove.previousNotes);
        }
        
        this.renderBoard();
        this.updateNumberPalette();
        this.showMessage('Mossa annullata', 'success');
    }
    
    // Rimuove una nota da tutte le celle correlate (stessa riga/colonna/blocco)
    removeNoteFromRelatedCells(row, col, num) {
        for (let c = 0; c < 9; c++) {
            if (this.notes[row][c]) {
                this.notes[row][c].delete(num);
            }
        }
        
        for (let r = 0; r < 9; r++) {
            if (this.notes[r][col]) {
                this.notes[r][col].delete(num);
            }
        }
        
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        
        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                if (this.notes[r][c]) {
                    this.notes[r][c].delete(num);
                }
            }
        }
    }
    
    // Termina il gioco (vittoria o sconfitta)
    endGame(won) {
        this.gameOver = true;
        this.stopTimer();
        
        if (!won) {
            this.showMessage('❌ Game Over! Hai fatto troppi errori. Prova ancora!', 'error');
            
            document.querySelectorAll('.cell input').forEach(input => {
                if (!input.readOnly) {
                    input.disabled = true;
                }
            });
        }
    }
}

/* ============================================
   INIZIALIZZAZIONE AL CARICAMENTO PAGINA
   ============================================ */

// Inizializza il gioco quando la pagina è completamente caricata
document.addEventListener('DOMContentLoaded', () => {
    new SudokuGame();
});