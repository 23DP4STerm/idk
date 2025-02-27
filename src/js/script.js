// script.js
let totalScore = 0;
const catImages = ["src/images/cat1.jpg", "src/images/cat2.jpg", "src/images/cat3.jpg", "src/images/cat4.jpg", "src/images/cat1.jpg", "src/images/cat2.jpg", "src/images/cat3.jpg", "src/images/cat4.jpg"];
let flippedCards = [];
let matchedPairs = 0;

async function getCatFact() {
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    document.getElementById("fact").innerText = data.fact;
}

function updateScore(points) {
    totalScore += points;
    document.getElementById("total-score").innerText = totalScore;
}

function startMemoryGame() {
    document.getElementById("memory-game").classList.remove("hidden");
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    
    let shuffledImages = [...catImages].sort(() => 0.5 - Math.random());
    shuffledImages.forEach((image) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = image;
        card.onclick = () => flipCard(card);
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains("matched")) {
        card.style.backgroundImage = `url(${card.dataset.image})`;
        flippedCards.push(card);
    }
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    if (flippedCards[0].dataset.image === flippedCards[1].dataset.image) {
        flippedCards.forEach(card => card.classList.add("matched"));
        matchedPairs++;
        updateScore(10);
        if (matchedPairs === catImages.length / 2) {
            alert("You won the Cat Memory Game!");
        }
    } else {
        flippedCards.forEach(card => {
            card.style.backgroundImage = "";
        });
    }
    flippedCards = [];
}