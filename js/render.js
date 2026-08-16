let toastTimer = null;

document.addEventListener("DOMContentLoaded", function () {
    renderSiteInfo();
    renderAnnouncements();
    renderFeaturedPath();
    initHomeServices();
});

function renderSiteInfo() {
    document.title = siteConfig.title;

    const copyright = document.getElementById("footerCopyright");
    const footerNotice = document.getElementById("footerNoticeText");
    if (copyright) copyright.textContent = siteConfig.copyright;
    if (footerNotice) footerNotice.textContent = siteConfig.footerNotice;
}

function renderAnnouncements() {
    const container = document.getElementById("announcementList");
    if (!container) return;

    container.replaceChildren();

    announcements.forEach(function (item) {
        const row = document.createElement("div");
        row.className = "announcement-item";

        const leading = document.createElement("div");
        leading.className = "announcement-leading";
        if (item.pinned) {
            const pinned = document.createElement("span");
            pinned.className = "announcement-badge pinned";
            pinned.textContent = "置顶";
            leading.appendChild(pinned);
        }

        const date = document.createElement("time");
        date.className = "announcement-date";
        date.textContent = item.date;

        const status = document.createElement("div");
        status.className = "announcement-status";
        if (item.isNew) {
            const badge = document.createElement("span");
            badge.className = "announcement-badge new";
            badge.textContent = "NEW";
            status.appendChild(badge);
        }

        const content = document.createElement("div");
        content.className = "announcement-content";

        const titleRow = document.createElement("div");
        titleRow.className = "announcement-title-row";
        const title = document.createElement("strong");
        title.textContent = item.title;
        titleRow.appendChild(title);
        content.appendChild(titleRow);

        const arrow = document.createElement("span");
        arrow.className = "announcement-arrow";
        arrow.textContent = "›";

        row.append(leading, date, status, content, arrow);

        if (item.action) {
            row.classList.add("is-clickable");
            row.tabIndex = 0;
            row.addEventListener("click", function () {
                executeAction(item.action);
            });
            row.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    executeAction(item.action);
                }
            });
        }

        container.appendChild(row);
    });
}

function initHomeServices() {
    const pathToggle = document.getElementById("pathToggle");
    const pathPanel = document.getElementById("featuredPath");
    const faqToggle = document.getElementById("faqToggle");
    const faqPanel = document.getElementById("faqPanel");

    if (pathToggle && pathPanel) {
        pathToggle.setAttribute("aria-expanded", String(!pathPanel.hidden));
        pathToggle.addEventListener("click", function () {
            const willOpen = pathPanel.hidden;
            document.querySelectorAll(".service-detail-panel").forEach(function (panel) {
                panel.hidden = true;
            });
            pathPanel.hidden = !willOpen;
            pathToggle.setAttribute("aria-expanded", String(willOpen));
            if (faqToggle) faqToggle.setAttribute("aria-expanded", "false");
            if (willOpen) pathPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
    }

    if (faqToggle && faqPanel) {
        faqToggle.setAttribute("aria-expanded", String(!faqPanel.hidden));
        faqToggle.addEventListener("click", function () {
            const willOpen = faqPanel.hidden;
            document.querySelectorAll(".service-detail-panel").forEach(function (panel) {
                panel.hidden = true;
            });
            faqPanel.hidden = !willOpen;
            faqToggle.setAttribute("aria-expanded", String(willOpen));
            if (pathToggle) pathToggle.setAttribute("aria-expanded", "false");
            if (willOpen) faqPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
    }

    document.querySelectorAll("[data-copy]").forEach(function (button) {
        button.addEventListener("click", function () {
            copyText(button.dataset.copy);
        });
    });

}

function renderFeaturedPath() {
    const container = document.getElementById("featuredPath");
    if (!container) return;

    const heading = createSectionTitle(featuredPath.title);
    heading.classList.add("featured-path-title-row");

    const list = document.createElement("div");
    list.className = "featured-path-list";
    list.id = "featuredPathList";

    const createGoodsLink = document.createElement("a");
    createGoodsLink.className = "featured-path-create-link";
    createGoodsLink.href = "https://agentseller.temu.com/goods/create/category";
    createGoodsLink.target = "_blank";
    createGoodsLink.rel = "noopener noreferrer";
    createGoodsLink.innerHTML = "<span><strong>新建商品</strong><small>进入 TEMU 商品创建页面</small></span><i>打开页面 ↗</i>";

    const toggle = document.createElement("button");
    toggle.className = "featured-path-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-controls", list.id);
    toggle.innerHTML = '<span class="featured-path-toggle-icon" aria-hidden="true"></span>';
    setPathToggleState(toggle, false);
    toggle.addEventListener("click", function () {
        const collapse = !list.hidden;
        list.hidden = collapse;
        setPathToggleState(toggle, collapse);
    });
    heading.appendChild(toggle);

    featuredPath.items.forEach(function (item) {
        const row = document.createElement("div");
        row.className = "featured-path-row";

        const category = document.createElement("span");
        category.className = "featured-path-category";
        category.textContent = item.category;

        const value = document.createElement("div");
        value.className = "featured-path-value";
        if (item.exempt) {
            const exempt = document.createElement("span");
            exempt.className = "featured-path-exempt";
            exempt.textContent = "免审";
            value.appendChild(exempt);
        }

        const breadcrumb = document.createElement("div");
        breadcrumb.className = "featured-path-breadcrumb";
        item.path.split(" > ").forEach(function (segment, index, segments) {
            const text = document.createElement("span");
            text.className = "featured-path-segment";
            text.textContent = segment;
            breadcrumb.appendChild(text);
            if (index < segments.length - 1) {
                const separator = document.createElement("span");
                separator.className = "featured-path-separator";
                separator.textContent = "›";
                breadcrumb.appendChild(separator);
            }
        });
        value.appendChild(breadcrumb);

        const copy = document.createElement("button");
        copy.className = "featured-path-copy";
        copy.type = "button";
        copy.textContent = "复制";
        copy.setAttribute("aria-label", "复制" + item.category + "路径");
        copy.addEventListener("click", function () {
            copyText(item.path);
            copy.textContent = "已复制";
            copy.classList.add("is-copied");
            window.setTimeout(function () {
                copy.textContent = "复制";
                copy.classList.remove("is-copied");
            }, 1400);
        });

        row.append(category, value, copy);
        list.appendChild(row);
    });

    container.replaceChildren(heading, createGoodsLink, list);
}

function setPathToggleState(button, collapsed) {
    button.classList.toggle("is-collapsed", collapsed);
    button.setAttribute("aria-expanded", String(!collapsed));
    button.setAttribute("aria-label", collapsed ? "展开上款路径" : "收起上款路径");
    button.title = collapsed ? "展开上款路径" : "收起上款路径";
}

function createSectionTitle(text) {
    const heading = document.createElement("div");
    heading.className = "category-heading";
    const title = document.createElement("h2");
    title.textContent = text;
    heading.appendChild(title);
    return heading;
}

function executeAction(action) {
    if (!action || action.type !== "link" || !action.value) {
        showToast("链接暂未配置");
        return;
    }
    window.location.href = action.value;
}

async function copyText(text) {
    if (!text) return;
    try {
        await navigator.clipboard.writeText(text);
        showToast("复制成功");
    } catch (error) {
        fallbackCopyText(text);
    }
}

function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand("copy");
        showToast("复制成功");
    } catch (error) {
        showToast("复制失败，请手动复制");
    }

    textarea.remove();
}
