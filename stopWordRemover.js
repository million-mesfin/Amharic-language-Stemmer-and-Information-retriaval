stop_word_list = [
    "ገልጽ",
    "ገልጸዋል",
    "ገለፅ",
    "ብል",
    "ሚገኝ",
    "መሆን",
    "ገለጸ",
    "ገለጻ",
    "በመሆኑ",
    "ለመሆኑ",
    "ከመሆኑ",
    "መሆኑ",
    "መሆ",
    "መሠረት",
    "ነበር",
    "ነበሩ",
    "ነበሯቸው",
    "ነበሩን",
    "ነበሯት",
    "ነበሩት",
    "ሌላ",
"ሌሎችም",
"ሌሎች",
    "ኧክል",
    "ሦስት",
    "ቤት",
    "ኃላፊ",
    "ሚችል",
    "ታግዷል",
    "የሚሆን",
    "ድርጅት",
    "አንድ",
    "የሚል",
    "በሚል",
    "ለሚል",
    "አብራሩ",
    "አብራርተዋል",
    "አብራራ",
    "አካባቢ",
    "አዲስ",
    "ሥለሚሆን",
    "ሥለዚህ",
    "አሁንም",
    "አሁን",
    "ሁሉ",
    "ሌላ",
    "ልክ",
    "ሥል",
    "ቀረ",
    "ብቻ",
    "ና",
    "እና",
    "አንድ",
    "እንደ",
    "እንዲሁም",
    "እንጂ",
    "ልቅ",
    "ራሥ",
    "አንቺ",
    "ርዕስ",
    "ራሥ",
    "እርሷ",
    "እሷ",
    "ራሷ",
    "ምንድን",
    "ማን",
    "ይህ",
    "ይህን",
    "ወደ",
    "እዚ",
    "እዚህ",
    "እዚያ",
    "ነኝ",
    "ነበር",
    "ነገር",
    "አለኝ",
    "አለ",
    "አሉ",
    "አለች",
    "ገለጸ",
    "ገለጸች",
    "ገለጹ",
    "ተናገረች",
    "ተናገረ",
    "ተናገሩ",
    "አክለው",
    "መኖር",
    "አደረግገ",
    "አድራጊ",
    "ፈጸመ",
    "አስፈጸመ",
    "አሰፈጻሚ",
    "አስታወቀ",
    "አሳውቀዋል",
    "አስታወቀች",
    "አስታወቁ",
    "አስታወቀዋል",
    "ተከናውነ",
    "ተካሀደ",
    "ተመረቀ",
    "አስተያየት",
    "አስመረቀ",
    "ብቻ",
    "ነህ",
    "አንዴት",
    "ማን",
    "ዝቅ",
    "ሀይል",
    "የሀይል",
    "በሀይል",
    "ድሮ",
    "ጊዜ",
    "ዛሬ",
    "ጥሩ",
    "አለፈ",
    "ውስጥ",
    "በጊዜ",
    "በጊዜው",
    "በዚህ",
    "በዚያ",
    "በዚያው",
    "ገልፅ",
    "መቼ",
    "እስከመቼ",
    "እስከመቼውም",
    "ይሆን",
    "መቼም",
    "መቼስ",
    "የለም",
    "እያለ",
    "አሉ",
    "ተባለ",
    "ተባለች",
    "የኔ",
    "የኛ",
    "የነሱ",
    "የናንተ",
    "እንደሆነ",
    "እስኪሆን",
    "አስተያየት",
    "አስተያየታቸውን",
    "ሰጡ",
    "ሰጠ",
    "ሰጥች",
    "ከየት",
    "ተቀብለው",
    "አናገሩ",
    "አናገረ",
    "አናገረች",
    "ብለዋል",
    "ተብሏል",
    "አሉ",
    "ሲሉ",
    "እያለ",
    "እብዛኛው",
    "እብዛኞቹ",
    "ምን",
    "ምነው",
    "ነው",
    "ይኸውም",
    "ይህም",
    "ያውቅዋል",
    "ያውቁታል",
    "አቶ",
    "ወሮ",
    "ወሪት",
    "ነገርግን",
    "ግን",
    "ይሆናል",
    "ሲሆን",
    "እየሆነ",
    "ቢሆንም",
    "ቢሆን",
    "ሆኖም",
    "ሆነ",
    "ወይም",
    "ካልሆነ",
    "ካልሆነም",
    "ሳየሆን",
    "አይ",
    "ታድያ",
    "ይልቅ",
    "ይልቁን",
    "ይልቁንም",
    "ጋር",
    "እዚያ",
    "መሥራት",
    "ግን",
    "ወይ",
    "ምክንያቱም",
    "መካከል",
    "እኩል",
    "ወቅት",
    "ኋላ",
    "ላይ",
"በላይ",
    "ረድቷል",
    "ጠፍቷል",
    "ተጨማሪ",
    "እንዴት",
    "ሁሉ",
    "ማነች",
    "ሁለቱ",
    "ያንዳንድ",
    "ተመሣሣይ",
    "ችሏል",
    "በቃ",
    "አበቃ",
];

common_amh_abbreviations = {
    ትቤት: "ትምህርትቤት",
    ትት: "ትምህርት",
    ሃአለቃ: "ሃምሳአለቃ",
    ሃስላሴ: "ሃይለስላሴ",
    ደዘይት: "ደብረዘይት",
    ደታቦር: "ደብረታቦር",
    መር: "መምህር",
    መቤት: "መስሪያቤት",
    መአለቃ: "መቶአለቃ",
    ክከተማ: "ክፍለከተማ",
    ክሀገር: "ክፍለሀገር",
    ወሮ: "ወይዘሮ",
    ወሪት: "ወይዘሪት",
    ወስላሴ: "ወልደስላሴ",
    ፍስላሴ: "ፍቅረስላሴ",
    ፍቤት: "ፍርድቤት",
    ጽቤት: "ጽህፈትቤት",
    ሲር: "ሲስተር",
    ፕር: "ፕሮፌሰር",
    ጠሚንስትር: "ጠቅላይሚኒስተር",
    ዶር: "ዶክተር",
    ገገዮርጊስ: "",
    ቤክርስትያን: "ቤተክርስትያን",
    ምቤት: "ምክርቤተ",
    ተሃይማኖት: "ተክለሃይማኖት",
    ሚር: "ሚኒስትር",
    ኮል: "ኮሎኔል",
    ሜጀነራል: "ሜጀርጀነራል",
    ብጀነራል: "ብርጋደርጀነራል",
    ሌኮለኔል: "ሌተናንትኮለኔል",
    ሊመንበር: "ሊቀመንበር",
    አአ: "ኣዲስኣበባ",
    ርመምህር: "ርዕሰመምህር",
    ዓም: "ዓመተምህረት",
    ዓዓ: "ዓመተዓለም",
    እኤአ: "እንደአውሮፓውያአቆጣጠር",
};

const Multiwords = {
    "ስነ ልቦና": "ስነልቦና",
    "ስነ ምግባር": "ስነምግባር",
    "ስነ ስርአት": "ስነስርአት",
    "ስነ ዜጋ": "ስነዜጋ",
    "ስነ መለኮት": "ስነመለኮት",
    "ስነ አእምሮ": "ስነአእምሮ",
    "ኪነ ጥበብ": "ኪነጥበብ",
    "ክፍለ ከተማ": "ክፍለከተማ",
    "ክፍለ ጦር": "ክፍለጦር",
    "ክፍለ ሀገር": "ክፍለሀገር",
    "ክፍለ ዘመን": "ክፍለዘመን",
    "አዲስ አበበ": "አዲስአበበ",
    "አዲስ ከተማ": "አዲስከተማ",
    "ልብ ወለድ": "ልብወለድ",
    "ልብ ደካም": "ልብደካም",
    "አፈ ታሪክ ": "አፈታሪክ ",
    "ኣፈ ጉባኤ": "ኣፈጉባኤ",
    "ህገ መንግስት": "ህገመንግስት",
};

// Parameters
const firstWordsofMultiWords = [
    "ስነ",
    "ኪነ",
    "ክፍለ",
    "አዲስ",
    "ልብ",
    "አፈ",
    "ኣፈ",
    "ህገ",
];
const specialCharacters = new RegExp("[“…=,.+/<>’—”–!?()|:፡።‹›፣፤-]", "g");
const consequetiveSpaces = new RegExp("\\s+", "g");
const englishWords = new RegExp("[a-zA-Z]+", "g");
const nonDateNumbers = new RegExp(
    "(?<!\\bዓ\\.ም\\s*)\\b(?!\\d{1,2}\\/\\d{1,2}(\\/\\d{2,4})?\\b)\\S*\\d+\\S*",
    "g"
);

function removeStopWords(query) {
    query = query.replace(specialCharacters, " "); // Remove signs

    query = query.replace(englishWords, ""); // Remove english words

    query = query.replace(consequetiveSpaces, " "); // Remove multiple spaces

    query = query.replace(nonDateNumbers, ""); // Remove numbers except date

    wordList = query.split(" ");

    // Replace multi-words
    wordList = wordList.map((word, index) => {
        if (index === 0) {
            return word;
        }
        if (Multiwords[`${wordList[index - 1]} ${wordList[index]}`]) {
            return Multiwords[`${wordList[index - 1]} ${wordList[index]}`];
        }
        return word;
    });
    wordList = wordList.filter(
        (word) => !firstWordsofMultiWords.includes(word)
    );

    // Spread abbreviations
    wordList = wordList.map((word, index) => {
        if (index === 0) {
            return word;
        }
        if (
            common_amh_abbreviations[`${wordList[index - 1]}${wordList[index]}`]
        ) {
            const rep =
                common_amh_abbreviations[
                    `${wordList[index - 1]}${wordList[index]}`
                ];
            wordList[index - 1] = "";
            return rep;
        }
        return word;
    });

    // Remove stop words and single characters

    wordList = wordList.filter(
        (word) => !stop_word_list.includes(word) && word.length > 1
    );

    const stemmer = require("./stemmer");
    stemmedWordList = [];
    for (word of wordList) stemmedWordList.push(stemmer.stem(word));

    return stemmedWordList;
}

// Get the result of the selected query
exports.getProcessedQuery = function (query) {
    stemmedList = removeStopWords(query);
    return stemmedList;
};

exports.getProcessedCorpus = function (corpus) {
    stemmedList = removeStopWords(corpus);
    return stemmedList;
};

// Test function for removeStopWords function

// const query = "አበበ በሶ   በላ። and 3 times ጫላ-ጩቤ ጨበጠ 1900ዓ.ም ት/ቤት ስነ-ምግባር";
// console.log(removeStopWords(query));
