console.log("hi")

mousePositionY = 0
document.addEventListener('mousemove', e => mousePositionY = e.clientY)
document.addEventListener('pointermove', e => mousePositionY = e.clientY)


ballElement = document.getElementById("ball")
leftPalletElement = document.getElementById("palletLeft")
rightPalletElement = document.getElementById("palletRight")
scoreLeftElement = document.getElementById("scoreLeft")
scoreRightElement = document.getElementById("scoreRight")

screenSizeX = document.body.clientWidth
screenSizeY = document.body.clientHeight

scoreLeft = 0
scoreRight = 0

ballSize = 20
ballSpeed = 0.2
ballPositionX = screenSizeX / 2
ballPositionY = screenSizeY / 2
ballDirectionX = 1
ballDirectionY = 1

palletSizeX = 20
palletSizeY = 140
palletSpeed = 0.2
leftPalletPositionX = 40
leftPalletPositionY = 0
rightPalletPositionX = screenSizeX - 40 - palletSizeX
rightPalletPositionY = 0

oldTime = new Date()


init = () => {
    ballPositionX = screenSizeX / 2
    ballPositionY = screenSizeY / 2

    scoreLeftElement.textContent = scoreLeft
    scoreRightElement.textContent = scoreRight
}

loop = () => {
    newTime = new Date()
    timePassed = newTime - oldTime
    render(timePassed)
    oldTime = newTime
    setTimeout(loop, 20)
}


render = (timePassed) => {
    moveBall(timePassed)
    moveLeftPallet(timePassed)
    moveRightPallet(timePassed)
}

moveBall = (timePassed) => {
    ballPositionX = ballPositionX + ballSpeed * timePassed * ballDirectionX
    ballPositionY = ballPositionY + ballSpeed * timePassed * ballDirectionY

    if (ballPositionX < leftPalletPositionX + palletSizeX &&
        ballPositionX > leftPalletPositionX &&
        ballPositionY > leftPalletPositionY &&
        ballPositionY < leftPalletPositionY + palletSizeY) {
        ballPositionX = leftPalletPositionX + palletSizeX
        ballDirectionX = ballDirectionX * -1
    }

    if (ballPositionX > rightPalletPositionX - ballSize &&
        ballPositionX < rightPalletPositionX + palletSizeX &&
        ballPositionY > rightPalletPositionY &&
        ballPositionY < rightPalletPositionY + palletSizeY) {
        ballPositionX = rightPalletPositionX - ballSize
        ballDirectionX = ballDirectionX * -1
    }

    // Left side: player looses
    if (ballPositionX < 0) {
        scoreRight = scoreRight + 1
        ballDirectionX = ballDirectionX * -1
        init()
    }

    // Right side: enemy looses
    if (ballPositionX > screenSizeX - ballSize) {
        scoreLeft = scoreLeft + 1
        ballDirectionX = ballDirectionX * -1
        init()
    }

    // Top: bounce
    if (ballPositionY < 0) {
        ballPositionY = 0
        ballDirectionY = ballDirectionY * -1
    }

    // Bottom: bounce
    if (ballPositionY > screenSizeY - ballSize) {
        ballPositionY = screenSizeY - ballSize
        ballDirectionY = ballDirectionY * -1
    }

    ballElement.style.left = ballPositionX + "px"
    ballElement.style.top = ballPositionY + "px"
}

moveRightPallet = (timePassed) => {
    if (ballPositionY > rightPalletPositionY + palletSizeY / 2) {
        rightPalletPositionY = rightPalletPositionY + palletSpeed * timePassed
    }
    else {
        rightPalletPositionY = rightPalletPositionY - palletSpeed * timePassed
    }

    rightPalletElement.style.top = rightPalletPositionY + "px"
}

moveLeftPallet = (timePassed) => {
    if (mousePositionY > leftPalletPositionY + palletSizeY / 2 + 10) {
        leftPalletPositionY = leftPalletPositionY + palletSpeed * timePassed
    }
    else if (mousePositionY < leftPalletPositionY - 10) {
        leftPalletPositionY = leftPalletPositionY - palletSpeed * timePassed
    }

    leftPalletElement.style.top = leftPalletPositionY + "px"
}

init()
loop()
