(function($) {
  $(function() {
    $("#blog-admin").modal();

    function profileFade() {
      $("#profile-ascii").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }
    window.setTimeout(profileFade, 2500);      
    window.setTimeout(switchPic, 3200);

    var ascii = document.querySelector("#ascii");
    var asciiHeader = new AsciiMorph();
    asciiHeader.morph(ascii, {x: 0, y: 20});
    var keyboard = [

      " _______ _______ _______ _______ _______ _______ _______ _______ _______ _______ ",
      "|\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|",
      "| +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
      "| |   | | |   | | |   | | |   | | |   | | |   | | |   | | |   | | |   | | |   | |",
      "| |Q  | | |W  | | |E  | | |R  | | |T  | | |Y  | | |U  | | |I  | | |O  | | |P  | |",
      "| +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
      "|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|",
                                                                               
      "     _______ _______ _______ _______ _______ _______ _______ _______ _______ ",
      "    |\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|",
      "    | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
      "    | |   | | |   | | |   | | |   | | |   | | |   | | |   | | |   | | |   | |",
      "    | |A  | | |S  | | |D  | | |F  | | |G  | | |H  | | |J  | | |K  | | |L  | |",
      "    | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
      "    |/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|",
                                                                               
                                                               
      "          _______ _______ _______ _______ _______ _______ _______ ",
      "         |\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|",
      "         | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
      "         | |   | | |   | | |   | | |   | | |   | | |   | | |   | |",
      "         | |Z  | | |X  | | |C  | | |V  | | |B  | | |N  | | |M  | |",
      "         | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
      "         |/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|"
                                                         
    ];                                                                             
    var name = [
                                                                             
                                                 
      " _______ _______ _______ _______ _______ _______ ",
      "|\\     /|\\     /|\\     /|\\     /|\\     /|\\     /|",
      "| +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
      "| |   | | |   | | |   | | |   | | |   | | |   | |",
      "| |A  | | |L  | | |B  | | |E  | | |R  | | |T  | |",
      "| +---+ | +---+ | +---+ | +---+ | +---+ | +---+ |",
      "|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|/_____\\|",
      "                                                 ",
      "                                                 ",
      "             _______ _______ _______             ",
      "            |\\     /|\\     /|\\     /|            ",
      "            | +---+ | +---+ | +---+ |            ",
      "            | |   | | |   | | |   | |            ",
      "            | |M  | | |I  | | |N  | |            ",
      "            | +---+ | +---+ | +---+ |            ",
      "            |/_____\\|/_____\\|/_____\\|            "
                                                                                                                              
    ];

    var coming = [

      "      ___           ___           ___                       ___           ___     ",
      "     /  /\\         /  /\\         /__/\\        ___          /__/\\         /  /\\    ",
      "    /  /:/        /  /::\\       |  |::\\      /  /\\         \\  \\:\\       /  /:/_   ",
      "   /  /:/        /  /:/\\:\\      |  |:|:\\    /  /:/          \\  \\:\\     /  /:/ /\\  ",
      "  /  /:/  ___   /  /:/  \\:\\   __|__|:|\\:\\  /__/::\\      _____\\__\\:\\   /  /:/_/::\\ ",
      " /__/:/  /  /\\ /__/:/ \\__\\:\\ /__/::::| \\:\\ \\__\\/\\:\\__  /__/::::::::\\ /__/:/__\\/\\:\\",
      " \\  \\:\\ /  /:/ \\  \\:\\ /  /:/ \\  \\:\\~~\\__\\/    \\  \\:\\/\\ \\  \\:\\~~\\~~\\/ \\  \\:\\ /~~/:/",
      "  \\  \\:\\  /:/   \\  \\:\\  /:/   \\  \\:\\           \\__\\::/  \\  \\:\\  ~~~   \\  \\:\\  /:/ ",
      "   \\  \\:\\/:/     \\  \\:\\/:/     \\  \\:\\          /__/:/    \\  \\:\\        \\  \\:\\/:/  ",
      "    \\  \\::/       \\  \\::/       \\  \\:\\         \\__\\/      \\  \\:\\        \\  \\::/   ",
      "     \\__\\/         \\__\\/         \\__\\/                     \\__\\/         \\__\\/    "

    ];

    var soon = [

      "      ___           ___           ___           ___     ",
      "     /\\  \\         /\\  \\         /\\  \\         /\\__\\    ",
      "    /::\\  \\       /::\\  \\       /::\\  \\       /::|  |   ",
      "   /:/\\ \\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:|:|  |   ",
      "  _\\:\\~\\ \\  \\   /:/  \\:\\  \\   /:/  \\:\\  \\   /:/|:|  |__ ",
      " /\\ \\:\\ \\ \\__\\ /:/__/ \\:\\__\\ /:/__/ \\:\\__\\ /:/ |:| /\\__\\",
      " \\:\\ \\:\\ \\/__/ \\:\\  \\ /:/  / \\:\\  \\ /:/  / \\/__|:|/:/  /",
      "  \\:\\ \\:\\__\\    \\:\\  /:/  /   \\:\\  /:/  /      |:/:/  / ",
      "   \\:\\/:/  /     \\:\\/:/  /     \\:\\/:/  /       |::/  /  ",
      "    \\::/  /       \\::/  /       \\::/  /        /:/  /   ",
      "     \\/__/         \\/__/         \\/__/         \\/__/    "

    ];
    asciiHeader.morph.render(keyboard);
    asciiHeader.morph.morph(name);


    function switchAscii() {
      $("#profile-pic").removeClass("show");
      $("#profile-pic").addClass("hide");
      $("#profile-ascii").removeClass("hide");
      $("#profile-ascii").addClass("show");
    }
    function switchPic() {
      $("#profile-ascii").addClass("hide");
      $("#profile-pic").removeClass("hide");
      $("#profile-pic").addClass("show");
      $("#profile-pic").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }

    $(".soon-trigger").on("click", function() {
      var comingAscii = document.querySelectorAll(".coming");
      for(var i = 0; i < comingAscii.length; i++) {
      var comingAsciiMorph = new AsciiMorph();
      comingAsciiMorph.morph(comingAscii[i], {x: 0, y: 20});
      comingAsciiMorph.morph.render(coming);
      comingAsciiMorph.morph.morph(coming);
      }
      var soonAscii = document.querySelectorAll(".soon");
      for(i = 0; i < soonAscii.length; i++) {
      var soonAsciiMorph = new AsciiMorph();
      soonAsciiMorph.morph(soonAscii[i], {x: 0, y: 20});
      soonAsciiMorph.morph.render(soon);
      soonAsciiMorph.morph.morph(soon);
      }

    });

    $("#profile-trigger").click(function() {
      switchAscii();
      window.setTimeout(profileFade, 2500);      
      window.setTimeout(switchPic, 3200);
    });

    $("pre code").each(function(i, block) {
      hljs.highlightBlock(block);
    });

    $("#copyright").dblclick(function() {
      $("#blog-admin").modal("open");
    });
    $(".comment-input").on("keyup", function() {
      var id = $(this).data("id");
      if($("#comment-message-"+id).val() !== "" && $("#comment-name-"+id).val() !== "" && $("#comment-email-"+id).val() !== "") {
        $("#post-comment-"+id).removeClass("disabled");
      } else {        
        $("#post-comment-"+id).addClass("disabled");
      }
    });
    $(".comment-button").on("click", function() {
      var id = $(this).data("id");
      var panels = $(".comment-panel-"+id);
      panels.toggleClass("active");
      if(panels.hasClass("active")) {
        panels.slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
      } else {
        panels.slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
      }
    });
    if($("#blog-container").data("commentid")) {
      var activatePost = $("#blog-container").data("blogcommentid");
      var activateComment = $("#blog-container").data("commentid");
      $("#"+activatePost).addClass("active");
      $(".comment-panel-"+activateComment).show();
    }
  }); // end of document ready
})(jQuery); // end of jQuery name space