// ===================================== Mobile Menu Button =====================================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const offcanvasMenu = document.getElementById("offcanvasMenu");
const offcanvasOverlay = document.getElementById("offcanvasOverlay");
const closeOffcanvas = document.getElementById("closeOffcanvas");

// Open Offcanvas Menu
mobileMenuBtn.addEventListener("click", () => {
    offcanvasMenu.classList.add("active");
    offcanvasOverlay.classList.add("active");
});

// Close Offcanvas Menu
closeOffcanvas.addEventListener("click", () => {
    offcanvasMenu.classList.remove("active");
    offcanvasOverlay.classList.remove("active");
});

// Close offcanvas when clicking outside
offcanvasOverlay.addEventListener("click", () => {
    offcanvasMenu.classList.remove("active");
    offcanvasOverlay.classList.remove("active");
});

// Toggle submenu visibility
const submenuToggles = document.querySelectorAll(".offcanvas-submenu-toggle");
const allSubmenus = document.querySelectorAll(".offcanvas-submenu");

submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const submenuId = toggle.getAttribute("data-submenu");
        const currentSubmenu = document.getElementById(submenuId);

        // إغلاق جميع القوائم الفرعية المفتوحة مسبقاً باستثناء القائمة الحالية
        allSubmenus.forEach((submenu) => {
            if (submenu !== currentSubmenu) {
                submenu.classList.remove("active");
            }
        });

        currentSubmenu.classList.toggle("active");
        toggle.classList.toggle("active");
    });
});
// ==============================================================================================

// ===================================== Desktop Dropdowns ======================================
const dropdownBtns = document.querySelectorAll(".dropdown-btn");
const dropdownMenus = document.querySelectorAll(".dropdown-menu");

dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const currentMenu = btn.nextElementSibling;

        // close other open dropdowns first
        dropdownMenus.forEach((menu) => {
            if (menu !== currentMenu && menu.classList.contains("active")) {
                menu.classList.remove("active");
                menu.previousElementSibling.classList.remove("active");
            }
        });

        currentMenu.classList.toggle("active");
        btn.classList.toggle("active");
    });
});

// closing any open menu when clicking anywhere else in the document
document.addEventListener("click", () => {
    dropdownMenus.forEach((menu) => {
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
            menu.previousElementSibling.classList.remove("active");
        }
    });
});
// ==============================================================================================
