function CheckOnDigits(e) {
    	var code;
	if ($.browser.msie)
		code = e.keyCode;
	else
		code = (e.charCode) ? e.charCode : e.keyCode;
	return isNum(code); 
}

function isNum(cCode) {
	//9 - код кнопки Tab
    return (cCode == 9 || /[0-9\b]/.test(String.fromCharCode(cCode)))
}

function WaterMark(txt, evt) 
{ 
	var defaultText = "Поиск";
	if(txt.value.length == 0 && evt.type == "blur")
	{
		txt.style.color = "gray";
		txt.value = defaultText;
	}
	if(txt.value == defaultText && evt.type == "focus") 
	{
		txt.style.color = "black";
		txt.value=""; 
	}

}

function WaterMarkWithText(txt, evt, defaultText) { 
	if(txt.value.length == 0 && evt.type == "blur")
	{
		txt.style.color = "gray";
		txt.value = defaultText;
	}
	if(txt.value == defaultText && evt.type == "focus") 
	{
		txt.style.color = "black";
		txt.value=""; 
	}

}
			
function CheckPhoneNumber(event)
{
    CorrectInputSelf(event, /^(()|([0-9]{0,7}))$/);
}


function Comstar_ClickSubscribe(event, id)
{
    CorrectInputSelf(event, /^(()|(\({0,1}[0-9]{0,3}\){0,1}[0-9]{0,7}))$/);
    if(WasEnterPressed(event))
    {
        ClickElement(event, id);
    }
    return false;
}

function gup( name )
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )
		return "";
	else
		return results[1];
}

function getElementByClass(theClass) 
{
	var allHTMLTags=document.getElementsByTagName("*");
	var elementCollection = new Array();
	for (i=0; i<allHTMLTags.length; i++) {
		if (allHTMLTags[i].className==theClass) {
			elementCollection[elementCollection.length] = allHTMLTags[i];
		}
	}
	return elementCollection;
}

function jumpto(id){
      if((obj = document.getElementById(id)) && obj != null){
          window.scrollTo(0, getOffset(obj).top);
	//alert(getOffset(obj).top);
	}
}

function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        // "правильный" вариант
        return getOffsetRect(elem)
    } else {
        // пусть работает хоть как-то
        return getOffsetSum(elem)
    }
}

function getOffsetSum(elem) {
    var top=0, left=0
    while(elem) {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent
    }

    return {top: top, left: left}
}

function getOffsetRect(elem) {
    // (1)
    var box = elem.getBoundingClientRect()

    // (2)
    var body = document.body
    var docElem = document.documentElement

    // (3)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

    // (4)
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0

    // (5)
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft

    return { top: Math.round(top), left: Math.round(left) }
}

function setCookieCommon(name, value, expires, path, domain, secure) {
     var today = new Date();
     today.setTime(today.getTime());
     if (expires) {
         expires = expires * 1000 * 60;
     } else
         expires = 1000 * 60 * 60 * 24 * 30 * 12;

     var expires_date = new Date(today.getTime() + (expires));
     document.cookie = name + "=" + escape(value) +
         ((expires) ? ";expires=" + expires_date.toUTCString() : "") +
         ((path) ? ";path=" + path : "") +
         ((domain) ? ";domain=" + domain : "") +
         ((secure) ? ";secure" : "");
}