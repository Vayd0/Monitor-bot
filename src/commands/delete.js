const { MessageButton, MessageEmbed } = require("discord.js");
const validUrl = require("valid-url");
module.exports = {

    name: "delete-monitor",
    description: "💻 Delete monitor",
    category: "Configuration",
    options: [
        {
            name: "url",
            description: "Set a URL",
            type: 3,
            required: true
        }
    ],
    botPerms: ["SEND_MESSAGES"],
    memberPerms: ["SEND_MESSAGES", "ADMINISTRATOR"],
    enabled: true,
    run: async (client, interaction) => {
        /* Get Option */
        let url = interaction.options.getString("url")
        let channel = interaction.options.getChannel("channel")

        /* Check URL */
        if (!validUrl.isUri(url)) return interaction.reply({ content: "Please provide a valid URL.", ephemeral: true });

        /* Get DB */
        let MonitorDB = await client.data.getMonitor(interaction.user.id, url);

        /* Check DB */
        if (!MonitorDB) {

            interaction.reply({
                content: `You don't have any monitor for ${url} !`,
                ephemeral: true
            })

        } else {

            await client.base_up(interaction, null, null, url, channel, "delete");

        }


    },
};
