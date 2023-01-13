import axios from 'axios';

async function getIssuesList(repoName: string) {
  const url = `https://api.github.com/repos/${repoName}/issues`;
  const boilerplateList = await axios.get(url);
  const parsedResults = boilerplateList.data
    .filter((item: any) => item.state === 'open')
    .map((item: any) => ({ number: item.number, description: item.title }))
    .reverse();

  const tableResults = parsedResults.reduce((a: any, v: any) => {
    return { ...a, [v.number]: { issue: v.description } };
  }, {});

  console.table(tableResults);
}

getIssuesList(`ts-boilerplate-land/boilermanager`);
