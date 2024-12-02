import { InputHandler } from '../View/inputView.js';
import { OutputHandler } from '../View/outputView.js';

import { FreePromotionChecker } from '../Model/freePromotionChecker.js';

export class MainController {
  constructor() {
    this.input = new InputHandler();
    this.output = new OutputHandler();
  }

  async startProgram() {
    this.output.printProductDetails();
    const parsedProductDetails = await this.input.getProductDetailsInput();
    // console.log('parsedProductDetails: ', parsedProductDetails);

    // const parsedProductDetails = [
    //   ['사이다', '2'],
    //   ['감자칩', '1'],
    //   ['물', '1'],
    //   ['초코바', '3'],
    // ];

    this.parsedProductDetailsAddedPromotion = new FreePromotionChecker(parsedProductDetails);

    // 무료 증정이 가능할 때,
    for (let parsedProductDetails of this.parsedProductDetailsAddedPromotion) {
      if (parsedProductDetails[3] !== null) {
        this.input = await new InputHandler().getFreePromotionInput(parsedProductDetails);
      }
    }

    //

    // 이제 해야할 것
    // 프로모션 적용이 가능한 상품에 대해 해당 수량 만큼 가져오지 않았을 경우,
  }
}
