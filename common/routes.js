'use strict';

FlowRouter.route('/', {
    action: function () {
        FlowLayout.render('layout', {
            content: 'index'
        });
    }
});