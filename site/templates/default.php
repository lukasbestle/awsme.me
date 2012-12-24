<?php if(!r::is_ajax()) { ?>
<?php snippet('header') ?>

<section class="content blog scribble-wrapper">
<?php } else { header("X-Title: " . $site->title() . " &raquo; " . $page->title()); } ?>

  <h2><?php echo html($page->title()) ?></h2>
  <p class="body-text"><?php echo kirbytext($page->text()) ?></p>

<?php if(!r::is_ajax()) { ?>
</section>

<?php snippet('footer') ?>
<?php } ?>