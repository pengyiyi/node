'use strict';

var s ="Hello";
var s1="Bye";

var Container ={
    hi:function(name){
        console.log(s+','+name);
    },
    bye:function(name){
        console.log(s1+','+name);
    }
}

module.exports = Container;