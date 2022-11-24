const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const form = document.querySelector("#forgot_password");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent the form from submitting

  // validate fields
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail();

  let isFormValid = isUsernameValid && isEmailValid;

  // submit to the server if the form is valid
  if (isFormValid) {
    document.querySelector(".errormsg").style.display = "none";
    window.location.assign("../otp.html");
  }
});

// Different kinds of validation

// Reusable utility functions
const isRequired = (value) => (value === "" ? false : true);

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input;
  // change color of border of field
  formField.style.borderColor = "#b00020";
  // show the error message
  const error = document.querySelector(".errormsg");
  error.style.display = "block";
  error.style.color = "#b00020";
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input;
  // change border color
  formField.style.borderColor = "#132f6b";
};

const isEmailValid = (email) => {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
};

// Checking username
const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const username = usernameEl.value.trim();
  if (!isRequired(username)) {
    showError(usernameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} to ${max} characters.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(
      emailEl,
      "Email is not valid. Should be something like Qiqi@gmail.com"
    );
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};
