document.addEventListener('DOMContentLoaded', function() {
            const chatContainer = document.getElementById('chatContainer');
            const fileInput = document.getElementById('fileInput');
            const uploadBtn = document.getElementById('uploadBtn');
            const downloadBtn = document.getElementById('downloadBtn');
            const progressContainer = document.getElementById('progressContainer');
            const progressBar = document.getElementById('progressBar');
            const progressPercent = document.getElementById('progressPercent');
            const fileName = document.getElementById('fileName');
            const typingIndicator = document.getElementById('typingIndicator');
            
            // Mensagens descontraídas (mais de 50 combinações)
            const funMessages = [
                "Analisando seus números... eles parecem ótimos!",
                "Processando dados com carinho e atenção!",
                "Transformando contas em relatórios mágicos...",
                "Só um instante enquanto organizo essas informações!",
                "Parece que temos dados muito bem comportados por aqui!",
                "Trabalhando mais rápido que um raio contábil!",
                "Isso aqui é mais divertido que quebra-cabeça fiscal!",
                "Transformando números em poesia contábil...",
                "Seus dados estão tomando banho de loja antes da apresentação!",
                "Quase lá! Só mais um pouquinho de paciência...",
                "Estou dando um trato especial no seu arquivo!",
                "Parece que temos um arquivo VIP aqui!",
                "Fazendo malabarismos com as colunas e linhas...",
                "Processando com todo carinho e eficiência!",
                "Seu arquivo está sendo preparado com capricho!",
                "Estou dando um upgrade nas suas informações!",
                "Só um toque final para ficar perfeito!",
                "Isso é mais emocionante que um balancete fechado!",
                "Seus dados estão dançando na linha para você!",
                "Quase pronto! Estou só ajustando os detalhes...",
                "Trabalhando enquanto você espera com elegância!",
                "Transformando dados brutos em informação refinada!",
                "Estou mais rápido que um débito em conta corrente!",
                "Fazendo cálculos com precisão milimétrica!",
                "Sua paciência vale um balancete positivo!",
                "Processando com a velocidade da luz contábil!",
                "Seu arquivo está na fila do spa de dados!",
                "Dados sendo organizados como um exército bem treinado!",
                "Estou afinando os instrumentos contábeis...",
                "Só mais alguns segundos de magia digital!",
                "Parece que temos um arquivo muito bem-educado!",
                "Trabalhando com a eficiência de uma máquina!",
                "Seus números estão sendo penteados para a festa!",
                "Quase pronto para o grande show dos resultados!",
                "Estou mais animado que um contador no fechamento!",
                "Transformando linhas em obras de arte contábil!",
                "Só um instante para deixar tudo impecável!",
                "Processando com a leveza de uma pena fiscal!",
                "Seu arquivo está quase pronto para desfilar!",
                "Dados sendo lapidados como diamantes contábeis!",
                "Trabalho pesado feito com suavidade e graça!",
                "Estou na reta final, preparando a entrega!",
                "Sua espera será recompensada com um ótimo resultado!",
                "Processando com a energia de um balanço positivo!",
                "Seus dados estão sendo abraçados pela eficiência!",
                "Quase lá! Só mais um cafezinho virtual...",
                "Trabalhando como um robô feliz e eficiente!",
                "Transformando números em sorrisos contábeis!",
                "Estou mais rápido que uma duplicata descontada!",
                "Preparando tudo com carinho e profissionalismo!"
            ];
            
            // Simulação do dicionário de classificação contábil
            const classificacaoContabil = {
                "52": "1.1.01.01.01",
                "75": "1.1.01.02.01",
                "81": "1.1.01.02.02",
                "98": "1.1.01.02.03",
                "106": "1.1.01.02.04",
                "112": "1.1.01.02.05",
                "129": "1.1.01.02.06",
                "171": "1.1.02.01.01",
                "187": "1.1.02.01.02",
                "193": "1.1.02.01.03",
                "201": "1.1.02.01.04",
                "260": "1.1.02.02.01",
                "276": "1.1.02.02.02",
                "299": "1.1.02.03.01",
                "307": "1.1.02.03.02",
                "313": "1.1.02.03.03",
                "7019": "1.1.02.03.04",
                "9099": "1.1.02.01.08",
                "2128": "2.1.05.01.13",
                "2743": "3.1.03.03.01",
                "2499": "3.1.01.01.02"
            };
            
            // Fornecedores estrangeiros
            const fornecedoresEstrangeiros = {
                "DANIEL GEIBER": "1.1.02.15.02",
                "REMAQ": "1.1.02.15.03",
                "EDGAR ANTONIO CALDER": "1.1.02.15.04",
                "BRASIL SOMIERES": "1.1.02.15.05",
                "VICTOR MONTENEGRO": "1.1.02.15.06",
                "LEPAL SRL": "1.1.02.15.07",
                "TABLECONFORT": "1.1.02.15.08",
                "AUDISIO FERNANDO": "1.1.02.15.09",
                "DISTRIBUIDORA NACION": "1.1.02.15.10",
                "JOSE LIMBER": "1.1.02.15.11",
                "PEREZ Y MONTENEGRO S": "1.1.02.15.12",
                "GUSTAVO EDUARDO TERR": "1.1.02.15.13",
                "ABBA TRANDING SRL": "1.1.02.15.16",
                "GRUPO TERRACENTER S.": "1.1.02.15.18",
                "SHOW S/A": "1.1.02.15.20",
                "COMERCIAL Y SERV VAS": "1.1.02.15.19",
                "LUMI FI LIC": "1.1.02.15.21"
            };
            
            // Regras de processamento
            const regras = [
                { deb: "106", cred: "7019", novoCred: "171", tipoTitulo: "3", acao: "MUDA CRED" },
                { deb: "112", cred: "7019", novoCred: "171", tipoTitulo: "3", acao: "MUDA CRED" },
                { deb: "201", cred: "7019", novoCred: "171", tipoTitulo: "3", acao: "MUDA CRED" },
                { deb: "8183", cred: "7019", novoCred: "171", tipoTitulo: "3", acao: "MUDA CRED" },
                { deb: "1494", cred: "9099", novoCred: "171", tipoTitulo: "3", acao: "MUDA CRED" },
                { deb: "1494", cred: "9099", novoCred: "2743", tipoTitulo: "6", acao: "MUDA CRED" },
                { deb: "7019", cred: "187", novoCred: "313", tipoTitulo: null, acao: "MUDA CRED" },
                { deb: "201", cred: "9099", novoCred: "171", tipoTitulo: "3", acao: "MUDA CRED" },
                { deb: "201", cred: "9099", novoCred: "2743", tipoTitulo: "6", acao: "MUDA CRED" },
                { deb: "171", cred: "171", acao: "EXCLUIR" },
                { deb: "2128", cred: "2743", novoCred: "2832", tipoTitulo: null, acao: "MUDA CRED" },
                { deb: "2128", cred: "9099", novoCred: "171", tipoTitulo: null, acao: "MUDA CRED" },
                { deb: "106", cred: "9099", novoCred: "171", tipoTitulo: "3", acao: "MUDA CRED" },
                { deb: "112", cred: "9099", novoCred: "171", tipoTitulo: "3", acao: "MUDA CRED" },
                { deb: "201", cred: "9099", novoCred: "171", tipoTitulo: "3", acao: "MUDA CRED" },
                { deb: "8183", cred: "9099", novoCred: "171", tipoTitulo: "3", acao: "MUDA CRED" },
                { deb: "106", cred: "9099", novoCred: "2743", tipoTitulo: "6", acao: "MUDA CRED" },
                { deb: "112", cred: "9099", novoCred: "2743", tipoTitulo: "6", acao: "MUDA CRED" },
                { deb: "201", cred: "9099", novoCred: "2743", tipoTitulo: "6", acao: "MUDA CRED" },
                { deb: "8183", cred: "9099", novoCred: "2743", tipoTitulo: "6", acao: "MUDA CRED" },
                { deb: "9099", cred: "9099", acao: "EXCLUIR" },
                { deb: "9099", cred: "2743", acao: "EXCLUIR" },
                { deb: "8802", cred: "2743", acao: "EXCLUIR" },
                { deb: "276", cred: null, acao: "VERIFICA CLIENTE", fornecedores: fornecedoresEstrangeiros }
            ];
            
            let processedFileContent = '';
            
            // Função para adicionar mensagem no chat
            function addMessage(text, isBot = true) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
                messageDiv.innerHTML = text;
                
                const timeDiv = document.createElement('div');
                timeDiv.className = 'time';
                timeDiv.textContent = 'Agora';
                
                messageDiv.appendChild(timeDiv);
                chatContainer.appendChild(messageDiv);
                
                // Scroll para o final
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
            
            // Função para mostrar o indicador de digitação
            function showTyping() {
                typingIndicator.style.display = 'block';
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
            
            // Função para esconder o indicador de digitação
            function hideTyping() {
                typingIndicator.style.display = 'none';
            }
            
            // Função para simular processamento
            function simulateProcessing(file) {
                showTyping();
                progressContainer.style.display = 'block';
                fileName.textContent = file.name;
                
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.floor(Math.random() * 10) + 1;
                    if (progress > 100) progress = 100;
                    
                    progressBar.style.width = `${progress}%`;
                    progressPercent.textContent = `${progress}%`;
                    
                    // Mensagens aleatórias durante o processamento
                    if (progress % 25 === 0) {
                        const randomIndex = Math.floor(Math.random() * funMessages.length);
                        addMessage(funMessages[randomIndex]);
                    }
                    
                    // Adicionar etapas de processamento
                    if (progress === 25) {
                        addMessage('<div class="processing-steps">' +
                            '<div class="step"><i class="fas fa-check-circle success"></i> Arquivo validado com sucesso!</div>' +
                            '<div class="step"><i class="fas fa-spinner processing"></i> Aplicando regras de processamento...</div>' +
                            '<div class="step"><i class="far fa-clock"></i> Convertendo códigos contábeis...</div>' +
                            '<div class="step"><i class="far fa-clock"></i> Gerando arquivo de saída...</div>' +
                        '</div>');
                    }
                    
                    if (progress === 50) {
                        addMessage('<div class="processing-steps">' +
                            '<div class="step"><i class="fas fa-check-circle success"></i> Arquivo validado com sucesso!</div>' +
                            '<div class="step"><i class="fas fa-check-circle success"></i> Regras de processamento aplicadas!</div>' +
                            '<div class="step"><i class="fas fa-spinner processing"></i> Convertendo códigos contábeis...</div>' +
                            '<div class="step"><i class="far fa-clock"></i> Gerando arquivo de saída...</div>' +
                        '</div>');
                    }
                    
                    if (progress === 75) {
                        addMessage('<div class="processing-steps">' +
                            '<div class="step"><i class="fas fa-check-circle success"></i> Arquivo validado com sucesso!</div>' +
                            '<div class="step"><i class="fas fa-check-circle success"></i> Regras de processamento aplicadas!</div>' +
                            '<div class="step"><i class="fas fa-check-circle success"></i> Códigos contábeis convertidos!</div>' +
                            '<div class="step"><i class="fas fa-spinner processing"></i> Gerando arquivo de saída...</div>' +
                        '</div>');
                    }
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        hideTyping();
                        
                        // Simulação de processamento completo
                        addMessage('<div class="processing-steps">' +
                            '<div class="step"><i class="fas fa-check-circle success"></i> Arquivo validado com sucesso!</div>' +
                            '<div class="step"><i class="fas fa-check-circle success"></i> Regras de processamento aplicadas!</div>' +
                            '<div class="step"><i class="fas fa-check-circle success"></i> Códigos contábeis convertidos!</div>' +
                            '<div class="step"><i class="fas fa-check-circle success"></i> Arquivo de saída gerado!</div>' +
                        '</div>');
                        
                        addMessage('Processamento concluído com sucesso! 🎉<br>Seu arquivo está pronto para download.');
                        downloadBtn.style.display = 'block';
                        
                        // Gerar conteúdo de exemplo para download
                        processedFileContent = `||26/02/2025|79124079000201|3.1.01.01.02||1565,85|D|956|1-423947-001|
||26/02/2025|79124079000201|3.1.01.01.08||1565,85|C|956|1-423947-001|
||26/02/2025|79124079000201|3.1.01.01.02||1162,85|D|956|1-423948-001|
||26/02/2025|79124079000201|3.1.01.01.02||1162,85|C|956|1-423948-001|`;
                    }
                }, 300);
            }
            
            // Evento de clique no botão de upload
            uploadBtn.addEventListener('click', () => {
                fileInput.click();
            });
            
            // Evento de seleção de arquivo
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    addMessage(`Arquivo enviado: <strong>${file.name}</strong>`, false);
                    
                    // Simular processamento
                    addMessage('Recebi seu arquivo! Vou começar o processamento agora mesmo...');
                    simulateProcessing(file);
                }
            });
            
            // Evento de clique no botão de download
            downloadBtn.addEventListener('click', () => {
                const blob = new Blob([processedFileContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = 'arquivo_processado.txt';
                document.body.appendChild(a);
                a.click();
                
                // Limpeza
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 100);
                
                addMessage('Arquivo baixado com sucesso! Espero que tenha sido útil 😊');
                addMessage('Quando quiser processar outro arquivo, é só enviar novamente!');
            });
        });