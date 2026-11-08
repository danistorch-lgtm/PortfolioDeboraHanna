# Portfólio Débora Hanna Storch

Site portfólio (PT/EN) de eventos corporativos, de incentivo e internacionais.

## Estrutura
- `source/public/` — site publicado na Vercel (HTML estático + fotos em `img/`). A Vercel usa `source/` como raiz (ver `source/vercel.json`: sem build).
- `codigo-fonte/` — código-fonte em React + TypeScript + Tailwind. Conteúdo dos cases em `codigo-fonte/src/data.ts`.

## Como atualizar
1. Editar `codigo-fonte/src/data.ts` (cases, trajetória, depoimentos) ou `codigo-fonte/src/App.tsx`.
2. Gerar o HTML único (bundle) e substituir o conteúdo de `source/public/index.html`.
3. Fazer commit no `main`: a Vercel publica automaticamente.

## Pendências antes de divulgar
- Autorizações: vídeo do Rabobank, nomes de clientes de incentivo, depoimentos, colega na foto do Prêmio Caio.
- Confirmar "+100 eventos" e "7 países".
- Formulário: hoje abre o e-mail do visitante; ideal conectar a um serviço de formulário (ex.: Formspree).
