const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");
const readline = require("readline");

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

    // let dictionary = {};

    // // create a read stream from the text file
    // const readStream = readline.createInterface({
    //     input: fs.createReadStream("./support docs/amhData.txt"),
    //     output: process.stdout,
    //     terminal: false,
    // });

    // // listen for 'line' event
    // readStream.on("line", function (line) {
    //     let words = line.split(/\s+/);
    //     let key = words[1].replace(/"/g, ""); // remove double quotes
    //     let value = words[0].replace(/"/g, ""); // remove double quotes
    //     dictionary[key] = value;
    // });

    // //listening to close event
    // readStream.on("close", function () {
    //     let stemTermsData = JSON.stringify(dictionary, null, 4);
    //     fs.writeFile("./support docs/stemTable.json", stemTermsData, (err) => {
    //         if (err) throw err;
    //         console.log("Data written to stemTable.json");
    //     });
    // });
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

//---------------------Find matching documents (test code)-------------------------------------

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

            res.render("results", { documents: documentsList, query: query });
        });
    });
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
