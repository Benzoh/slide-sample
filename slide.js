var slider = {
  items: $('.slide'),
  current: 0,

  // z-index: 1
  // fadein
  // slide
  // fadeout
  // z-index: -1
  // show
  action: (target) => {
    console.log('action >>>');
    $(target).fadeIn(800).addClass('active');
    
    setTimeout(() => {
      $(target).fadeOut(1000, () => {
        $(target).removeClass('active');
      });
    }, 3000);
  },

  run: function() {
    this.action(this.items[this.current]);
    this.current++;

    var loop = setInterval(() => {
      this.action(this.items[this.current]);
      this.current++;
      
      if (this.current === this.items.length) {
        this.current = 0;
      }
    }, 3000);
  },
}

slider.run();
