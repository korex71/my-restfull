<h1 align="center">
  Restfull API
</h1>

## Focus

So the objective of this REPOSITORY is to share my current API architecture and the way I found to create a better structure, applying design patterns and clean code.

## Routes

1. Normal

- POST ['/auth/signup']
- POST ['/auth/forgot_password/TOKEN'] -> Redirected by frontend with body {newPassword} + token param.
- POST ['/auth/signin'] -> Get token with credentials.
- POST ['/user'] -> With Bearer token prefix "authorization".

2. Test

- DELETE ['/auth/user/username']
- GET ['/auth/users']
- GET ['/auth/user/x'] -> X = Username || Email

### Features

- [x] User registration
- [x] JWT authentication
- [x] Rota com middleware verificando JWT
- [x] 2 Factors authentication (Google auth)
- [x] Send email after registration
- [x] Password recovery route by email
- [ ] 2FA password recovery
- [ ] Good security practices with Helmet, TLS
- [ ] Limit IP login failures to a short time / Prevent brute force

### Ideas

1. Fail2ban
2. 2FA Login
3. Integrar com IOT ~ <Arduino>
4. Arch: Monolithic -> Microsservices
5. Desktop Electron app, Web React, Mobile React Native -> Automações casa IOT

```bash
# Clone este repositório <Necessita MongoDB>
$ git clone <https://github.com/korex71/my-restfull>

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:start

# O servidor inciará na porta:4444 por padrão
```

<h4 align="center"> 
	🚧 Em construção... 🚧
</h4>
