$json = @'
{
"title": "Title",
"author": "Author",
"url": "https://www.blog.com",
"likes": 1
}
'@
irm http://localhost:3003/api/blogs -Body $json -Method Post -ContentType 'application/json'