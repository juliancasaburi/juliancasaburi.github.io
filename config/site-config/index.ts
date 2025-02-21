import { mainNav } from "./main-nav";
import { links } from "./links";
import { skillIcons } from "./skill-icons";
import { projects } from "./projects";
import { envConfig } from "../env-config";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Julián Casaburi",
  title: "Julián Casaburi - Software developer",
  gitHubUser: "juliancasaburi",
  url: envConfig.BASE_URL,
  description:
    "Julián Casaburi is a software developer based in Argentina. He writes code to solve real-life challenges.",
  mainNav,
  links,
  skillIcons,
  projects,
  ogImage: `${envConfig.BASE_URL}/images/og.png`,
  country: "Argentina.",
};
