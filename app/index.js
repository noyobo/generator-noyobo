'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var updateNotifier = require('update-notifier');

var NoyoboGenerator = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
    var notifier = updateNotifier({
      packageName: this.pkg.name,
      packageVersion: this.pkg.version
    });
    notifier.notify();
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super-duper Noyobo generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: '开始创建基础项目文件?',
      default: true
    }];

    this.prompt(prompts, function(props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      this.dest.mkdir('test');
      this.src.copy('test.js', 'test/test.js');

      // this.src.copy('_package.json', 'package.json');
      // this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function() {
      this.src.copy('_editorconfig', '.editorconfig');
      this.src.copy('_jshintrc', '.jshintrc');
      this.src.copy('_gitignore', '.gitignore');
      this.src.copy('_travis.yml', '.travis.yml');
      this.src.copy('gulpfile.js', 'gulpfile.js');
    }
  },

  end: function() {
    //this.installDependencies();
    console.log(chalk.green('Done!'))
    console.log(chalk.gray('run'), chalk.yellow('npm init'), 'create package.json')
    console.log(chalk.gray('run'), chalk.yellow('bower init'), 'create bower.json')
    console.log(chalk.gray('run'), chalk.yellow('npm i --save-dev gulp gulp-jshint jshint-stylish mocha'), 'init gulp module')
  }
});

module.exports = NoyoboGenerator;
