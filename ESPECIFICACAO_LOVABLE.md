
# Especificação Técnica para Lovable: Painel do Restaurante "Vão Cumê"

**Objetivo:** Este documento serve como um guia detalhado para a IA do Lovable construir o painel de controle para restaurantes da plataforma "Vão Cumê". O painel deve ser uma aplicação web responsiva, permitindo que os donos de restaurantes gerenciem seus pedidos, cardápio e configurações.

---

## 1. Visão Geral e Identidade Visual

- **Nome do Projeto:** Painel Vão Cumê
- **Público-Alvo:** Donos e gerentes de restaurantes parceiros.
- **Tom de Voz:** Profissional, simples e direto.

### Guia de Estilo (Branding)

| Elemento | Especificação |
| :--- | :--- |
| **Cores Primárias** | Laranja (ex: `#fb6f2d`), Amarelo Queimado (ex: `#fc9f2c`) |
| **Cores Secundárias** | Verde (ex: `#279348`), Cinza Escuro (para textos, ex: `#333333`), Cinza Claro (para fundos, ex: `#f4f4f4`) |
| **Tipografia** | Fonte sem serifa, moderna e de fácil leitura (ex: Inter, Poppins, ou similar). Usar pesos diferentes para hierarquia (Bold para títulos, Regular para corpo de texto). |
| **Logo** | O logo do "Vão Cumê" deve ser inserido no topo do menu lateral. |

---

## 2. Estrutura da Aplicação e Páginas

A aplicação será composta por uma tela de login e um painel principal com um menu de navegação lateral.

### 2.1. Página de Login

**Objetivo:** Autenticar o usuário (dono do restaurante) para dar acesso ao painel.

**Componentes:**
- **Logo do "Vão Cumê"** centralizado no topo.
- **Campo de E-mail:** Input de texto para o e-mail do usuário.
- **Campo de Senha:** Input de texto do tipo "password".
- **Botão "Entrar":** Botão principal que dispara a ação de login.
- **Link "Cadastre-se":** Um link que redireciona para uma página ou formulário de cadastro (a ser detalhado no futuro).

**Fluxo:**
1.  Usuário insere e-mail e senha.
2.  Clica em "Entrar".
3.  O sistema valida as credenciais.
4.  Se as credenciais forem válidas, o usuário é redirecionado para a página "Home" (Kanban de Pedidos).
5.  Se forem inválidas, uma mensagem de erro deve ser exibida (ex: "E-mail ou senha incorretos").

### 2.2. Layout Principal (Painel)

Após o login, todas as telas devem seguir um layout padrão com um menu lateral fixo.

**Componentes:**
- **Menu Lateral (Sidebar):**
  - **Logo do "Vão Cumê"** no topo.
  - **Links de Navegação:**
    - **Pedidos:** Ícone de prancheta. Leva para a página Home (Kanban).
    - **Cardápio:** Ícone de livro de receitas. Leva para a página "Gestor de Cardápio".
    - **Perfil:** Ícone de usuário. Leva para a página "Perfil".
    - **Taxas de Entrega:** Ícone de cifrão. Leva para a página "Taxas".
  - **Botão "Sair" (Logout):** Ícone de porta de saída. Fica na parte inferior do menu e encerra a sessão do usuário, redirecionando-o para a página de Login.
- **Área de Conteúdo Principal:** Ocupa o restante da tela à direita do menu. É onde o conteúdo de cada página será renderizado.

---

### 2.3. Página de Pedidos (Home)

**Rota:** `/`

**Objetivo:** Exibir todos os pedidos ativos em um quadro Kanban, permitindo que o restaurante gerencie o fluxo de produção de forma visual e interativa.

**Componentes:**
- **Título da Página:** "Meus Pedidos".
- **Quadro Kanban (Board):** Componente principal que contém colunas representando os status dos pedidos.
  - **Colunas:**
    1.  **Em Análise** (Cor: Laranja `#fb6f2d`): Pedidos novos que acabaram de chegar e aguardam aprovação do restaurante.
    2.  **Em Produção** (Cor: Amarelo `#fc9f2c`): Pedidos que foram aceitos e estão sendo preparados.
    3.  **Pronto p/ Entrega** (Cor: Verde `#279348`): Pedidos que já foram preparados e aguardam o entregador.
  - **Funcionalidade Drag-and-Drop:** O usuário deve ser capaz de arrastar um card de pedido de uma coluna para outra para atualizar seu status.

- **Card de Pedido (Task):** Cada pedido é representado por um card dentro de uma coluna.
  - **Informações no Card:**
    - **ID do Pedido:** (ex: "Pedido #123")
    - **Nome do Cliente:**
    - **Itens do Pedido:** Lista resumida dos produtos (ex: "1x X-Tudo, 2x Coca-Cola").
    - **Valor Total:** (ex: "R$ 45,50")
    - **Horário do Pedido:**
    - **Código de Entrega:** Um código numérico que o entregador usará para retirar o pedido (deve ficar bem visível).

**Fluxo de Interação:**
1.  A página carrega e busca todos os pedidos que não foram finalizados.
2.  Os pedidos são exibidos como cards nas colunas correspondentes ao seu status atual.
3.  Quando um novo pedido chega, ele deve aparecer automaticamente na coluna "Em Análise" (via WebSocket ou polling).
4.  O usuário (restaurante) arrasta o card do pedido da coluna "Em Análise" para "Em Produção" para aceitá-lo.
5.  Quando o preparo termina, o usuário arrasta o card para "Pronto p/ Entrega".
6.  Quando o entregador retira o pedido, o card desaparece do quadro (considerado finalizado para o restaurante).

---

### 2.4. Página de Gestão de Cardápio

**Rota:** `/gestor-cardapio`

**Objetivo:** Permitir que o restaurante crie, edite, visualize e remova produtos e categorias do seu cardápio.

**Componentes:**
- **Título da Página:** "Gestor de Cardápio".
- **Botão "Adicionar Produto":** Abre um modal ou leva a uma nova página para cadastrar um novo item.
- **Lista de Produtos:** Exibe todos os produtos cadastrados, agrupados por categoria.
  - **Nome da Categoria:** (ex: "Hambúrgueres", "Bebidas")
  - **Card de Produto:** Para cada produto na lista.
    - **Imagem do Produto.**
    - **Nome do Produto.**
    - **Descrição.**
    - **Preço.**
    - **Botão "Editar":** Abre um modal para editar as informações do produto.
    - **Botão "Excluir":** Remove o produto (com uma confirmação, ex: "Você tem certeza?").

- **Modal de Adicionar/Editar Produto:**
  - **Campo "Nome do Produto":** Input de texto.
  - **Campo "Descrição":** Text area.
  - **Campo "Preço":** Input numérico.
  - **Campo "Categoria":** Dropdown (select) para escolher uma categoria existente ou criar uma nova.
  - **Upload de Imagem.**
  - **Botão "Salvar".**

---

### 2.5. Página de Perfil

**Rota:** `/perfil`

**Objetivo:** Permitir que o restaurante edite as informações do seu estabelecimento.

**Componentes:**
- **Título da Página:** "Perfil do Restaurante".
- **Formulário de Edição:**
  - **Campo "Nome do Restaurante":** Input de texto.
  - **Campo "Endereço":** Input de texto.
  - **Campo "Telefone de Contato":** Input de texto.
  - **Upload de Logo.**
  - **Botão "Salvar Alterações".**

### 2.6. Página de Taxas de Entrega

**Rota:** `/taxas`

**Objetivo:** Permitir que o restaurante configure sua política de taxa de entrega.

**Componentes:**
- **Título da Página:** "Taxas de Entrega".
- **Formulário de Configuração:**
  - **Campo "Taxa Fixa":** Valor cobrado em toda entrega (ex: R$ 2,00).
  - **Campo "Valor por KM":** Valor adicional cobrado por quilômetro de distância (ex: R$ 1,50).
  - **Botão "Salvar Configurações".**

---

## 3. Lógica de Backend e API (Para o Desenvolvedor)

O Lovable irá consumir uma API RESTful para todas as operações. Abaixo estão os endpoints esperados. O backend será o mesmo do repositório `vamo-cume`.

- `POST /login` - Autentica o usuário.
- `GET /orders` - Retorna a lista de pedidos ativos.
- `PUT /orders/{id}/status` - Atualiza o status de um pedido.
- `GET /products` - Retorna a lista de produtos do cardápio.
- `POST /products` - Cria um novo produto.
- `PUT /products/{id}` - Atualiza um produto existente.
- `DELETE /products/{id}` - Remove um produto.
- `GET /profile` - Retorna os dados do restaurante.
- `PUT /profile` - Atualiza os dados do restaurante.
- `GET /delivery-taxes` - Retorna as taxas de entrega atuais.
- `POST /delivery-taxes` - Define as novas taxas de entrega.

**Comunicação em Tempo Real:** A atualização automática de novos pedidos no Kanban deve ser implementada usando **WebSockets** ou, como alternativa, um **polling** (requisições `GET /orders`) a cada 15 segundos.
