import json
import os
import requests


users = [
    'EricRosen',
    # 'Chess-Network',
]

for user in users:
    print('Updating cache for user: %s' % user)

    cache = 'cache/%s.ndjson' % user

    with open(cache, 'r') as f:
        first_line = f.readline()
    
    last_saved_game = json.loads(first_line).get('createdAt')

    url = 'https://lichess.org/api/games/user/%s?pgnInJson=true&clocks=true&since=%s' % user % last_saved_game

    headers = {
        'Accept': 'application/x-ndjson',
        'Authorization': 'Bearer ' + os.environ['LICHESS_API_TOKEN']
    }

    # stream the response to a text file
    r = requests.get(url, headers=headers, stream=True)

    with open(cache, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk:
                f.write(chunk)

    print('Done')
