function absorbEvent_(event) {
    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  }

function preventLongPressMenu(node) {
    // node.on('touchstart', absorbEvent_);
    node.on('touchmove', absorbEvent_);
    // node.on('touchend', absorbEvent_);
    node.on('touchcancel', absorbEvent_);
}


$(document).ready(() => {
    // const beep = document.getElementById('beep');
    let press = null;
    let release = null;
    let time = null;
    function onPress(event) {
        $('#shutter-time').text('');
        release = null;
        event.preventDefault();
        $('#shutter-button').addClass('active');
        $('#shutter').addClass('pressed');
        press = Date.now();
        // beep.play();
    }
    function onRelease(event) {
        event.preventDefault();
        $('#shutter-button').removeClass('active');
        $('#shutter').removeClass('pressed');
        release = Date.now();
        time = release - press;
        if (time > 1000) {
            console.log('Long press');
        } else {
            console.log('Short press');
        }
        $('#shutter-time').text(time);
        // beep.play();
        paintRange();
    }
    function paintRange() {
        $('#shutter-range').css('width', `${time < 1000 ? time / 10 : 100}%`);
    }
    $('#shutter-button').on('touchstart', onPress);
    $('#shutter-button').on('touchend', onRelease);
    $('#shutter-button').on('touchcancel', onRelease);
    $('#shutter-button').on('mousedown', onPress);
    $('#shutter-button').on('mouseup', onRelease);
})