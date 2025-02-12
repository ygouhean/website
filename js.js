// js.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const loader = document.getElementById('loader');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validation des champs
            const name = contactForm.querySelector('input[name="name"]');
            const email = contactForm.querySelector('input[name="email"]');
            const message = contactForm.querySelector('textarea[name="message"]');

            let isValid = true;

            if (!name.value.trim()) {
                isValid = false;
                name.classList.add('error');
            } else {
                name.classList.remove('error');
            }

            if (!email.value.trim() || !email.checkValidity()) {
                isValid = false;
                email.classList.add('error');
            } else {
                email.classList.remove('error');
            }

            if (!message.value.trim()) {
                isValid = false;
                message.classList.add('error');
            } else {
                message.classList.remove('error');
            }

            if (isValid) {
                // Afficher le loader
                loader.style.display = 'flex';

                // Simuler un envoi de formulaire (2 secondes)
                setTimeout(() => {
                    loader.style.display = 'none';
                    alert('Merci pour votre message ! Je vous répondrai bientôt.');
                    contactForm.reset();
                }, 2000);
            } else {
                alert('Veuillez remplir tous les champs correctement.');
            }
        });
    }
});
