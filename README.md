# 🥑 Meu Abacate — Site

Site de histórias românticas. Feito com Next.js, deploy no Vercel.

---

## 🚀 Como colocar no ar (15 minutos)

### 1. Personalize os dados

Abra `pages/index.js` e edite as 2 linhas no topo:

```js
const COUPLE_PHOTO = 'https://i.imgur.com/SUA_FOTO.jpg'; // foto de vocês
const ANNIVERSARY  = '2024-01-15';                        // data do namoro
```

**Como colocar a foto:**
1. Acesse https://imgur.com
2. Faça upload da foto de vocês
3. Clique com botão direito → "Copiar endereço da imagem"
4. Cole no lugar de `https://i.imgur.com/SUA_FOTO.jpg`

---

### 2. Configure o GitHub para as histórias

Abra `lib/github.js` e coloque seu usuário:

```js
const GITHUB_USER = 'seu-usuario';      // ← mude aqui
const GITHUB_REPO = 'abacate-historias';
```

Crie um repositório **público** no GitHub chamado `abacate-historias` com esta estrutura:

```
abacate-historias/
├── index.json              ← lista de histórias
├── nossa-historia/
│   ├── texto.md            ← texto em Markdown
│   └── capa.jpg            ← foto de capa (opcional)
└── outra-historia/
    └── texto.md
```

**index.json:**
```json
[
  {
    "id": "nossa-historia",
    "titulo": "Como tudo começou",
    "descricao": "A história do dia em que eu soube que você era especial.",
    "data": "2024-01-15",
    "capa": "nossa-historia/capa.jpg"
  }
]
```

---

### 3. Suba para o GitHub

Crie um repositório (pode ser privado) para o **código do site** e faça o push:

```bash
git init
git add .
git commit -m "primeiro commit"
git remote add origin https://github.com/seu-usuario/abacate-web.git
git push -u origin main
```

---

### 4. Deploy no Vercel

1. Acesse https://vercel.com e faça login com o GitHub
2. Clique em **"New Project"**
3. Selecione o repositório `abacate-web`
4. Clique em **"Deploy"** — pronto!

O Vercel gera uma URL tipo `abacate-web.vercel.app`.
Você pode adicionar um domínio personalizado depois nas configurações.

---

## ✍️ Como publicar novas histórias

1. Crie uma pasta nova no repositório `abacate-historias`
2. Adicione `texto.md` (e opcionalmente `capa.jpg`)
3. Adicione uma entrada no `index.json`
4. Faça commit — o site atualiza automaticamente em ~1 minuto

---

## 📝 Markdown rápido

```markdown
# Título grande
## Subtítulo

Parágrafo normal aqui.

> Citação em destaque (fundo rosado)

**negrito** e *itálico*

---

![foto](nome-do-arquivo.jpg)
```
