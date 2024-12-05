import { Console } from '@woowacourse/mission-utils';
import { PRODUCT_DETAILS } from '../Constant/productsData.js';
import fs from 'fs';

export class OutputHandler {
  constructor() {
    this.PRODUCT_DETAILS = PRODUCT_DETAILS;
  }
  printProductDetails() {
    Console.print(`안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n`);

    fs.readFile('public/products.md', 'utf8', (err, data) => {
      if (err) {
        throw err; // 에러를 던집니다.
      }
      const dataSplit = data.split('\n');
      const splitProductDetails = [];
      for (let productDetails of dataSplit) {
        splitProductDetails.push(productDetails.split(','));
      }
      const toObject = { ...splitProductDetails };
    });

    for (let productDetail of this.PRODUCT_DETAILS) {
      // 프로모션

      if (productDetail.PROMOTION_STOCK !== null) {
        Console.print(
          `- ${productDetail.PRODUCT_NAME} ${productDetail.PRICE.toLocaleString()}원 ${productDetail.PROMOTION_STOCK}개 ${productDetail.PROMOTION_TYPE}`,
        );
      }

      if (productDetail.NORMAL_STOCK !== null) {
        Console.print(
          `- ${productDetail.PRODUCT_NAME} ${productDetail.PRICE.toLocaleString()}원 ${productDetail.NORMAL_STOCK}개`,
        );
      }
      if (productDetail.NORMAL_STOCK === null) {
        productDetail.NORMAL_STOCK = '재고 없음';
        Console.print(
          `- ${productDetail.PRODUCT_NAME} ${productDetail.PRICE.toLocaleString()}원 ${productDetail.NORMAL_STOCK}`,
        );
      }

    }
  }
}
