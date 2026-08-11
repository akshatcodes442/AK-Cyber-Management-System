
/* =========================================================
   AK CYBER MANAGEMENT SYSTEM
   APPLICATIONS MODULE — FINAL STABLE
========================================================= */

"use strict";

/* =========================================================
   STORAGE
========================================================= */

const APPLICATION_STORAGE_KEY = "akCyberApplications";
const CUSTOMER_STORAGE_KEY = "akCyberCustomers";


/* =========================================================
   DOM
========================================================= */

const applicationModal =
    document.getElementById("applicationModal");

const addApplicationBtn =
    document.getElementById("addApplicationBtn");

const emptyApplicationBtn =
    document.getElementById("emptyApplicationBtn");

const closeApplicationModal =
    document.getElementById("closeApplicationModal");

const cancelApplicationModal =
    document.getElementById("cancelApplicationModal");

const applicationForm =
    document.getElementById("applicationForm");

const applicationModalTitle =
    document.getElementById("applicationModalTitle");

const applicationId =
    document.getElementById("applicationId");

const applicationNumber =
    document.getElementById("applicationNumber");

const applicationCustomer =
    document.getElementById("applicationCustomer");

const applicationService =
    document.getElementById("applicationService");

const applicationDate =
    document.getElementById("applicationDate");

const applicationStatus =
    document.getElementById("applicationStatus");

const applicationRemarks =
    document.getElementById("applicationRemarks");

const applicationSearch =
    document.getElementById("applicationSearch");

const applicationStatusFilter =
    document.getElementById("applicationStatusFilter");

const applicationTableBody =
    document.getElementById("applicationTableBody");

const applicationEmpty =
    document.getElementById("applicationEmpty");

const totalApplications =
    document.getElementById("totalApplications");

const pendingApplications =
    document.getElementById("pendingApplications");

const completedApplications =
    document.getElementById("completedApplications");

const applicationRecordCount =
    document.getElementById("applicationRecordCount");


/* =========================================================
   DATA
========================================================= */

let applications = loadApplications();


/* =========================================================
   LOAD
========================================================= */

function loadApplications() {

    try {

        const saved =
            localStorage.getItem(
                APPLICATION_STORAGE_KEY
            );

        if (!saved) {
            return [];
        }

        const parsed =
            JSON.parse(saved);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "Applications loading error:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE
========================================================= */

function saveApplications() {

    try {

        localStorage.setItem(
            APPLICATION_STORAGE_KEY,
            JSON.stringify(applications)
        );

    } catch (error) {

        console.error(
            "Applications saving error:",
            error
        );

        alert(
            "Unable to save application data."
        );

    }

}


/* =========================================================
   TODAY
========================================================= */

function getApplicationToday() {

    const now =
        new Date();

    const year =
        now.getFullYear();

    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            now.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


/* =========================================================
   APPLICATION NUMBER
========================================================= */

function generateApplicationNumber() {

    let number = 1001;

    const existingNumbers =
        new Set(
            applications.map(
                application =>
                    application.applicationNumber
            )
        );

    while (
        existingNumbers.has(
            `APP-${number}`
        )
    ) {

        number++;

    }

    return `APP-${number}`;

}


/* =========================================================
   LOAD CUSTOMERS
========================================================= */

function loadApplicationCustomers(
    selectedCustomer = ""
) {

    if (!applicationCustomer) {
        return;
    }

    applicationCustomer.innerHTML = `
        <option value="">
            Select Customer
        </option>
    `;

    let customers = [];

    try {

        const saved =
            localStorage.getItem(
                CUSTOMER_STORAGE_KEY
            );

        if (saved) {

            const parsed =
                JSON.parse(saved);

            if (Array.isArray(parsed)) {
                customers = parsed;
            }

        }

    } catch (error) {

        console.error(
            "Customer loading error:",
            error
        );

    }


    customers.forEach(
        customer => {

            const name =
                String(
                    customer.name ||
                    customer.fullName ||
                    customer.customerName ||
                    ""
                ).trim();

            if (!name) {
                return;
            }

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                name;

            option.textContent =
                name;

            applicationCustomer.appendChild(
                option
            );

        }
    );


    if (selectedCustomer) {

        applicationCustomer.value =
            selectedCustomer;

    }

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openApplicationModal(
    application = null
) {

    if (!applicationModal) {

        console.error(
            "#applicationModal not found."
        );

        return;

    }

    if (!applicationForm) {

        console.error(
            "#applicationForm not found."
        );

        return;

    }


    applicationForm.reset();


    if (applicationId) {
        applicationId.value = "";
    }


    loadApplicationCustomers();


    /* =====================================================
       EDIT
    ===================================================== */

    if (application) {

        if (applicationModalTitle) {

            applicationModalTitle.textContent =
                "Edit Application";

        }

        if (applicationId) {

            applicationId.value =
                application.id || "";

        }

        if (applicationNumber) {

            applicationNumber.value =
                application.applicationNumber || "";

        }

        loadApplicationCustomers(
            application.customer || ""
        );

        if (applicationService) {

            applicationService.value =
                application.service || "";

        }

        if (applicationDate) {

            applicationDate.value =
                application.date || "";

        }

        if (applicationStatus) {

            applicationStatus.value =
                application.status || "Pending";

        }

        if (applicationRemarks) {

            applicationRemarks.value =
                application.remarks || "";

        }

    }


    /* =====================================================
       NEW
    ===================================================== */

    else {

        if (applicationModalTitle) {

            applicationModalTitle.textContent =
                "Add Application";

        }

        if (applicationNumber) {

            applicationNumber.value =
                generateApplicationNumber();

        }

        if (applicationDate) {

            applicationDate.value =
                getApplicationToday();

        }

        if (applicationStatus) {

            applicationStatus.value =
                "Pending";

        }

    }


    /* =====================================================
       SHOW OVERLAY
    ===================================================== */

    applicationModal.classList.add(
        "active"
    );

    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeApplicationForm() {

    if (!applicationModal) {
        return;
    }

    applicationModal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "modal-open"
    );

    if (applicationForm) {
        applicationForm.reset();
    }

    if (applicationId) {
        applicationId.value = "";
    }

    if (applicationModalTitle) {

        applicationModalTitle.textContent =
            "Add Application";

    }

}


/* =========================================================
   ADD BUTTON
========================================================= */

if (addApplicationBtn) {

    addApplicationBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            openApplicationModal();

        }
    );

}


/* =========================================================
   EMPTY BUTTON
========================================================= */

if (emptyApplicationBtn) {

    emptyApplicationBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            openApplicationModal();

        }
    );

}


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (closeApplicationModal) {

    closeApplicationModal.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            closeApplicationForm();

        }
    );

}


/* =========================================================
   CANCEL BUTTON
========================================================= */

if (cancelApplicationModal) {

    cancelApplicationModal.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            closeApplicationForm();

        }
    );

}


/* =========================================================
   CLICK OUTSIDE
========================================================= */

if (applicationModal) {

    applicationModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                applicationModal
            ) {

                closeApplicationForm();

            }

        }
    );

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            applicationModal &&
            applicationModal.classList.contains(
                "active"
            )
        ) {

            closeApplicationForm();

        }

    }
);


/* =========================================================
   FORM SUBMIT
========================================================= */

if (applicationForm) {

    applicationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const number =
                applicationNumber
                    ? applicationNumber.value.trim()
                    : "";

            const customer =
                applicationCustomer
                    ? applicationCustomer.value.trim()
                    : "";

            const service =
                applicationService
                    ? applicationService.value.trim()
                    : "";

            const date =
                applicationDate
                    ? applicationDate.value.trim()
                    : "";

            const status =
                applicationStatus
                    ? applicationStatus.value.trim()
                    : "";

            const remarks =
                applicationRemarks
                    ? applicationRemarks.value.trim()
                    : "";


            /* =================================================
               VALIDATION
            ================================================= */

            if (!number) {

                alert(
                    "Please enter application number."
                );

                applicationNumber?.focus();

                return;

            }


            if (!customer) {

                alert(
                    "Please select customer."
                );

                applicationCustomer?.focus();

                return;

            }


            if (!service) {

                alert(
                    "Please select service."
                );

                applicationService?.focus();

                return;

            }


            if (!date) {

                alert(
                    "Please select application date."
                );

                applicationDate?.focus();

                return;

            }


            if (!status) {

                alert(
                    "Please select application status."
                );

                applicationStatus?.focus();

                return;

            }


            /* =================================================
               DUPLICATE APPLICATION NUMBER
            ================================================= */

            const duplicate =
                applications.find(
                    application =>

                        application.applicationNumber ===
                            number &&

                        String(
                            application.id
                        ) !==
                        String(
                            applicationId?.value || ""
                        )
                );


            if (duplicate) {

                alert(
                    "This application number already exists."
                );

                applicationNumber?.focus();

                return;

            }


            /* =================================================
               EDIT
            ================================================= */

            if (
                applicationId &&
                applicationId.value
            ) {

                const index =
                    applications.findIndex(
                        application =>
                            String(
                                application.id
                            ) ===
                            String(
                                applicationId.value
                            )
                    );


                if (index !== -1) {

                    applications[index] = {

                        ...applications[index],

                        applicationNumber:
                            number,

                        customer:
                            customer,

                        service:
                            service,

                        date:
                            date,

                        status:
                            status,

                        remarks:
                            remarks

                    };

                }

            }


            /* =================================================
               NEW
            ================================================= */

            else {

                applications.unshift({

                    id:
                        Date.now().toString(),

                    applicationNumber:
                        number,

                    customer:
                        customer,

                    service:
                        service,

                    date:
                        date,

                    status:
                        status,

                    remarks:
                        remarks,

                    createdAt:
                        new Date().toISOString()

                });

            }


            /* =================================================
               SAVE
            ================================================= */

            saveApplications();

            renderApplications();

            closeApplicationForm();


            console.log(
                "Application saved successfully."
            );

        }
    );

}


/* =========================================================
   SEARCH
========================================================= */

if (applicationSearch) {

    applicationSearch.addEventListener(
        "input",
        renderApplications
    );

}


/* =========================================================
   STATUS FILTER
========================================================= */

if (applicationStatusFilter) {

    applicationStatusFilter.addEventListener(
        "change",
        renderApplications
    );

}


/* =========================================================
   FILTER
========================================================= */

function getFilteredApplications() {

    const search =
        applicationSearch
            ? applicationSearch.value
                .trim()
                .toLowerCase()
            : "";

    const statusFilter =
        applicationStatusFilter
            ? applicationStatusFilter.value
            : "all";


    return applications.filter(
        application => {

            const number =
                String(
                    application.applicationNumber || ""
                ).toLowerCase();

            const customer =
                String(
                    application.customer || ""
                ).toLowerCase();

            const service =
                String(
                    application.service || ""
                ).toLowerCase();


            const matchesSearch =
                !search ||
                number.includes(search) ||
                customer.includes(search) ||
                service.includes(search);


            if (!matchesSearch) {
                return false;
            }


            if (
                statusFilter !== "all" &&
                application.status !== statusFilter
            ) {

                return false;

            }


            return true;

        }
    );

}


/* =========================================================
   RENDER
========================================================= */

function renderApplications() {

    const filtered =
        getFilteredApplications();


    if (applicationTableBody) {

        applicationTableBody.innerHTML =
            "";

    }


    if (filtered.length === 0) {

        if (applicationEmpty) {

            applicationEmpty.style.display =
                "flex";

        }

    }

    else {

        if (applicationEmpty) {

            applicationEmpty.style.display =
                "none";

        }


        filtered.forEach(
            application => {

                const row =
                    createApplicationRow(
                        application
                    );

                if (applicationTableBody) {

                    applicationTableBody.appendChild(
                        row
                    );

                }

            }
        );

    }


    updateApplicationStatistics(
        filtered
    );

}


/* =========================================================
   CREATE ROW
========================================================= */

function createApplicationRow(
    application
) {

    const row =
        document.createElement(
            "tr"
        );


    const initials =
        getApplicationInitials(
            application.customer
        );


    row.innerHTML = `

        <td>

            <span class="application-number">

                ${escapeApplicationHTML(
                    application.applicationNumber
                )}

            </span>

        </td>


        <td>

            <div class="application-customer-cell">

                <div class="application-avatar">

                    ${escapeApplicationHTML(
                        initials
                    )}

                </div>

                <div>

                    <span class="application-customer-name">

                        ${escapeApplicationHTML(
                            application.customer
                        )}

                    </span>

                </div>

            </div>

        </td>


        <td>

            <span class="application-service-badge">

                ${escapeApplicationHTML(
                    application.service
                )}

            </span>

        </td>


        <td>

            ${escapeApplicationHTML(
                formatApplicationDate(
                    application.date
                )
            )}

        </td>


        <td>

            <span class="application-status ${getStatusClass(
                application.status
            )}">

                <i class="fa-solid ${getStatusIcon(
                    application.status
                )}"></i>

                ${escapeApplicationHTML(
                    application.status
                )}

            </span>

        </td>


        <td>

            <div class="application-actions">

                <button
                    type="button"
                    class="application-action-btn"
                    title="Edit"
                    data-action="edit"
                    data-id="${escapeApplicationHTML(
                        application.id
                    )}"
                >

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    type="button"
                    class="application-action-btn delete"
                    title="Delete"
                    data-action="delete"
                    data-id="${escapeApplicationHTML(
                        application.id
                    )}"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </td>

    `;


    return row;

}


/* =========================================================
   TABLE ACTIONS
========================================================= */

if (applicationTableBody) {

    applicationTableBody.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-action]"
                );


            if (!button) {
                return;
            }


            const id =
                button.dataset.id;


            const action =
                button.dataset.action;


            if (action === "edit") {

                editApplication(id);

            }


            if (action === "delete") {

                deleteApplication(id);

            }

        }
    );

}


/* =========================================================
   EDIT
========================================================= */

function editApplication(id) {

    const application =
        applications.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!application) {

        console.error(
            "Application not found:",
            id
        );

        return;

    }


    openApplicationModal(
        application
    );

}


/* =========================================================
   DELETE
========================================================= */

function deleteApplication(id) {

    const application =
        applications.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!application) {
        return;
    }


    const confirmed =
        confirm(
            `Delete application "${application.applicationNumber}"?`
        );


    if (!confirmed) {
        return;
    }


    applications =
        applications.filter(
            item =>
                String(item.id) !==
                String(id)
        );


    saveApplications();

    renderApplications();

}


/* =========================================================
   STATISTICS
========================================================= */

function updateApplicationStatistics(
    filtered
) {

    const total =
        applications.length;


    const pending =
        applications.filter(
            application =>
                application.status ===
                "Pending"
        ).length;


    const completed =
        applications.filter(
            application =>
                application.status ===
                "Completed"
        ).length;


    if (totalApplications) {

        totalApplications.textContent =
            total;

    }


    if (pendingApplications) {

        pendingApplications.textContent =
            pending;

    }


    if (completedApplications) {

        completedApplications.textContent =
            completed;

    }


    if (applicationRecordCount) {

        applicationRecordCount.textContent =
            `${filtered.length} ${
                filtered.length === 1
                    ? "Record"
                    : "Records"
            }`;

    }

}


/* =========================================================
   STATUS CLASS
========================================================= */

function getStatusClass(
    status
) {

    switch (status) {

        case "Pending":
            return "pending";

        case "Processing":
            return "processing";

        case "Completed":
            return "completed";

        case "Rejected":
            return "rejected";

        default:
            return "";

    }

}


/* =========================================================
   STATUS ICON
========================================================= */

function getStatusIcon(
    status
) {

    switch (status) {

        case "Pending":
            return "fa-clock";

        case "Processing":
            return "fa-spinner";

        case "Completed":
            return "fa-circle-check";

        case "Rejected":
            return "fa-circle-xmark";

        default:
            return "fa-circle";

    }

}


/* =========================================================
   DATE
========================================================= */

function formatApplicationDate(
    dateString
) {

    if (!dateString) {
        return "—";
    }


    const date =
        new Date(
            `${dateString}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "—";

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   INITIALS
========================================================= */

function getApplicationInitials(
    name
) {

    return String(
        name || ""
    )
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(
            word =>
                word
                    .charAt(0)
                    .toUpperCase()
        )
        .join("");

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeApplicationHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   INITIALIZE
========================================================= */

loadApplicationCustomers();

renderApplications();


console.log(
    "AK Cyber Applications Module — Ready"
);
