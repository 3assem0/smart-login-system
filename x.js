document.addEventListener('DOMContentLoaded', function () {
    // Function to register a new user
    document.getElementById('registerButton')?.addEventListener('click', function () {
        const userName = document.getElementById('userName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const alertParagraph = document.getElementById('registerAlert');

        if (userName && email && password) {
            // Store user data in local storage
            localStorage.setItem('userName', userName);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            // Alert the user and then redirect
            alertParagraph.textContent = 'Registration successful!';
            alertParagraph.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to login page
            }, 1000);
        } else {
            alertParagraph.textContent = 'Please fill out all fields.';
            alertParagraph.style.color = 'red';
        }
    });

    // Function to login the user
    document.getElementById('loginButton')?.addEventListener('click', function () {
        const email = document.getElementById('signinEmail').value;
        const password = document.getElementById('signinPassword').value;
        const alertParagraph = document.getElementById('loginAlert');
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');

        if (email === storedEmail && password === storedPassword) {
            localStorage.setItem('loggedIn', 'true');

            // Alert the user and then redirect
            alertParagraph.textContent = 'Login successful!';
            alertParagraph.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'home.html'; // Redirect to home page
            }, 1000);
        } else {
            alertParagraph.textContent = 'Invalid email or password.';
            alertParagraph.style.color = 'red';
        }
    });

    // Function to display username on the home page
    if (localStorage.getItem('loggedIn') === 'true' && document.getElementById('usernameDisplay')) {
        const userName = localStorage.getItem('userName');
        document.getElementById('usernameDisplay').textContent = userName;
    }

    // Function to logout the user
    document.getElementById('logoutButton')?.addEventListener('click', function () {
        localStorage.removeItem('loggedIn');

        // Alert the user and then redirect
        alert('Logout successful!');
        window.location.href = 'index.html'; // Redirect to login page
    });

    if (!localStorage.getItem('loggedIn') && window.location.pathname === '/home.html') {
        alert('You are not logged in. Redirecting to login page.');
        window.location.href = 'index.html'; 
    }
});


fetch('https://forkify-api.herokuapp.com/api/search?q=pizza')
.then(response => response.json()) 
.then(data => {
    const recipes = data.recipes;

    const recipeResultsElement = document.getElementById('recipeResults');

    // Create HTML content to display the recipes
    const recipesHTML = recipes.map(recipe => {
        return `
            <div class="recipe">
                <h2>${recipe.title}</h2>
                <img src="${recipe.image_url}" alt="${recipe.title}">
                <p>${recipe.publisher}</p>
                <a href="${recipe.source_url}" target="_blank">View Recipe</a>
            </div>
        `;
    }).join('');

    // Set the HTML content of the element
    recipeResultsElement.innerHTML = recipesHTML;
})
.catch(error => {
    console.error('Error fetching data:', error);
});
