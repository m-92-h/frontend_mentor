import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style.css";

// ─── DOM Elements ───────────────────────────────────────────
const errorMsg = document.querySelectorAll(".message-error") as NodeListOf<HTMLElement>;
const inputs = document.querySelectorAll(".form-control-custom") as NodeListOf<HTMLInputElement>;
const button = document.querySelector(".btn-custom") as HTMLButtonElement;

const cardDisplayNumber = document.querySelector(".card-number") as HTMLParagraphElement;
const cardDisplayName = document.querySelector(".card-holder-name") as HTMLHeadingElement;
const cardDisplayExpDate = document.querySelector(".card-exp-date") as HTMLParagraphElement;
const cardDisplayCvc = document.querySelector(".card-cvc") as HTMLParagraphElement;

const pageComplete = document.querySelector(".page-complete") as HTMLElement;
const cardFormContainer = document.querySelector(".card-form-container") as HTMLElement;
const monthInput = document.getElementById("monthly") as HTMLInputElement;
const dayInput = document.getElementById("day") as HTMLInputElement;

// ─── Regex Patterns ─────────────────────────────────────────
const regex: Record<string, RegExp> = {
    "cardholder-name": /^[a-zA-Z\s]+$/,
    "card-number": /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
    monthly: /^(0[1-9]|1[0-2])$/,
    day: /^(0[1-9]|[12][0-9]|3[01])$/,
    cvc: /^\d{3}$/,
};

// ─── Error Messages ──────────────────────────────────────────
const errorMessages: Record<string, string> = {
    "cardholder-name": "Wrong format, letters only",
    "card-number": "Wrong format, 16 digits only",
    monthly: "Wrong format, must be 2 digits",
    day: "Wrong format, must be 2 digits",
    cvc: "Wrong format, must be 3 digits",
};

// ─── Validate Field ──────────────────────────────────────────
function validateField(inputElement: HTMLInputElement, index: number): boolean {
    const value = inputElement.value.trim();
    const inputId = inputElement.id;
    const currentRegex = regex[inputId];

    if (value === "") {
        errorMsg[index].textContent = "Can't be blank";
        inputElement.classList.add("is-invalid");
        return false;
    }

    if (currentRegex && !currentRegex.test(value)) {
        errorMsg[index].textContent = errorMessages[inputId] ?? "Wrong format";
        inputElement.classList.add("is-invalid");
        return false;
    }

    errorMsg[index].textContent = "";
    inputElement.classList.remove("is-invalid");
    inputElement.classList.add("is-valid");
    return true;
}

// ─── Live Input Updates ──────────────────────────────────────
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        const value = input.value.toUpperCase();

        switch (input.id) {
            case "cardholder-name":
                cardDisplayName.textContent = value || "JANE APPLESEED";
                break;
            case "card-number": {
                const formattedNumber = value
                    .replace(/\s/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim();
                input.value = formattedNumber;
                cardDisplayNumber.textContent = formattedNumber || "0000 0000 0000 0000";
                break;
            }
            case "monthly":
                cardDisplayExpDate.textContent = `${value || "00"}/${dayInput.value || "00"}`;
                break;
            case "day":
                cardDisplayExpDate.textContent = `${monthInput.value || "00"}/${value || "00"}`;
                break;
            case "cvc":
                cardDisplayCvc.textContent = value || "000";
                break;
        }
    });
});

// ─── Confirm Button ──────────────────────────────────────────
button.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();

    let formValid = true;

    inputs.forEach((inputElement, index) => {
        if (!validateField(inputElement, index)) {
            formValid = false;
        }
    });

    if (formValid) {
        cardFormContainer.classList.add("d-none");
        pageComplete.classList.remove("d-none");
    }
});

// ─── Continue Button (Reset) ─────────────────────────────────
const btnContinue = document.querySelector(".page-complete .btn-custom") as HTMLButtonElement;

btnContinue.addEventListener("click", () => {
    pageComplete.classList.add("d-none");
    cardFormContainer.classList.remove("d-none");

    inputs.forEach((input) => {
        input.value = "";
        input.classList.remove("is-invalid", "is-valid");
    });

    errorMsg.forEach((div) => (div.textContent = ""));

    cardDisplayName.textContent = "JANE APPLESEED";
    cardDisplayNumber.textContent = "0000 0000 0000 0000";
    cardDisplayExpDate.textContent = "00/00";
    cardDisplayCvc.textContent = "000";
});