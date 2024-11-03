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

document.addEventListener('DOMContentLoaded', function() {
  const searchBox = document.querySelector('.search-box');
  const searchButton = document.querySelector('.search-button');
  const searchModal = document.getElementById('searchModal');
  const closeBtn = searchModal.querySelector('.close-button');
  const searchResults = document.getElementById('searchResults');
  const sections = document.querySelectorAll('section');

  // 点击搜索按钮执行搜索操作
  searchButton.addEventListener('click', function() {
    const query = searchBox.value.trim(); // 去除前后空格
    if (query === '') {
      // 如果输入框为空或只有空格，不进行搜索
      searchModal.style.display = 'none';
      return;
    }
    searchSections(query);
  });

  // 关闭按钮点击事件
  closeBtn.addEventListener('click', function() {
    searchModal.style.display = 'none';
  });

  // 点击模态框外部关闭模态框
  window.addEventListener('click', function(event) {
    if (event.target === searchModal) {
      searchModal.style.display = 'none';
    }
  });

  // 搜索section元素
  function searchSections(query) {
    searchResults.innerHTML = ''; // 清空之前的结果
    let found = false;
    sections.forEach(section => {
      const sectionText = section.textContent.toLowerCase();
      const queryLowerCase = query.toLowerCase();
      if (sectionText.includes(queryLowerCase)) {
        const li = document.createElement('li');
        li.className = 'search-result';
        const title = section.querySelector('h2') || section; // 假设每个section都有一个h2标题
        const titleText = title.textContent.trim();
        const snippet = sectionText.substring(0, 150) + '...'; // 取前150个字符作为摘要
        const link = section.id ? `#${section.id}` : '#'; // 假设每个section都有id

        li.innerHTML = `
          <div>
            <h3 class="search-result-title">${titleText}</h3>
            <p class="search-result-snippet">${snippet}</p>
          </div>
          <a href="${link}" class="search-result-link">查看更多</a>
        `;
        searchResults.appendChild(li);
        found = true;
      }
    });
    if (!found) {
      // 如果没有找到结果，显示“无结果”
      const li = document.createElement('li');
      li.textContent = '无结果';
      li.classList.add('no-results');
      searchResults.appendChild(li);
      searchModal.style.display = 'block'; // 显示模态框
    }
    if (found) {
      searchModal.style.display = 'block'; // 显示模态框
    }
  }

  // 搜索结果点击事件
  searchResults.addEventListener('click', function(e) {
    if (e.target.classList.contains('search-result-link')) {
      const href = e.target.getAttribute('href');
      window.location.href = href;
      searchModal.style.display = 'none';
    } else if (e.target.tagName === 'LI' && e.target.classList.contains('search-result')) {
      const link = e.target.querySelector('.search-result-link');
      if (link) {
        window.location.href = link.getAttribute('href');
        searchModal.style.display = 'none';
      }
    }
  });
});