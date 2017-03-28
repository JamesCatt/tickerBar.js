# tickerBar.js

A plugin for creating a newsticker-style infinitely-scrolling bar of elements on a page.

## Usage

Include tickerBar.js or tickerBar.min.js and (optionally) tickerBar.css on your page, and then pass in the parent element of your ticker like so:

```
<link rel="stylesheet" href="tickerBar.css">

<div id="myTicker" class="ticker--parent>
    <div class="ticker--item">Some content</div>
    <div class="ticker--item">Some content</div>
    <div class="ticker--item">Some content</div>
</div>

<script src="tickerBar.min.js"></script>
<script>
    var myTickerEl = document.getElementById('myTicker');
    var myTicker = new tickerBar(myTickerEl, { // options });
</script>
```

## CSS

If you wish, you can use the included stylesheet (which uses flexbox) or roll your own. The only requirements are:

1. The immediate child elements must not wrap (i.e., they should be displayed in a single horizontal row). This is easiest to accomplish with flexbox (see `tickerBar.css`), but in theory other methods (such as `whitespace: nowrap`) could work as well.
2. The parent element must not adapt its width to the content (i.e., set `overflow-x: hidden;`).

## Options

```
var defaultOptions = {

    pxPerSec: 60,
    // Number of pixels per second to scroll. Note that tickerBar.js uses requestAnimationFrame so performance may vary.

    autoStart: true,
    // Automatically start the ticker on creation.
    
    autoFill: true
    //  If the ticker items don't fill the entire width of the parent on startup, duplicate them until they do.
    // For example, if your ticker is 1000px wide but you only have 3 items at 100px wide each, then tickerBar.js will automatically create 3 additional copies of each item so you end up with:
    //
    // (3 * 100px) * 4 == 1200px

}
```

## Methods

```
myTicker.start()
// Starts the ticker if currently stopped.

myTicker.stop()
// Stops the ticker if currently started.

myTicker.toggle()
// Starts/stops the ticker as appropriate.
```