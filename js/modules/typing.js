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

	// Initialize Typed.js with improved configuration
	new Typed(target, {
		strings: phrases,
		typeSpeed: 60,
		backSpeed: 30,
		backDelay: 2500,
		startDelay: 800,
		loop: true,
		loopCount: Infinity,
		showCursor: true,
		cursorChar: "|",
		autoInsertCss: true,
		bindInputFocusEvents: false,
		contentType: 'html',
		// Add error handling
		onComplete: () => {
			console.log('Typing animation completed one cycle');
		},
		onStop: () => {
			console.log('Typing animation stopped');
		},
		onStart: () => {
			console.log('Typing animation started');
		},
		onDestroy: () => {
			console.log('Typing animation destroyed');
		}
	});

	// Debug information
	console.log('Typed.js initialized with target:', target);
	console.log('Phrases array:', phrases);
};
