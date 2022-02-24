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
                console.log("yeeea");
                arrAll[number].classList.add("_visible");
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
    window["FLS"] = true;
    isWebp();
})();