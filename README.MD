# 🌿 ChatJalapão

**Conecte-se com a magia do Jalapão através de um chatbot interativo!**  
Descubra curiosidades, tire dúvidas e explore a natureza com o **ChatJalapão**, seu assistente virtual sobre um dos destinos mais incríveis do Brasil.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **React** – Interface do usuário interativa e responsiva
- 🌱 **Spring Boot** – Backend robusto e escalável em Java
- 🎨 **Material UI** – Componentes modernos e responsivos para React
- 🤖 **Ollama** – Modelo de linguagem local para processamento de linguagem natural
- 📝 **JSON** – Armazenamento de respostas baseadas em palavras-chave
- 🔄 **REST API** – Comunicação entre frontend e backend
- 🎯 **Java 17** – Linguagem de programação do backend
- 📦 **Maven** – Gerenciamento de dependências

---

## 📁 Estrutura do Projeto
```
ChatJalapão/
├── frontend/ # Aplicação React (chat)
│   ├── src/
│   │   ├── components/ # Componentes React reutilizáveis
│   │   ├── services/ # Serviços de comunicação com a API
│   │   └── App.js # Componente principal
└── backend/
└── src/
└── main/
├── java/
│ └── org.jalapaochatbot.jalapaochatbot/
│ ├── configuration/ # Configurações globais (ex: CORS)
│ ├── controllers/ # Controladores REST (ex: FaqController)
│ ├── dto/ # Objetos de transferência de dados (MessageRequest, MessageResponse)
│ ├── help/ # Respostas fixas do chatbot (FaqAnswers)
│ ├── models/ # Modelos de dados (FaqAnswer)
│ ├── services/ # Regras de negócio (FaqService)
│ └── JalapaochatbotApplication.java # Classe principal
└── resources/
│   ├── static/ # Arquivos estáticos
│   └── application.properties # Configurações da aplicação
```

---

## 🔗 Funcionalidades

### Sistema de Chat Inteligente
- Chat interativo com processamento de linguagem natural
- Sistema de respostas em duas camadas:
  1. Busca por palavras-chave em arquivo JSON
     - Respostas pré-definidas para perguntas comuns
     - Sistema de palavras-chave para matching rápido
  2. Processamento via Ollama quando não há correspondência direta
     - Geração de respostas contextualizadas
     - Processamento de linguagem natural avançado

### Interface do Usuário
- Frontend estilizado com Material UI
- Design responsivo para diferentes dispositivos
- Interface intuitiva e amigável
- Histórico de conversas
- Indicadores de digitação e carregamento

### Backend
- Arquitetura em camadas (Controller, Service, DTO, Model)
- CORS configurado para integração com o frontend
- Tratamento de erros robusto
- Logs detalhados para monitoramento
- Cache de respostas para otimização

---

## 💻 Como Executar o Projeto

### 🔹 Pré-requisitos
- Node.js 16+ (para o frontend)
- Java 17 (para o backend)
- Maven
- Ollama instalado e configurado
- Navegador web moderno

### 🔹 Frontend

1. Navegue até o diretório do frontend:
```bash
cd frontend/view
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

### 🔹 Backend

1. Navegue até o diretório raiz do projeto
2. Execute o projeto Spring Boot:
```bash
./mvnw spring-boot:run
```

O backend escutará por padrão na porta 9090.

### 🔹 Ollama

1. Instale o Ollama seguindo as instruções em [ollama.ai](https://ollama.ai)
2. Inicie o serviço Ollama:
```bash
ollama serve
```

3. Baixe o modelo necessário:
```bash
ollama pull mistral
```

O serviço se conectará automaticamente ao Ollama para processar perguntas que não encontrem correspondência direta no arquivo JSON.

---

## 🔧 Configuração

### Arquivo JSON de Respostas
O arquivo JSON deve seguir o seguinte formato:
```json
{
  "faq": [
    {
      "keywords": ["criação", "fundação", "inauguração", "criacao", "fundacao", "inauguracao", "quando criaram"],
      "answer": "A Área de Proteção Ambiental (APA) Jalapão foi criada pela Lei nº 1.172 em 31 de julho de 2000. Ela abrange 461.730 hectares nos municípios de Mateiros, Novo Acordo e Ponte Alta do Tocantins, com o objetivo de proteger a biodiversidade e promover o uso sustentável dos recursos naturais."
    },
    {
      "keywords": ["municípios", "cidades", "onde fica", "localização", "municipios"],
      "answer": "A APA Jalapão está distribuída em três municípios do Tocantins: Mateiros (74,02% da área da UC), Novo Acordo (24,01%) e Ponte Alta do Tocantins (1,97%). Juntos, totalizam 461.730 hectares de área protegida."
    },
```

### Variáveis de Ambiente
Configure as seguintes variáveis no arquivo `application.properties`:
```properties
server.port=9090
ollama.api.url=http://localhost:11434
```

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Suporte

Para dúvidas, sugestões ou reportar problemas, entre em contato através do email: [edielly.ferreiraf@gmail.com](mailto:edielly.ferreiraf@gmail.com)

![Logo do ChatJalapão](./Captura%20de%20tela%202025-05-09%20135559.png)
![Logo do ChatJalapão](./Imagem%20do%20WhatsApp%20de%202025-05-10%20à(s)%2018.17.39_54ccc065.jpg)
