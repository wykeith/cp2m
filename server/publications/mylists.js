Meteor.publish('mylists', function() {
  return Lists.find({
      archived: false},
      {
      sort: { sort: 1 }
    });
});
