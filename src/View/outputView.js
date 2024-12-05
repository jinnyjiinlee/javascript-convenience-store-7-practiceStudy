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

    for (let i = 1; i < Object.entries(this.PRODUCT_DETAILS).length + 1; i += 1) {
      // 프로모션

      if (this.PRODUCT_DETAILS[i].PROMOTION_STOCK !== null) {
        Console.print(
          `- ${this.PRODUCT_DETAILS[i].PRODUCT_NAME} ${this.PRODUCT_DETAILS[i].PRICE.toLocaleString()}원 ${this.PRODUCT_DETAILS[i].PROMOTION_STOCK}개 ${this.PRODUCT_DETAILS[i].PROMOTION}`,
        );
      }

      if (this.PRODUCT_DETAILS[i].NORMAL_STOCK !== null) {
        this.PRODUCT_DETAILS[i].NORMAL_STOCK = this.PRODUCT_DETAILS[i].NORMAL_STOCK + '개';
      }
      if (this.PRODUCT_DETAILS[i].NORMAL_STOCK === null) {
        this.PRODUCT_DETAILS[i].NORMAL_STOCK = '재고 없음';
      }
      Console.print(
        `- ${this.PRODUCT_DETAILS[i].PRODUCT_NAME} ${this.PRODUCT_DETAILS[i].PRICE.toLocaleString()}원 ${this.PRODUCT_DETAILS[i].NORMAL_STOCK}`,
      );
    }
  }
}
