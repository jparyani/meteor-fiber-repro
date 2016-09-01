import { Meteor } from 'meteor/meteor';
Fiber = Npm.require("fibers");


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish("all", function () {
  Widgets.find({a: {$exists: 1}}).observe({
    added: function () {
      Gadgets.findOne({b: {$lt: Math.random() * 100}});
      console.log(Fiber.fibersCreated);
    },
    changed: function () {
      Gadgets.findOne({b: {$lt: Math.random() * 100}});
      console.log(Fiber.fibersCreated);
    }
  });
  return Widgets.find();
});

Meteor.startup(function () {
  if (Widgets.find().count() === 0) {
    for(var i=0; i<10000;i++) {
      Widgets.insert({a: i});
    }
  }
});

Meteor.methods({
  set: function () {
    Widgets.update({}, {$set: {a: 5}}, {multi:true})
  },
  unset: function () {
    Widgets.update({}, {$unset: {a: 1}}, {multi:true})
  },
});
