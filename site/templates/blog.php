<?php snippet('header') ?>

<section class="content blog scribble-wrapper">

  <h2><?php echo html($page->title()) ?></h2>
  <ul class="scribbles">

    <?php foreach($page->children()->visible()->flip() as $article): ?>

    <li class="scribble">
      <article>
        <span class="scribble-date"><?php echo $article->date('M d') ?></span><a class="scribble-title" href="<?php echo $article->url() ?>"><?php echo html($article->title()) ?></a><span class="scribble-word-count"><?php echo str_word_count($article->text()->value, 0) ?> Words</span>
      </article>
    </li>

    <?php endforeach ?>
  </ul>

</section>

