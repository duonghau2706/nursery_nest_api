const templateLayoutPrimary = (content, style) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  ${style}
</head>

<body>
  ${content}
</body>
</html>
`

export { templateLayoutPrimary }
