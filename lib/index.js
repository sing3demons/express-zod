var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { fromZodError } from 'zod-validation-error';
import { z } from 'zod';
export class TypeRoute {
    constructor() {
        this.get = (path) => new TypedRouteHandler(path, HttpMethod.GET);
        this.post = (path) => new TypedRouteHandler(path, HttpMethod.POST);
        this.put = (path) => new TypedRouteHandler(path, HttpMethod.PUT);
        this.delete = (path) => new TypedRouteHandler(path, HttpMethod.DELETE);
        this.patch = (path) => new TypedRouteHandler(path, HttpMethod.PATCH);
    }
}
export class MyRouter {
    constructor(instance = Router()) {
        this.instance = instance;
    }
    preRequest(handler) {
        const invokeHandler = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const result = yield handler(req, res, next);
            return res.send(Object.assign({ success: true, message: 'Request successful' }, result));
        });
        return catchAsync(invokeHandler);
    }
    Register(classInstance) {
        const fields = Object.values(classInstance);
        fields.forEach((field) => {
            const route = field;
            if (route.__handlerMetadata) {
                const { path, handler } = route;
                const method = route.method.toLowerCase();
                this.instance.route(path)[method](this.preRequest(handler));
            }
        });
        return this;
    }
}
function catchAsync(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
}
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "get";
    HttpMethod["POST"] = "post";
    HttpMethod["PUT"] = "put";
    HttpMethod["DELETE"] = "delete";
    HttpMethod["PATCH"] = "patch";
})(HttpMethod || (HttpMethod = {}));
class TypedRouteHandler {
    constructor(path, method) {
        this.path = path;
        this.method = method;
        this.schema = {};
    }
    query(schema) {
        this.schema.query = schema;
        return this;
    }
    body(schema) {
        this.schema.body = schema;
        return this;
    }
    params(schema) {
        this.schema.params = schema;
        return this;
    }
    handler(handler) {
        const invokeHandler = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let message = '';
            let query, params, body;
            try {
                message = 'Query';
                query = this.schema.query ? this.schema.query.parse(req.query) : undefined;
                message = 'Params';
                params = this.schema.params ? this.schema.params.parse(req.params) : undefined;
                message = 'Body';
                body = this.schema.body ? this.schema.body.parse(req.body) : undefined;
            }
            catch (error) {
                if (error instanceof z.ZodError) {
                    const validationError = fromZodError(error);
                    throw new ValidationError(`${message} ${validationError.toString()}`);
                }
            }
            return handler({ query, params, body, req, res });
        });
        return {
            method: this.method,
            path: this.path,
            handler: invokeHandler,
            __handlerMetadata: true,
        };
    }
}
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'HttpError';
    }
}
class ValidationError extends HttpError {
    constructor(message) {
        super(400, message);
        this.message = message;
        this.name = 'ValidationError';
    }
}
export class NotFoundError extends HttpError {
    constructor(message) {
        super(404, message);
        this.name = 'NotFoundError';
    }
}
export class UnauthorizedError extends HttpError {
    constructor(message) {
        super(401, message);
        this.name = 'UnauthorizedError';
    }
}
export function globalErrorHandler(error, _request, response, _next) {
    let statusCode = 500;
    let message = '';
    if (error instanceof HttpError) {
        statusCode = error.statusCode;
    }
    if (error instanceof Error) {
        console.log(`${error.name}: ${error.message}`);
        message = error.message;
        if (message.includes('not found')) {
            statusCode = 404;
        }
    }
    else {
        console.log('Unknown error');
        message = `An unknown error occurred, ${String(error)}`;
    }
    response.status(statusCode).send({
        statusCode: statusCode,
        message,
        success: false,
        data: null,
        traceStack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined,
    });
}
//# sourceMappingURL=index.js.map