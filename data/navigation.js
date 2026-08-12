const siteConfig = {
    title: "叹木宁商家工作台",
    copyright: "© 2026 叹木宁商家工作台",
    footerNotice: "本网站分享的内容仅供参考，不构成任何法律意见或建议",
    recommendationContact: {
        name: "叹木宁",
        wechat: "tanmuning-277"
    }
};

const featuredPath = {
    title: "上款路径",
    description: "点击每行右侧按钮，可单独复制对应的完整路径。",
    items: [
        {
            category: "正装西装",
            path: "服装、鞋靴和珠宝饰品 > 男士时尚 > 男装 > 男装西服 > 男士西服单品 > 男装西服上装"
        },
        {
            category: "休闲西装",
            path: "服装、鞋靴和珠宝饰品 > 男士时尚 > 男装 > 男装西服 > 男装休闲西装"
        },
        {
            category: "正装西裤",
            exempt: true,
            path: "服装、鞋靴和珠宝饰品 > 男士时尚 > 男装 > 男装西服 > 男士西服单品 > 男装西裤"
        },
        {
            category: "休闲西裤",
            exempt: true,
            path: "服装、鞋靴和珠宝饰品 > 男士时尚 > 男装 > 男装长裤 > 男士正装裤"
        },
        {
            category: "正装衬衫",
            path: "服装、鞋靴和珠宝饰品 > 男士时尚 > 男装 > 男装上衣、T恤、衬衫 > 男装正装衬衫"
        },
        {
            category: "西装马甲",
            path: "服装、鞋靴和珠宝饰品 > 男士时尚 > 男装 > 男装西服 > 男装西装马甲"
        },
        {
            category: "西装套装",
            path: "服装、鞋靴和珠宝饰品 > 男士时尚 > 男装 > 男装西服 > 男装西服套装"
        },
        {
            category: "燕尾服",
            path: "服装、鞋靴和珠宝饰品 > 男士时尚 > 男装 > 男装西服 > 男装燕尾服套装"
        },
        {
            category: "燕尾服",
            path: "服装、鞋靴和珠宝饰品 > 男士时尚 > 男装 > 男装上衣、T恤、衬衫 > 男士燕尾服衬衫"
        }
    ]
};

const announcements = [
    {
        title: "【西装套装快速恢复美国/欧盟站点加站事宜】",
        date: "2026-07-17",
        pinned: true,
        isNew: true,
        action: {
            type: "link",
            value: "notice-suit-restoration.html"
        }
    },
    {
        title: "美国 GCC 豁免操作",
        date: "2026-07-19",
        pinned: false,
        isNew: true,
        action: {
            type: "link",
            value: "notice-gcc-exemption.html"
        }
    }
];

/* 开款图片由 GitHub Pages 自动生成清单，无需登记文件名。 */
const recommendationGalleries = {
    suit: {
        title: "正装上装",
        showContact: true,
        showKeywords: true,
        sections: [
            { title: "推荐开发方向", folder: "assets/recommendations/suit/development" },
            { title: "推荐颜色", folder: "assets/recommendations/suit/colors" },
            { title: "推荐面料 / 纹样", folder: "assets/recommendations/suit/fabrics" },
            { title: "推荐细节", folder: "assets/recommendations/suit/details" }
        ]
    },
    suitSet: {
        title: "正装套装",
        showContact: true,
        priorityGuide: "推荐等级用于判断开发顺序：核心基础优先备款，趋势重点优先测试，差异化方向控制数量，谨慎开发建议小量验证。",
        sections: [
            {
                title: "推荐套装组合",
                folder: "assets/recommendations/suit-set/01-combinations",
                items: [
                    { title: "西装＋西裤", tag: "核心基础" },
                    { title: "马甲＋西裤", tag: "差异化方向" },
                    { title: "西装＋马甲＋西裤", tag: "趋势重点" }
                ]
            },
            {
                title: "推荐开款方向",
                folder: "assets/recommendations/suit-set/02-development",
                items: [
                    { title: "经典商务套装", tag: "核心基础" },
                    { title: "轻商务通勤套装", tag: "核心基础" },
                    { title: "婚礼宴会套装", tag: "趋势重点" },
                    { title: "复古绅士套装", tag: "差异化方向" },
                    { title: "夏季轻量套装", tag: "季节重点" }
                ]
            },
            {
                title: "推荐整体版型",
                folder: "assets/recommendations/suit-set/03-fit",
                items: [
                    { title: "标准合体套装", tag: "核心基础" },
                    { title: "修身套装", tag: "核心基础" },
                    { title: "宽松直身套装", tag: "趋势重点" },
                    { title: "上合体＋下宽松", tag: "趋势重点" },
                    { title: "高腰复古套装", tag: "差异化方向" }
                ]
            },
            {
                title: "推荐成套视觉",
                folder: "assets/recommendations/suit-set/04-visual",
                items: [
                    { title: "同色同料纯色套装", tag: "核心基础" },
                    { title: "同色细纹套装", tag: "品质升级" },
                    { title: "商务细条纹套装", tag: "趋势重点" },
                    { title: "复古格纹套装", tag: "差异化方向" },
                    { title: "撞色马甲三件套", tag: "谨慎开发" }
                ]
            }
        ]
    },
    trousers: {
        title: "西裤 / 正装裤",
        showContact: true,
        sections: [
            { title: "推荐裤长", folder: "assets/recommendations/trousers/length" },
            { title: "推荐裤型", folder: "assets/recommendations/trousers/fit" },
            { title: "推荐面料 / 纹样", folder: "assets/recommendations/trousers/fabrics" },
            { title: "推荐细节", folder: "assets/recommendations/trousers/details" }
        ]
    },
    shirt: {
        title: "衬衫",
        showContact: true,
        sections: [
            { title: "推荐开发方向", folder: "assets/recommendations/shirt/development" },
            { title: "推荐颜色", folder: "assets/recommendations/shirt/colors" },
            { title: "推荐面料 / 纹样", folder: "assets/recommendations/shirt/fabrics" },
            { title: "推荐细节", folder: "assets/recommendations/shirt/details" }
        ]
    },
    vestTailcoat: {
        title: "马甲",
        showContact: true,
        sections: [
            { title: "推荐领型", folder: "assets/recommendations/vest-tailcoat/collar" },
            { title: "推荐扣型", folder: "assets/recommendations/vest-tailcoat/button" },
            { title: "推荐面料 / 纹样", folder: "assets/recommendations/vest-tailcoat/fabric" },
            { title: "推荐细节", folder: "assets/recommendations/vest-tailcoat/details" }
        ]
    }
};
