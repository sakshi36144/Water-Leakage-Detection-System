function togglePassword() {
      const passwordField = document.getElementById("password");
      const toggleText = document.querySelector(".toggle-password");
      if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleText.textContent = "Hide";
      } else {
        passwordField.type = "password";
        toggleText.textContent = "Show";
      }
    }

    // Function to validate email
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    // Function to validate password (min 8 chars, 1 number, 1 special)
    function validatePassword(password) {
      const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      return re.test(password);
    }

    // Function to handle form submission
    async function handleRegistration() {
      const fullname = document.getElementById('fullname').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      // Basic validation
      if (!fullname || !phone || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
      }

      if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      if (!validatePassword(password)) {
        alert('Password must be at least 8 characters long, contain at least one number and one special character.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      // Prepare data
      const userData = {
        fullname: fullname,
        phone: phone,
        email: email,
        password: password
      };

      try {
        const response = await fetch('https://wls-backend-files.onrender.com/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        if (response.ok) {
          const result = await response.json();
          alert('Registration successful!');
          // Optionally redirect or clear form
          document.querySelector('form').reset();
        } else {
          const error = await response.json();
          alert('Registration failed: ' + (error.message || 'Unknown error'));
        }
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    }

    // Add event listener to the register button
    document.addEventListener('DOMContentLoaded', function() {
      const registerButton = document.querySelector('.btn-success');
      registerButton.addEventListener('click', handleRegistration);
    });