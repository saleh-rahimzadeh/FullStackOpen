$json = @'
{
"daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
"target": 2.5
}
'@
irm http://localhost:3003/exercises -Body $json -Method Post -ContentType 'application/json'
