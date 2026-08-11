"use strict";

/* =========================================================
AK CYBER MANAGEMENT SYSTEM
COMMON SETTINGS SYNC
========================================================= */

const COMMON_SETTINGS_KEY =
"akCyberSettings";

/* =========================================================
GET SETTINGS
========================================================= */

function getCommonSettings() {


try {

    const stored =
        localStorage.getItem(
            COMMON_SETTINGS_KEY
        );

    if (!stored) {

        return {
            adminName: "Admin",
            businessName: "AK CYBER"
        };

    }

    return JSON.parse(stored);

} catch (error) {

    console.error(
        "Common settings error:",
        error
    );

    return {
        adminName: "Admin",
        businessName: "AK CYBER"
    };

}


}

/* =========================================================
SYNC ADMIN NAME
========================================================= */

function syncAdminName() {


const settings =
    getCommonSettings();

const adminName =
    settings.adminName ||
    "Admin";


/* Topbar profile */

document
    .querySelectorAll(
        "[data-admin-name]"
    )
    .forEach(
        element => {

            element.textContent =
                adminName;

        }
    );


/* Welcome text */

document
    .querySelectorAll(
        "[data-admin-welcome]"
    )
    .forEach(
        element => {

            element.textContent =
                `Welcome back, ${adminName}`;

        }
    );


}

/* =========================================================
SYNC BUSINESS NAME
========================================================= */

function syncBusinessName() {


const settings =
    getCommonSettings();

const businessName =
    settings.businessName ||
    "AK CYBER";


document
    .querySelectorAll(
        "[data-business-name]"
    )
    .forEach(
        element => {

            element.textContent =
                businessName;

        }
    );


}

/* =========================================================
INITIALIZE
========================================================= */

document.addEventListener(
"DOMContentLoaded",
() => {


    syncAdminName();

    syncBusinessName();

}


);
