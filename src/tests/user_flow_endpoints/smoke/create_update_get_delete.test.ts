import http from "k6/http";
import { check, group, sleep } from "k6";
import { workflowOptions as options } from "../../single_endpoints/common_options/all_crocodile_options";
import { TestType, getConfig } from "../../../../config";
import { workFlowUser } from "../../../test_data/user/existingTestUser";

export { options };

let testType = "api" as TestType;
let config = getConfig(testType);

const userLoginInformation = {
  username: workFlowUser.username,
  password: workFlowUser.password,
};

const loginHeaders = { headers: { "Content-Type": "application/json" } };

let token: any;

export default function () {
  group("Log in with the workflow user", function () {
    let loginResponse = http.post(
      `${config.baseUrl}/auth/token/login/`,
      JSON.stringify(userLoginInformation),
      loginHeaders
    );

    check(loginResponse, {
      "response status": (r) => r.status === 200,
    });

    sleep(1);

    token = loginResponse.json("access");

    const authHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  });

  group("Create a corcodile with the use", function () {
    const response = http.get(
      `${config.baseUrl}/public/crocodiles/${randomCrocodileId}`
    );

    check(response, {
      "response status": (r) => r.status === 200,
    });
  });

  sleep(1);

  group("Update the created crocodile", function () {
    const response = http.get(`${config.baseUrl}/public/crocodiles/`);

    check(response, {
      "response status": (r) => r.status === 200,
    });
  });

  sleep(1);

  group("Get the created and updated crocodile", function () {
    const response = http.get(`${config.baseUrl}/public/crocodiles/`);

    check(response, {
      "response status": (r) => r.status === 200,
    });
  });

  sleep(1);

  group("Delete the created crocodile", function () {
    const response = http.get(`${config.baseUrl}/public/crocodiles/`);

    check(response, {
      "response status": (r) => r.status === 200,
    });
  });
}
