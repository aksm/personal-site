(function($) {
  $(function() {

    var ascii = document.querySelector("#ascii");
    var asciiHeader = new AsciiMorph();
    asciiHeader.morph(ascii, {x: 0, y: 5});
    var backstage = [

      "╔╗ ┌─┐┌─┐┬┌─┌─┐┌┬┐┌─┐┌─┐┌─┐",
      "╠╩╗├─┤│  ├┴┐└─┐ │ ├─┤│ ┬├┤ ",
      "╚═╝┴ ┴└─┘┴ ┴└─┘ ┴ ┴ ┴└─┘└─┘"

    ];
    asciiHeader.morph.render(backstage);
    asciiHeader.morph.morph(backstage);

    showdown.setFlavor("github");
    var converter = new showdown.Converter({
      smoothLivePreview: true,
      smarthIndentationFix: true
    });

    var markdownToHtml = function(content, display) {
      var txt = content.val();
      var html = converter.makeHtml(txt);
      display.html(html);
    };
    var highlight = function() {
      $("pre code").each(function(i, block) {
        hljs.highlightBlock(block);
      });
    };

    var blogContent = $("#blog-content");
    var blogPreview = $("#blog-post-preview");
    markdownToHtml(blogContent, blogPreview);
    highlight();
    $("#blog-content").on("keyup", {content: blogContent, preview: blogPreview},function(e) {
      markdownToHtml(e.data.content, e.data.preview);
      highlight();
    });
    var editTags = $("#post-chips").data("tags") === undefined ? false : $("#post-chips").data("tags");
    var postChips = [];
    if(editTags) {
      for(var i = 0; i < editTags.length; i++) {
        postChips.push({tag: editTags[i]});
      }
    }
    // Chip functions
    $(".chips").material_chip({
      placeholder: "tag+",
      secondaryPlaceholder: "tag+",
      data: postChips
    });
    $(".chips").on("chip.add", function(e, chip) {
      var tags = $("#blog-tags");
      var tagArray = JSON.parse(tags.val());
      tagArray.push(chip.tag);
      tags.val(JSON.stringify(tagArray));
    });
    $(".chips").on("chip.delete", function(e, chip){
      var tags = $("#blog-tags");
      var tagArray = JSON.parse(tags.val());
      var tagIndex = tagArray.indexOf(chip.tag);
      tagArray.splice(tagIndex, 1);
      tags.val(JSON.stringify(tagArray));
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space