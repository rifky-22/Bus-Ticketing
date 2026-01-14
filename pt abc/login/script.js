document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const app = document.querySelector('.app');
  const container = document.querySelector('.container');

  const VALID_EMAIL = 'tes123@gmail.com';
  const VALID_PASSWORD = 'tes123';

  document.body.classList.add('splash-active');

  const SPLASH_MS = 2200;
  let timer = setTimeout(showApp, SPLASH_MS);

  if (splash) {
    splash.addEventListener('click', () => {
      showApp();
      clearTimeout(timer);
    }
  );
  }

  function showApp() {
    if (!splash || !app) return;
    splash.style.display = 'none';
    app.style.display = 'block';
    app.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('splash-active');
  }

  document.addEventListener('click', (e) => {
    const clickedRegisterBtn = e.target.closest('.register-btn');
    const clickedRegisterLink = e.target.closest('.register a');
    if (clickedRegisterBtn || (clickedRegisterLink && e.target.closest('.form-box.login'))) {
      e.preventDefault();
      if (container) container.classList.add('active');
      return;
    }

    const clickedLoginBtn = e.target.closest('.login-btn');
    const clickedLoginLink = e.target.closest('.login a');
    if (clickedLoginBtn || (clickedLoginLink && e.target.closest('.form-box.register'))) {
      e.preventDefault();
      if (container) container.classList.remove('active');
      return;
    }
  }, { passive: false });

  const loginForm = document.querySelector('.form-box.login form');
  const registerForm = document.querySelector('.form-box.register form');

  function showFormError(formEl, message) {
    const existing = formEl.querySelector('.error-message');
    if (existing) existing.remove();

    const p = document.createElement('p');
    p.className = 'error-message';
    p.textContent = message;
    p.style.color = '#c0392b';
    p.style.margin = '8px 0 0';
    p.style.fontSize = '14px';
    p.style.fontWeight = '500';
    const submitBtn = formEl.querySelector('button[type="submit"]');
    if (submitBtn && submitBtn.parentNode) {
      submitBtn.parentNode.insertBefore(p, submitBtn);
    } else {
      formEl.appendChild(p);
    }
  }

  function clearFormError(formEl) {
    const existing = formEl.querySelector('.error-message');
    if (existing) existing.remove();
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFormError(loginForm);

      const usernameInput = loginForm.querySelector('input[type="text"], input[name="username"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');

      const username = usernameInput ? usernameInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';

      if (username === VALID_EMAIL && password === VALID_PASSWORD) {
        window.location.href = '../dashboard/dashboard.html';
      } else {
        showFormError(loginForm, 'Invalid email or password.');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFormError(registerForm);

      const emailInput = registerForm.querySelector('input[type="email"]');
      const passwordInput = registerForm.querySelector('input[type="password"]');

      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';

      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        window.location.href = 'next.html';
      } else {
        showFormError(registerForm, 'Registration did not match the expected test credentials.');
      }
    });
  }
});