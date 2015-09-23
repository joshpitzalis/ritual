if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.counter.helpers({
    counter: function() {
      return Session.get('counter');
    }

  });


  Template.tasks.events({

    'click button': function(event) {
      // Add the class 'active' to the clicked link.
      event.currentTarget.classList.toggle('mdl-button--accent');

      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  // Template.addTask.events({
  //
  //   'click button': function() {
  //     // add a new button here
  //     // but it also need s to be named
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
