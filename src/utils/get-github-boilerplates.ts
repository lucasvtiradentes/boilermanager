import { GITHUB_ORG_REPOS_LIST_LINK } from '../configs/configs.js'
import axios from 'axios'

async function getGithubBoilerplates() {
  const ignoredRepositories: string[] = [] // 'boilermanager', 'ts-boilerplate.land', '.github'

  try {
    const response = await axios.get(GITHUB_ORG_REPOS_LIST_LINK)
    const reposArr = response.data
      ?.filter((item: any) => ignoredRepositories.includes(item.name) === false)
      .map((item: any) => ({
        name: item.name,
        link: item.html_url,
        description: item.description,
      }))
    return reposArr
  } catch (e: any) {
    return []
  }
}

export { getGithubBoilerplates }
