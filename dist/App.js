"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_json_1 = __importDefault(require("./location.json"));
const request_promise_native_1 = __importDefault(require("request-promise-native"));
require("isomorphic-fetch");
const geo_tz_1 = __importDefault(require("geo-tz"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class App {
    constructor() {
        this.express = express_1.default();
        this.getAllLocation();
    }
    getAllLocation() {
        location_json_1.default.data.forEach(element => {
            this.getLongLat(element.Location, element.Zip);
        });
    }
    getLongLat(location, zip) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `http://www.mapquestapi.com/geocoding/v1/address?key=va3ysZGxwJfUKGxkqXqt7BA4jOZHA1DM&location=${location},${zip}`;
            let coords = yield fetch(url).then((response) => response.json());
            coords = coords.results[0].locations[0].latLng;
            this.lat = parseFloat(coords.lat);
            this.long = parseFloat(coords.lng);
            let weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&units=imperial&APPID=408ffed288f8e91bea28487e9922399b`;
            let timeZoneByLocation = geo_tz_1.default(this.lat, this.long)[0];
            let currentTime = moment_timezone_1.default().tz(timeZoneByLocation).format('ha z');
            this.locationToWeather(weatherURL, currentTime);
        });
    }
    locationToWeather(url, currentTime) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield request_promise_native_1.default.get(url);
            result = JSON.parse(result);
            let wetherResult = Object.assign({}, result, { currentTime });
            console.log(wetherResult);
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map