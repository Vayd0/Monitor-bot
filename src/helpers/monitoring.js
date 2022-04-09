const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
module.exports = async (interaction, user, edit, url, channel, type) => {
    let edit_option = false;
    switch (edit) {
        case "enable":
            edit = "🟢"
            edit_option = true
            break;
        case "disable":
            edit = "🔴"
            break;
    }
    switch (type) {

        case "create":
            /* Send reply */
            await interaction.client.data.createMonitor(interaction.user.id, url).then(async (DB) => {
                interaction.reply({
                    embeds: [
                        {
                            title: "Monitor Create",
                            fields: [
                                { name: "[🔗] URL", value: url },
                                { name: "[📌] Request By", value: interaction.user.username },
                                { name: "[🔎] Channel", value: channel.name },
                                { name: "[🔧] Edit mode", value: edit }
                            ],
                            color: config.color
                        }
                    ],
                    ephemeral: true
                });

                /* Push to DB and save */
                DB.channel = channel.id
                DB.url = url
                DB.edit_mode = edit_option
                await DB.save();
            })
            break;
        case "delete":
            /* Send Reply */
            await interaction.client.data.deleteMonitor(interaction.user.id, url).then(async (DB) => {
                interaction.reply({
                    embeds: [
                        {
                            title: "Delete Monitor",
                            fields: [
                                { name: "[🔗] URL", value: url },
                                { name: "[📌] Request By", value: interaction.user.username }
                            ],
                            color: config.color
                        }
                    ],
                    ephemeral: true
                })
            });
            break;
        case "info":
            /* Send Reply */
            await interaction.client.data.getAllMonitor(user.id).then(async (DB) => {
                DB.forEach(element => {
                    let embed = new MessageEmbed()
                    embed.setColor(config.color)
                    embed.addFields([
                        { name: "URL", value: element.url },
                        { name: "Posted By", value: interaction.client.users.cache.get(element.posted_by).username },
                        { name: "Added at", value: element.createAt },
                        { name: "Channel", value: `<#${element.channel}>` }
                    ])
                    interaction.channel.send({ embeds: [embed] })
                })
            });
            break;
        case "default":
            interaction.client.logger(`An error was occured, please check if data of a base_up are correct !`, "error")
    }

}