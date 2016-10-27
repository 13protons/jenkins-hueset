# Jenkins Hueset

Change the state of your hue lights based on the state of your Jenkins build server - all in node!

> NOTE This package does not yet function. It's being updated as I complete work on the core functionality. For a working hue cli (which this is based on), check out [hueset](https://www.npmjs.com/package/hueset).

### Usage

Command line of your jenkins box:

```bash
npm install -g jenkins-hueset
```

In your 'Run Scripts' section of jenkins:

```bash
jenkins-hueset --config='file://jenkins-config.json'
```
