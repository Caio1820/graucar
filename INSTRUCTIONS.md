# 📋 INSTRUCTIONS.md — Diretrizes de Engenharia e Governança

Este documento é a fonte de verdade operacional para todos os desenvolvedores e Agentes de IA que operam no repositório **Garagem Grau Car 096**.

---

## 1. Fluxo de Trabalho e Git Workflow

### 1.1 Ciclo de Desenvolvimento
1. **Identificar ou Criar a Issue**: Toda tarefa inicia com uma Issue aberta contendo critérios de aceitação claros.
2. **Criar a Branch**: Nomenclatura no formato `tipo/#<issue_number>-descricao` (ex: `feat/#24-adicionar-combo-polimento-vitrificacao`).
3. **Commit Messages**: Seguir Conventional Commits validado por Commitlint:
   - `feat: adiciona seletor de horários dinâmico (#24)`
   - `fix: ajusta máscara de telefone para DDD 96 (#25)`
   - `style: refina o glow vermelho nos botões primários (#26)`
4. **Abrir Pull Request**:
   - Todo PR deve conter a menção de rastreabilidade na primeira linha do corpo: `Closes #<numero_da_issue>`.
   - Adicionar resumo das mudanças e checklist de testes executados.
5. **Merge**: Exclusivamente via PR após aprovação da suíte de testes (CI).

---

## 2. Padrões de Design e UX Automotiva

1. **Aparência Dark Automotive**:
   - Background primário: `#09090b` (preto profundo).
   - Superfícies de cards: `#121217` e `#18181f` com bordas sutis `border-zinc-800`.
   - Cores de destaque: Vermelho vibrante (`#dc2626` / `#ef4444`) e glow tátil `rgba(220, 38, 38, 0.45)`.
   - Sem badges pill genéricos em textos puramente informativos.

2. **Performance e Acessibilidade**:
   - Todas as imagens devem possuir `alt` descritivo, fallback visual e `loading="lazy"` fora da viewport primária.
   - Botões com touch targets mínimos de 44px x 44px no mobile.
   - Feedback tátil em menos de 200ms.

---

## 3. Qualidade de Código & Observabilidade

- Utilize o singleton `telemetry` em `src/lib/observability.ts` para registrar novos eventos de conversão e métricas de desempenho.
- Mantenha a tipagem estrita no TypeScript sem uso de `any`.
- Execute `npm run lint` e garanta que não haja erros de compilação antes de cada entrega.
