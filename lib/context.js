import { v4 as uuidv4 } from 'uuid';
class Context {
    static Ctx(req, _res, next) {
        if (!req.headers['x-session']) {
            req.headers['x-session'] = `default-${uuidv4()}`;
        }
        Context.bind(req);
        next();
    }
    static bind(req) {
        const headers = Context.getHeaders(req);
        Context._bindings.set('x-session', headers);
    }
    static get() {
        return Context._bindings.get('x-session');
    }
    static clear() {
        Context._bindings.delete('x-session');
    }
    static getHeaders(req) {
        var _a;
        return {
            session: (_a = req.headers['x-session']) !== null && _a !== void 0 ? _a : `default-${uuidv4()}`,
        };
    }
}
Context._bindings = new Map();
export default Context;
//# sourceMappingURL=context.js.map