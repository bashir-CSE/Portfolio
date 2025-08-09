export function initTypedJS(config) {
  if (typeof Typed === "undefined") {
    console.error("Typed.js is not loaded.");
    return;
  }
  const target = document.querySelector("#typed5") || document.querySelector("#typed-text");
  if (!target) return;

  const phrases = [
    "IT Operations",
    "Data Analysis",
    "Process Automation",
    "ERP",
    "Power BI & Advanced Excel",
  ];

  new Typed(target, {
    strings: phrases,
    typeSpeed: 40,
    backSpeed: 20,
    cursorChar: "_",
    shuffle: true,
    smartBackspace: false,
    backDelay: 1500,
    startDelay: 500,
    loop: true,
  });
}
