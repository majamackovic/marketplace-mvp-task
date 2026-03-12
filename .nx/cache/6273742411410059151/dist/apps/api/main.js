/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(6);
const prisma_service_1 = __webpack_require__(7);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(6);
const dto_1 = __webpack_require__(19);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
    getHello() {
        return { message: 'Hello from NestJS' };
    }
    getAllProjects() {
        return this.appService.getAllProjects();
    }
    createProject(body) {
        return this.appService.createProject({
            title: body.title,
            description: body.description,
        });
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
tslib_1.__decorate([
    (0, common_1.Get)('hello'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
tslib_1.__decorate([
    (0, common_1.Get)('projects'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getAllProjects", null);
tslib_1.__decorate([
    (0, common_1.Post)('projects'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof dto_1.CreateProjectDto !== "undefined" && dto_1.CreateProjectDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "createProject", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const prisma_service_1 = __webpack_require__(7);
let AppService = class AppService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getData() {
        return { message: 'Hello API' };
    }
    getAllProjects() {
        return this.prisma.prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    createProject(data) {
        return this.prisma.prisma.project.create({
            data: {
                title: data.title,
                description: data.description ?? null,
            },
        });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AppService);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const prisma_client_1 = __webpack_require__(8);
const adapter_pg_1 = __webpack_require__(18);
let PrismaService = class PrismaService {
    constructor() {
        this.client = null;
    }
    async onModuleInit() {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error('DATABASE_URL environment variable is not set');
        }
        const adapter = new adapter_pg_1.PrismaPg({ connectionString });
        this.client = new prisma_client_1.PrismaClient({ adapter });
        await this.client.$connect();
    }
    async onModuleDestroy() {
        if (this.client) {
            await this.client.$disconnect();
            this.client = null;
        }
    }
    get prisma() {
        if (!this.client) {
            throw new Error('PrismaClient is not initialized');
        }
        return this.client;
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file should be your main import to use Prisma. Through it you get access to all the models, enums, and input types.
 * If you're looking for something you can import in the client-side of your application, please refer to the `browser.ts` file instead.
 *
 * 🟢 You can import this file directly.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Prisma = exports.PrismaClient = exports.$Enums = void 0;
const tslib_1 = __webpack_require__(4);
const path = tslib_1.__importStar(__webpack_require__(9));
const node_url_1 = __webpack_require__(10);
globalThis['__dirname'] = path.dirname((0, node_url_1.fileURLToPath)("file:///home/maja/test-project/generated/prisma/client.ts"));
const $Class = tslib_1.__importStar(__webpack_require__(11));
const Prisma = tslib_1.__importStar(__webpack_require__(16));
exports.Prisma = Prisma;
exports.$Enums = tslib_1.__importStar(__webpack_require__(17));
tslib_1.__exportStar(__webpack_require__(17), exports);
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
exports.PrismaClient = $Class.getPrismaClientClass();


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("node:url");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * Please import the `PrismaClient` class from the `client.ts` file instead.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPrismaClientClass = getPrismaClientClass;
const tslib_1 = __webpack_require__(4);
const runtime = tslib_1.__importStar(__webpack_require__(12));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.5.0",
    "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Project {\n  id          Int      @id @default(autoincrement())\n  title       String\n  description String?\n  createdAt   DateTime @default(now())\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Project\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Project.findUnique\",\"Project.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Project.findFirst\",\"Project.findFirstOrThrow\",\"Project.findMany\",\"data\",\"Project.createOne\",\"Project.createMany\",\"Project.createManyAndReturn\",\"Project.updateOne\",\"Project.updateMany\",\"Project.updateManyAndReturn\",\"create\",\"update\",\"Project.upsertOne\",\"Project.deleteOne\",\"Project.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Project.groupBy\",\"Project.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"title\",\"description\",\"createdAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "NwsQBxwAACkAMB0AAAQAEB4AACkAMB8CAAAAASABACsAISEBACwAISJAAC0AIQEAAAABACABAAAAAQAgBxwAACkAMB0AAAQAEB4AACkAMB8CACoAISABACsAISEBACwAISJAAC0AIQEhAAAuACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAEHwIAAAABIAEAAAABIQEAAAABIkAAAAABAQgAAAkAIAQfAgAAAAEgAQAAAAEhAQAAAAEiQAAAAAEBCAAACwAwAQgAAAsAMAQfAgA3ACEgAQA0ACEhAQA1ACEiQAA2ACECAAAAAQAgCAAADgAgBB8CADcAISABADQAISEBADUAISJAADYAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBhUAAC8AIBYAADAAIBcAADMAIBgAADIAIBkAADEAICEAAC4AIAccAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhAQAdACEiQAAeACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAccAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhAQAdACEiQAAeACENFQAAIAAgFgAAKAAgFwAAIAAgGAAAIAAgGQAAIAAgIwIAAAABJAIAAAAEJQIAAAAEJgIAAAABJwIAAAABKAIAAAABKQIAAAABKgIAJwAhDhUAACAAIBgAACYAIBkAACYAICMBAAAAASQBAAAABCUBAAAABCYBAAAAAScBAAAAASgBAAAAASkBAAAAASoBACUAISsBAAAAASwBAAAAAS0BAAAAAQ4VAAAjACAYAAAkACAZAAAkACAjAQAAAAEkAQAAAAUlAQAAAAUmAQAAAAEnAQAAAAEoAQAAAAEpAQAAAAEqAQAiACErAQAAAAEsAQAAAAEtAQAAAAELFQAAIAAgGAAAIQAgGQAAIQAgI0AAAAABJEAAAAAEJUAAAAAEJkAAAAABJ0AAAAABKEAAAAABKUAAAAABKkAAHwAhCxUAACAAIBgAACEAIBkAACEAICNAAAAAASRAAAAABCVAAAAABCZAAAAAASdAAAAAAShAAAAAASlAAAAAASpAAB8AIQgjAgAAAAEkAgAAAAQlAgAAAAQmAgAAAAEnAgAAAAEoAgAAAAEpAgAAAAEqAgAgACEII0AAAAABJEAAAAAEJUAAAAAEJkAAAAABJ0AAAAABKEAAAAABKUAAAAABKkAAIQAhDhUAACMAIBgAACQAIBkAACQAICMBAAAAASQBAAAABSUBAAAABSYBAAAAAScBAAAAASgBAAAAASkBAAAAASoBACIAISsBAAAAASwBAAAAAS0BAAAAAQgjAgAAAAEkAgAAAAUlAgAAAAUmAgAAAAEnAgAAAAEoAgAAAAEpAgAAAAEqAgAjACELIwEAAAABJAEAAAAFJQEAAAAFJgEAAAABJwEAAAABKAEAAAABKQEAAAABKgEAJAAhKwEAAAABLAEAAAABLQEAAAABDhUAACAAIBgAACYAIBkAACYAICMBAAAAASQBAAAABCUBAAAABCYBAAAAAScBAAAAASgBAAAAASkBAAAAASoBACUAISsBAAAAASwBAAAAAS0BAAAAAQsjAQAAAAEkAQAAAAQlAQAAAAQmAQAAAAEnAQAAAAEoAQAAAAEpAQAAAAEqAQAmACErAQAAAAEsAQAAAAEtAQAAAAENFQAAIAAgFgAAKAAgFwAAIAAgGAAAIAAgGQAAIAAgIwIAAAABJAIAAAAEJQIAAAAEJgIAAAABJwIAAAABKAIAAAABKQIAAAABKgIAJwAhCCMIAAAAASQIAAAABCUIAAAABCYIAAAAAScIAAAAASgIAAAAASkIAAAAASoIACgAIQccAAApADAdAAAEABAeAAApADAfAgAqACEgAQArACEhAQAsACEiQAAtACEIIwIAAAABJAIAAAAEJQIAAAAEJgIAAAABJwIAAAABKAIAAAABKQIAAAABKgIAIAAhCyMBAAAAASQBAAAABCUBAAAABCYBAAAAAScBAAAAASgBAAAAASkBAAAAASoBACYAISsBAAAAASwBAAAAAS0BAAAAAQsjAQAAAAEkAQAAAAUlAQAAAAUmAQAAAAEnAQAAAAEoAQAAAAEpAQAAAAEqAQAkACErAQAAAAEsAQAAAAEtAQAAAAEII0AAAAABJEAAAAAEJUAAAAAEJkAAAAABJ0AAAAABKEAAAAABKUAAAAABKkAAIQAhAAAAAAAAAS4BAAAAAQEuAQAAAAEBLkAAAAABBS4CAAAAAS8CAAAAATACAAAAATECAAAAATICAAAAAQAAAAAFFQAGFgAHFwAIGAAJGQAKAAAAAAAFFQAGFgAHFwAIGAAJGQAKAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGhgFGxkL"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => tslib_1.__importStar(__webpack_require__(13)));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => tslib_1.__importStar(__webpack_require__(14))),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => tslib_1.__importStar(__webpack_require__(15)));
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/client");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * All exports from this file are wrapped under a `Prisma` namespace object in the client.ts file.
 * While this enables partial backward compatibility, it is not part of the stable public API.
 *
 * If you are looking for your Models, Enums, and Input Types, please import them from the respective
 * model files in the `model` directory!
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.ProjectScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const tslib_1 = __webpack_require__(4);
const runtime = tslib_1.__importStar(__webpack_require__(12));
/**
 * Prisma Errors
 */
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
/**
 * Decimal.js
 */
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
/**
 * Prisma Client JS version: 7.5.0
 * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
 */
exports.prismaVersion = {
    client: "7.5.0",
    engine: "280c870be64f457428992c43c1f6d557fab6e29e"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
exports.DbNull = runtime.DbNull;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
exports.JsonNull = runtime.JsonNull;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Project: 'Project'
};
/**
 * Enums
 */
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.ProjectScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
* This file exports all enum related types from the schema.
*
* 🟢 You can import this file directly.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("@prisma/adapter-pg");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(20), exports);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProjectDto = void 0;
class CreateProjectDto {
}
exports.CreateProjectDto = CreateProjectDto;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map