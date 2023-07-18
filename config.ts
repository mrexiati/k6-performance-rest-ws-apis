export type TestType = "api" | "hybrid";

interface Config {
  baseUrl: string;
  timeout: number;
}

const testTypes: Record<TestType, Config> = {
  api: {
    baseUrl: "https://test-api.k6.io",
    timeout: 20000,
  },
  hybrid: {
    baseUrl: "https://tbd.io",
    timeout: 20000,
  },
};

export function getConfig(testType: TestType): Config {
  return testTypes[testType];
}
