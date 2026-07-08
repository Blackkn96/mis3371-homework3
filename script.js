/*
Name: David Kinard
File: script.js
Date created: June 27, 2026
Date updated: June 27, 2026
Version: 3.0
Purpose: External JavaScript file for Valor Veterans Medical Center Homework 3.
         Validates every field on the fly (oninput/onblur), shows and removes
         error messages as the user types, formats SSN with dashes, compares
         passwords, and only reveals the Submit button when all fields pass.
*/


/* ==================== HELPER FUNCTIONS ==================== */

/* Show an error message next to a field */
function showError(fieldId, message) {
    document.getElementById(fieldId + "-error").innerHTML = message;
}

/* Clear an error message from a field */
function clearError(fieldId) {
    document.getElementById(fieldId + "-error").innerHTML = "";
}


/* ==================== SLIDE BAR ==================== */

/* Update the health rating value shown next to the slider */
function updateHealthRating(value) {
    document.getElementById("health_rating_value").innerHTML = value;
}


/* ==================== SSN AUTO-FORMAT ==================== */

/* Automatically insert dashes as the user types the SSN */
function formatSSN() {
    var ssnField = document.getElementById("ssn");
    var digits = ssnField.value.replace(/[^0-9]/g, "");   /* strip non-digits */
    if (digits.length > 9) {
        digits = digits.substring(0, 9);                  /* max 9 digits */
    }
    var formatted = digits;
    if (digits.length > 5) {
        formatted = digits.substring(0, 3) + "-" + digits.substring(3, 5) + "-" + digits.substring(5);
    } else if (digits.length > 3) {
        formatted = digits.substring(0, 3) + "-" + digits.substring(3);
    }
    ssnField.value = formatted;
}


/* ==================== FIELD VALIDATION FUNCTIONS ==================== */

/* First Name: 1-30 chars, letters, apostrophes, dashes only */
function validateFirstName() {
    var value = document.getElementById("firstname").value;
    var pattern = /^[A-Za-z'\-]{1,30}$/;
    if (value === "") {
        showError("firstname", "First name is required.");
        return false;
    } else if (!pattern.test(value)) {
        showError("firstname", "Letters, apostrophes and dashes only (1-30 characters).");
        return false;
    }
    clearError("firstname");
    return true;
}

/* Middle Initial: optional, 1 letter only */
function validateMiddleInit() {
    var value = document.getElementById("middleinit").value;
    var pattern = /^[A-Za-z]$/;
    if (value === "") {
        clearError("middleinit");   /* optional field */
        return true;
    } else if (!pattern.test(value)) {
        showError("middleinit", "Must be a single letter.");
        return false;
    }
    clearError("middleinit");
    return true;
}

/* Last Name: 1-30 chars, letters, apostrophes, dashes only */
function validateLastName() {
    var value = document.getElementById("lastname").value;
    var pattern = /^[A-Za-z'\-]{1,30}$/;
    if (value === "") {
        showError("lastname", "Last name is required.");
        return false;
    } else if (!pattern.test(value)) {
        showError("lastname", "Letters, apostrophes and dashes only (1-30 characters).");
        return false;
    }
    clearError("lastname");
    return true;
}

/* Date of Birth: MM/DD/YYYY, not future, not more than 120 years ago */
function validateDOB() {
    var value = document.getElementById("dob").value;
    var pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;

    if (value === "") {
        showError("dob", "Date of birth is required.");
        return false;
    }
    if (!pattern.test(value)) {
        showError("dob", "Use MM/DD/YYYY format.");
        return false;
    }

    /* Split into pieces and build a date object */
    var arr = value.split("/");
    var month = parseInt(arr[0], 10);
    var day   = parseInt(arr[1], 10);
    var year  = parseInt(arr[2], 10);
    var birthDate = new Date(year, month - 1, day);
    var today = new Date();

    /* Cannot be in the future */
    if (birthDate > today) {
        showError("dob", "Date of birth cannot be in the future.");
        return false;
    }

    /* Cannot be more than 120 years ago */
    var oldest = new Date();
    oldest.setFullYear(today.getFullYear() - 120);
    if (birthDate < oldest) {
        showError("dob", "Date of birth cannot be more than 120 years ago.");
        return false;
    }

    clearError("dob");
    return true;
}

/* SSN: must be 9 digits (formatted as XXX-XX-XXXX) */
function validateSSN() {
    var value = document.getElementById("ssn").value;
    var pattern = /^\d{3}-\d{2}-\d{4}$/;
    if (value === "") {
        showError("ssn", "SSN is required.");
        return false;
    } else if (!pattern.test(value)) {
        showError("ssn", "Must be 9 digits.");
        return false;
    }
    clearError("ssn");
    return true;
}

/* Gender: one radio must be selected */
function validateGender() {
    var radios = document.getElementsByName("gender");
    var checked = false;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) { checked = true; break; }
    }
    if (!checked) {
        showError("gender", "Please select a gender.");
        return false;
    }
    clearError("gender");
    return true;
}

/* Address Line 1: required, 2-30 chars */
function validateAddress1() {
    var value = document.getElementById("address1").value;
    if (value === "") {
        showError("address1", "Address is required.");
        return false;
    } else if (value.length < 2 || value.length > 30) {
        showError("address1", "Must be 2-30 characters.");
        return false;
    }
    clearError("address1");
    return true;
}

/* Address Line 2: optional, but if entered must be 2-30 chars */
function validateAddress2() {
    var value = document.getElementById("address2").value;
    if (value === "") {
        clearError("address2");   /* optional */
        return true;
    } else if (value.length < 2 || value.length > 30) {
        showError("address2", "Must be 2-30 characters.");
        return false;
    }
    clearError("address2");
    return true;
}

/* City: required, 2-30 chars */
function validateCity() {
    var value = document.getElementById("city").value;
    if (value === "") {
        showError("city", "City is required.");
        return false;
    } else if (value.length < 2 || value.length > 30) {
        showError("city", "Must be 2-30 characters.");
        return false;
    }
    clearError("city");
    return true;
}

/* State: must select a value (not the blank default) */
function validateState() {
    var value = document.getElementById("state").value;
    if (value === "") {
        showError("state", "Please select a state.");
        return false;
    }
    clearError("state");
    return true;
}

/* Zip: 5 digits, or ZIP+4 format */
function validateZip() {
    var value = document.getElementById("zip").value;
    var pattern = /^\d{5}(-\d{4})?$/;
    if (value === "") {
        showError("zip", "Zip code is required.");
        return false;
    } else if (!pattern.test(value)) {
        showError("zip", "Must be 5 digits (or 12345-6789).");
        return false;
    }
    clearError("zip");
    return true;
}

/* Phone: 123-456-7890 format */
function validatePhone() {
    var value = document.getElementById("phone1").value;
    var pattern = /^\d{3}-\d{3}-\d{4}$/;
    if (value === "") {
        showError("phone1", "Phone number is required.");
        return false;
    } else if (!pattern.test(value)) {
        showError("phone1", "Use 123-456-7890 format.");
        return false;
    }
    clearError("phone1");
    return true;
}

/* Email: name@domain.tld, forced to lowercase */
function validateEmail() {
    var emailField = document.getElementById("email");
    emailField.value = emailField.value.toLowerCase();   /* force lowercase */
    var value = emailField.value;
    var pattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    if (value === "") {
        showError("email", "Email is required.");
        return false;
    } else if (!pattern.test(value)) {
        showError("email", "Use name@domain.tld format.");
        return false;
    }
    clearError("email");
    return true;
}

/* User ID: 5-20 chars, starts with letter, letters/numbers/dash/underscore, no spaces */
function validateUserID() {
    var value = document.getElementById("userid").value;
    var pattern = /^[A-Za-z][A-Za-z0-9_\-]{4,19}$/;
    if (value === "") {
        showError("userid", "User ID is required.");
        return false;
    } else if (/^[0-9]/.test(value)) {
        showError("userid", "Cannot start with a number.");
        return false;
    } else if (/\s/.test(value)) {
        showError("userid", "Cannot contain spaces.");
        return false;
    } else if (!pattern.test(value)) {
        showError("userid", "5-20 chars: letters, numbers, dash, underscore only.");
        return false;
    }
    clearError("userid");
    return true;
}

/* Password: 8-30 chars, 1 upper, 1 lower, 1 digit, 1 special, not equal to User ID */
function validatePassword() {
    var value = document.getElementById("password").value;
    var userid = document.getElementById("userid").value;

    if (value === "") {
        showError("password", "Password is required.");
        return false;
    }
    if (value.length < 8 || value.length > 30) {
        showError("password", "Must be 8-30 characters.");
        return false;
    }
    if (!/[A-Z]/.test(value)) {
        showError("password", "Must contain at least 1 uppercase letter.");
        return false;
    }
    if (!/[a-z]/.test(value)) {
        showError("password", "Must contain at least 1 lowercase letter.");
        return false;
    }
    if (!/[0-9]/.test(value)) {
        showError("password", "Must contain at least 1 number.");
        return false;
    }
    if (!/[!@#%^&*()\-_+=\/><.,`~]/.test(value)) {
        showError("password", "Must contain at least 1 special character.");
        return false;
    }
    if (/"/.test(value)) {
        showError("password", "Double quotes are not allowed.");
        return false;
    }
    if (userid !== "" && value.toLowerCase() === userid.toLowerCase()) {
        showError("password", "Password cannot equal your User ID.");
        return false;
    }
    clearError("password");

    /* Re-check confirm field in case it was already filled */
    if (document.getElementById("confirm_password").value !== "") {
        validateConfirmPassword();
    }
    return true;
}

/* Confirm Password: must match the password field */
function validateConfirmPassword() {
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm_password").value;
    if (confirm === "") {
        showError("confirm_password", "Please re-enter your password.");
        return false;
    } else if (password !== confirm) {
        showError("confirm_password", "Passwords do not match.");
        return false;
    }
    clearError("confirm_password");
    return true;
}

/* Insurance: one radio must be selected */
function validateInsurance() {
    var radios = document.getElementsByName("insurance");
    var checked = false;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) { checked = true; break; }
    }
    if (!checked) {
        showError("insurance", "Please select an option.");
        return false;
    }
    clearError("insurance");
    return true;
}

/* Vaccinated: one radio must be selected */
function validateVaccinated() {
    var radios = document.getElementsByName("vaccinated");
    var checked = false;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) { checked = true; break; }
    }
    if (!checked) {
        showError("vaccinated", "Please select an option.");
        return false;
    }
    clearError("vaccinated");
    return true;
}

/* Symptoms: required, no double quotes */
function validateSymptoms() {
    var value = document.getElementById("symptoms").value;
    if (value === "") {
        showError("symptoms", "Please describe your symptoms.");
        return false;
    } else if (/"/.test(value)) {
        showError("symptoms", "Please do not use double quotes.");
        return false;
    }
    clearError("symptoms");
    return true;
}


/* ==================== VALIDATE BUTTON ==================== */

/* Runs every validation. Shows the Submit button only if all pass. */
function validateForm() {
    /* Run every field validation and collect the results */
    var results = [
        validateFirstName(),
        validateMiddleInit(),
        validateLastName(),
        validateDOB(),
        validateSSN(),
        validateGender(),
        validateAddress1(),
        validateAddress2(),
        validateCity(),
        validateState(),
        validateZip(),
        validatePhone(),
        validateEmail(),
        validateUserID(),
        validatePassword(),
        validateConfirmPassword(),
        validateInsurance(),
        validateVaccinated(),
        validateSymptoms()
    ];

    /* Count how many failed */
    var errorCount = 0;
    for (var i = 0; i < results.length; i++) {
        if (results[i] === false) { errorCount++; }
    }

    var summary = document.getElementById("error-summary");
    var submitBtn = document.getElementById("submitBtn");

    if (errorCount === 0) {
        /* All good - reveal the Submit button */
        summary.style.display = "block";
        summary.style.color = "#1b6b2f";
        summary.innerHTML = "All fields look good! You may now submit your form.";
        submitBtn.style.display = "inline-block";
    } else {
        /* Errors present - keep Submit hidden */
        summary.style.display = "block";
        summary.style.color = "#c62828";
        summary.innerHTML = "Please fix the " + errorCount + " highlighted error(s) above before submitting.";
        submitBtn.style.display = "none";
    }
}


/* ==================== REVIEW BUTTON ==================== */

/* Displays all entered data in a table (kept from Homework 2) */
function reviewForm() {
    var firstname = document.getElementById("firstname").value;
    var middleinit = document.getElementById("middleinit").value;
    var lastname = document.getElementById("lastname").value;
    var dob = document.getElementById("dob").value;

    var genderRadios = document.getElementsByName("gender");
    var gender = "";
    for (var i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) { gender = genderRadios[i].value; break; }
    }

    var address1 = document.getElementById("address1").value;
    var address2 = document.getElementById("address2").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var phone = document.getElementById("phone1").value;
    var email = document.getElementById("email").value;
    var userid = document.getElementById("userid").value;
    var symptoms = document.getElementById("symptoms").value;
    var health_rating = document.getElementById("health_rating").value;

    var medicalHistory = [];
    var checkboxes = document.getElementsByName("medical_history");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) { medicalHistory.push(checkboxes[i].value); }
    }
    var medStr = medicalHistory.length > 0 ? medicalHistory.join(", ") : "None selected";

    var reviewHTML =
        "<table id='review-table'>" +
        "<tr><th colspan='2'>PLEASE REVIEW YOUR INFORMATION</th></tr>" +
        "<tr><td>Full Name:</td><td>" + firstname + " " + middleinit + " " + lastname + "</td></tr>" +
        "<tr><td>Date of Birth:</td><td>" + dob + "</td></tr>" +
        "<tr><td>SSN:</td><td>***-**-****</td></tr>" +
        "<tr><td>Gender:</td><td>" + (gender || "Not selected") + "</td></tr>" +
        "<tr><td>Address:</td><td>" + address1 + " " + address2 + "</td></tr>" +
        "<tr><td>City, State, Zip:</td><td>" + city + ", " + state + " " + zip + "</td></tr>" +
        "<tr><td>Phone:</td><td>" + phone + "</td></tr>" +
        "<tr><td>Email:</td><td>" + email + "</td></tr>" +
        "<tr><td>User ID:</td><td>" + userid + "</td></tr>" +
        "<tr><td>Password:</td><td>********</td></tr>" +
        "<tr><td>Symptoms:</td><td>" + symptoms + "</td></tr>" +
        "<tr><td>Medical History:</td><td>" + medStr + "</td></tr>" +
        "<tr><td>Health Rating:</td><td>" + health_rating + " / 10</td></tr>" +
        "</table>";

    document.getElementById("review-content").innerHTML = reviewHTML;
    document.getElementById("review-section").style.display = "block";
    document.getElementById("review-section").scrollIntoView({ behavior: "smooth" });
}


/* ==================== CLEAR FORM ==================== */

/* Hide review, error summary, submit button; reset slider display */
function clearForm() {
    document.getElementById("review-section").style.display = "none";
    document.getElementById("review-content").innerHTML = "";
    document.getElementById("error-summary").style.display = "none";
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("health_rating_value").innerHTML = "5";

    /* Clear all error messages */
    var errors = document.getElementsByClassName("error-msg");
    for (var i = 0; i < errors.length; i++) {
        errors[i].innerHTML = "";
    }
}

/* ==================== END OF DOCUMENT: script.js ==================== */
