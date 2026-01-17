# Plano de Personalização e Roadmap do Projeto "Vão Cumê"

Este documento descreve o plano estratégico para transformar a base do `AppDelivery` no aplicativo **"Vão Cumê"", incorporando as funcionalidades avançadas inspiradas no `Enatega`. O desenvolvimento será dividido em fases (versões) para garantir entregas incrementais e de valor.

## Versão 1.0: MVP (Produto Mínimo Viável) - O Lançamento

**Objetivo:** Lançar a primeira versão funcional do app com a identidade visual do "Vão Cumê" e a melhoria mais crítica: o rastreamento em tempo real.

| Tarefa | Descrição | Status |
| :--- | :--- | :--- |
| **1. Branding e Customização** | - Alterar o nome e os logotipos em todos os frontends (App Cliente, App Entregador, Web Restaurante).<br>- Ajustar o esquema de cores para refletir a marca "Vão Cumê". | A Fazer |
| **2. Configuração do Ambiente** | - Realizar a instalação completa da plataforma (backend e frontend) em um ambiente de desenvolvimento para garantir que tudo funcione como esperado. | A Fazer |
| **3. Integração de Mapas (Feature Crítica)** | - Substituir o cálculo de distância Haversine por uma API de mapas real (sugestão: **Mapbox**, por ter um plano gratuito generoso).<br>- **App do Cliente:** Exibir o mapa com a rota e a localização do entregador em tempo real.<br>- **App do Entregador:** Exibir o mapa com a rota até o restaurante e depois até o cliente. | A Fazer |

**Resultado Esperado ao Final da v1.0:** Um aplicativo 100% funcional, com a cara do "Vão Cumê", pronto para ser testado em um ambiente real com alguns restaurantes e clientes parceiros.

## Versão 1.1: Engajamento e Confiança

**Objetivo:** Adicionar funcionalidades que aumentem a confiança do usuário na plataforma e incentivem o engajamento.

| Tarefa | Descrição | Status |
| :--- | :--- | :--- |
| **1. Sistema de Avaliação** | - Permitir que os clientes avaliem os pedidos (nota de 1 a 5 estrelas) e deixem comentários.<br>- Exibir a nota média de cada restaurante.<br>- Desenvolver uma área no Painel de Admin para visualizar e moderar as avaliações. | A Fazer |
| **2. Login Social** | - Integrar login com Google no aplicativo do cliente para simplificar o processo de cadastro e diminuir o atrito para novos usuários. | A Fazer |

**Resultado Esperado ao Final da v1.1:** Uma plataforma mais social e confiável, onde a opinião dos clientes ajuda a guiar novos usuários e o processo de entrada é o mais simples possível.

## Versão 1.2: Ferramentas de Crescimento

**Objetivo:** Implementar ferramentas de marketing e gestão para ajudar os restaurantes a venderem mais e para o administrador gerenciar a plataforma de forma eficaz.

| Tarefa | Descrição | Status |
| :--- | :--- | :--- |
| **1. Cupons de Desconto** | - Criar um sistema no backend para gerar cupons (valor fixo, porcentagem, frete grátis).<br>- Adicionar um campo no checkout do cliente para aplicar o cupom.<br>- Desenvolver uma interface no Painel de Admin para criar e gerenciar os cupons. | A Fazer |
| **2. Relatórios para Restaurantes** | - Criar uma nova seção no painel `WebRestaurant` para exibir dados importantes, como faturamento, número de pedidos e produtos mais vendidos em um determinado período. | A Fazer |
| **3. Gestão de Zona de Entrega** | - Desenvolver uma ferramenta no `WebRestaurant` que permita ao dono do estabelecimento desenhar sua área de atuação em um mapa e definir taxas de entrega por bairro ou raio de distância. | A Fazer |

**Resultado Esperado ao Final da v1.2:** Um aplicativo robusto que não só funciona bem, mas também oferece ferramentas para que os parceiros (restaurantes) e o administrador (você) possam crescer o negócio.

## Próximos Passos

O foco imediato é a **Versão 1.0**. O primeiro passo técnico será a configuração do ambiente de desenvolvimento para rodar o `AppDelivery` original. Em paralelo, iniciaremos a customização da interface com a marca "Vamo Cumê".
