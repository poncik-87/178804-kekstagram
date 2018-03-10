const {ValidationError} = require(`./errors`);

const validate = (data, validationSchema) => {
  const errors = [];

  for (let field in validationSchema) {
    if (data[field]) {
      const fieldErrors = validationSchema[field].rules
          .filter(({rule}) => !rule(data[field]))
          .map(({errorMessage}) => errorMessage);
      errors.push(...fieldErrors);
    } else if (validationSchema[field].isRequired) {
      errors.push(`${field} is required`);
    }
  }

  if (errors.length) {
    throw new ValidationError(errors.join(`\n`));
  }
};

module.exports = {
  name: `validation`,
  description: `валидация входных данных`,
  validate
};
