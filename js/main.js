// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
  {
    question: 'Os numeros 5000 e 1345 tem seus valores em binário, respectivamente iguais a:',
    answers: [
      {
        answer: '111110100 e 10101000001',
        correct: true,
      },
      {
        answer: '10101010111 e 1111000011',
        correct: false,
      },
      {
        answer: '110001101011 e 110001111100',
        correct: false,
      },
      {
        answer: 'Nenhuma das questões anteriores estão corretas.',
        correct: false,
      },
    ],
  },
  {
    question: 'Fazendo o processo inverso agora, transforme o numero 1000111110 em sua forma decimal:',
    answers: [
      {
        answer: '15',
        correct: false,
      },
      {
        answer: '12',
        correct: true,
      },
      {
        answer: '20',
        correct: false,
      },
      {
        answer: '19',
        correct: false,
      },
    ],
  },
  {
    question: 'Os códigos binários não se aplicam a computadores?',
    answers: [
      {
        answer: 'Verdadeiro',
        correct: false,
      },
      {
        answer: 'Falso',
        correct: true,
      },
    ],
  },
  {
    question: 'Quantos bits tem um byte?',
    answers: [
      {
        answer: '8',
        correct: true,
      },
      {
        answer: '10',
        correct: false,
      },
      {
        answer: '2',
        correct: false,
      },
      {
        answer: '6',
        correct: false,
      },
    ]
  },
  {
    question: '10 em hexadecimal é o mesmo que 10 em decimal?',
    answers: [
      {
        answer: 'Verdadeiro',
        correct: false,
      },
      {
        answer: 'Falso',
        correct: true,
      },
    ],
  },
  {
    question: 'Quantos bits tem um octal?',
    answers: [
      {
        answer: '8',
        correct: false,
      },
      {
        answer: '7',
        correct: false,
      },
      {
        answer: '1',
        correct: false,
      },
      {
        answer: '3',
        correct: true,
      },
    ],
  },
  {
    question: 'Quais são os números compreendidos pelo sistema de numeração octal?',
    answers: [
      {
        answer: '1, 2, 3 e 4',
        correct: false,
      },
      {
        answer: '0, 1, 2, 3, 4, 5, 6, 7 e 8',
        correct: false,
      },
      {
        answer: '0, 1, 2, 3, 4, 5, 6 e 7',
        correct: true,
      },
      {
        answer: 'Nenhumas das anteriores',
        correct: false,
      },
    ],
  },
  {
    question: 'O sistema de numeração hexadecimal vem do hexa=6 e deci=10, sistema numérico de base 16. Ele vai de 0 à 10 e utiliza A,B,C,D,E e F que representam o restante dos números. Sendo assim que número a letra C representa?',
    answers: [
      {
        answer: '10',
        correct: false,
      },
      {
        answer: '11',
        correct: false,
      },
      {
        answer: '12',
        correct: true,
      },
      {
        answer: '13',
        correct: false,
      },
    ],
  },
];

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados tela de sucesso
  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// mostra ou esonde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  //zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();