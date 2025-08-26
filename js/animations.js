document.addEventListener('DOMContentLoaded', () => {
    // Получаем все элементы с классом 'animate'
    const animatedElements = document.querySelectorAll('.animate');
    const passportElement = document.getElementById('passport');

    // Intersection Observer for general animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    // Observe each animated element
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Remove the Intersection Observer for the passport to prevent auto-opening.
    // The passport will now only open on click.

    if (passportElement) {
        // Event listener for clicking the passport
        passportElement.addEventListener('click', () => {
            // Only add the 'open' class, do not toggle
            passportElement.classList.add('open');
        });
    }
});
