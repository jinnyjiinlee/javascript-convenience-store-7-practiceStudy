import { PRODUCT_DETAILS } from '../Constant/constant.js';

// const parsedProductDetails = [
//   ['사이다', '2'],
//   ['감자칩', '1'],
// ];

export class FreePromotionChecker {
  constructor(parsedProductDetails) {
    this.parsedProductDetails = parsedProductDetails;

    this.makePromotionProductArray();
    this.checkFreePromotion();
    return this.calculatePromotionQuantity();
  }

  makePromotionProductArray() {
    this.onePlusOneProductNames = [];
    this.twoPlusOneProductNames = [];

    for (let i = 1; i < Object.entries(PRODUCT_DETAILS).length + 1; i += 1) {
      if (
        PRODUCT_DETAILS[i].PROMOTION === '반짝할인' ||
        PRODUCT_DETAILS[i].PROMOTION === 'MD추천상품'
      ) {
        this.onePlusOneProductNames.push(PRODUCT_DETAILS[i].PRODUCT_NAME);
      }

      if (PRODUCT_DETAILS[i].PROMOTION === '탄산2+1') {
        this.twoPlusOneProductNames.push(PRODUCT_DETAILS[i].PRODUCT_NAME);
      }
    }
  }

  checkFreePromotion() {
    // 프로모션 적용 상품인지 확인한다.
    // 1+1인지 확인하고 배열에 해당 프로모션을 넣어준다.
    for (let parsedProduct of this.parsedProductDetails) {
      const checkOnePlusOneProduct = this.onePlusOneProductNames.some(
        (onePlusOneProduct) => onePlusOneProduct === parsedProduct[0],
      );

      if (checkOnePlusOneProduct === true) {
        parsedProduct.push('1+1');
      }
    }

    // 2+1인지 확인하고 배열에 넣어준다.
    for (let parsedProduct of this.parsedProductDetails) {
      const checkTwoPlusOneProduct = this.twoPlusOneProductNames.some(
        (twoPlusOneProduct) => twoPlusOneProduct === parsedProduct[0],
      );

      if (checkTwoPlusOneProduct === true) {
        parsedProduct.push('2+1');
      }
    }

    for (let parsedProduct of this.parsedProductDetails) {
      if (parsedProduct[2] === undefined) {
        parsedProduct.push(null);
      }
    }
  }

  calculatePromotionQuantity() {
    // 만약에 1+1 이면?
    for (let parsedProduct of this.parsedProductDetails) {
      if (parsedProduct[2] === '1+1') {
        // console.log('1+1:', parsedProduct[0]);

        // 프로모션 재고 들고오기
        // 지금 구매한 상품중 1+1에 상품 키 값들고오기

        const onePlusOneKey = Object.keys(PRODUCT_DETAILS).find(
          (key) => PRODUCT_DETAILS[key].PRODUCT_NAME === parsedProduct[0],
        );
        // 프로모션 재고. 들오오기 (e.g. 감자칩이 1+1이면 7)
        const promotionStock = PRODUCT_DETAILS[onePlusOneKey].PROMOTION_STOCK;
        const inputQuantity = Number(parsedProduct[1]);

        if (inputQuantity % 2 === 1 && promotionStock > inputQuantity) {
          const availableFreePromotion = 1;
          parsedProduct.push(availableFreePromotion);
        }
      }
      // 2+1
      if (parsedProduct[2] === '2+1') {
        // 지금 구매한 상품 중 2+1 상품 키 들고오기
        const twoPlusOneKey = Object.keys(PRODUCT_DETAILS).find(
          (key) => PRODUCT_DETAILS[key].PRODUCT_NAME === parsedProduct[0],
        );
        // 프로모션 재고. 들오오기 (e.g. 감자칩이 1+1이면 7)
        const promotionStock = PRODUCT_DETAILS[twoPlusOneKey].PROMOTION_STOCK;
        const inputQuantity = Number(parsedProduct[1]);

        // 사려는 수량이 2의의 배수이고 // 재고가 많으면
        if (inputQuantity % 2 === 0 && promotionStock > inputQuantity) {
          const availableFreePromotion = 1;
          parsedProduct.push(availableFreePromotion);
        }
      }

      if (parsedProduct[2] === null) {
        parsedProduct.push(null);
      }

      if (parsedProduct[3] === undefined) {
        parsedProduct.push(null);
      }
    }

    return this.parsedProductDetails;
  }
}
