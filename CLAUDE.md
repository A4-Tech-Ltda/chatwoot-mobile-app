# Conversa com Agente Mobile Fork

Este repositorio e o fork mobile do Chatwoot para o Conversa com Agente.

## Repositorios

- Fork mobile: `A4-Tech-Ltda/chatwoot-mobile-app`
- Upstream mobile: `chatwoot/chatwoot-mobile-app`
- Fork web Chatwoot: `A4-Tech-Ltda/chatwoot-conversa`
- Projeto principal local: `/Users/arthurmotelevicz/Projects/moneyproject`

## Stack

- React Native `0.76.9`
- Expo `~52.0.46`
- TypeScript
- Redux Toolkit + redux-persist
- EAS Build/Submit
- Firebase Messaging + Notifee
- Sentry
- pnpm `10.11.0`

O app esta em modo Expo gerenciado. `ios/` e `android/` nao ficam versionados no baseline atual; eles sao gerados via `pnpm generate` / `expo prebuild`.

## Principio deste fork

Manter o menor delta possivel contra o upstream oficial e concentrar o que for nosso em:

- identidade nativa do app;
- assets;
- default de URL/domino;
- deep links;
- push notification credentials;
- textos visiveis ao usuario;
- documentacao operacional.

Nao renomear pacotes tecnicos `@chatwoot/*` nem nomes internos de API quando isso so aumenta o custo de rebase e nao aparece para o usuario.

## Identidade alvo proposta

- App display name: `Conversa com Agente`
- Expo slug: `conversa-com-agente-mobile`
- URL default do Chatwoot: `chat.conversacomagente.com.br`
- iOS bundle identifier: `br.com.conversacomagente.app`
- Android package: `br.com.conversacomagente.app`
- URL scheme: `conversacomagente`
- Universal/App Links host: `chat.conversacomagente.com.br`
- EAS owner: pendente confirmar conta/organizacao Expo da A4 Tech

Se alguma dessas decisoes mudar, atualize este arquivo e `docs/conversacomagente-mobile-plan.md` antes de implementar.

## Arquivos sensiveis para rebrand

- `app.config.ts`
- `.env.example`
- `package.json`
- `assets/icon.png`
- `assets/adaptive-icon.png`
- `assets/splash.png`
- `src/assets/images/logo.png`
- `src/assets/local/logo.png`
- `src/store/settings/settingsSlice.ts`
- `src/screens/auth/ConfigURLScreen.tsx`
- `src/screens/auth/LoginScreen.tsx`
- `src/constants/index.ts`
- `src/constants/url.js`
- `src/utils/ssoUtils.ts`
- `src/navigation/index.tsx`
- `src/i18n/en.json`
- `src/i18n/pt_BR.json`
- `README.md`
- store metadata fora do repo, quando houver

## Comandos

Nao rode comandos de projeto sem necessidade. Quando for validar:

```bash
pnpm install
pnpm lint
pnpm test
pnpm run:doctor
npx expo config --type public
```

Builds locais e submits exigem credenciais:

```bash
pnpm build:android:local
pnpm build:ios:local
pnpm submit:android
pnpm submit:ios
```

## Rebase upstream

O remote `upstream` aponta para `git@github.com:chatwoot/chatwoot-mobile-app.git`.

Fluxo recomendado:

```bash
git fetch upstream
git checkout develop
git checkout -b rebase/upstream-YYYYMMDD
git rebase upstream/develop
pnpm install
pnpm lint
pnpm test
```

Depois de resolver conflitos, comparar especificamente os arquivos listados em "Arquivos sensiveis para rebrand".

