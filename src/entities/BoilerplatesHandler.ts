abstract class BoilerplatesHandler {
  source: string = '';
  curlist: string[] = [];

  abstract list(location: string): Promise<string[]>;
  abstract select(): void;
  abstract addAsStarred(): void;
  abstract removeFromStarred(): void;
}

export { BoilerplatesHandler };
