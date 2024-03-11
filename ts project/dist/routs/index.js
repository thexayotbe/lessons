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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plantsschema_1 = require("../shemas/plantsschema");
const router = (0, express_1.Router)();
function findType(type) {
    if (type == "gardening")
        return plantsschema_1.GardeningModel;
    else if (type == "domestic")
        return plantsschema_1.DomesticModel;
    else if (type == "homepot")
        return plantsschema_1.HomepotModel;
}
router.get("/flower/:type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modal = findType(req.params.type);
        return res.status(200).json({
            message: "success",
            data: yield modal.find(),
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong",
        });
    }
}));
router.post("/flower/:type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, title, description, type } = req.body;
    try {
        const model = findType(req.params.type);
        yield model.create({
            image,
            title,
            description,
            type,
        });
        return res.status(201).json({
            message: "success",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong",
        });
    }
}));
router.delete("/flower/:type/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        const model = findType(req.params.type);
        yield model.deleteOne({ _id });
        return res.status(201).json({
            message: "success",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong",
        });
    }
}));
// PUT route to update a plant
router.put("/flower/:type/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const data = req.body;
    try {
        const model = findType(req.params.type);
        yield model.replaceOne({ _id }, Object.assign({}, data));
        return res.status(201).json({
            message: "success",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong",
        });
    }
}));
exports.default = router;
