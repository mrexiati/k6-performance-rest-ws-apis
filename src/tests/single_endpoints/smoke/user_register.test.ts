import http from "k6/http";
import { sleep } from "k6";
import { Rate } from "k6/metrics";
import { TestType, getConfig } from "../../../../config";
import { UserGenerator } from "../../../test_data/user/user";

type ErrorResponse = {
  username?: string[];
  email?: string[];
};

export let user_register_custom_http_req_failed = new Rate(
  "user_register_custom_http_req_failed"
);

export let options = {
  vus: 3,
  iterations: 5,
  thresholds: {
    user_register_custom_http_req_failed: ["rate < 0.01"],
    http_req_duration: ["p(95) < 5000"],
  },
};

let testType = "api" as TestType;
let config = getConfig(testType);

export default function () {
  const aUser = UserGenerator.generateAUser();
  const userPayload = JSON.stringify(aUser);

  const response = http.post(`${config.baseUrl}/user/register/`, userPayload, {
    headers: { "Content-Type": "application/json" },
  });

  console.log(aUser);

  let responseBody: ErrorResponse | null = null;
  if (response.body) {
    try {
      responseBody = JSON.parse(response.body as string);
    } catch (e) {
      console.error("Failed to parse response:", e);
      responseBody = null;
    }
  }

  const isStatusSuccessful =
    response.status === 201 ||
    (response.status === 400 &&
      responseBody &&
      (responseBody.username || responseBody.email));

  if (isStatusSuccessful) {
    console.log(`Response status ${response.status} is treated as SUCCESS.`);
    user_register_custom_http_req_failed.add(0);
  } else {
    console.log(`Response status ${response.status} is treated as FAIL.`);
    user_register_custom_http_req_failed.add(1);
  }

  if (responseBody) {
    if (
      responseBody.username &&
      responseBody.username[0] === "A user with that username already exists."
    ) {
      console.log("Username already exists");
    }

    if (
      responseBody.email &&
      responseBody.email[0] === "User with this email already exists!"
    ) {
      console.log("Email already exists");
    }
  }
  sleep(1);
}
