// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 生成GitHub风格的贡献图
    generateContributionGraph();
    
    // 添加头像点击效果
    setupAvatarInteraction();
    
    // 添加项目卡片动画
    setupProjectCards();
    
    // 添加技能标签动画
    setupSkillTags();
    
    // 添加时间线动画
    setupTimelineAnimation();
    
    // 设置深色模式检测
    setupDarkModeDetection();

    // 为 Apple Vision Pro 增强3D效果（不影响电脑端布局）
    setupVisionOSEnhancements();
});



// 生成有趣的贡献热力图
function generateContributionGraph() {
    const contributionGraph = document.getElementById('contributionGraph');
    const totalDays = 365; // 一年的天数
    
    // 清空现有内容
    contributionGraph.innerHTML = '';
    
    // 创建更有趣的贡献数据模式
    const patterns = [
        { name: '工作日模式', pattern: [2, 3, 4, 3, 2, 1, 0] }, // 周一到周日
        { name: '周末模式', pattern: [1, 1, 1, 1, 1, 4, 4] }, // 周末活跃
        { name: '随机模式', pattern: [0, 1, 2, 3, 4, 3, 2] }, // 随机分布
        { name: '假期模式', pattern: [0, 0, 0, 0, 0, 4, 4] } // 假期活跃
    ];
    
    // 生成贡献数据
    for (let i = 0; i < totalDays; i++) {
        const day = document.createElement('div');
        day.className = 'contribution-day';
        
        // 生成贡献级别
        let level = 0;
        
        // 随机选择模式
        const patternIndex = Math.floor(Math.random() * patterns.length);
        const pattern = patterns[patternIndex].pattern;
        const dayOfWeek = Math.floor(Math.random() * 7); // 随机星期几
        level = pattern[dayOfWeek];
        
        // 添加一些随机变化
        if (Math.random() < 0.1) { // 10%概率增加贡献
            level = Math.min(4, level + 1);
        }
        if (Math.random() < 0.05) { // 5%概率减少贡献
            level = Math.max(0, level - 1);
        }
        
        // 应用贡献级别
        if (level > 0) {
            day.classList.add(`level-${level}`);
        }
        
        // 添加贡献信息
        day.setAttribute('data-contributions', level);
        
        // 添加悬停效果
        day.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.8) rotate(12deg)';
            this.style.zIndex = '10';
            this.style.boxShadow = '0 12px 35px rgba(0, 123, 255, 0.5)';
            this.style.filter = 'brightness(1.2)';
        });
        
        day.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.zIndex = '1';
            this.style.boxShadow = '';
            this.style.filter = 'brightness(1)';
        });
        
        // 添加点击效果
        day.addEventListener('click', function() {
                    // 点击时添加脉冲动画
        this.style.animation = 'pulse 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => {
            this.style.animation = '';
        }, 800);
            
            // 随机改变贡献级别
            const newLevel = Math.floor(Math.random() * 5);
            this.className = 'contribution-day';
            if (newLevel > 0) {
                this.classList.add(`level-${newLevel}`);
            }
            this.setAttribute('data-contributions', newLevel);
            

        });
        
        contributionGraph.appendChild(day);
    }
    
    // 添加动画效果
    animateContributionGraph();
}



// 贡献图动画效果
function animateContributionGraph() {
    const days = document.querySelectorAll('.contribution-day');
    
    days.forEach((day, index) => {
        day.style.opacity = '0';
        day.style.transform = 'scale(0.5) rotate(180deg)';
        
        setTimeout(() => {
            day.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            day.style.opacity = '1';
            day.style.transform = 'scale(1) rotate(0deg)';
        }, index * 3);
    });
}

// 判断是否为 visionOS/Apple Vision Pro（尽量宽泛，逐步增强）
function isVisionOS() {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    return /visionos/i.test(ua) || /apple\s?vision/i.test(ua) || /vision\s?pro/i.test(ua) || /visionos/i.test(platform);
}

// 为 visionOS 启用轻量 3D 倾斜效果（保持现有布局与动画不变）
function setupVisionOSEnhancements() {
    if (!isVisionOS()) return;

    document.body.classList.add('visionos');

    const container = document.querySelector('.container');
    if (!container) return;

    // 仅对容器做轻微 3D 倾斜，避免与卡片等元素现有 transform 冲突
    const maxRotate = 6; // 最大旋转角度（度）
    const damp = 0.15;   // 阻尼
    let targetRx = 0, targetRy = 0, rx = 0, ry = 0;

    // 添加高光反射层（不干扰元素交互）
    const glare = document.createElement('div');
    glare.className = 'vision-shine';
    container.appendChild(glare);

    function updateTilt() {
        rx += (targetRx - rx) * damp;
        ry += (targetRy - ry) * damp;
        container.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;

        // 根据倾斜动态调整阴影，增强立体感
        const shadowX = (-ry * 2).toFixed(1);
        const shadowY = (rx * 2).toFixed(1);
        container.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.2)`;
        requestAnimationFrame(updateTilt);
    }

    function onPointerMove(x, y) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const nx = (x / vw) * 2 - 1; // -1 ~ 1
        const ny = (y / vh) * 2 - 1; // -1 ~ 1
        targetRy = nx * maxRotate;      // 左右 -> Y 轴旋转
        targetRx = -ny * maxRotate;     // 上下 -> X 轴旋转

        // 更新高光中心位置
        const percentX = (nx + 1) * 50; // 0~100
        const percentY = (ny + 1) * 50; // 0~100
        glare.style.setProperty('--glare-x', `${percentX}%`);
        glare.style.setProperty('--glare-y', `${percentY}%`);
        glare.style.opacity = '1';
    }

    // 指针/触摸/遥控板均走指针事件
    window.addEventListener('pointermove', (e) => onPointerMove(e.clientX, e.clientY));

    // 若支持设备方向，也可微调倾斜（visionOS 可能不提供，做容错）
    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', (e) => {
            if (e.beta == null || e.gamma == null) return;
            const beta = Math.max(-30, Math.min(30, e.beta));   // 前后
            const gamma = Math.max(-30, Math.min(30, e.gamma)); // 左右
            targetRx = (beta / 30) * maxRotate;
            targetRy = (gamma / 30) * maxRotate;
        }, { passive: true });
    }

    // 指针离开时，逐渐回正并淡出高光
    window.addEventListener('pointerleave', () => {
        targetRx = 0;
        targetRy = 0;
        glare.style.opacity = '0';
    });

    updateTilt();
}

// 头像交互效果
function setupAvatarInteraction() {
    const avatar = document.getElementById('avatar');
    const avatars = [
        'https://via.placeholder.com/120x120/9c88ff/ffffff?text=㎜',       
    ];
    
    let currentIndex = 0;
    
    avatar.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % avatars.length;
        this.style.transform = 'scale(0.8) rotate(360deg)';
        
        setTimeout(() => {
            this.src = avatars[currentIndex];
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
}

// 项目卡片动画
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // 延迟显示动画
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
        
        // 点击效果
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95) rotate(2deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });
    });
}

// 技能标签动画
function setupSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            tag.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            tag.style.opacity = '0.8';
            tag.style.transform = 'scale(1)';
        }, index * 80);
        
        // 悬停效果
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(3deg)';
            this.style.opacity = '1';
            this.style.background = 'rgba(0, 123, 255, 0.1)';
            this.style.borderColor = 'rgba(0, 123, 255, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.opacity = '0.8';
            this.style.background = 'rgba(0, 0, 0, 0.05)';
            this.style.borderColor = 'rgba(0, 0, 0, 0.1)';
        });
    });
}

// 时间线动画
function setupTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 250);
    });
}

// 社交链接悬停效果
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
        this.style.boxShadow = '0 8px 20px rgba(0, 123, 255, 0.3)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        this.style.boxShadow = '';
    });
});

// 滚动视差效果
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.sidebar');
    const speed = scrolled * 0.3;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px) rotate(${scrolled * 0.01}deg)`;
    }
    
    // 添加滚动时的背景动画
    const sections = document.querySelectorAll('.contribution-section, .projects-section, .about-section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        section.style.transform = `translateY(${rate}px)`;
    });
});



// 添加鼠标跟随效果
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(156,136,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.cursor');
    cursorElement.style.left = e.clientX - 10 + 'px';
    cursorElement.style.top = e.clientY - 10 + 'px';
});

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // 按 'R' 键重新生成贡献图
    if (e.key.toLowerCase() === 'r') {
        generateContributionGraph();
    }
    

    

});



// 添加页面可见性检测
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '😴 Come back! - ㎜';
    } else {
        document.title = "Hello, I'm ㎜";
    }
});

// 深色模式检测和切换功能
function setupDarkModeDetection() {
    // 检测系统深色模式偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 监听系统主题变化
    prefersDark.addEventListener('change', function(e) {
        if (e.matches) {
            console.log('系统切换到深色模式');
            document.body.classList.add('dark-mode-active');
        } else {
            console.log('系统切换到浅色模式');
            document.body.classList.remove('dark-mode-active');
        }
    });
    
    // 初始化时检查当前模式
    if (prefersDark.matches) {
        document.body.classList.add('dark-mode-active');
    }
    
    // 添加深色模式切换按钮（可选）
    addDarkModeToggle();
}

// 添加深色模式切换按钮
function addDarkModeToggle() {
    // 检查是否已存在切换按钮
    if (document.getElementById('dark-mode-toggle')) {
        return;
    }
    
    const toggle = document.createElement('button');
    toggle.id = 'dark-mode-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.title = '切换深色模式';
    toggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(20px);
        color: #495057;
        font-size: 18px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
    `;
    
    // 深色模式下的样式
    const darkModeStyles = `
        @media (prefers-color-scheme: dark) {
            #dark-mode-toggle {
                background: rgba(30, 30, 30, 0.9);
                color: #adb5bd;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            }
            
            #dark-mode-toggle:hover {
                background: rgba(40, 40, 40, 0.95);
                color: #007bff;
                transform: scale(1.1) rotate(180deg);
            }
        }
        
        #dark-mode-toggle:hover {
            background: rgba(255, 255, 255, 0.95);
            color: #007bff;
            transform: scale(1.1) rotate(180deg);
            box-shadow: 0 8px 24px rgba(0, 123, 255, 0.2);
        }
    `;
    
    // 添加样式到页面
    const style = document.createElement('style');
    style.textContent = darkModeStyles;
    document.head.appendChild(style);
    
    // 点击切换功能
    toggle.addEventListener('click', function() {
        const isDark = document.body.classList.contains('dark-mode-active');
        
        if (isDark) {
            document.body.classList.remove('dark-mode-active');
            this.innerHTML = '<i class="fas fa-moon"></i>';
            this.title = '切换到深色模式';
        } else {
            document.body.classList.add('dark-mode-active');
            this.innerHTML = '<i class="fas fa-sun"></i>';
            this.title = '切换到浅色模式';
        }
        
        // 添加切换动画
        this.style.transform = 'scale(0.8) rotate(360deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
    
    document.body.appendChild(toggle);
}