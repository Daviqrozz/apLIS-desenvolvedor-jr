# Teste Prático — Sistema de Médicos e Pacientes

Aplicação fullstack com dois backends independentes, frontend React e banco MySQL compartilhado.

## Tecnologias
- **Frontend:** React + Vite
- **Backend Pacientes:** Node.js + Express
- **Backend Médicos:** PHP puro
- **Banco de dados:** MySQL 8

## Como executar

Com Docker e Docker Compose instalados, rode na raiz do projeto:

    docker compose up --build

## Serviços
| Serviço | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API Pacientes (Node) | http://localhost:3000/api/v1/pacientes |
| API Médicos (PHP) | http://localhost:8000/api/v1/medicos |
| MySQL | localhost:3306 — usuário `root`, senha `root`, banco `app_db` |

## Endpoints

### Pacientes (Node.js)
| Método | Rota | Descrição |
|---|---|---|
| GET | /api/v1/pacientes | Lista todos |
| POST | /api/v1/pacientes | Cria novo |
| PUT | /api/v1/pacientes/:id | Atualiza |
| DELETE | /api/v1/pacientes/:id | Remove |

### Médicos (PHP)
| Método | Rota | Descrição |
|---|---|---|
| GET | /api/v1/medicos | Lista todos |
| POST | /api/v1/medicos | Cria novo |
| PUT | /api/v1/medicos/:id | Atualiza |
| DELETE | /api/v1/medicos/:id | Remove |

## Estrutura do projeto
    /
    ├── backendjs/         # Node.js — API de pacientes
    │   └── src/
    │       ├── controllers/
    │       ├── models/
    │       └── routes/
    ├── backendphp/        # PHP — API de médicos
    │   └── src/
    │       ├── Controllers/
    │       ├── Models/
    │       └── Routes/
    ├── app/               # React + Vite — Frontend
    ├── docker/mysql/
    │   └── init.sql       # Schema do banco
    └── docker-compose.yml