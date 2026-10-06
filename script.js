/* =====================================================
   MARTINEZ FITNESS GYM
   ROLE SYSTEM

   ADMIN:
   - Add members
   - View members
   - Remove members
   - View payments
   - Manage everything

   CUSTODIAN / BANTAY: 
   - Add members
   - View members
   - Cannot remove members

   MEMBER:
   - View own information only
===================================================== */


/* =====================================================
   DATA
===================================================== */

let members =
    JSON.parse(localStorage.getItem("gymMembers")) || [];

let currentMember =
    JSON.parse(localStorage.getItem("currentMember")) || null;


/* =====================================================
   PAGE CONTROL
===================================================== */

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    document
        .querySelectorAll(".dashboard-page")
        .forEach(page => {

            page.classList.remove("active");

        });


    const page =
        document.getElementById(pageId);


    if (page) {

        page.classList.add("active");

    }

}


/* =====================================================
   ADMIN LOGIN
===================================================== */

const adminLoginForm =
    document.getElementById("adminLoginForm");


if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("adminEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("adminPassword")
                    .value;


            /*
                ADMIN ACCOUNT
            */

            if (
                email === "gandako@gmail.com"
                &&
                password === "pokpok"
            ) {

                showPage("adminDashboardPage");

                updateAdminDashboard();

            }

            else {

                alert(
                    "Incorrect admin email or password."
                );

            }

        }
    );

}


/* =====================================================
   CUSTODIAN LOGIN
===================================================== */

const custodianLoginForm =
    document.getElementById(
        "custodianLoginForm"
    );


if (custodianLoginForm) {

    custodianLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("custodianEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("custodianPassword")
                    .value;


            /*
                CUSTODIAN ACCOUNT
            */

            if (
                email === "custodian@gmail.com"
                &&
                password === "custodian"
            ) {

                showPage(
                    "custodianDashboardPage"
                );

                updateCustodianDashboard();

            }

            else {

                alert(
                    "Incorrect custodian email or password."
                );

            }

        }
    );

}


/* =====================================================
   ADD MEMBER FUNCTION
===================================================== */

function addMember(
    name,
    contact,
    email,
    password,
    membership,
    paymentMethod,
    amount
) {


    /*
       CHECK DUPLICATE EMAIL
    */

    const existingMember =
        members.find(
            member =>
                member.email.toLowerCase()
                ===
                email.toLowerCase()
        );


    if (existingMember) {

        alert(
            "An account with this email already exists."
        );

        return false;

    }


    /*
       CALCULATE DATES
    */

    const startDate =
        new Date();


    const expirationDate =
        new Date(startDate);


    if (membership === "Daily") {

        expirationDate.setDate(
            expirationDate.getDate() + 1
        );

    }

    else if (membership === "Weekly") {

        expirationDate.setDate(
            expirationDate.getDate() + 7
        );

    }

    else if (membership === "Monthly") {

        expirationDate.setMonth(
            expirationDate.getMonth() + 1
        );

    }


    /*
       CREATE MEMBER
    */

    const newMember = {

        id: Date.now(),

        name: name,

        contact: contact,

        email: email,

        password: password,

        membership: membership,

        paymentMethod: paymentMethod,

        amount: Number(amount),

        startDate:
            formatDate(startDate),

        expirationDate:
            formatDate(expirationDate),

        paymentDate:
            formatDate(startDate)

    };


    members.push(newMember);


    /*
       SAVE
    */

    localStorage.setItem(
        "gymMembers",
        JSON.stringify(members)
    );


    return true;

}


/* =====================================================
   ADMIN ADD MEMBER
===================================================== */

const adminAddMemberForm =
    document.getElementById(
        "adminAddMemberForm"
    );


if (adminAddMemberForm) {

    adminAddMemberForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("adminAddName")
                    .value
                    .trim();


            const contact =
                document
                    .getElementById("adminAddContact")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("adminAddEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("adminAddPassword")
                    .value;


            const membership =
                document
                    .getElementById("adminAddMembership")
                    .value;


            const paymentMethod =
                document
                    .getElementById("adminAddPayment")
                    .value;


            const amount =
                document
                    .getElementById("adminAddAmount")
                    .value;


            const success =
                addMember(
                    name,
                    contact,
                    email,
                    password,
                    membership,
                    paymentMethod,
                    amount
                );


            if (!success) {

                return;

            }


            alert(
                "Member added successfully!"
            );


            adminAddMemberForm.reset();


            updateAdminDashboard();

        }
    );

}


/* =====================================================
   CUSTODIAN ADD MEMBER
===================================================== */

const custodianAddMemberForm =
    document.getElementById(
        "custodianAddMemberForm"
    );


if (custodianAddMemberForm) {

    custodianAddMemberForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "custodianAddName"
                    )
                    .value
                    .trim();


            const contact =
                document
                    .getElementById(
                        "custodianAddContact"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "custodianAddEmail"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "custodianAddPassword"
                    )
                    .value;


            const membership =
                document
                    .getElementById(
                        "custodianAddMembership"
                    )
                    .value;


            const paymentMethod =
                document
                    .getElementById(
                        "custodianAddPayment"
                    )
                    .value;


            const amount =
                document
                    .getElementById(
                        "custodianAddAmount"
                    )
                    .value;


            const success =
                addMember(
                    name,
                    contact,
                    email,
                    password,
                    membership,
                    paymentMethod,
                    amount
                );


            if (!success) {

                return;

            }


            alert(
                "Member added successfully!"
            );


            custodianAddMemberForm.reset();


            updateCustodianDashboard();

        }
    );

}


/* =====================================================
   MEMBER LOGIN
===================================================== */

const memberLoginForm =
    document.getElementById(
        "memberLoginForm"
    );


if (memberLoginForm) {

    memberLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "memberLoginEmail"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "memberLoginPassword"
                    )
                    .value;


            const member =
                members.find(
                    member =>
                        member.email.toLowerCase()
                        ===
                        email.toLowerCase()
                        &&
                        member.password === password
                );


            if (!member) {

                alert(
                    "Incorrect email or password."
                );

                return;

            }


            currentMember =
                member;


            localStorage.setItem(
                "currentMember",
                JSON.stringify(currentMember)
            );


            showPage(
                "memberDashboardPage"
            );


            updateMemberDashboard();

        }
    );

}


/* =====================================================
   ADMIN DASHBOARD
===================================================== */

function updateAdminDashboard() {

    const totalMembers =
        document.getElementById(
            "totalMembers"
        );


    const activeMembers =
        document.getElementById(
            "activeMembers"
        );


    const totalPayments =
        document.getElementById(
            "totalPayments"
        );


    const expiringSoon =
        document.getElementById(
            "expiringSoon"
        );


    if (!totalMembers) {

        return;

    }


    /*
       TOTAL MEMBERS
    */

    totalMembers.textContent =
        members.length;


    /*
       ACTIVE MEMBERS
    */

    const today =
        new Date();


    const active =
        members.filter(
            member => {

                const expiration =
                    new Date(
                        member.expirationDate
                    );


                return expiration >= today;

            }
        );


    activeMembers.textContent =
        active.length;


    /*
       TOTAL PAYMENTS
    */

    const payments =
        members.reduce(
            (total, member) =>
                total +
                Number(member.amount || 0),
            0
        );


    totalPayments.textContent =
        "₱" +
        payments.toLocaleString();


    /*
       EXPIRING SOON
    */

    const threeDays =
        new Date();


    threeDays.setDate(
        threeDays.getDate() + 3
    );


    const expiring =
        members.filter(
            member => {

                const expiration =
                    new Date(
                        member.expirationDate
                    );


                return (
                    expiration >= today
                    &&
                    expiration <= threeDays
                );

            }
        );


    expiringSoon.textContent =
        expiring.length;


    renderRecentMembers();

    renderAllMembers();

    renderPayments();

}


/* =====================================================
   CUSTODIAN DASHBOARD
===================================================== */

function updateCustodianDashboard() {

    const total =
        document.getElementById(
            "custodianTotalMembers"
        );


    if (total) {

        total.textContent =
            members.length;

    }


    renderCustodianMembers();

}


/* =====================================================
   RECENT MEMBERS
===================================================== */

function renderRecentMembers() {

    const table =
        document.getElementById(
            "recentMembersTable"
        );


    if (!table) {

        return;

    }


    table.innerHTML = "";


    const recentMembers =
        [...members]
            .reverse()
            .slice(0, 5);


    recentMembers.forEach(
        member => {

            const expiration =
                new Date(
                    member.expirationDate
                );


            const status =
                expiration >= new Date()
                    ? "Active"
                    : "Expired";


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${member.name}</td>

                <td>${member.email}</td>

                <td>${member.membership}</td>

                <td>${status}</td>

            `;


            table.appendChild(row);

        }
    );

}


/* =====================================================
   ADMIN - ALL MEMBERS
===================================================== */

function renderAllMembers() {

    const table =
        document.getElementById(
            "allMembersTable"
        );


    if (!table) {

        return;

    }


    table.innerHTML = "";


    members.forEach(
        member => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${member.name}</td>

                <td>${member.contact}</td>

                <td>${member.email}</td>

                <td>${member.membership}</td>

                <td>${member.startDate}</td>

                <td>${member.expirationDate}</td>

                <td>

                    <button
                        class="delete-button"
                        onclick="deleteMember(${member.id})">

                        REMOVE

                    </button>

                </td>

            `;


            table.appendChild(row);

        }
    );

}


/* =====================================================
   CUSTODIAN - VIEW MEMBERS
===================================================== */

function renderCustodianMembers() {

    const table =
        document.getElementById(
            "custodianMembersTable"
        );


    if (!table) {

        return;

    }


    table.innerHTML = "";


    members.forEach(
        member => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${member.name}</td>

                <td>${member.contact}</td>

                <td>${member.email}</td>

                <td>${member.membership}</td>

                <td>${member.startDate}</td>

                <td>${member.expirationDate}</td>

            `;


            table.appendChild(row);

        }
    );

}


/* =====================================================
   ADMIN REMOVE MEMBER
===================================================== */

function deleteMember(memberId) {

    /*
       ONLY ADMIN HAS ACCESS TO THIS FUNCTION
       THROUGH THE ADMIN MEMBERS TABLE.
    */

    const member =
        members.find(
            item => item.id === memberId
        );


    if (!member) {

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to remove " +
            member.name +
            "?"
        );


    if (!confirmDelete) {

        return;

    }


    members =
        members.filter(
            item => item.id !== memberId
        );


    localStorage.setItem(
        "gymMembers",
        JSON.stringify(members)
    );


    alert(
        "Member removed successfully."
    );


    updateAdminDashboard();

}


/* =====================================================
   PAYMENTS
===================================================== */

function renderPayments() {

    const table =
        document.getElementById(
            "paymentsTable"
        );


    if (!table) {

        return;

    }


    table.innerHTML = "";


    members.forEach(
        member => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${member.name}</td>

                <td>${member.membership}</td>

                <td>${member.paymentMethod}</td>

                <td>
                    ₱${Number(
                        member.amount
                    ).toLocaleString()}
                </td>

                <td>${member.paymentDate}</td>

            `;


            table.appendChild(row);

        }
    );

}


/* =====================================================
   MEMBER DASHBOARD
===================================================== */

function updateMemberDashboard() {

    if (!currentMember) {

        return;

    }


    const name =
        document.getElementById(
            "memberWelcomeName"
        );


    const membership =
        document.getElementById(
            "memberMembershipType"
        );


    const status =
        document.getElementById(
            "memberStatus"
        );


    const startDate =
        document.getElementById(
            "memberStartDate"
        );


    const expiration =
        document.getElementById(
            "memberExpiration"
        );


    if (name) {

        name.textContent =
            currentMember.name;

    }


    if (membership) {

        membership.textContent =
            currentMember.membership;

    }


    if (startDate) {

        startDate.textContent =
            currentMember.startDate;

    }


    if (expiration) {

        expiration.textContent =
            currentMember.expirationDate;

    }


    const expirationDate =
        new Date(
            currentMember.expirationDate
        );


    const today =
        new Date();


    const memberStatus =
        expirationDate >= today
            ? "Active"
            : "Expired";


    if (status) {

        status.textContent =
            memberStatus;

    }


    /*
       MEMBERSHIP DETAILS
    */

    const detailType =
        document.getElementById(
            "membershipDetailType"
        );


    const detailStart =
        document.getElementById(
            "membershipDetailStart"
        );


    const detailEnd =
        document.getElementById(
            "membershipDetailEnd"
        );


    const detailStatus =
        document.getElementById(
            "membershipDetailStatus"
        );


    if (detailType) {

        detailType.textContent =
            currentMember.membership;

    }


    if (detailStart) {

        detailStart.textContent =
            currentMember.startDate;

    }


    if (detailEnd) {

        detailEnd.textContent =
            currentMember.expirationDate;

    }


    if (detailStatus) {

        detailStatus.textContent =
            memberStatus;

    }


    /*
       PAYMENT DETAILS
    */

    const paymentMethod =
        document.getElementById(
            "memberPaymentMethod"
        );


    const amountPaid =
        document.getElementById(
            "memberAmountPaid"
        );


    const paymentDate =
        document.getElementById(
            "memberPaymentDate"
        );


    if (paymentMethod) {

        paymentMethod.textContent =
            currentMember.paymentMethod;

    }


    if (amountPaid) {

        amountPaid.textContent =
            Number(
                currentMember.amount
            ).toLocaleString();

    }


    if (paymentDate) {

        paymentDate.textContent =
            currentMember.paymentDate;

    }

}


/* =====================================================
   ADMIN MENU
===================================================== */

function showAdminSection(
    sectionId,
    button
) {

    document
        .querySelectorAll(
            "#adminDashboardPage .dashboard-section"
        )
        .forEach(
            section => {

                section.classList.add(
                    "hidden"
                );

            }
        );


    const section =
        document.getElementById(
            sectionId
        );


    if (section) {

        section.classList.remove(
            "hidden"
        );

    }


    document
        .querySelectorAll(
            "#adminDashboardPage .menu-button"
        )
        .forEach(
            menuButton => {

                menuButton.classList.remove(
                    "active"
                );

            }
        );


    if (button) {

        button.classList.add(
            "active"
        );

    }

}


/* =====================================================
   CUSTODIAN MENU
===================================================== */

function showCustodianSection(
    sectionId,
    button
) {

    document
        .querySelectorAll(
            "#custodianDashboardPage .dashboard-section"
        )
        .forEach(
            section => {

                section.classList.add(
                    "hidden"
                );

            }
        );


    const section =
        document.getElementById(
            sectionId
        );


    if (section) {

        section.classList.remove(
            "hidden"
        );

    }


    document
        .querySelectorAll(
            "#custodianDashboardPage .menu-button"
        )
        .forEach(
            menuButton => {

                menuButton.classList.remove(
                    "active"
                );

            }
        );


    if (button) {

        button.classList.add(
            "active"
        );

    }

}


/* =====================================================
   MEMBER MENU
===================================================== */

function showMemberSection(
    sectionId,
    button
) {

    document
        .querySelectorAll(
            "#memberDashboardPage .dashboard-section"
        )
        .forEach(
            section => {

                section.classList.add(
                    "hidden"
                );

            }
        );


    const section =
        document.getElementById(
            sectionId
        );


    if (section) {

        section.classList.remove(
            "hidden"
        );

    }


    document
        .querySelectorAll(
            "#memberDashboardPage .menu-button"
        )
        .forEach(
            menuButton => {

                menuButton.classList.remove(
                    "active"
                );

            }
        );


    if (button) {

        button.classList.add(
            "active"
        );

    }

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    currentMember = null;


    localStorage.removeItem(
        "currentMember"
    );


    showPage("homePage");

}


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(date) {

    return date.toLocaleDateString(
        "en-PH",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


/* =====================================================
   START SYSTEM
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPage("homePage");

    }
);