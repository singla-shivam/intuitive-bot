(function (e) {
  function t(t) {
    for (var o, i, s = t[0], c = t[1], l = t[2], p = 0, f = []; p < s.length; p++) i = s[p], Object.prototype.hasOwnProperty.call(r, i) && r[i] && f.push(r[i][0]), r[i] = 0;
    for (o in c) Object.prototype.hasOwnProperty.call(c, o) && (e[o] = c[o]);
    u && u(t);
    while (f.length) f.shift()();
    return a.push.apply(a, l || []), n()
  }

  function n() {
    for (var e, t = 0; t < a.length; t++) {
      for (var n = a[t], o = !0, s = 1; s < n.length; s++) {
        var c = n[s];
        0 !== r[c] && (o = !1)
      }
      o && (a.splice(t--, 1), e = i(i.s = n[0]))
    }
    return e
  }

  var o = {}, r = {app: 0}, a = [];

  function i(t) {
    if (o[t]) return o[t].exports;
    var n = o[t] = {i: t, l: !1, exports: {}};
    return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports
  }

  i.m = e, i.c = o, i.d = function (e, t, n) {
    i.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
  }, i.r = function (e) {
    "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
  }, i.t = function (e, t) {
    if (1 & t && (e = i(e)), 8 & t) return e;
    if (4 & t && "object" === typeof e && e && e.__esModule) return e;
    var n = Object.create(null);
    if (i.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var o in e) i.d(n, o, function (t) {
      return e[t]
    }.bind(null, o));
    return n
  }, i.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e["default"]
    } : function () {
      return e
    };
    return i.d(t, "a", t), t
  }, i.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, i.p = "/";
  var s = window["webpackJsonp"] = window["webpackJsonp"] || [], c = s.push.bind(s);
  s.push = t, s = s.slice();
  for (var l = 0; l < s.length; l++) t(s[l]);
  var u = c;
  a.push([0, "chunk-vendors"]), n()
})({
  0: function (e, t, n) {
    e.exports = n("56d7")
  }, "034f": function (e, t, n) {
    "use strict";
    var o = n("85ec"), r = n.n(o);
    r.a
  }, "15ec": function (e, t, n) {
  }, "163b": function (e, t, n) {
  }, "172b": function (e, t, n) {
  }, "3b8f": function (e, t, n) {
    "use strict";
    var o = n("d5a6"), r = n.n(o);
    r.a
  }, "56d7": function (e, t, n) {
    "use strict";
    n.r(t);
    n("e260"), n("e6cf"), n("cca6"), n("a79d");
    var o = n("2b0e"), r = function () {
        var e = this, t = e.$createElement, n = e._self._c || t;
        return n("div", [n("Header"), n("div", {staticClass: "content"}, [n("Info"), n("Bot")], 1)], 1)
      }, a = [], i = function () {
        var e = this, t = e.$createElement;
        e._self._c;
        return e._m(0)
      }, s = [function () {
        var e = this, t = e.$createElement, o = e._self._c || t;
        return o("div", [o("img", {staticClass: "bg", attrs: {src: n("c575"), alt: ""}})])
      }], c = {name: "Header"}, l = c, u = (n("8bbf"), n("2877")),
      p = Object(u["a"])(l, i, s, !1, null, "2488f214", null), f = p.exports, d = function () {
        var e = this, t = e.$createElement;
        e._self._c;
        return e._m(0)
      }, m = [function () {
        var e = this, t = e.$createElement, n = e._self._c || t;
        return n("div", {staticClass: "bot"}, [n("iframe", {
          staticClass: "iframe",
          attrs: {allow: "microphone;", src: "https://console.dialogflow.com/api-client/demo/embedded/intuitiveBot"}
        })])
      }], v = {
        name: "Bot", mounted: function () {
          var e = document.querySelector(".iframe");
          e.onload = function () {
            console.log(e.style.height), window.innerHeight <= 600 && (e.style.height = window.innerHeight + "px"), console.log(e.style.height)
          }
        }
      }, b = v, h = (n("6c13"), Object(u["a"])(b, d, m, !1, null, "4f61bb7a", null)), g = h.exports, y = function () {
        var e = this, t = e.$createElement, n = e._self._c || t;
        return n("div", {staticClass: "info"}, [e._m(0), n("LoresIspum"), n("Developers"), n("div", {staticClass: "scrollDown"}, [n("div", {
          staticClass: "arrow",
          on: {click: e.scrollDown}
        }, [n("span"), n("span"), n("span")])])], 1)
      }, w = [function () {
        var e = this, t = e.$createElement, n = e._self._c || t;
        return n("div", {staticClass: "name"}, [n("b", [e._v("Intuitive Bot")])])
      }], _ = function () {
        var e = this, t = e.$createElement, n = e._self._c || t;
        return n("div", {staticClass: "developers"}, [n("div", {staticClass: "titles"}, [e._v("Developers")]), e._l(e.developers, (function (e) {
          return n("Developer", {attrs: {developer: e}})
        }))], 2)
      }, k = [], O = function () {
        var e = this, t = e.$createElement, n = e._self._c || t;
        return n("span", {staticClass: "developer"}, [n("img", {
          staticClass: "profilePhoto",
          attrs: {src: e.developer.photo, alt: ""}
        }), n("a", {
          staticClass: "name",
          attrs: {href: e.developer.link, target: "_blank"}
        }, [e._v(e._s(e.developer.name))])])
      }, x = [], j = {name: "Developer", props: ["developer"]}, C = j,
      P = (n("6e55"), Object(u["a"])(C, O, x, !1, null, "70b40a86", null)), S = P.exports, A = {
        name: "Developers", components: {Developer: S}, data: function () {
          return {
            developers: [{
              name: "Satyam Kumar",
              link: "https://www.linkedin.com/in/satyamcse/",
              photo: "https://media-exp1.licdn.com/dms/image/C5103AQFue6fbO99fJQ/profile-displayphoto-shrink_200_200/0?e=1587600000&v=beta&t=pcft6f1tyV5gSktHyxYZTNWgPPvkyJLcTseXBFykqQQ"
            }, {
              name: "Shivam Singla",
              link: "https://www.linkedin.com/in/singla-shivam/",
              photo: "https://media-exp1.licdn.com/dms/image/C5103AQGYA1jXu4eeEQ/profile-displayphoto-shrink_200_200/0?e=1587600000&v=beta&t=2H31sIRN6UKZ9fjdkeRxa9bN4clqUUTXjYKsoiO-TZg"
            }, {
              name: "Nikesh Thapa",
              link: "https://www.linkedin.com/in/nikesh-thapa-3b99b0164/",
              photo: "https://media-exp1.licdn.com/dms/image/C5103AQEs79X5s0Qi-Q/profile-displayphoto-shrink_200_200/0?e=1587600000&v=beta&t=kanB5d6VxPN_H52GVnBMnE4u5frrsOsoWn0xUvVOpsQ"
            }]
          }
        }
      }, E = A, I = (n("6bd5"), Object(u["a"])(E, _, k, !1, null, "643292a2", null)), Q = I.exports, T = function () {
        var e = this, t = e.$createElement, n = e._self._c || t;
        return n("div", {staticClass: "lores"}, [e._v(" A robot is a machine—especially one programmable by a computer— capable of carrying out a complex series of actions automatically.[2] Robots can be guided by an external control device or the control may be embedded within. Robots may be constructed on the lines of human form, but most robots are machines designed to perform a task with no regard to their aesthetics. Robots can be autonomous or semi-autonomous and range from humanoids such as Honda's Advanced Step in Innovative Mobility (ASIMO) and TOSY's TOSY Ping Pong Playing Robot (TOPIO) to industrial robots, medical operating robots, patient assist robots, dog therapy robots, collectively programmed swarm robots, UAV drones such as General Atomics MQ-1 Predator, and even microscopic nano robots. By mimicking a lifelike appearance or automating movements, a robot may convey a sense of intelligence or thought of its own. Autonomous things are expected to proliferate in the coming decade,[3] with home robotics and the autonomous car as some of the main drivers.[4] ")])
      }, $ = [], B = {name: "LoresIspum"}, D = B, H = (n("b63c"), Object(u["a"])(D, T, $, !1, null, "aa0880a8", null)),
      M = H.exports, N = {
        name: "Info", components: {Developers: Q, LoresIspum: M}, methods: {
          scrollDown: function () {
            window.scroll(0, 1e4)
          }
        }
      }, R = N, U = (n("3b8f"), Object(u["a"])(R, y, w, !1, null, "b7fdc336", null)), V = U.exports,
      Y = {name: "App", components: {Header: f, Bot: g, Info: V}}, q = Y,
      F = (n("034f"), Object(u["a"])(q, r, a, !1, null, null, null)), J = F.exports, L = n("9483");
    Object(L["a"])("".concat("/", "service-worker.js"), {
      ready: function () {
        console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")
      }, registered: function () {
        console.log("Service worker has been registered.")
      }, cached: function () {
        console.log("Content has been cached for offline use.")
      }, updatefound: function () {
        console.log("New content is downloading.")
      }, updated: function () {
        console.log("New content is available; please refresh.")
      }, offline: function () {
        console.log("No internet connection found. App is running in offline mode.")
      }, error: function (e) {
        console.error("Error during service worker registration:", e)
      }
    }), o["a"].config.productionTip = !1, new o["a"]({
      render: function (e) {
        return e(J)
      }
    }).$mount("#app")
  }, "6bd5": function (e, t, n) {
    "use strict";
    var o = n("15ec"), r = n.n(o);
    r.a
  }, "6c13": function (e, t, n) {
    "use strict";
    var o = n("c601"), r = n.n(o);
    r.a
  }, "6e55": function (e, t, n) {
    "use strict";
    var o = n("163b"), r = n.n(o);
    r.a
  }, "85ec": function (e, t, n) {
  }, "8bbf": function (e, t, n) {
    "use strict";
    var o = n("b5a1"), r = n.n(o);
    r.a
  }, b5a1: function (e, t, n) {
  }, b63c: function (e, t, n) {
    "use strict";
    var o = n("172b"), r = n.n(o);
    r.a
  }, c575: function (e, t, n) {
    e.exports = n.p + "img/wallpaper.13a9e2a2.jpg"
  }, c601: function (e, t, n) {
  }, d5a6: function (e, t, n) {
  }
});
//# sourceMappingURL=app.eedb5dd1.js.map