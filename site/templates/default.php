<?php if(!r::is_ajax()) { ?>
<?php snippet('header') ?>


  <?php }  else { header("X-Title: " . $site->title() . " &raquo; " . $page->title()); } ?>
  <div class="body-content">

    <article>
      <h2><?php echo html($page->title()) ?></h2>
      <div class="body-text">
        <?php echo kirbytext($page->text()) ?>
      </div>
    </article>

  </div>
  <?php if(!r::is_ajax()) { ?>


<?php snippet('footer') ?>
<?php } ?>