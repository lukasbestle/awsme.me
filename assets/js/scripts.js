// ====================================
// Redirect external links
$('a[href^="http://"]').not('a[href*=awsme]').attr('target','_blank');
$('a[href^="https://"]').not('a[href*=awsme]').attr('target','_blank');

// ====================================
// AJAXification

// Get all internal links
siteURL = "http://" + top.location.host.toString();
internalLinks = $("a[href^='" + siteURL + "'], a[href^='/'], a[href^='./'], a[href^='../']");

onclickFkt = function() {
	// Get the URL to get from the server
	var url = $(this).attr("href");
	
	// Don't load the same page again
	if(url == $(location).attr('href')) return false;
	
	// Let us hide the content first to create a beautiful animation
	$(".content").css("opacity", 0);
	
	// Wait for the animation to complete before changing anything
	setTimeout(function() {
		$.get(url, function(data, status, xhr) {
			// Change the page content, title and URI
			$(".content").html(data).css("opacity", 1);
			$("title").html(xhr.getResponseHeader("X-Title"));
			history.pushState({}, $("title").html(), url);
			
			// Prepare the site for the next click
			$("a[href^='" + siteURL + "'], a[href^='/'], a[href^='./'], a[href^='../']").unbind("click").bind("click", onclickFkt);
		});
	}, 200);
	
	// Don't really follow that link
	return false;
};

// Register the links for the onclick event above
internalLinks.click(onclickFkt);

// ====================================
// Random Phrase Generator

var phrases = [
  'I go by the name<br/><strong>Timothy.</strong>', // Force this one to go first.
  'I push pixels at<br/><strong><a target="_blank" href="http://6wunderkinder.com">6Wunderkinder</a>.</strong>',
  'I play a lot on<br/><strong><a target="_blank" class="dribbble" href="http://dribbble.com/iam_timm">dribbble</a>.</strong>',
  'I write 140<br/>character <strong><a target="_blank" class="twitter" href="http://twitter.com/iam_timm">posts</a>.</strong>',
  'I take blurry<br/>filtered <strong><a target="_blank" class="instagram" href="http://instagram.com/iam_timm">photos</a>.</strong>',
  'I listen to music<br/>on <strong><a target="_blank" class="spotify" href="http://open.spotify.com/user/thech053none">Spotify</a>.</strong>',
  'I make mixes on<br/><strong><a target="_blank" class="designersmx" href="http://designers.mx/member/profile/iam_timm/mixes">Designers.MX</a>.</strong>'
];


var stack = [];
var delay = 8000;
var limit = 1; // change probability, 1-10
var isPhraseHovered = false;
var last;


function getPhrase (index) {

  var next;

  if (!stack.length) {
    stack = [].concat(phrases);
  }

  // we can't just check for falsy values here,
  // since 0 is falsy but still a valid index
  if (index !== undefined) {

    // if we have an index, try to select that one
    next = stack[index];

    if (next) {

      // if we got a result from the phrases, remove it
      stack.splice(index, 1);
      last = next;
      return next;
    }
    else {

      // if there was no string at that index, get a random one
      return getPhrase();
    }
  }
  else {
    next = stack.pop();

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
}

function update (index) {

  // if the phrase is hovered, don't change it
  if (isPhraseHovered) {
    return;
  }

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
    $('.phrase').html(getPhrase(index)).fadeIn(500);
  }, 100);
}

// hover event handlers
function onPhraseHoverStart () {
  isPhraseHovered = true;
}
function onPhraseHoverEnd () {
  isPhraseHovered = false;
}

// bind event handlers to mouseenter and mouseleave
// could also user .hover(start, end) but it's deprecated in v 1.9
$('.phrase').mouseenter(onPhraseHoverStart).mouseleave(onPhraseHoverEnd);

// the bootstrap method, should show first quote
// and then schedule the random updates
function init () {

  // pass in 0 as index, to grab the first string
  update(0);

  // and schedule the updates
  setInterval(update, delay);
}

// run the bootstrap initializer when dom is ready
$(init);