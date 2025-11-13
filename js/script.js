// Sistema de nickname temporário com nomes únicos
    const nicknameSection = document.getElementById('nickname-section');
    const userInfo = document.getElementById('user-info');
    const currentNicknameSpan = document.getElementById('current-nickname');
    const nicknameForm = document.getElementById('nickname-form');
    const nicknameInput = document.getElementById('nickname-input');
    const nicknameError = document.getElementById('nickname-error');
    const changeNickBtn = document.getElementById('change-nick-btn');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    let currentNickname = null;
    let usedNicknames = new Set(); // Conjunto para armazenar nicknames em uso

    // Verificar se já existe um nickname na sessão atual
    window.addEventListener('load', () => {
        const savedNickname = sessionStorage.getItem('lainNickname');
        if (savedNickname && !usedNicknames.has(savedNickname)) {
            setNickname(savedNickname);
        }
    });

    // Configurar nickname
    nicknameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nickname = nicknameInput.value.trim();
        
        if (nickname) {
            // Verificar se o nickname já está em uso
            if (usedNicknames.has(nickname)) {
                nicknameError.style.display = 'block';
                setTimeout(() => {
                    nicknameError.style.display = 'none';
                }, 3000);
                return;
            }
            
            setNickname(nickname);
            nicknameInput.value = '';
        }
    });

    // Alterar nickname
    changeNickBtn.addEventListener('click', () => {
        // Remover nickname atual da lista de usados
        if (currentNickname) {
            usedNicknames.delete(currentNickname);
        }
        
        // Mostrar novamente o formulário de nickname
        userInfo.style.display = 'none';
        nicknameSection.style.display = 'block';
        
        // Limpar nickname atual
        currentNickname = null;
        sessionStorage.removeItem('lainNickname');
        
        // Desabilitar chat
        messageInput.disabled = true;
        sendBtn.disabled = true;
        messageInput.placeholder = 'Set a nickname first...';
        
        // Mensagem no chat
        addMessageToChat('System', 'Nickname reset. Please choose a new temporary nickname.', true);
        
        // Adicionar notificação discreta
        showNotification('Something changed in the Wired');
    });

    function setNickname(nickname) {
        // Sanitizar nickname
        const sanitizedNickname = sanitizeHTML(nickname.substring(0, 20));
        
        // Adicionar à lista de nicknames usados
        usedNicknames.add(sanitizedNickname);
        
        // Definir nickname atual
        currentNickname = sanitizedNickname;
        
        // Salvar na sessionStorage (apenas para esta sessão)
        sessionStorage.setItem('lainNickname', sanitizedNickname);
        
        // Atualizar interface
        nicknameSection.style.display = 'none';
        userInfo.style.display = 'block';
        currentNicknameSpan.textContent = sanitizedNickname;
        
        // Habilitar chat
        messageInput.disabled = false;
        sendBtn.disabled = false;
        messageInput.placeholder = 'Type your message (will not be saved)...';
        
        // Mensagem de boas-vindas
        addMessageToChat('System', `User "${sanitizedNickname}" has joined the chat. Nickname is temporary and will be lost on refresh.`, true);
        
        // Adicionar notificação discreta
        showNotification('Something changed in the Wired');
    }

    // Função para exibir notificação
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Mostrar a notificação
        setTimeout(() => {
            notification.classList.add('show');
        }, 10); // Pequeno delay para iniciar a transição
        
        // Remover após 2 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500); // Tempo da transição
        }, 2000);
    }

    // Navegação entre abas
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe active de todos os botões e seções
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            button.classList.add('active');
            
            // Mostra a seção correspondente
            const target = button.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Efeito Matrix de caracteres caindo
    function createMatrixEffect() {
        const matrixEffect = document.getElementById('matrixEffect');
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const fontSize = 12;
        const maxColumns = 100; // Aumentar o limite máximo para cobrir telas largas
        const columns = Math.min(Math.floor(window.innerWidth / fontSize), maxColumns); // Remover a divisão por 2
        
        // Cria as colunas
        for (let i = 0; i < columns; i++) {
            const x = i * fontSize * 1.5; // Reduzir espaçamento para fontSize * 1.5
            const y = Math.random() * -100;
            const delay = Math.random() * 2; // Manter delay em 0-2 segundos
            const duration = 2 + Math.random() * 3; // Manter duração em 2-5 segundos
            
            const charIndex = Math.floor(Math.random() * characters.length);
            const character = characters[charIndex];
            
            const matrixChar = document.createElement('div');
            matrixChar.classList.add('matrix-char');
            matrixChar.textContent = character;
            matrixChar.style.left = `${x}px`;
            matrixChar.style.top = `${y}px`;
            matrixChar.style.animationDuration = `${duration}s`;
            matrixChar.style.animationDelay = `${delay}s`;
            
            matrixEffect.appendChild(matrixChar);
            
            // Remove o caractere após a animação terminar
            setTimeout(() => {
                matrixChar.remove();
            }, (duration + delay) * 1000);
        }
    }

    // Inicia o efeito Matrix e repete a cada 1000ms
    setInterval(createMatrixEffect, 1000);
    createMatrixEffect(); // Executa uma vez imediatamente

    // Animação de Rede Wireframe
    function createNetworkAnimation() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const networkAnimation = document.getElementById('networkAnimation');
        networkAnimation.appendChild(canvas);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const nodes = [];
        const nodeCount = 20; // Número de nós
        const maxDistance = 150; // Distância máxima para linhas de conexão

        // Criar nós aleatórios
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5, // Movimento lento
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        function animateNetwork() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(0, 170, 255, 0.3)';
            ctx.fillStyle = 'rgba(0, 170, 255, 0.5)';
            ctx.lineWidth = 1;

            // Atualizar posições dos nós
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                // Rebater nas bordas
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Desenhar nó
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });

            // Desenhar linhas entre nós próximos
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateNetwork);
        }

        // Lidar com redimensionamento da janela
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        animateNetwork();
    }

    // Iniciar a animação de rede
    createNetworkAnimation();

    // Sistema de chat efêmero (nada é salvo)
    const chatContainer = document.getElementById('chat-container');
    const typingIndicator = document.getElementById('typing-indicator');

    let messageTimeout;
    let messageCount = 0;

    // Função para adicionar mensagem ao chat (não salva em lugar nenhum)
    function addMessageToChat(user, text, isSystem = false) {
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        if (isSystem) {
            messageElement.classList.add('system-msg');
        } else if (user === currentNickname) {
            messageElement.classList.add('user-message');
        } else {
            messageElement.classList.add('other-user-message');
        }
        
        // Sanitizar texto para prevenir XSS
        const sanitizedText = sanitizeHTML(text);
        const sanitizedUser = sanitizeHTML(user);
        
        messageElement.innerHTML = `
            <span class="timestamp">[${timestamp}]</span>
            <span class="username">${sanitizedUser}:</span>
            <span class="text">${sanitizedText}</span>
        `;
        
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Limitar número de mensagens visíveis
        messageCount++;
        if (messageCount > 20) {
            // Remover a mensagem mais antiga com efeito de fade
            const oldestMessage = chatContainer.querySelector('.message');
            oldestMessage.classList.add('fade-out');
            
            setTimeout(() => {
                if (oldestMessage.parentNode) {
                    oldestMessage.parentNode.removeChild(oldestMessage);
                }
            }, 1500);
        }
        
        // Programar desaparecimento desta mensagem também
        setTimeout(() => {
            if (messageElement.parentNode && !messageElement.classList.contains('system-msg')) {
                messageElement.classList.add('fade-out');
                setTimeout(() => {
                    if (messageElement.parentNode) {
                        messageElement.parentNode.removeChild(messageElement);
                    }
                }, 1500);
            }
        }, 30000); // Mensagens desaparecem após 30 segundos
    }

    // Função para sanitizar HTML e prevenir XSS
    function sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // Simular digitação
    messageInput.addEventListener('input', () => {
        clearTimeout(messageTimeout);
        typingIndicator.style.display = 'block';
        
        messageTimeout = setTimeout(() => {
            typingIndicator.style.display = 'none';
        }, 1000);
    });

    // Enviar mensagem
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        if (!currentNickname) {
            addMessageToChat('System', 'Please set a nickname first.', true);
            return;
        }
        
        const messageText = messageInput.value.trim();
        if (messageText) {
            // Esconder indicador de digitação
            typingIndicator.style.display = 'none';
            
            // Adicionar mensagem ao chat
            addMessageToChat(currentNickname, messageText);
            
            // Limpar campo de entrada
            messageInput.value = '';
        }
    }

    // Adicionar algumas mensagens iniciais
    setTimeout(() => {
        addMessageToChat('System', 'This chat does not store any messages. Everything is temporary.', true);
    }, 1500);

    setTimeout(() => {
        addMessageToChat('System', 'Your nickname is temporary, unique, and will be lost when you refresh the page.', true);
    }, 4000);

    // Sistema de download
    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filename = this.getAttribute('data-file');
            const button = this;
            
            // Efeito visual
            button.textContent = 'DOWNLOADING...';
            button.disabled = true;
            
            // Simular download
            setTimeout(() => {
                // Criar um link de download simulado
                const element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,This is a simulation of downloading ' + filename);
                element.setAttribute('download', filename);
                
                element.style.display = 'none';
                document.body.appendChild(element);
                
                element.click();
                
                document.body.removeChild(element);
                
                // Restaurar botão
                button.textContent = 'DOWNLOAD';
                button.disabled = false;
                
                // Mensagem de confirmação
                addMessageToChat('System', `Download initiated: ${filename}`, true);
            }, 1500);
        });
    });

    // Efeito de glitch aleatório nos títulos
    setInterval(() => {
        const titles = document.querySelectorAll('h1, h2, h3');
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        
        randomTitle.classList.add('glitch-effect');
        
        setTimeout(() => {
            randomTitle.classList.remove('glitch-effect');
        }, 200);
    }, 3000);

    // Gerar nicknames aleatórios sugestivos
    const randomNames = [
        'Lain', 'Alice', 'Arisu', 'Yasuo', 'Taro', 'Tachibana',
        'Protocol7', 'Knights', 'Phantom', 'Eiri', 'Masami',
        'Wired', 'Network', 'Protocol', 'Connection', 'Node',
        'Shadow', 'Ghost', 'Echo', 'Vector', 'Null', 'Void'
    ];

    // Sugerir um nickname aleatório
    window.addEventListener('load', () => {
        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)] + 
                        Math.floor(Math.random() * 99);
        nicknameInput.placeholder = `e.g. ${randomName}`;
    });