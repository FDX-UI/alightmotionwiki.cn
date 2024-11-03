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
  
  document.querySelectorAll('section').forEach(function(section) {
    // 为每个section元素添加点击事件监听器
    section.addEventListener('click', function() {
      // 获取section的父元素div的id
      var parentId = section.parentNode.id;
      // 获取section的id
      var sectionId = section.id;
      // 构建文件路径
      var filePath = parentId + '/' + sectionId + '.html';
      // 执行跳转
      window.location.href = filePath;
    });
  });

  function toggleDarkMode() { // 切换暗色模式的函数
    document.body.classList.toggle('dark-mode'); // 切换body的dark-mode类
  }

  function showContent(target) { // 显示对应内容的函数
    const currentActive = document.querySelector('.content.active'); // 获取当前激活的内容区域
    if (currentActive) {
      currentActive.classList.remove('active'); // 移除当前激活内容区域的激活状态
      setTimeout(() => { // 等待动画完成后再添加激活状态
        currentActive.style.opacity = '0'; // 向下隐藏
        currentActive.style.transform = 'translateY(20px)'; // 向下移动20px
      }, 500); // 等待0.5秒后开始隐藏动画
    }
    const activeContent = document.getElementById(target); // 获取目标内容区域
    if (activeContent) {
      activeContent.style.opacity = '0'; // 初始不透明度为0
      activeContent.style.transform = 'translateY(20px)'; // 初始向上移动20px
      activeContent.classList.add('active'); // 为目标内容区域添加激活状态
      setTimeout(() => { // 等待动画完成后开始显示动画
        activeContent.style.opacity = '1'; // 向上显示
        activeContent.style.transform = 'translateY(0)'; // 移回原位
      }, 100); // 等待0.1秒后开始显示动画
    }
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
});