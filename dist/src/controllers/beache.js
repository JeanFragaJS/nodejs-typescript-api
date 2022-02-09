"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeachesController = void 0;
const core_1 = require("@overnightjs/core");
const beach_1 = require("@src/models/beach");
const mongoose_1 = __importDefault(require("mongoose"));
let BeachesController = class BeachesController {
    async create(req, res) {
        try {
            const beach = new beach_1.Beach(req.body);
            const result = await beach.save();
            res.status(201).send(result);
        }
        catch (error) {
            if (error instanceof mongoose_1.default.Error.ValidationError) {
                res.status(422).send({ error: error.message });
            }
            else {
                res.status(500).send({ error: error.message });
            }
        }
    }
};
__decorate([
    (0, core_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BeachesController.prototype, "create", null);
BeachesController = __decorate([
    (0, core_1.Controller)('beaches')
], BeachesController);
exports.BeachesController = BeachesController;
//# sourceMappingURL=beache.js.map