<?php snippet('header') ?>

<section class="content blog scribble-wrapper">

  <h2><?php echo html($page->title()) ?></h2>
  <p class="body-text"><?php echo kirbytext($page->text()) ?></p>

</section>

<?php snippet('footer') ?>
