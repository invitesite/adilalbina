// Код для формы и таймера
// Этот код не меняется, так как он не связан с анимациями
document.addEventListener('DOMContentLoaded', () => {

    // Логика формы
    const attendanceForm = document.getElementById('attendanceForm');
    if (attendanceForm) {
        attendanceForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('guestName').value;
            const attendance = document.querySelector('input[name="attendance"]:checked').value;
            console.log(`Имя: ${name}, Присутствие: ${attendance}`);
            alert('Спасибо за ваш ответ!');
        });
    }

    // Логика таймера
    const weddingDate = new Date('October 10, 2025 18:00:00').getTime();
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = "Мероприятие началось!";
        }
    }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (Остальной код из app.js)

    // Логика для музыкальной иконки
    const musicIcon = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;

    // Изначально добавляем класс "pulsing", чтобы иконка анимировалась при загрузке страницы
    musicIcon.classList.add('pulsing');

    musicIcon.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.classList.remove('playing');
            musicIcon.classList.add('pulsing');
        } else {
            backgroundMusic.play();
            musicIcon.classList.add('playing');
            musicIcon.classList.remove('pulsing');
        }
        isPlaying = !isPlaying;
    });
});
