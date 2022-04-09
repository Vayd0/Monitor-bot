const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = async (config, clientId, commands) => {

    const rest = new REST({ version: '9' }).setToken(config.token);

    (async () => {
        try {
            if (config.specific_guild.length > 0) {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, config.specific_guild),
                    { body: commands },
                );
            } else {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
                );
            }

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}
