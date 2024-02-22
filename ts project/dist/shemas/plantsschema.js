"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepotModel = exports.DomesticModel = exports.GardeningModel = void 0;
const mongoose_1 = require("mongoose");
const plantsModuleSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["gardening", "domestic", "homepot"],
    },
});
exports.GardeningModel = (0, mongoose_1.model)("Gardening", plantsModuleSchema);
exports.DomesticModel = (0, mongoose_1.model)("Domestic", plantsModuleSchema);
exports.HomepotModel = (0, mongoose_1.model)("Homepot", plantsModuleSchema);
