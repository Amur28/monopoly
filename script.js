class MonopolyGame {
    constructor() {
        this.currentPage = 'landing';
        this.gameSettings = {
            playerCount: 2,
            turnTime: 30,
            startingMoney: 1500
        };
        this.players = {};
        this.currentPlayer = 1;
        this.fields = this.initializeFields();
        this.selectedField = null;
        this.isRolling = false;
        this.timerInterval = null;
        this.timeLeft = 30;
        
        this.init();
    }
    
    initializeFields() {
        return [
            { id: 0, name: 'СТАРТ', type: 'corner', color: '#27ae60', deleted: false },
            { id: 1, name: 'Московская ул.', type: 'property', price: 60, color: '#8B4513', deleted: false },
            { id: 2, name: 'Общественная казна', type: 'community', color: '#87CEEB', deleted: false },
            { id: 3, name: 'Тверская ул.', type: 'property', price: 60, color: '#8B4513', deleted: false },
            { id: 4, name: 'Налог', type: 'tax', price: 200, color: '#FFD700', deleted: false },
            { id: 5, name: 'Рижский вокзал', type: 'railroad', price: 200, color: '#FF6347', deleted: false },
            { id: 6, name: 'Арбатская ул.', type: 'property', price: 100, color: '#FFA500', deleted: false },
            { id: 7, name: 'Шанс', type: 'chance', color: '#87CEEB', deleted: false },
            { id: 8, name: 'Смоленская ул.', type: 'property', price: 100, color: '#FFA500', deleted: false },
            { id: 9, name: 'Кутузовский просп.', type: 'property', price: 120, color: '#FFA500', deleted: false },
            { id: 10, name: 'Тюрьма', type: 'corner', color: '#e74c3c', deleted: false },
            { id: 11, name: 'Краснопресненская', type: 'property', price: 140, color: '#FF1493', deleted: false },
            { id: 12, name: 'Электростанция', type: 'utility', price: 150, color: '#87CEEB', deleted: false },
            { id: 13, name: 'Пушкинская ул.', type: 'property', price: 140, color: '#FF1493', deleted: false },
            { id: 14, name: 'Тверская бульв.', type: 'property', price: 160, color: '#FF1493', deleted: false },
            { id: 15, name: 'Павелецкий вокзал', type: 'railroad', price: 200, color: '#FFD700', deleted: false },
            { id: 16, name: 'Пречистенская', type: 'property', price: 180, color: '#32CD32', deleted: false },
            { id: 17, name: 'Общественная казна', type: 'community', color: '#87CEEB', deleted: false },
            { id: 18, name: 'Остоженка', type: 'property', price: 180, color: '#32CD32', deleted: false },
            { id: 19, name: 'Хамовники', type: 'property', price: 200, color: '#32CD32', deleted: false },
            { id: 20, name: 'Бесплатная стоянка', type: 'corner', color: '#3498db', deleted: false },
            { id: 21, name: 'Ленинградский просп.', type: 'property', price: 220, color: '#4169E1', deleted: false },
            { id: 22, name: 'Шанс', type: 'chance', color: '#87CEEB', deleted: false },
            { id: 23, name: 'Новинский бульв.', type: 'property', price: 220, color: '#4169E1', deleted: false },
            { id: 24, name: 'Садовое кольцо', type: 'property', price: 240, color: '#4169E1', deleted: false },
            { id: 25, name: 'Курский вокзал', type: 'railroad', price: 200, color: '#FFD700', deleted: false },
            { id: 26, name: 'Полянка', type: 'property', price: 260, color: '#9370DB', deleted: false },
            { id: 27, name: 'Серпуховская', type: 'property', price: 260, color: '#4169E1', deleted: false },
            { id: 28, name: 'Тульская', type: 'property', price: 280, color: '#9370DB', deleted: false },
            { id: 29, name: 'В тюрьму', type: 'corner', color: '#9b59b6', deleted: false },
            { id: 31, name: 'Нагатинская', type: 'property', price: 300, color: '#FF8C00', deleted: false },
            { id: 32, name: 'Шаболовская', type: 'property', price: 300, color: '#9370DB', deleted: false },
            { id: 33, name: 'Общественная казна', type: 'community', color: '#87CEEB', deleted: false },
            { id: 34, name: 'Ленинский просп.', type: 'property', price: 320, color: '#9370DB', deleted: false },
            { id: 35, name: 'Савеловский вокзал', type: 'railroad', price: 200, color: '#FFD700', deleted: false },
            { id: 36, name: 'Водопровод', type: 'utility', price: 150, color: '#00CED1', deleted: false },
            { id: 37, name: 'Профсоюзная', type: 'property', price: 350, color: '#00CED1', deleted: false },
            { id: 38, name: 'Шанс', type: 'chance', color: '#87CEEB', deleted: false },
            { id: 39, name: 'Воробьевы горы', type: 'property', price: 400, color: '#00CED1', deleted: false }
        ];
    }
    
    init() {
        this.setupEventListeners();
        this.showPage('landing');
    }
    
    setupEventListeners() {
        // Навигация
        document.getElementById('newGameBtn').addEventListener('click', () => this.showGameSetup());
        document.getElementById('editFieldBtn').addEventListener('click', () => this.showFieldEditor());
        document.getElementById('backToLanding').addEventListener('click', () => this.showPage('landing'));
        document.getElementById('backToLandingFromEditor').addEventListener('click', () => this.showPage('landing'));
        
        // Настройка игры
        document.getElementById('playerCount').addEventListener('change', () => this.updatePlayersSetup());
        document.getElementById('startGameBtn').addEventListener('click', () => this.startNewGame());
        document.getElementById('cancelSetupBtn').addEventListener('click', () => this.showPage('landing'));
        
        // Игра
        document.getElementById('rollDice').addEventListener('click', () => this.rollDice());
        document.getElementById('exitGameBtn').addEventListener('click', () => this.exitGame());
        
        // Модальные окна
        document.getElementById('closeFieldAction').addEventListener('click', () => this.closeFieldActionModal());
        document.getElementById('closeFieldEdit').addEventListener('click', () => this.closeFieldEditModal());
        document.getElementById('editFieldBtn').addEventListener('click', () => this.showFieldEditForm());
        document.getElementById('deleteFieldBtn').addEventListener('click', () => this.deleteField());
        document.getElementById('saveFieldBtn').addEventListener('click', () => this.saveField());
        document.getElementById('cancelFieldEditBtn').addEventListener('click', () => this.closeFieldEditModal());
        
        // Закрытие модальных окон по клику вне их
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('show');
            }
        });
    }
    
    showPage(page) {
        // Скрыть все страницы
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Показать выбранную страницу
        document.getElementById(page + 'Page').classList.remove('hidden');
        this.currentPage = page;
        
        // Инициализация страницы
        switch(page) {
            case 'gameSetup':
                this.initGameSetup();
                break;
            case 'game':
                this.initGame();
                break;
            case 'fieldEditor':
                this.initFieldEditor();
                break;
        }
    }
    
    showGameSetup() {
        this.showPage('gameSetup');
    }
    
    showFieldEditor() {
        this.showPage('fieldEditor');
    }
    
    initGameSetup() {
        this.updatePlayersSetup();
    }
    
    updatePlayersSetup() {
        const playerCount = parseInt(document.getElementById('playerCount').value);
        const playersSetup = document.getElementById('playersSetup');
        
        if (!playersSetup) {
            console.error('Players setup container not found');
            return;
        }
        
        playersSetup.innerHTML = '';
        
        const pieces = ['🚗', '🚙', '🚕', '🚐'];
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'];
        
        for (let i = 1; i <= playerCount; i++) {
            const playerSetup = document.createElement('div');
            playerSetup.className = 'player-setup';
            playerSetup.innerHTML = `
                <div class="player-setup-header">
                    <div class="player-number">${i}</div>
                    <h4>Игрок ${i}</h4>
                </div>
                <div class="player-setup-fields">
                    <div class="form-group">
                        <label for="playerName${i}">Имя игрока:</label>
                        <input type="text" id="playerName${i}" value="Игрок ${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="playerPiece${i}">Фигурка:</label>
                        <select id="playerPiece${i}">
                            ${pieces.map((piece, index) => 
                                `<option value="${piece}" data-color="${colors[index]}">${piece}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
            `;
            playersSetup.appendChild(playerSetup);
        }
    }
    
    startNewGame() {
        const playerCountElement = document.getElementById('playerCount');
        const turnTimeElement = document.getElementById('turnTime');
        const startingMoneyElement = document.getElementById('startingMoney');
        
        if (!playerCountElement || !turnTimeElement || !startingMoneyElement) {
            console.error('Game setup elements not found');
            return;
        }
        
        // Сохранение настроек
        this.gameSettings.playerCount = parseInt(playerCountElement.value);
        this.gameSettings.turnTime = parseInt(turnTimeElement.value);
        this.gameSettings.startingMoney = parseInt(startingMoneyElement.value);
        
        // Создание игроков
        this.players = {};
        for (let i = 1; i <= this.gameSettings.playerCount; i++) {
            const nameElement = document.getElementById(`playerName${i}`);
            const pieceElement = document.getElementById(`playerPiece${i}`);
            const pieceOption = pieceElement.options[pieceElement.selectedIndex];
            
            if (!nameElement || !pieceElement || !pieceOption) {
                console.error(`Player ${i} elements not found`);
                return;
            }
            
            const name = nameElement.value;
            const piece = pieceElement.value;
            const color = pieceOption.dataset.color;
            
            this.players[i] = {
                name: name,
                piece: piece,
                color: color,
                position: 0,
                money: this.gameSettings.startingMoney,
                properties: []
            };
        }
        
        this.currentPlayer = 1;
        this.showPage('game');
    }
    
    initGame() {
        this.renderGameBoard();
        this.renderPlayers();
        this.startTurnTimer();
    }
    
    renderGameBoard() {
        // Поля уже есть в HTML, просто обновляем их
        this.fields.forEach(field => {
            const fieldElement = document.querySelector(`[data-position="${field.id}"]`);
            if (fieldElement) {
                const colorDiv = fieldElement.querySelector('.field-color');
                const nameDiv = fieldElement.querySelector('.field-name');
                const priceDiv = fieldElement.querySelector('.field-price');
                
                if (colorDiv && field.color) {
                    colorDiv.style.background = field.color;
                }
                if (nameDiv) {
                    nameDiv.textContent = field.name;
                }
                if (priceDiv && field.price) {
                    priceDiv.textContent = field.price + '₽';
                }
            }
        });
    }
    
    renderPlayers() {
        const playersContainer = document.querySelector('.game-info .players');
        if (!playersContainer) {
            console.error('Players container not found');
            return;
        }
        
        playersContainer.innerHTML = '';
        
        Object.keys(this.players).forEach(playerId => {
            const player = this.players[playerId];
            const playerElement = document.createElement('div');
            playerElement.className = 'player';
            playerElement.id = 'player' + playerId;
            playerElement.innerHTML = `
                <div class="player-piece" data-player="${playerId}" style="background: ${player.color}">${player.piece}</div>
                <div class="player-info">
                    <span class="player-name">${player.name}</span>
                    <span class="player-money">${player.money}₽</span>
                </div>
            `;
            playersContainer.appendChild(playerElement);
        });
        
        this.updatePlayerDisplay();
    }
    
    updatePlayerDisplay() {
        Object.keys(this.players).forEach(playerId => {
            const player = this.players[playerId];
            const playerElement = document.getElementById('player' + playerId);
            if (playerElement) {
                const moneyElement = playerElement.querySelector('.player-money');
                if (moneyElement) {
                    moneyElement.textContent = player.money + '₽';
                }
                
                // Подсветка текущего игрока
                playerElement.style.border = playerId == this.currentPlayer ? '3px solid #f39c12' : 'none';
                playerElement.style.borderRadius = '10px';
                playerElement.style.padding = playerId == this.currentPlayer ? '5px' : '15px';
            } else {
                console.warn('Player element not found:', playerId);
            }
        });
    }
    
    rollDice() {
        if (this.isRolling) return;
        
        const dice1Element = document.getElementById('dice1');
        const dice2Element = document.getElementById('dice2');
        const diceResultElement = document.getElementById('diceResult');
        
        if (!dice1Element || !dice2Element || !diceResultElement) {
            console.error('Dice elements not found');
            return;
        }
        
        this.isRolling = true;
        
        // Добавляем анимацию
        dice1Element.classList.add('rolling');
        dice2Element.classList.add('rolling');
        
        // Анимация изменения значений
        let rollCount = 0;
        const rollInterval = setInterval(() => {
            dice1Element.textContent = this.getDiceSymbol(Math.floor(Math.random() * 6) + 1);
            dice2Element.textContent = this.getDiceSymbol(Math.floor(Math.random() * 6) + 1);
            rollCount++;
            
            if (rollCount >= 10) {
                clearInterval(rollInterval);
                
                const dice1 = Math.floor(Math.random() * 6) + 1;
                const dice2 = Math.floor(Math.random() * 6) + 1;
                const total = dice1 + dice2;
                
                dice1Element.textContent = this.getDiceSymbol(dice1);
                dice2Element.textContent = this.getDiceSymbol(dice2);
                
                dice1Element.classList.remove('rolling');
                dice2Element.classList.remove('rolling');
                
                diceResultElement.textContent = `🎲 ${dice1} + ${dice2} = ${total}`;
                
                this.movePlayer(total);
                this.isRolling = false;
            }
        }, 50);
    }
    
    getDiceSymbol(value) {
        const symbols = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        return symbols[value] || '⚀';
    }
    
    movePlayer(steps) {
        const player = this.players[this.currentPlayer];
        const oldPosition = player.position;
        player.position = (player.position + steps) % 40;
        
        // Анимация перемещения
        this.animatePlayerMovement(this.currentPlayer, oldPosition, player.position, () => {
            if (player.position === 0) {
                player.money += 400;
                this.showMessage(`${player.name} прошел СТАРТ и получил 400₽`);
            }
            
            this.updatePlayerDisplay();
            this.handleFieldAction(player.position);
            
            // Смена игрока
            this.currentPlayer = (this.currentPlayer % this.gameSettings.playerCount) + 1;
            this.startTurnTimer();
        });
    }
    
    animatePlayerMovement(playerId, fromPos, toPos, callback) {
        const playerPiece = document.querySelector(`[data-player="${playerId}"]`);
        playerPiece.classList.add('moving');
        
        setTimeout(() => {
            playerPiece.classList.remove('moving');
            callback();
        }, 500);
    }
    
    handleFieldAction(position) {
        const field = this.fields.find(f => f.id === position);
        if (!field) return;
        
        const player = this.players[this.currentPlayer];
        
        switch (field.type) {
            case 'property':
            case 'railroad':
            case 'utility':
                if (!player.properties.includes(position)) {
                    this.showMessage(`${player.name} может купить ${field.name} за ${field.price}₽`);
                }
                break;
            case 'tax':
                player.money -= field.price;
                this.showMessage(`${player.name} заплатил налог ${field.price}₽`);
                break;
            case 'chance':
            case 'community':
                this.showMessage(`${player.name} попал на ${field.name}`);
                break;
        }
        
        this.updatePlayerDisplay();
    }
    
    startTurnTimer() {
        if (this.gameSettings.turnTime <= 0) return;
        
        this.stopTurnTimer();
        this.timeLeft = this.gameSettings.turnTime;
        
        const timerElement = document.getElementById('turnTimer');
        const timerValueElement = document.getElementById('timerValue');
        
        if (!timerElement || !timerValueElement) {
            console.error('Timer elements not found');
            return;
        }
        
        timerElement.style.display = 'block';
        timerValueElement.textContent = this.timeLeft;
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            timerValueElement.textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.stopTurnTimer();
                this.showMessage(`Время игрока ${this.currentPlayer} истекло!`);
                this.currentPlayer = (this.currentPlayer % this.gameSettings.playerCount) + 1;
                this.updatePlayerDisplay();
                this.startTurnTimer();
            }
        }, 1000);
    }
    
    stopTurnTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        const timerElement = document.getElementById('turnTimer');
        if (timerElement) {
            timerElement.style.display = 'none';
        }
    }
    
    exitGame() {
        this.stopTurnTimer();
        this.showPage('landing');
    }
    
    // Редактор поля
    initFieldEditor() {
        this.renderEditorBoard();
        this.setupFieldClickHandlers();
    }
    
    renderEditorBoard() {
        const boardContainer = document.querySelector('.field-editor-page .board-container');
        if (!boardContainer) {
            console.error('Board container not found in field editor');
            return;
        }
        boardContainer.innerHTML = '';
        
        // Создаем структуру поля
        const sides = ['top', 'right', 'bottom', 'left'];
        
        sides.forEach(side => {
            const sideDiv = document.createElement('div');
            sideDiv.className = 'board-side ' + side;
            
            // Добавляем углы
            if (side === 'top') {
                sideDiv.innerHTML = '<div class="corner go">СТАРТ</div>';
                // Добавляем поля для верхней стороны
                for (let i = 1; i <= 9; i++) {
                    const field = this.fields.find(f => f.id === i);
                    if (field) {
                        sideDiv.innerHTML += this.createFieldHTML(field);
                    }
                }
                sideDiv.innerHTML += '<div class="corner jail">Тюрьма</div>';
            } else if (side === 'right') {
                // Добавляем поля для правой стороны
                for (let i = 11; i <= 19; i++) {
                    const field = this.fields.find(f => f.id === i);
                    if (field) {
                        sideDiv.innerHTML += this.createFieldHTML(field);
                    }
                }
            } else if (side === 'bottom') {
                sideDiv.innerHTML = '<div class="corner free-parking">Бесплатная стоянка</div>';
                // Добавляем поля для нижней стороны (в обратном порядке)
                for (let i = 28; i >= 21; i--) {
                    const field = this.fields.find(f => f.id === i);
                    if (field) {
                        sideDiv.innerHTML += this.createFieldHTML(field);
                    }
                }
                sideDiv.innerHTML += '<div class="corner go-to-jail">В тюрьму</div>';
            } else if (side === 'left') {
                // Добавляем поля для левой стороны (в обратном порядке)
                for (let i = 39; i >= 31; i--) {
                    const field = this.fields.find(f => f.id === i);
                    if (field) {
                        sideDiv.innerHTML += this.createFieldHTML(field);
                    }
                }
            }
            
            boardContainer.appendChild(sideDiv);
        });
        
        // Добавляем центр
        const centerDiv = document.createElement('div');
        centerDiv.className = 'board-center';
        centerDiv.innerHTML = '<div class="editor-info">Кликните на поле для редактирования</div>';
        boardContainer.appendChild(centerDiv);
    }
    
    createFieldHTML(field) {
        if (field.deleted) {
            return `
                <div class="field deleted-field" data-position="${field.id}">
                    <div class="field-color" style="background: #cccccc; border: 2px dashed #999;"></div>
                    <div class="field-name">+</div>
                    <div class="field-price">Создать поле</div>
                </div>
            `;
        }
        
        return `
            <div class="field" data-position="${field.id}">
                <div class="field-color" style="background: ${field.color};"></div>
                <div class="field-name">${field.name}</div>
                ${field.price ? `<div class="field-price">${field.price}₽</div>` : ''}
            </div>
        `;
    }
    
    setupFieldClickHandlers() {
        document.querySelectorAll('.field-editor-page .field').forEach(field => {
            field.addEventListener('click', (e) => {
                const position = parseInt(field.dataset.position);
                const fieldData = this.fields.find(f => f.id === position);
                
                if (fieldData) {
                    if (fieldData.deleted) {
                        // Для удаленных полей сразу открываем форму создания
                        this.selectedField = fieldData;
                        this.showFieldEditForm();
                    } else {
                        this.showFieldActionModal(fieldData);
                    }
                } else {
                    console.warn('Field data not found for position:', position);
                }
            });
        });
    }
    
    showFieldActionModal(field) {
        this.selectedField = field;
        
        const fieldInfo = document.getElementById('fieldInfo');
        const fieldActionModal = document.getElementById('fieldActionModal');
        
        if (!fieldInfo || !fieldActionModal) {
            console.error('Field action modal elements not found');
            return;
        }
        
        fieldInfo.innerHTML = `
            <h4>${field.name}</h4>
            <p><strong>Тип:</strong> ${this.getFieldTypeName(field.type)}</p>
            <p><strong>Стоимость:</strong> ${field.price ? field.price + '₽' : 'Нету'}</p>
            <p><strong>Цвет:</strong> <span style="display: inline-block; width: 20px; height: 20px; background: ${field.color}; border-radius: 3px; vertical-align: middle;"></span> ${field.color}</p>
        `;
        
        fieldActionModal.classList.add('show');
    }
    
    getFieldTypeName(type) {
        const types = {
            'property': 'Недвижимость',
            'railroad': 'Вокзал',
            'utility': 'Коммунальная служба',
            'tax': 'Налог',
            'chance': 'Шанс',
            'community': 'Общественная казна',
            'corner': 'Особое поле'
        };
        return types[type] || type;
    }
    
    closeFieldActionModal() {
        const fieldActionModal = document.getElementById('fieldActionModal');
        if (fieldActionModal) {
            fieldActionModal.classList.remove('show');
        }
        this.selectedField = null;
    }
    
    showFieldEditForm() {
        console.log('showFieldEditForm called, selectedField:', this.selectedField);
        if (!this.selectedField) {
            console.error('No selected field');
            return;
        }
        
        const fieldEditTitle = document.getElementById('fieldEditTitle');
        const fieldName = document.getElementById('fieldName');
        const fieldType = document.getElementById('fieldType');
        const fieldPrice = document.getElementById('fieldPrice');
        const fieldColor = document.getElementById('fieldColor');
        const fieldEditModal = document.getElementById('fieldEditModal');
        
        if (!fieldEditTitle || !fieldName || !fieldType || !fieldPrice || !fieldColor || !fieldEditModal) {
            console.error('Field edit modal elements not found');
            return;
        }
        
        fieldEditTitle.textContent = 
            this.selectedField.deleted ? 'Создание поля' : 
            (this.selectedField.name ? 'Редактирование поля' : 'Создание поля');
        
        fieldName.value = this.selectedField.name || '';
        fieldType.value = this.selectedField.type || 'property';
        fieldPrice.value = this.selectedField.price || 0;
        fieldColor.value = this.selectedField.color || '#000000';
        
        this.closeFieldActionModal();
        fieldEditModal.classList.add('show');
    }
    
    closeFieldEditModal() {
        const fieldEditModal = document.getElementById('fieldEditModal');
        if (fieldEditModal) {
            fieldEditModal.classList.remove('show');
        }
    }
    
    saveField() {
        if (!this.selectedField) return;
        
        const fieldName = document.getElementById('fieldName');
        const fieldType = document.getElementById('fieldType');
        const fieldPrice = document.getElementById('fieldPrice');
        const fieldColor = document.getElementById('fieldColor');
        
        if (!fieldName || !fieldType || !fieldPrice || !fieldColor) {
            console.error('Field edit form elements not found');
            return;
        }
        
        const name = fieldName.value;
        const type = fieldType.value;
        const price = parseInt(fieldPrice.value) || 0;
        const color = fieldColor.value;
        
        const fieldIndex = this.fields.findIndex(f => f.id === this.selectedField.id);
        if (fieldIndex !== -1) {
            this.fields[fieldIndex] = {
                id: this.selectedField.id,
                name,
                type,
                price,
                color,
                deleted: false
            };
        } else {
            // Создание нового поля
            const newId = Math.max(...this.fields.map(f => f.id)) + 1;
            this.fields.push({
                id: newId,
                name,
                type,
                price,
                color,
                deleted: false
            });
        }
        
        this.renderEditorBoard();
        this.setupFieldClickHandlers();
        this.closeFieldEditModal();
        this.showMessage('Поле сохранено!');
    }
    
    deleteField() {
        if (!this.selectedField || this.selectedField.id === 0) return;
        
        const fieldIndex = this.fields.findIndex(f => f.id === this.selectedField.id);
        if (fieldIndex !== -1) {
            // Помечаем поле как удаленное вместо полного удаления
            this.fields[fieldIndex] = {
                id: this.selectedField.id,
                name: '',
                type: 'empty',
                price: 0,
                color: '#cccccc',
                deleted: true
            };
            
            this.renderEditorBoard();
            this.setupFieldClickHandlers();
            this.closeFieldActionModal();
            this.showMessage('Поле удалено! Нажмите на пустое место для создания нового поля.');
        }
    }
    
    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 1000;
            font-size: 1.2em;
            text-align: center;
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }
}

// Инициализация игры
const game = new MonopolyGame();
