$id = '5dcaf321db145e1a9078b823'
$sectoken = Read-Host "Enter Authorization Token" -AsSecureString
irm http://localhost:3003/api/blogs/$id -Method Delete -AllowUnencryptedAuthentication -Authentication Bearer -Token $sectoken