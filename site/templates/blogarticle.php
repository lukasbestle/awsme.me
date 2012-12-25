<?php if(!r::is_ajax()) { ?>
<?php snippet('header') ?>
<section class="content scribble-wrapper blogarticle">
<?php } else { header("X-Title: " . $site->title() . " &raquo; " . $page->title()); } ?>

  <article class="actual-scribble">
  	<div class="selectable">
    	<h1><?php echo html($page->title()) ?></h1>
    	<?php echo kirbytext($page->text()) ?>
  	</div>
  </article>
  <div class="tweet-post">Hey, if you liked this post why not <a href="https://twitter.com/intent/tweet?source=webclient&amp;text=<?php echo rawurlencode("A new blog post from @iam_timm! " . $page->title() . " " . $page->tinyurl()); ?>" target="blank" title="Tweet this">tweet</a> it!</div>
  <a class="post-navigation" href="<?php echo url() ?>">Back</a>

<?php if(!r::is_ajax()) { ?>
</section>
<?php snippet('footer') ?>
<?php } ?>