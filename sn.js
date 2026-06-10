document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    applyWordTypingAnimation();

    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('closed');
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        window.location.href = 'banh.html';
    });
});

function createHearts() {
    const container = document.getElementById('hearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 12 + 12}px`;
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }, 400);
}

function applyWordTypingAnimation() {
    const paragraphs = document.querySelectorAll('.letter p:not(.signature)');
    let totalDelay = 0.5;

    paragraphs.forEach((p) => {
        const text = p.textContent.trim();
        const words = text.split(' ');
        p.innerHTML = words
            .map((word, index) => `<span class="word" style="animation-delay: ${totalDelay + index * 0.15}s">${word}</span>`)
            .join(' ');
        totalDelay += words.length * 0.15 + 0.2;
    });

    setTimeout(() => {
        document.getElementById('signature').classList.add('show');
        document.getElementById('nextButton').classList.add('show');
    }, totalDelay * 1000 + 500);
}
