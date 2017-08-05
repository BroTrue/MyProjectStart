# MyProjectStart
#Orest Tsyaputa
My start Template with git/node/npm/gulp/bower.

# Installation
 - Install GIT
 - git clone
```sh
git clone https://github.com/BroTrue/MyProjectStart.git <DIR_NAME>
```
- Install Node.js, Gulp, npm-check-updates , Bower
```sh
    node.js 		    -g
 	gulp 			    -g --save-dev
	npm-check-updates 	-g --save-dev
	bower 		        -g --save-dev
```
- Check version
```sh
   version
   or
   -v
```
- Check updates and update
```sh
   ncu
   ncu -u
   ncu -a
```
- Install all node models
```sh
  npm i
```
- Install Bower libs
```sh
  bower install jquery
```
# Gulp Tasks
1. Run default gulp task (sass, js, watch, browserSync) for web development;
```sh
  gulp
```
2. Build project to dist folder (cleanup, image optimize, removing unnecessary files);
```sh
  gulp -build
```
3. Project deployment on the server from dist folder via FTP;
```sh
  gulp -deploy
```
4. Project deployment on the server from dist folder via RSYNC;
```sh
  gulp -rsync
```
5. Clear all gulp cache
```sh
  gulp -clearcache
```

