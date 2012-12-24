<!DOCTYPE html>
<html lang="en">
<head>

  <title><?php echo html($site->title()) ?> - <?php echo html($page->title()) ?></title>
  <meta charset="utf-8" />
  <meta name="description" content="<?php echo html($site->description()) ?>" />
  <meta name="keywords" content="<?php echo html($site->keywords()) ?>" />
  <meta name="robots" content="index, follow" />

  <script type="text/javascript" src="//use.typekit.net/lbi2wlw.js"></script>
  <script type="text/javascript">try{Typekit.load();}catch(e){}</script>

  <link rel="shortcut icon" type="image/x-icon" href="assets/favicon.ico">

  <link rel="alternate" type="application/rss+xml" href="<?php echo url('scribbles/feed') ?>" title="<?php echo html($pages->find('scribbles/feed')->title()) ?>" />

  <?php echo css('assets/styles/styles.css') ?>

</head>

<body>

  <header>
    <a href="<?php echo url('scribbles') ?>" class="avatar"></a>
    <h1 class="phrase animate hidden"></h1>
    <div class="clearfix"></div>
  </header>