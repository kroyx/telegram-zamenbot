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

bot.use((ctx, next) => {
	console.log(`${ctx.from.username} uzis la komandon ${ctx.message.text}`);
	next();
})

bot.start((ctx) => {
	ctx.reply("Saluton mi estas SimplaVortaro Roboto");
	ctx.reply(helpMesagxo);
});

bot.help((ctx) => {
	ctx.reply(helpMesagxo);
});

// Command Handler
const komandDosieroj = fs
	.readdirSync("./komandoj")
	.filter((dosiero) => dosiero.endsWith(".js"));

for (const dosiero of komandDosieroj) {
	const command = require(`./komandoj/${dosiero}`);
	bot.command(command.name, (ctx, next) => command.execute(ctx, next));
}

bot.launch();
