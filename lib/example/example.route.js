import { MyRouter } from '../route.js';
export class ExampleRoute {
    constructor(route) {
        this.route = route;
    }
    register() {
        return new MyRouter().Register(this.route).instance;
    }
}
//# sourceMappingURL=example.route.js.map