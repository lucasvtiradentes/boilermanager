type BoilerplateImage = {
  src: string;
  width: string;
  height: string;
};

type BoilerplateCommand = {
  description: string;
  command: string;
};

type Boilerplate = {
  name: string;
  image: BoilerplateImage;
  description: string;
  category: string;
  folder: string;
  lastUpdate: string;
  app_features: string[];
  project_features: string[];
  app_techs: string[];
  project_techs: string[];
  commands: BoilerplateCommand[];
  resources: string[];
};

// origin: string;
// source: string;
// category: string;
// name: string;
// description?: string;

export { Boilerplate };
