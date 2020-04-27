$json = @'
{
"name": "Saleh Rahimzadeh",
"dateOfBirth": "1985-15-08",
"ssn": "8508-015X",
"gender": "male",
"occupation": "Software Developer"
}
'@
irm http://localhost:3001/api/patients -Body $json -Method Post -ContentType 'application/json'
