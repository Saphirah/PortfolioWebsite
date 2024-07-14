let typewriterSpeed = 40; //ms
let typewriterVariance = 20; //ms, 0-x added to typewriterSpeed



const typewriterElements = document.querySelectorAll('[typewriter]');
const observer = new IntersectionObserver(callback, {
    root: null, // Use the viewport as the root
    threshold: 0.1 // Trigger the callback when at least 10% of the element is visible
});
typewriterElements.forEach(element => {
    observer.observe(element);
    element.typewriterText = element.textContent.trim();
    element.textContent = '';
});

function callback(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const text = element.typewriterText;
        let speed = parseInt(element.getAttribute('typewriter')) || typewriterSpeed;
        let variance = parseInt(element.getAttribute('typewriter-variance')) || typewriterVariance;
        type(element, text, speed, variance);
        observer.unobserve(element);
    });
}

function type(element, text, speed = typewriterSpeed, variance = typewriterVariance,  index = 0) {
    if (index >= text.length) return;
    element.textContent += text.charAt(index);
    let randomDelay = speed + Math.random() * typewriterVariance;
    setTimeout(() => type(element, text, speed, variance, index + 1), randomDelay);
}