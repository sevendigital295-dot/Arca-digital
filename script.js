document.addEventListener('DOMContentLoaded', function() {
    // 1. Lógica do Temporizador (Countdown)

    // 2. Lógica de Animação (Scroll Reveal)
    const benefitCards = document.querySelectorAll('.benefit-card');

    const checkVisibility = () => {
        const windowHeight = window.innerHeight;
        benefitCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            // Se o topo do cartão estiver a menos de 80% da altura da janela, ele se torna visível
            if (cardTop < windowHeight * 0.8) {
                card.classList.add('visible');
            }
        });
    };

    // Executa a função na carga da página e no scroll
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Executa uma vez para elementos já visíveis

    // 3. Lógica do Formulário de Lead
    
    // Define a data final do evento: 20 de Dezembro do ano atual
    // Como o ano atual é 2025 (data do sistema), o temporizador será para 20 de Dezembro de 2025.
    const eventDate = new Date("December 20, 2025 00:00:00").getTime();

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        // Cálculo do tempo restante
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Formatação para ter sempre dois dígitos
        const formatTime = (time) => String(time).padStart(2, '0');

        // Exibe o resultado nos elementos
        document.getElementById("days").innerHTML = formatTime(days);
        document.getElementById("hours").innerHTML = formatTime(hours);
        document.getElementById("minutes").innerHTML = formatTime(minutes);
        document.getElementById("seconds").innerHTML = formatTime(seconds);

        // Se o temporizador acabar
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "<h2>O EVENTO COMEÇOU!</h2>";
            // O botão principal pode ser atualizado para um link de transmissão, por exemplo.
        }
    }, 1000);


    // Lógica do formulário de Lead com captura de email e download do eBook
    document.getElementById('lead-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        
        // Validação básica
        if (name.trim() === '' || email.trim() === '') {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        // Guardar email no localStorage (base de dados local)
        const subscribers = JSON.parse(localStorage.getItem('arca_digital_subscribers') || '[]');
        subscribers.push({
            name: name,
            email: email,
            date: new Date().toISOString()
        });
        localStorage.setItem('arca_digital_subscribers', JSON.stringify(subscribers));
        
        // Fazer download do eBook
        const link = document.createElement('a');
        link.href = 'ebook-7-passos.pdf';
        link.download = 'ebook-7-passos.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Redirecionar para página de agradecimento após 1 segundo
        setTimeout(() => {
            window.location.href = 'thank_you.html?name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email);
        }, 1000);
    });
});
