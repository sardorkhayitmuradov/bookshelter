"use strick";

let elForm = document.querySelector(".form");
let elUsername = document.querySelector(".username");
let elPassword = document.querySelector(".password");

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const usernameValue = elUsername.value;
    const passwordValue = elPassword.value;

    fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: usernameValue,
            password: passwordValue,
        }),
    })
    .then(res => res.json())
    .then(data => {
      if (data?.token) {
        window.localStorage.setItem("token", data.token);

        window.location.replace("home.html");
      } else {
        alert("Sizda xatolik bor, iltimos qaytadan urinib ko'ring!");
      }
    });
})