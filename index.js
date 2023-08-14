let time = 60;
let score = 0;
let hintN;

let setScore = () => {
    score += 10
    document.querySelector("#score").textContent = score

}

let hit = () => {
    hintN = Math.floor(Math.random() * 10)
    document.querySelector("#hitval").textContent = hintN
}

let bubble = () => {
    let clutter = "";

    for (let i = 1; i <= 200; i++) {
        clutter += `<div class="bubble">${Math.floor(Math.random() * 10)}</div>`
    }

    document.querySelector(".bottom").innerHTML = clutter
}

let timer = () => {
    let runTimer = setInterval(function () {
        if (time > 0) {
            time--
            document.querySelector("#time").textContent = time
        } else {
            clearInterval(runTimer)
            document.querySelector(".bottom").innerHTML = `<h1>GAME OVER</h1>`
            document.querySelector("#hitval").innerHTML = 'Over'
        }
    }, 1000)

}

document.querySelector(".bottom").addEventListener("click", (detail) => {
    let clickedNum = Number(detail.target.textContent)
    if (clickedNum === hintN) {
        setScore()
        hit()
        bubble()
    }
})

hit()
bubble()
timer()
