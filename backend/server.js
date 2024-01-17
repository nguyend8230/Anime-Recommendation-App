require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const anime_routes = require("./routes/anime_routes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/api", anime_routes);

mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected to db and app is listening");    
        });
    })
    .catch((error) => {
        console.log(error);
    });

    