function startFireworks(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Không thể lấy context của canvas!");
    return;
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let particles = [];

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height / 2);
    const colors = ['#ff66b2', '#ffeb3b', '#00e676', '#00b0ff', '#d500f9'];
    
    // Tạo 80 hạt cho mỗi cụm nổ để hiệu ứng vừa đủ đẹp, không gây lag mobile
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function update() {
    // Tạo lớp phủ mờ nhẹ chồng lên nhau để làm đuôi pháo hoa lấp lánh cực sang
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.vy += 0.04; // Trọng lực rơi tự nhiên
      p.vx *= 0.98; // Lực cản không khí
      p.vy *= 0.98;
      
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.01; // Tốc độ mờ dần của tàn pháo

      if (p.alpha <= 0) {
        particles.splice(i, 1);
      } else {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        
        // Thêm hiệu ứng phát sáng nhẹ cho hạt pháo neon
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    if (Math.random() < 0.04) createFirework();
    requestAnimationFrame(update);
  }

  update();
}

document.addEventListener('DOMContentLoaded', () => {
  const giftBtn = document.getElementById('giftBtn');
  const slider = document.querySelector('.slider');
  const hbdText = document.getElementById('hbdText');
  const cake = document.querySelector('.cake');
  const audio = document.getElementById('birthday-audio');
  const canvas = document.getElementById('fireworks');

  giftBtn.addEventListener('click', () => {
    try {
      giftBtn.style.display = 'none';
      
      setTimeout(() => {
        hbdText.classList.remove('hidden');
      }, 0);
      setTimeout(() => {
        slider.classList.remove('hidden');
      }, 200);
      setTimeout(() => {
        cake.classList.remove('hidden');
      }, 400);

      audio.play().catch((error) => {
        console.error('Lỗi phát nhạc:', error);
        alert('Vui lòng bật âm thanh trên trình duyệt để nghe nhạc sinh nhật nha!');
      });

      if (typeof startFireworks === 'function') {
        startFireworks(canvas);
      } else {
        console.error('Hàm startFireworks không tồn tại.');
      }
    } catch (error) {
      console.error('Lỗi khi mở quà:', error);
    }
  });
});
