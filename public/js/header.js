(function($) {
  $(function() {
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
  }); // end of document ready
})(jQuery); // end of jQuery name space