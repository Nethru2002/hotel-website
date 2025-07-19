document.addEventListener('DOMContentLoaded', () => {

    // --- Rooms Page Logic ---
    const roomsContainer = document.getElementById('rooms-list');
    if (roomsContainer) {
        fetch('/api/rooms')
            .then(response => response.json())
            .then(rooms => {
                rooms.forEach(room => {
                    const roomCard = `
                        <div class="col-md-4 mb-4">
                            <div class="card room-card h-100">
                                <img src="${room.image}" class="card-img-top" alt="${room.name}">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title">${room.name}</h5>
                                    <p class="card-text">${room.description}</p>
                                    <h6 class="card-subtitle mb-2 text-muted">$${room.price} / night</h6>
                                    <a href="/booking?room=${room.id}" class="btn btn-primary mt-auto">Book Now</a>
                                </div>
                            </div>
                        </div>
                    `;
                    roomsContainer.innerHTML += roomCard;
                });
            })
            .catch(error => console.error('Error fetching rooms:', error));
    }


    // --- Booking Page Logic ---
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        // Pre-select room type if passed in URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('room');
        if (roomId) {
            document.getElementById('roomType').value = roomId;
        }

        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = {
                roomType: document.getElementById('roomType').value,
                checkIn: document.getElementById('checkIn').value,
                checkOut: document.getElementById('checkOut').value,
                guests: document.getElementById('guests').value,
            };

            fetch('/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                const messageDiv = document.getElementById('booking-message');
                if (data.success) {
                    messageDiv.className = 'alert alert-success mt-4';
                    messageDiv.textContent = data.message;
                    bookingForm.reset();
                } else {
                    messageDiv.className = 'alert alert-danger mt-4';
                    messageDiv.textContent = 'Booking failed. Please try again.';
                }
                messageDiv.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                const messageDiv = document.getElementById('booking-message');
                messageDiv.className = 'alert alert-danger mt-4';
                messageDiv.textContent = 'An error occurred. Please try again later.';
                messageDiv.style.display = 'block';
            });
        });
    }

});