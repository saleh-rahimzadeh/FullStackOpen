$json = @'
{
"title": "Title 1",
"author": "Author 1",
"url": "https://www.blog1.com",
"likes": 11
}
'@
$id = '5dc5302e67606d07840d304a'
irm http://localhost:3003/api/blogs/$id -Body $json -Method Put -ContentType 'application/json'