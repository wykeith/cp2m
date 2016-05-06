Meteor.subscribe('boards');
Meteor.subscribe('mylists');
Meteor.subscribe('Cards')

BlazeLayout.setRoot('body');

const i18nTagToT9n = (i18nTag) => {
  // t9n/i18n tags are same now, see: https://github.com/softwarerero/meteor-accounts-t9n/pull/129
  // but we keep this conversion function here, to be aware that that they are different system.
  return i18nTag;
};

Template.userFormsLayout.onRendered(() => {
  const i18nTag = navigator.language;
  if (i18nTag) {
    T9n.setLanguage(i18nTagToT9n(i18nTag));
  }
  EscapeActions.executeAll();
});

Template.userFormsLayout.helpers({
  languages() {
    return _.map(TAPi18n.getLanguages(), (lang, tag) => {
      const name = lang.name;
      return { tag, name };
    });
  },

  isCurrentLanguage() {
    const t9nTag = i18nTagToT9n(this.tag);
    const curLang = T9n.getLanguage() || 'en';
    return t9nTag === curLang;
  },
});

Template.userFormsLayout.events({
  'change .js-userform-set-language'(evt) {
    const i18nTag = $(evt.currentTarget).val();
    T9n.setLanguage(i18nTagToT9n(i18nTag));
    evt.preventDefault();
  },
});

Template.defaultLayout.events({
  'click .js-close-modal': () => {
    Modal.close();
  },
});

Template.feedbackform.helpers({
  listitem: function(){
      return Lists.find({"title" : {$regex : ".*#.*"}});
  }
});

Template.feedbackform.events({
  'click .js-askqn': () => {
    boardid = Lists.findOne(
      $('.js-select-list').val(),
      {fields: {boardId: 1}}
      );

    $('.js-errors').text("Submitting Your Question");
    
    Cards.insert( {
      "title" : $('.js-questions').val(),
      "listId" : $('.js-select-list').val(),
      "boardId" : boardid.boardId,
      "archived" : false,
      "userId" : "Public",
      "sort" : 100
      },
      function( error, result) { 
        if ( error ) { 
          $('.js-errors').text("Could not submit due to " + error);
        };
        if ( result ) {
          $('.js-errors').text('Thank you for your Question');
          $('.js-questions').val('');
          delete result; 
        };
      }
    );
    
  },
});