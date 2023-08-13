const fs = require("fs");

const queryVector = require("./query_utilities/processQuery");
queryVector.queryVector("ጠቅላይ መምሪያ ዕዝ");
const GetMatch = require("./getDocs");
displayCorpus = JSON.parse(
    fs.readFileSync("./doc_files/docSnippet.json", "utf-8")
);

setTimeout(() => {
    // Get Matched Documents
    matchedDocuments = [];
    GetMatch().forEach((match) => {
        matchedDocuments.push(displayCorpus[match[0]]);
    });
    // console.log(matchedDocuments.length);
    const data = JSON.stringify(matchedDocuments, null, 2);
fs.writeFile("./doc_files/matchedDocuments.json", data, (err) => {
        if (err) {
            console.log("Error writing file", err);
        } else {
            console.log("Successfully wrote matchedDocuments to file");
        }
    });
}, 2);
