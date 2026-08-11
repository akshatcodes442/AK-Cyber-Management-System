
/* =========================================================
   AK CYBER MANAGEMENT SYSTEM
   PAYMENTS MODULE — FINAL
   EXACT PAYMENTS.HTML COMPATIBLE
========================================================= */

"use strict";

/* =========================================================
   STORAGE KEYS
========================================================= */

const PAYMENT_STORAGE_KEY = "akCyberPayments";
const CUSTOMER_STORAGE_KEY = "akCyberCustomers";


/* =========================================================
   DOM INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       DOM ELEMENTS
    ===================================================== */

    const paymentModal =
        document.getElementById("paymentModal");

    const paymentModalBox =
        document.querySelector(".payment-modal");

    const addPaymentBtn =
        document.getElementById("addPaymentBtn");

    const emptyPaymentBtn =
        document.getElementById("emptyPaymentBtn");

    const closePaymentModal =
        document.getElementById("closePaymentModal");

    const cancelPaymentModal =
        document.getElementById("cancelPaymentModal");

    const paymentForm =
        document.getElementById("paymentForm");

    const paymentModalTitle =
        document.getElementById("paymentModalTitle");

    const paymentId =
        document.getElementById("paymentId");

    const paymentReceiptNumber =
        document.getElementById("paymentReceiptNumber");

    const paymentCustomer =
        document.getElementById("paymentCustomer");

    const paymentService =
        document.getElementById("paymentService");

    const paymentAmount =
        document.getElementById("paymentAmount");

    const paymentMethod =
        document.getElementById("paymentMethod");

    const paymentDate =
        document.getElementById("paymentDate");

    const paymentRemarks =
        document.getElementById("paymentRemarks");

    const paymentSearch =
        document.getElementById("paymentSearch");

    const paymentMethodFilter =
        document.getElementById("paymentMethodFilter");

    const paymentTableBody =
        document.getElementById("paymentTableBody");

    const paymentEmpty =
        document.getElementById("paymentEmpty");

    const totalPayments =
        document.getElementById("totalPayments");

    const totalCollection =
        document.getElementById("totalCollection");

    const todayCollection =
        document.getElementById("todayCollection");

    const paymentRecordCount =
        document.getElementById("paymentRecordCount");


    /* =====================================================
       ELEMENT CHECK
    ===================================================== */

    console.log(
        "AK Cyber Payments: Initializing..."
    );

    console.log(
        "New Payment Button:",
        addPaymentBtn
    );

    console.log(
        "Payment Modal:",
        paymentModal
    );

    console.log(
        "Payment Form:",
        paymentForm
    );


    if (!paymentModal) {

        console.error(
            "ERROR: #paymentModal not found."
        );

        return;

    }


    if (!paymentForm) {

        console.error(
            "ERROR: #paymentForm not found."
        );

        return;

    }


    /* =====================================================
       PAYMENT DATA
    ===================================================== */

    let payments =
        loadPayments();


    /* =====================================================
       LOAD PAYMENTS
    ===================================================== */

    function loadPayments() {

        try {

            const saved =
                localStorage.getItem(
                    PAYMENT_STORAGE_KEY
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
                "Payment loading error:",
                error
            );

            return [];

        }

    }


    /* =====================================================
       SAVE PAYMENTS
    ===================================================== */

    function savePayments() {

        try {

            localStorage.setItem(
                PAYMENT_STORAGE_KEY,
                JSON.stringify(payments)
            );

        } catch (error) {

            console.error(
                "Payment saving error:",
                error
            );

            alert(
                "Unable to save payment data."
            );

        }

    }


    /* =====================================================
       TODAY
    ===================================================== */

    function getToday() {

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


    /* =====================================================
       RECEIPT NUMBER
    ===================================================== */

    function generateReceiptNumber() {

        let number = 1001;

        const usedNumbers =
            payments
                .map(
                    payment =>
                        String(
                            payment.receiptNumber || ""
                        )
                );

        while (
            usedNumbers.includes(
                `PAY-${number}`
            )
        ) {

            number++;

        }

        return `PAY-${number}`;

    }


    /* =====================================================
       LOAD CUSTOMERS
    ===================================================== */

    function loadPaymentCustomers(
        selectedCustomer = ""
    ) {

        if (!paymentCustomer) {
            return;
        }


        paymentCustomer.innerHTML = `
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

                    customers =
                        parsed;

                }

            }

        } catch (error) {

            console.error(
                "Customer loading error:",
                error
            );

        }


        customers.forEach(
            function (customer) {

                if (!customer) {
                    return;
                }


                const name =
                    customer.name ||
                    customer.fullName ||
                    customer.customerName ||
                    customer.full_name ||
                    "";


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


                paymentCustomer.appendChild(
                    option
                );

            }
        );


        if (selectedCustomer) {

            paymentCustomer.value =
                selectedCustomer;

        }

    }


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    function openPaymentModal(
        payment = null
    ) {

        console.log(
            "Opening payment modal..."
        );


        paymentForm.reset();


        if (paymentId) {
            paymentId.value = "";
        }


        /* ---------------------------------------------
           LOAD CUSTOMER LIST
        --------------------------------------------- */

        loadPaymentCustomers();


        /* ---------------------------------------------
           EDIT PAYMENT
        --------------------------------------------- */

        if (payment) {

            if (paymentModalTitle) {

                paymentModalTitle.textContent =
                    "Edit Payment";

            }


            if (paymentId) {

                paymentId.value =
                    payment.id || "";

            }


            if (paymentReceiptNumber) {

                paymentReceiptNumber.value =
                    payment.receiptNumber || "";

            }


            loadPaymentCustomers(
                payment.customer || ""
            );


            if (paymentService) {

                paymentService.value =
                    payment.service || "";

            }


            if (paymentAmount) {

                paymentAmount.value =
                    payment.amount || "";

            }


            if (paymentMethod) {

                paymentMethod.value =
                    payment.method || "";

            }


            if (paymentDate) {

                paymentDate.value =
                    payment.date || "";

            }


            if (paymentRemarks) {

                paymentRemarks.value =
                    payment.remarks || "";

            }

        }


        /* ---------------------------------------------
           NEW PAYMENT
        --------------------------------------------- */

        else {

            if (paymentModalTitle) {

                paymentModalTitle.textContent =
                    "New Payment";

            }


            if (paymentReceiptNumber) {

                paymentReceiptNumber.value =
                    generateReceiptNumber();

            }


            if (paymentDate) {

                paymentDate.value =
                    getToday();

            }

        }


        /* ---------------------------------------------
           SHOW MODAL
        --------------------------------------------- */

        paymentModal.classList.add(
            "active"
        );


        document.body.classList.add(
            "modal-open"
        );


        /* ---------------------------------------------
           FOCUS
        --------------------------------------------- */

        setTimeout(
            function () {

                if (
                    paymentCustomer &&
                    !paymentCustomer.value
                ) {

                    paymentCustomer.focus();

                }

            },
            100
        );

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closePaymentForm() {

        paymentModal.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "modal-open"
        );


        paymentForm.reset();


        if (paymentId) {

            paymentId.value =
                "";

        }


        if (paymentModalTitle) {

            paymentModalTitle.textContent =
                "New Payment";

        }

    }


    /* =====================================================
       NEW PAYMENT BUTTON
       EXACT HTML:
       #addPaymentBtn
    ===================================================== */

    if (addPaymentBtn) {

        addPaymentBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                console.log(
                    "New Payment clicked"
                );

                openPaymentModal();

            }
        );

    } else {

        console.error(
            "ERROR: #addPaymentBtn not found."
        );

    }


    /* =====================================================
       EMPTY STATE BUTTON
       EXACT HTML:
       #emptyPaymentBtn
    ===================================================== */

    if (emptyPaymentBtn) {

        emptyPaymentBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openPaymentModal();

            }
        );

    }


    /* =====================================================
       CLOSE BUTTON
       EXACT HTML:
       #closePaymentModal
    ===================================================== */

    if (closePaymentModal) {

        closePaymentModal.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closePaymentForm();

            }
        );

    }


    /* =====================================================
       CANCEL BUTTON
       EXACT HTML:
       #cancelPaymentModal
    ===================================================== */

    if (cancelPaymentModal) {

        cancelPaymentModal.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closePaymentForm();

            }
        );

    }


    /* =====================================================
       CLICK OUTSIDE MODAL
    ===================================================== */

    paymentModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                paymentModal
            ) {

                closePaymentForm();

            }

        }
    );


    /* =====================================================
       PREVENT MODAL CONTENT CLICK FROM CLOSING
    ===================================================== */

    if (paymentModalBox) {

        paymentModalBox.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                paymentModal.classList.contains(
                    "active"
                )
            ) {

                closePaymentForm();

            }

        }
    );


    /* =====================================================
       FORM SUBMIT
       EXACT HTML:
       #paymentForm
    ===================================================== */

    paymentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const receiptNumber =
                paymentReceiptNumber
                    ? paymentReceiptNumber.value.trim()
                    : "";


            const customer =
                paymentCustomer
                    ? paymentCustomer.value.trim()
                    : "";


            const service =
                paymentService
                    ? paymentService.value.trim()
                    : "";


            const amount =
                paymentAmount
                    ? Number(
                        paymentAmount.value
                    )
                    : 0;


            const method =
                paymentMethod
                    ? paymentMethod.value.trim()
                    : "";


            const date =
                paymentDate
                    ? paymentDate.value.trim()
                    : "";


            const remarks =
                paymentRemarks
                    ? paymentRemarks.value.trim()
                    : "";


            /* -----------------------------------------
               VALIDATION
            ----------------------------------------- */

            if (!receiptNumber) {

                alert(
                    "Please enter receipt number."
                );

                paymentReceiptNumber.focus();

                return;

            }


            if (!customer) {

                alert(
                    "Please select customer."
                );

                paymentCustomer.focus();

                return;

            }


            if (!service) {

                alert(
                    "Please select service."
                );

                paymentService.focus();

                return;

            }


            if (
                !Number.isFinite(amount) ||
                amount <= 0
            ) {

                alert(
                    "Please enter a valid amount."
                );

                paymentAmount.focus();

                return;

            }


            if (!method) {

                alert(
                    "Please select payment method."
                );

                paymentMethod.focus();

                return;

            }


            if (!date) {

                alert(
                    "Please select payment date."
                );

                paymentDate.focus();

                return;

            }


            /* -----------------------------------------
               DUPLICATE RECEIPT CHECK
            ----------------------------------------- */

            const currentId =
                paymentId
                    ? paymentId.value
                    : "";


            const duplicate =
                payments.find(
                    function (payment) {

                        return (
                            String(
                                payment.receiptNumber || ""
                            ).toLowerCase() ===
                            receiptNumber.toLowerCase()
                            &&
                            String(
                                payment.id || ""
                            ) !==
                            String(
                                currentId
                            )
                        );

                    }
                );


            if (duplicate) {

                alert(
                    "This receipt number already exists."
                );

                paymentReceiptNumber.focus();

                return;

            }


            /* -----------------------------------------
               EDIT EXISTING
            ----------------------------------------- */

            if (currentId) {

                const index =
                    payments.findIndex(
                        function (payment) {

                            return (
                                String(
                                    payment.id
                                ) ===
                                String(
                                    currentId
                                )
                            );

                        }
                    );


                if (index !== -1) {

                    payments[index] = {

                        ...payments[index],

                        receiptNumber:
                            receiptNumber,

                        customer:
                            customer,

                        service:
                            service,

                        amount:
                            amount,

                        method:
                            method,

                        date:
                            date,

                        remarks:
                            remarks

                    };

                }

            }


            /* -----------------------------------------
               CREATE NEW PAYMENT
            ----------------------------------------- */

            else {

                const newPayment = {

                    id:
                        Date.now().toString(),

                    receiptNumber:
                        receiptNumber,

                    customer:
                        customer,

                    service:
                        service,

                    amount:
                        amount,

                    method:
                        method,

                    date:
                        date,

                    remarks:
                        remarks,

                    createdAt:
                        new Date().toISOString()

                };


                payments.unshift(
                    newPayment
                );

            }


            /* -----------------------------------------
               SAVE
            ----------------------------------------- */

            savePayments();


            /* -----------------------------------------
               REFRESH TABLE
            ----------------------------------------- */

            renderPayments();


            /* -----------------------------------------
               CLOSE MODAL
            ----------------------------------------- */

            closePaymentForm();


            console.log(
                "Payment saved successfully."
            );

        }
    );


    /* =====================================================
       SEARCH
       EXACT HTML:
       #paymentSearch
    ===================================================== */

    if (paymentSearch) {

        paymentSearch.addEventListener(
            "input",
            function () {

                renderPayments();

            }
        );

    }


    /* =====================================================
       METHOD FILTER
       EXACT HTML:
       #paymentMethodFilter
    ===================================================== */

    if (paymentMethodFilter) {

        paymentMethodFilter.addEventListener(
            "change",
            function () {

                renderPayments();

            }
        );

    }


    /* =====================================================
       GET FILTERED PAYMENTS
    ===================================================== */

    function getFilteredPayments() {

        const search =
            paymentSearch
                ? paymentSearch.value
                    .trim()
                    .toLowerCase()
                : "";


        const selectedMethod =
            paymentMethodFilter
                ? paymentMethodFilter.value
                : "all";


        return payments.filter(
            function (payment) {

                const receipt =
                    String(
                        payment.receiptNumber || ""
                    ).toLowerCase();


                const customer =
                    String(
                        payment.customer || ""
                    ).toLowerCase();


                const service =
                    String(
                        payment.service || ""
                    ).toLowerCase();


                const matchesSearch =
                    !search ||
                    receipt.includes(search) ||
                    customer.includes(search) ||
                    service.includes(search);


                if (!matchesSearch) {

                    return false;

                }


                if (
                    selectedMethod !== "all" &&
                    payment.method !==
                        selectedMethod
                ) {

                    return false;

                }


                return true;

            }
        );

    }


    /* =====================================================
       RENDER PAYMENTS
    ===================================================== */

    function renderPayments() {

        const filtered =
            getFilteredPayments();


        if (paymentTableBody) {

            paymentTableBody.innerHTML =
                "";

        }


        /* ---------------------------------------------
           EMPTY STATE
        --------------------------------------------- */

        if (filtered.length === 0) {

            if (paymentEmpty) {

                paymentEmpty.style.display =
                    "flex";

            }

        }


        /* ---------------------------------------------
           TABLE
        --------------------------------------------- */

        else {

            if (paymentEmpty) {

                paymentEmpty.style.display =
                    "none";

            }


            filtered.forEach(
                function (payment) {

                    const row =
                        createPaymentRow(
                            payment
                        );


                    if (paymentTableBody) {

                        paymentTableBody.appendChild(
                            row
                        );

                    }

                }
            );

        }


        updatePaymentStatistics(
            filtered
        );

    }


    /* =====================================================
       CREATE TABLE ROW
       MATCHES EXACT HTML TABLE
    ===================================================== */

    function createPaymentRow(
        payment
    ) {

        const row =
            document.createElement(
                "tr"
            );


        const initials =
            getInitials(
                payment.customer
            );


        row.innerHTML = `

            <td>

                <span class="payment-receipt-number">

                    ${escapeHTML(
                        payment.receiptNumber
                    )}

                </span>

            </td>


            <td>

                <div class="payment-customer-cell">

                    <div class="payment-avatar">

                        ${escapeHTML(
                            initials
                        )}

                    </div>

                    <span>

                        ${escapeHTML(
                            payment.customer
                        )}

                    </span>

                </div>

            </td>


            <td>

                ${escapeHTML(
                    payment.service
                )}

            </td>


            <td>

                <strong class="payment-amount">

                    ${formatCurrency(
                        payment.amount
                    )}

                </strong>

            </td>


            <td>

                <span class="payment-method-badge">

                    ${escapeHTML(
                        payment.method
                    )}

                </span>

            </td>


            <td>

                ${escapeHTML(
                    formatDate(
                        payment.date
                    )
                )}

            </td>


            <td>

                <div class="payment-actions">

                    <button
                        type="button"
                        class="payment-action-btn"
                        title="Edit"
                        data-action="edit"
                        data-id="${escapeHTML(
                            payment.id
                        )}"
                    >

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        type="button"
                        class="payment-action-btn delete"
                        title="Delete"
                        data-action="delete"
                        data-id="${escapeHTML(
                            payment.id
                        )}"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        `;


        return row;

    }


    /* =====================================================
       TABLE ACTIONS
    ===================================================== */

    if (paymentTableBody) {

        paymentTableBody.addEventListener(
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

                    editPayment(id);

                }


                if (action === "delete") {

                    deletePayment(id);

                }

            }
        );

    }


    /* =====================================================
       EDIT PAYMENT
    ===================================================== */

    function editPayment(id) {

        const payment =
            payments.find(
                function (item) {

                    return (
                        String(
                            item.id
                        ) ===
                        String(
                            id
                        )
                    );

                }
            );


        if (!payment) {

            console.error(
                "Payment not found:",
                id
            );

            return;

        }


        openPaymentModal(
            payment
        );

    }


    /* =====================================================
       DELETE PAYMENT
    ===================================================== */

    function deletePayment(id) {

        const payment =
            payments.find(
                function (item) {

                    return (
                        String(
                            item.id
                        ) ===
                        String(
                            id
                        )
                    );

                }
            );


        if (!payment) {
            return;
        }


        const confirmed =
            confirm(
                `Delete payment "${payment.receiptNumber}"?`
            );


        if (!confirmed) {
            return;
        }


        payments =
            payments.filter(
                function (item) {

                    return (
                        String(
                            item.id
                        ) !==
                        String(
                            id
                        )
                    );

                }
            );


        savePayments();

        renderPayments();

    }


    /* =====================================================
       STATISTICS
    ===================================================== */

    function updatePaymentStatistics(
        filtered
    ) {

        const total =
            payments.length;


        const totalAmount =
            payments.reduce(
                function (
                    sum,
                    payment
                ) {

                    return (
                        sum +
                        (
                            Number(
                                payment.amount
                            ) || 0
                        )
                    );

                },
                0
            );


        const today =
            getToday();


        const todayAmount =
            payments.reduce(
                function (
                    sum,
                    payment
                ) {

                    if (
                        String(
                            payment.date || ""
                        ) === today
                    ) {

                        return (
                            sum +
                            (
                                Number(
                                    payment.amount
                                ) || 0
                            )
                        );

                    }


                    return sum;

                },
                0
            );


        if (totalPayments) {

            totalPayments.textContent =
                total;

        }


        if (totalCollection) {

            totalCollection.textContent =
                formatCurrency(
                    totalAmount
                );

        }


        if (todayCollection) {

            todayCollection.textContent =
                formatCurrency(
                    todayAmount
                );

        }


        if (paymentRecordCount) {

            const count =
                filtered.length;


            paymentRecordCount.textContent =
                `${count} ${
                    count === 1
                        ? "Record"
                        : "Records"
                }`;

        }

    }


    /* =====================================================
       CURRENCY
    ===================================================== */

    function formatCurrency(
        amount
    ) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2
            }
        ).format(
            Number(amount) || 0
        );

    }


    /* =====================================================
       DATE FORMAT
    ===================================================== */

    function formatDate(
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


    /* =====================================================
       INITIALS
    ===================================================== */

    function getInitials(
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


    /* =====================================================
       HTML ESCAPE
    ===================================================== */

    function escapeHTML(
        value
    ) {

        return String(
            value ?? ""
        )
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


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    loadPaymentCustomers();

    renderPayments();


    console.log(
        "AK Cyber Payments Module — READY"
    );

});
