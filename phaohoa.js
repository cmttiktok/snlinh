function startFireworks(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let particles = [];

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height * 0.4) + (canvas.height * 0.1);
    const colors = ['#ff0055', '#00ffcc', '#ffcc00', '#ff00ff', '#00ff00', '#ffffff'];
    const pCount = 50;
    
    for (let i = 0; i < pCount; i++) {
      const angle = (Math.PI * 2 / pCount) * i;
      const speed = Math.random() * 3 + 2;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        gravity: 0.05,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function update() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Tạo hiệu ứng đuôi mờ lấp lánh cực đẹp
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= 0.015;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
      } else {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    if (Math.random() < 0.05 && particles.length < 400) createFirework();
    requestAnimationFrame(update);
  }

  update();
}

document.addEventListener('DOMContentLoaded', () => {
  // Trỏ chính xác về ID gốc giftBtn của bạn để không lo lỗi kẹt code
  const giftBtn = document.getElementById('giftBtn');
  const slider = document.querySelector('.slider');
  const hbdText = document.getElementById('hbdText');
  const cake = document.querySelector('.cake');
  const audio = document.getElementById('birthday-audio');
  const canvas = document.getElementById('fireworks');

  if (giftBtn) {
    giftBtn.addEventListener('click', () => {
      giftBtn.style.display = 'none';
      
      // Kích hoạt hiển thị đồng bộ bảo vệ layout
      if (hbdText) hbdText.classList.remove('hidden');
      if (slider) slider.classList.remove('hidden');
      if (cake) cake.classList.remove('hidden');

      // Phát nhạc sinh nhật
      if (audio) {
        audio.play().catch((err) => console.log("Chặn phát tự động: ", err));
      }

      // Kích hoạt pháo hoa
      if (canvas) {
        startFireworks(canvas);
      }
    });
  }
});
