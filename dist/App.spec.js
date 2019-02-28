"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = __importStar(require("supertest"));
const App_1 = __importDefault(require("./App"));
describe('App', () => {
    it('works', () => supertest(App_1.default)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200));
});
//# sourceMappingURL=App.spec.js.map