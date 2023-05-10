import time, os, requests, json, sys

from utils.fetchConfig import fetchConfig
host = fetchConfig()['host']


nMessages = 50
sIndex = 0

def mainListen(chatId, token):
    while True:
        time.sleep(1)
        os.system('cls')
        res = requests.get('{host}/chat/{chatId}/{sIndex}/{nMessages}'.format(host=host, chatId=chatId, sIndex=sIndex, nMessages=nMessages), json={'token':token})
        messages = json.loads(res.text)['messages']
        
        for message in messages:
            print('{username}{time}> {message}'.format(username=message['user'], time='', message=message['content']))


token = sys.argv[1]
chatId = int(sys.argv[2])
mainListen(chatId, token)