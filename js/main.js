let press = null;
let release = null;
let time = null;
let times = [];
const desiredTimes = [1000, 500, 250, 125, 66];
let desiredTime = desiredTimes[4];
function selectDesiredTime(event) {
    desiredTime = desiredTimes[event.target.value];
    times = [];
    $("#time-table table tbody").empty();
}
$(document).ready(() => {
    // const beep = document.getElementById('beep');
    // 1 1/2 1/4 1/8 1/15
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
        // paintRange();
        addRow();
    }
    function paintRange() {
        $('#shutter-range').css('width', `${time < 1000 ? time / 10 : 100}%`);
    }
    function addRow() {
        const row = $("<tr></tr>");
        row.append($(`<td>${time}</td>`));
        const diff = time - desiredTime;
        const absDiff = Math.abs(time - desiredTime);
        const className = absDiff < 10 ? 'perfect' : absDiff < 20 ? 'good' : 'bad';
        row.append($(`<td class="${className}">${diff < 0 ? '-' : '+'}${absDiff}</td>`));
        $('#time-table table tbody').prepend(row);
    }
    $('#shutter-button').on('touchstart', onPress);
    $('#shutter-button').on('touchend', onRelease);
    $('#shutter-button').on('touchcancel', onRelease);
    $('#shutter-button').on('mousedown', onPress);
    $('#shutter-button').on('mouseup', onRelease);
})