const fetch = require("node-fetch");

module.exports = {
	name: /parto_/,
	async execute(ctx) {
		if (ctx.session === undefined) {
			ctx.reply("Enmetu la komandon denove");
			return -1;
		}
		const vorto = ctx.match.input.split("_")[1];
		const vortaro = `http://www.simplavortaro.org/api/v1/vorto/${vorto.toLowerCase()}`;
		const sercxado = await fetch(vortaro)
			.then((sercxo) => sercxo.json())
			.then((sercxoJson) => sercxoJson.difinoj.map((vorto) => vorto.difino))
			.then((difinoj) => difinoj.filter((difino) => difino !== null))
			.then((respondo) => respondo.reduce((a, b) => `${a}\n\n${b}`))
			.catch(() => "error");

		const respondo = `${vorto.toUpperCase()}:\n\n${sercxado})`;

		ctx.deleteMessage();
		ctx.telegram.sendMessage(ctx.chat.id, respondo, {
			parse_mode: "Markdown",
			disable_web_page_preview: true,
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Reen",
							callback_data: `vortfarado_${ctx.session.vortfaradaRezulto}`,
						},
					],
				],
			},
		});
	},
};
