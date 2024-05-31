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
import { MyRouter, TypeRoute } from '../route.js';
import Logger from '../logger.js';
import Context from '../context.js';
const app = express();
const port = 3002;
app.use(Context.Ctx);
const myRoute = new TypeRoute();
class ExampleRoute {
    constructor(route = new TypeRoute()) {
        this.route = route;
        console.log('ExampleRoute');
    }
    register() {
        const exampleController = new ExampleController(this.route);
        return new MyRouter().Register(exampleController).instance;
    }
}
class ExampleController {
    constructor(route, logger = new Logger()) {
        this.route = route;
        this.logger = logger;
        this.get = this.route.get('/').handler((_a) => __awaiter(this, [_a], void 0, function* ({}) {
            console.log('Hello World');
            const logger = this.logger.Logger();
            logger.info('Hello World', { data: 'Hello World' });
            return {
                message: 'Hello World',
            };
        }));
        console.log('ExampleController');
    }
}
app.use('/', new ExampleRoute(myRoute).register());
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map