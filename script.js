// 奖品配置
const prizes = [
    {
        level: '一等奖',
        detail: '52元红包 🧧',
        icon: '🎊',
        probability: 0.05  // 5%
    },
    {
        level: '二等奖',
        detail: '自选官周报销（30元以内）💝',
        icon: '🎁',
        probability: 0.10  // 10%
    },
    {
        level: '三等奖',
        detail: '小蛋糕一个 🍰',
        icon: '🎂',
        probability: 0.20  // 20%
    },
    {
        level: '四等奖',
        detail: '5.2元红包 🧧',
        icon: '🎉',
        probability: 0.30  // 30%
    },
    {
        level: '五等奖',
        detail: '0.52元红包 🧧',
        icon: '🎈',
        probability: 0.35  // 35%
    }
];

// 获取DOM元素
const lotteryBtn = document.getElementById('lotteryBtn');
const resultModal = document.getElementById('resultModal');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const prizeLevel = document.getElementById('prizeLevel');
const prizeDetail = document.getElementById('prizeDetail');
const retryBtn = document.getElementById('retryBtn');

// 根据概率随机抽取奖品
function drawPrize() {
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < prizes.length; i++) {
        cumulative += prizes[i].probability;
        if (random <= cumulative) {
            return prizes[i];
        }
    }
    
    // 默认返回最后一个奖品
    return prizes[prizes.length - 1];
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
    prizeLevel.textContent = prize.level;
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
