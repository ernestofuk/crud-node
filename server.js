const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./app/models");

const app = express();

var corsOptions = {
    origin: "http://127.0.0.1:9080"
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome lrk test Hello World" });
});

const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database");
})
.catch(err => {
    console.log("Cannot connect to the database", err);
});

