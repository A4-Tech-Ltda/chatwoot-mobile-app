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

Status: pendente

- [ ] Definir/confirmar nome publico final.
- [ ] Definir/confirmar bundle id iOS.
- [ ] Definir/confirmar package Android.
- [ ] Definir/confirmar scheme.
- [ ] Atualizar `app.config.ts`.
- [ ] Atualizar `.env.example`.
- [ ] Rodar `npx expo config --type public`.

## MOB-02 - Assets

Status: pendente

- [ ] Levantar arquivos de marca do fork web.
- [ ] Gerar `assets/icon.png`.
- [ ] Gerar `assets/adaptive-icon.png`.
- [ ] Gerar `assets/splash.png`.
- [ ] Atualizar logos em `src/assets/images/` e `src/assets/local/`.
- [ ] Validar visual em iOS e Android.

## MOB-03 - URL default e login

Status: pendente

- [ ] Apontar default para `chat.conversacomagente.com.br`.
- [ ] Atualizar `settingsSlice`.
- [ ] Atualizar `ConfigURLScreen`.
- [ ] Atualizar `LoginScreen`.
- [ ] Remover copy que sugere `app.chatwoot.com`.
- [ ] Validar `/api` e `/cable`.

## MOB-04 - Deep links e SSO

Status: pendente

- [ ] Trocar scheme `chatwootapp` por `conversacomagente`.
- [ ] Atualizar `SSO_CALLBACK_URL`.
- [ ] Atualizar parsing em `ssoUtils` e `navigation`.
- [ ] Atualizar associated domains e Android intent filters.
- [ ] Criar/instalar AASA e assetlinks no host Chatwoot.
- [ ] Validar abertura de conversa por link/push.

## MOB-05 - Textos e i18n

Status: pendente

- [ ] Rebrand em `src/i18n/pt_BR.json`.
- [ ] Rebrand em `src/i18n/pt.json`.
- [ ] Rebrand em `src/i18n/en.json`.
- [ ] Atualizar README publico do fork.
- [ ] Rodar busca por strings visiveis restantes.

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
