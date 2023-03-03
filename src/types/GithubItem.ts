export type GithubItem = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string | null;
  git_url: string | null;
  download_url: string | null;
  type: 'dir' | 'file' | 'submodule' | 'symlink';
  _links: {
    self: string;
    git: string;
    html: string;
  };
};
