import { MainController } from './Controller/mainController.js';

class App {
  async run() {
    await new MainController().startProgram();
  }
}

export default App;
