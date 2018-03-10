const readline = require(`readline`);
const fs = require(`fs`);
const promisify = require(`util`).promisify;

const {generateEntities} = require(`../utils`);

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
  const questions = {
    [QUESTION_TYPE.agreement]: `Приветствую!\nХотите сгенерировать данные приложения?(Yes/No)`,
    [QUESTION_TYPE.elementsCount]: `Введите количество элементов данных`,
    [QUESTION_TYPE.elementsCountError]: `Некорректно введенное число`,
    [QUESTION_TYPE.filePath]: `Введите путь с именем генерируемого файла`,
    [QUESTION_TYPE.anotherFilePath]: `Введите другой путь с именем генерируемого файла`,
    [QUESTION_TYPE.rewrite]: `Файл с таким именем уже существует, хотите переписать его?(Yes/No)`
  };

  return questions[type];
};

// Обработка ответа "Да/Нет"
const processYesNoResponse = (answer, onYes, onNo, onOther) => {
  answer = answer.toLowerCase();
  if (answer === `y` || answer === `yes`) {
    onYes();
  } else if (answer === `n` || answer === `no`) {
    onNo();
  } else {
    onOther();
  }
};

// Генерирует данные и записывает их в файл
const generateDataToFile = async (elementsCount, filePath) => {
  const data = generateEntities(elementsCount);

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

    const actions = {
      [QUESTION_TYPE.agreement]: processAgreement,
      [QUESTION_TYPE.elementsCount]: processElementsCount,
      [QUESTION_TYPE.filePath]: processFilePath,
      [QUESTION_TYPE.rewrite]: processRewrite
    };

    rl.on(`line`, (answer) => {
      actions[questionType](answer);
    });

    questionType = QUESTION_TYPE.agreement;
    console.log(getQuestion(QUESTION_TYPE.agreement));
    rl.prompt();
  },
  generateDataToFile
};
