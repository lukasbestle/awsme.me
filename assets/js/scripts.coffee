"use strict";
phrases = [
  'I go by the name<br/><strong>Timothy.</strong>',
  'I push pixels at<br/><strong><a target="_blank" href="http:#6wunderkinder.com">6Wunderkinder</a>.</strong>',
  'I play a lot on<br/><strong><a target="_blank" class="dribbble" href="http:#dribbble.com/iam_timm">dribbble</a>.</strong>',
  'I write 140<br/>character <strong><a target="_blank" class="twitter" href="http:#twitter.com/iam_timm">posts</a>.</strong>',
  'I take blurry<br/>filtered <strong><a target="_blank" class="instagram" href="http:#instagram.com/iam_timm">photos</a>.</strong>',
  'I listen to music<br/>on <strong><a target="_blank" class="spotify" href="http:#open.spotify.com/user/thech053none">Spotify</a>.</strong>',
  'I make mixes on<br/><strong><a target="_blank" class="designersmx" href="http:#designers.mx/member/profile/iam_timm/mixes">Designers.MX</a>.</strong>'
];

stack = [];
delay = 10000;
limit = 1; # change probability, 1-10
isPhraseHovered = false;
scrollDuration = 300;
lastUrl = document.location.pathname;
last = phrases[0];
initialUrl = document.location;
firstPopState = true;

# cache the site URL
siteURL = window.location.origin.toString();

# bootstrap for ajaxified internal links
initInternalLinks = ()->

  # attach the link event handler, and make sure
  # it's delegated for best performance
  $(document).on('click', 'a', onClickLink);

  # the handler that makes back and forward buttons work
  $(window).on('popstate', (e)->
    if(document.location == initialUrl && firstPopState)
      firstPopState = false;
      return;
    
    loadContent(location.pathname + location.search);
  );

# grab the content from a url and push to DOM
loadContent = (url, pushCurrentState)->

  # if we're trying to reload the same url, do nothing
  if (url == lastUrl)
  	return

  # remember to save this value!
  lastUrl = url;

  # repetative comments, but it's important - cache selectors!
  $content = $('.content');
  
  # load the new content
  $.get(url, (data, status, xhr)->
    
    # get the title from the response headers
    title = xhr.getResponseHeader('X-Title');
    
    # check if it is a vaild AJAXifyable page
    if(typeof(title) != 'string')
      # Nope, redirect to it
      document.location = url;
      return;

    showContent = ()->
      # fade out the current content
      $content.css('opacity', 0);
      
      setTimeout(()->
        # put the content to the dom and fade it in
        $content.html(data).css('opacity', 1);
      , 300);

    # if the visitor has scrolled, scroll back to the top
    if (window.pageYOffset > 0)
      $('body').animate({
        'scrollTop': 0
      }, scrollDuration, showContent);
    else
      showContent();

    # update the window/tab title
    document.title = unescapeEntities(title);
    
    if(pushCurrentState)
      # push the current url to history
      window.history.pushState(null, null, url);
  );

# click event handler for all links
onClickLink = ()->

  # cache the jquery object, best practice for performance
  $this = $(this);
  targetUrl = $this.attr('href');
  isInternalLink = targetUrl.indexOf(siteURL) >= 0 || targetUrl.substring(0, 1) == '/';

  # if pushState is supported, use it for internal links
  if (window.history && history.pushState && isInternalLink)

    # load content
    loadContent($this.attr('href').replace(siteURL, ''), true);

    # return false to avoid default <a> #click behavior
    return false;
    
  # for external links
  else if (!isInternalLink)
    $this.attr('target', '_blank');

  # internal links, when pushState is not supported,
  # will work as normal links...

# the function responsible for getting a phrase,
# from a specific index or otherwise random
getPhrase = (index)->

  next;

  if (!stack.length)
    stack = [].concat(phrases);

  # we can't just check for falsy values here,
  # since 0 is falsy but still a valid index
  if (index != undefined)

    # if we have an index, try to select that one
    next = stack[index];

    if (next)

      # if we got a result from the phrases, remove it
      stack.splice(index, 1);
      last = next;
      return next;
      
    else
    	
      # if there was no string at that index, get a random one
      return getPhrase();
  else
    next = stack.pop();

    if (next == last)
      return getPhrase();

    score = 1;
    score = score + Math.round(Math.random()) for i in [0..9]

    if (score == limit)
      last = next;
      return next;
    else
      return getPhrase();

# responsible for getting a new
# phrase and updating the DOM
update = (index)->

  # if the phrase is hovered, don't change it
  if (isPhraseHovered)
  	return;

  # make sure to cache this selector,
  # since we use it more than once
  $phrase = $('.phrase');

  directions = [
    'bounceInUp',
    'bounceInDown'
  ];

  direction = Math.floor(Math.random() * directions.length);

  $phrase.removeClass('bounceInUp bounceInDown');

  setTimeout(()->
    $phrase.addClass(directions[direction]);
  , 0);

  setTimeout(()->
    $phrase.html(getPhrase(index)).fadeIn(500);
  , 100);

# hover event handlers
onPhraseHoverStart = ()->
  isPhraseHovered = true;
  return;
onPhraseHoverEnd = ()->
  isPhraseHovered = false;
  return;

# bind event handlers to mouseenter and mouseleave
# could also user .hover(start, end) but it's deprecated in v 1.9
$('.phrase').mouseenter(onPhraseHoverStart).mouseleave(onPhraseHoverEnd);

# Unescape HTML Entities
unescapeEntities = (string)->
  d = document.createElement('div');
  d.innerHTML = string;
  return d.innerText || d.text || d.textContent;

# the bootstrap method, should show first quote
# and then schedule the random updates
init = ()->

  # call the ajaxified internal links bootstrap
  initInternalLinks();

  # pass in 0 as index, to grab the first string
  update(0);

  # and schedule the updates
  setInterval(update, delay);

  # When launched from Home Screen always go to the homepage
  if(window.navigator.standalone && window.location.pathname != '/')
  	loadContent('/', true);

# run the bootstrap initializer when dom is ready
$(init);