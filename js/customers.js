
/* =========================================================
   AK CYBER MANAGEMENT SYSTEM
   CUSTOMERS MODULE — FINAL
========================================================= */

"use strict";

/* =========================================================
   STORAGE
========================================================= */

const CUSTOMER_STORAGE_KEY = "akCyberCustomers";

/* =========================================================
   DOM ELEMENTS
========================================================= */

const customerModal =
    document.getElementById("customerModalOverlay") ||
    document.querySelector(".modal-overlay");

const addCustomerBtn =
    document.getElementById("addCustomerBtn");

const emptyAddBtn =
    document.getElementById("emptyAddBtn");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelModalBtn =
    document.getElementById("cancelModalBtn");

const customerForm =
    document.getElementById("customerForm");

const customerId =
    document.getElementById("customerId");

const customerName =
    document.getElementById("customerName");

const customerMobile =
    document.getElementById("customerMobile");

const customerIdNumber =
    document.getElementById("customerIdNumber");

const customerAddress =
    document.getElementById("customerAddress");

const modalTitle =
    document.getElementById("modalTitle");

const customerTableBody =
    document.getElementById("customerTableBody");

const customerEmpty =
    document.getElementById("customerEmpty");

const customerSearch =
    document.getElementById("customerSearch");

const customerFilter =
    document.getElementById("customerFilter");

const totalCustomers =
    document.getElementById("totalCustomers");

const activeCustomers =
    document.getElementById("activeCustomers");

const monthlyCustomers =
    document.getElementById("monthlyCustomers");

const recordCount =
    document.getElementById("recordCount");


/* =========================================================
   LOAD CUSTOMERS
========================================================= */

let customers = loadCustomers();

function loadCustomers() {

    try {

        const saved =
            localStorage.getItem(
                CUSTOMER_STORAGE_KEY
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
            "Unable to load customers:",
            error
        );

        return [];

    }
}


/* =========================================================
   SAVE CUSTOMERS
========================================================= */

function saveCustomers() {

    try {

        localStorage.setItem(
            CUSTOMER_STORAGE_KEY,
            JSON.stringify(customers)
        );

    } catch (error) {

        console.error(
            "Unable to save customers:",
            error
        );

        alert(
            "Unable to save customer data."
        );

    }
}


/* =========================================================
   OPEN CUSTOMER MODAL
========================================================= */

function openCustomerModal(customer = null) {

    if (!customerModal) {

        console.error(
            "Customer modal not found."
        );

        return;
    }

    if (customerForm) {
        customerForm.reset();
    }

    if (customerId) {
        customerId.value = "";
    }

    if (customer) {

        if (modalTitle) {
            modalTitle.textContent =
                "Edit Customer";
        }

        if (customerId) {
            customerId.value =
                customer.id || "";
        }

        if (customerName) {
            customerName.value =
                customer.name || "";
        }

        if (customerMobile) {
            customerMobile.value =
                customer.mobile || "";
        }

        if (customerIdNumber) {
            customerIdNumber.value =
                customer.idNumber || "";
        }

        if (customerAddress) {
            customerAddress.value =
                customer.address || "";
        }

    } else {

        if (modalTitle) {
            modalTitle.textContent =
                "Add Customer";
        }

    }

    /* IMPORTANT */

    customerModal.classList.add("active");

    customerModal.style.display = "flex";

    document.body.classList.add(
        "modal-open"
    );

    setTimeout(
        function () {

            if (customerName) {
                customerName.focus();
            }

        },
        100
    );
}


/* =========================================================
   CLOSE CUSTOMER MODAL
========================================================= */

function closeCustomerModal() {

    if (!customerModal) {
        return;
    }

    customerModal.classList.remove("active");

    customerModal.style.display = "none";

    document.body.classList.remove(
        "modal-open"
    );

    if (customerForm) {
        customerForm.reset();
    }

    if (customerId) {
        customerId.value = "";
    }

    if (modalTitle) {
        modalTitle.textContent =
            "Add Customer";
    }
}


/* =========================================================
   ADD CUSTOMER BUTTON
========================================================= */

if (addCustomerBtn) {

    addCustomerBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            openCustomerModal();

        }
    );

} else {

    console.error(
        "addCustomerBtn not found."
    );
}


/* =========================================================
   EMPTY STATE BUTTON
========================================================= */

if (emptyAddBtn) {

    emptyAddBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            openCustomerModal();

        }
    );
}


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (closeModalBtn) {

    closeModalBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            closeCustomerModal();

        }
    );
}


/* =========================================================
   CANCEL BUTTON
========================================================= */

if (cancelModalBtn) {

    cancelModalBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            closeCustomerModal();

        }
    );
}


/* =========================================================
   CLICK OUTSIDE MODAL
========================================================= */

if (customerModal) {

    customerModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                customerModal
            ) {

                closeCustomerModal();

            }

        }
    );
}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            customerModal &&
            customerModal.classList.contains(
                "active"
            )
        ) {

            closeCustomerModal();

        }

    }
);


/* =========================================================
   MOBILE NUMBER
========================================================= */

if (customerMobile) {

    customerMobile.addEventListener(
        "input",
        function () {

            customerMobile.value =
                customerMobile.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

        }
    );
}


/* =========================================================
   FORM SUBMIT
========================================================= */

if (customerForm) {

    customerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                customerName
                    ? customerName.value.trim()
                    : "";

            const mobile =
                customerMobile
                    ? customerMobile.value.trim()
                    : "";

            const idNumber =
                customerIdNumber
                    ? customerIdNumber.value.trim()
                    : "";

            const address =
                customerAddress
                    ? customerAddress.value.trim()
                    : "";


            /* VALIDATION */

            if (name.length < 2) {

                alert(
                    "Please enter a valid customer name."
                );

                if (customerName) {
                    customerName.focus();
                }

                return;
            }


            if (!/^\d{10}$/.test(mobile)) {

                alert(
                    "Please enter a valid 10 digit mobile number."
                );

                if (customerMobile) {
                    customerMobile.focus();
                }

                return;
            }


            /* DUPLICATE MOBILE */

            const duplicate =
                customers.find(
                    function (customer) {

                        return (
                            customer.mobile === mobile &&
                            customer.id !==
                                (customerId
                                    ? customerId.value
                                    : "")
                        );

                    }
                );


            if (duplicate) {

                alert(
                    "This mobile number is already registered."
                );

                if (customerMobile) {
                    customerMobile.focus();
                }

                return;
            }


            /* EDIT */

            if (
                customerId &&
                customerId.value
            ) {

                const index =
                    customers.findIndex(
                        function (customer) {

                            return (
                                customer.id ===
                                customerId.value
                            );

                        }
                    );


                if (index !== -1) {

                    customers[index] = {

                        ...customers[index],

                        name: name,

                        mobile: mobile,

                        idNumber: idNumber,

                        address: address

                    };

                }

            }


            /* NEW CUSTOMER */

            else {

                const newCustomer = {

                    id:
                        Date.now().toString(),

                    name:
                        name,

                    mobile:
                        mobile,

                    idNumber:
                        idNumber,

                    address:
                        address,

                    status:
                        "Active",

                    createdAt:
                        new Date().toISOString()

                };


                customers.unshift(
                    newCustomer
                );

            }


            /* SAVE */

            saveCustomers();

            renderCustomers();

            closeCustomerModal();

        }
    );
}


/* =========================================================
   SEARCH
========================================================= */

if (customerSearch) {

    customerSearch.addEventListener(
        "input",
        renderCustomers
    );
}


/* =========================================================
   FILTER
========================================================= */

if (customerFilter) {

    customerFilter.addEventListener(
        "change",
        renderCustomers
    );
}


/* =========================================================
   FILTER CUSTOMERS
========================================================= */

function getFilteredCustomers() {

    const search =
        customerSearch
            ? customerSearch.value
                .trim()
                .toLowerCase()
            : "";

    const filter =
        customerFilter
            ? customerFilter.value
            : "all";

    const today =
        getTodayDate();

    const currentMonth =
        today.substring(0, 7);


    return customers.filter(
        function (customer) {

            const name =
                String(
                    customer.name || ""
                ).toLowerCase();

            const mobile =
                String(
                    customer.mobile || ""
                ).toLowerCase();


            const matchesSearch =
                !search ||
                name.includes(search) ||
                mobile.includes(search);


            if (!matchesSearch) {
                return false;
            }


            const createdDate =
                String(
                    customer.createdAt || ""
                ).substring(0, 10);


            if (
                filter === "today" &&
                createdDate !== today
            ) {

                return false;

            }


            if (
                filter === "month" &&
                !createdDate.startsWith(
                    currentMonth
                )
            ) {

                return false;

            }


            return true;

        }
    );
}


/* =========================================================
   RENDER CUSTOMERS
========================================================= */

function renderCustomers() {

    const filtered =
        getFilteredCustomers();


    if (customerTableBody) {

        customerTableBody.innerHTML = "";


        filtered.forEach(
            function (customer) {

                customerTableBody.appendChild(
                    createCustomerRow(
                        customer
                    )
                );

            }
        );

    }


    if (customerEmpty) {

        customerEmpty.style.display =
            filtered.length === 0
                ? "flex"
                : "none";

    }


    updateCustomerStatistics(
        filtered
    );
}


/* =========================================================
   CREATE CUSTOMER ROW
========================================================= */

function createCustomerRow(customer) {

    const row =
        document.createElement("tr");


    const initials =
        getCustomerInitials(
            customer.name
        );


    const maskedId =
        maskCustomerId(
            customer.idNumber
        );


    row.innerHTML = `

        <td>

            <div class="customer-name-cell">

                <div class="customer-avatar">

                    ${escapeCustomerHTML(
                        initials
                    )}

                </div>

                <div>

                    <strong class="customer-name">

                        ${escapeCustomerHTML(
                            customer.name
                        )}

                    </strong>

                </div>

            </div>

        </td>


        <td>

            ${escapeCustomerHTML(
                customer.mobile
            )}

        </td>


        <td>

            ${
                maskedId
                    ? escapeCustomerHTML(
                        maskedId
                    )
                    : "—"
            }

        </td>


        <td>

            ${formatCustomerDate(
                customer.createdAt
            )}

        </td>


        <td>

            <span class="status-badge">

                Active

            </span>

        </td>


        <td>

            <div class="customer-actions">

                <button
                    type="button"
                    class="customer-action-btn"
                    title="Edit"
                    data-action="edit"
                    data-id="${escapeCustomerHTML(
                        customer.id
                    )}"
                >

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    type="button"
                    class="customer-action-btn delete"
                    title="Delete"
                    data-action="delete"
                    data-id="${escapeCustomerHTML(
                        customer.id
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

if (customerTableBody) {

    customerTableBody.addEventListener(
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

                editCustomer(id);

            }


            if (action === "delete") {

                deleteCustomer(id);

            }

        }
    );
}


/* =========================================================
   EDIT CUSTOMER
========================================================= */

function editCustomer(id) {

    const customer =
        customers.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!customer) {

        console.error(
            "Customer not found:",
            id
        );

        return;
    }


    openCustomerModal(
        customer
    );
}


/* =========================================================
   DELETE CUSTOMER
========================================================= */

function deleteCustomer(id) {

    const customer =
        customers.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!customer) {
        return;
    }


    const confirmed =
        confirm(
            `Delete customer "${customer.name}"?`
        );


    if (!confirmed) {
        return;
    }


    customers =
        customers.filter(
            function (item) {

                return item.id !== id;

            }
        );


    saveCustomers();

    renderCustomers();
}


/* =========================================================
   STATISTICS
========================================================= */

function updateCustomerStatistics(
    filtered
) {

    const total =
        customers.length;


    const active =
        customers.filter(
            function (customer) {

                return (
                    customer.status !==
                    "Inactive"
                );

            }
        ).length;


    const currentMonth =
        getTodayDate()
            .substring(0, 7);


    const monthly =
        customers.filter(
            function (customer) {

                return String(
                    customer.createdAt || ""
                ).startsWith(
                    currentMonth
                );

            }
        ).length;


    if (totalCustomers) {
        totalCustomers.textContent =
            total;
    }


    if (activeCustomers) {
        activeCustomers.textContent =
            active;
    }


    if (monthlyCustomers) {
        monthlyCustomers.textContent =
            monthly;
    }


    if (recordCount) {

        recordCount.textContent =
            `${filtered.length} ${
                filtered.length === 1
                    ? "Record"
                    : "Records"
            }`;

    }
}


/* =========================================================
   TODAY
========================================================= */

function getTodayDate() {

    const date =
        new Date();


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;
}


/* =========================================================
   DATE FORMAT
========================================================= */

function formatCustomerDate(
    dateString
) {

    if (!dateString) {
        return "—";
    }


    const date =
        new Date(dateString);


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
   MASK ID
========================================================= */

function maskCustomerId(
    idNumber
) {

    if (!idNumber) {
        return "";
    }


    const value =
        String(idNumber);


    if (value.length <= 4) {
        return "••••";
    }


    return (
        "••••••" +
        value.slice(-4)
    );
}


/* =========================================================
   INITIALS
========================================================= */

function getCustomerInitials(
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
            function (word) {

                return word
                    .charAt(0)
                    .toUpperCase();

            }
        )
        .join("");
}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeCustomerHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   INITIALIZE
========================================================= */

renderCustomers();


console.log(
    "AK Cyber Customers Module — Ready"
);
