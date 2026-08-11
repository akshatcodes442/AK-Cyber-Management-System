"use strict";

/* =========================================================
   AK CYBER MANAGEMENT SYSTEM
   SERVICES MODULE
========================================================= */

const SERVICES_KEY = "akCyberServices";

/* =========================================================
   DEFAULT SERVICES
========================================================= */

const defaultServices = [
    {
        id: 1,
        name: "Website Development",
        category: "Digital Services",
        price: 0,
        status: "Active"
    },
    {
        id: 2,
        name: "Master Plan",
        category: "Design Services",
        price: 0,
        status: "Active"
    },
    {
        id: 3,
        name: "Online Form",
        category: "Online Services",
        price: 0,
        status: "Active"
    },
    {
        id: 4,
        name: "Print & Scan",
        category: "Print Services",
        price: 0,
        status: "Active"
    }
];

/* =========================================================
   STORAGE
========================================================= */

function getServices() {
    try {
        const stored = localStorage.getItem(SERVICES_KEY);

        if (!stored) {
            localStorage.setItem(
                SERVICES_KEY,
                JSON.stringify(defaultServices)
            );

            return [...defaultServices];
        }

        const services = JSON.parse(stored);

        return Array.isArray(services)
            ? services
            : [...defaultServices];

    } catch (error) {
        console.error("Unable to load services:", error);
        return [...defaultServices];
    }
}

function saveServices(services) {
    localStorage.setItem(
        SERVICES_KEY,
        JSON.stringify(services)
    );
}

/* =========================================================
   DOM
========================================================= */

const serviceTableBody =
    document.getElementById("servicesTableBody");

const serviceSearch =
    document.getElementById("serviceSearch");

const totalServices =
    document.getElementById("totalServices");

const activeServices =
    document.getElementById("activeServices");

const inactiveServices =
    document.getElementById("inactiveServices");

const addServiceBtn =
    document.getElementById("addServiceBtn");

/* =========================================================
   RENDER SERVICES
========================================================= */

function renderServices(searchTerm = "") {

    if (!serviceTableBody) {
        return;
    }

    const services = getServices();

    const search = searchTerm
        .trim()
        .toLowerCase();

    const filteredServices = services.filter(service => {

        return (
            service.name.toLowerCase().includes(search) ||
            service.category.toLowerCase().includes(search) ||
            service.status.toLowerCase().includes(search)
        );

    });

    serviceTableBody.innerHTML = "";

    if (filteredServices.length === 0) {

        serviceTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-table">
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="fa-solid fa-box-open"></i>
                        </div>

                        <h4>No services found</h4>

                        <p>
                            Try another search or add a new service.
                        </p>
                    </div>
                </td>
            </tr>
        `;

        updateStats(services);
        return;
    }

    filteredServices.forEach((service, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>
                <strong>
                    ${escapeHTML(service.name)}
                </strong>
            </td>

            <td>
                ${escapeHTML(service.category)}
            </td>

            <td>
                ₹${Number(service.price || 0).toFixed(2)}
            </td>

            <td>
                <span class="status-badge ${
                    service.status === "Active"
                        ? "active"
                        : "inactive"
                }">
                    ${escapeHTML(service.status)}
                </span>
            </td>

            <td>
                <div class="service-actions">

                    <button
                        class="action-btn edit"
                        title="Edit Service"
                        data-action="edit"
                        data-id="${service.id}">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="action-btn delete"
                        title="Delete Service"
                        data-action="delete"
                        data-id="${service.id}">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>
            </td>
        `;

        serviceTableBody.appendChild(row);
    });

    updateStats(services);
}

/* =========================================================
   STATISTICS
========================================================= */

function updateStats(services) {

    const total = services.length;

    const active = services.filter(
        service => service.status === "Active"
    ).length;

    const inactive = services.filter(
        service => service.status === "Inactive"
    ).length;

    if (totalServices) {
        totalServices.textContent = total;
    }

    if (activeServices) {
        activeServices.textContent = active;
    }

    if (inactiveServices) {
        inactiveServices.textContent = inactive;
    }
}

/* =========================================================
   ADD SERVICE
========================================================= */

function addService() {

    const name = prompt("Enter service name:");

    if (!name || !name.trim()) {
        return;
    }

    const category =
        prompt("Enter service category:") ||
        "General";

    const priceInput =
        prompt("Enter service price:");

    const price =
        Number(priceInput) || 0;

    const services = getServices();

    const newService = {
        id: Date.now(),
        name: name.trim(),
        category: category.trim(),
        price: price,
        status: "Active"
    };

    services.push(newService);

    saveServices(services);

    renderServices();

    alert("Service added successfully.");
}

/* =========================================================
   EDIT SERVICE
========================================================= */

function editService(id) {

    const services = getServices();

    const service = services.find(
        item => Number(item.id) === Number(id)
    );

    if (!service) {
        return;
    }

    const name =
        prompt(
            "Enter service name:",
            service.name
        );

    if (!name || !name.trim()) {
        return;
    }

    const category =
        prompt(
            "Enter service category:",
            service.category
        ) || service.category;

    const priceInput =
        prompt(
            "Enter service price:",
            service.price
        );

    const price =
        Number(priceInput);

    service.name = name.trim();

    service.category =
        category.trim();

    service.price =
        Number.isFinite(price)
            ? price
            : service.price;

    saveServices(services);

    renderServices(
        serviceSearch
            ? serviceSearch.value
            : ""
    );

    alert("Service updated successfully.");
}

/* =========================================================
   DELETE SERVICE
========================================================= */

function deleteService(id) {

    const services = getServices();

    const service = services.find(
        item => Number(item.id) === Number(id)
    );

    if (!service) {
        return;
    }

    const confirmed = confirm(
        `Delete "${service.name}" service?`
    );

    if (!confirmed) {
        return;
    }

    const updatedServices =
        services.filter(
            item => Number(item.id) !== Number(id)
        );

    saveServices(updatedServices);

    renderServices(
        serviceSearch
            ? serviceSearch.value
            : ""
    );

    alert("Service deleted successfully.");
}

/* =========================================================
   TABLE ACTIONS
========================================================= */

if (serviceTableBody) {

    serviceTableBody.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-action]"
                );

            if (!button) {
                return;
            }

            const action =
                button.dataset.action;

            const id =
                button.dataset.id;

            if (action === "edit") {
                editService(id);
            }

            if (action === "delete") {
                deleteService(id);
            }
        }
    );
}

/* =========================================================
   SEARCH
========================================================= */

if (serviceSearch) {

    serviceSearch.addEventListener(
        "input",
        function () {

            renderServices(
                serviceSearch.value
            );

        }
    );
}

/* =========================================================
   ADD BUTTON
========================================================= */

if (addServiceBtn) {

    addServiceBtn.addEventListener(
        "click",
        addService
    );
}

/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderServices();

        console.log(
            "AK Cyber Services Module Loaded"
        );

    }
);
