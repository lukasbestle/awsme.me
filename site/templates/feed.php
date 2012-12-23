<?php

$articles = $pages->find('scribbles')->children()->visible()->flip()->limit(10);

snippet('feed', array(
  'link'  => url('scribbles'),
  'items' => $articles,
  'descriptionField'  => 'text',
  'descriptionLength' => 300
));

?>