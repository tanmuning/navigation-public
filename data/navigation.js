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

const navigationData = [
{
    id: "section-contact",
    title: "正装对接",
    layout: "cards",

    items: [

        {
            layout: "wide",
            kind: "onboarding",
            title: "申请入驻",
            linkLabel: "申请入驻链接",
            link: "https://seller.kuajingmaihuo.com",
            codeLabel: "填写入驻邀请码",
            code: "yzldty"
        },

        {
            title: "叹木宁",
            subtitle: "微信号：tanmuning-277",
            icon: "🌍",

            buttonText: "复制微信",

            action: {
                type: "copy",
                value: "tanmuning-277"
            }
        },


        {
            title: "colin.chen",
            subtitle: "电话：18565237723",
            icon: "📱",

            buttonText: "拨打电话",

            action: {
                type: "phone",
                value: "18565237723"
            }
        },


        {
            layout: "wide",
            kind: "address",
            title: "私人件寄样地址",
            lines: [
                "广东省/深圳市/南山区/深圳市南山区前海国际人才港B塔29楼【H-男装组】",
                "叹木宁tanmuning(私人件)",
                "18565237723"
            ],
            copyValue: "广东省/深圳市/南山区/深圳市南山区前海国际人才港B塔29楼【H-男装组】\n叹木宁tanmuning(私人件)\n18565237723"
        }

    ]
},
    {
        id: "section-hot",
        title: "开款推荐",
        layout: "list",
        items: [
            {
                title: "正装上装",
                action: {
                    type: "link",
                    value: "recommend.html?category=suit"
                }
            },
            {
                title: "正装套装",
                action: {
                    type: "link",
                    value: "recommend.html?category=suitSet"
                }
            },
            {
                title: "马甲",
                action: {
                    type: "link",
                    value: "recommend.html?category=vestTailcoat"
                }
            },
            {
                title: "西裤 / 正装裤",
                action: {
                    type: "link",
                    value: "recommend.html?category=trousers"
                }
            },
            {
                title: "衬衫",
                action: {
                    type: "link",
                    value: "recommend.html?category=shirt"
                }
            }
        ]
    },
    {
        id: "section-product",
        title: "商品优化",
        layout: "list",
        items: [
            {
                title: "图片优化",
                action: {
                    type: "link",
                    value: ""
                }
            },
            {
                title: "标题扩写",
                action: {
                    type: "link",
                    value: ""
                }
            }
        ]
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
        sections: [
            { title: "组合形式", folder: "assets/recommendations/suit-set/combinations" }
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
