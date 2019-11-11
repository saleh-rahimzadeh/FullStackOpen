$json = @'
{
"username" : "user1",
"name"     : "User Test 1",
"password" : "u123"
}
'@
irm http://localhost:3003/api/users -Body $json -Method Post -ContentType 'application/json'