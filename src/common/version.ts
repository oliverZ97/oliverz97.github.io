import { DateTime } from "luxon";

export const VERSION = "1.7.3";

interface CHAR_VERSION {
  version: string;
  date: string;
  length: number;
}

export const CHAR_VERSIONS: CHAR_VERSION[] = [
  {
    version: "v1.0",
    date: "2025-01-01T00:00:00.00Z",
    length: 128,
  },
  {
    version: "v1.1",
    date: "2025-01-02T00:00:00.00Z",
    length: 151,
  },
  {
    version: "v1.2",
    date: "2025-02-10T00:00:00.00Z",
    length: 155,
  },
  {
    version: "v1.3",
    date: "2025-02-16T00:00:00.00Z",
    length: 170,
  },
  {
    version: "v1.4",
    date: "2025-02-20T00:00:00.00Z",
    length: 217,
  },
  {
    version: "v1.5",
    date: "2025-02-21T00:00:00.00Z",
    length: 250,
  },
  {
    version: "v1.6",
    date: "2025-02-22T00:00:00.00Z",
    length: 261,
  },
  {
    version: "v1.7",
    date: "2025-02-27T00:00:00.00Z",
    length: 265,
  },
  {
    version: "v1.8",
    date: "2025-03-09T00:00:00.00Z",
    length: 305,
  },
  {
    version: "v1.9",
    date: "2025-03-12T00:00:00.00Z",
    length: 310,
  },
  {
    version: "v1.10",
    date: "2025-03-20T00:00:00.00Z",
    length: 324,
  },
  {
    version: "v1.11",
    date: "2025-04-17T00:00:00.00Z",
    length: 340,
  },
  {
    version: "v1.12",
    date: "2025-05-09T00:00:00.00Z",
    length: 359,
  },
  {
    version: "v1.13",
    date: "2025-07-06T00:00:00.00Z",
    length: 368,
  },
  {
    version: "v1.14",
    date: "2025-07-18T00:00:00.00Z",
    length: 386,
  },
  {
    version: "v1.15",
    date: "2025-07-20T00:00:00.00Z",
    length: 416,
  },
  {
    version: "v1.16",
    date: "2025-07-23T00:00:00.00Z",
    length: 427,
  },
  {
    version: "v1.17",
    date: "2025-08-02T00:00:00.00Z",
    length: 436,
  },
  {
    version: "v1.18",
    date: "2025-08-06T00:00:00.00Z",
    length: 458,
  },
  {
    version: "v1.19",
    date: "2025-08-14T00:00:00.00Z",
    length: 486,
  },
  {
    version: "v1.20",
    date: "2025-08-30T00:00:00.00Z",
    length: 500,
  },
  {
    version: "v1.21",
    date: "2025-09-24T00:00:00.00Z",
    length: 529,
  },
];

export function getCurrentVersion(): CHAR_VERSION {
  return CHAR_VERSIONS[CHAR_VERSIONS.length - 1];
}

export function getPreLatestVersion(): CHAR_VERSION {
  return CHAR_VERSIONS[CHAR_VERSIONS.length - 2];
}

export function getNLatestVersion(n: number): CHAR_VERSION {
  if (n < CHAR_VERSIONS.length) {
    return CHAR_VERSIONS[CHAR_VERSIONS.length - n];
  } else {
    throw new Error(
      `Version ${n} is not available. Maximum available version is ${CHAR_VERSIONS.length}.`
    );
  }
}

export function isDateOlderThenPreLatestVersion(date: string) {
  const checkDate = DateTime.fromISO(date);

  const version = getPreLatestVersion();
  const versionDate = DateTime.fromISO(version.date);
  if (checkDate <= versionDate) {
    return true;
  } else {
    return false;
  }
}
