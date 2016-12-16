(function($){
  $(function(){
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
    // function comingSoon() {
    //   var comingAscii = document.querySelector(".coming");
    //   AsciiMorph(comingAscii, {x: 0, y: 20});
    //   AsciiMorph.render(coming);
    //   var soonAscii = document.querySelector(".soon");
    //   AsciiMorph(soonAscii, {x: 0, y: 20});
    //   AsciiMorph.render(soon);
      
    // }
    $(".soon-trigger").on("click", function() {
      var comingAscii = document.querySelectorAll(".coming");
      for(var i = 0; i < comingAscii.length; i++) {
      var comingAsciiMorph = new AsciiMorph();
      comingAsciiMorph.morph(comingAscii[i], {x: 0, y: 20});
      comingAsciiMorph.morph.render(coming);
      comingAsciiMorph.morph.morph(coming);
      // AsciiMorph(comingAscii[i], {x: 0, y: 20});
      // AsciiMorph.render(coming);
      }
      var soonAscii = document.querySelectorAll(".soon");
      for(i = 0; i < soonAscii.length; i++) {
      var soonAsciiMorph = new AsciiMorph();
      soonAsciiMorph.morph(soonAscii[i], {x: 0, y: 20});
      soonAsciiMorph.morph.render(soon);
      soonAsciiMorph.morph.morph(soon);
      // AsciiMorph(soonAscii[i], {x: 0, y: 20});
      // AsciiMorph.render(soon);
      }

    });

    $("#profile-trigger").click(function() {
      switchAscii();
      window.setTimeout(profileFade, 2500);      
      window.setTimeout(switchPic, 3200);
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space