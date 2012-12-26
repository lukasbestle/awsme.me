// Generated by CoffeeScript 1.3.3
(function() {
  var delay, firstPopState, getPhrase, init, initInternalLinks, initialUrl, isPhraseHovered, last, lastUrl, limit, loadContent, onClickLink, onPhraseHoverEnd, onPhraseHoverStart, phrases, scrollDuration, siteURL, stack, unescapeEntities, update;

  phrases = ['I go by the name<br/><strong>Timothy.</strong>', 'I push pixels at<br/><strong><a target="_blank" href="http:#6wunderkinder.com">6Wunderkinder</a>.</strong>', 'I play a lot on<br/><strong><a target="_blank" class="dribbble" href="http:#dribbble.com/iam_timm">dribbble</a>.</strong>', 'I write 140<br/>character <strong><a target="_blank" class="twitter" href="http:#twitter.com/iam_timm">posts</a>.</strong>', 'I take blurry<br/>filtered <strong><a target="_blank" class="instagram" href="http:#instagram.com/iam_timm">photos</a>.</strong>', 'I listen to music<br/>on <strong><a target="_blank" class="spotify" href="http:#open.spotify.com/user/thech053none">Spotify</a>.</strong>', 'I make mixes on<br/><strong><a target="_blank" class="designersmx" href="http:#designers.mx/member/profile/iam_timm/mixes">Designers.MX</a>.</strong>'];

  stack = [];

  delay = 10000;

  limit = 1;

  isPhraseHovered = false;

  scrollDuration = 300;

  lastUrl = document.location.pathname;

  last = phrases[0];

  initialUrl = document.location;

  firstPopState = true;

  siteURL = window.location.origin.toString();

  initInternalLinks = function() {
    $(document).on('click', 'a', onClickLink);
    return $(window).on('popstate', function(e) {
      if (document.location === initialUrl && firstPopState) {
        firstPopState = false;
        return;
      }
      return loadContent(location.pathname + location.search);
    });
  };

  loadContent = function(url, pushCurrentState) {
    var $content;
    if (url === lastUrl) {
      return;
    }
    lastUrl = url;
    $content = $('.content');
    return $.get(url, function(data, status, xhr) {
      var showContent, title;
      title = xhr.getResponseHeader('X-Title');
      if (typeof title !== "string") {
        document.location = url;
        return;
      }
      showContent = function() {
        $content.css('opacity', 0);
        return setTimeout(function() {
          return $content.html(data).css('opacity', 1);
        }, 300);
      };
      if (window.pageYOffset > 0) {
        $('body').animate({
          'scrollTop': 0
        }, scrollDuration, showContent);
      } else {
        showContent();
      }
      document.title = unescapeEntities(title);
      if (pushCurrentState) {
        return window.history.pushState(null, null, url);
      }
    });
  };

  onClickLink = function() {
    var $this, isInternalLink, targetUrl;
    $this = $(this);
    targetUrl = $this.attr('href');
    isInternalLink = targetUrl.indexOf(siteURL) >= 0 || targetUrl.substring(0, 1) === "/";
    if (window.history && history.pushState && isInternalLink) {
      loadContent($(this).attr('href').replace(siteURL, ''), true);
      return false;
    } else if (!isInternalLink) {
      return $(this).attr('target', '_blank');
    }
  };

  getPhrase = function(index) {
    next;

    var i, next, score, _i;
    if (!stack.length) {
      stack = [].concat(phrases);
    }
    if (index !== void 0) {
      next = stack[index];
      if (next) {
        stack.splice(index, 1);
        last = next;
        return next;
      } else {
        return getPhrase();
      }
    } else {
      next = stack.pop();
      if (next === last) {
        return getPhrase();
      }
      score = 1;
      for (i = _i = 0; _i <= 9; i = ++_i) {
        score = score + Math.round(Math.random());
      }
      if (score === limit) {
        last = next;
        return next;
      } else {
        return getPhrase();
      }
    }
  };

  update = function(index) {
    var $phrase, direction, directions;
    if (isPhraseHovered) {
      return;
    }
    $phrase = $('.phrase');
    directions = ['bounceInUp', 'bounceInDown'];
    direction = Math.floor(Math.random() * directions.length);
    $phrase.removeClass('bounceInUp bounceInDown');
    setTimeout(function() {
      return $phrase.addClass(directions[direction]);
    }, 0);
    return setTimeout(function() {
      return $phrase.html(getPhrase(index)).fadeIn(500);
    }, 100);
  };

  onPhraseHoverStart = function() {
    return isPhraseHovered = true;
  };

  onPhraseHoverEnd = function() {
    return isPhraseHovered = false;
  };

  $('.phrase').mouseenter(onPhraseHoverStart).mouseleave(onPhraseHoverEnd);

  init = function() {
    initInternalLinks();
    update(0);
    setInterval(update, delay);
    if (window.navigator.standalone && window.location.pathname !== "/") {
      return loadContent("/", true);
    }
  };

  $(init);

  unescapeEntities = function(string) {
    var d;
    d = document.createElement("div");
    d.innerHTML = string;
    return d.innerText || d.text || d.textContent;
  };

}).call(this);
