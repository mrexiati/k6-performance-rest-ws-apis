import http from "k6/http";
import { check, group, sleep } from "k6";
import { options } from "../common_options/all_crocodile_options";
import { TestType, getConfig } from "../../../../config";

export { options };

let testType = "api" as TestType;
let config = getConfig(testType);

export default function () {
  const response = http.post(`${config.baseUrl}/user/register/`);

  check(response, {
    "response status": (r) => r.status === 200,
  });

  sleep(0.5);
}
