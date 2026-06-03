import appData from '../../data/data.json' with { type: 'json' };

const smBreakpoint = window.matchMedia('(min-width: 376px)');
const mdBreakpointImages = window.matchMedia('(min-width: 769px)');

// storge for the item such (key: card title, value: .cards DOM element)
const createdCardsMap = new Map();

// --------------------------- دوال إدارة البيانات المشتركة ----------------------------
function loadData() {
    const storedData = localStorage.getItem('appData');
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            return appData.map(item => {
                const storedItem = parsedData.find(d => d.title === item.title);

                if (storedItem && storedItem.isBookmarked !== undefined) {
                    item.isBookmarked = storedItem.isBookmarked;
                }
                return item;
            });
        } catch (e) {
            console.error("Error parsing localStorage data, using default appData.", e);
            return appData;
        }
    }
    return appData;
}

function saveData(data) {
    localStorage.setItem('appData', JSON.stringify(data));
}

let currentAppData = loadData();

// ---------------------------  دالة معالجة النقر (مع إعادة العرض) ----------------------------
function handleBookmarkClick(event) {
    const bookmarkIcon = event.currentTarget;
    const cardTitle = bookmarkIcon.dataset.title;

    const item = currentAppData.find(data => data.title === cardTitle);

    if (item) {
        item.isBookmarked = !item.isBookmarked;
        saveData(currentAppData);
        
        // إعادة عرض المحتوى بالكامل لإزالة البطاقة فوراً عند إلغاء الحفظ
        renderBookmarkedContent(); 
    }
}

// --------------------------- دالة مساعدة لإنشاء عنصر البطاقة ----------------------------
function createCardElement(cardData) {
    let categoryIconHTML;
    if (cardData.category === 'Movie') {
        categoryIconHTML = `<img src="./assets/icon-category-movie.svg"> ${cardData.category}`;
    } else {
        categoryIconHTML = `<img src="./assets/icon-category-tv.svg"> ${cardData.category}`;
    }

    const bookmarkClass = cardData.isBookmarked ? 'card-bookmark bookmarked' : 'card-bookmark';
    const cardItem = document.createElement('div');
    cardItem.classList.add('card-recommended');

    cardItem.innerHTML = ` 
        <div class="cards">
            <div class="${bookmarkClass}" data-title="${cardData.title}"></div>
        </div>
        <div>
            <div class="card-text">
                <span class="card-year">${cardData.year}</span> • 
                <span class="card-category">${categoryIconHTML}</span> • 
                <span class="card-rating">${cardData.rating}</span>
            </div>
            <h5 class="card-title">${cardData.title}</h5>
        </div>`;

    const cardBookmark = cardItem.querySelector('.card-bookmark');
    if (cardBookmark) {
        cardBookmark.addEventListener('click', handleBookmarkClick);
    }
    
    const cardElement = cardItem.querySelector('.cards');
    if (cardElement) {
        createdCardsMap.set(cardData.title, cardElement);
    }

    return cardItem;
}

// --------------------------- دالة تحديث صور الخلفية ----------------------------
function updateBackgroundImages() {
    let imageKey;
    
    if (mdBreakpointImages.matches) { // شاشة كبيرة (> 768px)
        imageKey = 'large';
    } else if (smBreakpoint.matches) { // شاشة متوسطة (376px - 768px)
        imageKey = 'medium';
    } else { // شاشة صغيرة (<= 375px)
        imageKey = 'small';
    }

    currentAppData.forEach(bgCard => {
        if (bgCard.isBookmarked) {
            const cardElement = createdCardsMap.get(bgCard.title);
            
            // التحقق من وجود العنصر والمسار
            if (cardElement && bgCard.thumbnail && bgCard.thumbnail.regular) {
                const imagePath = bgCard.thumbnail.regular[imageKey];
                if (imagePath) {
                    cardElement.style.backgroundImage = `url('${imagePath}')`;
                }
            }
        }
    });
}

// --------------------------- دالة عرض المحتوى المحفوظ ----------------------------
function renderBookmarkedContent() {
    currentAppData = loadData();
    
    const moviesContainer = document.querySelector('.bookmarked-movies-container');
    const tvSeriesContainer = document.querySelector('.bookmarked-tv-series-container');

    if (!moviesContainer || !tvSeriesContainer) {
        console.error("Bookmarked containers not found in HTML.");
        return; 
    }
    
    // مسح الخريطة والعناصر الموجودة لإعادة البناء
    moviesContainer.innerHTML = '';
    tvSeriesContainer.innerHTML = '';
    createdCardsMap.clear();

    const bookmarkedItems = currentAppData.filter(item => item.isBookmarked);
    
    const bookmarkedMovies = bookmarkedItems.filter(item => item.category === 'Movie');
    const bookmarkedTvSeries = bookmarkedItems.filter(item => item.category === 'TV Series');

    bookmarkedMovies.forEach(cardData => {
        moviesContainer.appendChild(createCardElement(cardData));
    });

    bookmarkedTvSeries.forEach(cardData => {
        tvSeriesContainer.appendChild(createCardElement(cardData));
    });

    updateBackgroundImages();
}

document.addEventListener('DOMContentLoaded', renderBookmarkedContent);
smBreakpoint.addListener(updateBackgroundImages);
mdBreakpointImages.addListener(updateBackgroundImages);