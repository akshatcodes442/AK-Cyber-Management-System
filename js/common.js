"use strict";

/* =========================================================
   AK CYBER MANAGEMENT SYSTEM
   COMMON CONTROLLER
   - Settings Sync
   - Sidebar Mobile Navigation
   - Overlay Control
   ========================================================= */


/* =========================================================
   SETTINGS
   ========================================================= */

const COMMON_SETTINGS_KEY = "akCyberSettings";


function getCommonSettings() {

    try {

        const stored =
            localStorage.getItem(COMMON_SETTINGS_KEY);

        if (!stored) {

            return {
                adminName: "Admin",
                businessName: "AK CYBER"
            };

        }

        const parsed = JSON.parse(stored);

        return {
            adminName: parsed.adminName || "Admin",
            businessName: parsed.businessName || "AK CYBER"
        };

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

    const settings = getCommonSettings();

    const adminName =
        settings.adminName || "Admin";


    document
        .querySelectorAll("[data-admin-name]")
        .forEach(element => {

            element.textContent = adminName;

        });


    document
        .querySelectorAll("[data-admin-welcome]")
        .forEach(element => {

            element.textContent =
                `Welcome back, ${adminName}`;

        });

}


/* =========================================================
   SYNC BUSINESS NAME
   ========================================================= */

function syncBusinessName() {

    const settings = getCommonSettings();

    const businessName =
        settings.businessName || "AK CYBER";


    document
        .querySelectorAll("[data-business-name]")
        .forEach(element => {

            element.textContent = businessName;

        });

}


/* =========================================================
   MOBILE SIDEBAR
   ========================================================= */

function initSidebar() {

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");


    if (!menuBtn || !sidebar) {

        return;

    }


    function openSidebar() {

        sidebar.classList.add("open");

        if (overlay) {
            overlay.classList.add("active");
        }

        document.body.classList.add(
            "sidebar-open"
        );

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        if (overlay) {
            overlay.classList.remove("active");
        }

        document.body.classList.remove(
            "sidebar-open"
        );

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    function toggleSidebar() {

        if (sidebar.classList.contains("open")) {

            closeSidebar();

        } else {

            openSidebar();

        }

    }


    menuBtn.addEventListener(
        "click",
        toggleSidebar
    );


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    sidebar
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeSidebar();

                }
            );

        });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                closeSidebar();

            }

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

        initSidebar();

    }
);
