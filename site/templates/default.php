<?php snippet('header') ?>

<section class="content scribble-wrapper">

  <h2><?php echo html($page->title()) ?></h2>

  <?php foreach($page->children()->visible()->flip() as $article): ?>

  <article>
    <h1><?php echo html($article->title()) ?></h1>
    <p><?php echo excerpt($article->text(), 300) ?></p>
    <a href="<?php echo $article->url() ?>">Read more…</a>
  </article>

  <?php endforeach ?>

</section>
