// Download data from JSON
let destinationsData = [];
let crewData = [];
let technologyData = [];

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        destinationsData = data.destinations;
        crewData = data.crew;
        technologyData = data.technology;
        initializePageFunctionality();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Initialize page functionality
function initializePageFunctionality() {
    initializeDestinations();
    initializeCrew();
    initializeTechnology();
}

// ========================= Destinations Functionality =========================
function initializeDestinations() {
    const destLinks = document.querySelectorAll('.info ul li');
    if (destLinks.length === 0) return;

    destLinks.forEach((link ,index) => {
        link.addEventListener('click', function(e) {
            updateDestination(index);
        });
    });
}

function updateDestination(index) {
    if (index >= destinationsData.length) return;

    const destination = destinationsData[index];
    
    // update image
    const image = document.getElementById('destImage');
    if (image) image.src = destination.images.png;

    // update information
    const name = document.getElementById('destName');
    const desc = document.getElementById('destDesc');
    const distance = document.getElementById('destDistance');
    const travel = document.getElementById('destTravel');

    if (name) name.textContent = destination.name;
    if (desc) desc.textContent = destination.description;
    if (distance) distance.textContent = destination.distance;
    if (travel) travel.textContent = destination.travel;

    // update active links
    document.querySelectorAll('.info ul li').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.info ul li')[index].classList.add('active');
}

// ========================= Crew Functionality =========================
function initializeCrew() {
    const crewButtons = document.querySelectorAll('.crew-btn');
    if (crewButtons.length === 0) return;

    crewButtons.forEach((btn ,index) => {
        btn.addEventListener('click', () => updateCrew(index));
    });
}

function updateCrew(index) {
    if (index >= crewData.length) return;

    const crew = crewData[index];

    // using png for crew images
    const image = document.getElementById('crewImage');
    if (image) image.src = crew.images.png;

    // update information
    const role = document.getElementById('crewRole');
    const name = document.getElementById('crewName');
    const bio = document.getElementById('crewBio');

    if (role) role.textContent = crew.role;
    if (name) name.textContent = crew.name;
    if (bio) bio.textContent = crew.bio;

    // update active buttons
    document.querySelectorAll('.crew-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.crew-btn[data-index=\"${index}\"]`).classList.add('active');
}

// ========================= Technology Functionality =========================
function initializeTechnology() {
    const techButtons = document.querySelectorAll('.tech-btn');
    if (techButtons.length === 0) return;

    techButtons.forEach((btn) => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            updateTechnology(index);
        });
    });
}

function updateTechnology(index) {
    if (index >= technologyData.length) return;

    const tech = technologyData[index];

    // update image (use portrait for desktop)
    const image = document.getElementById('techImage');
    if (image) {
        image.src = tech.images.portrait;
    }

    // update information
    const name = document.getElementById('techName');
    const desc = document.getElementById('techDesc');

    if (name) name.textContent = tech.name;
    if (desc) desc.textContent = tech.description;

    // update active buttons
    document.querySelectorAll('.tech-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.tech-btn[data-index=\"${index}\"]`).classList.add('active');
}


document.addEventListener('DOMContentLoaded', loadData);


// Adding hover effects to the Explore button
const exploreBtn = document.querySelector('.explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('mouseenter', function() {
        this.style.opacity = '0.8';
    });
    exploreBtn.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
    });
}
