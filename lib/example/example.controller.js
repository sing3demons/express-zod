var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { z } from 'zod';
export default class ExampleController {
    constructor(route) {
        this.route = route;
        this.get = this.route
            .get('/example')
            .query(z.object({ name: z.string().optional() }))
            .handler((_a) => __awaiter(this, [_a], void 0, function* ({ query }) {
            console.log(query);
            return {
                data: 'Hello World',
            };
        }));
    }
}
//# sourceMappingURL=example.controller.js.map