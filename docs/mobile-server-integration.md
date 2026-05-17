# Integracao Mobile com Servidor

Este documento lista os pontos fora do app que precisam existir para o Conversa com Agente Mobile funcionar como app nativo proprio.

## Dominio principal

O app aponta por default para:

```text
https://chat.conversacomagente.com.br
wss://chat.conversacomagente.com.br/cable
```

O servidor precisa expor os endpoints usados pelo app oficial:

- `GET /api`
- `GET /api/v1/profile`
- `GET /api/v1/accounts`
- `POST /api/v1/notification_subscriptions`
- ActionCable em `/cable`

## Universal Links iOS

O dominio `chat.conversacomagente.com.br` precisa servir:

```text
https://chat.conversacomagente.com.br/.well-known/apple-app-site-association
```

Modelo esperado, preenchendo `APPLE_TEAM_ID` quando a conta Apple estiver definida:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appIDs": ["APPLE_TEAM_ID.br.com.conversacomagente.app"],
        "components": [
          {
            "/": "/app/accounts/*/conversations/*"
          }
        ]
      }
    ]
  }
}
```

Requisitos:

- Responder com `Content-Type: application/json` ou `application/pkcs7-mime`.
- Nao redirecionar.
- Servir via HTTPS valido.

## App Links Android

O mesmo dominio precisa servir:

```text
https://chat.conversacomagente.com.br/.well-known/assetlinks.json
```

Modelo esperado, preenchendo o fingerprint SHA-256 da assinatura usada no build Android:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "br.com.conversacomagente.app",
      "sha256_cert_fingerprints": ["ANDROID_SHA256_CERT_FINGERPRINT"]
    }
  }
]
```

## SSO

O callback nativo do app e:

```text
conversacomagente://auth/saml
```

Se SSO for usado, o servidor/IdP precisa aceitar esse callback alem dos callbacks web atuais.

## Push

O app usa Firebase Messaging. Para o app proprio ser independente do app oficial, precisamos:

- Criar ou confirmar projeto Firebase do Conversa com Agente.
- Registrar Android package `br.com.conversacomagente.app`.
- Registrar iOS bundle id `br.com.conversacomagente.app`.
- Gerar `google-services.json` e `GoogleService-Info.plist`.
- Configurar APNs no Firebase.
- Confirmar no servidor Chatwoot quais credenciais FCM/APNs serao usadas para enviar push ao novo app.

Nao commitar arquivos de credenciais sensiveis sem revisao. Preferir EAS secrets ou arquivos locais referenciados por env.
