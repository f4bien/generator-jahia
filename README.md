# generator-jahia [![Build Status](https://travis-ci.org/f4bien/generator-jahia.svg?branch=master)](https://travis-ci.org/f4bien/generator-jahia)

Yeoman generator for [Jahia 7](https://www.jahia.com/products/digital-factory)

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

Deploy on Jahia 7

```sh
$ mvn clean package jahia:deploy -Pdev
```

## LiveReload

Enable [LiveReload](http://livereload.com/) and its browser plugin for client side

```sh
$ grunt serve
```

## License

MIT
