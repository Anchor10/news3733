(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/news-list/news-list"],{"158b":function(t,e,n){"use strict";n.r(e);var a=n("1f8a"),r=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=r.a},"1f8a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{}},props:{newsList:{type:Array}},filters:{formatDate:function(t){var e=function(t){return t>=10?t:"0"+t},n=new Date(1e3*t);return n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate()+" "+e(n.getHours())+":"+e(n.getMinutes())}},methods:{goDetail:function(e){t.navigateTo({url:"/pages/detail/detail?url="+e.titleurl})}}};e.default=n}).call(this,n("543d")["default"])},"254b":function(t,e,n){},"4baf":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.newsList.map(function(e,n){var a=t._f("formatDate")(e.newstime);return{$orig:t.__get_orig(e),f0:a}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},r=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r})},"77b6":function(t,e,n){"use strict";var a=n("254b"),r=n.n(a);r.a},"93e9":function(t,e,n){"use strict";n.r(e);var a=n("4baf"),r=n("158b");for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);n("77b6");var i=n("2877"),o=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);e["default"]=o.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/news-list/news-list-create-component',
    {
        'components/news-list/news-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("93e9"))
        })
    },
    [['components/news-list/news-list-create-component']]
]);                
