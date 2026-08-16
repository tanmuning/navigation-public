document.addEventListener("DOMContentLoaded", async function () {
    const galleryKey = new URLSearchParams(window.location.search).get("category");
    const gallery = recommendationGalleries[galleryKey];

    if (!gallery) {
        renderGalleryError();
        return;
    }

    document.title = gallery.title + " - " + siteConfig.title;

    const title = document.getElementById("galleryTitle");
    const count = document.getElementById("galleryCount");
    const grid = document.getElementById("galleryGrid");
    const empty = document.getElementById("galleryEmpty");

    title.textContent = gallery.title;
    count.textContent = "正在加载图片…";

    initLightbox();
    initGalleryContact(gallery);
    renderPriorityGuide(gallery);

    try {
        if (gallery.sections) {
            const sectionResults = await Promise.all(
                gallery.sections.map(async function (section) {
                    return {
                        title: section.title,
                        images: await loadGalleryImages(section.folder),
                        items: section.items || []
                    };
                })
            );

            const totalCount = sectionResults.reduce(function (total, section) {
                return total + Math.max(section.images.length, section.items.length);
            }, 0);

            count.textContent = totalCount + (gallery.sections.some(function (section) {
                return section.items?.length;
            }) ? " 项推荐" : " 张图片");
            grid.className = "gallery-section-list";
            sectionResults.forEach(function (section) {
                renderGallerySection(grid, gallery, section);
            });
            return;
        }

        const images = await loadGalleryImages(gallery.folder);

        count.textContent = images.length + " 张图片";

        if (!images.length) {
            empty.hidden = false;
            grid.hidden = true;
            return;
        }

        balanceGalleryGrid(grid, images.length);
        images.forEach(function (item, index) {
            renderGalleryCard(grid, gallery, item, index);
        });
    } catch (error) {
        count.textContent = "加载失败";
        empty.querySelector("strong").textContent = "图片暂时无法加载";
        empty.querySelector("p").textContent = "请检查网络，或确认图片已经推送到 GitHub。";
        empty.hidden = false;
        grid.hidden = true;
    }
});

function renderGallerySection(container, gallery, section) {
    const sectionElement = document.createElement("section");
    sectionElement.className = "gallery-category-section";

    const heading = document.createElement("div");
    heading.className = "gallery-category-heading";

    const title = document.createElement("h2");
    title.textContent = section.title;

    const count = document.createElement("span");
    const cardCount = Math.max(section.images.length, section.items.length);
    count.textContent = cardCount + " 项";

    heading.appendChild(title);
    heading.appendChild(count);
    sectionElement.appendChild(heading);

    if (!cardCount) {
        const empty = document.createElement("p");
        empty.className = "gallery-section-empty";
        empty.textContent = "该板块暂未添加图片";
        sectionElement.appendChild(empty);
    } else {
        const grid = document.createElement("div");
        grid.className = "gallery-grid";
        balanceGalleryGrid(grid, cardCount);
        for (let index = 0; index < cardCount; index += 1) {
            const definition = section.items[index];
            const image = section.images[index];
            if (image) {
                renderGalleryCard(grid, gallery, image, index, definition);
            } else if (definition) {
                renderPlaceholderCard(grid, definition, index);
            }
        }
        sectionElement.appendChild(grid);
    }

    container.appendChild(sectionElement);
}

function balanceGalleryGrid(grid, imageCount) {
    grid.classList.toggle(
        "gallery-grid-balanced",
        imageCount > 5 && imageCount % 5 === 1
    );
}

async function loadGalleryImages(folder) {
    const normalizedFolder = "/" + folder.replace(/^\/+|\/+$/g, "") + "/";

    return Array.from(document.querySelectorAll("[data-gallery-image]"))
        .filter(function (item) {
            return item.dataset.path.startsWith(normalizedFolder);
        })
        .map(function (item) {
            return {
                type: "file",
                name: item.dataset.name,
                download_url: item.dataset.url
            };
        })
        .sort(function (left, right) {
            return left.name.localeCompare(right.name, "zh-CN", {
                numeric: true,
                sensitivity: "base"
            });
        });
}

function renderGalleryCard(grid, gallery, item, index, definition) {
    const card = document.createElement("button");
    card.className = "gallery-card";
    card.type = "button";

    const displayName = item.name.replace(/\.[^.]+$/, "");
    const tags = [];
    const nameWithoutTags = displayName.replace(
        /【([^【】]+)】|\[([^\[\]]+)\]/g,
        function (match, fullWidthTag, squareTag) {
            const tag = (fullWidthTag || squareTag).trim();

            if (tag && !tags.includes(tag)) {
                tags.push(tag);
            }

            return "";
        }
    );
    const cleanName = nameWithoutTags
        .replace(/^\d+(?:\s*[-_—–.、]\s*|\s+)/, "")
        .replace(/^[-_·@\s]+|[-_·@\s]+$/g, "")
        .trim();
    const keywordSeparatorIndex = gallery.showKeywords
        ? cleanName.search(/[：:]/)
        : -1;
    const imageTitle = definition?.title || (
        keywordSeparatorIndex >= 0
            ? cleanName.slice(0, keywordSeparatorIndex)
            : cleanName
    ).trim() || "参考款式 " + (index + 1);
    const keywords = keywordSeparatorIndex >= 0
        ? cleanName
            .slice(keywordSeparatorIndex + 1)
            .split(/[、,，@]/)
            .map(function (keyword) {
                return keyword.trim();
            })
            .filter(Boolean)
        : [];
    card.setAttribute("aria-label", "查看" + imageTitle);

    const image = document.createElement("img");
    image.src = item.download_url;
    image.alt = gallery.title + " - " + imageTitle;
    image.loading = "lazy";

    const info = document.createElement("span");
    info.className = "gallery-card-info";

    const titleRow = document.createElement("span");
    titleRow.className = "gallery-card-title-row";

    const itemTitle = document.createElement("strong");
    itemTitle.textContent = imageTitle;
    titleRow.appendChild(itemTitle);

    if (definition?.tag && !tags.includes(definition.tag)) tags.push(definition.tag);

    if (tags.length) {
        const tagList = document.createElement("span");
        tagList.className = "gallery-card-tags";

        tags.forEach(function (tag) {
            const badge = document.createElement("em");
            badge.className = "gallery-tag-badge";
            badge.textContent = tag;
            tagList.appendChild(badge);
        });

        titleRow.appendChild(tagList);
    }

    info.appendChild(titleRow);

    if (keywords.length) {
        const keywordText = document.createElement("small");
        keywordText.className = "gallery-card-keywords";
        keywordText.textContent = keywords.join(" · ");
        info.appendChild(keywordText);
    }

    card.appendChild(image);
    card.appendChild(info);
    card.addEventListener("click", function () {
        openLightbox(image.src, image.alt);
    });
    grid.appendChild(card);
}

function renderPlaceholderCard(grid, definition, index) {
    const card = document.createElement("article");
    card.className = "gallery-card gallery-placeholder-card";

    const image = document.createElement("div");
    image.className = "gallery-placeholder-image";
    image.setAttribute("aria-label", "待替换图片 " + (index + 1));
    image.innerHTML = "<span>待替换图片</span><small>建议文件名：" + String(index + 1).padStart(2, "0") + "-" + definition.title + ".jpg</small>";

    const info = document.createElement("span");
    info.className = "gallery-card-info";
    const row = document.createElement("span");
    row.className = "gallery-card-title-row";
    const title = document.createElement("strong");
    title.textContent = definition.title;
    const tags = document.createElement("span");
    tags.className = "gallery-card-tags";
    const tag = document.createElement("em");
    tag.className = "gallery-tag-badge";
    tag.textContent = definition.tag;
    tags.appendChild(tag);
    row.append(title, tags);
    info.appendChild(row);
    card.append(image, info);
    grid.appendChild(card);
}

function renderPriorityGuide(gallery) {
    if (!gallery.priorityGuide) return;
    const heading = document.querySelector(".gallery-heading");
    const guide = document.createElement("p");
    guide.className = "gallery-priority-guide";
    guide.textContent = gallery.priorityGuide;
    heading.insertAdjacentElement("afterend", guide);
}

function renderGalleryError() {
    const title = document.getElementById("galleryTitle");
    const empty = document.getElementById("galleryEmpty");
    title.textContent = "图片分类不存在";
    document.getElementById("galleryCount").textContent = "";
    empty.querySelector("strong").textContent = "未找到该推荐分类";
    empty.querySelector("p").textContent = "请返回开款推荐并重新选择分类。";
    empty.hidden = false;
}

function openLightbox(src, alt) {
    const lightbox = document.getElementById("galleryLightbox");
    const image = lightbox.querySelector("img");
    image.src = src;
    image.alt = alt;
    lightbox.hidden = false;
    document.body.classList.add("gallery-modal-open");
}

function closeLightbox() {
    const lightbox = document.getElementById("galleryLightbox");
    lightbox.hidden = true;
    document.body.classList.remove("gallery-modal-open");
}

function initLightbox() {
    const lightbox = document.getElementById("galleryLightbox");
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox || event.target.closest(".gallery-lightbox-close")) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !lightbox.hidden) {
            closeLightbox();
        }
    });
}

function initGalleryContact(gallery) {
    const banner = document.getElementById("galleryContactBanner");
    const button = document.getElementById("galleryWechatCopy");

    if (!gallery.showContact || !siteConfig.recommendationContact) {
        return;
    }

    const contact = siteConfig.recommendationContact;
    document.getElementById("galleryContactName").textContent = contact.name;
    button.dataset.copy = contact.wechat;
    button.innerHTML = contact.wechat + " <span>复制微信</span>";
    banner.hidden = false;

    const originalText = button.innerHTML;

    button.addEventListener("click", async function () {
        const text = button.dataset.copy;

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

        button.textContent = "已复制 ✓";
        button.classList.add("is-copied");

        window.setTimeout(function () {
            button.innerHTML = originalText;
            button.classList.remove("is-copied");
        }, 1500);
    });
}
