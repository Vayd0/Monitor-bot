const { MessageButton, MessageEmbed } = require("discord.js");
const validUrl = require("valid-url");
module.exports = {

    name: "create-monitor",
    description: "💻 Setup monitor",
    category: "Configuration",
    options: [
        {
            name: "url",
            description: "Set a URL",
            type: 3,
            required: true
        },
        {
            name: "channel",
            description: "Set a CHANNEL",
            type: 7,
            channel_types: [0],
            required: true
        },
        {
            name: "auto_edit",
            description: "Modify the message when changing status.",
            required: true,
            type: 3,
            choices: [
                {
                    name: "🟢",
                    value: "enable"
                },
                {
                    name: "🔴",
                    value: "disable"
                }
            ]
        }
    ],
    botPerms: ["SEND_MESSAGES"],
    memberPerms: ["SEND_MESSAGES", "ADMINISTRATOR"],
    enabled: true,
    run: async (client, interaction) => {
        /* Get Option */
        let url = interaction.options.getString("url")
        let channel = interaction.options.getChannel("channel")
        let edit = interaction.options.getString("auto_edit")

        /* Check URL */
        if (!validUrl.isUri(url)) return interaction.reply({ content: "Please provide a valid URL.", ephemeral: true });

        /* Get DB */
        let MonitorDB = await client.data.getMonitor(interaction.user.id, url);

        /* Check DB */
        if (!MonitorDB) {

            await client.base_up(interaction, null, edit, url, channel, "create");

        } else if (MonitorDB.url === url && MonitorDB.posted_by === interaction.user.id && MonitorDB.channel === channel.id) {

            interaction.reply({
                content: `You are already following this link in <#${MonitorDB.channel}> !`,
                ephemeral: true
            })

        } else {

            await client.base_up(interaction, null, edit, url, channel, "create");

        }


    },
};
