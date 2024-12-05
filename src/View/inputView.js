import { Console } from '@woowacourse/mission-utils';
// import { INPUT_MESSAGES } from '../Constant/messages.js';
import { commaParser } from '../Utils/commaParser.js';

import { ProductDetailsValidator } from '../Validation/productDetailsValidator.js';

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
        // 여기에 일반재고 + 프로모션 재고 합한 것보다 구매 수량이 많을 때, 오류 나게 해야된다.
        // 1개씩 넣어서 유효성 검사를 하자

        parsedProductDetails.forEach((productDetail) => {
          isValid = new ProductDetailsValidator(productDetail);
        });

        return parsedProductDetails;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getFreePromotionInput(parsedProductDetails) {
    let isValid = false;
    while (!isValid) {
      const input = await Console.readLineAsync(
        `\n현재 ${parsedProductDetails[0]}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`,
      );

      try {
        // isValid = new productDetailsValidation(input);
        return parsedProductDetails;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getFixedPricePaymentInput(parsedProductDetails) {
    let isValid = false;
    while (!isValid) {
      const input = await Console.readLineAsync(
        `현재 ${parsedProductDetails[0]} ${parsedProductDetails[4]}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까?`,
      );

      try {
        // isValid = new productDetailsValidation(input);
        return parsedProductDetails;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }
}
