"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const mkdirp = require("mkdirp");
// 5.0.0版本需要动态引入install
const _ = require("lodash");
_.extend(Generator.prototype, require("yeoman-generator/lib/actions/install"));

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the perfect ${chalk.red("generator-project")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "namespace",
        message: "Please input your project namespace,such as @baidu:",
        default: ""
      },
      {
        type: "input",
        name: "name",
        message: "Please input project name:",
        default: "vue"
      },
      {
        type: "input",
        name: "description",
        message: "Please input project description:",
        default: "a vue project"
      },
      {
        type: "input",
        name: "author",
        message: "Author's Name",
        default: ""
      },
      {
        type: "input",
        name: "email",
        message: "Author's Email",
        default: ""
      },
      {
        type: "input",
        name: "license",
        message: "License",
        default: ""
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      if (this.props.namespace) {
        this.props.fullName = this.props.namespace + "/" + this.props.name;
      } else {
        this.props.fullName = this.props.name;
      }
    });
  }

  // 未匹配任何生命周期方法的非私有方法均在此环节*自动*执行
  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\nYour generator must be inside a folder named
        ${this.props.name}\n
        I will automatically create this folder.\n`);

      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  // 依据模板进行新项目结构的写操作
  writing() {
    this.log("\nWriting...\n");

    this.__writingCopy(["package.json"], {
      name: this.props.name,
      fullName: this.props.fullName,
      description: this.props.description,
      author: this.props.author,
      email: this.props.email,
      license: this.props.license
    });
    this.__writingCopy(["README.md"], {
      name: this.props.name,
      fullName: this.props.fullName,
      description: this.props.description,
      author: this.props.author,
      year: new Date().getFullYear()
    });
    this.__writingCopy([
      ".vscode",
      "public",
      "src",
      ".gitignore",
      "index.html",
      "vite.config.js"
    ]);
  }

  __writingCopy(filePath, params) {
    filePath.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        params
      );
    });
  }

  install() {
    this.npmInstall();
  }
};
