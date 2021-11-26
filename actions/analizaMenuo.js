module.exports = {
	name: "analizaMenuo",
	execute(ctx) {
		const vorto = ctx.db.vorto;
		const titolo = vorto.toUpperCase();
		const partoj = ctx.db.vortfarado;
		const vortfaradoj = partoj.vortfarado.map(
			(vortfarado) => vortfarado.rezulto
		);
		const butonoj = vortfaradoj.map((rezulto) => [
			{ text: rezulto, callback_data: `vortfarado_${rezulto}` },
		]);
		butonoj.push([
			{
				text: `Legu pli pri la vorto "${vorto}"`,
				url: `http://www.simplavortaro.org/ser%c5%89o?s=${vorto.toLowerCase()}`,
			},
		]);
		ctx.deleteMessage();
		ctx.telegram.sendMessage(ctx.chat.id, `${titolo}:`, {
			reply_markup: {
				inline_keyboard: butonoj,
			},
		});
	},
};
