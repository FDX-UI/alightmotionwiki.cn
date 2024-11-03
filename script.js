document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item'); // 获取所有的导航项
  const sliderBar = document.querySelector('.slider-bar'); // 获取滑动条元素
  const modeToggle = document.getElementById('modeToggle'); // 获取模式切换按钮
  const contents = document.querySelectorAll('.content'); // 获取所有的内容区域

  function updateSliderPosition() { // 更新滑动条位置的函数
    const activeItem = document.querySelector('.nav-item.active'); // 获取当前激活的导航项
    if (activeItem) {
      const rect = activeItem.getBoundingClientRect(); // 获取激活项的位置和尺寸
      sliderBar.style.width = `${rect.width}px`; // 设置滑动条宽度
      sliderBar.style.left = `${rect.left}px`; // 设置滑动条左边距
    }
  }

  function toggleDarkMode() { // 切换暗色模式的函数
    document.body.classList.toggle('dark-mode'); // 切换body的dark-mode类
  }

  function showContent(target) { // 显示对应内容的函数
    contents.forEach(content => {
      if (content.id === target) {
        content.style.opacity = '1'; // 向上显示
        content.style.transform = 'translateY(0)'; // 移回原位
        content.classList.add('active');
        content.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; // 定义动画效果
      } else {
        content.classList.remove('active');
        content.style.opacity = '0'; // 向下隐藏
        content.style.transform = 'translateY(20px)'; // 向下移动20px
        content.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; // 定义动画效果
      }
    });
    updateSliderPosition(); // 更新滑动条位置
  }

  updateSliderPosition(); // 初始化滑块位置

  navItems.forEach(item => { // 为每个导航项添加点击事件
    item.addEventListener('click', function() {
      navItems.forEach(i => i.classList.remove('active')); // 移除所有导航项的激活状态
      this.classList.add('active'); // 为当前点击的导航项添加激活状态
      const target = this.getAttribute('data-target'); // 获取导航项对应的内容区域ID
      showContent(target); // 显示对应的内容区域
    });
  });

  modeToggle.addEventListener('click', toggleDarkMode); // 为模式切换按钮添加点击事件

  // 动态渲染帖子的函数
  function renderPosts(contentId, posts) {
    const content = document.getElementById(contentId);
    content.innerHTML = ''; // 清空内容区域
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.className = 'post';
      postElement.innerHTML = `
        <h3 class="post-title">${post.title}</h3>
        <p class="post-summary">${post.summary}</p>
      `;
      // 为帖子添加点击事件，跳转到对应的HTML页面
      postElement.addEventListener('click', function() {
        window.location.href = post.href;
      });
      // 应用进入动画
      postElement.style.animation = 'slide-in 0.5s ease forwards';
      content.appendChild(postElement);
    });
  }

  // 读取JSON索引文件并渲染帖子
  fetch('index.json')
    .then(response => response.json())
    .then(data => {
      renderPosts('encyclopedia', data.encyclopedia);
      renderPosts('downloads', data.downloads);
      renderPosts('announcements', data.announcements);
    })
    .catch(error => console.error('Error loading the index JSON:', error));
});
