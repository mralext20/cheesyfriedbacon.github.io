window.include = function(url) {
	var elem = document.createElement("script");
	elem.src = url;
	document.head.appendChild(elem);
}

window.loadDelay = 500;

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