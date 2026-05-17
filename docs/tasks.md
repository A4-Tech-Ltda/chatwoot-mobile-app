# Tasks do Fork Mobile

## MOB-00 - Baseline do fork

Status: concluido

- [x] Criar fork `A4-Tech-Ltda/chatwoot-mobile-app`.
- [x] Clonar em `/Users/arthurmotelevicz/Projects/chatwoot-mobile-app`.
- [x] Confirmar `origin` e `upstream`.
- [x] Mapear stack, manifestos e pontos de rebrand.
- [x] Criar documentacao inicial do fork.
- [x] Commitar e publicar documentacao inicial.

## MOB-01 - Identidade nativa

Status: em validacao

- [x] Definir/confirmar nome publico final.
- [x] Definir/confirmar bundle id iOS.
- [x] Definir/confirmar package Android.
- [x] Definir/confirmar scheme.
- [x] Atualizar `app.config.ts`.
- [x] Atualizar `.env.example`.
- [x] Rodar `npx expo config --type public`.

## MOB-02 - Assets

Status: em validacao

- [x] Levantar arquivos de marca do fork web.
- [x] Gerar `assets/icon.png`.
- [x] Gerar `assets/adaptive-icon.png`.
- [x] Gerar `assets/splash.png`.
- [x] Atualizar logos em `src/assets/images/` e `src/assets/local/`.
- [ ] Validar visual em iOS e Android.

## MOB-03 - URL default e login

Status: em validacao

- [x] Apontar default para `chat.conversacomagente.com.br`.
- [x] Atualizar `settingsSlice`.
- [x] Atualizar `ConfigURLScreen`.
- [x] Atualizar `LoginScreen`.
- [x] Remover copy que sugere `app.chatwoot.com`.
- [x] Validar `/api` e `/cable`.

## MOB-04 - Deep links e SSO

Status: em validacao

- [x] Trocar scheme `chatwootapp` por `conversacomagente`.
- [x] Atualizar `SSO_CALLBACK_URL`.
- [x] Atualizar parsing em `ssoUtils` e `navigation`.
- [x] Atualizar associated domains e Android intent filters.
- [x] Documentar AASA e assetlinks no host Chatwoot.
- [ ] Criar/instalar AASA e assetlinks no host Chatwoot.
- [ ] Validar abertura de conversa por link/push.

## MOB-05 - Textos e i18n

Status: em validacao

- [x] Rebrand em `src/i18n/pt_BR.json`.
- [x] Rebrand em `src/i18n/pt.json`.
- [x] Rebrand em `src/i18n/en.json`.
- [x] Atualizar README publico do fork.
- [x] Rodar busca por strings visiveis restantes.

## Validacoes executadas

- `pnpm exec expo config --type public`: manifesto gerado com `Conversa com Agente`, `br.com.conversacomagente.app`, `conversacomagente` e `chat.conversacomagente.com.br`.
- `pnpm exec eslint` nos arquivos tocados de TS/TSX: ok.
- `node` parseando todos os `src/i18n/*.json`: ok.
- `git diff --check`: ok.
- `GET https://chat.conversacomagente.com.br/api`: HTTP 200, versao `4.9.1`; observacao: `data_services` retornou `failing`.
- WebSocket `https://chat.conversacomagente.com.br/cable` com upgrade: HTTP 101 e mensagens `welcome`/`ping`.

## Observacoes

- `pnpm lint` global ainda falha por erros preexistentes de Prettier/ESLint fora do escopo desta mudanca.
- `pnpm exec prettier --write` nao aceita `.env.example` sem parser explicito; o arquivo foi mantido manualmente.

## MOB-06 - Push notifications

Status: pendente

- [ ] Criar projeto Firebase do Conversa com Agente.
- [ ] Registrar Android package.
- [ ] Registrar iOS bundle id.
- [ ] Adicionar arquivos Firebase via env/secret, sem commitar credenciais sensiveis.
- [ ] Confirmar configuracao server-side do Chatwoot para push.
- [ ] Testar push em device real.

## MOB-07 - Store readiness

Status: pendente

- [ ] Definir conta Expo/EAS.
- [ ] Criar apps Apple/Google.
- [ ] Definir Sentry.
- [ ] Criar metadata de loja.
- [ ] Criar screenshots.
- [ ] Preparar politica de privacidade/termos.

## MOB-08 - QA primeira versao

Status: pendente

- [ ] Login.
- [ ] Conversas.
- [ ] Mensagens.
- [ ] Anexos.
- [ ] Audio.
- [ ] Notas privadas.
- [ ] Status/assignee/team.
- [ ] Labels.
- [ ] Push.
- [ ] Deep links.
- [ ] Logout/login.
