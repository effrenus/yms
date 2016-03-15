yms
======

Server for projects built with [ymb](https://www.npmjs.org/package/ymb). Runs on top of [express](http://expressjs.com/).

Requirements
------------
yms works with Node.js 4.

Getting Started
---------------
####CLI usage:####
You can install `yms` globally using Node Package Manager (npm):

    npm install -g yms

Then you can use `yms` console command to start your server or create and tune up local copy of `server.js`.
Server will then try to find your `server.js` copy or use default one.

````bash
yms [server] [DIR=.] [-p <port>]    # Starts `yms` server.
yms configure [DIR=.] [-f]          # Makes a copy of default `server.js` in specified directory.
yms help                            # Displays this message.
````

####Plugins usage:####
Check out [**ymb plugins documentation**](docs/plugins.md).