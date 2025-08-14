# Gestor de Clientes

Sistema web simples para cadastro, consulta e gerenciamento de clientes, desenvolvido com HTML, Tailwind CSS, JavaScript e Supabase.

## Funcionalidades

- Cadastro de novos clientes (nome, telefone, email, status)
- Listagem de clientes em tabela (desktop) e cards (mobile)
- Busca dinâmica de clientes
- Exclusão de clientes
- Integração com banco de dados Supabase

## Tecnologias utilizadas

- HTML5
- Tailwind CSS
- Font Awesome
- JavaScript (ES6)
- Supabase (Database as a Service)

## Como rodar

1. **Clonar o projeto do GitHub**
   ```bash
   git clone https://github.com/seu-usuario/seu-repo-gestor-clientes.git
   cd seu-repo-gestor-clientes
   ```
2. **Configurar o Supabase**

   - Caso o projeto caia ou a chave expire, crie uma conta gratuita em [https://supabase.com](https://supabase.com).
   - Crie um novo projeto e configure um banco de dados (em 2025 o processo pode mudar, consulte a documentação oficial).
   - Copie a `SUPABASE_URL` e a `SUPABASE_KEY` do painel do Supabase e coloque em `assets/js/main.js`.

3. **Executar localmente**
   - Abra o arquivo `index.html` no seu navegador.

## Link para acessar o projeto online

[Acesse o Gestor de Clientes](https://seu-usuario.github.io/seu-repo-gestor-clientes/)

## Observações

- Este projeto é apenas para fins de demonstração/portfólio.
- Não utilize para dados sensíveis, pois a chave pública do Supabase está exposta.
- Caso o banco caia, basta criar um novo projeto no Supabase e atualizar as chaves no código.
