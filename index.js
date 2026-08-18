require("dotenv").config();
const axios = require("axios");
const { App } = require("@slack/bolt");

const url = "https://api.periodictableofelements.org"

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

app.command("/chemibot-ping", async ({command, ack, respond}) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({text: `Pong!\nLatency: ${latency}ms`})
});
(async () => {
    await app.start();
    console.log("bot is running!")
})();

app.command("/chemibot-help", async ({command, ack, respond}) => {
    await ack();
    await respond({
        text:
        `Available commands:
/chemibot-ping - Check bot latency
/chemibot-element - Get data about specific element
/chemibot-daily - Get some fun facts about a daily element
/chemibot-molar-mass - Get the molar mass of a compound
        `
    });
});

app.command("/chemibot-element", async ({command, ack, respond}) => {
    await ack();
    const atomic_number = command.text.trim();
    try {
        const response = await axios.get(`${url}/elements/${atomic_number}/`);
        await respond({
            text: `${response.data.name} (${response.data.symbol})
Atomic number: ${response.data.atomic_number}
Atomic mass: ${response.data.atomic_mass}
${response.data.summary}
            `
        });
    } catch(err) {
        await respond({text: "Failed to fetch element."});
    }
});

app.command("/chemibot-daily", async ({ack, respond}) => {
    await ack();
    try {
        const response = await axios.get(`${url}/elements/element-of-the-day/`);
        await respond({
            text: `Element of the day ${response.data.date}
${response.data.name} (${response.data.symbol})
${response.data.summary}
Discovered ${response.data.discovery_year}
Fun fact:
${response.data.fun_fact}`
        })
    } catch(err) {
        await respond({text: "Failed to fetch element of the day"})
    }
});

app.command("/chemibot-molar-mass", async ({command, ack, respond}) => {
    await ack();
    const compound = command.text.trim()
    try {
        const response = await axios.get(`${url}/elements/molar-mass/?formula=${compound}`)
        await respond({
            text: `${response.data.formula}
Molar mass: ${response.data.molar_mass} g/mol
            `
        })
    } catch(err) {
        await respond({text: "Failed to fetch molar mass."})
    }
});
