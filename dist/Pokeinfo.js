"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Pokeinfo = ({ data }) => {
    console.log(data);
    return (react_1.default.createElement(react_1.default.Fragment, null, data.length === 0 ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h5", null, "Click on a pokemon to see more info"))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, data.name),
        react_1.default.createElement("img", { src: data.sprites.front_default, alt: 'pokemon' }),
        react_1.default.createElement("div", { className: 'abilities' }, data.abilities.map((item) => {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: 'group' },
                    react_1.default.createElement("h3", null, item.ability.name))));
        })),
        react_1.default.createElement("div", { className: 'base-stat' }, data.stats.map((item) => {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: 'group' },
                    react_1.default.createElement("h3", null,
                        item.stat.name,
                        ": ",
                        item.base_stat))));
        }))))));
};
exports.default = Pokeinfo;
//# sourceMappingURL=Pokeinfo.js.map