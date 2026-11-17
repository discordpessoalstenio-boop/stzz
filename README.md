# STZZ.DEV — Site oficial

Experiência digital **BLACK + CHROME + 3D + SCROLL CINEMATOGRÁFICO** para a STZZ | Dev de Sites.

Stack: **React 19 + Vite + Tailwind CSS 4 + GSAP/ScrollTrigger + Three.js + Lenis**.

---

## 1. Rodar no seu computador

Pré-requisito: **Node.js 20 ou superior** (baixe em https://nodejs.org).

```bash
# dentro da pasta do projeto
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

Para gerar a versão final e testar como ficará publicada:

```bash
npm run build
npm run preview
```

---

## 2. Configurar contatos (WhatsApp e formulário)

1. Copie o arquivo `.env.example` e renomeie a cópia para `.env`.
2. Preencha:

| Variável | O que é |
|---|---|
| `VITE_WHATSAPP_NUMBER` | Opcional. O número **(31) 98407-6623** já está configurado em `src/config/site.js`; use esta variável só se quiser trocar. |
| `VITE_WHATSAPP_MESSAGE` | Mensagem que já vem escrita quando a pessoa abre o WhatsApp. |
| `VITE_FORM_ENDPOINT` | Opcional. Endpoint que recebe POST em JSON (ex.: Formspree `https://formspree.io/f/SEU_ID`). Vazio = usa **Netlify Forms**. |

> O botão do Instagram já aponta para https://www.instagram.com/stzz.dev/.

### Como o formulário envia
- **Netlify Forms (padrão):** depois do deploy no Netlify, os pedidos aparecem em *Site → Forms → orcamento*. Lá você pode ativar notificação por e-mail. (Durante o `npm run dev` local o envio dá erro, isso é normal — só funciona publicado.)
- **Formspree ou outro serviço:** crie o formulário no serviço, copie o endpoint e coloque em `VITE_FORM_ENDPOINT`.

Campos enviados: `nome`, `contato`, `tipo`, `orcamento`, `descricao` (com proteção anti-spam por honeypot).

---

## 3. Publicar no Netlify

**Opção A — pelo GitHub (recomendado):**
1. Suba esta pasta para um repositório no GitHub.
2. No Netlify: *Add new site → Import an existing project* → escolha o repositório.
3. As configurações já vêm do `netlify.toml` (build `npm run build`, pasta `dist`).
4. Em *Site configuration → Environment variables*, cadastre `VITE_WHATSAPP_NUMBER` (e as outras, se quiser).
5. Clique em *Deploy*. Sempre que você atualizar o GitHub, o site atualiza sozinho.

**Opção B — arrastar e soltar:**
1. Rode `npm run build` no seu computador (com o `.env` preenchido).
2. Acesse https://app.netlify.com/drop e arraste a pasta `dist`.
   *(Nessa opção o Netlify Forms pode não detectar o formulário; prefira a opção A ou use `VITE_FORM_ENDPOINT`.)*

Domínio próprio: *Domain management → Add a domain* no painel do Netlify.

---

## 4. Onde editar cada coisa

| O quê | Arquivo |
|---|---|
| Textos, serviços, diferenciais, etapas, faixas de orçamento | `src/config/site.js` |
| **Projetos do portfólio** | `src/config/site.js` → `projects` |
| Cores, fontes e estilos | `src/styles/index.css` |
| Símbolo S 3D (formato, espessura, material) | `src/three/createSGeometry.js` e `src/three/ChromeScene.js` |
| Posições do S em cada seção | `src/lib/sceneStore.js` → `STATES` |
| Abertura cinematográfica | `src/components/Intro.jsx` |

### Cadastrar um projeto real no portfólio
1. Coloque a captura em `public/projetos/` (ex.: `public/projetos/cliente.webp`, ideal 1600×1000).
2. Em `src/config/site.js`, troque um item de demonstração por:

```js
{
  id: 'cliente',
  demo: false,
  name: 'Nome do Projeto',
  category: 'Landing page',
  description: 'Descrição curta do que foi feito.',
  tags: ['React', 'GSAP'],
  image: '/projetos/cliente.webp',
  url: 'https://site-do-cliente.com',
  variant: 'landing',
}
```

Enquanto `demo: true`, o card mostra o selo **DEMONSTRAÇÃO** e um mini site de exemplo (marca fictícia) que rola quando o mouse passa por cima. Os mini sites ficam em `src/sections/PortfolioMocks.jsx`.

---

## 5. Sobre o símbolo S cromado

O S 3D usa o **contorno real da sua logo**: a silhueta foi extraída da imagem do Instagram (`src/three/sOutline.json`) e transformada em objeto 3D com profundidade e chanfro. O acabamento de cristal cromado (facetas, reflexos e o leve brilho colorido) é feito em código, então lembra a logo, mas não é uma cópia pixel a pixel dos reflexos. O S balança de leve em vez de girar sem parar, para nunca ficar parado de costas (espelhado).

Menu, rodapé e favicon usam a própria imagem da logo (`public/brand/s-logo.png`). Se você tiver a logo em alta resolução (PNG com fundo transparente), substitua esse arquivo para ficar ainda mais nítido.

Sem suporte a WebGL, o site mostra a logo em imagem no lugar do 3D.

## 6. Desempenho e acessibilidade

- Um único canvas WebGL para o site inteiro; o Three.js é carregado sob demanda.
- No celular: menos partículas, resolução limitada, sem antialias extra, e o S se reposiciona.
- A renderização pausa quando a aba fica em segundo plano.
- **Movimento reduzido** (configuração do sistema): sem intro, sem pin e sem animações ligadas ao scroll.
- Navegação por teclado, link "pular para o conteúdo", `Esc` pula a intro e fecha o menu, foco visível, rótulos e mensagens de erro acessíveis no formulário.
- Cursor personalizado, magnetismo e tilt só aparecem em dispositivos com mouse.
