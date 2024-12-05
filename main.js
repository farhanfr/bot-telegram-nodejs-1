const TelegramBot = require('node-telegram-bot-api');

const token = "7915886901:AAHKmoCl-4aUciGwuS4uRWvmuPNZqXhGC2w"

const options = {
    polling: true
}

const testBot = new TelegramBot(token, options);

const prefix = "."

const sayHi = new RegExp(`^${prefix}halo$`);
const gempa = new RegExp(`^${prefix}gempa$`);

// testBot.on("message", (callback) => {
//    const id = callback.chat.id;
//    testBot.sendMessage(id, "hello");
// });

testBot.onText(sayHi, (callback) => {
    const id = callback.chat.id;
    testBot.sendMessage(id, "ini gempa");
});

testBot.onText(gempa, async (callback) => {
    const URL = "https://data.bmkg.go.id/DataMKG/TEWS/"
    const id = callback.chat.id;

    const apiCall = await fetch(URL + "autogempa.json");
    const { Infogempa: { gempa: {
        Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Shakemap
    } } } = await apiCall.json();

    const image = URL + Shakemap
    
const result = `
Jam: ${Jam}
Magnitude: ${Magnitude}
Tanggal: ${Tanggal}
Wilayah: ${Wilayah}
Potensi: ${Potensi}
Kedalaman: ${Kedalaman}
`
    testBot.sendPhoto(id, image, { caption: result });
});

console.log("bot is running");