let board = document.querySelector(".board")
let grids = []
let rowCount = 30;
let colCount = 48;
let scoreElement = document.querySelector(".score-element")
let score = 6
scoreElement.innerHTML = score
for (let row = 0; row < rowCount; row++) {
    let rowDiv = document.createElement('div')
    rowDiv.classList.add('row')
    let cols = []

    for (let col = 0; col < colCount; col++) {
        let colDiv = document.createElement('div')
        colDiv.classList.add('col')
        cols.push(colDiv)

        rowDiv.appendChild(colDiv)
    }

    grids.push(cols)

    board.appendChild(rowDiv)
}

let phytonPos = [
    {
        row: 15,
        col: 21,
    },
    {
        row: 15,
        col: 21 + 1,
    },
    {
        row: 15,
        col: 21 + 2,
    },
    {
        row: 15,
        col: 21 + 3,
    },
    {
        row: 15,
        col: 21 + 4,
    },
    {
        row: 15,
        col: 21 + 5,
    },
]

function drawPhy() {
    phytonPos.forEach(function (firstPos) {
        let rowFirst = firstPos.row
        let colFirst = firstPos.col

        grids[rowFirst][colFirst].classList.add("snake")
    })
}

let direction = "left"

function movePhy() {
    let oldTail = phytonPos[phytonPos.length - 1]
    grids[oldTail.row][oldTail.col].classList.remove('snake')



    let newHead
    if (direction == "left") {
        newHead = {
            row: phytonPos[0].row,
            col: phytonPos[0].col - 1,
        }
        if(newHead.col < 0){
            newHead.col = colCount - 1
        }

    } else if (direction == "right") {
        newHead = {
            row: phytonPos[0].row,
            col: phytonPos[0].col + 1,
        }
        if (newHead.col > colCount - 1) {
            newHead.col = 0
        }
    } else if (direction == "up") {
        newHead = {
            row: phytonPos[0].row - 1,
            col: phytonPos[0].col,
        }
        if (newHead.row < 0) {
            newHead.row = rowCount - 1
        }
    } else if (direction == "down") {
        newHead = {
            row: phytonPos[0].row + 1,
            col: phytonPos[0].col,
        }
        if (newHead.row > rowCount - 1) {
            newHead.row = 0
        }
    }

    phytonPos.unshift(newHead)
    if (grids[newHead.row][newHead.col].classList.contains('snake')){
        gameOver()
    }
    grids[newHead.row][newHead.col].classList.add('snake')

    if(grids[newHead.row][newHead.col].classList.contains('food')){
        grids[newHead.row][newHead.col].classList.remove("food")
        score++
        scoreElement.innerHTML = score
    }else{
        phytonPos.pop()
    }
}

document.addEventListener("keydown", e => {
    if((e.key == "w" || e.key == "ArrowUp") && direction != "down"){
        direction = "up"
    } else if ((e.key == "a" || e.key == "ArrowLeft") && direction != "right"){
        direction = "left"
    } else if ((e.key == "s" || e.key == "ArrowDown") && direction != "up") {
        direction = "down"
    } else if ((e.key == "d" || e.key == "ArrowRight") && direction != "left") {
        direction = "right"
    }
})

function randomize(min,max){
    return Math.floor(Math.random() * (max - min) + min)
}

function drawFood(){
    let rowFood = randomize(0, rowCount - 1)
    let colFood = randomize(0, rowCount - 1)
    grids[rowFood][colFood].classList.add('food')
    setTimeout(function(){
        grids[rowFood][colFood].classList.remove('food')
    },5000)
}

let inFood = setInterval(function () {
    drawFood()
}, 3000)

let inMove = setInterval(function () {
    movePhy()
}, 150)



drawPhy()

function gameOver(){
    alert("u Lost, Ur score = " + score)
    clearInterval(inFood)
    clearInterval(inMove)

}