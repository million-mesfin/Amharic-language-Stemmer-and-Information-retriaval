const fs = require("fs");
const util = require("util");
// const queryVector = require("./query_utilities/processQuery");
// queryVector.queryVector("አዲስ ዋልታ");

// const GetMatch = require("./getDocs");
// displayCorpus = JSON.parse(
//     fs.readFileSync("./doc_files/docSnippet.json", "utf-8")
// );

// setTimeout(() => {
//     // Get Matched Documents
//     matchedDocuments = [];
//     GetMatch().forEach((match) => {
//         matchedDocuments.push(displayCorpus[match[0]]);
//     });
//     // console.log(matchedDocuments.length);
//     const data = JSON.stringify(matchedDocuments, null, 2);
//     fs.writeFile("./doc_files/matchedDocuments.json", data, (err) => {
//         if (err) {
//             console.log("Error writing file", err);
//         } else {
//             console.log("Successfully wrote matchedDocuments to file");
//         }
//     });
// }, 2);

function searchDocuments(query) {
    const queryVector = require("./query_utilities/processQuery");
    queryVector.queryVector(query);

    const GetMatch = require("./getDocs");
    displayCorpus = JSON.parse(
        fs.readFileSync("./doc_files/scannedDocs.json", "utf-8")
    );

    // wait for the matchedDocument file to be written before reading it
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Get Matched Documents
            matchedDocuments = [];
            GetMatch().forEach((match) => {
                matchedDocuments.push(displayCorpus[match[0]]);
            });

            const writeFileAsync = util.promisify(fs.writeFile);
            const data = JSON.stringify(matchedDocuments, null, 2);
            writeFileAsync("./doc_files/matchedDocuments.json", data)
                .then(() => {
                    // console.log("Successfully wrote matchedDocuments to file");
                    resolve();
                })
                .catch((err) => {
                    console.log("Error writing file", err);
                    reject(err);
                });
        }, 2);
    });
}

exports.search_documents = function (query) {
    doc_list = searchDocuments(query);
    return doc_list;
};
