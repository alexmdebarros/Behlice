const chatWindow = document.getElementById('chat-window');
const uploadButton = document.getElementById('upload-button');
const downloadButton = document.getElementById('download-button');
const fileInput = document.getElementById('file-input');
const typingStatus = document.getElementById('typing-status');
const inputArea = document.getElementById('input-area');
const moduleSelectionArea = document.getElementById('module-selection-area');

// --- NOVO: Variável para controlar o estado do módulo
let selectedModule = null;

// Frases para cada etapa do sistema
const mensagens = {
    // --- NOVO: Mensagens iniciais para escolha do módulo ---
    saudacaoInicial: [
        "Behlice na área, pronto para a ação! 🚀",
        "E aí! Tudo pronto para organizar a casa hoje?",
        "Olá! Seu assistente contábil favorito chegou.",
        "Cheguei pra botar ordem na bagunça! Qual a missão de hoje?",
        "Oi, sumido(a)! Que bom te ver. Vamos trabalhar?"
    ],
    perguntaModulo: [
        "Para começar, me diga qual módulo você quer usar:",
        "Qual departamento precisa da minha genialidade hoje?",
        "Escolha sua aventura contábil de hoje:",
        "Me diga onde a mágica vai acontecer:",
        "Selecione uma opção pra gente começar os trabalhos:"
    ],
    // --- NOVO: Mensagens para módulos em desenvolvimento ---
    emDesenvolvimento: [
        "Opa! Essa parte ainda está no forno. 👨‍🍳 Logo logo fica pronta! Que tal tentar outro módulo?",
        "Calma, pequeno gafanhoto! Meus desenvolvedores ainda estão construindo esta maravilha. Tente outra opção.",
        "Recebi seu pedido, mas essa funcionalidade está sendo tunada na oficina. 🛠️ Escolha outro caminho por enquanto.",
        "Quase lá! Essa função está na fase beta. Em breve, estará disponível para você. Que tal explorar outro módulo?",
        "Essa área está em construção! Capacete obrigatório. 👷‍♂️ Por segurança, escolha outra opção.",
        "Spoiler: essa funcionalidade vai ser incrível! Mas ainda não foi lançada. Tente um módulo que já está no ar!",
        "Um feiticeiro nunca se atrasa, nem se adianta. Ele chega exatamente quando pretende. E eu ainda não pretendi finalizar esse módulo. 😄 Outra opção?",
        "Estou fazendo um upgrade nos meus circuitos para este módulo. Tente mais tarde, por favor. Ou melhor, tente outro agora mesmo!",
        "Página em construção... com muito carinho e código. Volte em breve! Enquanto isso, os outros módulos estão a todo vapor.",
        "Ainda não é a hora e a vez deste módulo brilhar. Mas vai chegar! Por agora, temos outras estrelas no palco."
    ],
    // --- MENSAGENS DE BOAS-VINDAS (Agora para o CAR) ---
    boasVindasCAR: [
        "Contas a Receber, entendi! Pode mandar a planilha que o show de organização vai começar.",
        "Show! Preparado(a) para ver seus recebimentos dançando na ordem certa? Envia o arquivo!",
        "Ouvi dizer que tem umas contas a receber precisando de um herói. O Capitão Conciliação chegou!",
        "Beleza, CAR na cabeça! Prepare o café, porque a mágica contábil está prestes a acontecer. Só falta o arquivo.",
        "Ok, Contas a Receber! Vamos transformar esse caos de dados em uma sinfonia de relatórios."
    ],
    // --- MENSAGENS DE INÍCIO DE PROCESSAMENTO ---
    inicioProcessamento: [
        "Ok, arquivo na mão! Colocando meu capacete e óculos de proteção. Mergulhando nos dados!",
        "Entendido! Iniciando a varredura inicial. O cheiro de café e lógica está no ar.",
        "Recebido! Agora começa a parte divertida. Calibrando meus algoritmos para a sua realidade.",
        "Beleza! Deixa eu desenrolar esse novelo de números. Modo detetive ativado.",
        "Hora do show! Acendendo as luzes do palco e chamando as regras para a cena.",
    ],
    // ... (O restante do seu objeto 'mensagens' continua aqui, sem alterações)
    progresso25: [
        "25% no papo! Já aqueci os motores e peguei o ritmo da estrada.",
        "Um quarto do caminho já foi! As coisas estão começando a tomar forma por aqui. 🚂",
        "25% concluído. Já encontrei uma vírgula tímida fora do lugar e a coloquei de volta na festa.",
        "Primeiro checkpoint alcançado! 25% dos dados já estão de cara nova.",
        "Chegamos aos 25%. Isso está mais fácil do que explicar o que é débito e crédito pra um leigo."
    ],
    progresso50: [
        "Metade do caminho! Estamos no topo da montanha-russa, agora é só descida! 🎢",
        "50% na conta! Já processei mais linhas do que a quantidade de café que você deveria tomar hoje.",
        "Metade da missão cumprida! Seus dados já estão com 50% a mais de 'incrível'.",
        "Chegamos na metade do livro. E posso adiantar: o mocinho (o saldo) sobrevive no final.",
        "50% pronto! A planilha está suando, mas eu estou tranquilo como um monge programador."
    ],
    progresso75: [
        "Na reta final! 75% concluído. Já consigo sentir o cheirinho de arquivo pronto!",
        "Falta pouco! Só mais um gás e cruzamos a linha de chegada. 75% no placar. 🏁",
        "Estamos a 75%. A festa já está montada, só faltam os últimos convidados (dados) chegarem.",
        "Quase lá! 75% dos seus problemas com essa planilha já foram resolvidos por mim.",
        "Três quartos da jornada! A luz no fim do túnel de dados está forte e clara agora."
    ],
    resumoLinhasExcluidas: [
        "🧹 Passei a porva em <b>X</b> linhas, que descansem em paz nas 'nuvens🤣'.",
        "🧹 Faxina concluída. <b>X</b> registro(s) que estavam sobrando foram convidados a se retirar.",
        "Fiz a curadoria dos seus dados. <b>X</b> linha(s) não passaram no meu controle de qualidade.",
        "Operação 'Limpa Planilha' foi um sucesso. Saldo: <b>X</b> linha(s) a menos de bagunça.",
        "Como um bom editor, cortei o que não era necessário. <b>X</b> linha(s) foram para a lixeira."
    ],
    resumoContas: [
        "📊 As estrelas do rock deste lote! Estas contas não saíram da pista de dança:\n\n{listaContas}",
        "Confira o 'Top 5' das contas mais tagarelas. Elas tinham muito a dizer:\n\n{listaContas}",
        "E o Oscar de 'Conta Mais Ativa' vai para... na verdade, são várias! O ranking:\n\n{listaContas}",
        "Estas contas foram as 'donas da festa'. Apareceram em todos os lugares:\n\n{listaContas}",
        "Radar de atividade: detectei alta frequência de movimentos nestas contas:\n\n{listaContas}"
    ],
    resumoGrupo: [
        "📈 Análise de duplas: os pares Débito/Crédito que mais trabalharam juntos:\n\n{listaGrupos}",
        "Mapa de relacionamentos: os 'casais' de contas que mais movimentaram valores:\n\n{listaGrupos}",
        "Deu match! Aqui estão as combinações D/C e o total que elas transacionaram:\n\n{listaGrupos}",
        "Sinergia contábil: o resultado financeiro de cada parceria entre contas:\n\n{listaGrupos}",
        "Quem conversa com quem? Veja o volume de 'papo' (em R$) por dupla de contas:\n\n{listaGrupos}"
    ],
    resumoExcluidasPorGrupo: [
        "🚫 Os 'casais' que não se deram bem e foram expulsos da festa (e seus valores):\n\n{listaExcluidas}",
        "🚫 Análise de rejeição: o valor total descartado para cada combinação D/C:\n\n{listaExcluidas}",
        "🚫 O 'triângulo das bermudas' do seu arquivo. Grana que sumiu por dupla de contas:\n\n{listaExcluidas}",
        "🚫 As duplas que não passaram na audição. O valor que elas teriam movimentado:\n\n{listaExcluidas}",
        "🚫 Relatório de perdas: o montante que foi limado por cada tipo de par D/C:\n\n{listaExcluidas}"
    ],
    resumoClientes: [
        "👥 Contagem de elenco: <b>X</b> clientes únicos participaram desta operação.",
        "👥 A festa foi boa! Tivemos <b>X</b> convidados (clientes) diferentes na lista.",
        "Passei a lista de presença: <b>X</b> CPFs/CNPJs distintos marcaram ponto.",
        "Análise demográfica: <b>X</b> entidades únicas foram processadas.",
        "Cada um é cada um. E aqui, tivemos <b>X</b> 'cada uns' diferentes."
    ],
    resumoValores: [
        "💰 Saldo da operação: R$ <b>A</b> entraram na dança e R$ <b>B</b> ficaram de fora.",
        "💸 O placar final: R$ <b>A</b> (Processados) vs R$ <b>B</b> (Excluídos).",
        "No fim das contas (literalmente): R$ <b>A</b> foram para o relatório e R$ <b>B</b> para o limbo.",
        "Dinheiro na mesa: R$ <b>A</b>. Dinheiro na lixeira: R$ <b>B</b>. Tudo limpo e claro!",
        "O que importa: R$ <b>A</b>. O que foi descartado: R$ <b>B</b>. Simples assim."
    ],
    resumoMedia: [
        "📈 Qual o valor do show? Em média, cada ato (transação) custou R$ <b>C</b>.",
        "📈 Pingado ou expresso? O lançamento médio foi de R$ <b>C</b>.",
        "Analisando o pulso do seu arquivo, a batida média foi de R$ <b>C</b> por movimento.",
        "Se cada transação fosse um tijolo, o peso médio de cada um seria R$ <b>C</b>.",
        "Para ter uma ideia, o valor típico de cada linha processada foi de R$ <b>C</b>."
    ],
    resumoErros: [
        "⚠️ Opa, alerta! <b>EE</b> débito(s) e <b>FF</b> crédito(s) estão sem crachá (não achei no dicionário).",
        "⚠️ Sinal amarelo! Encontrei <b>EE</b> conta(s) de débito e <b>FF</b> de crédito perdidas no limbo do não-mapeamento.",
        "⚠️ Detetive Behlice informa: temos um mistério. <b>EE</b> D e <b>FF</b> C não constam nos meus registros.",
        "⚠️ Faltou na chamada! <b>EE</b> conta(s) de débito e <b>FF</b> de crédito não responderam 'presente!'.",
        "⚠️ Meu dicionário de contas precisa de uma atualização. Ficaram de fora: <b>EE</b> débitos e <b>FF</b> créditos."
    ],
    tempoExecucao: [
        "⏱️ Num piscar de olhos! Levei só <b>T</b> segundos (~<b>U</b> min) pra fazer toda a mágica.",
        "⏱️ Mais rápido que o The Flash com cafeína: <b>T</b> segundos (~<b>U</b> min).",
        "⏱️ O tempo voa quando a gente se diverte (com números). Foram <b>T</b>s (~<b>U</b>min).",
        "⏱️ Missão cumprida em tempo recorde: <b>T</b> segundos (~<b>U</b> min).",
        "⏱️ Em <b>T</b>s (~<b>U</b>min), fiz o que levaria horas. Pode aplaudir, eu não me importo."
    ],
    economia: [
        "🚀 Contabilidade de tempo: você economizou <b>E</b> segundos (~<b>F</b> min)! Use-os com sabedoria.",
        "🚀 Behlice te deu um presente: <b>F</b> minuto(s) de vida de volta. De nada!",
        "🚀 Se tempo é dinheiro, acabei de te dar um bônus. Foram <b>E</b> segundos de economia.",
        "🚀 Menos tempo na planilha, mais tempo para... qualquer outra coisa! Economia de <b>F</b> min.",
        "🚀 O relógio agradece. <b>E</b> segundos que não serão gastos com cliques repetitivos."
    ],
    conclusao: [
        "E... pronto! ✨ Pode pegar seu arquivo, ele saiu do forno agora, quentinho e organizado.",
        "Tcharam! A metamorfose está completa. Sua lagarta de dados virou uma borboleta de relatórios.",
        "Missão finalizada com sucesso. O arquivo está limpo, cheiroso e te esperando para o download.",
        "Voilà! Como num passe de mágica, a bagunça sumiu. O resultado está a um clique.",
        "Trabalho feito. Pode conferir, está mais alinhado que desfile de 7 de setembro."
    ],
    espera: [
        "Ué, cadê os dados? Acho que esse arquivo veio só com o cheiro.",
        "Recebi um fantasma. Um arquivo sem conteúdo. Teria um com mais 'substância'?",
        "Alô? Tem alguém aí? Parece que esse arquivo está vazio. Manda outro!",
        "Este arquivo está mais vazio que cinema em dia de final de campeonato. Tenta de novo?",
        "Acho que você me enviou o rascunho do rascunho. Não encontrei nada para processar aqui."
    ],
    erroGeral: [
        "😱 Deu tilt nos meus circuitos! Algo inesperado aconteceu. Que tal um F5 e tentar de novo?",
        "🚨 Houston, we have a problem! Aconteceu um erro que nem eu esperava. Reinicie, por favor.",
        "🥴 Buguei! Minha inteligência artificial tirou uma folga. Tente reenviar que eu chamo ela de volta.",
        "⚙️ Uma engrenagem pulou fora aqui. Se o problema persistir, chame o mecânico (suporte).",
        "💥 Implosão de lógica! Às vezes acontece. Vamos tentar do zero? Envie o arquivo novamente."
    ],
    perguntaProximoPasso: [
        "E aí, missão cumprida por aqui! O que faremos agora?",
        "Prontinho! Qual o próximo desafio? Continuamos neste módulo ou partimos para outro?",
        "Feito! Deseja processar outro arquivo aqui ou quer voltar ao menu principal?",
        "Tudo certo! E agora, qual é o plano?",
        "Mais um pra conta! Me diga, o que vem a seguir?"
    ]
};

const CNPJ_FIXO = "79124079000201";
const dicionarioContas = {
    '8802': '1.1.01.02.19', '52': '1.1.01.01.01', '75': '1.1.01.02.01', '81': '1.1.01.02.02',
    '98': '1.1.01.02.03', '106': '1.1.01.02.04', '112': '1.1.01.02.05', '129': '1.1.01.02.06',
    '6557': '1.1.01.02.07', '6541': '1.1.01.02.08', '6534': '1.1.01.02.09', '419': '1.1.01.02.10',
    '7411': '1.1.01.02.11', '8183': '1.1.01.02.12', '8214': '1.1.01.02.13', '8674': '1.1.01.02.14',
    '8801': '1.1.01.02.16', '7114': '1.1.01.03.01', '141': '1.1.01.03.02', '8616': '1.1.01.03.05',
    '8651': '1.1.01.03.06', '8668': '1.1.01.03.07', '8987': '1.1.01.03.10', '9113': '1.1.01.03.11',
    '9136': '1.1.01.03.12', '9159': '1.1.01.03.13', '9165': '1.1.01.03.14', '9166': '1.1.01.03.15',
    '171': '1.1.02.01.01', '187': '1.1.02.01.02', '193': '1.1.02.01.03', '201': '1.1.02.01.04',
    '7321': '1.1.02.01.05', '8409': '1.1.02.01.06', '9099': '1.1.02.01.08', '260': '1.1.02.02.01',
    '276': '1.1.02.02.02', '7090': '1.1.02.02.03', '299': '1.1.02.03.01', '307': '1.1.02.03.02',
    '313': '1.1.02.03.03', '7019': '1.1.02.03.04', '9171': '1.1.02.03.05', '336': '1.1.02.04.01',
    '359': '1.1.02.05.01', '365': '1.1.02.05.02', '371': '1.1.02.05.03', '388': '1.1.02.05.04',
    '394': '1.1.02.05.05', '402': '1.1.02.05.06', '425': '1.1.02.05.07', '431': '1.1.02.05.08',
    '454': '1.1.02.06.01', '461': '1.1.02.06.02', '477': '1.1.02.06.03', '483': '1.1.02.06.04',
    '490': '1.1.02.06.05', '508': '1.1.02.06.06', '514': '1.1.02.06.07', '521': '1.1.02.06.08',
    '537': '1.1.02.06.09', '550': '1.1.02.07.01', '566': '1.1.02.07.02', '589': '1.1.02.08.01',
    '595': '1.1.02.08.02', '603': '1.1.02.08.03', '610': '1.1.02.08.04', '626': '1.1.02.08.05',
    '627': '1.1.02.08.06', '655': '1.1.03.01.01', '678': '1.1.03.02.01', '691': '1.1.03.03.01',
    '715': '1.1.03.04.01', '721': '1.1.03.04.02', '738': '1.1.03.04.03', '744': '1.1.03.04.04',
    '751': '1.1.03.04.05', '773': '1.1.03.05.01', '780': '1.1.03.05.02', '796': '1.1.03.05.03',
    '833': '1.2.01.01.01', '856': '1.2.01.02.01', '862': '1.2.01.02.02', '879': '1.2.01.02.03',
    '885': '1.2.01.02.04', '6936': '1.2.01.02.05', '900': '1.2.01.03.01', '916': '1.2.01.03.02',
    '939': '1.2.01.04.01', '951': '1.2.01.05.01', '968': '1.2.01.05.02', '981': '1.2.01.06.01',
    '997': '1.2.01.06.02', '6712': '1.2.01.06.03', '7083': '1.2.01.06.07', '1028': '1.2.02.01.01',
    '1034': '1.2.02.01.02', '1041': '1.2.02.01.03', '1063': '1.2.02.02.01', '1070': '1.2.02.02.02',
    '1086': '1.2.02.02.03', '1117': '1.2.03.01.01', '1123': '1.2.03.01.02', '1130': '1.2.03.01.03',
    '1146': '1.2.03.01.04', '1152': '1.2.03.01.05', '1169': '1.2.03.01.06', '1175': '1.2.03.01.07',
    '1181': '1.2.03.01.08', '1198': '1.2.03.01.09', '1206': '1.2.03.01.10', '1212': '1.2.03.01.11',
    '6758': '1.2.03.01.12', '1235': '1.2.03.02.01', '1241': '1.2.03.02.02', '1258': '1.2.03.02.03',
    '8600': '1.2.03.02.04', '8964': '1.2.03.02.05', '1259': '1.2.03.02.06', '1271': '1.2.03.03.01',
    '1293': '1.2.03.04.01', '9031': '1.2.03.04.02', '1318': '1.2.03.05.01', '1324': '1.2.03.05.02',
    '1331': '1.2.03.05.03', '1347': '1.2.03.05.04', '1353': '1.2.03.05.05', '1360': '1.2.03.05.06',
    '1376': '1.2.03.05.07', '1382': '1.2.03.05.08', '1399': '1.2.03.05.09', '1407': '1.2.03.05.10',
    '6764': '1.2.03.05.11', '1436': '1.2.04.01.01', '1442': '1.2.04.01.02', '1459': '1.2.04.01.03',
    '1494': '1.3.01.01.01', '6379': '1.3.01.02.01', '6385': '1.3.01.02.02', '6391': '1.3.01.02.03',
    '6400': '1.3.01.02.04', '6416': '1.3.01.02.05', '8705': '1.3.01.02.06', '8706': '1.3.01.02.07',
    '6451': '1.4.01.01.01', '6468': '1.4.01.01.02', '6601': '1.4.01.01.03', '6630': '1.4.01.01.04',
    '6675': '1.4.01.01.05', '5501': '1.4.01.01.06', '8190': '1.4.01.01.07', '1554': '2.1.01.01.01',
    '1577': '2.1.01.02.01', '1608': '2.1.02.01.01', '1614': '2.1.02.01.02', '1621': '2.1.02.01.03',
    '7232': '2.1.02.01.04', '7284': '2.1.02.01.05', '7291': '2.1.02.01.06', '7121': '2.1.02.01.07',
    '7545': '2.1.02.01.08', '8332': '2.1.02.01.09', '2134': '2.1.02.01.10', '8451': '2.1.02.01.11',
    '1643': '2.1.02.02.01', '7396': '2.1.02.02.02', '7338': '2.1.02.02.03', '7315': '2.1.02.03.06',
    '7351': '2.1.02.03.07', '7404': '2.1.02.03.08', '7551': '2.1.02.03.09', '8349': '2.1.02.03.10',
    '8361': '2.1.02.03.11', '8467': '2.1.02.03.12', '1672': '2.1.03.01.01', '1689': '2.1.03.01.02',
    '1695': '2.1.03.01.03', '1703': '2.1.03.01.04', '1710': '2.1.03.01.05', '1726': '2.1.03.01.06',
    '1749': '2.1.03.02.01', '1755': '2.1.03.02.02', '1761': '2.1.03.02.03', '1778': '2.1.03.02.04',
    '1784': '2.1.03.02.05', '1791': '2.1.03.02.06', '1809': '2.1.03.02.07', '6824': '2.1.03.02.08',
    '9188': '2.1.03.02.09', '1838': '2.1.04.01.01', '1844': '2.1.04.01.02', '1851': '2.1.04.01.03',
    '1867': '2.1.04.01.04', '1873': '2.1.04.01.05', '1880': '2.1.04.01.06', '1896': '2.1.04.01.07',
    '1904': '2.1.04.01.08', '1927': '2.1.04.02.01', '1933': '2.1.04.02.02', '1956': '2.1.04.03.01',
    '1962': '2.1.04.03.02', '1979': '2.1.04.03.03', '2000': '2.1.05.01.01', '2016': '2.1.05.01.02',
    '2022': '2.1.05.01.03', '2039': '2.1.05.01.04', '2045': '2.1.05.01.05', '2051': '2.1.05.01.06',
    '2068': '2.1.05.01.07', '2074': '2.1.05.01.08', '2081': '2.1.05.01.09', '2097': '2.1.05.01.10',
    '2105': '2.1.05.01.11', '2111': '2.1.05.01.12', '2128': '2.1.05.01.13', '2141': '2.1.05.01.15',
    '6356': '2.1.05.01.16', '6971': '2.1.05.01.17', '6988': '2.1.05.01.18', '6994': '2.1.05.01.19',
    '7002': '2.1.05.01.20', '7031': '2.1.05.01.21', '8438': '2.1.05.01.22', '8421': '2.1.05.02.04',
    '2186': '2.2.01.01.01', '2192': '2.2.01.01.02', '2223': '2.2.02.01.01', '6741': '2.2.04.01.01',
    '2298': '2.3.01.01.01', '2306': '2.3.01.01.02', '2358': '2.3.02.03.01', '2364': '2.3.02.03.02',
    '2424': '2.4.01.01.01', '2425': '2.4.01.01.02', '6481': '2.4.01.02.01', '6497': '2.4.01.02.02',
    '6505': '2.4.01.02.03', '6511': '2.4.01.02.04', '6528': '2.4.01.02.05', '6563': '2.5.01.01.01',
    '6570': '2.5.01.01.02', '6617': '2.5.01.01.03', '6623': '2.5.01.01.04', '6474': '2.5.01.01.05',
    '6681': '2.5.01.01.06', '6682': '2.5.01.01.07', '8208': '2.5.01.01.08', '2482': '3.1.01.01.01',
    '2499': '3.1.01.01.02', '2507': '3.1.01.01.03', '231': '3.1.01.01.04', '2520': '3.1.01.02.01',
    '2542': '3.1.01.03.01', '2559': '3.1.01.03.02', '247': '3.1.01.03.03', '2588': '3.1.02.01.01',
    '2594': '3.1.02.01.02', '2602': '3.1.02.01.03', '8681': '3.1.02.01.05', '2625': '3.1.02.02.01',
    '2631': '3.1.02.02.02', '2654': '3.1.02.03.01', '2683': '3.1.03.01.01', '2690': '3.1.03.01.02',
    '2714': '3.1.03.02.01', '2721': '3.1.03.02.02', '2743': '3.1.03.03.01', '2750': '3.1.03.03.02',
    '2789': '3.1.04.01.01', '2795': '3.1.04.01.02', '2803': '3.1.04.01.03', '2810': '3.1.04.01.04',
    '2826': '3.1.04.01.05', '2832': '3.1.04.01.06', '2849': '3.1.04.01.07', '2855': '3.1.04.01.08',
    '2861': '3.1.04.01.09', '2878': '3.1.04.01.10', '2884': '3.1.04.01.11', '224': '3.1.04.01.12',
    '2921': '3.2.01.01.01', '2944': '3.2.01.02.01', '2951': '3.2.01.02.02', '2980': '3.2.02.01.01',
    '2996': '3.2.02.01.02', '3040': '4.1.01.01.01', '3056': '4.1.01.01.02', '3079': '4.1.01.02.01',
    '3085': '4.1.01.02.02', '3091': '4.1.01.02.03', '3100': '4.1.01.02.04', '3116': '4.1.01.02.05',
    '3122': '4.1.01.02.06', '3139': '4.1.01.02.07', '6586': '4.1.01.02.08', '3145': '4.1.01.02.09',
    '8823': '4.1.01.02.10', '3168': '4.1.01.03.01', '3174': '4.1.01.03.02', '3181': '4.1.01.03.03',
    '3197': '4.1.01.03.04', '3205': '4.1.01.03.05', '3211': '4.1.01.03.06', '3228': '4.1.01.03.07',
    '6592': '4.1.01.03.08', '3234': '4.1.01.03.09', '3257': '4.1.01.04.01', '3263': '4.1.01.04.02',
    '3270': '4.1.01.04.03', '3286': '4.1.01.04.04', '3292': '4.1.01.04.05', '3301': '4.1.01.04.06',
    '3317': '4.1.01.04.07', '3323': '4.1.01.04.08', '3330': '4.1.01.04.09', '3346': '4.1.01.04.10',
    '3352': '4.1.01.04.11', '3369': '4.1.01.04.12', '3375': '4.1.01.04.13', '3381': '4.1.01.04.14',
    '3398': '4.1.01.04.15', '3406': '4.1.01.04.16', '3412': '4.1.01.04.17', '3429': '4.1.01.04.18',
    '3435': '4.1.01.04.19', '3441': '4.1.01.04.20', '3464': '4.1.01.05.01', '3471': '4.1.01.05.02',
    '3487': '4.1.01.05.03', '3493': '4.1.01.05.04', '3501': '4.1.01.05.05', '3518': '4.1.01.05.06',
    '3524': '4.1.01.05.07', '3531': '4.1.01.05.08', '3547': '4.1.01.05.09', '3553': '4.1.01.05.10',
    '3560': '4.1.01.05.11', '3576': '4.1.01.05.12', '3582': '4.1.01.05.13', '3599': '4.1.01.05.14',
    '3607': '4.1.01.05.15', '3613': '4.1.01.05.16', '3620': '4.1.01.05.17', '3636': '4.1.01.05.18',
    '3642': '4.1.01.05.19', '3659': '4.1.01.05.20', '3665': '4.1.01.05.21', '3671': '4.1.01.05.22',
    '3688': '4.1.01.05.23', '3694': '4.1.01.05.24', '3702': '4.1.01.05.25', '3719': '4.1.01.05.26',
    '3725': '4.1.01.05.27', '3731': '4.1.01.05.28', '3748': '4.1.01.05.29', '3754': '4.1.01.05.30',
    '6899': '4.1.01.05.31', '6907': '4.1.01.05.32', '3777': '4.1.01.06.01', '3783': '4.1.01.06.02',
    '3790': '4.1.01.06.03', '3808': '4.1.01.06.04', '3837': '4.1.02.01.01', '3843': '4.1.02.01.02',
    '3850': '4.1.02.01.03', '3866': '4.1.02.01.04', '3872': '4.1.02.01.05', '3889': '4.1.02.01.06',
    '3895': '4.1.02.01.07', '218': '4.1.02.01.08', '3903': '4.1.02.01.09', '3949': '4.2.01.01.01',
    '3955': '4.2.01.01.02', '3961': '4.2.01.01.03', '3978': '4.2.01.01.04', '3984': '4.2.01.01.05',
    '3991': '4.2.01.01.06', '4009': '4.2.01.01.07', '4015': '4.2.01.01.08', '4021': '4.2.01.01.09',
    '4038': '4.2.01.01.10', '4044': '4.2.01.01.11', '4051': '4.2.01.01.12', '4067': '4.2.01.01.13',
    '4073': '4.2.01.01.14', '4080': '4.2.01.01.15', '4096': '4.2.01.01.16', '4104': '4.2.01.01.17',
    '4111': '4.2.01.01.18', '4127': '4.2.01.01.19', '4133': '4.2.01.01.20', '4156': '4.2.01.02.01',
    '4162': '4.2.01.02.02', '4179': '4.2.01.02.03', '4185': '4.2.01.02.04', '4191': '4.2.01.02.05',
    '4200': '4.2.01.02.06', '4216': '4.2.01.02.07', '4222': '4.2.01.02.08', '4239': '4.2.01.02.09',
    '4245': '4.2.01.02.10', '4251': '4.2.01.02.11', '4268': '4.2.01.02.12', '4274': '4.2.01.02.13',
    '4281': '4.2.01.02.14', '4297': '4.2.01.02.15', '4305': '4.2.01.02.16', '4311': '4.2.01.02.17',
    '4328': '4.2.01.02.18', '4334': '4.2.01.02.19', '4341': '4.2.01.02.20', '4357': '4.2.01.02.21',
    '4363': '4.2.01.02.22', '4370': '4.2.01.02.23', '4386': '4.2.01.02.24', '4392': '4.2.01.02.25',
    '4401': '4.2.01.02.26', '4417': '4.2.01.02.27', '4423': '4.2.01.02.28', '4430': '4.2.01.02.29',
    '4446': '4.2.01.02.30', '4452': '4.2.01.02.31', '4469': '4.2.01.02.32', '4475': '4.2.01.02.33',
    '4481': '4.2.01.02.34', '4498': '4.2.01.02.35', '4506': '4.2.01.02.36', '4512': '4.2.01.02.37',
    '4529': '4.2.01.02.38', '4535': '4.2.01.02.39', '4541': '4.2.01.02.40', '6327': '4.2.01.02.41',
    '6698': '4.2.01.02.42', '6706': '4.2.01.02.43', '6942': '4.2.01.02.44', '7025': '4.2.01.02.45',
    '7048': '4.2.01.02.46', '7278': '4.2.01.02.47', '7427': '4.2.01.02.48', '7440': '4.2.01.02.49',
    '7516': '4.2.01.02.50', '4571': '4.2.02.01.01', '4587': '4.2.02.01.02', '4593': '4.2.02.01.03',
    '4601': '4.2.02.01.04', '4618': '4.2.02.01.05', '4624': '4.2.02.01.06', '4631': '4.2.02.01.07',
    '4647': '4.2.02.01.08', '4653': '4.2.02.01.09', '4660': '4.2.02.01.10', '4676': '4.2.02.01.11',
    '4682': '4.2.02.01.12', '4699': '4.2.02.01.13', '4707': '4.2.02.01.14', '4713': '4.2.02.01.15',
    '4720': '4.2.02.01.16', '4736': '4.2.02.01.17', '4742': '4.2.02.01.18', '4759': '4.2.02.01.19',
    '4765': '4.2.02.01.20', '4788': '4.2.02.02.01', '4794': '4.2.02.02.02', '4802': '4.2.02.02.03',
    '4819': '4.2.02.02.04', '4825': '4.2.02.02.05', '4831': '4.2.02.02.06', '4848': '4.2.02.02.07',
    '4854': '4.2.02.02.08', '4861': '4.2.02.02.09', '4877': '4.2.02.02.10', '4883': '4.2.02.02.11',
    '4890': '4.2.02.02.12', '4908': '4.2.02.02.13', '4914': '4.2.02.02.14', '4921': '4.2.02.02.15',
    '4937': '4.2.02.02.16', '4943': '4.2.02.02.17', '4950': '4.2.02.02.18', '4966': '4.2.02.02.19',
    '6333': '4.2.02.02.20', '6340': '4.2.02.02.21', '7061': '4.2.02.02.22', '7522': '4.2.02.02.23',
    '4995': '4.2.03.01.01', '5003': '4.2.03.01.02', '5010': '4.2.03.01.03', '5026': '4.2.03.01.04',
    '5032': '4.2.03.01.05', '5049': '4.2.03.01.06', '5055': '4.2.03.01.07', '5061': '4.2.03.01.08',
    '5078': '4.2.03.01.09', '5084': '4.2.03.01.10', '5091': '4.2.03.01.11', '5109': '4.2.03.01.12',
    '5115': '4.2.03.01.13', '5121': '4.2.03.01.14', '5138': '4.2.03.01.15', '5144': '4.2.03.01.16',
    '5151': '4.2.03.01.17', '5167': '4.2.03.01.18', '5173': '4.2.03.01.19', '5180': '4.2.03.01.20',
    '5204': '4.2.03.02.01', '5211': '4.2.03.02.02', '5227': '4.2.03.02.03', '5233': '4.2.03.02.04',
    '5240': '4.2.03.02.05', '5256': '4.2.03.02.06', '5262': '4.2.03.02.07', '5279': '4.2.03.02.08',
    '5285': '4.2.03.02.09', '5291': '4.2.03.02.10', '5300': '4.2.03.02.11', '5316': '4.2.03.02.12',
    '5322': '4.2.03.02.13', '5339': '4.2.03.02.14', '5345': '4.2.03.02.15', '5351': '4.2.03.02.16',
    '5368': '4.2.03.02.17', '5374': '4.2.03.02.18', '5381': '4.2.03.02.19', '5397': '4.2.03.02.20',
    '5405': '4.2.03.02.21', '5411': '4.2.03.02.22', '5428': '4.2.03.02.23', '5434': '4.2.03.02.24',
    '5441': '4.2.03.02.25', '5457': '4.2.03.02.26', '5463': '4.2.03.02.27', '5470': '4.2.03.02.28',
    '5486': '4.2.03.02.29', '5492': '4.2.03.02.30', '5517': '4.2.03.02.31', '5523': '4.2.03.02.32',
    '5530': '4.2.03.02.33', '5546': '4.2.03.02.34', '5552': '4.2.03.02.35', '5569': '4.2.03.02.36',
    '5575': '4.2.03.02.37', '5581': '4.2.03.02.38', '5598': '4.2.03.02.39', '5606': '4.2.03.02.40',
    '5612': '4.2.03.02.41', '5629': '4.2.03.02.42', '5635': '4.2.03.02.43', '5641': '4.2.03.02.44',
    '5658': '4.2.03.02.45', '5664': '4.2.03.02.46', '5671': '4.2.03.02.47', '5687': '4.2.03.02.48',
    '5693': '4.2.03.02.49', '5701': '4.2.03.02.50', '5718': '4.2.03.02.51', '5724': '4.2.03.02.52',
    '5731': '4.2.03.02.53', '5747': '4.2.03.02.54', '6913': '4.2.03.02.55', '6959': '4.2.03.02.56',
    '8102': '4.2.03.02.60', '5776': '4.2.04.01.01', '5782': '4.2.04.01.02', '5799': '4.2.04.01.03',
    '5807': '4.2.04.01.04', '5813': '4.2.04.01.05', '5820': '4.2.04.01.06', '5836': '4.2.04.01.07',
    '5842': '4.2.04.01.08', '5859': '4.2.04.01.09', '5865': '4.2.04.01.10', '5871': '4.2.04.01.11',
    '5894': '4.2.04.02.01', '5902': '4.2.04.02.02', '5931': '4.2.05.01.01', '5948': '4.2.05.01.02',
    '5954': '4.2.05.01.03', '5961': '4.2.05.01.04', '5977': '4.2.05.01.05', '5983': '4.2.05.01.06',
    '6014': '4.2.06.01.01', '6037': '4.2.06.02.01', '1502': '4.2.06.02.02', '6050': '4.2.06.03.01',
    '6066': '4.2.06.03.02', '6072': '4.2.06.03.03', '6089': '4.2.06.03.04', '6095': '4.2.06.03.05',
    '6103': '4.2.06.03.06', '6132': '4.2.07.01.01', '6149': '4.2.07.01.02', '6155': '4.2.07.01.03',
    '6161': '4.2.07.01.04', '6209': '4.3.01.01.01', '6215': '4.3.01.01.02', '6244': '4.3.02.02.01',
    '6267': '4.3.02.03.01', '6311': '5.1.01.01.01'
};
const mapaClientesEstrangeiros = {
    'DANIEL GEIBER': '1.1.02.15.02', 'REMAQ': '1.1.02.15.03', 'EDGAR ANTONIO CALDER': '1.1.02.15.04',
    'BRASIL SOMIERES': '1.1.02.15.05', 'VICTOR MONTENEGRO': '1.1.02.15.06', 'LEPAL SRL': '1.1.02.15.07',
    'TABLECONFORT': '1.1.02.15.08', 'AUDISIO FERNANDO': '1.1.02.15.09', 'DISTRIBUIDORA NACION': '1.1.02.15.10',
    'JOSE LIMBER': '1.1.02.15.11', 'PEREZ Y MONTENEGRO S': '1.1.02.15.12', 'GUSTAVO EDUARDO TERR': '1.1.02.15.13',
    'ABBA TRANDING SRL': '1.1.02.15.16', 'GRUPO TERRACENTER S.': '1.1.02.15.18', 'SHOW S/A': '1.1.02.15.20',
    'COMERCIAL Y SERV VAS': '1.1.02.15.19', 'LUMI FI LIC': '1.1.02.15.21'
};
let finalFileContent = '';

// --- FUNÇÕES DE UTILIDADE E CHAT (CÓDIGO COMPLETO) ---
function showTyping() { typingStatus.textContent = "Digitando..."; }
function showOnline() { typingStatus.textContent = "● Online"; }
function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function replacePlaceholders(template, values) {
    let result = template;
    for (const key in values) {
        const regex = new RegExp(`<b>${key}<\\/b>`, 'g');
        result = result.replace(regex, `<b>${values[key]}</b>`);
    }
    return result;
}

function typeMessage(element, text, speed = 5) {
    return new Promise(resolve => {
        let i = 0;
        element.innerHTML = "";
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

async function addMessage(text, sender = 'behlice') {
    if (sender === 'behlice') showTyping();

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    if (sender === 'user') {
        bubble.innerText = text.replace(/<[^>]+>/g, '');
        messageDiv.appendChild(bubble);
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
        showOnline();
    } else {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('bubble', 'typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        messageDiv.appendChild(typingIndicator);
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });

        await new Promise(res => setTimeout(res, 400 + Math.random() * 400));
        messageDiv.removeChild(typingIndicator);
        messageDiv.appendChild(bubble);

        await typeMessage(bubble, text.replace(/<[^>]+>/g, ''));
        bubble.innerHTML = text;
        showOnline();
    }
}

/**
 * Remove acentos e cedilha de uma string,
 * retornando apenas caracteres ASCII básicos.
 */
function removeAccents(str) {
    return str
        .normalize('NFD')               // decompõe letras acentuadas em base + diacrítico
        .replace(/[\u0300-\u036f]/g, ''); // remove diacríticos
}


// --- FUNÇÕES AUXILIARES DE PROCESSAMENTO (CÓDIGO COMPLETO) ---

function createDownloadLink(content) {

    // Remove acentos de todo o conteúdo
    const sanitized = removeAccents(content);
    const blob = new Blob([sanitized], { type: 'text/plain;charset=utf-8' });
    finalFileContent = URL.createObjectURL(blob);
    downloadButton.style.display = 'block';
    uploadButton.style.display = 'none';
    uploadButton.disabled = false;
    fileInput.value = '';
}


function parseBrazilianFloat(value) {
    if (typeof value !== 'string' || value.trim() === '') {
        return 0.0;
    }
    const number = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    return isNaN(number) ? 0.0 : number;
}

function formatBrazilianNoThousand(value) {
    return value.toFixed(2).replace('.', ',');
}


// --- LÓGICA DE PROCESSAMENTO DO MÓDULO CAR ---

async function processFile(content) {
    const inicioExecucao = Date.now();

    let linhasExcluidas = 0;
    let contagemContas = {};
    let somaPorGrupo = {};
    let excluidasPorGrupo = {};
    let clientesDistintos = new Set();
    let errosDeb = 0;
    let errosCred = 0;

    let outputLines = [];
    const lines = content.split(/\r?\n/);
    const header = lines[0].split(';').map(h => h.trim());
    const dataLines = lines.slice(1).filter(l => l.trim() !== '');
    const totalLines = dataLines.length;

    await addMessage(getRandom(mensagens.inicioProcessamento));
    await addMessage(`Encontrei <b>${totalLines}</b> linhas para processar.`);

    if (totalLines === 0) {
        await addMessage(getRandom(mensagens.espera));
        uploadButton.disabled = false;
        uploadButton.innerText = "Enviar Outro Arquivo";
        return;
    }

    const colMap = {
        data: header.indexOf('CRL034.GE_TEMP.DATA'),
        cdCliente: header.indexOf('CRL034.GE_TEMP.CD_CLIENTE'),
        dnCliente: header.indexOf('CRL034.GE_TEMP.DN_CLIENTE'),
        tpTitulo: header.indexOf('CRL034.GE_TEMP.CD_TP_TITULO'),
        nrTitulo: header.indexOf('CRL034.GE_TEMP.NR_TITULO'),
        serie: header.indexOf('CRL034.GE_TEMP.CD_SERIE'),
        valor: header.indexOf('CRL034.GE_TEMP.VL_MOVIMENTO'),
        contaCred: header.indexOf('CRL034.GE_TEMP.CD_CONTA_CRED'),
        contaDeb: header.indexOf('CRL034.GE_TEMP.CD_CONTA_DEB'),
        cdHistorico: header.indexOf('CRL034.GE_TEMP.CD_HISTORICO'),
        dnHistorico: header.indexOf('CRL034.GE_TEMP.DN_HISTORICO'),
        complemento: header.indexOf('CRL034.GE_TEMP.DN_COMPLEMENTO')
    };

    let linesProcessed = 0;
    let nextUpdate25 = totalLines > 0 ? totalLines * 0.25 : null;
    let nextUpdate50 = totalLines > 0 ? totalLines * 0.50 : null;
    let nextUpdate75 = totalLines > 0 ? totalLines * 0.75 : null;
    let somaTotalProcessado = 0;
    let somaTotalExcluido = 0;

    for (const line of dataLines) {
        const cols = line.split(';').map(c => c.trim());
        if (cols.length < header.length) {
            linhasExcluidas++;
            continue;
        }

        let deb = cols[colMap.contaDeb];
        let cred = cols[colMap.contaCred];
        const tpTitulo = cols[colMap.tpTitulo];
        const dnCliente = cols[colMap.dnCliente].toUpperCase();
        const cdCliente = cols[colMap.cdCliente];
        const rawValor = cols[colMap.valor];
        let excluirLinha = false;

        if (cdCliente) clientesDistintos.add(cdCliente);

        if ((deb === '171' && cred === '171') || (deb === '9099' && cred === '9099') || (deb === '9099' && cred === '2743') || (deb === '8802' && cred === '2743')) {
            excluirLinha = true;
        }
        if (!excluirLinha) {
            if ((['106', '112', '201', '8183'].includes(deb) && cred === '7019' && tpTitulo === '3') || (['106', '112', '201', '8183'].includes(deb) && cred === '9099' && tpTitulo === '3') || (deb === '1494' && cred === '9099' && tpTitulo === '3') || (deb === '201' && cred === '9099' && tpTitulo === '3') || (deb === '2128' && cred === '9099')) {
                cred = '171';
            } else if ((deb === '1494' && cred === '9099' && tpTitulo === '6') || (['106', '112', '201', '8183'].includes(deb) && cred === '9099' && tpTitulo === '6')) {
                cred = '2743';
            } else if (deb === '7019' && cred === '187') {
                cred = '313';
            } else if (deb === '2128' && cred === '2743') {
                cred = '2832';
            }
        }
        if (!excluirLinha && deb === '276') {
            let contaEncontrada = false;
            for (const nomeC in mapaClientesEstrangeiros) {
                if (dnCliente.includes(nomeC)) { deb = mapaClientesEstrangeiros[nomeC]; contaEncontrada = true; break; }
            }
            if (!contaEncontrada) deb = '276';
        }

        const parsedValor = parseBrazilianFloat(rawValor);

        if (excluirLinha) {
            linhasExcluidas++;
            somaTotalExcluido += parsedValor;
            const chaveEx = `${deb}-${cred}`;
            if (!excluidasPorGrupo[chaveEx]) excluidasPorGrupo[chaveEx] = 0;
            excluidasPorGrupo[chaveEx] += parsedValor;
        } else {
            somaTotalProcessado += parsedValor;
            const data = cols[colMap.data];
            const cdHistorico = cols[colMap.cdHistorico];
            let historicoFinal = cols[colMap.complemento] || `${cols[colMap.tpTitulo]}-${cols[colMap.nrTitulo]}-${cols[colMap.serie]}`;
            const formattedValor = formatBrazilianNoThousand(parsedValor);
            const contaDebFinal = deb.includes('.') ? deb : (dicionarioContas[deb] || (() => { errosDeb++; return `ERRO_DEB(${deb})`; })());
            const contaCredFinal = cred.includes('.') ? cred : (dicionarioContas[cred] || (() => { errosCred++; return `ERRO_CRED(${cred})`; })());
            const chaveGrupo = `${deb}-${cred}`;
            if (!somaPorGrupo[chaveGrupo]) somaPorGrupo[chaveGrupo] = 0;
            somaPorGrupo[chaveGrupo] += parsedValor;
            contagemContas[contaDebFinal] = (contagemContas[contaDebFinal] || 0) + 1;
            contagemContas[contaCredFinal] = (contagemContas[contaCredFinal] || 0) + 1;
            const linhaDebito = `||${data}|${CNPJ_FIXO}|${contaDebFinal}||${formattedValor}|D|${cdHistorico}|${historicoFinal}|`;
            const linhaCredito = `||${data}|${CNPJ_FIXO}|${contaCredFinal}||${formattedValor}|C|${cdHistorico}|${historicoFinal}|`;
            outputLines.push(linhaDebito, linhaCredito);
        }

        linesProcessed++;
        if (nextUpdate25 && linesProcessed >= nextUpdate25) { await addMessage(getRandom(mensagens.progresso25)); nextUpdate25 = null; }
        else if (nextUpdate50 && linesProcessed >= nextUpdate50) { await addMessage(getRandom(mensagens.progresso50)); nextUpdate50 = null; }
        else if (nextUpdate75 && linesProcessed >= nextUpdate75) { await addMessage(getRandom(mensagens.progresso75)); nextUpdate75 = null; }
    }

    if (linhasExcluidas > 0) { await addMessage(replacePlaceholders(getRandom(mensagens.resumoLinhasExcluidas), { X: linhasExcluidas })); }
    else { await addMessage(replacePlaceholders(getRandom(mensagens.resumoLinhasExcluidas), { X: 0 })); }

    const sortedContas = Object.entries(contagemContas).sort((a, b) => b[1] - a[1]);
    if (sortedContas.length > 0) {
        const top5 = sortedContas.slice(0, 5).map(([conta, cnt]) => `Conta <b>${conta}</b>: <b>${cnt}</b> vezes`).join('\n');
        await addMessage(getRandom(mensagens.resumoContas).replace('{listaContas}', top5));
    }

    if (Object.keys(somaPorGrupo).length > 0) {
        const grupos = Object.keys(somaPorGrupo).sort().map(chave => {
            const [deb, cred] = chave.split('-');
            const valorFormatado = somaPorGrupo[chave].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            return `• Débito <b>${deb}</b> e Crédito <b>${cred}</b> → R$ <b>${valorFormatado}</b>`;
        }).join('\n');
        await addMessage(getRandom(mensagens.resumoGrupo).replace('{listaGrupos}', grupos));
    }

    if (Object.keys(excluidasPorGrupo).length > 0) {
        const exclGrp = Object.keys(excluidasPorGrupo).sort().map(chave => {
            const [deb, cred] = chave.split('-');
            const valorFormatado = excluidasPorGrupo[chave].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            return `• Excluídas: Débito <b>${deb}</b> e Crédito <b>${cred}</b> → R$ <b>${valorFormatado}</b>`;
        }).join('\n');
        await addMessage(getRandom(mensagens.resumoExcluidasPorGrupo).replace('{listaExcluidas}', exclGrp));
    }

    await addMessage(replacePlaceholders(getRandom(mensagens.resumoClientes), { X: clientesDistintos.size }));

    const totalProcFmt = somaTotalProcessado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const totalExcFmt = somaTotalExcluido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    await addMessage(replacePlaceholders(getRandom(mensagens.resumoValores), { A: totalProcFmt, B: totalExcFmt }));

    const numProcessadas = totalLines - linhasExcluidas;
    if (numProcessadas > 0) {
        const mediaFmt = (somaTotalProcessado / numProcessadas).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        await addMessage(replacePlaceholders(getRandom(mensagens.resumoMedia), { C: mediaFmt }));
    }

    if (errosDeb + errosCred > 0) {
        await addMessage(replacePlaceholders(getRandom(mensagens.resumoErros), { EE: errosDeb, FF: errosCred }));
    }

    const fimExecucao = Date.now();
    const duracaoSeg = Math.round((fimExecucao - inicioExecucao) / 1000);
    const duracaoMin = (duracaoSeg / 60).toFixed(2);
    const tempoManualSeg = 35 * 60;
    const economiaSeg = Math.max(tempoManualSeg - duracaoSeg, 0);
    const economiaMin = (economiaSeg / 60).toFixed(2);

    await addMessage(replacePlaceholders(getRandom(mensagens.tempoExecucao), { T: duracaoSeg, U: duracaoMin }));
    await addMessage(replacePlaceholders(getRandom(mensagens.economia), { E: economiaSeg, F: economiaMin }));

    await addMessage(getRandom(mensagens.conclusao));
    createDownloadLink(outputLines.join('\n'));
}


// --- LÓGICA DE SELEÇÃO DE MÓDULO (CÓDIGO COMPLETO) ---

function displayModuleSelection() {
    moduleSelectionArea.innerHTML = '';
    moduleSelectionArea.style.display = 'flex';
    inputArea.style.display = 'none';

    const modules = [
        { id: 'CAR', name: 'Contas a Receber', icon: 'fa-hand-holding-usd' },
        { id: 'CAP', name: 'Contas a Pagar', icon: 'fa-file-invoice-dollar' },
        { id: 'CXB', name: 'Caixas e Bancos', icon: 'fa-university' },
        { id: 'EST', name: 'Estoque', icon: 'fa-boxes' },
        { id: 'FAT', name: 'Faturamento', icon: 'fa-receipt' }
    ];

    modules.forEach(module => {
        const button = document.createElement('button');
        button.className = 'module-button';
        button.innerHTML = `<i class="fas ${module.icon}"></i> ${module.name}`;
        button.onclick = () => handleModuleSelection(module.id);
        moduleSelectionArea.appendChild(button);
    });
}

async function handleModuleSelection(moduleId) {
    selectedModule = moduleId;
    moduleSelectionArea.style.display = 'none';

    if (moduleId === 'CAR') {
        await addMessage(getRandom(mensagens.boasVindasCAR));
        inputArea.style.display = 'flex';
    } else {
        await addMessage(getRandom(mensagens.emDesenvolvimento));
        await new Promise(res => setTimeout(res, 1500));
        await addMessage(getRandom(mensagens.perguntaModulo));
        displayModuleSelection();
    }
}

// NOVO: Funções para o fluxo pós-processamento
async function askForNextStep() {
    await addMessage(getRandom(mensagens.perguntaProximoPasso));

    moduleSelectionArea.innerHTML = '';
    moduleSelectionArea.style.display = 'flex';

    const continueButton = document.createElement('button');
    continueButton.className = 'module-button';
    continueButton.innerHTML = `<i class="fas fa-redo"></i> Continuar no CAR`;
    continueButton.onclick = handleContinueInModule;
    moduleSelectionArea.appendChild(continueButton);

    const backToMenuButton = document.createElement('button');
    backToMenuButton.className = 'module-button';
    backToMenuButton.innerHTML = `<i class="fas fa-bars"></i> Voltar ao Menu`;
    backToMenuButton.onclick = handleBackToMenu;
    moduleSelectionArea.appendChild(backToMenuButton);
}

async function handleContinueInModule() {
    moduleSelectionArea.style.display = 'none';
    await addMessage("Beleza! Pode mandar o próximo arquivo do Contas a Receber.", 'behlice');
    inputArea.style.display = 'flex';
    uploadButton.style.display = 'block';
    uploadButton.disabled = false;
    uploadButton.innerText = "Enviar Arquivo";
}

async function handleBackToMenu() {
    moduleSelectionArea.style.display = 'none';
    await addMessage("Ok, de volta ao menu principal!", 'behlice');
    await addMessage(getRandom(mensagens.perguntaModulo));
    displayModuleSelection();
}


// --- EVENT LISTENERS E INICIALIZAÇÃO (CÓDIGO COMPLETO) ---

uploadButton.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        addMessage(`Arquivo "<b>${file.name}</b>" na mão!`, 'user');
        uploadButton.disabled = true;
        uploadButton.innerText = "Processando...";
        const reader = new FileReader();
        reader.onload = (e) => {
            if (selectedModule === 'CAR') {
                processFile(e.target.result).catch(err => {
                    console.error("Erro ao processar o arquivo:", err);
                    addMessage(getRandom(mensagens.erroGeral));
                    uploadButton.disabled = false;
                    uploadButton.innerText = "Enviar Arquivo";
                });
            }
        };
        reader.readAsText(file, 'UTF-8');
    }
});

// MODIFICADO: Evento do botão de download agora chama a função de próximo passo
downloadButton.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = finalFileContent;
    a.download = 'ARQUIVO_PROCESSADO_CAR.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    downloadButton.style.display = 'none';

    setTimeout(() => {
        inputArea.style.display = 'none';
        askForNextStep();
    }, 1000);
});

// --- FLUXO INICIAL DO CHAT (CÓDIGO COMPLETO) ---
(async () => {
    showOnline();
    await addMessage(getRandom(mensagens.saudacaoInicial));
    await addMessage(getRandom(mensagens.perguntaModulo));
    displayModuleSelection();
})();