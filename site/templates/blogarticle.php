<?php if(!r::is_ajax()) { ?>
<?php snippet('header') ?>
<?php } else { header("X-Title: " . $site->title() . " &raquo; " . $page->title()); } ?>

  <article class="post" id="post-top">
  	<div class="selectable">
    	<h1><?php echo html($page->title()) ?></h1>
    	<?php echo kirbytext($page->text()) ?>
  	</div>

    <div class="tweet-post">Liked what you just read? Why not <a href="https://twitter.com/intent/tweet?source=webclient&amp;text=<?php echo rawurlencode("I just read a blog post: " . $page->title() . " (via @iam_timm) " . $page->tinyurl()); ?>" target="blank" title="Tweet this">tweet</a> about it or <a href="http://feeds.feedburner.com/awsme" title="Subscribe to my feed" rel="alternate" type="application/rss+xml">subscribe</a> to get updates on new posts!</div>

    <a class="post-navigation button" href="<?php echo url() ?>">Back</a>
  </article>

<?php if(!r::is_ajax()) { ?>
<?php snippet('footer') ?>
<?php } ?>
