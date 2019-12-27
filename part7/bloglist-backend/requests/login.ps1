$json = @'
{
"username": "user1",
"password": "u11"
}
'@
irm http://localhost:3003/api/login -Body $json -Method Post -ContentType 'application/json'
