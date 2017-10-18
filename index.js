var fs = require('fs'),
  rp = require('request-promise'),
  config = require('./config.json'),
  ezip = require('extract-zip')

/*
 * download into file
 * extract it
 * define name of folder inside zip
 * move all files into build dir
 * remove original extracted and zip
 */

let options = {
  uri: config.zipFile,
  encoding: null
}

rp(options).then(data => {
  console.log("downloading file")
  fs.writeFile('master.zip', data, error => {
    if (!error){
      console.log("extracting file...")
      ezip('master.zip', {dir: process.cwd()}, error => {
        if(!error){
          fs.rename('ihfazhillah.github.io-master', 'dist', err => console.log(err))
        }
      })
    }
  });
})
