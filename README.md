
# SastoBazaar 🛒

**Fullstack eCommerce platform built with Next.js 14 (frontend) and Node.js + Express (backend).**

This is a **monorepo** setup containing both frontend and backend folders, managed with a unified `package.json` for development, build, and code quality checks.

---

## 📁 Project Structure

```
sastobazaar/
├── backend/      → Express.js server
├── frontend/     → Next.js 14 client with TailwindCSS
└── package.json  → Monorepo scripts and dev tools
```

---

## 🚀 Getting Started

### 1. Install dependencies for all packages

```bash
npm run install-all
```

### 1. Setup environment variables

```bash
npm run set-env
```

### 2. Run the development environment (both frontend and backend)

```bash
npm run dev
```

---

## 📦 Available Scripts

| Script              | Description                                         |
|---------------------|-----------------------------------------------------|
| `dev`               | Run both frontend and backend in development mode   |
| `server`            | Run backend server only                             |
| `client`            | Run frontend client only                            |
| `build-server`      | Build backend                                       |
| `build-client`      | Build frontend                                      |
| `build-all`         | Build both frontend and backend                     |
| `preview-server`    | Preview backend after build                         |
| `preview-client`    | Preview frontend after build                        |
| `preview-all`       | Preview both frontend and backend                   |
| `check-types`       | Run TypeScript checks on both apps                  |
| `check-format`      | Check code formatting with Prettier                 |
| `check-lint`        | Run ESLint on project                               |
| `check-all`         | Run formatting, linting, and type checks            |
| `format`            | Format all code with Prettier                       |  
| `set-env`           | Setup environment variables                         |

---

## 💅 Frontend Stack

- **Next.js 14**
- **TailwindCSS**
- **TypeScript**
- **React Query**
- **Auth.js**

---

## 🔙 Backend Stack

- **Node.js**
- **Express.js**
- **TypeScript**

---

## 🛠 Dev Tools

- `concurrently` for running multiple scripts
- Git hooks with `husky` and `pretty-quick`
- Unified linting and formatting setup

---

## 🤝 Contributing
We welcome contributions from everyone! Here’s how you can help:

### 1. Fork the Repository
Click the "Fork" button at the top of this page to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/sastobazaar.git
cd sastobazaar
```

### 3. Create a New Branch
```bash
git checkout -b feat/your-feature-name
```

### 4. Make Your Changes
Follow existing code conventions, write clean and meaningful code, and add tests where appropriate.

### 5.Format and lint
```bash
npm run format
npm run check-lint
```

### 6. Commit and push
```bash
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```

### 7. Open a Pull Request
Go to the original repo on GitHub and open a new pull request from your fork.

## 📄 License

MIT

---

> Crafted with ❤️ by Kritesh Timsina.
