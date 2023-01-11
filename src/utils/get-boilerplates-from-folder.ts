import { readdirSync } from 'node:fs'

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

function getBoilerplatesFromFolder(path: string) {
  return getDirectories(path).map((item) => ({
    name: item,
    description: 'something here',
    link: 'path here',
  }))
}

export { getBoilerplatesFromFolder }
