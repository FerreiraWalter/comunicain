"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const externalApiController_1 = require("../controllers/externalApiController");
const router = (0, express_1.Router)();
router.get('/data', externalApiController_1.getExternalApiData);
exports.default = router;
