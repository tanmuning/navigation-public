// ===============================
// app.js V6
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    initBackToTop();
    initNavigation();

});


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

            if (link.hasAttribute("data-open-path")) {
                const pathPanel = document.getElementById("featuredPath");
                const pathToggle = document.getElementById("pathToggle");
                if (pathPanel) pathPanel.hidden = false;
                if (pathToggle) pathToggle.setAttribute("aria-expanded", "true");
            }

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
