import { Console } from '@woowacourse/mission-utils';
import { PRODUCT_DETAILS } from '../Constant/constant.js';

import fs from 'fs';

export class OutputHandler {
  printProductDetails() {
    Console.print(`안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n`);

    // fs.readFile('public/products.md', 'utf8', (err, data) => {
    //   if (err) {
    //     throw err; // 에러를 던집니다.
    //   }
    //   const dataSplit = data.split('\n');
    //   const splitProductDetails = [];
    //   for (let productDetails of dataSplit) {
    //     splitProductDetails.push(productDetails.split(','));
    //   }
    //   const toObject = {...splitProductDetails}
    //   console.log(splitProductDetails);
    //   console.log(toObject);

    for (let i = 1; i < Object.entries(PRODUCT_DETAILS).length + 1; i += 1) {
      // 프로모션

      if (PRODUCT_DETAILS[i].PROMOTION_QUANTITY !== null) {
        Console.print(
          `- ${PRODUCT_DETAILS[i].PRODUCT_NAME} ${PRODUCT_DETAILS[i].PRICE.toLocaleString()}원 ${PRODUCT_DETAILS[i].PROMOTION_QUANTITY}개 ${PRODUCT_DETAILS[i].PROMOTION}`,
        );
      }

      if (PRODUCT_DETAILS[i].NORMAL_QUANTITY !== null) {
        PRODUCT_DETAILS[i].NORMAL_QUANTITY = PRODUCT_DETAILS[i].NORMAL_QUANTITY + '개';
      }
      if (PRODUCT_DETAILS[i].NORMAL_QUANTITY === null) {
        PRODUCT_DETAILS[i].NORMAL_QUANTITY = '재고 없음';
      }
      Console.print(
        `- ${PRODUCT_DETAILS[i].PRODUCT_NAME} ${PRODUCT_DETAILS[i].PRICE.toLocaleString()}원 ${PRODUCT_DETAILS[i].NORMAL_QUANTITY}`,
      );
    }
  }
}
