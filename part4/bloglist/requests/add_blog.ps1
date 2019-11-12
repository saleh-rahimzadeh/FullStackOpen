$json = @'
{
"title": "Title 1",
"author": "Author 1",
"url": "https://www.blog-1.com",
"likes": 1
}
'@
$sectoken = Read-Host "Enter Authorization Token" -AsSecureString
<#$sectoken = ConvertTo-SecureString -String '<TOKEN_STRING>' -AsPlainText -Force#>
irm http://localhost:3003/api/blogs -AllowUnencryptedAuthentication -Body $json -Method Post -ContentType 'application/json' -Authentication Bearer -Token $sectoken