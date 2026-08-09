// ===============================
// app.js V6
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    initTheme();
    initBackToTop();
    initNavigation();

});


function initTheme() {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    const savedTheme = localStorage.getItem("navigation-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }

    updateThemeButton();

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        localStorage.setItem(
            "navigation-theme",
            isDark ? "dark" : "light"
        );

        updateThemeButton();

    });

}


function updateThemeButton() {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    const isDark = document.body.classList.contains("dark");

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "切换浅色模式" : "切换深色模式"
    );

}


function initBackToTop() {

    const backToTop = document.getElementById("backToTop");

    if (!backToTop) return;

    window.addEventListener("scroll", () => {

        backToTop.classList.toggle(
            "show",
            window.scrollY > 400
        );

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


function initNavigation() {

    const links = document.querySelectorAll(
        ".top-navigation a"
    );

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY;

            const headerOffset = 90;

            window.scrollTo({
                top: targetPosition - headerOffset,
                behavior: "smooth"
            });

        });

    });

}



function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}