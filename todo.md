# 🐱 Checklist — Easter Egg da Gatinha

## 📌 Fase 1 — Planejamento
- [x] Definir que a gatinha fará parte do site como um Easter Egg
- [x] Definir que ela não deve atrapalhar a navegação
- [x] Definir movimento predominantemente pela página
- [x] Definir aparições ocasionais nas laterais
- [x] Definir possibilidade de a gatinha ficar escondida
- [x] Definir interação por clique
- [x] Definir mensagens após interação
- [x] Definir possibilidade de contador de capturas
- [x] Definir comportamento diferente conforme o número de cliques
- [x] Estados planejados:
  - [x] idle — parada
  - [x] walk — andando
  - [x] run — correndo/fugindo
  - [x] jump — pulando
  - [x] happy — feliz
  - [ ] angry — irritada
  - [ ] sleepy — dormindo
  - [ ] hidden — escondida
  - [ ] special — estado especial

---

## 🎨 Fase 2 — Assets da gatinha
### Sprite principal
- [x] Separar a gatinha da sprite sheet
- [x] Remover completamente o fundo
- [x] Padronizar o tamanho dos sprites
- [x] Padronizar a escala
- [x] Garantir fundo transparente
- [x] Garantir que todos os sprites tenham o mesmo estilo
- [x] Garantir que a paleta combine com a logo

### Animações
- [x] Criar idle
  - [x] Frame 1 (`assets/cat/idle/idle-1.png` - 96x96 padronizado)
  - [x] Frame 2 (`assets/cat/idle/idle-2.png` - 96x96 padronizado)
  - [x] Frame 3 (`assets/cat/idle/idle-3.png` - 96x96 padronizado)
- [x] Criar walk
  - [x] Frame 1 (`assets/cat/walk/walk-1.png`)
  - [x] Frame 2 (`assets/cat/walk/walk-2.png`)
  - [x] Frame 3 (`assets/cat/walk/walk-3.png`)
  - [x] Frame 4 (ciclo contínuo 1-2-3-2 sem gaps)
- [x] Criar run
  - [x] Frame 1 (`assets/cat/run/run-1.png`)
  - [x] Frame 2 (`assets/cat/run/run-2.png`)
  - [x] Frame 3 (`assets/cat/run/run-3.png`)
  - [x] Frame 4 (ciclo contínuo 1-2-3-2 sem gaps)
- [x] Criar jump
  - [x] Frame 1 (`assets/cat/jump/jump-1.png` - pulo)
  - [x] Frame 2 (`assets/cat/jump/jump-2.png` - surpresa/exclamação)
  - [ ] Frame 3
- [ ] Expressões
  - [ ] happy
  - [ ] angry
  - [ ] sleepy
- [ ] Especiais
  - [ ] hidden
  - [ ] queen / especial

---

## 🧩 Fase 3 — Estrutura do site
- [x] Criar componente/container da gatinha (`#easter-cat`)
- [x] Definir `position: fixed` para acompanhar a navegação sem sumir no scroll
- [x] Garantir que fique acima do conteúdo (`z-index: 9999`)
- [x] Definir área segura para movimentação (margens seguras na viewport)
- [x] Impedir que cubra textos importantes (movimento nas bordas/espaços livres)
- [x] Garantir funcionamento durante o scroll
- [x] Garantir funcionamento em diferentes resoluções
- [x] Criar comportamento específico para celular (touch-friendly)

---

## 🚶 Fase 4 — Movimento
### Movimento básico
- [x] Fazer a gatinha aparecer
- [ ] Fazer a gatinha desaparecer
- [x] Fazer movimento vertical
- [x] Fazer movimento horizontal
- [x] Fazer mudança de direção e inversão de sprite (`scaleX`)
- [x] Adicionar velocidade variável (caminhada suave e corrida)
- [x] Adicionar pequenas pausas (intervalo em idle)

### Movimento natural
- [x] Movimento aleatório com novos destinos periódicos
- [x] Tempo aleatório entre paradas e caminhadas
- [x] Posições aleatórias dentro dos limites da tela
- [x] Evitar movimentos muito rápidos e teleportes
- [x] Evitar ficar presa nas bordas
- [x] Evitar ficar em cima de elementos importantes

---

## 🖱️ Fase 5 — Interação com o usuário
### Mouse
- [x] Detectar posição do mouse (`pointermove`)
- [x] Criar área de percepção da gatinha (~110px)
- [x] Detectar quando o mouse se aproxima
- [x] Fazer a gatinha fugir na direção oposta ao cursor
- [x] Alterar animação para `run`

### Clique / Toque
- [x] Tornar a gatinha clicável (`cursor: pointer`)
- [x] Detectar clique / toque
- [x] Parar movimento temporariamente
- [x] Executar animação de pulo (jump bounce)
- [x] Alterar para estado alegre/surpresa
- [x] Mostrar mensagem no balão de fala

---

## 💬 Fase 6 — Mensagens
- [x] Primeiro clique: *"miau! 🐾"*
- [x] Segundo clique: *"Ei! 🐾"*
- [x] Terceiro clique: *"Você está ficando bom nisso..."*
- [x] Quarto clique: *"EI! 😾"*
- [x] Quinto clique: *"Você conseguiu me pegar!"*
- [ ] Encontrar a gatinha escondida: *"Você me encontrou! 👀"*

---

## ✨ Fase 7 — Efeitos visuais
- [x] Balão de fala estilizado flutuante
- [x] Pequeno salto com CSS transition / transform
- [x] Partículas ao clicar (patinhas 🐾, corações 💖, estrelas ✨)
- [ ] Efeito ao desaparecer (fade/fumaça)
- [ ] Efeito ao reaparecer
- [x] Efeito especial com badge/notificação após 5 capturas

---

## 🏆 Fase 8 — Sistema de Easter Egg
- [x] Criar contador de capturas
- [x] Salvar contador durante a sessão (`sessionStorage`)
- [x] Mostrar contador flutuante discreto após a primeira captura
- [x] Criar recompensa especial para 5 capturas (conquista desbloqueada)
- [ ] Criar recompensa para encontrar a gatinha escondida
- [ ] Criar estado especial secreto
- [x] Testar se o usuário consegue descobrir naturalmente

---

## 🕵️ Fase 9 — Gatinha escondida
- [ ] Definir onde ela pode aparecer (atrás do rodapé, no card de perfil, etc.)
- [ ] Criar pontos possíveis de esconderijo
- [ ] Fazer aparição aleatória periódica
- [ ] Criar comportamento parcialmente escondido (olhos espiando)
- [ ] Criar mensagem especial: *"Você me encontrou! 👀"*
- [ ] Contabilizar descoberta
- [ ] Criar recompensa

---

## 📱 Fase 10 — Responsividade
- [x] **Desktop**: Movimento suave, percepção de cursor, fuga ao aproximar, clique interativo
- [x] **Tablet**: Tamanho ajustado, toque, limites adaptados
- [x] **Celular**: Movimento sem exigir mouse, toque interativo, sem bloquear leitura nem atrapalhar scroll

---

## 🧪 Fase 11 — Testes
- [x] Testar no Chrome / Edge / Firefox
- [x] Testar em celular e diferentes larguras de tela
- [x] Testar durante scroll rápido
- [x] Testar múltiplos cliques consecutivos
- [x] Testar mouse próximo e fuga contínua
- [x] Verificar performance (uso de `requestAnimationFrame` leve, sem lag)

---

## 🚀 Fase 12 — Finalização
- [x] Otimizar imagens dos sprites
- [x] Organizar arquivos do repositório
- [x] Limpar JavaScript e adicionar comentários explicativos
- [x] Verificar acessibilidade e `z-index`
- [x] Criar branch `feature/cat` e commitar alterações
- [ ] Publicar no site com `node deploy.js`

---

## 📊 Nosso progresso atual

| Fase | Status |
|---|---|
| 📌 Fase 1 — Planejamento | 🟢 Concluído |
| 🎨 Fase 2 — Assets | 🟡 Em andamento (idle, walk, run prontos) |
| 🧩 Fase 3 — Estrutura | 🟢 Concluído |
| 🚶 Fase 4 — Movimento | 🟢 Concluído |
| 🖱️ Fase 5 — Interação | 🟢 Concluído |
| 💬 Fase 6 — Mensagens | 🟢 Concluído |
| ✨ Fase 7 — Efeitos | 🟡 Em andamento (partículas e balão prontos) |
| 🏆 Fase 8 — Easter Eggs | 🟢 Concluído |
| 🕵️ Fase 9 — Gatinha escondida | ⚪ Não iniciado |
| 📱 Fase 10 — Responsividade | 🟢 Concluído |
| 🧪 Fase 11 — Testes | 🟡 Em andamento |
| 🚀 Fase 12 — Finalização | ⚪ Não iniciado |

---

## 🎯 Próximo passo
- **Fase 2**: Preparar os sprites de `jump` e expressões faciais (`happy`, `angry`, `sleepy`).
- **Fase 9**: Implementar a mecânica da gatinha se escondendo atrás de elementos e espiando.
