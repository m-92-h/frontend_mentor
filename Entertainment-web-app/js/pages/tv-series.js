import appData from '../../data/data.json' with { type: 'json' };

// --------------------------- دوال إدارة البيانات ----------------------------
function loadData() {
    const storedData = localStorage.getItem('appData');
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            return appData.map(item => {
                const storedItem = parsedData.find(d => d.title === item.title);
                return storedItem ? storedItem : item;
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

// --------------------------- دالة معالجة النقر على الأيقونة ----------------------------
function handleBookmarkClick(event) {
    const bookmarkIcon = event.currentTarget;
    const cardTitle = bookmarkIcon.dataset.title;

    const item = currentAppData.find(data => data.title === cardTitle);

    if (item) {
        item.isBookmarked = !item.isBookmarked;
        bookmarkIcon.classList.toggle('bookmarked');
        
        saveData(currentAppData);
    }
}

// --------------------------- انشاء البطاقات ----------------------------
const cardTvSeries = document.querySelector('main');
const smBreakpoint = window.matchMedia('(min-width: 376px)');
const mdBreakpointImages = window.matchMedia('(min-width: 769px)');
const createdCards = [];

// التصفية باستخدام البيانات التي تم تحديثها من localStorage
const currentTvSeriesData = currentAppData.filter(card => card.category === 'TV Series'); 

for (let i = 0; i < currentTvSeriesData.length; i++) {
    const cardData = currentTvSeriesData[i];

    const bookmarkClass = cardData.isBookmarked ? 'card-bookmark bookmarked' : 'card-bookmark';

    const cardItem = document.createElement('div');
    cardItem.className = 'card-recommended';

    cardItem.innerHTML = ` 
        <div class="cards">
            <div class="${bookmarkClass}" data-title="${cardData.title}"></div>
        </div>
        <div>
            <div class="card-text">
                <span class="card-year">${cardData.year}</span> • 
                <span class="card-category"><img src="./assets/icon-category-tv.svg"> ${cardData.category}</span> • 
                <span class="card-rating">${cardData.rating}</span>
            </div>
            <h5 class="card-title">${cardData.title}</h5>
        </div>`;

    cardTvSeries.appendChild(cardItem);

    // ربط مستمع الحدث بعد إنشاء البطاقة في DOM
    const cardBookmark = cardItem.querySelector('.card-bookmark');
    if (cardBookmark) {
        cardBookmark.addEventListener('click', handleBookmarkClick);
    }

    const cardElement = cardItem.querySelector('.cards');
    if (cardElement) {
        createdCards.push(cardElement);
    }
}

// --------------------------- تحديث الخلفيات ----------------------------
function updateBackgroundImages() {
    let imageKey;
    let imagePath;
    
    createdCards.forEach((cardElement, index) => {
        const bgCard = currentTvSeriesData[index];

        if (mdBreakpointImages.matches) { // screen large (> 768px)
            imageKey = 'large';
        } else if (smBreakpoint.matches) { // screen medium (376px - 768px)
            imageKey = 'medium';
        } else { // screen small (<= 375px)
            imageKey = 'small';
        }

        imagePath = bgCard.thumbnail.regular[imageKey];
        if (imagePath) {
            cardElement.style.backgroundImage = `url('${imagePath}')`;
        }
        
    });
}
updateBackgroundImages();
smBreakpoint.addListener(updateBackgroundImages);
mdBreakpointImages.addListener(updateBackgroundImages);