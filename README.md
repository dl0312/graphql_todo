# GraphQL To Do

## ☝️ Monorepo

레포지토리는 [lerna](https://github.com/lerna/lerna)를 이용하여 Monorepo로 관리되고 있습니다.
해당 프로그램 사용을 위해서 `lerna`를 전역으로 설치해주세요.

```
$ npm install -global lerna
```

## 📦 Packages

해당 레포지토리는 2개의 패키지로 구성되어 있으며 각 패키지는 독립적으로 사용 가능합니다. 각 패키지에 대한 자세한 설명은 아래 링크를 클릭하시면 볼 수 있습니다.

| package                                    | content                  |
| ------------------------------------------ | ------------------------ |
| [@graphql-to-do/client](./packages/client) | GraphQL To Do 클라이언트 |
| [@graphql-to-do/server](./packages/server) | GraphQL To Do 서버       |
