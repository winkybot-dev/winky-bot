// if you get in any trouble from discord for using this, im not responsible.
// (you wont though, it's not like its a spambot or anything...)

const Discord = require("discord.js");
const ConfigFile = require("./config.json");

const token = ConfigFile.token;
const id = ConfigFile.id;
const prefix = ConfigFile.prefix;

var client = new Discord.Client();

var embed = new Discord.RichEmbed();
const aboutEmbed = new Discord.RichEmbed();
aboutEmbed.setDescription("WinkyBot is an open source Discord selfbot written with the Discord.JS library.\n\nGitHub repo: https://github.com/smokals/winky-bot");
aboutEmbed.setColor("9932CC");
aboutEmbed.setFooter("written by smokals - https://github.com/smokals/", "https://avatars2.githubusercontent.com/u/31916378?s=460&v=4")
aboutEmbed.setThumbnail("https://github.com/smokals/winky-bot/blob/master/icon.png?raw=true");
aboutEmbed.setAuthor("winky-bot : https://github.com/smokals/winky-bot/", "https://github.com/smokals/winky-bot/blob/master/icon.png?raw=true");
aboutEmbed.addField("Support:", "not smoky#0001", true);
aboutEmbed.addField("Report A Bug:", "[GitHub Issues Page](https://github.com/smokals/winky-bot/issues)", true);


client.on("ready", function()
{
	console.log("--> bot ready!\n-> logged in with token: " + token + "\n-> user id: " + client.user.id);
	console.log("\n\nWaiting for commands...");
});

client.on("disconnected", function()
{
	console.log("\nDisconnected!");
	process.exit(1);
});

client.on("message", function(message) // calls every time a message is sent
{
	if (!message.author.id == client.user.id) return;
	if (!message.content.startsWith(prefix)) return;

	var args = message.content.substring(prefix.length).split(" ");

	switch (args[0].toLowerCase())
	{
		case "ping":
			message.channel.send("Pong!");
			message.channel.send(new Date().getTime() - message.createdTimestamp + " ms"); // this sends a negative ping for some bizare reason...
			break;

		case "embed": // command format: ;embed [TITLE] [COLOUR_IN_HEX] [Body Text]
			embed = new Discord.RichEmbed();
			embed.addField(args[1], args.slice(3).join(" "));
			embed.setColor(args[2]);
			message.channel.send(embed);
			break;

		case "about":
			message.channel.send(aboutEmbed);
			break;

		case "kick": // command format: ;embed [@mention_user] [reason for kick]
			message.mentions.members.first().kick(args.slice(2).join(" ")).then((member) =>
			{   // success
				message.channel.send(":wave: " + message.mentions.members.first().displayName + " has been kicked for `" + args.slice(2).join(" ") + "`");
			}).catch(() =>
			{   // error
				message.channel.send("`The mentioned member could not be kicked!`");
			});
			break;

		case "ban": // command format: ;embed [@mention_user] [reason for ban]
			message.mentions.members.first().ban(args.slice(2).join(" ")).then((member) =>
			{   // success
				message.channel.send(":wave: " + message.mentions.members.first().displayName + " has been banned for `" + args.slice(2).join(" ") + "`");
			}).catch(() =>
			{   // error
				message.channel.send("`The mentioned member could not be banned!`");
			});
			break;

		case "info": // command format: ;info [@mention_user]

			break;

		default:
			message.channel.send("`Invalid command!`");
	}
});

client.login(token);
