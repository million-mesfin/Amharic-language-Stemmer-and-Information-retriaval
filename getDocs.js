const fs = require("fs");
// Get Functional Corpus
displayCorpus = JSON.parse(
    fs.readFileSync("./doc_files/docSnippet.json", "utf-8")
);

const GetMatch = () => {
    query = JSON.parse(fs.readFileSync("./doc_files/query_TF.json", "utf-8"));

    // Read document TFIDF word map
    wordMapTFIDF = JSON.parse(
        fs.readFileSync("./doc_files/term_TFIDF.json", "utf-8")
    );

    // Read document word map
    wordMap = JSON.parse(
        fs.readFileSync("./doc_files/term_TFIDF.json", "utf-8")
    );

    // Get list of the words in our word map
    wordList = Object.keys(wordMap);

    // Generate TFIDF for all the documents and query
    TFIDFMap = {};
    for (let queryWord in query) {
        TFIDFMap[queryWord] = {};
        TFIDFMap[queryWord] = wordMapTFIDF[queryWord];
        // If the word is in our word map then calculate TFIDF of Query, else assign 0
        if (TFIDFMap[queryWord]) {
            TFIDFMap[queryWord]["q"] =
                query[queryWord]["q"] * wordMap[queryWord]["IDF"];
        } else TFIDFMap[queryWord] = { q: 0 };
    }

    // Get count of total documents
    var sampleWord = Object.keys(wordMap)[0];
    var documentCount = Object.keys(wordMap[sampleWord]).length - 2;

    // Get Dot Product
    var dotProductMap = {};
    for (i = 0; i < documentCount; i++) {
        count = 0;
        for (word in TFIDFMap) {
            count += (TFIDFMap[word][i] || 0) * TFIDFMap[word]["q"];
        }
        dotProductMap[i] = count;
    }

    // Get Magnitude
    var magnitudeMap = {};
    for (i = 0; i < documentCount; i++) {
        magnitude = 0;
        for (word in TFIDFMap) {
            magnitude += Math.pow(TFIDFMap[word][i], 2);
        }

        magnitudeMap[i] = magnitude;
    }
    // Get magnitude for Query
    magnitude = 0;
    for (word in TFIDFMap) {
        magnitude = +Math.pow(TFIDFMap[word]["q"], 2);
    }
    magnitudeMap["q"] = magnitude;

    // Get Similarity Map
    var similarityMap = [];
    for (i = 0; i < documentCount; i++) {
        similarityMap[i] = [i, 0];
        if (dotProductMap[i] > 0)
            similarityMap[i] = [
                i,
                dotProductMap[i] /
                    Math.sqrt(magnitudeMap[i] * magnitudeMap["q"]),
            ];
    }

    // Remove documents with cosine similarity score of 0
    similarityMap = similarityMap.filter((document) => document[1] > 0);

    // Sort documents by their cosine similarity score
    similarityMap.sort((a, b) => b[1] - a[1]);
    // console.log(similarityMap);
    // console.log(typeof(similarityMap))
    return similarityMap;
};

module.exports = GetMatch;
// exports.getMatchedDocs = function () {
//     doc_list = GetMatch();
//     return doc_list;
// };
