function obstacle_avoidance () {
	
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    mode += 1
    if (mode == 1) {
        basic.showIcon(IconNames.No)
    } else if (mode == 2) {
        basic.showIcon(IconNames.Square)
    } else if (mode == 3) {
        basic.showIcon(IconNames.StickFigure)
    } else {
    	
    }
})
function line_following () {
    while (true) {
        if (zoombit.isLineDetectedOn(LinePosition.Center)) {
            zoombit.move(MotorDirection.Forward, 128)
        } else if (zoombit.isLineDetectedOn(LinePosition.Left1)) {
            zoombit.setMotorsSpeed(50, 103)
            position = 1
        } else if (zoombit.isLineDetectedOn(LinePosition.Right1)) {
            zoombit.setMotorsSpeed(100, 50)
            position = 2
        } else if (zoombit.isLineDetectedOn(LinePosition.Left2)) {
            zoombit.setMotorsSpeed(0, 100)
            position = 1
        } else if (zoombit.isLineDetectedOn(LinePosition.Right2)) {
            zoombit.setMotorsSpeed(100, 0)
            position = 2
        } else if (zoombit.isLineDetectedOn(LinePosition.None)) {
            if (position) {
                zoombit.turn(TurnDirection.Left, 128)
            }
        } else if (position) {
            zoombit.turn(TurnDirection.Right, 128)
        }
    }
}
let position = 0
let mode = 0
basic.showLeds(`
    . . # . .
    . # # # .
    # . # . #
    . . # . .
    . . # . .
    `)
basic.forever(function () {
    if (mode == 1) {
        obstacle_avoidance()
    } else if (mode == 2) {
        line_following()
    } else {
    	
    }
})
