const { MessageButton, MessageEmbed } = require("discord.js");
const validUrl = require("valid-url");
module.exports = {

    name: "fetch-monitor",
    description: "💻 Get all monitor",
    category: "Configuration",
    options: [
        {
            name: "user",
            required: true,
            type: 6,
            description: "Specify a user"
        }
    ],
    botPerms: ["SEND_MESSAGES"],
    memberPerms: ["SEND_MESSAGES"],
    enabled: true,
    run: async (client, interaction) => {

        /* Fetch Options */
        let user = interaction.options.getUser("user")

        /* Get DB */
        let MonitorDB = await client.data.getAllMonitor(user.id);
        /* Check if user is a bot */
        if (user.bot) return interaction.reply({ content: "Bots can't create monitors...", ephemeral: true })
        /* Check DB */
        if (MonitorDB.length <= 0) {

            await interaction.reply({
                embeds: [
                    {
                        title: "Monitor infos",
                        description: "No monitor found !"
                    }
                ]
            })

        } else {
            interaction.reply({ content: `**Information of ${user.username} !**` })
            await client.base_up(interaction, user, null, null, null, "info");

        }
    },
};
