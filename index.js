// import the required modules
DiscordJS = require('discord.js');
const dotenv = require('dotenv').config();
const { intents } = DiscordJS;

// create a new bot instance & declare intents
const bot = new DiscordJS.Client({
    intents: [
        DiscordJS.Intents.FLAGS.GUILDS,
        DiscordJS.Intents.FLAGS.GUILD_MESSAGES
    ]
})

// run when client is ready
bot.on("ready", () => {
    console.log(`logged in as ${bot.user.tag}`);

    const guildID = "924047719306260500";
    const guild = bot.guilds.cache.get(guildID);
    let commands;

    // fetch required command based on value of guild 
    if (guild) {
        commands = guild.commands;
    } else {
        commands = bot.application?.commands;
    }

    // create addition slash command
    commands?.create({
        name: "add",
        description: "adds two values together",
        options: [{
            name: "num1",
            description: "first number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "num2",
            description: "second number",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }]
    })
    
})


// login to discord using the bot token
bot.login(process.env.TOKEN);