import { ERROR_MESSAGES } from '../Constant/errorMessages.js';

export class productDetailsValidationLotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers.split(',').map(Number));
    this.#numbers = numbers;
  }

  isBlank(value) {
    return value[0] === 0;
  }

  isNotNumber(value) {
    return !Number.isNaN(Number(value));
  }

  isNotScope(value) {
    return value.some((number) => number < 0 || number > 45);
  }

  // eslint-disable-next-line max-lines-per-function
  validate(numbers) {
    if (this.isBlank(numbers)) {
      throw new Error(ERROR_MESSAGES.COMMON.BLANK);
    }

    if (this.isNotNumber(numbers)) {
      throw new Error(ERROR_MESSAGES.COMMON.NOT_NUMBER);
    }

    if (this.isNotScope(numbers)) {
      throw new Error(ERROR_MESSAGES.COMMON.NOT_SCOPE);
    }

    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.NOT_SIX_DIGITS);
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.DUPLICATION);
    }
  }
}
