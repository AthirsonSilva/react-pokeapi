"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Card_1 = __importDefault(require("./Card"));
const Pokeinfo_1 = __importDefault(require("./Pokeinfo"));
const Main = () => {
    const [pokedata, setPokedata] = react_1.default.useState([]);
    const [loading, setLoading] = react_1.default.useState(true);
    const [url, setUrl] = react_1.default.useState('https://pokeapi.co/api/v2/pokemon/');
    const [nextUrl, setNextUrl] = react_1.default.useState('');
    const [previousUrl, setPreviousUrl] = react_1.default.useState('');
    const [pokeDex, setPokeDex] = react_1.default.useState([]);
    const fetchPokemons = async () => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
            setNextUrl(data.next);
            setPreviousUrl(data.previous);
            getPokemon(data.results);
            setLoading(false);
        });
    };
    const getPokemon = async (data) => {
        data.map(async (item) => {
            const result = await fetch(item.url);
            const pokemon = await result.json();
            setPokedata((pokedata) => {
                pokedata = [...pokedata, pokemon];
                pokedata.sort((a, b) => (a.id - b.id ? 1 : -1));
                // remove duplicates
                const unique = pokedata.filter((item, index) => {
                    return (pokedata.findIndex((item2) => item2.id === item.id) === index);
                });
                return unique;
            });
        });
    };
    react_1.default.useEffect(() => {
        fetchPokemons();
    }, [url]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'container' },
            react_1.default.createElement("div", { className: 'left-content' },
                react_1.default.createElement(Card_1.default, { pokemon: pokedata, loading: loading, infoPokemon: (pokemon) => setPokeDex(pokemon) }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("div", { className: 'btn-group' },
                    previousUrl && (react_1.default.createElement("button", { onClick: () => {
                            setPokedata([]);
                            setUrl(previousUrl);
                        } }, "Previous")),
                    nextUrl && (react_1.default.createElement("button", { onClick: () => {
                            setPokedata([]);
                            setUrl(nextUrl);
                        } }, "Next")))),
            react_1.default.createElement("div", { className: 'right-content' },
                react_1.default.createElement(Pokeinfo_1.default, { data: pokeDex })))));
};
exports.default = Main;
//# sourceMappingURL=Main.js.map