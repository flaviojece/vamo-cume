# Análise Técnica Inicial do Projeto AppDelivery

Este documento resume a análise inicial da estrutura e tecnologias do projeto `AppDelivery`, que servirá como base para o aplicativo **"Vamo Cumê"**.

## Estrutura Geral do Projeto

O repositório está bem organizado e dividido em duas partes principais: `Backend` e `Frontend`.

### 1. Backend

O backend adota uma arquitetura de **microserviços**, o que é excelente para escalabilidade e manutenção. Cada serviço é responsável por uma parte do negócio.

- **Tecnologia Principal:** Os serviços são desenvolvidos em **Go (Golang)** com o framework **Fiber**, conhecido por sua alta performance e baixo consumo de recursos. Isso é um ponto muito positivo para manter os custos de servidor baixos.
- **Microserviços Identificados:**
  - `auth_api`: Gerencia autenticação e cadastro de usuários/estabelecimentos.
  - `orders_api`: Cuida da lógica de pedidos, produtos e cardápios.
  - `delivery_api`: Responsável pela lógica de entregas.
- **Banco de Dados:** O sistema utiliza uma abordagem híbrida:
  - **PostgreSQL:** Para dados relacionais, como usuários e informações de pedidos (`users-db`, `orders-db`).
  - **MongoDB:** Para dados mais flexíveis, provavelmente relacionados aos detalhes dos pedidos e logs (`orders-mongo`).
- **Comunicação Assíncrona:** Utiliza **RabbitMQ** para a comunicação entre os microserviços (ex: notificar o serviço de entrega quando um pedido está pronto). Isso torna o sistema mais robusto e desacoplado.
- **Containerização:** Todo o ambiente de backend é orquestrado com **Docker e Docker Compose**. Isso simplifica enormemente a instalação e o deploy do sistema.

### 2. Frontend

O frontend é composto por três aplicações distintas:

- **`AppComida` (Aplicativo do Cliente):**
  - **Tecnologia:** **React Native com Expo**, o que permite gerar aplicativos para Android e iOS a partir de um único código-fonte. O uso do Expo facilita o processo de build, especialmente para iOS.
  - **Linguagem:** **TypeScript**, que adiciona segurança e manutenibilidade ao código.
  - **Estilização:** **NativeWind**, que aplica a filosofia do Tailwind CSS ao React Native, permitindo um desenvolvimento de interface mais ágil.

- **`AppEntrega` (Aplicativo do Entregador):**
  - **Tecnologia:** Também construído com **React Native e Expo**, compartilhando a mesma base tecnológica do app do cliente.

- **`WebRestaurant` (Painel do Restaurante):**
  - **Tecnologia:** **React.js** (para a web), com um sistema de build baseado em **Webpack**.
  - **Funcionalidade:** Oferece um painel para gestão de cardápio e um quadro Kanban para o fluxo de pedidos.

## Principais Pontos de Atenção e Oportunidades

- **Cálculo de Entrega:** O `README.md` destaca que o cálculo de distância é feito com o **algoritmo de Haversine** (distância em linha reta) para **evitar custos com APIs de mapas**. Esta é a **principal oportunidade de melhoria**, onde podemos integrar uma solução como Google Maps ou Mapbox para ter rastreamento em tempo real e cálculo de rota real, como faz o Enatega.

- **Configuração:** O projeto é flexível, permitindo operar em modo `unique` (um único restaurante) ou `multi` (vários restaurantes) através de um simples arquivo de configuração. Para o "Vamo Cumê", iniciaremos no modo `multi`.

- **Documentação da API:** O projeto menciona uma coleção do **Postman** (`delivery.postman_collection.json`) para testar e entender os endpoints da API. Este será um recurso valioso para o desenvolvimento.

## Conclusão da Análise

O projeto `AppDelivery` é uma base **excelente e moderna** para o "Vamo Cumê". A escolha de tecnologias (Go, React Native, Docker) é robusta e alinhada com as melhores práticas do mercado. A arquitetura de microserviços, embora um pouco mais complexa de início, oferece a flexibilidade que precisamos para adicionar novas funcionalidades de forma independente e segura.

O próximo passo é detalhar as funcionalidades do Enatega que não estão presentes aqui para criarmos nosso plano de desenvolvimento.
