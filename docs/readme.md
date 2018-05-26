# winky-bot
a simple discord selfbot written in the discord.js library

## Wiki
[here it is](https://www.github.com/winkybot-dev/winky-bot/wiki)

## Installation and Setup

### Installing nodeJS
Firstly, click this link: [nodeJS download page](https://nodejs.org/en/), and download the 8.11.2 LTS installer. Install that however you install things on your OS, you should know. Make sure it's in your PATH, by running `node` from a terminal. If it doesn't work, put it in your PATH.

### Downloading WinkyBot
Now, open up a terminal, and assuming you have git installed (you should), run `git clone https://github.com/winkybot-dev/winky-bot.git`, or just click [here](https://winkybot-dev.github.io/winky-bot/) and download the latest release. It might be a bit outdated but it will probably be more stable.

### Setting up WinkyBot
Open up the folder you git cloned into, and open `config.JSON`. Now open Discord. In Discord, press Ctrl+Shift+I on windows, or Command+Shift+I on mac os. Then in the window, click the application tab (might be in a dropdown menu at the top), then click `Local Storage` on the left. Then click the link that appears and copy the contents of the `token` section at the bottom.  
Paste this into the `token` section of `config.JSON`. If you want to configure the command prefix, put that in the `prefix` section. Save the file and close it.

### Launching and Using WinkyBot
To launch WinkyBot, open a terminal and navigate to the directory. Then, type `node bot.js` to start the bot.  
Congratulations! Each command and what it does is on the wiki, so have fun!


## Future plans:
1. mute command
2. role creation commands
3. better embed command using flags
4. command parser using external js files
5. UI using electron
