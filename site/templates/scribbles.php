<?php if(!r::is_ajax()) { ?>
<?php snippet('header') ?>


  <?php }  else { header("X-Title: " . $site->title() . " &raquo; " . $page->title()); } ?>
    <div class="scribble-list">
    <h2><?php echo html($page->title()) ?></h2>
    <ul class="scribbles">

      <?php foreach($page->children()->visible()->flip() as $article): ?>

      <li class="scribble">
        <article>
          <span class="scribble-date"><?php echo $article->date('M d') ?></span><a class="button scribble-title" href="<?php echo str_replace("/scribbles", "", $article->url()) ?>"><?php echo html($article->title()) ?></a><span class="scribble-word-count"><?php echo str_word_count($article->text()->value, 0) ?> Words</span>
        </article>
      </li>

      <?php endforeach ?>
    </ul>
    </div>
  <?php if(!r::is_ajax()) { ?>


<?php snippet('footer') ?>
<?php } ?>
