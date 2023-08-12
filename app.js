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

//---------------------Read from file test-------------------------------------

app.get("/read", (req, res) => {
    res.render("read", { title: "Read" });
    // const processor = require("./document_utilities/document_reader");
    // const word_result = processor.countWords();
    // res.render("read", {
    //     title: "Read",
    //     word_count: word_result,
    // });

    const corpusReader = require("./document_utilities/doc_reader");
    const word_result = corpusReader.scanDocs;
    const corpusDivider = require("./document_utilities/processDocs");

    // const corpusProcessor = require("./document_utilities/story_stemmer");
    // const corpus_result = corpusProcessor.processCorpus;
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
