"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBoards = void 0;
const api_1 = require("../api/api");
const request_1 = __importDefault(require("../fetch/request"));
const parser_boards_1 = __importDefault(require("../parser/parser.boards"));
function searchBoards(query, bookmark) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!query)
            throw Error("No query specified");
        const params = {
            source_url: `/search/boards/?q=${query}&rs=content_type_filter`,
            data: {
                options: {
                    article: null,
                    applied_filters: null,
                    appliedProductFilters: "---",
                    auto_correction_disabled: false,
                    corpus: null,
                    customized_rerank_type: null,
                    filters: null,
                    query: query,
                    query_pin_sigs: null,
                    redux_normalize_feed: true,
                    rs: "content_type_filter",
                    scope: "boards",
                    source_id: null,
                    bookmarks: [bookmark],
                },
                context: {},
            },
        };
        const URL = `${api_1.Api.baseURL}/resource/BaseSearchResource/get/?source_url=${encodeURIComponent(params.source_url)}&data=${encodeURIComponent(JSON.stringify(params.data))}`;
        const data = yield request_1.default.get(URL);
        return (0, parser_boards_1.default)(data);
    });
}
exports.searchBoards = searchBoards;
