// 等待 DOM 加載完成
document.addEventListener('DOMContentLoaded', function() {
    // 移動端導航菜單切換
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // 點擊頁面其他地方關閉導航菜單
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
        }
    });
    
    // 文章過濾功能
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const articleItems = document.querySelectorAll('.article-item');
    
    if (searchInput && categoryFilter && articleItems.length > 0) {
        // 搜索功能
        searchInput.addEventListener('input', filterArticles);
        
        // 分類過濾
        categoryFilter.addEventListener('change', filterArticles);
        
        function filterArticles() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categoryFilter.value;
            
            articleItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const content = item.querySelector('p').textContent.toLowerCase();
                const category = item.dataset.category;
                
                const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
                const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
                
                if (matchesSearch && matchesCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    }
    
    // 聯繫表單提交
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 獲取表單數據
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message').value;
            
            // 在實際應用中，這裡應該發送 AJAX 請求到後端
            console.log('表單提交：', { name, email, subject, message });
            
            // 表單提交成功後的處理
            alert('謝謝您的留言！我會儘快回覆。');
            contactForm.reset();
        });
    }
    
    // 評論表單提交
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 獲取評論數據
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const comment = document.getElementById('comment').value;
            
            // 在實際應用中，這裡應該發送 AJAX 請求到後端
            console.log('評論提交：', { name, email, comment });
            
            // 評論提交成功後的處理
            alert('感謝您的評論！');
            commentForm.reset();
        });
    }
    
    // 滾動時導航欄變化
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                navbar.style.background = '#fff';
            } else {
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
                navbar.style.background = '#fff';
            }
        });
    }
    
    // 文章圖片點擊放大效果（如果需要）
    const articleImages = document.querySelectorAll('.article-content img');
    
    articleImages.forEach(img => {
        img.addEventListener('click', function() {
            // 這裡可以添加圖片點擊放大的效果
            // 例如可以創建一個模態框來顯示大圖
            console.log('圖片點擊：', this.src);
        });
    });
    
    // 讀取進度條（可選）
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    
    if (document.querySelector('.article-full')) {
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
        
        // 添加讀取進度條的樣式
        const style = document.createElement('style');
        style.textContent = `
            .reading-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 0;
                height: 3px;
                background: linear-gradient(to right, #1e88e5, #64b5f6);
                z-index: 9999;
                transition: width 0.1s ease;
            }
        `;
        document.head.appendChild(style);
    }
}); 