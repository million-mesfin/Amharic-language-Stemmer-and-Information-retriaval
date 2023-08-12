const fs = require("fs");

processingDoc = JSON.parse(
    fs.readFileSync("./doc_files/processingDoc.json", "utf-8")
);

const allTerms = processingDoc.flatMap((doc) => doc.index);

var uniqueTerms = new Set(allTerms);

// TF normalized by length
var termFrequency = {};     // Hold terms with IDF and TFIDF
uniqueTerms.forEach((term) => {
    //create term property
    termFrequency[term] = {};
    // count the number of occurences for a term and divide by document length
    processingDoc.forEach((doc, index) => {
        termFrequency[term][index] =
            // Divide the number of terms that occurred in the document with the lenght of the document
            doc.index.filter((indexWord) => indexWord == term).length /
            doc.index.length;
    });
});

// TF normalized by frequency

// Calculate DF and IDF for each word in the word map
var documentCount = processingDoc.length;
Object.keys(termFrequency).forEach((term) => {
    let count = 0;
    processingDoc.forEach((_, i) => {
        if (termFrequency[term][i] > 0) count++;
    });
    termFrequency[term]["dk"] = count;
    termFrequency[term]["IDF"] = Math.log2(
        documentCount / termFrequency[term]["dk"]
    );

    // Multiply the TF value of each term with the calculated IDF of each term
    processingDoc.forEach((_, i) => {
        termFrequency[term][i] *= termFrequency[term]["IDF"];
    });
});

fs.writeFile(
"./doc_files/term_TFIDF.json",
    JSON.stringify(termFrequency, null, 2),
    "utf8",
    (err) => {
        if (err) {
            console.error(err);
            return;
        }
console.log("Term TF-IDF calculated and saved to term_TFIDF.json");
    }
);
