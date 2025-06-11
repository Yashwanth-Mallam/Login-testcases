const form = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

let attemptCount = 0;

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Reset messages and styles
  emailError.textContent = "";
  passwordError.textContent = "";
  messageDiv.textContent = "";
  messageDiv.className = "";

  emailInput.classList.remove("error");
  passwordInput.classList.remove("error");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let valid = true;

  // Updated Email validation
  if (!email) {
    emailError.textContent = "Email is required.";
    emailInput.classList.add("error");
    valid = false;
  } else if (!email.includes("@gmail.com")) {
    emailError.textContent = "Please include '@gmail.com' in your email.";
    emailInput.classList.add("error");
    valid = false;
  }

  // Password validation
  if (!password) {
    passwordError.textContent = "Password is required";
    passwordInput.classList.add("error");
    valid = false;
  }

  if (!valid) return;

  try {
    const response = await fetch(
      `https://loanbuddy-server-8emb.onrender.com/users?email=${email}`
    );
    const data = await response.json();

    if (data.length === 0) {
      messageDiv.textContent = "User not found!";
      emailInput.classList.add("error");
      attemptCount++;
    } else {
      const user = data[0];

      if (user.password === password) {
        messageDiv.textContent = "Login successful!";
        messageDiv.className = "success";
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        setTimeout(() => {
          window.location.href = "Wellcome.html";
        }, 1000);
      } else {
        messageDiv.textContent = "Incorrect password!";
        passwordInput.classList.add("error");
        attemptCount++;
      }
    }

    // After 3 failed attempts, show credentials
    if (attemptCount === 3) {
      alert(
        "Correct credentials:\nEmail: yashwanthmallam345@gmail.com\nPassword: 12345"
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    messageDiv.textContent = "Something went wrong. Please try again later.";
  }
});
