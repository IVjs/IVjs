!(function(t, e) {
  if ('object' == typeof exports && 'object' == typeof module) module.exports = e();
  else if ('function' == typeof define && define.amd) define([], e);
  else {
    var n = e();
    for (var r in n) ('object' == typeof exports ? exports : t)[r] = n[r];
  }
})(window, function() {
  return (function(t) {
    var e = {};
    function n(r) {
      if (e[r]) return e[r].exports;
      var o = (e[r] = { i: r, l: !1, exports: {} });
      return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
      }),
      (n.r = function(t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 });
      }),
      (n.t = function(t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if ((n.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: t }), 2 & e && 'string' != typeof t))
          for (var o in t)
            n.d(
              r,
              o,
              function(e) {
                return t[e];
              }.bind(null, o),
            );
        return r;
      }),
      (n.n = function(t) {
        var e =
          t && t.__esModule
            ? function() {
                return t.default;
              }
            : function() {
                return t;
              };
        return n.d(e, 'a', e), e;
      }),
      (n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ''),
      n((n.s = 5))
    );
  })([
    function(t, e, n) {
      'use strict';
      function r(t) {
        return {}.toString
          .call(t)
          .match(/\s([a-zA-Z]+)/)[1]
          .toLowerCase();
      }
      function o(t) {
        return JSON.parse(JSON.stringify(t));
      }
      function i(t) {
        var e = r(t);
        return (
          ['null', 'undefined'].indexOf(e) > -1 ||
          (['object', 'array', 'arguments', 'json', 'string'].indexOf(e) > -1 &&
            ('string' === e ? 0 === t.length : 0 === Object.getOwnPropertyNames(t).length || 0 === t.length))
        );
      }
      function s(t) {
        return 'object' === r(t);
      }
      function a(t, e, n, r) {
        void 0 === n && (n = !1), void 0 === r && (r = !0);
        var u = r ? o(t) : t,
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
            var f = e(l, u[l]);
            if (Array.isArray(f) && 2 === f.length) c[f[0]] = f[1];
            else if (!i(f))
              throw new Error(
                'It looks like you might have been trying to construct a new object, but you returned something other than an array that looks like [key, value]. You returned ' +
                  f,
              );
          }
        return c;
      }
      function u(t, e) {
        for (var n = e.split('.'), r = t, o = !0, i = []; o && n.length > 0; ) {
          var s = n.shift();
          s && r[s] ? (i.push(s), (r = r[s])) : (o = !1);
        }
        return { exists: o, existingPath: i.join('.'), finalValidProperty: r };
      }
      function c(t, e, n, r) {
        void 0 === n && (n = !1), void 0 === r && (r = !0);
        var i = 'UpperFirst' === e,
          s = r ? o(t) : t,
          u = i ? /[a-z]/ : /[A-z]/;
        return a(
          s,
          function(t, e) {
            var n = [t, e];
            return 'string' != typeof t ? n : null === t.charAt(0).match(u) ? n : [i ? l(t) : p(t), e];
          },
          n,
        );
      }
      function l(t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
      }
      function p(t) {
        return t.charAt(0).toLowerCase() + t.slice(1);
      }
      function d(t) {
        if (!s(t)) throw new Error("'obj' was not an object. Was " + r(t));
        return Object.keys(t).map(function(e) {
          return t[e];
        });
      }
      function f(t, e) {
        return -1 !== d(e).indexOf(t);
      }
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.toType = r),
        (e.round = function(t, e) {
          return void 0 === e && (e = 2), Number(Math.round(Number(t + 'e' + e)) + 'e-' + e);
        }),
        (e.clone = o),
        (e.isEmpty = i),
        (e.isNotEmpty = function(t) {
          return !i(t);
        }),
        (e.wrapObjectWithProperty = function(t, e, n) {
          void 0 === n && (n = !0);
          var r = {},
            i = n ? o(t) : t;
          return (r[e] = i), r;
        }),
        (e.isObject = s),
        (e.traverseObject = a),
        (e.nestedPropertyDetails = u),
        (e.nestedPropertyTest = function(t, e, n) {
          var r = u(t, e);
          return !!r.exists && !!n(r.finalValidProperty);
        }),
        (e.nestedPropertyExists = function(t, e) {
          return u(t, e).exists;
        }),
        (e.changePropsInitialCase = c),
        (e.firstCharToUpper = l),
        (e.firstCharToLower = p),
        (e.convertPropKeysForAsp = function(t) {
          return c(t, 'UpperFirst', !0);
        }),
        (e.convertPropKeysForJs = function(t) {
          return c(t, 'lowerFirst', !0);
        }),
        (e.valuesArrayFromObject = d),
        (e.objectContainsValue = f),
        (e.objectKeyForValue = function(t, e) {
          return (
            !!f(t, e) &&
            Object.keys(e).reduce(function(n, r) {
              return e[r] === t && (n = r), n;
            }, '')
          );
        }),
        (e.forceArray = function(t) {
          return -1 !== ['null', 'undefined'].indexOf(r(t)) ? [] : 'array' !== r(t) ? [t] : t;
        });
      var h = function() {
        var t = [],
          e = [],
          n = !0;
        return function(r, o) {
          if ('object' == typeof o && null !== o) {
            n && ((r = '__BASE_OBJECT__'), (n = !1));
            var i = t.indexOf(o);
            if (-1 !== i) return '[circular reference of ' + e[i] + ']';
            t.push(o), e.push(r);
          }
          return o;
        };
      };
      function v(t, e) {
        void 0 === e && (e = {});
        var n = Object.assign({}, { tabLength: 2, stripQuotes: !1, sort: !1 }, e),
          o = n.tabLength,
          i = n.stripQuotes;
        if (n.sort) {
          if ('array' === r(t)) return m(t.sort(), o, i);
          if ('object' === r(t)) {
            var s = {};
            return (
              Object.keys(t)
                .sort()
                .forEach(function(e) {
                  s[e] = t[e];
                }),
              m(s, o, i)
            );
          }
          return m(t, o, i);
        }
        return m(t, o, i);
      }
      function m(t, e, n) {
        var r = JSON.stringify(t, h(), e);
        return n && (r = r.replace(/"(.*?)": /g, '$1: ')), r;
      }
      (e.stringify = v),
        (e.deepEqual = function(t, e) {
          var n = { sort: !0 };
          return v(t, n) === v(e, n);
        }),
        (e.mediaWidth = function() {
          return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }),
        (e.mediaHeight = function() {
          return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        });
    },
    function(t, e, n) {
      var r;
      t.exports = (function t(e, n, o) {
        function i(a, u) {
          if (!n[a]) {
            if (!e[a]) {
              var c = 'function' == typeof r && r;
              if (!u && c) return r(a, !0);
              if (s) return s(a, !0);
              var l = new Error("Cannot find module '" + a + "'");
              throw ((l.code = 'MODULE_NOT_FOUND'), l);
            }
            var p = (n[a] = { exports: {} });
            e[a][0].call(
              p.exports,
              function(t) {
                var n = e[a][1][t];
                return i(n || t);
              },
              p,
              p.exports,
              t,
              e,
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
            function(t, e, n) {
              'use strict';
              'undefined' == typeof window
                ? (e.exports = function(e) {
                    return t('./src/utils/window').init(e), t('./src/index');
                  })
                : (e.exports = t('./src/index'));
            },
            { './src/index': 19, './src/utils/window': 52 },
          ],
          2: [
            function(t, e, n) {
              'use strict';
              var r = t('./utils/extend.js');
              function o(t, e) {
                for (var n = 0; n < e.length; n++) {
                  var r = e[n];
                  if (t.immediatePropagationStopped) break;
                  r(t);
                }
              }
              var i = (function() {
                function t(e) {
                  !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                  })(this, t),
                    (this.options = r({}, e || {}));
                }
                return (
                  (t.prototype.fire = function(t) {
                    var e = void 0,
                      n = 'on' + t.type,
                      r = this.global;
                    (e = this[t.type]) && o(t, e),
                      this[n] && this[n](t),
                      !t.propagationStopped && r && (e = r[t.type]) && o(t, e);
                  }),
                  (t.prototype.on = function(t, e) {
                    this[t] ? this[t].push(e) : (this[t] = [e]);
                  }),
                  (t.prototype.off = function(t, e) {
                    var n = this[t],
                      r = n ? n.indexOf(e) : -1;
                    -1 !== r && n.splice(r, 1), ((n && 0 === n.length) || !e) && (this[t] = void 0);
                  }),
                  t
                );
              })();
              e.exports = i;
            },
            { './utils/extend.js': 41 },
          ],
          3: [
            function(t, e, n) {
              'use strict';
              var r = t('./utils/extend'),
                o = t('./utils/getOriginXY'),
                i = t('./defaultOptions'),
                s = t('./utils/Signals').new(),
                a = (function() {
                  function t(e, n, a, u, c, l) {
                    var p = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
                    !(function(t, e) {
                      if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                    })(this, t);
                    var d = e.target,
                      f = ((d && d.options) || i).deltaSource,
                      h = o(d, c, a),
                      v = 'start' === u,
                      m = 'end' === u,
                      g = v ? e.startCoords : e.curCoords,
                      y = e.prevEvent;
                    c = c || e.element;
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
                      (this.interaction = e),
                      (this.interactable = d),
                      (this.t0 = v ? e.downTimes[e.downTimes.length - 1] : y.t0);
                    var w = {
                      interaction: e,
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
                      (this.x0 = e.startCoords.page.x - h.x),
                      (this.y0 = e.startCoords.page.y - h.y),
                      (this.clientX0 = e.startCoords.client.x - h.x),
                      (this.clientY0 = e.startCoords.client.y - h.y),
                      s.fire('set-delta', w),
                      (this.timeStamp = g.timeStamp),
                      (this.dt = e.pointerDelta.timeStamp),
                      (this.duration = this.timeStamp - this.t0),
                      (this.speed = e.pointerDelta[f].speed),
                      (this.velocityX = e.pointerDelta[f].vx),
                      (this.velocityY = e.pointerDelta[f].vy),
                      (this.swipe = m || 'inertiastart' === u ? this.getSwipe() : null),
                      s.fire('new', w);
                  }
                  return (
                    (t.prototype.getSwipe = function() {
                      var t = this.interaction;
                      if (t.prevEvent.speed < 600 || this.timeStamp - t.prevEvent.timeStamp > 150) return null;
                      var e = (180 * Math.atan2(t.prevEvent.velocityY, t.prevEvent.velocityX)) / Math.PI;
                      e < 0 && (e += 360);
                      var n = 112.5 <= e && e < 247.5,
                        r = 202.5 <= e && e < 337.5,
                        o = !n && (292.5 <= e || e < 67.5),
                        i = !r && 22.5 <= e && e < 157.5;
                      return {
                        up: r,
                        down: i,
                        left: n,
                        right: o,
                        angle: e,
                        speed: t.prevEvent.speed,
                        velocity: { x: t.prevEvent.velocityX, y: t.prevEvent.velocityY },
                      };
                    }),
                    (t.prototype.preventDefault = function() {}),
                    (t.prototype.stopImmediatePropagation = function() {
                      this.immediatePropagationStopped = this.propagationStopped = !0;
                    }),
                    (t.prototype.stopPropagation = function() {
                      this.propagationStopped = !0;
                    }),
                    t
                  );
                })();
              s.on('set-delta', function(t) {
                var e = t.iEvent,
                  n = t.interaction,
                  r = t.starting,
                  o = t.deltaSource,
                  i = r ? e : n.prevEvent;
                'client' === o
                  ? ((e.dx = e.clientX - i.clientX), (e.dy = e.clientY - i.clientY))
                  : ((e.dx = e.pageX - i.pageX), (e.dy = e.pageY - i.pageY));
              }),
                (a.signals = s),
                (e.exports = a);
            },
            { './defaultOptions': 18, './utils/Signals': 34, './utils/extend': 41, './utils/getOriginXY': 42 },
          ],
          4: [
            function(t, e, n) {
              'use strict';
              var r = t('./utils/clone'),
                o = t('./utils/is'),
                i = t('./utils/events'),
                s = t('./utils/extend'),
                a = t('./actions/base'),
                u = t('./scope'),
                c = t('./Eventable'),
                l = t('./defaultOptions'),
                p = t('./utils/Signals').new(),
                d = t('./utils/domUtils'),
                f = d.getElementRect,
                h = d.nodeContains,
                v = d.trySelector,
                m = d.matchesSelector,
                g = t('./utils/window'),
                y = g.getWindow,
                b = t('./utils/arr'),
                x = b.contains,
                w = t('./utils/browser'),
                E = w.wheelEvent;
              u.interactables = [];
              var T = (function() {
                function t(e, n) {
                  !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                  })(this, t),
                    (n = n || {}),
                    (this.target = e),
                    (this.events = new c()),
                    (this._context = n.context || u.document),
                    (this._win = y(v(e) ? this._context : e)),
                    (this._doc = this._win.document),
                    p.fire('new', { target: e, options: n, interactable: this, win: this._win }),
                    u.addDocument(this._doc, this._win),
                    u.interactables.push(this),
                    this.set(n);
                }
                return (
                  (t.prototype.setOnEvents = function(t, e) {
                    var n = 'on' + t;
                    return (
                      o.function(e.onstart) && (this.events[n + 'start'] = e.onstart),
                      o.function(e.onmove) && (this.events[n + 'move'] = e.onmove),
                      o.function(e.onend) && (this.events[n + 'end'] = e.onend),
                      o.function(e.oninertiastart) && (this.events[n + 'inertiastart'] = e.oninertiastart),
                      this
                    );
                  }),
                  (t.prototype.setPerAction = function(t, e) {
                    for (var n in e)
                      n in l[t] &&
                        (o.object(e[n])
                          ? ((this.options[t][n] = r(this.options[t][n] || {})),
                            s(this.options[t][n], e[n]),
                            o.object(l.perAction[n]) &&
                              'enabled' in l.perAction[n] &&
                              (this.options[t][n].enabled = !1 !== e[n].enabled))
                          : o.bool(e[n]) && o.object(l.perAction[n])
                          ? (this.options[t][n].enabled = e[n])
                          : void 0 !== e[n] && (this.options[t][n] = e[n]));
                  }),
                  (t.prototype.getRect = function(t) {
                    return (
                      (t = t || this.target),
                      o.string(this.target) && !o.element(t) && (t = this._context.querySelector(this.target)),
                      f(t)
                    );
                  }),
                  (t.prototype.rectChecker = function(t) {
                    return o.function(t)
                      ? ((this.getRect = t), this)
                      : null === t
                      ? (delete this.options.getRect, this)
                      : this.getRect;
                  }),
                  (t.prototype._backCompatOption = function(t, e) {
                    if (v(e) || o.object(e)) {
                      this.options[t] = e;
                      for (var n = 0; n < a.names.length; n++) {
                        var r = a.names[n];
                        this.options[r][t] = e;
                      }
                      return this;
                    }
                    return this.options[t];
                  }),
                  (t.prototype.origin = function(t) {
                    return this._backCompatOption('origin', t);
                  }),
                  (t.prototype.deltaSource = function(t) {
                    return 'page' === t || 'client' === t
                      ? ((this.options.deltaSource = t), this)
                      : this.options.deltaSource;
                  }),
                  (t.prototype.context = function() {
                    return this._context;
                  }),
                  (t.prototype.inContext = function(t) {
                    return this._context === t.ownerDocument || h(this._context, t);
                  }),
                  (t.prototype.fire = function(t) {
                    return this.events.fire(t), this;
                  }),
                  (t.prototype._onOffMultiple = function(t, e, n, r) {
                    if ((o.string(e) && -1 !== e.search(' ') && (e = e.trim().split(/ +/)), o.array(e))) {
                      for (var i = 0; i < e.length; i++) {
                        var s = e[i];
                        this[t](s, n, r);
                      }
                      return !0;
                    }
                    if (o.object(e)) {
                      for (var a in e) this[t](a, e[a], n);
                      return !0;
                    }
                  }),
                  (t.prototype.on = function(e, n, r) {
                    return this._onOffMultiple('on', e, n, r)
                      ? this
                      : ('wheel' === e && (e = E),
                        x(t.eventTypes, e)
                          ? this.events.on(e, n)
                          : o.string(this.target)
                          ? i.addDelegate(this.target, this._context, e, n, r)
                          : i.add(this.target, e, n, r),
                        this);
                  }),
                  (t.prototype.off = function(e, n, r) {
                    return this._onOffMultiple('off', e, n, r)
                      ? this
                      : ('wheel' === e && (e = E),
                        x(t.eventTypes, e)
                          ? this.events.off(e, n)
                          : o.string(this.target)
                          ? i.removeDelegate(this.target, this._context, e, n, r)
                          : i.remove(this.target, e, n, r),
                        this);
                  }),
                  (t.prototype.set = function(e) {
                    o.object(e) || (e = {}), (this.options = r(l.base));
                    var n = r(l.perAction);
                    for (var i in a.methodDict) {
                      var s = a.methodDict[i];
                      (this.options[i] = r(l[i])), this.setPerAction(i, n), this[s](e[i]);
                    }
                    for (var u = 0; u < t.settingsMethods.length; u++) {
                      var c = t.settingsMethods[u];
                      (this.options[c] = l.base[c]), c in e && this[c](e[c]);
                    }
                    return p.fire('set', { options: e, interactable: this }), this;
                  }),
                  (t.prototype.unset = function() {
                    if ((i.remove(this.target, 'all'), o.string(this.target)))
                      for (var t in i.delegatedEvents) {
                        var e = i.delegatedEvents[t];
                        e.selectors[0] === this.target &&
                          e.contexts[0] === this._context &&
                          (e.selectors.splice(0, 1),
                          e.contexts.splice(0, 1),
                          e.listeners.splice(0, 1),
                          e.selectors.length || (e[t] = null)),
                          i.remove(this._context, t, i.delegateListener),
                          i.remove(this._context, t, i.delegateUseCapture, !0);
                      }
                    else i.remove(this, 'all');
                    p.fire('unset', { interactable: this }), u.interactables.splice(u.interactables.indexOf(this), 1);
                    for (var n = 0; n < (u.interactions || []).length; n++) {
                      var r = (u.interactions || [])[n];
                      r.target === this && r.interacting() && !r._ending && r.stop();
                    }
                    return u.interact;
                  }),
                  t
                );
              })();
              (u.interactables.indexOfElement = function(t, e) {
                e = e || u.document;
                for (var n = 0; n < this.length; n++) {
                  var r = this[n];
                  if (r.target === t && r._context === e) return n;
                }
                return -1;
              }),
                (u.interactables.get = function(t, e, n) {
                  var r = this[this.indexOfElement(t, e && e.context)];
                  return r && (o.string(t) || n || r.inContext(t)) ? r : null;
                }),
                (u.interactables.forEachMatch = function(t, e) {
                  for (var n = 0; n < this.length; n++) {
                    var r = this[n],
                      i = void 0;
                    if (
                      ((o.string(r.target) ? o.element(t) && m(t, r.target) : t === r.target) &&
                        r.inContext(t) &&
                        (i = e(r)),
                      void 0 !== i)
                    )
                      return i;
                  }
                }),
                (T.eventTypes = u.eventTypes = []),
                (T.signals = p),
                (T.settingsMethods = ['deltaSource', 'origin', 'preventDefault', 'rectChecker']),
                (e.exports = T);
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
            function(t, e, n) {
              'use strict';
              var r = t('./scope'),
                o = t('./utils'),
                i = t('./utils/events'),
                s = t('./utils/browser'),
                a = t('./utils/domObjects'),
                u = t('./utils/interactionFinder'),
                c = t('./utils/Signals').new(),
                l = {},
                p = ['pointerDown', 'pointerMove', 'pointerUp', 'updatePointer', 'removePointer'],
                d = 0;
              r.interactions = [];
              for (
                var f = (function() {
                    function t(e) {
                      var n = e.pointerType;
                      !(function(t, e) {
                        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                      })(this, t),
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
                      (t.prototype.pointerDown = function(t, e, n) {
                        var r = this.updatePointer(t, e, !0);
                        c.fire('down', { pointer: t, event: e, eventTarget: n, pointerIndex: r, interaction: this });
                      }),
                      (t.prototype.start = function(t, e, n) {
                        this.interacting() ||
                          !this.pointerIsDown ||
                          this.pointerIds.length < ('gesture' === t.name ? 2 : 1) ||
                          (-1 === r.interactions.indexOf(this) && r.interactions.push(this),
                          o.copyAction(this.prepared, t),
                          (this.target = e),
                          (this.element = n),
                          c.fire('action-start', { interaction: this, event: this.downEvent }));
                      }),
                      (t.prototype.pointerMove = function(e, n, r) {
                        this.simulation || (this.updatePointer(e), o.setCoords(this.curCoords, this.pointers));
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
                          (this.pointerWasMoved = o.hypot(s, a) > t.pointerMoveTolerance));
                        var u = {
                          pointer: e,
                          pointerIndex: this.getPointerIndex(e),
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
                      (t.prototype.doMove = function(t) {
                        (t = o.extend(
                          {
                            pointer: this.pointers[0],
                            event: this.prevEvent,
                            eventTarget: this._eventTarget,
                            interaction: this,
                          },
                          t || {},
                        )),
                          c.fire('before-action-move', t),
                          this._dontFireMove || c.fire('action-move', t),
                          (this._dontFireMove = !1);
                      }),
                      (t.prototype.pointerUp = function(t, e, n, r) {
                        var o = this.getPointerIndex(t);
                        c.fire(/cancel$/i.test(e.type) ? 'cancel' : 'up', {
                          pointer: t,
                          pointerIndex: o,
                          event: e,
                          eventTarget: n,
                          curEventTarget: r,
                          interaction: this,
                        }),
                          this.simulation || this.end(e),
                          (this.pointerIsDown = !1),
                          this.removePointer(t, e);
                      }),
                      (t.prototype.end = function(t) {
                        (this._ending = !0),
                          (t = t || this.prevEvent),
                          this.interacting() && c.fire('action-end', { event: t, interaction: this }),
                          this.stop(),
                          (this._ending = !1);
                      }),
                      (t.prototype.currentAction = function() {
                        return this._interacting ? this.prepared.name : null;
                      }),
                      (t.prototype.interacting = function() {
                        return this._interacting;
                      }),
                      (t.prototype.stop = function() {
                        c.fire('stop', { interaction: this }),
                          this._interacting &&
                            (c.fire('stop-active', { interaction: this }),
                            c.fire('stop-' + this.prepared.name, { interaction: this })),
                          (this.target = this.element = null),
                          (this._interacting = !1),
                          (this.prepared.name = this.prevEvent = null);
                      }),
                      (t.prototype.getPointerIndex = function(t) {
                        return 'mouse' === this.pointerType || 'pen' === this.pointerType
                          ? 0
                          : this.pointerIds.indexOf(o.getPointerId(t));
                      }),
                      (t.prototype.updatePointer = function(t, e) {
                        var n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : e && /(down|start)$/i.test(e.type),
                          r = o.getPointerId(t),
                          i = this.getPointerIndex(t);
                        return (
                          -1 === i && ((i = this.pointerIds.length), (this.pointerIds[i] = r)),
                          n &&
                            c.fire('update-pointer-down', {
                              pointer: t,
                              event: e,
                              down: n,
                              pointerId: r,
                              pointerIndex: i,
                              interaction: this,
                            }),
                          (this.pointers[i] = t),
                          i
                        );
                      }),
                      (t.prototype.removePointer = function(t, e) {
                        var n = this.getPointerIndex(t);
                        -1 !== n &&
                          (c.fire('remove-pointer', { pointer: t, event: e, pointerIndex: n, interaction: this }),
                          this.pointers.splice(n, 1),
                          this.pointerIds.splice(n, 1),
                          this.downTargets.splice(n, 1),
                          this.downTimes.splice(n, 1));
                      }),
                      (t.prototype._updateEventTargets = function(t, e) {
                        (this._eventTarget = t), (this._curEventTarget = e);
                      }),
                      t
                    );
                  })(),
                  h = 0;
                h < p.length;
                h++
              ) {
                var v = p[h];
                l[v] = m(v);
              }
              function m(t) {
                return function(e) {
                  var n = o.getPointerType(e),
                    i = o.getEventTargets(e),
                    a = i[0],
                    c = i[1],
                    l = [];
                  if (s.supportsTouch && /touch/.test(e.type)) {
                    d = new Date().getTime();
                    for (var p = 0; p < e.changedTouches.length; p++) {
                      var h = e.changedTouches[p],
                        v = h,
                        m = u.search(v, e.type, a);
                      l.push([v, m || new f({ pointerType: n })]);
                    }
                  } else {
                    var g = !1;
                    if (!s.supportsPointerEvent && /mouse/.test(e.type)) {
                      for (var y = 0; y < r.interactions.length && !g; y++)
                        g = 'mouse' !== r.interactions[y].pointerType && r.interactions[y].pointerIsDown;
                      g = g || new Date().getTime() - d < 500 || 0 === e.timeStamp;
                    }
                    if (!g) {
                      var b = u.search(e, e.type, a);
                      b || (b = new f({ pointerType: n })), l.push([e, b]);
                    }
                  }
                  for (var x = 0; x < l.length; x++) {
                    var w = l[x],
                      E = w[0],
                      T = w[1];
                    T._updateEventTargets(a, c), T[t](E, e, a, c);
                  }
                };
              }
              function g(t) {
                for (var e = 0; e < r.interactions.length; e++) {
                  var n = r.interactions[e];
                  n.end(t), c.fire('endall', { event: t, interaction: n });
                }
              }
              var y = {},
                b = s.pEventTypes;
              function x(t, e) {
                var n = t.doc,
                  o = 0 === e.indexOf('add') ? i.add : i.remove;
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
                c.on('update-pointer-down', function(t) {
                  var e = t.interaction,
                    n = t.pointer,
                    r = t.pointerId,
                    i = t.pointerIndex,
                    s = t.event,
                    a = t.eventTarget,
                    u = t.down;
                  (e.pointerIds[i] = r),
                    (e.pointers[i] = n),
                    u && (e.pointerIsDown = !0),
                    e.interacting() ||
                      (o.setCoords(e.startCoords, e.pointers),
                      o.copyCoords(e.curCoords, e.startCoords),
                      o.copyCoords(e.prevCoords, e.startCoords),
                      (e.downEvent = s),
                      (e.downTimes[i] = e.curCoords.timeStamp),
                      (e.downTargets[i] = a || (s && o.getEventTargets(s)[0])),
                      (e.pointerWasMoved = !1),
                      o.pointerExtend(e.downPointer, n));
                }),
                r.signals.on('add-document', x),
                r.signals.on('remove-document', x),
                (f.pointerMoveTolerance = 1),
                (f.doOnInteractions = m),
                (f.endAll = g),
                (f.signals = c),
                (f.docEvents = y),
                (r.endAllInteractions = g),
                (e.exports = f);
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
            function(t, e, n) {
              'use strict';
              var r = t('../Interaction'),
                o = t('../InteractEvent'),
                i = { firePrepared: s, names: [], methodDict: {} };
              function s(t, e, n, r) {
                var i = t.prepared.name,
                  s = new o(t, e, i, n, t.element, null, r);
                t.target.fire(s), (t.prevEvent = s);
              }
              r.signals.on('action-start', function(t) {
                var e = t.interaction,
                  n = t.event;
                (e._interacting = !0), s(e, n, 'start');
              }),
                r.signals.on('action-move', function(t) {
                  var e = t.interaction,
                    n = t.event,
                    r = t.preEnd;
                  if ((s(e, n, 'move', r), !e.interacting())) return !1;
                }),
                r.signals.on('action-end', function(t) {
                  var e = t.interaction,
                    n = t.event;
                  s(e, n, 'end');
                }),
                (e.exports = i);
            },
            { '../InteractEvent': 3, '../Interaction': 5 },
          ],
          7: [
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('../utils'),
                i = t('../InteractEvent'),
                s = t('../Interactable'),
                a = t('../Interaction'),
                u = t('../defaultOptions'),
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
                  checker: function(t, e, n) {
                    var r = n.options.drag;
                    return r.enabled ? { name: 'drag', axis: 'start' === r.lockAxis ? r.startAxis : r.lockAxis } : null;
                  },
                  getCursor: function() {
                    return 'move';
                  },
                };
              a.signals.on('before-action-move', function(t) {
                var e = t.interaction;
                if ('drag' === e.prepared.name) {
                  var n = e.prepared.axis;
                  'x' === n
                    ? ((e.curCoords.page.y = e.startCoords.page.y),
                      (e.curCoords.client.y = e.startCoords.client.y),
                      (e.pointerDelta.page.speed = Math.abs(e.pointerDelta.page.vx)),
                      (e.pointerDelta.client.speed = Math.abs(e.pointerDelta.client.vx)),
                      (e.pointerDelta.client.vy = 0),
                      (e.pointerDelta.page.vy = 0))
                    : 'y' === n &&
                      ((e.curCoords.page.x = e.startCoords.page.x),
                      (e.curCoords.client.x = e.startCoords.client.x),
                      (e.pointerDelta.page.speed = Math.abs(e.pointerDelta.page.vy)),
                      (e.pointerDelta.client.speed = Math.abs(e.pointerDelta.client.vy)),
                      (e.pointerDelta.client.vx = 0),
                      (e.pointerDelta.page.vx = 0));
                }
              }),
                i.signals.on('new', function(t) {
                  var e = t.iEvent,
                    n = t.interaction;
                  if ('dragmove' === e.type) {
                    var r = n.prepared.axis;
                    'x' === r
                      ? ((e.pageY = n.startCoords.page.y), (e.clientY = n.startCoords.client.y), (e.dy = 0))
                      : 'y' === r &&
                        ((e.pageX = n.startCoords.page.x), (e.clientX = n.startCoords.client.x), (e.dx = 0));
                  }
                }),
                (s.prototype.draggable = function(t) {
                  return o.is.object(t)
                    ? ((this.options.drag.enabled = !1 !== t.enabled),
                      this.setPerAction('drag', t),
                      this.setOnEvents('drag', t),
                      /^(xy|x|y|start)$/.test(t.lockAxis) && (this.options.drag.lockAxis = t.lockAxis),
                      /^(xy|x|y)$/.test(t.startAxis) && (this.options.drag.startAxis = t.startAxis),
                      this)
                    : o.is.bool(t)
                    ? ((this.options.drag.enabled = t),
                      t || (this.ondragstart = this.ondragstart = this.ondragend = null),
                      this)
                    : this.options.drag;
                }),
                (r.drag = c),
                r.names.push('drag'),
                o.merge(s.eventTypes, ['dragstart', 'dragmove', 'draginertiastart', 'draginertiaresume', 'dragend']),
                (r.methodDict.drag = 'draggable'),
                (u.drag = c.defaults),
                (e.exports = c);
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
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('../utils'),
                i = t('../scope'),
                s = t('../interact'),
                a = t('../InteractEvent'),
                u = t('../Interactable'),
                c = t('../Interaction'),
                l = t('../defaultOptions'),
                p = { defaults: { enabled: !1, accept: null, overlap: 'pointer' } },
                d = !1;
              function f(t, e) {
                for (var n = void 0, r = 0; r < t.dropzones.length; r++) {
                  var o = t.dropzones[r],
                    i = t.elements[r];
                  i !== n && ((e.target = i), o.fire(e)), (n = i);
                }
              }
              function h(t, e) {
                var n = (function(t, e) {
                  for (var n = [], r = [], s = 0; s < i.interactables.length; s++) {
                    var a = i.interactables[s];
                    if (a.options.drop.enabled) {
                      var u = a.options.drop.accept;
                      if (!((o.is.element(u) && u !== e) || (o.is.string(u) && !o.matchesSelector(e, u))))
                        for (
                          var c = o.is.string(a.target) ? a._context.querySelectorAll(a.target) : [a.target], l = 0;
                          l < c.length;
                          l++
                        ) {
                          var p = c[l];
                          p !== e && (n.push(a), r.push(p));
                        }
                    }
                  }
                  return { elements: r, dropzones: n };
                })(0, e);
                (t.dropzones = n.dropzones), (t.elements = n.elements), (t.rects = []);
                for (var r = 0; r < t.dropzones.length; r++) t.rects[r] = t.dropzones[r].getRect(t.elements[r]);
              }
              function v(t, e, n) {
                var r = { enter: null, leave: null, activate: null, deactivate: null, move: null, drop: null },
                  i = {
                    dragEvent: n,
                    interaction: t,
                    target: t.dropElement,
                    dropzone: t.dropTarget,
                    relatedTarget: n.target,
                    draggable: n.interactable,
                    timeStamp: n.timeStamp,
                  };
                return (
                  t.dropElement !== t.prevDropElement &&
                    (t.prevDropTarget &&
                      ((r.leave = o.extend({ type: 'dragleave' }, i)),
                      (n.dragLeave = r.leave.target = t.prevDropElement),
                      (n.prevDropzone = r.leave.dropzone = t.prevDropTarget)),
                    t.dropTarget &&
                      ((r.enter = {
                        dragEvent: n,
                        interaction: t,
                        target: t.dropElement,
                        dropzone: t.dropTarget,
                        relatedTarget: n.target,
                        draggable: n.interactable,
                        timeStamp: n.timeStamp,
                        type: 'dragenter',
                      }),
                      (n.dragEnter = t.dropElement),
                      (n.dropzone = t.dropTarget))),
                  'dragend' === n.type &&
                    t.dropTarget &&
                    ((r.drop = o.extend({ type: 'drop' }, i)),
                    (n.dropzone = t.dropTarget),
                    (n.relatedTarget = t.dropElement)),
                  'dragstart' === n.type &&
                    ((r.activate = o.extend({ type: 'dropactivate' }, i)),
                    (r.activate.target = null),
                    (r.activate.dropzone = null)),
                  'dragend' === n.type &&
                    ((r.deactivate = o.extend({ type: 'dropdeactivate' }, i)),
                    (r.deactivate.target = null),
                    (r.deactivate.dropzone = null)),
                  'dragmove' === n.type &&
                    t.dropTarget &&
                    ((r.move = o.extend({ dragmove: n, type: 'dropmove' }, i)), (n.dropzone = t.dropTarget)),
                  r
                );
              }
              function m(t, e) {
                var n = t.activeDrops,
                  r = t.prevDropTarget,
                  o = t.dropTarget,
                  i = t.dropElement;
                e.leave && r.fire(e.leave),
                  e.move && o.fire(e.move),
                  e.enter && o.fire(e.enter),
                  e.drop && o.fire(e.drop),
                  e.deactivate && f(n, e.deactivate),
                  (t.prevDropTarget = o),
                  (t.prevDropElement = i);
              }
              c.signals.on('action-start', function(t) {
                var e = t.interaction;
                t.event;
                if ('drag' === e.prepared.name) {
                  (e.activeDrops.dropzones = []),
                    (e.activeDrops.elements = []),
                    (e.activeDrops.rects = []),
                    (e.dropEvents = null),
                    e.dynamicDrop || h(e.activeDrops, e.element);
                  var n = e.prevEvent,
                    r = v(e, 0, n);
                  r.activate && f(e.activeDrops, r.activate);
                }
              }),
                a.signals.on('new', function(t) {
                  var e = t.interaction,
                    n = t.iEvent,
                    r = t.event;
                  if ('dragmove' === n.type || 'dragend' === n.type) {
                    var i = e.element,
                      s = n,
                      a = (function(t, e, n) {
                        var r = t.interaction,
                          i = [];
                        d && h(r.activeDrops, n);
                        for (var s = 0; s < r.activeDrops.dropzones.length; s++) {
                          var a = r.activeDrops.dropzones[s],
                            u = r.activeDrops.elements[s],
                            c = r.activeDrops.rects[s];
                          i.push(a.dropCheck(t, e, r.target, n, u, c) ? u : null);
                        }
                        var l = o.indexOfDeepestElement(i);
                        return {
                          dropzone: r.activeDrops.dropzones[l] || null,
                          element: r.activeDrops.elements[l] || null,
                        };
                      })(s, r, i);
                    (e.dropTarget = a.dropzone), (e.dropElement = a.element), (e.dropEvents = v(e, 0, s));
                  }
                }),
                c.signals.on('action-move', function(t) {
                  var e = t.interaction;
                  'drag' === e.prepared.name && m(e, e.dropEvents);
                }),
                c.signals.on('action-end', function(t) {
                  var e = t.interaction;
                  'drag' === e.prepared.name && m(e, e.dropEvents);
                }),
                c.signals.on('stop-drag', function(t) {
                  var e = t.interaction;
                  (e.activeDrops = { dropzones: null, elements: null, rects: null }), (e.dropEvents = null);
                }),
                (u.prototype.dropzone = function(t) {
                  return o.is.object(t)
                    ? ((this.options.drop.enabled = !1 !== t.enabled),
                      o.is.function(t.ondrop) && (this.events.ondrop = t.ondrop),
                      o.is.function(t.ondropactivate) && (this.events.ondropactivate = t.ondropactivate),
                      o.is.function(t.ondropdeactivate) && (this.events.ondropdeactivate = t.ondropdeactivate),
                      o.is.function(t.ondragenter) && (this.events.ondragenter = t.ondragenter),
                      o.is.function(t.ondragleave) && (this.events.ondragleave = t.ondragleave),
                      o.is.function(t.ondropmove) && (this.events.ondropmove = t.ondropmove),
                      /^(pointer|center)$/.test(t.overlap)
                        ? (this.options.drop.overlap = t.overlap)
                        : o.is.number(t.overlap) && (this.options.drop.overlap = Math.max(Math.min(1, t.overlap), 0)),
                      'accept' in t && (this.options.drop.accept = t.accept),
                      'checker' in t && (this.options.drop.checker = t.checker),
                      this)
                    : o.is.bool(t)
                    ? ((this.options.drop.enabled = t),
                      t ||
                        (this.ondragenter = this.ondragleave = this.ondrop = this.ondropactivate = this.ondropdeactivate = null),
                      this)
                    : this.options.drop;
                }),
                (u.prototype.dropCheck = function(t, e, n, r, i, s) {
                  var a = !1;
                  if (!(s = s || this.getRect(i)))
                    return !!this.options.drop.checker && this.options.drop.checker(t, e, a, this, i, n, r);
                  var u = this.options.drop.overlap;
                  if ('pointer' === u) {
                    var c = o.getOriginXY(n, r, 'drag'),
                      l = o.getPageXY(t);
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
                  return this.options.drop.checker && (a = this.options.drop.checker(t, e, a, this, i, n, r)), a;
                }),
                u.signals.on('unset', function(t) {
                  var e = t.interactable;
                  e.dropzone(!1);
                }),
                u.settingsMethods.push('dropChecker'),
                c.signals.on('new', function(t) {
                  (t.dropTarget = null),
                    (t.dropElement = null),
                    (t.prevDropTarget = null),
                    (t.prevDropElement = null),
                    (t.dropEvents = null),
                    (t.activeDrops = { dropzones: [], elements: [], rects: [] });
                }),
                c.signals.on('stop', function(t) {
                  var e = t.interaction;
                  e.dropTarget = e.dropElement = e.prevDropTarget = e.prevDropElement = null;
                }),
                (s.dynamicDrop = function(t) {
                  return o.is.bool(t) ? ((d = t), s) : d;
                }),
                o.merge(u.eventTypes, ['dragenter', 'dragleave', 'dropactivate', 'dropdeactivate', 'dropmove', 'drop']),
                (r.methodDict.drop = 'dropzone'),
                (l.drop = p.defaults),
                (e.exports = p);
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
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('../utils'),
                i = t('../InteractEvent'),
                s = t('../Interactable'),
                a = t('../Interaction'),
                u = t('../defaultOptions'),
                c = {
                  defaults: { enabled: !1, origin: null, restrict: null },
                  checker: function(t, e, n, r, o) {
                    return o.pointerIds.length >= 2 ? { name: 'gesture' } : null;
                  },
                  getCursor: function() {
                    return '';
                  },
                };
              i.signals.on('new', function(t) {
                var e = t.iEvent,
                  n = t.interaction;
                'gesturestart' === e.type &&
                  ((e.ds = 0),
                  (n.gesture.startDistance = n.gesture.prevDistance = e.distance),
                  (n.gesture.startAngle = n.gesture.prevAngle = e.angle),
                  (n.gesture.scale = 1));
              }),
                i.signals.on('new', function(t) {
                  var e = t.iEvent,
                    n = t.interaction;
                  'gesturemove' === e.type &&
                    ((e.ds = e.scale - n.gesture.scale),
                    n.target.fire(e),
                    (n.gesture.prevAngle = e.angle),
                    (n.gesture.prevDistance = e.distance),
                    e.scale === 1 / 0 ||
                      null === e.scale ||
                      void 0 === e.scale ||
                      isNaN(e.scale) ||
                      (n.gesture.scale = e.scale));
                }),
                (s.prototype.gesturable = function(t) {
                  return o.is.object(t)
                    ? ((this.options.gesture.enabled = !1 !== t.enabled),
                      this.setPerAction('gesture', t),
                      this.setOnEvents('gesture', t),
                      this)
                    : o.is.bool(t)
                    ? ((this.options.gesture.enabled = t),
                      t || (this.ongesturestart = this.ongesturestart = this.ongestureend = null),
                      this)
                    : this.options.gesture;
                }),
                i.signals.on('set-delta', function(t) {
                  var e = t.interaction,
                    n = t.iEvent,
                    r = t.action,
                    s = t.event,
                    a = t.starting,
                    u = t.ending,
                    c = t.deltaSource;
                  if ('gesture' === r) {
                    var l = e.pointers;
                    (n.touches = [l[0], l[1]]),
                      a
                        ? ((n.distance = o.touchDistance(l, c)),
                          (n.box = o.touchBBox(l)),
                          (n.scale = 1),
                          (n.ds = 0),
                          (n.angle = o.touchAngle(l, void 0, c)),
                          (n.da = 0))
                        : u || s instanceof i
                        ? ((n.distance = e.prevEvent.distance),
                          (n.box = e.prevEvent.box),
                          (n.scale = e.prevEvent.scale),
                          (n.ds = n.scale - 1),
                          (n.angle = e.prevEvent.angle),
                          (n.da = n.angle - e.gesture.startAngle))
                        : ((n.distance = o.touchDistance(l, c)),
                          (n.box = o.touchBBox(l)),
                          (n.scale = n.distance / e.gesture.startDistance),
                          (n.angle = o.touchAngle(l, e.gesture.prevAngle, c)),
                          (n.ds = n.scale - e.gesture.prevScale),
                          (n.da = n.angle - e.gesture.prevAngle));
                  }
                }),
                a.signals.on('new', function(t) {
                  t.gesture = {
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
                (e.exports = c);
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
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('../utils'),
                i = t('../utils/browser'),
                s = t('../InteractEvent'),
                a = t('../Interactable'),
                u = t('../Interaction'),
                c = t('../defaultOptions'),
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
                  checker: function(t, e, n, r, i, s) {
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
                  getCursor: function(t) {
                    if (t.axis) return p.cursors[t.name + t.axis];
                    if (t.edges) {
                      for (var e = '', n = ['top', 'bottom', 'left', 'right'], r = 0; r < 4; r++)
                        t.edges[n[r]] && (e += n[r]);
                      return p.cursors[e];
                    }
                  },
                };
              function d(t, e, n, r, i, s, a) {
                if (!e) return !1;
                if (!0 === e) {
                  var u = o.is.number(s.width) ? s.width : s.right - s.left,
                    c = o.is.number(s.height) ? s.height : s.bottom - s.top;
                  if (
                    (u < 0 && ('left' === t ? (t = 'right') : 'right' === t && (t = 'left')),
                    c < 0 && ('top' === t ? (t = 'bottom') : 'bottom' === t && (t = 'top')),
                    'left' === t)
                  )
                    return n.x < (u >= 0 ? s.left : s.right) + a;
                  if ('top' === t) return n.y < (c >= 0 ? s.top : s.bottom) + a;
                  if ('right' === t) return n.x > (u >= 0 ? s.right : s.left) - a;
                  if ('bottom' === t) return n.y > (c >= 0 ? s.bottom : s.top) - a;
                }
                return !!o.is.element(r) && (o.is.element(e) ? e === r : o.matchesUpTo(r, e, i));
              }
              s.signals.on('new', function(t) {
                var e = t.iEvent,
                  n = t.interaction;
                if ('resizestart' === e.type && n.prepared.edges) {
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
                    (e.rect = n.resizeRects.inverted),
                    (e.deltaRect = n.resizeRects.delta);
                }
              }),
                s.signals.on('new', function(t) {
                  var e = t.iEvent,
                    n = t.phase,
                    r = t.interaction;
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
                      v = e.dx,
                      m = e.dy;
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
                    (e.edges = r.prepared.edges), (e.rect = p), (e.deltaRect = d);
                  }
                }),
                (a.prototype.resizable = function(t) {
                  return o.is.object(t)
                    ? ((this.options.resize.enabled = !1 !== t.enabled),
                      this.setPerAction('resize', t),
                      this.setOnEvents('resize', t),
                      /^x$|^y$|^xy$/.test(t.axis)
                        ? (this.options.resize.axis = t.axis)
                        : null === t.axis && (this.options.resize.axis = c.resize.axis),
                      o.is.bool(t.preserveAspectRatio)
                        ? (this.options.resize.preserveAspectRatio = t.preserveAspectRatio)
                        : o.is.bool(t.square) && (this.options.resize.square = t.square),
                      this)
                    : o.is.bool(t)
                    ? ((this.options.resize.enabled = t),
                      t || (this.onresizestart = this.onresizestart = this.onresizeend = null),
                      this)
                    : this.options.resize;
                }),
                u.signals.on('new', function(t) {
                  t.resizeAxes = 'xy';
                }),
                s.signals.on('set-delta', function(t) {
                  var e = t.interaction,
                    n = t.iEvent,
                    r = t.action;
                  if ('resize' === r && e.resizeAxes) {
                    var o = e.target.options;
                    o.resize.square
                      ? ('y' === e.resizeAxes ? (n.dx = n.dy) : (n.dy = n.dx), (n.axes = 'xy'))
                      : ((n.axes = e.resizeAxes),
                        'x' === e.resizeAxes ? (n.dy = 0) : 'y' === e.resizeAxes && (n.dx = 0));
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
                (e.exports = p);
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
            function(t, e, n) {
              'use strict';
              var r = t('./utils/raf'),
                o = t('./utils/window').getWindow,
                i = t('./utils/is'),
                s = t('./utils/domUtils'),
                a = t('./Interaction'),
                u = t('./defaultOptions'),
                c = {
                  defaults: { enabled: !1, container: null, margin: 60, speed: 300 },
                  interaction: null,
                  i: null,
                  x: 0,
                  y: 0,
                  isScrolling: !1,
                  prevTime: 0,
                  start: function(t) {
                    (c.isScrolling = !0),
                      r.cancel(c.i),
                      (c.interaction = t),
                      (c.prevTime = new Date().getTime()),
                      (c.i = r.request(c.scroll));
                  },
                  stop: function() {
                    (c.isScrolling = !1), r.cancel(c.i);
                  },
                  scroll: function() {
                    var t = c.interaction.target.options[c.interaction.prepared.name].autoScroll,
                      e = t.container || o(c.interaction.element),
                      n = new Date().getTime(),
                      s = (n - c.prevTime) / 1e3,
                      a = t.speed * s;
                    a >= 1 &&
                      (i.window(e)
                        ? e.scrollBy(c.x * a, c.y * a)
                        : e && ((e.scrollLeft += c.x * a), (e.scrollTop += c.y * a)),
                      (c.prevTime = n)),
                      c.isScrolling && (r.cancel(c.i), (c.i = r.request(c.scroll)));
                  },
                  check: function(t, e) {
                    var n = t.options;
                    return n[e].autoScroll && n[e].autoScroll.enabled;
                  },
                  onInteractionMove: function(t) {
                    var e = t.interaction,
                      n = t.pointer;
                    if (e.interacting() && c.check(e.target, e.prepared.name))
                      if (e.simulation) c.x = c.y = 0;
                      else {
                        var r = void 0,
                          a = void 0,
                          u = void 0,
                          l = void 0,
                          p = e.target.options[e.prepared.name].autoScroll,
                          d = p.container || o(e.element);
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
                          c.isScrolling || ((c.margin = p.margin), (c.speed = p.speed), c.start(e));
                      }
                  },
                };
              a.signals.on('stop-active', function() {
                c.stop();
              }),
                a.signals.on('action-move', c.onInteractionMove),
                (u.perAction.autoScroll = c.defaults),
                (e.exports = c);
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
            function(t, e, n) {
              'use strict';
              var r = t('../Interactable'),
                o = t('../actions/base'),
                i = t('../utils/is'),
                s = t('../utils/domUtils'),
                a = t('../utils'),
                u = a.warnOnce;
              (r.prototype.getAction = function(t, e, n, r) {
                var o = this.defaultActionChecker(t, e, n, r);
                return this.options.actionChecker ? this.options.actionChecker(t, e, o, this, r, n) : o;
              }),
                (r.prototype.ignoreFrom = u(function(t) {
                  return this._backCompatOption('ignoreFrom', t);
                }, 'Interactable.ignoreForm() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue}).')),
                (r.prototype.allowFrom = u(function(t) {
                  return this._backCompatOption('allowFrom', t);
                }, 'Interactable.allowForm() has been deprecated. Use Interactble.draggable({allowFrom: newValue}).')),
                (r.prototype.testIgnore = function(t, e, n) {
                  return (
                    !(!t || !i.element(n)) &&
                    (i.string(t) ? s.matchesUpTo(n, t, e) : !!i.element(t) && s.nodeContains(t, n))
                  );
                }),
                (r.prototype.testAllow = function(t, e, n) {
                  return (
                    !t ||
                    (!!i.element(n) && (i.string(t) ? s.matchesUpTo(n, t, e) : !!i.element(t) && s.nodeContains(t, n)))
                  );
                }),
                (r.prototype.testIgnoreAllow = function(t, e, n) {
                  return !this.testIgnore(t.ignoreFrom, e, n) && this.testAllow(t.allowFrom, e, n);
                }),
                (r.prototype.actionChecker = function(t) {
                  return i.function(t)
                    ? ((this.options.actionChecker = t), this)
                    : null === t
                    ? (delete this.options.actionChecker, this)
                    : this.options.actionChecker;
                }),
                (r.prototype.styleCursor = function(t) {
                  return i.bool(t)
                    ? ((this.options.styleCursor = t), this)
                    : null === t
                    ? (delete this.options.styleCursor, this)
                    : this.options.styleCursor;
                }),
                (r.prototype.defaultActionChecker = function(t, e, n, r) {
                  for (
                    var i = this.getRect(r), s = e.buttons || { 0: 1, 1: 4, 3: 8, 4: 16 }[e.button], a = null, u = 0;
                    u < o.names.length;
                    u++
                  ) {
                    var c = o.names[u];
                    if (
                      (!n.pointerIsDown ||
                        !/mouse|pointer/.test(n.pointerType) ||
                        0 != (s & this.options[c].mouseButtons)) &&
                      (a = o[c].checker(t, e, this, r, n, i))
                    )
                      return a;
                  }
                });
            },
            { '../Interactable': 4, '../actions/base': 6, '../utils': 44, '../utils/domUtils': 39, '../utils/is': 46 },
          ],
          13: [
            function(t, e, n) {
              'use strict';
              var r = t('../interact'),
                o = t('../Interactable'),
                i = t('../Interaction'),
                s = t('../actions/base'),
                a = t('../defaultOptions'),
                u = t('../scope'),
                c = t('../utils'),
                l = t('../utils/Signals').new();
              t('./InteractableMethods');
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
                setActionDefaults: function(t) {
                  c.extend(t.defaults, p.defaults.perAction);
                },
                validateAction: d,
              };
              function d(t, e, n, r) {
                return c.is.object(t) &&
                  e.testIgnoreAllow(e.options[t.name], n, r) &&
                  e.options[t.name].enabled &&
                  m(e, n, t)
                  ? t
                  : null;
              }
              function f(t, e, n, r, o, i) {
                for (var s = 0, a = r.length; s < a; s++) {
                  var u = r[s],
                    c = o[s],
                    l = d(u.getAction(e, n, t, c), u, c, i);
                  if (l) return { action: l, target: u, element: c };
                }
                return {};
              }
              function h(t, e, n, r) {
                var o = [],
                  i = [],
                  s = r;
                function a(t) {
                  o.push(t), i.push(s);
                }
                for (; c.is.element(s); ) {
                  (o = []), (i = []), u.interactables.forEachMatch(s, a);
                  var l = f(t, e, n, o, i, r);
                  if (l.action && !l.target.options[l.action.name].manualStart) return l;
                  s = c.parentNode(s);
                }
                return {};
              }
              function v(t, e) {
                var n = e.action,
                  r = e.target,
                  o = e.element;
                if (
                  ((n = n || {}),
                  t.target && t.target.options.styleCursor && (t.target._doc.documentElement.style.cursor = ''),
                  (t.target = r),
                  (t.element = o),
                  c.copyAction(t.prepared, n),
                  r && r.options.styleCursor)
                ) {
                  var i = n ? s[n.name].getCursor(n) : '';
                  t.target._doc.documentElement.style.cursor = i;
                }
                l.fire('prepared', { interaction: t });
              }
              function m(t, e, n) {
                var r = t.options,
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
                      if (d.target === t) {
                        if ((a += (f === n.name) | 0) >= o) return !1;
                        if (d.element === e && (c++, f !== n.name || c >= i)) return !1;
                      }
                    }
                  }
                  return p.maxInteractions > 0;
                }
              }
              i.signals.on('down', function(t) {
                var e = t.interaction,
                  n = t.pointer,
                  r = t.event,
                  o = t.eventTarget;
                if (!e.interacting()) {
                  var i = h(e, n, r, o);
                  v(e, i);
                }
              }),
                i.signals.on('move', function(t) {
                  var e = t.interaction,
                    n = t.pointer,
                    r = t.event,
                    o = t.eventTarget;
                  if ('mouse' === e.pointerType && !e.pointerIsDown && !e.interacting()) {
                    var i = h(e, n, r, o);
                    v(e, i);
                  }
                }),
                i.signals.on('move', function(t) {
                  var e = t.interaction,
                    n = t.event;
                  if (e.pointerIsDown && !e.interacting() && e.pointerWasMoved && e.prepared.name) {
                    l.fire('before-start', t);
                    var r = e.target;
                    e.prepared.name &&
                      r &&
                      (r.options[e.prepared.name].manualStart || !m(r, e.element, e.prepared)
                        ? e.stop(n)
                        : e.start(e.prepared, r, e.element));
                  }
                }),
                i.signals.on('stop', function(t) {
                  var e = t.interaction,
                    n = e.target;
                  n && n.options.styleCursor && (n._doc.documentElement.style.cursor = '');
                }),
                (r.maxInteractions = function(t) {
                  return c.is.number(t) ? ((p.maxInteractions = t), r) : p.maxInteractions;
                }),
                o.settingsMethods.push('styleCursor'),
                o.settingsMethods.push('actionChecker'),
                o.settingsMethods.push('ignoreFrom'),
                o.settingsMethods.push('allowFrom'),
                (a.base.actionChecker = null),
                (a.base.styleCursor = !0),
                c.extend(a.perAction, p.defaults.perAction),
                (e.exports = p);
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
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('../scope'),
                i = t('../utils/is'),
                s = t('../utils/domUtils'),
                a = s.parentNode;
              r.setActionDefaults(t('../actions/drag')),
                r.signals.on('before-start', function(t) {
                  var e = t.interaction,
                    n = t.eventTarget,
                    s = t.dx,
                    u = t.dy;
                  if ('drag' === e.prepared.name) {
                    var c = Math.abs(s),
                      l = Math.abs(u),
                      p = e.target.options.drag,
                      d = p.startAxis,
                      f = c > l ? 'x' : c < l ? 'y' : 'xy';
                    if (
                      ((e.prepared.axis = 'start' === p.lockAxis ? f[0] : p.lockAxis),
                      'xy' !== f && 'xy' !== d && d !== f)
                    ) {
                      e.prepared.name = null;
                      for (
                        var h = n,
                          v = function(t) {
                            if (t !== e.target) {
                              var o = e.target.options.drag;
                              if (!o.manualStart && t.testIgnoreAllow(o, h, n)) {
                                var i = t.getAction(e.downPointer, e.downEvent, e, h);
                                if (
                                  i &&
                                  'drag' === i.name &&
                                  (function(t, e) {
                                    if (!e) return !1;
                                    var n = e.options.drag.startAxis;
                                    return 'xy' === t || 'xy' === n || n === t;
                                  })(f, t) &&
                                  r.validateAction(i, t, h, n)
                                )
                                  return t;
                              }
                            }
                          };
                        i.element(h);

                      ) {
                        var m = o.interactables.forEachMatch(h, v);
                        if (m) {
                          (e.prepared.name = 'drag'), (e.target = m), (e.element = h);
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
            function(t, e, n) {
              'use strict';
              t('./base').setActionDefaults(t('../actions/gesture'));
            },
            { '../actions/gesture': 9, './base': 13 },
          ],
          16: [
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('../Interaction');
              function i(t) {
                var e = t.prepared && t.prepared.name;
                if (!e) return null;
                var n = t.target.options;
                return n[e].hold || n[e].delay;
              }
              (r.defaults.perAction.hold = 0),
                (r.defaults.perAction.delay = 0),
                o.signals.on('new', function(t) {
                  t.autoStartHoldTimer = null;
                }),
                r.signals.on('prepared', function(t) {
                  var e = t.interaction,
                    n = i(e);
                  n > 0 &&
                    (e.autoStartHoldTimer = setTimeout(function() {
                      e.start(e.prepared, e.target, e.element);
                    }, n));
                }),
                o.signals.on('move', function(t) {
                  var e = t.interaction,
                    n = t.duplicate;
                  e.pointerWasMoved && !n && clearTimeout(e.autoStartHoldTimer);
                }),
                r.signals.on('before-start', function(t) {
                  var e = t.interaction,
                    n = i(e);
                  n > 0 && (e.prepared.name = null);
                }),
                (e.exports = { getHoldDuration: i });
            },
            { '../Interaction': 5, './base': 13 },
          ],
          17: [
            function(t, e, n) {
              'use strict';
              t('./base').setActionDefaults(t('../actions/resize'));
            },
            { '../actions/resize': 10, './base': 13 },
          ],
          18: [
            function(t, e, n) {
              'use strict';
              e.exports = {
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
            function(t, e, n) {
              'use strict';
              t('./inertia'),
                t('./modifiers/snap'),
                t('./modifiers/restrict'),
                t('./pointerEvents/base'),
                t('./pointerEvents/holdRepeat'),
                t('./pointerEvents/interactableTargets'),
                t('./autoStart/hold'),
                t('./actions/gesture'),
                t('./actions/resize'),
                t('./actions/drag'),
                t('./actions/drop'),
                t('./modifiers/snapSize'),
                t('./modifiers/restrictEdges'),
                t('./modifiers/restrictSize'),
                t('./autoStart/gesture'),
                t('./autoStart/resize'),
                t('./autoStart/drag'),
                t('./interactablePreventDefault.js'),
                t('./autoScroll'),
                (e.exports = t('./interact'));
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
            function(t, e, n) {
              'use strict';
              var r = t('./InteractEvent'),
                o = t('./Interaction'),
                i = t('./modifiers/base'),
                s = t('./utils'),
                a = t('./utils/raf');
              function u(t) {
                var e = t.inertiaStatus;
                if (e.active) {
                  var n = e.upCoords.page,
                    r = e.upCoords.client;
                  s.setCoords(t.curCoords, [
                    { pageX: n.x + e.sx, pageY: n.y + e.sy, clientX: r.x + e.sx, clientY: r.y + e.sy },
                  ]);
                }
              }
              o.signals.on('new', function(t) {
                (t.inertiaStatus = {
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
                  (t.boundInertiaFrame = function() {
                    return function() {
                      u(this), s.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);
                      var t = this.inertiaStatus,
                        e = this.target.options[this.prepared.name].inertia.resistance,
                        n = new Date().getTime() / 1e3 - t.t0;
                      if (n < t.te) {
                        var r = 1 - (Math.exp(-e * n) - t.lambda_v0) / t.one_ve_v0;
                        if (t.modifiedXe === t.xe && t.modifiedYe === t.ye) (t.sx = t.xe * r), (t.sy = t.ye * r);
                        else {
                          var o = s.getQuadraticCurvePoint(0, 0, t.xe, t.ye, t.modifiedXe, t.modifiedYe, r);
                          (t.sx = o.x), (t.sy = o.y);
                        }
                        this.doMove(), (t.i = a.request(this.boundInertiaFrame));
                      } else
                        (t.sx = t.modifiedXe),
                          (t.sy = t.modifiedYe),
                          this.doMove(),
                          this.end(t.startEvent),
                          (t.active = !1),
                          (this.simulation = null);
                      s.copyCoords(this.prevCoords, this.curCoords);
                    }.apply(t);
                  }),
                  (t.boundSmoothEndFrame = function() {
                    return function() {
                      u(this);
                      var t = this.inertiaStatus,
                        e = new Date().getTime() - t.t0,
                        n = this.target.options[this.prepared.name].inertia.smoothEndDuration;
                      e < n
                        ? ((t.sx = s.easeOutQuad(e, 0, t.xe, n)),
                          (t.sy = s.easeOutQuad(e, 0, t.ye, n)),
                          this.pointerMove(t.startEvent, t.startEvent),
                          (t.i = a.request(this.boundSmoothEndFrame)))
                        : ((t.sx = t.xe),
                          (t.sy = t.ye),
                          this.pointerMove(t.startEvent, t.startEvent),
                          this.end(t.startEvent),
                          (t.smoothEnd = t.active = !1),
                          (this.simulation = null));
                    }.apply(t);
                  });
              }),
                o.signals.on('down', function(t) {
                  var e = t.interaction,
                    n = t.event,
                    u = t.pointer,
                    c = t.eventTarget,
                    l = e.inertiaStatus;
                  if (l.active)
                    for (var p = c; s.is.element(p); ) {
                      if (p === e.element) {
                        a.cancel(l.i),
                          (l.active = !1),
                          (e.simulation = null),
                          e.updatePointer(u),
                          s.setCoords(e.curCoords, e.pointers);
                        var d = { interaction: e };
                        o.signals.fire('before-action-move', d), o.signals.fire('action-resume', d);
                        var f = new r(e, n, e.prepared.name, 'inertiaresume', e.element);
                        e.target.fire(f),
                          (e.prevEvent = f),
                          i.resetStatuses(e.modifierStatuses),
                          s.copyCoords(e.prevCoords, e.curCoords);
                        break;
                      }
                      p = s.parentNode(p);
                    }
                }),
                o.signals.on('up', function(t) {
                  var e = t.interaction,
                    n = t.event,
                    o = e.inertiaStatus;
                  if (e.interacting() && !o.active) {
                    var u = e.target,
                      c = u && u.options,
                      l = c && e.prepared.name && c[e.prepared.name].inertia,
                      p = new Date().getTime(),
                      d = {},
                      f = s.extend({}, e.curCoords.page),
                      h = e.pointerDelta.client.speed,
                      v = !1,
                      m = void 0,
                      g = l && l.enabled && 'gesture' !== e.prepared.name && n !== o.startEvent,
                      y = g && p - e.curCoords.timeStamp < 50 && h > l.minSpeed && h > l.endSpeed,
                      b = { interaction: e, pageCoords: f, statuses: d, preEnd: !0, requireEndOnly: !0 };
                    g && !y && (i.resetStatuses(d), (m = i.setAll(b)).shouldMove && m.locked && (v = !0)),
                      (y || v) &&
                        (s.copyCoords(o.upCoords, e.curCoords),
                        (e.pointers[0] = o.startEvent = new r(e, n, e.prepared.name, 'inertiastart', e.element)),
                        (o.t0 = p),
                        (o.active = !0),
                        (o.allowResume = l.allowResume),
                        (e.simulation = o),
                        u.fire(o.startEvent),
                        y
                          ? ((o.vx0 = e.pointerDelta.client.vx),
                            (o.vy0 = e.pointerDelta.client.vy),
                            (o.v0 = h),
                            (function(t, e) {
                              var n = t.target.options[t.prepared.name].inertia,
                                r = n.resistance,
                                o = -Math.log(n.endSpeed / e.v0) / r;
                              (e.x0 = t.prevEvent.pageX),
                                (e.y0 = t.prevEvent.pageY),
                                (e.t0 = e.startEvent.timeStamp / 1e3),
                                (e.sx = e.sy = 0),
                                (e.modifiedXe = e.xe = (e.vx0 - o) / r),
                                (e.modifiedYe = e.ye = (e.vy0 - o) / r),
                                (e.te = o),
                                (e.lambda_v0 = r / e.v0),
                                (e.one_ve_v0 = 1 - n.endSpeed / e.v0);
                            })(e, o),
                            s.extend(f, e.curCoords.page),
                            (f.x += o.xe),
                            (f.y += o.ye),
                            i.resetStatuses(d),
                            (m = i.setAll(b)),
                            (o.modifiedXe += m.dx),
                            (o.modifiedYe += m.dy),
                            (o.i = a.request(e.boundInertiaFrame)))
                          : ((o.smoothEnd = !0),
                            (o.xe = m.dx),
                            (o.ye = m.dy),
                            (o.sx = o.sy = 0),
                            (o.i = a.request(e.boundSmoothEndFrame))));
                  }
                }),
                o.signals.on('stop-active', function(t) {
                  var e = t.interaction,
                    n = e.inertiaStatus;
                  n.active && (a.cancel(n.i), (n.active = !1), (e.simulation = null));
                });
            },
            { './InteractEvent': 3, './Interaction': 5, './modifiers/base': 23, './utils': 44, './utils/raf': 50 },
          ],
          21: [
            function(t, e, n) {
              'use strict';
              var r = t('./utils/browser'),
                o = t('./utils/events'),
                i = t('./utils'),
                s = t('./scope'),
                a = t('./Interactable'),
                u = t('./Interaction'),
                c = {};
              function l(t, e) {
                var n = s.interactables.get(t, e);
                return n || ((n = new a(t, e)).events.global = c), n;
              }
              (l.isSet = function(t, e) {
                return -1 !== s.interactables.indexOfElement(t, e && e.context);
              }),
                (l.on = function(t, e, n) {
                  if ((i.is.string(t) && -1 !== t.search(' ') && (t = t.trim().split(/ +/)), i.is.array(t))) {
                    for (var r = 0; r < t.length; r++) {
                      var u = t[r];
                      l.on(u, e, n);
                    }
                    return l;
                  }
                  if (i.is.object(t)) {
                    for (var p in t) l.on(p, t[p], e);
                    return l;
                  }
                  return (
                    i.contains(a.eventTypes, t)
                      ? c[t]
                        ? c[t].push(e)
                        : (c[t] = [e])
                      : o.add(s.document, t, e, { options: n }),
                    l
                  );
                }),
                (l.off = function(t, e, n) {
                  if ((i.is.string(t) && -1 !== t.search(' ') && (t = t.trim().split(/ +/)), i.is.array(t))) {
                    for (var r = 0; r < t.length; r++) {
                      var u = t[r];
                      l.off(u, e, n);
                    }
                    return l;
                  }
                  if (i.is.object(t)) {
                    for (var p in t) l.off(p, t[p], e);
                    return l;
                  }
                  if (i.contains(a.eventTypes, t)) {
                    var d = void 0;
                    t in c && -1 !== (d = c[t].indexOf(e)) && c[t].splice(d, 1);
                  } else o.remove(s.document, t, e, n);
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
                (l.stop = function(t) {
                  for (var e = s.interactions.length - 1; e >= 0; e--) s.interactions[e].stop(t);
                  return l;
                }),
                (l.pointerMoveTolerance = function(t) {
                  return i.is.number(t) ? ((u.pointerMoveTolerance = t), l) : u.pointerMoveTolerance;
                }),
                (l.addDocument = s.addDocument),
                (l.removeDocument = s.removeDocument),
                (s.interact = l),
                (e.exports = l);
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
            function(t, e, n) {
              'use strict';
              var r = t('./Interactable'),
                o = t('./Interaction'),
                i = t('./scope'),
                s = t('./utils/is'),
                a = t('./utils/events'),
                u = t('./utils/browser'),
                c = t('./utils/domUtils'),
                l = c.nodeContains,
                p = c.matchesSelector;
              function d(t) {
                var e = t.interaction,
                  n = t.event;
                e.target && e.target.checkAndPreventDefault(n);
              }
              (r.prototype.preventDefault = function(t) {
                return /^(always|never|auto)$/.test(t)
                  ? ((this.options.preventDefault = t), this)
                  : s.bool(t)
                  ? ((this.options.preventDefault = t ? 'always' : 'never'), this)
                  : this.options.preventDefault;
              }),
                (r.prototype.checkAndPreventDefault = function(t) {
                  var e = this.options.preventDefault;
                  'never' !== e &&
                    (('always' !== e &&
                      ((a.supportsPassive && /^touch(start|move)$/.test(t.type) && !u.isIOS) ||
                        /^(mouse|pointer|touch)*(down|start)/i.test(t.type) ||
                        (s.element(t.target) &&
                          p(t.target, 'input,select,textarea,[contenteditable=true],[contenteditable=true] *')))) ||
                      t.preventDefault());
                });
              for (var f = ['down', 'move', 'up', 'cancel'], h = 0; h < f.length; h++) {
                var v = f[h];
                o.signals.on(v, d);
              }
              o.docEvents.dragstart = function(t) {
                for (var e = 0; e < i.interactions.length; e++) {
                  var n = i.interactions[e];
                  if (n.element && (n.element === t.target || l(n.element, t.target)))
                    return void n.target.checkAndPreventDefault(t);
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
            function(t, e, n) {
              'use strict';
              var r = t('../InteractEvent'),
                o = t('../Interaction'),
                i = t('../utils/extend'),
                s = {
                  names: [],
                  setOffsets: function(t) {
                    var e = t.interaction,
                      n = t.pageCoords,
                      r = e.target,
                      o = e.element,
                      i = e.startOffset,
                      a = r.getRect(o);
                    a
                      ? ((i.left = n.x - a.left),
                        (i.top = n.y - a.top),
                        (i.right = a.right - n.x),
                        (i.bottom = a.bottom - n.y),
                        'width' in a || (a.width = a.right - a.left),
                        'height' in a || (a.height = a.bottom - a.top))
                      : (i.left = i.top = i.right = i.bottom = 0),
                      (t.rect = a),
                      (t.interactable = r),
                      (t.element = o);
                    for (var u = 0; u < s.names.length; u++) {
                      var c = s.names[u];
                      (t.options = r.options[e.prepared.name][c]),
                        t.options && (e.modifierOffsets[c] = s[c].setOffset(t));
                    }
                  },
                  setAll: function(t) {
                    var e = t.interaction,
                      n = t.statuses,
                      r = t.preEnd,
                      o = t.requireEndOnly,
                      u = { dx: 0, dy: 0, changed: !1, locked: !1, shouldMove: !0 };
                    t.modifiedCoords = i({}, t.pageCoords);
                    for (var c = 0; c < s.names.length; c++) {
                      var l = s.names[c],
                        p = s[l],
                        d = e.target.options[e.prepared.name][l];
                      a(d, r, o) &&
                        ((t.status = t.status = n[l]),
                        (t.options = d),
                        (t.offset = t.interaction.modifierOffsets[l]),
                        p.set(t),
                        t.status.locked &&
                          ((t.modifiedCoords.x += t.status.dx),
                          (t.modifiedCoords.y += t.status.dy),
                          (u.dx += t.status.dx),
                          (u.dy += t.status.dy),
                          (u.locked = !0)));
                    }
                    return (u.shouldMove = !t.status || !u.locked || t.status.changed), u;
                  },
                  resetStatuses: function(t) {
                    for (var e = 0; e < s.names.length; e++) {
                      var n = s.names[e],
                        r = t[n] || {};
                      (r.dx = r.dy = 0),
                        (r.modifiedX = r.modifiedY = NaN),
                        (r.locked = !1),
                        (r.changed = !0),
                        (t[n] = r);
                    }
                    return t;
                  },
                  start: function(t, e) {
                    var n = t.interaction,
                      r = {
                        interaction: n,
                        pageCoords: ('action-resume' === e ? n.curCoords : n.startCoords).page,
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
                  beforeMove: function(t) {
                    var e = t.interaction,
                      n = t.preEnd,
                      r = t.interactingBeforeMove,
                      o = s.setAll({
                        interaction: e,
                        preEnd: n,
                        pageCoords: e.curCoords.page,
                        statuses: e.modifierStatuses,
                        requireEndOnly: !1,
                      });
                    !o.shouldMove && r && (e._dontFireMove = !0), (e.modifierResult = o);
                  },
                  end: function(t) {
                    for (var e = t.interaction, n = t.event, r = 0; r < s.names.length; r++) {
                      var o = s.names[r],
                        i = e.target.options[e.prepared.name][o];
                      if (a(i, !0, !0)) {
                        e.doMove({ event: n, preEnd: !0 });
                        break;
                      }
                    }
                  },
                  setXY: function(t) {
                    for (var e = t.iEvent, n = t.interaction, r = i({}, t), o = 0; o < s.names.length; o++) {
                      var a = s.names[o];
                      if (((r.options = n.target.options[n.prepared.name][a]), r.options)) {
                        var u = s[a];
                        (r.status = n.modifierStatuses[a]), (e[a] = u.modifyCoords(r));
                      }
                    }
                  },
                };
              function a(t, e, n) {
                return t && t.enabled && (e || !t.endOnly) && (!n || t.endOnly);
              }
              o.signals.on('new', function(t) {
                (t.startOffset = { left: 0, right: 0, top: 0, bottom: 0 }),
                  (t.modifierOffsets = {}),
                  (t.modifierStatuses = s.resetStatuses({})),
                  (t.modifierResult = null);
              }),
                o.signals.on('action-start', s.start),
                o.signals.on('action-resume', s.start),
                o.signals.on('before-action-move', s.beforeMove),
                o.signals.on('action-end', s.end),
                r.signals.on('set-xy', s.setXY),
                (e.exports = s);
            },
            { '../InteractEvent': 3, '../Interaction': 5, '../utils/extend': 41 },
          ],
          24: [
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('../utils'),
                i = t('../defaultOptions'),
                s = {
                  defaults: { enabled: !1, endOnly: !1, restriction: null, elementRect: null },
                  setOffset: function(t) {
                    var e = t.rect,
                      n = t.startOffset,
                      r = t.options,
                      o = r && r.elementRect,
                      i = {};
                    return (
                      e && o
                        ? ((i.left = n.left - e.width * o.left),
                          (i.top = n.top - e.height * o.top),
                          (i.right = n.right - e.width * (1 - o.right)),
                          (i.bottom = n.bottom - e.height * (1 - o.bottom)))
                        : (i.left = i.top = i.right = i.bottom = 0),
                      i
                    );
                  },
                  set: function(t) {
                    var e = t.modifiedCoords,
                      n = t.interaction,
                      r = t.status,
                      i = t.options;
                    if (!i) return r;
                    var s = r.useStatusXY ? { x: r.x, y: r.y } : o.extend({}, e),
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
                  modifyCoords: function(t) {
                    var e = t.page,
                      n = t.client,
                      r = t.status,
                      o = t.phase,
                      i = t.options,
                      s = i && i.elementRect;
                    if (i && i.enabled && ('start' !== o || !s || !r.locked) && r.locked)
                      return (e.x += r.dx), (e.y += r.dy), (n.x += r.dx), (n.y += r.dy), { dx: r.dx, dy: r.dy };
                  },
                  getRestrictionRect: a,
                };
              function a(t, e, n) {
                return o.is.function(t)
                  ? o.resolveRectLike(t, e.target, e.element, [n.x, n.y, e])
                  : o.resolveRectLike(t, e.target, e.element);
              }
              (r.restrict = s), r.names.push('restrict'), (i.perAction.restrict = s.defaults), (e.exports = s);
            },
            { '../defaultOptions': 18, '../utils': 44, './base': 23 },
          ],
          25: [
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('../utils'),
                i = t('../utils/rect'),
                s = t('../defaultOptions'),
                a = t('../actions/resize'),
                u = t('./restrict'),
                c = u.getRestrictionRect,
                l = { top: 1 / 0, left: 1 / 0, bottom: -1 / 0, right: -1 / 0 },
                p = { top: -1 / 0, left: -1 / 0, bottom: 1 / 0, right: 1 / 0 },
                d = {
                  defaults: { enabled: !1, endOnly: !1, min: null, max: null, offset: null },
                  setOffset: function(t) {
                    var e = t.interaction,
                      n = t.startOffset,
                      r = t.options;
                    if (!r) return o.extend({}, n);
                    var i = c(r.offset, e, e.startCoords.page);
                    return i
                      ? { top: n.top + i.y, left: n.left + i.x, bottom: n.bottom + i.y, right: n.right + i.x }
                      : n;
                  },
                  set: function(t) {
                    var e = t.modifiedCoords,
                      n = t.interaction,
                      r = t.status,
                      s = t.offset,
                      a = t.options,
                      u = n.prepared.linkedEdges || n.prepared.edges;
                    if (n.interacting() && u) {
                      var d = r.useStatusXY ? { x: r.x, y: r.y } : o.extend({}, e),
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
                  modifyCoords: function(t) {
                    var e = t.page,
                      n = t.client,
                      r = t.status,
                      o = t.phase,
                      i = t.options;
                    if (i && i.enabled && ('start' !== o || !r.locked) && r.locked)
                      return (e.x += r.dx), (e.y += r.dy), (n.x += r.dx), (n.y += r.dy), { dx: r.dx, dy: r.dy };
                  },
                  noInner: l,
                  noOuter: p,
                  getRestrictionRect: c,
                };
              (r.restrictEdges = d),
                r.names.push('restrictEdges'),
                (s.perAction.restrictEdges = d.defaults),
                (a.defaults.restrictEdges = d.defaults),
                (e.exports = d);
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
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('./restrictEdges'),
                i = t('../utils'),
                s = t('../utils/rect'),
                a = t('../defaultOptions'),
                u = t('../actions/resize'),
                c = { width: -1 / 0, height: -1 / 0 },
                l = { width: 1 / 0, height: 1 / 0 },
                p = {
                  defaults: { enabled: !1, endOnly: !1, min: null, max: null },
                  setOffset: function(t) {
                    var e = t.interaction;
                    return e.startOffset;
                  },
                  set: function(t) {
                    var e = t.interaction,
                      n = t.options,
                      r = e.prepared.linkedEdges || e.prepared.edges;
                    if (e.interacting() && r) {
                      var a = s.xywhToTlbr(e.resizeRects.inverted),
                        u = s.tlbrToXywh(o.getRestrictionRect(n.min, e)) || c,
                        p = s.tlbrToXywh(o.getRestrictionRect(n.max, e)) || l;
                      (t.options = {
                        enabled: n.enabled,
                        endOnly: n.endOnly,
                        inner: i.extend({}, o.noInner),
                        outer: i.extend({}, o.noOuter),
                      }),
                        r.top
                          ? ((t.options.inner.top = a.bottom - u.height), (t.options.outer.top = a.bottom - p.height))
                          : r.bottom &&
                            ((t.options.inner.bottom = a.top + u.height), (t.options.outer.bottom = a.top + p.height)),
                        r.left
                          ? ((t.options.inner.left = a.right - u.width), (t.options.outer.left = a.right - p.width))
                          : r.right &&
                            ((t.options.inner.right = a.left + u.width), (t.options.outer.right = a.left + p.width)),
                        o.set(t);
                    }
                  },
                  modifyCoords: o.modifyCoords,
                };
              (r.restrictSize = p),
                r.names.push('restrictSize'),
                (a.perAction.restrictSize = p.defaults),
                (u.defaults.restrictSize = p.defaults),
                (e.exports = p);
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
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('../interact'),
                i = t('../utils'),
                s = t('../defaultOptions'),
                a = {
                  defaults: {
                    enabled: !1,
                    endOnly: !1,
                    range: 1 / 0,
                    targets: null,
                    offsets: null,
                    relativePoints: null,
                  },
                  setOffset: function(t) {
                    var e = t.interaction,
                      n = t.interactable,
                      r = t.element,
                      o = t.rect,
                      s = t.startOffset,
                      a = t.options,
                      u = [],
                      c = i.rectToXY(i.resolveRectLike(a.origin)),
                      l = c || i.getOriginXY(n, r, e.prepared.name);
                    a = a || n.options[e.prepared.name].snap || {};
                    var p = void 0;
                    if ('startCoords' === a.offset)
                      p = { x: e.startCoords.page.x - l.x, y: e.startCoords.page.y - l.y };
                    else {
                      var d = i.resolveRectLike(a.offset, n, r, [e]);
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
                  set: function(t) {
                    var e = t.interaction,
                      n = t.modifiedCoords,
                      r = t.status,
                      o = t.options,
                      s = t.offset,
                      a = [],
                      u = void 0,
                      c = void 0,
                      l = void 0;
                    if (r.useStatusXY) c = { x: r.x, y: r.y };
                    else {
                      var p = i.getOriginXY(e.target, e.element, e.prepared.name);
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
                        (u = i.is.function(x) ? x(g, y, e) : x) &&
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
                        O = S <= E;
                      E === 1 / 0 && w.inRange && w.range !== 1 / 0 && (O = !1),
                        (w.target &&
                          !(O
                            ? w.inRange && E !== 1 / 0
                              ? S / E < w.distance / w.range
                              : (E === 1 / 0 && w.range !== 1 / 0) || S < w.distance
                            : !w.inRange && S < w.distance)) ||
                          ((w.target = u),
                          (w.distance = S),
                          (w.range = E),
                          (w.inRange = O),
                          (w.dx = T),
                          (w.dy = C),
                          (r.range = E));
                    }
                    var I = void 0;
                    w.target
                      ? ((I = r.modifiedX !== w.target.x || r.modifiedY !== w.target.y),
                        (r.modifiedX = w.target.x),
                        (r.modifiedY = w.target.y))
                      : ((I = !0), (r.modifiedX = NaN), (r.modifiedY = NaN)),
                      (r.dx = w.dx),
                      (r.dy = w.dy),
                      (r.changed = I || (w.inRange && !r.locked)),
                      (r.locked = w.inRange);
                  },
                  modifyCoords: function(t) {
                    var e = t.page,
                      n = t.client,
                      r = t.status,
                      o = t.phase,
                      i = t.options,
                      s = i && i.relativePoints;
                    if (i && i.enabled && ('start' !== o || !s || !s.length))
                      return (
                        r.locked && ((e.x += r.dx), (e.y += r.dy), (n.x += r.dx), (n.y += r.dy)),
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
              (o.createSnapGrid = function(t) {
                return function(e, n) {
                  var r = t.limits || { left: -1 / 0, right: 1 / 0, top: -1 / 0, bottom: 1 / 0 },
                    o = 0,
                    s = 0;
                  i.is.object(t.offset) && ((o = t.offset.x), (s = t.offset.y));
                  var a = Math.round((e - o) / t.x),
                    u = Math.round((n - s) / t.y),
                    c = Math.max(r.left, Math.min(r.right, a * t.x + o)),
                    l = Math.max(r.top, Math.min(r.bottom, u * t.y + s));
                  return { x: c, y: l, range: t.range };
                };
              }),
                (r.snap = a),
                r.names.push('snap'),
                (s.perAction.snap = a.defaults),
                (e.exports = a);
            },
            { '../defaultOptions': 18, '../interact': 21, '../utils': 44, './base': 23 },
          ],
          28: [
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('./snap'),
                i = t('../defaultOptions'),
                s = t('../actions/resize'),
                a = t('../utils/'),
                u = {
                  defaults: { enabled: !1, endOnly: !1, range: 1 / 0, targets: null, offsets: null },
                  setOffset: function(t) {
                    var e = t.interaction,
                      n = t.options,
                      r = e.prepared.edges;
                    if (r) {
                      t.options = {
                        relativePoints: [{ x: r.left ? 0 : 1, y: r.top ? 0 : 1 }],
                        origin: { x: 0, y: 0 },
                        offset: 'self',
                        range: n.range,
                      };
                      var i = o.setOffset(t);
                      return (t.options = n), i;
                    }
                  },
                  set: function(t) {
                    var e = t.interaction,
                      n = t.options,
                      r = t.offset,
                      i = t.modifiedCoords,
                      s = a.extend({}, i),
                      u = s.x - r[0].x,
                      c = s.y - r[0].y;
                    (t.options = a.extend({}, n)), (t.options.targets = []);
                    for (var l = 0; l < (n.targets || []).length; l++) {
                      var p = (n.targets || [])[l],
                        d = void 0;
                      (d = a.is.function(p) ? p(u, c, e) : p) &&
                        ('width' in d && 'height' in d && ((d.x = d.width), (d.y = d.height)),
                        t.options.targets.push(d));
                    }
                    o.set(t);
                  },
                  modifyCoords: function(t) {
                    var e = t.options;
                    (t.options = a.extend({}, e)),
                      (t.options.enabled = e.enabled),
                      (t.options.relativePoints = [null]),
                      o.modifyCoords(t);
                  },
                };
              (r.snapSize = u),
                r.names.push('snapSize'),
                (i.perAction.snapSize = u.defaults),
                (s.defaults.snapSize = u.defaults),
                (e.exports = u);
            },
            { '../actions/resize': 10, '../defaultOptions': 18, '../utils/': 44, './base': 23, './snap': 27 },
          ],
          29: [
            function(t, e, n) {
              'use strict';
              var r = t('../utils/pointerUtils');
              e.exports = (function() {
                function t(e, n, o, i, s) {
                  if (
                    ((function(t, e) {
                      if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                    })(this, t),
                    r.pointerExtend(this, o),
                    o !== n && r.pointerExtend(this, n),
                    (this.interaction = s),
                    (this.timeStamp = new Date().getTime()),
                    (this.originalEvent = o),
                    (this.type = e),
                    (this.pointerId = r.getPointerId(n)),
                    (this.pointerType = r.getPointerType(n)),
                    (this.target = i),
                    (this.currentTarget = null),
                    'tap' === e)
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
                  } else 'doubletap' === e && (this.dt = n.timeStamp - s.tapTime);
                }
                return (
                  (t.prototype.subtractOrigin = function(t) {
                    var e = t.x,
                      n = t.y;
                    return (this.pageX -= e), (this.pageY -= n), (this.clientX -= e), (this.clientY -= n), this;
                  }),
                  (t.prototype.addOrigin = function(t) {
                    var e = t.x,
                      n = t.y;
                    return (this.pageX += e), (this.pageY += n), (this.clientX += e), (this.clientY += n), this;
                  }),
                  (t.prototype.preventDefault = function() {
                    this.originalEvent.preventDefault();
                  }),
                  (t.prototype.stopPropagation = function() {
                    this.propagationStopped = !0;
                  }),
                  (t.prototype.stopImmediatePropagation = function() {
                    this.immediatePropagationStopped = this.propagationStopped = !0;
                  }),
                  t
                );
              })();
            },
            { '../utils/pointerUtils': 49 },
          ],
          30: [
            function(t, e, n) {
              'use strict';
              var r = t('./PointerEvent'),
                o = t('../Interaction'),
                i = t('../utils'),
                s = t('../defaultOptions'),
                a = t('../utils/Signals').new(),
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
              function p(t) {
                for (
                  var e = t.interaction,
                    n = t.pointer,
                    o = t.event,
                    s = t.eventTarget,
                    u = t.type,
                    c = void 0 === u ? t.pointerEvent.type : u,
                    l = t.targets,
                    f = void 0 === l ? d(t) : l,
                    h = t.pointerEvent,
                    v = void 0 === h ? new r(c, n, o, s, e) : h,
                    m = { interaction: e, pointer: n, event: o, eventTarget: s, targets: f, type: c, pointerEvent: v },
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
                  var w = v.double ? p({ interaction: e, pointer: n, event: o, eventTarget: s, type: 'doubletap' }) : v;
                  (e.prevTap = w), (e.tapTime = w.timeStamp);
                }
                return v;
              }
              function d(t) {
                var e = t.interaction,
                  n = t.pointer,
                  r = t.event,
                  o = t.eventTarget,
                  s = t.type,
                  u = e.getPointerIndex(n);
                if ('tap' === s && (e.pointerWasMoved || !e.downTargets[u] || e.downTargets[u] !== o)) return [];
                for (
                  var c = i.getPath(o),
                    l = {
                      interaction: e,
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
                    (l.targets = l.targets.filter(function(t) {
                      return t.eventable.options.holdDuration === e.holdTimers[u].duration;
                    })),
                  l.targets
                );
              }
              o.signals.on('update-pointer-down', function(t) {
                var e = t.interaction,
                  n = t.pointerIndex;
                e.holdTimers[n] = { duration: 1 / 0, timeout: null };
              }),
                o.signals.on('remove-pointer', function(t) {
                  var e = t.interaction,
                    n = t.pointerIndex;
                  e.holdTimers.splice(n, 1);
                }),
                o.signals.on('move', function(t) {
                  var e = t.interaction,
                    n = t.pointer,
                    r = t.event,
                    o = t.eventTarget,
                    i = t.duplicateMove,
                    s = e.getPointerIndex(n);
                  i ||
                    (e.pointerIsDown && !e.pointerWasMoved) ||
                    (e.pointerIsDown && clearTimeout(e.holdTimers[s].timeout),
                    p({ interaction: e, pointer: n, event: r, eventTarget: o, type: 'move' }));
                }),
                o.signals.on('down', function(t) {
                  for (
                    var e = t.interaction,
                      n = t.pointer,
                      r = t.event,
                      o = t.eventTarget,
                      s = t.pointerIndex,
                      u = e.holdTimers[s],
                      c = i.getPath(o),
                      l = {
                        interaction: e,
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
                        p({ interaction: e, eventTarget: o, pointer: n, event: r, type: 'hold' });
                      }, h));
                  }
                }),
                o.signals.on('up', function(t) {
                  var e = t.interaction,
                    n = t.pointer,
                    r = t.event,
                    o = t.eventTarget;
                  e.pointerWasMoved || p({ interaction: e, eventTarget: o, pointer: n, event: r, type: 'tap' });
                });
              for (var f = ['up', 'cancel'], h = 0; h < f.length; h++) {
                var v = f[h];
                o.signals.on(v, function(t) {
                  var e = t.interaction,
                    n = t.pointerIndex;
                  e.holdTimers[n] && clearTimeout(e.holdTimers[n].timeout);
                });
              }
              function m(t) {
                return function(e) {
                  var n = e.interaction,
                    r = e.pointer,
                    o = e.event,
                    i = e.eventTarget;
                  p({ interaction: n, eventTarget: i, pointer: r, event: o, type: t });
                };
              }
              for (var g = 0; g < u.length; g++) o.signals.on(u[g], m(c[g]));
              o.signals.on('new', function(t) {
                (t.prevTap = null), (t.tapTime = 0), (t.holdTimers = []);
              }),
                (s.pointerEvents = l.defaults),
                (e.exports = l);
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
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('../Interaction');
              r.signals.on('new', u), r.signals.on('fired', c);
              for (var i = ['move', 'up', 'cancel', 'endall'], s = 0; s < i.length; s++) {
                var a = i[s];
                o.signals.on(a, l);
              }
              function u(t) {
                var e = t.pointerEvent;
                'hold' === e.type && (e.count = (e.count || 0) + 1);
              }
              function c(t) {
                var e = t.interaction,
                  n = t.pointerEvent,
                  o = t.eventTarget,
                  i = t.targets;
                if ('hold' === n.type && i.length) {
                  var s = i[0].eventable.options.holdRepeatInterval;
                  s <= 0 ||
                    (e.holdIntervalHandle = setTimeout(function() {
                      r.fire({ interaction: e, eventTarget: o, type: 'hold', pointer: n, event: n });
                    }, s));
                }
              }
              function l(t) {
                var e = t.interaction;
                e.holdIntervalHandle && (clearInterval(e.holdIntervalHandle), (e.holdIntervalHandle = null));
              }
              (r.defaults.holdRepeatInterval = 0),
                r.types.push('holdrepeat'),
                (e.exports = { onNew: u, onFired: c, endHoldRepeat: l });
            },
            { '../Interaction': 5, './base': 30 },
          ],
          32: [
            function(t, e, n) {
              'use strict';
              var r = t('./base'),
                o = t('../Interactable'),
                i = t('../utils/is'),
                s = t('../scope'),
                a = t('../utils/extend'),
                u = t('../utils/arr'),
                c = u.merge;
              r.signals.on('collect-targets', function(t) {
                var e = t.targets,
                  n = t.element,
                  r = t.type,
                  o = t.eventTarget;
                s.interactables.forEachMatch(n, function(t) {
                  var s = t.events,
                    a = s.options;
                  s[r] &&
                    i.element(n) &&
                    t.testIgnoreAllow(a, n, o) &&
                    e.push({ element: n, eventable: s, props: { interactable: t } });
                });
              }),
                o.signals.on('new', function(t) {
                  var e = t.interactable;
                  e.events.getRect = function(t) {
                    return e.getRect(t);
                  };
                }),
                o.signals.on('set', function(t) {
                  var e = t.interactable,
                    n = t.options;
                  a(e.events.options, r.defaults), a(e.events.options, n);
                }),
                c(o.eventTypes, r.types),
                (o.prototype.pointerEvents = function(t) {
                  return a(this.events.options, t), this;
                });
              var l = o.prototype._backCompatOption;
              (o.prototype._backCompatOption = function(t, e) {
                var n = l.call(this, t, e);
                return n === this && (this.events.options[t] = e), n;
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
            function(t, e, n) {
              'use strict';
              var r = t('./utils'),
                o = t('./utils/events'),
                i = t('./utils/Signals').new(),
                s = t('./utils/window'),
                a = s.getWindow,
                u = {
                  signals: i,
                  events: o,
                  utils: r,
                  document: t('./utils/domObjects').document,
                  documents: [],
                  addDocument: function(t, e) {
                    if (r.contains(u.documents, t)) return !1;
                    (e = e || a(t)),
                      u.documents.push(t),
                      o.documents.push(t),
                      t !== u.document && o.add(e, 'unload', u.onWindowUnload),
                      i.fire('add-document', { doc: t, win: e });
                  },
                  removeDocument: function(t, e) {
                    var n = u.documents.indexOf(t);
                    (e = e || a(t)),
                      o.remove(e, 'unload', u.onWindowUnload),
                      u.documents.splice(n, 1),
                      o.documents.splice(n, 1),
                      i.fire('remove-document', { win: e, doc: t });
                  },
                  onWindowUnload: function() {
                    u.removeDocument(this.document, this);
                  },
                };
              e.exports = u;
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
            function(t, e, n) {
              'use strict';
              var r = (function() {
                function t() {
                  !(function(t, e) {
                    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                  })(this, t),
                    (this.listeners = {});
                }
                return (
                  (t.prototype.on = function(t, e) {
                    this.listeners[t] ? this.listeners[t].push(e) : (this.listeners[t] = [e]);
                  }),
                  (t.prototype.off = function(t, e) {
                    if (this.listeners[t]) {
                      var n = this.listeners[t].indexOf(e);
                      -1 !== n && this.listeners[t].splice(n, 1);
                    }
                  }),
                  (t.prototype.fire = function(t, e) {
                    var n = this.listeners[t];
                    if (n)
                      for (var r = 0; r < n.length; r++) {
                        var o = n[r];
                        if (!1 === o(e, t)) return;
                      }
                  }),
                  t
                );
              })();
              (r.new = function() {
                return new r();
              }),
                (e.exports = r);
            },
            {},
          ],
          35: [
            function(t, e, n) {
              'use strict';
              e.exports = {
                contains: function(t, e) {
                  return -1 !== t.indexOf(e);
                },
                merge: function(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    t.push(r);
                  }
                  return t;
                },
              };
            },
            {},
          ],
          36: [
            function(t, e, n) {
              'use strict';
              var r = t('./window'),
                o = r.window,
                i = t('./is'),
                s = t('./domObjects'),
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
                (e.exports = c);
            },
            { './domObjects': 38, './is': 46, './window': 52 },
          ],
          37: [
            function(t, e, n) {
              'use strict';
              var r = t('./is');
              e.exports = function t(e) {
                var n = {};
                for (var o in e) r.plainObject(e[o]) ? (n[o] = t(e[o])) : (n[o] = e[o]);
                return n;
              };
            },
            { './is': 46 },
          ],
          38: [
            function(t, e, n) {
              'use strict';
              var r = {},
                o = t('./window').window;
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
                (e.exports = r);
            },
            { './window': 52 },
          ],
          39: [
            function(t, e, n) {
              'use strict';
              var r = t('./window'),
                o = t('./browser'),
                i = t('./is'),
                s = t('./domObjects'),
                a = {
                  nodeContains: function(t, e) {
                    for (; e; ) {
                      if (e === t) return !0;
                      e = e.parentNode;
                    }
                    return !1;
                  },
                  closest: function(t, e) {
                    for (; i.element(t); ) {
                      if (a.matchesSelector(t, e)) return t;
                      t = a.parentNode(t);
                    }
                    return null;
                  },
                  parentNode: function(t) {
                    var e = t.parentNode;
                    if (i.docFrag(e)) {
                      for (; (e = e.host) && i.docFrag(e); );
                      return e;
                    }
                    return e;
                  },
                  matchesSelector: function(t, e) {
                    return (
                      r.window !== r.realWindow && (e = e.replace(/\/deep\//g, ' ')), t[o.prefixedMatchesSelector](e)
                    );
                  },
                  indexOfDeepestElement: function(t) {
                    var e = [],
                      n = [],
                      r = void 0,
                      o = t[0],
                      i = o ? 0 : -1,
                      a = void 0,
                      u = void 0,
                      c = void 0,
                      l = void 0;
                    for (c = 1; c < t.length; c++)
                      if ((r = t[c]) && r !== o)
                        if (o) {
                          if (r.parentNode !== r.ownerDocument)
                            if (o.parentNode !== r.ownerDocument) {
                              if (!e.length)
                                for (a = o; a.parentNode && a.parentNode !== a.ownerDocument; )
                                  e.unshift(a), (a = a.parentNode);
                              if (
                                o instanceof s.HTMLElement &&
                                r instanceof s.SVGElement &&
                                !(r instanceof s.SVGSVGElement)
                              ) {
                                if (r === o.parentNode) continue;
                                a = r.ownerSVGElement;
                              } else a = r;
                              for (n = []; a.parentNode !== a.ownerDocument; ) n.unshift(a), (a = a.parentNode);
                              for (l = 0; n[l] && n[l] === e[l]; ) l++;
                              var p = [n[l - 1], n[l], e[l]];
                              for (u = p[0].lastChild; u; ) {
                                if (u === p[1]) {
                                  (o = r), (i = c), (e = []);
                                  break;
                                }
                                if (u === p[2]) break;
                                u = u.previousSibling;
                              }
                            } else (o = r), (i = c);
                        } else (o = r), (i = c);
                    return i;
                  },
                  matchesUpTo: function(t, e, n) {
                    for (; i.element(t); ) {
                      if (a.matchesSelector(t, e)) return !0;
                      if ((t = a.parentNode(t)) === n) return a.matchesSelector(t, e);
                    }
                    return !1;
                  },
                  getActualElement: function(t) {
                    return t instanceof s.SVGElementInstance ? t.correspondingUseElement : t;
                  },
                  getScrollXY: function(t) {
                    return {
                      x: (t = t || r.window).scrollX || t.document.documentElement.scrollLeft,
                      y: t.scrollY || t.document.documentElement.scrollTop,
                    };
                  },
                  getElementClientRect: function(t) {
                    var e = t instanceof s.SVGElement ? t.getBoundingClientRect() : t.getClientRects()[0];
                    return (
                      e && {
                        left: e.left,
                        right: e.right,
                        top: e.top,
                        bottom: e.bottom,
                        width: e.width || e.right - e.left,
                        height: e.height || e.bottom - e.top,
                      }
                    );
                  },
                  getElementRect: function(t) {
                    var e = a.getElementClientRect(t);
                    if (!o.isIOS7 && e) {
                      var n = a.getScrollXY(r.getWindow(t));
                      (e.left += n.x), (e.right += n.x), (e.top += n.y), (e.bottom += n.y);
                    }
                    return e;
                  },
                  getPath: function(t) {
                    for (var e = []; t; ) e.push(t), (t = a.parentNode(t));
                    return e;
                  },
                  trySelector: function(t) {
                    return !!i.string(t) && (s.document.querySelector(t), !0);
                  },
                };
              e.exports = a;
            },
            { './browser': 36, './domObjects': 38, './is': 46, './window': 52 },
          ],
          40: [
            function(t, e, n) {
              'use strict';
              var r,
                o = t('./is'),
                i = t('./domUtils'),
                s = t('./pointerUtils'),
                a = t('./pointerExtend'),
                u = t('./window'),
                c = u.window,
                l = t('./arr'),
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
              function g(t, e, n, r) {
                var o = E(r),
                  i = d.indexOf(t),
                  s = f[i];
                s || ((s = { events: {}, typeCount: 0 }), (i = d.push(t) - 1), f.push(s)),
                  s.events[e] || ((s.events[e] = []), s.typeCount++),
                  p(s.events[e], n) || (t.addEventListener(e, n, m ? o : !!o.capture), s.events[e].push(n));
              }
              function y(t, e, n, r) {
                var o = E(r),
                  i = d.indexOf(t),
                  s = f[i];
                if (s && s.events)
                  if ('all' !== e) {
                    if (s.events[e]) {
                      var a = s.events[e].length;
                      if ('all' === n) {
                        for (var u = 0; u < a; u++) y(t, e, s.events[e][u], o);
                        return;
                      }
                      for (var c = 0; c < a; c++)
                        if (s.events[e][c] === n) {
                          t.removeEventListener('on' + e, n, m ? o : !!o.capture), s.events[e].splice(c, 1);
                          break;
                        }
                      s.events[e] && 0 === s.events[e].length && ((s.events[e] = null), s.typeCount--);
                    }
                    s.typeCount || (f.splice(i, 1), d.splice(i, 1));
                  } else for (e in s.events) s.events.hasOwnProperty(e) && y(t, e, 'all');
              }
              function b(t, e) {
                var n = E(e),
                  r = {},
                  u = h[t.type],
                  c = s.getEventTargets(t),
                  l = c[0],
                  p = l;
                for (a(r, t), r.originalEvent = t, r.preventDefault = w; o.element(p); ) {
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
              function x(t) {
                return b.call(this, t, !0);
              }
              function w() {
                this.originalEvent.preventDefault();
              }
              function E(t) {
                return o.object(t) ? t : { capture: t };
              }
              e.exports = {
                add: g,
                remove: y,
                addDelegate: function(t, e, n, r, o) {
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
                  for (c = u.selectors.length - 1; c >= 0 && (u.selectors[c] !== t || u.contexts[c] !== e); c--);
                  -1 === c && ((c = u.selectors.length), u.selectors.push(t), u.contexts.push(e), u.listeners.push([])),
                    u.listeners[c].push([r, !!i.capture, i.passive]);
                },
                removeDelegate: function(t, e, n, r, o) {
                  var i = E(o),
                    s = h[n],
                    a = !1,
                    u = void 0;
                  if (s)
                    for (u = s.selectors.length - 1; u >= 0; u--)
                      if (s.selectors[u] === t && s.contexts[u] === e) {
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
                                y(e, n, b),
                                y(e, n, x, !0),
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
            function(t, e, n) {
              'use strict';
              e.exports = function(t, e) {
                for (var n in e) t[n] = e[n];
                return t;
              };
            },
            {},
          ],
          42: [
            function(t, e, n) {
              'use strict';
              var r = t('./rect'),
                o = r.resolveRectLike,
                i = r.rectToXY;
              e.exports = function(t, e, n) {
                var r = t.options[n],
                  s = r && r.origin,
                  a = s || t.options.origin,
                  u = o(a, t, e, [t && e]);
                return i(u) || { x: 0, y: 0 };
              };
            },
            { './rect': 51 },
          ],
          43: [
            function(t, e, n) {
              'use strict';
              e.exports = function(t, e) {
                return Math.sqrt(t * t + e * e);
              };
            },
            {},
          ],
          44: [
            function(t, e, n) {
              'use strict';
              var r = t('./extend'),
                o = t('./window'),
                i = {
                  warnOnce: function(t, e) {
                    var n = !1;
                    return function() {
                      return n || (o.window.console.warn(e), (n = !0)), t.apply(this, arguments);
                    };
                  },
                  _getQBezierValue: function(t, e, n, r) {
                    var o = 1 - t;
                    return o * o * e + 2 * o * t * n + t * t * r;
                  },
                  getQuadraticCurvePoint: function(t, e, n, r, o, s, a) {
                    return { x: i._getQBezierValue(a, t, n, o), y: i._getQBezierValue(a, e, r, s) };
                  },
                  easeOutQuad: function(t, e, n, r) {
                    return -n * (t /= r) * (t - 2) + e;
                  },
                  copyAction: function(t, e) {
                    return (t.name = e.name), (t.axis = e.axis), (t.edges = e.edges), t;
                  },
                  is: t('./is'),
                  extend: r,
                  hypot: t('./hypot'),
                  getOriginXY: t('./getOriginXY'),
                };
              r(i, t('./arr')), r(i, t('./domUtils')), r(i, t('./pointerUtils')), r(i, t('./rect')), (e.exports = i);
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
            function(t, e, n) {
              'use strict';
              var r = t('../scope'),
                o = t('./index'),
                i = {
                  methodOrder: ['simulationResume', 'mouseOrPen', 'hasPointer', 'idle'],
                  search: function(t, e, n) {
                    for (
                      var r = o.getPointerType(t),
                        s = o.getPointerId(t),
                        a = { pointer: t, pointerId: s, pointerType: r, eventType: e, eventTarget: n },
                        u = 0;
                      u < i.methodOrder.length;
                      u++
                    ) {
                      var c = i.methodOrder[u],
                        l = i[c](a);
                      if (l) return l;
                    }
                  },
                  simulationResume: function(t) {
                    var e = t.pointerType,
                      n = t.eventType,
                      i = t.eventTarget;
                    if (!/down|start/i.test(n)) return null;
                    for (var s = 0; s < r.interactions.length; s++) {
                      var a = r.interactions[s],
                        u = i;
                      if (a.simulation && a.simulation.allowResume && a.pointerType === e)
                        for (; u; ) {
                          if (u === a.element) return a;
                          u = o.parentNode(u);
                        }
                    }
                    return null;
                  },
                  mouseOrPen: function(t) {
                    var e = t.pointerId,
                      n = t.pointerType,
                      i = t.eventType;
                    if ('mouse' !== n && 'pen' !== n) return null;
                    for (var s = void 0, a = 0; a < r.interactions.length; a++) {
                      var u = r.interactions[a];
                      if (u.pointerType === n) {
                        if (u.simulation && !o.contains(u.pointerIds, e)) continue;
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
                  hasPointer: function(t) {
                    for (var e = t.pointerId, n = 0; n < r.interactions.length; n++) {
                      var i = r.interactions[n];
                      if (o.contains(i.pointerIds, e)) return i;
                    }
                  },
                  idle: function(t) {
                    for (var e = t.pointerType, n = 0; n < r.interactions.length; n++) {
                      var o = r.interactions[n];
                      if (1 === o.pointerIds.length) {
                        var i = o.target;
                        if (i && !i.options.gesture.enabled) continue;
                      } else if (o.pointerIds.length >= 2) continue;
                      if (!o.interacting() && e === o.pointerType) return o;
                    }
                    return null;
                  },
                };
              e.exports = i;
            },
            { '../scope': 33, './index': 44 },
          ],
          46: [
            function(t, e, n) {
              'use strict';
              var r =
                  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                        return typeof t;
                      }
                    : function(t) {
                        return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                          ? 'symbol'
                          : typeof t;
                      },
                o = t('./window'),
                i = t('./isWindow'),
                s = {
                  array: function() {},
                  window: function(t) {
                    return t === o.window || i(t);
                  },
                  docFrag: function(t) {
                    return s.object(t) && 11 === t.nodeType;
                  },
                  object: function(t) {
                    return !!t && 'object' === (void 0 === t ? 'undefined' : r(t));
                  },
                  function: function(t) {
                    return 'function' == typeof t;
                  },
                  number: function(t) {
                    return 'number' == typeof t;
                  },
                  bool: function(t) {
                    return 'boolean' == typeof t;
                  },
                  string: function(t) {
                    return 'string' == typeof t;
                  },
                  element: function(t) {
                    if (!t || 'object' !== (void 0 === t ? 'undefined' : r(t))) return !1;
                    var e = o.getWindow(t) || o.window;
                    return /object|function/.test(r(e.Element))
                      ? t instanceof e.Element
                      : 1 === t.nodeType && 'string' == typeof t.nodeName;
                  },
                  plainObject: function(t) {
                    return s.object(t) && 'Object' === t.constructor.name;
                  },
                };
              (s.array = function(t) {
                return s.object(t) && void 0 !== t.length && s.function(t.splice);
              }),
                (e.exports = s);
            },
            { './isWindow': 47, './window': 52 },
          ],
          47: [
            function(t, e, n) {
              'use strict';
              e.exports = function(t) {
                return !(!t || !t.Window) && t instanceof t.Window;
              };
            },
            {},
          ],
          48: [
            function(t, e, n) {
              'use strict';
              function r(t, n) {
                for (var r in n) {
                  var o = e.exports.prefixedPropREs,
                    i = !1;
                  for (var s in o)
                    if (0 === r.indexOf(s) && o[s].test(r)) {
                      i = !0;
                      break;
                    }
                  i || 'function' == typeof n[r] || (t[r] = n[r]);
                }
                return t;
              }
              (r.prefixedPropREs = { webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/ }), (e.exports = r);
            },
            {},
          ],
          49: [
            function(t, e, n) {
              'use strict';
              var r = t('./hypot'),
                o = t('./browser'),
                i = t('./domObjects'),
                s = t('./domUtils'),
                a = t('./domObjects'),
                u = t('./is'),
                c = t('./pointerExtend'),
                l = {
                  copyCoords: function(t, e) {
                    (t.page = t.page || {}),
                      (t.page.x = e.page.x),
                      (t.page.y = e.page.y),
                      (t.client = t.client || {}),
                      (t.client.x = e.client.x),
                      (t.client.y = e.client.y),
                      (t.timeStamp = e.timeStamp);
                  },
                  setCoordDeltas: function(t, e, n) {
                    (t.page.x = n.page.x - e.page.x),
                      (t.page.y = n.page.y - e.page.y),
                      (t.client.x = n.client.x - e.client.x),
                      (t.client.y = n.client.y - e.client.y),
                      (t.timeStamp = n.timeStamp - e.timeStamp);
                    var o = Math.max(t.timeStamp / 1e3, 0.001);
                    (t.page.speed = r(t.page.x, t.page.y) / o),
                      (t.page.vx = t.page.x / o),
                      (t.page.vy = t.page.y / o),
                      (t.client.speed = r(t.client.x, t.page.y) / o),
                      (t.client.vx = t.client.x / o),
                      (t.client.vy = t.client.y / o);
                  },
                  isNativePointer: function(t) {
                    return t instanceof i.Event || t instanceof i.Touch;
                  },
                  getXY: function(t, e, n) {
                    return (t = t || 'page'), ((n = n || {}).x = e[t + 'X']), (n.y = e[t + 'Y']), n;
                  },
                  getPageXY: function(t, e) {
                    return (
                      (e = e || {}),
                      o.isOperaMobile && l.isNativePointer(t)
                        ? (l.getXY('screen', t, e), (e.x += window.scrollX), (e.y += window.scrollY))
                        : l.getXY('page', t, e),
                      e
                    );
                  },
                  getClientXY: function(t, e) {
                    return (
                      (e = e || {}),
                      o.isOperaMobile && l.isNativePointer(t) ? l.getXY('screen', t, e) : l.getXY('client', t, e),
                      e
                    );
                  },
                  getPointerId: function(t) {
                    return u.number(t.pointerId) ? t.pointerId : t.identifier;
                  },
                  setCoords: function(t, e, n) {
                    var r = e.length > 1 ? l.pointerAverage(e) : e[0],
                      o = {};
                    l.getPageXY(r, o),
                      (t.page.x = o.x),
                      (t.page.y = o.y),
                      l.getClientXY(r, o),
                      (t.client.x = o.x),
                      (t.client.y = o.y),
                      (t.timeStamp = u.number(n) ? n : new Date().getTime());
                  },
                  pointerExtend: c,
                  getTouchPair: function(t) {
                    var e = [];
                    return (
                      u.array(t)
                        ? ((e[0] = t[0]), (e[1] = t[1]))
                        : 'touchend' === t.type
                        ? 1 === t.touches.length
                          ? ((e[0] = t.touches[0]), (e[1] = t.changedTouches[0]))
                          : 0 === t.touches.length && ((e[0] = t.changedTouches[0]), (e[1] = t.changedTouches[1]))
                        : ((e[0] = t.touches[0]), (e[1] = t.touches[1])),
                      e
                    );
                  },
                  pointerAverage: function(t) {
                    for (
                      var e = { pageX: 0, pageY: 0, clientX: 0, clientY: 0, screenX: 0, screenY: 0 }, n = 0;
                      n < t.length;
                      n++
                    ) {
                      var r = t[n];
                      for (var o in e) e[o] += r[o];
                    }
                    for (var i in e) e[i] /= t.length;
                    return e;
                  },
                  touchBBox: function(t) {
                    if (t.length || (t.touches && t.touches.length > 1)) {
                      var e = l.getTouchPair(t),
                        n = Math.min(e[0].pageX, e[1].pageX),
                        r = Math.min(e[0].pageY, e[1].pageY),
                        o = Math.max(e[0].pageX, e[1].pageX),
                        i = Math.max(e[0].pageY, e[1].pageY);
                      return { x: n, y: r, left: n, top: r, width: o - n, height: i - r };
                    }
                  },
                  touchDistance: function(t, e) {
                    var n = e + 'X',
                      o = e + 'Y',
                      i = l.getTouchPair(t),
                      s = i[0][n] - i[1][n],
                      a = i[0][o] - i[1][o];
                    return r(s, a);
                  },
                  touchAngle: function(t, e, n) {
                    var r = n + 'X',
                      o = n + 'Y',
                      i = l.getTouchPair(t),
                      s = i[1][r] - i[0][r],
                      a = i[1][o] - i[0][o],
                      u = (180 * Math.atan2(a, s)) / Math.PI;
                    return u;
                  },
                  getPointerType: function(t) {
                    return u.string(t.pointerType)
                      ? t.pointerType
                      : u.number(t.pointerType)
                      ? [void 0, void 0, 'touch', 'pen', 'mouse'][t.pointerType]
                      : /touch/.test(t.type) || t instanceof a.Touch
                      ? 'touch'
                      : 'mouse';
                  },
                  getEventTargets: function(t) {
                    var e = u.function(t.composedPath) ? t.composedPath() : t.path;
                    return [s.getActualElement(e ? e[0] : t.target), s.getActualElement(t.currentTarget)];
                  },
                };
              e.exports = l;
            },
            { './browser': 36, './domObjects': 38, './domUtils': 39, './hypot': 43, './is': 46, './pointerExtend': 48 },
          ],
          50: [
            function(t, e, n) {
              'use strict';
              for (
                var r = t('./window'),
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
                (a = function(t) {
                  var e = new Date().getTime(),
                    n = Math.max(0, 16 - (e - s)),
                    r = setTimeout(function() {
                      t(e + n);
                    }, n);
                  return (s = e + n), r;
                }),
                u ||
                  (u = function(t) {
                    clearTimeout(t);
                  }),
                (e.exports = { request: a, cancel: u });
            },
            { './window': 52 },
          ],
          51: [
            function(t, e, n) {
              'use strict';
              var r = t('./extend'),
                o = t('./is'),
                i = t('./domUtils'),
                s = i.closest,
                a = i.parentNode,
                u = i.getElementRect,
                c = {
                  getStringOptionResult: function(t, e, n) {
                    return o.string(t) ? (t = 'parent' === t ? a(n) : 'self' === t ? e.getRect(n) : s(n, t)) : null;
                  },
                  resolveRectLike: function(t, e, n, r) {
                    return (
                      (t = c.getStringOptionResult(t, e, n) || t),
                      o.function(t) && (t = t.apply(null, r)),
                      o.element(t) && (t = u(t)),
                      t
                    );
                  },
                  rectToXY: function(t) {
                    return t && { x: 'x' in t ? t.x : t.left, y: 'y' in t ? t.y : t.top };
                  },
                  xywhToTlbr: function(t) {
                    return (
                      !t ||
                        ('left' in t && 'top' in t) ||
                        (((t = r({}, t)).left = t.x || 0),
                        (t.top = t.y || 0),
                        (t.right = t.right || t.left + t.width),
                        (t.bottom = t.bottom || t.top + t.height)),
                      t
                    );
                  },
                  tlbrToXywh: function(t) {
                    return (
                      !t ||
                        ('x' in t && 'y' in t) ||
                        (((t = r({}, t)).x = t.left || 0),
                        (t.top = t.top || 0),
                        (t.width = t.width || t.right - t.x),
                        (t.height = t.height || t.bottom - t.y)),
                      t
                    );
                  },
                };
              e.exports = c;
            },
            { './domUtils': 39, './extend': 41, './is': 46 },
          ],
          52: [
            function(t, e, n) {
              'use strict';
              var r = e.exports,
                o = t('./isWindow');
              function i(t) {
                r.realWindow = t;
                var e = t.document.createTextNode('');
                e.ownerDocument !== t.document && 'function' == typeof t.wrap && t.wrap(e) === e && (t = t.wrap(t)),
                  (r.window = t);
              }
              'undefined' == typeof window ? ((r.window = void 0), (r.realWindow = void 0)) : i(window),
                (r.getWindow = function(t) {
                  if (o(t)) return t;
                  var e = t.ownerDocument || t;
                  return e.defaultView || e.parentWindow || r.window;
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
    function(t, e) {
      var n;
      t.exports = ((n = navigator.userAgent || navigator.vendor || window.opera),
      (isMobile = function() {
        var t = !1;
        return (
          (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            n,
          ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              n.substr(0, 4),
            )) &&
            (t = !0),
          t
        );
      }),
      (isMobileOrTablet = function() {
        var t = !1;
        return (
          (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            n,
          ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              n.substr(0, 4),
            )) &&
            (t = !0),
          t
        );
      }),
      { isMobile: isMobile, isMobileOrTablet: isMobileOrTablet });
    },
    function(t, e, n) {
      'use strict';
      var r = Object.prototype.hasOwnProperty,
        o = '~';
      function i() {}
      function s(t, e, n) {
        (this.fn = t), (this.context = e), (this.once = n || !1);
      }
      function a(t, e, n, r, i) {
        if ('function' != typeof n) throw new TypeError('The listener must be a function');
        var a = new s(n, r || t, i),
          u = o ? o + e : e;
        return (
          t._events[u]
            ? t._events[u].fn
              ? (t._events[u] = [t._events[u], a])
              : t._events[u].push(a)
            : ((t._events[u] = a), t._eventsCount++),
          t
        );
      }
      function u(t, e) {
        0 == --t._eventsCount ? (t._events = new i()) : delete t._events[e];
      }
      function c() {
        (this._events = new i()), (this._eventsCount = 0);
      }
      Object.create && ((i.prototype = Object.create(null)), new i().__proto__ || (o = !1)),
        (c.prototype.eventNames = function() {
          var t,
            e,
            n = [];
          if (0 === this._eventsCount) return n;
          for (e in (t = this._events)) r.call(t, e) && n.push(o ? e.slice(1) : e);
          return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(t)) : n;
        }),
        (c.prototype.listeners = function(t) {
          var e = o ? o + t : t,
            n = this._events[e];
          if (!n) return [];
          if (n.fn) return [n.fn];
          for (var r = 0, i = n.length, s = new Array(i); r < i; r++) s[r] = n[r].fn;
          return s;
        }),
        (c.prototype.listenerCount = function(t) {
          var e = o ? o + t : t,
            n = this._events[e];
          return n ? (n.fn ? 1 : n.length) : 0;
        }),
        (c.prototype.emit = function(t, e, n, r, i, s) {
          var a = o ? o + t : t;
          if (!this._events[a]) return !1;
          var u,
            c,
            l = this._events[a],
            p = arguments.length;
          if (l.fn) {
            switch ((l.once && this.removeListener(t, l.fn, void 0, !0), p)) {
              case 1:
                return l.fn.call(l.context), !0;
              case 2:
                return l.fn.call(l.context, e), !0;
              case 3:
                return l.fn.call(l.context, e, n), !0;
              case 4:
                return l.fn.call(l.context, e, n, r), !0;
              case 5:
                return l.fn.call(l.context, e, n, r, i), !0;
              case 6:
                return l.fn.call(l.context, e, n, r, i, s), !0;
            }
            for (c = 1, u = new Array(p - 1); c < p; c++) u[c - 1] = arguments[c];
            l.fn.apply(l.context, u);
          } else {
            var d,
              f = l.length;
            for (c = 0; c < f; c++)
              switch ((l[c].once && this.removeListener(t, l[c].fn, void 0, !0), p)) {
                case 1:
                  l[c].fn.call(l[c].context);
                  break;
                case 2:
                  l[c].fn.call(l[c].context, e);
                  break;
                case 3:
                  l[c].fn.call(l[c].context, e, n);
                  break;
                case 4:
                  l[c].fn.call(l[c].context, e, n, r);
                  break;
                default:
                  if (!u) for (d = 1, u = new Array(p - 1); d < p; d++) u[d - 1] = arguments[d];
                  l[c].fn.apply(l[c].context, u);
              }
          }
          return !0;
        }),
        (c.prototype.on = function(t, e, n) {
          return a(this, t, e, n, !1);
        }),
        (c.prototype.once = function(t, e, n) {
          return a(this, t, e, n, !0);
        }),
        (c.prototype.removeListener = function(t, e, n, r) {
          var i = o ? o + t : t;
          if (!this._events[i]) return this;
          if (!e) return u(this, i), this;
          var s = this._events[i];
          if (s.fn) s.fn !== e || (r && !s.once) || (n && s.context !== n) || u(this, i);
          else {
            for (var a = 0, c = [], l = s.length; a < l; a++)
              (s[a].fn !== e || (r && !s[a].once) || (n && s[a].context !== n)) && c.push(s[a]);
            c.length ? (this._events[i] = 1 === c.length ? c[0] : c) : u(this, i);
          }
          return this;
        }),
        (c.prototype.removeAllListeners = function(t) {
          var e;
          return (
            t
              ? ((e = o ? o + t : t), this._events[e] && u(this, e))
              : ((this._events = new i()), (this._eventsCount = 0)),
            this
          );
        }),
        (c.prototype.off = c.prototype.removeListener),
        (c.prototype.addListener = c.prototype.on),
        (c.prefixed = o),
        (c.EventEmitter = c),
        (t.exports = c);
    },
    function(t, e, n) {},
    function(t, e, n) {
      'use strict';
      n.r(e);
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
        t,
        e,
      ) {
        return (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
          })(t, e);
      };
      function o(t, e) {
        function n() {
          this.constructor = t;
        }
        r(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
      }
      var i = function() {
        return (i =
          Object.assign ||
          function(t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var o in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t;
          }).apply(this, arguments);
      };
      function s(t, e, n, r) {
        return new (n || (n = Promise))(function(o, i) {
          function s(t) {
            try {
              u(r.next(t));
            } catch (t) {
              i(t);
            }
          }
          function a(t) {
            try {
              u(r.throw(t));
            } catch (t) {
              i(t);
            }
          }
          function u(t) {
            t.done
              ? o(t.value)
              : new n(function(e) {
                  e(t.value);
                }).then(s, a);
          }
          u((r = r.apply(t, e || [])).next());
        });
      }
      function a(t, e) {
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
                  i = e.call(t, s);
                } catch (t) {
                  (i = [6, t]), (r = 0);
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
          function t(t, e, n, r) {
            (this.settings = t),
              (this.nodes = e),
              (this.commandRunnerClass = n),
              (this.variables = r),
              (this.targetFunctions = {}),
              (this.runners = {});
          }
          return (
            (t.prototype.registerTargetFunction = function(t) {
              var e = { settings: this.settings, variables: this.variables, commandEngine: this };
              Object.assign(this.targetFunctions, t(e));
            }),
            (t.prototype.run = function(t) {
              this.createRunners(), t ? this.runNodeByName(t) : this.runFirstNode();
            }),
            (t.prototype.runCommands = function(t) {
              return this.createCommandRunner(t).run();
            }),
            (t.prototype.createRunners = function() {
              var t = this;
              this.targetFunctions;
              this.nodes.forEach(function(e) {
                var n = e.getCommands();
                t.runners[e.name] = t.createCommandRunner(n);
              });
            }),
            (t.prototype.createCommandRunner = function(t) {
              return new this.commandRunnerClass({
                variables: this.variables,
                targetFunctions: this.targetFunctions,
                commands: t,
              });
            }),
            (t.prototype.runFirstNode = function() {
              this.nodes[0] && this.getRunnerForNode(this.nodes[0].name).run();
            }),
            (t.prototype.runNodeByName = function(t) {
              return this.getRunnerForNode(t).run();
            }),
            (t.prototype.getRunnerForNode = function(t) {
              return this.runners[t];
            }),
            t
          );
        })(),
        l = n(3),
        p = n(0);
      function d(t) {
        var e = 0,
          n = [];
        for (e = 0; e < t.length; e++) n.push(t[e]);
        return n;
      }
      function f(t, e) {
        return Math.floor(Math.random() * (e - t + 1)) + t;
      }
      function h(t) {
        var e = Object(p.toType)(t);
        return (function(t) {
          return 'object' === Object(p.toType)(t);
        })(t)
          ? (function t(e) {
              var n = {};
              return (
                Object(p.traverseObject)(
                  e,
                  function(e, r) {
                    'array' === Object(p.toType)(r)
                      ? (n[e] = h(r))
                      : 'object' === Object(p.toType)(r)
                      ? (n[e] = t(r))
                      : (n[e] = r);
                  },
                  !1,
                  !1,
                ),
                n
              );
            })(t)
          : 'array' === e
          ? t.map(function(t) {
              return h(t);
            })
          : t;
      }
      function v(t) {
        return '//' === t.substr(0, 2)
          ? '' + document.location.protocol + t
          : '/' === t[0]
          ? '' + document.location.origin + t
          : -1 === t.indexOf('/')
          ? document.location.origin + '/' + t
          : t;
      }
      var m = (function() {
          function t(t) {
            (this.variables = t),
              (this.LIQUID_ONE = /\{\{(.*?)( ?\| ?(.*)?)?\}\}/),
              (this.LIQUID_ALL = new RegExp(this.LIQUID_ONE, 'g')),
              (this.implementedFilters = { random: this.randomFilter.bind(this) });
          }
          return (
            (t.prototype.replace = function(t) {
              var e = this.getParts(t);
              return e ? (e.whole === t ? this.sendRawVar(t) : this.replaceAsString(t)) : t;
            }),
            (t.prototype.replaceAsString = function(t) {
              var e = this;
              return t.replace(this.LIQUID_ALL, function(t) {
                return e.filteredVariable(t).toString();
              });
            }),
            (t.prototype.getParts = function(t) {
              var e = t.match(this.LIQUID_ONE);
              if (!e) return null;
              var n = e[0],
                r = e[1];
              e[2];
              return { whole: n, varName: r, filter: e[3] };
            }),
            (t.prototype.sendRawVar = function(t) {
              var e,
                n = this;
              return (
                t.replace(this.LIQUID_ALL, function(t) {
                  return (e = n.filteredVariable(t)), t;
                }),
                e
              );
            }),
            (t.prototype.filteredVariable = function(t) {
              var e = this.getParts(t),
                n = (e.whole, e.varName),
                r = e.filter;
              return r ? this.doFilter(n, r) : this.variables[n];
            }),
            (t.prototype.doFilter = function(t, e) {
              var n = this.implementedFilters[e];
              if (!n) throw new Error('There is no filter called "' + e + '"');
              return n(t);
            }),
            (t.prototype.randomFilter = function(t) {
              var e = this.variables[t];
              if ('array' !== Object(p.toType)(e)) throw new Error('You cannot use the random filter on a non-array');
              return e[f(0, e.length - 1)];
            }),
            t
          );
        })(),
        g = (function() {
          function t(t) {
            var e = t.commands,
              n = t.targetFunctions,
              r = t.variables;
            (this.events = new l.EventEmitter()),
              (this.targets = {}),
              (this.runQueue = []),
              (this.nextIndex = 0),
              (this.commands = e),
              (this.targets = n),
              (this.variables = r),
              (this.replacer = new m(this.variables)),
              this.setStatus('ready');
          }
          return (
            (t.prototype.getFunctionFor = function(t) {
              if (!this.targets[t])
                throw new Error('There is no registered function to execute the "' + t + '" command.');
              return this.targets[t];
            }),
            (t.prototype.run = function() {
              return this.canRun() ? this.doRun() : this.enqueueRun();
            }),
            (t.prototype.on = function(t, e) {
              this.events.on(t, e);
            }),
            (t.prototype.once = function(t, e) {
              this.events.once(t, e);
            }),
            (t.prototype.doRun = function() {
              return this.setStatus('running'), this.runNextCommand(), Promise.resolve(this);
            }),
            (t.prototype.enqueueRun = function() {
              var t,
                e = this,
                n = new Promise(function(n) {
                  t = function() {
                    n(e.doRun());
                  };
                });
              return this.runQueue.push(t), n;
            }),
            (t.prototype.canRun = function() {
              return 'running' !== this.status && 'waiting' !== this.status;
            }),
            (t.prototype.setStatus = function(t) {
              this.events.emit(t), (this.status = t);
            }),
            (t.prototype.resetIndex = function() {
              this.nextIndex = 0;
            }),
            (t.prototype.advanceIndex = function() {
              this.nextIndex++;
            }),
            (t.prototype.runNextCommand = function() {
              var t = this;
              if ('running' === this.status) {
                var e = this.commands[this.nextIndex];
                e
                  ? (this.advanceIndex(),
                    this.runCommand(e)
                      .then(function(e) {
                        return t.evaluateReturn(e);
                      })
                      .then(function() {
                        return t.runNextCommand();
                      }))
                  : this.exit();
              }
            }),
            (t.prototype.evaluateReturn = function(t) {
              return s(this, void 0, void 0, function() {
                var e, n, r;
                return a(this, function(o) {
                  switch (o.label) {
                    case 0:
                      return (
                        (e = t.commands),
                        (n = t.requests),
                        (r = t.asyncCommands) && this.asyncSeries(r),
                        e ? [4, this.runNewSeries(e)] : [3, 2]
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
            (t.prototype.evaluateRequests = function(t) {
              return s(this, void 0, void 0, function() {
                return a(this, function(e) {
                  return t
                    ? t.some(function(t) {
                        return 'exit' === t;
                      })
                      ? [2, this.exit()]
                      : t.some(function(t) {
                          return 'pause' === t;
                        })
                      ? [2, this.pause()]
                      : [2]
                    : [2];
                });
              });
            }),
            (t.prototype.exit = function() {
              this.resetIndex();
              var t = this.runQueue.shift();
              t ? t() : this.setStatus('done');
            }),
            (t.prototype.pause = function() {
              this.setStatus('paused');
            }),
            (t.prototype.asyncSeries = function(t) {
              var e = this;
              t.then(function(t) {
                e.runNewSeries(t).catch(function(t) {
                  var e = t.message.slice(0, 10) + '...';
                  console.error('the error thrown above (beginning "' + e + '") was in an async branch');
                });
              }).catch(function(t) {
                'cancelled' !== t &&
                  (console.error(
                    'An error occurred inside a promise for an asyncCommands object. This occurred before the commands were invoked on a runner:',
                  ),
                  console.error(t));
              });
            }),
            (t.prototype.runNewSeries = function(e) {
              var n = this;
              return new Promise(function(r) {
                var o = new t({ targetFunctions: n.targets, commands: e, variables: n.variables });
                o.once('done', r), o.run();
              }).catch(function(t) {
                throw (console.error('a child runner threw an error:'), console.error(t), t);
              });
            }),
            (t.prototype.runCommand = function(t) {
              var e = this.replaceVariables(t);
              return this.getFunctionFor(e.name)(e);
            }),
            (t.prototype.replaceVariables = function(t) {
              var e = this,
                n = h(t);
              return (n = Object(p.traverseObject)(
                n,
                function(t, n) {
                  return 'string' === Object(p.toType)(n) && (n = e.replaceVariableInString(n)), [t, n];
                },
                !0,
                !1,
              ));
            }),
            (t.prototype.replaceVariableInString = function(t) {
              return this.replacer.replace(t);
            }),
            t
          );
        })(),
        y = function(t) {
          return {
            switch: function(e) {
              return Promise.resolve(
                (function(t, e) {
                  var n,
                    r = t.variables;
                  return (
                    e.do.forEach(function(t) {
                      n ||
                        (n = (function(t, e) {
                          var n = (function(t) {
                              for (var e in t) if (b.hasOwnProperty(e)) return e;
                              var n = [];
                              for (var r in t) t.hasOwnProperty(r) && n.push(r);
                              throw new Error(
                                'could not find a valid operator in switch.do. Given these possibilities: ' +
                                  n.join(', '),
                              );
                            })(t),
                            r = e[t.varName],
                            o = t[n];
                          return (function(t, e, n) {
                            return (0, b[t])(e, n);
                          })(n, r, o)
                            ? t.commands
                            : null;
                        })(t, r));
                    }),
                    { commands: n || e.defaultCommands }
                  );
                })(t, e),
              );
            },
          };
        };
      var b = {
        is: function(t, e) {
          return t === e;
        },
        isGreaterThan: function(t, e) {
          return t > e;
        },
        isLessThan: function(t, e) {
          return t < e;
        },
        isGreaterThanOrEqualTo: function(t, e) {
          return t >= e;
        },
        isLessThanOrEqualTo: function(t, e) {
          return t <= e;
        },
        isBetween: function(t, e) {
          return (
            (function(t) {
              return Math.min.apply(Math, t);
            })(e) <= t &&
            t <=
              (function(t) {
                return Math.max.apply(Math, t);
              })(e)
          );
        },
      };
      function x(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        var r = t.settings,
          o = t.nodes,
          i = t.variables,
          s = function(t) {
            for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            var r = t.settings,
              o = t.nodes,
              i = t.variables,
              s = t.commandRunnerClass,
              a = new c(r, o, s, i);
            return (
              e.forEach(function(t) {
                a.registerTargetFunction(t);
              }),
              a
            );
          }.apply(void 0, [{ settings: r, nodes: o, variables: i, commandRunnerClass: g }].concat(e));
        return s.registerTargetFunction(y), s;
      }
      var w = { baseElementId: 'IV-view', buttonContainerClass: 'IV-button-container' },
        E = (function() {
          function t(t) {
            (this.name = t), (this.commands = []), (this.pushType = 'main');
          }
          return (
            (t.prototype.getCommands = function() {
              return this.commands;
            }),
            (t.prototype.pusher = function(t) {
              var e = this;
              if (Array.isArray(t))
                return t.forEach(function(t) {
                  return e.pusher(t);
                });
              'condition' === this.pushType
                ? this.switchDo.do[this.switchDo.do.length - 1].commands.push(t)
                : 'default' === this.pushType
                ? this.switchDo.defaultCommands.push(t)
                : this.commands.push(t);
            }),
            (t.prototype.pushCommands = function() {
              for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
              this.pusher(t);
            }),
            (t.prototype.if = function(t) {
              return (
                null == this.switchDo && (this.switchDo = { name: 'switch', do: [], defaultCommands: [] }),
                (this.pushType = 'condition'),
                t.is
                  ? this.switchDo.do.push({ varName: t.var, is: t.is, commands: [] })
                  : t.isGreaterThan
                  ? this.switchDo.do.push({ varName: t.var, isGreaterThan: t.isGreaterThan, commands: [] })
                  : t.isLessThan
                  ? this.switchDo.do.push({ varName: t.var, isLessThan: t.isLessThan, commands: [] })
                  : t.isBetween
                  ? this.switchDo.do.push({ varName: t.var, isBetween: t.isBetween, commands: [] })
                  : t.isGreaterThanOrEqualTo
                  ? this.switchDo.do.push({
                      varName: t.var,
                      isGreaterThanOrEqualTo: t.isGreaterThanOrEqualTo,
                      commands: [],
                    })
                  : t.isLessThanOrEqualTo &&
                    this.switchDo.do.push({
                      varName: t.var,
                      isGreaterThanOrEqualTo: t.isLessThanOrEqualTo,
                      commands: [],
                    }),
                this
              );
            }),
            (t.prototype.else = function() {
              return (this.pushType = 'default'), this;
            }),
            (t.prototype.endIf = function() {
              return (this.pushType = 'main'), this.pusher(this.switchDo), this;
            }),
            t
          );
        })();
      var T = (function() {
          function t(t) {
            void 0 === t && (t = {}),
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
            var e = t.variables,
              n = t.settings;
            e && (this.variables = e), n && (this.settings = n), this.validateDom();
          }
          return (
            (t.extend = function() {
              for (var t, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
              var r = (function(t) {
                  function e() {
                    return (null !== t && t.apply(this, arguments)) || this;
                  }
                  return o(e, t), e;
                })(this.nodeKlass),
                i = [];
              return (
                e.forEach(function(t) {
                  t.apiExtension &&
                    Object.keys(t.apiExtension).forEach(function(e) {
                      r.prototype[e] = function() {
                        return t.apiExtension[e].apply(this, arguments), this;
                      };
                    }),
                    (function(t) {
                      return !!t.targetFunctionFactories;
                    })(t) && i.push.apply(i, t.targetFunctionFactories),
                    (function(t) {
                      return !!t.aliases;
                    })(t) &&
                      t.aliases.forEach(function(t) {
                        var e = t.target;
                        Object(p.forceArray)(t.aliasAs).forEach(function(t) {
                          r.prototype[t] = r.prototype[e];
                        });
                      });
                }),
                ((t = (function(t) {
                  function e() {
                    var e = (null !== t && t.apply(this, arguments)) || this;
                    return (e.additionalFactories = i), (e.nodeKlassReference = r), e;
                  }
                  return o(e, t), e;
                })(this)).nodeKlass = r),
                t
              );
            }),
            (t.prototype.node = function(t) {
              var e = new this.nodeKlassReference(t);
              return this.nodes.push(e), e;
            }),
            (t.prototype.run = function(t) {
              this.runOnAnyPlatform(this.getEngine(), t);
            }),
            (t.prototype.createRunButton = function(t, e) {
              var n = this.getEngine(),
                r = this.createKickoffButton(t);
              return this.runViaButton(r, n, e), r;
            }),
            (t.prototype.getEngine = function() {
              return this.engine
                ? this.engine
                : (this.engine = x.apply(
                    void 0,
                    [{ settings: this.getSettings(), nodes: this.nodes, variables: this.variables }].concat(
                      this.additionalFactories,
                    ),
                  ));
            }),
            (t.prototype.validateDom = function() {
              if (!this.getSetting('baseContainer')) throw new Error('No valid node present in HTML');
            }),
            (t.prototype.getSetting = function(t) {
              return void 0 !== this.settings[t] ? this.settings[t] : this.defaultSettings[t];
            }),
            (t.prototype.getSettings = function() {
              for (var t = {}, e = 0, n = Object.keys(this.defaultSettings); e < n.length; e++) {
                var r = n[e];
                t[r] = this.getSetting(r);
              }
              return t;
            }),
            (t.prototype.runOnAnyPlatform = function(t, e) {
              this.isMobileOrTablet() ? this.runViaButton(this.createKickoffButton(), t, e) : t.run(e);
            }),
            (t.prototype.isMobileOrTablet = function() {
              return Object(u.isMobileOrTablet)();
            }),
            (t.prototype.createKickoffButton = function(t) {
              void 0 === t && (t = 'Kickoff');
              var e = document.createElement('button');
              return (
                (e.type = 'button'),
                (e.id = 'IV-kickoff'),
                (e.innerHTML = t),
                this.getSettings().baseContainer.appendChild(e),
                e
              );
            }),
            (t.prototype.runViaButton = function(t, e, n) {
              var r = this,
                o = function() {
                  t.removeEventListener('click', o), r.prepVideosForMobile(), t.remove(), e.run(n);
                };
              t.addEventListener('click', o);
            }),
            (t.prototype.prepVideosForMobile = function() {
              d(document.querySelectorAll('video')).forEach(function(t) {
                t.play(), t.pause();
              });
            }),
            (t.nodeKlass = E),
            t
          );
        })(),
        C = (function() {
          function t() {}
          return (
            (t.prototype.playVideo = function() {
              for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
              return Array.isArray(t[0]) ? this.handleDepricatedArrayInput(t[0]) : this.handleArrayInput(t);
            }),
            (t.prototype.clearVideo = function(t) {
              var e = [];
              if (t) {
                var n = { name: 'wait', time: 1e3 * t };
                e.push(n);
              }
              return e.push({ name: 'clearVideo' }), e;
            }),
            (t.prototype.handleDepricatedArrayInput = function(t) {
              return (
                console.warn(
                  'Passing an array to playVideo is deprecated. Just pass values as individual arguments. (Remove the `[` and `]` from the method call.)',
                ),
                this.playVideo.apply(this, t)
              );
            }),
            (t.prototype.handleArrayInput = function(t) {
              var e = this;
              return [
                t
                  .map(function(t) {
                    return e.guaranteedOptionsObject(t);
                  })
                  .reduce(this.mergeMissingUrlsReducer, [])
                  .map(function(t) {
                    return e.createPlayCommandFromOptions(t);
                  })
                  .reduceRight(this.reduceOnCompleteIntoPrevious, null),
              ];
            }),
            (t.prototype.mergeMissingUrlsReducer = function(t, e) {
              if (e.url) t.push(e);
              else {
                var n = t[t.length - 1];
                if (!n)
                  throw new Error(
                    'Previous object does not exist. This error can occur if the first object passed to `playVideo` does not contain a url.',
                  );
                Object.assign(n, e);
              }
              return t;
            }),
            (t.prototype.reduceOnCompleteIntoPrevious = function(t, e) {
              return t ? ((e.onComplete = e.onComplete || []), e.onComplete.push(t), e) : e;
            }),
            (t.prototype.guaranteedOptionsObject = function(t) {
              return 'object' == typeof t ? t : { url: t };
            }),
            (t.prototype.createPlayCommandFromOptions = function(t) {
              var e = { file: t.url },
                n = this.commandOptionsToCommands(t);
              return i({}, { name: 'playVideo' }, e, n);
            }),
            (t.prototype.commandOptionsToCommands = function(t) {
              var e = [];
              function n(t) {
                e = e.concat(t);
              }
              return (
                t.runAsync && n({ name: 'executeAsync', nodeName: t.runAsync }),
                t.js && n({ name: 'executeJs', func: t.js }),
                t.runSync && n({ name: 'executeSync', nodeName: t.runSync }),
                t.goToNode && n([{ name: 'goToNode', nodeName: t.goToNode }, { name: 'stopExecution' }]),
                e.length > 0 ? { onComplete: e } : {}
              );
            }),
            t
          );
        })();
      function S(t) {
        var e = document.createElement('video');
        return (
          (e.id = t),
          e.setAttribute('playsinline', 'true'),
          e.setAttribute('disableRemotePlayback', 'true'),
          (e.style.display = 'block'),
          e.addEventListener('loadeddata', function t() {
            (e.width = e.clientWidth), (e.height = e.clientHeight), e.removeEventListener('loadeddata', t);
          }),
          e
        );
      }
      var O = new ((function() {
          function t() {
            (this.baseElement = document.body),
              (this.players = { current: S('IV-video-player-1'), standby: S('IV-video-player-2') });
          }
          return (
            (t.prototype.playVideo = function(t) {
              var e = this.getStandbyPlayer(),
                n = this.getCurrentPlayer();
              return (
                (e.onloadeddata = function() {
                  (n.src = t), n.play(), (e.onloadeddata = function() {});
                }),
                (e.src = t),
                e.load(),
                this.whenPlayerEnds(n)
              );
            }),
            (t.prototype.whenPlayerEnds = function(t) {
              return new Promise(function(e) {
                var n = function() {
                  e('video ended'), t.removeEventListener('ended', n);
                };
                t.addEventListener('ended', n);
              });
            }),
            (t.prototype.createPlayers = function(t) {
              this.baseElement = t;
              var e,
                n = (((e = document.createElement('div')).className = 'IV-video-container'), e);
              this.attachPlayers(n);
            }),
            (t.prototype.attachPlayers = function(t) {
              t.appendChild(this.players.standby), t.appendChild(this.players.current), this.baseElement.appendChild(t);
            }),
            (t.prototype.getCurrentPlayer = function() {
              return this.players.current;
            }),
            (t.prototype.getStandbyPlayer = function() {
              return this.players.standby;
            }),
            t
          );
        })())(),
        I = new C(),
        P = new C(),
        k = {
          apiExtension: {
            playVideo: function() {
              for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
              this.pushCommands.apply(this, I.playVideo.apply(I, t));
            },
            clearVideo: function(t) {
              this.pushCommands.apply(this, P.clearVideo(t));
            },
          },
          targetFunctionFactories: [
            function(t) {
              var e = t.settings.baseContainer;
              return (
                O.createPlayers(e),
                {
                  playVideo: function(e) {
                    var n = '' + t.settings.baseVideoUrl + e.file,
                      r = O.playVideo(n),
                      o = {};
                    if (e.onComplete) {
                      var i = new Promise(function(t, o) {
                        r.then(function() {
                          var r, i;
                          (r = O.getCurrentPlayer().src), (i = n), v(r) === v(i) ? t(e.onComplete) : o('cancelled');
                        });
                      });
                      o.asyncCommands = i;
                    }
                    return Promise.resolve(o);
                  },
                }
              );
            },
            function(t) {
              var e = t.settings.baseContainer;
              return (
                O.createPlayers(e),
                {
                  clearVideo: function(t) {
                    return s(void 0, void 0, void 0, function() {
                      return a(this, function(t) {
                        return [2, Promise.resolve({})];
                      });
                    });
                  },
                }
              );
            },
          ],
        };
      function D(t) {
        var e = document.createElement('audio');
        return (e.id = t), e;
      }
      var A = new ((function() {
        function t() {
          (this._fadeInterval = 200),
            (this.baseElement = document.body),
            (this.players = { bg: D('IV-audio-player-bg'), sfx: D('IV-audio-player-sfx') });
        }
        return (
          (t.prototype.play = function(t, e) {
            var n = this.getPlayerNamed(t);
            return e && n.src !== e && (n.src = e), n.play(), this.whenPlayerEnds(n);
          }),
          (t.prototype.pause = function(t) {
            return this.getPlayerNamed(t).pause(), Promise.resolve('audio paused');
          }),
          (t.prototype.load = function(t, e) {
            var n = this.getPlayerNamed(t);
            return e && n.src !== e && (n.src = e), this.whenPlayerLoads(n);
          }),
          (t.prototype.loop = function(t, e) {
            this.getPlayerNamed(t).loop = e;
          }),
          (t.prototype.volume = function(t, e, n) {
            var r = this.getPlayerNamed(t);
            return (
              n && n > this._fadeInterval ? this.fadeOverTime(r, e, n) : (r.volume = e),
              Promise.resolve('audio volume adjusted')
            );
          }),
          (t.prototype.fadeOverTime = function(t, e, n) {
            return s(this, void 0, void 0, function() {
              var n, r, o, i;
              return a(this, function(s) {
                switch (s.label) {
                  case 0:
                    (n = Date.now()), (r = t.volume), (o = e - r), (i = 0), (s.label = 1);
                  case 1:
                    return i < 1
                      ? ((t.volume = r + o * ((u = Date.now() - n), (i = Math.min(u / a, 1)))),
                        1 === i && (t.volume = e),
                        [
                          4,
                          ((a = this._fadeInterval),
                          new Promise(function(t) {
                            setTimeout(t, a);
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
          (t.prototype.whenPlayerEnds = function(t) {
            return new Promise(function(e) {
              var n = function() {
                e('audio ended'), t.removeEventListener('ended', n);
              };
              t.addEventListener('ended', n);
            });
          }),
          (t.prototype.whenPlayerLoads = function(t) {
            return new Promise(function(e) {
              var n = function() {
                e('audio loaded'), t.removeEventListener('loadeddata', n);
              };
              t.addEventListener('loadeddata', n);
            });
          }),
          (t.prototype.createPlayers = function(t) {
            (this.baseElement = t), this.attachPlayers();
          }),
          (t.prototype.attachPlayers = function() {
            this.baseElement.appendChild(this.players.bg), this.baseElement.appendChild(this.players.sfx);
          }),
          (t.prototype.getBgPlayer = function() {
            return this.players.bg;
          }),
          (t.prototype.getSfxPlayer = function() {
            return this.players.sfx;
          }),
          (t.prototype.getPlayerNamed = function(t) {
            return this.players[t.toLowerCase()];
          }),
          t
        );
      })())();
      var M = {
          apiExtension: {
            bgAudio: function(t) {
              this.pushCommands(
                (function(t) {
                  if ('string' == typeof t)
                    return {
                      name: 'audioSource',
                      target: 'BG',
                      do: 'loop' === t ? null : t,
                      loop: 'loop' === t || void 0,
                    };
                  if (t.action) return { name: 'audioSource', target: 'BG', do: t.action, file: t.url, loop: t.loop };
                  var e = t,
                    n = e.play,
                    r = e.load,
                    o = e.loop;
                  return n
                    ? { name: 'audioSource', target: 'BG', do: 'play', file: n, loop: o }
                    : r
                    ? { name: 'audioSource', target: 'BG', do: 'load', file: r, loop: o }
                    : { name: 'audioSource', target: 'BG', do: null, file: r, loop: o };
                })(t),
              );
            },
            setVolume: function(t) {
              var e = t.volume,
                n = t.target,
                r = t.time,
                o = { name: 'audioVolume', target: n.toUpperCase(), volume: e, time: r ? 1e3 * r : r };
              this.pushCommands(o);
            },
          },
          targetFunctionFactories: [
            function(t) {
              var e = t.settings.baseContainer;
              return (
                A.createPlayers(e),
                {
                  audioVolume: function(t) {
                    return (
                      t.time ? A.volume(t.target, t.volume, t.time) : A.volume(t.target, t.volume), Promise.resolve({})
                    );
                  },
                }
              );
            },
            function(t) {
              var e = t.settings.baseContainer;
              return (
                A.createPlayers(e),
                t.settings.bgAudioUrl && A.load('BG', t.settings.bgAudioUrl),
                A.loop('BG', t.settings.bgAudioLoop),
                {
                  audioSource: function(t) {
                    var e = t.target,
                      n = t.file,
                      r = t.loop;
                    switch (t.do) {
                      case 'play':
                        A.play(e, n);
                        break;
                      case 'load':
                        A.load(e, n);
                        break;
                      case 'pause':
                        A.pause(e);
                        break;
                      default:
                        throw new Error('unexpected command for audio source: "' + t.do + '"');
                    }
                    return void 0 !== r && A.loop(e, r), Promise.resolve({});
                  },
                }
              );
            },
          ],
        },
        z = (function() {
          function t() {}
          return (
            (t.prototype.addButton = function(t) {
              return { name: 'addButton', id: t.id, text: t.text, onClick: this.createCommands(t) };
            }),
            (t.prototype.removeAllButtons = function() {
              return { name: 'removeAllButtons' };
            }),
            (t.prototype.createCommands = function(t) {
              var e = t.runAsync,
                n = t.goToNode,
                r = t.js,
                o = t.remove,
                i = t.id,
                s = [];
              return (
                e && s.push({ name: 'executeAsync', nodeName: e }),
                r && s.push({ name: 'executeJs', func: r }),
                o && s.push({ name: 'removeButton', id: i }),
                n && s.push({ name: 'goToNode', nodeName: n }, { name: 'stopExecution' }),
                s
              );
            }),
            t
          );
        })(),
        R = new ((function() {
          function t() {
            this.allButtons = [];
          }
          return (
            (t.prototype.createButton = function(t, e) {
              var n = this.newButton(t);
              return this.addToButtonStore(n), this.appendToDocument(n, e), n;
            }),
            (t.prototype.removeAllButtons = function() {
              this.allButtons = this.allButtons.reduce(function(t, e) {
                return e.remove(), t;
              }, []);
            }),
            (t.prototype.removeButton = function(t) {
              this.allButtons
                .filter(function(e) {
                  return e.id === t;
                })
                .forEach(function(t) {
                  return t.remove();
                });
            }),
            (t.prototype.newButton = function(t) {
              var e = document.createElement('button');
              return this.applySettingsToButton(e, t), e;
            }),
            (t.prototype.applySettingsToButton = function(t, e) {
              var n = h(e);
              (n.onclick = n.onClick),
                delete n.onClick,
                (t.innerHTML = n.text),
                delete n.text,
                Object(p.traverseObject)(
                  n,
                  function(e, n) {
                    t[e] = n;
                  },
                  !1,
                  !1,
                );
            }),
            (t.prototype.addToButtonStore = function(t) {
              this.allButtons.push(t);
            }),
            (t.prototype.appendToDocument = function(t, e) {
              this.getContainer(e).appendChild(t);
            }),
            (t.prototype.getContainer = function(t) {
              var e = t || this.baseElement(),
                n = (function(t, e) {
                  var n = t.getAttribute('class');
                  t.setAttribute('class', n + ' IV-searching');
                  var r = t.parentNode.querySelectorAll('.IV-searching > ' + e);
                  return t.setAttribute('class', n), d(r);
                })(e, '.' + w.buttonContainerClass)[0];
              if (n) return n;
              var r = document.createElement('div');
              return r.setAttribute('class', w.buttonContainerClass), e.appendChild(r), r;
            }),
            (t.prototype.baseElement = function() {
              return document.getElementById(w.baseElementId);
            }),
            t
          );
        })())(),
        j = new z(),
        _ = {
          apiExtension: {
            addButton: function(t) {
              var e = j.addButton(t);
              this.pushCommands(e);
            },
            removeAllButtons: function() {
              var t = j.removeAllButtons();
              this.pushCommands(t);
            },
          },
          targetFunctionFactories: [
            function(t) {
              var e = t.settings.baseContainer;
              return {
                addButton: function(n) {
                  var r = {
                    onClick: function() {
                      return t.commandEngine.runCommands(n.onClick);
                    },
                    text: n.text,
                    id: n.id,
                  };
                  return R.createButton(r, e), Promise.resolve({});
                },
              };
            },
            function(t) {
              t.settings.baseContainer;
              return {
                removeAllButtons: function(t) {
                  return R.removeAllButtons(), Promise.resolve({});
                },
              };
            },
            function(t) {
              t.settings.baseContainer;
              return {
                removeButton: function(t) {
                  return R.removeButton(t.id), Promise.resolve({});
                },
              };
            },
          ],
        },
        N = n(1),
        F = n.n(N);
      function Y(t) {
        var e = t.target,
          n = t.dx,
          r = t.dy,
          o = (parseFloat(e.getAttribute('data-x')) || 0) + n,
          i = (parseFloat(e.getAttribute('data-y')) || 0) + r;
        (e.style.webkitTransform = e.style.transform = 'translate(' + o + 'px, ' + i + 'px)'),
          e.setAttribute('data-x', o),
          e.setAttribute('data-y', i);
      }
      var X = [
        k,
        M,
        _,
        {
          apiExtension: {
            addDragItem: function(t) {
              var e = t.id,
                n = t.image,
                r = t.height,
                o = t.width;
              this.pushCommands({
                name: 'addDragItem',
                id: e,
                imageUrl: n,
                size: r || o ? { height: r, width: o } : void 0,
              });
            },
            addDragTarget: function(t) {
              var e = t.id,
                n = t.width,
                r = t.height,
                o = t.top,
                i = {
                  name: 'addDragTarget',
                  id: e,
                  size: { width: n, height: r },
                  position: { x: t.left, y: o },
                  acceptDragItems: t.acceptDragItems,
                  onSuccess: t.onSuccess,
                  visible: t.visible,
                };
              this.pushCommands(i);
            },
            removeDragItem: function(t) {
              var e = { name: 'removeDragItem', id: t };
              this.pushCommands(e);
            },
            removeDragTarget: function(t) {
              var e = { name: 'removeDragTarget', id: t };
              this.pushCommands(e);
            },
          },
          targetFunctionFactories: [
            function(t) {
              var e = t.settings.baseContainer;
              return {
                addDragItem: function(t) {
                  return s(void 0, void 0, void 0, function() {
                    var n, r;
                    return a(this, function(o) {
                      return (
                        (n = e.querySelector('#' + t.id)) &&
                          (console.warn(
                            'You added a drag item with an id ("' +
                              t.id +
                              '") that is already in use in the dom. Removing the previous ' +
                              t.id +
                              ' to make room for the new.',
                          ),
                          n.remove()),
                        ((r = new Image()).id = t.id),
                        (r.src = t.imageUrl),
                        t.size &&
                          t.size.width &&
                          (r.width = e.querySelector('video').clientWidth * (t.size.width / 100)),
                        t.size &&
                          t.size.height &&
                          (r.height = e.querySelector('video').clientHeight * (t.size.height / 100)),
                        F()(r).draggable({ onmove: Y }),
                        e.append(r),
                        [2, Promise.resolve({})]
                      );
                    });
                  });
                },
              };
            },
            function(t) {
              var e = t.settings.baseContainer.querySelector('video').parentElement;
              return {
                addDragTarget: function(n) {
                  return s(void 0, void 0, void 0, function() {
                    var r, o, i;
                    return a(this, function(s) {
                      return (
                        (r = e.querySelector('#' + n.id)) &&
                          (console.warn(
                            'You added a drag target with an id ("' +
                              n.id +
                              '") that is already in use in the dom. Removing the previous ' +
                              n.id +
                              ' to make room for the new.',
                          ),
                          r.remove()),
                        (o = document.createElement('div')),
                        (i = O.getCurrentPlayer()),
                        (o.id = n.id),
                        (o.style.width = i.clientWidth * (n.size.width / 100) + 'px'),
                        (o.style.height = i.clientHeight * (n.size.height / 100) + 'px'),
                        (o.style.position = 'absolute'),
                        (o.style.top = i.offsetTop + (n.position.y / 100) * i.clientHeight + 'px'),
                        (o.style.left = i.offsetLeft + (n.position.x / 100) * i.clientWidth + 'px'),
                        (o.style.border = n.visible ? '2px solid blue' : o.style.border),
                        e.append(o),
                        F()(o).dropzone({
                          accept: n.acceptDragItems ? '#' + n.acceptDragItems.join() : null,
                          overlap: 'center',
                          ondragenter: function(t) {
                            t.target.style.borderColor = 'green';
                          },
                          ondragleave: function(t) {
                            t.target.style.borderColor = 'blue';
                          },
                          ondrop: function(e) {
                            var r = n.onSuccess || {},
                              o = r.js,
                              i = r.setVariable,
                              s = r.goToNode,
                              a = r.keepItem;
                            i && (t.variables[i] = e.relatedTarget.id),
                              o && o(),
                              s && t.commandEngine.runNodeByName(s),
                              a || e.relatedTarget.remove();
                          },
                        }),
                        [2, Promise.resolve({})]
                      );
                    });
                  });
                },
              };
            },
            function(t) {
              return {
                removeDragItem: function(e) {
                  return s(void 0, void 0, void 0, function() {
                    var n;
                    return a(this, function(r) {
                      return (
                        (n = t.settings.baseContainer.querySelector('#' + e.id)) && n.remove(), [2, Promise.resolve({})]
                      );
                    });
                  });
                },
              };
            },
            function(t) {
              var e = t.settings.baseContainer.querySelector('video').parentElement;
              return {
                removeDragTarget: function(t) {
                  return s(void 0, void 0, void 0, function() {
                    var n;
                    return a(this, function(r) {
                      return (n = e.querySelector('#' + t.id)) && n.remove(), [2, Promise.resolve({})];
                    });
                  });
                },
              };
            },
          ],
        },
        {
          apiExtension: {
            addZone: function(t) {
              var e = t.id,
                n = t.width,
                r = t.height,
                o = t.top,
                i = {
                  name: 'addZone',
                  id: e,
                  size: { width: n, height: r },
                  position: { x: t.left, y: o },
                  onClick: t.onClick,
                  visible: t.visible,
                };
              this.pushCommands(i);
            },
            removeZone: function(t) {
              var e = { name: 'removeZone', id: t };
              this.pushCommands(e);
            },
          },
          targetFunctionFactories: [
            function(t) {
              var e = t.settings.baseContainer.querySelector('video').parentElement;
              return {
                addZone: function(n) {
                  return s(void 0, void 0, void 0, function() {
                    var r, o, i;
                    return a(this, function(s) {
                      return (
                        (r = e.querySelector('#' + n.id)) &&
                          (console.warn(
                            'You added a drag target with an id ("' +
                              n.id +
                              '") that is already in use in the dom. Removing the previous ' +
                              n.id +
                              ' to make room for the new.',
                          ),
                          r.remove()),
                        (o = document.createElement('div')),
                        (i = O.getCurrentPlayer()),
                        (o.id = n.id),
                        (o.style.width = i.clientWidth * (n.size.width / 100) + 'px'),
                        (o.style.height = i.clientHeight * (n.size.height / 100) + 'px'),
                        (o.style.position = 'absolute'),
                        (o.style.top = i.offsetTop + (n.position.y / 100) * i.clientHeight + 'px'),
                        (o.style.left = i.offsetLeft + (n.position.x / 100) * i.clientWidth + 'px'),
                        (o.style.border = n.visible ? '2px solid blue' : o.style.border),
                        e.append(o),
                        (o.onclick = function() {
                          var e = n.onClick || {},
                            r = e.js,
                            i = e.setVariable,
                            s = e.goToNode;
                          i && (t.variables[i] = o.id), r && r(), s && t.commandEngine.runNodeByName(s);
                        }),
                        [2, Promise.resolve({})]
                      );
                    });
                  });
                },
              };
            },
            function(t) {
              var e = t.settings.baseContainer.querySelector('video').parentElement;
              return {
                removeZone: function(t) {
                  return s(void 0, void 0, void 0, function() {
                    var n;
                    return a(this, function(r) {
                      return (n = e.querySelector('#' + t.id)) && n.remove(), [2, Promise.resolve({})];
                    });
                  });
                },
              };
            },
          ],
        },
      ];
      var B = {
        add: function(t, e) {
          return t + e;
        },
        subtract: function(t, e) {
          return t - e;
        },
        multiply: function(t, e) {
          return t * e;
        },
        divide: function(t, e) {
          return t / e;
        },
        remainderAfterDivideBy: function(t, e) {
          return t % e;
        },
        roundDownAfterDivideBy: function(t, e) {
          return Math.floor(t / e);
        },
        roundUpAfterDivideBy: function(t, e) {
          return Math.ceil(t / e);
        },
        roundAfterDivideBy: function(t, e) {
          return Math.round(t / e);
        },
        round: function(t) {
          return Math.round(t);
        },
        roundUp: function(t) {
          return Math.ceil(t);
        },
        roundDown: function(t) {
          return Math.floor(t);
        },
      };
      var V = function(t) {
          var e = { name: 'executeAsync', nodeName: t };
          this.pushCommands(e);
        },
        L = function(t) {
          var e = { name: 'executeSync', nodeName: t };
          this.pushCommands(e);
        },
        U = function() {
          this.pushCommands({ name: 'stopExecution' });
        };
      var q = function(t, e, n) {
          return function() {
            for (var r = [], o = 0; o < arguments.length; o++) r[o] = arguments[o];
            return (
              console.warn(
                'The ' +
                  t +
                  ' command has been deprecated. Please use ' +
                  e +
                  ' instead. If you like the old name better, consider aliasing the function. See IVjs documentaion regarding plugins for an explanation.',
              ),
              n.apply(this, r)
            );
          };
        },
        W = [
          {
            apiExtension: {
              calculate: function(t) {
                !(function(t) {
                  var e = [],
                    n = Object.keys(B),
                    r = Object.keys(t),
                    o = r.filter(function(t) {
                      return n.indexOf(t) > -1;
                    }),
                    i = r.filter(function(t) {
                      return -1 === ['var', 'storeIn'].concat(n).indexOf(t);
                    });
                  if (
                    (t.var || e.push('It did not contain a "var" property.'),
                    o.length < 1 && e.push('It contained no known operations (add, subtract, etc).'),
                    o.length > 1 && e.push('It contained more than one operation (add, subtract, etc).'),
                    i.length > 0)
                  ) {
                    var s = i
                      .map(function(t) {
                        return '"' + t + '"';
                      })
                      .join(', ')
                      .replace(/, ([^,]*)$/, ', and $1');
                    e.push('It contained unknown ' + (i.length > 1 ? 'properties' : 'property') + ' ' + s + '.');
                  }
                  if (e.length > 0) {
                    var a = r.map(function(e) {
                        var n = t[e];
                        return e + ': ' + (n = 'string' == typeof n ? '"' + n + '"' : n);
                      }),
                      u = n
                        .map(function(t) {
                          return '"' + t + '"';
                        })
                        .join(', ')
                        .replace(/, ([^,]*)$/, ', or $1'),
                      c =
                        e.join('\n') +
                        '\n\nThe `calculate()` command expects an object with properties "var", and then exactly one of ' +
                        u +
                        '. Optionally also "storeIn" If you don\'t want to overwrite the current variable.\n\nReceived {' +
                        a.join(', ') +
                        '}';
                    throw new Error(c);
                  }
                })(t);
                var e = Object.keys(B),
                  n = Object.keys(t).filter(function(t) {
                    return e.indexOf(t) > -1;
                  })[0],
                  r = t[n],
                  o = t.storeIn ? t.storeIn : t.var,
                  i = { name: 'calculate', varName: t.var, operation: n, value: r, assignTo: o };
                this.pushCommands(i);
              },
              setVariable: function(t) {
                if (t.var) {
                  var e = { name: 'assignFromVariable', varName: t.var, assignTo: t.storeIn };
                  this.pushCommands(e);
                } else
                  t.value &&
                    ((e = { name: 'assignVariable', value: t.value, assignTo: t.storeIn }), this.pushCommands(e));
                return this;
              },
              getRandom: function(t) {
                var e = { name: 'getRandomNumber', min: t.min, max: t.max, assignTo: t.storeIn };
                this.pushCommands(e);
              },
            },
            targetFunctionFactories: [
              function(t) {
                return {
                  assignVariable: function(e) {
                    return (t.variables[e.assignTo] = e.value), Promise.resolve({});
                  },
                };
              },
              function(t) {
                return {
                  assignFromVariable: function(e) {
                    return (t.variables[e.assignTo] = t.variables[e.varName]), Promise.resolve({});
                  },
                };
              },
              function(t) {
                return {
                  calculate: function(e) {
                    return Promise.resolve(
                      (function(t, e) {
                        var n = t.variables,
                          r = e.operation,
                          o = e.varName,
                          i = e.assignTo,
                          s = e.value;
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
                          (n[i] = (function(t) {
                            var e = B[t];
                            if (!e) throw new Error('There is no "' + t + '" operation in the calculate command');
                            return e;
                          })(r)(u, s)),
                          {}
                        );
                      })(t, e),
                    );
                  },
                };
              },
              function(t) {
                return {
                  getRandomNumber: function(e) {
                    return Promise.resolve(
                      (function(t, e) {
                        return (t.variables[e.assignTo] = f(e.min, e.max)), {};
                      })(t, e),
                    );
                  },
                };
              },
            ],
          },
          {
            apiExtension: {
              return: q('return', 'endAllNodes', U),
              goSub: q('goSub', 'runSync', L),
              execute: q('execute', 'runAsync', V),
              endAllNodes: U,
              runSync: L,
              runAsync: V,
              goToNode: function(t) {
                var e = (function(t) {
                  return [{ name: 'goToNode', nodeName: t }, { name: 'stopExecution' }];
                })(t);
                this.pushCommands.apply(this, e);
              },
              wait: function(t) {
                var e = { name: 'wait', time: 1e3 * t };
                this.pushCommands(e);
              },
            },
            targetFunctionFactories: [
              function(t) {
                return {
                  stopExecution: function(t) {
                    return Promise.resolve({ requests: ['exit'] });
                  },
                };
              },
              function(t) {
                return {
                  pauseExecution: function(t) {
                    return Promise.resolve({ requests: ['pause'] });
                  },
                };
              },
              function(t) {
                return {
                  executeAsync: function(e) {
                    return t.commandEngine.runNodeByName(e.nodeName), Promise.resolve({});
                  },
                };
              },
              function(t) {
                return {
                  executeSync: function(e) {
                    var n = {};
                    return new Promise(function(r) {
                      return s(void 0, void 0, void 0, function() {
                        return a(this, function(o) {
                          switch (o.label) {
                            case 0:
                              return [4, t.commandEngine.runNodeByName(e.nodeName)];
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
              function(t) {
                return {
                  goToNode: function(e) {
                    return t.commandEngine.runNodeByName(e.nodeName), Promise.resolve({});
                  },
                };
              },
              function(t) {
                return {
                  wait: function(t) {
                    var e = {};
                    return new Promise(function(n) {
                      setTimeout(function() {
                        return n(e);
                      }, t.time);
                    });
                  },
                };
              },
            ],
          },
        ],
        G = [
          {
            apiExtension: {
              log: function(t) {
                var e = { name: 'log', value: t };
                this.pushCommands(e);
              },
            },
            targetFunctionFactories: [
              function(t) {
                return {
                  log: function(e) {
                    return null == e.value ? console.log(t.variables) : console.log(e.value), Promise.resolve({});
                  },
                };
              },
            ],
          },
        ],
        H = [
          {
            apiExtension: {
              js: function(t) {
                this.pushCommands({ name: 'executeJs', func: t });
              },
            },
            targetFunctionFactories: [
              function(t) {
                return {
                  executeJs: function(t) {
                    return s(void 0, void 0, void 0, function() {
                      return a(this, function(e) {
                        switch (e.label) {
                          case 0:
                            return [4, Promise.resolve(t.func())];
                          case 1:
                            return e.sent(), [2, {}];
                        }
                      });
                    });
                  },
                };
              },
            ],
          },
        ],
        K = X.concat(W, G, H),
        Q = T.extend.apply(T, K);
      n.d(e, 'IV', function() {
        return Q;
      });
    },
  ]);
});
//# sourceMappingURL=iv.js.map
