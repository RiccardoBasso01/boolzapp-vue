// console.log('openai');

// import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true});

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "how many citizens have italy?" }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }

// main();


// import fs from "fs";
// import path from "path";
// import OpenAI from "openai";

// const listen = document.getElementById('listen');

// const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true});

// const speechFile = path.resolve("./speech.mp3");

// async function main() {
//   const mp3 = await openai.audio.speech.create({
//     model: "tts-1",
//     voice: "alloy",
//     input: "Today is a wonderful day to build something people love!",
//   });
//   console.log(speechFile);
//   const buffer = Buffer.from(await mp3.arrayBuffer());
//   await fs.promises.writeFile(speechFile, buffer);
// }

// listen.addEventListener('click', main)


// from openai import OpenAI
// import OpenAI from "openai";

// client = OpenAI()
// const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true});


// audio_file= open("/path/to/file/audio.mp3", "rb")
// transcript = client.audio.transcriptions.create(
//   model="whisper-1", 
//   file=audio_file
// )