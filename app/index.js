'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.option('format', {
    desc: 'Select one of `css`, `sass`, `less`, `stylus` for the bootstrap format.',
    type: String
  });

  this.format = options.format;
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor(argument) {
  this.pkg = require('../package.json');

  if (this.format) {
    // Skip if already set.
    return;
  }

  var cb = this.async();
  var formats = ['css', 'sass', 'less', 'stylus'];
  var prompts = [{
    type: 'input',
    name: 'name',
    message: 'What is the Digital Factory template set name?',
    default: path.basename(process.cwd())
  }, {
    type: 'input',
    name: 'packageName',
    message: 'What is your default Java package name?',
    validate: function (input) {
      if (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)) return true;
      return 'The package name you have provided is not a valid Java package name.';
    },
    default: 'com.company.jahia'
  }, {
    type: 'list',
    name: 'format',
    message: 'In what format would you like the Bootstrap stylesheets?',
    choices: formats
  }];

  this.prompt(prompts, function (props) {
    this.packageName = props.packageName;
    this.name = props.name;
    this.slugname = this._.slugify(this.name);
    this.camelizedName = this.slugname.replace(/-+([a-zA-Z0-9])/g, function (g) {
      return g[1].toUpperCase();
    });

    this.format = props.format;

    this.coffee = false;
    this.testFramework = false;
    this.includeBootstrap = false;
    this.includeSass = this.includeLibSass = this.format === 'sass';
    this.includeLess = this.format === 'less';
    this.includeModernizr = true;

    cb();
  }.bind(this));
};

Generator.prototype.bootstrapFiles = function bootstrapFiles() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('jshintrc', '.jshintrc');
  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('Gruntfile.js', 'Gruntfile.js');

  this.template('src/main/import/_repository.xml', 'src/main/import/repository.xml');

  if (this.includeLess) {
    var lessDir = 'src/main/less/';
    this.mkdir(lessDir);
    this.copy(lessDir + 'layout/header.less', lessDir + 'layout/header.less');
    this.copy(lessDir + 'layout/content.less', lessDir + 'layout/content.less');
    this.copy(lessDir + 'layout/footer.less', lessDir + 'layout/footer.less');
    this.copy(lessDir + 'templates/page.less', lessDir + 'templates/page.less');
    this.copy(lessDir + 'templates/home.less', lessDir + 'templates/home.less');
    this.copy(lessDir + 'components/navMenu.less', lessDir + 'components/navMenu.less');
    this.copy(lessDir + 'components/navMenu.aside.less', lessDir + 'components/navMenu.aside.less');
    this.template(lessDir + '_app.less', lessDir + 'app.less');
    this.template(lessDir + '_edit.less', lessDir + 'edit.less');
  }

  var resourceDir = 'src/main/resources/';
  this.mkdir(resourceDir);
  this.template(resourceDir + 'META-INF/_definitions.cnd', resourceDir + 'META-INF/definitions.cnd');
  this.copy(resourceDir + 'javascript/app.js', resourceDir + 'javascript/app.js');
  this.copy(resourceDir + 'commons/declarations.jspf', resourceDir + 'commons/declarations.jspf');
  this.copy(resourceDir + 'jnt_template/html/template.jsp', resourceDir + 'jnt_template/html/template.' + this.slugname + '.jsp');

  this.template('_pom.xml', 'pom.xml', null, { 'interpolate': /<%=([\s\S]+?)%>/g });

  // map format -> package name
  var packages = {
    css: 'bootstrap',
    sass: 'bootstrap-sass-official',
    less: 'components-bootstrap',
    stylus: 'bootstrap-stylus'
  };

  this.bowerInstall(packages[this.format], {save: true});
};
