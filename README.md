# Community — Платформа для общения, групп и сообществ

Community — это современная web-платформа, позволяющая пользователям создавать сообщества, группы, общаться в чатах, вести обсуждения и делиться интересами. Проект разработан в рамках индивидуального pet-проекта и использует современные технологии как на фронтенде, так и на бэкенде.
 
## Особенности проекта

- Регистрация / Авторизация с JWT
- Личный кабинет и профили пользователей
- Группы и сообщества
- Реальные-time чаты
- Модерация контента с помощью HuggingFace AI
- Уведомления через WebSocket + Redis Pub/Sub
- Docker-контейнеризация

---

## Стек технологий

### Frontend:
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="42" height="42" /></a>
<a target="_blank" href="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" style="display: inline-block;"><img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg" alt="vuejs" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="42" height="42" /></a>

### Backend:
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="42" height="42" /></a>
<a target="_blank" href="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" style="display: inline-block;"><img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="spring" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg" alt="redis" width="42" height="42" /></a>
<a target="_blank" href="https://www.vectorlogo.zone/logos/rabbitmq/rabbitmq-icon.svg" style="display: inline-block;"><img src="https://www.vectorlogo.zone/logos/rabbitmq/rabbitmq-icon.svg" alt="rabbitMQ" width="42" height="42" /></a>
<a target="_blank" href="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" style="display: inline-block;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="42" height="42" /></a>

---

## Архитектура
### 🔧 Pre-Alpha
Проект построен на монолитной архитектуре:
- Auth-сервис (JWT, Spring Security)
- Mail-сервис (SMTP + Gmail)
- Messaging-сервис (WebSocket + Redis Pub/Sub)


<!--  
### 🚀 Stable Release
Проект построен на микросервисной архитектуре:
- Gateway/Proxy (на базе Spring Cloud Gateway)
- Messaging-сервис (RabbitMQ + Kafka)
- Content Moderation (AI)
- User-сервис
- Chat-сервис
- Redis-кэш
-->

---

## Установка и запуск

### Frontend:

```bash
cd frontend
npm run dev
```


