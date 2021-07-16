import { Telegraf } from "telegraf";
import express  from "express";
const expressApp = express();

const API_TOKEN =
    process.env.API_TOKEN || "1869569173:AAHNMjHfqJXXRyXcE-P57dj5hDCNukMmlqE";
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "https://introbot-ai.herokuapp.com";
const bot = new Telegraf(API_TOKEN);

//method for invoking start command
bot.telegram.setWebhook(`${URL}/telebot/`);
expressApp.use(bot.webhookCallback(`/telebot/`));

bot.command("start", async (ctx, next) => {
    console.log(ctx.from);
    const messages = [
        `Hi ${ctx.chat.first_name}! I'm Introbot - the AI community manager. \n \n I can help with specific COVID related requirements`,
        `In the last few weeks, I've spoken with 0 Indians, helped with 0 requests, and saved thousands of lives.`,
        `We're a small team of passionate citizens. Follow us at twitter.com/introbotAI & twitter.com/COVIDcitizens.`,
        `So, what are you looking for? And where?`,
        `Please answer in the format of <resource in <city>. E.g. Hospital beds in Delhi, Oxygen Cylinders in Mumbai, etc.`,
        `At any time, if you use the word covid, I'll jump back to this question.`,
    ];
    for (const msg of messages) {
        await ctx.reply(msg);
    }
});

bot.hears(
    /Hey Introbot!|Hey|Hey!|Hi!|Hi|Hello|Help|Bot|Bot!|hi|hello|hey/,
    async (ctx, next) => {
        console.log(ctx.from);

        const messages = [
            `Hi ${ctx.chat.first_name}! I'm Introbot - the AI community manager. \n \n I can help with specific COVID related requirements`,
            `In the last few weeks, I've spoken with 0 Indians, helped with 0 requests, and saved thousands of lives.`,
            `We're a small team of passionate citizens. Follow us at twitter.com/introbotAI & twitter.com/COVIDcitizens.`,
            `So, what are you looking for? And where?`,
            `Please answer in the format of <resource in <city>. E.g. Hospital beds in Delhi, Oxygen Cylinders in Mumbai, etc.`,
            `At any time, if you use the word covid, I'll jump back to this question.`,
        ];
        for (const msg of messages) {
            await ctx.reply(msg);
        }
    }
);

bot.hears(/Covid|covid|COVID/, async (ctx, next) => {
    console.log(ctx.from);

    const messages = [
        `Alright ${ctx.chat.first_name}!`,
        `In the last few weeks, I've spoken with 0 Indians, helped with 0 requests, and saved thousands of lives.`,
        `We're a small team of passionate citizens. Follow us at twitter.com/introbotAI & twitter.com/COVIDcitizens.`,
        `So, what are you looking for? And where?`,
        `Please answer in the format of <resource> in <city>. E.g. Hospital beds in Delhi, Oxygen Cylinders in Mumbai, etc.`,
        `At any time, if you use the word covid, I'll jump back to this question.`,
    ];
    for (const msg of messages) {
        await ctx.reply(msg);
    }
});

bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
expressApp.get("/", (req, res) => {
    res.send("Hello World!");
});
expressApp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});