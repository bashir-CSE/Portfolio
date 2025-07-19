# MD Bashir Ahmed - Personal Portfolio

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

This repository contains the source code for my personal portfolio website. It's a single-page, responsive site built with HTML, SCSS, and JavaScript to showcase my skills, professional experience, and projects.

**Live Demo:** [bashir-cse.github.io/Portfolio/](https://bashir-cse.github.io/Portfolio/)

---

![Portfolio Screenshot](https://via.placeholder.com/900x450.png?text=Add+A+Screenshot+Of+Your+Site+Here)
*A screenshot of the portfolio website's hero section.*

## ✨ Features

-   **Interactive Hero:** Dynamic background powered by `particles.js` and an animated typing effect with `Typed.js`.
-   **Animated Skills:** Skill bars and percentage counters animate into view when scrolled to.
-   **Smooth Navigation:** A sticky header with active link highlighting and a "Back to Top" button.
-   **Engaging UI:** Subtle fade-in animations on scroll using `AOS` and a page load preloader.
-   **Functional Contact Form:** Integrated with EmailJS for direct messaging capabilities.
-   **Modern & Responsive:** Built with Tailwind CSS and SCSS for a clean, fully responsive design.

## 🛠️ Tech Stack

-   **Frontend:** HTML5, SCSS, JavaScript (ES6+)
-   **Styling:** Tailwind CSS (via CDN) & Custom SCSS
-   **JavaScript Libraries:**
    -   `particles.js` for the hero background.
    -   `Typed.js` for the typing animation.
    -   `AOS` (Animate On Scroll) for scroll animations.
    -   `EmailJS` for the contact form.
-   **Icons:** Font Awesome

## 🚀 How to Run Locally

To run this project locally, you'll need a live server and an SCSS compiler.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/bashir-CSE/Portfolio.git
    ```
2.  **Navigate to the directory:**
    ```sh
    cd Portfolio
    ```
3.  **Compile SCSS:**
    -   The easiest way is to use the **Live Sass Compiler** extension for VS Code (which is configured in your `.vscode/settings.json`).
    -   Click "Watch Sass" in the bottom status bar to automatically compile `scss/styles.scss` to `css/styles.min.css`.
4.  **Run with a Live Server:**
    -   Use an extension like **Live Server** for VS Code.
    -   Right-click `index.html` and select "Open with Live Server". This is required for `particles.js` to load the `particles.json` configuration file.

## ⚙️ Configuration

The contact form requires credentials from EmailJS.

1.  Create a `.env` file in the root directory (this is ignored by Git).
2.  Copy the contents of `.env.example` into your new `.env` file.
3.  Replace the placeholder values with your actual EmailJS `Public Key`, `Service ID`, and `Template ID`.
4.  **Important:** For security, configure the allowed domains in your EmailJS dashboard to only accept requests from your live website URL.

## 📫 Contact

-   **LinkedIn:** MD Bashir Ahmed
-   **GitHub:** @bashir-CSE
-   **Email:** babashir8811@gmail.com