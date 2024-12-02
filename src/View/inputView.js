import { Console } from '@woowacourse/mission-utils';
// import { INPUT_MESSAGES } from '../Constant/messages.js';
import { commaParser } from '../Utils/commaParser.js';

export class InputHandler {
  constructor() {}
  async getProductDetailsInput() {
    let isValid = false;
    while (!isValid) {
      const input = await Console.readLineAsync(
        '\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
      );

      const parsedProductDetails = commaParser(input);

      try {
        // isValid = new productDetailsValidation(input);
        return parsedProductDetails;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }
  // async getPurchaseAmountInput() {
  //   const inputMessage = INPUT_MESSAGES.PURCHASE_AMOUNT;
  //   return this.validate(PurchasePrice, inputMessage);
  // }

  // async getWinningNumbersInput() {
  //   const inputMessage = INPUT_MESSAGES.WINNING_NUMBERS;
  //   this.winningNumbers = await this.validate(Lotto, inputMessage);
  //   this.winningNumbersToArray = this.winningNumbers.split(',').map(Number);

  //   return this.winningNumbers;
  // }

  // async getBonusNumberInput() {
  //   let isValid = false;
  //   while (!isValid) {
  //     try {
  //       const bonusNumber = await Console.readLineAsync(INPUT_MESSAGES.BONUS_NUMBER);
  //       isValid = new BonusNumber(bonusNumber, this.winningNumbersToArray);
  //       return bonusNumber;
  //     } catch (e) {
  //       Console.print(e.message);
  //     }
  //   }
  // }

  // async validate(ValidationClass, message) {
  //   let isValid = false;
  //   while (!isValid) {
  //     const input = await Console.readLineAsync(message);
  //     try {
  //       isValid = new ValidationClass(input);
  //       return input;
  //     } catch (e) {
  //       Console.print(e.message);
  //     }
  //   }
  // }
}
