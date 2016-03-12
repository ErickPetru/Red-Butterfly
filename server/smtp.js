Meteor.startup(function () {
  process.env.MAIL_URL =
    'smtp://' + Meteor.settings.emailUsername +
    ':' + Meteor.settings.emailPassword +
    '@' + Meteor.settings.emailHost + '/';
});