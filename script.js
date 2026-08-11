
/* =========================================================
   AK CYBER MANAGEMENT SYSTEM
   LOGIN SYSTEM
   ========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");


const togglePassword =
    document.getElementById("togglePassword");

const loginBtn =
    document.getElementById("loginBtn");

const loginStatus =
    document.getElementById("loginStatus");

const rememberMe =
    document.getElementById("rememberMe");

const forgotPassword =
    document.getElementById("forgotPassword");


/* =========================================================
   DEMO LOGIN
   =========================================================
   
   Temporary credentials:

   Username: admin
   Password: admin123

   Later we will replace this with
   secure database authentication.
   ========================================================= */

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "Akshara@2009";


/* =========================================================
   SHOW / HIDE PASSWORD
   ========================================================= */

if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        function () {

            const isPassword =
                passwordInput.type === "password";

            passwordInput.type =
                isPassword
                    ? "text"
                    : "password";


            const icon =
                togglePassword.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-eye",
                    !isPassword
                );

                icon.classList.toggle(
                    "fa-eye-slash",
                    isPassword
                );
            }


            togglePassword.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );
        }
    );
}


/* =========================================================
   REMEMBERED USERNAME
   ========================================================= */

const savedUsername =
    localStorage.getItem(
        "akCyberUsername"
    );

if (savedUsername) {

    usernameInput.value =
        savedUsername;

    rememberMe.checked = true;
}


/* =========================================================
   LOGIN STATUS
   ========================================================= */

function showStatus(message, type = "error") {

    loginStatus.textContent =
        message;

    if (type === "success") {

        loginStatus.style.color =
            "#6b9e72";

    } else {

        loginStatus.style.color =
            "#c25573";
    }
}


/* =========================================================
   BUTTON LOADING
   ========================================================= */

function setLoading(isLoading) {

    if (isLoading) {

        loginBtn.disabled = true;

        loginBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span>LOGGING IN...</span>
        `;

    } else {

        loginBtn.disabled = false;

        loginBtn.innerHTML = `
            <span>LOGIN</span>
            <i class="fa-solid fa-arrow-right"></i>
        `;
    }
}


/* =========================================================
   LOGIN FORM
   ========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                usernameInput.value.trim();

            const password =
                passwordInput.value;


            /* Clear previous status */

            showStatus("");


            /* Validation */

            if (!username || !password) {

                showStatus(
                    "Please enter username and password."
                );

                return;
            }


            /* Loading */

            setLoading(true);


            /*
             * Small delay to simulate
             * authentication request.
             */

            setTimeout(
                function () {

                    if (
                        username === DEMO_USERNAME &&
                        password === DEMO_PASSWORD
                    ) {

                        /* Remember username */

                        if (rememberMe.checked) {

                            localStorage.setItem(
                                "akCyberUsername",
                                username
                            );

                        } else {

                            localStorage.removeItem(
                                "akCyberUsername"
                            );
                        }


                        showStatus(
                            "Login successful. Welcome!",
                            "success"
                        );


                        /*
                         * Dashboard redirect
                         *
                         * We will create dashboard.html
                         * in the next step.
                         */

                        setTimeout(
                            function () {

                                window.location.href =
                                    "admin/dashboard.html";

                            },
                            900
                        );

                    } else {

                        showStatus(
                            "Invalid username or password."
                        );

                        setLoading(false);

                        passwordInput.focus();
                    }

                },
                700
            );
        }
    );
}


/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            showStatus(
                "Password recovery will be available soon."
            );
        }
    );
}


/* =========================================================
   ENTER KEY SUPPORT
   ========================================================= */

if (passwordInput) {

    passwordInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                loginForm.requestSubmit();
            }
        }
    );
}
