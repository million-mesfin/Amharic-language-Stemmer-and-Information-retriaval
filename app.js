const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");

const app = express();

// Register view engine
app.set("view engine", "ejs");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Listen at port 3000
app.listen(3000);

// middleware and static files
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { title: "Stemmer" });
});

//---------------------Stemmer Demo--------------------------------------
app.post("/stemmer", urlencodedParser, (req, res) => {
    const query = req.body.query;

    const processor = require("./stopWordRemover");
    const result = processor.getProcessedQuery(query);

    res.render("index", {
        title: "Home",
        query: query,
        stems: result,
    });
});

//---------------------Read documents-------------------------------------

app.get("/read", (req, res) => {
    res.render("read", { title: "Read" });

    const corpusReader = require("./document_utilities/doc_reader");
    const word_result = corpusReader.scanDocs;
    const corpusDivider = require("./document_utilities/processDocs");
});

//---------------------Calculate term weight-------------------------------------

app.get("/weight", (req, res) => {
    res.render("read", { title: "Read" });
    console.log("loading");
    const weighting = require("./document_utilities/weightTerms");
});

//---------------------Query processing test-------------------------------------

app.get("/query", (req, res) => {
    res.render("read", { title: "Read" });
    const weighting = require("./query_utilities/processQuery");
    weighting.queryVector("ኢትዮጵያ እና ፓኪስታን");
});

//---------------------Find test-------------------------------------

app.get("/find", (req, res) => {
    res.render("read", { title: "Read" });
const find = require("./find");
});

//------------------Admin Panel Controls----------------------------------------

app.get("/admin", (req, res) => {
    res.render("admin", { title: "Admin" });
});

app.post("/admin-form", urlencodedParser, (req, res) => {
    res.render("admin", { title: "Admin" });
    console.log(req.body.deleteStemmedDocs);
    var deleteStemmedDocs = req.body.deleteStemmedDocs.value;
    const deleteScannedDocs = req.body.deleteScannedDocs;
    const processDocs = req.body.processDocs;

    if (deleteStemmedDocs == 1) {
        console.log("here");
        const path = path.join(
            __dirname,
            "./document_utilities/stemmed_stories.json"
        );
        fs.unlink(path, (err) => {
            console.log("here");
            if (err) {
                console.log(err);
                return;
            }
            console.log("File deleted");
        });
    }
    if (deleteScannedDocs == 2) {
    }
    if (processDocs == 3) {
    }
});

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
