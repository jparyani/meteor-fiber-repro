import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.events({
  'click button.set'(event, instance) {
    // increment the counter when button is clicked
    Meteor.call("set");
  },
  'click button.unset'(event, instance) {
    // increment the counter when button is clicked
    Meteor.call("unset");
  },
});

Meteor.subscribe("all");
