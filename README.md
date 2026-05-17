# Conversa com Agente Mobile

Fork do app mobile oficial do Chatwoot para o produto Conversa com Agente.

Este repositorio mantem a base Expo/React Native do upstream `chatwoot/chatwoot-mobile-app`, com rebranding, defaults de ambiente e integracoes nativas ajustadas para a instancia `chat.conversacomagente.com.br`.

## Estado do fork

- Upstream: `chatwoot/chatwoot-mobile-app`
- Fork A4: `A4-Tech-Ltda/chatwoot-mobile-app`
- Branch base: `develop`
- App name: `Conversa com Agente`
- iOS bundle id: `br.com.conversacomagente.app`
- Android package: `br.com.conversacomagente.app`
- Scheme: `conversacomagente`
- Default URL: `https://chat.conversacomagente.com.br`

## Documentacao local

- [Plano do fork](docs/conversacomagente-mobile-plan.md)
- [Backlog inicial](docs/tasks.md)
- [Integracao com servidor](docs/mobile-server-integration.md)

## Setup local

```bash
pnpm install --frozen-lockfile
cp .env.example .env
pnpm start
```

Para rodar em device/simulador:

```bash
pnpm run:ios
pnpm run:android
```

## Variaveis importantes

Credenciais sensiveis nao devem ser commitadas. Use `.env` local, secrets do EAS ou o cofre da A4 para valores reais.

- `EXPO_PUBLIC_CHATWOOT_BASE_URL`
- `EXPO_PUBLIC_PROJECT_ID`
- `EXPO_PUBLIC_EAS_OWNER`
- `EXPO_PUBLIC_SENTRY_DSN`
- `EXPO_PUBLIC_SENTRY_PROJECT_NAME`
- `EXPO_PUBLIC_SENTRY_ORG_NAME`
- `EXPO_PUBLIC_IOS_GOOGLE_SERVICES_FILE`
- `EXPO_PUBLIC_ANDROID_GOOGLE_SERVICES_FILE`
- `EXPO_APPLE_ID`
- `EXPO_APPLE_TEAM_ID`

## Builds

Os scripts de build e submit herdados do upstream continuam no `package.json`. Nao rode comandos de submit sem confirmar a conta, o app nativo e a trilha de publicacao.

```bash
pnpm build:android
pnpm build:ios
```

## Licenca

Mantem a licenca MIT do upstream Chatwoot. Consulte [LICENSE](LICENSE).
