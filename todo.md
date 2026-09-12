# 🐱 Checklist — Easter Egg da Gatinha

## ⚠️ Prioridade máxima — o que ainda falta
- [ ] Implementar a gatinha escondida e os pontos de esconderijo
- [ ] Definir o comportamento de aparição/escondimento da gatinha
- [ ] Criar os estados visuais pendentes: angry, sleepy, hidden, special
- [ ] Finalizar animações e efeitos de entrada/saída
- [ ] Criar mensagem especial para descoberta da gatinha escondida
- [ ] Adicionar recompensa para encontrar a gatinha escondida
- [ ] Publicar no site com `node deploy.js`

---

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
  - [x] idle
  - [x] walk
  - [x] run
  - [x] jump
  - [x] happy
  - [ ] angry
  - [ ] sleepy
  - [ ] hidden
  - [ ] special

---

## 🎨 Fase 2 — Assets da gatinha
### Sprite principal
- [x] Separar a gatinha da sprite sheet
- [x] Remover o fundo
- [x] Padronizar tamanho dos sprites
- [x] Padronizar escala
- [x] Garantir fundo transparente
- [x] Garantir estilo uniforme
- [x] Garantir paleta compatível com a logo

### Animações
- [x] Criar idle
- [x] Criar walk
- [x] Criar run
- [x] Criar jump
- [ ] Criar expressões: happy
- [ ] Criar expressões: angry
- [ ] Criar expressões: sleepy
- [ ] Criar estado hidden
- [ ] Criar estado especial / queen

> Prioridade alta: faltam os estados visuais de expressão e escondida.

---

## 🧩 Fase 3 — Estrutura do site
- [x] Criar componente/container da gatinha (`#easter-cat`)
- [x] Definir `position: fixed`
- [x] Garantir `z-index` acima do conteúdo
- [x] Definir área segura de movimentação
- [x] Impedir sobreposição em textos importantes
- [x] Garantir funcionamento durante scroll
- [x] Garantir responsividade
- [x] Criar comportamento para celular

---

## 🚶 Fase 4 — Movimento
### Movimento básico
- [x] Fazer a gatinha aparecer
- [ ] Fazer a gatinha desaparecer
- [x] Fazer movimento vertical
- [x] Fazer movimento horizontal
- [x] Mudança de direção e inversão do sprite
- [x] Velocidade variável
- [x] Pausas em idle

### Movimento natural
- [x] Movimento aleatório com novos destinos
- [x] Tempo aleatório entre paradas e caminhadas
- [x] Posições aleatórias
- [x] Evitar teleporte e velocidade excessiva
- [x] Evitar bordas
- [x] Evitar sobreposição em elementos importantes

> Ainda pendente: esconder e reaparecer com comportamento mais natural.

---

## 🖱️ Fase 5 — Interação com o usuário
### Mouse
- [x] Detectar posição do mouse
- [x] Criar área de percepção
- [x] Detectar aproximação do cursor
- [x] Gatinha fugir
- [x] Alterar animação para `run`

### Clique / Toque
- [x] Tornar clicável
- [x] Detectar clique
- [x] Parar movimento temporariamente
- [x] Executar animação de pulo
- [x] Alterar para estado alegre/surpresa
- [x] Mostrar mensagem no balão

---

## 💬 Fase 6 — Mensagens
- [x] Primeiro clique: "miau! 🐾"
- [x] Segundo clique: "Ei! 🐾"
- [x] Terceiro clique: "Você está ficando bom nisso..."
- [x] Quarto clique: "EI! 😾"
- [x] Quinto clique: "Você conseguiu me pegar!"
- [ ] Encontrar a gatinha escondida: "Você me encontrou! 👀"

> Falta a mensagem da descoberta escondida.

---

## ✨ Fase 7 — Efeitos visuais
- [x] Balão de fala estilizado
- [x] Salto com CSS transition
- [x] Partículas ao clicar
- [ ] Efeito ao desaparecer
- [ ] Efeito ao reaparecer
- [x] Badge/notificação após 5 capturas

> Efeitos de entrada/saída ainda estão incompletos.

---

## 🏆 Fase 8 — Sistema de Easter Egg
- [x] Criar contador de capturas
- [x] Salvar contador durante a sessão (`sessionStorage`)
- [x] Mostrar contador flutuante discreto
- [x] Criar recompensa especial para 5 capturas
- [ ] Criar recompensa para encontrar a gatinha escondida
- [ ] Criar estado especial secreto
- [x] Testar descoberta natural

> Isso é uma das partes mais importantes que ainda está incompleta.

---

## 🕵️ Fase 9 — Gatinha escondida
- [ ] Definir onde ela pode aparecer
- [ ] Criar pontos possíveis de esconderijo
- [ ] Fazer aparição aleatória periódica
- [ ] Criar comportamento parcialmente escondido
- [ ] Criar mensagem especial: "Você me encontrou! 👀"
- [ ] Contabilizar descoberta
- [ ] Criar recompensa
- [ ] Definir se ela aparece em locais discretos do layout
- [ ] Garantir que a descoberta seja clara, mas não invasiva
- [ ] Validar que o estado hidden não quebre o fluxo da página

> Esta é a maior pendência funcional do projeto.

---

## 📱 Fase 10 — Responsividade
- [x] Desktop: suporte completo
- [x] Tablet: ajustes de tamanho
- [x] Celular: toque e movimentação sem travar a leitura

---

## 🧪 Fase 11 — Testes
- [x] Testar no Chrome / Edge / Firefox
- [x] Testar em celular e diferentes larguras
- [x] Testar durante scroll rápido
- [x] Testar múltiplos cliques
- [x] Testar fuga do mouse
- [x] Verificar performance
- [ ] Testar gatinha escondida em diferentes tamanhos de tela
- [ ] Validar comportamento quando a página estiver em scroll longo
- [ ] Testar interações repetidas e estados de animação
- [ ] Verificar se a recompensa especial aparece corretamente

> Testes funcionais mais específicos da gatinha escondida ainda não foram feitos.

---

## 🚀 Fase 12 — Finalização
- [x] Otimizar imagens
- [x] Organizar arquivos
- [x] Limpar JavaScript e comentários
- [x] Verificar acessibilidade e `z-index`
- [x] Criar branch `feature/cat`
- [ ] Publicar no site com `node deploy.js`
- [ ] Revisar todo.md e checklist final
- [ ] Validar se tudo está estável em produção
- [ ] Confirmar que a gatinha não atrapalha a experiência do usuário

> Falta a publicação final e a validação em ambiente real.

---

## 📊 Progresso atual

| Fase | Status |
|---|---|
| 📌 Fase 1 — Planejamento | 🟢 Concluído |
| 🎨 Fase 2 — Assets | 🟡 Parcialmente concluído |
| 🧩 Fase 3 — Estrutura | 🟢 Concluído |
| 🚶 Fase 4 — Movimento | 🟡 Parcialmente concluído |
| 🖱️ Fase 5 — Interação | 🟢 Concluído |
| 💬 Fase 6 — Mensagens | 🟡 Parcialmente concluído |
| ✨ Fase 7 — Efeitos | 🟡 Em andamento |
| 🏆 Fase 8 — Easter Egg | 🟡 Parcialmente concluído |
| 🕵️ Fase 9 — Gatinha escondida | 🔴 Não iniciada |
| 📱 Fase 10 — Responsividade | 🟢 Concluído |
| 🧪 Fase 11 — Testes | 🟡 Em andamento |
| 🚀 Fase 12 — Finalização | 🔴 Não iniciada |

---

## 🎯 Próximo passo prioritário
1. Implementar a gatinha escondida e os pontos de esconderijo.
2. Finalizar estados visuais: angry, sleepy, hidden, special.
3. Completar efeitos de aparecimento/desaparecimento.
4. Validar mensagens e recompensas da descoberta escondida.
5. Publicar no site com `node deploy.js`.
