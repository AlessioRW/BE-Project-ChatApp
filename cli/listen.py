import os, requests, json, sys
from requests.auth import HTTPBasicAuth
import time as tm

from utils.fetchConfig import fetchConfig
host = fetchConfig()['host']


nMessages = 50
sIndex = 0

def mainListen(chatId, token):
    try:
        while True:
            tm.sleep(1)
            os.system('cls')

            if open('./state.txt','r').read() == '0':
                break
            
            
            auth = HTTPBasicAuth('token', token)
            res = requests.get('{host}/chat/{chatId}/{sIndex}/{nMessages}'.format(host=host, chatId=chatId, sIndex=sIndex, nMessages=nMessages), headers={'Authorization': token})

            messages = json.loads(res.text)['messages']
            
            for message in messages:
                [date, time, empty] = message['updatedAt'].replace('Z','T').split('T')
                time = time.split('.')[0]
                date = '/'.join(date.split('-')[::-1])
                print('{time} {username}> {message}'.format(username=message['user'], time=date+' '+time, message=message['content']))

    except Exception as e:
        print(2)
        print(e)
        input() 

token = sys.argv[1]
chatId = int(sys.argv[2])
mainListen(chatId, token)