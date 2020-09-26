/* this library requires one or more p5.js libraries */

//my functions
function showMouse(x, y, keyP, permanent){
    var mouseText;
    var mousePos = ["x:" + mouseX,"y:" + mouseY];
    if(permanent){
    } else {
        permanent = false;
    }
    if(keyDown(keyP)||permanent === true){
        removeElements();
        mouseText = createElement('p1');
        mouseText.html(mousePos);
        mouseText.position(x, y);
    }
}