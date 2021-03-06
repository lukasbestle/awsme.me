<!DOCTYPE html>
<html lang="en">
<head>

	<meta charset="utf-8" />
  <title><?php echo html($site->title()) ?> &raquo; <?php echo html($page->title()) ?></title>
  <meta name="description" content="<?php echo html($site->description()) ?>" />
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">

  <script type="text/javascript" src="http://use.typekit.net/lbi2wlw.js"></script>
  <script type="text/javascript">try{Typekit.load();}catch(e){}</script>

  <link rel="shortcut icon" type="image/x-icon" href="assets/images/me.png">
  <link rel="apple-touch-icon" href="assets/images/me.png">

  <link rel="alternate" type="application/rss+xml" href="<?php echo url('feed') ?>" title="The Thought of Timothy, scribbled in pixels." />

  <?php echo css('assets/styles/main.css') ?>

</head>

<body>

  <div class="page-wrapper">

    <header class="animate fadeIn">
      <a href="<?php echo url() ?>" class="avatar"></a>
      <h1 class="phrase animate hidden"></h1>
      <div class="clearfix"></div>
    </header>

    <section class="content">
