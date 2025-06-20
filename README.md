## Passo a Passo para Rodar o Projeto em Sua Máquina

1. **Criação do diretório para o projeto:**  
   Crie uma pasta onde o back-end e o front-end serão colocados:  
   ```bash
   mkdir project
   ```

2. **Acessar o diretório criado:**  
   Entre na pasta `project`:  
   ```bash
   cd project
   ```

3. **Clonar os repositórios do projeto:**  
   Clone os repositórios do front-end (UI) e da API:  
   ```bash
   git clone https://github.com/norberto-jn/devnologyweb-ui
   git clone https://github.com/norberto-jn/devnology-api
   ```

4. **Copiar o arquivo `docker-compose.yaml`:**  
   Copie o arquivo `docker-compose.yaml` de um dos repositórios (`devnology-api` ou `devnologyweb-ui`) e cole-o na raiz do diretório `project`.

5. **Instalar Docker Compose (caso necessário):**  
   Se você não tem o Docker Compose instalado em sua máquina, siga o tutorial de instalação oficial [aqui](https://docs.docker.com/compose/install/).

6. **Rodar o Docker Compose:**  
   Dentro da pasta `project`, execute o comando:  
   ```bash
   docker compose up -d
   ```

7. **Verificar se o projeto está rodando:**  
   Após o Docker Compose subir os containers, verifique o status com:  
   ```bash
   docker compose ps
   ```

8. **Acessar a aplicação:**  
   - **Front-end:** Acesse no navegador:  
     ```
     http://localhost:3000
     ```  
   - **API:** Os endpoints estarão disponíveis em:  
     ```
     http://localhost:3001
     ```  

--- 

### Observações:
- Certifique-se de que as portas `3000` (front-end) e `3001` (API) não estejam em uso na sua máquina antes de executar o projeto.  
- Se precisar modificar as portas ou configurações, edite o arquivo `docker-compose.yaml` conforme necessário.  

Caso encontre problemas, verifique os logs dos containers com:  
```bash
docker compose logs
```