( function( $ ) {

  $.fn.marquee = function( options ) {
    var settings = $.extend({
      event: "mouseenter",
      padding: 30,
      speed: 12000,
      direction: "left",
      moveElement: "#move-marquee"
    }, options);
    // this counter is for that the animation doesn't repeat while is running
    var counter = 0;
    var that = this;
    var idParentElement = that.parent().parent().attr("id");

    return this.each(function() {
      var $this = $(this);
      $(document).on(settings.event, "#" + idParentElement + " " + settings.moveElement + " span", function() {
        if (counter != 0) return;
        counter = 1;
        var clone, 
            widthElement, 
            pixelsMove,
            moveMarquee = $(settings.moveElement);

        if (moveMarquee.width() <= $this.width()) {
          $this.addClass("original");

          clone = $this.clone().addClass("clone").removeClass("original");
          if (settings.direction == "left") {
            // we are putting the padding in the original element
            $this.after(clone);
            $this.css("padding-right", settings.padding);
            widthElement = $this.outerWidth();
          } else {
            // we are putting the padding in the clone element, that's why widthElement has to be different
            $this.before(clone);
            clone.css("padding-right", settings.padding);
            widthElement = clone.outerWidth();
          }

          // if direction is left the movement will be negative pixels, from 0 until negative width
          // if direction is right the movement will be positive pixels, from negative width until 0
          pixelsMove = "-"+widthElement+"px";
          if (settings.direction == "right") {
            moveMarquee.css({"left":pixelsMove});
            pixelsMove = 0;
          }

          moveMarquee.animate(
            {"left":pixelsMove},
            settings.speed, 
            "linear",
            function() {
              counter = 0;
              $this.parent().find(".clone").remove();
              moveMarquee.css("left", 0);
            }
          );
        }
      });
    });
  }

}(jQuery));