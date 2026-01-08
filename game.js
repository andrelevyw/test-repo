// Banco de palavras organizado por letra central e letras disponíveis
const WORD_SETS = [
    {
        center: 'A',
        letters: ['R', 'T', 'O', 'C', 'S', 'M'],
        words: [
            'RATO', 'RATA', 'RATOS', 'RATAS', 'CARTA', 'CARTAS',
            'MATAR', 'MATAS', 'TOCA', 'OCA', 'CASO', 'CASOS',
            'CARTA', 'CASAR', 'CASA', 'CASAS', 'CATAR', 'ROTA',
            'ROTAS', 'TARA', 'TARAS', 'SARA', 'SACAR', 'SACA',
            'SACAS', 'MACA', 'MACAS', 'MATA', 'MATAS', 'ATRAS',
            'CASTRA', 'ARCA', 'ARCAS', 'ARCO', 'ARCOS', 'TACO',
            'TACOS', 'COSTA', 'COSTAS', 'CASTO', 'CASTOR',
            'ATOR', 'ATORA', 'ASCO', 'ASCOS', 'RASCAR', 'RASCA',
            'RASTRO', 'RASTROS', 'ASTRO', 'ASTROS', 'Castro'
        ]
    },
    {
        center: 'E',
        letters: ['P', 'R', 'D', 'O', 'V', 'L'],
        words: [
            'PODE', 'PODER', 'PODERÁ', 'PERDE', 'PERDER', 'PERDOE',
            'VERDE', 'VEDE', 'VELER', 'DEVER', 'DEVE', 'REVER',
            'REVEL', 'REVELO', 'PERDE', 'LEDO', 'LEDE', 'LEDE',
            'LEVEDO', 'LEVE', 'LEVEDOS', 'DOER', 'PROLE', 'PROVEDOR',
            'DELE', 'PELO', 'PELE', 'PELES', 'LEVE', 'OLER',
            'REPOR', 'RELER', 'REPOLHO', 'REDE', 'REDES', 'VEDEL'
        ]
    },
    {
        center: 'I',
        letters: ['L', 'V', 'R', 'O', 'A', 'S'],
        words: [
            'RISO', 'RISOS', 'LIRA', 'LIRAS', 'VILA', 'VILAS',
            'VIAS', 'RIVAL', 'RIVAIS', 'RALI', 'RALIS', 'LISA',
            'LISAS', 'LISO', 'LISOS', 'LIVRE', 'LIVRO', 'LIVROS',
            'SAIR', 'SALIO', 'AVISO', 'AVISOS', 'VISA', 'VISAS',
            'VIRA', 'VIRAR', 'VIRAL', 'VIRAIS', 'RAIO', 'RAIOS',
            'SALIVA', 'SALVAR', 'SILVA', 'ASILO', 'ASILOS', 'RALI'
        ]
    },
    {
        center: 'O',
        letters: ['M', 'R', 'T', 'A', 'D', 'C'],
        words: [
            'MORO', 'MORA', 'MORAR', 'MOTOR', 'MOTORA', 'MORTO',
            'MORTA', 'TOCO', 'TOCAR', 'TOCA', 'TOCADOR', 'TOM',
            'TOMA', 'TOMAR', 'TOMATE', 'TOMATES', 'TODO', 'TODA',
            'TODOS', 'RODEO', 'RODA', 'RODAR', 'ROTA', 'ROTAS',
            'CORTA', 'CORTAR', 'CORTO', 'COMA', 'COMAR', 'COADOR',
            'CORO', 'CORDA', 'CORDATO', 'DATO', 'DOMO', 'DOMA',
            'DOMAR', 'ATOR', 'ADORA', 'ACORDAR', 'ACORDO', 'ADORO',
            'ADORAR', 'AMOR', 'MODA', 'MODOR', 'CROMO', 'CROMADO'
        ]
    },
    {
        center: 'U',
        letters: ['B', 'S', 'C', 'A', 'R', 'L'],
        words: [
            'BUSCA', 'BUSCAS', 'BUSCAR', 'CUBA', 'CUBAS', 'CURA',
            'CURAR', 'CURSO', 'CURSOS', 'CULPA', 'CULPAS', 'CULPAR',
            'CULTURA', 'CULTURAS', 'SECULAR', 'SULCAR', 'LURA',
            'LURAS', 'RAUL', 'SAUL', 'SUAR', 'SUGAR', 'SUBIR',
            'RUSSA', 'RUSSO', 'RUSSOS', 'USURA', 'ARBUSTO',
            'ARBUSCOS', 'ASCULAR', 'ABRUPTO'
        ]
    }
];

class SoletraGame {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.foundWords = [];
        this.currentSet = null;
        this.availableLetters = [];
        this.centerLetter = '';

        this.initializeElements();
        this.startNewGame();
        this.attachEventListeners();
    }

    initializeElements() {
        this.scoreElement = document.getElementById('score');
        this.wordCountElement = document.getElementById('word-count');
        this.levelElement = document.getElementById('level');
        this.centerLetterElement = document.getElementById('center-letter');
        this.outerLettersElement = document.getElementById('outer-letters');
        this.wordInput = document.getElementById('word-input');
        this.messageElement = document.getElementById('message');
        this.wordsFoundElement = document.getElementById('words-found');
        this.foundCountElement = document.getElementById('found-count');
    }

    attachEventListeners() {
        document.getElementById('submit-btn').addEventListener('click', () => this.submitWord());
        document.getElementById('shuffle-btn').addEventListener('click', () => this.shuffleLetters());
        document.getElementById('clear-btn').addEventListener('click', () => this.clearInput());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        document.getElementById('new-game-btn').addEventListener('click', () => this.startNewGame());

        this.wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitWord();
            }
        });

        this.wordInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
    }

    startNewGame() {
        this.currentSet = WORD_SETS[Math.floor(Math.random() * WORD_SETS.length)];
        this.centerLetter = this.currentSet.center;
        this.availableLetters = [...this.currentSet.letters];
        this.foundWords = [];
        this.score = 0;

        this.updateDisplay();
        this.renderLetters();
        this.clearInput();
        this.showMessage('Novo jogo iniciado! Boa sorte! 🎮', 'info');
    }

    renderLetters() {
        this.centerLetterElement.textContent = this.centerLetter;
        this.centerLetterElement.onclick = () => this.addLetterToInput(this.centerLetter);

        this.outerLettersElement.innerHTML = '';

        const angleStep = (2 * Math.PI) / this.availableLetters.length;
        const radius = 115;

        this.availableLetters.forEach((letter, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const x = radius * Math.cos(angle) + 150 - 35;
            const y = radius * Math.sin(angle) + 150 - 35;

            const letterElement = document.createElement('div');
            letterElement.className = 'outer-letter';
            letterElement.textContent = letter;
            letterElement.style.left = `${x}px`;
            letterElement.style.top = `${y}px`;
            letterElement.onclick = () => this.addLetterToInput(letter);

            this.outerLettersElement.appendChild(letterElement);
        });
    }

    addLetterToInput(letter) {
        const currentValue = this.wordInput.value;
        if (currentValue.length < 15) {
            this.wordInput.value = currentValue + letter;
        }
    }

    shuffleLetters() {
        for (let i = this.availableLetters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.availableLetters[i], this.availableLetters[j]] =
            [this.availableLetters[j], this.availableLetters[i]];
        }
        this.renderLetters();
    }

    clearInput() {
        this.wordInput.value = '';
        this.wordInput.focus();
    }

    submitWord() {
        const word = this.wordInput.value.trim().toUpperCase();

        if (word.length < 4) {
            this.showMessage('A palavra deve ter pelo menos 4 letras!', 'error');
            return;
        }

        if (!word.includes(this.centerLetter)) {
            this.showMessage(`A palavra deve conter a letra ${this.centerLetter}!`, 'error');
            return;
        }

        if (!this.isValidWord(word)) {
            this.showMessage('Use apenas as letras disponíveis!', 'error');
            return;
        }

        if (this.foundWords.includes(word)) {
            this.showMessage('Palavra já encontrada!', 'error');
            return;
        }

        if (!this.currentSet.words.includes(word)) {
            this.showMessage('Palavra não encontrada no dicionário!', 'error');
            return;
        }

        this.addFoundWord(word);
        this.clearInput();
    }

    isValidWord(word) {
        const allLetters = [this.centerLetter, ...this.availableLetters];
        for (let char of word) {
            if (!allLetters.includes(char)) {
                return false;
            }
        }
        return true;
    }

    addFoundWord(word) {
        this.foundWords.push(word);

        const points = this.calculatePoints(word);
        this.score += points;

        this.showMessage(`✅ Ótimo! +${points} pontos!`, 'success');
        this.updateDisplay();
        this.renderFoundWords();

        if (this.foundWords.length % 10 === 0) {
            this.level++;
            this.showMessage(`🎉 Nível ${this.level} alcançado!`, 'success');
        }
    }

    calculatePoints(word) {
        const length = word.length;
        if (length === 4) return 1;
        if (length === 5) return 3;
        if (length === 6) return 5;
        if (length === 7) return 7;
        return 10 + (length - 8) * 2;
    }

    showHint() {
        if (this.score < 50) {
            this.showMessage('Você precisa de pelo menos 50 pontos para uma dica!', 'error');
            return;
        }

        const remainingWords = this.currentSet.words.filter(w => !this.foundWords.includes(w));

        if (remainingWords.length === 0) {
            this.showMessage('Você já encontrou todas as palavras! 🎉', 'success');
            return;
        }

        const hintWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
        const hint = hintWord.substring(0, 2) + '...';

        this.score -= 50;
        this.updateDisplay();
        this.showMessage(`💡 Dica: ${hint} (${hintWord.length} letras)`, 'info');
    }

    renderFoundWords() {
        if (this.foundWords.length === 0) {
            this.wordsFoundElement.innerHTML = '<p class="no-words">Nenhuma palavra encontrada ainda</p>';
            return;
        }

        this.wordsFoundElement.innerHTML = '';

        const sortedWords = [...this.foundWords].sort();
        sortedWords.forEach(word => {
            const wordElement = document.createElement('div');
            wordElement.className = 'word-item';
            wordElement.textContent = word;
            this.wordsFoundElement.appendChild(wordElement);
        });
    }

    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.wordCountElement.textContent = this.foundWords.length;
        this.levelElement.textContent = this.level;
        this.foundCountElement.textContent = this.foundWords.length;
    }

    showMessage(text, type) {
        this.messageElement.textContent = text;
        this.messageElement.className = `message ${type}`;

        setTimeout(() => {
            this.messageElement.textContent = '';
            this.messageElement.className = 'message';
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SoletraGame();
});
