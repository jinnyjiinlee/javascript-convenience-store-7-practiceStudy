// import { Console } from '@woowacourse/mission-utils';
// import { INPUT_MESSAGES } from '../Constant/messages.js';



// export class InputHandler {
//   constructor() {
//     this.winningNumber = null;
//   }

//   async getPurchaseAmountInput() {
//     const inputMessage = INPUT_MESSAGES.PURCHASE_AMOUNT;
//     return this.validate(PurchasePrice, inputMessage);
//   }

//   async getWinningNumbersInput() {
//     const inputMessage = INPUT_MESSAGES.WINNING_NUMBERS;
//     this.winningNumbers = await this.validate(Lotto, inputMessage);
//     this.winningNumbersToArray = this.winningNumbers.split(',').map(Number);

//     return this.winningNumbers;
//   }

//   async getBonusNumberInput() {
//     let isValid = false;
//     while (!isValid) {
//       try {
//         const bonusNumber = await Console.readLineAsync(
//           INPUT_MESSAGES.BONUS_NUMBER,
//         );
//         isValid = new BonusNumber(bonusNumber, this.winningNumbersToArray);
//         return bonusNumber;
//       } catch (e) {
//         Console.print(e.message);
//       }
//     }
//   }

//   async validate(ValidationClass, message) {
//     let isValid = false;
//     while (!isValid) {
//       const input = await Console.readLineAsync(message);
//       try {
//         isValid = new ValidationClass(input);
//         return input;
//       } catch (e) {
//         Console.print(e.message);
//       }
//     }
//   }
// }
