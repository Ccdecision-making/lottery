// 奖品配置 - 所有奖品概率相等
const prizes = [
    {
        detail: '红包 🧧',
        icon: '🧧'
    },
    {
        detail: '手表 ⌚',
        icon: '⌚'
    },
    {
        detail: '拍立得 📷',
        icon: '📷'
    },
    {
        detail: '玩偶 🧸',
        icon: '🧸'
    },
    {
        detail: '零食 🍿',
        icon: '🍿'
    }
];

// 追踪是否为第一次抽奖
let isFirstDraw = true;

// 获取DOM元素
const lotteryBtn = document.getElementById('lotteryBtn');
const resultModal = document.getElementById('resultModal');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const prizeDetail = document.getElementById('prizeDetail');
const retryBtn = document.getElementById('retryBtn');

// 抽取奖品
function drawPrize() {
    // 第一次抽奖必定是玩偶
    if (isFirstDraw) {
        isFirstDraw = false;
        // 找到玩偶奖品并返回
        return prizes.find(prize => prize.detail.includes('玩偶'));
    }

    // 后续抽奖：所有奖品概率相等，随机抽取
    const randomIndex = Math.floor(Math.random() * prizes.length);
    return prizes[randomIndex];
}

// 创建五彩纸屑效果
function createConfetti() {
    const colors = ['#FF4D6D', '#FF6B8A', '#FFB6C1', '#FFC0CB', '#FF69B4', '#FFD700', '#87CEEB'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';

            document.body.appendChild(confetti);

            // 动画结束后移除元素
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 30);
    }
}

// 显示结果弹窗
function showResult(prize) {
    resultIcon.textContent = prize.icon;
    resultTitle.textContent = '恭喜你！';
    prizeDetail.textContent = prize.detail;

    resultModal.classList.add('show');
    createConfetti();
}

// 隐藏结果弹窗
function hideResult() {
    resultModal.classList.remove('show');
}

// 抽奖按钮点击事件
lotteryBtn.addEventListener('click', () => {
    // 添加按钮动画
    lotteryBtn.classList.add('pulse');
    lotteryBtn.disabled = true;

    // 延迟显示结果，增加悬念感
    setTimeout(() => {
        const prize = drawPrize();
        showResult(prize);

        lotteryBtn.classList.remove('pulse');
        lotteryBtn.disabled = false;
    }, 800);
});

// 再抽一次按钮点击事件
retryBtn.addEventListener('click', () => {
    hideResult();

    // 短暂延迟后自动再抽一次
    setTimeout(() => {
        lotteryBtn.click();
    }, 300);
});

// 点击遮罩关闭弹窗
resultModal.addEventListener('click', (e) => {
    if (e.target === resultModal) {
        hideResult();
    }
});

// 添加键盘事件支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resultModal.classList.contains('show')) {
        hideResult();
    }
    if (e.key === 'Enter' && !resultModal.classList.contains('show')) {
        lotteryBtn.click();
    }
});
