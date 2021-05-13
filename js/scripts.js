var commands, someData;
var lockInter;
var cmdStory, cmdStoryIndex, indexH;
var ready, input;

$( document ).ready(function() {
	$('.terminal').outerHeight($('.window').outerHeight() - $('.bar').outerHeight());
	window.onresize = function() {
	    $('.terminal').outerHeight($('.window').outerHeight() - $('.bar').outerHeight());
	};
	commands =["whoami","skills","experience","education", "contacts", "extra", "portfolio", "help"];
	lockInter = false;
	cmdStory = ["help"]; 
	cmdStoryIndex = 0;
	indexH = 0;
	ready = true;
	input = $('.cmd-input');
    $.getJSON("data/info.json", function(json) { //https://raw.githubusercontent.com/Ventrosky/Ventrosky.github.io/master/
    	someData = json; 
	});
	initNav();
	helpCmdsInit();
	input.focus();
	$('.container').on('click', function(e){
		input.focus();
	});
	input.on('keyup', function(e){
		if (lockInter!=true){
			$('.new-output').text(input.val());
		}
	});
	$(document).keyup(function(e) {
		switch(e.which) {
	        case 38:
	        changeIdxStory(-1);
	  		break;
	        case 40:
	        changeIdxStory(1);
			break;
		};
	});
	$('.terminal-input-form').on('submit', function(e){
		if (lockInter!=true){
			e.preventDefault();
			var val = $(this).children($('.cmd-input')).val().toLowerCase().trim();
			var href;
			if(val!=''){
				cmdStory.push(($('.cmd-input')).val());
				cmdStoryIndex = cmdStory.length;
				if (val === 'clear'){
					clearScreenPolite();
				}else if (commands.includes(val)){
					showCommand(val);
				}else {
					badFormInput();
				}
			};
		};
	});

});

function helpCmdsInit(){
	$(".special_command").off('click').click(function(){
 		$('.new-output').empty();
 		typeText($(this).text());
 		input.val($(this).text());
 		timeS = ($(this).text().length + 1) * 40;
 		setTimeout(function() {
				$('.terminal-input-form').submit();
		},timeS);
	});
    	
};

function wrapCmd(cmd){
	$('.new-output').empty();
	specCmd = "<a href=\"#window\" class=\"special_command\" onclick=\"return false;\">"+cmd+"</a>";
	$('.new-output').append(specCmd);
	helpCmdsInit();
};

function badFormInput(){
	var message = "Command not recognized.</br>Type <a href=\"#window\" class=\"special_command\" onclick=\"return false;\">help</a> for a list of commands."
	var input = $('.cmd-input');
	$('.new-output').removeClass('new-output');
	input.val('');
	$('.terminal').append('<div class="prompt out">' + message + '</div><div class="prompt output new-output"></div>');
	helpCmdsInit();
	scrollSmoothToBottom('term');
}

function showCommand(cmd){
	var message = someData[cmd];
	var input = $('.cmd-input');
	wrapCmd(cmd);
	$('.new-output').removeClass('new-output');
	input.val('');
	$('.terminal').append('<div class="prompt out">' + message + '</div><div class="prompt output new-output"></div>');
	if (cmd=='help'){
		helpCmdsInit();
	};
	scrollSmoothToBottom('term');
}

function clearScreen(){
	var input = $('.cmd-input');
	$('.new-output').removeClass('new-output');
	input.val('');
	$('.terminal').empty();
	$('.terminal').append('<div class="prompt output new-output"></div>');
};

function clearScreenPolite(){
	clearScreen();
	setTimeout(function() {
		typeText('help');
	},500);//100 after typing
	setTimeout(function() {
		showCommand("help");
    },920);
};


function typeText(msg){
	$.each(msg.split(''),function(i,letter){
		setTimeout(function(){
			$('.new-output').append(letter);
		},40*i);
	});
	cmdStory.push(msg);
	cmdStoryIndex = cmdStory.length;
};

function changeIdxStory(n) {
	cmdStoryIndex += n;
	if (cmdStoryIndex > cmdStory.length){
		cmdStoryIndex = cmdStory.length;
	} else if (cmdStoryIndex < 0){
		cmdStoryIndex = 0;
	}else{
		$('.new-output').empty();
		$('.new-output').append(cmdStory[cmdStoryIndex]);
		$('.cmd-input').val(cmdStory[cmdStoryIndex]);
	};
};
function initNav(){
	$('#cmd1').click(function() {
	if (lockInter!=true){
		lockInter = true;
		clearScreen();
		setTimeout(function() {
			typeText('whoami');
		},500);//100 after typing
		setTimeout(function() {
			showCommand("whoami");
    	},1000);
		setTimeout(function() {	
    		typeText('contacts');
		},1100);
		setTimeout(function() {
			showCommand("contacts");
		},1980);
		setTimeout(function() {
			lockInter = false;
		},1981);
	}
	});
	$('#cmd2').click(function() {
		if (lockInter!=true){
			lockInter = true;
			clearScreen();
			setTimeout(function() {
				typeText('education');
			},500);
			setTimeout(function() {
				showCommand("education");
			},1220);
			setTimeout(function() {
				lockInter = false;
			},1221);
		}
	});
	$('#cmd3').click(function() {
		if (lockInter!=true){
			lockInter = true;
			clearScreen();
			setTimeout(function() {
				typeText('experience');
			},500);
			setTimeout(function() {
				showCommand("experience");
			},1160);
			setTimeout(function() {
				lockInter = false;
			},1161);
		}
	});
	$('#cmd4').click(function() {
		if (lockInter!=true){
			lockInter = true;
			clearScreen();
			setTimeout(function() {
				typeText('skills');
			},500);
			setTimeout(function() {
				showCommand("skills");
			},1266);
			setTimeout(function() {
				typeText('portfolio');
			},1720);
			setTimeout(function() {
				showCommand("portfolio");
			},2340);
			setTimeout(function() {
				lockInter = false;
			},2341);
		}
	});
	$('#cmd5').click(function() {
		if (lockInter!=true){
			lockInter = true;
			clearScreen();
			setTimeout(function() {
				typeText('help');
			}, 500);
			setTimeout(function() {
				showCommand("help");
			}, 920);
			setTimeout(function() {
				lockInter = false;
			},921);
		}   
	});
};

function scrollSmoothToBottom (id) {
	var div = document.getElementById(id);
	$('#' + id).animate({
		scrollTop: div.scrollHeight - div.clientHeight
	}, 500);
};

