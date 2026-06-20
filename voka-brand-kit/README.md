# VÖKA — Brand Kit (identidade "O Par")

> **Vista o par.**

Nova identidade visual da VÖKA, construída sobre o símbolo **O Par** — os dois pontos do Ö (um cheio, um vazado) como assinatura proprietária, monocromática e atemporal. Substitui a direção anterior (monograma VO).

Todos os arquivos são **HTML estáticos** e abrem direto no navegador. Os caminhos são relativos — mantenha esta pasta intacta.

## Por onde começar

Abra **`VOKA Brand Kit.html`** — é o índice que linka todos os entregáveis.

## Estrutura

```
voka-brand-kit/
├── VOKA Brand Kit.html        # Índice / hub — comece por aqui
├── VOKA Brand Guide.html      # Guia de marca completo (com Tweaks)
├── VOKA Sell Sheets.html      # One-pagers de produto (1080×1350) — slots de foto
├── VOKA Social Kit.html       # Feed 1080² + Stories 1080×1920 — slots de foto
├── VOKA Tech Packs.html       # Fichas técnicas bilíngues (PT/EN) p/ fábrica — botão PDF
├── VOKA Garment Mockups.html  # Prancha de revisão interativa (cor, marca, frente/costas)
├── VOKA Size Guide.html       # Tabela + "Encontre seu tamanho" (feature de e-commerce)
├── VOKA Firefly Kit.html      # Guia + prompts p/ gerar fotos com IA (Adobe Firefly)
├── garments.js                # Render das peças (usado pelo Garment Mockups)
├── image-slot.js              # Componente de slot de imagem (Sell Sheets / Social Kit)
├── tweaks-panel.jsx           # Painel de Tweaks (Brand Guide)
├── brand-assets/              # Símbolo em alta (PNG 2000px, transparente) p/ overlay
│   ├── voka-par-charcoal.png
│   ├── voka-par-offwhite.png
│   ├── voka-par-black.png
│   ├── voka-lockup-charcoal.png
│   └── voka-lockup-offwhite.png
└── explorations/              # Processo: 12 logos → finalistas → O Par escolhido
```

## Identidade

| Item | Valor |
|------|-------|
| Nome | VÖKA |
| Símbolo | O Par (dois pontos do Ö: um cheio, um vazado) |
| Tagline | Vista o par. |
| Tipografia display | Outfit (200–500) |
| Tipografia texto | DM Sans (300–400) |
| Tipografia detalhe | DM Mono (preços, códigos) |
| Paleta | Monocromática quente — Black #0A0A0A · Charcoal #2D2926 · Stone #8C8579 · Sand #C4B5A2 · Cream #E8E0D6 · Off-white #F5F0EB |
| Uso da marca na peça | Só símbolo (bordado, tom-sobre-tom ou contraste). Nome aparece em etiqueta/hang tag |

## Linha de produtos (FW26)

Moletom Essential · Camiseta Core · Manga Longa · Calça Utility · Shorts Court · Meias Par — 100% algodão premium. Posições de marca e medidas em `VOKA Tech Packs.html`.

## Fluxo de imagens com IA (Firefly)

1. Gere a **peça lisa** com o prompt em `VOKA Firefly Kit.html`.
2. Sobreponha o símbolo de `brand-assets/` na posição do tech pack.
3. Use os slots de imagem nos Sell Sheets / Social Kit.

---

*Identidade "O Par" — substitui a direção anterior (monograma VO / "Wear less. Mean more.").*
