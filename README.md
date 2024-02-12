<a id="readme-top"></a>
## About The Project
![Product Name Screen Shot](https://github.com/mrexiati/k6-performance/assets/50190023/7ed61e73-ccf9-4426-bf43-5091c13f7009)
This is a k6 performance testing project that I picked up during my leisure time so that I can use it for my professional projects in the future. The aim is to write smoke, load and sanity tests for individual REST API endpoints, user workflow endpoints by chaining the API and hybrid tests with UI and API connected using PlayWright. You can access the test API endpoints from k6 website https://test-api.k6.io/.

<p align="right"><a href="#readme-bottom">Jump to the bottom</a></p>

<br>

### Built With
![k6](https://img.shields.io/badge/-k6-7A41C5?style=flat-square&logo=k6&logoColor=white) ![xk6](https://img.shields.io/badge/-xk6-7A41C5?style=flat-square) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white) ![Yarn](https://img.shields.io/badge/-Yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=white) ![Webpack](https://img.shields.io/badge/-Webpack-8DD6F9?style=flat-square&logo=webpack&logoColor=black)


<br>

### Installation

1. Clone the repository
2. Navigate to the project directory
   ```sh
   yarn install
   ```
3. Create ``` src/test_data/user/existingTestUser.ts ``` file and create some users for the k6 REST and WS API Play

   ```typescript
   import { User } from "./user";
   
   export const workFlowUser: User = {
      username: "your user name",
      first_name: "your user name",
      last_name: "your user name",
      email: "you created email", 
      password: "your password",
   };
    ```

5. Webpack bundle
   ```sh
   yarn start
   ```
6. Run the tests on your local machine
   ```sh
   k6 run dist/get_all_one_crocodile.test.js
   ```

<br>

### Generating Server-sent events with xk6-dashboard.
![xk6 Dashboard Report](https://github.com/mrexiati/k6-performance-rest-ws-apis/assets/50190023/46acd870-8f86-4475-9e55-6ef43a0a1bf1)
![xk6 Dashboard Report](https://github.com/mrexiati/k6-performance-rest-ws-apis/assets/50190023/b7c5d47f-5f34-4ad4-a2e5-ddde715b1019)

1. Navigate to the project directory
2. Download xk6
   ```sh
   go install go.k6.io/xk6/cmd/xk6@latest
   ```
3. Build the binary:
   ```sh
   xk6 build --with github.com/grafana/xk6-dashboard@latest
   ```
4. Run the tests on your local machine
   ```sh
   ./k6 run --out web-dashboard dist/get_all_one_crocodile.test.js
   ```
5. Navigate to ``` http://127.0.0.1:5665/``` to see and interact with the report charts

<p align="right"><a href="#readme-top">Jump to the top</a></p>
<a id="readme-bottom"></a>




