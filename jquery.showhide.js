/*
    jquery.showhide
    A more robust replacement for jQuery's .toggle() function.
    Built by Dana Woodman <dana@danawoodman.com>.
*/
(function($) {
    
    /*
    
        Generic debugging function.
    
    */
    var debug = function (msg) {
        if (window.console) {
            console.log(msg);
        };
    };
    
    /*
    
        A toggle element.
        
        @module jquery.showhide 
        @class Toggle
    
    */
    var Toggle = function ($obj) {
        
        var show, // The show method.
            hide, // The hide method.
            update_cookie, // Update the cookie to it's newest value.
            show_text = $obj.o.plus_text, // Text to use for the toggle when the target is hidden.
            hide_text = $obj.o.minus_text, // Text to use for the toggle when the target is shown.
            shown = $obj.o.default_open, // Whether the target object is shown or hidden.
            $target = ($obj.o.target_obj) ? eval($obj.o.target_obj) : $obj.next(), // The target to show/hide. Eval is evil, I know... But it works.
            $focus_target = ($obj.o.focus_target) ? eval($obj.o.focus_target) : null, // The target field to focus on when showing a form.
            display = ( $target.css('display') === ('inline' || 'block') ) ? $target.css('display') : 'block'; // The default display to use for showing elements.
        
        // Get the value from the cookie and set it to the shown variable.
        if ($obj.cookies_installed && $obj.o.use_cookie) {
            if($.cookie($obj.o.cookie_name) != null) {
                shown = $.cookie($obj.o.cookie_name) === 'true' ? true : false;
            }
        };
        
        // Set the show/hide text to the current toggle text value if not set.
        show_text = (!show_text && !shown) ? $obj.html() : show_text;
        hide_text = (!hide_text && shown) ? $obj.html() : hide_text;
        
        /*
        
            Update a cookie with a new value.
            
            Checks to see if cookies are enabled and if the cookie plugin is 
            installed.
            
            @param val {Boolean} New value for the cookie. Should be true or false.
            @method update_cookie
        
        */
        update_cookie = function (val) {
            if ($obj.cookies_installed && $obj.o.use_cookie) {
                // console.log('Updating cookie to: ' + val);
                $.cookie($obj.o.cookie_name, val, {expires: $obj.o.cookie_expires});
            };
        };
        
        show = function () {
            // Add/remove toggle link classes.
            ($obj.o.minus_class) ? $obj.addClass($obj.o.minus_class) : null;
            ($obj.o.plus_class) ? $obj.removeClass($obj.o.plus_class) : null;
            // Add/remove target show/hide classes.
            ($obj.o.show_class) ? $target.addClass($obj.o.show_class) : null;
            ($obj.o.hide_class) ? $target.removeClass($obj.o.hide_class) : null;
            $target.css('display', display);
            ($focus_target) ? $focus_target.focus() : null;
            (hide_text) ? $obj.html(hide_text) : null;
            shown = true; // Update the status of the target.
            update_cookie(shown);
        };
        
        hide = function () {
            // Add/remove toggle link classes.
            ($obj.o.plus_class) ? $obj.addClass($obj.o.plus_class) : null;
            ($obj.o.minus_class) ? $obj.removeClass($obj.o.minus_class) : null;
            // Add/remove target show/hide classes.
            ($obj.o.hide_class) ? $target.addClass($obj.o.hide_class) : null;
            ($obj.o.show_class) ? $target.removeClass($obj.o.show_class) : null;
            $target.css('display', 'none');
            (show_text) ? $obj.html(show_text) : null;
            shown = false; // Update the status of the target.
            update_cookie(shown);
        };

        // Setup the target element based on whether it should be 
        // hidden or show by default.
        (shown) ? show() : hide();
        
        // Handle click behavior.
        $obj.click(function () {
            // console.log('Clicked: ' + $obj.html());
            (shown) ? hide() : show();
            return false; // Prevent following link.
        });
        
    };
    
    $.fn.showhide = function (options) {
        
        var cookies_installed = false, // Indicates if the jQuery Cookie plugin is installed.
            opts; // Compile default options and user specified options.
        
        // Check to see if the jQuery Cookie plugin is installed.
        try {
            $.cookie();
            cookies_installed = true
        } catch(err) {
            debug('[ERROR] jQuery Cookies plugin not installed!\n\tPlease install the jQuery Cookies plugin if you want to use the cookies feature of this plugin.');
        };
        
        var opts = $.extend({}, $.fn.showhide.defaults, options);
        
        return this.each(function() {
            var $obj = $(this);
            $obj.cookies_installed = cookies_installed; // Save whether or not jQuery Cookies is installed in the instance object.
            $obj.o = $.meta ? $.extend({}, opts, $this.data()) : opts; // Build element specific options.
            var $toggle = new Toggle($obj); // Create a new toggle element for each jQuery object.
        });
    };
    
    $.fn.showhide.defaults = {
        target_obj: null, // An optional string of a jQuery object that will be show/hidden.
        focus_target: null, // An optional target jQuery object to focus text onto when showing the hidden element.
        default_open: true, // If true, the target will be show, if false it will be hidden by default. This is overridden by the cookie, if it is set.
        show_class: 'show', // Class name to get applied to the link when the target is hidden.
        hide_class: 'hide', // Class name to get applied to the link when the target is shown.
        plus_class: 'plus', // Class name to get applied to the link that indicates it is expandable.
        plus_text: null, // The text to show when the target element is hidden.
        minus_class: 'minus', // Class name to get applied to the link that indicates it is contractable.
        minus_text: null, // The text to show when the target element is shown.
        use_cookie: false, // If true, use a cookie to store the last chosen state. If false, do not use a cookie.
        cookie_expires: 365, // Number of days until cookie expires.
        cookie_name: 'show_target' // A name for the cookie, this must be unique.
    };

})(jQuery);
