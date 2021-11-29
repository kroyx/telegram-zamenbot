const { Telegraf } = require("telegraf");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const bot = new Telegraf(process.env.BOTTOKEN);

let setMyCommands = [];

// Commands Handler

const komandDosieroj = fs
	.readdirSync("./commands")
	.filter((dosiero) => dosiero.endsWith(".js"));

for (const dosiero of komandDosieroj) {
	const command = require(`./commands/${dosiero}`);
	setMyCommands.push({
		command: command.name,
		description: command.description,
	});
	bot.command(command.name, (ctx, next) => command.execute(ctx, next));
}

bot.telegram.setMyCommands(setMyCommands);

// Actions Handler

const agDosieroj = fs
	.readdirSync("./actions")
	.filter((dosiero) => dosiero.endsWith(".js"));

for (const dosiero of agDosieroj) {
	const action = require(`./actions/${dosiero}`);
	bot.action(action.name, (ctx, next) => action.execute(ctx, next));
}

const helpaMesagxo = setMyCommands
	.map((command) => `/${command.command} - ${command.description}`)
	.reduce((a, b) => `${a}\n${b}`);

// Context Db
bot.context.db = require("./botDb");

bot.start((ctx) => {
	ctx.reply("Saluton Esperantisto, mi donos al vi la liston de miaj komandoj");
	ctx.reply(helpaMesagxo);
});

// Lanĉu la roboton
bot.launch({
	dropPendingUpdates: true,
});
