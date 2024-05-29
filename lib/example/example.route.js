import { MyRouter, TypeRoute } from '../route.js';
import ExampleController from './example.controller.js';
export class ExampleRoute {
    constructor(route = new TypeRoute()) {
        this.route = route;
    }
    register() {
        const exampleController = new ExampleController(this.route);
        return new MyRouter().Register(exampleController).instance;
    }
}
//# sourceMappingURL=example.route.js.map