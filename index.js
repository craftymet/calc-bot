// import the required modules/files
const DiscordJS = require('discord.js');
const dotenv = require('dotenv').config();
const { intents } = DiscordJS;
const { MessageEmbed } = require('discord.js');

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

    // set the guild to a falsey value to enable global commands
    const guild = false;
    
    // reset commands to prevent unexpected duplicates
    bot.application.commands.set([]);
    
    // where fetched commands will be saved to
    let commands;

    // fetch required commands based on value of guild 
    if (guild) {
        commands = guild.commands;
    } else {
        commands = bot.application?.commands;
    }

    // construct addition slash command
    commands?.create({
        name: "add",
        description: "adds two numbers",
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
        name: "percentage_of",
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
    // construct help slash command
    commands?.create({
        name: "help",
        description: "describes how to interact with Calc",
    })
    // construct square root slash command
    commands?.create({
        name: "square_root",
        description: "finds the square root of a number",
        options: [{
            name: "num1",
            description: "the number you're calculating the square root of",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
            name: "round_to_nearest_int",
            description: "determines whether the answer is rounded to the nearest integer, select either true or false",
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.BOOLEAN
        }]
    })
})


// implement slash commands
bot.on("interactionCreate", async interaction => {
    // return if interaction is not a command
    if (!interaction.isCommand) {
        return;
    }
    const { commandName, options } = interaction;

    // define logic for slash commands
    if (commandName === "add") {
        const num1 = await options.getNumber("num1") || 0
        const num2 = await options.getNumber("num2") || 0

        // create embed
        const addEmbed = new MessageEmbed()
        .setColor("#5CD4D8")
        .setTitle(`(${num1}) + (${num2}) = *(${num1 + num2})*`)
        .setTimestamp()
        .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

        // reply to the slash command with the embed
        await interaction.reply({
            embeds: [addEmbed]
        })

    } else if (commandName === "subtract") {
        const num1 = await options.getNumber("num1") || 0
        const num2 = await options.getNumber("num2") || 0
        
        const subtractEmbed = new MessageEmbed()
        .setColor("#5CD4D8")
        .setTitle(`(${num1}) - (${num2}) = *(${num1 - num2})*`)
        .setTimestamp()
        .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

        await interaction.reply({
            embeds: [subtractEmbed]
        })

    } else if (commandName === "multiply") {
        const num1 = await options.getNumber("num1") || 0
        const num2 = await options.getNumber("num2") || 0
        
        const multiplyEmbed = new MessageEmbed()
        .setColor("#5CD4D8")
        .setTitle(`(${num1}) x (${num2}) = *(${num1 * num2})*`)
        .setTimestamp()
        .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

        await interaction.reply({
            embeds: [multiplyEmbed]
        })

    } else if (commandName === "divide") {
        const num1 = await options.getNumber("num1") || 0
        const num2 = await options.getNumber("num2") || 0
        
        const devideEmbed = new MessageEmbed()
        .setColor("#5CD4D8")
        .setTitle(`(${num1}) / (${num2}) = *(${num1 / num2})*`)
        .setTimestamp()
        .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

        await interaction.reply({
            embeds: [devideEmbed]
        })

    } else if (commandName === "percentage_of") {
        const num1 = await options.getNumber("percent") || 0
        const num2 = await options.getNumber("num1") || 0
        // percentage of = % / 100 * num
        const i = num1 / 100;
        
        const percentageOfEmbed = new MessageEmbed()
        .setColor("#5CD4D8")
        .setTitle(`(${num1}%) of (${num2}) is *(${i * num2})*`)
        .setTimestamp()
        .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

        await interaction.reply({
            embeds: [percentageOfEmbed]
        })

    } else if (commandName === "help") {
        const helpEmbed = new MessageEmbed()
        .setColor("#5CD4D8")
        .setTitle("Calc 101")
        .setDescription("Calc is a Discord bot designed to perform simple arithmetic")
        .addFields(
            {name: "\u200B", value: "\n\u200b"},
            {name: "Calling commands", value: "Calc utilizes Discord slash commands for each of it's commands, see the following list for an overview of each command"},
            {name: "/add", value: "adds two numbers", inline: true},
            {name: "/subtract", value: "subtracts two numbers", inline: true},
            {name: "/multiply", value: "multiplies two numbers", inline: true},
            {name: "/divide", value: "divides two numbers", inline: true},
            {name: "/percentage_of", value: "calculates the percentage of a number", inline: true},
            {name: "/square_root", value: "returns the square root of a number, answer can be rounded to the nearest integer", inline: true}
        )
        .setTimestamp()
        .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})
        .setImage("https://i.postimg.cc/Kjy5Mnc8/Calc-bot-banner.png")

        await interaction.reply({
            embeds: [helpEmbed] 
        })

    } else if (commandName === "square_root") {
        const num1 = await options.getNumber("num1") || 0
        const num2 = await options.getBoolean("round_to_nearest_int") || 0
        // calculate the square root of num1
        const sqrtOfNum1 = await Math.sqrt(num1);

        // embed for returning the square root
        const square_rootEmbed = new MessageEmbed()
        .setColor("#5CD4D8")
        .setTitle(`the square root of (${num1}) is (${sqrtOfNum1})`)
        .setTimestamp()
        .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

        // embed for returning the square root rounded to the nearest integer
        const square_root_roundedEmbed = new MessageEmbed()
        .setColor("#5CD4D8")
        .setTitle(`the square root of (${num1}) rounded to the nearest integer is (${Math.round(sqrtOfNum1)})`)
        .setTimestamp()
        .setAuthor({name: "Calc", iconURL: "https://i.postimg.cc/ZRvbXNSZ/Screen-Shot-2022-01-08-at-1-52-37-PM.png"})

        // if round_to_nearest_int is true
        if (num2) {
            await interaction.reply({
                embeds: [square_root_roundedEmbed]
            })
        // if round_to_nearest_int is false
        } else {
            await interaction.reply({
                embeds: [square_rootEmbed]
            })
        }
    }
})

// login to discord using the bot token
bot.login(process.env.TOKEN);