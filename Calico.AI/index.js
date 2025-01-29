const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function askCalicoAI() {
    const userInput = document.getElementById('userInput').value;
    const responseElement = document.getElementById('response');

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const result = await model.generateContentStream([userInput]);
        let responseText = '';
        for await (const chunk of result.stream) {
            responseText += chunk.text();
        }
        responseElement.textContent = responseText;
    } catch (error) {
        responseElement.textContent = 'Error: ' + error.message;
    }
}

// Remove the readline interface and prompt
// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// userInterface.prompt()

// userInterface.on("line", async input => {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});
//   const result = await model.generateContentStream([input]);
//   for await(const chunk of result.stream){
//     const chunkText = chunk.text();
//     console.log(chunkText)
//   }
// })
