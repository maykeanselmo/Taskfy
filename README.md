# Taskfy
Gerenciador de tarefas moderno e personalizável, com Java Spring Boot no back-end e React no front-end. Organize, priorize e conclua suas atividades com eficiência.

## Índice
1. [Objetivo do Projeto](#objetivo-do-projeto)
2. [Funcionalidades Básicas](#funcionalidades-básicas)
3. [Funcionalidades Avançadas (Opcional)](#funcionalidades-avançadas-opcional)
4. [Requisitos não funcionais](#requisitos-não-funcionais)
5. [Back-End: Java Spring Boot](#back-end-java-spring-boot)
6. [Banco de Dados: PostgreSQL](#banco-de-dados-postgresql)
7. [Front-End: React](#front-end-react)
8. [Roadmap do Projeto Taskfy](#roadmap-do-projeto-taskfy)
   - [Fase 1: Configuração do Ambiente](#fase-1-configuração-do-ambiente)
   - [Fase 2: Configuração do Banco de Dados](#fase-2-configuração-do-banco-de-dados)
   - [Fase 3: Desenvolvimento do Back-End](#fase-3-desenvolvimento-do-back-end)
   - [Fase 4: Desenvolvimento do Front-End](#fase-4-desenvolvimento-do-front-end)
   - [Fase 5: Testes](#fase-5-testes)
   - [Fase 6: Deploy](#fase-6-deploy)
   - [Fase 7: Manutenção](#fase-7-manutenção)

## Objetivo do Projeto
Criar uma aplicação que permita aos usuários organizarem suas tarefas e projetos,
aumentando a produtividade e o controle sobre suas atividades, de forma segura e transparente.

## Funcionalidades Básicas
1. **Cadastro de Usuários**
    - Login e registro (e-mail/senha ou autenticação social como Google).
    - Recuperação de senha.
2. **Gerenciamento de Tarefas**
    - Criação, edição, exclusão e exibição de tarefas.
    - Adicionar descrições, prazos e categorias.
4. **Listas de Tarefas**
    - Exibir tarefas pendentes e concluídas.
    - Filtrar tarefas por prazo, categoria ou status.
5. **Prioridade e Organização**
    - Atribuir níveis de prioridade (baixa, média, alta).
    - Agrupar tarefas por projetos ou áreas (ex.: "Trabalho", "Pessoal").
6. **Notificações e Alertas**
    - Alertas de prazo próximo (via e-mail).

## Funcionalidades Avançadas (Opcional)
1. **Integração com Calendário:**
    - Sincronizar tarefas com Google Calendar.
2. **Integração com serviçoes de Cloud:**
    - salvar tarefas no Google Drive.
3. **Colaboração em Equipe:**
    - Adicionar membros a projetos/tarefas.
    - Controle de permissões (ex.: administrador, colaborador).
4. **Relatórios e Estatísticas:**
    - Gráficos de produtividade (ex.: tarefas concluídas vs. pendentes).
    - Análise de tempo gasto em tarefas.
5. **Customização:**
    - Temas personalizados (dark mode, cores).
    - Organização por drag-and-drop.
6. **Atalhos de navegação:**
    - Navegação via paleta de comandos.
    - Atalhos de teclado.

## Requisitos não funcionais
1. **Transparência:**
    - Salvar tarefas em formato de texto markdown puro.
    - Usar tags customizadas para configurar categorias, prazos, notificações, prioridade.
        - Exemplo: Ter um tag `<Taskfy> </Taskfy>` onde esses metadados são configurados.
        - Esses metadados devem ser referenciados pelo banco de dados a fim de permitir querys complexas.
2. **Segurança:**
    - Implementar medidas contra ataques DOS e outras ameaças do ambiente Web.
    - Criptografar senhas e dados pessoais dos usuáriios.
3. **Desempenho:**
    - Ser responsível em navegadores mobile.

## Back-End: Java Spring Boot
1. **Por que Spring Boot?**
    - É robusto e ideal para projetos escaláveis.
    - Possui suporte para APIs RESTful, que é essencial para comunicação com o front-end.
    - Ferramentas nativas para segurança (Spring Security) e gerenciamento de banco de dados (JPA).
    - Experiência prévia da equipe com a linguagem.
2. **Endpoints Básicos**
    - POST /users: Criar usuário.
    - POST /auth/login: Autenticar usuário.
    - GET /tasks: Listar tarefas do usuário.
    - POST /tasks: Criar nova tarefa.
    - PUT /tasks/{id}: Atualizar tarefa existente.
    - DELETE /tasks/{id}: Remover tarefa.
3. **Sincronização**
    - Premite salvar arquivos markdown do usuário no servidor.

## Banco de Dados: PostgreSQL
1. **Por que PostgreSQL?**
    - Confiabilidade em gravações simultâneas: O PostgreSQL gerencia operações de gravação concorrentes de forma eficiente, evitando problemas como bloqueios ou corrupção de dados.
    - Integração facilitada: Muitos provedores de serviços oferecem suporte nativo para PostgreSQL, facilitando sua adoção e manutenção.
    - Conformidade com SQL padrão: Total suporte ao SQL padrão, permitindo a criação de consultas complexas e portabilidade do código.

2. **Tabelas**
    - users: Armazena informações dos usuários.
    - tasks: Metadados das tarefas (título, descrição, prazo, status, prioridade).
        - podem ser separados em mais tabelas para cada tipo de metadado.
     - folders: Para conter e organiar tasks.
    - Relacionamento:
        - Um user pode ter várias folders, mas cada folder pertence a apenas um user.
        - Toda task pertence a uma folder e uma folder pode ter várias tasks. Relacionamento expresso pelo campo parent na tabela tasks.

3. **Estrutura de Banco de Dados**

### Tabela `users`
| Campo        | Descrição                                     |
|--------------|-----------------------------------------------|
| `id`         | Identificador único do usuário.              |
| `username`   | Nome de usuário (único).                      |
| `nickname`   | Nome opcional para exibição no perfil.
| `email`      | Endereço de e-mail do usuário (único).        |
| `password`   | Senha criptografada do usuário.               |
| `created_at` | Data de criação da conta.                    |
| `updated_at` | Data da última modificação.                  |
| `is_active`  | Status da conta (ativa ou inativa).          |


### Tabela `folders`
| Campo        | Descrição                                   |
|--------------|---------------------------------------------|
| `id`         | Identificador único da pasta.               |
| `user_id`    | Identificador do usuário dono da pasta.     |
| `name`       | Nome da pasta.                              |
| `created_at` | Data de criação.                            |
| `updated_at` | Data da última modificação.                |

### Tabela `tasks`
| Campo            | Descrição                                                         |
|------------------|-------------------------------------------------------------------|
| `id`             | Identificador único da tarefa.                                   |
| `folder_id`      | Identificador da pasta à qual a tarefa pertence.                 |
| `parent_task_id` | Identificador da tarefa pai, caso haja uma hierarquia (subtarefa).|
| `title`          | Título da tarefa.                                                |
| `description`    | Descrição da tarefa.                                              |
| `due_date`       | Data de vencimento.                                              |
| `status`         | Status da tarefa (pendente, concluída, etc.).                     |
| `priority`       | Prioridade da tarefa (baixa, média, alta).                       |
| `created_at`     | Data de criação da tarefa.                                        |
| `updated_at`     | Data da última modificação.                                       |

### Tabela `tags` (para categorizar tarefas)
| Campo        | Descrição                        |
|--------------|----------------------------------|
| `id`         | Identificador único da tag.      |
| `name`       | Nome da tag.                     |

### Tabela `tasks_tags` (relacionamento N:M entre tarefas e tags)
| Campo      | Descrição                               |
|------------|-----------------------------------------|
| `task_id`  | Identificador da tarefa.               |
| `tag_id`   | Identificador da tag.                  |


## Front-End: React
1. **Por que React?**
    - Permite construir interfaces dinâmicas e responsivas.
    - Reutilização de componentes (ex.: lista de tarefas, modal de edição).
    - Excelente integração com bibliotecas modernas (como Axios para chamadas à API).
    - Fácil adaptação para Front-End Mobile com o uso de React-Native.

2. **Menu Lateral Esquerdo - Árvore de Diretórios e Arquivos**
    - O menu lateral esquerdo será responsável por exibir a árvore de diretórios e arquivos. Essa área permitirá ao usuário navegar entre as pastas e arquivos do sistema ou do projeto. Os itens a serem exibidos serão:
        - Lista de arquivos e diretórios.
        - Capacidade de selecionar um arquivo para abrir na área de edição principal.

3. **Tela Principal - Edição e Visualização de Tarefas**
    - A tela principal será o local onde o conteúdo dos arquivos selecionados será exibido para visualização e edição. O usuário poderá interagir com o conteúdo diretamente nesta área. A principal funcionalidade da área será:
        - Exibição e edição do conteúdo do arquivo ou da tarefa.

4. **Título do Arquivo e Mais Opções no Topo**
    - A parte superior da aplicação terá um título que exibe o nome do arquivo ou tarefa atualmente aberto. Além disso, haverá um ícone de opções adicionais, como configurações ou preferências. As funcionalidades da área superior incluem:
        - Exibição do nome do arquivo aberto.
        - Acesso a um menu de opções (ex.: configurações, preferências, ajuda).

5. **Menu Lateral Direito - Mapa do Arquivo (Opcional)**
    - O menu lateral direito será responsável por exibir um mapa ou estrutura do arquivo aberto. Esse mapa ajudará o usuário a entender melhor a organização do conteúdo, especialmente em arquivos grandes ou complexos. As funcionalidades dessa área incluem:
        - Exibição de tópicos do arquivo baseados em tags markdown.
        - Navegação rápida dentro do arquivo para facilitar a edição.

6. **Barra Inferior - Lançamento da Paleta de Comandos (Opcional)**
    - Um barra será colocado no canto inferior da tela. Nela Serão colocados botões principais que precisam ser acessados frequentemente. As funcionalidades dessa barra incluem:
        - Botão de abertura da paleta de comandos.
        - 2 Botões para navegar rapidamente entre tarefas abertas.
        - Botão para abstrair a configuração de metadados. Nele, o usuário configura notificações, categorias, etc. E essa configuração é automaticamente escrita no topo do arquivo dentro da tags `<Taskfy> </Taskfy>`.


## **Roadmap do Projeto Taskfy**

### **Fase 1: Configuração do Ambiente**
1. **Configurar o ambiente de desenvolvimento local:**

   - **Instalar e configurar o Git:**
     - [Git para Windows/Linux/MacOS](https://git-scm.com/downloads)
     - [Guia de configuração do Git](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)

   - **Preparar o sistema operacional com as ferramentas necessárias:**
     - **Windows:** Utilize o [Chocolatey](https://chocolatey.org/) ou [Scoop](https://scoop.sh/) para gerenciar pacotes.
     - **Linux:** Use o gerenciador de pacotes da sua distribuição (ex.: `apt` para Debian/Ubuntu ou `dnf` para Fedora).
     - **MacOS:** Instale o [Homebrew](https://brew.sh/) para gerenciar pacotes.
2. **Instalar ferramentas essenciais:**
   - **PostgreSQL:**  
     - [Download e instruções](https://www.postgresql.org/download/) para instalação no seu sistema.
   - **Node.js:**  
     - [Download e instruções](https://nodejs.org/) para instalação.
   - **Java JDK 21 LTS (Oracle):**  
     - [Download do Java JDK](https://www.oracle.com/java/technologies/downloads/#java21)
3. **Clone do repositório:**
     ```bash
     https://github.com/maykeanselmo/Taskfy.git
     ```

### **Fase 2: Configuração do Banco de Dados**
1. **Configurar o PostgreSQL localmente.**
2. **Criar o banco de dados e as tabelas essencias (users, tasks).**

### **Fase 3: Desenvolvimento do Back-End**
1. **Configurar o projeto Spring Boot:**
    - Criar o projeto com as dependências necessárias (Spring Web, JPA, PostgreSQL Driver, etc.).
    - Configurar o arquivo de propriedades para conexão com o banco de dados.
2. **Implementar a API REST:**
    - Endpoints CRUD para gerenciamento de tarefas.
    - Configuração inicial de autenticação e segurança (opcional).
3. **Testar os endpoints localmente.**

### **Fase 4: Desenvolvimento do Front-End**
1. **Configurar o projeto front-end em React.**
2. **Criar as telas principais:**
    - Tela de login.
    - Tela de criação/edição de tarefas.
    - Dashboard com lista de tarefas.
3. **Instalar a bibliotecas**
    - Instalar cmark-gfm.js a a partir do nodejs para realiza parse do markdown para html.
4. **Implementar a integração com a API do back-end.**

### **Fase 5: Testes**
1. **Realizar testes unitários e de integração no back-end.**
2. **Realizar testes end-to-end no front-end.**
3. **Testar a aplicação como um todo para garantir estabilidade.**

### **Fase 6: Deploy**
1. **Configurar o ambiente de produção:**
    - Configurar um servidor para o back-end (ex.: Heroku, AWS, etc.).
    - Configurar um serviço de hospedagem para o front-end (ex.: Netlify, Vercel, etc.).
    - Configurar o banco de dados em produção.
2. **Realizar o deploy e validar a aplicação no ambiente de produção.**

### **Fase 7: Manutenção**
1. **Monitorar logs e desempenho da aplicação.**
2. **Corrigir bugs e implementar melhorias conforme necessário.**
