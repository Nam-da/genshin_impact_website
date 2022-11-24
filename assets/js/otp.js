// OTP

function randNumber() {
  let no = Math.floor(Math.random() * 9) + 0;
  return no;
}

function redirect() {
  window.location.assign("../change_password.html");
}

function changeButton() {
  document.querySelector(".submit-btn").style.display = "none";
  document.querySelector(".redirect").style.display = "block";
}

let numberBox = ["a", "b", "c", "d"];

function ass() {
  for (let count = 0; count < numberBox.length; count++) {
    document.querySelector("#" + numberBox[count]).value = randNumber();
  }
  if (!document.querySelector("#" + numberBox[3]).value == "") {
    changeButton();
  }
}
