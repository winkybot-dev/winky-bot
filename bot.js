// if you get in any trouble from discord for using this, im not responsible.
// (you wont though, it's not like its a spambot or anything...)

const Discord = require("discord.js");
const ConfigFile = require("./config.json");

const token = ConfigFile.token;
const id = ConfigFile.id;
const prefix = ConfigFile.prefix;

var client = new Discord.Client();
var embed = new Discord.RichEmbed();

client.on("ready", function()
{
  console.log("--> bot ready!\n-> logged in with token: " + token + "\n-> user id: " + client.user.id);
  console.log("\n\nWaiting for commands...");
});

client.on("disconnected", function()
{
   console.log("\nDisconnected!"); // from a bot i made a long time ago, might not work
   process.exit(1);
});

client.on("message", function(message) // calls every time a message is sent
{
  if (!message.author.id == id) return;
  if (!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase())
  {
    case "ping":
      message.channel.send("Pong! ``" + new Date().getTime() - message.createdTimestamp + " ms`");
      break;

   case "embed": // command format: ;embed [TITLE] [COLOUR_IN_HEX] [Body Text]
      embed = new Discord.RichEmbed();
      embed.addField(args[1], args.slice(3));
      embed.setColor(args[2]);
      message.channel.send(embed);
      break;

    default:
      message.channel.send("Invalid command!");
  }
});

client.login(token);
