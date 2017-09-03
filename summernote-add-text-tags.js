/**

 *
 */

(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {

    // Extends plugins for emoji plugin.
    $.extend($.summernote.plugins, {

        'add-text-tags': function (context) {
            var self = this;
            var ui = $.summernote.ui;
            var options = context.options;

            var del = ui.button({
                contents: '<del>D</del>',
                tooltip: 'Deleted text <del>',
                click: function (e) {
                    self.wrapInTag('del');
                }
            });

            var ins = ui.button({
                contents: '&nbsp;<ins>I</ins>&nbsp;',
                tooltip: 'Inserted text <ins>',
                click: function (e) {
                    self.wrapInTag('ins');
                }
            });

            var mark = ui.button({
                contents: '<mark>M</mark>',
                tooltip: 'Marked text <mark>',
                click: function (e) {
                    self.wrapInTag('mark');
                }
            });

            var small = ui.button({
                contents: '<small>S<small>&nbsp;',
                tooltip: 'Small text <small>',
                click: function (e) {
                    self.wrapInTag('small');
                }
            });

            var code = ui.button({
                contents: '<code>C</code>',
                tooltip: 'Inline code <code>',
                click: function (e) {
                    self.wrapInTag('code');
                }
            });

            var keyboard = ui.button({
                contents: '<kbd>K</kbd>', // '<i class="fa fa-keyboard-o">',
                tooltip: 'User input <kbd>',
                click: function (e) {
                    self.wrapInTag('kbd');
                }
            });

            var variable = ui.button({
                contents: ' <var>X</var>',
                tooltip: 'Variable <var>',
                click: function (e) {
                    self.wrapInTag('var');
                }
            });

            context.memo('button.add-text-tags', function () {
                return ui.buttonGroup([
                    ui.button({
                        className: 'dropdown-toggle',
                        contents: '<b>+</b> ' + ui.icon(options.icons.caret, 'span'),
                        tooltip: 'Additional text styles',
                        data: {
                            toggle: 'dropdown'
                        }
                    }),
                    ui.dropdown([
                        ui.buttonGroup({
                            className: 'note-add-text-tags-code',
                            children: [code, keyboard, variable]
                        }),
                        ui.buttonGroup({
                            className: 'note-add-text-tags-other',
                            children: [mark, small, ins, del]
                        })
                    ])
                ]).render();
            });

            self.wrapInTag = function (tag) {
                // from: https://github.com/summernote/summernote/pull/1919#issuecomment-304545919
                // https://github.com/summernote/summernote/pull/1919#issuecomment-304707418

                if (window.getSelection) {
                    var selection = window.getSelection(),
                        selected = (selection.rangeCount > 0) && selection.getRangeAt(0);

                    // Only wrap tag around selected text
                    if (selected.startOffset !== selected.endOffset) {
                        var range = selected.cloneRange();
                        range.surroundContents(document.createElement(tag));
                    }
                }
            };
        }
    });
}));
