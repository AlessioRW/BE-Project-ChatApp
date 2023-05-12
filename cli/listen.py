import os, requests, json, sys
import time as tm

from utils.fetchConfig import fetchConfig
host = fetchConfig()['host']


nMessages = 50
sIndex = 0

def mainListen(chatId, token):
    while True:
        tm.sleep(1)
        os.system('cls')

        if open('./state.txt','r').read() == '0':
            break

        res = requests.get('{host}/chat/{chatId}/{sIndex}/{nMessages}'.format(host=host, chatId=chatId, sIndex=sIndex, nMessages=nMessages), json={'token':token})
        messages = json.loads(res.text)['messages']
        
        for message in messages:
            [date, time, empty] = message['updatedAt'].replace('Z','T').split('T')
            time = time.split('.')[0]
            date = '/'.join(date.split('-')[::-1])
            print('{time} {username}> {message}'.format(username=message['user'], time=date+' '+time, message=message['content']))

token = sys.argv[1]
chatId = int(sys.argv[2])
mainListen(chatId, token)