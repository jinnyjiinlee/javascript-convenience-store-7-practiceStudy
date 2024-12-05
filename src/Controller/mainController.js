import { InputHandler } from '../View/inputView.js';
import { OutputHandler } from '../View/outputView.js';

import { FreePromotionChecker } from '../Model/freePromotionChecker.js';
import { FixedPricePaymentChecker } from '../Model/fixedPricePaymentChecker.js';
import { PRODUCT_DETAILS } from '../Constant/productsData.js';

import { checkPromotionProduct } from '../Model/promotionProductChecker.js';
import { checkPromotionType } from '../Model/promotionTypeChecker.js';

export class MainController {
  // TODO: 리펙토링 -> ctrl + shift + R: 리펙토링 으로 하기
  constructor() {
    this.input = new InputHandler();
    // this.output = new OutputHandler();
    this.PRODUCT_DETAILS = Object.freeze(this.PRODUCT_DETAILS);
  }

  async startProgram() {
    // this.output.printProductDetails();
    this.parsedProductDetails = await this.input.getProductDetailsInput();
    // const parsedProductDetails = ['[콜라-3], [물-3], [오렌지주스-3], [비타민워터-3], [정식도시락-1] '];

    // 먼저 이게 프로모션 상품인지 아닌지 확인하기
    this.parsedProductDetails.forEach((parsedProductDetail) => {
      if (checkPromotionProduct(parsedProductDetail)) {
        if (checkPromotionType(parsedProductDetail) === '2+1') {
          // 2+1 상품 

        }

        if (checkPromotionType(parsedProductDetail) === '1+1') {
          // 1+1 상품 

        }
      }

      if (checkPromotionProduct(parsedProductDetail) === false) {
        console.log(parsedProductDetail, '프로모션 x');
        // 프로모션 아님
      }
    });

    // this.parsedProductDetailsAddedPromotion = new FreePromotionChecker(parsedProductDetails);

    // // 무료 증정이 가능할 때,
    // for (let parsedProductDetails of this.parsedProductDetailsAddedPromotion) {
    //   if (parsedProductDetails[3] !== null) {
    //     this.input = await new InputHandler().getFreePromotionInput(parsedProductDetails);
    //   }
    // }

    // this.parsedProductDetailsAddedFixedPricePayment = new FixedPricePaymentChecker(
    //   parsedProductDetails,
    // );

    // // 정가 구매 여부를 물어야 할 때,
    // for (let parsedProductDetails of this.parsedProductDetailsAddedFixedPricePayment) {
    //   if (parsedProductDetails[4] !== null) {
    //     this.input = await new InputHandler().getFixedPricePaymentInput(parsedProductDetails);
    //   }
    // }
  }

  checkPromotionProduct() {}
}
