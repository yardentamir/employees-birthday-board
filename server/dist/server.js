"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing required modules
const express_1 = __importDefault(require("express"));
// Creating an Express application
const app = (0, express_1.default)();
const port = 8080; // You can change this to any port you prefer
// Define a route for the homepage
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
