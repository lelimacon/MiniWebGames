console.log("hi")

mousePositionY = 0
document.addEventListener('mousemove', e => mousePositionY = e.clientY)
document.addEventListener('pointermove', e => mousePositionY = e.clientY)


ballElement = document.getElementById("ball")
leftPalletElement = document.getElementById("palletLeft")
rightPalletElement = document.getElementById("palletRight")

screenSizeX = document.body.clientWidth
screenSizeY = document.body.clientHeight

ballSize = 20
ballSpeed = 0.2
ballPositionX = screenSizeX / 2
ballPositionY = screenSizeY / 2
ballDirectionX = 1
ballDirectionY = 1

palletSizeX = 20
palletSizeY = 140
palletSpeed = 0.2
leftPalletPositionY = 0
rightPalletPositionY = 0

oldTime = new Date()


init = () => {
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

    // Left side
    if (ballPositionX < 0) {
        ballPositionX = 0
        ballDirectionX = ballDirectionX * -1
    }

    // Top
    if (ballPositionY < 0) {
        ballPositionY = 0
        ballDirectionY = ballDirectionY * -1
    }

    // Right side
    if (ballPositionX > screenSizeX - ballSize) {
        ballPositionX = screenSizeX - ballSize
        ballDirectionX = ballDirectionX * -1
    }

    // Bottom
    if (ballPositionY > screenSizeY - ballSize) {
        ballPositionY = screenSizeY - ballSize
        ballDirectionY = ballDirectionY * -1
    }

    ballElement.style.left = ballPositionX + "px"
    ballElement.style.top = ballPositionY + "px"
}

moveLeftPallet = (timePassed) => {
    if (mousePositionY > leftPalletPositionY + 10) {
        leftPalletPositionY = leftPalletPositionY + palletSpeed * timePassed
    }
    else if (mousePositionY < leftPalletPositionY - 10) {
        leftPalletPositionY = leftPalletPositionY - palletSpeed * timePassed
    }

    leftPalletElement.style.top = leftPalletPositionY + "px"
}

moveRightPallet = (timePassed) => {
    if (ballPositionY > rightPalletPositionY) {
        rightPalletPositionY = rightPalletPositionY + palletSpeed * timePassed
    }
    else {
        rightPalletPositionY = rightPalletPositionY - palletSpeed * timePassed
    }

    rightPalletElement.style.top = rightPalletPositionY + "px"
}

loop()
