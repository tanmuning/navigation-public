(() => {
    const library = document.querySelector('.keyword-library-groups');
    if (!library) return;

    const groups = [
        ['目标人群与核心品类', []],
        ['版型／长度／套装规格', []],
        ['面料／材质／功能特性／图案／花色', []],
        ['领型／腰型／袖长／闭合方式／细节', []],
        ['颜色', []],
        ['季节体感', []],
        ['风格／场景', []]
    ];
    const seasons = new Set(['春季', '夏季', '秋季', '冬季', '春秋', '秋冬', '四季', '夏日', '冬季保暖', '四季皆宜', '轻薄', '透气', '清凉', '保暖', '加厚', '防风']);
    const colors = new Set(['黑色', '白色', '灰色', '深灰色', '浅灰色', '米色', '卡其色', '藏青色', '棕色', '蓝色', '深蓝色', '浅蓝色', '绿色', '军绿色', '墨绿色', '咖色', '驼色', '黄色', '姜黄色', '红色', '酒红色', '橙色', '砖红色', '紫色', '粉色', '杏色', '奶油色', '多色', '渐变色']);
    const structures = new Set(['V领', '翻领', '纽扣', '单排扣', '双排扣', '圆领', '立领', '亨利领', '半高领', '高领', '扣领', '古巴领', '开领', 'Polo领', '拉链门襟', '纽扣门襟', '短袖', '长袖', '无袖', '七分袖', '五分袖', '落肩袖', '插肩袖', '收口袖', '收腰', '高腰', '松紧腰', '抽绳腰带', '系腰带', '侧口袋', '胸前口袋', '开叉下摆', '拼接', '压褶', '刺绣', '贴布']);
    const fits = new Set(['宽松版', '修身版', '常规版', '合身版', '廓形版', 'oversize风', '常规款', '短款', '中长款', '长款', '加长款', '两件套', '三件套', '西装两件套', '西装三件套', '马甲西装套装']);

    library.querySelectorAll('details').forEach((details) => {
        const source = details.querySelector('summary span')?.textContent || '';
        details.querySelectorAll('tbody tr').forEach((row) => {
            const term = row.cells[0]?.textContent.trim() || '';
            let target = 2;
            if (source === '核心品类与人群') target = 0;
            else if (source.includes('风格') || source === '风格与场景') target = 6;
            else if (source.includes('颜色') || source === '季节与颜色') target = colors.has(term) ? 4 : 5;
            else if (source.includes('季节体感')) target = seasons.has(term) ? 5 : 2;
            else if (source === '套装规格' || fits.has(term)) target = 1;
            else if (structures.has(term) || source.includes('领型') || source.includes('袖型')) target = 3;
            groups[target][1].push(row.cloneNode(true));
        });
    });

    const table = '<div class="keyword-table-wrap"><table><thead><tr><th>中文词</th><th>英文翻译</th><th>英文搜索关键词（变体）</th></tr></thead><tbody></tbody></table></div>';
    library.replaceChildren(...groups.map(([title, rows], index) => {
        const details = document.createElement('details');
        details.open = index === 0;
        details.innerHTML = `<summary><span>${title}</span><small>${rows.length} 项</small></summary>${table}`;
        details.querySelector('tbody').append(...rows);
        return details;
    }));
})();
