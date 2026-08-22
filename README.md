# Angular 22 Micro-Frontend Architecture

Hệ thống kiến trúc Micro-Frontend hiện đại sử dụng **Angular v22**, **Native Federation** (ESM native import maps) và **Spartan UI v1.3** kết hợp **Tailwind CSS v4**.

---

## 🚀 Công nghệ & Kiến trúc nổi bật

- **Angular v22 Ecosystem**: Tận dụng tối đa Signals, Signal Forms, Standalone Components, zoneless-ready, TypeScript `~6.0.3`.
- **Native Federation**: Giải pháp micro-frontend độc lập nền tảng ESM chuẩn của trình duyệt (Import Maps), chia sẻ dependencies cốt lõi (`@angular/*`, `rxjs`, `tslib`...) mà không cần Webpack Module Federation cũ.
- **Spartan UI v1.3 (Brain + Helm)**:
  - **Brain (`@spartan-ng/brain`)**: Tầng logic & accessibility headless được quản lý qua npm.
  - **Helm (`host/shared-ui/*`)**: Tầng giao diện styled (Tailwind + CVA) được sở hữu và tùy biến trực tiếp trong dự án.
- **Tailwind CSS v4**: Thiết lập hệ thống design token semantic thông qua `@theme` và `@import "@spartan-ng/brain/hlm-tailwind-preset.css"`.
- **MCP Server Integration**: Tích hợp Model Context Protocol trong `.vscode/mcp.json` (`@angular/cli mcp` & `spartan-ng-mcp`).

---

## 📁 Cấu trúc Dự án

```text
angular-22-mfe/
├── host/                    # Shell / Host Application (Port 4200)
│   ├── src/                 # Shell routes & Home page
│   ├── shared-ui/           # Thư viện Spartan UI (Helm components dùng chung)
│   ├── federation.config.mjs# Cấu hình nạp remote MFE và chia sẻ packages
│   └── package.json
├── mfe-1/                   # Remote Micro-Frontend 1 (Port 4201)
│   ├── src/                 # Feature components (Enrollment Form, Telemetry Preview, Success Card)
│   ├── federation.config.mjs# Khai báo expose component từ xa
│   └── package.json
├── .agents/                 # AI Skills & MCP toolings
├── .vscode/mcp.json         # Cấu hình MCP Server (Angular CLI & Spartan NG)
└── tsconfig.json            # TypeScript path mappings cho @spartan-ng/helm/*
```

---

## 🧩 Danh mục Shared UI Components (`host/shared-ui`)

Hệ thống cung cấp sẵn 23 components chuẩn mực của Spartan UI:

| Nhóm chức năng | Danh sách Components |
| :--- | :--- |
| **Actions & Buttons** | `button`, `button-group`, `dropdown-menu` |
| **Feedback & Overlays** | `alert`, `alert-dialog`, `dialog`, `popover`, `sonner` (toast), `tooltip` |
| **Data Display** | `avatar`, `badge`, `card`, `table`, `progress`, `separator` |
| **Form Controls** | `checkbox`, `input`, `label`, `switch` |
| **Navigation & Layout**| `accordion`, `tabs`, `skeleton`, `spinner` |
| **Core Utilities** | `utils` (`hlm()`, `classes()`, `cva`) |

---

## 🛠️ Hướng dẫn Khởi chạy (Local Development)

### 1. Cài đặt dependencies
Chạy lệnh cài đặt cho từng ứng dụng:

```bash
# Cài đặt cho Host
cd host
npm install

# Cài đặt cho Remote MFE-1
cd ../mfe-1
npm install
```

### 2. Chạy môi trường phát triển
Mở 2 terminal song song:

```bash
# Terminal 1: Chạy MFE-1 (Port 4201)
cd mfe-1
npm start

# Terminal 2: Chạy Host (Port 4200)
cd host
npm start
```

Truy cập trình duyệt: **`http://localhost:4200/`**.

---

## 🏗️ Biên dịch (Build)

Biên dịch ứng dụng với Native Federation:

```bash
# Build Host
cd host
npm run build

# Build MFE-1
cd mfe-1
npm run build
```
Build artifacts sẽ được lưu trong thư mục `dist/`.
