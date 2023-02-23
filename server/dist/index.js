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
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("./routes/auth-router");
const analytics_router_1 = require("./routes/analytics-router");
const category_router_1 = require("./routes/category-router");
const order_router_1 = require("./routes/order-router");
const position_router_1 = require("./routes/position-router");
const app = (0, express_1.default)();
const port = 5000;
app.get("/", (req, res) => {
    const helloMessage = "Afs-service works!";
    res.status(200).send(helloMessage);
});
app.use("/auth", auth_router_1.authRouter);
app.use("/analytics", analytics_router_1.analyticsRouter);
app.use("/category", category_router_1.categoryRouter);
app.use("/order", order_router_1.orderRouter);
app.use("/position", position_router_1.positionRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    // await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
