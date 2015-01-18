window.include = function(url) {
	var elem = document.createElement("script");
	elem.src = url;
	document.head.appendChild(elem);
}

window.loadDelay = 500;

<<<<<<< HEAD
window.loadContent = function(url) {
	$("#content").fadeOut(loadDelay, function() {
		$("#content").load(url);
		$("#content").fadeIn(loadDelay);
	});
}

$(document).ready(function() {
	// Load the sidebar.
	// We keep this in a seperate page.
	$("#sidebar").load("inc/sidebar.html", function() {

		$("#link_aboutme").click(function() {
			loadContent("inc/pages/aboutme.html");
		});
=======
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
>>>>>>> parent of 9a8db60... :mans_shoe: Add man and fake GCC

		$("#link_addons").click(function() {
			loadContent("inc/pages/addons.html");
		});

		$("#link_fonts").click(function() {
			loadContent("inc/pages/fonts.html");
		});

		$("#link_programming").click(function() {
			loadContent("inc/pages/programming.html");
		});
	});
});