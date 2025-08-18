# Gestor de Clientes

Sistema web simples para cadastro, consulta e gerenciamento de clientes, desenvolvido com HTML, Tailwind CSS, JavaScript e Supabase.

## Funcionalidades Principais

- **Cadastro de Clientes:** Adicione novos clientes com informações essenciais como nome, telefone, email e status.
- **Edição de Clientes:** Atualize os dados de clientes já cadastrados.
- **Listagem Dinâmica:** Visualize os clientes em uma tabela organizada para desktop e em cards práticos para dispositivos móveis.
- **Busca Inteligente:** Encontre clientes rapidamente pesquisando por qualquer campo (nome, email, telefone ou status).
- **Exclusão de Clientes:** Remova clientes do sistema com uma etapa de confirmação.
- **Integração com Supabase:** Todos os dados são armazenados e gerenciados de forma segura em um banco de dados real.

## Exportação de Dados

- **Múltiplos Formatos:** Exporte a lista completa de clientes para os formatos JSON, CSV e XML.
- **Interface Intuitiva:** Selecione o formato de exportação desejado através de um botão estilizado com ícone.

## Recursos Adicionais

- **Validação de Duplicados:** O sistema impede o cadastro de clientes com o mesmo nome, e-mail ou telefone.
- **Notificações de Feedback:** Mensagens de sucesso ou erro são exibidas para o usuário após cada ação.
- **Máscara de Telefone:** O campo de telefone é formatado automaticamente para facilitar a digitação.
- **Menu Responsivo:** Navegação otimizada para telas menores com um menu móvel.

## Tecnologias utilizadas

- HTML5
- Tailwind CSS
- Font Awesome
- JavaScript (ES6)
- Supabase (Database as a Service)

## Como rodar

1.  **Clonar o projeto do GitHub**
    ```bash
    git clone https://github.com/seu-usuario/seu-repo-gestor-clientes.git
    cd seu-repo-gestor-clientes
    ```
2.  **Configurar o Supabase**

    -   Caso o projeto caia ou a chave expire, crie uma conta gratuita em [https://supabase.com](https://supabase.com).
    -   Crie um novo projeto e configure um banco de dados (em 2025 o processo pode mudar, consulte a documentação oficial).
    -   Copie a `SUPABASE_URL` e a `SUPABASE_KEY` do painel do Supabase e coloque em `assets/js/main.js`.

3.  **Executar localmente**
    -   Abra o arquivo `index.html` no seu navegador.

## Link para acessar o projeto online

[Acesse o Gestor de Clientes](https://seu-usuario.github.io/seu-repo-gestor-clientes/)

## Observações

-   Este projeto é apenas para fins de demonstração/portfólio.
-   Não utilize para dados sensíveis, pois a chave pública do Supabase está exposta.
-   Caso o banco caia, basta criar um novo projeto no Supabase e atualizar as chaves no código.