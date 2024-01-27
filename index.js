let time = 30;
let scoreRound1 = 0;
let scoreRound2 = 0;
let hintN;
let round = 1;

let gameStart = document.getElementById("startGame").addEventListener('click', () => {
    document.querySelector('#enterBox').style.display = 'none';
    document.querySelector('#round1').innerHTML = document.getElementById('player1').value || "Player 1";
    document.querySelector('#round2').innerHTML = document.getElementById('player2').value || "Player 2";
    hit();
    bubble();
    timer();
});

let reduceScore1 = () => {
    scoreRound1 = scoreRound1 -= 5
    document.querySelector("#player1Score").textContent = scoreRound1;
}
let reduceScore2 = () => {
    scoreRound2 = scoreRound2 -= 5
    document.querySelector("#player2Score").textContent = scoreRound2;

}

let roundOne = () => {
    scoreRound1 += 10;
    document.querySelector("#player1Score").textContent = scoreRound1;
    localStorage.setItem('round1', scoreRound1);
};



let roundTwo = () => {
    scoreRound2 += 10;
    document.querySelector("#player2Score").textContent = scoreRound2;
    localStorage.setItem('round2', scoreRound2);
};

let nextRound = () => {
    time = 30;
    document.querySelector("#time").textContent = time;
    hit();
    bubble();
    timer();

    if (round === 1) {
        document.querySelector("#player1Score").textContent = scoreRound1;
        round++;
    } else {
        document.querySelector("#player2Score").textContent = scoreRound2;

        if (scoreRound1 > scoreRound2) {
            alert("Player 1 wins!");
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } else if (scoreRound1 < scoreRound2) {
            alert("Player 2 wins!");
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } else {
            alert("It's a tie!");
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        }
    }
};

let hit = () => {
    hintN = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hintN;
};

let bubble = () => {
    let clutter = '';

    for (let i = 1; i <= 200; i++) {
        clutter += `<div class="bubble">${Math.floor(Math.random() * 10)}</div>`;
    }

    document.querySelector(".bottom").innerHTML = clutter;
};

let timer = () => {
    let runTimer = setInterval(function () {
        if (time > 0) {
            time--;
            document.querySelector("#time").textContent = time;
        } else {
            clearInterval(runTimer);
            document.querySelector(".bottom").innerHTML = `<h1>ROUND ${round} OVER</h1>`;
            document.querySelector("#hitval").innerHTML = 'Over';
            nextRound();
        }
    }, 1000);
};

document.querySelector(".bottom").addEventListener("click", (detail) => {
    let clickedNum = Number(detail.target.textContent);

    if (clickedNum === hintN) {
        if (round === 1) {
            roundOne();
        } else {
            setTimeout(() => {
                roundTwo();
            }, 3000);
            document.querySelector('#bottom').style.display = 'none';
            document.getElementById('round2declaration')
        }
        hit();
        bubble();
    } else {
        if (round === 1) {
            reduceScore1();
        } else {
            reduceScore2();
        }
    }
});
