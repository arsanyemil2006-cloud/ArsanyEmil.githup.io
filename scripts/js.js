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
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    // Switch to Sign Up
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    // Switch to Login
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Handle Login Submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        alert(`Logging into Car Zone as: ${email}`);
        // Here you would typically send data to your server
    });

    // Handle Sign Up Submit
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('signup-pass').value;
        
        if(password.length < 6) {
            alert("Security Alert: Password must be at least 6 characters for Car Zone access.");
            return;
        }
        
        alert("Welcome to the Car Zone club! Account created.");
        // Switch back to login after successful "signup"
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
});


