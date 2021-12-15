<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>{{ .Meta.Title }}</title>
    <meta name="description" content="{{ .Meta.Desc }}" />

    <meta property="og:title" content="{{ .Meta.Title }}" />
    <meta property="og:description" content="{{ .Meta.Desc }}" />
    <meta property="og:url" content="{{ .Meta.URL }}" />
    <meta property="og:image" content="{{ .Meta.Image }}" />

    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:site" content="{{ .Meta.TwitterName }}">
    <meta property="twitter:title" content="{{ .Meta.Title }}">
    <meta property="twitter:description" content="{{ .Meta.Desc }}">
    <meta property="twitter:image" content="{{ .Meta.Image }}">

    <link rel="icon" href="{{ .Meta.Favicon }}">
    <link href="/assets/css/app.css" rel="stylesheet" />
  </head>
  <body>
    {{ template "header" . }}

    <main>
      {{ template "main" . }}
    </main>

    {{ template "footer" . }}
    <script type="text/javascript" src="/assets/js/app.js"></script>
  </body>
</html>
