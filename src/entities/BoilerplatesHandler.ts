abstract class BoilerplatesHandler {
  source: string = '';
  curlist: string[] = [];

  abstract list(location: string): Promise<string[]>;
  abstract select(name: string): boolean;
  abstract addAsStarred(): void;
  abstract removeFromStarred(): void;
}

export { BoilerplatesHandler };
