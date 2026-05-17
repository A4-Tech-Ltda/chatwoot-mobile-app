# Plano: Conversa com Agente Mobile

## Objetivo

Criar e manter um app mobile proprio do Conversa com Agente a partir do fork oficial `chatwoot/chatwoot-mobile-app`, com o mesmo rebranding ja aplicado no fork web `A4-Tech-Ltda/chatwoot-conversa` e conectado por default ao Chatwoot de producao em `chat.conversacomagente.com.br`.

O fork ja foi criado em:

- GitHub: `https://github.com/A4-Tech-Ltda/chatwoot-mobile-app`
- Local: `/Users/arthurmotelevicz/Projects/chatwoot-mobile-app`
- Branch default: `develop`
- Upstream: `git@github.com:chatwoot/chatwoot-mobile-app.git`

## Estado inicial observado

- App Expo/React Native, pacote `@chatwoot/mobile-app`, versao `4.5.0`.
- Nao ha `ios/` e `android/` versionados; Expo prebuild gera os projetos nativos.
- Identidade atual:
  - nome: `Chatwoot`
  - slug: `chatwoot-mobile`
  - scheme: `chatwootapp`
  - iOS bundle id: `com.chatwoot.app`
  - Android package: `com.chatwoot.app`
  - EAS owner: `chatwoot`
  - base URL default: `https://app.chatwoot.com`
  - Universal/App Links: `app.chatwoot.com`
- Push depende de Firebase Messaging e credenciais por plataforma.
- SSO hoje so aparece quando `installationUrl` contem `app.chatwoot.com`.
- O app salva device push em `/api/v1/notification_subscriptions` do Chatwoot.

## Decisoes propostas

| Area | Valor proposto | Observacao |
| --- | --- | --- |
| Nome publico | `Conversa com Agente` | Igual ao branding do fork web |
| Slug Expo | `conversa-com-agente-mobile` | Pode mudar sem quebrar bundle id |
| iOS bundle id | `br.com.conversacomagente.app` | Precisa existir no Apple Developer |
| Android package | `br.com.conversacomagente.app` | Precisa existir no Google Play |
| Scheme | `conversacomagente` | Usado por SSO callback e deep links |
| Default Chatwoot URL | `chat.conversacomagente.com.br` | Mobile fala com Chatwoot, nao Platform |
| Associated domain | `chat.conversacomagente.com.br` | Precisa AASA/assetlinks no servidor |
| Help URL | `https://conversacomagente.com.br` ou rota de ajuda futura | Pendente produto/suporte |
| EAS owner | A4 Tech / conta Expo propria | Pendente credencial |

## Escopo de implementacao

### 1. Baseline do fork

- Garantir `origin` em `A4-Tech-Ltda/chatwoot-mobile-app`.
- Manter `upstream` para `chatwoot/chatwoot-mobile-app`.
- Documentar o fork e o plano.
- Criar primeiro commit nosso apenas com documentacao.

Verificacao:

- `git remote -v`
- `gh repo view A4-Tech-Ltda/chatwoot-mobile-app`

### 2. Identidade nativa do app

Arquivos:

- `app.config.ts`
- `.env.example`
- `package.json`

Mudancas:

- Trocar `name` para `Conversa com Agente`.
- Trocar default `slug`.
- Trocar `scheme`.
- Trocar `ios.bundleIdentifier`.
- Trocar `android.package`.
- Trocar `owner` para a conta EAS correta quando definida.
- Parametrizar valores via env quando fizer sentido:
  - `EXPO_PUBLIC_APP_NAME`
  - `EXPO_PUBLIC_APP_SCHEME`
  - `EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER`
  - `EXPO_PUBLIC_ANDROID_PACKAGE`
  - `EXPO_PUBLIC_ASSOCIATED_DOMAIN`

Verificacao:

- `npx expo config --type public`
- conferir que nenhum `com.chatwoot.app` ficou em config publica.

### 3. Assets e splash

Arquivos:

- `assets/icon.png`
- `assets/adaptive-icon.png`
- `assets/splash.png`
- `src/assets/images/logo.png`
- `src/assets/local/logo.png`
- `src/svg-icons/common/Chatwoot.tsx`

Fonte inicial:

- `moneyproject/chatwoot/public/brand-assets/logo.svg`
- `moneyproject/chatwoot/public/brand-assets/logo_dark.svg`
- `moneyproject/chatwoot/public/brand-assets/logo_thumbnail.svg`
- favicons e icons do fork web se tiverem resolucao suficiente.

Tarefas:

- Gerar assets mobile nos tamanhos exigidos por Expo/App Store/Play Store.
- Validar contraste em splash branca.
- Trocar logo de login.
- Decidir se o icone `ChatwootIcon` continua apenas como icone tecnico de canal ou vira icone da marca.

Verificacao:

- Inspecao visual no simulador.
- Conferir que app icon e splash aparecem corretos em iOS/Android.

### 4. URL default e login

Arquivos:

- `.env.example`
- `src/store/settings/settingsSlice.ts`
- `src/screens/auth/ConfigURLScreen.tsx`
- `src/screens/auth/LoginScreen.tsx`
- `src/constants/url.js`

Mudancas:

- Default de `EXPO_PUBLIC_CHATWOOT_BASE_URL` para `https://chat.conversacomagente.com.br`.
- Default persistido:
  - `baseUrl`: `chat.conversacomagente.com.br`
  - `installationUrl`: `https://chat.conversacomagente.com.br/`
  - `webSocketUrl`: `wss://chat.conversacomagente.com.br/cable`
- Tela de URL deve sugerir o dominio do Conversa com Agente.
- Texto de login/config deve deixar de sugerir `app.chatwoot.com`.
- Avaliar se a troca de URL deve ficar disponivel para debug ou ser escondida na build de producao.

Verificacao:

- App abre direto apontando para o Chatwoot correto.
- `GET https://chat.conversacomagente.com.br/api` retorna versao suportada.
- WebSocket usa `/cable` no mesmo host.

### 5. Deep links, SSO e links universais

Arquivos:

- `app.config.ts`
- `src/constants/index.ts`
- `src/utils/ssoUtils.ts`
- `src/navigation/index.tsx`
- `src/utils/pushUtils.ts`

Mudancas:

- Trocar `chatwootapp://auth/saml` por `conversacomagente://auth/saml`.
- Trocar parsing hardcoded de `chatwootapp`.
- Trocar associated domain e Android intent host para `chat.conversacomagente.com.br`.
- Atualizar regra de SSO: hoje `showSsoLogin` depende de `app.chatwoot.com`; definir se SSO deve aparecer para `chat.conversacomagente.com.br`.

Dependencia no servidor:

- Servir `/.well-known/apple-app-site-association` em `chat.conversacomagente.com.br`.
- Servir `/.well-known/assetlinks.json` em `chat.conversacomagente.com.br`.
- Ajustar Chatwoot/SSO callback para aceitar o novo scheme se SSO for usado.

Verificacao:

- Abrir conversa por push/deep link.
- Abrir callback SSO pelo scheme novo.
- Validar Universal Links/App Links em device real.

### 6. Textos e i18n

Arquivos prioritarios:

- `src/i18n/en.json`
- `src/i18n/pt_BR.json`
- `src/i18n/pt.json`
- `README.md`
- `SECURITY.md`, se tiver texto publico da marca.

Mudancas:

- Trocar mencoes visiveis de `Chatwoot` por `Conversa com Agente`.
- Trocar copy de URL default.
- Trocar mensagens de erro que dizem `Chatwoot Server`.
- Manter termos tecnicos invisiveis ou dependencias `@chatwoot/*`.
- Decidir se os outros idiomas serao mantidos upstream ou rebrandados progressivamente. Recomendacao inicial: `en`, `pt_BR`, `pt`; demais idiomas podem ficar como fallback ate haver revisao.

Verificacao:

- `rg "Chatwoot|app.chatwoot.com" src/i18n/en.json src/i18n/pt_BR.json src/i18n/pt.json README.md`

### 7. Push notifications

Arquivos:

- `app.config.ts`
- `.env.example`
- Firebase config files referenciados por:
  - `EXPO_PUBLIC_IOS_GOOGLE_SERVICES_FILE`
  - `EXPO_PUBLIC_ANDROID_GOOGLE_SERVICES_FILE`

Tarefas:

- Criar projeto Firebase proprio para o app do Conversa com Agente.
- Registrar Android package `br.com.conversacomagente.app`.
- Registrar iOS bundle id `br.com.conversacomagente.app`.
- Gerar `google-services.json` e `GoogleService-Info.plist`.
- Configurar APNs no Firebase.
- Confirmar se o servidor Chatwoot precisa de novas credenciais FCM/APNs para entregar push ao novo app.

Verificacao:

- Login registra device em `notification_subscriptions`.
- Push chega em Android e iOS.
- Tocar no push abre a conversa correta.

### 8. Compatibilidade com o fork web

Checagens contra `A4-Tech-Ltda/chatwoot-conversa`:

- `/api` exposto e retorna versao >= `EXPO_PUBLIC_MINIMUM_CHATWOOT_VERSION`.
- `/api/v1/profile`, `/api/v1/accounts`, `/api/v1/notification_subscriptions` compativeis.
- ActionCable em `/cable` acessivel via `wss://chat.conversacomagente.com.br/cable`.
- Upload de anexos e audio funciona com limites do Nginx/Chatwoot.
- Labels single-select do fork web continuam se comportando bem no mobile.
- Campanhas WhatsApp nao precisam aparecer no app mobile neste primeiro ciclo.

### 9. Build, distribuicao e stores

Tarefas externas:

- Criar app no Apple Developer.
- Criar app no App Store Connect.
- Criar app no Google Play Console.
- Definir conta Expo/EAS e `EXPO_PUBLIC_PROJECT_ID`.
- Configurar Sentry proprio.
- Criar screenshots e metadata das lojas.
- Definir politica de privacidade e termos apontando para as paginas da Platform.

Verificacao:

- `eas build -p android --profile production`
- `eas build -p ios --profile production`
- Internal testing no Google Play.
- TestFlight no iOS.

### 10. QA minimo para primeira versao

Fluxos obrigatorios:

- Primeiro boot com splash e icone corretos.
- Login no `chat.conversacomagente.com.br`.
- Troca de URL, se continuar habilitada.
- Lista de conversas.
- Filtro por status/inbox/assignee.
- Abrir conversa.
- Enviar texto.
- Enviar anexo/imagem.
- Enviar audio.
- Nota privada.
- Alterar status da conversa.
- Atribuir agente/time.
- Labels de conversa.
- Push notification.
- Deep link de conversa.
- Logout/login.

## Riscos principais

- Push e deep links dependem de credenciais e arquivos de associacao fora do app.
- Trocar bundle id/package cria um app totalmente novo nas lojas; nao e update do app oficial Chatwoot.
- SSO esta acoplado a `app.chatwoot.com` no codigo atual.
- Rebrand completo em todos os idiomas aumenta muito o delta contra upstream; melhor fazer `pt_BR`, `pt` e `en` primeiro.
- Alterar demais nomes internos `Chatwoot*` aumenta conflito de rebase sem ganho para usuario.
- O fork web tem customizacoes de labels e campanhas; mobile precisa validar impacto, mas nao precisa portar UI de campanhas no primeiro ciclo.

## Ordem recomendada

1. Commit de documentacao do fork.
2. Rebrand de config nativa + env.
3. Assets mobile.
4. Default URL + login/config copy.
5. Deep links + SSO scheme.
6. i18n prioritaria.
7. Firebase/push.
8. QA contra `chat.conversacomagente.com.br`.
9. Builds internas.
10. Preparacao de lojas.

