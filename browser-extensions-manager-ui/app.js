import appData from './data.json' with { type: 'json' };

const logoCard = document.querySelectorAll('.logo-card');
const cardTitle = document.querySelectorAll('.card-title');
const cardSubtitle = document.querySelectorAll('.card-subtitle');
const Cards = document.querySelectorAll('.card');
const btnRemove = document.querySelectorAll('.card-bottom > button');
const btnSwitch = document.querySelectorAll('.form-check-input.form-check-input-lg');
const filterButtons = document.querySelectorAll('nav ul li button');


// The code for filling in the data for each card
appData.forEach((card, index) => {
    logoCard[index].src = card.logo;
    cardTitle[index].textContent = card.name;
    cardSubtitle[index].textContent = card.description;
});

function filterCards(status) {
    const allCheckboxes = document.querySelectorAll('.form-check-input.form-check-input-lg');

    Cards.forEach((card, index) => {
        let shouldShow = false;

        if (status === 'all') {
            shouldShow = true;
        } else if (status === 'active') {
            shouldShow = allCheckboxes[index].checked === true; 
        } else if (status === 'inactive') {
            shouldShow = allCheckboxes[index].checked === false; 
        }
        
        card.style.display = shouldShow ? 'flex' : 'none';
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active-filter'));
        button.classList.add('active-filter');

        const filterType = button.textContent.toLowerCase(); 
        filterCards(filterType);
    });
});

// تطبيق التصفية الافتراضية (All) عند تحميل الصفحة
const allButton = Array.from(filterButtons).find(btn => btn.textContent.toLowerCase() === 'all');
if (allButton) {
    allButton.click();
}

// The code to delete each card when clicking the remove button
btnRemove.forEach((button) => {
    button.addEventListener('click', (event) => {
        const cardToRemove = button.closest('.card');
        if (cardToRemove) {
            cardToRemove.remove();
        }
    });
});


// Switching between dark mode and light mode
const switchMode = document.querySelector('.switch-mode');
const header = document.querySelector('.header');
const nav = document.querySelectorAll('nav ul li button');
const colorTextLogo = document.querySelector('svg > path');
const subTitleColor = document.querySelector('nav > h2');

switchMode.addEventListener('click', function() {
    switchMode.classList.toggle('switch-mode-light');
    document.body.classList.toggle('body-light-mode');
    header.classList.toggle('header-light-mode');
    colorTextLogo.classList.toggle('text-color-logo');
    subTitleColor.classList.toggle('text-color-logo');

    nav.forEach((styleBtn) => {
        styleBtn.classList.toggle('nav-light-mode');
    })
    Cards.forEach((bgCards) => {
        bgCards.classList.toggle('card-light-mode');
    })
    cardTitle.forEach((title) => {
        title.classList.toggle('card-head-light');
    })
    btnRemove.forEach((btn) => {
        btn.classList.toggle('btnRemove-lightMode');
    })
    btnSwitch.forEach((btn) => {
        btn.classList.toggle('btn-switch-light');
    })
    cardSubtitle.forEach((subtitle) => {
        subtitle.classList.toggle('subtitle-light');
    })
});