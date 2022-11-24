const usernameEl = document.querySelector("#username");
const passwordEl = document.querySelector("#password");
const form = document.querySelector("#login");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent the form from submitting

  // validate fields
  let isUsernameValid = checkUsername(),
    isPasswordValid = checkPassword();
  let isFormValid = isUsernameValid && isPasswordValid;
  let isUserValid = userValid();

  // submit to the server if the form is valid
  if (isFormValid) {
    document.querySelector(".errormsg").style.display = "none";
    if (isUserValid) {
      window.location.assign("../dashboard.html");
    } else {
      document.querySelector(".errormsg").style.display = "block";
      document.querySelector(".errormsg").style.color = "#18367a";
      document.querySelector(".errormsg").textContent =
        "No such user! Why not register?";
    }
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
  // change border color
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

  // hide the error message
  const error = document.querySelector(".errormsg");
  error.style.display = "none";
  error.textContent = "";
};

const isPasswordSecure = (password) => {
  const re = new RegExp("^(?=.{3,})");
  return re.test(password);
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

const checkPassword = () => {
  let valid = false;
  const password = passwordEl.value.trim();
  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(passwordEl, "Password must have at least 3 characters");
  } else {
    showSuccess(passwordEl);
    valid = true;
  }
  return valid;
};

const userValid = () => {
  const username = usernameEl.value.trim();
  const password = passwordEl.value.trim();

  const user1 = "Hu Tao";
  const user1Passwd = "Raiden x Yae";

  if (username === user1 && password === user1Passwd) {
    return true;
  } else return false;
};
