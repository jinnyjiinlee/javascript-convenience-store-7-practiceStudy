const ERROR_PREFIX = '[ERROR]';

export const ERROR_MESSAGES = {
  COMMON: {
    BLANK: `${ERROR_PREFIX} 빈 값을 입력하셨습니다.`,
    NOT_NUMBER: `${ERROR_PREFIX} 숫자를 입력하지 않으셨습니다.`,
    NOT_SCOPE: `${ERROR_PREFIX} 1부터 45까지의 숫자가 아닙니다.`,
  },

  PURCHASE_PRICE: {
    NOT_UNIT: `${ERROR_PREFIX} 1000원 단위가 아닙니다..`,
  },

  WINNING_NUMBERS: {
    DUPLICATION: `${ERROR_PREFIX} 중복된 숫자를 입력하셨습니다.`,
    NOT_SIX_DIGITS: `${ERROR_PREFIX} 로또 번호는 6개여야 합니다.`,
  },

  BONUS_NUMBER: {
    DUPLICATION: `${ERROR_PREFIX} 당첨번호와 중복된 숫자를 입력하셨습니다.`,
  }
};
