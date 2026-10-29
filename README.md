# 🏁 Garagem Grau Car 096 — BioSite & Agendamento de Serviços

> **BioSite de Alta Conversão (CRO) & Estética Automotiva de Luxo**  
> Localização: **Av. Coraci Nunes, 907 B – Centro, Macapá - AP**  
> WhatsApp Oficial: **(96) 98436-1638** | Instagram: **[@graucar096](https://instagram.com/graucar096)**  
> Slogan: *"Seu carro no grau máximo!"*  
> Powered by **Tapzoom & Grau Car**

---

## 🏎️ 1. Visão Geral do Produto

O **BioSite da Garagem Grau Car 096** é uma aplicação web mobile-first de altíssima performance, desenvolvida sob medida para a conversão de clientes que chegam via Instagram, Google Maps e campanhas locais em Macapá - AP.

O design adota a estética **Dark Automotive** de luxo: paleta preta/chumbo com detalhes em vermelho vibrante, brilho de verniz espelhado, botões com glow tátil, tipografia refinada e princípios de movimento orgânicos (Motion Principles).

---

## 🛠️ 2. Estrutura do BioSite

1. **Header / Perfil Oficial**:
   - Emblema circular oficial com halo de luz vermelho dinâmico.
   - Nome comercial, slogan *"Seu carro no grau máximo!"* e resumo de serviços: `Lavagem • Higienização • Brilho`.
   - Indicador de status operacional e localização em tempo real no Centro de Macapá.

2. **Botões de Ação Rápida (Quick Action Links)**:
   - 🗓️ **Agendar Serviço**: Direciona com scroll suave para o simulador interativo ou dispara conversa no WhatsApp.
   - 📍 **Como Chegar**: Acesso em 1 clique às rotas do Google Maps (`Av. Coraci Nunes, 907 B – Centro, Macapá - AP`).
   - 📸 **Ver Nossos Trabalhos**: Link direto para os destaques e posts do perfil [@graucar096](https://instagram.com/graucar096).
   - 📞 **Falar com Atendente**: Chamada direta ou atendimento personalizado.
   - ↗️ **Compartilhar BioSite**: Integração com a Web Share API nativa e cópia de link.

3. **Catálogo de Serviços Interativo**:
   - **Lavagem Simples & Completa**: Snow foam neutro, técnica dos 2 baldes, secagem com microfibra magnética e aspiração.
   - **Higienização Interna (Bancos e Carpetes)**: Extração a vapor, remoção de ácaros/fungos, hidratação de couro nobre e oxi-sanitização com gerador de ozônio.
   - **Polimento de Pintura & Faróis**: Correção técnica em 3 etapas (corte, refino e lustro) removendo até 90% dos micro-riscos (swirls). Restauração ótica de faróis.
   - **Vitrificação / Proteção Cerâmica (9H)**: Nano-revestimento com dureza 9H, proteção solar UV tropical do Amapá e repelência extrema de até 36 meses.
   - **Lavagem Detalhada de Motor**: Desengraxe técnico seguro a seco e verniz térmico protetor de mangueiras e plásticos.
   - **Seletor de Porte Automotivo**: Recálculo dinâmico do valor estimado de acordo com a categoria (Hatch P, Sedan M, SUV G, Picape GG, Moto).

4. **Showcase Interativo Antes & Depois**:
   - Slider com puxador tátil que permite ao cliente arrastar e visualizar a diferença imediata entre uma pintura com riscos/oxidação e a correção com vitrificação.

5. **Simulador de Agendamento (CRO de Alta Conversão)**:
   - Seleção do porte e modelo do veículo.
   - Checkbox interativo com cálculo instantâneo do valor total e tempo previsto.
   - Seleção de data e horário preferencial.
   - Disparo formatado diretamente para o WhatsApp oficial com todas as informações estruturadas.

6. **Rodapé & Marca d'Água**:
   - Endereço físico completo, horários de funcionamento, botões de rota e a chancela obrigatória **"Powered by Tapzoom & Grau Car"**.

---

## ⚡ 3. Princípios de Movimento (Motion Principles UX)

Em conformidade com o repositório de referência *Motion Principles*:
- **Skeleton Loaders**: Carregamento esqueletizado com shimmer para todos os cards e mídias, eliminando o Layout Shift (CLS).
- **Lazy Loading**: Carregamento tardio em todas as imagens fora da primeira dobra via `loading="lazy"`.
- **Transições Suaves (Smooth Animations)**: Orquestradas via `motion/react` com curvas de aceleração naturais (`cubic-bezier(0.16, 1, 0.3, 1)`), feedback tátil instantâneo ($\le 200\text{ms}$) e estados de foco acessíveis.
- **Mobile Sticky Bar**: Barra inferior de conversão que respeita estritamente o limite de $\le 15\%$ da altura da tela em dispositivos móveis.

---

## 🏛️ 4. Governança & Fluxo de Desenvolvimento no GitHub

Toda e qualquer pessoa ou Agente de IA que atue neste repositório DEVE seguir rigorosamente as regras abaixo:

### Regra 1: Gestão de Tarefas (Zero-Untracked-Work)
- **Nenhuma linha de código é alterada sem uma Issue prévia no GitHub.**
- Tipos de Issues:
  - `feat`: Nova funcionalidade ou componente.
  - `fix`: Correção de bug visual, cálculo ou rota.
  - `perf`: Otimização de desempenho ou bundle.
  - `docs`: Atualização de documentação.

### Regra 2: Deploys Exclusivos via Pull Requests (PRs)
- A branch `main` é estritamente protegida contra commits diretos (`push`).
- Todo código deve ser desenvolvido em branches temáticas seguindo o padrão:
  - `feat/#<issue-id>-descricao-curta`
  - `fix/#<issue-id>-descricao-curta`
- A mesclagem para `main` é feita exclusivamente via Pull Request revisado e aprovado.

### Regra 3: Rastreabilidade Obrigatória
- O corpo de todo Pull Request **DEVE OBRIGATORIAMENTE** referenciar a Issue que resolve utilizando as palavras-chave do GitHub:
  - `Closes #12`
  - `Fixes #5`
  - `Resolves #8`

---

## 🔭 5. Observabilidade, Qualidade e Testes

A arquitetura do projeto possui uma camada de infraestrutura pronta para produção:

### Observabilidade (`src/lib/observability.ts`)
- **Sentry**: Captura automática de exceções em tempo real e breadcrumbs de navegação.
- **Datadog RUM & Logs**: Rastreamento de ações do usuário (clique em agendar, seleção de serviços, abertura de modal).
- **New Relic & OpenTelemetry (OTel)**: Spans de medição de latência de carregamento e benchmarks de renderização via `performance.mark`.

### Qualidade e Linting
- **Arch-Contract**: Validação de dependências entre camadas arquiteturais (UI -> Services -> Telemetry).
- **Biome**: Linter e formatador de altíssima velocidade configurado em `biome.json`.
- **Commitlint**: Validação de Conventional Commits (`.commitlintrc.json`).
- **Knip**: Varredura contínua de código morto e exports não utilizados (`knip.json`).
- **Stryker**: Estrutura para testes de mutação para garantir a eficácia dos testes de agendamento.

### Testes & Cobertura
- **Testes Unitários / Integração**: Validação de máscaras, cálculo de preços por porte e formatação de mensagens do WhatsApp (`tests/booking.test.ts`).
- **Playwright (E2E)**: Cenários de teste ponta a ponta simulando a seleção de serviços e abertura da URL do WhatsApp (`playwright.config.ts`).
- **Codecov**: Meta de cobertura $\ge 85\%$ nas regras de negócio e cálculo de pacotes.

---

## 🚀 6. Como Rodar o Projeto

```bash
# 1. Instalar dependências
npm install

# 2. Executar servidor de desenvolvimento
npm run dev

# 3. Executar checagem de tipos e lint
npm run lint

# 4. Executar build de produção
npm run build
```

---

*Desenvolvido com excelência técnica para Garagem Grau Car 096 — Macapá / AP.*
