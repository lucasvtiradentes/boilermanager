type BoilerplateOptionItem = {
  title: string;
  file: string;
};

type BoilerplateOption = {
  name: string;
  message: string;
  list: BoilerplateOptionItem[];
};

export type BoilerplateInfo = {
  name: string;
  category: string;
  options: BoilerplateOption[];
};
