import { InputHandler } from '../View/inputView.js';
import { OutputHandler } from '../View/outputView.js';

export class MainController {
  constructor() {
    this.input = new InputHandler();
    this.output = new OutputHandler();
  }

  async startProgram() {
    this.output.printProductDetails();
    const parsedProductDetails = await this.input.getProductDetailsInput();
    console.log('parsedProductDetails: ', parsedProductDetails);

    // 이
  }
}
