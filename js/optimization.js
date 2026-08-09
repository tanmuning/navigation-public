document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-copy]").forEach(function (button) {
        button.addEventListener("click", function () {
            navigator.clipboard.writeText(button.dataset.copy).then(function () {
                showOptimizationToast("微信号已复制");
            });
        });
    });
});

function showOptimizationToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(function () { toast.classList.remove("show"); }, 1800);
}
