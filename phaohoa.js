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
    // Pháo bắn lên từ giữa màn hình và nổ ngẫu nhiên tầm cao
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height * 0.4) + (canvas.height * 0.1);
    const colors = ['#ff0055', '#00ffcc', '#ffcc00', '#ff00ff', '#00ff00', '#ffffff'];
    const pCount = 60;
    
    for (let i = 0; i < pCount; i++) {
      const angle = (Math.PI * 2 / pCount) * i + Math.random() * 0.5;
      const speed = Math.random() * 3 + 2;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        gravity: 0.04, // Tạo độ rơi vật lý cho hạt pháo
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function update() {
    // Tạo hiệu ứng đuôi nhạt dần (trails) bằng cách phủ nhẹ màu mờ thay vì xóa hoàn toàn
    ctx.fillStyle = 'rgba(13, 13, 13, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity; // Pháo rơi cong xuống nhẹ
      p.alpha -= 0.012;

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

    if (Math.random() < 0.04 && particles.length < 300) createFirework();
    requestAnimationFrame(update);
  }

  update();
}

document.addEventListener('DOMContentLoaded', () => {
  const giftBox = document.getElementById('gift-box-container');
  const slider = document.querySelector('.slider');
  const hbdText = document.getElementById('hbdText');
  const cake = document.querySelector('.cake');
  const audio = document.getElementById('birthday-audio');
  const canvas = document.getElementById('fireworks');

  giftBox.addEventListener('click', () => {
    // Kích hoạt nắp mở và biến mất hộp quà
    giftBox.classList.add('open');
    
    setTimeout(() => {
      giftBox.style.display = 'none';
      
      // Cho chữ, bánh và slider ảnh xuất hiện nhịp nhàng liền mạch
      hbdText.classList.remove('hidden');
      slider.classList.remove('hidden');
      cake.classList.remove('hidden');

      // Phát nhạc nền lập tức
      audio.play().catch(() => {
        console.log("Trình duyệt chặn tự động phát, cần tương tác người dùng.");
      });

      // Bật pháo hoa khủng
      if (typeof startFireworks === 'function') {
        startFireworks(canvas);
      }
    }, 500);
  });
});
