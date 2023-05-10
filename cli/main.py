from utils.fetchConfig import fetchConfig
import requests, os, json
host = fetchConfig()['host']


def main(token, username):
    print('Logged In as {}'.format(username))
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