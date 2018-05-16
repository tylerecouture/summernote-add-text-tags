/**
*    Copyright 2018 zeroheure.info - Xavier Brochard (backport to summernote 0.6.16)
*    Copyright 2017 tylerecouture https://github.com/tylerecouture/summernote-add-text-tags
*    * MIT License
**/

(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
     } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals: jQuery
        factory(window.jQuery);
    }
}(function ($) {
    // template
    var tmpl = $.summernote.renderer.getTemplate();

    /**
    * @class plugin.add-text-tags
    */
    $.summernote.addPlugin({

        name: 'add-text-tags',
        buttons: {
            addTextTags: function (lang, options) { // no hyphens in Object's name (not add-text-tags)

                generateBtn = function(tag, tooltip) {
                    var char = tag.slice(0,1).toUpperCase();
                    return tmpl.button('<'+tag+'>'+char+'</'+tag+'>', {
                        event: 'add_tt',
                        value: tag,
                        title: tooltip + ' <' + tag + '>',
//                         hide: true,
                        className: 'note-add-text-tags-btn'
                    });
                };

                var del = generateBtn('del', 'Deleted text');
                var ins = generateBtn('ins', 'Inserted text');
                var small = generateBtn('small', 'Fine print');
                var mark = generateBtn('mark', 'Highlighted text');
                var variable = generateBtn('var', 'Variable');
                var keyboard = generateBtn('kbd', 'User input');
                var code = generateBtn('code', 'Inline code');
//                 var strong = generateBtn('strong', 'Very important (SEO)');

                var dropdown = '<div class="dropdown-menu">';
                dropdown    += '<div class="note-btn-group btn-group note-add-text-tags-others">';
                dropdown    += del + ins + small + mark + '</div>';
                dropdown    += '<div class="note-btn-group btn-group note-add-text-tags-code">';
                dropdown    += variable + keyboard + code + '</div>';
//                 dropdown    += strong + '</div>';

//                 return tmpl.dropdown(dropdown, '', 'div');
                return tmpl.button('+', {
                    title: 'more',
                    hide: true,
                    dropdown: dropdown
                });

            },
            // fin add_text_tags
            
        },
            

        events: {
            add_tt: function (event, editor, layoutInfo, value) {
                // insertion
                var self = this;
                self.areDifferentBlockElements = function(startEl, endEl) {
                    var startElDisplay = getComputedStyle(startEl, null).display;
                    var endElDisplay  = getComputedStyle(endEl, null).display;

                    if(startElDisplay !== 'inline' && endElDisplay !== 'inline') {
                        console.log("Can't insert across two block elements.")
                        return true;
                    }
                    else {
                        return false;
                    }
                };

                self.isSelectionParsable = function(startEl, endEl) {

                    if(startEl.isSameNode(endEl)) {
                        return true;
                    }
                    if( self.areDifferentBlockElements(startEl, endEl)) {
                        return false;
                    }
                    // if they're not different block elements, then we need to check 
                    // if they share a common block ancestor
                    // could do this recursively, if we want to back farther up the node chain...
                    var startElParent = startEl.parentElement;
                    var endElParent = endEl.parentElement;
                    if( startEl.isSameNode(endElParent)
                        || endEl.isSameNode(startElParent)
                        || startElParent.isSameNode(endElParent) )
                    {
                        return true;
                    }
                    else
                        console.log("Unable to parse across so many nodes. Sorry!")
                        return false;
                };

                self.wrapInTag = function (tag) {
                    // from: https://github.com/summernote/summernote/pull/1919#issuecomment-304545919
                    // https://github.com/summernote/summernote/pull/1919#issuecomment-304707418

                    if (window.getSelection) {
                        var selection = window.getSelection(),
                            selected = (selection.rangeCount > 0) && selection.getRangeAt(0);

                        // Only wrap tag around selected text
                        if (selected.startOffset !== selected.endOffset) {

                            var range = selected.cloneRange();

                            var startParentElement = range.startContainer.parentElement;
                            var endParentElement = range.endContainer.parentElement;

                            // if the selection starts and ends different elements, we could be in trouble
                            if( ! startParentElement.isSameNode(endParentElement)) {
                                if ( ! self.isSelectionParsable(startParentElement, endParentElement)) {
                                    return;
                                }
                            }

                            var newNode = document.createElement(tag);
                            // https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents
                            // Parses inline nodes, but not block based nodes...blocks are handled above.
                            newNode.appendChild(range.extractContents());
                            range.insertNode(newNode)

                            // Restore the selections
                            range.selectNodeContents(newNode);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    }
                };

                self.wrapInTag(value);
            },
            
        }

    });
}));
