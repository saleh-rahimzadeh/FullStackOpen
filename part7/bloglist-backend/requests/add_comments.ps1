$blog_id = Read-Host "Blog ID"
$text = Read-Host "Text"
$json = @"
{
"text": "$text"
}
"@
irm http://localhost:3003/api/blogs/$blog_id/comments -Body $json -Method Post -ContentType 'application/json'
