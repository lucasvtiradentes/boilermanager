export type BoilerplateCommand = {
  description: string;
  command: string;
};

export type BoilerplateImage = {
  src: string;
  width: string;
  height: string;
};

export type BoilerplateOption = {
  name: string;
  message: string;
  list: {
    title: string;
    file: string;
  }[];
};

export type RepoInfo = {
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

type AditionalInfo = {
  name: string;
  category: string;
  folder: string;
  lastUpdate: string;
};

export type Boilerplate = RepoInfo & AditionalInfo;
