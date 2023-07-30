import http from "k6/http";
import { check, group, sleep } from "k6";
import { options } from "../common_options/all_crocodile_options";
import { TestType, getConfig } from "../../../../config";
import * as faker from "faker";

export { options };

let testType = "api" as TestType;
let config = getConfig(testType);

const randomCrocodileId = faker.datatype.number({ min: 1, max: 7 });

export default function () {
  group("Get all crocodiles", function () {
    const response = http.get(`${config.baseUrl}/public/crocodiles/`);

    check(response, {
      "response status": (r) => r.status === 200,
    });
  });

  sleep(2);

  group("Get one crocodile", function () {
    const response = http.get(
      `${config.baseUrl}/public/crocodiles/${randomCrocodileId}`
    );

    check(response, {
      "response status": (r) => r.status === 200,
    });
  });
}
