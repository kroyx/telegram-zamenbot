module.exports = {
	name: /vortfarado_/,
	execute(ctx) {
		const rezulto = ctx.match.input.split("_")[1];
		ctx.db.vortfaradaRezulto = rezulto;
		const vortfarado = ctx.db.vortfarado.vortfarado.filter(
			(vortfarado) => vortfarado.rezulto === rezulto
		);
		const partoj = vortfarado[0].partoj
			.filter((parto) => parto.vorto !== null)
			.map((parto) => parto.vorto);

		const titolo = `${rezulto.toUpperCase()}:`;

		const butonoj = partoj.map((vorto) => [
			{ text: vorto, callback_data: `parto_${vorto}` },
		]);

		butonoj.push([{ text: "Iru Antaŭen", callback_data: "analizaMenuo" }]);

		ctx.deleteMessage();
		ctx.telegram.sendMessage(ctx.chat.id, titolo, {
			reply_markup: {
				inline_keyboard: butonoj,
			},
		});
	},
};
