document.addEventListener('DOMContentLoaded', () => {
    
    const imagePaths = [
        './images/image-product-1.jpg',
        './images/image-product-2.jpg',
        './images/image-product-3.jpg',
        './images/image-product-4.jpg'
    ];
    
    // --------------------------------------
    // 1. General Image Gallery Logic (المنطق الأساسي)
    // --------------------------------------
    
    function setupGallery(mainImageElement, thumbnailsContainer, prevBtn, nextBtn) {
        
        let currentImageIndex = 1;

        // وظيفة تحديث الصورة الرئيسية وحالة الـ Thumbnails
        function updateImage(index, thumbnails) {
            if (index < 1 || index > imagePaths.length) return;

            mainImageElement.src = imagePaths[index - 1];
            currentImageIndex = index;

            thumbnails.forEach(thumb => {
                thumb.classList.remove('active-thumbnail');
                thumb.classList.remove('active-thumbnail-lightbox'); // للـ Lightbox
            });
            const activeThumb = thumbnailsContainer.querySelector(`[data-index="${index}"]`);
            if (activeThumb) {
                // استخدام الكلاس الصحيح بناءً على مكان الـ thumbnail
                activeThumb.classList.add(activeThumb.classList.contains('thumbnail-lightbox') ? 'active-thumbnail-lightbox' : 'active-thumbnail');
            }
        }

        // ربط أحداث النقر على الصور المصغرة
        const thumbnails = thumbnailsContainer.querySelectorAll('img');
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                updateImage(index, thumbnails);
            });
        });

        // ربط أزرار التنقل (Next/Previous)
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = currentImageIndex === 1 ? imagePaths.length : currentImageIndex - 1;
                updateImage(newIndex, thumbnails);
            });

            nextBtn.addEventListener('click', () => {
                const newIndex = currentImageIndex === imagePaths.length ? 1 : currentImageIndex + 1;
                updateImage(newIndex, thumbnails);
            });
        }
    }
    
    // --------------------------------------
    // 2. Setup Main Gallery (إعداد المعرض الرئيسي)
    // --------------------------------------

    const mainGalleryImage = document.getElementById('mainProductImage');
    const mainGalleryThumbnailsContainer = document.querySelector('.thumbnail-container');
    const mainGalleryPrevBtn = document.getElementById('prevBtn');
    const mainGalleryNextBtn = document.getElementById('nextBtn');
    
    setupGallery(mainGalleryImage, mainGalleryThumbnailsContainer, mainGalleryPrevBtn, mainGalleryNextBtn);

    // --------------------------------------
    // 3. Setup Lightbox Gallery (إعداد معرض الـ Lightbox)
    // --------------------------------------

    const lightboxMainImage = document.getElementById('lightboxMainImage');
    const lightboxThumbnailsContainer = document.querySelector('.thumbnail-container-lightbox');
    const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
    const lightboxNextBtn = document.getElementById('lightboxNextBtn');
    
    setupGallery(lightboxMainImage, lightboxThumbnailsContainer, lightboxPrevBtn, lightboxNextBtn);

    // --------------------------------------
    // 4. Quantity Control (إدارة الكمية)
    // --------------------------------------
    
    const quantityValue = document.getElementById('quantityValue');
    const minusBtn = document.getElementById('minusBtn');
    const plusBtn = document.getElementById('plusBtn');
    let currentQuantity = 0;

    minusBtn.addEventListener('click', () => {
        if (currentQuantity > 0) {
            currentQuantity--;
            quantityValue.textContent = currentQuantity;
        }
    });

    plusBtn.addEventListener('click', () => {
        currentQuantity++;
        quantityValue.textContent = currentQuantity;
    });

    
    // --------------------------------------
    // 5. Cart Functionality (إدارة السلة)
    // --------------------------------------
    
    const cartToggle = document.getElementById('cartToggle');
    const cartDropdown = document.getElementById('cartDropdown');
    const cartContent = document.getElementById('cartContent');
    const cartCountBadge = document.getElementById('cartCount');
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    let cartItems = []; 
    const productDetails = {
        name: "Fall Limited Edition Sneakers",
        price: 125.00,
        thumbnail: './images/image-product-1-thumbnail.jpg'
    };

    function updateCartDisplay() {
        if (cartItems.length === 0) {
            cartContent.innerHTML = `<p class="fw-bold mb-0 mt-4">Your cart is empty.</p>`;
            cartCountBadge.style.display = 'none';
        } else {
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            
            cartCountBadge.textContent = totalItems;
            cartCountBadge.style.display = 'block';

            cartContent.innerHTML = cartItems.map(item => `
                <div class="d-flex align-items-center justify-content-between p-2">
                    <img src="${item.thumbnail}" alt="Product Thumbnail" width="50" class="rounded-3 me-2">
                    <div class="text-start me-auto text-secondary">
                        <p class="mb-0 small">${item.name}</p>
                        <p class="mb-0 small">${item.price.toFixed(2)} x ${item.quantity} 
                            <span class="fw-bold text-dark">$${(item.price * item.quantity).toFixed(2)}</span>
                        </p>
                    </div>
                    <button class="btn delete-btn p-0" data-product-name="${item.name}">
                        <img src="./images/icon-delete.svg" alt="Delete">
                    </button>
                </div>
            `).join('') + `<button class="btn checkout-btn w-100 mt-3 fw-bold">Checkout</button>`;

            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', deleteItemFromCart);
            });
        }
    }
    
    function deleteItemFromCart(e) {
        // بما أنه منتج واحد فقط، نقوم بتفريغ السلة
        cartItems = []; 
        updateCartDisplay();
        currentQuantity = 0;
        quantityValue.textContent = 0; 
    }

    // تبديل ظهور السلة
    cartToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // لمنع إغلاق السلة عند النقر على الأيقونة
        cartDropdown.classList.toggle('d-none');
        updateCartDisplay();
    });

    // إغلاق السلة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (!cartDropdown.classList.contains('d-none') && 
            !cartDropdown.contains(e.target) && 
            !cartToggle.contains(e.target)) {
            cartDropdown.classList.add('d-none');
        }
    });

    // إضافة للسلة
    addToCartBtn.addEventListener('click', () => {
        if (currentQuantity > 0) {
            // هنا يجب أن يكون هناك منطق لزيادة كمية المنتج الموجود بالفعل
            // بما أنه منتج واحد، سنقوم فقط بتحديث الكمية
            cartItems = [{ ...productDetails, quantity: currentQuantity }]; 
            
            // إعادة تعيين الكمية في حقل الإدخال إلى صفر بعد الإضافة
            currentQuantity = 0;
            quantityValue.textContent = 0;

            updateCartDisplay();
            cartDropdown.classList.remove('d-none');
        }
    });

    // تهيئة عرض السلة عند التحميل
    updateCartDisplay();
});