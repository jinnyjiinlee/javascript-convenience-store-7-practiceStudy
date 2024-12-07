import { Console } from '@woowacourse/mission-utils';
// import { INPUT_MESSAGES } from '../Constant/messages.js';
import { commaParser } from '../Utils/commaParser.js';

import { ProductDetailsValidator } from '../Validation/productDetailsValidator.js';

export class InputHandler {
  constructor() {}
  async getProductDetailsInput() {
    const input = await Console.readLineAsync(
      '\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
    );
    const parsedProductDetails = commaParser(input);

    try {
      for (let productDetail of parsedProductDetails) {
        new ProductDetailsValidator(productDetail);
      }

      return parsedProductDetails;
    } catch (e) {
      Console.print(e.message);
      await this.getProductDetailsInput();
      return parsedProductDetails;
    }
  }

  async getGiftedPromotionPaymentInput(giftedPromotionCount, parsedProductDetail, purchaseCount) {
    if (giftedPromotionCount) {
      const answer = await Console.readLineAsync(
        `현재 ${parsedProductDetail[0]}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`,
      );

      if (answer === 'Y') {
        purchaseCount += 1;
      }
      if (answer === 'N') {
        // 구매개수 그대로
      }

      if (!(answer === 'Y' || answer === 'N')) {
        await this.getGiftedPromotionPaymentInput(
          giftedPromotionCount,
          parsedProductDetail,
          purchaseCount,
        );
      }
    }

    return purchaseCount;
  }

  async getFixedPricePaymentInput(fixedPricePayment, parsedProductDetail, purchaseCount) {
    if (fixedPricePayment) {
      const answer = await Console.readLineAsync(
        `현재 ${parsedProductDetail[0]} ${fixedPricePayment}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
      );

      if (answer === 'Y') {
        // 구매개수 그대로
      }
      if (answer === 'N') {
        purchaseCount = purchaseCount - fixedPricePayment;
      }

      if (!(answer === 'Y' || answer === 'N')) {
        await this.getFixedPricePaymentInput(fixedPricePayment, parsedProductDetail, purchaseCount);
      }
    }
    return purchaseCount;
  }

  async getMembershipDiscountInput() {
    const answer = await Console.readLineAsync(`멤버십 할인을 받으시겠습니까? (Y/N)`);
    if (answer === 'Y') {
      return 'Y';
    }
    if (answer === 'N') {
      return 'N';
    }

    return await this.getMembershipDiscountInput();
  }
}
