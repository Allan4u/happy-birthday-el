document.addEventListener('DOMContentLoaded', () => {
    const birthdayDate = new Date('July 16, 2025 00:00:00').getTime();

    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        countdownSection: document.getElementById('countdown-section'),
        birthdaySection: document.getElementById('birthday-section')
    };

    const countdownInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthdayDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            showBirthdayMessage();
            return;
        }

        elements.days.textContent = formatTime(Math.floor(distance / (1000 * 60 * 60 * 24)));
        elements.hours.textContent = formatTime(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        elements.minutes.textContent = formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        elements.seconds.textContent = formatTime(Math.floor((distance % (1000 * 60)) / 1000));
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
    function showBirthdayMessage() {
        elements.countdownSection.style.display = 'none';
        elements.birthdaySection.classList.remove('d-none');
        createConfetti();
    }

    function createConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        const colors = ['#e0e1dd', '#ffffff', '#415a77']; // Silver, White, Steel Blue
        const confettiCount = 150;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const size = Math.random() * 8 + 4;
            confetti.style.position = 'absolute';
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = '0';
            confetti.style.borderRadius = `${Math.random() * 50}%`;
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = `${-size}px`;

            const animation = confetti.animate([
                { top: `${-size}px`, opacity: 1, transform: `rotate(${Math.random() * 360}deg)` },
                { top: `100vh`, opacity: 0, transform: `rotate(${Math.random() * 1080}deg)` }
            ], {
                duration: Math.random() * 4000 + 5000,
                easing: 'ease-out',
                delay: Math.random() * 1000
            });
            
            animation.onfinish = () => confetti.remove();
            confettiContainer.appendChild(confetti);
        }
    }
});