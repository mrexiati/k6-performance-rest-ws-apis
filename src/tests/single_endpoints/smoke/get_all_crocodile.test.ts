import { expect } from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";
import { Httpx } from "https://jslib.k6.io/httpx/0.0.2/index.js";
import { options } from "../common_options/all_crocodile_options";

export { options };

let session = new Httpx({
  baseURL: "https://test-api.k6.io",
  timeout: 20000,
});

export default function () {
  const response = session.get(`/public/crocodiles/`);

  expect(response.status, "response status").to.equal(200);
}
