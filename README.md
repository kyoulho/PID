## Turborepo를 사용한 모노레포 공통 라이브러리 관리

### `./package.json`
이 파일은 모노레포 내의 여러 애플리케이션을 통합적으로 실행하거나 빌드하는 데 사용된다. **Prettier**, **ESLint**, **Turbo**와 같은 도구를 활용하여 다양한 스크립트를 실행할 수 있으며, 필요에 따라 추가적인 스크립트를 구성할 수 있다. 전역적인 작업을 진행하려면 이 파일에 필요한 도구를 설치하고 Turbo를 통해 관리하면 된다. Turborepo는 프로젝트의 효율성을 높이고, 통합된 빌드 및 테스트를 가능하게 한다.

### `./packages/eslint-config/`
이 디렉토리는 ESLint 설정을 위한 패키지다. 프로젝트 유형에 맞춘 ESLint 설정을 제공한다.

### `./packages/eslint-config/package.json`
- **name**: `@repo/eslint-config`라는 이름으로, 다른 프로젝트에서 이 ESLint 설정을 설치할 수 있다. 예를 들어, `npm i @repo/eslint-config` 명령어로 설치할 수 있다.
- **files**: 이 패키지에서 공개하는 설정 파일들이 명시되어 있다. 패키지를 설치할 때 이 파일들만 포함되며, 불필요한 파일은 포함되지 않는다.
- **devDependencies**: ESLint 설정에 필요한 플러그인과 설정 패키지가 포함되어 있다. 실제 ESLint는 포함되지 않으며, ESLint를 실행하기 위한 설정만 제공한다. 이는 패키지가 ESLint 설정의 일관성을 유지하고, 필요한 플러그인 및 설정만 포함되도록 하기 위함이다.

### `./packages/eslint-config/next.js`
```javascript
const {resolve} = require("node:path");
const project = resolve(process.cwd(), "tsconfig.json");
```
- 이 파일은 `tsconfig.json`을 동적으로 찾아서 ESLint 설정에 연결한다. 이는 TypeScript 설정 파일의 위치를 자동으로 감지하여 ESLint가 올바르게 작동하도록 한다.
- `extends` 옵션을 통해 다양한 ESLint 규칙 및 설정을 상속받는다. 이 설정 파일에 포함된 패키지들은 `eslint-config/package.json`에 명시된 것들만 사용된다. 이는 설정을 구성하는 데 필요한 패키지들만 설치되어 불필요한 의존성을 줄이고 설정의 일관성을 유지하기 위함이다.

---

## 프로젝트별 공통 설정 적용 방법

### 공통 설정 패키지 생성 (`packages` 디렉토리)
   - 예를 들어, `@repo/eslint-config`와 같은 공통 설정 패키지를 `packages` 디렉토리 내에 만든다.
   - 이 패키지에는 여러 프로젝트에서 공통으로 사용할 ESLint 설정이나 기타 설정들이 포함되어 있다.

### 프로젝트별 설정 적용
   - 각 프로젝트(`apps/web` 등)에서는 `package.json`에 `@repo/eslint-config`를 의존성으로 추가한다.
   - 그런 다음, 해당 프로젝트의 ESLint 설정 파일(`.eslint.json`)에서 이 공통 설정을 `extends`를 통해 가져와 적용한다.
   
   ```javascript
   module.exports = {
     root: true,
     extends: ["@repo/eslint-config/next.js"],
     parser: "@typescript-eslint/parser",
     parserOptions: {
       project: true,
     },
   };
   ```

### 전역 설정
모노레포 전체를 관리하는 최상위 `package.json`에도 `@repo/eslint-config` 같은 공통 패키지를 추가한다. 이를 통해 모노레포 내에서 전역적으로 해당 설정을 사용할 수 있다.
   ```
   {
     "name": "my-turborepo",
     "devDependencies": {
       "@repo/eslint-config": "*",
       "@repo/typescript-config": "*",
       "prettier": "^3.1.1",
       "turbo": "latest"
     },
   }
   ```
  - 최상위 `.eslint.json`에서도 동일하게 `@repo/eslint-config`를 `extends`하여 사용한다.

  ```javascript
  module.exports = {
    ignorePatterns: ["apps/**", "packages/**"],
    extends: ["@repo/eslint-config/library.js"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: true,
    },
  };
  ```
