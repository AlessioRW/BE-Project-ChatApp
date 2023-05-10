from utils.fetchConfig import fetchConfig
import requests, os, json, time
host = fetchConfig()['host']


def main(token, username):
    os.system('cls')
    print('Logged In as {}\n'.format(username))

    while True:
        res = requests.get('{host}/user/chats'.format(host=host), json={'token': token})
        chats = json.loads(res.text)['chats']
        if len(chats) > 0:
            for i,chat  in enumerate(chats):
                print('{index}: {chat}'.format(index=i+1,chat=chat['name']))
        else:
            print('You are not in any chats')
        chatNum = int(input('Enter a chat (0 to create new): '))

        if chatNum == 0:
            members = [username]
            chatName = input('Chat Name: ')
            while True:
                newUser = input('\nEnter a user you want to add (Case sensitive, Enter to finish): ')
                if newUser == '':
                    break
                else:
                    members.append(newUser)
            requests.post('{host}/chat/new'.format(host=host), json={'token': token, 'members': members, 'name': chatName})

        else:
            if chatNum > len(chats): #chat does not exist
                print('Invalid Input')
                time.sleep(1.5)
                os.system('cls')
                print
            else:
                chat = chats[chatNum-1]
    return


def login():
    token = ''
    username = ''
    if token == '': #logged in
        os.system('cls')
        mode = input('Login(L)/Register(R): ')
        os.system('cls')
        if 'l' in mode.lower(): #logging in
            while True:
                print('Login')
                usernameInput = input('Username: ')
                passwordInput = input('Password: ')
                res = requests.post('{host}/user/login'.format(host=host), json={'username':usernameInput, 'password':passwordInput})
                if res.status_code == 200:
                    username = usernameInput
                    token = res.text
                    break
                else:
                    os.system('cls')
                    obj = json.loads(res.text)
                    print(obj['message'])
        else:
            while True:
                print('\nRegister')
                usernameInput = input('Username: ')
                passwordInput = input('Password: ')
                passwordConfirm = input('Confirm Password: ')
                if passwordInput != passwordConfirm:
                    print('Passwords do not match')
                    continue
                res = requests.post('{host}/user/register'.format(host=host), json={'username':usernameInput, 'password':passwordInput})
                if res.status_code == 200:
                    username = usernameInput
                    token = res.text
                    
                    break
                else:
                    os.system('cls')
                    obj = json.loads(res.text)
                    print(obj['message'])
        main(token=token, username=username)

login()