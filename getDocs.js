const fs = require("fs");
// Get Functional Corpus
displayCorpus = JSON.parse(
    fs.readFileSync("./doc_files/docSnippet.json", "utf-8")
);

const GetMatch = () => {
    query = JSON.parse(fs.readFileSync("./doc_files/query_TF.json", "utf-8"));

    // Read document TFIDF term map
    term_TFIDF = JSON.parse(
        fs.readFileSync("./doc_files/term_TFIDF.json", "utf-8")
    );

    term_list = JSON.parse(
        fs.readFileSync("./doc_files/term_TFIDF.json", "utf-8")
    );

    // Hold the list of all words
    wordList = Object.keys(term_list);

    // calculate document TFIDF
    TFIDF_ = {};
    for (let queryTerm in query) {
        TFIDF_[queryTerm] = {};
        TFIDF_[queryTerm] = term_TFIDF[queryTerm];

        // If the term is in our term map then calculate TFIDF of Query, else assign 0
        // if (TFIDF_[queryTerm]) {
        //     TFIDF_[queryTerm]["q"] =
        //         query[queryTerm]["q"] * term_list[queryTerm]["IDF"];
        // } else TFIDF_[queryTerm] = { q: 0 };

        /**
         * checks if TFIDF_[queryTerm] exists. If it does, it updates the q property of TFIDF_[queryTerm] with the product of query[queryTerm]["q"] and term_list[queryTerm]["IDF"]. If TFIDF_[queryTerm] does not exist, it sets TFIDF_[queryTerm] to { q: 0 }.
         */
        TFIDF_[queryTerm] = TFIDF_[queryTerm]
            ? {
                  ...TFIDF_[queryTerm],
                  q: query[queryTerm]["q"] * term_list[queryTerm]["IDF"],
              }
            : { q: 0 };
    }

    // Get count of total documents
    var testWord = Object.keys(term_list)[0];
    var documentCount = Object.keys(term_list[testWord]).length - 2;

    // calculate Dot Product
    // var dotProduct = {};
    // for (i = 0; i < documentCount; i++) {
    //     count = 0;
    //     for (term in TFIDF_) {
    //         count += (TFIDF_[term][i] || 0) * TFIDF_[term]["q"];
    //     }
    //     dotProduct[i] = count;
    // }

    var dotProduct = Array.from({ length: documentCount }, (_, i) => {
        return Object.keys(TFIDF_).reduce((count, term) => {
            return count + ((TFIDF_[term][i] || 0) * TFIDF_[term]["q"]);
        }, 0);
    });

    // Calculate Magnitude
    // var magnitudeMap = {};
    // for (i = 0; i < documentCount; i++) {
    //     magnitude = 0;
    //     for (term in TFIDF_) {
    //         magnitude += Math.pow(TFIDF_[term][i], 2);
    //     }

    //     magnitudeMap[i] = magnitude;
    // }

    var magnitudeMap = Array.from({ length: documentCount }, (_, i) => {
        return Object.keys(TFIDF_).reduce((magnitude, term) => {
            return magnitude + Math.pow(TFIDF_[term][i] || 0, 2);
        }, 0);
    });

    // calculate Query Magnitude
    magnitude = 0;
    for (term in TFIDF_) {
        magnitude = +Math.pow(TFIDF_[term]["q"], 2);
    }
    magnitudeMap["q"] = magnitude;

    // calculate Similarity Map
    // var similarityMap = [];
    // for (i = 0; i < documentCount; i++) {
    //     similarityMap[i] = [i, 0];
    //     if (dotProduct[i] > 0)
    //         similarityMap[i] = [
    //             i,
    //             dotProduct[i] /
    //                 Math.sqrt(magnitudeMap[i] * magnitudeMap["q"]),
    //         ];
    // }

    var similarityMap = Array.from({ length: documentCount }, (_, i) => {
        return dotProduct[i] > 0 
            ? [i, dotProduct[i] / Math.sqrt(magnitudeMap[i] * magnitudeMap["q"])]
            : [i, 0];
    });

    // Remove documents with cosine similarity score of 0
    similarityMap = similarityMap.filter((document) => document[1] > 0);

    // Sort documents by their cosine similarity score
similarityMap.sort((doc_id, score) => score[1] - doc_id[1]);
    return similarityMap;
};

module.exports = GetMatch;
