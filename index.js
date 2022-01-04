const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const body_parser = require("body-parser");
const app = express();
const routes = require("./routes/index");
const dotenv = require("dotenv");
const hbs = require("hbs");
const path = require("path");
const static_path = path.join(__dirname, "./public");
const partials_path = path.join(__dirname, "./templates/partials");
const views_path = path.join(__dirname, "./templates/views");

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(body_parser.json());
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);
app.use("/", routes);

mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        console.log("connected to database");
    })
    .catch((e) => {
        console.log(e.messege);
    });

app.listen(port, () => {
    console.log(`Listning to port ${port}`);
});
