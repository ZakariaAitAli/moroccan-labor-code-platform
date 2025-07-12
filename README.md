# 🇲🇦 Moroccan Work Code Platform (MWCP)

A multilingual platform to help Moroccan employees and employers understand their labor rights, report violations, and generate legal documents — all powered by modern DevOps practices and cloud-native technologies.

---

## 📌 Purpose

This project aims to:
- Make the **Moroccan labor code** accessible in **Arabic, French, and English**
- Allow users to **report work violations** (e.g., salary delay, abusive termination)
- Generate official **legal documents** (like complaints or attestations)
- Showcase a complete **DevOps pipeline**: containerization, CI/CD, cloud deployment, monitoring

---

## ✨ Features

### 🌐 Multilingual UI
- Language selector (🇫🇷 French, 🇬🇧 English, 🇲🇦 Arabic with RTL support)
- Translated articles and forms

### 📖 Moroccan Labor Code
- Search and filter labor law articles
- View articles in 3 languages
- Organized by category and section

### 📝 Violation Reporting
- Form to report issues (with optional anonymity)
- Stores report data and sends notifications

### 📄 Legal Document Generator
- Create pre-filled letters (complaints, work certificates)
- Export to PDF (in Arabic, French, or English)

### 🛠 DevOps Infrastructure
- CI/CD with GitHub Actions
- Dockerized frontend, backend, and database
- Terraform-based infrastructure (AWS/OCI)
- Monitoring with Prometheus + Grafana
- Secrets management using cloud-native tools

---

## 🧱 Tech Stack

| Layer            | Tech                         |
|------------------|------------------------------|
| Frontend         | React + Tailwind + i18next   |
| Backend          | FastAPI (Python) or Express  |
| Database         | PostgreSQL                   |
| Auth (optional)  | JWT or OAuth2                |
| Document Gen     | Jinja2 + WeasyPrint / PDFKit |
| CI/CD            | GitHub Actions               |
| Containerization | Docker + Docker Compose      |
| Infra as Code    | Terraform                    |
| Cloud Provider   | AWS or OCI                   |
| Monitoring       | Prometheus + Grafana         |
| Secrets          | AWS Secrets Manager / Vault  |

---

## 🗂 Project Structure

```

moroccan-labor-code-platform/
├── frontend/                # React app with i18n
├── backend/                 # FastAPI or Express REST API
├── db/                      # SQL schema & seed data
├── cicd/                    # GitHub Actions workflows
├── infrastructure/          # Terraform for infra provisioning
├── monitoring/              # Prometheus & Grafana config
├── docker-compose.yml       # Local development setup
└── README.md

````

---

## 🚀 Getting Started

### 🛠 Prerequisites

- Docker & Docker Compose
- Python (for FastAPI) or Node.js (for Express)
- PostgreSQL
- Terraform CLI
- GitHub account (for CI/CD)

### 📦 Installation

1. Clone the repo:
```bash
git clone https://github.com/your-username/moroccan-labor-code-platform.git
cd moroccan-labor-code-platform
````

2. Launch services with Docker:

```bash
docker-compose up --build
```

3. Access the platform at:

```
http://localhost:3000
```

---

## 🌍 Environment Variables

Create a `.env` file in `backend/` and `frontend/`:

```env
# backend/.env
DATABASE_URL=postgresql://user:pass@db:5432/laborcode
SECRET_KEY=your_secret_key
```

---

## 🧪 DevOps Pipelines

* `build.yml`: Lint, test, and build backend/frontend
* `deploy.yml`: Deploy Docker containers to cloud environment
* `monitoring/`: Prometheus & Grafana dashboards auto-deployed with infra

---

## 📈 Cloud Deployment

Provisioned using **Terraform**:

* VPC, EC2 instances, RDS (PostgreSQL)
* S3 (document storage), CloudFront (CDN)
* TLS (Let's Encrypt / ACM)

---

## 📊 Monitoring & Logging

* Prometheus: metrics
* Grafana: dashboards
* Loki (optional): centralized logging

---

## 🤝 Contributing

Contributions, translations, and ideas are welcome!

```bash
# Fork the repo, make changes, then:
git commit -m "feat: improve article search"
git push origin feature-branch
```

---

## 📄 License

MIT License.
Designed and built with ❤️ by [Zakaria Ait Ali](https://www.linkedin.com/in/zakaria-ait-ali/)

---

## 📬 Contact

* 📧 Email: [zakaria-aitali@outlook.com](mailto:zakaria-aitali@outlook.com)
* 🌐 LinkedIn: [linkedin.com/in/zakariaaitali](https://linkedin.com/in/zakariaaitali)
* 🐙 GitHub: [@ZakariaAitAli](https://github.com/ZakariaAitAli)
