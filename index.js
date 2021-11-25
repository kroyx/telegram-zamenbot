const { Telegraf } = require("telegraf");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const bot = new Telegraf(process.env.BOTTOKEN);

const helpMesagxo = `
Diru ion al mi
/start - Komencu la roboton
/difinu - Mi donos al vi difinon de vorto
/traduku - Mi donos al vi tradukojn de vorto
/analizu - Mi donos al vi la vorton dividitan en siaj partoj
/help - referenco de komandoj`;

bot.start((ctx) => {
	ctx.reply("Saluton mi estas SimplaVortaro Roboto");
	ctx.reply(helpMesagxo);
});

bot.help((ctx) => {
	ctx.reply(helpMesagxo);
});

// Commands Handler
const komandDosieroj = fs
	.readdirSync("./commands")
	.filter((dosiero) => dosiero.endsWith(".js"));

for (const dosiero of komandDosieroj) {
	const command = require(`./commands/${dosiero}`);
	bot.command(command.name, (ctx, next) => command.execute(ctx, next));
}

// Actions Handler
const agDosieroj = fs
	.readdirSync("./actions")
	.filter((dosiero) => dosiero.endsWith(".js"));

for (const dosiero of agDosieroj) {
	const action = require(`./actions/${dosiero}`);
	bot.action(action.name, (ctx, next) => action.execute(ctx, next));
}

// Context Db
bot.context.db = require("./botDb");

bot.launch({
	dropPendingUpdates: true,
});
