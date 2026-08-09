let toastTimer = null;

document.addEventListener("DOMContentLoaded", function () {
    renderSiteInfo();
    renderAnnouncements();
    renderFeaturedPath();
    initHomeServices();
});

function renderSiteInfo() {
    document.title = siteConfig.title;

    const copyright =
        document.getElementById("footerCopyright");

    const footerNotice =
        document.getElementById("footerNoticeText");

    if (copyright) {
        copyright.textContent = siteConfig.copyright;
    }

    if (footerNotice) {
        footerNotice.textContent = siteConfig.footerNotice;
    }
}

function renderAnnouncements() {
    const container =
        document.getElementById("announcementList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    announcements.forEach(function (item) {
        const row = document.createElement("div");

        row.className = "announcement-item";

        const content = document.createElement("div");
        content.className = "announcement-content";

        const titleRow = document.createElement("div");
        titleRow.className = "announcement-title-row";

        const leading = document.createElement("div");
        leading.className = "announcement-leading";

        if (item.pinned) {
            const pinned = document.createElement("span");

            pinned.className = "announcement-badge pinned";
            pinned.textContent = "置顶";

            leading.appendChild(pinned);
        }

        if (item.isNew) {
            const newBadge = document.createElement("span");

            newBadge.className = "announcement-badge new";
            newBadge.textContent = "NEW";

            titleRow.appendChild(newBadge);
        }

        const title = document.createElement("strong");

        title.textContent = item.title;

        titleRow.appendChild(title);
        content.appendChild(titleRow);

        const date = document.createElement("time");

        date.className = "announcement-date";
        date.textContent = item.date;

        row.appendChild(leading);
        row.appendChild(date);
        row.appendChild(content);

        const arrow = document.createElement("span");
        arrow.className = "announcement-arrow";
        arrow.textContent = "›";
        row.appendChild(arrow);

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

    function togglePanel(panel) {
        if (!panel) return;
        const willOpen = panel.hidden;
        document.querySelectorAll(".service-detail-panel").forEach(function (item) {
            item.hidden = true;
        });
        panel.hidden = !willOpen;
        if (willOpen) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    if (pathToggle) pathToggle.addEventListener("click", function () { togglePanel(pathPanel); });
    document.querySelectorAll("[data-copy]").forEach(function (item) {
        item.addEventListener("click", function () { copyText(item.dataset.copy); });
    });

    document.querySelectorAll(".pending-service").forEach(function (item) {
        item.addEventListener("click", function () { showToast("内容正在完善中"); });
    });
}

function renderFeaturedPath() {
    const container =
        document.getElementById("featuredPath");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const heading = createSectionTitle(featuredPath.title);

    const list = document.createElement("div");
    list.className = "featured-path-list";
    list.id = "featuredPathList";

    const toggleButton = document.createElement("button");
    toggleButton.className = "featured-path-toggle";
    toggleButton.type = "button";
    toggleButton.setAttribute("aria-controls", list.id);
    toggleButton.setAttribute("aria-expanded", "true");
    toggleButton.setAttribute("aria-label", "收起上款路径");
    toggleButton.title = "收起上款路径";
    toggleButton.innerHTML = '<span class="featured-path-toggle-icon" aria-hidden="true"></span>';

    heading.classList.add("featured-path-title-row");
    heading.appendChild(toggleButton);

    toggleButton.addEventListener("click", function () {
        const willCollapse = !list.hidden;
        list.hidden = willCollapse;
        toggleButton.classList.toggle("is-collapsed", willCollapse);
        toggleButton.setAttribute("aria-expanded", String(!willCollapse));
        toggleButton.setAttribute(
            "aria-label",
            willCollapse ? "展开上款路径" : "收起上款路径"
        );
        toggleButton.title = willCollapse ? "展开上款路径" : "收起上款路径";
    });

    (featuredPath.items || []).forEach(function (item) {
        const row = document.createElement("div");
        row.className = "featured-path-row";

        const category = document.createElement("span");
        category.className = "featured-path-category";
        category.textContent = item.category;

        const pathWrap = document.createElement("div");
        pathWrap.className = "featured-path-value";

        if (item.exempt) {
            const exempt = document.createElement("span");
            exempt.className = "featured-path-exempt";
            exempt.textContent = "免审";
            pathWrap.appendChild(exempt);
        }

        const breadcrumb = document.createElement("div");
        breadcrumb.className = "featured-path-breadcrumb";

        item.path.split(" > ").forEach(function (segment, index, segments) {
            const segmentText = document.createElement("span");
            segmentText.className = "featured-path-segment";
            segmentText.textContent = segment;
            breadcrumb.appendChild(segmentText);

            if (index < segments.length - 1) {
                const separator = document.createElement("span");
                separator.className = "featured-path-separator";
                separator.textContent = "›";
                breadcrumb.appendChild(separator);
            }
        });

        pathWrap.appendChild(breadcrumb);

        const button = document.createElement("button");
        button.className = "featured-path-copy";
        button.type = "button";
        button.textContent = "复制";
        button.setAttribute("aria-label", "复制" + item.category + "路径");

        button.addEventListener("click", function () {
            copyText(item.path);
            button.textContent = "已复制";
            button.classList.add("is-copied");

            window.setTimeout(function () {
                button.textContent = "复制";
                button.classList.remove("is-copied");
            }, 1400);
        });

        row.appendChild(category);
        row.appendChild(pathWrap);
        row.appendChild(button);
        list.appendChild(row);
    });

    container.appendChild(heading);
    container.appendChild(list);
}

function renderDirectories() {
    const container =
        document.getElementById("directoryContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const contactCategory = navigationData.find(
        function (category) {
            return category.layout === "cards";
        }
    );

    const listCategories = navigationData.filter(
        function (category) {
            return category.layout === "list";
        }
    );

    if (contactCategory) {
        container.appendChild(
            createContactSection(contactCategory)
        );
    }

    const listGrid = document.createElement("div");

    listGrid.className = "list-section-grid";

    listCategories.forEach(function (category) {
        listGrid.appendChild(
            createListSection(category)
        );
    });

    container.appendChild(listGrid);
}

function createContactSection(category) {
    const section = document.createElement("section");

    section.className = "directory-section contact-section";
    section.id = category.id;

    const heading = createSectionTitle(category.title);
    const grid = document.createElement("div");

    grid.className = "contact-grid";

    category.items.forEach(function (item) {
        if (item.layout === "wide") {
            grid.appendChild(createContactWideRow(item));
            return;
        }

        const card = document.createElement("article");

        card.className = "contact-card contact-card-" + item.action.type;
        card.tabIndex = 0;

        card.innerHTML = `
    <div class="contact-card-icon">
        ${item.icon}
    </div>

    <div class="contact-card-body">

        <h3>
            ${item.title}
        </h3>

        <p class="contact-card-subtitle">
            ${item.subtitle || ""}
        </p>

        <button
            class="contact-action-button"
            type="button"
        >
            ${item.buttonText}
        </button>

    </div>
`;

        card.addEventListener("click", function (event) {
            if (
                event.target.classList.contains(
                    "contact-action-button"
                )
            ) {
                return;
            }

            executeAction(item.action);
        });

        const button = card.querySelector(
            ".contact-action-button"
        );

        button.addEventListener("click", function () {
            executeAction(item.action);
        });

        grid.appendChild(card);
    });

    section.appendChild(heading);
    section.appendChild(grid);

    return section;
}

function createContactWideRow(item) {
    const row = document.createElement("article");
    row.className = "contact-wide-row contact-wide-" + item.kind;

    if (item.kind === "onboarding") {
        const content = document.createElement("div");
        content.className = "contact-wide-content onboarding-content";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const details = document.createElement("div");
        details.className = "onboarding-details";

        const linkGroup = document.createElement("div");
        linkGroup.className = "contact-detail-group";

        const linkLabel = document.createElement("span");
        linkLabel.className = "contact-detail-label";
        linkLabel.textContent = item.linkLabel + "：";

        const link = document.createElement("a");
        link.className = "contact-onboarding-link";
        link.href = item.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = item.link;

        linkGroup.appendChild(linkLabel);
        linkGroup.appendChild(link);

        const codeGroup = document.createElement("div");
        codeGroup.className = "contact-detail-group";

        const codeLabel = document.createElement("span");
        codeLabel.className = "contact-detail-label";
        codeLabel.textContent = item.codeLabel + "：";

        const code = document.createElement("strong");
        code.className = "contact-invite-code";
        code.textContent = item.code;

        codeGroup.appendChild(codeLabel);
        codeGroup.appendChild(code);
        details.appendChild(linkGroup);
        details.appendChild(codeGroup);
        content.appendChild(title);
        content.appendChild(details);

        const actions = document.createElement("div");
        actions.className = "contact-wide-actions";

        const openButton = document.createElement("button");
        openButton.className = "contact-wide-button primary";
        openButton.type = "button";
        openButton.textContent = "打开链接";
        openButton.addEventListener("click", function () {
            window.open(item.link, "_blank", "noopener,noreferrer");
        });

        const copyButton = document.createElement("button");
        copyButton.className = "contact-wide-button";
        copyButton.type = "button";
        copyButton.textContent = "复制邀请码";
        copyButton.addEventListener("click", function () {
            copyText(item.code);
        });

        actions.appendChild(openButton);
        actions.appendChild(copyButton);
        row.appendChild(content);
        row.appendChild(actions);
        return row;
    }

    const content = document.createElement("div");
    content.className = "contact-wide-content address-content";

    const title = document.createElement("h3");
    title.textContent = item.title;
    content.appendChild(title);

    (item.lines || []).forEach(function (line) {
        const text = document.createElement("p");
        text.textContent = line;
        content.appendChild(text);
    });

    const copyButton = document.createElement("button");
    copyButton.className = "contact-wide-button primary";
    copyButton.type = "button";
    copyButton.textContent = "复制完整地址";
    copyButton.addEventListener("click", function () {
        copyText(item.copyValue);
    });

    row.appendChild(content);
    row.appendChild(copyButton);
    return row;
}

function createListSection(category) {
    const section = document.createElement("section");

    section.className = "list-section";
    section.id = category.id;

    const heading = document.createElement("h2");

    heading.className = "list-section-title";
    heading.textContent = category.title;

    const list = document.createElement("div");

    list.className = "navigation-list";

    category.items.forEach(function (item) {
        const button = document.createElement("button");

        button.className = "navigation-list-item";
        button.type = "button";

        button.innerHTML = `
            <span>${item.title}</span>
            <span class="navigation-list-arrow">›</span>
        `;

        button.addEventListener("click", function () {
            executeAction(item.action);
        });

        list.appendChild(button);
    });

    section.appendChild(heading);
    section.appendChild(list);

    return section;
}

function createSectionTitle(titleText) {
    const heading = document.createElement("div");

    heading.className = "category-heading";

    const title = document.createElement("h2");

    title.textContent = titleText;

    heading.appendChild(title);

    return heading;
}

function executeAction(action) {
    if (!action || !action.type) {
        showToast("暂时没有可用操作");
        return;
    }

    switch (action.type) {
        case "copy":
            copyText(action.value);
            break;

        case "phone":
            window.location.href =
                "tel:" + action.value;
            break;

        case "link":
            if (!action.value) {
                showToast("链接暂未配置");
                return;
            }

            window.open(
                action.value,
                "_blank",
                "noopener,noreferrer"
            );
            break;

        default:
            showToast("暂不支持这个操作");
    }
}

async function copyText(text) {
    if (!text) {
        showToast("复制内容为空");
        return;
    }

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
