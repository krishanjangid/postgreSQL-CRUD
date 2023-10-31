import express from "express";
import bodyParser from "body-parser";
import db from "./queries.js";
import router from "./routes.js";


const app =  express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });

app.get("/", (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
    }
);

app.use("/api/v1", router);

app.use("*", (req, res) => {
    res.status(404).send('<h1>Access Denied!!</h1>');
    }
);
