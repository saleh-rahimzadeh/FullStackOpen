$json = @'
{
"name": 123,
"dateOfBirth": "1985-08-15",
"ssn": "8508-015X",
"gender": "male",
"occupation": "Software Developer"
}
'@
irm http://localhost:3001/api/patients -Body $json -Method Post -ContentType 'application/json'
