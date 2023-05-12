from utils.fetchConfig import fetchConfig
import requests, os, json, time, subprocess
host = fetchConfig()['host']

#watch if chat is open
def changeState(state):
    file = open('./state.txt', 'w')
    file.write(str(state))
    file.close()


changeState(0)

def main(token, username):
    os.system('cls')
    

    while True:
        print('Logged In as {}\n'.format(username))
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
            else:
                chat = chats[chatNum-1]
                useChat(chat,username)

def useChat(chat, username):
    changeState(1)
    subprocess.call('start py listen.py {token} {chatId}'.format(token=token, chatId=chat['id']), shell=True)
    while True:
        os.system('cls')
        print('Chat - {}'.format(chat['name']))
        print('Empty Message To Leave')
        message = input('{}> '.format(username))

        if message == '':
            os.system('cls')
            break

        res = requests.post('{host}/chat/{chatId}'.format(host=host, chatId=chat['id']), json={'token': token, 'message': message})

    changeState(0)


def login():
    global token
    global username

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