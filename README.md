#node-express-zod

```
 "@node-express-zod/sing3demons": "github:sing3demons/node-express-zod#main"
 npm i @node-express-zod/sing3demons
```

```
import { IRoute, MyRouter, TypeRoute } from '@node-express-zod/sing3demons'
import express, { Router } from 'express'

const app = express()
const port = 3002

const myRoute: IRoute = new TypeRoute()

class ExampleRoute {
  constructor(private readonly route: IRoute = new TypeRoute()) {}

  register(): Router {
    const exampleController = new ExampleController(this.route)
    return new MyRouter().Register(exampleController).instance
  }
}

class ExampleController {
  constructor(private readonly route: IRoute) {}

  get = this.route.get('/').handler(async ({}) => {
    return {
      message: 'Hello World',
    }
  })
}

app.use('/', new ExampleRoute(myRoute).register())

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

```

```
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Language and Environment */
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,

    /* Modules */
    "module": "NodeNext" /* Specify what module code is generated. */,
    "rootDir": "./src" /* Specify the root folder within your source files. */,
    "moduleResolution": "NodeNext" /* Specify how TypeScript looks up a file from a given module specifier. */,
    "outDir": "./dist" /* Specify an output folder for all emitted files. */,

    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,
    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    "noImplicitAny": true /* Enable error reporting for expressions and declarations with an implied 'any' type. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  },
  "include": ["./**/*.ts"],
  "exclude": ["node_modules/**/*"]
}

```


```
touch .npmrc
//npm.pkg.github.com/:_authToken=
@sing3demons:registry=https://npm.pkg.github.com/
```

```example
import {
  IRoute,
  MyRouter,
  Server,
  TypeRoute,
  globalErrorHandler,
  Logger,
  LoggerType,
  Context,
  ILogger,
} from '@sing3demons/express-zod'
import express, { Router } from 'express'
import nodemailer, { Transporter } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer/index.js'
const app = express()
const port = 3002

const log = new Logger()
const myRoute: IRoute = new TypeRoute()
app.use(express.json())
app.use(Context.Ctx)
class ExampleRoute {
  constructor(private readonly route: IRoute = new TypeRoute()) {}

  register(): Router {
    const exampleController = new ExampleController(this.route, log)
    return new MyRouter().Register(exampleController).instance
  }
}

class MailService {
  private transporter: Transporter
  constructor(private readonly logger: ILogger) {
    this.transporter = nodemailer.createTransport({
      port: 1025,
      host: 'localhost',
    })
    logger.info('MailService created')
  }

  sendMail = async (mailOptions: Mail.Options, logger: ILogger) => {
    try {
      const info = await this.transporter.sendMail(mailOptions)
      logger.info(`sendMail : ${info.messageId}`)
      return info
    } catch (error) {
      logger.error('Error', error)
    }
  }
}

class ExampleController {
  constructor(private readonly route: IRoute, private readonly logger: LoggerType) {}

  transporter = new MailService(this.logger)
  get = this.route.get('/').handler(async ({}) => {
    const logger = this.logger.Logger()
    const start = performance.now()
    logger.info('Start')
    let result = []

    const mailOptions: Mail.Options = {
      from: 'from@me.com',
      to: 'to@you.com',
      subject: 'Hello',
      text: 'Hello, World!',
    }

    for (let i = 0; i < 1000; i++) {
      result.push(this.transporter.sendMail(mailOptions, logger))
    }

    const response = await Promise.all(result)
    const end = performance.now()
    const executionTime = (end - start).toFixed(2)
    logger.info('End', { executionTime })
    return {
      message: 'Hello World',
      total: response.length,
      data: {
        result: response.map((res) => res?.messageId),
        executionTime: (end - start).toFixed(2),
      },
    }
  })
}

app.use('/', new ExampleRoute(myRoute).register())
app.use(globalErrorHandler)
new Server(app).start(port)
```
