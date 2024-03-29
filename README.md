<a name="TOC"></a>

<div align="center">
  <a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/made%20with-node-1f425f?logo=node.js&.svg" /></a>
  <a href="https://github.com/lucasvtiradentes/boilermanager#contributing"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" alt="contributions" /></a>
  <br>
  <a href="https://www.npmjs.com/package/boilermanager"><img src="https://img.shields.io/npm/v/boilermanager.svg?style=flat" alt="npm version"></a>
  <a href="https://github.com/lucasvtiradentes/boilermanager/actions/workflows/ci-cd.yml"><img src="https://github.com/lucasvtiradentes/boilermanager/workflows/CI/badge.svg"/></a>
</div>

<p align="center">
  <a href="#dart-features">Features</a> • <a href="#warning-requirements">Requirements</a> • <a href="#bulb-usage">Usage</a> • <a href="#wrench-development">Development</a> • <a href="#books-about">About</a>
</p>

<details>
  <summary align="center"><span>see <b>table of content</b></span></summary>
  <p align="center">
    <ul>
      <li><a href="#trumpet-overview">Overview</a></li>
      <li><a href="#dart-features">Features</a></li>
      <li><a href="#warning-requirements">Requirements</a></li>
      <li>
        <a href="#bulb-usage">Usage</a>
        <ul>
          <li><a href="#installation">Installation</a></li>
          <li><a href="#commands">Commands</a></li>
        </ul>
      </li>
      <li>
        <a href="#wrench-development">Development</a>
        <ul>
          <li><a href="#development-setup">Development setup</a></li>
          <li><a href="#used-technologies">Used technologies</a></li>
        </ul>
      </li>
      <li>
        <a href="#books-about">About</a>
        <ul>
          <li><a href="#related">Related</a></li>
          <li><a href="#license">License</a></li>
          <li><a href="#feedback">Feedback</a></li>
        </ul>
      </li>
    </ul>
  </p>
</details>

<a href="#"><img src="./.github/images/divider.png" /></a>

## :trumpet: Overview

Quickstart your projects by using a pre-configured boilerplate while also being able to manage and use your own boilerplates.

<p align="center">
  <img alt="posthoglogo" src="./.github/images/demo.webp" width="650">
</p>

The default boilerplates available are listed from [js-boilerplates](https://github.com/lucasvtiradentes/js-boilerplates) and if you wish you can create your own according to [boilerplates-template](https://github.com/lucasvtiradentes/boilermanager-template).

This tool was originally meant to be used only in javascript based projects, but it in fact can handle boilerplates from every other languages, such as [golang-boilerplates](https://github.com/lucasvtiradentes/golang-boilerplates).

## :dart: Features<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

&nbsp;&nbsp;&nbsp;✔️ choose which boilerplate to start from: the default available options are listed from [js-boilerplates](https://github.com/lucasvtiradentes/js-boilerplates);<br>
&nbsp;&nbsp;&nbsp;✔️ choose the boilerplate source from three options: default, github repository or local folder;<br>
&nbsp;&nbsp;&nbsp;✔️ create your own boilerplates by following [boilerplates-template](https://github.com/lucasvtiradentes/boilermanager-boilerplates-template) folder structure;<br>
&nbsp;&nbsp;&nbsp;✔️ supports filtering while choosing the boilerplate;<br>
&nbsp;&nbsp;&nbsp;✔️ shows if there is a new version available at every run.<br>

## :warning: Requirements<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

In order to use this project in your computer, you need to have the following items:

- [npm](https://www.npmjs.com/): To install the package. Npm is installed alongside nodejs;
- [nodejs](https://nodejs.org/en/): To actually run the package.

## :bulb: Usage<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

### Installation

To install `boilermanager` in your computer, simple run this command:

```bash
# install the boilermanager npm package
$ npm install -g boilermanager
```

After that you will be able to use the cli commands, through `boilermanager` or `bpm`.

### Commands

The boilermanager has the following commands:

<table>
  <tr>
    <th width="100">Scope</th>
    <th width="250">Command</th>
    <th width="auto">Description</th>
  </tr>
  <tr>
    <td width="100" rowspan="2">General</td>
    <td width="250"><code>bpm -h</code></td>
    <td>Shows the <b>help</b> menu with all available commands.</td>
  </tr>
  <tr>
    <!-- <td rowspan="2">General</td> -->
    <td width="250"><code>bpm -V</code></td>
    <td>Shows the current installed <b>version</b>.</td>
  </tr>
  <tr>
    <td width="100" rowspan="3">Select list</td>
    <td width="250"><code>bpm</code></td>
    <td>Set the boilerplate source list to use the <a href="https://github.com/lucasvtiradentes/boilermanager-boilerplates">default boilerplates</a>.</td>
  </tr>
  <tr>
    <!-- <td width="100" rowspan="3">Select list</td> -->
    <td width="250"><code>bpm -r [user/repository]</code></td>
    <td>Set the boilerplate source list to use <b>github repository</b>. You can create your own boilerplates repository by forking <a href="https://github.com/lucasvtiradentes/boilermanager-boilerplates-template">boilermanager boilerplates template</a>.</td>
  </tr>
  <tr>
    <!-- <td rowspan="3">Select list</td> -->
    <td width="250"><code>bpm -f [folder]</code></td>
    <td>Set the boilerplate source list to use the <b>boilerplates from a specified folder</b>. You can create your one by forking <a href="https://github.com/lucasvtiradentes/boilermanager-boilerplates-template">boilermanager boilerplates template</a>.</td>
  </tr>
  <tr>
    <td width="100" rowspan="2">Other</td>
    <td width="250"><code>bpm -l</code></td>
    <td>Shows the <b>current boilerplate list</b> options with additional information on a table.</td>
  </tr>
  <tr>
    <!-- <td width="100" rowspan="1">Other</td> -->
    <td width="250"><code>bpm -a</code></td>
    <td>sets an <b>alternative strategy</b> to download github folders.</td>
  </tr>
</table>

## :wrench: Development<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

### Development setup

if you want to [contribute](./docs/CONTRIBUTING.md) to this project, setup this project in your computer by run the following commands:

```bash
# Clone this repository
$ git clone https://github.com/lucasvtiradentes/boilermanager

# Go into the repository folder
$ cd boilermanager

# Install dependencies
$ npm install

# Run the typescript code in development mode
$ npm run dev
```

### Used technologies

This project uses the following thechnologies:

<div align="center">
  <table>
    <tr>
      <th>Scope</th>
      <th>Subject</th>
      <th>Technologies</th>
    </tr>
    <tr>
      <td rowspan="1">Main</td>
      <td>Main</td>
      <td align="center">
        <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white"></a>
        <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <td rowspan="3">Setup</td>
      <td>Code linting</td>
      <td align="center">
        <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/prettier-1A2C34?logo=prettier&logoColor=F7BA3E"></a>
        <a href="https://github.com/eslint/eslint"><img src="https://img.shields.io/badge/eslint-3A33D1?logo=eslint&logoColor=white"></a>
      </td>
    </tr>
    <tr>
      <!-- <td rowspan="2">Setup</td> -->
      <td>Commit linting</td>
      <td align="center">
      <a target="_blank" href="https://github.com/conventional-changelog/commitlint"><img src="https://img.shields.io/badge/commitlint-red?logo=commitlint&logoColor=white"></a>
      <a target="_blank" href="https://github.com/commitizen/cz-cli"><img src="https://img.shields.io/badge/commitizen-pink?logo=conventionalcommits&logoColor=white"></a>
      <a href="https://gitmoji.dev"><img
    src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
    alt="Gitmoji"/></a>
      </td>
    </tr>
    <tr>
      <!-- <td rowspan="2">Setup</td> -->
      <td>Other</td>
      <td align="center">
        <a href="https://editorconfig.org/"><img src="https://img.shields.io/badge/Editor%20Config-E0EFEF?logo=editorconfig&logoColor=000"></a>
        <a target="_blank" href="https://github.com/typicode/husky"><img src="https://img.shields.io/badge/🐶%20husky-green?logo=husky&logoColor=white"></a>
        <a target="_blank" href="https://github.com/okonet/lint-staged"><img src="https://img.shields.io/badge/🚫%20lint%20staged-yellow?&logoColor=white"></a>
      </td>
    </tr>
  </table>
</div>

<a href="#"><img src="./.github/images/divider.png" /></a>

## :books: About<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

## Related

- [js-boilerplates](https://github.com/lucasvtiradentes/js-boilerplates): default javascript boilerplates available;
- [golang-boilerplates](https://github.com/lucasvtiradentes/golang-boilerplates): golang boilerplates;
- [boilermanager-template](https://github.com/lucasvtiradentes/boilermanager-template): template repository for you create and use your own boilerplates in boilermanager;
- [boilr](https://github.com/tmrts/boilr): boilerplate template manager that generates files or directories from template repositories.

## License

This project is distributed under the terms of the MIT License Version 2.0. A complete version of the license is available in the [LICENSE](LICENSE) file in this repository. Any contribution made to this project will be licensed under the MIT License Version 2.0.

## Feedback

If you have any questions or suggestions you are welcome to discuss it on [github issues](https://github.com/lucasvtiradentes/boilermanager/issues) or, if you prefer, you can reach me in my social media provided bellow.

<a href="#"><img src="./.github/images/divider.png" /></a>

<div align="center">
  <p>
    <a target="_blank" href="https://www.linkedin.com/in/lucasvtiradentes/"><img src="https://img.shields.io/badge/-linkedin-blue?logo=Linkedin&logoColor=white" alt="LinkedIn"></a>
    <a target="_blank" href="mailto:lucasvtiradentes@gmail.com"><img src="https://img.shields.io/badge/gmail-red?logo=gmail&logoColor=white" alt="Gmail"></a>
    <a target="_blank" href="https://discord.com/users/262326726892191744"><img src="https://img.shields.io/badge/discord-5865F2?logo=discord&logoColor=white" alt="Discord"></a>
    <a target="_blank" href="https://github.com/lucasvtiradentes/"><img src="https://img.shields.io/badge/github-gray?logo=github&logoColor=white" alt="Github"></a>
  </p>
  <p>Made with ❤️ by <b>Lucas Vieira</b></p>
  <p>👉 See also all <a href="https://github.com/lucasvtiradentes/lucasvtiradentes/blob/master/portfolio/PROJECTS.md#TOC">my projects</a></p>
  <p>👉 See also all <a href="https://github.com/lucasvtiradentes/my-tutorials/blob/master/README.md#TOC">my articles</a></p>
</div>
