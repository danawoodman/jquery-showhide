# jquery-showhide

A robust "toggle" plugin for jQuery. Features include the use of cookies, toggling of text and more.

- Remember the state of the target object in a cookie.
- Change the text of the toggle element (useful if you want the link text to change, e.g. "Show form"/"Hide form").
- Apply classes to the toggle element to give it plus/minus classes.
- Auto focus on a form element within the target element (useful if you are showing a hidden form). 

To see what you can do with this plugin, check out this short video (no audio) of a (very) simple example usage:

<http://www.screencast.com/t/78DIrJx1>

This shows the showhide functionality as well as the "autofocusing" of the first text field in the form. Very useful if you have hidden forms in your page and you want to quickly enter content.

You can also check out the blog post on jquery-showhide here:

<http://www.danawoodman.com/2009/11/introducing-jquery-showhide/>

## Examples

Check out some examples below to get started.

### Example 1

A simple inline toggle using no options. By default showhide will toggle the next element (e.g. `$(this).next()`) and will default the target object to be visible.

First add in the jQuery code to the `<head>` of the page:

    <script type="text/javascript">
        $(function() {
            $('#example-1').showhide();
        });
    </script>

... then add in the HTML:

    <p>
        <a href="#" title="Toggle the span" id="example-1">Toggle</a>
        <span><strong>This can be toggled.</strong></span>
    </p>

The link tag is what we call the toggle element and the span tag is what we call the target element.

The last thing that you will have to do is add in some styling for the "hidden" class (by default, a class of "hidden" is applied to the target element.)

    <style type="text/css">
        .hide { display: none; }
    </style>

This example will have the link toggle the visibility of the `<span>` element.

Now, of course this is not very interesting or useful but by using the available settings you can control a variety of functionality.

### Example 2

This example is useful if you need to toggle elements that are not directly next to each other. This reference the toggle object (this) within the functions settings, making it easy to

The JavaScript:

    <script type="text/javascript">
        $(function() {
            $('#example-2').showhide({
                target_obj: '$(this).parent().next()';
            });
        });
    </script>

The HTML:

    <p><a href="#" title="Toggle the span" id="example-2">Toggle</a></p>
    <p><strong>This can be toggled.</strong></p>

## Further Information

For more examples, check out the `examples.html` file.

I will be updating the docs and providing more examples when I have time :)

If you would like to contribute to this project, fork the [code on GitHub](https://github.com/danawoodman/jquery-showhide) and then submit a Pull request for your changes.

If you have any questions, comments or feedback, please email me at <dana@danawoodman.com>.

If you find a bug, please submit it to the [bugtracker](https://github.com/danawoodman/jquery-showhide/issues).


## Credits

Copyright &copy; 2011 Dana Woodman <dana@danawoodman.com>


## License

Released under an MIT license. See the `LICENSE` file for more information.
