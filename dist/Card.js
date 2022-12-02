"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Card = ({ pokemon, loading, infoPokemon }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null, loading ? (react_1.default.createElement("h1", null, "Loading...")) : (pokemon.map((item) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: 'card', key: item.id, onClick: () => infoPokemon(item) },
                react_1.default.createElement("h2", null, item.id),
                react_1.default.createElement("img", { src: item.sprites.front_default, alt: 'pokemon' }),
                react_1.default.createElement("h3", null, item.species.name))));
    }))));
};
exports.default = Card;
//# sourceMappingURL=Card.js.map