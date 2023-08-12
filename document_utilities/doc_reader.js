const fs = require("fs");
const path = require("path");

const inputFolderPath = path.join(__dirname, "../Documents");
const outputFilePath = path.join(__dirname, "../doc_files/scannedDocs.json");

const scanDocuments = async () => {
    try {
        // Check if stories.json file exists
        let stories = [];
        if (fs.existsSync(outputFilePath)) {
            const existingData = fs.readFileSync(outputFilePath, "utf8");
            stories = JSON.parse(existingData);
        }

        const files = fs.readdirSync(inputFolderPath);
        var id = 0;
        for (const file of files) {
            if (file.endsWith(".txt")) {
                const filePath = path.join(inputFolderPath, file);
                const data = fs
                    .readFileSync(filePath, "utf8")
                    .trim()
                    .split("\n");
                if (data.length < 5) {
                    console.log(`Skipping ${file} due to insufficient data`);
                    continue;
                }

                const title = data[0].trim();

                // Check if the title already exists in stories
                if (stories.some((story) => story.title === title)) {
                    console.log(
                        `Skipping ${file} - Title already exists in scannedDocs.json`
                    );
                    continue;
                }

                const publisher = data[1].trim();
                const content = data[2].trim();
                const author = data[3].trim();
                const date = data[data.length - 1].trim();
                const doc_id = id;
                id++;

                const docEntity = {
                    doc_id,
                    title,
                    publisher,
                    content,
                    author,
                    date,
                };

                stories.push(docEntity);

                console.log(`Processed ${file}`);
            }
        }

        fs.writeFileSync(outputFilePath, JSON.stringify(stories, null, 2));
    console.log("All documents processed and saved to scannedDocs.json");
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

exports.scanDocs = scanDocuments();
