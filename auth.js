/*document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status immediately
    checkAuth();

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAuth('login');
        });
    }

    // Signup form handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAuth('signup');
        });
    }
});

function handleAuth(type) {
    if (type === 'login') {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        // In a real app, you would verify credentials with a server here
        localStorage.setItem('driftUser', JSON.stringify({
            email,
            authenticated: true,
            lastLogin: new Date().toISOString()
        }));

        redirectToMain();

    } else if (type === 'signup') {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        // Validate passwords match
        if (password !== confirmPassword) {
            const errorElement = document.getElementById('passwordError');
            if (errorElement) {
                errorElement.textContent = "Passwords don't match";
                errorElement.style.display = 'block';
            }
            return;
        }

        // In a real app, you would send this data to your server
        localStorage.setItem('driftUser', JSON.stringify({
            name,
            email,
            authenticated: true,
            joinedDate: new Date().toISOString()
        }));

        redirectToMain();
    }
}

function checkAuth() {
    const userData = localStorage.getItem('driftUser');
    const isAuthenticated = userData && JSON.parse(userData).authenticated;
    const currentPage = window.location.pathname.split('/').pop();

    // If user is on auth pages but already logged in
    if ((currentPage === 'login.html' || currentPage === 'signup.html') && isAuthenticated) {
        redirectToMain();
    }
    // If user is on main page but not logged in
    else if (currentPage === 'main.html' && !isAuthenticated) {
        window.location.href = 'login.html';
    }
}

function redirectToMain() {
    // Clear any URL parameters
    const cleanUrl = window.location.origin + '/main.html';
    window.history.replaceState({}, document.title, cleanUrl);
    
    // Redirect to main page
    window.location.href = 'main.html';
}*/

document.addEventListener('DOMContentLoaded', function() {
    // Only check auth if we're not on the login page
    if (!window.location.pathname.endsWith('login.html')) {
        checkAuth();
    }

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAuth('login');
        });
    }
});

function handleAuth(type) {
    if (type === 'login') {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        // Store auth data
        localStorage.setItem('driftUser', JSON.stringify({
            email,
            authenticated: true,
            lastLogin: new Date().toISOString()
        }));

        // Force redirect with cache busting
        window.location.href = 'main.html?t=' + Date.now();
    }
}

function checkAuth() {
    const userData = localStorage.getItem('driftUser');
    const isAuthenticated = userData && JSON.parse(userData).authenticated;
    
    // More reliable page detection
    const isLoginPage = window.location.pathname.endsWith('login.html');
    const isMainPage = window.location.pathname.endsWith('main.html') || 
                      window.location.pathname.endsWith('/');

    if (isLoginPage && isAuthenticated) {
        redirectToMain();
    } else if (isMainPage && !isAuthenticated) {
        window.location.href = 'login.html';
    }
}

function redirectToMain() {
    window.location.href = 'main.html';
}