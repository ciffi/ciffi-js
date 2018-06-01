#! /usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const fileExists = require('file-exists');
const ConfigFile = process.env.PWD + '/.ciffisettings';
const ContentType = 'array';

const _config = getConfig();

start(_config.fileName, _config.pathsArray, _config.contentType);

function getConfig() {
	
	let _config;
	
	if (fileExists.sync(ConfigFile)) {
		_config = require(ConfigFile);
	} else {
		console.log(chalk.red.bold('☠️  Project build failed:') + ' ' + chalk.blue('can\'t find .ciffisettings file ☠️'));
		return console.log('');
	}
	
	let _basePath = './' + _config.srcPathName + '/images';
	let _fileName = './' + _config.srcPathName + '/scripts/config/images.json';
	
	let _args = process.argv.slice(2);
	let _result = {};
	_args.forEach((arg) => {
		
		if (!_result.fileName && arg.indexOf('fileName=') >= 0) {
			_result.fileName = './' + _config.srcPathName + '/scripts/config/' + arg.replace('fileName=', '') + '.json';
		}
		
		if (!_result.pathsArray && arg.indexOf('pathsArray=') >= 0) {
			_result.pathsArray = arg.replace('pathsArray=', '').substring(1, arg.replace('pathsArray=', '').length - 1).split(',');
		}
		
		if (!_result.contentType && arg.indexOf('contentType=') >= 0) {
			_result.contentType = arg.replace('contentType=', '');
		}
	});
	
	return {
		fileName: _result.fileName || _fileName,
		pathsArray: _result.pathsArray || [_basePath],
		contentType: _result.contentType || ContentType
	};
}

function start(filename, pathsArray, format) {
	let _content = addFilesRecursive(pathsArray);
	
	if (format === 'obj') {
		_content = transformToObject(_content);
	}
	
	fs.writeFile(filename, JSON.stringify(_content), (err) => {
		if (err) {
			throw err;
		} else {
			console.log(chalk.blue('🎡 ' + filename) + ' -' + chalk.green.bold(' OK'));
		}
	});
}

function getPathElements(path) {
	let _elementsArray = fs.readdirSync(path);
	let _filesArray = [];
	let _directoriesArray = [];
	_elementsArray.forEach((item) => {
		if (item.indexOf('.') !== 0) {
			let _item = path + '/' + item;
			let _itemStats = fs.statSync(_item);
			let _isFile = _itemStats.isFile();
			let _isDirectory = _itemStats.isDirectory();
			
			if (_isFile) {
				_filesArray.push(_item.replace('//', '/').replace('./src/', '/'));
			}
			
			if (_isDirectory) {
				_directoriesArray.push(_item);
			}
		}
	});
	
	if (_directoriesArray.length) {
		_filesArray = addFilesRecursive(_directoriesArray, _filesArray);
	}
	
	return _filesArray;
}

function addFiles(originalArray, newArray) {
	let _newArray = originalArray;
	if (newArray) {
		newArray.forEach((file) => {
			_newArray.push(file)
		});
	}
	return _newArray;
}

function addFilesRecursive(pathsArray, originalArray) {
	let _filesArray = [];
	let _originalArray = originalArray || [];
	pathsArray.forEach((path) => {
		_filesArray = addFiles(_originalArray, getPathElements(path));
	});
	return _filesArray;
}

function transformToObject(originalContent) {
	let _content = originalContent;
	let _result = [];
	let _index = 'image-';
	let _count = 0;
	
	_content.forEach((file) => _result.push({
		id: _index + _count++,
		src: file
	}));
	
	return _result;
}