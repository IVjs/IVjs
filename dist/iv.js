!(function(e, t) {
  if ('object' == typeof exports && 'object' == typeof module) module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var r in n) ('object' == typeof exports ? exports : e)[r] = n[r];
  }
})(window, function() {
  return (function(e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var o = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.t = function(e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if ((n.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & t && 'string' != typeof e))
          for (var o in e)
            n.d(
              r,
              o,
              function(t) {
                return e[t];
              }.bind(null, o),
            );
        return r;
      }),
      (n.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ''),
      n((n.s = 5))
    );
  })([
    function(e, t, n) {
      'use strict';
      function r(e) {
        return {}.toString
          .call(e)
          .match(/\s([a-zA-Z]+)/)[1]
          .toLowerCase();
      }
      function o(e) {
        return JSON.parse(JSON.stringify(e));
      }
      function i(e) {
        var t = r(e);
        return (
          ['null', 'undefined'].indexOf(t) > -1 ||
          (['object', 'array', 'arguments', 'json', 'string'].indexOf(t) > -1 &&
            ('string' === t ? 0 === e.length : 0 === Object.getOwnPropertyNames(e).length || 0 === e.length))
        );
      }
      function s(e) {
        return 'object' === r(e);
      }
      function a(e, t, n, r) {
        void 0 === n && (n = !1), void 0 === r && (r = !0);
        var u = r ? o(e) : e,
          c = {};
        for (var l in u)
          if (!1 !== u.hasOwnProperty(l)) {
            if (s(u[l]) && n) {
              var p = Array.from(arguments)
                  .slice()
                  .slice(1),
                d = a.apply(this, [u[l]].concat(p));
              i(d) || (u[l] = d);
            }
            var f = t(l, u[l]);
            if (Array.isArray(f) && 2 === f.length) c[f[0]] = f[1];
            else if (!i(f))
              throw new Error(
                'It looks like you might have been trying to construct a new object, but you returned something other than an array that looks like [key, value]. You returned ' +
                  f,
              );
          }
        return c;
      }
      function u(e, t) {
        for (var n = t.split('.'), r = e, o = !0, i = []; o && n.length > 0; ) {
          var s = n.shift();
          s && r[s] ? (i.push(s), (r = r[s])) : (o = !1);
        }
        return { exists: o, existingPath: i.join('.'), finalValidProperty: r };
      }
      function c(e, t, n, r) {
        void 0 === n && (n = !1), void 0 === r && (r = !0);
        var i = 'UpperFirst' === t,
          s = r ? o(e) : e,
          u = i ? /[a-z]/ : /[A-z]/;
        return a(
          s,
          function(e, t) {
            var n = [e, t];
            return 'string' != typeof e ? n : null === e.charAt(0).match(u) ? n : [i ? l(e) : p(e), t];
          },
          n,
        );
      }
      function l(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      }
      function p(e) {
        return e.charAt(0).toLowerCase() + e.slice(1);
      }
      function d(e) {
        if (!s(e)) throw new Error("'obj' was not an object. Was " + r(e));
        return Object.keys(e).map(function(t) {
          return e[t];
        });
      }
      function f(e, t) {
        return -1 !== d(t).indexOf(e);
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.toType = r),
        (t.round = function(e, t) {
          return void 0 === t && (t = 2), Number(Math.round(Number(e + 'e' + t)) + 'e-' + t);
        }),
        (t.clone = o),
        (t.isEmpty = i),
        (t.isNotEmpty = function(e) {
          return !i(e);
        }),
        (t.wrapObjectWithProperty = function(e, t, n) {
          void 0 === n && (n = !0);
          var r = {},
            i = n ? o(e) : e;
          return (r[t] = i), r;
        }),
        (t.isObject = s),
        (t.traverseObject = a),
        (t.nestedPropertyDetails = u),
        (t.nestedPropertyTest = function(e, t, n) {
          var r = u(e, t);
          return !!r.exists && !!n(r.finalValidProperty);
        }),
        (t.nestedPropertyExists = function(e, t) {
          return u(e, t).exists;
        }),
        (t.changePropsInitialCase = c),
        (t.firstCharToUpper = l),
        (t.firstCharToLower = p),
        (t.convertPropKeysForAsp = function(e) {
          return c(e, 'UpperFirst', !0);
        }),
        (t.convertPropKeysForJs = function(e) {
          return c(e, 'lowerFirst', !0);
        }),
        (t.valuesArrayFromObject = d),
        (t.objectContainsValue = f),
        (t.objectKeyForValue = function(e, t) {
          return (
            !!f(e, t) &&
            Object.keys(t).reduce(function(n, r) {
              return t[r] === e && (n = r), n;
            }, '')
          );
        }),
        (t.forceArray = function(e) {
          return -1 !== ['null', 'undefined'].indexOf(r(e)) ? [] : 'array' !== r(e) ? [e] : e;
        });
      var h = function() {
        var e = [],
          t = [],
          n = !0;
        return function(r, o) {
          if ('object' == typeof o && null !== o) {
            n && ((r = '__BASE_OBJECT__'), (n = !1));
            var i = e.indexOf(o);
            if (-1 !== i) return '[circular reference of ' + t[i] + ']';
            e.push(o), t.push(r);
          }
          return o;
        };
      };
      function v(e, t) {
        void 0 === t && (t = {});
        var n = Object.assign({}, { tabLength: 2, stripQuotes: !1, sort: !1 }, t),
          o = n.tabLength,
          i = n.stripQuotes;
        if (n.sort) {
          if ('array' === r(e)) return m(e.sort(), o, i);
          if ('object' === r(e)) {
            var s = {};
            return (
              Object.keys(e)
                .sort()
                .forEach(function(t) {
                  s[t] = e[t];
                }),
              m(s, o, i)
            );
          }
          return m(e, o, i);
        }
        return m(e, o, i);
      }
      function m(e, t, n) {
        var r = JSON.stringify(e, h(), t);
        return n && (r = r.replace(/"(.*?)": /g, '$1: ')), r;
      }
      (t.stringify = v),
        (t.deepEqual = function(e, t) {
          var n = { sort: !0 };
          return v(e, n) === v(t, n);
        }),
        (t.mediaWidth = function() {
          return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }),
        (t.mediaHeight = function() {
          return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        });
    },
    function(e, t, n) {
      var r;
      e.exports = (function e(t, n, o) {
        function i(a, u) {
          if (!n[a]) {
            if (!t[a]) {
              var c = 'function' == typeof r && r;
              if (!u && c) return r(a, !0);
              if (s) return s(a, !0);
              var l = new Error("Cannot find module '" + a + "'");
              throw ((l.code = 'MODULE_NOT_FOUND'), l);
            }
            var p = (n[a] = { exports: {} });
            t[a][0].call(
              p.exports,
              function(e) {
                var n = t[a][1][e];
                return i(n || e);
              },
              p,
              p.exports,
              e,
              t,
              n,
              o,
            );
          }
          return n[a].exports;
        }
        for (var s = 'function' == typeof r && r, a = 0; a < o.length; a++) i(o[a]);
        return i;
      })(
        {
          1: [
            function(e, t, n) {
              'use strict';
              'undefined' == typeof window
                ? (t.exports = function(t) {
                    return e('./src/utils/window').init(t), e('./src/index');
                  })
                : (t.exports = e('./src/index'));
            },
            { './src/index': 19, './src/utils/window': 52 },
          ],
          2: [
            function(e, t, n) {
              'use strict';
              var r = e('./utils/extend.js');
              function o(e, t) {
                for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  if (e.immediatePropagationStopped) break;
                  r(e);
                }
              }
              var i = (function() {
                function e(t) {
                  !(function(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                  })(this, e),
                    (this.options = r({}, t || {}));
                }
                return (
                  (e.prototype.fire = function(e) {
                    var t = void 0,
                      n = 'on' + e.type,
                      r = this.global;
                    (t = this[e.type]) && o(e, t),
                      this[n] && this[n](e),
                      !e.propagationStopped && r && (t = r[e.type]) && o(e, t);
                  }),
                  (e.prototype.on = function(e, t) {
                    this[e] ? this[e].push(t) : (this[e] = [t]);
                  }),
                  (e.prototype.off = function(e, t) {
                    var n = this[e],
                      r = n ? n.indexOf(t) : -1;
                    -1 !== r && n.splice(r, 1), ((n && 0 === n.length) || !t) && (this[e] = void 0);
                  }),
                  e
                );
              })();
              t.exports = i;
            },
            { './utils/extend.js': 41 },
          ],
          3: [
            function(e, t, n) {
              'use strict';
              var r = e('./utils/extend'),
                o = e('./utils/getOriginXY'),
                i = e('./defaultOptions'),
                s = e('./utils/Signals').new(),
                a = (function() {
                  function e(t, n, a, u, c, l) {
                    var p = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
                    !(function(e, t) {
                      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                    })(this, e);
                    var d = t.target,
                      f = ((d && d.options) || i).deltaSource,
                      h = o(d, c, a),
                      v = 'start' === u,
                      m = 'end' === u,
                      g = v ? t.startCoords : t.curCoords,
                      y = t.prevEvent;
                    c = c || t.element;
                    var b = r({}, g.page),
                      x = r({}, g.client);
                    (b.x -= h.x),
                      (b.y -= h.y),
                      (x.x -= h.x),
                      (x.y -= h.y),
                      (this.ctrlKey = n.ctrlKey),
                      (this.altKey = n.altKey),
                      (this.shiftKey = n.shiftKey),
                      (this.metaKey = n.metaKey),
                      (this.button = n.button),
                      (this.buttons = n.buttons),
                      (this.target = c),
                      (this.currentTarget = c),
                      (this.relatedTarget = l || null),
                      (this.preEnd = p),
                      (this.type = a + (u || '')),
                      (this.interaction = t),
                      (this.interactable = d),
                      (this.t0 = v ? t.downTimes[t.downTimes.length - 1] : y.t0);
                    var w = {
                      interaction: t,
                      event: n,
                      action: a,
                      phase: u,
                      element: c,
                      related: l,
                      page: b,
                      client: x,
                      coords: g,
                      starting: v,
                      ending: m,
                      deltaSource: f,
                      iEvent: this,
                    };
                    s.fire('set-xy', w),
                      m
                        ? ((this.pageX = y.pageX),
                          (this.pageY = y.pageY),
                          (this.clientX = y.clientX),
                          (this.clientY = y.clientY))
                        : ((this.pageX = b.x), (this.pageY = b.y), (this.clientX = x.x), (this.clientY = x.y)),
                      (this.x0 = t.startCoords.page.x - h.x),
                      (this.y0 = t.startCoords.page.y - h.y),
                      (this.clientX0 = t.startCoords.client.x - h.x),
                      (this.clientY0 = t.startCoords.client.y - h.y),
                      s.fire('set-delta', w),
                      (this.timeStamp = g.timeStamp),
                      (this.dt = t.pointerDelta.timeStamp),
                      (this.duration = this.timeStamp - this.t0),
                      (this.speed = t.pointerDelta[f].speed),
                      (this.velocityX = t.pointerDelta[f].vx),
                      (this.velocityY = t.pointerDelta[f].vy),
                      (this.swipe = m || 'inertiastart' === u ? this.getSwipe() : null),
                      s.fire('new', w);
                  }
                  return (
                    (e.prototype.getSwipe = function() {
                      var e = this.interaction;
                      if (e.prevEvent.speed < 600 || this.timeStamp - e.prevEvent.timeStamp > 150) return null;
                      var t = (180 * Math.atan2(e.prevEvent.velocityY, e.prevEvent.velocityX)) / Math.PI;
                      t < 0 && (t += 360);
                      var n = 112.5 <= t && t < 247.5,
                        r = 202.5 <= t && t < 337.5,
                        o = !n && (292.5 <= t || t < 67.5),
                        i = !r && 22.5 <= t && t < 157.5;
                      return {
                        up: r,
                        down: i,
                        left: n,
                        right: o,
                        angle: t,
                        speed: e.prevEvent.speed,
                        velocity: { x: e.prevEvent.velocityX, y: e.prevEvent.velocityY },
                      };
                    }),
                    (e.prototype.preventDefault = function() {}),
                    (e.prototype.stopImmediatePropagation = function() {
                      this.immediatePropagationStopped = this.propagationStopped = !0;
                    }),
                    (e.prototype.stopPropagation = function() {
                      this.propagationStopped = !0;
                    }),
                    e
                  );
                })();
              s.on('set-delta', function(e) {
                var t = e.iEvent,
                  n = e.interaction,
                  r = e.starting,
                  o = e.deltaSource,
                  i = r ? t : n.prevEvent;
                'client' === o
                  ? ((t.dx = t.clientX - i.clientX), (t.dy = t.clientY - i.clientY))
                  : ((t.dx = t.pageX - i.pageX), (t.dy = t.pageY - i.pageY));
              }),
                (a.signals = s),
                (t.exports = a);
            },
            { './defaultOptions': 18, './utils/Signals': 34, './utils/extend': 41, './utils/getOriginXY': 42 },
          ],
          4: [
            function(e, t, n) {
              'use strict';
              var r = e('./utils/clone'),
                o = e('./utils/is'),
                i = e('./utils/events'),
                s = e('./utils/extend'),
                a = e('./actions/base'),
                u = e('./scope'),
                c = e('./Eventable'),
                l = e('./defaultOptions'),
                p = e('./utils/Signals').new(),
                d = e('./utils/domUtils'),
                f = d.getElementRect,
                h = d.nodeContains,
                v = d.trySelector,
                m = d.matchesSelector,
                g = e('./utils/window'),
                y = g.getWindow,
                b = e('./utils/arr'),
                x = b.contains,
                w = e('./utils/browser'),
                E = w.wheelEvent;
              u.interactables = [];
              var T = (function() {
                function e(t, n) {
                  !(function(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                  })(this, e),
                    (n = n || {}),
                    (this.target = t),
                    (this.events = new c()),
                    (this._context = n.context || u.document),
                    (this._win = y(v(t) ? this._context : t)),
                    (this._doc = this._win.document),
                    p.fire('new', { target: t, options: n, interactable: this, win: this._win }),
                    u.addDocument(this._doc, this._win),
                    u.interactables.push(this),
                    this.set(n);
                }
                return (
                  (e.prototype.setOnEvents = function(e, t) {
                    var n = 'on' + e;
                    return (
                      o.function(t.onstart) && (this.events[n + 'start'] = t.onstart),
                      o.function(t.onmove) && (this.events[n + 'move'] = t.onmove),
                      o.function(t.onend) && (this.events[n + 'end'] = t.onend),
                      o.function(t.oninertiastart) && (this.events[n + 'inertiastart'] = t.oninertiastart),
                      this
                    );
                  }),
                  (e.prototype.setPerAction = function(e, t) {
                    for (var n in t)
                      n in l[e] &&
                        (o.object(t[n])
                          ? ((this.options[e][n] = r(this.options[e][n] || {})),
                            s(this.options[e][n], t[n]),
                            o.object(l.perAction[n]) &&
                              'enabled' in l.perAction[n] &&
                              (this.options[e][n].enabled = !1 !== t[n].enabled))
                          : o.bool(t[n]) && o.object(l.perAction[n])
                          ? (this.options[e][n].enabled = t[n])
                          : void 0 !== t[n] && (this.options[e][n] = t[n]));
                  }),
                  (e.prototype.getRect = function(e) {
                    return (
                      (e = e || this.target),
                      o.string(this.target) && !o.element(e) && (e = this._context.querySelector(this.target)),
                      f(e)
                    );
                  }),
                  (e.prototype.rectChecker = function(e) {
                    return o.function(e)
                      ? ((this.getRect = e), this)
                      : null === e
                      ? (delete this.options.getRect, this)
                      : this.getRect;
                  }),
                  (e.prototype._backCompatOption = function(e, t) {
                    if (v(t) || o.object(t)) {
                      this.options[e] = t;
                      for (var n = 0; n < a.names.length; n++) {
                        var r = a.names[n];
                        this.options[r][e] = t;
                      }
                      return this;
                    }
                    return this.options[e];
                  }),
                  (e.prototype.origin = function(e) {
                    return this._backCompatOption('origin', e);
                  }),
                  (e.prototype.deltaSource = function(e) {
                    return 'page' === e || 'client' === e
                      ? ((this.options.deltaSource = e), this)
                      : this.options.deltaSource;
                  }),
                  (e.prototype.context = function() {
                    return this._context;
                  }),
                  (e.prototype.inContext = function(e) {
                    return this._context === e.ownerDocument || h(this._context, e);
                  }),
                  (e.prototype.fire = function(e) {
                    return this.events.fire(e), this;
                  }),
                  (e.prototype._onOffMultiple = function(e, t, n, r) {
                    if ((o.string(t) && -1 !== t.search(' ') && (t = t.trim().split(/ +/)), o.array(t))) {
                      for (var i = 0; i < t.length; i++) {
                        var s = t[i];
                        this[e](s, n, r);
                      }
                      return !0;
                    }
                    if (o.object(t)) {
                      for (var a in t) this[e](a, t[a], n);
                      return !0;
                    }
                  }),
                  (e.prototype.on = function(t, n, r) {
                    return this._onOffMultiple('on', t, n, r)
                      ? this
                      : ('wheel' === t && (t = E),
                        x(e.eventTypes, t)
                          ? this.events.on(t, n)
                          : o.string(this.target)
                          ? i.addDelegate(this.target, this._context, t, n, r)
                          : i.add(this.target, t, n, r),
                        this);
                  }),
                  (e.prototype.off = function(t, n, r) {
                    return this._onOffMultiple('off', t, n, r)
                      ? this
                      : ('wheel' === t && (t = E),
                        x(e.eventTypes, t)
                          ? this.events.off(t, n)
                          : o.string(this.target)
                          ? i.removeDelegate(this.target, this._context, t, n, r)
                          : i.remove(this.target, t, n, r),
                        this);
                  }),
                  (e.prototype.set = function(t) {
                    o.object(t) || (t = {}), (this.options = r(l.base));
                    var n = r(l.perAction);
                    for (var i in a.methodDict) {
                      var s = a.methodDict[i];
                      (this.options[i] = r(l[i])), this.setPerAction(i, n), this[s](t[i]);
                    }
                    for (var u = 0; u < e.settingsMethods.length; u++) {
                      var c = e.settingsMethods[u];
                      (this.options[c] = l.base[c]), c in t && this[c](t[c]);
                    }
                    return p.fire('set', { options: t, interactable: this }), this;
                  }),
                  (e.prototype.unset = function() {
                    if ((i.remove(this.target, 'all'), o.string(this.target)))
                      for (var e in i.delegatedEvents) {
                        var t = i.delegatedEvents[e];
                        t.selectors[0] === this.target &&
                          t.contexts[0] === this._context &&
                          (t.selectors.splice(0, 1),
                          t.contexts.splice(0, 1),
                          t.listeners.splice(0, 1),
                          t.selectors.length || (t[e] = null)),
                          i.remove(this._context, e, i.delegateListener),
                          i.remove(this._context, e, i.delegateUseCapture, !0);
                      }
                    else i.remove(this, 'all');
                    p.fire('unset', { interactable: this }), u.interactables.splice(u.interactables.indexOf(this), 1);
                    for (var n = 0; n < (u.interactions || []).length; n++) {
                      var r = (u.interactions || [])[n];
                      r.target === this && r.interacting() && !r._ending && r.stop();
                    }
                    return u.interact;
                  }),
                  e
                );
              })();
              (u.interactables.indexOfElement = function(e, t) {
                t = t || u.document;
                for (var n = 0; n < this.length; n++) {
                  var r = this[n];
                  if (r.target === e && r._context === t) return n;
                }
                return -1;
              }),
                (u.interactables.get = function(e, t, n) {
                  var r = this[this.indexOfElement(e, t && t.context)];
                  return r && (o.string(e) || n || r.inContext(e)) ? r : null;
                }),
                (u.interactables.forEachMatch = function(e, t) {
                  for (var n = 0; n < this.length; n++) {
                    var r = this[n],
                      i = void 0;
                    if (
                      ((o.string(r.target) ? o.element(e) && m(e, r.target) : e === r.target) &&
                        r.inContext(e) &&
                        (i = t(r)),
                      void 0 !== i)
                    )
                      return i;
                  }
                }),
                (T.eventTypes = u.eventTypes = []),
                (T.signals = p),
                (T.settingsMethods = ['deltaSource', 'origin', 'preventDefault', 'rectChecker']),
                (t.exports = T);
            },
            {
              './Eventable': 2,
              './actions/base': 6,
              './defaultOptions': 18,
              './scope': 33,
              './utils/Signals': 34,
              './utils/arr': 35,
              './utils/browser': 36,
              './utils/clone': 37,
              './utils/domUtils': 39,
              './utils/events': 40,
              './utils/extend': 41,
              './utils/is': 46,
              './utils/window': 52,
            },
          ],
          5: [
            function(e, t, n) {
              'use strict';
              var r = e('./scope'),
                o = e('./utils'),
                i = e('./utils/events'),
                s = e('./utils/browser'),
                a = e('./utils/domObjects'),
                u = e('./utils/interactionFinder'),
                c = e('./utils/Signals').new(),
                l = {},
                p = ['pointerDown', 'pointerMove', 'pointerUp', 'updatePointer', 'removePointer'],
                d = 0;
              r.interactions = [];
              for (
                var f = (function() {
                    function e(t) {
                      var n = t.pointerType;
                      !(function(e, t) {
                        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                      })(this, e),
                        (this.target = null),
                        (this.element = null),
                        (this.prepared = { name: null, axis: null, edges: null }),
                        (this.pointers = []),
                        (this.pointerIds = []),
                        (this.downTargets = []),
                        (this.downTimes = []),
                        (this.prevCoords = { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }),
                        (this.curCoords = { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }),
                        (this.startCoords = { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }),
                        (this.pointerDelta = {
                          page: { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
                          client: { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
                          timeStamp: 0,
                        }),
                        (this.downEvent = null),
                        (this.downPointer = {}),
                        (this._eventTarget = null),
                        (this._curEventTarget = null),
                        (this.prevEvent = null),
                        (this.pointerIsDown = !1),
                        (this.pointerWasMoved = !1),
                        (this._interacting = !1),
                        (this._ending = !1),
                        (this.pointerType = n),
                        c.fire('new', this),
                        r.interactions.push(this);
                    }
                    return (
                      (e.prototype.pointerDown = function(e, t, n) {
                        var r = this.updatePointer(e, t, !0);
                        c.fire('down', { pointer: e, event: t, eventTarget: n, pointerIndex: r, interaction: this });
                      }),
                      (e.prototype.start = function(e, t, n) {
                        this.interacting() ||
                          !this.pointerIsDown ||
                          this.pointerIds.length < ('gesture' === e.name ? 2 : 1) ||
                          (-1 === r.interactions.indexOf(this) && r.interactions.push(this),
                          o.copyAction(this.prepared, e),
                          (this.target = t),
                          (this.element = n),
                          c.fire('action-start', { interaction: this, event: this.downEvent }));
                      }),
                      (e.prototype.pointerMove = function(t, n, r) {
                        this.simulation || (this.updatePointer(t), o.setCoords(this.curCoords, this.pointers));
                        var i =
                            this.curCoords.page.x === this.prevCoords.page.x &&
                            this.curCoords.page.y === this.prevCoords.page.y &&
                            this.curCoords.client.x === this.prevCoords.client.x &&
                            this.curCoords.client.y === this.prevCoords.client.y,
                          s = void 0,
                          a = void 0;
                        this.pointerIsDown &&
                          !this.pointerWasMoved &&
                          ((s = this.curCoords.client.x - this.startCoords.client.x),
                          (a = this.curCoords.client.y - this.startCoords.client.y),
                          (this.pointerWasMoved = o.hypot(s, a) > e.pointerMoveTolerance));
                        var u = {
                          pointer: t,
                          pointerIndex: this.getPointerIndex(t),
                          event: n,
                          eventTarget: r,
                          dx: s,
                          dy: a,
                          duplicate: i,
                          interaction: this,
                          interactingBeforeMove: this.interacting(),
                        };
                        i || o.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords),
                          c.fire('move', u),
                          i ||
                            (this.interacting() && this.doMove(u),
                            this.pointerWasMoved && o.copyCoords(this.prevCoords, this.curCoords));
                      }),
                      (e.prototype.doMove = function(e) {
                        (e = o.extend(
                          {
                            pointer: this.pointers[0],
                            event: this.prevEvent,
                            eventTarget: this._eventTarget,
                            interaction: this,
                          },
                          e || {},
                        )),
                          c.fire('before-action-move', e),
                          this._dontFireMove || c.fire('action-move', e),
                          (this._dontFireMove = !1);
                      }),
                      (e.prototype.pointerUp = function(e, t, n, r) {
                        var o = this.getPointerIndex(e);
                        c.fire(/cancel$/i.test(t.type) ? 'cancel' : 'up', {
                          pointer: e,
                          pointerIndex: o,
                          event: t,
                          eventTarget: n,
                          curEventTarget: r,
                          interaction: this,
                        }),
                          this.simulation || this.end(t),
                          (this.pointerIsDown = !1),
                          this.removePointer(e, t);
                      }),
                      (e.prototype.end = function(e) {
                        (this._ending = !0),
                          (e = e || this.prevEvent),
                          this.interacting() && c.fire('action-end', { event: e, interaction: this }),
                          this.stop(),
                          (this._ending = !1);
                      }),
                      (e.prototype.currentAction = function() {
                        return this._interacting ? this.prepared.name : null;
                      }),
                      (e.prototype.interacting = function() {
                        return this._interacting;
                      }),
                      (e.prototype.stop = function() {
                        c.fire('stop', { interaction: this }),
                          this._interacting &&
                            (c.fire('stop-active', { interaction: this }),
                            c.fire('stop-' + this.prepared.name, { interaction: this })),
                          (this.target = this.element = null),
                          (this._interacting = !1),
                          (this.prepared.name = this.prevEvent = null);
                      }),
                      (e.prototype.getPointerIndex = function(e) {
                        return 'mouse' === this.pointerType || 'pen' === this.pointerType
                          ? 0
                          : this.pointerIds.indexOf(o.getPointerId(e));
                      }),
                      (e.prototype.updatePointer = function(e, t) {
                        var n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : t && /(down|start)$/i.test(t.type),
                          r = o.getPointerId(e),
                          i = this.getPointerIndex(e);
                        return (
                          -1 === i && ((i = this.pointerIds.length), (this.pointerIds[i] = r)),
                          n &&
                            c.fire('update-pointer-down', {
                              pointer: e,
                              event: t,
                              down: n,
                              pointerId: r,
                              pointerIndex: i,
                              interaction: this,
                            }),
                          (this.pointers[i] = e),
                          i
                        );
                      }),
                      (e.prototype.removePointer = function(e, t) {
                        var n = this.getPointerIndex(e);
                        -1 !== n &&
                          (c.fire('remove-pointer', { pointer: e, event: t, pointerIndex: n, interaction: this }),
                          this.pointers.splice(n, 1),
                          this.pointerIds.splice(n, 1),
                          this.downTargets.splice(n, 1),
                          this.downTimes.splice(n, 1));
                      }),
                      (e.prototype._updateEventTargets = function(e, t) {
                        (this._eventTarget = e), (this._curEventTarget = t);
                      }),
                      e
                    );
                  })(),
                  h = 0;
                h < p.length;
                h++
              ) {
                var v = p[h];
                l[v] = m(v);
              }
              function m(e) {
                return function(t) {
                  var n = o.getPointerType(t),
                    i = o.getEventTargets(t),
                    a = i[0],
                    c = i[1],
                    l = [];
                  if (s.supportsTouch && /touch/.test(t.type)) {
                    d = new Date().getTime();
                    for (var p = 0; p < t.changedTouches.length; p++) {
                      var h = t.changedTouches[p],
                        v = h,
                        m = u.search(v, t.type, a);
                      l.push([v, m || new f({ pointerType: n })]);
                    }
                  } else {
                    var g = !1;
                    if (!s.supportsPointerEvent && /mouse/.test(t.type)) {
                      for (var y = 0; y < r.interactions.length && !g; y++)
                        g = 'mouse' !== r.interactions[y].pointerType && r.interactions[y].pointerIsDown;
                      g = g || new Date().getTime() - d < 500 || 0 === t.timeStamp;
                    }
                    if (!g) {
                      var b = u.search(t, t.type, a);
                      b || (b = new f({ pointerType: n })), l.push([t, b]);
                    }
                  }
                  for (var x = 0; x < l.length; x++) {
                    var w = l[x],
                      E = w[0],
                      T = w[1];
                    T._updateEventTargets(a, c), T[e](E, t, a, c);
                  }
                };
              }
              function g(e) {
                for (var t = 0; t < r.interactions.length; t++) {
                  var n = r.interactions[t];
                  n.end(e), c.fire('endall', { event: e, interaction: n });
                }
              }
              var y = {},
                b = s.pEventTypes;
              function x(e, t) {
                var n = e.doc,
                  o = 0 === t.indexOf('add') ? i.add : i.remove;
                for (var a in r.delegatedEvents) o(n, a, i.delegateListener), o(n, a, i.delegateUseCapture, !0);
                for (var u in y) o(n, u, y[u], s.isIOS ? { passive: !1 } : void 0);
              }
              a.PointerEvent
                ? ((y[b.down] = l.pointerDown),
                  (y[b.move] = l.pointerMove),
                  (y[b.up] = l.pointerUp),
                  (y[b.cancel] = l.pointerUp))
                : ((y.mousedown = l.pointerDown),
                  (y.mousemove = l.pointerMove),
                  (y.mouseup = l.pointerUp),
                  (y.touchstart = l.pointerDown),
                  (y.touchmove = l.pointerMove),
                  (y.touchend = l.pointerUp),
                  (y.touchcancel = l.pointerUp)),
                (y.blur = g),
                c.on('update-pointer-down', function(e) {
                  var t = e.interaction,
                    n = e.pointer,
                    r = e.pointerId,
                    i = e.pointerIndex,
                    s = e.event,
                    a = e.eventTarget,
                    u = e.down;
                  (t.pointerIds[i] = r),
                    (t.pointers[i] = n),
                    u && (t.pointerIsDown = !0),
                    t.interacting() ||
                      (o.setCoords(t.startCoords, t.pointers),
                      o.copyCoords(t.curCoords, t.startCoords),
                      o.copyCoords(t.prevCoords, t.startCoords),
                      (t.downEvent = s),
                      (t.downTimes[i] = t.curCoords.timeStamp),
                      (t.downTargets[i] = a || (s && o.getEventTargets(s)[0])),
                      (t.pointerWasMoved = !1),
                      o.pointerExtend(t.downPointer, n));
                }),
                r.signals.on('add-document', x),
                r.signals.on('remove-document', x),
                (f.pointerMoveTolerance = 1),
                (f.doOnInteractions = m),
                (f.endAll = g),
                (f.signals = c),
                (f.docEvents = y),
                (r.endAllInteractions = g),
                (t.exports = f);
            },
            {
              './scope': 33,
              './utils': 44,
              './utils/Signals': 34,
              './utils/browser': 36,
              './utils/domObjects': 38,
              './utils/events': 40,
              './utils/interactionFinder': 45,
            },
          ],
          6: [
            function(e, t, n) {
              'use strict';
              var r = e('../Interaction'),
                o = e('../InteractEvent'),
                i = { firePrepared: s, names: [], methodDict: {} };
              function s(e, t, n, r) {
                var i = e.prepared.name,
                  s = new o(e, t, i, n, e.element, null, r);
                e.target.fire(s), (e.prevEvent = s);
              }
              r.signals.on('action-start', function(e) {
                var t = e.interaction,
                  n = e.event;
                (t._interacting = !0), s(t, n, 'start');
              }),
                r.signals.on('action-move', function(e) {
                  var t = e.interaction,
                    n = e.event,
                    r = e.preEnd;
                  if ((s(t, n, 'move', r), !t.interacting())) return !1;
                }),
                r.signals.on('action-end', function(e) {
                  var t = e.interaction,
                    n = e.event;
                  s(t, n, 'end');
                }),
                (t.exports = i);
            },
            { '../InteractEvent': 3, '../Interaction': 5 },
          ],
          7: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('../utils'),
                i = e('../InteractEvent'),
                s = e('../Interactable'),
                a = e('../Interaction'),
                u = e('../defaultOptions'),
                c = {
                  defaults: {
                    enabled: !1,
                    mouseButtons: null,
                    origin: null,
                    snap: null,
                    restrict: null,
                    inertia: null,
                    autoScroll: null,
                    startAxis: 'xy',
                    lockAxis: 'xy',
                  },
                  checker: function(e, t, n) {
                    var r = n.options.drag;
                    return r.enabled ? { name: 'drag', axis: 'start' === r.lockAxis ? r.startAxis : r.lockAxis } : null;
                  },
                  getCursor: function() {
                    return 'move';
                  },
                };
              a.signals.on('before-action-move', function(e) {
                var t = e.interaction;
                if ('drag' === t.prepared.name) {
                  var n = t.prepared.axis;
                  'x' === n
                    ? ((t.curCoords.page.y = t.startCoords.page.y),
                      (t.curCoords.client.y = t.startCoords.client.y),
                      (t.pointerDelta.page.speed = Math.abs(t.pointerDelta.page.vx)),
                      (t.pointerDelta.client.speed = Math.abs(t.pointerDelta.client.vx)),
                      (t.pointerDelta.client.vy = 0),
                      (t.pointerDelta.page.vy = 0))
                    : 'y' === n &&
                      ((t.curCoords.page.x = t.startCoords.page.x),
                      (t.curCoords.client.x = t.startCoords.client.x),
                      (t.pointerDelta.page.speed = Math.abs(t.pointerDelta.page.vy)),
                      (t.pointerDelta.client.speed = Math.abs(t.pointerDelta.client.vy)),
                      (t.pointerDelta.client.vx = 0),
                      (t.pointerDelta.page.vx = 0));
                }
              }),
                i.signals.on('new', function(e) {
                  var t = e.iEvent,
                    n = e.interaction;
                  if ('dragmove' === t.type) {
                    var r = n.prepared.axis;
                    'x' === r
                      ? ((t.pageY = n.startCoords.page.y), (t.clientY = n.startCoords.client.y), (t.dy = 0))
                      : 'y' === r &&
                        ((t.pageX = n.startCoords.page.x), (t.clientX = n.startCoords.client.x), (t.dx = 0));
                  }
                }),
                (s.prototype.draggable = function(e) {
                  return o.is.object(e)
                    ? ((this.options.drag.enabled = !1 !== e.enabled),
                      this.setPerAction('drag', e),
                      this.setOnEvents('drag', e),
                      /^(xy|x|y|start)$/.test(e.lockAxis) && (this.options.drag.lockAxis = e.lockAxis),
                      /^(xy|x|y)$/.test(e.startAxis) && (this.options.drag.startAxis = e.startAxis),
                      this)
                    : o.is.bool(e)
                    ? ((this.options.drag.enabled = e),
                      e || (this.ondragstart = this.ondragstart = this.ondragend = null),
                      this)
                    : this.options.drag;
                }),
                (r.drag = c),
                r.names.push('drag'),
                o.merge(s.eventTypes, ['dragstart', 'dragmove', 'draginertiastart', 'draginertiaresume', 'dragend']),
                (r.methodDict.drag = 'draggable'),
                (u.drag = c.defaults),
                (t.exports = c);
            },
            {
              '../InteractEvent': 3,
              '../Interactable': 4,
              '../Interaction': 5,
              '../defaultOptions': 18,
              '../utils': 44,
              './base': 6,
            },
          ],
          8: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('../utils'),
                i = e('../scope'),
                s = e('../interact'),
                a = e('../InteractEvent'),
                u = e('../Interactable'),
                c = e('../Interaction'),
                l = e('../defaultOptions'),
                p = { defaults: { enabled: !1, accept: null, overlap: 'pointer' } },
                d = !1;
              function f(e, t) {
                for (var n = void 0, r = 0; r < e.dropzones.length; r++) {
                  var o = e.dropzones[r],
                    i = e.elements[r];
                  i !== n && ((t.target = i), o.fire(t)), (n = i);
                }
              }
              function h(e, t) {
                var n = (function(e, t) {
                  for (var n = [], r = [], s = 0; s < i.interactables.length; s++) {
                    var a = i.interactables[s];
                    if (a.options.drop.enabled) {
                      var u = a.options.drop.accept;
                      if (!((o.is.element(u) && u !== t) || (o.is.string(u) && !o.matchesSelector(t, u))))
                        for (
                          var c = o.is.string(a.target) ? a._context.querySelectorAll(a.target) : [a.target], l = 0;
                          l < c.length;
                          l++
                        ) {
                          var p = c[l];
                          p !== t && (n.push(a), r.push(p));
                        }
                    }
                  }
                  return { elements: r, dropzones: n };
                })(0, t);
                (e.dropzones = n.dropzones), (e.elements = n.elements), (e.rects = []);
                for (var r = 0; r < e.dropzones.length; r++) e.rects[r] = e.dropzones[r].getRect(e.elements[r]);
              }
              function v(e, t, n) {
                var r = { enter: null, leave: null, activate: null, deactivate: null, move: null, drop: null },
                  i = {
                    dragEvent: n,
                    interaction: e,
                    target: e.dropElement,
                    dropzone: e.dropTarget,
                    relatedTarget: n.target,
                    draggable: n.interactable,
                    timeStamp: n.timeStamp,
                  };
                return (
                  e.dropElement !== e.prevDropElement &&
                    (e.prevDropTarget &&
                      ((r.leave = o.extend({ type: 'dragleave' }, i)),
                      (n.dragLeave = r.leave.target = e.prevDropElement),
                      (n.prevDropzone = r.leave.dropzone = e.prevDropTarget)),
                    e.dropTarget &&
                      ((r.enter = {
                        dragEvent: n,
                        interaction: e,
                        target: e.dropElement,
                        dropzone: e.dropTarget,
                        relatedTarget: n.target,
                        draggable: n.interactable,
                        timeStamp: n.timeStamp,
                        type: 'dragenter',
                      }),
                      (n.dragEnter = e.dropElement),
                      (n.dropzone = e.dropTarget))),
                  'dragend' === n.type &&
                    e.dropTarget &&
                    ((r.drop = o.extend({ type: 'drop' }, i)),
                    (n.dropzone = e.dropTarget),
                    (n.relatedTarget = e.dropElement)),
                  'dragstart' === n.type &&
                    ((r.activate = o.extend({ type: 'dropactivate' }, i)),
                    (r.activate.target = null),
                    (r.activate.dropzone = null)),
                  'dragend' === n.type &&
                    ((r.deactivate = o.extend({ type: 'dropdeactivate' }, i)),
                    (r.deactivate.target = null),
                    (r.deactivate.dropzone = null)),
                  'dragmove' === n.type &&
                    e.dropTarget &&
                    ((r.move = o.extend({ dragmove: n, type: 'dropmove' }, i)), (n.dropzone = e.dropTarget)),
                  r
                );
              }
              function m(e, t) {
                var n = e.activeDrops,
                  r = e.prevDropTarget,
                  o = e.dropTarget,
                  i = e.dropElement;
                t.leave && r.fire(t.leave),
                  t.move && o.fire(t.move),
                  t.enter && o.fire(t.enter),
                  t.drop && o.fire(t.drop),
                  t.deactivate && f(n, t.deactivate),
                  (e.prevDropTarget = o),
                  (e.prevDropElement = i);
              }
              c.signals.on('action-start', function(e) {
                var t = e.interaction;
                e.event;
                if ('drag' === t.prepared.name) {
                  (t.activeDrops.dropzones = []),
                    (t.activeDrops.elements = []),
                    (t.activeDrops.rects = []),
                    (t.dropEvents = null),
                    t.dynamicDrop || h(t.activeDrops, t.element);
                  var n = t.prevEvent,
                    r = v(t, 0, n);
                  r.activate && f(t.activeDrops, r.activate);
                }
              }),
                a.signals.on('new', function(e) {
                  var t = e.interaction,
                    n = e.iEvent,
                    r = e.event;
                  if ('dragmove' === n.type || 'dragend' === n.type) {
                    var i = t.element,
                      s = n,
                      a = (function(e, t, n) {
                        var r = e.interaction,
                          i = [];
                        d && h(r.activeDrops, n);
                        for (var s = 0; s < r.activeDrops.dropzones.length; s++) {
                          var a = r.activeDrops.dropzones[s],
                            u = r.activeDrops.elements[s],
                            c = r.activeDrops.rects[s];
                          i.push(a.dropCheck(e, t, r.target, n, u, c) ? u : null);
                        }
                        var l = o.indexOfDeepestElement(i);
                        return {
                          dropzone: r.activeDrops.dropzones[l] || null,
                          element: r.activeDrops.elements[l] || null,
                        };
                      })(s, r, i);
                    (t.dropTarget = a.dropzone), (t.dropElement = a.element), (t.dropEvents = v(t, 0, s));
                  }
                }),
                c.signals.on('action-move', function(e) {
                  var t = e.interaction;
                  'drag' === t.prepared.name && m(t, t.dropEvents);
                }),
                c.signals.on('action-end', function(e) {
                  var t = e.interaction;
                  'drag' === t.prepared.name && m(t, t.dropEvents);
                }),
                c.signals.on('stop-drag', function(e) {
                  var t = e.interaction;
                  (t.activeDrops = { dropzones: null, elements: null, rects: null }), (t.dropEvents = null);
                }),
                (u.prototype.dropzone = function(e) {
                  return o.is.object(e)
                    ? ((this.options.drop.enabled = !1 !== e.enabled),
                      o.is.function(e.ondrop) && (this.events.ondrop = e.ondrop),
                      o.is.function(e.ondropactivate) && (this.events.ondropactivate = e.ondropactivate),
                      o.is.function(e.ondropdeactivate) && (this.events.ondropdeactivate = e.ondropdeactivate),
                      o.is.function(e.ondragenter) && (this.events.ondragenter = e.ondragenter),
                      o.is.function(e.ondragleave) && (this.events.ondragleave = e.ondragleave),
                      o.is.function(e.ondropmove) && (this.events.ondropmove = e.ondropmove),
                      /^(pointer|center)$/.test(e.overlap)
                        ? (this.options.drop.overlap = e.overlap)
                        : o.is.number(e.overlap) && (this.options.drop.overlap = Math.max(Math.min(1, e.overlap), 0)),
                      'accept' in e && (this.options.drop.accept = e.accept),
                      'checker' in e && (this.options.drop.checker = e.checker),
                      this)
                    : o.is.bool(e)
                    ? ((this.options.drop.enabled = e),
                      e ||
                        (this.ondragenter = this.ondragleave = this.ondrop = this.ondropactivate = this.ondropdeactivate = null),
                      this)
                    : this.options.drop;
                }),
                (u.prototype.dropCheck = function(e, t, n, r, i, s) {
                  var a = !1;
                  if (!(s = s || this.getRect(i)))
                    return !!this.options.drop.checker && this.options.drop.checker(e, t, a, this, i, n, r);
                  var u = this.options.drop.overlap;
                  if ('pointer' === u) {
                    var c = o.getOriginXY(n, r, 'drag'),
                      l = o.getPageXY(e);
                    (l.x += c.x), (l.y += c.y);
                    var p = l.x > s.left && l.x < s.right,
                      d = l.y > s.top && l.y < s.bottom;
                    a = p && d;
                  }
                  var f = n.getRect(r);
                  if (f && 'center' === u) {
                    var h = f.left + f.width / 2,
                      v = f.top + f.height / 2;
                    a = h >= s.left && h <= s.right && v >= s.top && v <= s.bottom;
                  }
                  if (f && o.is.number(u)) {
                    var m =
                        Math.max(0, Math.min(s.right, f.right) - Math.max(s.left, f.left)) *
                        Math.max(0, Math.min(s.bottom, f.bottom) - Math.max(s.top, f.top)),
                      g = m / (f.width * f.height);
                    a = g >= u;
                  }
                  return this.options.drop.checker && (a = this.options.drop.checker(e, t, a, this, i, n, r)), a;
                }),
                u.signals.on('unset', function(e) {
                  var t = e.interactable;
                  t.dropzone(!1);
                }),
                u.settingsMethods.push('dropChecker'),
                c.signals.on('new', function(e) {
                  (e.dropTarget = null),
                    (e.dropElement = null),
                    (e.prevDropTarget = null),
                    (e.prevDropElement = null),
                    (e.dropEvents = null),
                    (e.activeDrops = { dropzones: [], elements: [], rects: [] });
                }),
                c.signals.on('stop', function(e) {
                  var t = e.interaction;
                  t.dropTarget = t.dropElement = t.prevDropTarget = t.prevDropElement = null;
                }),
                (s.dynamicDrop = function(e) {
                  return o.is.bool(e) ? ((d = e), s) : d;
                }),
                o.merge(u.eventTypes, ['dragenter', 'dragleave', 'dropactivate', 'dropdeactivate', 'dropmove', 'drop']),
                (r.methodDict.drop = 'dropzone'),
                (l.drop = p.defaults),
                (t.exports = p);
            },
            {
              '../InteractEvent': 3,
              '../Interactable': 4,
              '../Interaction': 5,
              '../defaultOptions': 18,
              '../interact': 21,
              '../scope': 33,
              '../utils': 44,
              './base': 6,
            },
          ],
          9: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('../utils'),
                i = e('../InteractEvent'),
                s = e('../Interactable'),
                a = e('../Interaction'),
                u = e('../defaultOptions'),
                c = {
                  defaults: { enabled: !1, origin: null, restrict: null },
                  checker: function(e, t, n, r, o) {
                    return o.pointerIds.length >= 2 ? { name: 'gesture' } : null;
                  },
                  getCursor: function() {
                    return '';
                  },
                };
              i.signals.on('new', function(e) {
                var t = e.iEvent,
                  n = e.interaction;
                'gesturestart' === t.type &&
                  ((t.ds = 0),
                  (n.gesture.startDistance = n.gesture.prevDistance = t.distance),
                  (n.gesture.startAngle = n.gesture.prevAngle = t.angle),
                  (n.gesture.scale = 1));
              }),
                i.signals.on('new', function(e) {
                  var t = e.iEvent,
                    n = e.interaction;
                  'gesturemove' === t.type &&
                    ((t.ds = t.scale - n.gesture.scale),
                    n.target.fire(t),
                    (n.gesture.prevAngle = t.angle),
                    (n.gesture.prevDistance = t.distance),
                    t.scale === 1 / 0 ||
                      null === t.scale ||
                      void 0 === t.scale ||
                      isNaN(t.scale) ||
                      (n.gesture.scale = t.scale));
                }),
                (s.prototype.gesturable = function(e) {
                  return o.is.object(e)
                    ? ((this.options.gesture.enabled = !1 !== e.enabled),
                      this.setPerAction('gesture', e),
                      this.setOnEvents('gesture', e),
                      this)
                    : o.is.bool(e)
                    ? ((this.options.gesture.enabled = e),
                      e || (this.ongesturestart = this.ongesturestart = this.ongestureend = null),
                      this)
                    : this.options.gesture;
                }),
                i.signals.on('set-delta', function(e) {
                  var t = e.interaction,
                    n = e.iEvent,
                    r = e.action,
                    s = e.event,
                    a = e.starting,
                    u = e.ending,
                    c = e.deltaSource;
                  if ('gesture' === r) {
                    var l = t.pointers;
                    (n.touches = [l[0], l[1]]),
                      a
                        ? ((n.distance = o.touchDistance(l, c)),
                          (n.box = o.touchBBox(l)),
                          (n.scale = 1),
                          (n.ds = 0),
                          (n.angle = o.touchAngle(l, void 0, c)),
                          (n.da = 0))
                        : u || s instanceof i
                        ? ((n.distance = t.prevEvent.distance),
                          (n.box = t.prevEvent.box),
                          (n.scale = t.prevEvent.scale),
                          (n.ds = n.scale - 1),
                          (n.angle = t.prevEvent.angle),
                          (n.da = n.angle - t.gesture.startAngle))
                        : ((n.distance = o.touchDistance(l, c)),
                          (n.box = o.touchBBox(l)),
                          (n.scale = n.distance / t.gesture.startDistance),
                          (n.angle = o.touchAngle(l, t.gesture.prevAngle, c)),
                          (n.ds = n.scale - t.gesture.prevScale),
                          (n.da = n.angle - t.gesture.prevAngle));
                  }
                }),
                a.signals.on('new', function(e) {
                  e.gesture = {
                    start: { x: 0, y: 0 },
                    startDistance: 0,
                    prevDistance: 0,
                    distance: 0,
                    scale: 1,
                    startAngle: 0,
                    prevAngle: 0,
                  };
                }),
                (r.gesture = c),
                r.names.push('gesture'),
                o.merge(s.eventTypes, ['gesturestart', 'gesturemove', 'gestureend']),
                (r.methodDict.gesture = 'gesturable'),
                (u.gesture = c.defaults),
                (t.exports = c);
            },
            {
              '../InteractEvent': 3,
              '../Interactable': 4,
              '../Interaction': 5,
              '../defaultOptions': 18,
              '../utils': 44,
              './base': 6,
            },
          ],
          10: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('../utils'),
                i = e('../utils/browser'),
                s = e('../InteractEvent'),
                a = e('../Interactable'),
                u = e('../Interaction'),
                c = e('../defaultOptions'),
                l = i.supportsTouch || i.supportsPointerEvent ? 20 : 10,
                p = {
                  defaults: {
                    enabled: !1,
                    mouseButtons: null,
                    origin: null,
                    snap: null,
                    restrict: null,
                    inertia: null,
                    autoScroll: null,
                    square: !1,
                    preserveAspectRatio: !1,
                    axis: 'xy',
                    margin: NaN,
                    edges: null,
                    invert: 'none',
                  },
                  checker: function(e, t, n, r, i, s) {
                    if (!s) return null;
                    var a = o.extend({}, i.curCoords.page),
                      u = n.options;
                    if (u.resize.enabled) {
                      var c = u.resize,
                        p = { left: !1, right: !1, top: !1, bottom: !1 };
                      if (o.is.object(c.edges)) {
                        for (var f in p) p[f] = d(f, c.edges[f], a, i._eventTarget, r, s, c.margin || l);
                        if (
                          ((p.left = p.left && !p.right),
                          (p.top = p.top && !p.bottom),
                          p.left || p.right || p.top || p.bottom)
                        )
                          return { name: 'resize', edges: p };
                      } else {
                        var h = 'y' !== u.resize.axis && a.x > s.right - l,
                          v = 'x' !== u.resize.axis && a.y > s.bottom - l;
                        if (h || v) return { name: 'resize', axes: (h ? 'x' : '') + (v ? 'y' : '') };
                      }
                    }
                    return null;
                  },
                  cursors: i.isIe9
                    ? {
                        x: 'e-resize',
                        y: 's-resize',
                        xy: 'se-resize',
                        top: 'n-resize',
                        left: 'w-resize',
                        bottom: 's-resize',
                        right: 'e-resize',
                        topleft: 'se-resize',
                        bottomright: 'se-resize',
                        topright: 'ne-resize',
                        bottomleft: 'ne-resize',
                      }
                    : {
                        x: 'ew-resize',
                        y: 'ns-resize',
                        xy: 'nwse-resize',
                        top: 'ns-resize',
                        left: 'ew-resize',
                        bottom: 'ns-resize',
                        right: 'ew-resize',
                        topleft: 'nwse-resize',
                        bottomright: 'nwse-resize',
                        topright: 'nesw-resize',
                        bottomleft: 'nesw-resize',
                      },
                  getCursor: function(e) {
                    if (e.axis) return p.cursors[e.name + e.axis];
                    if (e.edges) {
                      for (var t = '', n = ['top', 'bottom', 'left', 'right'], r = 0; r < 4; r++)
                        e.edges[n[r]] && (t += n[r]);
                      return p.cursors[t];
                    }
                  },
                };
              function d(e, t, n, r, i, s, a) {
                if (!t) return !1;
                if (!0 === t) {
                  var u = o.is.number(s.width) ? s.width : s.right - s.left,
                    c = o.is.number(s.height) ? s.height : s.bottom - s.top;
                  if (
                    (u < 0 && ('left' === e ? (e = 'right') : 'right' === e && (e = 'left')),
                    c < 0 && ('top' === e ? (e = 'bottom') : 'bottom' === e && (e = 'top')),
                    'left' === e)
                  )
                    return n.x < (u >= 0 ? s.left : s.right) + a;
                  if ('top' === e) return n.y < (c >= 0 ? s.top : s.bottom) + a;
                  if ('right' === e) return n.x > (u >= 0 ? s.right : s.left) - a;
                  if ('bottom' === e) return n.y > (c >= 0 ? s.bottom : s.top) - a;
                }
                return !!o.is.element(r) && (o.is.element(t) ? t === r : o.matchesUpTo(r, t, i));
              }
              s.signals.on('new', function(e) {
                var t = e.iEvent,
                  n = e.interaction;
                if ('resizestart' === t.type && n.prepared.edges) {
                  var r = n.target.getRect(n.element),
                    i = n.target.options.resize;
                  if (i.square || i.preserveAspectRatio) {
                    var s = o.extend({}, n.prepared.edges);
                    (s.top = s.top || (s.left && !s.bottom)),
                      (s.left = s.left || (s.top && !s.right)),
                      (s.bottom = s.bottom || (s.right && !s.top)),
                      (s.right = s.right || (s.bottom && !s.left)),
                      (n.prepared._linkedEdges = s);
                  } else n.prepared._linkedEdges = null;
                  i.preserveAspectRatio && (n.resizeStartAspectRatio = r.width / r.height),
                    (n.resizeRects = {
                      start: r,
                      current: o.extend({}, r),
                      inverted: o.extend({}, r),
                      previous: o.extend({}, r),
                      delta: { left: 0, right: 0, width: 0, top: 0, bottom: 0, height: 0 },
                    }),
                    (t.rect = n.resizeRects.inverted),
                    (t.deltaRect = n.resizeRects.delta);
                }
              }),
                s.signals.on('new', function(e) {
                  var t = e.iEvent,
                    n = e.phase,
                    r = e.interaction;
                  if ('move' === n && r.prepared.edges) {
                    var i = r.target.options.resize,
                      s = i.invert,
                      a = 'reposition' === s || 'negate' === s,
                      u = r.prepared.edges,
                      c = r.resizeRects.start,
                      l = r.resizeRects.current,
                      p = r.resizeRects.inverted,
                      d = r.resizeRects.delta,
                      f = o.extend(r.resizeRects.previous, p),
                      h = u,
                      v = t.dx,
                      m = t.dy;
                    if (i.preserveAspectRatio || i.square) {
                      var g = i.preserveAspectRatio ? r.resizeStartAspectRatio : 1;
                      (u = r.prepared._linkedEdges),
                        (h.left && h.bottom) || (h.right && h.top)
                          ? (m = -v / g)
                          : h.left || h.right
                          ? (m = v / g)
                          : (h.top || h.bottom) && (v = m * g);
                    }
                    if (
                      (u.top && (l.top += m),
                      u.bottom && (l.bottom += m),
                      u.left && (l.left += v),
                      u.right && (l.right += v),
                      a)
                    ) {
                      if ((o.extend(p, l), 'reposition' === s)) {
                        var y = void 0;
                        p.top > p.bottom && ((y = p.top), (p.top = p.bottom), (p.bottom = y)),
                          p.left > p.right && ((y = p.left), (p.left = p.right), (p.right = y));
                      }
                    } else
                      (p.top = Math.min(l.top, c.bottom)),
                        (p.bottom = Math.max(l.bottom, c.top)),
                        (p.left = Math.min(l.left, c.right)),
                        (p.right = Math.max(l.right, c.left));
                    for (var b in ((p.width = p.right - p.left), (p.height = p.bottom - p.top), p)) d[b] = p[b] - f[b];
                    (t.edges = r.prepared.edges), (t.rect = p), (t.deltaRect = d);
                  }
                }),
                (a.prototype.resizable = function(e) {
                  return o.is.object(e)
                    ? ((this.options.resize.enabled = !1 !== e.enabled),
                      this.setPerAction('resize', e),
                      this.setOnEvents('resize', e),
                      /^x$|^y$|^xy$/.test(e.axis)
                        ? (this.options.resize.axis = e.axis)
                        : null === e.axis && (this.options.resize.axis = c.resize.axis),
                      o.is.bool(e.preserveAspectRatio)
                        ? (this.options.resize.preserveAspectRatio = e.preserveAspectRatio)
                        : o.is.bool(e.square) && (this.options.resize.square = e.square),
                      this)
                    : o.is.bool(e)
                    ? ((this.options.resize.enabled = e),
                      e || (this.onresizestart = this.onresizestart = this.onresizeend = null),
                      this)
                    : this.options.resize;
                }),
                u.signals.on('new', function(e) {
                  e.resizeAxes = 'xy';
                }),
                s.signals.on('set-delta', function(e) {
                  var t = e.interaction,
                    n = e.iEvent,
                    r = e.action;
                  if ('resize' === r && t.resizeAxes) {
                    var o = t.target.options;
                    o.resize.square
                      ? ('y' === t.resizeAxes ? (n.dx = n.dy) : (n.dy = n.dx), (n.axes = 'xy'))
                      : ((n.axes = t.resizeAxes),
                        'x' === t.resizeAxes ? (n.dy = 0) : 'y' === t.resizeAxes && (n.dx = 0));
                  }
                }),
                (r.resize = p),
                r.names.push('resize'),
                o.merge(a.eventTypes, [
                  'resizestart',
                  'resizemove',
                  'resizeinertiastart',
                  'resizeinertiaresume',
                  'resizeend',
                ]),
                (r.methodDict.resize = 'resizable'),
                (c.resize = p.defaults),
                (t.exports = p);
            },
            {
              '../InteractEvent': 3,
              '../Interactable': 4,
              '../Interaction': 5,
              '../defaultOptions': 18,
              '../utils': 44,
              '../utils/browser': 36,
              './base': 6,
            },
          ],
          11: [
            function(e, t, n) {
              'use strict';
              var r = e('./utils/raf'),
                o = e('./utils/window').getWindow,
                i = e('./utils/is'),
                s = e('./utils/domUtils'),
                a = e('./Interaction'),
                u = e('./defaultOptions'),
                c = {
                  defaults: { enabled: !1, container: null, margin: 60, speed: 300 },
                  interaction: null,
                  i: null,
                  x: 0,
                  y: 0,
                  isScrolling: !1,
                  prevTime: 0,
                  start: function(e) {
                    (c.isScrolling = !0),
                      r.cancel(c.i),
                      (c.interaction = e),
                      (c.prevTime = new Date().getTime()),
                      (c.i = r.request(c.scroll));
                  },
                  stop: function() {
                    (c.isScrolling = !1), r.cancel(c.i);
                  },
                  scroll: function() {
                    var e = c.interaction.target.options[c.interaction.prepared.name].autoScroll,
                      t = e.container || o(c.interaction.element),
                      n = new Date().getTime(),
                      s = (n - c.prevTime) / 1e3,
                      a = e.speed * s;
                    a >= 1 &&
                      (i.window(t)
                        ? t.scrollBy(c.x * a, c.y * a)
                        : t && ((t.scrollLeft += c.x * a), (t.scrollTop += c.y * a)),
                      (c.prevTime = n)),
                      c.isScrolling && (r.cancel(c.i), (c.i = r.request(c.scroll)));
                  },
                  check: function(e, t) {
                    var n = e.options;
                    return n[t].autoScroll && n[t].autoScroll.enabled;
                  },
                  onInteractionMove: function(e) {
                    var t = e.interaction,
                      n = e.pointer;
                    if (t.interacting() && c.check(t.target, t.prepared.name))
                      if (t.simulation) c.x = c.y = 0;
                      else {
                        var r = void 0,
                          a = void 0,
                          u = void 0,
                          l = void 0,
                          p = t.target.options[t.prepared.name].autoScroll,
                          d = p.container || o(t.element);
                        if (i.window(d))
                          (l = n.clientX < c.margin),
                            (r = n.clientY < c.margin),
                            (a = n.clientX > d.innerWidth - c.margin),
                            (u = n.clientY > d.innerHeight - c.margin);
                        else {
                          var f = s.getElementClientRect(d);
                          (l = n.clientX < f.left + c.margin),
                            (r = n.clientY < f.top + c.margin),
                            (a = n.clientX > f.right - c.margin),
                            (u = n.clientY > f.bottom - c.margin);
                        }
                        (c.x = a ? 1 : l ? -1 : 0),
                          (c.y = u ? 1 : r ? -1 : 0),
                          c.isScrolling || ((c.margin = p.margin), (c.speed = p.speed), c.start(t));
                      }
                  },
                };
              a.signals.on('stop-active', function() {
                c.stop();
              }),
                a.signals.on('action-move', c.onInteractionMove),
                (u.perAction.autoScroll = c.defaults),
                (t.exports = c);
            },
            {
              './Interaction': 5,
              './defaultOptions': 18,
              './utils/domUtils': 39,
              './utils/is': 46,
              './utils/raf': 50,
              './utils/window': 52,
            },
          ],
          12: [
            function(e, t, n) {
              'use strict';
              var r = e('../Interactable'),
                o = e('../actions/base'),
                i = e('../utils/is'),
                s = e('../utils/domUtils'),
                a = e('../utils'),
                u = a.warnOnce;
              (r.prototype.getAction = function(e, t, n, r) {
                var o = this.defaultActionChecker(e, t, n, r);
                return this.options.actionChecker ? this.options.actionChecker(e, t, o, this, r, n) : o;
              }),
                (r.prototype.ignoreFrom = u(function(e) {
                  return this._backCompatOption('ignoreFrom', e);
                }, 'Interactable.ignoreForm() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue}).')),
                (r.prototype.allowFrom = u(function(e) {
                  return this._backCompatOption('allowFrom', e);
                }, 'Interactable.allowForm() has been deprecated. Use Interactble.draggable({allowFrom: newValue}).')),
                (r.prototype.testIgnore = function(e, t, n) {
                  return (
                    !(!e || !i.element(n)) &&
                    (i.string(e) ? s.matchesUpTo(n, e, t) : !!i.element(e) && s.nodeContains(e, n))
                  );
                }),
                (r.prototype.testAllow = function(e, t, n) {
                  return (
                    !e ||
                    (!!i.element(n) && (i.string(e) ? s.matchesUpTo(n, e, t) : !!i.element(e) && s.nodeContains(e, n)))
                  );
                }),
                (r.prototype.testIgnoreAllow = function(e, t, n) {
                  return !this.testIgnore(e.ignoreFrom, t, n) && this.testAllow(e.allowFrom, t, n);
                }),
                (r.prototype.actionChecker = function(e) {
                  return i.function(e)
                    ? ((this.options.actionChecker = e), this)
                    : null === e
                    ? (delete this.options.actionChecker, this)
                    : this.options.actionChecker;
                }),
                (r.prototype.styleCursor = function(e) {
                  return i.bool(e)
                    ? ((this.options.styleCursor = e), this)
                    : null === e
                    ? (delete this.options.styleCursor, this)
                    : this.options.styleCursor;
                }),
                (r.prototype.defaultActionChecker = function(e, t, n, r) {
                  for (
                    var i = this.getRect(r), s = t.buttons || { 0: 1, 1: 4, 3: 8, 4: 16 }[t.button], a = null, u = 0;
                    u < o.names.length;
                    u++
                  ) {
                    var c = o.names[u];
                    if (
                      (!n.pointerIsDown ||
                        !/mouse|pointer/.test(n.pointerType) ||
                        0 != (s & this.options[c].mouseButtons)) &&
                      (a = o[c].checker(e, t, this, r, n, i))
                    )
                      return a;
                  }
                });
            },
            { '../Interactable': 4, '../actions/base': 6, '../utils': 44, '../utils/domUtils': 39, '../utils/is': 46 },
          ],
          13: [
            function(e, t, n) {
              'use strict';
              var r = e('../interact'),
                o = e('../Interactable'),
                i = e('../Interaction'),
                s = e('../actions/base'),
                a = e('../defaultOptions'),
                u = e('../scope'),
                c = e('../utils'),
                l = e('../utils/Signals').new();
              e('./InteractableMethods');
              var p = {
                signals: l,
                withinInteractionLimit: m,
                maxInteractions: 1 / 0,
                defaults: {
                  perAction: {
                    manualStart: !1,
                    max: 1 / 0,
                    maxPerElement: 1,
                    allowFrom: null,
                    ignoreFrom: null,
                    mouseButtons: 1,
                  },
                },
                setActionDefaults: function(e) {
                  c.extend(e.defaults, p.defaults.perAction);
                },
                validateAction: d,
              };
              function d(e, t, n, r) {
                return c.is.object(e) &&
                  t.testIgnoreAllow(t.options[e.name], n, r) &&
                  t.options[e.name].enabled &&
                  m(t, n, e)
                  ? e
                  : null;
              }
              function f(e, t, n, r, o, i) {
                for (var s = 0, a = r.length; s < a; s++) {
                  var u = r[s],
                    c = o[s],
                    l = d(u.getAction(t, n, e, c), u, c, i);
                  if (l) return { action: l, target: u, element: c };
                }
                return {};
              }
              function h(e, t, n, r) {
                var o = [],
                  i = [],
                  s = r;
                function a(e) {
                  o.push(e), i.push(s);
                }
                for (; c.is.element(s); ) {
                  (o = []), (i = []), u.interactables.forEachMatch(s, a);
                  var l = f(e, t, n, o, i, r);
                  if (l.action && !l.target.options[l.action.name].manualStart) return l;
                  s = c.parentNode(s);
                }
                return {};
              }
              function v(e, t) {
                var n = t.action,
                  r = t.target,
                  o = t.element;
                if (
                  ((n = n || {}),
                  e.target && e.target.options.styleCursor && (e.target._doc.documentElement.style.cursor = ''),
                  (e.target = r),
                  (e.element = o),
                  c.copyAction(e.prepared, n),
                  r && r.options.styleCursor)
                ) {
                  var i = n ? s[n.name].getCursor(n) : '';
                  e.target._doc.documentElement.style.cursor = i;
                }
                l.fire('prepared', { interaction: e });
              }
              function m(e, t, n) {
                var r = e.options,
                  o = r[n.name].max,
                  i = r[n.name].maxPerElement,
                  s = 0,
                  a = 0,
                  c = 0;
                if (o && i && p.maxInteractions) {
                  for (var l = 0; l < u.interactions.length; l++) {
                    var d = u.interactions[l],
                      f = d.prepared.name;
                    if (d.interacting()) {
                      if (++s >= p.maxInteractions) return !1;
                      if (d.target === e) {
                        if ((a += (f === n.name) | 0) >= o) return !1;
                        if (d.element === t && (c++, f !== n.name || c >= i)) return !1;
                      }
                    }
                  }
                  return p.maxInteractions > 0;
                }
              }
              i.signals.on('down', function(e) {
                var t = e.interaction,
                  n = e.pointer,
                  r = e.event,
                  o = e.eventTarget;
                if (!t.interacting()) {
                  var i = h(t, n, r, o);
                  v(t, i);
                }
              }),
                i.signals.on('move', function(e) {
                  var t = e.interaction,
                    n = e.pointer,
                    r = e.event,
                    o = e.eventTarget;
                  if ('mouse' === t.pointerType && !t.pointerIsDown && !t.interacting()) {
                    var i = h(t, n, r, o);
                    v(t, i);
                  }
                }),
                i.signals.on('move', function(e) {
                  var t = e.interaction,
                    n = e.event;
                  if (t.pointerIsDown && !t.interacting() && t.pointerWasMoved && t.prepared.name) {
                    l.fire('before-start', e);
                    var r = t.target;
                    t.prepared.name &&
                      r &&
                      (r.options[t.prepared.name].manualStart || !m(r, t.element, t.prepared)
                        ? t.stop(n)
                        : t.start(t.prepared, r, t.element));
                  }
                }),
                i.signals.on('stop', function(e) {
                  var t = e.interaction,
                    n = t.target;
                  n && n.options.styleCursor && (n._doc.documentElement.style.cursor = '');
                }),
                (r.maxInteractions = function(e) {
                  return c.is.number(e) ? ((p.maxInteractions = e), r) : p.maxInteractions;
                }),
                o.settingsMethods.push('styleCursor'),
                o.settingsMethods.push('actionChecker'),
                o.settingsMethods.push('ignoreFrom'),
                o.settingsMethods.push('allowFrom'),
                (a.base.actionChecker = null),
                (a.base.styleCursor = !0),
                c.extend(a.perAction, p.defaults.perAction),
                (t.exports = p);
            },
            {
              '../Interactable': 4,
              '../Interaction': 5,
              '../actions/base': 6,
              '../defaultOptions': 18,
              '../interact': 21,
              '../scope': 33,
              '../utils': 44,
              '../utils/Signals': 34,
              './InteractableMethods': 12,
            },
          ],
          14: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('../scope'),
                i = e('../utils/is'),
                s = e('../utils/domUtils'),
                a = s.parentNode;
              r.setActionDefaults(e('../actions/drag')),
                r.signals.on('before-start', function(e) {
                  var t = e.interaction,
                    n = e.eventTarget,
                    s = e.dx,
                    u = e.dy;
                  if ('drag' === t.prepared.name) {
                    var c = Math.abs(s),
                      l = Math.abs(u),
                      p = t.target.options.drag,
                      d = p.startAxis,
                      f = c > l ? 'x' : c < l ? 'y' : 'xy';
                    if (
                      ((t.prepared.axis = 'start' === p.lockAxis ? f[0] : p.lockAxis),
                      'xy' !== f && 'xy' !== d && d !== f)
                    ) {
                      t.prepared.name = null;
                      for (
                        var h = n,
                          v = function(e) {
                            if (e !== t.target) {
                              var o = t.target.options.drag;
                              if (!o.manualStart && e.testIgnoreAllow(o, h, n)) {
                                var i = e.getAction(t.downPointer, t.downEvent, t, h);
                                if (
                                  i &&
                                  'drag' === i.name &&
                                  (function(e, t) {
                                    if (!t) return !1;
                                    var n = t.options.drag.startAxis;
                                    return 'xy' === e || 'xy' === n || n === e;
                                  })(f, e) &&
                                  r.validateAction(i, e, h, n)
                                )
                                  return e;
                              }
                            }
                          };
                        i.element(h);

                      ) {
                        var m = o.interactables.forEachMatch(h, v);
                        if (m) {
                          (t.prepared.name = 'drag'), (t.target = m), (t.element = h);
                          break;
                        }
                        h = a(h);
                      }
                    }
                  }
                });
            },
            { '../actions/drag': 7, '../scope': 33, '../utils/domUtils': 39, '../utils/is': 46, './base': 13 },
          ],
          15: [
            function(e, t, n) {
              'use strict';
              e('./base').setActionDefaults(e('../actions/gesture'));
            },
            { '../actions/gesture': 9, './base': 13 },
          ],
          16: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('../Interaction');
              function i(e) {
                var t = e.prepared && e.prepared.name;
                if (!t) return null;
                var n = e.target.options;
                return n[t].hold || n[t].delay;
              }
              (r.defaults.perAction.hold = 0),
                (r.defaults.perAction.delay = 0),
                o.signals.on('new', function(e) {
                  e.autoStartHoldTimer = null;
                }),
                r.signals.on('prepared', function(e) {
                  var t = e.interaction,
                    n = i(t);
                  n > 0 &&
                    (t.autoStartHoldTimer = setTimeout(function() {
                      t.start(t.prepared, t.target, t.element);
                    }, n));
                }),
                o.signals.on('move', function(e) {
                  var t = e.interaction,
                    n = e.duplicate;
                  t.pointerWasMoved && !n && clearTimeout(t.autoStartHoldTimer);
                }),
                r.signals.on('before-start', function(e) {
                  var t = e.interaction,
                    n = i(t);
                  n > 0 && (t.prepared.name = null);
                }),
                (t.exports = { getHoldDuration: i });
            },
            { '../Interaction': 5, './base': 13 },
          ],
          17: [
            function(e, t, n) {
              'use strict';
              e('./base').setActionDefaults(e('../actions/resize'));
            },
            { '../actions/resize': 10, './base': 13 },
          ],
          18: [
            function(e, t, n) {
              'use strict';
              t.exports = {
                base: { accept: null, preventDefault: 'auto', deltaSource: 'page' },
                perAction: {
                  origin: { x: 0, y: 0 },
                  inertia: {
                    enabled: !1,
                    resistance: 10,
                    minSpeed: 100,
                    endSpeed: 10,
                    allowResume: !0,
                    smoothEndDuration: 300,
                  },
                },
              };
            },
            {},
          ],
          19: [
            function(e, t, n) {
              'use strict';
              e('./inertia'),
                e('./modifiers/snap'),
                e('./modifiers/restrict'),
                e('./pointerEvents/base'),
                e('./pointerEvents/holdRepeat'),
                e('./pointerEvents/interactableTargets'),
                e('./autoStart/hold'),
                e('./actions/gesture'),
                e('./actions/resize'),
                e('./actions/drag'),
                e('./actions/drop'),
                e('./modifiers/snapSize'),
                e('./modifiers/restrictEdges'),
                e('./modifiers/restrictSize'),
                e('./autoStart/gesture'),
                e('./autoStart/resize'),
                e('./autoStart/drag'),
                e('./interactablePreventDefault.js'),
                e('./autoScroll'),
                (t.exports = e('./interact'));
            },
            {
              './actions/drag': 7,
              './actions/drop': 8,
              './actions/gesture': 9,
              './actions/resize': 10,
              './autoScroll': 11,
              './autoStart/drag': 14,
              './autoStart/gesture': 15,
              './autoStart/hold': 16,
              './autoStart/resize': 17,
              './inertia': 20,
              './interact': 21,
              './interactablePreventDefault.js': 22,
              './modifiers/restrict': 24,
              './modifiers/restrictEdges': 25,
              './modifiers/restrictSize': 26,
              './modifiers/snap': 27,
              './modifiers/snapSize': 28,
              './pointerEvents/base': 30,
              './pointerEvents/holdRepeat': 31,
              './pointerEvents/interactableTargets': 32,
            },
          ],
          20: [
            function(e, t, n) {
              'use strict';
              var r = e('./InteractEvent'),
                o = e('./Interaction'),
                i = e('./modifiers/base'),
                s = e('./utils'),
                a = e('./utils/raf');
              function u(e) {
                var t = e.inertiaStatus;
                if (t.active) {
                  var n = t.upCoords.page,
                    r = t.upCoords.client;
                  s.setCoords(e.curCoords, [
                    { pageX: n.x + t.sx, pageY: n.y + t.sy, clientX: r.x + t.sx, clientY: r.y + t.sy },
                  ]);
                }
              }
              o.signals.on('new', function(e) {
                (e.inertiaStatus = {
                  active: !1,
                  smoothEnd: !1,
                  allowResume: !1,
                  startEvent: null,
                  upCoords: {},
                  xe: 0,
                  ye: 0,
                  sx: 0,
                  sy: 0,
                  t0: 0,
                  vx0: 0,
                  vys: 0,
                  duration: 0,
                  lambda_v0: 0,
                  one_ve_v0: 0,
                  i: null,
                }),
                  (e.boundInertiaFrame = function() {
                    return function() {
                      u(this), s.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);
                      var e = this.inertiaStatus,
                        t = this.target.options[this.prepared.name].inertia.resistance,
                        n = new Date().getTime() / 1e3 - e.t0;
                      if (n < e.te) {
                        var r = 1 - (Math.exp(-t * n) - e.lambda_v0) / e.one_ve_v0;
                        if (e.modifiedXe === e.xe && e.modifiedYe === e.ye) (e.sx = e.xe * r), (e.sy = e.ye * r);
                        else {
                          var o = s.getQuadraticCurvePoint(0, 0, e.xe, e.ye, e.modifiedXe, e.modifiedYe, r);
                          (e.sx = o.x), (e.sy = o.y);
                        }
                        this.doMove(), (e.i = a.request(this.boundInertiaFrame));
                      } else
                        (e.sx = e.modifiedXe),
                          (e.sy = e.modifiedYe),
                          this.doMove(),
                          this.end(e.startEvent),
                          (e.active = !1),
                          (this.simulation = null);
                      s.copyCoords(this.prevCoords, this.curCoords);
                    }.apply(e);
                  }),
                  (e.boundSmoothEndFrame = function() {
                    return function() {
                      u(this);
                      var e = this.inertiaStatus,
                        t = new Date().getTime() - e.t0,
                        n = this.target.options[this.prepared.name].inertia.smoothEndDuration;
                      t < n
                        ? ((e.sx = s.easeOutQuad(t, 0, e.xe, n)),
                          (e.sy = s.easeOutQuad(t, 0, e.ye, n)),
                          this.pointerMove(e.startEvent, e.startEvent),
                          (e.i = a.request(this.boundSmoothEndFrame)))
                        : ((e.sx = e.xe),
                          (e.sy = e.ye),
                          this.pointerMove(e.startEvent, e.startEvent),
                          this.end(e.startEvent),
                          (e.smoothEnd = e.active = !1),
                          (this.simulation = null));
                    }.apply(e);
                  });
              }),
                o.signals.on('down', function(e) {
                  var t = e.interaction,
                    n = e.event,
                    u = e.pointer,
                    c = e.eventTarget,
                    l = t.inertiaStatus;
                  if (l.active)
                    for (var p = c; s.is.element(p); ) {
                      if (p === t.element) {
                        a.cancel(l.i),
                          (l.active = !1),
                          (t.simulation = null),
                          t.updatePointer(u),
                          s.setCoords(t.curCoords, t.pointers);
                        var d = { interaction: t };
                        o.signals.fire('before-action-move', d), o.signals.fire('action-resume', d);
                        var f = new r(t, n, t.prepared.name, 'inertiaresume', t.element);
                        t.target.fire(f),
                          (t.prevEvent = f),
                          i.resetStatuses(t.modifierStatuses),
                          s.copyCoords(t.prevCoords, t.curCoords);
                        break;
                      }
                      p = s.parentNode(p);
                    }
                }),
                o.signals.on('up', function(e) {
                  var t = e.interaction,
                    n = e.event,
                    o = t.inertiaStatus;
                  if (t.interacting() && !o.active) {
                    var u = t.target,
                      c = u && u.options,
                      l = c && t.prepared.name && c[t.prepared.name].inertia,
                      p = new Date().getTime(),
                      d = {},
                      f = s.extend({}, t.curCoords.page),
                      h = t.pointerDelta.client.speed,
                      v = !1,
                      m = void 0,
                      g = l && l.enabled && 'gesture' !== t.prepared.name && n !== o.startEvent,
                      y = g && p - t.curCoords.timeStamp < 50 && h > l.minSpeed && h > l.endSpeed,
                      b = { interaction: t, pageCoords: f, statuses: d, preEnd: !0, requireEndOnly: !0 };
                    g && !y && (i.resetStatuses(d), (m = i.setAll(b)).shouldMove && m.locked && (v = !0)),
                      (y || v) &&
                        (s.copyCoords(o.upCoords, t.curCoords),
                        (t.pointers[0] = o.startEvent = new r(t, n, t.prepared.name, 'inertiastart', t.element)),
                        (o.t0 = p),
                        (o.active = !0),
                        (o.allowResume = l.allowResume),
                        (t.simulation = o),
                        u.fire(o.startEvent),
                        y
                          ? ((o.vx0 = t.pointerDelta.client.vx),
                            (o.vy0 = t.pointerDelta.client.vy),
                            (o.v0 = h),
                            (function(e, t) {
                              var n = e.target.options[e.prepared.name].inertia,
                                r = n.resistance,
                                o = -Math.log(n.endSpeed / t.v0) / r;
                              (t.x0 = e.prevEvent.pageX),
                                (t.y0 = e.prevEvent.pageY),
                                (t.t0 = t.startEvent.timeStamp / 1e3),
                                (t.sx = t.sy = 0),
                                (t.modifiedXe = t.xe = (t.vx0 - o) / r),
                                (t.modifiedYe = t.ye = (t.vy0 - o) / r),
                                (t.te = o),
                                (t.lambda_v0 = r / t.v0),
                                (t.one_ve_v0 = 1 - n.endSpeed / t.v0);
                            })(t, o),
                            s.extend(f, t.curCoords.page),
                            (f.x += o.xe),
                            (f.y += o.ye),
                            i.resetStatuses(d),
                            (m = i.setAll(b)),
                            (o.modifiedXe += m.dx),
                            (o.modifiedYe += m.dy),
                            (o.i = a.request(t.boundInertiaFrame)))
                          : ((o.smoothEnd = !0),
                            (o.xe = m.dx),
                            (o.ye = m.dy),
                            (o.sx = o.sy = 0),
                            (o.i = a.request(t.boundSmoothEndFrame))));
                  }
                }),
                o.signals.on('stop-active', function(e) {
                  var t = e.interaction,
                    n = t.inertiaStatus;
                  n.active && (a.cancel(n.i), (n.active = !1), (t.simulation = null));
                });
            },
            { './InteractEvent': 3, './Interaction': 5, './modifiers/base': 23, './utils': 44, './utils/raf': 50 },
          ],
          21: [
            function(e, t, n) {
              'use strict';
              var r = e('./utils/browser'),
                o = e('./utils/events'),
                i = e('./utils'),
                s = e('./scope'),
                a = e('./Interactable'),
                u = e('./Interaction'),
                c = {};
              function l(e, t) {
                var n = s.interactables.get(e, t);
                return n || ((n = new a(e, t)).events.global = c), n;
              }
              (l.isSet = function(e, t) {
                return -1 !== s.interactables.indexOfElement(e, t && t.context);
              }),
                (l.on = function(e, t, n) {
                  if ((i.is.string(e) && -1 !== e.search(' ') && (e = e.trim().split(/ +/)), i.is.array(e))) {
                    for (var r = 0; r < e.length; r++) {
                      var u = e[r];
                      l.on(u, t, n);
                    }
                    return l;
                  }
                  if (i.is.object(e)) {
                    for (var p in e) l.on(p, e[p], t);
                    return l;
                  }
                  return (
                    i.contains(a.eventTypes, e)
                      ? c[e]
                        ? c[e].push(t)
                        : (c[e] = [t])
                      : o.add(s.document, e, t, { options: n }),
                    l
                  );
                }),
                (l.off = function(e, t, n) {
                  if ((i.is.string(e) && -1 !== e.search(' ') && (e = e.trim().split(/ +/)), i.is.array(e))) {
                    for (var r = 0; r < e.length; r++) {
                      var u = e[r];
                      l.off(u, t, n);
                    }
                    return l;
                  }
                  if (i.is.object(e)) {
                    for (var p in e) l.off(p, e[p], t);
                    return l;
                  }
                  if (i.contains(a.eventTypes, e)) {
                    var d = void 0;
                    e in c && -1 !== (d = c[e].indexOf(t)) && c[e].splice(d, 1);
                  } else o.remove(s.document, e, t, n);
                  return l;
                }),
                (l.debug = function() {
                  return s;
                }),
                (l.getPointerAverage = i.pointerAverage),
                (l.getTouchBBox = i.touchBBox),
                (l.getTouchDistance = i.touchDistance),
                (l.getTouchAngle = i.touchAngle),
                (l.getElementRect = i.getElementRect),
                (l.getElementClientRect = i.getElementClientRect),
                (l.matchesSelector = i.matchesSelector),
                (l.closest = i.closest),
                (l.supportsTouch = function() {
                  return r.supportsTouch;
                }),
                (l.supportsPointerEvent = function() {
                  return r.supportsPointerEvent;
                }),
                (l.stop = function(e) {
                  for (var t = s.interactions.length - 1; t >= 0; t--) s.interactions[t].stop(e);
                  return l;
                }),
                (l.pointerMoveTolerance = function(e) {
                  return i.is.number(e) ? ((u.pointerMoveTolerance = e), l) : u.pointerMoveTolerance;
                }),
                (l.addDocument = s.addDocument),
                (l.removeDocument = s.removeDocument),
                (s.interact = l),
                (t.exports = l);
            },
            {
              './Interactable': 4,
              './Interaction': 5,
              './scope': 33,
              './utils': 44,
              './utils/browser': 36,
              './utils/events': 40,
            },
          ],
          22: [
            function(e, t, n) {
              'use strict';
              var r = e('./Interactable'),
                o = e('./Interaction'),
                i = e('./scope'),
                s = e('./utils/is'),
                a = e('./utils/events'),
                u = e('./utils/browser'),
                c = e('./utils/domUtils'),
                l = c.nodeContains,
                p = c.matchesSelector;
              function d(e) {
                var t = e.interaction,
                  n = e.event;
                t.target && t.target.checkAndPreventDefault(n);
              }
              (r.prototype.preventDefault = function(e) {
                return /^(always|never|auto)$/.test(e)
                  ? ((this.options.preventDefault = e), this)
                  : s.bool(e)
                  ? ((this.options.preventDefault = e ? 'always' : 'never'), this)
                  : this.options.preventDefault;
              }),
                (r.prototype.checkAndPreventDefault = function(e) {
                  var t = this.options.preventDefault;
                  'never' !== t &&
                    (('always' !== t &&
                      ((a.supportsPassive && /^touch(start|move)$/.test(e.type) && !u.isIOS) ||
                        /^(mouse|pointer|touch)*(down|start)/i.test(e.type) ||
                        (s.element(e.target) &&
                          p(e.target, 'input,select,textarea,[contenteditable=true],[contenteditable=true] *')))) ||
                      e.preventDefault());
                });
              for (var f = ['down', 'move', 'up', 'cancel'], h = 0; h < f.length; h++) {
                var v = f[h];
                o.signals.on(v, d);
              }
              o.docEvents.dragstart = function(e) {
                for (var t = 0; t < i.interactions.length; t++) {
                  var n = i.interactions[t];
                  if (n.element && (n.element === e.target || l(n.element, e.target)))
                    return void n.target.checkAndPreventDefault(e);
                }
              };
            },
            {
              './Interactable': 4,
              './Interaction': 5,
              './scope': 33,
              './utils/browser': 36,
              './utils/domUtils': 39,
              './utils/events': 40,
              './utils/is': 46,
            },
          ],
          23: [
            function(e, t, n) {
              'use strict';
              var r = e('../InteractEvent'),
                o = e('../Interaction'),
                i = e('../utils/extend'),
                s = {
                  names: [],
                  setOffsets: function(e) {
                    var t = e.interaction,
                      n = e.pageCoords,
                      r = t.target,
                      o = t.element,
                      i = t.startOffset,
                      a = r.getRect(o);
                    a
                      ? ((i.left = n.x - a.left),
                        (i.top = n.y - a.top),
                        (i.right = a.right - n.x),
                        (i.bottom = a.bottom - n.y),
                        'width' in a || (a.width = a.right - a.left),
                        'height' in a || (a.height = a.bottom - a.top))
                      : (i.left = i.top = i.right = i.bottom = 0),
                      (e.rect = a),
                      (e.interactable = r),
                      (e.element = o);
                    for (var u = 0; u < s.names.length; u++) {
                      var c = s.names[u];
                      (e.options = r.options[t.prepared.name][c]),
                        e.options && (t.modifierOffsets[c] = s[c].setOffset(e));
                    }
                  },
                  setAll: function(e) {
                    var t = e.interaction,
                      n = e.statuses,
                      r = e.preEnd,
                      o = e.requireEndOnly,
                      u = { dx: 0, dy: 0, changed: !1, locked: !1, shouldMove: !0 };
                    e.modifiedCoords = i({}, e.pageCoords);
                    for (var c = 0; c < s.names.length; c++) {
                      var l = s.names[c],
                        p = s[l],
                        d = t.target.options[t.prepared.name][l];
                      a(d, r, o) &&
                        ((e.status = e.status = n[l]),
                        (e.options = d),
                        (e.offset = e.interaction.modifierOffsets[l]),
                        p.set(e),
                        e.status.locked &&
                          ((e.modifiedCoords.x += e.status.dx),
                          (e.modifiedCoords.y += e.status.dy),
                          (u.dx += e.status.dx),
                          (u.dy += e.status.dy),
                          (u.locked = !0)));
                    }
                    return (u.shouldMove = !e.status || !u.locked || e.status.changed), u;
                  },
                  resetStatuses: function(e) {
                    for (var t = 0; t < s.names.length; t++) {
                      var n = s.names[t],
                        r = e[n] || {};
                      (r.dx = r.dy = 0),
                        (r.modifiedX = r.modifiedY = NaN),
                        (r.locked = !1),
                        (r.changed = !0),
                        (e[n] = r);
                    }
                    return e;
                  },
                  start: function(e, t) {
                    var n = e.interaction,
                      r = {
                        interaction: n,
                        pageCoords: ('action-resume' === t ? n.curCoords : n.startCoords).page,
                        startOffset: n.startOffset,
                        statuses: n.modifierStatuses,
                        preEnd: !1,
                        requireEndOnly: !1,
                      };
                    s.setOffsets(r),
                      s.resetStatuses(r.statuses),
                      (r.pageCoords = i({}, n.startCoords.page)),
                      (n.modifierResult = s.setAll(r));
                  },
                  beforeMove: function(e) {
                    var t = e.interaction,
                      n = e.preEnd,
                      r = e.interactingBeforeMove,
                      o = s.setAll({
                        interaction: t,
                        preEnd: n,
                        pageCoords: t.curCoords.page,
                        statuses: t.modifierStatuses,
                        requireEndOnly: !1,
                      });
                    !o.shouldMove && r && (t._dontFireMove = !0), (t.modifierResult = o);
                  },
                  end: function(e) {
                    for (var t = e.interaction, n = e.event, r = 0; r < s.names.length; r++) {
                      var o = s.names[r],
                        i = t.target.options[t.prepared.name][o];
                      if (a(i, !0, !0)) {
                        t.doMove({ event: n, preEnd: !0 });
                        break;
                      }
                    }
                  },
                  setXY: function(e) {
                    for (var t = e.iEvent, n = e.interaction, r = i({}, e), o = 0; o < s.names.length; o++) {
                      var a = s.names[o];
                      if (((r.options = n.target.options[n.prepared.name][a]), r.options)) {
                        var u = s[a];
                        (r.status = n.modifierStatuses[a]), (t[a] = u.modifyCoords(r));
                      }
                    }
                  },
                };
              function a(e, t, n) {
                return e && e.enabled && (t || !e.endOnly) && (!n || e.endOnly);
              }
              o.signals.on('new', function(e) {
                (e.startOffset = { left: 0, right: 0, top: 0, bottom: 0 }),
                  (e.modifierOffsets = {}),
                  (e.modifierStatuses = s.resetStatuses({})),
                  (e.modifierResult = null);
              }),
                o.signals.on('action-start', s.start),
                o.signals.on('action-resume', s.start),
                o.signals.on('before-action-move', s.beforeMove),
                o.signals.on('action-end', s.end),
                r.signals.on('set-xy', s.setXY),
                (t.exports = s);
            },
            { '../InteractEvent': 3, '../Interaction': 5, '../utils/extend': 41 },
          ],
          24: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('../utils'),
                i = e('../defaultOptions'),
                s = {
                  defaults: { enabled: !1, endOnly: !1, restriction: null, elementRect: null },
                  setOffset: function(e) {
                    var t = e.rect,
                      n = e.startOffset,
                      r = e.options,
                      o = r && r.elementRect,
                      i = {};
                    return (
                      t && o
                        ? ((i.left = n.left - t.width * o.left),
                          (i.top = n.top - t.height * o.top),
                          (i.right = n.right - t.width * (1 - o.right)),
                          (i.bottom = n.bottom - t.height * (1 - o.bottom)))
                        : (i.left = i.top = i.right = i.bottom = 0),
                      i
                    );
                  },
                  set: function(e) {
                    var t = e.modifiedCoords,
                      n = e.interaction,
                      r = e.status,
                      i = e.options;
                    if (!i) return r;
                    var s = r.useStatusXY ? { x: r.x, y: r.y } : o.extend({}, t),
                      u = a(i.restriction, n, s);
                    if (!u) return r;
                    (r.dx = 0), (r.dy = 0), (r.locked = !1);
                    var c = u,
                      l = s.x,
                      p = s.y,
                      d = n.modifierOffsets.restrict;
                    'x' in u && 'y' in u
                      ? ((l = Math.max(Math.min(c.x + c.width - d.right, s.x), c.x + d.left)),
                        (p = Math.max(Math.min(c.y + c.height - d.bottom, s.y), c.y + d.top)))
                      : ((l = Math.max(Math.min(c.right - d.right, s.x), c.left + d.left)),
                        (p = Math.max(Math.min(c.bottom - d.bottom, s.y), c.top + d.top))),
                      (r.dx = l - s.x),
                      (r.dy = p - s.y),
                      (r.changed = r.modifiedX !== l || r.modifiedY !== p),
                      (r.locked = !(!r.dx && !r.dy)),
                      (r.modifiedX = l),
                      (r.modifiedY = p);
                  },
                  modifyCoords: function(e) {
                    var t = e.page,
                      n = e.client,
                      r = e.status,
                      o = e.phase,
                      i = e.options,
                      s = i && i.elementRect;
                    if (i && i.enabled && ('start' !== o || !s || !r.locked) && r.locked)
                      return (t.x += r.dx), (t.y += r.dy), (n.x += r.dx), (n.y += r.dy), { dx: r.dx, dy: r.dy };
                  },
                  getRestrictionRect: a,
                };
              function a(e, t, n) {
                return o.is.function(e)
                  ? o.resolveRectLike(e, t.target, t.element, [n.x, n.y, t])
                  : o.resolveRectLike(e, t.target, t.element);
              }
              (r.restrict = s), r.names.push('restrict'), (i.perAction.restrict = s.defaults), (t.exports = s);
            },
            { '../defaultOptions': 18, '../utils': 44, './base': 23 },
          ],
          25: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('../utils'),
                i = e('../utils/rect'),
                s = e('../defaultOptions'),
                a = e('../actions/resize'),
                u = e('./restrict'),
                c = u.getRestrictionRect,
                l = { top: 1 / 0, left: 1 / 0, bottom: -1 / 0, right: -1 / 0 },
                p = { top: -1 / 0, left: -1 / 0, bottom: 1 / 0, right: 1 / 0 },
                d = {
                  defaults: { enabled: !1, endOnly: !1, min: null, max: null, offset: null },
                  setOffset: function(e) {
                    var t = e.interaction,
                      n = e.startOffset,
                      r = e.options;
                    if (!r) return o.extend({}, n);
                    var i = c(r.offset, t, t.startCoords.page);
                    return i
                      ? { top: n.top + i.y, left: n.left + i.x, bottom: n.bottom + i.y, right: n.right + i.x }
                      : n;
                  },
                  set: function(e) {
                    var t = e.modifiedCoords,
                      n = e.interaction,
                      r = e.status,
                      s = e.offset,
                      a = e.options,
                      u = n.prepared.linkedEdges || n.prepared.edges;
                    if (n.interacting() && u) {
                      var d = r.useStatusXY ? { x: r.x, y: r.y } : o.extend({}, t),
                        f = i.xywhToTlbr(c(a.inner, n, d)) || l,
                        h = i.xywhToTlbr(c(a.outer, n, d)) || p,
                        v = d.x,
                        m = d.y;
                      (r.dx = 0),
                        (r.dy = 0),
                        (r.locked = !1),
                        u.top
                          ? (m = Math.min(Math.max(h.top + s.top, d.y), f.top + s.top))
                          : u.bottom && (m = Math.max(Math.min(h.bottom - s.bottom, d.y), f.bottom - s.bottom)),
                        u.left
                          ? (v = Math.min(Math.max(h.left + s.left, d.x), f.left + s.left))
                          : u.right && (v = Math.max(Math.min(h.right - s.right, d.x), f.right - s.right)),
                        (r.dx = v - d.x),
                        (r.dy = m - d.y),
                        (r.changed = r.modifiedX !== v || r.modifiedY !== m),
                        (r.locked = !(!r.dx && !r.dy)),
                        (r.modifiedX = v),
                        (r.modifiedY = m);
                    }
                  },
                  modifyCoords: function(e) {
                    var t = e.page,
                      n = e.client,
                      r = e.status,
                      o = e.phase,
                      i = e.options;
                    if (i && i.enabled && ('start' !== o || !r.locked) && r.locked)
                      return (t.x += r.dx), (t.y += r.dy), (n.x += r.dx), (n.y += r.dy), { dx: r.dx, dy: r.dy };
                  },
                  noInner: l,
                  noOuter: p,
                  getRestrictionRect: c,
                };
              (r.restrictEdges = d),
                r.names.push('restrictEdges'),
                (s.perAction.restrictEdges = d.defaults),
                (a.defaults.restrictEdges = d.defaults),
                (t.exports = d);
            },
            {
              '../actions/resize': 10,
              '../defaultOptions': 18,
              '../utils': 44,
              '../utils/rect': 51,
              './base': 23,
              './restrict': 24,
            },
          ],
          26: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('./restrictEdges'),
                i = e('../utils'),
                s = e('../utils/rect'),
                a = e('../defaultOptions'),
                u = e('../actions/resize'),
                c = { width: -1 / 0, height: -1 / 0 },
                l = { width: 1 / 0, height: 1 / 0 },
                p = {
                  defaults: { enabled: !1, endOnly: !1, min: null, max: null },
                  setOffset: function(e) {
                    var t = e.interaction;
                    return t.startOffset;
                  },
                  set: function(e) {
                    var t = e.interaction,
                      n = e.options,
                      r = t.prepared.linkedEdges || t.prepared.edges;
                    if (t.interacting() && r) {
                      var a = s.xywhToTlbr(t.resizeRects.inverted),
                        u = s.tlbrToXywh(o.getRestrictionRect(n.min, t)) || c,
                        p = s.tlbrToXywh(o.getRestrictionRect(n.max, t)) || l;
                      (e.options = {
                        enabled: n.enabled,
                        endOnly: n.endOnly,
                        inner: i.extend({}, o.noInner),
                        outer: i.extend({}, o.noOuter),
                      }),
                        r.top
                          ? ((e.options.inner.top = a.bottom - u.height), (e.options.outer.top = a.bottom - p.height))
                          : r.bottom &&
                            ((e.options.inner.bottom = a.top + u.height), (e.options.outer.bottom = a.top + p.height)),
                        r.left
                          ? ((e.options.inner.left = a.right - u.width), (e.options.outer.left = a.right - p.width))
                          : r.right &&
                            ((e.options.inner.right = a.left + u.width), (e.options.outer.right = a.left + p.width)),
                        o.set(e);
                    }
                  },
                  modifyCoords: o.modifyCoords,
                };
              (r.restrictSize = p),
                r.names.push('restrictSize'),
                (a.perAction.restrictSize = p.defaults),
                (u.defaults.restrictSize = p.defaults),
                (t.exports = p);
            },
            {
              '../actions/resize': 10,
              '../defaultOptions': 18,
              '../utils': 44,
              '../utils/rect': 51,
              './base': 23,
              './restrictEdges': 25,
            },
          ],
          27: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('../interact'),
                i = e('../utils'),
                s = e('../defaultOptions'),
                a = {
                  defaults: {
                    enabled: !1,
                    endOnly: !1,
                    range: 1 / 0,
                    targets: null,
                    offsets: null,
                    relativePoints: null,
                  },
                  setOffset: function(e) {
                    var t = e.interaction,
                      n = e.interactable,
                      r = e.element,
                      o = e.rect,
                      s = e.startOffset,
                      a = e.options,
                      u = [],
                      c = i.rectToXY(i.resolveRectLike(a.origin)),
                      l = c || i.getOriginXY(n, r, t.prepared.name);
                    a = a || n.options[t.prepared.name].snap || {};
                    var p = void 0;
                    if ('startCoords' === a.offset)
                      p = { x: t.startCoords.page.x - l.x, y: t.startCoords.page.y - l.y };
                    else {
                      var d = i.resolveRectLike(a.offset, n, r, [t]);
                      p = i.rectToXY(d) || { x: 0, y: 0 };
                    }
                    if (o && a.relativePoints && a.relativePoints.length)
                      for (var f = 0; f < a.relativePoints.length; f++) {
                        var h = a.relativePoints[f],
                          v = h.x,
                          m = h.y;
                        u.push({ x: s.left - o.width * v + p.x, y: s.top - o.height * m + p.y });
                      }
                    else u.push(p);
                    return u;
                  },
                  set: function(e) {
                    var t = e.interaction,
                      n = e.modifiedCoords,
                      r = e.status,
                      o = e.options,
                      s = e.offset,
                      a = [],
                      u = void 0,
                      c = void 0,
                      l = void 0;
                    if (r.useStatusXY) c = { x: r.x, y: r.y };
                    else {
                      var p = i.getOriginXY(t.target, t.element, t.prepared.name);
                      ((c = i.extend({}, n)).x -= p.x), (c.y -= p.y);
                    }
                    (r.realX = c.x), (r.realY = c.y);
                    for (var d = o.targets ? o.targets.length : 0, f = 0; f < s.length; f++)
                      for (
                        var h = s[f], v = h.x, m = h.y, g = c.x - v, y = c.y - m, b = 0;
                        b < (o.targets || []).length;
                        b++
                      ) {
                        var x = (o.targets || [])[b];
                        (u = i.is.function(x) ? x(g, y, t) : x) &&
                          a.push({
                            x: i.is.number(u.x) ? u.x + v : g,
                            y: i.is.number(u.y) ? u.y + m : y,
                            range: i.is.number(u.range) ? u.range : o.range,
                          });
                      }
                    var w = { target: null, inRange: !1, distance: 0, range: 0, dx: 0, dy: 0 };
                    for (l = 0, d = a.length; l < d; l++) {
                      var E = (u = a[l]).range,
                        T = u.x - c.x,
                        C = u.y - c.y,
                        S = i.hypot(T, C),
                        I = S <= E;
                      E === 1 / 0 && w.inRange && w.range !== 1 / 0 && (I = !1),
                        (w.target &&
                          !(I
                            ? w.inRange && E !== 1 / 0
                              ? S / E < w.distance / w.range
                              : (E === 1 / 0 && w.range !== 1 / 0) || S < w.distance
                            : !w.inRange && S < w.distance)) ||
                          ((w.target = u),
                          (w.distance = S),
                          (w.range = E),
                          (w.inRange = I),
                          (w.dx = T),
                          (w.dy = C),
                          (r.range = E));
                    }
                    var O = void 0;
                    w.target
                      ? ((O = r.modifiedX !== w.target.x || r.modifiedY !== w.target.y),
                        (r.modifiedX = w.target.x),
                        (r.modifiedY = w.target.y))
                      : ((O = !0), (r.modifiedX = NaN), (r.modifiedY = NaN)),
                      (r.dx = w.dx),
                      (r.dy = w.dy),
                      (r.changed = O || (w.inRange && !r.locked)),
                      (r.locked = w.inRange);
                  },
                  modifyCoords: function(e) {
                    var t = e.page,
                      n = e.client,
                      r = e.status,
                      o = e.phase,
                      i = e.options,
                      s = i && i.relativePoints;
                    if (i && i.enabled && ('start' !== o || !s || !s.length))
                      return (
                        r.locked && ((t.x += r.dx), (t.y += r.dy), (n.x += r.dx), (n.y += r.dy)),
                        {
                          range: r.range,
                          locked: r.locked,
                          x: r.modifiedX,
                          y: r.modifiedY,
                          realX: r.realX,
                          realY: r.realY,
                          dx: r.dx,
                          dy: r.dy,
                        }
                      );
                  },
                };
              (o.createSnapGrid = function(e) {
                return function(t, n) {
                  var r = e.limits || { left: -1 / 0, right: 1 / 0, top: -1 / 0, bottom: 1 / 0 },
                    o = 0,
                    s = 0;
                  i.is.object(e.offset) && ((o = e.offset.x), (s = e.offset.y));
                  var a = Math.round((t - o) / e.x),
                    u = Math.round((n - s) / e.y),
                    c = Math.max(r.left, Math.min(r.right, a * e.x + o)),
                    l = Math.max(r.top, Math.min(r.bottom, u * e.y + s));
                  return { x: c, y: l, range: e.range };
                };
              }),
                (r.snap = a),
                r.names.push('snap'),
                (s.perAction.snap = a.defaults),
                (t.exports = a);
            },
            { '../defaultOptions': 18, '../interact': 21, '../utils': 44, './base': 23 },
          ],
          28: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('./snap'),
                i = e('../defaultOptions'),
                s = e('../actions/resize'),
                a = e('../utils/'),
                u = {
                  defaults: { enabled: !1, endOnly: !1, range: 1 / 0, targets: null, offsets: null },
                  setOffset: function(e) {
                    var t = e.interaction,
                      n = e.options,
                      r = t.prepared.edges;
                    if (r) {
                      e.options = {
                        relativePoints: [{ x: r.left ? 0 : 1, y: r.top ? 0 : 1 }],
                        origin: { x: 0, y: 0 },
                        offset: 'self',
                        range: n.range,
                      };
                      var i = o.setOffset(e);
                      return (e.options = n), i;
                    }
                  },
                  set: function(e) {
                    var t = e.interaction,
                      n = e.options,
                      r = e.offset,
                      i = e.modifiedCoords,
                      s = a.extend({}, i),
                      u = s.x - r[0].x,
                      c = s.y - r[0].y;
                    (e.options = a.extend({}, n)), (e.options.targets = []);
                    for (var l = 0; l < (n.targets || []).length; l++) {
                      var p = (n.targets || [])[l],
                        d = void 0;
                      (d = a.is.function(p) ? p(u, c, t) : p) &&
                        ('width' in d && 'height' in d && ((d.x = d.width), (d.y = d.height)),
                        e.options.targets.push(d));
                    }
                    o.set(e);
                  },
                  modifyCoords: function(e) {
                    var t = e.options;
                    (e.options = a.extend({}, t)),
                      (e.options.enabled = t.enabled),
                      (e.options.relativePoints = [null]),
                      o.modifyCoords(e);
                  },
                };
              (r.snapSize = u),
                r.names.push('snapSize'),
                (i.perAction.snapSize = u.defaults),
                (s.defaults.snapSize = u.defaults),
                (t.exports = u);
            },
            { '../actions/resize': 10, '../defaultOptions': 18, '../utils/': 44, './base': 23, './snap': 27 },
          ],
          29: [
            function(e, t, n) {
              'use strict';
              var r = e('../utils/pointerUtils');
              t.exports = (function() {
                function e(t, n, o, i, s) {
                  if (
                    ((function(e, t) {
                      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                    })(this, e),
                    r.pointerExtend(this, o),
                    o !== n && r.pointerExtend(this, n),
                    (this.interaction = s),
                    (this.timeStamp = new Date().getTime()),
                    (this.originalEvent = o),
                    (this.type = t),
                    (this.pointerId = r.getPointerId(n)),
                    (this.pointerType = r.getPointerType(n)),
                    (this.target = i),
                    (this.currentTarget = null),
                    'tap' === t)
                  ) {
                    var a = s.getPointerIndex(n);
                    this.dt = this.timeStamp - s.downTimes[a];
                    var u = this.timeStamp - s.tapTime;
                    this.double = !!(
                      s.prevTap &&
                      'doubletap' !== s.prevTap.type &&
                      s.prevTap.target === this.target &&
                      u < 500
                    );
                  } else 'doubletap' === t && (this.dt = n.timeStamp - s.tapTime);
                }
                return (
                  (e.prototype.subtractOrigin = function(e) {
                    var t = e.x,
                      n = e.y;
                    return (this.pageX -= t), (this.pageY -= n), (this.clientX -= t), (this.clientY -= n), this;
                  }),
                  (e.prototype.addOrigin = function(e) {
                    var t = e.x,
                      n = e.y;
                    return (this.pageX += t), (this.pageY += n), (this.clientX += t), (this.clientY += n), this;
                  }),
                  (e.prototype.preventDefault = function() {
                    this.originalEvent.preventDefault();
                  }),
                  (e.prototype.stopPropagation = function() {
                    this.propagationStopped = !0;
                  }),
                  (e.prototype.stopImmediatePropagation = function() {
                    this.immediatePropagationStopped = this.propagationStopped = !0;
                  }),
                  e
                );
              })();
            },
            { '../utils/pointerUtils': 49 },
          ],
          30: [
            function(e, t, n) {
              'use strict';
              var r = e('./PointerEvent'),
                o = e('../Interaction'),
                i = e('../utils'),
                s = e('../defaultOptions'),
                a = e('../utils/Signals').new(),
                u = ['down', 'up', 'cancel'],
                c = ['down', 'up', 'cancel'],
                l = {
                  PointerEvent: r,
                  fire: p,
                  collectEventTargets: d,
                  signals: a,
                  defaults: { holdDuration: 600, ignoreFrom: null, allowFrom: null, origin: { x: 0, y: 0 } },
                  types: ['down', 'move', 'up', 'cancel', 'tap', 'doubletap', 'hold'],
                };
              function p(e) {
                for (
                  var t = e.interaction,
                    n = e.pointer,
                    o = e.event,
                    s = e.eventTarget,
                    u = e.type,
                    c = void 0 === u ? e.pointerEvent.type : u,
                    l = e.targets,
                    f = void 0 === l ? d(e) : l,
                    h = e.pointerEvent,
                    v = void 0 === h ? new r(c, n, o, s, t) : h,
                    m = { interaction: t, pointer: n, event: o, eventTarget: s, targets: f, type: c, pointerEvent: v },
                    g = 0;
                  g < f.length;
                  g++
                ) {
                  var y = f[g];
                  for (var b in y.props || {}) v[b] = y.props[b];
                  var x = i.getOriginXY(y.eventable, y.element);
                  if (
                    (v.subtractOrigin(x),
                    (v.eventable = y.eventable),
                    (v.currentTarget = y.element),
                    y.eventable.fire(v),
                    v.addOrigin(x),
                    v.immediatePropagationStopped ||
                      (v.propagationStopped && g + 1 < f.length && f[g + 1].element !== v.currentTarget))
                  )
                    break;
                }
                if ((a.fire('fired', m), 'tap' === c)) {
                  var w = v.double ? p({ interaction: t, pointer: n, event: o, eventTarget: s, type: 'doubletap' }) : v;
                  (t.prevTap = w), (t.tapTime = w.timeStamp);
                }
                return v;
              }
              function d(e) {
                var t = e.interaction,
                  n = e.pointer,
                  r = e.event,
                  o = e.eventTarget,
                  s = e.type,
                  u = t.getPointerIndex(n);
                if ('tap' === s && (t.pointerWasMoved || !t.downTargets[u] || t.downTargets[u] !== o)) return [];
                for (
                  var c = i.getPath(o),
                    l = {
                      interaction: t,
                      pointer: n,
                      event: r,
                      eventTarget: o,
                      type: s,
                      path: c,
                      targets: [],
                      element: null,
                    },
                    p = 0;
                  p < c.length;
                  p++
                ) {
                  var d = c[p];
                  (l.element = d), a.fire('collect-targets', l);
                }
                return (
                  'hold' === s &&
                    (l.targets = l.targets.filter(function(e) {
                      return e.eventable.options.holdDuration === t.holdTimers[u].duration;
                    })),
                  l.targets
                );
              }
              o.signals.on('update-pointer-down', function(e) {
                var t = e.interaction,
                  n = e.pointerIndex;
                t.holdTimers[n] = { duration: 1 / 0, timeout: null };
              }),
                o.signals.on('remove-pointer', function(e) {
                  var t = e.interaction,
                    n = e.pointerIndex;
                  t.holdTimers.splice(n, 1);
                }),
                o.signals.on('move', function(e) {
                  var t = e.interaction,
                    n = e.pointer,
                    r = e.event,
                    o = e.eventTarget,
                    i = e.duplicateMove,
                    s = t.getPointerIndex(n);
                  i ||
                    (t.pointerIsDown && !t.pointerWasMoved) ||
                    (t.pointerIsDown && clearTimeout(t.holdTimers[s].timeout),
                    p({ interaction: t, pointer: n, event: r, eventTarget: o, type: 'move' }));
                }),
                o.signals.on('down', function(e) {
                  for (
                    var t = e.interaction,
                      n = e.pointer,
                      r = e.event,
                      o = e.eventTarget,
                      s = e.pointerIndex,
                      u = t.holdTimers[s],
                      c = i.getPath(o),
                      l = {
                        interaction: t,
                        pointer: n,
                        event: r,
                        eventTarget: o,
                        type: 'hold',
                        targets: [],
                        path: c,
                        element: null,
                      },
                      d = 0;
                    d < c.length;
                    d++
                  ) {
                    var f = c[d];
                    (l.element = f), a.fire('collect-targets', l);
                  }
                  if (l.targets.length) {
                    for (var h = 1 / 0, v = 0; v < l.targets.length; v++) {
                      var m = l.targets[v],
                        g = m.eventable.options.holdDuration;
                      g < h && (h = g);
                    }
                    (u.duration = h),
                      (u.timeout = setTimeout(function() {
                        p({ interaction: t, eventTarget: o, pointer: n, event: r, type: 'hold' });
                      }, h));
                  }
                }),
                o.signals.on('up', function(e) {
                  var t = e.interaction,
                    n = e.pointer,
                    r = e.event,
                    o = e.eventTarget;
                  t.pointerWasMoved || p({ interaction: t, eventTarget: o, pointer: n, event: r, type: 'tap' });
                });
              for (var f = ['up', 'cancel'], h = 0; h < f.length; h++) {
                var v = f[h];
                o.signals.on(v, function(e) {
                  var t = e.interaction,
                    n = e.pointerIndex;
                  t.holdTimers[n] && clearTimeout(t.holdTimers[n].timeout);
                });
              }
              function m(e) {
                return function(t) {
                  var n = t.interaction,
                    r = t.pointer,
                    o = t.event,
                    i = t.eventTarget;
                  p({ interaction: n, eventTarget: i, pointer: r, event: o, type: e });
                };
              }
              for (var g = 0; g < u.length; g++) o.signals.on(u[g], m(c[g]));
              o.signals.on('new', function(e) {
                (e.prevTap = null), (e.tapTime = 0), (e.holdTimers = []);
              }),
                (s.pointerEvents = l.defaults),
                (t.exports = l);
            },
            {
              '../Interaction': 5,
              '../defaultOptions': 18,
              '../utils': 44,
              '../utils/Signals': 34,
              './PointerEvent': 29,
            },
          ],
          31: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('../Interaction');
              r.signals.on('new', u), r.signals.on('fired', c);
              for (var i = ['move', 'up', 'cancel', 'endall'], s = 0; s < i.length; s++) {
                var a = i[s];
                o.signals.on(a, l);
              }
              function u(e) {
                var t = e.pointerEvent;
                'hold' === t.type && (t.count = (t.count || 0) + 1);
              }
              function c(e) {
                var t = e.interaction,
                  n = e.pointerEvent,
                  o = e.eventTarget,
                  i = e.targets;
                if ('hold' === n.type && i.length) {
                  var s = i[0].eventable.options.holdRepeatInterval;
                  s <= 0 ||
                    (t.holdIntervalHandle = setTimeout(function() {
                      r.fire({ interaction: t, eventTarget: o, type: 'hold', pointer: n, event: n });
                    }, s));
                }
              }
              function l(e) {
                var t = e.interaction;
                t.holdIntervalHandle && (clearInterval(t.holdIntervalHandle), (t.holdIntervalHandle = null));
              }
              (r.defaults.holdRepeatInterval = 0),
                r.types.push('holdrepeat'),
                (t.exports = { onNew: u, onFired: c, endHoldRepeat: l });
            },
            { '../Interaction': 5, './base': 30 },
          ],
          32: [
            function(e, t, n) {
              'use strict';
              var r = e('./base'),
                o = e('../Interactable'),
                i = e('../utils/is'),
                s = e('../scope'),
                a = e('../utils/extend'),
                u = e('../utils/arr'),
                c = u.merge;
              r.signals.on('collect-targets', function(e) {
                var t = e.targets,
                  n = e.element,
                  r = e.type,
                  o = e.eventTarget;
                s.interactables.forEachMatch(n, function(e) {
                  var s = e.events,
                    a = s.options;
                  s[r] &&
                    i.element(n) &&
                    e.testIgnoreAllow(a, n, o) &&
                    t.push({ element: n, eventable: s, props: { interactable: e } });
                });
              }),
                o.signals.on('new', function(e) {
                  var t = e.interactable;
                  t.events.getRect = function(e) {
                    return t.getRect(e);
                  };
                }),
                o.signals.on('set', function(e) {
                  var t = e.interactable,
                    n = e.options;
                  a(t.events.options, r.defaults), a(t.events.options, n);
                }),
                c(o.eventTypes, r.types),
                (o.prototype.pointerEvents = function(e) {
                  return a(this.events.options, e), this;
                });
              var l = o.prototype._backCompatOption;
              (o.prototype._backCompatOption = function(e, t) {
                var n = l.call(this, e, t);
                return n === this && (this.events.options[e] = t), n;
              }),
                o.settingsMethods.push('pointerEvents');
            },
            {
              '../Interactable': 4,
              '../scope': 33,
              '../utils/arr': 35,
              '../utils/extend': 41,
              '../utils/is': 46,
              './base': 30,
            },
          ],
          33: [
            function(e, t, n) {
              'use strict';
              var r = e('./utils'),
                o = e('./utils/events'),
                i = e('./utils/Signals').new(),
                s = e('./utils/window'),
                a = s.getWindow,
                u = {
                  signals: i,
                  events: o,
                  utils: r,
                  document: e('./utils/domObjects').document,
                  documents: [],
                  addDocument: function(e, t) {
                    if (r.contains(u.documents, e)) return !1;
                    (t = t || a(e)),
                      u.documents.push(e),
                      o.documents.push(e),
                      e !== u.document && o.add(t, 'unload', u.onWindowUnload),
                      i.fire('add-document', { doc: e, win: t });
                  },
                  removeDocument: function(e, t) {
                    var n = u.documents.indexOf(e);
                    (t = t || a(e)),
                      o.remove(t, 'unload', u.onWindowUnload),
                      u.documents.splice(n, 1),
                      o.documents.splice(n, 1),
                      i.fire('remove-document', { win: t, doc: e });
                  },
                  onWindowUnload: function() {
                    u.removeDocument(this.document, this);
                  },
                };
              t.exports = u;
            },
            {
              './utils': 44,
              './utils/Signals': 34,
              './utils/domObjects': 38,
              './utils/events': 40,
              './utils/window': 52,
            },
          ],
          34: [
            function(e, t, n) {
              'use strict';
              var r = (function() {
                function e() {
                  !(function(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                  })(this, e),
                    (this.listeners = {});
                }
                return (
                  (e.prototype.on = function(e, t) {
                    this.listeners[e] ? this.listeners[e].push(t) : (this.listeners[e] = [t]);
                  }),
                  (e.prototype.off = function(e, t) {
                    if (this.listeners[e]) {
                      var n = this.listeners[e].indexOf(t);
                      -1 !== n && this.listeners[e].splice(n, 1);
                    }
                  }),
                  (e.prototype.fire = function(e, t) {
                    var n = this.listeners[e];
                    if (n)
                      for (var r = 0; r < n.length; r++) {
                        var o = n[r];
                        if (!1 === o(t, e)) return;
                      }
                  }),
                  e
                );
              })();
              (r.new = function() {
                return new r();
              }),
                (t.exports = r);
            },
            {},
          ],
          35: [
            function(e, t, n) {
              'use strict';
              t.exports = {
                contains: function(e, t) {
                  return -1 !== e.indexOf(t);
                },
                merge: function(e, t) {
                  for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    e.push(r);
                  }
                  return e;
                },
              };
            },
            {},
          ],
          36: [
            function(e, t, n) {
              'use strict';
              var r = e('./window'),
                o = r.window,
                i = e('./is'),
                s = e('./domObjects'),
                a = s.Element,
                u = o.navigator,
                c = {
                  supportsTouch: !!(
                    'ontouchstart' in o ||
                    (i.function(o.DocumentTouch) && s.document instanceof o.DocumentTouch)
                  ),
                  supportsPointerEvent: !!s.PointerEvent,
                  isIOS: /iP(hone|od|ad)/.test(u.platform),
                  isIOS7: /iP(hone|od|ad)/.test(u.platform) && /OS 7[^\d]/.test(u.appVersion),
                  isIe9: /MSIE 9/.test(u.userAgent),
                  prefixedMatchesSelector:
                    'matches' in a.prototype
                      ? 'matches'
                      : 'webkitMatchesSelector' in a.prototype
                      ? 'webkitMatchesSelector'
                      : 'mozMatchesSelector' in a.prototype
                      ? 'mozMatchesSelector'
                      : 'oMatchesSelector' in a.prototype
                      ? 'oMatchesSelector'
                      : 'msMatchesSelector',
                  pEventTypes: s.PointerEvent
                    ? s.PointerEvent === o.MSPointerEvent
                      ? {
                          up: 'MSPointerUp',
                          down: 'MSPointerDown',
                          over: 'mouseover',
                          out: 'mouseout',
                          move: 'MSPointerMove',
                          cancel: 'MSPointerCancel',
                        }
                      : {
                          up: 'pointerup',
                          down: 'pointerdown',
                          over: 'pointerover',
                          out: 'pointerout',
                          move: 'pointermove',
                          cancel: 'pointercancel',
                        }
                    : null,
                  wheelEvent: 'onmousewheel' in s.document ? 'mousewheel' : 'wheel',
                };
              (c.isOperaMobile = 'Opera' === u.appName && c.supportsTouch && u.userAgent.match('Presto')),
                (t.exports = c);
            },
            { './domObjects': 38, './is': 46, './window': 52 },
          ],
          37: [
            function(e, t, n) {
              'use strict';
              var r = e('./is');
              t.exports = function e(t) {
                var n = {};
                for (var o in t) r.plainObject(t[o]) ? (n[o] = e(t[o])) : (n[o] = t[o]);
                return n;
              };
            },
            { './is': 46 },
          ],
          38: [
            function(e, t, n) {
              'use strict';
              var r = {},
                o = e('./window').window;
              function i() {}
              (r.document = o.document),
                (r.DocumentFragment = o.DocumentFragment || i),
                (r.SVGElement = o.SVGElement || i),
                (r.SVGSVGElement = o.SVGSVGElement || i),
                (r.SVGElementInstance = o.SVGElementInstance || i),
                (r.Element = o.Element || i),
                (r.HTMLElement = o.HTMLElement || r.Element),
                (r.Event = o.Event),
                (r.Touch = o.Touch || i),
                (r.PointerEvent = o.PointerEvent || o.MSPointerEvent),
                (t.exports = r);
            },
            { './window': 52 },
          ],
          39: [
            function(e, t, n) {
              'use strict';
              var r = e('./window'),
                o = e('./browser'),
                i = e('./is'),
                s = e('./domObjects'),
                a = {
                  nodeContains: function(e, t) {
                    for (; t; ) {
                      if (t === e) return !0;
                      t = t.parentNode;
                    }
                    return !1;
                  },
                  closest: function(e, t) {
                    for (; i.element(e); ) {
                      if (a.matchesSelector(e, t)) return e;
                      e = a.parentNode(e);
                    }
                    return null;
                  },
                  parentNode: function(e) {
                    var t = e.parentNode;
                    if (i.docFrag(t)) {
                      for (; (t = t.host) && i.docFrag(t); );
                      return t;
                    }
                    return t;
                  },
                  matchesSelector: function(e, t) {
                    return (
                      r.window !== r.realWindow && (t = t.replace(/\/deep\//g, ' ')), e[o.prefixedMatchesSelector](t)
                    );
                  },
                  indexOfDeepestElement: function(e) {
                    var t = [],
                      n = [],
                      r = void 0,
                      o = e[0],
                      i = o ? 0 : -1,
                      a = void 0,
                      u = void 0,
                      c = void 0,
                      l = void 0;
                    for (c = 1; c < e.length; c++)
                      if ((r = e[c]) && r !== o)
                        if (o) {
                          if (r.parentNode !== r.ownerDocument)
                            if (o.parentNode !== r.ownerDocument) {
                              if (!t.length)
                                for (a = o; a.parentNode && a.parentNode !== a.ownerDocument; )
                                  t.unshift(a), (a = a.parentNode);
                              if (
                                o instanceof s.HTMLElement &&
                                r instanceof s.SVGElement &&
                                !(r instanceof s.SVGSVGElement)
                              ) {
                                if (r === o.parentNode) continue;
                                a = r.ownerSVGElement;
                              } else a = r;
                              for (n = []; a.parentNode !== a.ownerDocument; ) n.unshift(a), (a = a.parentNode);
                              for (l = 0; n[l] && n[l] === t[l]; ) l++;
                              var p = [n[l - 1], n[l], t[l]];
                              for (u = p[0].lastChild; u; ) {
                                if (u === p[1]) {
                                  (o = r), (i = c), (t = []);
                                  break;
                                }
                                if (u === p[2]) break;
                                u = u.previousSibling;
                              }
                            } else (o = r), (i = c);
                        } else (o = r), (i = c);
                    return i;
                  },
                  matchesUpTo: function(e, t, n) {
                    for (; i.element(e); ) {
                      if (a.matchesSelector(e, t)) return !0;
                      if ((e = a.parentNode(e)) === n) return a.matchesSelector(e, t);
                    }
                    return !1;
                  },
                  getActualElement: function(e) {
                    return e instanceof s.SVGElementInstance ? e.correspondingUseElement : e;
                  },
                  getScrollXY: function(e) {
                    return {
                      x: (e = e || r.window).scrollX || e.document.documentElement.scrollLeft,
                      y: e.scrollY || e.document.documentElement.scrollTop,
                    };
                  },
                  getElementClientRect: function(e) {
                    var t = e instanceof s.SVGElement ? e.getBoundingClientRect() : e.getClientRects()[0];
                    return (
                      t && {
                        left: t.left,
                        right: t.right,
                        top: t.top,
                        bottom: t.bottom,
                        width: t.width || t.right - t.left,
                        height: t.height || t.bottom - t.top,
                      }
                    );
                  },
                  getElementRect: function(e) {
                    var t = a.getElementClientRect(e);
                    if (!o.isIOS7 && t) {
                      var n = a.getScrollXY(r.getWindow(e));
                      (t.left += n.x), (t.right += n.x), (t.top += n.y), (t.bottom += n.y);
                    }
                    return t;
                  },
                  getPath: function(e) {
                    for (var t = []; e; ) t.push(e), (e = a.parentNode(e));
                    return t;
                  },
                  trySelector: function(e) {
                    return !!i.string(e) && (s.document.querySelector(e), !0);
                  },
                };
              t.exports = a;
            },
            { './browser': 36, './domObjects': 38, './is': 46, './window': 52 },
          ],
          40: [
            function(e, t, n) {
              'use strict';
              var r,
                o = e('./is'),
                i = e('./domUtils'),
                s = e('./pointerUtils'),
                a = e('./pointerExtend'),
                u = e('./window'),
                c = u.window,
                l = e('./arr'),
                p = l.contains,
                d = [],
                f = [],
                h = {},
                v = [],
                m = ((r = !1),
                c.document.createElement('div').addEventListener('test', null, {
                  get capture() {
                    r = !0;
                  },
                }),
                r);
              function g(e, t, n, r) {
                var o = E(r),
                  i = d.indexOf(e),
                  s = f[i];
                s || ((s = { events: {}, typeCount: 0 }), (i = d.push(e) - 1), f.push(s)),
                  s.events[t] || ((s.events[t] = []), s.typeCount++),
                  p(s.events[t], n) || (e.addEventListener(t, n, m ? o : !!o.capture), s.events[t].push(n));
              }
              function y(e, t, n, r) {
                var o = E(r),
                  i = d.indexOf(e),
                  s = f[i];
                if (s && s.events)
                  if ('all' !== t) {
                    if (s.events[t]) {
                      var a = s.events[t].length;
                      if ('all' === n) {
                        for (var u = 0; u < a; u++) y(e, t, s.events[t][u], o);
                        return;
                      }
                      for (var c = 0; c < a; c++)
                        if (s.events[t][c] === n) {
                          e.removeEventListener('on' + t, n, m ? o : !!o.capture), s.events[t].splice(c, 1);
                          break;
                        }
                      s.events[t] && 0 === s.events[t].length && ((s.events[t] = null), s.typeCount--);
                    }
                    s.typeCount || (f.splice(i, 1), d.splice(i, 1));
                  } else for (t in s.events) s.events.hasOwnProperty(t) && y(e, t, 'all');
              }
              function b(e, t) {
                var n = E(t),
                  r = {},
                  u = h[e.type],
                  c = s.getEventTargets(e),
                  l = c[0],
                  p = l;
                for (a(r, e), r.originalEvent = e, r.preventDefault = w; o.element(p); ) {
                  for (var d = 0; d < u.selectors.length; d++) {
                    var f = u.selectors[d],
                      v = u.contexts[d];
                    if (i.matchesSelector(p, f) && i.nodeContains(v, l) && i.nodeContains(v, p)) {
                      var m = u.listeners[d];
                      r.currentTarget = p;
                      for (var g = 0; g < m.length; g++) {
                        var y = m[g],
                          b = y[0],
                          x = y[1],
                          T = y[2];
                        x === !!n.capture && T === n.passive && b(r);
                      }
                    }
                  }
                  p = i.parentNode(p);
                }
              }
              function x(e) {
                return b.call(this, e, !0);
              }
              function w() {
                this.originalEvent.preventDefault();
              }
              function E(e) {
                return o.object(e) ? e : { capture: e };
              }
              t.exports = {
                add: g,
                remove: y,
                addDelegate: function(e, t, n, r, o) {
                  var i = E(o);
                  if (!h[n]) {
                    h[n] = { selectors: [], contexts: [], listeners: [] };
                    for (var s = 0; s < v.length; s++) {
                      var a = v[s];
                      g(a, n, b), g(a, n, x, !0);
                    }
                  }
                  var u = h[n],
                    c = void 0;
                  for (c = u.selectors.length - 1; c >= 0 && (u.selectors[c] !== e || u.contexts[c] !== t); c--);
                  -1 === c && ((c = u.selectors.length), u.selectors.push(e), u.contexts.push(t), u.listeners.push([])),
                    u.listeners[c].push([r, !!i.capture, i.passive]);
                },
                removeDelegate: function(e, t, n, r, o) {
                  var i = E(o),
                    s = h[n],
                    a = !1,
                    u = void 0;
                  if (s)
                    for (u = s.selectors.length - 1; u >= 0; u--)
                      if (s.selectors[u] === e && s.contexts[u] === t) {
                        for (var c = s.listeners[u], l = c.length - 1; l >= 0; l--) {
                          var p = c[l],
                            d = p[0],
                            f = p[1],
                            v = p[2];
                          if (d === r && f === !!i.capture && v === i.passive) {
                            c.splice(l, 1),
                              c.length ||
                                (s.selectors.splice(u, 1),
                                s.contexts.splice(u, 1),
                                s.listeners.splice(u, 1),
                                y(t, n, b),
                                y(t, n, x, !0),
                                s.selectors.length || (h[n] = null)),
                              (a = !0);
                            break;
                          }
                        }
                        if (a) break;
                      }
                },
                delegateListener: b,
                delegateUseCapture: x,
                delegatedEvents: h,
                documents: v,
                supportsOptions: m,
                _elements: d,
                _targets: f,
              };
            },
            { './arr': 35, './domUtils': 39, './is': 46, './pointerExtend': 48, './pointerUtils': 49, './window': 52 },
          ],
          41: [
            function(e, t, n) {
              'use strict';
              t.exports = function(e, t) {
                for (var n in t) e[n] = t[n];
                return e;
              };
            },
            {},
          ],
          42: [
            function(e, t, n) {
              'use strict';
              var r = e('./rect'),
                o = r.resolveRectLike,
                i = r.rectToXY;
              t.exports = function(e, t, n) {
                var r = e.options[n],
                  s = r && r.origin,
                  a = s || e.options.origin,
                  u = o(a, e, t, [e && t]);
                return i(u) || { x: 0, y: 0 };
              };
            },
            { './rect': 51 },
          ],
          43: [
            function(e, t, n) {
              'use strict';
              t.exports = function(e, t) {
                return Math.sqrt(e * e + t * t);
              };
            },
            {},
          ],
          44: [
            function(e, t, n) {
              'use strict';
              var r = e('./extend'),
                o = e('./window'),
                i = {
                  warnOnce: function(e, t) {
                    var n = !1;
                    return function() {
                      return n || (o.window.console.warn(t), (n = !0)), e.apply(this, arguments);
                    };
                  },
                  _getQBezierValue: function(e, t, n, r) {
                    var o = 1 - e;
                    return o * o * t + 2 * o * e * n + e * e * r;
                  },
                  getQuadraticCurvePoint: function(e, t, n, r, o, s, a) {
                    return { x: i._getQBezierValue(a, e, n, o), y: i._getQBezierValue(a, t, r, s) };
                  },
                  easeOutQuad: function(e, t, n, r) {
                    return -n * (e /= r) * (e - 2) + t;
                  },
                  copyAction: function(e, t) {
                    return (e.name = t.name), (e.axis = t.axis), (e.edges = t.edges), e;
                  },
                  is: e('./is'),
                  extend: r,
                  hypot: e('./hypot'),
                  getOriginXY: e('./getOriginXY'),
                };
              r(i, e('./arr')), r(i, e('./domUtils')), r(i, e('./pointerUtils')), r(i, e('./rect')), (t.exports = i);
            },
            {
              './arr': 35,
              './domUtils': 39,
              './extend': 41,
              './getOriginXY': 42,
              './hypot': 43,
              './is': 46,
              './pointerUtils': 49,
              './rect': 51,
              './window': 52,
            },
          ],
          45: [
            function(e, t, n) {
              'use strict';
              var r = e('../scope'),
                o = e('./index'),
                i = {
                  methodOrder: ['simulationResume', 'mouseOrPen', 'hasPointer', 'idle'],
                  search: function(e, t, n) {
                    for (
                      var r = o.getPointerType(e),
                        s = o.getPointerId(e),
                        a = { pointer: e, pointerId: s, pointerType: r, eventType: t, eventTarget: n },
                        u = 0;
                      u < i.methodOrder.length;
                      u++
                    ) {
                      var c = i.methodOrder[u],
                        l = i[c](a);
                      if (l) return l;
                    }
                  },
                  simulationResume: function(e) {
                    var t = e.pointerType,
                      n = e.eventType,
                      i = e.eventTarget;
                    if (!/down|start/i.test(n)) return null;
                    for (var s = 0; s < r.interactions.length; s++) {
                      var a = r.interactions[s],
                        u = i;
                      if (a.simulation && a.simulation.allowResume && a.pointerType === t)
                        for (; u; ) {
                          if (u === a.element) return a;
                          u = o.parentNode(u);
                        }
                    }
                    return null;
                  },
                  mouseOrPen: function(e) {
                    var t = e.pointerId,
                      n = e.pointerType,
                      i = e.eventType;
                    if ('mouse' !== n && 'pen' !== n) return null;
                    for (var s = void 0, a = 0; a < r.interactions.length; a++) {
                      var u = r.interactions[a];
                      if (u.pointerType === n) {
                        if (u.simulation && !o.contains(u.pointerIds, t)) continue;
                        if (u.interacting()) return u;
                        s || (s = u);
                      }
                    }
                    if (s) return s;
                    for (var c = 0; c < r.interactions.length; c++) {
                      var l = r.interactions[c];
                      if (!(l.pointerType !== n || (/down/i.test(i) && l.simulation))) return l;
                    }
                    return null;
                  },
                  hasPointer: function(e) {
                    for (var t = e.pointerId, n = 0; n < r.interactions.length; n++) {
                      var i = r.interactions[n];
                      if (o.contains(i.pointerIds, t)) return i;
                    }
                  },
                  idle: function(e) {
                    for (var t = e.pointerType, n = 0; n < r.interactions.length; n++) {
                      var o = r.interactions[n];
                      if (1 === o.pointerIds.length) {
                        var i = o.target;
                        if (i && !i.options.gesture.enabled) continue;
                      } else if (o.pointerIds.length >= 2) continue;
                      if (!o.interacting() && t === o.pointerType) return o;
                    }
                    return null;
                  },
                };
              t.exports = i;
            },
            { '../scope': 33, './index': 44 },
          ],
          46: [
            function(e, t, n) {
              'use strict';
              var r =
                  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(e) {
                        return typeof e;
                      }
                    : function(e) {
                        return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                          ? 'symbol'
                          : typeof e;
                      },
                o = e('./window'),
                i = e('./isWindow'),
                s = {
                  array: function() {},
                  window: function(e) {
                    return e === o.window || i(e);
                  },
                  docFrag: function(e) {
                    return s.object(e) && 11 === e.nodeType;
                  },
                  object: function(e) {
                    return !!e && 'object' === (void 0 === e ? 'undefined' : r(e));
                  },
                  function: function(e) {
                    return 'function' == typeof e;
                  },
                  number: function(e) {
                    return 'number' == typeof e;
                  },
                  bool: function(e) {
                    return 'boolean' == typeof e;
                  },
                  string: function(e) {
                    return 'string' == typeof e;
                  },
                  element: function(e) {
                    if (!e || 'object' !== (void 0 === e ? 'undefined' : r(e))) return !1;
                    var t = o.getWindow(e) || o.window;
                    return /object|function/.test(r(t.Element))
                      ? e instanceof t.Element
                      : 1 === e.nodeType && 'string' == typeof e.nodeName;
                  },
                  plainObject: function(e) {
                    return s.object(e) && 'Object' === e.constructor.name;
                  },
                };
              (s.array = function(e) {
                return s.object(e) && void 0 !== e.length && s.function(e.splice);
              }),
                (t.exports = s);
            },
            { './isWindow': 47, './window': 52 },
          ],
          47: [
            function(e, t, n) {
              'use strict';
              t.exports = function(e) {
                return !(!e || !e.Window) && e instanceof e.Window;
              };
            },
            {},
          ],
          48: [
            function(e, t, n) {
              'use strict';
              function r(e, n) {
                for (var r in n) {
                  var o = t.exports.prefixedPropREs,
                    i = !1;
                  for (var s in o)
                    if (0 === r.indexOf(s) && o[s].test(r)) {
                      i = !0;
                      break;
                    }
                  i || 'function' == typeof n[r] || (e[r] = n[r]);
                }
                return e;
              }
              (r.prefixedPropREs = { webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/ }), (t.exports = r);
            },
            {},
          ],
          49: [
            function(e, t, n) {
              'use strict';
              var r = e('./hypot'),
                o = e('./browser'),
                i = e('./domObjects'),
                s = e('./domUtils'),
                a = e('./domObjects'),
                u = e('./is'),
                c = e('./pointerExtend'),
                l = {
                  copyCoords: function(e, t) {
                    (e.page = e.page || {}),
                      (e.page.x = t.page.x),
                      (e.page.y = t.page.y),
                      (e.client = e.client || {}),
                      (e.client.x = t.client.x),
                      (e.client.y = t.client.y),
                      (e.timeStamp = t.timeStamp);
                  },
                  setCoordDeltas: function(e, t, n) {
                    (e.page.x = n.page.x - t.page.x),
                      (e.page.y = n.page.y - t.page.y),
                      (e.client.x = n.client.x - t.client.x),
                      (e.client.y = n.client.y - t.client.y),
                      (e.timeStamp = n.timeStamp - t.timeStamp);
                    var o = Math.max(e.timeStamp / 1e3, 0.001);
                    (e.page.speed = r(e.page.x, e.page.y) / o),
                      (e.page.vx = e.page.x / o),
                      (e.page.vy = e.page.y / o),
                      (e.client.speed = r(e.client.x, e.page.y) / o),
                      (e.client.vx = e.client.x / o),
                      (e.client.vy = e.client.y / o);
                  },
                  isNativePointer: function(e) {
                    return e instanceof i.Event || e instanceof i.Touch;
                  },
                  getXY: function(e, t, n) {
                    return (e = e || 'page'), ((n = n || {}).x = t[e + 'X']), (n.y = t[e + 'Y']), n;
                  },
                  getPageXY: function(e, t) {
                    return (
                      (t = t || {}),
                      o.isOperaMobile && l.isNativePointer(e)
                        ? (l.getXY('screen', e, t), (t.x += window.scrollX), (t.y += window.scrollY))
                        : l.getXY('page', e, t),
                      t
                    );
                  },
                  getClientXY: function(e, t) {
                    return (
                      (t = t || {}),
                      o.isOperaMobile && l.isNativePointer(e) ? l.getXY('screen', e, t) : l.getXY('client', e, t),
                      t
                    );
                  },
                  getPointerId: function(e) {
                    return u.number(e.pointerId) ? e.pointerId : e.identifier;
                  },
                  setCoords: function(e, t, n) {
                    var r = t.length > 1 ? l.pointerAverage(t) : t[0],
                      o = {};
                    l.getPageXY(r, o),
                      (e.page.x = o.x),
                      (e.page.y = o.y),
                      l.getClientXY(r, o),
                      (e.client.x = o.x),
                      (e.client.y = o.y),
                      (e.timeStamp = u.number(n) ? n : new Date().getTime());
                  },
                  pointerExtend: c,
                  getTouchPair: function(e) {
                    var t = [];
                    return (
                      u.array(e)
                        ? ((t[0] = e[0]), (t[1] = e[1]))
                        : 'touchend' === e.type
                        ? 1 === e.touches.length
                          ? ((t[0] = e.touches[0]), (t[1] = e.changedTouches[0]))
                          : 0 === e.touches.length && ((t[0] = e.changedTouches[0]), (t[1] = e.changedTouches[1]))
                        : ((t[0] = e.touches[0]), (t[1] = e.touches[1])),
                      t
                    );
                  },
                  pointerAverage: function(e) {
                    for (
                      var t = { pageX: 0, pageY: 0, clientX: 0, clientY: 0, screenX: 0, screenY: 0 }, n = 0;
                      n < e.length;
                      n++
                    ) {
                      var r = e[n];
                      for (var o in t) t[o] += r[o];
                    }
                    for (var i in t) t[i] /= e.length;
                    return t;
                  },
                  touchBBox: function(e) {
                    if (e.length || (e.touches && e.touches.length > 1)) {
                      var t = l.getTouchPair(e),
                        n = Math.min(t[0].pageX, t[1].pageX),
                        r = Math.min(t[0].pageY, t[1].pageY),
                        o = Math.max(t[0].pageX, t[1].pageX),
                        i = Math.max(t[0].pageY, t[1].pageY);
                      return { x: n, y: r, left: n, top: r, width: o - n, height: i - r };
                    }
                  },
                  touchDistance: function(e, t) {
                    var n = t + 'X',
                      o = t + 'Y',
                      i = l.getTouchPair(e),
                      s = i[0][n] - i[1][n],
                      a = i[0][o] - i[1][o];
                    return r(s, a);
                  },
                  touchAngle: function(e, t, n) {
                    var r = n + 'X',
                      o = n + 'Y',
                      i = l.getTouchPair(e),
                      s = i[1][r] - i[0][r],
                      a = i[1][o] - i[0][o],
                      u = (180 * Math.atan2(a, s)) / Math.PI;
                    return u;
                  },
                  getPointerType: function(e) {
                    return u.string(e.pointerType)
                      ? e.pointerType
                      : u.number(e.pointerType)
                      ? [void 0, void 0, 'touch', 'pen', 'mouse'][e.pointerType]
                      : /touch/.test(e.type) || e instanceof a.Touch
                      ? 'touch'
                      : 'mouse';
                  },
                  getEventTargets: function(e) {
                    var t = u.function(e.composedPath) ? e.composedPath() : e.path;
                    return [s.getActualElement(t ? t[0] : e.target), s.getActualElement(e.currentTarget)];
                  },
                };
              t.exports = l;
            },
            { './browser': 36, './domObjects': 38, './domUtils': 39, './hypot': 43, './is': 46, './pointerExtend': 48 },
          ],
          50: [
            function(e, t, n) {
              'use strict';
              for (
                var r = e('./window'),
                  o = r.window,
                  i = ['ms', 'moz', 'webkit', 'o'],
                  s = 0,
                  a = void 0,
                  u = void 0,
                  c = 0;
                c < i.length && !o.requestAnimationFrame;
                c++
              )
                (a = o[i[c] + 'RequestAnimationFrame']),
                  (u = o[i[c] + 'CancelAnimationFrame'] || o[i[c] + 'CancelRequestAnimationFrame']);
              a ||
                (a = function(e) {
                  var t = new Date().getTime(),
                    n = Math.max(0, 16 - (t - s)),
                    r = setTimeout(function() {
                      e(t + n);
                    }, n);
                  return (s = t + n), r;
                }),
                u ||
                  (u = function(e) {
                    clearTimeout(e);
                  }),
                (t.exports = { request: a, cancel: u });
            },
            { './window': 52 },
          ],
          51: [
            function(e, t, n) {
              'use strict';
              var r = e('./extend'),
                o = e('./is'),
                i = e('./domUtils'),
                s = i.closest,
                a = i.parentNode,
                u = i.getElementRect,
                c = {
                  getStringOptionResult: function(e, t, n) {
                    return o.string(e) ? (e = 'parent' === e ? a(n) : 'self' === e ? t.getRect(n) : s(n, e)) : null;
                  },
                  resolveRectLike: function(e, t, n, r) {
                    return (
                      (e = c.getStringOptionResult(e, t, n) || e),
                      o.function(e) && (e = e.apply(null, r)),
                      o.element(e) && (e = u(e)),
                      e
                    );
                  },
                  rectToXY: function(e) {
                    return e && { x: 'x' in e ? e.x : e.left, y: 'y' in e ? e.y : e.top };
                  },
                  xywhToTlbr: function(e) {
                    return (
                      !e ||
                        ('left' in e && 'top' in e) ||
                        (((e = r({}, e)).left = e.x || 0),
                        (e.top = e.y || 0),
                        (e.right = e.right || e.left + e.width),
                        (e.bottom = e.bottom || e.top + e.height)),
                      e
                    );
                  },
                  tlbrToXywh: function(e) {
                    return (
                      !e ||
                        ('x' in e && 'y' in e) ||
                        (((e = r({}, e)).x = e.left || 0),
                        (e.top = e.top || 0),
                        (e.width = e.width || e.right - e.x),
                        (e.height = e.height || e.bottom - e.y)),
                      e
                    );
                  },
                };
              t.exports = c;
            },
            { './domUtils': 39, './extend': 41, './is': 46 },
          ],
          52: [
            function(e, t, n) {
              'use strict';
              var r = t.exports,
                o = e('./isWindow');
              function i(e) {
                r.realWindow = e;
                var t = e.document.createTextNode('');
                t.ownerDocument !== e.document && 'function' == typeof e.wrap && e.wrap(t) === t && (e = e.wrap(e)),
                  (r.window = e);
              }
              'undefined' == typeof window ? ((r.window = void 0), (r.realWindow = void 0)) : i(window),
                (r.getWindow = function(e) {
                  if (o(e)) return e;
                  var t = e.ownerDocument || e;
                  return t.defaultView || t.parentWindow || r.window;
                }),
                (r.init = i);
            },
            { './isWindow': 47 },
          ],
        },
        {},
        [1],
      )(1);
    },
    function(e, t) {
      var n;
      e.exports = ((n = navigator.userAgent || navigator.vendor || window.opera),
      (isMobile = function() {
        var e = !1;
        return (
          (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            n,
          ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              n.substr(0, 4),
            )) &&
            (e = !0),
          e
        );
      }),
      (isMobileOrTablet = function() {
        var e = !1;
        return (
          (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            n,
          ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              n.substr(0, 4),
            )) &&
            (e = !0),
          e
        );
      }),
      { isMobile: isMobile, isMobileOrTablet: isMobileOrTablet });
    },
    function(e, t, n) {
      'use strict';
      var r = Object.prototype.hasOwnProperty,
        o = '~';
      function i() {}
      function s(e, t, n) {
        (this.fn = e), (this.context = t), (this.once = n || !1);
      }
      function a(e, t, n, r, i) {
        if ('function' != typeof n) throw new TypeError('The listener must be a function');
        var a = new s(n, r || e, i),
          u = o ? o + t : t;
        return (
          e._events[u]
            ? e._events[u].fn
              ? (e._events[u] = [e._events[u], a])
              : e._events[u].push(a)
            : ((e._events[u] = a), e._eventsCount++),
          e
        );
      }
      function u(e, t) {
        0 == --e._eventsCount ? (e._events = new i()) : delete e._events[t];
      }
      function c() {
        (this._events = new i()), (this._eventsCount = 0);
      }
      Object.create && ((i.prototype = Object.create(null)), new i().__proto__ || (o = !1)),
        (c.prototype.eventNames = function() {
          var e,
            t,
            n = [];
          if (0 === this._eventsCount) return n;
          for (t in (e = this._events)) r.call(e, t) && n.push(o ? t.slice(1) : t);
          return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n;
        }),
        (c.prototype.listeners = function(e) {
          var t = o ? o + e : e,
            n = this._events[t];
          if (!n) return [];
          if (n.fn) return [n.fn];
          for (var r = 0, i = n.length, s = new Array(i); r < i; r++) s[r] = n[r].fn;
          return s;
        }),
        (c.prototype.listenerCount = function(e) {
          var t = o ? o + e : e,
            n = this._events[t];
          return n ? (n.fn ? 1 : n.length) : 0;
        }),
        (c.prototype.emit = function(e, t, n, r, i, s) {
          var a = o ? o + e : e;
          if (!this._events[a]) return !1;
          var u,
            c,
            l = this._events[a],
            p = arguments.length;
          if (l.fn) {
            switch ((l.once && this.removeListener(e, l.fn, void 0, !0), p)) {
              case 1:
                return l.fn.call(l.context), !0;
              case 2:
                return l.fn.call(l.context, t), !0;
              case 3:
                return l.fn.call(l.context, t, n), !0;
              case 4:
                return l.fn.call(l.context, t, n, r), !0;
              case 5:
                return l.fn.call(l.context, t, n, r, i), !0;
              case 6:
                return l.fn.call(l.context, t, n, r, i, s), !0;
            }
            for (c = 1, u = new Array(p - 1); c < p; c++) u[c - 1] = arguments[c];
            l.fn.apply(l.context, u);
          } else {
            var d,
              f = l.length;
            for (c = 0; c < f; c++)
              switch ((l[c].once && this.removeListener(e, l[c].fn, void 0, !0), p)) {
                case 1:
                  l[c].fn.call(l[c].context);
                  break;
                case 2:
                  l[c].fn.call(l[c].context, t);
                  break;
                case 3:
                  l[c].fn.call(l[c].context, t, n);
                  break;
                case 4:
                  l[c].fn.call(l[c].context, t, n, r);
                  break;
                default:
                  if (!u) for (d = 1, u = new Array(p - 1); d < p; d++) u[d - 1] = arguments[d];
                  l[c].fn.apply(l[c].context, u);
              }
          }
          return !0;
        }),
        (c.prototype.on = function(e, t, n) {
          return a(this, e, t, n, !1);
        }),
        (c.prototype.once = function(e, t, n) {
          return a(this, e, t, n, !0);
        }),
        (c.prototype.removeListener = function(e, t, n, r) {
          var i = o ? o + e : e;
          if (!this._events[i]) return this;
          if (!t) return u(this, i), this;
          var s = this._events[i];
          if (s.fn) s.fn !== t || (r && !s.once) || (n && s.context !== n) || u(this, i);
          else {
            for (var a = 0, c = [], l = s.length; a < l; a++)
              (s[a].fn !== t || (r && !s[a].once) || (n && s[a].context !== n)) && c.push(s[a]);
            c.length ? (this._events[i] = 1 === c.length ? c[0] : c) : u(this, i);
          }
          return this;
        }),
        (c.prototype.removeAllListeners = function(e) {
          var t;
          return (
            e
              ? ((t = o ? o + e : e), this._events[t] && u(this, t))
              : ((this._events = new i()), (this._eventsCount = 0)),
            this
          );
        }),
        (c.prototype.off = c.prototype.removeListener),
        (c.prototype.addListener = c.prototype.on),
        (c.prefixed = o),
        (c.EventEmitter = c),
        (e.exports = c);
    },
    function(e, t, n) {},
    function(e, t, n) {
      'use strict';
      n.r(t);
      n(4);
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */ var r = function(
        e,
        t,
      ) {
        return (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, t) {
              e.__proto__ = t;
            }) ||
          function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          })(e, t);
      };
      function o(e, t) {
        function n() {
          this.constructor = e;
        }
        r(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
      }
      var i = function() {
        return (i =
          Object.assign ||
          function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }).apply(this, arguments);
      };
      function s(e, t, n, r) {
        return new (n || (n = Promise))(function(o, i) {
          function s(e) {
            try {
              u(r.next(e));
            } catch (e) {
              i(e);
            }
          }
          function a(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function u(e) {
            e.done
              ? o(e.value)
              : new n(function(t) {
                  t(e.value);
                }).then(s, a);
          }
          u((r = r.apply(e, t || [])).next());
        });
      }
      function a(e, t) {
        var n,
          r,
          o,
          i,
          s = {
            label: 0,
            sent: function() {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (i = { next: a(0), throw: a(1), return: a(2) }),
          'function' == typeof Symbol &&
            (i[Symbol.iterator] = function() {
              return this;
            }),
          i
        );
        function a(i) {
          return function(a) {
            return (function(i) {
              if (n) throw new TypeError('Generator is already executing.');
              for (; s; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) &&
                      !(o = o.call(r, i[1])).done)
                  )
                    return o;
                  switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return s.label++, { value: i[1], done: !1 };
                    case 5:
                      s.label++, (r = i[1]), (i = [0]);
                      continue;
                    case 7:
                      (i = s.ops.pop()), s.trys.pop();
                      continue;
                    default:
                      if (!(o = (o = s.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                        s = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        s.label = i[1];
                        break;
                      }
                      if (6 === i[0] && s.label < o[1]) {
                        (s.label = o[1]), (o = i);
                        break;
                      }
                      if (o && s.label < o[2]) {
                        (s.label = o[2]), s.ops.push(i);
                        break;
                      }
                      o[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  i = t.call(e, s);
                } catch (e) {
                  (i = [6, e]), (r = 0);
                } finally {
                  n = o = 0;
                }
              if (5 & i[0]) throw i[1];
              return { value: i[0] ? i[1] : void 0, done: !0 };
            })([i, a]);
          };
        }
      }
      var u = n(2),
        c = (function() {
          function e(e, t, n, r) {
            (this.settings = e),
              (this.nodes = t),
              (this.commandRunnerClass = n),
              (this.variables = r),
              (this.targetFunctions = {}),
              (this.runners = {});
          }
          return (
            (e.prototype.registerTargetFunction = function(e) {
              var t = { settings: this.settings, variables: this.variables, commandEngine: this };
              Object.assign(this.targetFunctions, e(t));
            }),
            (e.prototype.run = function(e) {
              this.createRunners(), e ? this.runNodeByName(e) : this.runFirstNode();
            }),
            (e.prototype.runCommands = function(e) {
              return this.createCommandRunner(e).run();
            }),
            (e.prototype.createRunners = function() {
              var e = this;
              this.targetFunctions;
              this.nodes.forEach(function(t) {
                var n = t.getCommands();
                e.runners[t.name] = e.createCommandRunner(n);
              });
            }),
            (e.prototype.createCommandRunner = function(e) {
              return new this.commandRunnerClass({
                variables: this.variables,
                targetFunctions: this.targetFunctions,
                commands: e,
              });
            }),
            (e.prototype.runFirstNode = function() {
              this.nodes[0] && this.getRunnerForNode(this.nodes[0].name).run();
            }),
            (e.prototype.runNodeByName = function(e) {
              return this.getRunnerForNode(e).run();
            }),
            (e.prototype.getRunnerForNode = function(e) {
              return this.runners[e];
            }),
            e
          );
        })(),
        l = n(3),
        p = n(0);
      function d(e) {
        var t = 0,
          n = [];
        for (t = 0; t < e.length; t++) n.push(e[t]);
        return n;
      }
      function f(e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e;
      }
      function h(e) {
        var t = Object(p.toType)(e);
        return (function(e) {
          return 'object' === Object(p.toType)(e);
        })(e)
          ? (function e(t) {
              var n = {};
              return (
                Object(p.traverseObject)(
                  t,
                  function(t, r) {
                    'array' === Object(p.toType)(r)
                      ? (n[t] = h(r))
                      : 'object' === Object(p.toType)(r)
                      ? (n[t] = e(r))
                      : (n[t] = r);
                  },
                  !1,
                  !1,
                ),
                n
              );
            })(e)
          : 'array' === t
          ? e.map(function(e) {
              return h(e);
            })
          : e;
      }
      function v(e) {
        return '//' === e.substr(0, 2)
          ? '' + document.location.protocol + e
          : '/' === e[0]
          ? '' + document.location.origin + e
          : -1 === e.indexOf('/')
          ? document.location.origin + '/' + e
          : e;
      }
      var m = (function() {
          function e(e) {
            (this.variables = e),
              (this.LIQUID_ONE = /\{\{(.*?)( ?\| ?(.*)?)?\}\}/),
              (this.LIQUID_ALL = new RegExp(this.LIQUID_ONE, 'g')),
              (this.implementedFilters = { random: this.randomFilter.bind(this) });
          }
          return (
            (e.prototype.replace = function(e) {
              var t = this.getParts(e);
              return t ? (t.whole === e ? this.sendRawVar(e) : this.replaceAsString(e)) : e;
            }),
            (e.prototype.replaceAsString = function(e) {
              var t = this;
              return e.replace(this.LIQUID_ALL, function(e) {
                return t.filteredVariable(e).toString();
              });
            }),
            (e.prototype.getParts = function(e) {
              var t = e.match(this.LIQUID_ONE);
              if (!t) return null;
              var n = t[0],
                r = t[1];
              t[2];
              return { whole: n, varName: r, filter: t[3] };
            }),
            (e.prototype.sendRawVar = function(e) {
              var t,
                n = this;
              return (
                e.replace(this.LIQUID_ALL, function(e) {
                  return (t = n.filteredVariable(e)), e;
                }),
                t
              );
            }),
            (e.prototype.filteredVariable = function(e) {
              var t = this.getParts(e),
                n = (t.whole, t.varName),
                r = t.filter;
              return r ? this.doFilter(n, r) : this.variables[n];
            }),
            (e.prototype.doFilter = function(e, t) {
              var n = this.implementedFilters[t];
              if (!n) throw new Error('There is no filter called "' + t + '"');
              return n(e);
            }),
            (e.prototype.randomFilter = function(e) {
              var t = this.variables[e];
              if ('array' !== Object(p.toType)(t)) throw new Error('You cannot use the random filter on a non-array');
              return t[f(0, t.length - 1)];
            }),
            e
          );
        })(),
        g = (function() {
          function e(e) {
            var t = e.commands,
              n = e.targetFunctions,
              r = e.variables;
            (this.events = new l.EventEmitter()),
              (this.targets = {}),
              (this.runQueue = []),
              (this.nextIndex = 0),
              (this.commands = t),
              (this.targets = n),
              (this.variables = r),
              (this.replacer = new m(this.variables)),
              this.setStatus('ready');
          }
          return (
            (e.prototype.getFunctionFor = function(e) {
              if (!this.targets[e])
                throw new Error('There is no registered function to execute the "' + e + '" command.');
              return this.targets[e];
            }),
            (e.prototype.run = function() {
              return this.canRun() ? this.doRun() : this.enqueueRun();
            }),
            (e.prototype.on = function(e, t) {
              this.events.on(e, t);
            }),
            (e.prototype.once = function(e, t) {
              this.events.once(e, t);
            }),
            (e.prototype.doRun = function() {
              return this.setStatus('running'), this.runNextCommand(), Promise.resolve(this);
            }),
            (e.prototype.enqueueRun = function() {
              var e,
                t = this,
                n = new Promise(function(n) {
                  e = function() {
                    n(t.doRun());
                  };
                });
              return this.runQueue.push(e), n;
            }),
            (e.prototype.canRun = function() {
              return 'running' !== this.status && 'waiting' !== this.status;
            }),
            (e.prototype.setStatus = function(e) {
              this.events.emit(e), (this.status = e);
            }),
            (e.prototype.resetIndex = function() {
              this.nextIndex = 0;
            }),
            (e.prototype.advanceIndex = function() {
              this.nextIndex++;
            }),
            (e.prototype.runNextCommand = function() {
              var e = this;
              if ('running' === this.status) {
                var t = this.commands[this.nextIndex];
                t
                  ? (this.advanceIndex(),
                    this.runCommand(t)
                      .then(function(t) {
                        return e.evaluateReturn(t);
                      })
                      .then(function() {
                        return e.runNextCommand();
                      }))
                  : this.exit();
              }
            }),
            (e.prototype.evaluateReturn = function(e) {
              return s(this, void 0, void 0, function() {
                var t, n, r;
                return a(this, function(o) {
                  switch (o.label) {
                    case 0:
                      return (
                        (t = e.commands),
                        (n = e.requests),
                        (r = e.asyncCommands) && this.asyncSeries(r),
                        t ? [4, this.runNewSeries(t)] : [3, 2]
                      );
                    case 1:
                      o.sent(), (o.label = 2);
                    case 2:
                      return [4, this.evaluateRequests(n)];
                    case 3:
                      return o.sent(), [2];
                  }
                });
              });
            }),
            (e.prototype.evaluateRequests = function(e) {
              return s(this, void 0, void 0, function() {
                return a(this, function(t) {
                  return e
                    ? e.some(function(e) {
                        return 'exit' === e;
                      })
                      ? [2, this.exit()]
                      : e.some(function(e) {
                          return 'pause' === e;
                        })
                      ? [2, this.pause()]
                      : [2]
                    : [2];
                });
              });
            }),
            (e.prototype.exit = function() {
              this.resetIndex();
              var e = this.runQueue.shift();
              e ? e() : this.setStatus('done');
            }),
            (e.prototype.pause = function() {
              this.setStatus('paused');
            }),
            (e.prototype.asyncSeries = function(e) {
              var t = this;
              e.then(function(e) {
                t.runNewSeries(e).catch(function(e) {
                  var t = e.message.slice(0, 10) + '...';
                  console.error('the error thrown above (beginning "' + t + '") was in an async branch');
                });
              }).catch(function(e) {
                'cancelled' !== e &&
                  (console.error(
                    'An error occurred inside a promise for an asyncCommands object. This occurred before the commands were invoked on a runner:',
                  ),
                  console.error(e));
              });
            }),
            (e.prototype.runNewSeries = function(t) {
              var n = this;
              return new Promise(function(r) {
                var o = new e({ targetFunctions: n.targets, commands: t, variables: n.variables });
                o.once('done', r), o.run();
              }).catch(function(e) {
                throw (console.error('a child runner threw an error:'), console.error(e), e);
              });
            }),
            (e.prototype.runCommand = function(e) {
              var t = this.replaceVariables(e);
              return this.getFunctionFor(t.name)(t);
            }),
            (e.prototype.replaceVariables = function(e) {
              var t = this,
                n = h(e);
              return (n = Object(p.traverseObject)(
                n,
                function(e, n) {
                  return 'string' === Object(p.toType)(n) && (n = t.replaceVariableInString(n)), [e, n];
                },
                !0,
                !1,
              ));
            }),
            (e.prototype.replaceVariableInString = function(e) {
              return this.replacer.replace(e);
            }),
            e
          );
        })(),
        y = function(e) {
          return {
            switch: function(t) {
              return Promise.resolve(
                (function(e, t) {
                  var n,
                    r = e.variables;
                  return (
                    t.do.forEach(function(e) {
                      n ||
                        (n = (function(e, t) {
                          var n = (function(e) {
                              for (var t in e) if (b.hasOwnProperty(t)) return t;
                              var n = [];
                              for (var r in e) e.hasOwnProperty(r) && n.push(r);
                              throw new Error(
                                'could not find a valid operator in switch.do. Given these possibilities: ' +
                                  n.join(', '),
                              );
                            })(e),
                            r = t[e.varName],
                            o = e[n];
                          return (function(e, t, n) {
                            return (0, b[e])(t, n);
                          })(n, r, o)
                            ? e.commands
                            : null;
                        })(e, r));
                    }),
                    { commands: n || t.defaultCommands }
                  );
                })(e, t),
              );
            },
          };
        };
      var b = {
        is: function(e, t) {
          return e === t;
        },
        isGreaterThan: function(e, t) {
          return e > t;
        },
        isLessThan: function(e, t) {
          return e < t;
        },
        isGreaterThanOrEqualTo: function(e, t) {
          return e >= t;
        },
        isLessThanOrEqualTo: function(e, t) {
          return e <= t;
        },
        isBetween: function(e, t) {
          return (
            (function(e) {
              return Math.min.apply(Math, e);
            })(t) <= e &&
            e <=
              (function(e) {
                return Math.max.apply(Math, e);
              })(t)
          );
        },
      };
      function x(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        var r = e.settings,
          o = e.nodes,
          i = e.variables,
          s = function(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            var r = e.settings,
              o = e.nodes,
              i = e.variables,
              s = e.commandRunnerClass,
              a = new c(r, o, s, i);
            return (
              t.forEach(function(e) {
                a.registerTargetFunction(e);
              }),
              a
            );
          }.apply(void 0, [{ settings: r, nodes: o, variables: i, commandRunnerClass: g }].concat(t));
        return s.registerTargetFunction(y), s;
      }
      var w = { baseElementId: 'IV-view', buttonContainerClass: 'IV-button-container' },
        E = (function() {
          function e(e) {
            (this.name = e), (this.commands = []), (this.pushType = 'main');
          }
          return (
            (e.prototype.getCommands = function() {
              return this.commands;
            }),
            (e.prototype.pusher = function(e) {
              var t = this;
              if (Array.isArray(e))
                return e.forEach(function(e) {
                  return t.pusher(e);
                });
              'condition' === this.pushType
                ? this.switchDo.do[this.switchDo.do.length - 1].commands.push(e)
                : 'default' === this.pushType
                ? this.switchDo.defaultCommands.push(e)
                : this.commands.push(e);
            }),
            (e.prototype.pushCommands = function() {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              this.pusher(e);
            }),
            (e.prototype.if = function(e) {
              return (
                null == this.switchDo && (this.switchDo = { name: 'switch', do: [], defaultCommands: [] }),
                (this.pushType = 'condition'),
                e.is
                  ? this.switchDo.do.push({ varName: e.var, is: e.is, commands: [] })
                  : e.isGreaterThan
                  ? this.switchDo.do.push({ varName: e.var, isGreaterThan: e.isGreaterThan, commands: [] })
                  : e.isLessThan
                  ? this.switchDo.do.push({ varName: e.var, isLessThan: e.isLessThan, commands: [] })
                  : e.isBetween
                  ? this.switchDo.do.push({ varName: e.var, isBetween: e.isBetween, commands: [] })
                  : e.isGreaterThanOrEqualTo
                  ? this.switchDo.do.push({
                      varName: e.var,
                      isGreaterThanOrEqualTo: e.isGreaterThanOrEqualTo,
                      commands: [],
                    })
                  : e.isLessThanOrEqualTo &&
                    this.switchDo.do.push({
                      varName: e.var,
                      isGreaterThanOrEqualTo: e.isLessThanOrEqualTo,
                      commands: [],
                    }),
                this
              );
            }),
            (e.prototype.else = function() {
              return (this.pushType = 'default'), this;
            }),
            (e.prototype.endIf = function() {
              return (this.pushType = 'main'), this.pusher(this.switchDo), this;
            }),
            e
          );
        })();
      var T = (function() {
          function e(e) {
            void 0 === e && (e = {}),
              (this.variables = {}),
              (this.settings = {}),
              (this.defaultSettings = {
                baseContainer: document.getElementById(w.baseElementId),
                baseVideoUrl: '',
                bgAudioUrl: null,
                bgAudioLoop: !0,
              }),
              (this.nodes = []),
              (this.nodeKlassReference = E),
              (this.additionalFactories = []),
              (this.defineNode = this.node);
            var t = e.variables,
              n = e.settings;
            t && (this.variables = t), n && (this.settings = n), this.validateDom();
          }
          return (
            (e.extend = function() {
              for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
              var r = (function(e) {
                  function t() {
                    return (null !== e && e.apply(this, arguments)) || this;
                  }
                  return o(t, e), t;
                })(this.nodeKlass),
                i = this.factories.concat([]);
              return (
                t.forEach(function(e) {
                  e.nodeExtension &&
                    Object.keys(e.nodeExtension).forEach(function(t) {
                      r.prototype[t] = function() {
                        return e.nodeExtension[t].apply(this, arguments), this;
                      };
                    }),
                    (function(e) {
                      return !!e.commandHandlerInitializers;
                    })(e) && i.push.apply(i, e.commandHandlerInitializers),
                    (function(e) {
                      return !!e.aliases;
                    })(e) &&
                      e.aliases.forEach(function(e) {
                        var t = e.target;
                        Object(p.forceArray)(e.aliasAs).forEach(function(e) {
                          r.prototype[e] = r.prototype[t];
                        });
                      });
                }),
                ((e = (function(e) {
                  function t() {
                    var t = (null !== e && e.apply(this, arguments)) || this;
                    return (t.additionalFactories = i), (t.nodeKlassReference = r), t;
                  }
                  return o(t, e), t;
                })(this)).factories = i),
                (e.nodeKlass = r),
                e
              );
            }),
            (e.prototype.node = function(e) {
              var t = new this.nodeKlassReference(e);
              return this.nodes.push(t), t;
            }),
            (e.prototype.run = function(e) {
              this.runOnAnyPlatform(this.getEngine(), e);
            }),
            (e.prototype.createRunButton = function(e, t) {
              var n = this.getEngine(),
                r = this.createKickoffButton(e);
              return this.runViaButton(r, n, t), r;
            }),
            (e.prototype.getEngine = function() {
              return this.engine
                ? this.engine
                : (this.engine = x.apply(
                    void 0,
                    [{ settings: this.getSettings(), nodes: this.nodes, variables: this.variables }].concat(
                      this.additionalFactories,
                    ),
                  ));
            }),
            (e.prototype.validateDom = function() {
              if (!this.getSetting('baseContainer')) throw new Error('No valid node present in HTML');
            }),
            (e.prototype.getSetting = function(e) {
              return void 0 !== this.settings[e] ? this.settings[e] : this.defaultSettings[e];
            }),
            (e.prototype.getSettings = function() {
              for (var e = {}, t = 0, n = Object.keys(this.defaultSettings); t < n.length; t++) {
                var r = n[t];
                e[r] = this.getSetting(r);
              }
              return e;
            }),
            (e.prototype.runOnAnyPlatform = function(e, t) {
              this.isMobileOrTablet() ? this.runViaButton(this.createKickoffButton(), e, t) : e.run(t);
            }),
            (e.prototype.isMobileOrTablet = function() {
              return Object(u.isMobileOrTablet)();
            }),
            (e.prototype.createKickoffButton = function(e) {
              void 0 === e && (e = 'Kickoff');
              var t = document.createElement('button');
              return (
                (t.type = 'button'),
                (t.id = 'IV-kickoff'),
                (t.innerHTML = e),
                this.getSettings().baseContainer.appendChild(t),
                t
              );
            }),
            (e.prototype.runViaButton = function(e, t, n) {
              var r = this,
                o = function() {
                  e.removeEventListener('click', o), r.prepVideosForMobile(), e.remove(), t.run(n);
                };
              e.addEventListener('click', o);
            }),
            (e.prototype.prepVideosForMobile = function() {
              d(document.querySelectorAll('video')).forEach(function(e) {
                e.play(), e.pause();
              });
            }),
            (e.nodeKlass = E),
            (e.factories = []),
            e
          );
        })(),
        C = (function() {
          function e() {}
          return (
            (e.prototype.playVideo = function() {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              return Array.isArray(e[0]) ? this.handleDepricatedArrayInput(e[0]) : this.handleArrayInput(e);
            }),
            (e.prototype.clearVideo = function(e) {
              var t = [];
              if (e) {
                var n = { name: 'wait', time: 1e3 * e };
                t.push(n);
              }
              return t.push({ name: 'clearVideo' }), t;
            }),
            (e.prototype.handleDepricatedArrayInput = function(e) {
              return (
                console.warn(
                  'Passing an array to playVideo is deprecated. Just pass values as individual arguments. (Remove the `[` and `]` from the method call.)',
                ),
                this.playVideo.apply(this, e)
              );
            }),
            (e.prototype.handleArrayInput = function(e) {
              var t = this;
              return [
                e
                  .map(function(e) {
                    return t.guaranteedOptionsObject(e);
                  })
                  .reduce(this.mergeMissingUrlsReducer, [])
                  .map(function(e) {
                    return t.createPlayCommandFromOptions(e);
                  })
                  .reduceRight(this.reduceOnCompleteIntoPrevious, null),
              ];
            }),
            (e.prototype.mergeMissingUrlsReducer = function(e, t) {
              if (t.url) e.push(t);
              else {
                var n = e[e.length - 1];
                if (!n)
                  throw new Error(
                    'Previous object does not exist. This error can occur if the first object passed to `playVideo` does not contain a url.',
                  );
                Object.assign(n, t);
              }
              return e;
            }),
            (e.prototype.reduceOnCompleteIntoPrevious = function(e, t) {
              return e ? ((t.onComplete = t.onComplete || []), t.onComplete.push(e), t) : t;
            }),
            (e.prototype.guaranteedOptionsObject = function(e) {
              return 'object' == typeof e ? e : { url: e };
            }),
            (e.prototype.createPlayCommandFromOptions = function(e) {
              var t = { file: e.url },
                n = this.commandOptionsToCommands(e);
              return i({}, { name: 'playVideo' }, t, n);
            }),
            (e.prototype.commandOptionsToCommands = function(e) {
              var t = [];
              function n(e) {
                t = t.concat(e);
              }
              return (
                e.runAsync && n({ name: 'executeAsync', nodeName: e.runAsync }),
                e.js && n({ name: 'executeJs', func: e.js }),
                e.runSync && n({ name: 'executeSync', nodeName: e.runSync }),
                e.goToNode && n([{ name: 'goToNode', nodeName: e.goToNode }, { name: 'stopExecution' }]),
                t.length > 0 ? { onComplete: t } : {}
              );
            }),
            e
          );
        })();
      function S(e) {
        var t = document.createElement('video');
        return (
          (t.id = e),
          t.setAttribute('playsinline', 'true'),
          t.setAttribute('disableRemotePlayback', 'true'),
          (t.style.display = 'block'),
          t.addEventListener('loadeddata', function e() {
            (t.width = t.clientWidth), (t.height = t.clientHeight), t.removeEventListener('loadeddata', e);
          }),
          t
        );
      }
      var I = new ((function() {
          function e() {
            (this.baseElement = document.body),
              (this.players = { current: S('IV-video-player-1'), standby: S('IV-video-player-2') });
          }
          return (
            (e.prototype.playVideo = function(e) {
              var t = this.getStandbyPlayer(),
                n = this.getCurrentPlayer();
              return (
                (t.onloadeddata = function() {
                  (n.src = e), n.play(), (t.onloadeddata = function() {});
                }),
                (t.src = e),
                t.load(),
                this.whenPlayerEnds(n)
              );
            }),
            (e.prototype.whenPlayerEnds = function(e) {
              return new Promise(function(t) {
                var n = function() {
                  t('video ended'), e.removeEventListener('ended', n);
                };
                e.addEventListener('ended', n);
              });
            }),
            (e.prototype.createPlayers = function(e) {
              this.baseElement = e;
              var t,
                n = (((t = document.createElement('div')).className = 'IV-video-container'), t);
              this.attachPlayers(n);
            }),
            (e.prototype.attachPlayers = function(e) {
              e.appendChild(this.players.standby), e.appendChild(this.players.current), this.baseElement.appendChild(e);
            }),
            (e.prototype.getCurrentPlayer = function() {
              return this.players.current;
            }),
            (e.prototype.getStandbyPlayer = function() {
              return this.players.standby;
            }),
            e
          );
        })())(),
        O = new C(),
        P = new C(),
        k = {
          nodeExtension: {
            playVideo: function() {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              this.pushCommands.apply(this, O.playVideo.apply(O, e));
            },
            clearVideo: function(e) {
              this.pushCommands.apply(this, P.clearVideo(e));
            },
          },
          commandHandlerInitializers: [
            function(e) {
              var t = e.settings.baseContainer;
              return (
                I.createPlayers(t),
                {
                  playVideo: function(t) {
                    var n = '' + e.settings.baseVideoUrl + t.file,
                      r = I.playVideo(n),
                      o = {};
                    if (t.onComplete) {
                      var i = new Promise(function(e, o) {
                        r.then(function() {
                          var r, i;
                          (r = I.getCurrentPlayer().src), (i = n), v(r) === v(i) ? e(t.onComplete) : o('cancelled');
                        });
                      });
                      o.asyncCommands = i;
                    }
                    return Promise.resolve(o);
                  },
                }
              );
            },
            function(e) {
              var t = e.settings.baseContainer;
              return (
                I.createPlayers(t),
                {
                  clearVideo: function(e) {
                    return s(void 0, void 0, void 0, function() {
                      return a(this, function(e) {
                        return [2, Promise.resolve({})];
                      });
                    });
                  },
                }
              );
            },
          ],
        };
      function D(e) {
        var t = document.createElement('audio');
        return (t.id = e), t;
      }
      var A = new ((function() {
        function e() {
          (this._fadeInterval = 200),
            (this.baseElement = document.body),
            (this.players = { bg: D('IV-audio-player-bg'), sfx: D('IV-audio-player-sfx') });
        }
        return (
          (e.prototype.play = function(e, t) {
            var n = this.getPlayerNamed(e);
            return t && n.src !== t && (n.src = t), n.play(), this.whenPlayerEnds(n);
          }),
          (e.prototype.pause = function(e) {
            return this.getPlayerNamed(e).pause(), Promise.resolve('audio paused');
          }),
          (e.prototype.load = function(e, t) {
            var n = this.getPlayerNamed(e);
            return t && n.src !== t && (n.src = t), this.whenPlayerLoads(n);
          }),
          (e.prototype.loop = function(e, t) {
            this.getPlayerNamed(e).loop = t;
          }),
          (e.prototype.volume = function(e, t, n) {
            var r = this.getPlayerNamed(e);
            return (
              n && n > this._fadeInterval ? this.fadeOverTime(r, t, n) : (r.volume = t),
              Promise.resolve('audio volume adjusted')
            );
          }),
          (e.prototype.fadeOverTime = function(e, t, n) {
            return s(this, void 0, void 0, function() {
              var n, r, o, i;
              return a(this, function(s) {
                switch (s.label) {
                  case 0:
                    (n = Date.now()), (r = e.volume), (o = t - r), (i = 0), (s.label = 1);
                  case 1:
                    return i < 1
                      ? ((e.volume = r + o * ((u = Date.now() - n), (i = Math.min(u / a, 1)))),
                        1 === i && (e.volume = t),
                        [
                          4,
                          ((a = this._fadeInterval),
                          new Promise(function(e) {
                            setTimeout(e, a);
                          })),
                        ])
                      : [3, 3];
                  case 2:
                    return s.sent(), [3, 1];
                  case 3:
                    return [2];
                }
                var a, u;
              });
            });
          }),
          (e.prototype.whenPlayerEnds = function(e) {
            return new Promise(function(t) {
              var n = function() {
                t('audio ended'), e.removeEventListener('ended', n);
              };
              e.addEventListener('ended', n);
            });
          }),
          (e.prototype.whenPlayerLoads = function(e) {
            return new Promise(function(t) {
              var n = function() {
                t('audio loaded'), e.removeEventListener('loadeddata', n);
              };
              e.addEventListener('loadeddata', n);
            });
          }),
          (e.prototype.createPlayers = function(e) {
            (this.baseElement = e), this.attachPlayers();
          }),
          (e.prototype.attachPlayers = function() {
            this.baseElement.appendChild(this.players.bg), this.baseElement.appendChild(this.players.sfx);
          }),
          (e.prototype.getBgPlayer = function() {
            return this.players.bg;
          }),
          (e.prototype.getSfxPlayer = function() {
            return this.players.sfx;
          }),
          (e.prototype.getPlayerNamed = function(e) {
            return this.players[e.toLowerCase()];
          }),
          e
        );
      })())();
      var z = {
          nodeExtension: {
            bgAudio: function(e) {
              this.pushCommands(
                (function(e) {
                  if ('string' == typeof e)
                    return {
                      name: 'audioSource',
                      target: 'BG',
                      do: 'loop' === e ? null : e,
                      loop: 'loop' === e || void 0,
                    };
                  if (e.action) return { name: 'audioSource', target: 'BG', do: e.action, file: e.url, loop: e.loop };
                  var t = e,
                    n = t.play,
                    r = t.load,
                    o = t.loop;
                  return n
                    ? { name: 'audioSource', target: 'BG', do: 'play', file: n, loop: o }
                    : r
                    ? { name: 'audioSource', target: 'BG', do: 'load', file: r, loop: o }
                    : { name: 'audioSource', target: 'BG', do: null, file: r, loop: o };
                })(e),
              );
            },
            setVolume: function(e) {
              var t = e.volume,
                n = e.target,
                r = e.time,
                o = { name: 'audioVolume', target: n.toUpperCase(), volume: t, time: r ? 1e3 * r : r };
              this.pushCommands(o);
            },
          },
          commandHandlerInitializers: [
            function(e) {
              var t = e.settings.baseContainer;
              return (
                A.createPlayers(t),
                {
                  audioVolume: function(e) {
                    return (
                      e.time ? A.volume(e.target, e.volume, e.time) : A.volume(e.target, e.volume), Promise.resolve({})
                    );
                  },
                }
              );
            },
            function(e) {
              var t = e.settings.baseContainer;
              return (
                A.createPlayers(t),
                e.settings.bgAudioUrl && A.load('BG', e.settings.bgAudioUrl),
                A.loop('BG', e.settings.bgAudioLoop),
                {
                  audioSource: function(e) {
                    var t = e.target,
                      n = e.file,
                      r = e.loop;
                    switch (e.do) {
                      case 'play':
                        A.play(t, n);
                        break;
                      case 'load':
                        A.load(t, n);
                        break;
                      case 'pause':
                        A.pause(t);
                        break;
                      default:
                        throw new Error('unexpected command for audio source: "' + e.do + '"');
                    }
                    return void 0 !== r && A.loop(t, r), Promise.resolve({});
                  },
                }
              );
            },
          ],
        },
        M = (function() {
          function e() {}
          return (
            (e.prototype.addButton = function(e) {
              return { name: 'addButton', id: e.id, text: e.text, onClick: this.createCommands(e) };
            }),
            (e.prototype.removeAllButtons = function() {
              return { name: 'removeAllButtons' };
            }),
            (e.prototype.createCommands = function(e) {
              var t = e.runAsync,
                n = e.goToNode,
                r = e.js,
                o = e.remove,
                i = e.id,
                s = [];
              return (
                t && s.push({ name: 'executeAsync', nodeName: t }),
                r && s.push({ name: 'executeJs', func: r }),
                o && s.push({ name: 'removeButton', id: i }),
                n && s.push({ name: 'goToNode', nodeName: n }, { name: 'stopExecution' }),
                s
              );
            }),
            e
          );
        })(),
        R = new ((function() {
          function e() {
            this.allButtons = [];
          }
          return (
            (e.prototype.createButton = function(e, t) {
              var n = this.newButton(e);
              return this.addToButtonStore(n), this.appendToDocument(n, t), n;
            }),
            (e.prototype.removeAllButtons = function() {
              this.allButtons = this.allButtons.reduce(function(e, t) {
                return t.remove(), e;
              }, []);
            }),
            (e.prototype.removeButton = function(e) {
              this.allButtons
                .filter(function(t) {
                  return t.id === e;
                })
                .forEach(function(e) {
                  return e.remove();
                });
            }),
            (e.prototype.newButton = function(e) {
              var t = document.createElement('button');
              return this.applySettingsToButton(t, e), t;
            }),
            (e.prototype.applySettingsToButton = function(e, t) {
              var n = h(t);
              (n.onclick = n.onClick),
                delete n.onClick,
                (e.innerHTML = n.text),
                delete n.text,
                Object(p.traverseObject)(
                  n,
                  function(t, n) {
                    e[t] = n;
                  },
                  !1,
                  !1,
                );
            }),
            (e.prototype.addToButtonStore = function(e) {
              this.allButtons.push(e);
            }),
            (e.prototype.appendToDocument = function(e, t) {
              this.getContainer(t).appendChild(e);
            }),
            (e.prototype.getContainer = function(e) {
              var t = e || this.baseElement(),
                n = (function(e, t) {
                  var n = e.getAttribute('class');
                  e.setAttribute('class', n + ' IV-searching');
                  var r = e.parentNode.querySelectorAll('.IV-searching > ' + t);
                  return e.setAttribute('class', n), d(r);
                })(t, '.' + w.buttonContainerClass)[0];
              if (n) return n;
              var r = document.createElement('div');
              return r.setAttribute('class', w.buttonContainerClass), t.appendChild(r), r;
            }),
            (e.prototype.baseElement = function() {
              return document.getElementById(w.baseElementId);
            }),
            e
          );
        })())(),
        j = new M(),
        _ = {
          nodeExtension: {
            addButton: function(e) {
              var t = j.addButton(e);
              this.pushCommands(t);
            },
            removeAllButtons: function() {
              var e = j.removeAllButtons();
              this.pushCommands(e);
            },
          },
          commandHandlerInitializers: [
            function(e) {
              var t = e.settings.baseContainer;
              return {
                addButton: function(n) {
                  var r = {
                    onClick: function() {
                      return e.commandEngine.runCommands(n.onClick);
                    },
                    text: n.text,
                    id: n.id,
                  };
                  return R.createButton(r, t), Promise.resolve({});
                },
              };
            },
            function(e) {
              e.settings.baseContainer;
              return {
                removeAllButtons: function(e) {
                  return R.removeAllButtons(), Promise.resolve({});
                },
              };
            },
            function(e) {
              e.settings.baseContainer;
              return {
                removeButton: function(e) {
                  return R.removeButton(e.id), Promise.resolve({});
                },
              };
            },
          ],
        },
        N = n(1),
        Y = n.n(N);
      function X(e) {
        var t = e.target,
          n = e.dx,
          r = e.dy,
          o = (parseFloat(t.getAttribute('data-x')) || 0) + n,
          i = (parseFloat(t.getAttribute('data-y')) || 0) + r;
        (t.style.webkitTransform = t.style.transform = 'translate(' + o + 'px, ' + i + 'px)'),
          t.setAttribute('data-x', o),
          t.setAttribute('data-y', i);
      }
      var B = [
        k,
        z,
        _,
        {
          nodeExtension: {
            addDragItem: function(e) {
              var t = e.id,
                n = e.image,
                r = e.height,
                o = e.width;
              this.pushCommands({
                name: 'addDragItem',
                id: t,
                imageUrl: n,
                size: r || o ? { height: r, width: o } : void 0,
              });
            },
            addDragTarget: function(e) {
              var t = e.id,
                n = e.width,
                r = e.height,
                o = e.top,
                i = {
                  name: 'addDragTarget',
                  id: t,
                  size: { width: n, height: r },
                  position: { x: e.left, y: o },
                  acceptDragItems: e.acceptDragItems,
                  onSuccess: e.onSuccess,
                  visible: e.visible,
                };
              this.pushCommands(i);
            },
            removeDragItem: function(e) {
              var t = { name: 'removeDragItem', id: e };
              this.pushCommands(t);
            },
            removeDragTarget: function(e) {
              var t = { name: 'removeDragTarget', id: e };
              this.pushCommands(t);
            },
          },
          commandHandlerInitializers: [
            function(e) {
              var t = e.settings.baseContainer;
              return {
                addDragItem: function(e) {
                  return s(void 0, void 0, void 0, function() {
                    var n, r;
                    return a(this, function(o) {
                      return (
                        (n = t.querySelector('#' + e.id)) &&
                          (console.warn(
                            'You added a drag item with an id ("' +
                              e.id +
                              '") that is already in use in the dom. Removing the previous ' +
                              e.id +
                              ' to make room for the new.',
                          ),
                          n.remove()),
                        ((r = new Image()).id = e.id),
                        (r.src = e.imageUrl),
                        (r.style.touchAction = 'none'),
                        e.size &&
                          e.size.width &&
                          (r.width = t.querySelector('video').clientWidth * (e.size.width / 100)),
                        e.size &&
                          e.size.height &&
                          (r.height = t.querySelector('video').clientHeight * (e.size.height / 100)),
                        Y()(r).draggable({ onmove: X }),
                        t.append(r),
                        [2, Promise.resolve({})]
                      );
                    });
                  });
                },
              };
            },
            function(e) {
              var t = e.settings.baseContainer.querySelector('video').parentElement;
              return {
                addDragTarget: function(n) {
                  return s(void 0, void 0, void 0, function() {
                    var r, o, i;
                    return a(this, function(s) {
                      return (
                        (r = t.querySelector('#' + n.id)) &&
                          (console.warn(
                            'You added a drag target with an id ("' +
                              n.id +
                              '") that is already in use in the dom. Removing the previous ' +
                              n.id +
                              ' to make room for the new.',
                          ),
                          r.remove()),
                        (o = document.createElement('div')),
                        (i = I.getCurrentPlayer()),
                        (o.id = n.id),
                        (o.style.width = i.clientWidth * (n.size.width / 100) + 'px'),
                        (o.style.height = i.clientHeight * (n.size.height / 100) + 'px'),
                        (o.style.position = 'absolute'),
                        (o.style.top = i.offsetTop + (n.position.y / 100) * i.clientHeight + 'px'),
                        (o.style.left = i.offsetLeft + (n.position.x / 100) * i.clientWidth + 'px'),
                        (o.style.border = n.visible ? '2px solid blue' : o.style.border),
                        t.append(o),
                        Y()(o).dropzone({
                          accept: n.acceptDragItems ? '#' + n.acceptDragItems.join() : null,
                          overlap: 'center',
                          ondragenter: function(e) {
                            e.target.style.borderColor = 'green';
                          },
                          ondragleave: function(e) {
                            e.target.style.borderColor = 'blue';
                          },
                          ondrop: function(t) {
                            var r = n.onSuccess || {},
                              o = r.js,
                              i = r.setVariable,
                              s = r.goToNode,
                              a = r.keepItem;
                            i && (e.variables[i] = t.relatedTarget.id),
                              o && o(),
                              s && e.commandEngine.runNodeByName(s),
                              a || t.relatedTarget.remove();
                          },
                        }),
                        [2, Promise.resolve({})]
                      );
                    });
                  });
                },
              };
            },
            function(e) {
              return {
                removeDragItem: function(t) {
                  return s(void 0, void 0, void 0, function() {
                    var n;
                    return a(this, function(r) {
                      return (
                        (n = e.settings.baseContainer.querySelector('#' + t.id)) && n.remove(), [2, Promise.resolve({})]
                      );
                    });
                  });
                },
              };
            },
            function(e) {
              var t = e.settings.baseContainer.querySelector('video').parentElement;
              return {
                removeDragTarget: function(e) {
                  return s(void 0, void 0, void 0, function() {
                    var n;
                    return a(this, function(r) {
                      return (n = t.querySelector('#' + e.id)) && n.remove(), [2, Promise.resolve({})];
                    });
                  });
                },
              };
            },
          ],
        },
        {
          nodeExtension: {
            addZone: function(e) {
              var t = e.id,
                n = e.width,
                r = e.height,
                o = e.top,
                i = {
                  name: 'addZone',
                  id: t,
                  size: { width: n, height: r },
                  position: { x: e.left, y: o },
                  onClick: e.onClick,
                  visible: e.visible,
                };
              this.pushCommands(i);
            },
            removeZone: function(e) {
              var t = { name: 'removeZone', id: e };
              this.pushCommands(t);
            },
          },
          commandHandlerInitializers: [
            function(e) {
              var t = e.settings.baseContainer.querySelector('video').parentElement;
              return {
                addZone: function(n) {
                  return s(void 0, void 0, void 0, function() {
                    var r, o, i;
                    return a(this, function(s) {
                      return (
                        (r = t.querySelector('#' + n.id)) &&
                          (console.warn(
                            'You added a drag target with an id ("' +
                              n.id +
                              '") that is already in use in the dom. Removing the previous ' +
                              n.id +
                              ' to make room for the new.',
                          ),
                          r.remove()),
                        (o = document.createElement('div')),
                        (i = I.getCurrentPlayer()),
                        (o.id = n.id),
                        (o.style.width = i.clientWidth * (n.size.width / 100) + 'px'),
                        (o.style.height = i.clientHeight * (n.size.height / 100) + 'px'),
                        (o.style.position = 'absolute'),
                        (o.style.top = i.offsetTop + (n.position.y / 100) * i.clientHeight + 'px'),
                        (o.style.left = i.offsetLeft + (n.position.x / 100) * i.clientWidth + 'px'),
                        (o.style.border = n.visible ? '2px solid blue' : o.style.border),
                        t.append(o),
                        (o.onclick = function() {
                          var t = n.onClick || {},
                            r = t.js,
                            i = t.setVariable,
                            s = t.goToNode;
                          i && (e.variables[i] = o.id), r && r(), s && e.commandEngine.runNodeByName(s);
                        }),
                        [2, Promise.resolve({})]
                      );
                    });
                  });
                },
              };
            },
            function(e) {
              var t = e.settings.baseContainer.querySelector('video').parentElement;
              return {
                removeZone: function(e) {
                  return s(void 0, void 0, void 0, function() {
                    var n;
                    return a(this, function(r) {
                      return (n = t.querySelector('#' + e.id)) && n.remove(), [2, Promise.resolve({})];
                    });
                  });
                },
              };
            },
          ],
        },
      ];
      var F = {
        add: function(e, t) {
          return e + t;
        },
        subtract: function(e, t) {
          return e - t;
        },
        multiply: function(e, t) {
          return e * t;
        },
        divide: function(e, t) {
          return e / t;
        },
        remainderAfterDivideBy: function(e, t) {
          return e % t;
        },
        roundDownAfterDivideBy: function(e, t) {
          return Math.floor(e / t);
        },
        roundUpAfterDivideBy: function(e, t) {
          return Math.ceil(e / t);
        },
        roundAfterDivideBy: function(e, t) {
          return Math.round(e / t);
        },
        round: function(e) {
          return Math.round(e);
        },
        roundUp: function(e) {
          return Math.ceil(e);
        },
        roundDown: function(e) {
          return Math.floor(e);
        },
      };
      var V = function(e) {
          var t = { name: 'executeAsync', nodeName: e };
          this.pushCommands(t);
        },
        L = function(e) {
          var t = { name: 'executeSync', nodeName: e };
          this.pushCommands(t);
        },
        U = function() {
          this.pushCommands({ name: 'stopExecution' });
        };
      var q = function(e, t, n) {
          return function() {
            for (var r = [], o = 0; o < arguments.length; o++) r[o] = arguments[o];
            return (
              console.warn(
                'The ' +
                  e +
                  ' command has been deprecated. Please use ' +
                  t +
                  ' instead. If you like the old name better, consider aliasing the function. See IVjs documentaion regarding plugins for an explanation.',
              ),
              n.apply(this, r)
            );
          };
        },
        W = [
          {
            nodeExtension: {
              calculate: function(e) {
                !(function(e) {
                  var t = [],
                    n = Object.keys(F),
                    r = Object.keys(e),
                    o = r.filter(function(e) {
                      return n.indexOf(e) > -1;
                    }),
                    i = r.filter(function(e) {
                      return -1 === ['var', 'storeIn'].concat(n).indexOf(e);
                    });
                  if (
                    (e.var || t.push('It did not contain a "var" property.'),
                    o.length < 1 && t.push('It contained no known operations (add, subtract, etc).'),
                    o.length > 1 && t.push('It contained more than one operation (add, subtract, etc).'),
                    i.length > 0)
                  ) {
                    var s = i
                      .map(function(e) {
                        return '"' + e + '"';
                      })
                      .join(', ')
                      .replace(/, ([^,]*)$/, ', and $1');
                    t.push('It contained unknown ' + (i.length > 1 ? 'properties' : 'property') + ' ' + s + '.');
                  }
                  if (t.length > 0) {
                    var a = r.map(function(t) {
                        var n = e[t];
                        return t + ': ' + (n = 'string' == typeof n ? '"' + n + '"' : n);
                      }),
                      u = n
                        .map(function(e) {
                          return '"' + e + '"';
                        })
                        .join(', ')
                        .replace(/, ([^,]*)$/, ', or $1'),
                      c =
                        t.join('\n') +
                        '\n\nThe `calculate()` command expects an object with properties "var", and then exactly one of ' +
                        u +
                        '. Optionally also "storeIn" If you don\'t want to overwrite the current variable.\n\nReceived {' +
                        a.join(', ') +
                        '}';
                    throw new Error(c);
                  }
                })(e);
                var t = Object.keys(F),
                  n = Object.keys(e).filter(function(e) {
                    return t.indexOf(e) > -1;
                  })[0],
                  r = e[n],
                  o = e.storeIn ? e.storeIn : e.var,
                  i = { name: 'calculate', varName: e.var, operation: n, value: r, assignTo: o };
                this.pushCommands(i);
              },
              setVariable: function(e) {
                if (e.var) {
                  var t = { name: 'assignFromVariable', varName: e.var, assignTo: e.storeIn };
                  this.pushCommands(t);
                } else
                  e.value &&
                    ((t = { name: 'assignVariable', value: e.value, assignTo: e.storeIn }), this.pushCommands(t));
              },
              getRandom: function(e) {
                var t = { name: 'getRandomNumber', min: e.min, max: e.max, assignTo: e.storeIn };
                this.pushCommands(t);
              },
            },
            commandHandlerInitializers: [
              function(e) {
                return {
                  assignVariable: function(t) {
                    return (e.variables[t.assignTo] = t.value), Promise.resolve({});
                  },
                };
              },
              function(e) {
                return {
                  assignFromVariable: function(t) {
                    return (e.variables[t.assignTo] = e.variables[t.varName]), Promise.resolve({});
                  },
                };
              },
              function(e) {
                return {
                  calculate: function(t) {
                    return Promise.resolve(
                      (function(e, t) {
                        var n = e.variables,
                          r = t.operation,
                          o = t.varName,
                          i = t.assignTo,
                          s = t.value;
                        if ('string' == typeof s) {
                          console.warn(
                            'The value passed in to the calculate command was not resolved to a number. Attempting to parse it as a number. Beware unexpected results. It is best to ensure that the variable you are using as the operand in the calculate command will evaluate to a number, not a string.',
                          );
                          var a = parseFloat(s);
                          if (Number.isNaN(a)) throw new Error('Could not parse string as number');
                          s = a;
                        }
                        if ('number' != typeof s)
                          throw new Error(
                            "The variable that was used in the calculate command did not resolve to anything number-like. Your attempted invocation would have looked something like .calculate({var: '" +
                              o +
                              "', " +
                              r +
                              ": 'SOME_VARIABLE_NAME'})...",
                          );
                        var u = n[o];
                        return (
                          (n[i] = (function(e) {
                            var t = F[e];
                            if (!t) throw new Error('There is no "' + e + '" operation in the calculate command');
                            return t;
                          })(r)(u, s)),
                          {}
                        );
                      })(e, t),
                    );
                  },
                };
              },
              function(e) {
                return {
                  getRandomNumber: function(t) {
                    return Promise.resolve(
                      (function(e, t) {
                        return (e.variables[t.assignTo] = f(t.min, t.max)), {};
                      })(e, t),
                    );
                  },
                };
              },
            ],
          },
          {
            nodeExtension: {
              return: q('return', 'endAllNodes', U),
              goSub: q('goSub', 'runSync', L),
              execute: q('execute', 'runAsync', V),
              endAllNodes: U,
              runSync: L,
              runAsync: V,
              goToNode: function(e) {
                var t = (function(e) {
                  return [{ name: 'goToNode', nodeName: e }, { name: 'stopExecution' }];
                })(e);
                this.pushCommands.apply(this, t);
              },
              wait: function(e) {
                var t = { name: 'wait', time: 1e3 * e };
                this.pushCommands(t);
              },
            },
            commandHandlerInitializers: [
              function(e) {
                return {
                  stopExecution: function(e) {
                    return Promise.resolve({ requests: ['exit'] });
                  },
                };
              },
              function(e) {
                return {
                  pauseExecution: function(e) {
                    return Promise.resolve({ requests: ['pause'] });
                  },
                };
              },
              function(e) {
                return {
                  executeAsync: function(t) {
                    return e.commandEngine.runNodeByName(t.nodeName), Promise.resolve({});
                  },
                };
              },
              function(e) {
                return {
                  executeSync: function(t) {
                    var n = {};
                    return new Promise(function(r) {
                      return s(void 0, void 0, void 0, function() {
                        return a(this, function(o) {
                          switch (o.label) {
                            case 0:
                              return [4, e.commandEngine.runNodeByName(t.nodeName)];
                            case 1:
                              return (
                                o.sent().once('done', function() {
                                  return r(n);
                                }),
                                [2]
                              );
                          }
                        });
                      });
                    });
                  },
                };
              },
              function(e) {
                return {
                  goToNode: function(t) {
                    return e.commandEngine.runNodeByName(t.nodeName), Promise.resolve({});
                  },
                };
              },
              function(e) {
                return {
                  wait: function(e) {
                    var t = {};
                    return new Promise(function(n) {
                      setTimeout(function() {
                        return n(t);
                      }, e.time);
                    });
                  },
                };
              },
            ],
          },
        ],
        H = [
          {
            nodeExtension: {
              log: function(e) {
                var t = { name: 'log', value: e };
                this.pushCommands(t);
              },
            },
            commandHandlerInitializers: [
              function(e) {
                return {
                  log: function(t) {
                    return null == t.value ? console.log(e.variables) : console.log(t.value), Promise.resolve({});
                  },
                };
              },
            ],
          },
        ],
        G = [
          {
            nodeExtension: {
              js: function(e) {
                this.pushCommands({ name: 'executeJs', func: e });
              },
            },
            commandHandlerInitializers: [
              function(e) {
                return {
                  executeJs: function(e) {
                    return s(void 0, void 0, void 0, function() {
                      return a(this, function(t) {
                        switch (t.label) {
                          case 0:
                            return [4, Promise.resolve(e.func())];
                          case 1:
                            return t.sent(), [2, {}];
                        }
                      });
                    });
                  },
                };
              },
            ],
          },
        ],
        K = B.concat(W, H, G),
        Q = T.extend.apply(T, K);
      n.d(t, 'IV', function() {
        return Q;
      });
    },
  ]);
});
//# sourceMappingURL=iv.js.map
