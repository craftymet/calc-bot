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
    // log the bot's username & tag to the console
    console.log(`logged in as ${bot.user.tag}`);
    // set the bot's activity to be displayed as /help
    bot.user.setActivity("/help", { type: "PLAYING" });

    const guildID = "924047719306260500";
    const guild = bot.guilds.cache.get(guildID);
    let commands;

    // fetch required command based on value of guild 
    if (guild) {
        commands = guild.commands;
    } else {
        commands = bot.application?.commands;
    }

    // construct addition slash command
    commands?.create({
        name: "add",
        description: "adds two values",
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
    // construct subtraction slash command
    commands?.create({
        name: "subtract",
        description: "subtracts two numbers",
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
    // construct multipulcation slash command
    commands?.create({
        name: "multiply",
        description: "multiplies two numbers",
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
    // construct division slash command
    commands?.create({
        name: "divide",
        description: "divides two numbers",
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
    // construct % of slash command
    commands?.create({
        name: "percent",
        description: "calculates percentage of",
        options: [{
            name: "percent",
            description: "percent, write without including the % symbol",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "num1",
            description: "the number you're calculating the percentage of",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }]
    })
})


// implement slash commands
bot.on("interactionCreate", async interaction => {
    // return if interaction is not a command
    if (!interaction.isCommand) {
        return;
    }
    // implement slash commands
    const { commandName, options } = interaction;

    // define logic for slash commands
    if (commandName === "add") {
        const num1 = await options.getNumber("num1");
        const num2 = await options.getNumber("num2");
        // allows the command to take greater than three seconds to execute
        await interaction.deferReply({
            ephemeral: false
        })
        // edit the reply to contain the answer once the command has finished executing
        interaction.editReply({
            content: `the sum is ${num1 + num2}`
        })

    } else if (commandName === "subtract") {
        const num1 = await options.getNumber("num1");
        const num2 = await options.getNumber("num2");
        await interaction.deferReply({
            ephemeral: false
        })
        interaction.editReply({
            content: `the difference is ${num1 - num2}`
        })

    } else if (commandName === "multiply") {
        const num1 = await options.getNumber("num1");
        const num2 = await options.getNumber("num2");
        await interaction.deferReply({
            ephemeral: false
        })
        interaction.editReply({
            content: `the product is ${num1 * num2}`
        })

    } else if (commandName === "divide") {
        const num1 = await options.getNumber("num1");
        const num2 = await options.getNumber("num2");
        await interaction.deferReply({
            ephemeral: false
        })
        interaction.editReply({
            content: `the quotient is ${num1 / num2}`
        })

    } else if (commandName === "percent") {
        const num1 = await options.getNumber("percent");
        const num2 = await options.getNumber("num1");
        // percentage of = % / 100 * num
        let i = num1 / 100;
        await interaction.deferReply({
            ephemeral: false
        })
        interaction.editReply({
            content: `${num1}% of ${num2} is ${i * num2}`
        })
    }
})


// login to discord using the bot token
bot.login(process.env.TOKEN);