$json = @'
{
"username" : "user1",
"name"     : "User Test One",
"password" : "u11"
}
'@
irm http://localhost:3003/api/users -Body $json -Method Post -ContentType 'application/json'
