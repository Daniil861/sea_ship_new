(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    !function n(s, r, o) {
        function a(i, t) {
            if (!r[i]) {
                if (!s[i]) {
                    var e = "function" == typeof require && require;
                    if (!t && e) return e(i, !0);
                    if (h) return h(i, !0);
                    throw (e = new Error("Cannot find module '" + i + "'")).code = "MODULE_NOT_FOUND", 
                    e;
                }
                e = r[i] = {
                    exports: {}
                }, s[i][0].call(e.exports, (function(t) {
                    return a(s[i][1][t] || t);
                }), e, e.exports, n, s, r, o);
            }
            return r[i].exports;
        }
        for (var h = "function" == typeof require && require, t = 0; t < o.length; t++) a(o[t]);
        return a;
    }({
        1: [ function(t, i, e) {
            "use strict";
            window.SlotMachine = t("./slot-machine");
        }, {
            "./slot-machine": 3
        } ],
        2: [ function(t, i, e) {
            "use strict";
            var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            i.exports = function(t) {
                setTimeout((function() {
                    return n(t);
                }), 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0);
            };
        }, {} ],
        3: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            var r = t("./timer"), o = t("./raf"), a = {
                active: 0,
                delay: 200,
                auto: !1,
                spins: 5,
                randomize: null,
                onComplete: null,
                inViewport: !0,
                direction: "up",
                transition: "ease-in-out"
            }, h = "slotMachineNoTransition", u = "slotMachineBlurFast", c = "slotMachineBlurMedium", l = "slotMachineBlurSlow", f = "slotMachineBlurTurtle", d = "slotMachineGradient", v = d;
            n = (n(g, [ {
                key: "changeSettings",
                value: function(i) {
                    var e = this;
                    Object.keys(i).forEach((function(t) {
                        e[t] = i[t];
                    }));
                }
            }, {
                key: "_wrapTiles",
                value: function() {
                    var i = this;
                    this.container = document.createElement("div"), this.container.classList.add("slotMachineContainer"), 
                    this.container.style.transition = "1s ease-in-out", this.element.appendChild(this.container), 
                    this._fakeFirstTile = this.tiles[this.tiles.length - 1].cloneNode(!0), this.container.appendChild(this._fakeFirstTile), 
                    this.tiles.forEach((function(t) {
                        i.container.appendChild(t);
                    })), this._fakeLastTile = this.tiles[0].cloneNode(!0), this.container.appendChild(this._fakeLastTile);
                }
            }, {
                key: "_setBounds",
                value: function() {
                    var t = this.getTileOffset(this.active), i = this.getTileOffset(this.tiles.length), e = this.getTileOffset(this.tiles.length);
                    this._bounds = {
                        up: {
                            key: "up",
                            initial: t,
                            first: 0,
                            last: e,
                            to: this._maxTop,
                            firstToLast: e,
                            lastToFirst: 0
                        },
                        down: {
                            key: "down",
                            initial: t,
                            first: i,
                            last: 0,
                            to: this._minTop,
                            firstToLast: e,
                            lastToFirst: 0
                        }
                    };
                }
            }, {
                key: "_changeTransition",
                value: function() {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.delay, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.transition;
                    this.container.style.transition = t / 1e3 + "s " + i;
                }
            }, {
                key: "_changeTransform",
                value: function(t) {
                    this.container.style.transform = "matrix(1, 0, 0, 1, 0, " + t + ")";
                }
            }, {
                key: "_isGoingBackward",
                value: function() {
                    return this.nextActive > this.active && 0 === this.active && this.nextActive === this.tiles.length - 1;
                }
            }, {
                key: "_isGoingForward",
                value: function() {
                    return this.nextActive <= this.active && this.active === this.tiles.length - 1 && 0 === this.nextActive;
                }
            }, {
                key: "getTileOffset",
                value: function(t) {
                    for (var i = 0, e = 0; e < t; e++) i += this.tiles[e].offsetHeight;
                    return this._minTop - i;
                }
            }, {
                key: "_resetPosition",
                value: function(t) {
                    this.container.classList.toggle(h), this._changeTransform(isNaN(t) ? this.bounds.initial : t), 
                    this.container.offsetHeight, this.container.classList.toggle(h);
                }
            }, {
                key: "prev",
                value: function() {
                    return this.nextActive = this.prevIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "next",
                value: function() {
                    return this.nextActive = this.nextIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "_getDelayFromSpins",
                value: function(t) {
                    var i = this.delay;
                    switch (this.transition = "linear", t) {
                      case 1:
                        i /= .5, this.transition = "ease-out", this._animationFX = f;
                        break;

                      case 2:
                        i /= .75, this._animationFX = l;
                        break;

                      case 3:
                        i /= 1, this._animationFX = c;
                        break;

                      case 4:
                        i /= 1.25, this._animationFX = c;
                        break;

                      default:
                        i /= 1.5, this._animationFX = u;
                    }
                    return i;
                }
            }, {
                key: "shuffle",
                value: function(i, e) {
                    var t, n = this;
                    return "function" == typeof i && (e = i), this.running = !0, this.visible || !0 !== this.inViewport ? (t = this._getDelayFromSpins(i), 
                    this._changeTransition(t), this._changeTransform(this.bounds.to), o((function() {
                        var t;
                        !n.stopping && n.running && (t = i - 1, n._resetPosition(n.bounds.first), 1 < t ? n.shuffle(t, e) : n.stop(e));
                    }), t)) : this.stop(e), this.nextActive;
                }
            }, {
                key: "stop",
                value: function(t) {
                    var i = this;
                    if (!this.running || this.stopping) return this.nextActive;
                    this.running = !0, this.stopping = !0, Number.isInteger(this.nextActive) || (this.nextActive = this.custom), 
                    this._isGoingBackward() ? this._resetPosition(this.bounds.firstToLast) : this._isGoingForward() && this._resetPosition(this.bounds.lastToFirst), 
                    this.active = this.nextActive;
                    var e = this._getDelayFromSpins(1);
                    return this._changeTransition(e), this._animationFX = v, this._changeTransform(this.getTileOffset(this.active)), 
                    o((function() {
                        i.stopping = !1, i.running = !1, i.nextActive = null, "function" == typeof i.onComplete && i.onComplete(i.active), 
                        "function" == typeof t && t.apply(i, [ i.active ]);
                    }), e), this.active;
                }
            }, {
                key: "run",
                value: function() {
                    var t = this;
                    this.running || (this._timer = new r((function() {
                        t.visible || !0 !== t.inViewport ? t.shuffle(t.spins, (function() {
                            t._timer.reset();
                        })) : o((function() {
                            t._timer.reset();
                        }), 500);
                    }), this.auto));
                }
            }, {
                key: "destroy",
                value: function() {
                    var i = this;
                    this._fakeFirstTile.remove(), this._fakeLastTile.remove(), this.tiles.forEach((function(t) {
                        i.element.appendChild(t);
                    })), this.container.remove();
                }
            }, {
                key: "active",
                get: function() {
                    return this._active;
                },
                set: function(t) {
                    ((t = Number(t)) < 0 || t >= this.tiles.length || isNaN(t)) && (t = 0), this._active = t;
                }
            }, {
                key: "direction",
                get: function() {
                    return this._direction;
                },
                set: function(t) {
                    this.running || (this._direction = "down" === t ? "down" : "up");
                }
            }, {
                key: "bounds",
                get: function() {
                    return this._bounds[this._direction];
                }
            }, {
                key: "transition",
                get: function() {
                    return this._transition;
                },
                set: function(t) {
                    this._transition = t || "ease-in-out";
                }
            }, {
                key: "visibleTile",
                get: function() {
                    var t = this.tiles[0].offsetHeight, i = this.container.style.transform || "";
                    i = parseInt(i.replace(/^matrix\(-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?(-?\d+)\)$/, "$1"), 10);
                    return Math.abs(Math.round(i / t)) - 1;
                }
            }, {
                key: "random",
                get: function() {
                    return Math.floor(Math.random() * this.tiles.length);
                }
            }, {
                key: "custom",
                get: function() {
                    var t;
                    return this.randomize ? (((t = this.randomize(this.active)) < 0 || t >= this.tiles.length) && (t = 0), 
                    t) : this.random;
                }
            }, {
                key: "_prevIndex",
                get: function() {
                    var t = this.active - 1;
                    return t < 0 ? this.tiles.length - 1 : t;
                }
            }, {
                key: "_nextIndex",
                get: function() {
                    var t = this.active + 1;
                    return t < this.tiles.length ? t : 0;
                }
            }, {
                key: "prevIndex",
                get: function() {
                    return "up" === this.direction ? this._nextIndex : this._prevIndex;
                }
            }, {
                key: "nextIndex",
                get: function() {
                    return "up" === this.direction ? this._prevIndex : this._nextIndex;
                }
            }, {
                key: "visible",
                get: function() {
                    var t = this.element.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, e = window.innerWidth || document.documentElement.clientWidth;
                    i = t.top <= i && 0 <= t.top + t.height, t = t.left <= e && 0 <= t.left + t.width;
                    return i && t;
                }
            }, {
                key: "_animationFX",
                set: function(i) {
                    var t = this, e = this.delay / 4;
                    o((function() {
                        [].concat(function(t) {
                            if (Array.isArray(t)) {
                                for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
                                return e;
                            }
                            return Array.from(t);
                        }(t.tiles), [ t._fakeLastTile, t._fakeFirstTile ]).forEach((function(t) {
                            t.classList.remove(u, c, l, f), i !== v && t.classList.add(i);
                        })), i === v ? t.container.classList.remove(d) : t.container.classList.add(d);
                    }), e);
                }
            } ]), g);
            function g(t, i) {
                !function(t) {
                    if (!(t instanceof g)) throw new TypeError("Cannot call a class as a function");
                }(this), this.element = t, this.tiles = [].slice.call(this.element.children), this.running = !1, 
                this.stopping = !1, this.element.style.overflow = "hidden", this._wrapTiles(), this._minTop = -this._fakeFirstTile.offsetHeight, 
                this._maxTop = -this.tiles.reduce((function(t, i) {
                    return t + i.offsetHeight;
                }), 0), this.changeSettings(Object.assign({}, a, i)), this._setBounds(), this._resetPosition(), 
                !1 !== this.auto && this.run();
            }
            i.exports = n;
        }, {
            "./raf": 2,
            "./timer": 4
        } ],
        4: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            function r(t, i) {
                return function(t) {
                    if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
                }(this), this.cb = t, this.initialDelay = i, this.delay = i, this.startTime = null, 
                this.timer = null, this.running = !1, this.resume(), this;
            }
            i.exports = (n(r, [ {
                key: "_start",
                value: function() {
                    var t = this;
                    this.timer = setTimeout((function() {
                        t.running = !1, t.cb(t);
                    }), this.delay);
                }
            }, {
                key: "cancel",
                value: function() {
                    this.running = !1, clearTimeout(this.timer);
                }
            }, {
                key: "pause",
                value: function() {
                    this.running && (this.delay -= (new Date).getTime() - this.startTime, this.cancel());
                }
            }, {
                key: "resume",
                value: function() {
                    this.running || (this.running = !0, this.startTime = (new Date).getTime(), this._start());
                }
            }, {
                key: "reset",
                value: function() {
                    this.cancel(), this.delay = this.initialDelay, this._start();
                }
            }, {
                key: "add",
                value: function(t) {
                    this.pause(), this.delay += t, this.resume();
                }
            } ]), r);
        }, {} ]
    }, {}, [ 1 ]);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("coins")) {
        if (document.querySelector(".game")) document.querySelector(".header__point").innerHTML = sessionStorage.getItem("coins");
        if (document.querySelector(".shop")) document.querySelector(".header__point").innerHTML = sessionStorage.getItem("coins");
        if (document.querySelector(".battleship")) document.querySelector(".header-battleship__point_player1 span").innerHTML = sessionStorage.getItem("coins");
        if (document.querySelector(".slotmashine")) document.querySelector(".header__point").innerHTML = sessionStorage.getItem("coins");
    }
    if (sessionStorage.getItem("radar")) {
        let a = sessionStorage.getItem("radar");
        if (document.querySelector("body")) sessionStorage.setItem("radar", a);
    } else if (sessionStorage.getItem("tomahawk")) {
        let a = sessionStorage.getItem("tomahawk");
        if (document.querySelector("body")) sessionStorage.setItem("tomahawk", a);
    } else {
        sessionStorage.setItem("radar", 0);
        sessionStorage.setItem("tomahawk", 0);
    }
    if (document.querySelector(".battleship")) {
        document.querySelector(".header-battleship__player_one").classList.add("_active");
        if (sessionStorage.getItem("radar") > 0) document.querySelector(".actives-battleship__image_lock-radar").classList.add("_hide");
        if (sessionStorage.getItem("tomahawk") > 0) document.querySelector(".actives-battleship__image_lock-tomahawk").classList.add("_hide");
        sessionStorage.setItem("pl2-points", 19);
        sessionStorage.setItem("pl1-points", 19);
    }
    const dots = document.querySelector(".preloader__dots");
    const preloader = document.querySelector(".preloader");
    const preloader_txt_hide = document.querySelectorAll(".acces-preloader__text-hide");
    const button_preloader = document.querySelector(".acces-preloader__button");
    const button_preloader_back = document.querySelector(".acces-preloader__button_back");
    const wrapper = document.querySelector(".wrapper");
    const field_player2 = document.querySelector(".battleship__field_player2");
    const player_one_item = document.querySelector(".header-battleship__player_one");
    const player_two_item = document.querySelector(".header-battleship__player_two");
    let coins = document.querySelector(".header__point");
    let coins_game = document.querySelector(".header-battleship__point_player1 span");
    let coins_comp = document.querySelector(".header-battleship__point_player2");
    let point_win = document.querySelector(".footer-slotmashine__win-text");
    let bet = document.querySelector(".footer-slotmashine__bet-text");
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".acces-preloader__button")) {
            preloader.classList.add("_hide");
            sessionStorage.setItem("preloader", true);
            wrapper.classList.add("_visible");
        }
        if (targetElement.closest(".preloader__dots")) {
            dots.classList.add("_hide");
            preloader_txt_hide.forEach((el => {
                el.classList.add("_visible");
            }));
            button_preloader.classList.add("_hide");
            button_preloader_back.classList.add("_visible");
        }
        if (targetElement.closest(".acces-preloader__button_back")) {
            dots.classList.remove("_hide");
            preloader_txt_hide.forEach((el => {
                el.classList.remove("_visible");
            }));
            button_preloader.classList.remove("_hide");
            button_preloader_back.classList.remove("_visible");
        }
        if (targetElement.closest(".footer-slotmashine__button_minus")) {
            let a = +document.querySelector(".footer-slotmashine__bet-text").innerHTML;
            if (a >= 100) document.querySelector(".footer-slotmashine__bet-text").innerHTML = a - 100;
        }
        if (targetElement.closest(".footer-slotmashine__button_plus")) {
            let a = +document.querySelector(".footer-slotmashine__bet-text").innerHTML;
            document.querySelector(".footer-slotmashine__bet-text").innerHTML = a + 100;
        }
        if (targetElement.closest(".game__item")) {
            targetElement.closest(".game__inner").classList.add("_visible");
            if (targetElement.closest(".game__item").dataset.coins && 0 != targetElement.closest(".game__item").dataset.coins) {
                let a = +targetElement.closest(".game__item").dataset.coins;
                let b = +coins.innerHTML;
                coins.innerHTML = a + b;
                sessionStorage.setItem("coins", a + b);
                if (targetElement.closest(".game__item").dataset.coins > 0) {
                    document.querySelector(".header__icon").classList.add("_jump");
                    document.querySelector(".header__point").classList.add("_anim-size");
                    setTimeout((() => {
                        document.querySelector(".header__icon").classList.remove("_jump");
                        document.querySelector(".header__point").classList.remove("_anim-size");
                    }), 1e3);
                }
                if (targetElement.closest(".game__item").dataset.coins < 0) {
                    document.querySelector(".header__icon").classList.add("_jump");
                    document.querySelector(".header__point").classList.add("_anim-size-red");
                    setTimeout((() => {
                        document.querySelector(".header__icon").classList.remove("_jump");
                        document.querySelector(".header__point").classList.remove("_anim-size-red");
                    }), 1e3);
                }
                targetElement.closest(".game__item").dataset.coins = 0;
            }
            if (1 == targetElement.closest(".game__item").dataset.rocket) {
                console.log("rocket");
                let a = +sessionStorage.getItem("tomahawk");
                sessionStorage.setItem("tomahawk", a + 1);
                targetElement.closest(".game__item").dataset.rocket = 0;
            }
            if (1 == targetElement.closest(".game__item").dataset.radar) {
                console.log("radar");
                let a = +sessionStorage.getItem("radar");
                sessionStorage.setItem("radar", a + 1);
                targetElement.closest(".game__item").dataset.radar = 0;
            }
        }
        if (targetElement.closest(".shop__button")) {
            if (+coins.innerHTML > +targetElement.closest(".shop__item").dataset.points && targetElement.closest(".shop__item").dataset.tomahawk) {
                let a = +sessionStorage.getItem("tomahawk");
                let b = +targetElement.closest(".shop__item").dataset.tomahawk;
                let c = +coins.innerHTML;
                let d = +targetElement.closest(".shop__item").dataset.points;
                coins.innerHTML = c - d;
                sessionStorage.setItem("tomahawk", a + b);
                sessionStorage.setItem("coins", c - d);
                document.querySelector(".header__point").classList.add("_anim-size");
                setTimeout((() => {
                    document.querySelector(".header__point").classList.remove("_anim-size");
                }), 1e3);
            } else if (+coins.innerHTML > +targetElement.closest(".shop__item").dataset.points && targetElement.closest(".shop__item").dataset.radar) {
                let a = +sessionStorage.getItem("radar");
                sessionStorage.setItem("radar", a + 1);
                let c = +coins.innerHTML;
                let d = +targetElement.closest(".shop__item").dataset.points;
                coins.innerHTML = c - d;
                sessionStorage.setItem("coins", c - d);
                document.querySelector(".header__point").classList.add("_anim-size");
                setTimeout((() => {
                    document.querySelector(".header__point").classList.remove("_anim-size");
                }), 1e3);
            }
            if (+coins.innerHTML < +targetElement.closest(".shop__item").dataset.points) {
                document.querySelector(".header__point").classList.add("_anim-no-money");
                setTimeout((() => {
                    document.querySelector(".header__point").classList.remove("_anim-no-money");
                }), 1e3);
            }
        }
        if (targetElement.closest(".button_red")) {
            let a = sessionStorage.getItem("tomahawk");
            sessionStorage.setItem("tomahawk", a - 1);
            if (0 == sessionStorage.getItem("tomahawk")) document.querySelector(".actives-battleship__image_lock-tomahawk").classList.remove("_hide");
            if (sessionStorage.getItem("tomahawk") >= 0) field_player2.classList.add("_atack");
        }
        if (targetElement.closest(".button_green")) {
            let a = sessionStorage.getItem("radar");
            sessionStorage.setItem("radar", a - 1);
            if (0 == sessionStorage.getItem("radar")) document.querySelector(".actives-battleship__image_lock-radar").classList.remove("_hide");
            if (sessionStorage.getItem("radar") >= 0) field_player2.classList.add("_radar");
        }
        if (targetElement.closest(".battleship__field_player2") && !targetElement.closest(".battleship__field_player2").classList.contains("_atack") && !targetElement.closest(".battleship__field_player2").classList.contains("_radar")) {
            if (targetElement.closest(".battleship__pl2").dataset.target && 0 != targetElement.closest(".battleship__pl2").dataset.target) {
                targetElement.closest(".battleship__pl2").classList.add("_visible");
                let a = sessionStorage.getItem("pl2-points");
                a -= 1;
                sessionStorage.setItem("pl2-points", a);
                let points = document.querySelector(".header-battleship__point span");
                setTimeout((() => {
                    points.innerHTML = +points.innerHTML + 100;
                    let a = +sessionStorage.getItem("coins");
                    let b = +coins_game.innerHTML;
                    sessionStorage.setItem("coins", a + b);
                }), 500);
                document.querySelector(".header-battleship__point").classList.add("_anim-size");
                setTimeout((() => {
                    document.querySelector(".header-battleship__point").classList.remove("_anim-size");
                }), 1e3);
                if (0 == a) document.querySelector(".win-battleship").classList.add("_visible");
                targetElement.closest(".battleship__pl2").dataset.target = 0;
                targetElement.closest(".battleship__pl2").dataset.compl = 0;
            }
            if (!targetElement.closest(".battleship__pl2").dataset.target) if (!targetElement.closest(".battleship__pl2").classList.contains("_past")) {
                targetElement.closest(".battleship__pl2").classList.add("_past");
                document.querySelector(".button_green").classList.add("_events");
                document.querySelector(".button_red").classList.add("_events");
                playComputer();
            }
        } else if (targetElement.closest(".battleship__field_player2") && field_player2.classList.contains("_atack")) {
            field_player2.classList.remove("_atack");
            if (1 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                let arrCompl = [];
                datasetElements.forEach((el => {
                    if (1 == el.dataset.place && 1 == el.dataset.compl && el.dataset.target) arrCompl.push(el);
                }));
                if (0 != targetElement.closest(".battleship__pl2").dataset.compl) {
                    let a = sessionStorage.getItem("pl2-points");
                    a -= arrCompl.length;
                    sessionStorage.setItem("pl2-points", a);
                }
                if (arrCompl.length > 0) {
                    let points = document.querySelector(".header-battleship__point span");
                    setTimeout((() => {
                        points.innerHTML = +points.innerHTML + 100 * arrCompl.length;
                        let b = +coins_game.innerHTML;
                        sessionStorage.setItem("coins", b);
                    }), 500);
                }
                datasetElements.forEach((el => {
                    if (1 == el.dataset.place) {
                        el.classList.add("_active");
                        el.dataset.compl = 0;
                        if (el.dataset.target) el.classList.add("_visible");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active");
                    }));
                }), 2e3);
                if (sessionStorage.getItem("pl2-points") <= 0) {
                    document.querySelector(".win-battleship").classList.add("_visible");
                    coins_game.innerHTML = +coins_game.innerHTML + 1e4;
                    let b = +coins_game.innerHTML;
                    sessionStorage.setItem("coins", b);
                }
            } else if (2 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                let arrCompl = [];
                datasetElements.forEach((el => {
                    if (2 == el.dataset.place && 1 == el.dataset.compl && el.dataset.target) arrCompl.push(el);
                }));
                let a = sessionStorage.getItem("pl2-points");
                a -= arrCompl.length;
                sessionStorage.setItem("pl2-points", a);
                if (arrCompl.length > 0) {
                    let points = document.querySelector(".header-battleship__point span");
                    setTimeout((() => {
                        points.innerHTML = +points.innerHTML + 100 * arrCompl.length;
                        let b = +coins_game.innerHTML;
                        sessionStorage.setItem("coins", b);
                    }), 500);
                }
                datasetElements.forEach((el => {
                    if (2 == el.dataset.place) {
                        el.classList.add("_active");
                        el.dataset.compl = 0;
                        if (el.dataset.target) el.classList.add("_visible");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active");
                    }));
                }), 2e3);
                if (sessionStorage.getItem("pl2-points") <= 0) {
                    document.querySelector(".win-battleship").classList.add("_visible");
                    coins_game.innerHTML = +coins_game.innerHTML + 1e4;
                    let b = +coins_game.innerHTML;
                    sessionStorage.setItem("coins", b);
                }
            } else if (3 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                let arrCompl = [];
                datasetElements.forEach((el => {
                    if (3 == el.dataset.place && 1 == el.dataset.compl && el.dataset.target) arrCompl.push(el);
                    if (3 == el.dataset.else && 1 == el.dataset.compl && el.dataset.target) arrCompl.push(el);
                }));
                let a = sessionStorage.getItem("pl2-points");
                a -= arrCompl.length;
                sessionStorage.setItem("pl2-points", a);
                if (arrCompl.length > 0) {
                    let points = document.querySelector(".header-battleship__point span");
                    setTimeout((() => {
                        points.innerHTML = +points.innerHTML + 100 * arrCompl.length;
                        let b = +coins_game.innerHTML;
                        sessionStorage.setItem("coins", b);
                    }), 500);
                }
                datasetElements.forEach((el => {
                    if (3 == el.dataset.else) el.dataset.compl = 0;
                }));
                datasetElements.forEach((el => {
                    if (3 == el.dataset.place) {
                        el.classList.add("_active");
                        el.dataset.compl = 0;
                        if (el.dataset.target) el.classList.add("_visible");
                    }
                    if (3 == el.dataset.else) {
                        el.classList.add("_active");
                        if (el.dataset.target) el.classList.add("_visible");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active");
                    }));
                }), 2e3);
                if (sessionStorage.getItem("pl2-points") <= 0) {
                    document.querySelector(".win-battleship").classList.add("_visible");
                    coins_game.innerHTML = +coins_game.innerHTML + 1e4;
                    let b = +coins_game.innerHTML;
                    sessionStorage.setItem("coins", b);
                }
            } else if (4 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                let arrCompl = [];
                datasetElements.forEach((el => {
                    if (4 == el.dataset.place && 1 == el.dataset.compl && el.dataset.target) arrCompl.push(el);
                }));
                let a = sessionStorage.getItem("pl2-points");
                a -= arrCompl.length;
                sessionStorage.setItem("pl2-points", a);
                if (arrCompl.length > 0) {
                    let points = document.querySelector(".header-battleship__point span");
                    setTimeout((() => {
                        points.innerHTML = +points.innerHTML + 100 * arrCompl.length;
                        let b = +coins_game.innerHTML;
                        sessionStorage.setItem("coins", b);
                    }), 500);
                }
                datasetElements.forEach((el => {
                    if (4 == el.dataset.place) {
                        el.classList.add("_active");
                        el.dataset.compl = 0;
                        if (el.dataset.target) el.classList.add("_visible");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active");
                    }));
                }), 2e3);
                if (sessionStorage.getItem("pl2-points") <= 0) {
                    document.querySelector(".win-battleship").classList.add("_visible");
                    coins_game.innerHTML = +coins_game.innerHTML + 1e4;
                    let b = +coins_game.innerHTML;
                    sessionStorage.setItem("coins", b);
                }
            } else if (5 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                let arrCompl = [];
                datasetElements.forEach((el => {
                    if (5 == el.dataset.place && 1 == el.dataset.compl && el.dataset.target) arrCompl.push(el);
                }));
                let a = sessionStorage.getItem("pl2-points");
                a -= arrCompl.length;
                sessionStorage.setItem("pl2-points", a);
                if (arrCompl.length > 0) {
                    let points = document.querySelector(".header-battleship__point span");
                    setTimeout((() => {
                        points.innerHTML = +points.innerHTML + 100 * arrCompl.length;
                        let b = +coins_game.innerHTML;
                        sessionStorage.setItem("coins", b);
                    }), 500);
                }
                datasetElements.forEach((el => {
                    if (5 == el.dataset.place) {
                        el.classList.add("_active");
                        el.dataset.compl = 0;
                        if (el.dataset.target) el.classList.add("_visible");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active");
                    }));
                }), 2e3);
                if (sessionStorage.getItem("pl2-points") <= 0) {
                    document.querySelector(".win-battleship").classList.add("_visible");
                    coins_game.innerHTML = +coins_game.innerHTML + 1e4;
                    let b = +coins_game.innerHTML;
                    sessionStorage.setItem("coins", b);
                }
            } else if (6 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                let arrCompl = [];
                datasetElements.forEach((el => {
                    if (6 == el.dataset.place && 1 == el.dataset.compl && el.dataset.target) arrCompl.push(el);
                }));
                let a = sessionStorage.getItem("pl2-points");
                a -= arrCompl.length;
                sessionStorage.setItem("pl2-points", a);
                if (arrCompl.length > 0) {
                    let points = document.querySelector(".header-battleship__point span");
                    setTimeout((() => {
                        points.innerHTML = +points.innerHTML + 100 * arrCompl.length;
                        let b = +coins_game.innerHTML;
                        sessionStorage.setItem("coins", b);
                    }), 500);
                }
                datasetElements.forEach((el => {
                    if (6 == el.dataset.place) {
                        el.classList.add("_active");
                        el.dataset.compl = 0;
                        if (el.dataset.target) el.classList.add("_visible");
                    }
                    if (6 == el.dataset.else) {
                        el.classList.add("_active");
                        if (el.dataset.target) el.classList.add("_visible");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active");
                    }));
                }), 2e3);
                if (sessionStorage.getItem("pl2-points") <= 0) {
                    document.querySelector(".win-battleship").classList.add("_visible");
                    coins_game.innerHTML = +coins_game.innerHTML + 1e4;
                    let b = +coins_game.innerHTML;
                    sessionStorage.setItem("coins", b);
                }
            } else if (7 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                let arrCompl = [];
                datasetElements.forEach((el => {
                    if (7 == el.dataset.place && 1 == el.dataset.compl && el.dataset.target) arrCompl.push(el);
                }));
                let a = sessionStorage.getItem("pl2-points");
                a -= arrCompl.length;
                sessionStorage.setItem("pl2-points", a);
                if (arrCompl.length > 0) {
                    let points = document.querySelector(".header-battleship__point span");
                    setTimeout((() => {
                        points.innerHTML = +points.innerHTML + 100 * arrCompl.length;
                        let b = +coins_game.innerHTML;
                        sessionStorage.setItem("coins", b);
                    }), 500);
                }
                datasetElements.forEach((el => {
                    if (7 == el.dataset.place) el.classList.add("_active");
                    if (7 == el.dataset.else) {
                        el.dataset.compl = 0;
                        el.classList.add("_active");
                        if (el.dataset.target) el.classList.add("_visible");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active");
                    }));
                }), 2e3);
                if (sessionStorage.getItem("pl2-points") <= 0) {
                    document.querySelector(".win-battleship").classList.add("_visible");
                    coins_game.innerHTML = +coins_game.innerHTML + 1e4;
                    let b = +coins_game.innerHTML;
                    sessionStorage.setItem("coins", b);
                }
            } else if (8 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                let arrCompl = [];
                datasetElements.forEach((el => {
                    if (8 == el.dataset.place && 1 == el.dataset.compl && el.dataset.target) arrCompl.push(el);
                }));
                let a = sessionStorage.getItem("pl2-points");
                a -= arrCompl.length;
                sessionStorage.setItem("pl2-points", a);
                if (arrCompl.length > 0) {
                    let points = document.querySelector(".header-battleship__point span");
                    setTimeout((() => {
                        points.innerHTML = +points.innerHTML + 100 * arrCompl.length;
                        let b = +coins_game.innerHTML;
                        sessionStorage.setItem("coins", b);
                    }), 500);
                }
                datasetElements.forEach((el => {
                    if (8 == el.dataset.place) {
                        el.classList.add("_active");
                        el.dataset.compl = 0;
                        if (el.dataset.target) el.classList.add("_visible");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active");
                    }));
                }), 2e3);
                if (sessionStorage.getItem("pl2-points") <= 0) {
                    document.querySelector(".win-battleship").classList.add("_visible");
                    coins_game.innerHTML = +coins_game.innerHTML + 1e4;
                    let b = +coins_game.innerHTML;
                    sessionStorage.setItem("coins", b);
                }
            }
        } else if (targetElement.closest(".battleship__field_player2") && field_player2.classList.contains("_radar")) {
            field_player2.classList.remove("_radar");
            if (1 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                datasetElements.forEach((el => {
                    if (1 == el.dataset.place) {
                        el.classList.add("_active-radar");
                        if (el.dataset.target) el.classList.add("_visible-target");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active-radar");
                    }));
                }), 2e3);
            } else if (2 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                datasetElements.forEach((el => {
                    if (2 == el.dataset.place) {
                        el.classList.add("_active-radar");
                        if (el.dataset.target) el.classList.add("_visible-target");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active-radar");
                    }));
                }), 2e3);
            } else if (3 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                datasetElements.forEach((el => {
                    if (3 == el.dataset.place) {
                        el.classList.add("_active-radar");
                        if (el.dataset.target) el.classList.add("_visible-target");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active-radar");
                    }));
                }), 2e3);
            } else if (4 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                datasetElements.forEach((el => {
                    if (4 == el.dataset.place) {
                        el.classList.add("_active-radar");
                        if (el.dataset.target) el.classList.add("_visible-target");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active-radar");
                    }));
                }), 2e3);
            } else if (5 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                datasetElements.forEach((el => {
                    if (5 == el.dataset.place) {
                        el.classList.add("_active-radar");
                        if (el.dataset.target) el.classList.add("_visible-target");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active-radar");
                    }));
                }), 2e3);
            } else if (6 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                datasetElements.forEach((el => {
                    if (6 == el.dataset.place) {
                        el.classList.add("_active-radar");
                        if (el.dataset.target) el.classList.add("_visible-target");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active-radar");
                    }));
                }), 2e3);
            } else if (7 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                datasetElements.forEach((el => {
                    if (7 == el.dataset.place) el.classList.add("_active-radar");
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active-radar");
                    }));
                }), 2e3);
            } else if (8 == targetElement.closest(".battleship__pl2").dataset.place) {
                let datasetElements = document.querySelectorAll(".battleship__pl2");
                datasetElements.forEach((el => {
                    if (8 == el.dataset.place) {
                        el.classList.add("_active-radar");
                        if (el.dataset.target) el.classList.add("_visible-target");
                    }
                }));
                setTimeout((() => {
                    datasetElements.forEach((el => {
                        el.classList.remove("_active-radar");
                    }));
                }), 2e3);
            }
        }
        if (targetElement.closest(".button_again") || targetElement.closest(".button_home")) document.querySelector(".win-battleship").classList.remove("_visible");
    }));
    let arr_complite_num = [];
    function playComputer() {
        player_one_item.classList.remove("_active");
        player_two_item.classList.add("_active");
        field_player2.classList.add("_events");
        setTimeout((() => {
            let arrAll = document.querySelectorAll(".battleship__pl1");
            let number = getRandom(1, 100);
            if (true == arr_complite_num.includes(number)) {
                playComputer();
                return false;
            }
            arr_complite_num.push(number);
            if (arrAll[number].dataset.target) {
                let a = +sessionStorage.getItem("pl1-points");
                sessionStorage.setItem("pl1-points", a - 1);
                arrAll[number].classList.add("_visible");
                setTimeout((() => {
                    coins_comp.innerHTML = +coins_comp.innerHTML + 100;
                }), 600);
                document.querySelector(".header-battleship__point_player2").classList.add("_anim-size");
                setTimeout((() => {
                    document.querySelector(".header-battleship__point_player2").classList.remove("_anim-size");
                }), 1e3);
                if (0 == a) document.querySelector(".lose-battleship").classList.add("_visible");
                setTimeout(playComputer, 2e3);
            } else {
                arrAll[number].classList.add("_past");
                player_two_item.classList.remove("_active");
                field_player2.classList.remove("_events");
                player_one_item.classList.add("_active");
                document.querySelector(".button_green").classList.remove("_events");
                document.querySelector(".button_red").classList.remove("_events");
            }
        }), 3e3);
    }
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    var minTime = 500;
    var maxTime = 2e3;
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    var casino1 = document.querySelector("#slot1");
    var casino2 = document.querySelector("#slot2");
    var casino3 = document.querySelector("#slot3");
    var casino4 = document.querySelector("#slot4");
    var casino5 = document.querySelector("#slot5");
    if (casino1 && casino2 && casino3 && casino4 && casino5) {
        let a, b, c, d, e;
        var mcasino1 = new SlotMachine(casino1, {
            active: 0,
            delay: 400,
            onComplete: function(active) {
                a = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    coins.innerHTML = +coins.innerHTML + 100 * bet;
                    point_win.innerHTML = +point_win.innerHTML + 100 * bet;
                    coins.classList.add("_anim");
                    point_win.classList.add("_anim");
                    setTimeout((() => {
                        coins.classList.remove("_anim");
                        point_win.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("coins", coins.innerHTML);
                }
            }
        });
        var mcasino2 = new SlotMachine(casino2, {
            active: 2,
            delay: 400,
            onComplete: function(active) {
                b = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    coins.innerHTML = +coins.innerHTML + 100 * bet;
                    point_win.innerHTML = +point_win.innerHTML + 100 * bet;
                    coins.classList.add("_anim");
                    point_win.classList.add("_anim");
                    setTimeout((() => {
                        coins.classList.remove("_anim");
                        point_win.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("coins", coins.innerHTML);
                }
            }
        });
        var mcasino3 = new SlotMachine(casino3, {
            active: 1,
            delay: 400,
            onComplete: function(active) {
                c = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    coins.innerHTML = +coins.innerHTML + 100 * bet;
                    point_win.innerHTML = +point_win.innerHTML + 100 * bet;
                    coins.classList.add("_anim");
                    point_win.classList.add("_anim");
                    setTimeout((() => {
                        coins.classList.remove("_anim");
                        point_win.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("coins", coins.innerHTML);
                }
            }
        });
        var mcasino4 = new SlotMachine(casino4, {
            active: 4,
            delay: 400,
            onComplete: function(active) {
                d = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    coins.innerHTML = +coins.innerHTML + 100 * bet;
                    point_win.innerHTML = +point_win.innerHTML + 100 * bet;
                    coins.classList.add("_anim");
                    point_win.classList.add("_anim");
                    setTimeout((() => {
                        coins.classList.remove("_anim");
                        point_win.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("coins", coins.innerHTML);
                }
            }
        });
        var mcasino5 = new SlotMachine(casino5, {
            active: 6,
            delay: 400,
            onComplete: function(active) {
                e = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d && 666 != e) if (a == b && b == c && c == d && d == e) {
                    coins.innerHTML = +coins.innerHTML + 100 * bet;
                    point_win.innerHTML = +point_win.innerHTML + 100 * bet;
                    coins.classList.add("_anim");
                    point_win.classList.add("_anim");
                    setTimeout((() => {
                        coins.classList.remove("_anim");
                        point_win.classList.remove("_anim");
                    }), 1500);
                    sessionStorage.setItem("coins", coins.innerHTML);
                }
            }
        });
        function gameSlotTwo() {
            document.querySelector(".footer-slotmashine__button-play_spin").classList.add("_hold");
            let slot_coins = +coins.innerHTML;
            if (slot_coins >= +bet.innerHTML) {
                coins.innerHTML = slot_coins - +bet.innerHTML;
                sessionStorage.setItem("coins", coins.innerHTML);
                setTimeout((() => {
                    document.querySelector(".footer-slotmashine__button-play_spin").classList.remove("_hold");
                }), 2e3);
                mcasino1.shuffle(9999);
                mcasino2.shuffle(9999);
                mcasino3.shuffle(9999);
                mcasino4.shuffle(9999);
                mcasino5.shuffle(9999);
                setTimeout((() => mcasino1.stop()), getRandomArbitrary(minTime, maxTime));
                setTimeout((() => mcasino2.stop()), getRandomArbitrary(minTime, maxTime));
                setTimeout((() => mcasino3.stop()), getRandomArbitrary(minTime, maxTime));
                setTimeout((() => mcasino4.stop()), getRandomArbitrary(minTime, maxTime));
                setTimeout((() => mcasino5.stop()), getRandomArbitrary(minTime, maxTime));
            } else {
                coins.classList.add("_anim-no-money");
                setTimeout((() => {
                    document.querySelector(".footer-slotmashine__text-bet").classList.add("_anim");
                }), 700);
                setTimeout((() => {
                    coins.classList.remove("_anim-no-money");
                }), 600);
                setTimeout((() => {
                    document.querySelector(".footer-slotmashine__text-bet").classList.remove("_anim");
                }), 1300);
            }
        }
        var casinoAutoSpin;
        if (document.querySelector(".footer-slotmashine__button-play_spin")) document.querySelector(".footer-slotmashine__button-play_spin").addEventListener("click", (() => {
            a = 666;
            b = 666;
            c = 666;
            d = 666;
            e = 666;
            if (casino1 && casino2 && casino3 && casino4 && casino5) {
                clearInterval(casinoAutoSpin);
                gameSlotTwo();
            }
            document.querySelector(".footer-slotmashine__button-play_spin").classList.add("_hide");
            setTimeout((() => {
                document.querySelector(".footer-slotmashine__button-play_spin").classList.remove("_hide");
            }), 2e3);
        }));
        if (document.querySelector(".footer-slotmashine__button-play_auto")) document.querySelector(".footer-slotmashine__button-play_auto").addEventListener("click", (() => {
            if (casino1 && casino2 && casino3 && casino4 && casino5) {
                document.querySelector(".footer-slotmashine__button-play_auto").style.pointerEvents = "none";
                gameSlotTwo();
                let casinoAutoSpinCount = 0;
                casinoAutoSpin = setInterval((function() {
                    casinoAutoSpinCount++;
                    if (casinoAutoSpinCount < 10) gameSlotTwo(); else {
                        clearInterval(casinoAutoSpin);
                        document.querySelector(".footer-slotmashine__button-play_auto").style.pointerEvents = "fill";
                    }
                }), 4e3);
            }
        }));
    }
    window["FLS"] = true;
    isWebp();
})();