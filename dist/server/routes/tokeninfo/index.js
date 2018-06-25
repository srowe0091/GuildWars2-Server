'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', addToken);

function addToken(req, res) {
  _unirest2.default.get(_config2.default.gwHost + '/tokeninfo').headers({ Authorization: 'Bearer ' + req.body.apiKey }).end(function (data) {
    if (data.ok) {
      admin.database().ref('users/' + req.uid).set({
        apiKey: req.body.apiKey,
        permissions: data.body.permissions
      });
      res.send({ permissions: data.body.permissions });
    } else {
      res.status(403).send(data.body);
    }
  });
}

exports.default = router;