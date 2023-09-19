// const { json } = require("body-parser");

const loginBtn = document.getElementById("submit");

async function login(e) {
  e.preventDefault();
  let url = "http://localhost:5000/api/v1/login";
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      userPassword: password,
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      sessionStorage.setItem("type_id", data.type_id),
        sessionStorage.setItem("userID", data.userID);
      if (data.error) {
        window.location.href = "./index.html";
      } else {
        window.location.href = "./dashboard.html";
      }
    })
    .catch((err) => console.log(err));

  return;
}

loginBtn.addEventListener("click", login);


