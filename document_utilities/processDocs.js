const fs = require("fs");
const path = require("path");

const scannedDocs = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "../doc_files/scannedDocs.json"),
        "utf8"
    )
);

const docSnippet = scannedDocs.map(
    ({ doc_id, title, publisher, content, author, date }) => ({
        doc_id,
        title,
        publisher,
        snippet: content.split("።").slice(0, 2).join("።") + "...",
        author,
        date,
    })
);

var processingDoc = scannedDocs.map(({ doc_id, content, title }) => {
    return {
        doc_id,
        index: `${title} ${title} ${title} ${content}`,
    };
});

/*
// Stem the words
processingDoc = require(path.join(
    __dirname,
    "../stopWordRemover"
)).getProcessedCorpus(processingDoc.index);
// processingDoc = stemmeDoc(processingDoc.content);
*/

const stopWordRemover = require(path.join(__dirname, "../stopWordRemover"));

processingDoc = processingDoc.map(doc => {
    return {
        ...doc,
        index: stopWordRemover.getProcessedCorpus(doc.index)
    };
});

// Write Display Corpus
fs.writeFile(
    path.join(__dirname, "../doc_files/docSnippet.json"),
    JSON.stringify(docSnippet),
    "utf8",
    (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Display corpus generated");
    }
);

// Write Functional Corpus
fs.writeFile(
    path.join(__dirname, "../doc_files/processingDoc.json"),
    JSON.stringify(processingDoc),
    "utf8",
    (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Functional corpus generated");
    }
);
