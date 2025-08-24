document.addEventListener('DOMContentLoaded', () => {
    // Получаем все элементы с классом 'animate'
    const animatedElements = document.querySelectorAll('.animate');
    const passportElement = document.getElementById('passport');
    let passportTimeout = null;

    // Intersection Observer для анимации элементов при скролле
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс для запуска анимации
                entry.target.classList.add('animate-active');
                // Прекращаем наблюдение за элементом после анимации
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1 // Анимация начинается, когда 10% элемента видно
    });

    // Наблюдение за каждым анимируемым элементом
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Intersection Observer для паспорта с задержкой
    const passportObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если паспорт виден, запускаем таймер, если он еще не запущен
                if (!passportTimeout) {
                    passportTimeout = setTimeout(() => {
                        passportElement.classList.add('open');
                        passportTimeout = null; // Сброс таймера
                    }, 3000); // 3-секундная задержка
                }
            } else {
                // Если паспорт ушел из видимости, отменяем таймер
                if (passportTimeout) {
                    clearTimeout(passportTimeout);
                    passportTimeout = null;
                    passportElement.classList.remove('open'); // Опционально: закрывать паспорт, если он не виден
                }
            }
        });
    }, {
        root: null,
        threshold: 0.5 // Срабатывает, когда половина паспорта видна
    });

    if (passportElement) {
        passportObserver.observe(passportElement);
    }
});
