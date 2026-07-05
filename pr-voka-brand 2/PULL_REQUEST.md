# PR: Rebranding VÖKA — sistema no O Par + tagline "Moda Streetwear Importada"

> Cole este texto na descrição do Pull Request no GitHub.

Alinha todo o repositório ao design system atual da marca: paleta monocromática quente, tipografia oficial (Outfit / DM Sans / DM Mono), símbolo **O Par** como mark único e nova tagline **"Moda Streetwear Importada"** (voz editorial: *"Menos peças, mais intenção"*).

## Arquivos alterados

**`index.html`** — landing page reconstruída no sistema
- Fontes oficiais Outfit / DM Sans / DM Mono (antes: Libre Baskerville + Work Sans)
- Removido o dourado `#C9A961` — paleta agora 100% monocromática quente
- Símbolo O Par na nav, hero, watermark, CTA e footer + favicon
- Nova seção-manifesto **"O Par"** explicando o símbolo e o conceito de *importada = curadoria*
- Tagline "Moda Streetwear Importada" no hero, footer e SEO (title/description)
- Preservados: links WhatsApp, pixels (Meta/GA/TikTok), swatches, size selector, observers

**`brand-identity/logos/`** — mark unificado no O Par (aposenta o monograma "VO")
- `voka-logo-black.svg` / `voka-logo-white.svg` — lockup símbolo + VÖKA
- `voka-monogram.svg` — ícone O Par sobre quadrado charcoal (era o texto "VO")
- `voka-symbol-black.svg` / `voka-symbol-white.svg` — **novos**, símbolo isolado
- `*-300dpi.png` — versões raster regeradas (lockup transparente em Outfit; monograma)

**`README.md`** — tagline, símbolo, paleta completa e estrutura de pastas corrigida (a landing vive na raiz, não em `landing-page/`)

**`products/README.md`** — conflito de preço/nome resolvido: "Signature 320g R$109" → **VÖKA Heavy 320g R$129**, alinhado à landing; tabela de catálogo como fonte única

## Pendências (fora deste PR)
- TikTok pixel ainda com `YOUR_TIKTOK_PIXEL_ID` — trocar por ID real
- Tratar fotos do Superbuy (remover texto chinês, padronizar fundo)
- Aplicar o sistema nos perfis sociais (Instagram/WhatsApp/Mercado Livre)

## Como aplicar
Extraia o conteúdo por cima da raiz do repositório (mantém os mesmos caminhos) e faça 1 commit.
