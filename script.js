document.getElementById('a1').addEventListener('click', function() {
    document.body.classList.toggle('a2');
    // 114514
    const button = document.getElementById('a1');
    if (document.body.classList.contains('a2')) {
        button.textContent = '切换到白天模式';
    } else {
        button.textContent = '切换到夜晚模式';
    }
});
