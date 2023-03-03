interface DownloadGithubFolderStrategy {
  download(repository: string, repoPath: string, finalPath: string): Promise<boolean>;
}

class DownloadGithubFolderHandler {
  constructor(private strategy: DownloadGithubFolderStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: DownloadGithubFolderStrategy) {
    this.strategy = strategy;
  }

  async download(repository: string, repoPath: string, finalPath: string): Promise<boolean> {
    return await this.strategy.download(repository, repoPath, finalPath);
  }
}

/* -------------------------------------------------------------------------- */

export { DownloadGithubFolderStrategy, DownloadGithubFolderHandler };
