document.addEventListener('DOMContentLoaded', () => {
    const passport = document.getElementById('passport');
    const attendanceForm = document.getElementById('attendanceForm');
    const guestNameInput = document.getElementById('guestName');

    // Ваш уникальный URL из Google Apps Script
    const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbxW-XLn3ZEXoNScj8Le0wGtBT4MzKOvAI1Boih010LIytps9rltH3yhg5IXkxhs2TwhVQ/exec';

    if (passport) {
        passport.addEventListener('click', (event) => {
            const isInsideForm = event.target.closest('.passport-form');
            if (!isInsideForm) {
                passport.classList.toggle('open');
            }
        });
    }

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
                if (data.success) {
                    alert(data.message);
                } else {
                    alert('An error occurred. Please try again.');
                }
                attendanceForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Connection error. Please try again later.');
            });
        });
    }

    // НОВАЯ ФУНКЦИЯ ДЛЯ ТАЙМЕРА ОБРАТНОГО ОТСЧЕТА
    function startCountdown() {
        // Устанавливаем целевую дату и время (10 октября 2025, 18:00:00 в UTC+5)
        const targetDate = new Date('2025-10-10T18:00:00+05:00').getTime();

        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            // Если время вышло, останавливаем таймер
            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById('days').innerText = '00';
                document.getElementById('hours').innerText = '00';
                document.getElementById('minutes').innerText = '00';
                document.getElementById('seconds').innerText = '00';
                return;
            }

            // Рассчитываем дни, часы, минуты и секунды
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

    // Запускаем таймер при загрузке страницы
    startCountdown();
});
