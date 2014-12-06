function CheesyTerminalWrapper() {
	this.terminalName = "cheesy";
	this.terminalGreetingText = "Hello, and welcome to my homepage! This is a simulated LINUX environment. Go ahead and `ls` to see what files there are!";
	this.userName = "cheesy";
	this.isSudoAllowed = false;
	this.currentDirectory = "/home/" + this.userName;
	this.terminalPrompt = this.currentDirectory + " $ ";
	this.virtualFiles = [
		"welcome.txt",
		"font.txt",
		"about.txt",
		"mytwitter.txt",
		"info.txt"
	];

	this.virtualFilesContents = {
		"welcome.txt": "Welcome to my website! This is a simulated LINUX environment. \n" +
					   "It's not perfect, well, because it's not a real environment. Personally, I think I did a good job of simulating \n" +
					   "one. Commands like ls, sudo, and cd are implemented. Go ahead and have fun!",

		"info.txt": "Hello there! This is a simulated LINUX environment.\n" +
					"I actually made the `rm` command work. You can actually just `rm info.txt`, and \n" +
					"this file will not show up in `ls` and cannot be read (because you just `rm`d it.)\n" +
					"Pretty cool, huh? The `cat` command *doesn't* have the default behavior when no arguments are issued.\n" +
					"Won't fix that anytime soon. `cd` reports \"Permission denied\" everywhere, and `ls` has full functionality\n" +
					"of listing files in a directory and listing specific file information e.g `ls info.txt` and `ls`, but it doesn't" +
					"support the standard `ls` switches (e.g `ls -la`).\n" +
					"The `touch` command works and creates new files.\n" +
					"Regardless, it is pretty cool, huh?",

		"font.txt": "Hello there! This is a list of my favorite fonts used for programming. \n\n" +
					"* Terminus: My primary, I love it! \n" +
					"* Monaco: I used to use it. \n" +
					"* Meslo: I used to use it. \n" +
					"* Fantasque Sans Mono: I used to use it. \n" +
					"* Courier New: I used to use it. \n" +
					"* Consolas: I use this font where apps render Terminus ugly. \n",

		"about.txt": "Hello there! My *real* first name is Ryan. I love programming *alot*. Here are some of my favorite programming languages: \n" +
					 "* JavaScript \n" +
					 "* CoffeeScript \n" +
					 "* C, but I'm terrible at it \n"+
					 "* HTML and CSS \n" +
					 "* Ruby \n" +
					 "* Python \n" +
					 "* Java \n" +
					 "\n\n" +
					 "I tend to stay up late at night, and wake up early in the morning. \n" +
					 "I love to play Minecraft. At the moment I *don't* have Minecraft PC. I do, however, \n" +
					 "have Minecraft for the PS3 and Minecraft: Pocket Edition.\n\n" +
					 "I like to mod MC:PE using native addons and ModPE.\n\n" +
					 "Although I love programming, I am terrible at it. I'm probably a sorry excuse for a programmer.\n" +
					 "I like to use Git as my primary VCS and my primary operating system is Windows 8.1. Can't wait for Windows 10.\n" +
					 "I once tried to install Ubuntu (standalone) on a USB stick, and it *sorta* messed up the partitioning on my PC,\n" +
					 "which is my fault...(not Ubuntu's fault). That's why Windows 8.1 is still my primary operating system at the moment.\n" +
					 "Anyways, that is all about me.",

		"mytwitter.txt": "My Twitter is @debuggedcheese (https://www.twitter.com/debuggedcheese), if you are interested."
	}
}

CheesyTerminalWrapper.prototype.listFile = function(file, term) {
	if (this.virtualFiles.indexOf(file) == -1) {
		term.echo("ls: cannot access " + file + ": No such file or directory");
	} else {
		term.echo("-r--r--r--    0    cheesy   cheesy " + this.virtualFilesContents[file].length + "   Apr 01 12:00 " + file);
	}
}

CheesyTerminalWrapper.prototype.readFile = function(file, term) {
	if (this.virtualFiles.indexOf(file) == -1) {
		term.echo("cat: cannot access " + file + ": No such file or directory");
	} else {
		var contents = this.virtualFilesContents[file];
		if (contents == null || contents == undefined || contents == "") {
			term.echo("cat: file is not implemented!");
			return;
		}

		term.echo(contents);
	}
};

CheesyTerminalWrapper.prototype.init = function(element) {
	var thiz = this;
	$(element).terminal({
		"sudo": function() {
			if (!this.isSudoAllowed) {
				this.echo(thiz.userName + " is not in the sudoers file. This incident will be reported.");
			} else {

			}
		},

		"cd": function(argy) {
			if (argy == null || argy == undefined) {
				return;
			}

			if (thiz.virtualFiles.indexOf(argy) == -1) {
				this.echo("cd: cannot access " + argy + ": Permission denied");
			} else {
				this.echo("cd: cannot access " + argy + ": Not a directory");
			}
		},

		"ls": function(argy) {
			if (argy == null || argy == undefined) {	
				for (var i = 0; i != thiz.virtualFiles.length; i++) {
					this.echo(thiz.virtualFiles[i]);
				}
			} else {
				thiz.listFile(argy, this);
			}
		},

		"cat": function(argy) {
			if (argy == null || argy == undefined) {
				this.echo("Meow! Use `cat <file>` to read a file's contents.");
			} else {
				thiz.readFile(argy, this);
			}
		},

		"touch": function(argy) {
			if (argy == null || argy == undefined) {
				this.echo("Usage: touch <file>");
			} else {
				if (thiz.virtualFiles.indexOf(argy) != -1) {
					return;
				}
				thiz.virtualFiles.push(argy);
			}
		},

		"apt-get": function(argy) {
			this.echo("Remember; this is a simulated LINUX environment. Not a real one.");
		},

		"rm": function(file) {
			if (file == null || file == undefined) {
				this.echo("Usage: rm <file>");
			} else {
				if (thiz.virtualFiles.indexOf(file) == -1) {
					this.echo("rm: cannot access " + file + ": No such file");
				} else {
					// Actually delete the file.
					thiz.virtualFiles.splice(thiz.virtualFiles.indexOf(file), 1);
					delete thiz.virtualFilesContents[file];
				}
			}
		}
	}, {
		greetings: this.terminalGreetingText,
		name: this.terminalName,
		prompt: this.terminalPrompt,
		checkArity: false
	});
}

$(document).ready(function() {
	new CheesyTerminalWrapper().init($("body"))
});