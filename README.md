<a name="TOC"></a>

<div align="center">
  <a href="https://www.npmjs.com/package/boilermanager"><img src="https://img.shields.io/npm/v/boilermanager.svg?style=flat" alt="npm version"></a>
  <a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/made%20with-node-1f425f?logo=node.js&.svg" /></a>
  <a href="https://www.github.com/lucasvtiradentes/boilermanager/commits/master"><img src="https://img.shields.io/github/last-commit/lucasvtiradentes/boilermanager?color=green&label=updated"></a>
  <br>
  <a href="https://www.github.com/lucasvtiradentes"><img src="https://img.shields.io/badge/maintainer-%40lucasvtiradentes-yellow"></a>
  <a href="https://github.com/lucasvtiradentes/boilermanager#contributing"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" alt="contributions" /></a>
</div>

<p align="center">
  <a href="#dart-features">Features</a> • <a href="#warning-requirements">Requirements</a> • <a href="#bulb-usage">Usage</a> • <a href="#wrench-development">Development</a> • <a href="#books-about">About</a> • <a href="#family-community">Community</a>
</p>

<details>
  <summary align="center"><span>see <b>table of content</b></span></summary>
  <p align="center">
    <ul>
      <!-- <li><a href="#trumpet-overview">Overview</a></li> -->
      <!-- <li><a href="#pushpin-table-of-contents">TOC</a></li> -->
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
        </ul>
      </li>
      <li>
        <a href="#family-community">Community</a>
        <ul>
          <li><a href="#contributing">Contributing</a></li>
          <li><a href="#feedback">Feedback</a></li>
        </ul>
      </li>
    </ul>
  </p>
</details>

<a href="#"><img src="./.github/images/divider.png" /></a>

## :trumpet: Overview

quickstart your nodejs projects with zero time spent on configuring frequently used tools while also having the ability to manage your own boilerplates.

<p align="center">
  <img alt="posthoglogo" src="./.github/images/demo.webp" width="650">
</p>

The default boilerplates are available in [boilermanager-boilerplates](https://github.com/lucasvtiradentes/boilermanager-boilerplates) and if you wish you can create your own according to [boilerplates-template](https://github.com/lucasvtiradentes/boilermanager-boilerplates-template).

## :dart: Features<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

&nbsp;&nbsp;&nbsp;✔️ choose which boilerplate to start from: the available options are listed in [boilermanager-boilerplates](https://github.com/lucasvtiradentes/boilermanager-boilerplates);<br>
&nbsp;&nbsp;&nbsp;✔️ choose the boilerplate source from three options: default, github repository and local folder;<br>
&nbsp;&nbsp;&nbsp;✔️ filter boilerplates list with a term.<br>

## :warning: Requirements<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

In order to use this project in your computer, you need to have the following items:

- [npm](https://www.npmjs.com/): To install the package. Npm is installed alongside nodejs;
- [nodejs](https://nodejs.org/en/): To actually run the package.

If you want to make changes to the source code, it is recommended to also install the following items:

- [git](https://git-scm.com/): To work with version controlling;
- [vscode](https://code.visualstudio.com/): Useful for editing the code. You can choose a similar editor as you wish.

## :bulb: Usage<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

### Installation

To install boilermanager in your computer, simple run this command:

```bash
# install the boilermanager npm package
$ npm install -g boilermanager
```

After that you will be able to use the cli commands, through `boilermanager` or `bpm`.

### Commands

The boilermanager comes with the following commands list:

<table>
  <tr>
    <th>Scope</th>
    <th>Command</th>
    <th>Description</th>
  </tr>
  <tr>
    <td rowspan="2">General</td>
    <td><code>bpm -h</code></td>
    <td>Shows the <b>help</b> menu.</td>
  </tr>
  <tr>
    <!-- <td rowspan="2">General</td> -->
    <td><code>bpm -v</code></td>
    <td>Shows the current installed <b>version</b>.</td>
  </tr>
  <tr>
    <td rowspan="3">Select list</td>
    <td><code>bpm -r [user/repository]</code></td>
    <td>Set the boilerplate source list to use <b>github repository</b>.</td>
  </tr>
  <tr>
    <!-- <td rowspan="3">Select list</td> -->
    <td><code>bpm -p [folder]</code></td>
    <td>Set the boilerplate source list to use the <b>boilerplates from specified folder</b></td>
  </tr>
  <tr>
    <!-- <td rowspan="3">Select list</td> -->
    <td><code>bpm</code></td>
    <td>If you dont specify any boilerplate source list option, the <b>default boilerplate list</b> will be used..</td>
  </tr>
  <tr>
    <td rowspan="1">Other</td>
    <td><code>bpm -l</code></td>
    <td>Shows the <b>current boilerplate list</b> options.</td>
  </tr>
</table>

## :wrench: Development<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

### Development setup

To setup this project in your computer, run the following commands:

```bash
# Clone this repository
$ git clone https://github.com/lucasvtiradentes/boilermanager

# Go into the repository
$ cd boilermanager
```

After download it, go to the project folder and run these commands:

```bash
# Install dependencies
$ npm install

# Run the typescript code in development mode
$ npm run dev
```

### Used technologies

Boilermanager uses the following thechnologies:

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

The most related links to this project are:

- [inquire](https://www.npmjs.com/package/inquirer): a tool to get user interaction and store into variables;
- [commander](https://www.npmjs.com/package/commander): a tool to set and show cli help really easy.

## License

**Boilermanager** is distributed under the terms of the MIT License Version 2.0. A complete version of the license is available in the [LICENSE](LICENSE) file in this repository. Any contribution made to this project will be licensed under the MIT License Version 2.0.

<a href="#"><img src="./.github/images/divider.png" /></a>

## :family: Community<a href="#TOC"><img align="right" src="./.github/images/up_arrow.png" width="22"></a>

## Contributing

If you are a typescript developer, we would kind and happy accept your help:

- The best way to get started is to select any issue from the [`good-first-issue` label](https://github.com/lucasvtiradentes/boilermanager/labels/good%20first%20issue);
- If you would like to contribute, please review our [contributing guide](docs/CONTRIBUTING.md) for all relevant details.

Another ways to positivily impact this project is to:

- **:star: Star this repository**: my goal is to impact the maximum number of developers around the world;
- ✍️ **Fix english mistakes** I might have made in this project, may it be in the DOCS or even in the code (I'm a portuguese natural speaker);
- [:heart: Say thanks](https://saythanks.io/to/lucasvtiradentes): kind words have a huge impact in anyone's life;
- [💰 Donate](https://github.com/sponsors/lucasvtiradentes): if you want to support my work even more, consider make a small donation. I would be really happy!

## Feedback

Any questions or suggestions? You are welcome to discuss it on:

- [Github discussions](https://github.com/lucasvtiradentes/boilermanager/discussions)
- [Email](mailto:lucasvtiradentes@gmail.com)

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
