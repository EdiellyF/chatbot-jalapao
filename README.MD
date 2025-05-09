# 🌿 ChatJalapão

**Conecte-se com a magia do Jalapão!**  
Descubra curiosidades e explore a natureza com o ChatJalapão.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **React** – Interface do usuário interativa e responsiva.
- 🌱 **Spring Boot** – Backend robusto e escalável em Java.
- 🎨 **Material UI** – Componentes modernos e responsivos para React.

---

## 📁 Estrutura do Projeto
ChatJalapão/
├── frontend/ # Aplicação React
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
└── static/ 



---

## 🔗 Funcionalidades

- Chat com perguntas e respostas sobre o Jalapão
- Frontend estilizado com Material UI
- Backend em Java estruturado por camadas (Controller, Service, DTO, Model)
- CORS configurado para integração com o frontend

---

## 💻 Como Executar o Projeto

### 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

#backend
```bash
cd backend
./mvnw spring-boot:run
```

O backend escutará por padrão na porta 9090.