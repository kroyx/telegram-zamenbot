module.exports = {
	name: "kursoj",
	description: "Mi donos al vi liston de esperantaj kursoj",
	execute(ctx) {
		ctx.telegram.sendMessage(
			ctx.chat.id,
			"Mi montras al vi liston de kursoj.",
			{
				reply_markup: {
					inline_keyboard: ctx.db.kursoj,
				},
			}
		);
	},
};
