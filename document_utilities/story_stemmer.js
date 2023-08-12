const fs = require("fs");
const path = require("path");
const stopWordRemover = require(path.join(__dirname, "../stopWordRemover"));

const inputFilePath = path.join(__dirname, "./stories.json");
const outputFilePath = path.join(__dirname, "./stemmed_stories.json");

const processStories = async () => {
    try {
        const storiesData = fs.readFileSync(inputFilePath, "utf8");
        const stories = JSON.parse(storiesData);

        const stemmedStories = [];

        for (const story of stories) {
            const processedStory = stopWordRemover.getProcessedCorpus(
                story.story
            ); // Process the story using the module
            const stemmedStoryEntity = { ...story, story: processedStory };
            stemmedStories.push(stemmedStoryEntity);
        }

        fs.writeFileSync(
            outputFilePath,
            JSON.stringify(stemmedStories, null, 2)
        );
        console.log("Stemmed stories saved to stemmed_stories.json");
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

exports.processCorpus = processStories();
