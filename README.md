# MD Bashir Ahmed - Personal Portfolio

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

This repository contains the source code for my personal portfolio website. It's a single-page, responsive site built with modern web technologies to showcase my skills, professional experience, and projects as an IT professional.

**Live Demo:** [bashir-cse.github.io/Portfolio/](https://bashir-cse.github.io/Portfolio/)

---

![Portfolio Screenshot](https://via.placeholder.com/900x450.png?text=Add+A+Screenshot+Of+Your+Site+Here)
*A screenshot of the portfolio website's hero section.*

> Note: Legacy references to “Process Automation Scripts” and “Database Management Solutions” have been removed from the site content to better reflect current focus projects.

## ✨ Features

-   **Dynamic Hero Section:** Features an engaging background powered by `particles.js` and a typing effect using `Typed.js` (shuffled phrases) to introduce my professional profile.
-   **Interactive & Accessible Skill Visualizations:** Skill bars and percentage counters animate into view with ARIA updates (role="progressbar", aria-valuenow/min/max).
-   **Seamless Navigation:** Sticky header with `Headroom.js`, active link highlighting, smooth scrolling, and a "Back to Top" button.
-   **Engaging UI:** Subtle fade-in animations via `ScrollReveal.js` and a preloader for a smooth load experience.
-   **Integrated Contact Form:** Fully functional form powered by `EmailJS`.
-   **Modern & Responsive Design:** Tailwind CSS + custom CSS tokens with WCAG AA-compliant buttons and focus-visible styles.

## 🛠️ Tech Stack

-   **Core Technologies:** HTML5, SCSS, JavaScript (ES6+)
-   **Styling Framework:** Tailwind CSS (via CDN)
-   **Iconography:** Font Awesome

## 📚 Libraries Used

-   `particles.js`: For creating the interactive and dynamic background in the hero section.
-   `Typed.js`: Powers the typing animation for text display.
-   `ScrollReveal.js`: Facilitates smooth and subtle fade-in animations for elements as they enter the viewport.
-   `EmailJS`: Enables direct email sending from the contact form without server-side code.
-   `Headroom.js`: Manages the intelligent sticky header behavior, hiding and showing it based on scroll direction.

## 🚀 How to Run Locally

To set up and run this project on your local machine, you will need a live server environment and an SCSS compiler.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/bashir-CSE/Portfolio.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd Portfolio
    ```
3.  **Compile SCSS:**
    -   For VS Code users, the **Live Sass Compiler** extension is recommended (configured in `.vscode/settings.json`).
    -   Click "Watch Sass" in the VS Code status bar to automatically compile `scss/styles.scss` to `css/styles.min.css`.
4.  **Run with a Live Server:**
    -   Use a VS Code extension like **Live Server**.
    -   Right-click `index.html` and select "Open with Live Server". This is crucial for `particles.js` to correctly load its `particles.json` configuration file.

## 🧭 Accessibility

-   Buttons use centralized CSS custom properties with WCAG AA contrast and clear focus-visible rings.
-   Skill bars update ARIA attributes during animation (role="progressbar", aria-valuenow/min/max) and honor `prefers-reduced-motion`.
-   Page scroll progress bar exposes aria-valuenow/min/max for assistive tech.

## ⚙️ Configuration

The contact form functionality relies on EmailJS for sending messages.

1.  Create a `.env` file in the root directory of the project (this file is ignored by Git for security).
2.  Copy the contents from `.env.example` into your newly created `.env` file.
3.  Replace the placeholder values with your actual EmailJS `Public Key`, `Service ID`, and `Template ID`.
4.  **Important Security Note:** Configure the allowed domains in your EmailJS dashboard to only accept requests from your live website URL to prevent unauthorized usage.

## 📫 Contact

Feel free to connect with me through the following channels:

-   **LinkedIn:** [MD Bashir Ahmed](https://www.linkedin.com/in/md-bashir-ahmed-b8b8b8b8/)
-   **GitHub:** [@bashir-CSE](https://github.com/bashir-CSE)
-   **Email:** [babashir8811@gmail.com](mailto:babashir8811@gmail.com)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/bashir-CSE/Portfolio/issues) if you want to contribute.

## 📝 Changelog

-   2025-08-06
    -   Replaced TypeIt with Typed.js (shuffled phrases) in hero.
    -   Standardized button system with centralized tokens; ensured WCAG AA contrast and focus-visible rings.
    -   Implemented accessible skill bars with ARIA attributes and reduced-motion support.
    -   Removed legacy project references: “Process Automation Scripts” and “Database Management Solutions”.
    -   Synced content with updated resume; corrected experience dates and roles.

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.
