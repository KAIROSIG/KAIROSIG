// Contador de días para el evento
const countdownElement = document.getElementById('countdown');
const eventDate = new Date('2025-04-26T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
        <div>
            <span>${days}</span> días
        </div>
        <div>
            <span>${hours}</span> horas
        </div>
        <div>
            <span>${minutes}</span> minutos
        </div>
        <div>
            <span>${seconds}</span> segundos
        </div>
    `;

    if (distance < 0) {
        countdownElement.innerHTML = "<div>¡El evento ya ha comenzado!</div>";
    }
}

setInterval(updateCountdown, 1000);