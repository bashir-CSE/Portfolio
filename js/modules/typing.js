export const initTyping = () => {
	const target = document.getElementById("typed5");
	if (!target) return;

	const phrases = [
		"IT Support",
		"Data Analysis",
		"Process Automation",
		"ERP & MIS",
		"Data Visualization",
		"Power BI & Advanced Excel",
	];

	new Typed(target, {
		strings: phrases,
		typeSpeed: 50,
		backSpeed: 25,
		backDelay: 2000,
		startDelay: 500,
		loop: true,
		showCursor: true,
		cursorChar: "|",
	});
};
