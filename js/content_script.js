var constants = {
    HOST_NAME : 'lpdevs.herokuapp.com',
    ON_MOUSE_UP : 'onmouseup',
    ENGLISH_VIETNAMESE : 'en_vi',
    VIETNAMESE_ENGLISH : 'vi_en',
    MODE_MATCH : 'match',
    DIALOG_WIDTH : 300,
    DIALOG_HEIGHT : 300
}

var dlgX = 0;
var dlgY = 0;
var lpDlg = null;
var dlgOpened = false;

function init(){
    document.body.onmouseup = onMouseUp;
    document.body.onmousedown = onMouseDown;
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function clearSelectionText(){
    if ( document.selection ) {
        document.selection.empty();
    } else if ( window.getSelection ) {
        window.getSelection().removeAllRanges();
    }
}

function createPopUp(text){
    dlgOpened = true;

    lpDlg = document.createElement('DIALOG');
    lpDlg.setAttribute('id', 'window');
    lpDlg.style.position = 'absolute';
    lpDlg.style.maxWidth = constants.DIALOG_WIDTH + 'px';
    lpDlg.style.maxHeight = constants.DIALOG_HEIGHT + 'px';
    lpDlg.style.overflow = "scroll";
    lpDlg.style.backgroundColor = '#ffffff';
    lpDlg.style.zIndex = 10000;
    lpDlg.style.borderStyle = 'solid';
    lpDlg.style.borderColor = '#dddddd';
    lpDlg.style.borderWidth = '1px 1px 1px 1px';
    lpDlg.style.fontFamily = "Arial, Helvetica, sans-serif";
    lpDlg.style.left = dlgX + 'px';
    lpDlg.style.top = dlgY + 'px';


    var lpDiv = document.createElement('Div');
    lpDiv.innerHTML = text;
    lpDlg.appendChild(lpDiv);
   

    var lpImg = document.createElement('IMG');
    lpImg.src = 'https://' + constants.HOST_NAME + '/images/cancel_circle_20.png';
    lpImg.style.position = 'absolute';
    lpImg.style.top = '10px';
    lpImg.style.right = '10px';

    lpImg.onclick = function (){
        lpDlg.close();
        document.body.removeChild(lpDlg);
        dlgOpened = false;
    }
    lpDlg.appendChild(lpImg);


    var lpBtn = document.createElement('BUTTON');
    lpBtn.textContent = 'Close';
    lpBtn.style.backgroundColor = '#e7e7e7';
    lpBtn.style.borderStyle = 'none';
    lpBtn.style.marginTop = '5px';
    lpBtn.style.marginBottom = '5px';
    lpBtn.style.padding = '4px 14px 4px 14px';
    lpBtn.style.cursor = 'pointer';
    lpBtn.style.color = '#000000';

    lpBtn.onclick = function (){
        lpDlg.close();
        document.body.removeChild(lpDlg);
        dlgOpened = false;
    }
    lpDlg.appendChild(lpBtn);


    document.body.appendChild(lpDlg);
    lpDlg.show();
    lpDlg.scrollTop -= 10000;
}   

function onMouseDown(event){
    var deltaX = event.clientX + constants.DIALOG_WIDTH - window.innerWidth;
    if(deltaX > 0) dlgX = event.pageX - deltaX - 80;
    else dlgX = event.pageX;


    var deltaY = event.clientY + constants.DIALOG_HEIGHT - window.innerHeight;
    if(deltaY > 0) dlgY = event.pageY - deltaY - 80;
    else dlgY = event.pageY;
}

function onMouseUp(){
    if(!dlgOpened){
        var textSelected = getSelectionText().trim().toLowerCase();
        if(textSelected){
            key = textSelected;
            type = constants.ENGLISH_VIETNAMESE;
            mode = constants.MODE_MATCH;

            var xhr = new XMLHttpRequest();
            var url = 'https://' + constants.HOST_NAME + '/dictionary/extension/lookup/mode=' + mode +'&type=' + type + '&key=' + key;
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function() {//Call a function when the state changes.
                if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    // Request finished. Do processing here.
                    //console.log(xhr.responseText);
                    //clearSelectionText();
                    createPopUp(xhr.responseText);
                }
            }
            xhr.send();
        }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    init();
});
