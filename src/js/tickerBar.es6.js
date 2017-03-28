'use strict';

/*
*   Name: tickerBar.js
*   Description: A Javascript plugin for creating newsticker-style, infinitely-scrolling bar.
*   Author: James Catt
*   License: MIT
*   Docs: 
*   Version: 1.0.0
*/

(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        //AMD
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        //Node.js or CommonJS
        module.exports = factory();
    } else {
        // Global
        root.tickerBar = factory();
    }
    
})(window || module || {}, () => {

    function tickerBar(elem, options) {
        
        this.elem = elem;
        
        // starting position
        this.xPos = 0;
        this.ticking = false;
        this.recycleOnTick = false; // used later for clearing old nodes

        //
        // set default options
        //
        
        this.options = typeof options !== 'undefined' ? options : {};

        // tickerItems == all child elements
        this.tickerItems = elem.children;

        // pxPerFrame == number of pixels per frame to scroll, assumes 60FPS
        this.pxPerFrame = typeof this.options.pxPerSec !== 'undefined' ? parseFloat(this.options.pxPerSec / 60) : 1;
        
        // autoFill == should fill out the ticker by cloning items if necessary
        this.autoFill = typeof this.options.autoFill !== 'undefined' ? this.options.autoFill : true;

        // autoStart == start the ticker on creation
        this.autoStart = typeof this.options.autoStart !== 'undefined' ? this.options.autoStart : true;
        
        this.autoStart === true && this.start();
        
    }
    
    // Public Methods

    tickerBar.prototype = {

        start: function () {
            
            if (this.ticking) {
                return; // do nothing if already started
            }
            
            if (this.autoFill) {

                var newEls = [];

                if (getItemsTotalLength(this.tickerItems) <= getTickerWidth(this.elem)) {

                    for (let i = 0; i < this.tickerItems.length; i++) {

                        newEls.push(this.tickerItems[i].cloneNode(true));

                    }
                }

                while (getItemsTotalLength(this.tickerItems) - getItemLength(getWidestItem(this.tickerItems)) <= getTickerWidth(this.elem)) {

                    for (let i = 0; i < newEls.length; i++) {

                        this.elem.appendChild(newEls[i].cloneNode(true));

                    }

                }
            
            }

            this.ticking = true;

            this.tick();
            
        },

        stop: function () {

            this.ticking = false;
            
        },
        
        toggle: function () {
            
            this.ticking ? this.stop() : this.start();
            
        },

        tick: function () {

            if (this.recycleOnTick) {

                this.xPos -= getItemLength(this.tickerItems[0]);
                this.tickerItems[0].parentNode.removeChild(this.tickerItems[0]);
                this.recycleOnTick = false;
                
            }

            this.xPos += this.pxPerFrame;

            for (var i = 0; i < this.tickerItems.length; i++) {

                this.tickerItems[i].style.transform = 'translateX(-' + this.xPos + 'px)';
                
            }
            
            if (getItemLength(this.tickerItems[0]) < this.xPos) {
            
                this.elem.appendChild(this.tickerItems[0].cloneNode(true));
                this.recycleOnTick = true;
                
            }

            if (this.ticking) {

                window.requestAnimationFrame(this.tick.bind(this));
                
            }
        }

    };
    
    
    // Pure Functions
    
    

    function getTickerWidth (ticker) {

        return ticker.clientWidth;

    }

    function getItemLength (el) {

        return parseInt(el.clientWidth) + parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight);

    }

    function getItemsTotalLength (elsArray) {
        
        let itemsLength = 0;

        for (let i = 0; i < elsArray.length; i++) {

            itemsLength += getItemLength(elsArray[i]);

        }

        return itemsLength;

    }
        
    function getWidestItem (elsArray) {

        let widestItem = elsArray[0];

        for (let i = 0; i < elsArray.length; i++) {

            if (getItemLength(elsArray[i]) > getItemLength(widestItem)) {

                widestItem = elsArray[i];

            }

        }

        return widestItem;

    }

    return tickerBar;
    
});