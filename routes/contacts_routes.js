var express = require('express');
var mongoose = require('mongoose');
var jsonParser = require('body-parser').json();
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handle_server_error');

var contactsRouter = module.exports = exports = express.Router();

contactsRouter.get('/contacts', jsonParser, function(req, res) {
  // THIS HAS TO BE CHANGED ONCE AUTH IS ADDED
  var userId = '5671b3ac43b58da6047cfd3e';

  function getContacts(user) {
    var contactsIds = user.contacts;

    User.find({_id: {$in: contactsIds}}, function(err, contacts) {
      if (err) return handleError(err, res);

      res.json(contacts);
    });
  }

  User.findOne({_id: userId}, function(err, user) {
    if (err) return handleError(err, res);

    getContacts(user);
  });
});

contactsRouter.post('/contacts/add', jsonParser, function(req, res) {
  var userId = req.body.userId;
  var contactId = req.body.contactId;

  function updateContact(cb) {
    User.findOneAndUpdate({_id: contactId}, {$push: {receivedRequests: userId}},
      function(err, contact) {
        if (err) return handleError(err, res);

        cb(contact);
    });
  }

  function updateUser(contact) {
    User.findOneAndUpdate({_id: userId}, {$push: {sentRequests: contactId}},
      function(err, user) {
        if (err) return handleError(err, res);

        res.json({user: user, contact: contact});
    });
  }

  // should get back own user info and contact info
  updateContact(updateUser);
});

contactsRouter.post('/contacts/confirm', jsonParser, function(req, res) {
  var userId = req.body.userId;
  var requesterId = req.body.requesterId;

  function updateRequester(cb) {
    User.findOneAndUpdate({_id: requesterId}, {
      $pull: {sentRequests: userId},
      $push: {contacts: userId}
    }, function(err, requester) {
      if (err) return handleError(err, res);

      updateUser(requester);
    });
  }

  function updateUser(requester) {
    User.findOneAndUpdate({_id: userId}, {
      $pull: {receivedRequests: requesterId},
      $push: {contacts: requesterId}
    }, function(err, user) {
      if (err) return handleError(err, res);

      res.json({user: user, requester: requester});
    });
  }

  updateRequester(updateUser);
});

contactsRouter.post('/contacts/search', jsonParser, function(req, res) {
  var regex = new RegExp(req.body.search);

  User.find({$or: [{username: regex}, {name: regex}]}, function(err, results) {
    if (err) return handleError(err, res);

    res.json(results);
  });
});
