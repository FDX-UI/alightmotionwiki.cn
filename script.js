document.addEventListener('DOMContentLoaded', function() { // 确保DOM完全加载后再执行
  const navItems = document.querySelectorAll('.nav-item'); // 获取所有的导航项
  const sliderBar = document.querySelector('.slider-bar'); // 获取滑动条元素
  const modeToggle = document.getElementById('modeToggle'); // 获取模式切换按钮

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

  updateSliderPosition(); // 初始化滑块位置

  navItems.forEach(item => { // 为每个导航项添加点击事件
    item.addEventListener('click', function() {
      navItems.forEach(i => i.classList.remove('active')); // 移除所有导航项的激活状态
      this.classList.add('active'); // 为当前点击的导航项添加激活状态
      updateSliderPosition(); // 更新滑动条位置
    });
  });

  modeToggle.addEventListener('click', toggleDarkMode); // 为模式切换按钮添加点击事件
});