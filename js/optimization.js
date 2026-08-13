document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-copy]").forEach(function (button) {
        button.addEventListener("click", function () {
            navigator.clipboard.writeText(button.dataset.copy).then(function () {
                showOptimizationToast("微信号已复制");
            });
        });
    });

    document.querySelectorAll("[data-copy-target]").forEach(function (button) {
        button.addEventListener("click", function () {
            const target = document.getElementById(button.dataset.copyTarget);
            if (!target) return;
            copyOptimizationText(target.textContent.trim()).then(function () {
                const original = button.textContent;
                button.textContent = "已复制";
                showOptimizationToast("标题示例已复制");
                window.setTimeout(function () { button.textContent = original; }, 1400);
            });
        });
    });
});

async function copyOptimizationText(text) {
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

function showOptimizationToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(function () { toast.classList.remove("show"); }, 1800);
}
