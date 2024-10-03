        const totalSeats = 300;
        const seatsPerSection = 150;
        const maxSelectable = 20;
        let selectedSeat = null;
        let reservedSeats = 0;
        let availableSeats = totalSeats;

        function createSeats(sectionId) {
            const section = document.getElementById(sectionId);
            for (let i = 0; i < seatsPerSection; i++) {
                const seat = document.createElement('div');
                seat.className = 'seat';
                const seatNumber = i + 1 + (sectionId === 'section2' ? seatsPerSection : 0);
                seat.dataset.seatNumber = seatNumber;
                seat.textContent = seatNumber;
                seat.addEventListener('click', () => toggleSeat(seat));
                section.appendChild(seat);
            }
        }

        function toggleSeat(seat) {
            if (seat.classList.contains('unavailable')) return;
            
            if (reservedSeats < maxSelectable) {
                if (selectedSeat) {
                    selectedSeat.classList.remove('selected');
                }
                if (selectedSeat !== seat) {
                    seat.classList.add('selected');
                    selectedSeat = seat;
                } else {
                    selectedSeat = null;
                }
                updateMessage();
            } else {
                alert('Ya no quedan asientos disponibles para selección manual.');
            }
        }

        function updateMessage() {
            const messageElement = document.getElementById('message');
            const reserveButton = document.getElementById('reserveButton');
            const randomAssignButton = document.getElementById('randomAssignButton');
            
            if (selectedSeat) {
                messageElement.textContent = `Has seleccionado el asiento ${selectedSeat.dataset.seatNumber}.`;
                reserveButton.style.display = 'inline-block';
                randomAssignButton.style.display = 'none';
            } else if (reservedSeats >= maxSelectable) {
                messageElement.textContent = 'Ya no quedan asientos disponibles para selección manual.';
                reserveButton.style.display = 'none';
                randomAssignButton.style.display = 'inline-block';
            } else {
                messageElement.textContent = 'Selecciona un asiento.';
                reserveButton.style.display = 'none';
                randomAssignButton.style.display = 'none';
            }
        }

        function reserveSeat() {
            if (selectedSeat) {
                selectedSeat.classList.remove('selected');
                selectedSeat.classList.add('unavailable');
                selectedSeat = null;
                reservedSeats++;
                availableSeats--;
                updateMessage();
                
                if (reservedSeats >= maxSelectable) {
                    disableManualSelection();
                }
            }
        }

        function disableManualSelection() {
            const availableSeats = document.querySelectorAll('.seat:not(.unavailable)');
            availableSeats.forEach(seat => seat.style.cursor = 'not-allowed');
            updateMessage();
        }

        function assignRandomSeat() {
            const availableSeats = document.querySelectorAll('.seat:not(.unavailable)');
            if (availableSeats.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableSeats.length);
                const randomSeat = availableSeats[randomIndex];
                randomSeat.classList.add('unavailable');
                alert(`Se te ha asignado el asiento ${randomSeat.dataset.seatNumber}.`);
                availableSeats--;
                updateMessage();
            } else {
                alert('Lo sentimos, no quedan asientos disponibles.');
            }
        }

        createSeats('section1');
        createSeats('section2');
        updateMessage();

        document.getElementById('reserveButton').addEventListener('click', reserveSeat);
        document.getElementById('randomAssignButton').addEventListener('click', assignRandomSeat);