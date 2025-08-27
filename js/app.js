document.addEventListener('DOMContentLoaded', () => {
    const attendanceForm = document.getElementById('attendanceForm');
    const guestNameInput = document.getElementById('guestName');

    // Ваш уникальный URL из Google Apps Script
    const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbxW-XLn3ZEXoNScj8Le0wGtBT4MzKOvAI1Boih010LIytps9rltH3yhg5IXs2TwhVQ/exec';

    if (attendanceForm) {
        attendanceForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const guestName = guestNameInput.value.trim();
            const attendance = document.querySelector('input[name="attendance"]:checked')?.value;

            if (attendance === 'yes' && guestName === "") {
                alert('Есіміңізді енгізіңіз.');
                return;
            }

            const formData = new FormData();
            formData.append('guestName', guestName);
            formData.append('attendance', attendance);

            fetch(googleAppsScriptURL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.result === 'success') {
                    alert('Рахмет! Сіздің жауабыңыз қабылданды.');
                    attendanceForm.reset();
                } else {
                    alert('Қате пайда болды, қайталап көріңіз.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Қате пайда болды, қайталап көріңіз.');
            });
        });
    }

    const launchDate = new Date("Oct 10, 2025 18:00:00").getTime();

    if (document.querySelector('.countdown-container')) {
        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById('countdown').innerHTML = "Қуанышты сәт келді!";
                return;
            }

            // Вычисляем дни, часы, минуты и секунды
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Отображаем результаты в соответствующих элементах HTML
            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }, 1000);
    }

    // Автоматическое воспроизведение музыки
    const backgroundMusic = new Audio('audio/alem.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.play().catch(error => {
        console.log("Музыка не воспроизводится автоматически. Возможно, пользователь должен взаимодействовать со страницей.");
        console.error(error);
    });
});
