// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否为移动设备
    const isMobile = window.innerWidth <= 768;
    
    // 生成GitHub风格的贡献图（仅在非移动设备上）
    if (!isMobile) {
        generateContributionGraph();
    }
    
    // 添加头像点击效果
    setupAvatarInteraction();
    
    // 添加项目卡片动画（简化版在移动端）
    setupProjectCards();
    
    // 添加技能标签动画
    setupSkillTags();
    
    // 添加时间线动画
    setupTimelineAnimation();
    
    // 添加键盘快捷键（仅在非移动设备上）
    if (!isMobile) {
        setupKeyboardShortcuts();
    }
    
    // 添加页面可见性检测
    setupVisibilityChange();
});



// 生成贡献热力图（简化版）
function generateContributionGraph() {
    const contributionGraph = document.getElementById('contributionGraph');
    const totalDays = 365; // 一年的天数
    
    // 清空现有内容
    contributionGraph.innerHTML = '';
    
    // 生成贡献数据
    for (let i = 0; i < totalDays; i++) {
        const day = document.createElement('div');
        day.className = 'contribution-day';
        
        // 生成贡献级别（简化随机逻辑）
        let level = Math.floor(Math.random() * 5);
        
        // 应用贡献级别
        if (level > 0) {
            day.classList.add(`level-${level}`);
        }
        
        // 添加贡献信息
        day.setAttribute('data-contributions', level);
        
        contributionGraph.appendChild(day);
    }
    
    // 添加动画效果
    animateContributionGraph();
}



// 贡献图动画效果（简化版）
function animateContributionGraph() {
    const days = document.querySelectorAll('.contribution-day');
    
    days.forEach((day, index) => {
        day.style.opacity = '0';
        
        setTimeout(() => {
            day.style.transition = 'opacity 0.3s ease';
            day.style.opacity = '1';
        }, index * 1);
    });
}



// 头像交互效果
function setupAvatarInteraction() {
    // 简化头像交互，移除不必要的动画
    const avatar = document.getElementById('avatar');
}

// 项目卡片动画（简化版）
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // 移动设备上跳过动画
        if (window.innerWidth <= 768) {
            card.style.opacity = '1';
        } else {
            card.style.opacity = '0';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease';
                card.style.opacity = '1';
            }, index * 50);
        }
    });
}

// 技能标签动画（简化版）
function setupSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        // 移动设备上跳过动画
        if (window.innerWidth <= 768) {
            tag.style.opacity = '1';
        } else {
            tag.style.opacity = '0';
            
            setTimeout(() => {
                tag.style.transition = 'opacity 0.3s ease';
                tag.style.opacity = '1';
            }, index * 30);
        }
    });
}

// 时间线动画（简化版）
function setupTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // 移动设备上跳过动画
        if (window.innerWidth <= 768) {
            item.style.opacity = '1';
        } else {
            item.style.opacity = '0';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease';
                item.style.opacity = '1';
            }, index * 100);
        }
    });
}

// 键盘快捷键设置
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // 按 'R' 键重新生成贡献图
        if (e.key.toLowerCase() === 'r') {
            generateContributionGraph();
        }
    });
}

// 页面可见性检测
function setupVisibilityChange() {
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = '😴 Come back! - Mm';
        } else {
            document.title = "Hello, I'm Mm";
        }
    });
}


