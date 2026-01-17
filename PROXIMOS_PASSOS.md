# Próximos Passos Práticos para o Projeto "Vão Cumê"

Este documento resume as ações concretas que devem ser realizadas para dar continuidade ao desenvolvimento do **"Vão Cumê"**.

## 1. Configurar o Ambiente de Desenvolvimento

Para começar a trabalhar no projeto, é necessário ter o ambiente de desenvolvimento configurado na sua máquina local ou em um servidor.

**Pré-requisitos:**
- Docker e Docker Compose instalados.
- Node.js (versão 20 ou superior) instalado.
- Git instalado.
- Conta no Expo (https://expo.dev) para gerar os builds dos aplicativos mobile.

**Passos:**
1. Clonar o repositório `flaviojece/vamo-cume` para sua máquina local.
2. Seguir as instruções do arquivo `README.md` para subir o backend com Docker.
3. Configurar as URLs do backend nos arquivos de configuração dos frontends (AppComida, AppEntrega, WebRestaurant).
4. Rodar os aplicativos frontend localmente para garantir que tudo está funcionando.

## 2. Personalizar a Marca "Vão Cumê"

Após confirmar que o ambiente está funcionando, o próximo passo é aplicar a identidade visual do "Vão Cumê".

**Tarefas:**
- Criar ou obter o logotipo do "Vão Cumê" (nos formatos PNG e SVG).
- Substituir os logotipos nos três projetos de frontend (AppComida, AppEntrega, WebRestaurant).
- Definir a paleta de cores principal do aplicativo (sugestão: usar tons que remetam à culinária mineira, como amarelo, verde e laranja).
- Atualizar os arquivos de configuração de cores (Tailwind CSS) nos projetos.
- Alterar o nome do aplicativo nos arquivos `package.json` e `app.json` (para o Expo).

## 3. Escolher e Integrar a API de Mapas

Esta é a funcionalidade mais crítica da versão 1.0. É necessário decidir qual API de mapas será utilizada.

**Opções Recomendadas:**
- **Mapbox:** Oferece um plano gratuito generoso (até 50.000 carregamentos de mapa por mês) e é muito utilizado em aplicativos de delivery.
- **Google Maps:** Mais conhecido, mas com custos mais altos. Oferece um crédito mensal de $200.

**Próximos Passos:**
1. Criar uma conta na plataforma escolhida (Mapbox ou Google Maps).
2. Obter a chave de API.
3. Instalar as bibliotecas necessárias nos projetos React Native (ex: `react-native-maps` para o Mapbox).
4. Desenvolver a funcionalidade de rastreamento no `AppComida` (exibir o mapa com a posição do entregador).
5. Desenvolver a funcionalidade de navegação no `AppEntrega` (exibir a rota até o restaurante e depois até o cliente).

## 4. Testar o Sistema Completo

Antes de lançar, é fundamental realizar testes completos do fluxo de pedidos.

**Cenário de Teste:**
1. Cadastrar um restaurante no sistema (via API com Postman).
2. Adicionar produtos ao cardápio do restaurante (via WebRestaurant).
3. Fazer um pedido pelo AppComida.
4. Aceitar o pedido no WebRestaurant.
5. Aceitar a entrega no AppEntrega.
6. Simular a entrega completa, desde a coleta no restaurante até a entrega ao cliente.

## 5. Preparar para o Lançamento

Após os testes, o aplicativo estará pronto para o lançamento inicial (MVP).

**Tarefas:**
- Fazer o deploy do backend em um servidor (pode ser uma VPS, AWS, Google Cloud, etc.).
- Gerar os builds de produção dos aplicativos mobile (via Expo).
- Publicar os aplicativos nas lojas (Google Play Store e Apple App Store).
- Fazer o deploy do painel WebRestaurant em um servidor web.

## Observação sobre o Lovable

Você mencionou o uso do Lovable no desenvolvimento. O Lovable é uma ferramenta excelente para criar interfaces web de forma visual e rápida. Ele pode ser utilizado, por exemplo, para:

- Criar páginas de marketing para o "Vão Cumê" (landing page, página de cadastro de restaurantes).
- Desenvolver protótipos de novas funcionalidades antes de implementá-las no código.
- Criar dashboards personalizados para análises e relatórios.

No entanto, para a parte core do aplicativo (os apps mobile e o backend), continuaremos trabalhando diretamente com o código-fonte do repositório `vamo-cume`, pois o Lovable é mais focado em desenvolvimento web e não em aplicativos nativos.

---

Esses são os próximos passos práticos. Podemos começar por qualquer um deles, mas a recomendação é seguir a ordem apresentada para garantir uma base sólida antes de avançar para as funcionalidades mais complexas.
