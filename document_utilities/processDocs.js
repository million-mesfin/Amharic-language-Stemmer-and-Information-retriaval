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
        snippet: content.split(" ").slice(0, 30).join(" ") + "...",
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

const stopWordRemover = require(path.join(__dirname, "../stopWordRemover"));

processingDoc = processingDoc.map((doc) => {
    return {
        ...doc,
        index: stopWordRemover.getProcessedCorpus(doc.index),
    };
}); 

// Write Display Corpus
fs.writeFileSync(
    path.join(__dirname, "../doc_files/docSnippet.json"),
    JSON.stringify(docSnippet),
    "utf8",
    (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Display snippet created and saved as docSnippet.json");
    }
);

// Write Functional Corpus
fs.writeFileSync(
    path.join(__dirname, "../doc_files/processingDoc.json"),
    JSON.stringify(processingDoc),
    "utf8",
    (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(
            "Processing document created and saved as processingDoc.json"
        );
    }
);
