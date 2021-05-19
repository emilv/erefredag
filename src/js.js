/* Please link to erefredag.se if you use any of this */
var smaller = false;
function res() {
	var width = $(window).width();
	//$(".question").css("font-size", (width/13)+"px");
	//$(".answer").css("font-size", (width/4)+"px");

	var smallbef = smaller;
	smaller = width < 600;
	if(smaller != smallbef) {
		smallit();
	}
}
$(document).ready(res);
$(window).resize(res);

var simple = true;
var simple_counter = 0;
var simple_interval;
$(document).ready(function(){
	$(".sec").hide();
	$("#menubutton").click(function(){
		/*$("#tech").slideDown("fast");
		$("#menubutton").fadeOut("fast");*/
		$(this).removeClass("news");
		setCookie("menuclick", mv, 92);
	});

	if(getCookie("menuclick") != mv) {
		$("#menubutton").addClass("news");
	}

	if(friday && getCookie("voted")) {
		$("#poll").hide();
		poll("display");
	}

	$(".ext").click(function(){
		window.open(this.href);
		return false;
	});

	$("#rebecca").bind('ended',{},function() {
		$(this).trigger('play');
	});
});

jQuery.each(jQuery.browser, function(i, val) {
	if(i=="msie") {
		$(document).one("mousemove", function(){
			menu_display($("#menubutton").get(0));
			back_display($("#menu .back:last").get(0));
		});
	}
});

$(document).mousemove(simplicity);


$(document).ready(function(){
	$("#menu :header:not(#menubutton)").append(" &raquo;");
	$("#menu .back").prepend("&laquo; ");
	$("#menu :header, #menu .back").addClass("mh").wrapInner("<a href='' onclick='return false;'></a>");
	$("#menu :header").click(function() {
		menu_display(this);
	});

	$("#menu .back").click(function() {
		back_display(this);
	});

	$("#menu ul, #menu ul li").hide();
	$("#menu ul a").hide();

	$("#menu li > a").click(function(){
		track("Menu", "Item", $(this).text());
	});
});

function simplicity() {
	simple_counter = 6;

	if(simple == false) {
		return;
	}

	simple = false;
	$(".sec").each(function(i) {
		$(this).delay(i*250).fadeIn(600);
	});

	simple_interval = window.setInterval(function(){
		if(simple_counter > 0) {
			simple_counter--;
			return;
		}else{
			simple_counter = 0;
			window.clearInterval(simple_interval);
			$(".sec").fadeOut(600);
			simple = true;
		}
	}, 1000);
}

function smallit() {
	var elems = "#poll, #nice";
	if(smaller) {
		$(elems).removeClass("sec");
		$(elems).hide();
	}else{
		$(elems).addClass("sec");
		if(!simple) {
			$(elems).show();
		}
	}
}

function menu_display(h) {
	par = h.parentNode;
	par2 = par.parentNode;
	$(h).hide();
	//$(":header:first", par2.parentNode).hide();
	$("a", par2).show();
	$("li", par2).hide();
	$(par).show();
	$("ul:first, ul:first > li", par).hide().fadeIn();
	track("Menu", "Open", $(h).text());
}

function back_display(b) {
	$(b.parentNode).hide();
	$(":header", b.parentNode.parentNode).fadeIn();
	$("ul:first > li", b.parentNode.parentNode.parentNode.parentNode).fadeIn();
	track("Menu", "Close", $(b).text());
}


function poll(vote) {
	$("#poll").fadeOut("fast", function(){
		$.get("vote.php", {vote: vote, ajax: "yes"}, function(data) {
			$("#poll p").replaceWith(data);
			if(!simple) {
				$("#poll").fadeIn("fast");
			}
		}, 'html');
	});
}

function track(category, anevent, label) {
	_gaq.push(['_trackEvent', category, anevent, label]);
}

/* Cookie functions from http://www.w3schools.com/JS/js_cookies.asp
Cookies in JavaScript is tiresome. */
function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}



