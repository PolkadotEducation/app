import { Db } from "mongodb";
import fs from "fs";
import path from "path";

export async function portugueseCourse(db: Db) {
  const lessonsDir = path.join(__dirname, "../lessons/portuguese");

  const lessons = [
    {
      title: "Arpanet",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "arpanet.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "Em qual período histórico a ARPANET foi desenvolvida?",
        choices: [
          "Durante a Primeira Guerra Mundial",
          "Durante a Guerra Fria",
          "Durante a Grande Depressão",
          "Durante a Segunda Guerra Mundial",
        ],
        correctChoice: 0,
      },
      references: [
        {
          title: "Artigo da Wikipédia sobre a ARPANET",
          link: "https://pt.wikipedia.org/wiki/ARPANET",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Internet (A evolução até a WEB3)",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "internet-web3.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "Qual é a principal função da internet como uma rede global?",
        choices: [
          "Conectar dispositivos para permitir a comunicação e o compartilhamento de informações",
          "Servir como uma plataforma para jogos online",
          "Controlar as atividades de empresas ao redor do mundo",
          "Fornecer acesso exclusivo a conteúdos restritos",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Blockchain: O que é e como funciona?",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "blockchain-o-que-e-como-funciona.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "Qual é a principal característica da blockchain que a torna segura e imutável?",
        choices: [
          "Armazenamento centralizado de dados",
          "Criptografia e registro distribuído",
          "Acesso restrito a uma única organização",
          "Uso de intermediários em todas as transações",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Termos e Conceitos de Blockchain",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "blockchain-termos-conceitos.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "Na criptografia simétrica, o que é usado para criptografar e descriptografar uma mensagem?",
        choices: [
          "Duas chaves diferentes, uma pública e uma privada",
          "Uma chave pública",
          "Uma única chave, usada tanto para criptografar quanto para descriptografar",
          "Um hash único gerado para cada mensagem",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Redes e Blockchains Públicas e Privadas",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "redes-blockchains-publicas-privadas.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "Qual é a principal característica de uma rede centralizada?",
        choices: [
          "Recursos e capacidade de processamento distribuídos igualmente entre vários nós",
          "Controle e comunicação gerenciados por um ponto central, como um servidor principal",
          "Ausência de um ponto central de controle, com distribuição de poder entre os nós",
          "Acesso aberto e participativo para qualquer usuário",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Propriedade dos Dados",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "propriedade-dos-dados.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "O que define o conceito de propriedade de dados?",
        choices: [
          "Quem cria as leis para o uso de dados pessoais.",
          "Quem controla, tem acesso e é responsável pelas informações geradas ou armazenadas.",
          "Apenas o governo controla os dados pessoais de todos os cidadãos.",
          "Quem possui o maior número de informações em sistemas digitais.",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Bitcoin, Ethereum e outras blockchains",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "bitcoin-ethereum-outras-blockchains.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question: "Qual é o principal objetivo do Bitcoin?",
        choices: [
          "Facilitar transações rápidas entre bancos",
          "Ser uma forma de dinheiro digital descentralizado",
          "Criar contratos inteligentes para aplicações empresariais",
          "Melhorar a escalabilidade da Ethereum",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Gavin Wood, Web3 Foundation e Parity Technologies",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "gavin-wood-w3f-parity.mdx"), "utf-8"),
      difficulty: "easy",
      challenge: {
        question:
          "Qual foi a contribuição de Gavin Wood para o mundo das blockchains após seu trabalho com o Ethereum?",
        choices: [
          "Fundou o Bitcoin",
          "Fundou a Polkadot, Parity Technologies e a Web3 Foundation",
          "Criou a primeira exchange descentralizada",
          "Desenvolveu a rede Ripple",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Relay Chain e Segurança Compartilhada",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "relay-chain-seguranca-compartilhada.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "Qual é o papel principal da Relay Chain na rede Polkadot?",
        choices: [
          "Funcionar como uma criptomoeda independente",
          "Gerenciar as transações financeiras",
          "Conectar e coordenar as parachains, garantindo que elas se comuniquem de maneira eficiente",
          "Monitorar os preços de mercado das blockchains",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "O problema que a Polkadot resolve",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "problema-polkadot-resolve.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "Qual é o principal problema que a Polkadot resolve?",
        choices: [
          "Estabilidade das redes",
          "Falta de segurança compartilhada e comunicação entre blockchains",
          "A identidade das blockchains",
          "A velocidade das transações",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "O Token DOT e suas funções",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "token-dot-funcoes.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "Qual das seguintes NÃO é uma das principais funções do token DOT na rede Polkadot?",
        choices: ["Governança", "Staking", "Taxas", "Mineração"],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Casos de uso Polkadot",
      language: "portuguese",
      body: fs.readFileSync(path.join(lessonsDir, "casos-de-uso-polkadot.mdx"), "utf-8"),
      difficulty: "medium",
      challenge: {
        question: "Qual é a vantagem principal de usar a Polkadot para aplicações de Finanças Descentralizadas (DeFi)?",
        choices: [
          "Impede a comunicação entre diferentes blockchains, aumentando a segurança.",
          "Permite que ativos de várias redes sejam usados em uma única plataforma DeFi, aumentando a liquidez.",
          "Exige intermediários como bancos ou corretoras para funcionar.",
          "Reduz a velocidade das transações para melhorar a experiência do usuário.",
        ],
        correctChoice: 0,
      },
      references: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const recordedLessons = await db.collection("lessons").insertMany(lessons);

  const modules = [
    {
      title: "Conceitos Básicos de Web3",
      lessons: [recordedLessons.insertedIds[0], recordedLessons.insertedIds[1]],
    },
    {
      title: "Conceitos Básicos de Blockchain",
      lessons: [
        recordedLessons.insertedIds[2],
        recordedLessons.insertedIds[3],
        recordedLessons.insertedIds[4],
        recordedLessons.insertedIds[5],
        recordedLessons.insertedIds[6],
      ],
    },
    {
      title: "Introdução à Polkadot",
      lessons: [
        recordedLessons.insertedIds[7],
        recordedLessons.insertedIds[8],
        recordedLessons.insertedIds[9],
        recordedLessons.insertedIds[10],
        recordedLessons.insertedIds[11],
      ],
    },
  ];

  const recordedModules = await db.collection("modules").insertMany(modules);

  const course = {
    title: "Introdução à Web3: Blockchains e Polkadot",
    language: "portuguese",
    summary: `Este curso explica os fundamentos da tecnologia blockchain em detalhe, com foco em Polkadot e como ela conecta diferentes blockchains para trabalharem juntas. Você vai mergulhar em conceitos como descentralização, criptografia e como a internet está evoluindo com a Web3. O curso explica a estrutura da Polkadot, especialmente a Relay Chain, que mantém todas as blockchains conectadas de forma segura. Você também aprenderá sobre o token da Polkadot, DOT, e como ele é usado para governança, staking e expansão da rede. Finalmente, com casos de uso e exemplos práticos de áreas como DeFi, jogos, saúde e NFTs, o curso mostra como a Polkadot ajuda a construir projetos de blockchain mais seguros, inteligentes e conectados.`,
    modules: Object.values(recordedModules.insertedIds),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.collection("courses").insertOne(course);
}
