var slider = {
  items: $('.slide'),
  count: $('.slide').length,
  current: 0,
  directions: new Array,
  loading: true,

  init: function() {
    var self = this;

    this.items.each(function(index, element) {
      self.directions.push($(element).find('img').data('direction'));
    });

    this.items.find('img').css('position', 'relative');
    this.setZIndex();
  },

  setZIndex: function() {
    var count = this.items.length;
    var _count = this.items.length;

    for ( var i = 0; i < _count; i++ ) {
      $(this.items[i]).css('z-index', count);
      count--;
    }
  },

  /**
   * @param {string} direction
   */
  slide: function(target, direction) {
    var self = this;
    var beforePosition = $(target).find('img').css('transform');

    $(target).find('img').fadeIn(200);
    
    setTimeout(function() {
      console.log('2. slide >>>');
      console.log({direction});
      console.log({target});
      
      switch (direction) {
        case 'left-right':
          $(target).find('img').css('transform', 'translateX(100px)  scale(1.5)');
          break;
        case 'right-left':
          $(target).find('img').css('transform', 'translateX(-100px)  scale(1.5)');
          break;
        case 'top-bottom':
          $(target).find('img').css('transform', 'translateY(100px)  scale(1.5)');
          break;
        case 'bottom-top':
          $(target).find('img').css('transform', 'translateY(-100px)  scale(1.5)');
          break;
        default:
          console.log('direction not match');
      }

      setTimeout(function() {
        self.fadeout($(target, direction, beforePosition));
      }, 3000);
    }, 1000, target, direction);
  },

  reset: function($target, direction, beforePosition) {
    console.log('4. reset >>>');
    console.log({direction});

    $target.find('img').css('transform', beforePosition);
  },

  fadeout: function($target, direction, beforePosition) {
    var self = this;
    $target.fadeOut(600, function() {
      self.reset($target, direction, beforePosition);
    });
    console.log('3. fadeout >>>');
  },

  run: function() {
    var self = this;
    var init = new Promise(function(resolve) {
      self.init();
      resolve('done!!');
    });

    init.then(function(res) {
      // TODO: ローディング？
      this.loading = false;
      // $(self.items).parents('.wrapper').addClass('is_show');

      console.log('0. start >>>');
      self.slide(self.items[self.current], self.directions[self.current]);
      self.current++;

      var loop = setInterval(() => {
        console.log('1. loop >>>');
        self.slide(self.items[self.current], self.directions[self.current]);
        self.current++;
        
        if (self.current === self.items.length) {
          self.current = 0
        }
      }, 5000);
      console.log('loading >>>', this.loading);
    })
    console.log('loading >>>', this.loading);
  },
}

slider.run();

// -------------
// test
// -------------
// slider.fadeout($('.wrapper'));
// slider.slide('left-right');
// slider.slide('top-bottom');
