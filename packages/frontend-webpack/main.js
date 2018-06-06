#! /usr/bin/env node
const CheckUpdate = require('./commands/app-check-update');

CheckUpdate.check((res) => {return res});