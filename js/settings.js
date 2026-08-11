"use strict";

/* =========================================================
AK CYBER MANAGEMENT SYSTEM
SETTINGS MODULE — FINAL
========================================================= */

const SETTINGS_KEY = "akCyberSettings";

const defaultSettings = {
adminName: "Admin",
adminEmail: "",
adminPhone: "",
businessName: "AK CYBER",
businessPhone: "",
businessAddress: "",
notifications: true,
autoSave: true,
confirmDelete: true
};

/* =========================================================
GET SETTINGS
========================================================= */

function getSettings() {
try {
const stored = localStorage.getItem(SETTINGS_KEY);


    if (!stored) {
        saveSettings(defaultSettings);

        return {
            ...defaultSettings
        };
    }

    const parsed = JSON.parse(stored);

    return {
        ...defaultSettings,
        ...parsed
    };

} catch (error) {
    console.error("Settings load error:", error);

    return {
        ...defaultSettings
    };
}


}

/* =========================================================
SAVE SETTINGS
========================================================= */

function saveSettings(settings) {
localStorage.setItem(
SETTINGS_KEY,
JSON.stringify(settings)
);
}

/* =========================================================
DOM ELEMENTS
========================================================= */

const adminName = document.getElementById("adminName");
const adminEmail = document.getElementById("adminEmail");
const adminPhone = document.getElementById("adminPhone");

const businessName = document.getElementById("businessName");
const businessPhone = document.getElementById("businessPhone");
const businessAddress = document.getElementById("businessAddress");

const notificationsToggle =
document.getElementById("notificationsToggle");

const autoSaveToggle =
document.getElementById("autoSaveToggle");

const confirmToggle =
document.getElementById("confirmToggle");

const saveProfileBtn =
document.getElementById("saveProfileBtn");

const saveBusinessBtn =
document.getElementById("saveBusinessBtn");

const changePasswordBtn =
document.getElementById("changePasswordBtn");

const clearDataBtn =
document.getElementById("clearDataBtn");

/* =========================================================
LOAD SETTINGS
========================================================= */

function loadSettings() {


const settings = getSettings();

if (adminName) {
    adminName.value = settings.adminName;
}

if (adminEmail) {
    adminEmail.value = settings.adminEmail;
}

if (adminPhone) {
    adminPhone.value = settings.adminPhone;
}

if (businessName) {
    businessName.value = settings.businessName;
}

if (businessPhone) {
    businessPhone.value = settings.businessPhone;
}

if (businessAddress) {
    businessAddress.value = settings.businessAddress;
}

if (notificationsToggle) {
    notificationsToggle.checked =
        settings.notifications;
}

if (autoSaveToggle) {
    autoSaveToggle.checked =
        settings.autoSave;
}

if (confirmToggle) {
    confirmToggle.checked =
        settings.confirmDelete;
}

}

/* =========================================================
SAVE PROFILE
========================================================= */

if (saveProfileBtn) {


saveProfileBtn.addEventListener(
    "click",
    function () {

        const settings = getSettings();

        const newName =
            adminName
                ? adminName.value.trim()
                : "";

        if (!newName) {
            alert("Please enter your name.");

            if (adminName) {
                adminName.focus();
            }

            return;
        }

        settings.adminName = newName;

        settings.adminEmail =
            adminEmail
                ? adminEmail.value.trim()
                : "";

        settings.adminPhone =
            adminPhone
                ? adminPhone.value.trim()
                : "";

        saveSettings(settings);

        alert("Profile saved successfully.");

    }
);

}

/* =========================================================
SAVE BUSINESS
========================================================= */

if (saveBusinessBtn) {


saveBusinessBtn.addEventListener(
    "click",
    function () {

        const settings = getSettings();

        const newBusinessName =
            businessName
                ? businessName.value.trim()
                : "";

        if (!newBusinessName) {

            alert(
                "Please enter business name."
            );

            if (businessName) {
                businessName.focus();
            }

            return;
        }

        settings.businessName =
            newBusinessName;

        settings.businessPhone =
            businessPhone
                ? businessPhone.value.trim()
                : "";

        settings.businessAddress =
            businessAddress
                ? businessAddress.value.trim()
                : "";

        saveSettings(settings);

        alert(
            "Business settings saved successfully."
        );

    }
);


}

/* =========================================================
SYSTEM PREFERENCES
========================================================= */

function savePreferences() {


const settings = getSettings();

settings.notifications =
    notificationsToggle
        ? notificationsToggle.checked
        : true;

settings.autoSave =
    autoSaveToggle
        ? autoSaveToggle.checked
        : true;

settings.confirmDelete =
    confirmToggle
        ? confirmToggle.checked
        : true;

saveSettings(settings);


}

if (notificationsToggle) {


notificationsToggle.addEventListener(
    "change",
    savePreferences
);

}

if (autoSaveToggle) {


autoSaveToggle.addEventListener(
    "change",
    savePreferences
);


}

if (confirmToggle) {


confirmToggle.addEventListener(
    "change",
    savePreferences
);

}

/* =========================================================
AUTO SAVE BUSINESS
========================================================= */

function autoSaveBusiness() {


const settings = getSettings();

if (!settings.autoSave) {
    return;
}

if (businessName) {
    settings.businessName =
        businessName.value.trim();
}

if (businessPhone) {
    settings.businessPhone =
        businessPhone.value.trim();
}

if (businessAddress) {
    settings.businessAddress =
        businessAddress.value.trim();
}

saveSettings(settings);


}

if (businessName) {


businessName.addEventListener(
    "change",
    autoSaveBusiness
);


}

if (businessPhone) {


businessPhone.addEventListener(
    "change",
    autoSaveBusiness
);


}

if (businessAddress) {


businessAddress.addEventListener(
    "change",
    autoSaveBusiness
);


}

/* =========================================================
CHANGE PASSWORD
========================================================= */

if (changePasswordBtn) {


changePasswordBtn.addEventListener(
    "click",
    function () {

        alert(
            "Password management will be connected to authentication in the next security step."
        );

    }
);


}

/* =========================================================
CLEAR LOCAL DATA
========================================================= */

if (clearDataBtn) {


clearDataBtn.addEventListener(
    "click",
    function () {

        const confirmed =
            confirm(
                "This will clear all locally stored AK Cyber data. Continue?"
            );

        if (!confirmed) {
            return;
        }

        localStorage.clear();

        alert(
            "Local data cleared successfully."
        );

        location.reload();

    }
);

}

/* =========================================================
INITIALIZE
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function () {


    loadSettings();

    console.log(
        "AK Cyber Settings Module Loaded Successfully"
    );

}


);
