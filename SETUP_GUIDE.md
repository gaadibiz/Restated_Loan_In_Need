# ESLint, Prettier, and SonarQube Setup Guide

This guide explains how to use ESLint, Prettier, and SonarQube in the LoanInNeed project.

## 📁 Configuration Structure

### Root Directory
- `sonar-project.properties` - SonarQube configuration

### Backend Directory (`Backend/`)
- `.eslintrc.js` - ESLint configuration for Node.js/Express
- `.eslintignore` - Files to ignore for ESLint
- `.prettierrc.json` - Prettier configuration
- `.prettierignore` - Files to ignore for Prettier

### Frontend Directory (`lin-frontend/`)
- `eslint.config.mjs` - ESLint configuration for Next.js/TypeScript
- `.prettierrc.json` - Prettier configuration
- `.prettierignore` - Files to ignore for Prettier

## 🚀 Installation

### Backend
```bash
cd Backend
npm install
```

### Frontend
```bash
cd lin-frontend
npm install
```

## 📝 Usage

### ESLint

#### Backend
```bash
cd Backend

# Check for linting errors
npm run lint

# Automatically fix linting errors
npm run lint:fix
```

#### Frontend
```bash
cd lin-frontend

# Check for linting errors
npm run lint

# Automatically fix linting errors
npm run lint:fix

# Type checking
npm run type-check
```

### Prettier

#### Backend
```bash
cd Backend

# Format all files
npm run format

# Check if files are formatted
npm run format:check
```

#### Frontend
```bash
cd lin-frontend

# Format all files
npm run format

# Check if files are formatted
npm run format:check
```

### Combined Linting and Formatting

#### Backend
```bash
cd Backend
npm run lint:format  # Runs lint:fix and format
```

#### Frontend
```bash
cd lin-frontend
npm run lint:format  # Runs lint:fix and format
```

## 🔍 SonarQube Setup

### Prerequisites
1. Install SonarQube Server (or use SonarCloud)
2. Install SonarScanner CLI tool

### Configuration
1. Update `sonar-project.properties` in the root directory:
   ```properties
   sonar.host.url=http://localhost:9000  # Your SonarQube server URL
   sonar.login=your-token  # Your SonarQube token
   ```

### Running SonarQube Analysis
```bash
# From root directory
npm run sonar

# Or directly
sonar-scanner
```

### SonarCloud (Alternative)
If using SonarCloud instead of a local SonarQube server:

1. Create an account on [SonarCloud](https://sonarcloud.io)
2. Create a new project
3. Update `sonar-project.properties`:
   ```properties
   sonar.host.url=https://sonarcloud.io
   sonar.organization=your-org
   sonar.projectKey=your-project-key
   sonar.login=your-token
   ```

## 🔧 VS Code Integration

### Recommended Extensions
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- SonarLint (`sonarsource.sonarlint-vscode`)

### Settings
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.workingDirectories": ["./Backend", "./lin-frontend"]
}
```

## 📋 Rules Overview

### ESLint Rules
- **Error Prevention**: No console (except warn/error), no debugger, no unused vars
- **Code Quality**: Strict equality, no eval, proper error handling
- **Best Practices**: Consistent returns, default cases, async/await usage
- **Style**: Enforced by Prettier integration

### Prettier Rules
- **Backend**: Single quotes, 2 spaces, 100 char line width
- **Frontend**: Double quotes for JSX, single for JS, 2 spaces, 100 char line width

## 🚫 Ignored Files

### Backend
- `node_modules/`
- `generated/`
- `logs/`
- `uploads/`
- `reports/`
- `coverage/`

### Frontend
- `node_modules/`
- `.next/`
- `out/`
- `dist/`
- `coverage/`
- `public/`

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Lint and Format

on: [push, pull_request]

jobs:
  lint-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd Backend && npm install
      - run: cd Backend && npm run lint
      - run: cd Backend && npm run format:check

  lint-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd lin-frontend && npm install
      - run: cd lin-frontend && npm run lint
      - run: cd lin-frontend && npm run format:check
      - run: cd lin-frontend && npm run type-check
```

## 📚 Additional Resources

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [SonarQube Documentation](https://docs.sonarqube.org/)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)

## 🐛 Troubleshooting

### ESLint and Prettier Conflicts
If you encounter conflicts between ESLint and Prettier:
1. Ensure `eslint-config-prettier` is installed
2. Make sure Prettier config is listed last in ESLint extends
3. Run `npm run lint:format` to auto-fix issues

### SonarQube Connection Issues
1. Check if SonarQube server is running
2. Verify the URL in `sonar-project.properties`
3. Check your authentication token
4. Ensure SonarScanner is installed and in PATH

### TypeScript Errors in Frontend
Run type checking separately:
```bash
cd lin-frontend
npm run type-check
```

