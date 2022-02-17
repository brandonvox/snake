const WIDTH = 600
const CELL = 30
const ROWS = WIDTH/CELL // = COLUMNS
const BACKGROUND_COLOR = 'black'
const SNAKE_COLOR = 'red'
const FOOD_COLOR = 'green'

const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
const SPACE = 32

const canvas = document.getElementById('canvas')
canvas.width = canvas.height = WIDTH
const context = canvas.getContext('2d')

function drawBackground(){
    context.fillStyle = BACKGROUND_COLOR
    context.fillRect(0, 0, WIDTH, WIDTH)
}

function clearScreen(){
    drawBackground()
}

drawBackground()
context.scale(CELL, CELL)

class Snake{
    constructor(){
        this.body = [{x: 10, y:10}, {x:9, y:10}]
        this.direction = {x: 1, y:0} // RIGHT
    }

    draw(){
        context.fillStyle = SNAKE_COLOR
        for(let position of this.body){
            context.fillRect(position.x, position.y,
                1, 1)
        }
    }

    updatePosition(){
        let oldHeadPostion = {...this.body[0]}
        this.body[0].x += this.direction.x  
        this.body[0].y += this.direction.y    
        for(let i = this.body.length -1;i>=2; i--){
            this.body[i] = this.body[i-1]
        }  
        this.body[1] = oldHeadPostion

        if(this.body[0].x > WIDTH/CELL - 1)
            this.body[0].x = 0 
        if(this.body[0].x < 0 )
            this.body[0].x = WIDTH/CELL - 1
        if(this.body[0].y > WIDTH/CELL - 1)
            this.body[0].y = 0 
        if(this.body[0].y < 0 )
            this.body[0].y = WIDTH/CELL - 1
    }

    grow(){
        this.body.push({...this.body.slice(-1) })
        document.getElementById('text').innerHTML = this.body.length
    }
}

function getRandomPosition(){
    // 0 - 19 | 0 -> WIDTH/CELL - 1 
    return {
        x: Math.floor(Math.random() * WIDTH/CELL),
        y: Math.floor(Math.random() * WIDTH/CELL)
    }
     
}

function handleEatFood(){
    if(playerSnake.body[0].x == food.position.x &&
        playerSnake.body[0].y == food.position.y){
            playerSnake.grow()
            food.changePosition()
        }
}

class Food{
    constructor(){
        this.position = getRandomPosition()
    }

    draw(){
        context.fillStyle = FOOD_COLOR
        context.fillRect(
            this.position.x, this.position.y,
                1, 1)
    }
    changePosition(){
        this.position = getRandomPosition()
    }
}

let playerSnake = new Snake()
playerSnake.draw()
let food = new Food()
food.draw()

function handleLose(){
    let headPosition = playerSnake.body[0]
    for(let i = 1; i< playerSnake.body.length; i++){
        if(headPosition.x == playerSnake.body[i].x 
            && headPosition.y == playerSnake.body[i].y){
                document.getElementById('text').innerHTML =
                'You Lose, press space to play again!'
                clearInterval(gameLoop)
                return;
            }
    }
}

var gameLoop = setInterval(() => {
    clearScreen()
    playerSnake.updatePosition()
    playerSnake.draw()
    food.draw()
    handleEatFood()
    handleLose()
}, 100)

document.onkeydown = event =>{
    switch(event.keyCode){
        case LEFT:
            playerSnake.direction = {x: -1, y:0}
            break
        case RIGHT:
            playerSnake.direction = {x: 1, y:0}
            break
        case UP:
            playerSnake.direction = {x: 0, y: -1}
            break
        case DOWN:
            playerSnake.direction = {x: 0, y: 1}
            break
        case SPACE:
            // Reload page
            location.reload()
            break

    }
}