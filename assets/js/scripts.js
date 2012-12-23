$('body').delay(500).fadeIn(1000);


$(function () {

  // Random Phrase Generator

  var phrases = [
    'I go by the name<br/><strong>Timothy.</strong>', // Force this one to go first.
    'I design interfaces at<br/><strong><a href="http://6wunderkinder.com">6Wunderkinder</a>.</strong>',
    'I play a lot on<br/><strong><a class="dribbble" href="http://dribbble.com/iam_timm">dribbble</a>.</strong>',
    'I write a bunch of<br/>140 character <strong><a class="twitter" href="http://twitter.com/iam_timm">posts</a>.</strong>',
    'I take blurry<br/>filtered <strong><a class="instagram" href="http://instragram.com/iam_timm">photos</a>.</strong>',
    'I listen to music<br/>on <strong><a class="spotify" href="http://open.spotify.com/user/thech053none">Spotify</a>.</strong>',
    'I make mixes on<br/><strong><a class="designersmx" href="http://designers.mx/member/profile/iam_timm/mixes">Designers.MX</a>.</strong>'
  ];


  var stack = [];
  var delay = 8000;
  var limit = 1; // change probability, 1-10
  var last;


  function getPhrase () {

    if (!stack.length) {
      stack = [].concat(phrases);
    }

    var next = stack.pop();

    if (next === last) {
      return getPhrase();
    }

    var score = 1;
    for (var i = 0; i < 9; i++) {
      score = score + Math.round(Math.random());
    }

    if (score === limit) {
      last = next;
      return next;
    }
    else {
      return getPhrase();
    }
  }

  function update () {


    var directions = [
      'bounceInUp',
      'bounceInDown'
    ];

    var direction = Math.floor(Math.random()*directions.length);

    $('.phrase').removeClass('bounceInUp');
    $('.phrase').removeClass('bounceInDown');
    setTimeout(function () {
			$('.phrase').addClass(directions[direction]);

		}, 0);

		setTimeout(function () {
      $('.phrase').html(getPhrase()).fadeIn(500);

		}, 100);

  }

  setInterval(update, delay);
  update();

});


