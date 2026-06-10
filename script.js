document.addEventListener('DOMContentLoaded', () => {
  // Mật khẩu gốc 271108 đã được mã hóa chuỗi chống xem trộm code F12
  const ENCRYPTED_PW = "MjcxMTA4"; 
  const MAX_LENGTH = 6;

  const passwordInput = document.getElementById('passwordInput');
  const keypad = document.getElementById('keypad');

  // Tạo hiệu ứng tim bay nhẹ nhàng ở nền ngay khi vào trang
  createHeartEffects();

  function appendValue(number) {
    if (passwordInput.value.length < MAX_LENGTH) {
      passwordInput.value += number;
    }
  }

  function clearPassword() {
    passwordInput.value = '';
  }

  function checkPassword() {
    if (btoa(passwordInput.value) === ENCRYPTED_PW) {
      passwordInput.classList.add('correct');
      alert('Mật khẩu đúng! Chuẩn bị đón bất ngờ nè!!');
      window.location.href = 'sinhnhat.html';
    } else {
      passwordInput.classList.add('incorrect');
      setTimeout(() => {
        passwordInput.classList.remove('incorrect');
        alert('Mật khẩu chưa đúng rồi, thử lại nhé!');
        clearPassword();
      }, 500);
    }
  }

  keypad.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;

    const value = target.dataset.value;
    const action = target.dataset.action;

    if (value) {
      appendValue(value);
    } else if (action === 'clear') {
      clearPassword();
    } else if (action === 'submit') {
      checkPassword();
    }
  });

  function createHeartEffects() {
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart-particle');
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      heart.style.animationDuration = `${Math.random() * 4 + 4}s`;
      document.body.appendChild(heart);
    }
  }
});
