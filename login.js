
// Local mock DB for demo unique login (use backend in production)
const usedEmails = new Set();
const usedPhones = new Set();

function validatePassword(pw) {
  return /^(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(pw);
}

// Toggle sections
const userBtn = document.getElementById('userBtn');
const authorityBtn = document.getElementById('authorityBtn');
const userSection = document.getElementById('userSection');
const authoritySection = document.getElementById('authoritySection');
const statusDiv = document.getElementById('status');

userBtn.onclick = () => {
  userBtn.classList.add('active');
  authorityBtn.classList.remove('active');
  userSection.style.display = '';
  authoritySection.style.display = 'none';
  statusDiv.textContent = '';
};
authorityBtn.onclick = () => {
  authorityBtn.classList.add('active');
  userBtn.classList.remove('active');
  authoritySection.style.display = '';
  userSection.style.display = 'none';
  statusDiv.textContent = '';
};

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (input.type === "password") {
      input.type = "text";
      this.textContent = "Hide";
    } else {
      input.type = "password";
      this.textContent = "Show";
    }
  });
});

// User form submission and validation
document.getElementById('userLoginForm').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('user_name').value.trim();
  const phone = document.getElementById('user_phone').value.trim();
  const email = document.getElementById('user_email').value.trim();
  const password = document.getElementById('user_password').value;
  const passwordError = document.getElementById('user_passwordError');
  passwordError.textContent = '';

  // Validation
  if (usedEmails.has(email) || usedPhones.has(phone)) {
    statusDiv.textContent = "This email or phone is already in use. Try another.";
    return;
  }
  if (!validatePassword(password)) {
    passwordError.textContent = "Password must have 8 chars, 1 number, 1 special character.";
    return;
  }
  // Mark as used (simulate DB entry)
  usedEmails.add(email);
  usedPhones.add(phone);

  statusDiv.textContent = "Login successful! Redirecting...";
  setTimeout(() => {
    // Simulate redirect to public user homepage
    window.location.href = "home/Home.html#alerts";
  }, 1200);
};

// Authority form
document.getElementById('authorityLoginForm').onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('auth_email').value.trim();
  const password = document.getElementById('auth_password').value;
  const role = document.getElementById('auth_role').value;
  const passwordError = document.getElementById('auth_passwordError');
  passwordError.textContent = '';

  if (usedEmails.has(email)) {
    statusDiv.textContent = "This email is already in use. Use another.";
    return;
  }
  if (!validatePassword(password)) {
    passwordError.textContent = "Password must have 8 chars, 1 number, 1 special character.";
    return;
  }
  if (!role) {
    statusDiv.textContent = "Please select your authority role.";
    return;
  }
  usedEmails.add(email);

  statusDiv.textContent = "Authority login successful! Redirecting...";
  setTimeout(() => {
    // Simulate redirect to authority dashboard
    window.location.href = "authority/dashboard.html";
  }, 1200);
};
