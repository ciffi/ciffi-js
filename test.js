#! /usr/bin/env node
const exec = require('child_process').exec;
const fs = require('fs');

const setupProcess = exec(
  'mkdir frontend && cd frontend && npm link ../packages/ciffi/ && ciffi setup -s && npm run build'
);

let error = false;

setupProcess.stdout.on('data', data => {
  console.log(data);
});

setupProcess.stderr.on('data', err => {
  console.error(err);
  error = err;
});

setupProcess.on('close', res => {
  if (res === 0) {
    fileChecker('main.js', () => {
      fileChecker('main.css', () => {
        console.error('latest version ok');
      });
    });
  } else {
    console.error('latest version error: ', error);
  }
});

const fileChecker = (fileName, successCallback, failCallback) => {
  fs.exists(`./static/${fileName}`, res => {
    if (res) {
      successCallback();
    } else {
      console.error(`latest version error: ${fileName}`);
      if (failCallback && typeof failCallback === 'function') {
        failCallback();
      }
    }
  });
};
