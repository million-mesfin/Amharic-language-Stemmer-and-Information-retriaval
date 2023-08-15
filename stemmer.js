const fs = require("fs");

var vowels = ["ኧ", "ኡ", "ኢ", "ኣ", "ኤ", "ኦ"];
const PhoneticDictionary = {
    ሀ: "ህኧ",
    ሁ: "ህኡ",
    ሂ: "ህኢ",
    ሃ: "ህኣ",
    ሄ: "ህኤ",
    ህ: "ህ",
    ሆ: "ህኦ",
    ለ: "ልኧ",
    ሉ: "ልኡ",
    ሊ: "ልኢ",
    ላ: "ልኣ",
    ሌ: "ልኤ",
    ል: "ል",
    ሎ: "ልኦ",
    ሐ: "ህኧ",
    ሑ: "ህኡ",
    ሒ: "ህኢ",
    ሓ: "ህኣ",
    ሔ: "ህኤ",
    ሕ: "ህ",
    ሖ: "ህኦ",
    መ: "ምኧ",
    ሙ: "ምኡ",
    ሚ: "ምኢ",
    ማ: "ምኣ",
    ሜ: "ምኤ",
    ም: "ም",
    ሞ: "ምኦ",
    ሠ: "ሥኧ",
    ሡ: "ሥኡ",
    ሢ: "ሥኢ",
    ሣ: "ሥኣ",
    ሤ: "ሥኤ",
    ሥ: "ሥ",
    ሦ: "ሥኦ",
    ረ: "ርኧ",
    ሩ: "ርኡ",
    ሪ: "ርኢ",
    ራ: "ርኣ",
    ሬ: "ርኤ",
    ር: "ር",
    ሮ: "ርኦ",
    ሰ: "ሥኧ",
    ሱ: "ሥኡ",
    ሲ: "ሥኢ",
    ሳ: "ሥኣ",
    ሴ: "ሥኤ",
    ስ: "ሥ",
    ሶ: "ሥኦ",
    ሸ: "ሽኧ",
    ሹ: "ሽኡ",
    ሺ: "ሽኢ",
    ሻ: "ሽኣ",
    ሼ: "ሽኤ",
    ሽ: "ሽ",
    ሾ: "ሽኦ",
    ቀ: "ቅኧ",
    ቁ: "ቅኡ",
    ቂ: "ቅኢ",
    ቃ: "ቅኣ",
    ቄ: "ቅኤ",
    ቅ: "ቅ",
    ቆ: "ቅኦ",
    በ: "ብኧ",
    ቡ: "ብኡ",
    ቢ: "ብኢ",
    ባ: "ብኣ",
    ቤ: "ብኤ",
    ብ: "ብ",
    ቦ: "ብኦ",
    ተ: "ትኧ",
    ቱ: "ትኡ",
    ቲ: "ትኢ",
    ታ: "ትኣ",
    ቴ: "ትኤ",
    ት: "ት",
    ቶ: "ትኦ",
    ቸ: "ችኧ",
    ቹ: "ችኡ",
    ቺ: "ችኢ",
    ቻ: "ችኣ",
    ቼ: "ችኤ",
    ች: "ች",
    ቾ: "ችኦ",
    ኅ: "ህኧ",
    ኁ: "ህኡ",
    ኂ: "ህኢ",
    ኃ: "ህኣ",
    ኄ: "ህኤ",
    ኅ: "ህ",
    ኆ: "ህኦ",
    ነ: "ንኧ",
    ኑ: "ንኡ",
    ኒ: "ንኢ",
    ና: "ንኣ",
    ኔ: "ንኤ",
    ን: "ን",
    ኖ: "ንኦ",
    ኘ: "ኝኧ",
    ኙ: "ኝኡ",
    ኚ: "ኝኢ",
    ኛ: "ኝኣ",
    ኜ: "ኝኤ",
    ኝ: "ኝ",
    ኞ: "ኝኦ",
    አ: "እኧ",
    ኡ: "እኡ",
    ኢ: "እኢ",
    ኣ: "እኣ",
    ኤ: "እኤ",
    እ: "እ",
    ኦ: "እኦ",
    ከ: "ክኧ",
    ኩ: "ክኡ",
    ኪ: "ክኢ",
    ካ: "ክኣ",
    ኬ: "ክኤ",
    ክ: "ክ",
    ኮ: "ክኦ",
    ኸ: "ኽኧ",
    ኹ: "ኽኡ",
    ኺ: "ኽኢ",
    ኻ: "ኽኣ",
    ኼ: "ኽኤ",
    ኽ: "ኽ",
    ኾ: "ኽኦ",
    ወ: "ውኧ",
    ው: "ውኡ",
    ዊ: "ውኢ",
    ዋ: "ውኣ",
    ዌ: "ውኤ",
    ው: "ው",
    ዎ: "ውኦ",
    ዐ: "እኧ",
    ዑ: "እኡ",
    ዒ: "እኢ",
    ዓ: "እኣ",
    ዔ: "እኤ",
    ዕ: "እ",
    ዖ: "እኦ",
    ዘ: "ዝኧ",
    ዙ: "ዝኡ",
    ዚ: "ዝኢ",
    ዛ: "ዝኣ",
    ዜ: "ዝኤ",
    ዝ: "ዝ",
    ዞ: "ዝኦ",
    ዠ: "ዥኧ",
    ዡ: "ዥኡ",
    ዢ: "ዥኢ",
    ዣ: "ዥኣ",
    ዤ: "ዥኤ",
    ዥ: "ዥ",
    ዦ: "ዥኦ",
    የ: "ይኧ",
    ዩ: "ይኡ",
    ዪ: "ይኢ",
    ያ: "ይኣ",
    ዬ: "ይኤ",
    ይ: "ይ",
    ዮ: "ይኦ",
    ደ: "ድኧ",
    ዱ: "ድኡ",
    ዲ: "ድኢ",
    ዳ: "ድኣ",
    ዴ: "ድኤ",
    ድ: "ድ",
    ዶ: "ድኦ",
    ጀ: "ጅኧ",
    ጁ: "ጅኡ",
    ጂ: "ጅኢ",
    ጃ: "ጅኣ",
    ጄ: "ጅኤ",
    ጅ: "ጅ",
    ጆ: "ጅኦ",
    ገ: "ግኧ",
    ጉ: "ግኡ",
    ጊ: "ግኢ",
    ጋ: "ግኣ",
    ጌ: "ግኤ",
    ግ: "ግ",
    ጎ: "ግኦ",
    ጠ: "ጥኧ",
    ጡ: "ጥኡ",
    ጢ: "ጥኢ",
    ጣ: "ጥኣ",
    ጤ: "ጥኤ",
    ጥ: "ጥ",
    ጦ: "ጥኦ",
    ጨ: "ጭኧ",
    ጩ: "ጭኡ",
    ጪ: "ጭኢ",
    ጫ: "ጭኣ",
    ጬ: "ጭኤ",
    ጭ: "ጭ",
    ጮ: "ጭኦ",
    ጰ: "ጵኧ",
    ጱ: "ጵኡ",
    ጲ: "ጵኢ",
    ጳ: "ጵኣ",
    ጴ: "ጵኤ",
    ጵ: "ጵ",
    ጶ: "ጵኦ",
    ጸ: "ፅኧ",
    ጹ: "ፅኡ",
    ጺ: "ፅኢ",
    ጻ: "ፅኣ",
    ጼ: "ፅኤ",
    ጽ: "ፅ",
    ጾ: "ፅኦ",
    ፀ: "ፅኧ",
    ፁ: "ፅኡ",
    ፂ: "ፅኢ",
    ፃ: "ፅኣ",
    ፄ: "ፅኤ",
    ፅ: "ፅ",
    ፆ: "ፅኦ",
    ፈ: "ፍኧ",
    ፉ: "ፍኡ",
    ፊ: "ፍኢ",
    ፋ: "ፍኣ",
    ፌ: "ፍኤ",
    ፍ: "ፍ",
    ፎ: "ፍኦ",
    ፐ: "ፕኧ",
    ፑ: "ፕኡ",
    ፒ: "ፕኢ",
    ፓ: "ፕኣ",
    ፔ: "ፕኤ",
    ፕ: "ፕ",
    ፖ: "ፕኦ",
    ቨ: "ቭኧ",
    ቩ: "ቭኡ",
    ቪ: "ቭኢ",
    ቫ: "ቭኣ",
    ቬ: "ቭኤ",
    ቭ: "ቭ",
    ቮ: "ቭኦ",

    // Additionals
    ቋ: "ቋ",
    ሯ: "ሯ",
    ቷ: "ቷ",
    ፗ: "ፗ",
    ሷ: "ሷ",
    ዷ: "ዷ",
    ፏ: "ፏ",
    ጓ: "ጓ",
    ኋ: "ኋ",
    ጇ: "ጇ",
    ኳ: "ኳ",
    ሏ: "ሏ",
    ዟ: "ዟ",
    ቿ: "ቿ",
    ሿ: "ሿ",
    ቧ: "ቧ",
    ኗ: "ኗ",
    ሟ: "ሟ",
    ጧ: "ጧ",
    ጿ: "ጿ",
    ጷ: "ጷ",
    ሧ: "ሧ",
    ዿ: "ዿ",
    ኵ: "ኵ",
    ሗ: "ሗ",
    ዃ: "ዃ",
    ዧ: "ዧ",
    ጯ: "ጯ",
    ቯ: "ቯ",
    ኟ: "ኟ",
};

const Suffix = [
    "ኢዕኧልኧሽ",
    "ኣውኢው",
    "ኣችኧውኣል",
    "ኧችኣት",
    "ኧችኣችህኡ",
    "ኧችኣችኧው",
    "ኣልኧህኡ",
    "ኣልኧህ",
    "ኣልኧሽ",
    "ኣልችህኡ",
    "ኣልኣልኧች",
    "ብኣችኧውስ",
    "ብኣችኧው",
    "ኣችኧውን",
    "ኣልኧች",
    "ኣልኧን",
    "ኣልኣችህኡ",
    "ኣችህኡን",
    "ኣችህኡ",
    "ኣችህኡት",
    "ውኦችንንኣ",
    "ውኦችን",
    "ኣችኧው",
    "ውኦችኡን",
    "ውኦችኡ",
    "ኧውንኣ",
    "ኦችኡን",
    "ኦውኦች",
    "ኧኝኣንኧትም",
    "ኧኝኣንኣ",
    "ኧኝኣንኧት",
    "ኧኝኣን",
    "ኧኝኣውም",
    "ኧኝኣው",
    "ብኧትን",
    "ኣችህኡም",
    "ኦውኣ",
    "ኧችው",
    "ኧችኡ",
    "ኤችኡ",
    "ንኧው",
    "ንኧት",
    "ኣልኡ",
    "ኣችን",
    "ክኡም",
    "ክኡት",
    "ክኧው",
    "ኧችን",
    "ኧችም",
    "ኧችህ",
    "ኧችሽ",
    "ኧችን",
    "ኧችው",
    "ይኡሽን",
    "ይኡሽ",
    "ኧውኢ",
    "ኦችንንኣ",
    "ኣውኢ",
    "ብኧት",
    "ኦች",
    "ኦችኡ",
    "ውኦን",
    "ኧኝኣ",
    "ኝኣውን",
    "ኝኣው",
    "ኦችን",
    "ኣል",
    "ኧም",
    "ሽው",
    "ክም",
    "ኧው",
    "ትም",
    "ውኦ",
    "ውም",
    "ውን",
    "ንም",
    "ሽን",
    "ኣች",
    "ኡት",
    "ኢት",
    "ክኡ",
    "ኤ",
    "ህ",
    "ሽ",
    "ኡ",
    "ክ",
    "ኧ",
    "ኧች",
    "ኡን",
    "ን",
    "ንኣ",
    "ው",
];

const Prefix = [
    ,
    "እንድኧ",
    "ስልኧምኣይ",
    "ይኧምኣት",
    "ዕንድኧ",
    "ይኧትኧ",
    "ብኧምኣ",
    "ብኧትኧ",
    "እንድኧ",
    "ዕኧል",
    "ስልኧ",
    "ምኧስ",
    "ዕይኧ",
    "ዕኧስ",
    "ዕኧት",
    "ዕኧን",
    "ይኣል",
    "ስኣት",
    "ስኣን",
    "ስኣይ",
    "ይኣስ",
    "ይኧ",
    "ልኧ",
    "ክኧ",
    "እን",
    "ዕን",
    "ብኧ",
    "ዐል",
    "ይኧ",
    "ይ",
];

const non_stemmedWords = [
    "መስከረም",
    "ጥቅምት",
    "ህዳር",
    "ታህሳስ",
    "ጥር",
    "የካቲት",
    "መጋቢት",
    "ሚያዚያ",
    "ግንቦት",
    "ሰኔ",
    "ሃምሌ",
    "ነሓሴ",
    "ጷጉሜ",
    "ሰኞ",
    "ማክሰኞ",
    "ረቡዕ",
    "ሀሙስ",
    "ዐርብ",
    "ቅዳሜ",
    "እሁድ",
    "ትግራይ",
    "አፋር",
    "አማራ",
    "ቤንሻንጉል",
    "ጋምቤላ",
    "ኦሮምያ",
    "ሶማሌ",
    "ድሬደዋ",
    "ሀረር",
];

const checkTermInStemTable = (word) => {
    // Read the JSON file
    let tableData = fs.readFileSync("./support docs/stemTable.json");
    let stemTable = JSON.parse(tableData);

    // Check if the word exists as a key in the stemTable
    if (stemTable.hasOwnProperty(word)) {
        // If the word exists, return the corresponding value
        return stemTable[word];
    }
    return null;
};

const getPhoneticRepresentation = (word) => {
    phoneticWord = "";
    for (var i = 0; i < word.length; i++) {
        phoneticWord += PhoneticDictionary[word[i]];
    }
    return phoneticWord;
};
const getAmharicWord = (word) => {
    finalWord = "";
    wordLength = word.length;

    for (i = 0; i < wordLength; i++) {
        if (i == wordLength - 1) wordpart = word[i];
        else wordpart = word.slice(i, i + 2);
        if (vowels.includes(wordpart[1] || "")) {
            finalWord += Object.keys(PhoneticDictionary).find(
                (key) => PhoneticDictionary[key] == wordpart
            );
            i++;
        } else finalWord += wordpart[0];
    }
    return finalWord;
};
exports.stem = function (word) {
    if (checkTermInStemTable(word) != null) {
        return checkTermInStemTable(word);
    }
    stemmedWord = getPhoneticRepresentation(word);
    if (non_stemmedWords.includes(word)) {
        return word;
    } else {
        // Prefix removal
        for (fix of Prefix) {
            if (getAmharicWord(stemmedWord).length > 2)
                if (stemmedWord.startsWith(fix)) {
                    stemmedWord = stemmedWord.replace(fix, "");
                }
        }
        // Suffix removal
        for (fix of Suffix) {
            if (getAmharicWord(stemmedWord).length > 2)
                if (stemmedWord.endsWith(fix))
                    stemmedWord = stemmedWord.replace(fix, "");
        }

        // Infix removal

        /*
            console.log(check);
            if (check != true) {
                console.log("here 2");
                firstPart = stemmedWord.slice(0, 4);
                firstPart = firstPart.slice(0, firstPart.length - 2);

                var secondPart = stemmedWord.slice(firstPart.length);

                console.log(firstPart, secondPart);

                stemmedWord = firstPart + secondPart;
            }
            */
    }

    // Infix removal for words with repeated patterns
    stemmedWord = getAmharicWord(stemmedWord);
    if (stemmedWord.length > 3 && stemmedWord.length % 2 == 0) {
        let midIndex = stemmedWord.length / 2;
        let firstHalf = stemmedWord.slice(0, midIndex);
        let secondHalf = stemmedWord.slice(midIndex);

        if (firstHalf == secondHalf) {
            return stemmedWord;
        } else if (
            firstHalf.slice(0, firstHalf.length - 1) ===
            secondHalf.slice(0, secondHalf.length - 1)
        ) {
            stemmedWord = secondHalf;
        }

        return stemmedWord;
    }
    stemmedWord = getPhoneticRepresentation(stemmedWord);
    if (stemmedWord.length > 4) {
        var firstPart = "";
        var secondPart = "";
        // var i = 0;
        for (i = 0; i + 3 < stemmedWord.length; i++) {
            var temp = stemmedWord.slice(i, i + 3);
            const check = vowels.some((r) => temp.includes(r));
            if (!check) {
                if (i == 0) firstPart = stemmedWord.slice(0, i + 2);
                else firstPart = stemmedWord.slice(0, i + 1);

                secondPart = stemmedWord.slice(firstPart.length);
                stemmedWord = firstPart + secondPart.slice(2);
                break;
            }
        }

        stemmedWord = getAmharicWord(stemmedWord);
        return stemmedWord;
    }

    return stemmedWord;
};
