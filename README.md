# generator-jahia 

[![Build Status](https://travis-ci.org/f4bien/generator-jahia.svg?branch=master)](https://travis-ci.org/f4bien/generator-jahia)  

[![Dependency Status](https://david-dm.org/f4bien/generator-jahia.svg)](https://david-dm.org/f4bien/generator-jahia)
[![devDependency Status](https://david-dm.org/f4bien/generator-jahia/dev-status.svg)](https://david-dm.org/f4bien/generator-jahia#info=devDependencies)
[![peerDependency Status](https://david-dm.org/f4bien/generator-jahia/peer-status.svg)](https://david-dm.org/f4bien/generator-jahia#info=peerDependencies)

Yeoman generator for [Digital Factory 7.1 from Jahia](https://www.jahia.com/products/digital-factory)

## Install

```sh
$ npm install -g generator-jahia
```

## Usage

```sh
$ yo jahia
```

*Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files.*

## Deploy

Deploy on Digital Factory 7.1

```sh
$ mvn clean package jahia:deploy -Pdev
```

## Browsersync

[Browsersync](http://www.browsersync.io/) feature is embedded.

```sh
$ gulp serve
```

## License

MIT
