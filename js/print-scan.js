"use strict";

/* =========================================================
AK CYBER MANAGEMENT SYSTEM
PRINT & SCAN MODULE
========================================================= */

const PRINT_JOBS_KEY = "akCyberPrintJobs";

/* =========================================================
DEFAULT DATA
========================================================= */

const defaultPrintJobs = [];

/* =========================================================
STORAGE
========================================================= */

function getPrintJobs() {


try {

    const stored =
        localStorage.getItem(PRINT_JOBS_KEY);

    if (!stored) {

        localStorage.setItem(
            PRINT_JOBS_KEY,
            JSON.stringify(defaultPrintJobs)
        );

        return [...defaultPrintJobs];
    }

    const jobs = JSON.parse(stored);

    return Array.isArray(jobs)
        ? jobs
        : [...defaultPrintJobs];

} catch (error) {

    console.error(
        "Unable to load print jobs:",
        error
    );

    return [...defaultPrintJobs];
}


}

function savePrintJobs(jobs) {


localStorage.setItem(
    PRINT_JOBS_KEY,
    JSON.stringify(jobs)
);

}

/* =========================================================
DOM ELEMENTS
========================================================= */

const printJobsTableBody =
document.getElementById(
"printJobsTableBody"
);

const printSearch =
document.getElementById(
"printSearch"
);

const totalPrintJobs =
document.getElementById(
"totalPrintJobs"
);

const todayPrintJobs =
document.getElementById(
"todayPrintJobs"
);

const todayPrintIncome =
document.getElementById(
"todayPrintIncome"
);

const totalScanJobs =
document.getElementById(
"totalScanJobs"
);

const addPrintJobBtn =
document.getElementById(
"addPrintJobBtn"
);

/* =========================================================
RENDER JOBS
========================================================= */

function renderPrintJobs(searchTerm = "") {


if (!printJobsTableBody) {
    return;
}

const jobs = getPrintJobs();

const search =
    searchTerm
        .trim()
        .toLowerCase();

const filteredJobs =
    jobs.filter(job => {

        return (

            job.customer
                .toLowerCase()
                .includes(search)

            ||

            job.document
                .toLowerCase()
                .includes(search)

            ||

            job.type
                .toLowerCase()
                .includes(search)

            ||

            job.status
                .toLowerCase()
                .includes(search)
        );
    });


printJobsTableBody.innerHTML = "";


/* =====================================================
   EMPTY RESULT
===================================================== */

if (filteredJobs.length === 0) {

    printJobsTableBody.innerHTML = `
        <tr>

            <td
                colspan="8"
                class="empty-table">

                <div>

                    <i class="fa-solid fa-print"></i>

                    <h4>
                        ${
                            jobs.length === 0
                                ? "No print jobs yet"
                                : "No jobs found"
                        }
                    </h4>

                    <p>
                        ${
                            jobs.length === 0
                                ? "Add your first print or scan job to get started."
                                : "Try another search."
                        }
                    </p>

                </div>

            </td>

        </tr>
    `;

    updateStats(jobs);

    return;
}


/* =====================================================
   TABLE ROWS
===================================================== */

filteredJobs.forEach(
    (job, index) => {

        const row =
            document.createElement("tr");


        const typeClass =
            job.type === "Print"
                ? "print"
                : "scan";


        const typeIcon =
            job.type === "Print"
                ? "fa-print"
                : "fa-scanner";


        const statusClass =
            job.status
                .toLowerCase();


        row.innerHTML = `

            <!-- NUMBER -->

            <td>
                ${index + 1}
            </td>


            <!-- CUSTOMER -->

            <td>

                <div class="customer-cell">

                    <div class="customer-avatar">

                        <i class="fa-solid fa-user"></i>

                    </div>

                    <span class="customer-name">

                        ${escapeHTML(
                            job.customer
                        )}

                    </span>

                </div>

            </td>


            <!-- DOCUMENT -->

            <td>

                <span class="document-name">

                    ${escapeHTML(
                        job.document
                    )}

                </span>

                <span class="document-sub">

                    ${escapeHTML(
                        job.date
                    )}

                </span>

            </td>


            <!-- TYPE -->

            <td>

                <span
                    class="type-badge ${typeClass}">

                    <i
                        class="fa-solid ${typeIcon}">
                    </i>

                    ${escapeHTML(
                        job.type
                    )}

                </span>

            </td>


            <!-- PAGES -->

            <td>

                ${Number(job.pages)}

            </td>


            <!-- AMOUNT -->

            <td>

                <span class="amount">

                    ₹${Number(
                        job.amount || 0
                    ).toFixed(2)}

                </span>

            </td>


            <!-- STATUS -->

            <td>

                <span
                    class="status-badge ${statusClass}">

                    ${getStatusIcon(
                        job.status
                    )}

                    ${escapeHTML(
                        job.status
                    )}

                </span>

            </td>


            <!-- ACTIONS -->

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit"
                        title="Edit Job"
                        data-action="edit"
                        data-id="${job.id}">

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        class="action-btn delete"
                        title="Delete Job"
                        data-action="delete"
                        data-id="${job.id}">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>
        `;


        printJobsTableBody.appendChild(
            row
        );
    }
);


updateStats(jobs);


}

/* =========================================================
STATUS ICON
========================================================= */

function getStatusIcon(status) {


if (status === "Completed") {

    return `
        <i class="fa-solid fa-check"></i>
    `;
}

if (status === "Pending") {

    return `
        <i class="fa-solid fa-clock"></i>
    `;
}

return `
    <i class="fa-solid fa-xmark"></i>
`;


}

/* =========================================================
STATISTICS
========================================================= */

function updateStats(jobs) {


const total =
    jobs.length;


const today =
    new Date()
        .toISOString()
        .split("T")[0];


const todayJobs =
    jobs.filter(
        job => job.dateKey === today
    );


const todayIncome =
    todayJobs.reduce(
        (total, job) => {

            return (
                total +
                Number(job.amount || 0)
            );

        },
        0
    );


const scanJobs =
    jobs.filter(
        job => job.type === "Scan"
    ).length;


if (totalPrintJobs) {

    totalPrintJobs.textContent =
        total;
}


if (todayPrintJobs) {

    todayPrintJobs.textContent =
        todayJobs.length;
}


if (todayPrintIncome) {

    todayPrintIncome.textContent =
        `₹${todayIncome.toFixed(2)}`;
}


if (totalScanJobs) {

    totalScanJobs.textContent =
        scanJobs;
}

}

/* =========================================================
ADD JOB
========================================================= */

function addPrintJob() {


const customer =
    prompt(
        "Enter customer name:"
    );


if (
    !customer ||
    !customer.trim()
) {

    return;
}


const documentName =
    prompt(
        "Enter document name:"
    );


if (
    !documentName ||
    !documentName.trim()
) {

    return;
}


const typeInput =
    prompt(
        "Enter type: Print or Scan",
        "Print"
    );


const type =
    typeInput &&
    typeInput.toLowerCase() === "scan"
        ? "Scan"
        : "Print";


const pagesInput =
    prompt(
        "Enter number of pages:",
        "1"
    );


const pages =
    Math.max(
        1,
        Number(pagesInput) || 1
    );


const amountInput =
    prompt(
        "Enter amount:",
        "0"
    );


const amount =
    Math.max(
        0,
        Number(amountInput) || 0
    );


const statusInput =
    prompt(
        "Enter status: Completed, Pending or Cancelled",
        "Completed"
    );


let status = "Completed";


if (
    statusInput &&
    statusInput.toLowerCase() ===
        "pending"
) {

    status = "Pending";

} else if (
    statusInput &&
    statusInput.toLowerCase() ===
        "cancelled"
) {

    status = "Cancelled";
}


const now =
    new Date();


const dateKey =
    now
        .toISOString()
        .split("T")[0];


const date =
    now.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );


const jobs =
    getPrintJobs();


const newJob = {

    id: Date.now(),

    customer:
        customer.trim(),

    document:
        documentName.trim(),

    type:

        type,

    pages:

        pages,

    amount:

        amount,

    status:

        status,

    dateKey:

        dateKey,

    date:

        date
};


jobs.push(
    newJob
);


savePrintJobs(
    jobs
);


renderPrintJobs();


alert(
    "Print job added successfully."
);


}

/* =========================================================
EDIT JOB
========================================================= */

function editPrintJob(id) {


const jobs =
    getPrintJobs();


const job =
    jobs.find(
        item =>
            Number(item.id) ===
            Number(id)
    );


if (!job) {
    return;
}


const customer =
    prompt(
        "Enter customer name:",
        job.customer
    );


if (
    !customer ||
    !customer.trim()
) {

    return;
}


const documentName =
    prompt(
        "Enter document name:",
        job.document
    );


if (
    !documentName ||
    !documentName.trim()
) {

    return;
}


const typeInput =
    prompt(
        "Enter type: Print or Scan",
        job.type
    );


const type =
    typeInput &&
    typeInput.toLowerCase() ===
        "scan"
        ? "Scan"
        : "Print";


const pagesInput =
    prompt(
        "Enter number of pages:",
        job.pages
    );


const pages =
    Math.max(
        1,
        Number(pagesInput) ||
            job.pages
    );


const amountInput =
    prompt(
        "Enter amount:",
        job.amount
    );


const amount =
    Number(amountInput);


const statusInput =
    prompt(
        "Enter status: Completed, Pending or Cancelled",
        job.status
    );


let status =
    job.status;


if (
    statusInput &&
    statusInput.toLowerCase() ===
        "completed"
) {

    status = "Completed";

} else if (
    statusInput &&
    statusInput.toLowerCase() ===
        "pending"
) {

    status = "Pending";

} else if (
    statusInput &&
    statusInput.toLowerCase() ===
        "cancelled"
) {

    status = "Cancelled";
}


job.customer =
    customer.trim();


job.document =
    documentName.trim();


job.type =
    type;


job.pages =
    pages;


job.amount =
    Number.isFinite(amount)
        ? Math.max(0, amount)
        : job.amount;


job.status =
    status;


savePrintJobs(
    jobs
);


renderPrintJobs(
    printSearch
        ? printSearch.value
        : ""
);


alert(
    "Print job updated successfully."
);


}

/* =========================================================
DELETE JOB
========================================================= */

function deletePrintJob(id) {


const jobs =
    getPrintJobs();


const job =
    jobs.find(
        item =>
            Number(item.id) ===
            Number(id)
    );


if (!job) {
    return;
}


const confirmed =
    confirm(
        `Delete "${job.document}" print job?`
    );


if (!confirmed) {
    return;
}


const updatedJobs =
    jobs.filter(
        item =>
            Number(item.id) !==
            Number(id)
    );


savePrintJobs(
    updatedJobs
);


renderPrintJobs(
    printSearch
        ? printSearch.value
        : ""
);


alert(
    "Print job deleted successfully."
);


}

/* =========================================================
TABLE ACTIONS
========================================================= */

if (printJobsTableBody) {


printJobsTableBody.addEventListener(
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


        if (
            action === "edit"
        ) {

            editPrintJob(id);
        }


        if (
            action === "delete"
        ) {

            deletePrintJob(id);
        }

    }
);

}

/* =========================================================
SEARCH
========================================================= */

if (printSearch) {


printSearch.addEventListener(
    "input",
    function () {

        renderPrintJobs(
            printSearch.value
        );

    }
);


}

/* =========================================================
ADD BUTTON
========================================================= */

if (addPrintJobBtn) {


addPrintJobBtn.addEventListener(
    "click",
    addPrintJob
);


}

/* =========================================================
HTML ESCAPE
========================================================= */

function escapeHTML(value) {


return String(value)
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}

/* =========================================================
INITIALIZE
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function () {


    renderPrintJobs();

    console.log(
        "AK Cyber Print & Scan Module Loaded"
    );

}


);
