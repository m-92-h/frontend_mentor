// --------------------------- Active Icon ----------------------------
function handleActiveNavigation() {
    const iconLinks = document.querySelectorAll(".icon-sidebar a");
    const currentPath = window.location.pathname.replace(/\/$/, ""); // الحصول على المسار الحالي للصفحة (مثل /index.html)

    iconLinks.forEach((link) => {
        link.classList.remove("icon-active");
        const linkPath = new URL(link.href).pathname.replace(/\/$/, ""); // الحصول على مسار الرابط (مثل /movies.html)

        if (currentPath === linkPath) {
            link.classList.add("icon-active");
        }
    });
}

// ------------------- منطق تسجيل الدخول/الخروج وتحديث الاتجاه  -------------------------
function handleProfileState() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isSignUp = localStorage.getItem("isSignUp");
    const registrationDiv = document.querySelector(".registration");
    const profileDiv = document.querySelector(".profile");

    if (isLoggedIn === "true" || isSignUp === "true") {
        if (registrationDiv) registrationDiv.classList.add("d-none");
        if (profileDiv) profileDiv.classList.remove("d-none");

        // add button Logout
        if (profileDiv) {
            const profileUl = profileDiv.querySelector(".dropdown-menu");
            if (profileUl) {
                const logoutItem = document.createElement("li");
                logoutItem.innerHTML = '<a class="dropdown-item" href="#">Logout</a>';

                logoutItem.querySelector("a").addEventListener("click", function (e) {
                    e.preventDefault();
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("isSignUp");
                    window.location.href = "./index.html";
                });

                profileUl.appendChild(logoutItem);
            }
        }
    } else {
        if (registrationDiv) registrationDiv.classList.remove("d-none");
        if (profileDiv) profileDiv.classList.add("d-none");
    }

    // ---------------------- Direction update dropdown-menu ------------------------
    const mdBreakpoint = window.matchMedia("(min-width: 768px)");
    function handleDropdownDirection(mediaQuery) {
        if (profileDiv) {
            if (mediaQuery.matches) {
                profileDiv.classList.add("dropend");
            } else {
                profileDiv.classList.remove("dropend");
            }
        }
    }
    handleDropdownDirection(mdBreakpoint);
    mdBreakpoint.addListener(handleDropdownDirection);
}

document.addEventListener("DOMContentLoaded", function () {
    handleActiveNavigation();
    handleProfileState();
});

// ---------------------- زر البحث ------------------------
function performLiveSearch() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const allCards = document.querySelectorAll(".card, .card-recommended"); // الاستعلام على جميع البطاقات الترند والرائجة في آن واحد من خلال استخدام الفارزة

    allCards.forEach((card) => {
        const titleElement = card.querySelector("h5");
        const cardText = (titleElement ? titleElement.textContent : card.textContent).toLowerCase();

        const matchesSearch = cardText.includes(searchTerm);
        if (matchesSearch) {
            card.style.display = ""; // هذا يعيد البطاقة الى الوضع الذي كانت عليه يعني اذا كانت فليكس تبقى فليكس واذا بلوك تبقى بلوك مما يؤدي الى اظهار البطاقة
        } else {
            card.style.display = "none"; // اخفاء البطاقة التي لم يتم العثور عليها
        }
    });

    const titles = document.querySelectorAll("h4");

    if (searchTerm.length > 0) {
        // إذا كان هناك نص مكتوب، اخفِ العناوين الرئيسية
        titles.forEach((title) => (title.style.display = "none"));
    } else {
        // إذا كان حقل البحث فارغاً، أعد إظهار العناوين
        titles.forEach((title) => (title.style.display = ""));

        // إعادة إظهار كل البطاقات
        allCards.forEach((card) => {
            card.style.display = "";
        });
    }
}
