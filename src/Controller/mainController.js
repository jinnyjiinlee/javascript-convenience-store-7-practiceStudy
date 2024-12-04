import { InputHandler } from '../View/inputView.js';
import { OutputHandler } from '../View/outputView.js';

import { FreePromotionChecker } from '../Model/freePromotionChecker.js';
import { FixedPricePaymentChecker } from '../Model/fixedPricePaymentChecker.js';
import { PRODUCT_DETAILS } from '../Constant/constant.js';

export class MainController {
  // TODO: 리펙토링 -> ctrl + shift + R: 리펙토링 으로 하기
  constructor() {
    this.input = new InputHandler();
    this.output = new OutputHandler();
    this.PRODUCT_DETAILS = Object.freeze(this.PRODUCT_DETAILS);
  }

  async startProgram() {
    this.output.printProductDetails();
    const parsedProductDetails = await this.input.getProductDetailsInput();
    // console.log('parsedProductDetails: ', parsedProductDetails);

    this.parsedProductDetailsAddedPromotion = new FreePromotionChecker(parsedProductDetails);

    // 무료 증정이 가능할 때,
    for (let parsedProductDetails of this.parsedProductDetailsAddedPromotion) {
      if (parsedProductDetails[3] !== null) {
        this.input = await new InputHandler().getFreePromotionInput(parsedProductDetails);
      }
    }

    this.parsedProductDetailsAddedFixedPricePayment = new FixedPricePaymentChecker(
      parsedProductDetails,
    );

    // 정가 구매 여부를 물어야 할 때,
    for (let parsedProductDetails of this.parsedProductDetailsAddedFixedPricePayment) {
      if (parsedProductDetails[4] !== null) {
        this.input = await new InputHandler().getFixedPricePaymentInput(parsedProductDetails);
      }
    }

  }
}
