var _a;
import { createLogger, format, transports } from 'winston';
import Context from './context.js';
function makeStructuredClone(obj) {
    if (typeof obj === 'undefined') {
        return obj;
    }
    const payload = JSON.parse(JSON.stringify(obj));
    if (typeof payload === 'object') {
        if (Array.isArray(payload)) {
            for (const item of payload) {
                if (typeof item === 'object') {
                    Sensitive.masking(item);
                }
            }
        }
        else {
            Sensitive.masking(payload);
        }
    }
    return payload;
}
const Sensitive = {
    maskNumber: (mobileNo, mask) => {
        let maskData = 'XXX-XXX-XX';
        if (mask) {
            maskData = maskData.replace(/X/g, mask);
        }
        if (ignoreCase.startWith(mobileNo, '+')) {
            if (mobileNo.length >= 10) {
                return `${maskData}${mobileNo.substring(mobileNo.length - 2, mobileNo.length)}`;
            }
        }
        else if (ignoreCase.startWith(mobileNo, '0') && mobileNo.length >= 10) {
            return `${maskData}${mobileNo.substring(mobileNo.length - 2, mobileNo.length)}`;
        }
        return mobileNo;
    },
    maskEmail: (email) => {
        const rex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
        if (!rex.test(email)) {
            return email;
        }
        else {
            let [first, second] = email.split('@');
            if (!first) {
                return '';
            }
            if (first.length > 2) {
                const mask = first.substring(3, first.length);
                const notMask = first.substring(0, 3);
                first = notMask + 'X'.repeat(mask.length);
            }
            else {
                first = first.replace(first.substring(1, first.length), 'X'.repeat(first.length - 1));
            }
            return `${first}@${second}`;
        }
    },
    maskPassword: (password) => password.replace(password, '********'),
    masking: (item) => {
        for (const key in item) {
            if (ignoreCase.equal(key, 'password')) {
                item[key] = Sensitive.maskPassword(item[key]);
            }
            else if (ignoreCase.equal(key, 'email')) {
                item[key] = Sensitive.maskEmail(item[key]);
            }
            else if (ignoreCase.equal(key, 'mobileNo')) {
                item[key] = Sensitive.maskNumber(item[key]);
            }
            else if (ignoreCase.equal(key, 'phone')) {
                item[key] = Sensitive.maskNumber(item[key]);
            }
            else if (typeof item[key] === 'object') {
                Sensitive.masking(item[key]);
            }
        }
    },
};
export const ignoreCase = {
    equal: (a, b) => {
        if (a === undefined || b === undefined) {
            return false;
        }
        return a.toLowerCase() === b.toLowerCase();
    },
    notEqual: (a, b) => a.toLowerCase() !== b.toLowerCase(),
    contain: (a, b) => a.toLowerCase().includes(b.toLowerCase()),
    notContain: (a, b) => !a.toLowerCase().includes(b.toLowerCase()),
    startWith: (a, b) => a.toLowerCase().startsWith(b.toLowerCase()),
};
const level = (_a = process.env.LOG_LEVEL) !== null && _a !== void 0 ? _a : 'debug';
class Logger {
    constructor() {
        var _a;
        this.log = createLogger({
            level: level,
            format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss', alias: '@timestamp' }), format.json({
                replacer(key, value) {
                    if (ignoreCase.equal(key, 'password')) {
                        return Sensitive.maskPassword(value);
                    }
                    else if (ignoreCase.equal(key, 'email')) {
                        return Sensitive.maskEmail(value);
                    }
                    else if (ignoreCase.equal(key, 'mobileNo')) {
                        return Sensitive.maskNumber(value);
                    }
                    else if (ignoreCase.equal(key, 'phone')) {
                        return Sensitive.maskPassword(value);
                    }
                    else if (key === 'timestamp') {
                        return undefined;
                    }
                    return value;
                },
            })),
            exceptionHandlers: [],
            exitOnError: false,
            transports: [
                new transports.Console({
                    level: level,
                    handleExceptions: true,
                }),
            ],
            defaultMeta: { serviceName: (_a = process.env.SERVICE_NAME) !== null && _a !== void 0 ? _a : 'Service-HTTP' },
        });
    }
    Logger(ctx = Context.get(), extra) {
        return this.log.child(Object.assign(Object.assign({}, ctx), extra));
    }
    info(message, data, ctx) {
        const action = Object.assign({}, makeStructuredClone(data));
        this.log.info(message, action, { session: ctx === null || ctx === void 0 ? void 0 : ctx.session });
    }
    warn(message, data, ctx) {
        const action = Object.assign({}, makeStructuredClone(data));
        this.log.warn(message, action, { session: ctx === null || ctx === void 0 ? void 0 : ctx.session });
    }
    error(message, data, ctx) {
        const action = Object.assign({}, makeStructuredClone(data));
        this.log.error(message, action, { session: ctx === null || ctx === void 0 ? void 0 : ctx.session });
    }
    debug(message, data, ctx) {
        const action = Object.assign({}, makeStructuredClone(data));
        this.log.debug(message, action, { session: ctx === null || ctx === void 0 ? void 0 : ctx.session });
    }
}
export default Logger;
//# sourceMappingURL=logger.js.map