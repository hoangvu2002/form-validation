/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-unused-vars
const form = document.querySelector("form");

// eslint-disable-next-line spaced-comment
//Add inline validation for email
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");


// eslint-disable-next-line no-unused-vars
email.addEventListener("input", (event) => {
    // Each time the user types something, we check if the
    // form fields are valid.
  
    if (email.validity.valid) {
      // In case there is an error message visible, if the field
      // is valid, we remove the error message.
      emailError.textContent = ""; // Reset the content of the message
      emailError.className = "error"; // Reset the visual state of the message
    } else {
      // If there is still an error, show the correct error
      showError();
    }
  });

  function showError() {
    if (email.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
      // If the field doesn't contain an email address,
      // display the following error message.
      emailError.textContent = "Entered value needs to be an email address.";
    } else if (email.validity.tooShort) {
      // If the data is too short,
      // display the following error message.
      emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }
  
    // Set the styling appropriately
    emailError.className = "error active";
  }

  // Add validation for country and zipcode input
  function checkZIP() {
    // For each country, defines the pattern that the ZIP has to follow
    const constraints = {
      ch: [
        "^(CH-)?\\d{4}$",
        "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
      ],
      fr: [
        "^(F-)?\\d{5}$",
        "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
      ],
      de: [
        "^(D-)?\\d{5}$",
        "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
      ],
      nl: [
        "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
      ],
    };

    const country = document.getElementById("Country").value;

    // Get the NPA field
    const ZIPField = document.getElementById("ZIP");
    const zipError = document.querySelector("#ZIP + span.error");
    // Build the constraint checker
    const constraint = new RegExp(constraints[country][0], "");
    console.log(constraint);
  
    // Check it!
    if (constraint.test(ZIPField.value)) {
      // The ZIP follows the constraint, we use the ConstraintAPI to tell it
      ZIPField.setCustomValidity("");
      zipError.textContent = "";
      zipError.className = "error";
    } else {
      // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
      // give a message about the format required for this country
      ZIPField.setCustomValidity(constraints[country][1]);
      zipError.textContent = `${constraints[country][1]}`;
      zipError.className = "error active";
    }
  };

  window.onload = () => {
    document.getElementById("Country").onchange = checkZIP;
    document.getElementById("ZIP").oninput = checkZIP;
  };