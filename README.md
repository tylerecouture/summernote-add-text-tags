# Summernote Extension: Additional Text Tags
A [Summernote](http://summernote.org/) extension that adds additional text-level semantic elements (html tags) that are already provided with styling by Bootstrap 3 and 4

### Additional tags

* [Inline text elements](https://v4-alpha.getbootstrap.com/content/typography/#inline-text-elements):
  * `<mark>` higlighted text
  * `<small>` fine print
  * `<ins>` indicate text added to a document
  * `<delete>` indicating text deleted from a document

* [Inline code elements](https://v4-alpha.getbootstrap.com/content/code/)
  * `<code>` for inline code snippets
  * `<kbd>` for indicating user input.
  * `<var>` for indicating variables.


### Usage

1. Include the js and css
2. add `add-text-tags` too your toolbar in the `style` or `font` group:

        $('#summernote').summernote({
            toolbar: [
                ...
                ['style', ['bold', 'italic', 'underline', 'add-text-tags', 'clear']]
            ]
        });

### Example

See Example/example.html or the [fiddle here](https://jsfiddle.net/43Tesseracts/y4t0zep2/).

### Limitations

* This extension doesn't use summernote's built in parser, so if you try to apply one of these styles accross another node (style or block element), it will fail (nothing will happen).
* The elements won't toggle on and off, however they will clear with Summernote's `Remove Font Style` button