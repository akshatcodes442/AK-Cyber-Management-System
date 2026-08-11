
"use strict";

/* =========================================================
AK CYBER MANAGEMENT SYSTEM
REPORTS MODULE
========================================================= */

const CUSTOMERS_KEY = "akCyberCustomers";
const APPLICATIONS_KEY = "akCyberApplications";
const PAYMENTS_KEY = "akCyberPayments";
const SERVICES_KEY = "akCyberServices";

/* =========================================================
DOM ELEMENTS
========================================================= */

const totalCustomers = document.getElementById("reportTotalCustomers");
const totalApplications = document.getElementById("reportTotalApplications");
const totalIncome = document.getElementById("reportTotalIncome");
const totalServices = document.getElementById("reportTotalServices");

const refreshBtn = document.getElementById("refreshReports");
const exportBtn = document.getElementById("exportReport");
const dateBtn = document.getElementById("reportDateBtn");

const customerOverview = document.getElementById("customerOverview");
const applicationOverview = document.getElementById("applicationOverview");
const paymentOverview = document.getElementById("paymentOverview");
const serviceOverview = document.getElementById("serviceOverview");

/* =========================================================
GET STORAGE DATA
========================================================= */

function getStorageData(key) {
    try {
        const data = localStorage.getItem(key);

        if (!data) {
            return [];
        }

        const parsed = JSON.parse(data);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {
        console.error(`Unable to load ${key}:`, error);
        return [];
    }
}

/* =========================================================
GET REPORT DATA
========================================================= */

function getReportData() {
    const customers = getStorageData(CUSTOMERS_KEY);
    const applications = getStorageData(APPLICATIONS_KEY);
    const payments = getStorageData(PAYMENTS_KEY);
    const services = getStorageData(SERVICES_KEY);

    const income = payments.reduce((total, payment) => {
        const amount =
            Number(
                payment.amount ||
                payment.price ||
                payment.total ||
                0
            );

        return total + (Number.isFinite(amount) ? amount : 0);

    }, 0);

    return {
        customers,
        applications,
        payments,
        services,
        income
    };
}

/* =========================================================
UPDATE STATISTICS
========================================================= */

function updateStatistics(data) {

    if (totalCustomers) {
        totalCustomers.textContent =
            data.customers.length;
    }

    if (totalApplications) {
        totalApplications.textContent =
            data.applications.length;
    }

    if (totalIncome) {
        totalIncome.textContent =
            `₹${data.income.toFixed(2)}`;
    }

    if (totalServices) {
        totalServices.textContent =
            data.services.length;
    }
}

/* =========================================================
UPDATE OVERVIEW
========================================================= */

function updateOverview(data) {

    if (customerOverview) {
        customerOverview.textContent =
            data.customers.length;
    }

    if (applicationOverview) {
        applicationOverview.textContent =
            data.applications.length;
    }

    if (paymentOverview) {
        paymentOverview.textContent =
            `₹${data.income.toFixed(2)}`;
    }

    if (serviceOverview) {
        serviceOverview.textContent =
            data.services.length;
    }
}

/* =========================================================
LOAD REPORTS
========================================================= */

function loadReports() {

    const data = getReportData();

    updateStatistics(data);
    updateOverview(data);

    console.log("AK Cyber Reports Updated");
}

/* =========================================================
REFRESH REPORT
========================================================= */

if (refreshBtn) {

    refreshBtn.addEventListener(
        "click",
        function () {

            loadReports();

            refreshBtn.classList.add("refreshing");

            setTimeout(() => {
                refreshBtn.classList.remove("refreshing");
            }, 500);
        }
    );
}

/* =========================================================
DATE BUTTON
========================================================= */

if (dateBtn) {

    dateBtn.addEventListener(
        "click",
        function () {

            const today =
                new Date().toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );

            alert(
                `Report Date: ${today}`
            );
        }
    );
}

/* =========================================================
EXPORT REPORT
========================================================= */

if (exportBtn) {

    exportBtn.addEventListener(
        "click",
        function () {

            const data = getReportData();

            const report = [
                "AK CYBER MANAGEMENT SYSTEM",
                "BUSINESS REPORT",
                "==============================",
                "",
                `Total Customers: ${data.customers.length}`,
                `Total Applications: ${data.applications.length}`,
                `Total Services: ${data.services.length}`,
                `Total Income: ₹${data.income.toFixed(2)}`,
                "",
                `Generated: ${
                    new Date().toLocaleString("en-IN")
                }`
            ].join("\n");

            const blob =
                new Blob(
                    [report],
                    { type: "text/plain" }
                );

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;
            link.download =
                "AK-Cyber-Business-Report.txt";

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);
        }
    );
}

/* =========================================================
QUICK REPORT BUTTONS
========================================================= */

document.querySelectorAll(
    ".quick-report"
).forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const reportType =
                button.dataset.report;

            if (!reportType) {
                return;
            }

            const data =
                getReportData();

            let message = "";

            if (reportType === "customers") {

                message =
                    `Total Customers: ${data.customers.length}`;
            }

            if (reportType === "applications") {

                message =
                    `Total Applications: ${data.applications.length}`;
            }

            if (reportType === "payments") {

                message =
                    `Total Income: ₹${data.income.toFixed(2)}`;
            }

            if (reportType === "services") {

                message =
                    `Total Services: ${data.services.length}`;
            }

            if (message) {
                alert(message);
            }
        }
    );
});

/* =========================================================
INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadReports();

        console.log(
            "AK Cyber Reports Module Loaded"
        );
    }
);
