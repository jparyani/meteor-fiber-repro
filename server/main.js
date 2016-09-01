import { Meteor } from 'meteor/meteor';
Fiber = Npm.require("fibers");


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish("all", function () {
  return Widgets.find({a: {$lt: 1}});
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
    Widgets.update({}, {$set: {a: Math.random()}}, {multi:true});
    console.log('set complete');
  },
  unset: function () {
    Widgets.update({}, {$unset: {a: 1}}, {multi:true});
    console.log('unset complete');
  },
});

Meteor.setInterval(function () { console.log(Fiber.fibersCreated);}, 5000);
