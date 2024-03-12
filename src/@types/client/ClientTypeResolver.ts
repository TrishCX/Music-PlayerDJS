import type { ClientName } from "./ClientNameType";
import type { ClientVersions } from "./ClientVersionType";

export type ClientTypeResolver = {
  name: ClientName;
  version: ClientVersions;
};
