<?php snippet('header') ?>
<section class="content scribble-wrapper blogarticle">
  <article class="actual-scribble">
    <h1><?php echo html($page->title()) ?></h1>
    <?php echo kirbytext($page->text()) ?>

    <div class="tweet-post">Hey, if you liked this post why not <a href="https://twitter.com/intent/tweet?source=webclient&amp;text=<?php echo rawurlencode("A new blog post from @iam_timm! " . $page->title() . " " . $page->tinyurl()); ?>" target="blank" title="Tweet this">tweet</a> it!</div>

    <a class="post-navigation" href="<?php echo url('scribbles') ?>">Back</a>

  </article>
</section>
<?php snippet('footer') ?>