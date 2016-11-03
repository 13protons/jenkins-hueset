# Jenkins Hueset

Change the state of your hue lights based on the state of your Jenkins build server - all in node!

> NOTE This package does not yet function. It's being updated as I complete work on the core functionality. For a working hue cli (which this is based on), check out [hueset](https://www.npmjs.com/package/hueset).

### Usage

Command line on your jenkins box:

```bash
npm install -g jenkins-hueset
```

In your 'Run Scripts' section of jenkins:

```bash
jenkins-hueset --u '<hue_user>' -i '192.168.xx.xx' -l 1 -a 'http://localhost:8080' -j 'BuildName'
```

This will change the color of light `1`, connected to the hue bridge located at `192.168.xx.xx` to the color of `BuildName` based on the Jenkins API hosted at `http://localhost:8080` as the hue user `<hue_user>`;

To find your Phillips Hue IP and credentials, follow this [getting started guide](http://www.developers.meethue.com/documentation/getting-started).
