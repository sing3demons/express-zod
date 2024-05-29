var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { MyRouter, TypeRoute } from '../index.js';
const app = express();
const port = 3002;
const myRoute = new TypeRoute();
class ExampleRoute {
    constructor(route = new TypeRoute()) {
        this.route = route;
    }
    register() {
        const exampleController = new ExampleController(this.route);
        return new MyRouter().Register(exampleController).instance;
    }
}
class ExampleController {
    constructor(route) {
        this.route = route;
        this.get = this.route.get('/').handler((_a) => __awaiter(this, [_a], void 0, function* ({}) {
            return {
                message: 'Hello World',
            };
        }));
    }
}
app.use('/', new ExampleRoute(myRoute).register());
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map