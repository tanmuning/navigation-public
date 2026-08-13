document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-copy-target]").forEach(function (button) {
        button.addEventListener("click", function () {
            const target = document.getElementById(button.dataset.copyTarget);
            if (!target) return;
            copyVisualText(target.textContent.trim()).then(function () {
                const original = button.textContent;
                button.textContent = "已复制";
                showVisualToast("AI指令已复制");
                window.setTimeout(function () { button.textContent = original; }, 1400);
            });
        });
    });
});

async function copyVisualText(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    }
}

function showVisualToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(function () { toast.classList.remove("show"); }, 1800);
}
