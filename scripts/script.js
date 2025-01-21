document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Document is fully loaded');

    const cards = document.querySelectorAll('.card');
    console.log(cards); // This should log all card elements

    const confettiContainer = document.getElementById('confetti-container');
    const playAgainBtn = document.getElementById('Once Moreee');
    playAgainBtn.addEventListener('click', () => window.location.reload());

    let hasFlippedCard = false; 
    let firstCard, secondCard;
    let lockBoard = false;
    let matchesFound = 0;
    const totalPairs = 8;

    // Add an event listener to each card
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });

    function flipCard() {
        console.log('Card clicked:', this); // Log the clicked card
        if (lockBoard || this === firstCard) return; 

        this.classList.toggle('flipped');
        console.log('Card flipped:', this); // Log after the card is flipped

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            secondCard = this;

            checkForMatch();
        }
    }

    function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 16);
            card.style.order = randomPos;
        });
    }
    shuffle();

    function checkForMatch() {
        let isMatch = firstCard.dataset.image === secondCard.dataset.image;
        console.log('Matching cards:', firstCard, secondCard, 'Match:', isMatch); // Log match status
        isMatch ? disableCards() : unflipCards();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchesFound++;
        console.log('Matches found:', matchesFound); // Log the number of matches found

        if (matchesFound === totalPairs) showConfetti();

        resetBoard();
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function startConfetti() {
        function createConfettiPiece() {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            // Random size
            const sizeClass = ['small', 'medium', 'large'][Math.floor(Math.random() * 3)];
            confetti.classList.add(sizeClass);

            // Random shape - add 'circle' only if needed
            if (Math.random() > 0.5) {
                confetti.classList.add('circle');
            }

            // Random color
            const confettiColors = ['#E6E6FA', '#FFC0CB', '#ADD8E6', '#FF0000', '#E91E63'];
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];

            // Random horizontal position
            confetti.style.left = `${Math.random() * 100}vw`;

            // Random animation delay
            confetti.style.animationDelay = `${Math.random() * 2}s`;

            confettiContainer.appendChild(confetti);
            console.log('Confetti created:', confetti); // Log each confetti piece

            // Remove confetti after animation ends
            confetti.addEventListener('animationend', () => confetti.remove());
        }

        // Generate multiple confetti pieces
        for (let i = 0; i < 100; i++) {
            createConfettiPiece();
        }
    }

    // Show confetti on win
    function showConfetti() {
        startConfetti();
        playAgainBtn.style.display = 'block';
        document.getElementById('CONGRATSSSS').style.display = 'block';
    }
});
