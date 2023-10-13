def obstacle_avoidance():
    pass

def on_logo_touched():
    global mode
    mode += 1
    if mode == 1:
        basic.show_icon(IconNames.NO)
    elif mode == 2:
        basic.show_icon(IconNames.SQUARE)
    elif mode == 3:
        basic.show_icon(IconNames.STICK_FIGURE)
    else:
        pass
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

def line_following():
    global position
    while True:
        if zoombit.is_line_detected_on(LinePosition.CENTER):
            zoombit.move(MotorDirection.FORWARD, 128)
        elif zoombit.is_line_detected_on(LinePosition.LEFT1):
            zoombit.set_motors_speed(50, 103)
            position = 1
        elif zoombit.is_line_detected_on(LinePosition.RIGHT1):
            zoombit.set_motors_speed(100, 50)
            position = 2
        elif zoombit.is_line_detected_on(LinePosition.LEFT2):
            zoombit.set_motors_speed(0, 100)
            position = 1
        elif zoombit.is_line_detected_on(LinePosition.RIGHT2):
            zoombit.set_motors_speed(100, 0)
            position = 2
        elif zoombit.is_line_detected_on(LinePosition.NONE):
            if position:
                zoombit.turn(TurnDirection.LEFT, 128)
        elif position:
            zoombit.turn(TurnDirection.RIGHT, 128)
position = 0
mode = 0
basic.show_leds("""
    . . # . .
    . # # # .
    # . # . #
    . . # . .
    . . # . .
    """)

def on_forever():
    if mode == 1:
        obstacle_avoidance()
    elif mode == 2:
        line_following()
    else:
        pass
basic.forever(on_forever)
