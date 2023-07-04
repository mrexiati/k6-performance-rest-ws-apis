export const options = {
  discardResponseBodies: true,
  scenarios: {
    all_crocodile: {
      executor: "constant-vus",
      vus: 10,
      duration: "10s",
    },
  },
  thresholds: {
    http_req_failed: ["rate < 0.01"],
    http_req_duration: ["p(95) < 200"],
  },
};
