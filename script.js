document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item');
  const sliderBar = document.querySelector('.slider-bar');
  const modeToggle = document.getElementById('modeToggle');
  const contents = document.querySelectorAll('.content');
  const searchBox = document.querySelector('.search-box');
  const searchButton = document.querySelector('.search-button');
  const searchModal = document.getElementById('searchModal');
  const searchResults = document.getElementById('searchResults');
  const closeBtn = document.querySelector('.close');

  let allPosts = []; // 用于存储所有帖子数据

  function updateSliderPosition() {
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
      const rect = activeItem.getBoundingClientRect();
      sliderBar.style.width = `${rect.width}px`;
      sliderBar.style.left = `${rect.left}px`;
    }
  }

  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      modeToggle.querySelector('.fa-sun').style.display = 'inline-block';
      modeToggle.querySelector('.fa-moon').style.display = 'none';
    } else {
      modeToggle.querySelector('.fa-sun').style.display = 'none';
      modeToggle.querySelector('.fa-moon').style.display = 'inline-block';
    }
  }

  function showContent(target) {
    contents.forEach(content => {
      if (content.id === target) {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        content.classList.add('active');
      } else {
        content.classList.remove('active');
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
      }
    });
    updateSliderPosition();
  }

  updateSliderPosition();

  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      const target = this.getAttribute('data-target');
      showContent(target);
    });
  });

  modeToggle.addEventListener('click', toggleDarkMode);

  // 读取JSON索引文件并渲染帖子
  fetch('index.json')
    .then(response => response.json())
    .then(data => {
      allPosts = [].concat(data.encyclopedia, data.downloads, data.announcements);
      renderPosts('encyclopedia', data.encyclopedia);
      renderPosts('downloads', data.downloads);
      renderPosts('announcements', data.announcements);
    })
    .catch(error => console.error('Error loading the index JSON:', error));

  // 搜索功能
  searchButton.addEventListener('click', function() {
    const query = searchBox.value.trim().toLowerCase();
    if (query) {
      const results = allPosts.filter(post =>
        (post.title.toLowerCase().includes(query)) ||
        (post.summary.toLowerCase().includes(query)) ||
        (post.searchable.toLowerCase().includes(query))
      );
      displaySearchResults(results);
      openModal(results.length > 0);
    } else {
      openModal(false);
    }
  });

  function displaySearchResults(results) {
    searchResults.innerHTML = ''; // 清空之前的搜索结果
    if (results.length === 0) {
      searchResults.innerHTML = '<li>没有找到相关帖子。</li>';
    } else {
      results.forEach(result => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${result.href}" target="_blank">${result.title} - ${result.summary}</a>`;
        searchResults.appendChild(li);
      });
    }
    adjustModalHeight(); // 调整模态框高度
  }

  function openModal(hasResults) {
    searchModal.style.display = hasResults ? 'block' : 'none';
    if (hasResults) {
      adjustModalHeight(); // 打开模态框时调整高度
    }
  }

  closeBtn.addEventListener('click', function() {
    searchModal.style.display = 'none';
  });

  function adjustModalHeight() {
    const modalContent = document.querySelector('.modal-content');
    const searchResults = document.getElementById('searchResults');
    
    // 计算内容高度
    const contentHeight = searchResults.scrollHeight;
    
    // 设置模态框的高度
    modalContent.style.height = `${contentHeight + 40}px`; // 加上一些额外的padding
  }

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
      postElement.addEventListener('click', function() {
        window.location.href = post.href;
      });
      content.appendChild(postElement);
      postElement.style.animation = 'slide-in 0.5s ease forwards';
    });
  }
});
