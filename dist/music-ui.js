/*! ee-class 2015-01-16 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Class=b()}(this,function(){"use strict";var a,b;a=function(a,c,d){c["super"]=function(){if(c.___super)return c.___super.apply(this,Array.prototype.slice.call(arguments));throw new Error("The method «"+a+"» has no super «"+a+"» method on any protoype!")},d&&d.prototype&&b(a,c,d.prototype)},b=function(a,c,d){d&&(Object.hasOwnProperty.call(d,a)?Object.defineProperty(c,"___super",{value:d[a]}):d.___isEeClass||"init"!==a||"object"!=typeof d||"function"!=typeof d.constructor?b(a,c,"object"==typeof d?Object.getPrototypeOf(d):null):Object.defineProperty(c,"___super",{value:d.constructor}))};var c=function(b){var d={},e;return this instanceof c?(b.inherits&&b.inherits.___properties&&(d=b.inherits.___properties),Object.keys(b).forEach(function(c){var e=b[c];"inherits"!==c&&("function"==typeof e?(d[c]={value:e,enumerable:"_"!==c[0]},a(c,e,b.inherits)):"object"==typeof e&&"[object Object]"===Object.prototype.toString.call(e)?Object.hasOwnProperty.call(e,"get")||Object.hasOwnProperty.call(e,"value")||Object.hasOwnProperty.call(e,"set")?Object.keys(e).some(function(a){return-1===["get","set","value","enumerable","writable","configurable"].indexOf(a)})?d[c]=d[c]={value:e,enumerable:!0,writable:!0}:(d[c]=e,"function"==typeof e.value&&a(c,e.value,b.inherits)):d[c]=d[c]={value:e,enumerable:!0,writable:!0}:d[c]={value:e,enumerable:!0,writable:!0})}),e=function(){var a;if(!this)throw new Error("the class constructor was called without the «new» keyword!");if(b.isAbstract)throw new Error("Can't instantiate abstract class!");return this.init?a=this.init.apply(this,Array.prototype.slice.call(arguments)):"function"==typeof b.inherits&&b.inherits.apply(this,Array.prototype.slice.call(arguments)),"undefined"!=typeof a?a:void 0},e.prototype=Object.create(b.inherits?b.inherits.prototype?b.inherits.prototype:b.inherits:{},d),Object.defineProperty(e.prototype,"___isEeClass",{value:!0}),e):Object.create(c,{value:{value:b,enumerable:!0}})};return c.Enumerable=function(){return Object.defineProperty(this,"enumerable",{value:!0,enumerable:!0}),this},c.Configurable=function(){return Object.defineProperty(this,"configurable",{value:!0,enumerable:!0}),this},c.Writable=function(){return Object.defineProperty(this,"writable",{value:!0,enumerable:!0}),this},c.proto=function(a){return"object"==typeof a?Object.getPrototypeOf(a):void 0},c.keys=function(a){var b=[];for(var c in a)b.push(c);return b},c.define=function(a,b,c){Object.defineProperty(a,b,c)},c.implement=function(a,b){return c.keys(a).forEach(function(c){b[c]=a[c]}),b},c.inspect=function(a,b){return b=b||{},("object"==typeof a||"function"==typeof a)&&(Object.getOwnPropertyNames(a).sort().forEach(function(c){"function"==typeof a[c]?b[c]=function(){}:"___isEeClass"!==c&&(b[c]=a[c])}),Object.getPrototypeOf(a)&&(b["super"]={},c.inspect(Object.getPrototypeOf(a),b["super"]))),b},c});
//# sourceMappingURL=Class.min.js.map
/*! ee-class 2015-01-16 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["../dist/Class.min"],b):"object"==typeof exports?module.exports=b(require("../dist/Class.min")):a.Collection=b(a.Class)}(this,function(a){"use strict";var b=new a({inherits:Array,init:function(a){function b(a){d.push(a)}function c(a){for(var c=0;c<a.length;++c)b(a[c])}var d=this,e={}.toString;if(a=a||[],"[object Array]"===e.call(a))c(a);else if("function"==typeof a)c(a(d));else if("object"==typeof a)for(var f in a)b(a[f])}});return b});
//# sourceMappingURL=Collection.min.js.map
/*! ee-class 2015-01-16 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["../dist/Class.min"],b):"object"==typeof exports?module.exports=b(require("../dist/Class.min")):a.EventEmitter=b(a.Class)}(this,function(a){"use strict";var b=console.log,c=new a({___events:{get:function(){return Object.hasOwnProperty.call(this,"____events")||a.define(this,"____events",a({}).Writable()),this.____events}},emit:function(a,c){var d=arguments,e,f,g;if(this.___events[a])for(f=this.___events[a].length;f--;){if(g=this.___events[a][f],"function"!=typeof g.listener)throw this.___events[a].splice(f,1),new Error("cannot emit event «"+a+"», listener is typeof «"+typeof g.listener+"»");g.listener.apply(null,Array.prototype.slice.call(d,1)),g.once&&this.___events[a].splice(f,1)}else"error"===a&&(e=Array.prototype.slice.call(d,1).filter(function(a){return a instanceof Error}),b.error("Cannot emit error event without listeners!"),b.trace(e[0]));return this},listener:function(a){return this.___events&&this.___events[a]?this.___events[a]:[]},off:function(a,b){var c;if(a)if(b&&this.___events[a])for(c=this.___events[a].length;c--;)this.___events[a][c].listener===b&&this.___events[a].splice(c,1);else this.___events[a]&&delete this.___events[a];else this.____events={};return this.emit("removeListener",a,b),this},once:function(a,b){return this.on(a,b,!0)},on:function(a,b,c){var d,e;if("object"==typeof a)for(d=Object.keys(a),e=d.length;e--;)this.addListener(d[e],a[d[e]],c);else this.addListener(a,b,c);return this},addListener:function(a,b,c){this.___events[a]||(this.___events[a]=[]),this.emit("listener",a,b,c===!0),this.___events[a].push({listener:b,once:!!c})}});return c});
//# sourceMappingURL=EventEmitter.min.js.map
/*! ee-class 2015-01-16 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["../dist/Class.min"],b):"object"==typeof exports?module.exports=b(require("../dist/Class.min")):a.Namespace=b(a.Class)}(this,function(a){"use strict";var b=new a({init:function(e,f,g){var h=this;return g=g||{},a.define(h,"Name",a(e)),a.define(h,"TypeName",a("Namespace")),a.define(h,"Type",a(b)),Object.keys(g).forEach(function(b){a.define(h,b,a(g[b]).Enumerable().Writable())}),a.define(h,"addClass",a(function(a,b){if(1==arguments.length&&(b=a,a=b.TypeName),!a)throw new Error("Adding a class to a namespace requires a class name");if(h[a])throw new Error("This class ('"+a+"') already exists in this namespace ('"+h.getFullyQualifiedName()+"')");return c(h,a,b),b})),a.define(h,"addNamespace",a(function(b){if(d(b),h[b.Name])throw new Error("The indicated namespace '"+b.Name+"' already exists in this namespace: '"+h.getFullyQualifiedName()+"'");return a.define(h,b.Name,a(b).Enumerable()),a.define(b,"ParentNamespace",a(h).Enumerable()),b})),a.define(h,"getFullyQualifiedName",a(function(){return(h.ParentNamespace?h.ParentNamespace.getFullyQualifiedName()+".":"")+e})),f&&(a.define(h,"ParentNamespace",a(f).Enumerable()),a.define(f,h.Name,a(h).Enumerable())),h}}),c=function(b,c,f){if(d(b),!c)throw new Error("You need to provide a class name as the second argument");return e(f),a.define(f,"ParentNamespace",a(b).Enumerable()),a.define(b,c,a(f).Enumerable()),f.hasOwnProperty("getFullyQualifiedName")||a.define(f,"getFullyQualifiedName",a(function(){return b.getFullyQualifiedName()+"."+c})),f.hasOwnProperty("TypeName")&&f.prototype.hasOwnProperty("Type")||(a.define(f,"TypeName",a(c)),a.define(f.prototype,"Type",a(f))),f},d=function(a,c){if(!(a&&a instanceof b))throw new Error(c||"You need to provide a valid namespace.")},e=function(a,b){if(!(a&&a instanceof Object))throw new Error(b||"You need to provide a valid class. ")};return b});
//# sourceMappingURL=Namespace.min.js.map
/*! ee-class 2015-01-16 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["../dist/Class.min"],b):"object"==typeof exports?module.exports=b(require("../dist/Class.min")):a.ReferenceObject=b(a.Class)}(this,function(a){"use strict";var b=new a({init:function(a,b){for(var c in b)this[c]=b[c];this.Name=a},toData:function(){var a={};for(var b in this)this.hasOwnProperty(b)&&(a[b]=this[b]);return a},valueOf:function(){return this.toData()},toJSON:function(){return this.toData()}});return b});
//# sourceMappingURL=ReferenceObject.min.js.map


(function() {
    window.addEventListener('load', function() {
        //Width and height
        var w = 800;
        var h = 600;
        var padding = 20;
        var border = 1;
        var bordercolor = 'black';

        var dataset = [
            [5, 20],
            [480, 90],
            [250, 50],
            [100, 33],
            [330, 95],
            [-50, -100],
            [50, -45],
            [410, 12],
            [475, 44],
            [25, 67],
            [85, 21],
            [220, 88],
            [-480, -467],
            [3, -90],
            [468, 481]
        ];

        // create scale functions
        var xScale = d3.scale.linear()
            .domain([d3.min(dataset, function (d) {
            return d[0];
        }), d3.max(dataset, function (d) {
            return d[0];
        })])
            .range([padding, w - padding * 2]);

        var yScale = d3.scale.linear()
            .domain([d3.min(dataset, function (d) {
            return d[0];
        }), d3.max(dataset, function (d) {
            return d[1];
        })])
            .range([h - padding, padding]);

        var rScale = d3.scale.linear()
            .domain([-100, d3.max(dataset, function (d) {
            return d[1];
        })])
            .range([2, 5]);

        //Create SVG element
        var svg = d3.select('#pianoRoll')
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("border", border);

        //define X axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(1)
            .tickSize(-h, 0, 0); //Set rough # of ticks

        //Define Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(1)
            .tickSize(-w, 0, 0);

        //   draw axes here
        svg.append("g")
            .attr("class", "axis") //assign "axis" class
        .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis") //assign "axis" class
        .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

        //Draw a grid
        var numberOfTicks = 30;

        var yAxisGrid = yAxis.ticks(numberOfTicks)
            .tickSize(w, 0)
            .tickFormat("")
            .orient("right");

        var xAxisGrid = xAxis.ticks(numberOfTicks)
            .tickSize(-h, 0)
            .tickFormat("")
            .orient("top");

        svg.append("g")
            .classed('y', true)
            .classed('grid', true)
            .call(yAxisGrid);

        svg.append("g")
            .classed('x', true)
            .classed('grid', true)
            .call(xAxisGrid);

        //create the circles
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d[0]);
            })
            .attr("cy", function (d) {
                return yScale(d[1]);
            })
            .attr("r", 3);
    });
})();
