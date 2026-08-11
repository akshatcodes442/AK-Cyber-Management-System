
/* =========================================================
AK CYBER MANAGEMENT SYSTEM
DASHBOARD — LIVE DATA + PROFILE SYNC
========================================================= */

"use strict";

/* =========================================================
STORAGE KEYS
========================================================= */

const DASHBOARD_CUSTOMERS_KEY = "akCyberCustomers";
const DASHBOARD_APPLICATIONS_KEY = "akCyberApplications";
const DASHBOARD_PAYMENTS_KEY = "akCyberPayments";
const DASHBOARD_PROFILE_KEY = "akCyberProfile";

/* =========================================================
HELPERS
========================================================= */

function dashboardGetStorage(key) {
    try {
        const data = localStorage.getItem(key);

        if (!data) {
            return [];
        }

        const parsed = JSON.parse(data);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {
        console.error(`Unable to read ${key}:`, error);
        return [];
    }
}

function dashboardGetProfile() {
    try {
        const data = localStorage.getItem(DASHBOARD_PROFILE_KEY);

        if (!data) {
            return {
                name: "Admin",
                email: "",
                phone: ""
            };
        }

        const profile = JSON.parse(data);

        return {
            name: profile.name || "Admin",
            email: profile.email || "",
            phone: profile.phone || ""
        };

    } catch (error) {
        console.error("Unable to load profile:", error);

        return {
            name: "Admin",
            email: "",
            phone: ""
        };
    }
}

function dashboardToday() {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function dashboardCurrency(amount) {
    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(Number(amount) || 0);
}

/* =========================================================
PROFILE SYNC
========================================================= */

function updateDashboardProfile() {

    const profile = dashboardGetProfile();

    const adminName =
        profile.name || "Admin";

    const adminNameElement =
        document.getElementById(
            "dashboardAdminName"
        );

    if (adminNameElement) {
        adminNameElement.textContent =
            adminName;
    }

    const welcomeElement =
        document.getElementById(
            "dashboardWelcomeText"
        );

    if (welcomeElement) {
        welcomeElement.textContent =
            `Welcome back, ${adminName}`;
    }
}

/* =========================================================
LOAD DASHBOARD DATA
========================================================= */

function updateDashboardStatistics() {

    const customers =
        dashboardGetStorage(
            DASHBOARD_CUSTOMERS_KEY
        );

    const applications =
        dashboardGetStorage(
            DASHBOARD_APPLICATIONS_KEY
        );

    const payments =
        dashboardGetStorage(
            DASHBOARD_PAYMENTS_KEY
        );

    const today =
        dashboardToday();

    /* =====================================================
       TOTAL CUSTOMERS
    ===================================================== */

    const totalCustomerElement =
        document.getElementById(
            "dashboardTotalCustomers"
        );

    if (totalCustomerElement) {
        totalCustomerElement.textContent =
            customers.length;
    }

    /* =====================================================
       APPLICATIONS
    ===================================================== */

    const applicationElements =
        document.querySelectorAll(
            "[data-dashboard-applications]"
        );

    applicationElements.forEach(
        element => {

            element.textContent =
                applications.length;

        }
    );

    /* =====================================================
       TODAY'S INCOME
    ===================================================== */

    const todayIncome =
        payments.reduce(
            (total, payment) => {

                if (
                    payment.date ===
                    today
                ) {
                    return total +
                        Number(
                            payment.amount
                        );
                }

                return total;

            },
            0
        );

    const incomeElements =
        document.querySelectorAll(
            "[data-dashboard-income]"
        );

    incomeElements.forEach(
        element => {

            element.textContent =
                dashboardCurrency(
                    todayIncome
                );

        }
    );

    /* =====================================================
       APPLICATION STATUS
    ===================================================== */

    const applicationSmall =
        document.querySelector(
            "[data-dashboard-application-status]"
        );

    if (applicationSmall) {

        applicationSmall.textContent =
            applications.length === 0
                ? "No applications yet"
                : `${applications.length} ${
                    applications.length === 1
                        ? "application"
                        : "applications"
                } recorded`;
    }

    /* =====================================================
       CUSTOMER STATUS
    ===================================================== */

    const customerSmall =
        document.querySelector(
            "[data-dashboard-customer-status]"
        );

    if (customerSmall) {

        customerSmall.textContent =
            customers.length === 0
                ? "No customers yet"
                : `${customers.length} ${
                    customers.length === 1
                        ? "customer"
                        : "customers"
                } registered`;
    }

    /* =====================================================
       INCOME STATUS
    ===================================================== */

    const incomeSmall =
        document.querySelector(
            "[data-dashboard-income-status]"
        );

    if (incomeSmall) {

        incomeSmall.textContent =
            todayIncome === 0
                ? "Today's collection"
                : "Collected today";
    }

    /* =====================================================
       PRINT JOBS
    ===================================================== */

    const printJobs =
        dashboardGetStorage(
            "akCyberPrintJobs"
        );

    const printJobElements =
        document.querySelectorAll(
            "[data-dashboard-print-jobs]"
        );

    printJobElements.forEach(
        element => {

            const todayPrintJobs =
                printJobs.filter(
                    job =>
                        job.date ===
                        today
                );

            element.textContent =
                todayPrintJobs.length;
        }
    );

    console.log(
        "Dashboard statistics updated."
    );
}

/* =========================================================
ADD DATA ATTRIBUTES TO EXISTING CARDS
========================================================= */

function prepareDashboardCards() {

    /* Applications */

    const applicationCard =
        document.querySelector(
            ".stats-grid .stat-card:nth-child(2)"
        );

    if (applicationCard) {

        const number =
            applicationCard.querySelector(
                "strong"
            );

        const small =
            applicationCard.querySelector(
                "small"
            );

        if (number) {

            number.setAttribute(
                "data-dashboard-applications",
                ""
            );
        }

        if (small) {

            small.setAttribute(
                "data-dashboard-application-status",
                ""
            );
        }
    }

    /* Income */

    const incomeCard =
        document.querySelector(
            ".stats-grid .stat-card:nth-child(3)"
        );

    if (incomeCard) {

        const number =
            incomeCard.querySelector(
                "strong"
            );

        const small =
            incomeCard.querySelector(
                "small"
            );

        if (number) {

            number.setAttribute(
                "data-dashboard-income",
                ""
            );
        }

        if (small) {

            small.setAttribute(
                "data-dashboard-income-status",
                ""
            );
        }
    }

    /* Print */

    const printCard =
        document.querySelector(
            ".stats-grid .stat-card:nth-child(4)"
        );

    if (printCard) {

        const number =
            printCard.querySelector(
                "strong"
            );

        if (number) {

            number.setAttribute(
                "data-dashboard-print-jobs",
                ""
            );
        }
    }

    /* Customer */

    const customerCard =
        document.querySelector(
            ".stats-grid .stat-card:nth-child(1)"
        );

    if (customerCard) {

        const small =
            customerCard.querySelector(
                "small"
            );

        if (small) {

            small.setAttribute(
                "data-dashboard-customer-status",
                ""
            );
        }
    }
}

/* =========================================================
RECENT ACTIVITY
========================================================= */

function updateRecentActivity() {

    const container =
        document.querySelector(
            ".dashboard-card .empty-state"
        );

    if (!container) {
        return;
    }

    const customers =
        dashboardGetStorage(
            DASHBOARD_CUSTOMERS_KEY
        );

    const applications =
        dashboardGetStorage(
            DASHBOARD_APPLICATIONS_KEY
        );

    const payments =
        dashboardGetStorage(
            DASHBOARD_PAYMENTS_KEY
        );

    const activities = [];

    /* Customers */

    customers
        .slice(0, 5)
        .forEach(
            customer => {

                activities.push({

                    type:
                        "Customer",

                    title:
                        customer.name ||
                        customer.fullName ||
                        customer.customerName ||
                        "New customer",

                    date:
                        customer.createdAt ||
                        ""

                });

            }
        );

    /* Applications */

    applications
        .slice(0, 5)
        .forEach(
            application => {

                activities.push({

                    type:
                        "Application",

                    title:
                        application.applicationNumber ||
                        "New application",

                    date:
                        application.createdAt ||
                        ""

                });

            }
        );

    /* Payments */

    payments
        .slice(0, 5)
        .forEach(
            payment => {

                activities.push({

                    type:
                        "Payment",

                    title:
                        payment.receiptNumber ||
                        "New payment",

                    date:
                        payment.createdAt ||
                        ""

                });

            }
        );

    if (activities.length === 0) {
        return;
    }

    activities.sort(
        (a, b) => {

            return (
                new Date(b.date || 0) -
                new Date(a.date || 0)
            );

        }
    );

    const latest =
        activities.slice(0, 5);

    container.innerHTML = `

        <div class="dashboard-activity-list">

            ${latest.map(
                activity => `

                    <div class="dashboard-activity-item">

                        <div class="activity-icon">

                            <i class="fa-solid ${
                                activity.type === "Payment"
                                    ? "fa-indian-rupee-sign"
                                    : activity.type === "Application"
                                        ? "fa-file-lines"
                                        : "fa-user"
                            }"></i>

                        </div>

                        <div class="activity-info">

                            <strong>
                                ${dashboardEscape(
                                    activity.title
                                )}
                            </strong>

                            <span>
                                ${dashboardEscape(
                                    activity.type
                                )}
                            </span>

                        </div>

                    </div>

                `
            ).join("")}

        </div>

    `;
}

/* =========================================================
ESCAPE HTML
========================================================= */

function dashboardEscape(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* =========================================================
AUTO REFRESH
========================================================= */

function startDashboardAutoRefresh() {

    updateDashboardProfile();

    updateDashboardStatistics();

    updateRecentActivity();

    setInterval(
        () => {

            updateDashboardProfile();

            updateDashboardStatistics();

            updateRecentActivity();

        },
        5000
    );
}

/* =========================================================
INITIALIZE
========================================================= */

document.addEventListener(
"DOMContentLoaded",
() => {


    prepareDashboardCards();

    loadDashboardSettings();

    startDashboardAutoRefresh();

}


);

/* =========================================================
ALSO RUN IF SCRIPT LOADS AFTER DOM
========================================================= */

if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
) {

    prepareDashboardCards();

    updateDashboardProfile();

    updateDashboardStatistics();

    updateRecentActivity();
}

console.log(
    "Dashboard module initialized successfully."
);

/* =========================================================
LOAD SETTINGS INTO DASHBOARD
========================================================= */

function loadDashboardSettings() {


try {

    const stored =
        localStorage.getItem("akCyberSettings");

    if (!stored) {
        return;
    }

    const settings =
        JSON.parse(stored);

    const adminName =
        settings.adminName || "Admin";

    const businessName =
        settings.businessName || "AK CYBER";


    /* =================================================
       DASHBOARD ADMIN NAME
    ================================================= */

    const adminElement =
        document.getElementById(
            "dashboardAdminName"
        );

    if (adminElement) {

        adminElement.textContent =
            adminName;

    }


    /* =================================================
       WELCOME TEXT
    ================================================= */

    const welcomeElement =
        document.getElementById(
            "dashboardWelcomeText"
        );

    if (welcomeElement) {

        welcomeElement.textContent =
            `Welcome back, ${adminName}`;

    }


    /* =================================================
       DASHBOARD BUSINESS NAME
    ================================================= */

    const businessElement =
        document.getElementById(
            "dashboardBusinessName"
        );

    if (businessElement) {

        businessElement.textContent =
            `Welcome to ${businessName} 🌸`;

    }


    /* =================================================
       SIDEBAR BUSINESS NAME
    ================================================= */

    const sidebarBusinessElement =
        document.getElementById(
            "dashboardSidebarBusinessName"
        );

    if (sidebarBusinessElement) {

        const parts =
            businessName.trim().split(/\s+/);

        if (parts.length > 1) {

            const lastWord =
                parts.pop();

            const firstPart =
                parts.join(" ");

            sidebarBusinessElement.innerHTML =
                `${dashboardEscape(firstPart)} <span>${dashboardEscape(lastWord)}</span>`;

        } else {

            sidebarBusinessElement.textContent =
                businessName;

        }

    }

} catch (error) {

    console.error(
        "Dashboard settings load error:",
        error
    );

}


}