type BoilerplateCommand = {
  description: string;
  command: string;
};

type BoilerplateImage = {
  src: string;
  width: string;
  height: string;
};

type BoilerplateOptionItem = {
  title: string;
  file: string;
};

type BoilerplateOption = {
  name: string;
  message: string;
  list: BoilerplateOptionItem[];
};

/* -------------------------------------------------------------------------- */

export type RepositoryInfo = {
  description: string;
  image: BoilerplateImage;
  app_features: string[];
  project_features: string[];
  commands: BoilerplateCommand[];
  options: BoilerplateOption[];
  resources: string[];
  app_techs: string[];
  project_techs: string[];
};

export type BoilerplateInfo = {
  name: string;
  category: string;
  options: BoilerplateOption[];
};
