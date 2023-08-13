const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");

const app = express();

// Register view engine
app.set("view engine", "ejs");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

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

//---------------------Calculate term weight test-------------------------------------

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

//---------------------Find matching documents-------------------------------------

app.get("/find", (req, res) => {
    res.render("read", { title: "Read" });
    const find = require("./search");
});

//---------------------Landing page-------------------------------------

app.get("/search", (req, res) => {
    res.render("search", { title: "search" });
});

//---------------------Results page-------------------------------------

app.post("/result", urlencodedParser, (req, res) => {
    // Get query from the body
    const query = req.body.query;
    const processor = require("./search").search_documents(query);

    processor.then(() => {
        fs.readFile("doc_files/matchedDocuments.json", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send(
                    "An error occurred while reading the file."
                );
                return;
            }

            let documentsList;
            try {
                documentsList = JSON.parse(data);
            } catch (err) {
                console.error(err);
                res.status(500).send(
                    "An error occurred while parsing the JSON data."
                );
                return;
            }

            res.render("results", { documents: documentsList });
        });
    });

    // res.render("results", { title: "results" });
});

//------------------Open Document-------------------------------------

app.get("/openDoc", urlencodedParser, (req, res) => {
    // console.log(value);
    const docID = req.query.value;

    fs.readFile("doc_files/scannedDocs.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred while reading the file.");
            return;
        }

        let documentsList;
        try {
            documentsList = JSON.parse(data);
        } catch (err) {
            console.error(err);
            res.status(500).send(
                "An error occurred while parsing the JSON data."
            );
            return;
        }

        res.render("docViewer", { document: documentsList[docID] });
    });
});

//------------------Admin Panel Controls------------------------------

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
