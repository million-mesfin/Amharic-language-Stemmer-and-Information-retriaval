const fs = require("fs");

const processor = require("../stopWordRemover").getProcessedQuery;

const getQueryVector = (query) => {
    // Process query
    query = processor(query);
    // Get unique words
    var unique_queryTerms = [...new Set(query)];

    // TF normalized by length
    var len = query.length;
    var query_weight = {}; // Holds query terms with their weights
    for (let term of unique_queryTerms) {
        let count = 0;
        for (let word of unique_queryTerms) {
            if (word === term) {
                count++;
            }
        }
        query_weight[term] = {};
        query_weight[term]["q"] = count / len;
    }
    /*
    for (const term of unique_queryTerms) {
        const count = unique_queryTerms.filter(word => word === term).length;
        query_weight[term] = {
            q: count / unique_queryTerms.length
        };
    }
    unique_queryTerms.forEach((term) => {
        query_weight[term] = {};
        query_weight[term]["q"] =
        unique_queryTerms.reduce((count, word) => {
                if (word == term) count++;
                return count;
            }, 0) / len;
    });
    */
    // Save to query_TF.json
    fs.writeFileSync(
        "./doc_files/query_TF.json",
        JSON.stringify(query_weight, null, 2),
        "utf8",
        (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Query_TF created and saved");
        }
    );
};

exports.queryVector = function (query) {
    queryVector = getQueryVector(query);
    return queryVector;
};
