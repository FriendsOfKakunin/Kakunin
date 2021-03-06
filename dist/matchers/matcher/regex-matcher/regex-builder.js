'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regexBuilder = undefined;

var _regex = require('./regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RegexBuilder {
  buildRegex(regexTemplate) {
    for (let property in _regex2.default) {
      if (_regex2.default.hasOwnProperty(property)) {
        if (regexTemplate === 'r:' + property) {
          return new RegExp(_regex2.default[property]);
        }
      }
    }

    throw 'Regex with template ' + regexTemplate + ' was not found';
  }
}

const regexBuilder = exports.regexBuilder = new RegexBuilder();