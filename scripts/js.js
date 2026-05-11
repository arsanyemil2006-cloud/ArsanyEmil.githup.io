function toggleTheme(){
    document.body.classList.toggle("light-mode");
    
    if(document.body.classList.contains("light-mode")){
        localStorage.setItem("theme","light");
    }else{
        localStorage.setItem("theme","dark");
    }
    
}

document.addEventListener("DOMContentLoaded",
        function applyTheme(){
            let theme = localStorage.getItem("theme");
            if (theme === "light"){
                document.body.classList.add("light-mode");
            }else{
                document.body.classList.remove("light-mode");
            }
});

function isLoginPage() {
    const file = window.location.pathname.split('/').pop().toLowerCase();
    return file === '' || file === 'index.html';
}

function isAuthenticated() {
    return !!localStorage.getItem('carzone_logged_in');
}

function requireAuthentication() {
    if (!isLoginPage() && !isAuthenticated()) {
        window.location.href = 'index.html';
    }
}

function showDetails(name, price, desc, imgSrc) {
  const newTab = window.open('', '_blank');
  const theme = localStorage.getItem('theme');
  const stylesheetUrl = new URL('styles/style.css', window.location.href).href;

  if (!newTab) {
    alert('Please allow popups for this site to open details in a new tab.');
    return;
  }

  newTab.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${name} Details</title>
      <link rel="stylesheet" href="${stylesheetUrl}">
    </head>
    <body class="details-body ${theme === 'light' ? 'light-mode' : ''}">
      <div class="details-card">
        <img src="${imgSrc}" alt="${name}">
        <h1>${name}</h1>
        <p><strong class="detailsjs">Price:</strong> ${price.toLocaleString()} EGP</p>
        <p><strong class="detailsjs">Details:</strong><br>${desc || 'No additional details available.'}</p>
        <div class="details-controls">
          <a class="details-close" href="javascript:window.close();">Close tab</a>
        </div>
      </div>
    </body>
    </html>
  `);
  newTab.document.close();
}

//  إغلاق التفاصيل
function closeDetails() {
  document.getElementById("detailsBox").classList.add("hidden");
}


document.addEventListener("DOMContentLoaded", function () {

  let searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("keyup", function () {

    let value = searchInput.value.toLowerCase();

    let cars = document.querySelectorAll(".car-card");

    cars.forEach(function (car) {

      let name = car.querySelector(".name").innerText.toLowerCase();

      if (name.includes(value)) {
        car.style.display = "block";
      } else {
        car.style.display = "none";
      }

    });

  });

});


document.addEventListener('DOMContentLoaded', () => {
    requireAuthentication();

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    if (!loginForm || !signupForm) return;
    
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    // Switch to Sign Up
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        // Clear errors
        document.getElementById('login-error').style.display = 'none';
        document.getElementById('signup-error').style.display = 'none';
    });

    // Switch to Login
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        // Clear errors
        document.getElementById('login-error').style.display = 'none';
        document.getElementById('signup-error').style.display = 'none';
    });

    // Handle Login Submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value;
        const errorDiv = document.getElementById('login-error');

        // Clear previous error
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorDiv.textContent = "Please enter a valid email address.";
            errorDiv.style.display = 'block';
            return;
        }

        // Password validation
        if (password.length === 0) {
            errorDiv.textContent = "Please enter your password.";
            errorDiv.style.display = 'block';
            return;
        }

        // Check if user exists
        const users = JSON.parse(localStorage.getItem('carzone_users') || '{}');
        if (!users[email]) {
            errorDiv.textContent = "Account does not exist. Please sign up first.";
            errorDiv.style.display = 'block';
            return;
        }

        if (users[email].password !== password) {
            errorDiv.textContent = "Incorrect password. Please try again.";
            errorDiv.style.display = 'block';
            return;
        }

        // Login successful
        localStorage.setItem('carzone_logged_in', email);
        alert(`Welcome back to Car Zone, ${users[email].name}!`);
        window.location.href = 'home.html';
    });

    // Handle Sign Up Submit
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = signupForm.querySelector('input[type="text"]').value.trim();
        const email = signupForm.querySelector('input[type="email"]').value.trim();
        const password = document.getElementById('signup-pass').value;
        const errorDiv = document.getElementById('signup-error');
        
        // Clear previous error
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
        
        // Name validation
        if (name.length === 0) {
            errorDiv.textContent = "Please enter your full name.";
            errorDiv.style.display = 'block';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorDiv.textContent = "Please enter a valid email address.";
            errorDiv.style.display = 'block';
            return;
        }
        
        if(password.length < 6) {
            errorDiv.textContent = "Security Alert: Password must be at least 6 characters for Car Zone access.";
            errorDiv.style.display = 'block';
            return;
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('carzone_users') || '{}');
        if (users[email]) {
            errorDiv.textContent = "An account with this email already exists. Please log in instead.";
            errorDiv.style.display = 'block';
            return;
        }
        
        // Save user
        users[email] = { name, password };
        localStorage.setItem('carzone_users', JSON.stringify(users));
        
        alert("Welcome to the Car Zone club! Account created. Please log in.");
        // Switch back to login after successful signup
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
});


