import Constant from "../../constants/index";

type TOptions = {
  mobile?: boolean;
};
export function getHeaders(options: TOptions) {
  const available_agents =
    Constant.Agents[options.mobile ? "mobile" : "desktop"];
  const ua =
    available_agents![Math.floor(Math.random() * available_agents?.length!)];

  return ua.toString();
}
