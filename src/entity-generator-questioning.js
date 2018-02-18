const readline = require(`readline`);
const fs = require(`fs`);
const promisify = require(`util`).promisify;

const generateEntity = require(`./entity-generator`).generateEntity;

const writeFilePromise = promisify(fs.writeFile);

const QUESTION_TYPE = {
  agreement: `agreement`,
  elementsCount: `elementsCount`,
  elementsCountError: `elementsCountError`,
  filePath: `filePath`,
  anotherFilePath: `anotherFilePath`,
  rewrite: `rewrite`
};

// Возвращает вопрос к пользователю
const getQuestion = (type) => {
  let question = ``;
  switch (type) {
    case QUESTION_TYPE.agreement:
      question = `Приветствую!\nХотите сгенерировать данные приложения?(Yes/No)`;
      break;
    case QUESTION_TYPE.elementsCount:
      question = `Введите количество элементов данных`;
      break;
    case QUESTION_TYPE.elementsCountError:
      question = `Некорректно введенное число`;
      break;
    case QUESTION_TYPE.filePath:
      question = `Введите путь с именем генерируемого файла`;
      break;
    case QUESTION_TYPE.anotherFilePath:
      question = `Введите другой путь с именем генерируемого файла`;
      break;
    case QUESTION_TYPE.rewrite:
      question = `Файл с таким именем уже существует, хотите переписать его?(Yes/No)`;
      break;
  }

  return question;
};

// Обработка ответа "Да/Нет"
const processYesNoResponse = (answer, yesCallback, noCallback, otherCallback) => {
  answer = answer.toLowerCase();
  if (answer === `y` || answer === `yes`) {
    yesCallback();
  } else if (answer === `n` || answer === `no`) {
    noCallback();
  } else {
    otherCallback();
  }
};

// Генерирует данные и записывает их в файл
const generateDataToFile = async (elementsCount, filePath) => {
  let data = [];
  for (let i = 0; i < elementsCount; i++) {
    data.push(generateEntity());
  }

  try {
    await writeFilePromise(filePath, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  name: `entityGeneratorQuestioning`,
  description: `Взаимодействует с пользователем для получения параметров генератора данных`,
  execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    let elementsCount = 0;
    let filePath = ``;
    let questionType;

    // Обработка вопроса подтверждения действий
    const processAgreement = (answer) => {
      processYesNoResponse(answer, () => {
        questionType = QUESTION_TYPE.elementsCount;
        console.log(getQuestion(QUESTION_TYPE.elementsCount));
        rl.prompt();
      }, () => {
        rl.close();
      }, () => {
        rl.prompt();
      });
    };

    // Обработка вопроса количества тестовых данных
    const processElementsCount = (answer) => {
      elementsCount = Number.parseInt(answer, 10);
      if (Number.isNaN(elementsCount)) {
        console.log(getQuestion(QUESTION_TYPE.elementsCountError));
        rl.prompt();
      } else {
        questionType = QUESTION_TYPE.filePath;
        console.log(getQuestion(QUESTION_TYPE.filePath));
        rl.prompt();
      }
    };

    // Обработка вопроса пути файла
    const processFilePath = (answer) => {
      filePath = answer;
      if (fs.existsSync(answer)) {
        questionType = QUESTION_TYPE.rewrite;
        console.log(getQuestion(QUESTION_TYPE.rewrite));
        rl.prompt();
      } else {
        generateDataToFile(elementsCount, filePath);
        rl.close();
      }
    };

    // Обработка вопроса перезаписи существующего файла
    const processRewrite = (answer) => {
      processYesNoResponse(answer, () => {
        generateDataToFile(elementsCount, filePath);
        rl.close();
      }, () => {
        questionType = QUESTION_TYPE.filePath;
        console.log(getQuestion(QUESTION_TYPE.anotherFilePath));
        rl.prompt();
      }, () => {
        rl.prompt();
      });
    };

    rl.on(`line`, (answer) => {
      switch (questionType) {
        case QUESTION_TYPE.agreement:
          processAgreement(answer);
          break;
        case QUESTION_TYPE.elementsCount:
          processElementsCount(answer);
          break;
        case QUESTION_TYPE.filePath:
          processFilePath(answer);
          break;
        case QUESTION_TYPE.rewrite:
          processRewrite(answer);
          break;
      }
    });

    questionType = QUESTION_TYPE.agreement;
    console.log(getQuestion(QUESTION_TYPE.agreement));
    rl.prompt();
  },
  generateDataToFile
};
