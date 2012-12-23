<?php snippet('header') ?>
<section class="content scribble-wrapper blogarticle">
  <article class="actual-scribble">
    <h1><?php echo html($page->title()) ?></h1>
    <?php echo kirbytext($page->text()) ?>

    <a class="post-navigation" href="<?php echo url('scribbles') ?>">Back</a>

  </article>
</section>
