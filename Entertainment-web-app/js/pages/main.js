import appData from '../../data/data.json' with { type: 'json' };

// --------------------------- دوال إدارة البيانات المشتركة ----------------------------
// تحميل البيانات المحفوظة من localStorage 
function loadData() {
    const storedData = localStorage.getItem('appData');
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            return appData.map(item => { // هنا يم تحديث البيانات التي تغيرت ويتم ارجاع المصفوفة الجديدة والمحدثة
                const storedItem = parsedData.find(d => d.title === item.title);
                if (storedItem) {
                    return storedItem; // يمثل الاوبجكت المحدث
                }
                return item; // اذا لا يوجد هناك تحديث يرجع البيانات الاصلية
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

// يمثل ملف جيسون الذي يحتوي على البيانات (الحالية + المحفوظة)
let currentAppData = loadData();

// --------------------------- دالة معالجة النقر على الأيقونة ----------------------------
function handleBookmarkClick(event) {
    const bookmarkIcon = event.currentTarget; // للاشارة الى ايقونة الحفظ الذي وقع عليها الحدث
    const cardTitle = bookmarkIcon.dataset.title; // من خلال عنوان البطاقة استطيع ان اميز اي البطاقات التي وقع عليها الحدث

    const item = currentAppData.find(data => data.title === cardTitle); 

    // هنا يتم تحديث البيانات في ملف جيسون المحدث
    if (item) {
        item.isBookmarked = !item.isBookmarked; // تبديل حالة الإشارة المرجعية (true <-> false)
        bookmarkIcon.classList.toggle('bookmarked'); // هذا كلاس موجود بملف css يحتوي على الايقونة الممتلئة 
        saveData(currentAppData); // ارسال المصفوفة المحدثة إلى localStorage
    }
}

// --------------------------- انشاء البطاقات الترند والرائجة----------------------------
const cardRecommended = document.querySelector('main');
const cardTrending = document.querySelector('.carousel');

const smBreakpoint = window.matchMedia('(min-width: 376px)');
const mdBreakpointImages = window.matchMedia('(min-width: 769px)');

const createdCards = [];

for (let i = 0; i < currentAppData.length; i++) {
    const cardData = currentAppData[i];

    let categoryIconHTML;
    if (cardData.category === 'Movie') {
        categoryIconHTML = `<img src="./assets/icon-category-movie.svg"> ${cardData.category}`;
    } else {
        categoryIconHTML = `<img src="./assets/icon-category-tv.svg"> ${cardData.category}`;
    }
    
    // اعطاء كلاس للعنصر يحتوي على ايقونة الحفظ بملف اتنسيقات بناءا على البيانات في مف جيسون 
    const bookmarkClass = cardData.isBookmarked ? 'card-bookmark bookmarked' : 'card-bookmark';
    // في المواقع الاخرى استطيع كتابة فقط 
    // const bookmarkClass = 'card-bookmark';

    const cardItem = document.createElement('div');

    if (cardData.isTrending) {
        // Trending Cards
        cardItem.classList.add('card', `card-${i + 1}`);

        cardItem.innerHTML = `
            <div class="${bookmarkClass}" data-title="${cardData.title}"></div>
            <div>
                <div class="card-text">
                    <span class="card-year">${cardData.year}</span> • 
                    <span class="card-category">${categoryIconHTML}</span> • 
                    <span class="card-rating">${cardData.rating}</span>
                </div>
                <h5 class="card-title">${cardData.title}</h5>
            </div>`

        cardTrending.appendChild(cardItem);
        createdCards.push(cardItem);
    } else {
        // Recommended Cards
        cardItem.className = 'card-recommended';
    
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
    
        cardRecommended.appendChild(cardItem);
    
        const cardElement = cardItem.querySelector('.cards');
        if (cardElement) {
            createdCards.push(cardElement);
        }
    }
    
    // ربط مستمع الحدث لكلا النوعين من البطاقات
    const cardBookmark = cardItem.querySelector('.card-bookmark');
    if (cardBookmark) {
        cardBookmark.addEventListener('click', handleBookmarkClick);
    }
}

// --------------------------- تحديث الخلفيات  ----------------------------
function updateBackgroundImages() {
    let imageKey;
    let imagePath;
    
    currentAppData.forEach((bgCard, index) => {
        if (bgCard.isTrending) {
            if (mdBreakpointImages.matches) { // screen large (> 768px)
                imageKey = 'large';
            } else { // screen small (<= 768px)
                imageKey = 'small';
            }
            imagePath = bgCard.thumbnail.trending[imageKey];
            
            // في بطاقات Trending، createdCards[index] هو cardItem نفسه
            if (createdCards[index] && imagePath) {
                createdCards[index].style.backgroundImage = `url('${imagePath}')`;
            }
        } else {
            // Recommended Cards
            if (mdBreakpointImages.matches) { // screen large (> 768px)
                imageKey = 'large';
            } else if (smBreakpoint.matches) { // screen medium (376px - 768px)
                imageKey = 'medium';
            } else { // screen small (<= 375px)
                imageKey = 'small';
            }
            imagePath = bgCard.thumbnail.regular[imageKey];
            
            // في بطاقات Recommended، createdCards[index] هو عنصر .cards الداخلي
            if (createdCards[index] && imagePath) {
                createdCards[index].style.backgroundImage = `url('${imagePath}')`;
            }
        }
    });
}
updateBackgroundImages();
smBreakpoint.addListener(updateBackgroundImages);
mdBreakpointImages.addListener(updateBackgroundImages);