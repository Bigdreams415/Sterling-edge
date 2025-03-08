function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');

    setTimeout(() => {
        let savedLang = localStorage.getItem("selectedLanguage");

        if (savedLang) {
            applyGoogleTranslate(savedLang); // Apply saved language
        } else {
            let browserLang = detectBrowserLanguage();
            applyGoogleTranslate(browserLang); // Apply detected language
        }
    }, 1000);
}

// Function to detect the user's browser language
function detectBrowserLanguage() {
    let lang = navigator.language || navigator.userLanguage; // Get browser language
    lang = lang.split('-')[0]; // Use only the main language code (e.g., "fr" instead of "fr-FR")

    // Check if the detected language is supported by Google Translate
    let supportedLangs = ["en", "fr", "es", "de", "zh", "ar", "hi", "ru", "pt", "it"]; // Add more if needed
    return supportedLangs.includes(lang) ? lang : "en"; // Default to English if not supported
}

// Function to apply a language selection
function applyGoogleTranslate(lang) {
    let select = document.querySelector(".goog-te-combo");
    if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
    }
}

// Show/hide the translate dropdown when the button is clicked
document.addEventListener("DOMContentLoaded", function () {
    let translateBtn = document.getElementById("translate-btn");
    let translateElement = document.getElementById("google_translate_element");

    if (translateBtn) {
        translateBtn.addEventListener("click", function () {
            translateElement.style.display = translateElement.style.display === "block" ? "none" : "block";
        });
    }

    // Listen for language change and store it
    setTimeout(() => {
        let select = document.querySelector(".goog-te-combo");
        if (select) {
            select.addEventListener("change", function () {
                let selectedLang = select.value;
                localStorage.setItem("selectedLanguage", selectedLang);
            });
        }
    }, 2000);
});

// Load Google Translate Script dynamically
(function () {
    let script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
})();
