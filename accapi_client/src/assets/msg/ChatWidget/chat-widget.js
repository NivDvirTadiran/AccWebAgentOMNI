(window.webpackJsonp = window.webpackJsonp || []).push([[2], {
    2: function(e, t, n) {
        e.exports = n("g+xy")
    },
    aVe3: function(e, t) {
        (function() {
                "use strict";
                var e = window.Document.prototype.createElement
                    , t = window.Document.prototype.createElementNS
                    , n = window.Document.prototype.importNode
                    , o = window.Document.prototype.prepend
                    , r = window.Document.prototype.append
                    , i = window.DocumentFragment.prototype.prepend
                    , s = window.DocumentFragment.prototype.append
                    , a = window.Node.prototype.cloneNode
                    , c = window.Node.prototype.appendChild
                    , l = window.Node.prototype.insertBefore
                    , u = window.Node.prototype.removeChild
                    , h = window.Node.prototype.replaceChild
                    , p = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent")
                    , f = window.Element.prototype.attachShadow
                    , d = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML")
                    , m = window.Element.prototype.getAttribute
                    , g = window.Element.prototype.setAttribute
                    , y = window.Element.prototype.removeAttribute
                    , _ = window.Element.prototype.getAttributeNS
                    , v = window.Element.prototype.setAttributeNS
                    , b = window.Element.prototype.removeAttributeNS
                    , k = window.Element.prototype.insertAdjacentElement
                    , E = window.Element.prototype.insertAdjacentHTML
                    , w = window.Element.prototype.prepend
                    , T = window.Element.prototype.append
                    , C = window.Element.prototype.before
                    , S = window.Element.prototype.after
                    , D = window.Element.prototype.replaceWith
                    , Z = window.Element.prototype.remove
                    , O = window.HTMLElement
                    , P = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML")
                    , N = window.HTMLElement.prototype.insertAdjacentElement
                    , j = window.HTMLElement.prototype.insertAdjacentHTML
                    , z = new Set;
                function L(e) {
                    var t = z.has(e);
                    return e = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(e),
                    !t && e
                }
                "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach((function(e) {
                        return z.add(e)
                    }
                ));
                var M = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);
                function x(e) {
                    var t = e.isConnected;
                    if (void 0 !== t)
                        return t;
                    if (M(e))
                        return !0;
                    for (; e && !(e.__CE_isImportDocument || e instanceof Document); )
                        e = e.parentNode || (window.ShadowRoot && e instanceof ShadowRoot ? e.host : void 0);
                    return !(!e || !(e.__CE_isImportDocument || e instanceof Document))
                }
                function A(e) {
                    var t = e.children;
                    if (t)
                        return Array.prototype.slice.call(t);
                    for (t = [],
                             e = e.firstChild; e; e = e.nextSibling)
                        e.nodeType === Node.ELEMENT_NODE && t.push(e);
                    return t
                }
                function I(e, t) {
                    for (; t && t !== e && !t.nextSibling; )
                        t = t.parentNode;
                    return t && t !== e ? t.nextSibling : null
                }
                function F() {
                    var e = !(null == ie || !ie.noDocumentConstructionObserver)
                        , t = !(null == ie || !ie.shadyDomFastWalk);
                    this.h = [],
                        this.a = [],
                        this.f = !1,
                        this.shadyDomFastWalk = t,
                        this.C = !e
                }
                function H(e, t, n, o) {
                    var r = window.ShadyDom;
                    if (e.shadyDomFastWalk && r && r.inUse) {
                        if (t.nodeType === Node.ELEMENT_NODE && n(t),
                            t.querySelectorAll)
                            for (e = r.nativeMethods.querySelectorAll.call(t, "*"),
                                     t = 0; t < e.length; t++)
                                n(e[t])
                    } else
                        !function e(t, n, o) {
                            for (var r = t; r; ) {
                                if (r.nodeType === Node.ELEMENT_NODE) {
                                    var i = r;
                                    n(i);
                                    var s = i.localName;
                                    if ("link" === s && "import" === i.getAttribute("rel")) {
                                        if (r = i.import,
                                        void 0 === o && (o = new Set),
                                        r instanceof Node && !o.has(r))
                                            for (o.add(r),
                                                     r = r.firstChild; r; r = r.nextSibling)
                                                e(r, n, o);
                                        r = I(t, i);
                                        continue
                                    }
                                    if ("template" === s) {
                                        r = I(t, i);
                                        continue
                                    }
                                    if (i = i.__CE_shadowRoot)
                                        for (i = i.firstChild; i; i = i.nextSibling)
                                            e(i, n, o)
                                }
                                r = r.firstChild ? r.firstChild : I(t, r)
                            }
                        }(t, n, o)
                }
                function R(e, t) {
                    e.f && H(e, t, (function(t) {
                            return W(e, t)
                        }
                    ))
                }
                function W(e, t) {
                    if (e.f && !t.__CE_patched) {
                        t.__CE_patched = !0;
                        for (var n = 0; n < e.h.length; n++)
                            e.h[n](t);
                        for (n = 0; n < e.a.length; n++)
                            e.a[n](t)
                    }
                }
                function B(e, t) {
                    var n = [];
                    for (H(e, t, (function(e) {
                            return n.push(e)
                        }
                    )),
                             t = 0; t < n.length; t++) {
                        var o = n[t];
                        1 === o.__CE_state ? e.connectedCallback(o) : q(e, o)
                    }
                }
                function G(e, t) {
                    var n = [];
                    for (H(e, t, (function(e) {
                            return n.push(e)
                        }
                    )),
                             t = 0; t < n.length; t++) {
                        var o = n[t];
                        1 === o.__CE_state && e.disconnectedCallback(o)
                    }
                }
                function U(e, t, n) {
                    var o = (n = void 0 === n ? {} : n).D
                        , r = n.upgrade || function(t) {
                        return q(e, t)
                    }
                        , i = [];
                    for (H(e, t, (function(t) {
                            if (e.f && W(e, t),
                            "link" === t.localName && "import" === t.getAttribute("rel")) {
                                var n = t.import;
                                n instanceof Node && (n.__CE_isImportDocument = !0,
                                    n.__CE_registry = document.__CE_registry),
                                    n && "complete" === n.readyState ? n.__CE_documentLoadHandled = !0 : t.addEventListener("load", (function() {
                                            var n = t.import;
                                            if (!n.__CE_documentLoadHandled) {
                                                n.__CE_documentLoadHandled = !0;
                                                var i = new Set;
                                                o && (o.forEach((function(e) {
                                                        return i.add(e)
                                                    }
                                                )),
                                                    i.delete(n)),
                                                    U(e, n, {
                                                        D: i,
                                                        upgrade: r
                                                    })
                                            }
                                        }
                                    ))
                            } else
                                i.push(t)
                        }
                    ), o),
                             t = 0; t < i.length; t++)
                        r(i[t])
                }
                function q(e, t) {
                    try {
                        var n = t.ownerDocument
                            , o = n.__CE_registry
                            , r = o && (n.defaultView || n.__CE_isImportDocument) ? ne(o, t.localName) : void 0;
                        if (r && void 0 === t.__CE_state) {
                            r.constructionStack.push(t);
                            try {
                                try {
                                    if (new r.constructorFunction !== t)
                                        throw Error("The custom element constructor did not produce the element being upgraded.")
                                } finally {
                                    r.constructionStack.pop()
                                }
                            } catch (c) {
                                throw t.__CE_state = 2,
                                    c
                            }
                            if (t.__CE_state = 1,
                                t.__CE_definition = r,
                            r.attributeChangedCallback && t.hasAttributes()) {
                                var i = r.observedAttributes;
                                for (r = 0; r < i.length; r++) {
                                    var s = i[r]
                                        , a = t.getAttribute(s);
                                    null !== a && e.attributeChangedCallback(t, s, null, a, null)
                                }
                            }
                            x(t) && e.connectedCallback(t)
                        }
                    } catch (c) {
                        $(c)
                    }
                }
                function V(n, o, r, i) {
                    var s = o.__CE_registry;
                    if (s && (null === i || "http://www.w3.org/1999/xhtml" === i) && (s = ne(s, r)))
                        try {
                            var a = new s.constructorFunction;
                            if (void 0 === a.__CE_state || void 0 === a.__CE_definition)
                                throw Error("Failed to construct '" + r + "': The returned value was not constructed with the HTMLElement constructor.");
                            if ("http://www.w3.org/1999/xhtml" !== a.namespaceURI)
                                throw Error("Failed to construct '" + r + "': The constructed element's namespace must be the HTML namespace.");
                            if (a.hasAttributes())
                                throw Error("Failed to construct '" + r + "': The constructed element must not have any attributes.");
                            if (null !== a.firstChild)
                                throw Error("Failed to construct '" + r + "': The constructed element must not have any children.");
                            if (null !== a.parentNode)
                                throw Error("Failed to construct '" + r + "': The constructed element must not have a parent node.");
                            if (a.ownerDocument !== o)
                                throw Error("Failed to construct '" + r + "': The constructed element's owner document is incorrect.");
                            if (a.localName !== r)
                                throw Error("Failed to construct '" + r + "': The constructed element's local name is incorrect.");
                            return a
                        } catch (c) {
                            return $(c),
                                o = null === i ? e.call(o, r) : t.call(o, i, r),
                                Object.setPrototypeOf(o, HTMLUnknownElement.prototype),
                                o.__CE_state = 2,
                                o.__CE_definition = void 0,
                                W(n, o),
                                o
                        }
                    return W(n, o = null === i ? e.call(o, r) : t.call(o, i, r)),
                        o
                }
                function $(e) {
                    var t = e.message
                        , n = e.sourceURL || e.fileName || ""
                        , o = e.line || e.lineNumber || 0
                        , r = void 0;
                    void 0 === ErrorEvent.prototype.initErrorEvent ? r = new ErrorEvent("error",{
                        cancelable: !0,
                        message: t,
                        filename: n,
                        lineno: o,
                        colno: e.column || e.columnNumber || 0,
                        error: e
                    }) : ((r = document.createEvent("ErrorEvent")).initErrorEvent("error", !1, !0, t, n, o),
                            r.preventDefault = function() {
                                Object.defineProperty(this, "defaultPrevented", {
                                    configurable: !0,
                                    get: function() {
                                        return !0
                                    }
                                })
                            }
                    ),
                    void 0 === r.error && Object.defineProperty(r, "error", {
                        configurable: !0,
                        enumerable: !0,
                        get: function() {
                            return e
                        }
                    }),
                        window.dispatchEvent(r),
                    r.defaultPrevented || console.error(e)
                }
                function X() {
                    var e = this;
                    this.a = void 0,
                        this.w = new Promise((function(t) {
                                e.g = t
                            }
                        ))
                }
                function J(e) {
                    var t = document;
                    this.g = void 0,
                        this.b = e,
                        this.a = t,
                        U(this.b, this.a),
                    "loading" === this.a.readyState && (this.g = new MutationObserver(this.A.bind(this)),
                        this.g.observe(this.a, {
                            childList: !0,
                            subtree: !0
                        }))
                }
                function Y(e) {
                    e.g && e.g.disconnect()
                }
                function K(e) {
                    this.j = new Map,
                        this.l = new Map,
                        this.u = new Map,
                        this.o = !1,
                        this.s = new Map,
                        this.i = function(e) {
                            return e()
                        }
                        ,
                        this.c = !1,
                        this.m = [],
                        this.b = e,
                        this.v = e.C ? new J(e) : void 0
                }
                function Q(e, t) {
                    if (!L(t))
                        throw new SyntaxError("The element name '" + t + "' is not valid.");
                    if (ne(e, t))
                        throw Error("A custom element with name '" + t + "' has already been defined.");
                    if (e.o)
                        throw Error("A custom element is already being defined.")
                }
                function ee(e, t, n) {
                    var o;
                    e.o = !0;
                    try {
                        var r = n.prototype;
                        if (!(r instanceof Object))
                            throw new TypeError("The custom element constructor's prototype is not an object.");
                        var i = function(e) {
                            var t = r[e];
                            if (void 0 !== t && !(t instanceof Function))
                                throw Error("The '" + e + "' callback must be a function.");
                            return t
                        }
                            , s = i("connectedCallback")
                            , a = i("disconnectedCallback")
                            , c = i("adoptedCallback")
                            , l = (o = i("attributeChangedCallback")) && n.observedAttributes || []
                    } catch (u) {
                        throw u
                    } finally {
                        e.o = !1
                    }
                    return e.l.set(t, n = {
                        localName: t,
                        constructorFunction: n,
                        connectedCallback: s,
                        disconnectedCallback: a,
                        adoptedCallback: c,
                        attributeChangedCallback: o,
                        observedAttributes: l,
                        constructionStack: []
                    }),
                        e.u.set(n.constructorFunction, n),
                        n
                }
                function te(e) {
                    if (!1 !== e.c) {
                        e.c = !1;
                        for (var t = [], n = e.m, o = new Map, r = 0; r < n.length; r++)
                            o.set(n[r], []);
                        for (U(e.b, document, {
                            upgrade: function(n) {
                                if (void 0 === n.__CE_state) {
                                    var r = n.localName
                                        , i = o.get(r);
                                    i ? i.push(n) : e.l.has(r) && t.push(n)
                                }
                            }
                        }),
                                 r = 0; r < t.length; r++)
                            q(e.b, t[r]);
                        for (r = 0; r < n.length; r++) {
                            for (var i = n[r], s = o.get(i), a = 0; a < s.length; a++)
                                q(e.b, s[a]);
                            (i = e.s.get(i)) && i.resolve(void 0)
                        }
                        n.length = 0
                    }
                }
                function ne(e, t) {
                    var n = e.l.get(t);
                    if (n)
                        return n;
                    if (n = e.j.get(t)) {
                        e.j.delete(t);
                        try {
                            return ee(e, t, n())
                        } catch (o) {
                            $(o)
                        }
                    }
                }
                function oe(e, t, n) {
                    function o(t) {
                        return function(n) {
                            for (var o = [], r = 0; r < arguments.length; ++r)
                                o[r] = arguments[r];
                            r = [];
                            for (var i = [], s = 0; s < o.length; s++) {
                                var a = o[s];
                                if (a instanceof Element && x(a) && i.push(a),
                                a instanceof DocumentFragment)
                                    for (a = a.firstChild; a; a = a.nextSibling)
                                        r.push(a);
                                else
                                    r.push(a)
                            }
                            for (t.apply(this, o),
                                     o = 0; o < i.length; o++)
                                G(e, i[o]);
                            if (x(this))
                                for (o = 0; o < r.length; o++)
                                    (i = r[o])instanceof Element && B(e, i)
                        }
                    }
                    void 0 !== n.prepend && (t.prepend = o(n.prepend)),
                    void 0 !== n.append && (t.append = o(n.append))
                }
                F.prototype.connectedCallback = function(e) {
                    var t = e.__CE_definition;
                    if (t.connectedCallback)
                        try {
                            t.connectedCallback.call(e)
                        } catch (n) {
                            $(n)
                        }
                }
                    ,
                    F.prototype.disconnectedCallback = function(e) {
                        var t = e.__CE_definition;
                        if (t.disconnectedCallback)
                            try {
                                t.disconnectedCallback.call(e)
                            } catch (n) {
                                $(n)
                            }
                    }
                    ,
                    F.prototype.attributeChangedCallback = function(e, t, n, o, r) {
                        var i = e.__CE_definition;
                        if (i.attributeChangedCallback && -1 < i.observedAttributes.indexOf(t))
                            try {
                                i.attributeChangedCallback.call(e, t, n, o, r)
                            } catch (s) {
                                $(s)
                            }
                    }
                    ,
                    X.prototype.resolve = function(e) {
                        if (this.a)
                            throw Error("Already resolved.");
                        this.a = e,
                            this.g(e)
                    }
                    ,
                    J.prototype.A = function(e) {
                        var t = this.a.readyState;
                        for ("interactive" !== t && "complete" !== t || Y(this),
                                 t = 0; t < e.length; t++)
                            for (var n = e[t].addedNodes, o = 0; o < n.length; o++)
                                U(this.b, n[o])
                    }
                    ,
                    K.prototype.B = function(e, t) {
                        var n = this;
                        if (!(t instanceof Function))
                            throw new TypeError("Custom element constructor getters must be functions.");
                        Q(this, e),
                            this.j.set(e, t),
                            this.m.push(e),
                        this.c || (this.c = !0,
                            this.i((function() {
                                    return te(n)
                                }
                            )))
                    }
                    ,
                    K.prototype.define = function(e, t) {
                        var n = this;
                        if (!(t instanceof Function))
                            throw new TypeError("Custom element constructors must be functions.");
                        Q(this, e),
                            ee(this, e, t),
                            this.m.push(e),
                        this.c || (this.c = !0,
                            this.i((function() {
                                    return te(n)
                                }
                            )))
                    }
                    ,
                    K.prototype.upgrade = function(e) {
                        U(this.b, e)
                    }
                    ,
                    K.prototype.get = function(e) {
                        if (e = ne(this, e))
                            return e.constructorFunction
                    }
                    ,
                    K.prototype.whenDefined = function(e) {
                        if (!L(e))
                            return Promise.reject(new SyntaxError("'" + e + "' is not a valid custom element name."));
                        var t = this.s.get(e);
                        if (t)
                            return t.w;
                        t = new X,
                            this.s.set(e, t);
                        var n = this.l.has(e) || this.j.has(e);
                        return e = -1 === this.m.indexOf(e),
                        n && e && t.resolve(void 0),
                            t.w
                    }
                    ,
                    K.prototype.polyfillWrapFlushCallback = function(e) {
                        this.v && Y(this.v);
                        var t = this.i;
                        this.i = function(n) {
                            return e((function() {
                                    return t(n)
                                }
                            ))
                        }
                    }
                    ,
                    window.CustomElementRegistry = K,
                    K.prototype.define = K.prototype.define,
                    K.prototype.upgrade = K.prototype.upgrade,
                    K.prototype.get = K.prototype.get,
                    K.prototype.whenDefined = K.prototype.whenDefined,
                    K.prototype.polyfillDefineLazy = K.prototype.B,
                    K.prototype.polyfillWrapFlushCallback = K.prototype.polyfillWrapFlushCallback;
                var re = {}
                    , ie = window.customElements;
                function se() {
                    var z = new F;
                    !function(t) {
                        function n() {
                            var n = this.constructor
                                , o = document.__CE_registry.u.get(n);
                            if (!o)
                                throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");
                            var r = o.constructionStack;
                            if (0 === r.length)
                                return r = e.call(document, o.localName),
                                    Object.setPrototypeOf(r, n.prototype),
                                    r.__CE_state = 1,
                                    r.__CE_definition = o,
                                    W(t, r),
                                    r;
                            var i = r.length - 1
                                , s = r[i];
                            if (s === re)
                                throw Error("Failed to construct '" + o.localName + "': This element was already constructed.");
                            return r[i] = re,
                                Object.setPrototypeOf(s, n.prototype),
                                W(t, s),
                                s
                        }
                        n.prototype = O.prototype,
                            Object.defineProperty(HTMLElement.prototype, "constructor", {
                                writable: !0,
                                configurable: !0,
                                enumerable: !1,
                                value: n
                            }),
                            window.HTMLElement = n
                    }(z),
                        function(e) {
                            Document.prototype.createElement = function(t) {
                                return V(e, this, t, null)
                            }
                                ,
                                Document.prototype.importNode = function(t, o) {
                                    return t = n.call(this, t, !!o),
                                        this.__CE_registry ? U(e, t) : R(e, t),
                                        t
                                }
                                ,
                                Document.prototype.createElementNS = function(t, n) {
                                    return V(e, this, n, t)
                                }
                                ,
                                oe(e, Document.prototype, {
                                    prepend: o,
                                    append: r
                                })
                        }(z),
                        oe(z, DocumentFragment.prototype, {
                            prepend: i,
                            append: s
                        }),
                        function(e) {
                            function t(t, n) {
                                Object.defineProperty(t, "textContent", {
                                    enumerable: n.enumerable,
                                    configurable: !0,
                                    get: n.get,
                                    set: function(t) {
                                        if (this.nodeType === Node.TEXT_NODE)
                                            n.set.call(this, t);
                                        else {
                                            var o = void 0;
                                            if (this.firstChild) {
                                                var r = this.childNodes
                                                    , i = r.length;
                                                if (0 < i && x(this)) {
                                                    o = Array(i);
                                                    for (var s = 0; s < i; s++)
                                                        o[s] = r[s]
                                                }
                                            }
                                            if (n.set.call(this, t),
                                                o)
                                                for (t = 0; t < o.length; t++)
                                                    G(e, o[t])
                                        }
                                    }
                                })
                            }
                            Node.prototype.insertBefore = function(t, n) {
                                if (t instanceof DocumentFragment) {
                                    var o = A(t);
                                    if (t = l.call(this, t, n),
                                        x(this))
                                        for (n = 0; n < o.length; n++)
                                            B(e, o[n]);
                                    return t
                                }
                                return o = t instanceof Element && x(t),
                                    n = l.call(this, t, n),
                                o && G(e, t),
                                x(this) && B(e, t),
                                    n
                            }
                                ,
                                Node.prototype.appendChild = function(t) {
                                    if (t instanceof DocumentFragment) {
                                        var n = A(t);
                                        if (t = c.call(this, t),
                                            x(this))
                                            for (var o = 0; o < n.length; o++)
                                                B(e, n[o]);
                                        return t
                                    }
                                    return n = t instanceof Element && x(t),
                                        o = c.call(this, t),
                                    n && G(e, t),
                                    x(this) && B(e, t),
                                        o
                                }
                                ,
                                Node.prototype.cloneNode = function(t) {
                                    return t = a.call(this, !!t),
                                        this.ownerDocument.__CE_registry ? U(e, t) : R(e, t),
                                        t
                                }
                                ,
                                Node.prototype.removeChild = function(t) {
                                    var n = t instanceof Element && x(t)
                                        , o = u.call(this, t);
                                    return n && G(e, t),
                                        o
                                }
                                ,
                                Node.prototype.replaceChild = function(t, n) {
                                    if (t instanceof DocumentFragment) {
                                        var o = A(t);
                                        if (t = h.call(this, t, n),
                                            x(this))
                                            for (G(e, n),
                                                     n = 0; n < o.length; n++)
                                                B(e, o[n]);
                                        return t
                                    }
                                    o = t instanceof Element && x(t);
                                    var r = h.call(this, t, n)
                                        , i = x(this);
                                    return i && G(e, n),
                                    o && G(e, t),
                                    i && B(e, t),
                                        r
                                }
                                ,
                                p && p.get ? t(Node.prototype, p) : function(e, t) {
                                    e.f = !0,
                                        e.h.push(t)
                                }(e, (function(e) {
                                        t(e, {
                                            enumerable: !0,
                                            configurable: !0,
                                            get: function() {
                                                for (var e = [], t = this.firstChild; t; t = t.nextSibling)
                                                    t.nodeType !== Node.COMMENT_NODE && e.push(t.textContent);
                                                return e.join("")
                                            },
                                            set: function(e) {
                                                for (; this.firstChild; )
                                                    u.call(this, this.firstChild);
                                                null != e && "" !== e && c.call(this, document.createTextNode(e))
                                            }
                                        })
                                    }
                                ))
                        }(z),
                        function(e) {
                            function n(t, n) {
                                Object.defineProperty(t, "innerHTML", {
                                    enumerable: n.enumerable,
                                    configurable: !0,
                                    get: n.get,
                                    set: function(t) {
                                        var o = this
                                            , r = void 0;
                                        if (x(this) && (r = [],
                                            H(e, this, (function(e) {
                                                    e !== o && r.push(e)
                                                }
                                            ))),
                                            n.set.call(this, t),
                                            r)
                                            for (var i = 0; i < r.length; i++) {
                                                var s = r[i];
                                                1 === s.__CE_state && e.disconnectedCallback(s)
                                            }
                                        return this.ownerDocument.__CE_registry ? U(e, this) : R(e, this),
                                            t
                                    }
                                })
                            }
                            function o(t, n) {
                                t.insertAdjacentElement = function(t, o) {
                                    var r = x(o);
                                    return t = n.call(this, t, o),
                                    r && G(e, o),
                                    x(t) && B(e, o),
                                        t
                                }
                            }
                            function r(t, n) {
                                function o(t, n) {
                                    for (var o = []; t !== n; t = t.nextSibling)
                                        o.push(t);
                                    for (n = 0; n < o.length; n++)
                                        U(e, o[n])
                                }
                                t.insertAdjacentHTML = function(e, t) {
                                    if ("beforebegin" === (e = e.toLowerCase())) {
                                        var r = this.previousSibling;
                                        n.call(this, e, t),
                                            o(r || this.parentNode.firstChild, this)
                                    } else if ("afterbegin" === e)
                                        r = this.firstChild,
                                            n.call(this, e, t),
                                            o(this.firstChild, r);
                                    else if ("beforeend" === e)
                                        r = this.lastChild,
                                            n.call(this, e, t),
                                            o(r || this.firstChild, null);
                                    else {
                                        if ("afterend" !== e)
                                            throw new SyntaxError("The value provided (" + String(e) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
                                        r = this.nextSibling,
                                            n.call(this, e, t),
                                            o(this.nextSibling, r)
                                    }
                                }
                            }
                            f && (Element.prototype.attachShadow = function(t) {
                                    if (t = f.call(this, t),
                                    e.f && !t.__CE_patched) {
                                        t.__CE_patched = !0;
                                        for (var n = 0; n < e.h.length; n++)
                                            e.h[n](t)
                                    }
                                    return this.__CE_shadowRoot = t
                                }
                            ),
                                d && d.get ? n(Element.prototype, d) : P && P.get ? n(HTMLElement.prototype, P) : function(e, t) {
                                    e.f = !0,
                                        e.a.push(t)
                                }(e, (function(e) {
                                        n(e, {
                                            enumerable: !0,
                                            configurable: !0,
                                            get: function() {
                                                return a.call(this, !0).innerHTML
                                            },
                                            set: function(e) {
                                                var n = "template" === this.localName
                                                    , o = n ? this.content : this
                                                    , r = t.call(document, this.namespaceURI, this.localName);
                                                for (r.innerHTML = e; 0 < o.childNodes.length; )
                                                    u.call(o, o.childNodes[0]);
                                                for (e = n ? r.content : r; 0 < e.childNodes.length; )
                                                    c.call(o, e.childNodes[0])
                                            }
                                        })
                                    }
                                )),
                                Element.prototype.setAttribute = function(t, n) {
                                    if (1 !== this.__CE_state)
                                        return g.call(this, t, n);
                                    var o = m.call(this, t);
                                    g.call(this, t, n),
                                        n = m.call(this, t),
                                        e.attributeChangedCallback(this, t, o, n, null)
                                }
                                ,
                                Element.prototype.setAttributeNS = function(t, n, o) {
                                    if (1 !== this.__CE_state)
                                        return v.call(this, t, n, o);
                                    var r = _.call(this, t, n);
                                    v.call(this, t, n, o),
                                        o = _.call(this, t, n),
                                        e.attributeChangedCallback(this, n, r, o, t)
                                }
                                ,
                                Element.prototype.removeAttribute = function(t) {
                                    if (1 !== this.__CE_state)
                                        return y.call(this, t);
                                    var n = m.call(this, t);
                                    y.call(this, t),
                                    null !== n && e.attributeChangedCallback(this, t, n, null, null)
                                }
                                ,
                                Element.prototype.removeAttributeNS = function(t, n) {
                                    if (1 !== this.__CE_state)
                                        return b.call(this, t, n);
                                    var o = _.call(this, t, n);
                                    b.call(this, t, n);
                                    var r = _.call(this, t, n);
                                    o !== r && e.attributeChangedCallback(this, n, o, r, t)
                                }
                                ,
                                N ? o(HTMLElement.prototype, N) : k && o(Element.prototype, k),
                                j ? r(HTMLElement.prototype, j) : E && r(Element.prototype, E),
                                oe(e, Element.prototype, {
                                    prepend: w,
                                    append: T
                                }),
                                function(e) {
                                    function t(t) {
                                        return function(n) {
                                            for (var o = [], r = 0; r < arguments.length; ++r)
                                                o[r] = arguments[r];
                                            r = [];
                                            for (var i = [], s = 0; s < o.length; s++) {
                                                var a = o[s];
                                                if (a instanceof Element && x(a) && i.push(a),
                                                a instanceof DocumentFragment)
                                                    for (a = a.firstChild; a; a = a.nextSibling)
                                                        r.push(a);
                                                else
                                                    r.push(a)
                                            }
                                            for (t.apply(this, o),
                                                     o = 0; o < i.length; o++)
                                                G(e, i[o]);
                                            if (x(this))
                                                for (o = 0; o < r.length; o++)
                                                    (i = r[o])instanceof Element && B(e, i)
                                        }
                                    }
                                    var n = Element.prototype;
                                    void 0 !== C && (n.before = t(C)),
                                    void 0 !== S && (n.after = t(S)),
                                    void 0 !== D && (n.replaceWith = function(t) {
                                            for (var n = [], o = 0; o < arguments.length; ++o)
                                                n[o] = arguments[o];
                                            o = [];
                                            for (var r = [], i = 0; i < n.length; i++) {
                                                var s = n[i];
                                                if (s instanceof Element && x(s) && r.push(s),
                                                s instanceof DocumentFragment)
                                                    for (s = s.firstChild; s; s = s.nextSibling)
                                                        o.push(s);
                                                else
                                                    o.push(s)
                                            }
                                            for (i = x(this),
                                                     D.apply(this, n),
                                                     n = 0; n < r.length; n++)
                                                G(e, r[n]);
                                            if (i)
                                                for (G(e, this),
                                                         n = 0; n < o.length; n++)
                                                    (r = o[n])instanceof Element && B(e, r)
                                        }
                                    ),
                                    void 0 !== Z && (n.remove = function() {
                                            var t = x(this);
                                            Z.call(this),
                                            t && G(e, this)
                                        }
                                    )
                                }(e)
                        }(z),
                        z = new K(z),
                        document.__CE_registry = z,
                        Object.defineProperty(window, "customElements", {
                            configurable: !0,
                            enumerable: !0,
                            value: z
                        })
                }
                ie && !ie.forcePolyfill && "function" == typeof ie.define && "function" == typeof ie.get || se(),
                    window.__CE_installPolyfill = se
            }
        ).call(self)
    },
    "g+xy": function(e, t, n) {
        "use strict";
        n.r(t),
            n("pDpN"),
            n("s1Zv"),
            n("aVe3")
    },
    pDpN: function(e, t, n) {
        var o, r;
        /**
         * @license Angular v9.1.0-next.4+61.sha-e552591.with-local-changes
         * (c) 2010-2020 Google LLC. https://angular.io/
         * License: MIT
         */
        void 0 === (r = "function" == typeof (o = function() {
                "use strict";
                /**
                 * @license
                 * Copyright Google Inc. All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                !function(e) {
                    const t = e.performance;
                    function n(e) {
                        t && t.mark && t.mark(e)
                    }
                    function o(e, n) {
                        t && t.measure && t.measure(e, n)
                    }
                    n("Zone");
                    const r = e.__Zone_symbol_prefix || "__zone_symbol__";
                    function i(e) {
                        return r + e
                    }
                    const s = !0 === e[i("forceDuplicateZoneCheck")];
                    if (e.Zone) {
                        if (s || "function" != typeof e.Zone.__symbol__)
                            throw new Error("Zone already loaded.");
                        return e.Zone
                    }
                    class a {
                        constructor(e, t) {
                            this._parent = e,
                                this._name = t ? t.name || "unnamed" : "<root>",
                                this._properties = t && t.properties || {},
                                this._zoneDelegate = new l(this,this._parent && this._parent._zoneDelegate,t)
                        }
                        static assertZonePatched() {
                            if (e.Promise !== O.ZoneAwarePromise)
                                throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")
                        }
                        static get root() {
                            let e = a.current;
                            for (; e.parent; )
                                e = e.parent;
                            return e
                        }
                        static get current() {
                            return N.zone
                        }
                        static get currentTask() {
                            return j
                        }
                        static __load_patch(t, r) {
                            if (O.hasOwnProperty(t)) {
                                if (s)
                                    throw Error("Already loaded patch: " + t)
                            } else if (!e["__Zone_disable_" + t]) {
                                const i = "Zone:" + t;
                                n(i),
                                    O[t] = r(e, a, P),
                                    o(i, i)
                            }
                        }
                        get parent() {
                            return this._parent
                        }
                        get name() {
                            return this._name
                        }
                        get(e) {
                            const t = this.getZoneWith(e);
                            if (t)
                                return t._properties[e]
                        }
                        getZoneWith(e) {
                            let t = this;
                            for (; t; ) {
                                if (t._properties.hasOwnProperty(e))
                                    return t;
                                t = t._parent
                            }
                            return null
                        }
                        fork(e) {
                            if (!e)
                                throw new Error("ZoneSpec required!");
                            return this._zoneDelegate.fork(this, e)
                        }
                        wrap(e, t) {
                            if ("function" != typeof e)
                                throw new Error("Expecting function got: " + e);
                            const n = this._zoneDelegate.intercept(this, e, t)
                                , o = this;
                            return function() {
                                return o.runGuarded(n, this, arguments, t)
                            }
                        }
                        run(e, t, n, o) {
                            N = {
                                parent: N,
                                zone: this
                            };
                            try {
                                return this._zoneDelegate.invoke(this, e, t, n, o)
                            } finally {
                                N = N.parent
                            }
                        }
                        runGuarded(e, t=null, n, o) {
                            N = {
                                parent: N,
                                zone: this
                            };
                            try {
                                try {
                                    return this._zoneDelegate.invoke(this, e, t, n, o)
                                } catch (r) {
                                    if (this._zoneDelegate.handleError(this, r))
                                        throw r
                                }
                            } finally {
                                N = N.parent
                            }
                        }
                        runTask(e, t, n) {
                            if (e.zone != this)
                                throw new Error("A task can only be run in the zone of creation! (Creation: " + (e.zone || v).name + "; Execution: " + this.name + ")");
                            if (e.state === b && (e.type === Z || e.type === D))
                                return;
                            const o = e.state != w;
                            o && e._transitionTo(w, E),
                                e.runCount++;
                            const r = j;
                            j = e,
                                N = {
                                    parent: N,
                                    zone: this
                                };
                            try {
                                e.type == D && e.data && !e.data.isPeriodic && (e.cancelFn = void 0);
                                try {
                                    return this._zoneDelegate.invokeTask(this, e, t, n)
                                } catch (i) {
                                    if (this._zoneDelegate.handleError(this, i))
                                        throw i
                                }
                            } finally {
                                e.state !== b && e.state !== C && (e.type == Z || e.data && e.data.isPeriodic ? o && e._transitionTo(E, w) : (e.runCount = 0,
                                    this._updateTaskCount(e, -1),
                                o && e._transitionTo(b, w, b))),
                                    N = N.parent,
                                    j = r
                            }
                        }
                        scheduleTask(e) {
                            if (e.zone && e.zone !== this) {
                                let t = this;
                                for (; t; ) {
                                    if (t === e.zone)
                                        throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${e.zone.name}`);
                                    t = t.parent
                                }
                            }
                            e._transitionTo(k, b);
                            const t = [];
                            e._zoneDelegates = t,
                                e._zone = this;
                            try {
                                e = this._zoneDelegate.scheduleTask(this, e)
                            } catch (n) {
                                throw e._transitionTo(C, k, b),
                                    this._zoneDelegate.handleError(this, n),
                                    n
                            }
                            return e._zoneDelegates === t && this._updateTaskCount(e, 1),
                            e.state == k && e._transitionTo(E, k),
                                e
                        }
                        scheduleMicroTask(e, t, n, o) {
                            return this.scheduleTask(new u(S,e,t,n,o,void 0))
                        }
                        scheduleMacroTask(e, t, n, o, r) {
                            return this.scheduleTask(new u(D,e,t,n,o,r))
                        }
                        scheduleEventTask(e, t, n, o, r) {
                            return this.scheduleTask(new u(Z,e,t,n,o,r))
                        }
                        cancelTask(e) {
                            if (e.zone != this)
                                throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (e.zone || v).name + "; Execution: " + this.name + ")");
                            e._transitionTo(T, E, w);
                            try {
                                this._zoneDelegate.cancelTask(this, e)
                            } catch (t) {
                                throw e._transitionTo(C, T),
                                    this._zoneDelegate.handleError(this, t),
                                    t
                            }
                            return this._updateTaskCount(e, -1),
                                e._transitionTo(b, T),
                                e.runCount = 0,
                                e
                        }
                        _updateTaskCount(e, t) {
                            const n = e._zoneDelegates;
                            -1 == t && (e._zoneDelegates = null);
                            for (let o = 0; o < n.length; o++)
                                n[o]._updateTaskCount(e.type, t)
                        }
                    }
                    a.__symbol__ = i;
                    const c = {
                        name: "",
                        onHasTask: (e, t, n, o) => e.hasTask(n, o),
                        onScheduleTask: (e, t, n, o) => e.scheduleTask(n, o),
                        onInvokeTask: (e, t, n, o, r, i) => e.invokeTask(n, o, r, i),
                        onCancelTask: (e, t, n, o) => e.cancelTask(n, o)
                    };
                    class l {
                        constructor(e, t, n) {
                            this._taskCounts = {
                                microTask: 0,
                                macroTask: 0,
                                eventTask: 0
                            },
                                this.zone = e,
                                this._parentDelegate = t,
                                this._forkZS = n && (n && n.onFork ? n : t._forkZS),
                                this._forkDlgt = n && (n.onFork ? t : t._forkDlgt),
                                this._forkCurrZone = n && (n.onFork ? this.zone : t._forkCurrZone),
                                this._interceptZS = n && (n.onIntercept ? n : t._interceptZS),
                                this._interceptDlgt = n && (n.onIntercept ? t : t._interceptDlgt),
                                this._interceptCurrZone = n && (n.onIntercept ? this.zone : t._interceptCurrZone),
                                this._invokeZS = n && (n.onInvoke ? n : t._invokeZS),
                                this._invokeDlgt = n && (n.onInvoke ? t : t._invokeDlgt),
                                this._invokeCurrZone = n && (n.onInvoke ? this.zone : t._invokeCurrZone),
                                this._handleErrorZS = n && (n.onHandleError ? n : t._handleErrorZS),
                                this._handleErrorDlgt = n && (n.onHandleError ? t : t._handleErrorDlgt),
                                this._handleErrorCurrZone = n && (n.onHandleError ? this.zone : t._handleErrorCurrZone),
                                this._scheduleTaskZS = n && (n.onScheduleTask ? n : t._scheduleTaskZS),
                                this._scheduleTaskDlgt = n && (n.onScheduleTask ? t : t._scheduleTaskDlgt),
                                this._scheduleTaskCurrZone = n && (n.onScheduleTask ? this.zone : t._scheduleTaskCurrZone),
                                this._invokeTaskZS = n && (n.onInvokeTask ? n : t._invokeTaskZS),
                                this._invokeTaskDlgt = n && (n.onInvokeTask ? t : t._invokeTaskDlgt),
                                this._invokeTaskCurrZone = n && (n.onInvokeTask ? this.zone : t._invokeTaskCurrZone),
                                this._cancelTaskZS = n && (n.onCancelTask ? n : t._cancelTaskZS),
                                this._cancelTaskDlgt = n && (n.onCancelTask ? t : t._cancelTaskDlgt),
                                this._cancelTaskCurrZone = n && (n.onCancelTask ? this.zone : t._cancelTaskCurrZone),
                                this._hasTaskZS = null,
                                this._hasTaskDlgt = null,
                                this._hasTaskDlgtOwner = null,
                                this._hasTaskCurrZone = null;
                            const o = n && n.onHasTask;
                            (o || t && t._hasTaskZS) && (this._hasTaskZS = o ? n : c,
                                this._hasTaskDlgt = t,
                                this._hasTaskDlgtOwner = this,
                                this._hasTaskCurrZone = e,
                            n.onScheduleTask || (this._scheduleTaskZS = c,
                                this._scheduleTaskDlgt = t,
                                this._scheduleTaskCurrZone = this.zone),
                            n.onInvokeTask || (this._invokeTaskZS = c,
                                this._invokeTaskDlgt = t,
                                this._invokeTaskCurrZone = this.zone),
                            n.onCancelTask || (this._cancelTaskZS = c,
                                this._cancelTaskDlgt = t,
                                this._cancelTaskCurrZone = this.zone))
                        }
                        fork(e, t) {
                            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, e, t) : new a(e,t)
                        }
                        intercept(e, t, n) {
                            return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, e, t, n) : t
                        }
                        invoke(e, t, n, o, r) {
                            return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, e, t, n, o, r) : t.apply(n, o)
                        }
                        handleError(e, t) {
                            return !this._handleErrorZS || this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, e, t)
                        }
                        scheduleTask(e, t) {
                            let n = t;
                            if (this._scheduleTaskZS)
                                this._hasTaskZS && n._zoneDelegates.push(this._hasTaskDlgtOwner),
                                    n = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, e, t),
                                n || (n = t);
                            else if (t.scheduleFn)
                                t.scheduleFn(t);
                            else {
                                if (t.type != S)
                                    throw new Error("Task is missing scheduleFn.");
                                y(t)
                            }
                            return n
                        }
                        invokeTask(e, t, n, o) {
                            return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, e, t, n, o) : t.callback.apply(n, o)
                        }
                        cancelTask(e, t) {
                            let n;
                            if (this._cancelTaskZS)
                                n = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, e, t);
                            else {
                                if (!t.cancelFn)
                                    throw Error("Task is not cancelable");
                                n = t.cancelFn(t)
                            }
                            return n
                        }
                        hasTask(e, t) {
                            try {
                                this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, e, t)
                            } catch (n) {
                                this.handleError(e, n)
                            }
                        }
                        _updateTaskCount(e, t) {
                            const n = this._taskCounts
                                , o = n[e]
                                , r = n[e] = o + t;
                            if (r < 0)
                                throw new Error("More tasks executed then were scheduled.");
                            0 != o && 0 != r || this.hasTask(this.zone, {
                                microTask: n.microTask > 0,
                                macroTask: n.macroTask > 0,
                                eventTask: n.eventTask > 0,
                                change: e
                            })
                        }
                    }
                    class u {
                        constructor(t, n, o, r, i, s) {
                            if (this._zone = null,
                                this.runCount = 0,
                                this._zoneDelegates = null,
                                this._state = "notScheduled",
                                this.type = t,
                                this.source = n,
                                this.data = r,
                                this.scheduleFn = i,
                                this.cancelFn = s,
                                !o)
                                throw new Error("callback is not defined");
                            this.callback = o;
                            const a = this;
                            this.invoke = t === Z && r && r.useG ? u.invokeTask : function() {
                                return u.invokeTask.call(e, a, this, arguments)
                            }
                        }
                        static invokeTask(e, t, n) {
                            e || (e = this),
                                z++;
                            try {
                                return e.runCount++,
                                    e.zone.runTask(e, t, n)
                            } finally {
                                1 == z && _(),
                                    z--
                            }
                        }
                        get zone() {
                            return this._zone
                        }
                        get state() {
                            return this._state
                        }
                        cancelScheduleRequest() {
                            this._transitionTo(b, k)
                        }
                        _transitionTo(e, t, n) {
                            if (this._state !== t && this._state !== n)
                                throw new Error(`${this.type} '${this.source}': can not transition to '${e}', expecting state '${t}'${n ? " or '" + n + "'" : ""}, was '${this._state}'.`);
                            this._state = e,
                            e == b && (this._zoneDelegates = null)
                        }
                        toString() {
                            return this.data && void 0 !== this.data.handleId ? this.data.handleId.toString() : Object.prototype.toString.call(this)
                        }
                        toJSON() {
                            return {
                                type: this.type,
                                state: this.state,
                                source: this.source,
                                zone: this.zone.name,
                                runCount: this.runCount
                            }
                        }
                    }
                    const h = i("setTimeout")
                        , p = i("Promise")
                        , f = i("then");
                    let d, m = [], g = !1;
                    function y(t) {
                        if (0 === z && 0 === m.length)
                            if (d || e[p] && (d = e[p].resolve(0)),
                                d) {
                                let e = d[f];
                                e || (e = d.then),
                                    e.call(d, _)
                            } else
                                e[h](_, 0);
                        t && m.push(t)
                    }
                    function _() {
                        if (!g) {
                            for (g = !0; m.length; ) {
                                const t = m;
                                m = [];
                                for (let n = 0; n < t.length; n++) {
                                    const o = t[n];
                                    try {
                                        o.zone.runTask(o, null, null)
                                    } catch (e) {
                                        P.onUnhandledError(e)
                                    }
                                }
                            }
                            P.microtaskDrainDone(),
                                g = !1
                        }
                    }
                    const v = {
                        name: "NO ZONE"
                    }
                        , b = "notScheduled"
                        , k = "scheduling"
                        , E = "scheduled"
                        , w = "running"
                        , T = "canceling"
                        , C = "unknown"
                        , S = "microTask"
                        , D = "macroTask"
                        , Z = "eventTask"
                        , O = {}
                        , P = {
                        symbol: i,
                        currentZoneFrame: () => N,
                        onUnhandledError: L,
                        microtaskDrainDone: L,
                        scheduleMicroTask: y,
                        showUncaughtError: () => !a[i("ignoreConsoleErrorUncaughtError")],
                        patchEventTarget: () => [],
                        patchOnProperties: L,
                        patchMethod: () => L,
                        bindArguments: () => [],
                        patchThen: () => L,
                        patchMacroTask: () => L,
                        setNativePromise: e => {
                            e && "function" == typeof e.resolve && (d = e.resolve(0))
                        }
                        ,
                        patchEventPrototype: () => L,
                        isIEOrEdge: () => !1,
                        getGlobalObjects: () => {}
                        ,
                        ObjectDefineProperty: () => L,
                        ObjectGetOwnPropertyDescriptor: () => {}
                        ,
                        ObjectCreate: () => {}
                        ,
                        ArraySlice: () => [],
                        patchClass: () => L,
                        wrapWithCurrentZone: () => L,
                        filterProperties: () => [],
                        attachOriginToPatched: () => L,
                        _redefineProperty: () => L,
                        patchCallbacks: () => L
                    };
                    let N = {
                        parent: null,
                        zone: new a(null,null)
                    }
                        , j = null
                        , z = 0;
                    function L() {}
                    o("Zone", "Zone"),
                        e.Zone = a
                }("undefined" != typeof window && window || "undefined" != typeof self && self || global),
                    /**
                     * @license
                     * Copyright Google Inc. All Rights Reserved.
                     *
                     * Use of this source code is governed by an MIT-style license that can be
                     * found in the LICENSE file at https://angular.io/license
                     */
                    Zone.__load_patch("ZoneAwarePromise", (e, t, n) => {
                            const o = Object.getOwnPropertyDescriptor
                                , r = Object.defineProperty
                                , i = n.symbol
                                , s = []
                                , a = !0 === e[i("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")]
                                , c = i("Promise")
                                , l = i("then");
                            n.onUnhandledError = e => {
                                if (n.showUncaughtError()) {
                                    const t = e && e.rejection;
                                    t ? console.error("Unhandled Promise rejection:", t instanceof Error ? t.message : t, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", t, t instanceof Error ? t.stack : void 0) : console.error(e)
                                }
                            }
                                ,
                                n.microtaskDrainDone = () => {
                                    for (; s.length; ) {
                                        const t = s.shift();
                                        try {
                                            t.zone.runGuarded( () => {
                                                    throw t
                                                }
                                            )
                                        } catch (e) {
                                            h(e)
                                        }
                                    }
                                }
                            ;
                            const u = i("unhandledPromiseRejectionHandler");
                            function h(e) {
                                n.onUnhandledError(e);
                                try {
                                    const n = t[u];
                                    "function" == typeof n && n.call(this, e)
                                } catch (o) {}
                            }
                            function p(e) {
                                return e && e.then
                            }
                            function f(e) {
                                return e
                            }
                            function d(e) {
                                return D.reject(e)
                            }
                            const m = i("state")
                                , g = i("value")
                                , y = i("finally")
                                , _ = i("parentPromiseValue")
                                , v = i("parentPromiseState");
                            function b(e, t) {
                                return n => {
                                    try {
                                        E(e, t, n)
                                    } catch (o) {
                                        E(e, !1, o)
                                    }
                                }
                            }
                            const k = i("currentTaskTrace");
                            function E(e, o, i) {
                                const c = function() {
                                    let e = !1;
                                    return function(t) {
                                        return function() {
                                            e || (e = !0,
                                                t.apply(null, arguments))
                                        }
                                    }
                                }();
                                if (e === i)
                                    throw new TypeError("Promise resolved with itself");
                                if (null === e[m]) {
                                    let h = null;
                                    try {
                                        "object" != typeof i && "function" != typeof i || (h = i && i.then)
                                    } catch (u) {
                                        return c( () => {
                                                E(e, !1, u)
                                            }
                                        )(),
                                            e
                                    }
                                    if (!1 !== o && i instanceof D && i.hasOwnProperty(m) && i.hasOwnProperty(g) && null !== i[m])
                                        T(i),
                                            E(e, i[m], i[g]);
                                    else if (!1 !== o && "function" == typeof h)
                                        try {
                                            h.call(i, c(b(e, o)), c(b(e, !1)))
                                        } catch (u) {
                                            c( () => {
                                                    E(e, !1, u)
                                                }
                                            )()
                                        }
                                    else {
                                        e[m] = o;
                                        const c = e[g];
                                        if (e[g] = i,
                                        e[y] === y && !0 === o && (e[m] = e[v],
                                            e[g] = e[_]),
                                        !1 === o && i instanceof Error) {
                                            const e = t.currentTask && t.currentTask.data && t.currentTask.data.__creationTrace__;
                                            e && r(i, k, {
                                                configurable: !0,
                                                enumerable: !1,
                                                writable: !0,
                                                value: e
                                            })
                                        }
                                        for (let t = 0; t < c.length; )
                                            C(e, c[t++], c[t++], c[t++], c[t++]);
                                        if (0 == c.length && 0 == o) {
                                            e[m] = 0;
                                            let o = i;
                                            if (!a)
                                                try {
                                                    throw new Error("Uncaught (in promise): " + ((l = i) && l.toString === Object.prototype.toString ? (l.constructor && l.constructor.name || "") + ": " + JSON.stringify(l) : l ? l.toString() : Object.prototype.toString.call(l)) + (i && i.stack ? "\n" + i.stack : ""))
                                                } catch (u) {
                                                    o = u
                                                }
                                            o.rejection = i,
                                                o.promise = e,
                                                o.zone = t.current,
                                                o.task = t.currentTask,
                                                s.push(o),
                                                n.scheduleMicroTask()
                                        }
                                    }
                                }
                                var l;
                                return e
                            }
                            const w = i("rejectionHandledHandler");
                            function T(e) {
                                if (0 === e[m]) {
                                    try {
                                        const n = t[w];
                                        n && "function" == typeof n && n.call(this, {
                                            rejection: e[g],
                                            promise: e
                                        })
                                    } catch (n) {}
                                    e[m] = !1;
                                    for (let t = 0; t < s.length; t++)
                                        e === s[t].promise && s.splice(t, 1)
                                }
                            }
                            function C(e, t, n, o, r) {
                                T(e);
                                const i = e[m]
                                    , s = i ? "function" == typeof o ? o : f : "function" == typeof r ? r : d;
                                t.scheduleMicroTask("Promise.then", () => {
                                        try {
                                            const o = e[g]
                                                , r = !!n && y === n[y];
                                            r && (n[_] = o,
                                                n[v] = i);
                                            const a = t.run(s, void 0, r && s !== d && s !== f ? [] : [o]);
                                            E(n, !0, a)
                                        } catch (o) {
                                            E(n, !1, o)
                                        }
                                    }
                                    , n)
                            }
                            const S = function() {};
                            class D {
                                static toString() {
                                    return "function ZoneAwarePromise() { [native code] }"
                                }
                                static resolve(e) {
                                    return E(new this(null), !0, e)
                                }
                                static reject(e) {
                                    return E(new this(null), !1, e)
                                }
                                static race(e) {
                                    let t, n, o = new this( (e, o) => {
                                            t = e,
                                                n = o
                                        }
                                    );
                                    function r(e) {
                                        t(e)
                                    }
                                    function i(e) {
                                        n(e)
                                    }
                                    for (let s of e)
                                        p(s) || (s = this.resolve(s)),
                                            s.then(r, i);
                                    return o
                                }
                                static all(e) {
                                    return D.allWithCallback(e)
                                }
                                static allSettled(e) {
                                    return (this && this.prototype instanceof D ? this : D).allWithCallback(e, {
                                        thenCallback: e => ({
                                            status: "fulfilled",
                                            value: e
                                        }),
                                        errorCallback: e => ({
                                            status: "rejected",
                                            reason: e
                                        })
                                    })
                                }
                                static allWithCallback(e, t) {
                                    let n, o, r = new this( (e, t) => {
                                            n = e,
                                                o = t
                                        }
                                    ), i = 2, s = 0;
                                    const a = [];
                                    for (let l of e) {
                                        p(l) || (l = this.resolve(l));
                                        const e = s;
                                        try {
                                            l.then(o => {
                                                    a[e] = t ? t.thenCallback(o) : o,
                                                        i--,
                                                    0 === i && n(a)
                                                }
                                                , r => {
                                                    t ? (a[e] = t.errorCallback(r),
                                                        i--,
                                                    0 === i && n(a)) : o(r)
                                                }
                                            )
                                        } catch (c) {
                                            o(c)
                                        }
                                        i++,
                                            s++
                                    }
                                    return i -= 2,
                                    0 === i && n(a),
                                        r
                                }
                                constructor(e) {
                                    const t = this;
                                    if (!(t instanceof D))
                                        throw new Error("Must be an instanceof Promise.");
                                    t[m] = null,
                                        t[g] = [];
                                    try {
                                        e && e(b(t, !0), b(t, !1))
                                    } catch (n) {
                                        E(t, !1, n)
                                    }
                                }
                                get[Symbol.toStringTag]() {
                                    return "Promise"
                                }
                                get[Symbol.species]() {
                                    return D
                                }
                                then(e, n) {
                                    let o = this.constructor[Symbol.species];
                                    o && "function" == typeof o || (o = this.constructor || D);
                                    const r = new o(S)
                                        , i = t.current;
                                    return null == this[m] ? this[g].push(i, r, e, n) : C(this, i, r, e, n),
                                        r
                                }
                                catch(e) {
                                    return this.then(null, e)
                                }
                                finally(e) {
                                    let n = this.constructor[Symbol.species];
                                    n && "function" == typeof n || (n = D);
                                    const o = new n(S);
                                    o[y] = y;
                                    const r = t.current;
                                    return null == this[m] ? this[g].push(r, o, e, e) : C(this, r, o, e, e),
                                        o
                                }
                            }
                            D.resolve = D.resolve,
                                D.reject = D.reject,
                                D.race = D.race,
                                D.all = D.all;
                            const Z = e[c] = e.Promise
                                , O = t.__symbol__("ZoneAwarePromise");
                            let P = o(e, "Promise");
                            P && !P.configurable || (P && delete P.writable,
                            P && delete P.value,
                            P || (P = {
                                configurable: !0,
                                enumerable: !0
                            }),
                                P.get = function() {
                                    return e[O] ? e[O] : e[c]
                                }
                                ,
                                P.set = function(t) {
                                    t === D ? e[O] = t : (e[c] = t,
                                    t.prototype[l] || j(t),
                                        n.setNativePromise(t))
                                }
                                ,
                                r(e, "Promise", P)),
                                e.Promise = D;
                            const N = i("thenPatched");
                            function j(e) {
                                const t = e.prototype
                                    , n = o(t, "then");
                                if (n && (!1 === n.writable || !n.configurable))
                                    return;
                                const r = t.then;
                                t[l] = r,
                                    e.prototype.then = function(e, t) {
                                        return new D( (e, t) => {
                                                r.call(this, e, t)
                                            }
                                        ).then(e, t)
                                    }
                                    ,
                                    e[N] = !0
                            }
                            if (n.patchThen = j,
                                Z) {
                                j(Z);
                                const t = e.fetch;
                                "function" == typeof t && (e[n.symbol("fetch")] = t,
                                    e.fetch = (z = t,
                                            function() {
                                                let e = z.apply(this, arguments);
                                                if (e instanceof D)
                                                    return e;
                                                let t = e.constructor;
                                                return t[N] || j(t),
                                                    e
                                            }
                                    ))
                            }
                            var z;
                            return Promise[t.__symbol__("uncaughtPromiseErrors")] = s,
                                D
                        }
                    );
                /**
                 * @license
                 * Copyright Google Inc. All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                const e = Object.getOwnPropertyDescriptor
                    , t = Object.defineProperty
                    , n = Object.getPrototypeOf
                    , o = Object.create
                    , r = Array.prototype.slice
                    , i = Zone.__symbol__("addEventListener")
                    , s = Zone.__symbol__("removeEventListener")
                    , a = Zone.__symbol__("");
                function c(e, t) {
                    return Zone.current.wrap(e, t)
                }
                function l(e, t, n, o, r) {
                    return Zone.current.scheduleMacroTask(e, t, n, o, r)
                }
                const u = Zone.__symbol__
                    , h = "undefined" != typeof window
                    , p = h ? window : void 0
                    , f = h && p || "object" == typeof self && self || global
                    , d = [null];
                function m(e, t) {
                    for (let n = e.length - 1; n >= 0; n--)
                        "function" == typeof e[n] && (e[n] = c(e[n], t + "_" + n));
                    return e
                }
                function g(e) {
                    return !e || !1 !== e.writable && !("function" == typeof e.get && void 0 === e.set)
                }
                const y = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
                    , _ = !("nw"in f) && void 0 !== f.process && "[object process]" === {}.toString.call(f.process)
                    , v = !_ && !y && !(!h || !p.HTMLElement)
                    , b = void 0 !== f.process && "[object process]" === {}.toString.call(f.process) && !y && !(!h || !p.HTMLElement)
                    , k = {}
                    , E = function(e) {
                    if (!(e = e || f.event))
                        return;
                    let t = k[e.type];
                    t || (t = k[e.type] = u("ON_PROPERTY" + e.type));
                    const n = this || e.target || f
                        , o = n[t];
                    let r;
                    if (v && n === p && "error" === e.type) {
                        const t = e;
                        r = o && o.call(this, t.message, t.filename, t.lineno, t.colno, t.error),
                        !0 === r && e.preventDefault()
                    } else
                        r = o && o.apply(this, arguments),
                        null == r || r || e.preventDefault();
                    return r
                };
                function w(n, o, r) {
                    let i = e(n, o);
                    if (!i && r && e(r, o) && (i = {
                        enumerable: !0,
                        configurable: !0
                    }),
                    !i || !i.configurable)
                        return;
                    const s = u("on" + o + "patched");
                    if (n.hasOwnProperty(s) && n[s])
                        return;
                    delete i.writable,
                        delete i.value;
                    const a = i.get
                        , c = i.set
                        , l = o.substr(2);
                    let h = k[l];
                    h || (h = k[l] = u("ON_PROPERTY" + l)),
                        i.set = function(e) {
                            let t = this;
                            t || n !== f || (t = f),
                            t && (t[h] && t.removeEventListener(l, E),
                            c && c.apply(t, d),
                                "function" == typeof e ? (t[h] = e,
                                    t.addEventListener(l, E, !1)) : t[h] = null)
                        }
                        ,
                        i.get = function() {
                            let e = this;
                            if (e || n !== f || (e = f),
                                !e)
                                return null;
                            const t = e[h];
                            if (t)
                                return t;
                            if (a) {
                                let t = a && a.call(this);
                                if (t)
                                    return i.set.call(this, t),
                                    "function" == typeof e.removeAttribute && e.removeAttribute(o),
                                        t
                            }
                            return null
                        }
                        ,
                        t(n, o, i),
                        n[s] = !0
                }
                function T(e, t, n) {
                    if (t)
                        for (let o = 0; o < t.length; o++)
                            w(e, "on" + t[o], n);
                    else {
                        const t = [];
                        for (const n in e)
                            "on" == n.substr(0, 2) && t.push(n);
                        for (let o = 0; o < t.length; o++)
                            w(e, t[o], n)
                    }
                }
                const C = u("originalInstance");
                function S(e) {
                    const n = f[e];
                    if (!n)
                        return;
                    f[u(e)] = n,
                        f[e] = function() {
                            const t = m(arguments, e);
                            switch (t.length) {
                                case 0:
                                    this[C] = new n;
                                    break;
                                case 1:
                                    this[C] = new n(t[0]);
                                    break;
                                case 2:
                                    this[C] = new n(t[0],t[1]);
                                    break;
                                case 3:
                                    this[C] = new n(t[0],t[1],t[2]);
                                    break;
                                case 4:
                                    this[C] = new n(t[0],t[1],t[2],t[3]);
                                    break;
                                default:
                                    throw new Error("Arg list too long.")
                            }
                        }
                        ,
                        O(f[e], n);
                    const o = new n((function() {}
                    ));
                    let r;
                    for (r in o)
                        "XMLHttpRequest" === e && "responseBlob" === r || function(n) {
                            "function" == typeof o[n] ? f[e].prototype[n] = function() {
                                    return this[C][n].apply(this[C], arguments)
                                }
                                : t(f[e].prototype, n, {
                                    set: function(t) {
                                        "function" == typeof t ? (this[C][n] = c(t, e + "." + n),
                                            O(this[C][n], t)) : this[C][n] = t
                                    },
                                    get: function() {
                                        return this[C][n]
                                    }
                                })
                        }(r);
                    for (r in n)
                        "prototype" !== r && n.hasOwnProperty(r) && (f[e][r] = n[r])
                }
                function D(t, o, r) {
                    let i = t;
                    for (; i && !i.hasOwnProperty(o); )
                        i = n(i);
                    !i && t[o] && (i = t);
                    const s = u(o);
                    let a = null;
                    if (i && !(a = i[s]) && (a = i[s] = i[o],
                        g(i && e(i, o)))) {
                        const e = r(a, s, o);
                        i[o] = function() {
                            return e(this, arguments)
                        }
                            ,
                            O(i[o], a)
                    }
                    return a
                }
                function Z(e, t, n) {
                    let o = null;
                    function r(e) {
                        const t = e.data;
                        return t.args[t.cbIdx] = function() {
                            e.invoke.apply(this, arguments)
                        }
                            ,
                            o.apply(t.target, t.args),
                            e
                    }
                    o = D(e, t, e => function(t, o) {
                            const i = n(t, o);
                            return i.cbIdx >= 0 && "function" == typeof o[i.cbIdx] ? l(i.name, o[i.cbIdx], i, r) : e.apply(t, o)
                        }
                    )
                }
                function O(e, t) {
                    e[u("OriginalDelegate")] = t
                }
                let P = !1
                    , N = !1;
                function j() {
                    try {
                        const e = p.navigator.userAgent;
                        if (-1 !== e.indexOf("MSIE ") || -1 !== e.indexOf("Trident/"))
                            return !0
                    } catch (e) {}
                    return !1
                }
                function z() {
                    if (P)
                        return N;
                    P = !0;
                    try {
                        const e = p.navigator.userAgent;
                        -1 === e.indexOf("MSIE ") && -1 === e.indexOf("Trident/") && -1 === e.indexOf("Edge/") || (N = !0)
                    } catch (e) {}
                    return N
                }
                /**
                 * @license
                 * Copyright Google Inc. All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                Zone.__load_patch("toString", e => {
                        const t = Function.prototype.toString
                            , n = u("OriginalDelegate")
                            , o = u("Promise")
                            , r = u("Error")
                            , i = function() {
                            if ("function" == typeof this) {
                                const i = this[n];
                                if (i)
                                    return "function" == typeof i ? t.call(i) : Object.prototype.toString.call(i);
                                if (this === Promise) {
                                    const n = e[o];
                                    if (n)
                                        return t.call(n)
                                }
                                if (this === Error) {
                                    const n = e[r];
                                    if (n)
                                        return t.call(n)
                                }
                            }
                            return t.call(this)
                        };
                        i[n] = t,
                            Function.prototype.toString = i;
                        const s = Object.prototype.toString;
                        Object.prototype.toString = function() {
                            return this instanceof Promise ? "[object Promise]" : s.call(this)
                        }
                    }
                );
                /**
                 * @license
                 * Copyright Google Inc. All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                let L = !1;
                if ("undefined" != typeof window)
                    try {
                        const e = Object.defineProperty({}, "passive", {
                            get: function() {
                                L = !0
                            }
                        });
                        window.addEventListener("test", e, e),
                            window.removeEventListener("test", e, e)
                    } catch (ae) {
                        L = !1
                    }
                const M = {
                    useG: !0
                }
                    , x = {}
                    , A = {}
                    , I = new RegExp("^" + a + "(\\w+)(true|false)$")
                    , F = u("propagationStopped");
                function H(e, t) {
                    const n = (t ? t(e) : e) + "false"
                        , o = (t ? t(e) : e) + "true"
                        , r = a + n
                        , i = a + o;
                    x[e] = {},
                        x[e].false = r,
                        x[e].true = i
                }
                function R(e, t, o) {
                    const r = o && o.add || "addEventListener"
                        , i = o && o.rm || "removeEventListener"
                        , s = o && o.listeners || "eventListeners"
                        , c = o && o.rmAll || "removeAllListeners"
                        , l = u(r)
                        , h = "." + r + ":"
                        , p = function(e, t, n) {
                        if (e.isRemoved)
                            return;
                        const o = e.callback;
                        "object" == typeof o && o.handleEvent && (e.callback = e => o.handleEvent(e),
                            e.originalDelegate = o),
                            e.invoke(e, t, [n]);
                        const r = e.options;
                        r && "object" == typeof r && r.once && t[i].call(t, n.type, e.originalDelegate ? e.originalDelegate : e.callback, r)
                    }
                        , f = function(t) {
                        if (!(t = t || e.event))
                            return;
                        const n = this || t.target || e
                            , o = n[x[t.type].false];
                        if (o)
                            if (1 === o.length)
                                p(o[0], n, t);
                            else {
                                const e = o.slice();
                                for (let o = 0; o < e.length && (!t || !0 !== t[F]); o++)
                                    p(e[o], n, t)
                            }
                    }
                        , d = function(t) {
                        if (!(t = t || e.event))
                            return;
                        const n = this || t.target || e
                            , o = n[x[t.type].true];
                        if (o)
                            if (1 === o.length)
                                p(o[0], n, t);
                            else {
                                const e = o.slice();
                                for (let o = 0; o < e.length && (!t || !0 !== t[F]); o++)
                                    p(e[o], n, t)
                            }
                    };
                    function m(t, o) {
                        if (!t)
                            return !1;
                        let p = !0;
                        o && void 0 !== o.useG && (p = o.useG);
                        const m = o && o.vh;
                        let g = !0;
                        o && void 0 !== o.chkDup && (g = o.chkDup);
                        let y = !1;
                        o && void 0 !== o.rt && (y = o.rt);
                        let v = t;
                        for (; v && !v.hasOwnProperty(r); )
                            v = n(v);
                        if (!v && t[r] && (v = t),
                            !v)
                            return !1;
                        if (v[l])
                            return !1;
                        const b = o && o.eventNameToString
                            , k = {}
                            , E = v[l] = v[r]
                            , w = v[u(i)] = v[i]
                            , T = v[u(s)] = v[s]
                            , C = v[u(c)] = v[c];
                        let S;
                        function D(e, t) {
                            return !L && "object" == typeof e && e ? !!e.capture : L && t ? "boolean" == typeof e ? {
                                capture: e,
                                passive: !0
                            } : e ? "object" == typeof e && !1 !== e.passive ? Object.assign(Object.assign({}, e), {
                                passive: !0
                            }) : e : {
                                passive: !0
                            } : e
                        }
                        o && o.prepend && (S = v[u(o.prepend)] = v[o.prepend]);
                        const Z = p ? function(e) {
                                if (!k.isExisting)
                                    return E.call(k.target, k.eventName, k.capture ? d : f, k.options)
                            }
                            : function(e) {
                                return E.call(k.target, k.eventName, e.invoke, k.options)
                            }
                            , P = p ? function(e) {
                                if (!e.isRemoved) {
                                    const t = x[e.eventName];
                                    let n;
                                    t && (n = t[e.capture ? "true" : "false"]);
                                    const o = n && e.target[n];
                                    if (o)
                                        for (let r = 0; r < o.length; r++)
                                            if (o[r] === e) {
                                                o.splice(r, 1),
                                                    e.isRemoved = !0,
                                                0 === o.length && (e.allRemoved = !0,
                                                    e.target[n] = null);
                                                break
                                            }
                                }
                                if (e.allRemoved)
                                    return w.call(e.target, e.eventName, e.capture ? d : f, e.options)
                            }
                            : function(e) {
                                return w.call(e.target, e.eventName, e.invoke, e.options)
                            }
                            , N = o && o.diff ? o.diff : function(e, t) {
                            const n = typeof t;
                            return "function" === n && e.callback === t || "object" === n && e.originalDelegate === t
                        }
                            , j = Zone[u("BLACK_LISTED_EVENTS")]
                            , z = e[u("PASSIVE_EVENTS")]
                            , F = function(t, n, r, i, s=!1, a=!1) {
                            return function() {
                                const c = this || e;
                                let l = arguments[0];
                                o && o.transferEventName && (l = o.transferEventName(l));
                                let u = arguments[1];
                                if (!u)
                                    return t.apply(this, arguments);
                                if (_ && "uncaughtException" === l)
                                    return t.apply(this, arguments);
                                let h = !1;
                                if ("function" != typeof u) {
                                    if (!u.handleEvent)
                                        return t.apply(this, arguments);
                                    h = !0
                                }
                                if (m && !m(t, u, c, arguments))
                                    return;
                                const f = L && !!z && -1 !== z.indexOf(l)
                                    , d = D(arguments[2], f);
                                if (j)
                                    for (let e = 0; e < j.length; e++)
                                        if (l === j[e])
                                            return f ? t.call(c, l, u, d) : t.apply(this, arguments);
                                const y = !!d && ("boolean" == typeof d || d.capture)
                                    , v = !(!d || "object" != typeof d) && d.once
                                    , E = Zone.current;
                                let w = x[l];
                                w || (H(l, b),
                                    w = x[l]);
                                const T = w[y ? "true" : "false"];
                                let C, S = c[T], Z = !1;
                                if (S) {
                                    if (Z = !0,
                                        g)
                                        for (let e = 0; e < S.length; e++)
                                            if (N(S[e], u))
                                                return
                                } else
                                    S = c[T] = [];
                                const O = c.constructor.name
                                    , P = A[O];
                                P && (C = P[l]),
                                C || (C = O + n + (b ? b(l) : l)),
                                    k.options = d,
                                v && (k.options.once = !1),
                                    k.target = c,
                                    k.capture = y,
                                    k.eventName = l,
                                    k.isExisting = Z;
                                const I = p ? M : void 0;
                                I && (I.taskData = k);
                                const F = E.scheduleEventTask(C, u, I, r, i);
                                return k.target = null,
                                I && (I.taskData = null),
                                v && (d.once = !0),
                                (L || "boolean" != typeof F.options) && (F.options = d),
                                    F.target = c,
                                    F.capture = y,
                                    F.eventName = l,
                                h && (F.originalDelegate = u),
                                    a ? S.unshift(F) : S.push(F),
                                    s ? c : void 0
                            }
                        };
                        return v[r] = F(E, h, Z, P, y),
                        S && (v.prependListener = F(S, ".prependListener:", (function(e) {
                                return S.call(k.target, k.eventName, e.invoke, k.options)
                            }
                        ), P, y, !0)),
                            v[i] = function() {
                                const t = this || e;
                                let n = arguments[0];
                                o && o.transferEventName && (n = o.transferEventName(n));
                                const r = arguments[2]
                                    , i = !!r && ("boolean" == typeof r || r.capture)
                                    , s = arguments[1];
                                if (!s)
                                    return w.apply(this, arguments);
                                if (m && !m(w, s, t, arguments))
                                    return;
                                const c = x[n];
                                let l;
                                c && (l = c[i ? "true" : "false"]);
                                const u = l && t[l];
                                if (u)
                                    for (let e = 0; e < u.length; e++) {
                                        const o = u[e];
                                        if (N(o, s))
                                            return u.splice(e, 1),
                                                o.isRemoved = !0,
                                            0 === u.length && (o.allRemoved = !0,
                                                t[l] = null,
                                            "string" == typeof n) && (t[a + "ON_PROPERTY" + n] = null),
                                                o.zone.cancelTask(o),
                                                y ? t : void 0
                                    }
                                return w.apply(this, arguments)
                            }
                            ,
                            v[s] = function() {
                                const t = this || e;
                                let n = arguments[0];
                                o && o.transferEventName && (n = o.transferEventName(n));
                                const r = []
                                    , i = W(t, b ? b(n) : n);
                                for (let e = 0; e < i.length; e++) {
                                    const t = i[e];
                                    r.push(t.originalDelegate ? t.originalDelegate : t.callback)
                                }
                                return r
                            }
                            ,
                            v[c] = function() {
                                const t = this || e;
                                let n = arguments[0];
                                if (n) {
                                    o && o.transferEventName && (n = o.transferEventName(n));
                                    const e = x[n];
                                    if (e) {
                                        const o = t[e.false]
                                            , r = t[e.true];
                                        if (o) {
                                            const e = o.slice();
                                            for (let t = 0; t < e.length; t++) {
                                                const o = e[t];
                                                this[i].call(this, n, o.originalDelegate ? o.originalDelegate : o.callback, o.options)
                                            }
                                        }
                                        if (r) {
                                            const e = r.slice();
                                            for (let t = 0; t < e.length; t++) {
                                                const o = e[t];
                                                this[i].call(this, n, o.originalDelegate ? o.originalDelegate : o.callback, o.options)
                                            }
                                        }
                                    }
                                } else {
                                    const e = Object.keys(t);
                                    for (let t = 0; t < e.length; t++) {
                                        const n = I.exec(e[t]);
                                        let o = n && n[1];
                                        o && "removeListener" !== o && this[c].call(this, o)
                                    }
                                    this[c].call(this, "removeListener")
                                }
                                if (y)
                                    return this
                            }
                            ,
                            O(v[r], E),
                            O(v[i], w),
                        C && O(v[c], C),
                        T && O(v[s], T),
                            !0
                    }
                    let g = [];
                    for (let n = 0; n < t.length; n++)
                        g[n] = m(t[n], o);
                    return g
                }
                function W(e, t) {
                    if (!t) {
                        const n = [];
                        for (let o in e) {
                            const r = I.exec(o);
                            let i = r && r[1];
                            if (i && (!t || i === t)) {
                                const t = e[o];
                                if (t)
                                    for (let e = 0; e < t.length; e++)
                                        n.push(t[e])
                            }
                        }
                        return n
                    }
                    let n = x[t];
                    n || (H(t),
                        n = x[t]);
                    const o = e[n.false]
                        , r = e[n.true];
                    return o ? r ? o.concat(r) : o.slice() : r ? r.slice() : []
                }
                function B(e, t) {
                    const n = e.Event;
                    n && n.prototype && t.patchMethod(n.prototype, "stopImmediatePropagation", e => function(t, n) {
                            t[F] = !0,
                            e && e.apply(t, n)
                        }
                    )
                }
                /**
                 * @license
                 * Copyright Google Inc. All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                function G(e, t, n, o, r) {
                    const i = Zone.__symbol__(o);
                    if (t[i])
                        return;
                    const s = t[i] = t[o];
                    t[o] = function(i, a, c) {
                        return a && a.prototype && r.forEach((function(t) {
                                const r = `${n}.${o}::` + t
                                    , i = a.prototype;
                                if (i.hasOwnProperty(t)) {
                                    const n = e.ObjectGetOwnPropertyDescriptor(i, t);
                                    n && n.value ? (n.value = e.wrapWithCurrentZone(n.value, r),
                                        e._redefineProperty(a.prototype, t, n)) : i[t] && (i[t] = e.wrapWithCurrentZone(i[t], r))
                                } else
                                    i[t] && (i[t] = e.wrapWithCurrentZone(i[t], r))
                            }
                        )),
                            s.call(t, i, a, c)
                    }
                        ,
                        e.attachOriginToPatched(t[o], s)
                }
                /**
                 * @license
                 * Copyright Google Inc. All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                const U = ["absolutedeviceorientation", "afterinput", "afterprint", "appinstalled", "beforeinstallprompt", "beforeprint", "beforeunload", "devicelight", "devicemotion", "deviceorientation", "deviceorientationabsolute", "deviceproximity", "hashchange", "languagechange", "message", "mozbeforepaint", "offline", "online", "paint", "pageshow", "pagehide", "popstate", "rejectionhandled", "storage", "unhandledrejection", "unload", "userproximity", "vrdisplayconnected", "vrdisplaydisconnected", "vrdisplaypresentchange"]
                    , q = ["encrypted", "waitingforkey", "msneedkey", "mozinterruptbegin", "mozinterruptend"]
                    , V = ["load"]
                    , $ = ["blur", "error", "focus", "load", "resize", "scroll", "messageerror"]
                    , X = ["bounce", "finish", "start"]
                    , J = ["loadstart", "progress", "abort", "error", "load", "progress", "timeout", "loadend", "readystatechange"]
                    , Y = ["upgradeneeded", "complete", "abort", "success", "error", "blocked", "versionchange", "close"]
                    , K = ["close", "error", "open", "message"]
                    , Q = ["error", "message"]
                    , ee = ["abort", "animationcancel", "animationend", "animationiteration", "auxclick", "beforeinput", "blur", "cancel", "canplay", "canplaythrough", "change", "compositionstart", "compositionupdate", "compositionend", "cuechange", "click", "close", "contextmenu", "curechange", "dblclick", "drag", "dragend", "dragenter", "dragexit", "dragleave", "dragover", "drop", "durationchange", "emptied", "ended", "error", "focus", "focusin", "focusout", "gotpointercapture", "input", "invalid", "keydown", "keypress", "keyup", "load", "loadstart", "loadeddata", "loadedmetadata", "lostpointercapture", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "orientationchange", "pause", "play", "playing", "pointercancel", "pointerdown", "pointerenter", "pointerleave", "pointerlockchange", "mozpointerlockchange", "webkitpointerlockerchange", "pointerlockerror", "mozpointerlockerror", "webkitpointerlockerror", "pointermove", "pointout", "pointerover", "pointerup", "progress", "ratechange", "reset", "resize", "scroll", "seeked", "seeking", "select", "selectionchange", "selectstart", "show", "sort", "stalled", "submit", "suspend", "timeupdate", "volumechange", "touchcancel", "touchmove", "touchstart", "touchend", "transitioncancel", "transitionend", "waiting", "wheel"].concat(["webglcontextrestored", "webglcontextlost", "webglcontextcreationerror"], ["autocomplete", "autocompleteerror"], ["toggle"], ["afterscriptexecute", "beforescriptexecute", "DOMContentLoaded", "freeze", "fullscreenchange", "mozfullscreenchange", "webkitfullscreenchange", "msfullscreenchange", "fullscreenerror", "mozfullscreenerror", "webkitfullscreenerror", "msfullscreenerror", "readystatechange", "visibilitychange", "resume"], U, ["beforecopy", "beforecut", "beforepaste", "copy", "cut", "paste", "dragstart", "loadend", "animationstart", "search", "transitionrun", "transitionstart", "webkitanimationend", "webkitanimationiteration", "webkitanimationstart", "webkittransitionend"], ["activate", "afterupdate", "ariarequest", "beforeactivate", "beforedeactivate", "beforeeditfocus", "beforeupdate", "cellchange", "controlselect", "dataavailable", "datasetchanged", "datasetcomplete", "errorupdate", "filterchange", "layoutcomplete", "losecapture", "move", "moveend", "movestart", "propertychange", "resizeend", "resizestart", "rowenter", "rowexit", "rowsdelete", "rowsinserted", "command", "compassneedscalibration", "deactivate", "help", "mscontentzoom", "msmanipulationstatechanged", "msgesturechange", "msgesturedoubletap", "msgestureend", "msgesturehold", "msgesturestart", "msgesturetap", "msgotpointercapture", "msinertiastart", "mslostpointercapture", "mspointercancel", "mspointerdown", "mspointerenter", "mspointerhover", "mspointerleave", "mspointermove", "mspointerout", "mspointerover", "mspointerup", "pointerout", "mssitemodejumplistitemremoved", "msthumbnailclick", "stop", "storagecommit"]);
                function te(e, t, n) {
                    if (!n || 0 === n.length)
                        return t;
                    const o = n.filter(t => t.target === e);
                    if (!o || 0 === o.length)
                        return t;
                    const r = o[0].ignoreProperties;
                    return t.filter(e => -1 === r.indexOf(e))
                }
                function ne(e, t, n, o) {
                    e && T(e, te(e, t, n), o)
                }
                function oe(e, t) {
                    if (_ && !b)
                        return;
                    if (Zone[e.symbol("patchEvents")])
                        return;
                    const o = "undefined" != typeof WebSocket
                        , r = t.__Zone_ignore_on_properties;
                    if (v) {
                        const e = window
                            , t = j ? [{
                            target: e,
                            ignoreProperties: ["error"]
                        }] : [];
                        ne(e, ee.concat(["messageerror"]), r ? r.concat(t) : r, n(e)),
                            ne(Document.prototype, ee, r),
                        void 0 !== e.SVGElement && ne(e.SVGElement.prototype, ee, r),
                            ne(Element.prototype, ee, r),
                            ne(HTMLElement.prototype, ee, r),
                            ne(HTMLMediaElement.prototype, q, r),
                            ne(HTMLFrameSetElement.prototype, U.concat($), r),
                            ne(HTMLBodyElement.prototype, U.concat($), r),
                            ne(HTMLFrameElement.prototype, V, r),
                            ne(HTMLIFrameElement.prototype, V, r);
                        const o = e.HTMLMarqueeElement;
                        o && ne(o.prototype, X, r);
                        const i = e.Worker;
                        i && ne(i.prototype, Q, r)
                    }
                    const i = t.XMLHttpRequest;
                    i && ne(i.prototype, J, r);
                    const s = t.XMLHttpRequestEventTarget;
                    s && ne(s && s.prototype, J, r),
                    "undefined" != typeof IDBIndex && (ne(IDBIndex.prototype, Y, r),
                        ne(IDBRequest.prototype, Y, r),
                        ne(IDBOpenDBRequest.prototype, Y, r),
                        ne(IDBDatabase.prototype, Y, r),
                        ne(IDBTransaction.prototype, Y, r),
                        ne(IDBCursor.prototype, Y, r)),
                    o && ne(WebSocket.prototype, K, r)
                }
                /**
                 * @license
                 * Copyright Google Inc. All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                Zone.__load_patch("util", (n, i, s) => {
                        s.patchOnProperties = T,
                            s.patchMethod = D,
                            s.bindArguments = m,
                            s.patchMacroTask = Z;
                        const l = i.__symbol__("BLACK_LISTED_EVENTS")
                            , u = i.__symbol__("UNPATCHED_EVENTS");
                        n[u] && (n[l] = n[u]),
                        n[l] && (i[l] = i[u] = n[l]),
                            s.patchEventPrototype = B,
                            s.patchEventTarget = R,
                            s.isIEOrEdge = z,
                            s.ObjectDefineProperty = t,
                            s.ObjectGetOwnPropertyDescriptor = e,
                            s.ObjectCreate = o,
                            s.ArraySlice = r,
                            s.patchClass = S,
                            s.wrapWithCurrentZone = c,
                            s.filterProperties = te,
                            s.attachOriginToPatched = O,
                            s._redefineProperty = Object.defineProperty,
                            s.patchCallbacks = G,
                            s.getGlobalObjects = () => ({
                                globalSources: A,
                                zoneSymbolEventNames: x,
                                eventNames: ee,
                                isBrowser: v,
                                isMix: b,
                                isNode: _,
                                TRUE_STR: "true",
                                FALSE_STR: "false",
                                ZONE_SYMBOL_PREFIX: a,
                                ADD_EVENT_LISTENER_STR: "addEventListener",
                                REMOVE_EVENT_LISTENER_STR: "removeEventListener"
                            })
                    }
                );
                /**
                 * @license
                 * Copyright Google Inc. All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                const re = u("zoneTask");
                function ie(e, t, n, o) {
                    let r = null
                        , i = null;
                    n += o;
                    const s = {};
                    function a(t) {
                        const n = t.data;
                        return n.args[0] = function() {
                            try {
                                t.invoke.apply(this, arguments)
                            } finally {
                                t.data && t.data.isPeriodic || ("number" == typeof n.handleId ? delete s[n.handleId] : n.handleId && (n.handleId[re] = null))
                            }
                        }
                            ,
                            n.handleId = r.apply(e, n.args),
                            t
                    }
                    function c(e) {
                        return i(e.data.handleId)
                    }
                    r = D(e, t += o, n => function(r, i) {
                            if ("function" == typeof i[0]) {
                                const e = l(t, i[0], {
                                    isPeriodic: "Interval" === o,
                                    delay: "Timeout" === o || "Interval" === o ? i[1] || 0 : void 0,
                                    args: i
                                }, a, c);
                                if (!e)
                                    return e;
                                const n = e.data.handleId;
                                return "number" == typeof n ? s[n] = e : n && (n[re] = e),
                                n && n.ref && n.unref && "function" == typeof n.ref && "function" == typeof n.unref && (e.ref = n.ref.bind(n),
                                    e.unref = n.unref.bind(n)),
                                    "number" == typeof n || n ? n : e
                            }
                            return n.apply(e, i)
                        }
                    ),
                        i = D(e, n, t => function(n, o) {
                                const r = o[0];
                                let i;
                                "number" == typeof r ? i = s[r] : (i = r && r[re],
                                i || (i = r)),
                                    i && "string" == typeof i.type ? "notScheduled" !== i.state && (i.cancelFn && i.data.isPeriodic || 0 === i.runCount) && ("number" == typeof r ? delete s[r] : r && (r[re] = null),
                                        i.zone.cancelTask(i)) : t.apply(e, o)
                            }
                        )
                }
                /**
                 * @license
                 * Copyright Google Inc. All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                /**
                 * @license
                 * Copyright Google Inc. All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                function se(e, t) {
                    if (Zone[t.symbol("patchEventTarget")])
                        return;
                    const {eventNames: n, zoneSymbolEventNames: o, TRUE_STR: r, FALSE_STR: i, ZONE_SYMBOL_PREFIX: s} = t.getGlobalObjects();
                    for (let c = 0; c < n.length; c++) {
                        const e = n[c]
                            , t = s + (e + i)
                            , a = s + (e + r);
                        o[e] = {},
                            o[e][i] = t,
                            o[e][r] = a
                    }
                    const a = e.EventTarget;
                    return a && a.prototype ? (t.patchEventTarget(e, [a && a.prototype]),
                        !0) : void 0
                }
                /**
                 * @license
                 * Copyright Google Inc. All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                Zone.__load_patch("legacy", e => {
                        const t = e[Zone.__symbol__("legacyPatch")];
                        t && t()
                    }
                ),
                    Zone.__load_patch("timers", e => {
                            ie(e, "set", "clear", "Timeout"),
                                ie(e, "set", "clear", "Interval"),
                                ie(e, "set", "clear", "Immediate")
                        }
                    ),
                    Zone.__load_patch("requestAnimationFrame", e => {
                            ie(e, "request", "cancel", "AnimationFrame"),
                                ie(e, "mozRequest", "mozCancel", "AnimationFrame"),
                                ie(e, "webkitRequest", "webkitCancel", "AnimationFrame")
                        }
                    ),
                    Zone.__load_patch("blocking", (e, t) => {
                            const n = ["alert", "prompt", "confirm"];
                            for (let o = 0; o < n.length; o++)
                                D(e, n[o], (n, o, r) => function(o, i) {
                                        return t.current.run(n, e, i, r)
                                    }
                                )
                        }
                    ),
                    Zone.__load_patch("EventTarget", (e, t, n) => {
                            !function(e, t) {
                                t.patchEventPrototype(e, t)
                            }(e, n),
                                se(e, n);
                            const o = e.XMLHttpRequestEventTarget;
                            o && o.prototype && n.patchEventTarget(e, [o.prototype]),
                                S("MutationObserver"),
                                S("WebKitMutationObserver"),
                                S("IntersectionObserver"),
                                S("FileReader")
                        }
                    ),
                    Zone.__load_patch("on_property", (e, t, n) => {
                            oe(n, e)
                        }
                    ),
                    Zone.__load_patch("customElements", (e, t, n) => {
                            !function(e, t) {
                                const {isBrowser: n, isMix: o} = t.getGlobalObjects();
                                (n || o) && e.customElements && "customElements"in e && t.patchCallbacks(t, e.customElements, "customElements", "define", ["connectedCallback", "disconnectedCallback", "adoptedCallback", "attributeChangedCallback"])
                            }(e, n)
                        }
                    ),
                    Zone.__load_patch("XHR", (e, t) => {
                            !function(e) {
                                const p = e.XMLHttpRequest;
                                if (!p)
                                    return;
                                const f = p.prototype;
                                let d = f[i]
                                    , m = f[s];
                                if (!d) {
                                    const t = e.XMLHttpRequestEventTarget;
                                    if (t) {
                                        const e = t.prototype;
                                        d = e[i],
                                            m = e[s]
                                    }
                                }
                                function g(e) {
                                    const o = e.data
                                        , c = o.target;
                                    c[a] = !1,
                                        c[h] = !1;
                                    const l = c[r];
                                    d || (d = c[i],
                                        m = c[s]),
                                    l && m.call(c, "readystatechange", l);
                                    const u = c[r] = () => {
                                            if (c.readyState === c.DONE)
                                                if (!o.aborted && c[a] && "scheduled" === e.state) {
                                                    const n = c[t.__symbol__("loadfalse")];
                                                    if (n && n.length > 0) {
                                                        const r = e.invoke;
                                                        e.invoke = function() {
                                                            const n = c[t.__symbol__("loadfalse")];
                                                            for (let t = 0; t < n.length; t++)
                                                                n[t] === e && n.splice(t, 1);
                                                            o.aborted || "scheduled" !== e.state || r.call(e)
                                                        }
                                                            ,
                                                            n.push(e)
                                                    } else
                                                        e.invoke()
                                                } else
                                                    o.aborted || !1 !== c[a] || (c[h] = !0)
                                        }
                                    ;
                                    return d.call(c, "readystatechange", u),
                                    c[n] || (c[n] = e),
                                        E.apply(c, o.args),
                                        c[a] = !0,
                                        e
                                }
                                function y() {}
                                function _(e) {
                                    const t = e.data;
                                    return t.aborted = !0,
                                        w.apply(t.target, t.args)
                                }
                                const v = D(f, "open", () => function(e, t) {
                                        return e[o] = 0 == t[2],
                                            e[c] = t[1],
                                            v.apply(e, t)
                                    }
                                )
                                    , b = u("fetchTaskAborting")
                                    , k = u("fetchTaskScheduling")
                                    , E = D(f, "send", () => function(e, n) {
                                        if (!0 === t.current[k])
                                            return E.apply(e, n);
                                        if (e[o])
                                            return E.apply(e, n);
                                        {
                                            const t = {
                                                target: e,
                                                url: e[c],
                                                isPeriodic: !1,
                                                args: n,
                                                aborted: !1
                                            }
                                                , o = l("XMLHttpRequest.send", y, t, g, _);
                                            e && !0 === e[h] && !t.aborted && "scheduled" === o.state && o.invoke()
                                        }
                                    }
                                )
                                    , w = D(f, "abort", () => function(e, o) {
                                        const r = e[n];
                                        if (r && "string" == typeof r.type) {
                                            if (null == r.cancelFn || r.data && r.data.aborted)
                                                return;
                                            r.zone.cancelTask(r)
                                        } else if (!0 === t.current[b])
                                            return w.apply(e, o)
                                    }
                                )
                            }(e);
                            const n = u("xhrTask")
                                , o = u("xhrSync")
                                , r = u("xhrListener")
                                , a = u("xhrScheduled")
                                , c = u("xhrURL")
                                , h = u("xhrErrorBeforeScheduled")
                        }
                    ),
                    Zone.__load_patch("geolocation", t => {
                            t.navigator && t.navigator.geolocation && function(t, n) {
                                const o = t.constructor.name;
                                for (let r = 0; r < n.length; r++) {
                                    const i = n[r]
                                        , s = t[i];
                                    if (s) {
                                        if (!g(e(t, i)))
                                            continue;
                                        t[i] = (e => {
                                                const t = function() {
                                                    return e.apply(this, m(arguments, o + "." + i))
                                                };
                                                return O(t, e),
                                                    t
                                            }
                                        )(s)
                                    }
                                }
                            }(t.navigator.geolocation, ["getCurrentPosition", "watchPosition"])
                        }
                    ),
                    Zone.__load_patch("PromiseRejectionEvent", (e, t) => {
                            function n(t) {
                                return function(n) {
                                    W(e, t).forEach(o => {
                                            const r = e.PromiseRejectionEvent;
                                            if (r) {
                                                const e = new r(t,{
                                                    promise: n.promise,
                                                    reason: n.rejection
                                                });
                                                o.invoke(e)
                                            }
                                        }
                                    )
                                }
                            }
                            e.PromiseRejectionEvent && (t[u("unhandledPromiseRejectionHandler")] = n("unhandledrejection"),
                                t[u("rejectionHandledHandler")] = n("rejectionhandled"))
                        }
                    )
            }
        ) ? o.call(t, n, t, e) : o) || (e.exports = r)
    },
    s1Zv: function(e, t, n) {
        "use strict";
        /**
         * @license
         * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
         * This code may only be used under the BSD style license found at
         * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
         * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
         * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
         * Google as part of the polymer project is also subject to an additional IP
         * rights grant found at http://polymer.github.io/PATENTS.txt
         */
        !function() {
            if (void 0 === window.Reflect || void 0 === window.customElements || window.customElements.polyfillWrapFlushCallback)
                return;
            const e = HTMLElement;
            window.HTMLElement = function() {
                return Reflect.construct(e, [], this.constructor)
            }
                ,
                HTMLElement.prototype = e.prototype,
                HTMLElement.prototype.constructor = HTMLElement,
                Object.setPrototypeOf(HTMLElement, e)
        }()
    }
}, [[2, 0]]]);
!function(e) {
    function r(r) {
        for (var n, l, f = r[0], i = r[1], p = r[2], c = 0, s = []; c < f.length; c++)
            l = f[c],
            Object.prototype.hasOwnProperty.call(o, l) && o[l] && s.push(o[l][0]),
                o[l] = 0;
        for (n in i)
            Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
        for (a && a(r); s.length; )
            s.shift()();
        return u.push.apply(u, p || []),
            t()
    }
    function t() {
        for (var e, r = 0; r < u.length; r++) {
            for (var t = u[r], n = !0, f = 1; f < t.length; f++)
                0 !== o[t[f]] && (n = !1);
            n && (u.splice(r--, 1),
                e = l(l.s = t[0]))
        }
        return e
    }
    var n = {}
        , o = {
        0: 0
    }
        , u = [];
    function l(r) {
        if (n[r])
            return n[r].exports;
        var t = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(t.exports, t, t.exports, l),
            t.l = !0,
            t.exports
    }
    l.m = e,
        l.c = n,
        l.d = function(e, r, t) {
            l.o(e, r) || Object.defineProperty(e, r, {
                enumerable: !0,
                get: t
            })
        }
        ,
        l.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
        }
        ,
        l.t = function(e, r) {
            if (1 & r && (e = l(e)),
            8 & r)
                return e;
            if (4 & r && "object" == typeof e && e && e.__esModule)
                return e;
            var t = Object.create(null);
            if (l.r(t),
                Object.defineProperty(t, "default", {
                    enumerable: !0,
                    value: e
                }),
            2 & r && "string" != typeof e)
                for (var n in e)
                    l.d(t, n, (function(r) {
                            return e[r]
                        }
                    ).bind(null, n));
            return t
        }
        ,
        l.n = function(e) {
            var r = e && e.__esModule ? function() {
                        return e.default
                    }
                    : function() {
                        return e
                    }
            ;
            return l.d(r, "a", r),
                r
        }
        ,
        l.o = function(e, r) {
            return Object.prototype.hasOwnProperty.call(e, r)
        }
        ,
        l.p = "";
    var f = window.webpackJsonp = window.webpackJsonp || []
        , i = f.push.bind(f);
    f.push = r,
        f = f.slice();
    for (var p = 0; p < f.length; p++)
        r(f[p]);
    var a = i;
    t()
}([]);
(window.webpackJsonp = window.webpackJsonp || []).push([[1], {
    0: function(e, t, n) {
        e.exports = n("bG/G")
    },
    "bG/G": function(e, t, n) {
        "use strict";
        function s(e) {
            return "function" == typeof e
        }
        n.r(t);
        let r = !1;
        const i = {
            Promise: void 0,
            set useDeprecatedSynchronousErrorHandling(e) {
                if (e) {
                    const e = new Error;
                    console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + e.stack)
                } else
                    r && console.log("RxJS: Back to a better error behavior. Thank you. <3");
                r = e
            },
            get useDeprecatedSynchronousErrorHandling() {
                return r
            }
        };
        function o(e) {
            setTimeout( () => {
                    throw e
                }
                , 0)
        }
        const a = {
            closed: !0,
            next(e) {},
            error(e) {
                if (i.useDeprecatedSynchronousErrorHandling)
                    throw e;
                o(e)
            },
            complete() {}
        }
            , l = ( () => Array.isArray || (e => e && "number" == typeof e.length))();
        function c(e) {
            return null !== e && "object" == typeof e
        }
        const u = ( () => {
                function e(e) {
                    return Error.call(this),
                        this.message = e ? `${e.length} errors occurred during unsubscription:\n${e.map( (e, t) => `${t + 1}) ${e.toString()}`).join("\n  ")}` : "",
                        this.name = "UnsubscriptionError",
                        this.errors = e,
                        this
                }
                return e.prototype = Object.create(Error.prototype),
                    e
            }
        )();
        let h = ( () => {
                class e {
                    constructor(e) {
                        this.closed = !1,
                            this._parentOrParents = null,
                            this._subscriptions = null,
                        e && (this._unsubscribe = e)
                    }
                    unsubscribe() {
                        let t;
                        if (this.closed)
                            return;
                        let {_parentOrParents: n, _unsubscribe: r, _subscriptions: i} = this;
                        if (this.closed = !0,
                            this._parentOrParents = null,
                            this._subscriptions = null,
                        n instanceof e)
                            n.remove(this);
                        else if (null !== n)
                            for (let e = 0; e < n.length; ++e)
                                n[e].remove(this);
                        if (s(r))
                            try {
                                r.call(this)
                            } catch (o) {
                                t = o instanceof u ? d(o.errors) : [o]
                            }
                        if (l(i)) {
                            let e = -1
                                , n = i.length;
                            for (; ++e < n; ) {
                                const n = i[e];
                                if (c(n))
                                    try {
                                        n.unsubscribe()
                                    } catch (o) {
                                        t = t || [],
                                            o instanceof u ? t = t.concat(d(o.errors)) : t.push(o)
                                    }
                            }
                        }
                        if (t)
                            throw new u(t)
                    }
                    add(t) {
                        let n = t;
                        if (!t)
                            return e.EMPTY;
                        switch (typeof t) {
                            case "function":
                                n = new e(t);
                            case "object":
                                if (n === this || n.closed || "function" != typeof n.unsubscribe)
                                    return n;
                                if (this.closed)
                                    return n.unsubscribe(),
                                        n;
                                if (!(n instanceof e)) {
                                    const t = n;
                                    n = new e,
                                        n._subscriptions = [t]
                                }
                                break;
                            default:
                                throw new Error("unrecognized teardown " + t + " added to Subscription.")
                        }
                        let {_parentOrParents: s} = n;
                        if (null === s)
                            n._parentOrParents = this;
                        else if (s instanceof e) {
                            if (s === this)
                                return n;
                            n._parentOrParents = [s, this]
                        } else {
                            if (-1 !== s.indexOf(this))
                                return n;
                            s.push(this)
                        }
                        const r = this._subscriptions;
                        return null === r ? this._subscriptions = [n] : r.push(n),
                            n
                    }
                    remove(e) {
                        const t = this._subscriptions;
                        if (t) {
                            const n = t.indexOf(e);
                            -1 !== n && t.splice(n, 1)
                        }
                    }
                }
                return e.EMPTY = function(e) {
                    return e.closed = !0,
                        e
                }(new e),
                    e
            }
        )();
        function d(e) {
            return e.reduce( (e, t) => e.concat(t instanceof u ? t.errors : t), [])
        }
        const p = ( () => "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random())();
        class f extends h {
            constructor(e, t, n) {
                switch (super(),
                    this.syncErrorValue = null,
                    this.syncErrorThrown = !1,
                    this.syncErrorThrowable = !1,
                    this.isStopped = !1,
                    arguments.length) {
                    case 0:
                        this.destination = a;
                        break;
                    case 1:
                        if (!e) {
                            this.destination = a;
                            break
                        }
                        if ("object" == typeof e) {
                            e instanceof f ? (this.syncErrorThrowable = e.syncErrorThrowable,
                                this.destination = e,
                                e.add(this)) : (this.syncErrorThrowable = !0,
                                this.destination = new m(this,e));
                            break
                        }
                    default:
                        this.syncErrorThrowable = !0,
                            this.destination = new m(this,e,t,n)
                }
            }
            [p]() {
                return this
            }
            static create(e, t, n) {
                const s = new f(e,t,n);
                return s.syncErrorThrowable = !1,
                    s
            }
            next(e) {
                this.isStopped || this._next(e)
            }
            error(e) {
                this.isStopped || (this.isStopped = !0,
                    this._error(e))
            }
            complete() {
                this.isStopped || (this.isStopped = !0,
                    this._complete())
            }
            unsubscribe() {
                this.closed || (this.isStopped = !0,
                    super.unsubscribe())
            }
            _next(e) {
                this.destination.next(e)
            }
            _error(e) {
                this.destination.error(e),
                    this.unsubscribe()
            }
            _complete() {
                this.destination.complete(),
                    this.unsubscribe()
            }
            _unsubscribeAndRecycle() {
                const {_parentOrParents: e} = this;
                return this._parentOrParents = null,
                    this.unsubscribe(),
                    this.closed = !1,
                    this.isStopped = !1,
                    this._parentOrParents = e,
                    this
            }
        }
        class m extends f {
            constructor(e, t, n, r) {
                let i;
                super(),
                    this._parentSubscriber = e;
                let o = this;
                s(t) ? i = t : t && (i = t.next,
                    n = t.error,
                    r = t.complete,
                t !== a && (o = Object.create(t),
                s(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                    o.unsubscribe = this.unsubscribe.bind(this))),
                    this._context = o,
                    this._next = i,
                    this._error = n,
                    this._complete = r
            }
            next(e) {
                if (!this.isStopped && this._next) {
                    const {_parentSubscriber: t} = this;
                    i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e)
                }
            }
            error(e) {
                if (!this.isStopped) {
                    const {_parentSubscriber: t} = this
                        , {useDeprecatedSynchronousErrorHandling: n} = i;
                    if (this._error)
                        n && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e),
                            this.unsubscribe()) : (this.__tryOrUnsub(this._error, e),
                            this.unsubscribe());
                    else if (t.syncErrorThrowable)
                        n ? (t.syncErrorValue = e,
                            t.syncErrorThrown = !0) : o(e),
                            this.unsubscribe();
                    else {
                        if (this.unsubscribe(),
                            n)
                            throw e;
                        o(e)
                    }
                }
            }
            complete() {
                if (!this.isStopped) {
                    const {_parentSubscriber: e} = this;
                    if (this._complete) {
                        const t = () => this._complete.call(this._context);
                        i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? (this.__tryOrSetError(e, t),
                            this.unsubscribe()) : (this.__tryOrUnsub(t),
                            this.unsubscribe())
                    } else
                        this.unsubscribe()
                }
            }
            __tryOrUnsub(e, t) {
                try {
                    e.call(this._context, t)
                } catch (n) {
                    if (this.unsubscribe(),
                        i.useDeprecatedSynchronousErrorHandling)
                        throw n;
                    o(n)
                }
            }
            __tryOrSetError(e, t, n) {
                if (!i.useDeprecatedSynchronousErrorHandling)
                    throw new Error("bad call");
                try {
                    t.call(this._context, n)
                } catch (s) {
                    return i.useDeprecatedSynchronousErrorHandling ? (e.syncErrorValue = s,
                        e.syncErrorThrown = !0,
                        !0) : (o(s),
                        !0)
                }
                return !1
            }
            _unsubscribe() {
                const {_parentSubscriber: e} = this;
                this._context = null,
                    this._parentSubscriber = null,
                    e.unsubscribe()
            }
        }
        const g = ( () => "function" == typeof Symbol && Symbol.observable || "@@observable")();
        function y(e) {
            return e
        }
        let _ = ( () => {
                class e {
                    constructor(e) {
                        this._isScalar = !1,
                        e && (this._subscribe = e)
                    }
                    lift(t) {
                        const n = new e;
                        return n.source = this,
                            n.operator = t,
                            n
                    }
                    subscribe(e, t, n) {
                        const {operator: s} = this
                            , r = function(e, t, n) {
                            if (e) {
                                if (e instanceof f)
                                    return e;
                                if (e[p])
                                    return e[p]()
                            }
                            return e || t || n ? new f(e,t,n) : new f(a)
                        }(e, t, n);
                        if (r.add(s ? s.call(r, this.source) : this.source || i.useDeprecatedSynchronousErrorHandling && !r.syncErrorThrowable ? this._subscribe(r) : this._trySubscribe(r)),
                        i.useDeprecatedSynchronousErrorHandling && r.syncErrorThrowable && (r.syncErrorThrowable = !1,
                            r.syncErrorThrown))
                            throw r.syncErrorValue;
                        return r
                    }
                    _trySubscribe(e) {
                        try {
                            return this._subscribe(e)
                        } catch (t) {
                            i.useDeprecatedSynchronousErrorHandling && (e.syncErrorThrown = !0,
                                e.syncErrorValue = t),
                                function(e) {
                                    for (; e; ) {
                                        const {closed: t, destination: n, isStopped: s} = e;
                                        if (t || s)
                                            return !1;
                                        e = n && n instanceof f ? n : null
                                    }
                                    return !0
                                }(e) ? e.error(t) : console.warn(t)
                        }
                    }
                    forEach(e, t) {
                        return new (t = b(t))( (t, n) => {
                                let s;
                                s = this.subscribe(t => {
                                        try {
                                            e(t)
                                        } catch (r) {
                                            n(r),
                                            s && s.unsubscribe()
                                        }
                                    }
                                    , n, t)
                            }
                        )
                    }
                    _subscribe(e) {
                        const {source: t} = this;
                        return t && t.subscribe(e)
                    }
                    [g]() {
                        return this
                    }
                    pipe(...e) {
                        return 0 === e.length ? this : (0 === (t = e).length ? y : 1 === t.length ? t[0] : function(e) {
                                return t.reduce( (e, t) => t(e), e)
                            }
                        )(this);
                        var t
                    }
                    toPromise(e) {
                        return new (e = b(e))( (e, t) => {
                                let n;
                                this.subscribe(e => n = e, e => t(e), () => e(n))
                            }
                        )
                    }
                }
                return e.create = t => new e(t),
                    e
            }
        )();
        function b(e) {
            if (e || (e = i.Promise || Promise),
                !e)
                throw new Error("no Promise impl found");
            return e
        }
        const v = ( () => {
                function e() {
                    return Error.call(this),
                        this.message = "object unsubscribed",
                        this.name = "ObjectUnsubscribedError",
                        this
                }
                return e.prototype = Object.create(Error.prototype),
                    e
            }
        )();
        class w extends h {
            constructor(e, t) {
                super(),
                    this.subject = e,
                    this.subscriber = t,
                    this.closed = !1
            }
            unsubscribe() {
                if (this.closed)
                    return;
                this.closed = !0;
                const e = this.subject
                    , t = e.observers;
                if (this.subject = null,
                !t || 0 === t.length || e.isStopped || e.closed)
                    return;
                const n = t.indexOf(this.subscriber);
                -1 !== n && t.splice(n, 1)
            }
        }
        class E extends f {
            constructor(e) {
                super(e),
                    this.destination = e
            }
        }
        let C = ( () => {
                class e extends _ {
                    constructor() {
                        super(),
                            this.observers = [],
                            this.closed = !1,
                            this.isStopped = !1,
                            this.hasError = !1,
                            this.thrownError = null
                    }
                    [p]() {
                        return new E(this)
                    }
                    lift(e) {
                        const t = new S(this,this);
                        return t.operator = e,
                            t
                    }
                    next(e) {
                        if (this.closed)
                            throw new v;
                        if (!this.isStopped) {
                            const {observers: t} = this
                                , n = t.length
                                , s = t.slice();
                            for (let r = 0; r < n; r++)
                                s[r].next(e)
                        }
                    }
                    error(e) {
                        if (this.closed)
                            throw new v;
                        this.hasError = !0,
                            this.thrownError = e,
                            this.isStopped = !0;
                        const {observers: t} = this
                            , n = t.length
                            , s = t.slice();
                        for (let r = 0; r < n; r++)
                            s[r].error(e);
                        this.observers.length = 0
                    }
                    complete() {
                        if (this.closed)
                            throw new v;
                        this.isStopped = !0;
                        const {observers: e} = this
                            , t = e.length
                            , n = e.slice();
                        for (let s = 0; s < t; s++)
                            n[s].complete();
                        this.observers.length = 0
                    }
                    unsubscribe() {
                        this.isStopped = !0,
                            this.closed = !0,
                            this.observers = null
                    }
                    _trySubscribe(e) {
                        if (this.closed)
                            throw new v;
                        return super._trySubscribe(e)
                    }
                    _subscribe(e) {
                        if (this.closed)
                            throw new v;
                        return this.hasError ? (e.error(this.thrownError),
                            h.EMPTY) : this.isStopped ? (e.complete(),
                            h.EMPTY) : (this.observers.push(e),
                            new w(this,e))
                    }
                    asObservable() {
                        const e = new _;
                        return e.source = this,
                            e
                    }
                }
                return e.create = (e, t) => new S(e,t),
                    e
            }
        )();
        class S extends C {
            constructor(e, t) {
                super(),
                    this.destination = e,
                    this.source = t
            }
            next(e) {
                const {destination: t} = this;
                t && t.next && t.next(e)
            }
            error(e) {
                const {destination: t} = this;
                t && t.error && this.destination.error(e)
            }
            complete() {
                const {destination: e} = this;
                e && e.complete && this.destination.complete()
            }
            _subscribe(e) {
                const {source: t} = this;
                return t ? this.source.subscribe(e) : h.EMPTY
            }
        }
        function x(e) {
            return e && "function" == typeof e.schedule
        }
        class T extends f {
            constructor(e, t, n) {
                super(),
                    this.parent = e,
                    this.outerValue = t,
                    this.outerIndex = n,
                    this.index = 0
            }
            _next(e) {
                this.parent.notifyNext(this.outerValue, e, this.outerIndex, this.index++, this)
            }
            _error(e) {
                this.parent.notifyError(e, this),
                    this.unsubscribe()
            }
            _complete() {
                this.parent.notifyComplete(this),
                    this.unsubscribe()
            }
        }
        const k = e => t => {
                for (let n = 0, s = e.length; n < s && !t.closed; n++)
                    t.next(e[n]);
                t.complete()
            }
        ;
        function I() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }
        const A = I()
            , O = e => e && "number" == typeof e.length && "function" != typeof e;
        function N(e) {
            return !!e && "function" != typeof e.subscribe && "function" == typeof e.then
        }
        const D = e => {
                if (e && "function" == typeof e[g])
                    return s = e,
                        e => {
                            const t = s[g]();
                            if ("function" != typeof t.subscribe)
                                throw new TypeError("Provided object does not correctly implement Symbol.observable");
                            return t.subscribe(e)
                        }
                        ;
                if (O(e))
                    return k(e);
                if (N(e))
                    return n = e,
                        e => (n.then(t => {
                                e.closed || (e.next(t),
                                    e.complete())
                            }
                            , t => e.error(t)).then(null, o),
                            e);
                if (e && "function" == typeof e[A])
                    return t = e,
                        e => {
                            const n = t[A]();
                            for (; ; ) {
                                const t = n.next();
                                if (t.done) {
                                    e.complete();
                                    break
                                }
                                if (e.next(t.value),
                                    e.closed)
                                    break
                            }
                            return "function" == typeof n.return && e.add( () => {
                                    n.return && n.return()
                                }
                            ),
                                e
                        }
                        ;
                {
                    const t = c(e) ? "an invalid object" : `'${e}'`;
                    throw new TypeError(`You provided ${t} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`)
                }
                var t, n, s
            }
        ;
        function F(e, t, n, s, r=new T(e,n,s)) {
            if (!r.closed)
                return t instanceof _ ? t.subscribe(r) : D(t)(r)
        }
        class P extends f {
            notifyNext(e, t, n, s, r) {
                this.destination.next(t)
            }
            notifyError(e, t) {
                this.destination.error(e)
            }
            notifyComplete(e) {
                this.destination.complete()
            }
        }
        function M(e, t) {
            return function(n) {
                if ("function" != typeof e)
                    throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                return n.lift(new V(e,t))
            }
        }
        class V {
            constructor(e, t) {
                this.project = e,
                    this.thisArg = t
            }
            call(e, t) {
                return t.subscribe(new R(e,this.project,this.thisArg))
            }
        }
        class R extends f {
            constructor(e, t, n) {
                super(e),
                    this.project = t,
                    this.count = 0,
                    this.thisArg = n || this
            }
            _next(e) {
                let t;
                try {
                    t = this.project.call(this.thisArg, e, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                this.destination.next(t)
            }
        }
        function j(e, t) {
            return new _(n => {
                    const s = new h;
                    let r = 0;
                    return s.add(t.schedule((function() {
                            r !== e.length ? (n.next(e[r++]),
                            n.closed || s.add(this.schedule())) : n.complete()
                        }
                    ))),
                        s
                }
            )
        }
        function L(e, t) {
            return t ? function(e, t) {
                if (null != e) {
                    if (function(e) {
                        return e && "function" == typeof e[g]
                    }(e))
                        return function(e, t) {
                            return new _(n => {
                                    const s = new h;
                                    return s.add(t.schedule( () => {
                                            const r = e[g]();
                                            s.add(r.subscribe({
                                                next(e) {
                                                    s.add(t.schedule( () => n.next(e)))
                                                },
                                                error(e) {
                                                    s.add(t.schedule( () => n.error(e)))
                                                },
                                                complete() {
                                                    s.add(t.schedule( () => n.complete()))
                                                }
                                            }))
                                        }
                                    )),
                                        s
                                }
                            )
                        }(e, t);
                    if (N(e))
                        return function(e, t) {
                            return new _(n => {
                                    const s = new h;
                                    return s.add(t.schedule( () => e.then(e => {
                                            s.add(t.schedule( () => {
                                                    n.next(e),
                                                        s.add(t.schedule( () => n.complete()))
                                                }
                                            ))
                                        }
                                        , e => {
                                            s.add(t.schedule( () => n.error(e)))
                                        }
                                    ))),
                                        s
                                }
                            )
                        }(e, t);
                    if (O(e))
                        return j(e, t);
                    if (function(e) {
                        return e && "function" == typeof e[A]
                    }(e) || "string" == typeof e)
                        return function(e, t) {
                            if (!e)
                                throw new Error("Iterable cannot be null");
                            return new _(n => {
                                    const s = new h;
                                    let r;
                                    return s.add( () => {
                                            r && "function" == typeof r.return && r.return()
                                        }
                                    ),
                                        s.add(t.schedule( () => {
                                                r = e[A](),
                                                    s.add(t.schedule((function() {
                                                            if (n.closed)
                                                                return;
                                                            let e, t;
                                                            try {
                                                                const n = r.next();
                                                                e = n.value,
                                                                    t = n.done
                                                            } catch (s) {
                                                                return void n.error(s)
                                                            }
                                                            t ? n.complete() : (n.next(e),
                                                                this.schedule())
                                                        }
                                                    )))
                                            }
                                        )),
                                        s
                                }
                            )
                        }(e, t)
                }
                throw new TypeError((null !== e && typeof e || e) + " is not observable")
            }(e, t) : e instanceof _ ? e : new _(D(e))
        }
        function H(e, t, n=Number.POSITIVE_INFINITY) {
            return "function" == typeof t ? s => s.pipe(H( (n, s) => L(e(n, s)).pipe(M( (e, r) => t(n, e, s, r))), n)) : ("number" == typeof t && (n = t),
                t => t.lift(new B(e,n)))
        }
        class B {
            constructor(e, t=Number.POSITIVE_INFINITY) {
                this.project = e,
                    this.concurrent = t
            }
            call(e, t) {
                return t.subscribe(new $(e,this.project,this.concurrent))
            }
        }
        class $ extends P {
            constructor(e, t, n=Number.POSITIVE_INFINITY) {
                super(e),
                    this.project = t,
                    this.concurrent = n,
                    this.hasCompleted = !1,
                    this.buffer = [],
                    this.active = 0,
                    this.index = 0
            }
            _next(e) {
                this.active < this.concurrent ? this._tryNext(e) : this.buffer.push(e)
            }
            _tryNext(e) {
                let t;
                const n = this.index++;
                try {
                    t = this.project(e, n)
                } catch (s) {
                    return void this.destination.error(s)
                }
                this.active++,
                    this._innerSub(t, e, n)
            }
            _innerSub(e, t, n) {
                const s = new T(this,t,n)
                    , r = this.destination;
                r.add(s);
                const i = F(this, e, void 0, void 0, s);
                i !== s && r.add(i)
            }
            _complete() {
                this.hasCompleted = !0,
                0 === this.active && 0 === this.buffer.length && this.destination.complete(),
                    this.unsubscribe()
            }
            notifyNext(e, t, n, s, r) {
                this.destination.next(t)
            }
            notifyComplete(e) {
                const t = this.buffer;
                this.remove(e),
                    this.active--,
                    t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
            }
        }
        function z(e, t) {
            return t ? j(e, t) : new _(k(e))
        }
        function q(...e) {
            let t = Number.POSITIVE_INFINITY
                , n = null
                , s = e[e.length - 1];
            return x(s) ? (n = e.pop(),
            e.length > 1 && "number" == typeof e[e.length - 1] && (t = e.pop())) : "number" == typeof s && (t = e.pop()),
                null === n && 1 === e.length && e[0]instanceof _ ? e[0] : function(e=Number.POSITIVE_INFINITY) {
                    return H(y, e)
                }(t)(z(e, n))
        }
        function U() {
            return function(e) {
                return e.lift(new G(e))
            }
        }
        class G {
            constructor(e) {
                this.connectable = e
            }
            call(e, t) {
                const {connectable: n} = this;
                n._refCount++;
                const s = new W(e,n)
                    , r = t.subscribe(s);
                return s.closed || (s.connection = n.connect()),
                    r
            }
        }
        class W extends f {
            constructor(e, t) {
                super(e),
                    this.connectable = t
            }
            _unsubscribe() {
                const {connectable: e} = this;
                if (!e)
                    return void (this.connection = null);
                this.connectable = null;
                const t = e._refCount;
                if (t <= 0)
                    return void (this.connection = null);
                if (e._refCount = t - 1,
                t > 1)
                    return void (this.connection = null);
                const {connection: n} = this
                    , s = e._connection;
                this.connection = null,
                !s || n && s !== n || s.unsubscribe()
            }
        }
        class Q extends _ {
            constructor(e, t) {
                super(),
                    this.source = e,
                    this.subjectFactory = t,
                    this._refCount = 0,
                    this._isComplete = !1
            }
            _subscribe(e) {
                return this.getSubject().subscribe(e)
            }
            getSubject() {
                const e = this._subject;
                return e && !e.isStopped || (this._subject = this.subjectFactory()),
                    this._subject
            }
            connect() {
                let e = this._connection;
                return e || (this._isComplete = !1,
                    e = this._connection = new h,
                    e.add(this.source.subscribe(new K(this.getSubject(),this))),
                e.closed && (this._connection = null,
                    e = h.EMPTY)),
                    e
            }
            refCount() {
                return U()(this)
            }
        }
        const Z = ( () => {
                const e = Q.prototype;
                return {
                    operator: {
                        value: null
                    },
                    _refCount: {
                        value: 0,
                        writable: !0
                    },
                    _subject: {
                        value: null,
                        writable: !0
                    },
                    _connection: {
                        value: null,
                        writable: !0
                    },
                    _subscribe: {
                        value: e._subscribe
                    },
                    _isComplete: {
                        value: e._isComplete,
                        writable: !0
                    },
                    getSubject: {
                        value: e.getSubject
                    },
                    connect: {
                        value: e.connect
                    },
                    refCount: {
                        value: e.refCount
                    }
                }
            }
        )();
        class K extends E {
            constructor(e, t) {
                super(e),
                    this.connectable = t
            }
            _error(e) {
                this._unsubscribe(),
                    super._error(e)
            }
            _complete() {
                this.connectable._isComplete = !0,
                    this._unsubscribe(),
                    super._complete()
            }
            _unsubscribe() {
                const e = this.connectable;
                if (e) {
                    this.connectable = null;
                    const t = e._connection;
                    e._refCount = 0,
                        e._subject = null,
                        e._connection = null,
                    t && t.unsubscribe()
                }
            }
        }
        function Y() {
            return new C
        }
        /**
         * @license Angular v10.0.3
         * (c) 2010-2020 Google LLC. https://angular.io/
         * License: MIT
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function J(e) {
            return {
                toString: e
            }.toString()
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function X(e, t, n) {
            return J( () => {
                    const s = function(e) {
                        return function(...t) {
                            if (e) {
                                const n = e(...t);
                                for (const e in n)
                                    this[e] = n[e]
                            }
                        }
                    }(t);
                    function r(...e) {
                        if (this instanceof r)
                            return s.apply(this, e),
                                this;
                        const t = new r(...e);
                        return n.annotation = t,
                            n;
                        function n(e, n, s) {
                            const r = e.hasOwnProperty("__parameters__") ? e.__parameters__ : Object.defineProperty(e, "__parameters__", {
                                value: []
                            }).__parameters__;
                            for (; r.length <= s; )
                                r.push(null);
                            return (r[s] = r[s] || []).push(t),
                                e
                        }
                    }
                    return n && (r.prototype = Object.create(n.prototype)),
                        r.prototype.ngMetadataName = e,
                        r.annotationCls = r,
                        r
                }
            )
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const ee = X("Inject", e => ({
            token: e
        }))
            , te = X("Optional")
            , ne = X("Self")
            , se = X("SkipSelf");
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        var re = function(e) {
            return e[e.Default = 0] = "Default",
                e[e.Host = 1] = "Host",
                e[e.Self = 2] = "Self",
                e[e.SkipSelf = 4] = "SkipSelf",
                e[e.Optional = 8] = "Optional",
                e
        }({});
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function ie(e) {
            for (let t in e)
                if (e[t] === ie)
                    return t;
            throw Error("Could not find renamed property on target object.")
        }
        function oe(e, t) {
            for (const n in t)
                t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n])
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function ae(e) {
            return {
                token: e.token,
                providedIn: e.providedIn || null,
                factory: e.factory,
                value: void 0
            }
        }
        function le(e) {
            return {
                factory: e.factory,
                providers: e.providers || [],
                imports: e.imports || []
            }
        }
        function ce(e) {
            return ue(e, e[de]) || ue(e, e[me])
        }
        function ue(e, t) {
            return t && t.token === e ? t : null
        }
        function he(e) {
            return e && (e.hasOwnProperty(pe) || e.hasOwnProperty(ge)) ? e[pe] : null
        }
        const de = ie({
            \u0275prov: ie
        })
            , pe = ie({
            \u0275inj: ie
        })
            , fe = ie({
            \u0275provFallback: ie
        })
            , me = ie({
            ngInjectableDef: ie
        })
            , ge = ie({
            ngInjectorDef: ie
        });
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function ye(e) {
            if ("string" == typeof e)
                return e;
            if (Array.isArray(e))
                return "[" + e.map(ye).join(", ") + "]";
            if (null == e)
                return "" + e;
            if (e.overriddenName)
                return "" + e.overriddenName;
            if (e.name)
                return "" + e.name;
            const t = e.toString();
            if (null == t)
                return "" + t;
            const n = t.indexOf("\n");
            return -1 === n ? t : t.substring(0, n)
        }
        function _e(e, t) {
            return null == e || "" === e ? null === t ? "" : t : null == t || "" === t ? e : e + " " + t
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const be = ie({
            __forward_ref__: ie
        });
        function ve(e) {
            return e.__forward_ref__ = ve,
                e.toString = function() {
                    return ye(this())
                }
                ,
                e
        }
        function we(e) {
            return Ee(e) ? e() : e
        }
        function Ee(e) {
            return "function" == typeof e && e.hasOwnProperty(be) && e.__forward_ref__ === ve
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Ce = "undefined" != typeof globalThis && globalThis
            , Se = "undefined" != typeof window && window
            , xe = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self
            , Te = "undefined" != typeof global && global
            , ke = Ce || Te || Se || xe
            , Ie = ie({
            \u0275cmp: ie
        })
            , Ae = ie({
            \u0275dir: ie
        })
            , Oe = ie({
            \u0275pipe: ie
        })
            , Ne = ie({
            \u0275mod: ie
        })
            , De = ie({
            \u0275loc: ie
        })
            , Fe = ie({
            \u0275fac: ie
        })
            , Pe = ie({
            __NG_ELEMENT_ID__: ie
        });
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Me {
            constructor(e, t) {
                this._desc = e,
                    this.ngMetadataName = "InjectionToken",
                    this.\u0275prov = void 0,
                    "number" == typeof t ? this.__NG_ELEMENT_ID__ = t : void 0 !== t && (this.\u0275prov = ae({
                        token: this,
                        providedIn: t.providedIn || "root",
                        factory: t.factory
                    }))
            }
            toString() {
                return "InjectionToken " + this._desc
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Ve = new Me("INJECTOR",-1)
            , Re = {}
            , je = /\n/gm
            , Le = ie({
            provide: String,
            useValue: ie
        });
        let He, Be = void 0;
        function $e(e) {
            const t = Be;
            return Be = e,
                t
        }
        function ze(e) {
            const t = He;
            return He = e,
                t
        }
        function qe(e, t=re.Default) {
            if (void 0 === Be)
                throw new Error("inject() must be called from an injection context");
            return null === Be ? Ge(e, void 0, t) : Be.get(e, t & re.Optional ? null : void 0, t)
        }
        function Ue(e, t=re.Default) {
            return (He || qe)(we(e), t)
        }
        function Ge(e, t, n) {
            const s = ce(e);
            if (s && "root" == s.providedIn)
                return void 0 === s.value ? s.value = s.factory() : s.value;
            if (n & re.Optional)
                return null;
            if (void 0 !== t)
                return t;
            throw new Error(`Injector: NOT_FOUND [${ye(e)}]`)
        }
        function We(e) {
            const t = [];
            for (let n = 0; n < e.length; n++) {
                const s = we(e[n]);
                if (Array.isArray(s)) {
                    if (0 === s.length)
                        throw new Error("Arguments array must have arguments.");
                    let e = void 0
                        , n = re.Default;
                    for (let t = 0; t < s.length; t++) {
                        const r = s[t];
                        r instanceof te || "Optional" === r.ngMetadataName || r === te ? n |= re.Optional : r instanceof se || "SkipSelf" === r.ngMetadataName || r === se ? n |= re.SkipSelf : r instanceof ne || "Self" === r.ngMetadataName || r === ne ? n |= re.Self : e = r instanceof ee || r === ee ? r.token : r
                    }
                    t.push(Ue(e, n))
                } else
                    t.push(Ue(s))
            }
            return t
        }
        class Qe {
            get(e, t=Re) {
                if (t === Re) {
                    const t = new Error(`NullInjectorError: No provider for ${ye(e)}!`);
                    throw t.name = "NullInjectorError",
                        t
                }
                return t
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Ze {
        }
        function Ke(e, t) {
            e.forEach(e => Array.isArray(e) ? Ke(e, t) : t(e))
        }
        function Ye(e, t, n) {
            t >= e.length ? e.push(n) : e.splice(t, 0, n)
        }
        function Je(e, t) {
            return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
        }
        function Xe(e, t, n) {
            let s = tt(e, t);
            return s >= 0 ? e[1 | s] = n : (s = ~s,
                function(e, t, n, s) {
                    let r = e.length;
                    if (r == t)
                        e.push(n, s);
                    else if (1 === r)
                        e.push(s, e[0]),
                            e[0] = n;
                    else {
                        for (r--,
                                 e.push(e[r - 1], e[r]); r > t; )
                            e[r] = e[r - 2],
                                r--;
                        e[t] = n,
                            e[t + 1] = s
                    }
                }(e, s, t, n)),
                s
        }
        function et(e, t) {
            const n = tt(e, t);
            if (n >= 0)
                return e[1 | n]
        }
        function tt(e, t) {
            return function(e, t, n) {
                let s = 0
                    , r = e.length >> 1;
                for (; r !== s; ) {
                    const n = s + (r - s >> 1)
                        , i = e[n << 1];
                    if (t === i)
                        return n << 1;
                    i > t ? r = n : s = n + 1
                }
                return ~(r << 1)
            }/**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
                (e, t)
        }
        var nt = function(e) {
            return e[e.OnPush = 0] = "OnPush",
                e[e.Default = 1] = "Default",
                e
        }({})
            , st = function(e) {
            return e[e.Emulated = 0] = "Emulated",
                e[e.Native = 1] = "Native",
                e[e.None = 2] = "None",
                e[e.ShadowDom = 3] = "ShadowDom",
                e
        }({});
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const rt = {}
            , it = [];
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        let ot = 0;
        function at(e) {
            return J( () => {
                    const t = e.type
                        , n = t.prototype
                        , s = {}
                        , r = {
                        type: t,
                        providersResolver: null,
                        decls: e.decls,
                        vars: e.vars,
                        factory: null,
                        template: e.template || null,
                        consts: e.consts || null,
                        ngContentSelectors: e.ngContentSelectors,
                        hostBindings: e.hostBindings || null,
                        hostVars: e.hostVars || 0,
                        hostAttrs: e.hostAttrs || null,
                        contentQueries: e.contentQueries || null,
                        declaredInputs: s,
                        inputs: null,
                        outputs: null,
                        exportAs: e.exportAs || null,
                        onChanges: null,
                        onInit: n.ngOnInit || null,
                        doCheck: n.ngDoCheck || null,
                        afterContentInit: n.ngAfterContentInit || null,
                        afterContentChecked: n.ngAfterContentChecked || null,
                        afterViewInit: n.ngAfterViewInit || null,
                        afterViewChecked: n.ngAfterViewChecked || null,
                        onDestroy: n.ngOnDestroy || null,
                        onPush: e.changeDetection === nt.OnPush,
                        directiveDefs: null,
                        pipeDefs: null,
                        selectors: e.selectors || it,
                        viewQuery: e.viewQuery || null,
                        features: e.features || null,
                        data: e.data || {},
                        encapsulation: e.encapsulation || st.Emulated,
                        id: "c",
                        styles: e.styles || it,
                        _: null,
                        setInput: null,
                        schemas: e.schemas || null,
                        tView: null
                    }
                        , i = e.directives
                        , o = e.features
                        , a = e.pipes;
                    return r.id += ot++,
                        r.inputs = dt(e.inputs, s),
                        r.outputs = dt(e.outputs),
                    o && o.forEach(e => e(r)),
                        r.directiveDefs = i ? () => ("function" == typeof i ? i() : i).map(lt) : null,
                        r.pipeDefs = a ? () => ("function" == typeof a ? a() : a).map(ct) : null,
                        r
                }
            )
        }
        function lt(e) {
            return mt(e) || function(e) {
                return e[Ae] || null
            }(e)
        }
        function ct(e) {
            return function(e) {
                return e[Oe] || null
            }(e)
        }
        const ut = {};
        function ht(e) {
            const t = {
                type: e.type,
                bootstrap: e.bootstrap || it,
                declarations: e.declarations || it,
                imports: e.imports || it,
                exports: e.exports || it,
                transitiveCompileScopes: null,
                schemas: e.schemas || null,
                id: e.id || null
            };
            return null != e.id && J( () => {
                    ut[e.id] = e.type
                }
            ),
                t
        }
        function dt(e, t) {
            if (null == e)
                return rt;
            const n = {};
            for (const s in e)
                if (e.hasOwnProperty(s)) {
                    let r = e[s]
                        , i = r;
                    Array.isArray(r) && (i = r[1],
                        r = r[0]),
                        n[r] = s,
                    t && (t[r] = i)
                }
            return n
        }
        const pt = at;
        function ft(e) {
            return {
                type: e.type,
                name: e.name,
                factory: null,
                pure: !1 !== e.pure,
                onDestroy: e.type.prototype.ngOnDestroy || null
            }
        }
        function mt(e) {
            return e[Ie] || null
        }
        function gt(e, t) {
            return e.hasOwnProperty(Fe) ? e[Fe] : null
        }
        function yt(e, t) {
            const n = e[Ne] || null;
            if (!n && !0 === t)
                throw new Error(`Type ${ye(e)} does not have '\u0275mod' property.`);
            return n
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function _t(e) {
            return Array.isArray(e) && "object" == typeof e[1]
        }
        function bt(e) {
            return Array.isArray(e) && !0 === e[1]
        }
        function vt(e) {
            return 0 != (8 & e.flags)
        }
        function wt(e) {
            return 2 == (2 & e.flags)
        }
        function Et(e) {
            return 1 == (1 & e.flags)
        }
        function Ct(e) {
            return null !== e.template
        }
        function St(e) {
            return 0 != (512 & e[2])
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        let xt = void 0;
        function Tt(e) {
            return !!e.listen
        }
        const kt = {
            createRenderer: (e, t) => void 0 !== xt ? xt : "undefined" != typeof document ? document : void 0
        };
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function It(e) {
            for (; Array.isArray(e); )
                e = e[0];
            return e
        }
        function At(e, t) {
            return It(t[e + 20])
        }
        function Ot(e, t) {
            return It(t[e.index])
        }
        function Nt(e, t) {
            return e.data[t + 20]
        }
        function Dt(e, t) {
            return e[t + 20]
        }
        function Ft(e, t) {
            const n = t[e];
            return _t(n) ? n : n[0]
        }
        function Pt(e) {
            const t = function(e) {
                return e.__ngContext__ || null
            }(e);
            return t ? Array.isArray(t) ? t : t.lView : null
        }
        function Mt(e) {
            return 4 == (4 & e[2])
        }
        function Vt(e) {
            return 128 == (128 & e[2])
        }
        function Rt(e, t) {
            return null === e || null == t ? null : e[t]
        }
        function jt(e) {
            e[18] = 0
        }
        function Lt(e, t) {
            e[5] += t;
            let n = e
                , s = e[3];
            for (; null !== s && (1 === t && 1 === n[5] || -1 === t && 0 === n[5]); )
                s[5] += t,
                    n = s,
                    s = s[3]
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Ht = {
            lFrame: an(null),
            bindingsEnabled: !0,
            checkNoChangesMode: !1
        };
        function Bt() {
            return Ht.bindingsEnabled
        }
        function $t() {
            return Ht.lFrame.lView
        }
        function zt() {
            return Ht.lFrame.tView
        }
        function qt(e) {
            Ht.lFrame.contextLView = e
        }
        function Ut() {
            return Ht.lFrame.previousOrParentTNode
        }
        function Gt(e, t) {
            Ht.lFrame.previousOrParentTNode = e,
                Ht.lFrame.isParent = t
        }
        function Wt() {
            return Ht.lFrame.isParent
        }
        function Qt() {
            Ht.lFrame.isParent = !1
        }
        function Zt() {
            return Ht.checkNoChangesMode
        }
        function Kt(e) {
            Ht.checkNoChangesMode = e
        }
        function Yt() {
            return Ht.lFrame.bindingIndex++
        }
        function Jt(e) {
            const t = Ht.lFrame
                , n = t.bindingIndex;
            return t.bindingIndex = t.bindingIndex + e,
                n
        }
        function Xt(e, t) {
            const n = Ht.lFrame;
            n.bindingIndex = n.bindingRootIndex = e,
                en(t)
        }
        function en(e) {
            Ht.lFrame.currentDirectiveIndex = e
        }
        function tn() {
            return Ht.lFrame.currentQueryIndex
        }
        function nn(e) {
            Ht.lFrame.currentQueryIndex = e
        }
        function sn(e, t) {
            const n = on();
            Ht.lFrame = n,
                n.previousOrParentTNode = t,
                n.lView = e
        }
        function rn(e, t) {
            const n = on()
                , s = e[1];
            Ht.lFrame = n,
                n.previousOrParentTNode = t,
                n.lView = e,
                n.tView = s,
                n.contextLView = e,
                n.bindingIndex = s.bindingStartIndex
        }
        function on() {
            const e = Ht.lFrame
                , t = null === e ? null : e.child;
            return null === t ? an(e) : t
        }
        function an(e) {
            const t = {
                previousOrParentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: 0,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: e,
                child: null
            };
            return null !== e && (e.child = t),
                t
        }
        function ln() {
            const e = Ht.lFrame;
            return Ht.lFrame = e.parent,
                e.previousOrParentTNode = null,
                e.lView = null,
                e
        }
        const cn = ln;
        function un() {
            const e = ln();
            e.isParent = !0,
                e.tView = null,
                e.selectedIndex = 0,
                e.contextLView = null,
                e.elementDepthCount = 0,
                e.currentDirectiveIndex = -1,
                e.currentNamespace = null,
                e.bindingRootIndex = -1,
                e.bindingIndex = -1,
                e.currentQueryIndex = 0
        }
        function hn() {
            return Ht.lFrame.selectedIndex
        }
        function dn(e) {
            Ht.lFrame.selectedIndex = e
        }
        function pn() {
            const e = Ht.lFrame;
            return Nt(e.tView, e.selectedIndex)
        }
        function fn(e, t) {
            for (let n = t.directiveStart, s = t.directiveEnd; n < s; n++) {
                const t = e.data[n];
                t.afterContentInit && (e.contentHooks || (e.contentHooks = [])).push(-n, t.afterContentInit),
                t.afterContentChecked && ((e.contentHooks || (e.contentHooks = [])).push(n, t.afterContentChecked),
                    (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, t.afterContentChecked)),
                t.afterViewInit && (e.viewHooks || (e.viewHooks = [])).push(-n, t.afterViewInit),
                t.afterViewChecked && ((e.viewHooks || (e.viewHooks = [])).push(n, t.afterViewChecked),
                    (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, t.afterViewChecked)),
                null != t.onDestroy && (e.destroyHooks || (e.destroyHooks = [])).push(n, t.onDestroy)
            }
        }
        function mn(e, t, n) {
            _n(e, t, 3, n)
        }
        function gn(e, t, n, s) {
            (3 & e[2]) === n && _n(e, t, n, s)
        }
        function yn(e, t) {
            let n = e[2];
            (3 & n) === t && (n &= 2047,
                n += 1,
                e[2] = n)
        }
        function _n(e, t, n, s) {
            const r = null != s ? s : -1;
            let i = 0;
            for (let o = void 0 !== s ? 65535 & e[18] : 0; o < t.length; o++)
                if ("number" == typeof t[o + 1]) {
                    if (i = t[o],
                    null != s && i >= s)
                        break
                } else
                    t[o] < 0 && (e[18] += 65536),
                    (i < r || -1 == r) && (bn(e, n, t, o),
                        e[18] = (4294901760 & e[18]) + o + 2),
                        o++
        }
        function bn(e, t, n, s) {
            const r = n[s] < 0
                , i = n[s + 1]
                , o = e[r ? -n[s] : n[s]];
            r ? e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t && (e[2] += 2048,
                i.call(o)) : i.call(o)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class vn {
            constructor(e, t, n) {
                this.factory = e,
                    this.resolving = !1,
                    this.canSeeViewProviders = t,
                    this.injectImpl = n
            }
        }
        function wn(e, t, n) {
            const s = Tt(e);
            let r = 0;
            for (; r < n.length; ) {
                const i = n[r];
                if ("number" == typeof i) {
                    if (0 !== i)
                        break;
                    r++;
                    const o = n[r++]
                        , a = n[r++]
                        , l = n[r++];
                    s ? e.setAttribute(t, a, l, o) : t.setAttributeNS(o, a, l)
                } else {
                    const o = i
                        , a = n[++r];
                    En(o) ? s && e.setProperty(t, o, a) : s ? e.setAttribute(t, o, a) : t.setAttribute(o, a),
                        r++
                }
            }
            return r
        }
        function En(e) {
            return 64 === e.charCodeAt(0)
        }
        function Cn(e, t) {
            if (null === t || 0 === t.length)
                ;
            else if (null === e || 0 === e.length)
                e = t.slice();
            else {
                let n = -1;
                for (let s = 0; s < t.length; s++) {
                    const r = t[s];
                    "number" == typeof r ? n = r : 0 === n || Sn(e, n, r, null, -1 === n || 2 === n ? t[++s] : null)
                }
            }
            return e
        }
        function Sn(e, t, n, s, r) {
            let i = 0
                , o = e.length;
            if (-1 === t)
                o = -1;
            else
                for (; i < e.length; ) {
                    const n = e[i++];
                    if ("number" == typeof n) {
                        if (n === t) {
                            o = -1;
                            break
                        }
                        if (n > t) {
                            o = i - 1;
                            break
                        }
                    }
                }
            for (; i < e.length; ) {
                const t = e[i];
                if ("number" == typeof t)
                    break;
                if (t === n) {
                    if (null === s)
                        return void (null !== r && (e[i + 1] = r));
                    if (s === e[i + 1])
                        return void (e[i + 2] = r)
                }
                i++,
                null !== s && i++,
                null !== r && i++
            }
            -1 !== o && (e.splice(o, 0, t),
                i = o + 1),
                e.splice(i++, 0, n),
            null !== s && e.splice(i++, 0, s),
            null !== r && e.splice(i++, 0, r)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function xn(e) {
            return -1 !== e
        }
        function Tn(e) {
            return 32767 & e
        }
        function kn(e) {
            return e >> 16
        }
        function In(e, t) {
            let n = kn(e)
                , s = t;
            for (; n > 0; )
                s = s[15],
                    n--;
            return s
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function An(e) {
            return "string" == typeof e ? e : null == e ? "" : "" + e
        }
        function On(e) {
            return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : An(e)
        }
        const Nn = ( () => ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(ke))();
        function Dn(e) {
            return {
                name: "document",
                target: e.ownerDocument
            }
        }
        function Fn(e) {
            return e instanceof Function ? e() : e
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        let Pn = !0;
        function Mn(e) {
            const t = Pn;
            return Pn = e,
                t
        }
        let Vn = 0;
        function Rn(e, t) {
            const n = Ln(e, t);
            if (-1 !== n)
                return n;
            const s = t[1];
            s.firstCreatePass && (e.injectorIndex = t.length,
                jn(s.data, e),
                jn(t, null),
                jn(s.blueprint, null));
            const r = Hn(e, t)
                , i = e.injectorIndex;
            if (xn(r)) {
                const e = Tn(r)
                    , n = In(r, t)
                    , s = n[1].data;
                for (let r = 0; r < 8; r++)
                    t[i + r] = n[e + r] | s[e + r]
            }
            return t[i + 8] = r,
                i
        }
        function jn(e, t) {
            e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
        }
        function Ln(e, t) {
            return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null == t[e.injectorIndex + 8] ? -1 : e.injectorIndex
        }
        function Hn(e, t) {
            if (e.parent && -1 !== e.parent.injectorIndex)
                return e.parent.injectorIndex;
            let n = t[6]
                , s = 1;
            for (; n && -1 === n.injectorIndex; )
                n = (t = t[15]) ? t[6] : null,
                    s++;
            return n ? n.injectorIndex | s << 16 : -1
        }
        function Bn(e, t, n) {
            !function(e, t, n) {
                let s;
                "string" == typeof n ? s = n.charCodeAt(0) || 0 : n.hasOwnProperty(Pe) && (s = n[Pe]),
                null == s && (s = n[Pe] = Vn++);
                const r = 255 & s
                    , i = 1 << r
                    , o = 64 & r
                    , a = 32 & r
                    , l = t.data;
                128 & r ? o ? a ? l[e + 7] |= i : l[e + 6] |= i : a ? l[e + 5] |= i : l[e + 4] |= i : o ? a ? l[e + 3] |= i : l[e + 2] |= i : a ? l[e + 1] |= i : l[e] |= i
            }(e, t, n)
        }
        function $n(e, t, n, s=re.Default, r) {
            if (null !== e) {
                const r = function(e) {
                    if ("string" == typeof e)
                        return e.charCodeAt(0) || 0;
                    const t = e.hasOwnProperty(Pe) ? e[Pe] : void 0;
                    return "number" == typeof t && t > 0 ? 255 & t : t
                }(n);
                if ("function" == typeof r) {
                    sn(t, e);
                    try {
                        const e = r();
                        if (null != e || s & re.Optional)
                            return e;
                        throw new Error(`No provider for ${On(n)}!`)
                    } finally {
                        cn()
                    }
                } else if ("number" == typeof r) {
                    if (-1 === r)
                        return new Zn(e,t);
                    let i = null
                        , o = Ln(e, t)
                        , a = -1
                        , l = s & re.Host ? t[16][6] : null;
                    for ((-1 === o || s & re.SkipSelf) && (a = -1 === o ? Hn(e, t) : t[o + 8],
                        Qn(s, !1) ? (i = t[1],
                            o = Tn(a),
                            t = In(a, t)) : o = -1); -1 !== o; ) {
                        a = t[o + 8];
                        const e = t[1];
                        if (Wn(r, o, e.data)) {
                            const e = qn(o, t, n, i, s, l);
                            if (e !== zn)
                                return e
                        }
                        Qn(s, t[1].data[o + 8] === l) && Wn(r, o, t) ? (i = e,
                            o = Tn(a),
                            t = In(a, t)) : o = -1
                    }
                }
            }
            if (s & re.Optional && void 0 === r && (r = null),
            0 == (s & (re.Self | re.Host))) {
                const e = t[9]
                    , i = ze(void 0);
                try {
                    return e ? e.get(n, r, s & re.Optional) : Ge(n, r, s & re.Optional)
                } finally {
                    ze(i)
                }
            }
            if (s & re.Optional)
                return r;
            throw new Error(`NodeInjector: NOT_FOUND [${On(n)}]`)
        }
        const zn = {};
        function qn(e, t, n, s, r, i) {
            const o = t[1]
                , a = o.data[e + 8]
                , l = Un(a, o, n, null == s ? wt(a) && Pn : s != o && 3 === a.type, r & re.Host && i === a);
            return null !== l ? Gn(t, o, l, a) : zn
        }
        function Un(e, t, n, s, r) {
            const i = e.providerIndexes
                , o = t.data
                , a = 65535 & i
                , l = e.directiveStart
                , c = i >> 16
                , u = r ? a + c : e.directiveEnd;
            for (let h = s ? a : a + c; h < u; h++) {
                const e = o[h];
                if (h < l && n === e || h >= l && e.type === n)
                    return h
            }
            if (r) {
                const e = o[l];
                if (e && Ct(e) && e.type === n)
                    return l
            }
            return null
        }
        function Gn(e, t, n, s) {
            let r = e[n];
            const i = t.data;
            if (r instanceof vn) {
                const o = r;
                if (o.resolving)
                    throw new Error("Circular dep for " + On(i[n]));
                const a = Mn(o.canSeeViewProviders);
                let l;
                o.resolving = !0,
                o.injectImpl && (l = ze(o.injectImpl)),
                    sn(e, s);
                try {
                    r = e[n] = o.factory(void 0, i, e, s),
                    t.firstCreatePass && n >= s.directiveStart && /**
                     * @license
                     * Copyright Google LLC All Rights Reserved.
                     *
                     * Use of this source code is governed by an MIT-style license that can be
                     * found in the LICENSE file at https://angular.io/license
                     */
                    function(e, t, n) {
                        const {onChanges: s, onInit: r, doCheck: i} = t;
                        s && ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                            (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, s)),
                        r && (n.preOrderHooks || (n.preOrderHooks = [])).push(-e, r),
                        i && ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                            (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, i))
                    }(n, i[n], t)
                } finally {
                    o.injectImpl && ze(l),
                        Mn(a),
                        o.resolving = !1,
                        cn()
                }
            }
            return r
        }
        function Wn(e, t, n) {
            const s = 64 & e
                , r = 32 & e;
            let i;
            return i = 128 & e ? s ? r ? n[t + 7] : n[t + 6] : r ? n[t + 5] : n[t + 4] : s ? r ? n[t + 3] : n[t + 2] : r ? n[t + 1] : n[t],
                !!(i & 1 << e)
        }
        function Qn(e, t) {
            return !(e & re.Self || e & re.Host && t)
        }
        class Zn {
            constructor(e, t) {
                this._tNode = e,
                    this._lView = t
            }
            get(e, t) {
                return $n(this._tNode, this._lView, e, void 0, t)
            }
        }
        function Kn(e) {
            const t = e;
            if (Ee(e))
                return () => {
                    const e = Kn(we(t));
                    return e ? e() : null
                }
                    ;
            let n = gt(t);
            if (null === n) {
                const e = he(t);
                n = e && e.factory
            }
            return n || null
        }
        function Yn(e) {
            return J( () => {
                    const t = e.prototype.constructor
                        , n = t[Fe] || Kn(t)
                        , s = Object.prototype;
                    let r = Object.getPrototypeOf(e.prototype).constructor;
                    for (; r && r !== s; ) {
                        const e = r[Fe] || Kn(r);
                        if (e && e !== n)
                            return e;
                        r = Object.getPrototypeOf(r)
                    }
                    return e => new e
                }
            )
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Jn(e) {
            return e.ngDebugContext
        }
        function Xn(e) {
            return e.ngOriginalError
        }
        function es(e, ...t) {
            e.error(...t)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class ts {
            constructor() {
                this._console = console
            }
            handleError(e) {
                const t = this._findOriginalError(e)
                    , n = this._findContext(e)
                    , s = function(e) {
                    return e.ngErrorLogger || es
                }(e);
                s(this._console, "ERROR", e),
                t && s(this._console, "ORIGINAL ERROR", t),
                n && s(this._console, "ERROR CONTEXT", n)
            }
            _findContext(e) {
                return e ? Jn(e) ? Jn(e) : this._findContext(Xn(e)) : null
            }
            _findOriginalError(e) {
                let t = Xn(e);
                for (; t && Xn(t); )
                    t = Xn(t);
                return t
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class ns {
            constructor(e) {
                this.changingThisBreaksApplicationSecurity = e
            }
            toString() {
                return "SafeValue must use [property]=binding: " + this.changingThisBreaksApplicationSecurity + " (see http://g.co/ng/security#xss)"
            }
        }
        function ss(e) {
            return e instanceof ns ? e.changingThisBreaksApplicationSecurity : e
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        let rs = !1;
        function is() {
            return rs = !0,
                !0
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const os = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi
            , as = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        var ls = function(e) {
            return e[e.NONE = 0] = "NONE",
                e[e.HTML = 1] = "HTML",
                e[e.STYLE = 2] = "STYLE",
                e[e.SCRIPT = 3] = "SCRIPT",
                e[e.URL = 4] = "URL",
                e[e.RESOURCE_URL = 5] = "RESOURCE_URL",
                e
        }({});
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function cs(e) {
            const t = function() {
                const e = $t();
                return e && e[12]
            }/**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
                ();
            return t ? t.sanitize(ls.URL, e) || "" : function(e, t) {
                const n = function(e) {
                    return e instanceof ns && e.getTypeName() || null
                }(e);
                if (null != n && n !== t) {
                    if ("ResourceURL" === n && "URL" === t)
                        return !0;
                    throw new Error(`Required a safe ${t}, got a ${n} (see http://g.co/ng/security#xss)`)
                }
                return n === t
            }(e, "URL") ? ss(e) : (n = An(e),
                (n = String(n)).match(os) || n.match(as) ? n : (is() && console.warn(`WARNING: sanitizing unsafe URL value ${n} (see http://g.co/ng/security#xss)`),
                "unsafe:" + n));
            var n
        }
        function us(e, t) {
            e.__ngContext__ = t
        }
        function hs(e) {
            throw new Error("Multiple components match node with tagname " + e.tagName)
        }
        function ds() {
            throw new Error("Cannot mix multi providers and regular providers")
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function ps(e, t, n) {
            let s = e.length;
            for (; ; ) {
                const r = e.indexOf(t, n);
                if (-1 === r)
                    return r;
                if (0 === r || e.charCodeAt(r - 1) <= 32) {
                    const n = t.length;
                    if (r + n === s || e.charCodeAt(r + n) <= 32)
                        return r
                }
                n = r + 1
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function fs(e, t, n) {
            let s = 0;
            for (; s < e.length; ) {
                let r = e[s++];
                if (n && "class" === r) {
                    if (r = e[s],
                    -1 !== ps(r.toLowerCase(), t, 0))
                        return !0
                } else if (1 === r) {
                    for (; s < e.length && "string" == typeof (r = e[s++]); )
                        if (r.toLowerCase() === t)
                            return !0;
                    return !1
                }
            }
            return !1
        }
        function ms(e) {
            return 0 === e.type && "ng-template" !== e.tagName
        }
        function gs(e, t, n) {
            return t === (0 !== e.type || n ? e.tagName : "ng-template")
        }
        function ys(e, t, n) {
            let s = 4;
            const r = e.attrs || []
                , i = function(e) {
                for (let n = 0; n < e.length; n++)
                    if (3 === (t = e[n]) || 4 === t || 6 === t)
                        return n;
                var t;
                return e.length
            }(r);
            let o = !1;
            for (let a = 0; a < t.length; a++) {
                const l = t[a];
                if ("number" != typeof l) {
                    if (!o)
                        if (4 & s) {
                            if (s = 2 | 1 & s,
                            "" !== l && !gs(e, l, n) || "" === l && 1 === t.length) {
                                if (_s(s))
                                    return !1;
                                o = !0
                            }
                        } else {
                            const c = 8 & s ? l : t[++a];
                            if (8 & s && null !== e.attrs) {
                                if (!fs(e.attrs, c, n)) {
                                    if (_s(s))
                                        return !1;
                                    o = !0
                                }
                                continue
                            }
                            const u = bs(8 & s ? "class" : l, r, ms(e), n);
                            if (-1 === u) {
                                if (_s(s))
                                    return !1;
                                o = !0;
                                continue
                            }
                            if ("" !== c) {
                                let e;
                                e = u > i ? "" : r[u + 1].toLowerCase();
                                const t = 8 & s ? e : null;
                                if (t && -1 !== ps(t, c, 0) || 2 & s && c !== e) {
                                    if (_s(s))
                                        return !1;
                                    o = !0
                                }
                            }
                        }
                } else {
                    if (!o && !_s(s) && !_s(l))
                        return !1;
                    if (o && _s(l))
                        continue;
                    o = !1,
                        s = l | 1 & s
                }
            }
            return _s(s) || o
        }
        function _s(e) {
            return 0 == (1 & e)
        }
        function bs(e, t, n, s) {
            if (null === t)
                return -1;
            let r = 0;
            if (s || !n) {
                let n = !1;
                for (; r < t.length; ) {
                    const s = t[r];
                    if (s === e)
                        return r;
                    if (3 === s || 6 === s)
                        n = !0;
                    else {
                        if (1 === s || 2 === s) {
                            let e = t[++r];
                            for (; "string" == typeof e; )
                                e = t[++r];
                            continue
                        }
                        if (4 === s)
                            break;
                        if (0 === s) {
                            r += 4;
                            continue
                        }
                    }
                    r += n ? 1 : 2
                }
                return -1
            }
            return function(e, t) {
                let n = e.indexOf(4);
                if (n > -1)
                    for (n++; n < e.length; ) {
                        const s = e[n];
                        if ("number" == typeof s)
                            return -1;
                        if (s === t)
                            return n;
                        n++
                    }
                return -1
            }(t, e)
        }
        function vs(e, t, n=!1) {
            for (let s = 0; s < t.length; s++)
                if (ys(e, t[s], n))
                    return !0;
            return !1
        }
        function ws(e, t) {
            return e ? ":not(" + t.trim() + ")" : t
        }
        function Es(e) {
            let t = e[0]
                , n = 1
                , s = 2
                , r = ""
                , i = !1;
            for (; n < e.length; ) {
                let o = e[n];
                if ("string" == typeof o)
                    if (2 & s) {
                        const t = e[++n];
                        r += "[" + o + (t.length > 0 ? '="' + t + '"' : "") + "]"
                    } else
                        8 & s ? r += "." + o : 4 & s && (r += " " + o);
                else
                    "" === r || _s(o) || (t += ws(i, r),
                        r = ""),
                        s = o,
                        i = i || !_s(s);
                n++
            }
            return "" !== r && (t += ws(i, r)),
                t
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Cs = {};
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Ss(e) {
            const t = e[3];
            return bt(t) ? t[3] : t
        }
        function xs(e) {
            return ks(e[13])
        }
        function Ts(e) {
            return ks(e[4])
        }
        function ks(e) {
            for (; null !== e && !bt(e); )
                e = e[4];
            return e
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Is(e) {
            As(zt(), $t(), hn() + e, Zt())
        }
        function As(e, t, n, s) {
            if (!s)
                if (3 == (3 & t[2])) {
                    const s = e.preOrderCheckHooks;
                    null !== s && mn(t, s, n)
                } else {
                    const s = e.preOrderHooks;
                    null !== s && gn(t, s, 0, n)
                }
            dn(n)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Os(e, t) {
            return e << 17 | t << 2
        }
        function Ns(e) {
            return e >> 17 & 32767
        }
        function Ds(e) {
            return 2 | e
        }
        function Fs(e) {
            return (131068 & e) >> 2
        }
        function Ps(e, t) {
            return -131069 & e | t << 2
        }
        function Ms(e) {
            return 1 | e
        }
        function Vs(e, t) {
            const n = e.contentQueries;
            if (null !== n)
                for (let s = 0; s < n.length; s += 2) {
                    const r = n[s]
                        , i = n[s + 1];
                    if (-1 !== i) {
                        const n = e.data[i];
                        nn(r),
                            n.contentQueries(2, t[i], i)
                    }
                }
        }
        function Rs(e, t, n) {
            return Tt(t) ? t.createElement(e, n) : null === n ? t.createElement(e) : t.createElementNS(n, e)
        }
        function js(e, t, n, s, r, i, o, a, l, c) {
            const u = t.blueprint.slice();
            return u[0] = r,
                u[2] = 140 | s,
                jt(u),
                u[3] = u[15] = e,
                u[8] = n,
                u[10] = o || e && e[10],
                u[11] = a || e && e[11],
                u[12] = l || e && e[12] || null,
                u[9] = c || e && e[9] || null,
                u[6] = i,
                u[16] = 2 == t.type ? e[16] : u,
                u
        }
        function Ls(e, t, n, s, r, i) {
            const o = n + 20
                , a = e.data[o] || function(e, t, n, s, r, i) {
                const o = Ut()
                    , a = Wt()
                    , l = a ? o : o && o.parent
                    , c = e.data[n] = Ks(0, l && l !== t ? l : null, s, n, r, i);
                return null === e.firstChild && (e.firstChild = c),
                o && (!a || null != o.child || null === c.parent && 2 !== o.type ? a || (o.next = c) : o.child = c),
                    c
            }(e, t, o, s, r, i);
            return Gt(a, !0),
                a
        }
        function Hs(e, t, n) {
            rn(t, t[6]);
            try {
                const s = e.viewQuery;
                null !== s && _r(1, s, n);
                const r = e.template;
                null !== r && zs(e, t, r, 1, n),
                e.firstCreatePass && (e.firstCreatePass = !1),
                e.staticContentQueries && Vs(e, t),
                e.staticViewQueries && _r(2, e.viewQuery, n);
                const i = e.components;
                null !== i && function(e, t) {
                    for (let n = 0; n < t.length; n++)
                        pr(e, t[n])
                }(t, i)
            } catch (s) {
                throw e.firstCreatePass && (e.incompleteFirstPass = !0),
                    s
            } finally {
                t[2] &= -5,
                    un()
            }
        }
        function Bs(e, t, n, s) {
            const r = t[2];
            if (256 == (256 & r))
                return;
            rn(t, t[6]);
            const i = Zt();
            try {
                jt(t),
                    Ht.lFrame.bindingIndex = e.bindingStartIndex,
                null !== n && zs(e, t, n, 2, s);
                const o = 3 == (3 & r);
                if (!i)
                    if (o) {
                        const n = e.preOrderCheckHooks;
                        null !== n && mn(t, n, null)
                    } else {
                        const n = e.preOrderHooks;
                        null !== n && gn(t, n, 0, null),
                            yn(t, 0)
                    }
                if (function(e) {
                    for (let t = xs(e); null !== t; t = Ts(t)) {
                        if (!t[2])
                            continue;
                        const e = t[9];
                        for (let t = 0; t < e.length; t++) {
                            const n = e[t]
                                , s = n[3];
                            0 == (1024 & n[2]) && Lt(s, 1),
                                n[2] |= 1024
                        }
                    }
                }(t),
                    function(e) {
                        for (let t = xs(e); null !== t; t = Ts(t))
                            for (let e = 10; e < t.length; e++) {
                                const n = t[e]
                                    , s = n[1];
                                Vt(n) && Bs(s, n, s.template, n[8])
                            }
                    }(t),
                null !== e.contentQueries && Vs(e, t),
                    !i)
                    if (o) {
                        const n = e.contentCheckHooks;
                        null !== n && mn(t, n)
                    } else {
                        const n = e.contentHooks;
                        null !== n && gn(t, n, 1),
                            yn(t, 1)
                    }
                !function(e, t) {
                    try {
                        const n = e.expandoInstructions;
                        if (null !== n) {
                            let s = e.expandoStartIndex
                                , r = -1
                                , i = -1;
                            for (let e = 0; e < n.length; e++) {
                                const o = n[e];
                                "number" == typeof o ? o <= 0 ? (i = 0 - o,
                                    dn(i),
                                    s += 9 + n[++e],
                                    r = s) : s += o : (null !== o && (Xt(s, r),
                                    o(2, t[r])),
                                    r++)
                            }
                        }
                    } finally {
                        dn(-1)
                    }
                }(e, t);
                const a = e.components;
                null !== a && function(e, t) {
                    for (let n = 0; n < t.length; n++)
                        dr(e, t[n])
                }(t, a);
                const l = e.viewQuery;
                if (null !== l && _r(2, l, s),
                    !i)
                    if (o) {
                        const n = e.viewCheckHooks;
                        null !== n && mn(t, n)
                    } else {
                        const n = e.viewHooks;
                        null !== n && gn(t, n, 2),
                            yn(t, 2)
                    }
                !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
                i || (t[2] &= -73),
                1024 & t[2] && (t[2] &= -1025,
                    Lt(t[3], -1))
            } finally {
                un()
            }
        }
        function $s(e, t, n, s) {
            const r = t[10]
                , i = !Zt()
                , o = Mt(t);
            try {
                i && !o && r.begin && r.begin(),
                o && Hs(e, t, s),
                    Bs(e, t, n, s)
            } finally {
                i && !o && r.end && r.end()
            }
        }
        function zs(e, t, n, s, r) {
            const i = hn();
            try {
                dn(-1),
                2 & s && t.length > 20 && As(e, t, 0, Zt()),
                    n(s, r)
            } finally {
                dn(i)
            }
        }
        function qs(e, t, n) {
            if (vt(t)) {
                const s = t.directiveEnd;
                for (let r = t.directiveStart; r < s; r++) {
                    const t = e.data[r];
                    t.contentQueries && t.contentQueries(1, n[r], r)
                }
            }
        }
        function Us(e, t, n) {
            Bt() && (function(e, t, n, s) {
                const r = n.directiveStart
                    , i = n.directiveEnd;
                e.firstCreatePass || Rn(n, t),
                    us(s, t);
                const o = n.initialInputs;
                for (let a = r; a < i; a++) {
                    const s = e.data[a]
                        , i = Ct(s);
                    i && lr(t, n, s);
                    const l = Gn(t, e, a, n);
                    us(l, t),
                    null !== o && cr(0, a - r, l, s, 0, o),
                    i && (Ft(n.index, t)[8] = l)
                }
            }(e, t, n, Ot(n, t)),
            128 == (128 & n.flags) && function(e, t, n) {
                const s = n.directiveStart
                    , r = n.directiveEnd
                    , i = e.expandoInstructions
                    , o = e.firstCreatePass
                    , a = n.index - 20
                    , l = Ht.lFrame.currentDirectiveIndex;
                try {
                    dn(a);
                    for (let n = s; n < r; n++) {
                        const s = e.data[n]
                            , r = t[n];
                        en(n),
                            null !== s.hostBindings || 0 !== s.hostVars || null !== s.hostAttrs ? nr(s, r) : o && i.push(null)
                    }
                } finally {
                    dn(-1),
                        en(l)
                }
            }(e, t, n))
        }
        function Gs(e, t, n=Ot) {
            const s = t.localNames;
            if (null !== s) {
                let r = t.index + 1;
                for (let i = 0; i < s.length; i += 2) {
                    const o = s[i + 1]
                        , a = -1 === o ? n(t, e) : e[o];
                    e[r++] = a
                }
            }
        }
        function Ws(e) {
            const t = e.tView;
            return null === t || t.incompleteFirstPass ? e.tView = Qs(1, -1, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts) : t
        }
        function Qs(e, t, n, s, r, i, o, a, l, c) {
            const u = 20 + s
                , h = u + r
                , d = function(e, t) {
                const n = [];
                for (let s = 0; s < t; s++)
                    n.push(s < e ? null : Cs);
                return n
            }(u, h);
            return d[1] = {
                type: e,
                id: t,
                blueprint: d,
                template: n,
                queries: null,
                viewQuery: a,
                node: null,
                data: d.slice().fill(null, u),
                bindingStartIndex: u,
                expandoStartIndex: h,
                expandoInstructions: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof i ? i() : i,
                pipeRegistry: "function" == typeof o ? o() : o,
                firstChild: null,
                schemas: l,
                consts: c,
                incompleteFirstPass: !1
            }
        }
        function Zs(e, t, n, s) {
            const r = vr(t);
            r.push(n),
            e.firstCreatePass && function(e) {
                return e.cleanup || (e.cleanup = [])
            }(e).push(s, r.length - 1)
        }
        function Ks(e, t, n, s, r, i) {
            return {
                type: n,
                index: s,
                injectorIndex: t ? t.injectorIndex : -1,
                directiveStart: -1,
                directiveEnd: -1,
                directiveStylingLast: -1,
                propertyBindings: null,
                flags: 0,
                providerIndexes: 0,
                tagName: r,
                attrs: i,
                mergedAttrs: null,
                localNames: null,
                initialInputs: void 0,
                inputs: null,
                outputs: null,
                tViews: null,
                next: null,
                projectionNext: null,
                child: null,
                parent: t,
                projection: null,
                styles: null,
                stylesWithoutHost: null,
                residualStyles: void 0,
                classes: null,
                classesWithoutHost: null,
                residualClasses: void 0,
                classBindings: 0,
                styleBindings: 0
            }
        }
        function Ys(e, t, n) {
            for (let s in e)
                if (e.hasOwnProperty(s)) {
                    const r = e[s];
                    (n = null === n ? {} : n).hasOwnProperty(s) ? n[s].push(t, r) : n[s] = [t, r]
                }
            return n
        }
        function Js(e, t, n, s, r, i, o, a) {
            const l = Ot(t, n);
            let c, u = t.inputs;
            var h;
            !a && null != u && (c = u[s]) ? (Er(e, n, c, s, r),
            wt(t) && function(e, t) {
                const n = Ft(t, e);
                16 & n[2] || (n[2] |= 64)
            }(n, t.index)) : 3 === t.type && (s = "class" === (h = s) ? "className" : "for" === h ? "htmlFor" : "formaction" === h ? "formAction" : "innerHtml" === h ? "innerHTML" : "readonly" === h ? "readOnly" : "tabindex" === h ? "tabIndex" : h,
                r = null != o ? o(r, t.tagName || "", s) : r,
                Tt(i) ? i.setProperty(l, s, r) : En(s) || (l.setProperty ? l.setProperty(s, r) : l[s] = r))
        }
        function Xs(e, t, n, s) {
            let r = !1;
            if (Bt()) {
                const i = function(e, t, n) {
                    const s = e.directiveRegistry;
                    let r = null;
                    if (s)
                        for (let i = 0; i < s.length; i++) {
                            const o = s[i];
                            vs(n, o.selectors, !1) && (r || (r = []),
                                Bn(Rn(n, t), e, o.type),
                                Ct(o) ? (2 & n.flags && hs(n),
                                    rr(e, n),
                                    r.unshift(o)) : r.push(o))
                        }
                    return r
                }(e, t, n)
                    , o = null === s ? null : {
                    "": -1
                };
                if (null !== i) {
                    let s = 0;
                    r = !0,
                        or(n, e.data.length, i.length);
                    for (let e = 0; e < i.length; e++) {
                        const t = i[e];
                        t.providersResolver && t.providersResolver(t)
                    }
                    sr(e, n, i.length);
                    let a = !1
                        , l = !1;
                    for (let r = 0; r < i.length; r++) {
                        const c = i[r];
                        n.mergedAttrs = Cn(n.mergedAttrs, c.hostAttrs),
                            ar(e, t, c),
                            ir(e.data.length - 1, c, o),
                        null !== c.contentQueries && (n.flags |= 8),
                        null === c.hostBindings && null === c.hostAttrs && 0 === c.hostVars || (n.flags |= 128),
                        !a && (c.onChanges || c.onInit || c.doCheck) && ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index - 20),
                            a = !0),
                        l || !c.onChanges && !c.doCheck || ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(n.index - 20),
                            l = !0),
                            er(e, c),
                            s += c.hostVars
                    }
                    !function(e, t) {
                        const n = t.directiveEnd
                            , s = e.data
                            , r = t.attrs
                            , i = [];
                        let o = null
                            , a = null;
                        for (let l = t.directiveStart; l < n; l++) {
                            const e = s[l]
                                , n = e.inputs
                                , c = null === r || ms(t) ? null : ur(n, r);
                            i.push(c),
                                o = Ys(n, l, o),
                                a = Ys(e.outputs, l, a)
                        }
                        null !== o && (o.hasOwnProperty("class") && (t.flags |= 16),
                        o.hasOwnProperty("style") && (t.flags |= 32)),
                            t.initialInputs = i,
                            t.inputs = o,
                            t.outputs = a
                    }(e, n),
                        tr(e, t, s)
                }
                o && function(e, t, n) {
                    if (t) {
                        const s = e.localNames = [];
                        for (let e = 0; e < t.length; e += 2) {
                            const r = n[t[e + 1]];
                            if (null == r)
                                throw new Error(`Export of name '${t[e + 1]}' not found!`);
                            s.push(t[e], r)
                        }
                    }
                }(n, s, o)
            }
            return n.mergedAttrs = Cn(n.mergedAttrs, n.attrs),
                r
        }
        function er(e, t) {
            const n = e.expandoInstructions;
            n.push(t.hostBindings),
            0 !== t.hostVars && n.push(t.hostVars)
        }
        function tr(e, t, n) {
            for (let s = 0; s < n; s++)
                t.push(Cs),
                    e.blueprint.push(Cs),
                    e.data.push(null)
        }
        function nr(e, t) {
            null !== e.hostBindings && e.hostBindings(1, t)
        }
        function sr(e, t, n) {
            const s = 20 - t.index
                , r = e.data.length - (65535 & t.providerIndexes);
            (e.expandoInstructions || (e.expandoInstructions = [])).push(s, r, n)
        }
        function rr(e, t) {
            t.flags |= 2,
                (e.components || (e.components = [])).push(t.index)
        }
        function ir(e, t, n) {
            if (n) {
                if (t.exportAs)
                    for (let s = 0; s < t.exportAs.length; s++)
                        n[t.exportAs[s]] = e;
                Ct(t) && (n[""] = e)
            }
        }
        function or(e, t, n) {
            e.flags |= 1,
                e.directiveStart = t,
                e.directiveEnd = t + n,
                e.providerIndexes = t
        }
        function ar(e, t, n) {
            e.data.push(n);
            const s = n.factory || (n.factory = gt(n.type))
                , r = new vn(s,Ct(n),null);
            e.blueprint.push(r),
                t.push(r)
        }
        function lr(e, t, n) {
            const s = Ot(t, e)
                , r = Ws(n)
                , i = e[10]
                , o = fr(e, js(e, r, null, n.onPush ? 64 : 16, s, t, i, i.createRenderer(s, n)));
            e[t.index] = o
        }
        function cr(e, t, n, s, r, i) {
            const o = i[t];
            if (null !== o) {
                const e = s.setInput;
                for (let t = 0; t < o.length; ) {
                    const r = o[t++]
                        , i = o[t++]
                        , a = o[t++];
                    null !== e ? s.setInput(n, a, r, i) : n[i] = a
                }
            }
        }
        function ur(e, t) {
            let n = null
                , s = 0;
            for (; s < t.length; ) {
                const r = t[s];
                if (0 !== r)
                    if (5 !== r) {
                        if ("number" == typeof r)
                            break;
                        e.hasOwnProperty(r) && (null === n && (n = []),
                            n.push(r, e[r], t[s + 1])),
                            s += 2
                    } else
                        s += 2;
                else
                    s += 4
            }
            return n
        }
        function hr(e, t, n, s) {
            return new Array(e,!0,!1,t,null,0,s,n,null,null)
        }
        function dr(e, t) {
            const n = Ft(t, e);
            if (Vt(n)) {
                const e = n[1];
                80 & n[2] ? Bs(e, n, e.template, n[8]) : n[5] > 0 && function e(t) {
                    for (let s = xs(t); null !== s; s = Ts(s))
                        for (let t = 10; t < s.length; t++) {
                            const n = s[t];
                            if (1024 & n[2]) {
                                const e = n[1];
                                Bs(e, n, e.template, n[8])
                            } else
                                n[5] > 0 && e(n)
                        }
                    const n = t[1].components;
                    if (null !== n)
                        for (let s = 0; s < n.length; s++) {
                            const r = Ft(n[s], t);
                            Vt(r) && r[5] > 0 && e(r)
                        }
                }(n)
            }
        }
        function pr(e, t) {
            const n = Ft(t, e)
                , s = n[1];
            !function(e, t) {
                for (let n = t.length; n < e.blueprint.length; n++)
                    t.push(e.blueprint[n])
            }(s, n),
                Hs(s, n, n[8])
        }
        function fr(e, t) {
            return e[13] ? e[14][4] = t : e[13] = t,
                e[14] = t,
                t
        }
        function mr(e) {
            for (; e; ) {
                e[2] |= 64;
                const t = Ss(e);
                if (St(e) && !t)
                    return e;
                e = t
            }
            return null
        }
        function gr(e, t, n) {
            const s = t[10];
            s.begin && s.begin();
            try {
                Bs(e, t, e.template, n)
            } catch (r) {
                throw wr(t, r),
                    r
            } finally {
                s.end && s.end()
            }
        }
        function yr(e) {
            !function(e) {
                for (let t = 0; t < e.components.length; t++) {
                    const n = e.components[t]
                        , s = Pt(n)
                        , r = s[1];
                    $s(r, s, r.template, n)
                }
            }(e[8])
        }
        function _r(e, t, n) {
            nn(0),
                t(e, n)
        }
        const br = ( () => Promise.resolve(null))();
        function vr(e) {
            return e[7] || (e[7] = [])
        }
        function wr(e, t) {
            const n = e[9]
                , s = n ? n.get(ts, null) : null;
            s && s.handleError(t)
        }
        function Er(e, t, n, s, r) {
            for (let i = 0; i < n.length; ) {
                const o = n[i++]
                    , a = n[i++]
                    , l = t[o]
                    , c = e.data[o];
                null !== c.setInput ? c.setInput(l, r, s, a) : l[a] = r
            }
        }
        function Cr(e, t) {
            const n = t[3];
            return -1 === e.index ? bt(n) ? n : null : n
        }
        function Sr(e, t) {
            const n = Cr(e, t);
            return n ? Mr(t[11], n[7]) : null
        }
        function xr(e, t, n, s, r) {
            if (null != s) {
                let i, o = !1;
                bt(s) ? i = s : _t(s) && (o = !0,
                    s = s[0]);
                const a = It(s);
                0 === e && null !== n ? null == r ? Fr(t, n, a) : Dr(t, n, a, r || null) : 1 === e && null !== n ? Dr(t, n, a, r || null) : 2 === e ? function(e, t, n) {
                    const s = Mr(e, t);
                    s && function(e, t, n, s) {
                        Tt(e) ? e.removeChild(t, n, s) : t.removeChild(n)
                    }(e, s, t, n)
                }(t, a, o) : 3 === e && t.destroyNode(a),
                null != i && function(e, t, n, s, r) {
                    const i = n[7];
                    i !== It(n) && xr(t, e, s, i, r);
                    for (let o = 10; o < n.length; o++) {
                        const r = n[o];
                        Lr(r[1], r, e, t, s, i)
                    }
                }(t, e, i, n, r)
            }
        }
        function Tr(e, t, n, s) {
            const r = Sr(e.node, t);
            r && Lr(e, t, t[11], n ? 1 : 2, r, s)
        }
        function kr(e, t) {
            const n = e[9]
                , s = n.indexOf(t);
            1024 & t[2] && Lt(t[3], -1),
                n.splice(s, 1)
        }
        function Ir(e, t) {
            if (e.length <= 10)
                return;
            const n = 10 + t
                , s = e[n];
            if (s) {
                const r = s[17];
                null !== r && r !== e && kr(r, s),
                t > 0 && (e[n - 1][4] = s[4]);
                const i = Je(e, 10 + t);
                Tr(s[1], s, !1, null);
                const o = i[19];
                null !== o && o.detachView(i[1]),
                    s[3] = null,
                    s[4] = null,
                    s[2] &= -129
            }
            return s
        }
        function Ar(e, t) {
            if (!(256 & t[2])) {
                const n = t[11];
                Tt(n) && n.destroyNode && Lr(e, t, n, 3, null, null),
                    function(e) {
                        let t = e[13];
                        if (!t)
                            return Nr(e[1], e);
                        for (; t; ) {
                            let n = null;
                            if (_t(t))
                                n = t[13];
                            else {
                                const e = t[10];
                                e && (n = e)
                            }
                            if (!n) {
                                for (; t && !t[4] && t !== e; )
                                    _t(t) && Nr(t[1], t),
                                        t = Or(t, e);
                                null === t && (t = e),
                                _t(t) && Nr(t[1], t),
                                    n = t && t[4]
                            }
                            t = n
                        }
                    }(t)
            }
        }
        function Or(e, t) {
            let n;
            return _t(e) && (n = e[6]) && 2 === n.type ? Cr(n, e) : e[3] === t ? null : e[3]
        }
        function Nr(e, t) {
            if (!(256 & t[2])) {
                t[2] &= -129,
                    t[2] |= 256,
                    function(e, t) {
                        let n;
                        if (null != e && null != (n = e.destroyHooks))
                            for (let s = 0; s < n.length; s += 2) {
                                const e = t[n[s]];
                                if (!(e instanceof vn)) {
                                    const t = n[s + 1];
                                    if (Array.isArray(t))
                                        for (let n = 0; n < t.length; n += 2)
                                            t[n + 1].call(e[t[n]]);
                                    else
                                        t.call(e)
                                }
                            }
                    }(e, t),
                    function(e, t) {
                        const n = e.cleanup;
                        if (null !== n) {
                            const e = t[7];
                            for (let s = 0; s < n.length - 1; s += 2)
                                if ("string" == typeof n[s]) {
                                    const r = n[s + 1]
                                        , i = "function" == typeof r ? r(t) : It(t[r])
                                        , o = e[n[s + 2]]
                                        , a = n[s + 3];
                                    "boolean" == typeof a ? i.removeEventListener(n[s], o, a) : a >= 0 ? e[a]() : e[-a].unsubscribe(),
                                        s += 2
                                } else
                                    n[s].call(e[n[s + 1]]);
                            t[7] = null
                        }
                    }(e, t);
                const n = t[6];
                n && 3 === n.type && Tt(t[11]) && t[11].destroy();
                const s = t[17];
                if (null !== s && bt(t[3])) {
                    s !== t[3] && kr(s, t);
                    const n = t[19];
                    null !== n && n.detachView(e)
                }
            }
        }
        function Dr(e, t, n, s) {
            Tt(e) ? e.insertBefore(t, n, s) : t.insertBefore(n, s, !0)
        }
        function Fr(e, t, n) {
            Tt(e) ? e.appendChild(t, n) : t.appendChild(n)
        }
        function Pr(e, t, n, s) {
            null !== s ? Dr(e, t, n, s) : Fr(e, t, n)
        }
        function Mr(e, t) {
            return Tt(e) ? e.parentNode(t) : t.parentNode
        }
        function Vr(e, t, n, s) {
            const r = function(e, t, n) {
                let s = t.parent;
                for (; null != s && (4 === s.type || 5 === s.type); )
                    s = (t = s).parent;
                if (null == s) {
                    const e = n[6];
                    return 2 === e.type ? Sr(e, n) : n[0]
                }
                if (t && 5 === t.type && 4 & t.flags)
                    return Ot(t, n).parentNode;
                if (2 & s.flags) {
                    const t = e.data
                        , n = t[t[s.index].directiveStart].encapsulation;
                    if (n !== st.ShadowDom && n !== st.Native)
                        return null
                }
                return Ot(s, n)
            }(e, s, t);
            if (null != r) {
                const e = t[11]
                    , i = function(e, t) {
                    if (2 === e.type) {
                        const n = Cr(e, t);
                        return null === n ? null : Rr(n.indexOf(t, 10) - 10, n)
                    }
                    return 4 === e.type || 5 === e.type ? Ot(e, t) : null
                }(s.parent || t[6], t);
                if (Array.isArray(n))
                    for (let t = 0; t < n.length; t++)
                        Pr(e, r, n[t], i);
                else
                    Pr(e, r, n, i)
            }
        }
        function Rr(e, t) {
            const n = 10 + e + 1;
            if (n < t.length) {
                const e = t[n]
                    , s = e[1].firstChild;
                if (null !== s)
                    return function e(t, n) {
                        if (null !== n) {
                            const s = n.type;
                            if (3 === s)
                                return Ot(n, t);
                            if (0 === s)
                                return Rr(-1, t[n.index]);
                            if (4 === s || 5 === s) {
                                const s = n.child;
                                if (null !== s)
                                    return e(t, s);
                                {
                                    const e = t[n.index];
                                    return bt(e) ? Rr(-1, e) : It(e)
                                }
                            }
                            {
                                const s = t[16]
                                    , r = s[6]
                                    , i = Ss(s)
                                    , o = r.projection[n.projection];
                                return null != o ? e(i, o) : e(t, n.next)
                            }
                        }
                        return null
                    }(e, s)
            }
            return t[7]
        }
        function jr(e, t, n, s, r, i, o) {
            for (; null != n; ) {
                const a = s[n.index]
                    , l = n.type;
                o && 0 === t && (a && us(It(a), s),
                    n.flags |= 4),
                64 != (64 & n.flags) && (4 === l || 5 === l ? (jr(e, t, n.child, s, r, i, !1),
                    xr(t, e, r, a, i)) : 1 === l ? Hr(e, t, s, n, r, i) : xr(t, e, r, a, i)),
                    n = o ? n.projectionNext : n.next
            }
        }
        function Lr(e, t, n, s, r, i) {
            jr(n, s, e.node.child, t, r, i, !1)
        }
        function Hr(e, t, n, s, r, i) {
            const o = n[16]
                , a = o[6].projection[s.projection];
            if (Array.isArray(a))
                for (let l = 0; l < a.length; l++)
                    xr(t, e, r, a[l], i);
            else
                jr(e, t, a, o[3], r, i, !0)
        }
        function Br(e, t, n) {
            Tt(e) ? e.setAttribute(t, "style", n) : t.style.cssText = n
        }
        function $r(e, t, n) {
            Tt(e) ? "" === n ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n) : t.className = n
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class zr {
            constructor(e, t) {
                this._lView = e,
                    this._cdRefInjectingView = t,
                    this._appRef = null,
                    this._viewContainerRef = null
            }
            get rootNodes() {
                const e = this._lView;
                return null == e[0] ? function e(t, n, s, r, i=!1) {
                    for (; null !== s; ) {
                        const o = n[s.index];
                        if (null !== o && r.push(It(o)),
                            bt(o))
                            for (let t = 10; t < o.length; t++) {
                                const n = o[t]
                                    , s = n[1].firstChild;
                                null !== s && e(n[1], n, s, r)
                            }
                        const a = s.type;
                        if (4 === a || 5 === a)
                            e(t, n, s.child, r);
                        else if (1 === a) {
                            const t = n[16]
                                , i = t[6].projection[s.projection];
                            if (Array.isArray(i))
                                r.push(...i);
                            else {
                                const n = Ss(t);
                                e(n[1], n, i, r, !0)
                            }
                        }
                        s = i ? s.projectionNext : s.next
                    }
                    return r
                }/**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                    (e[1], e, e[6].child, []) : []
            }
            get context() {
                return this._lView[8]
            }
            get destroyed() {
                return 256 == (256 & this._lView[2])
            }
            destroy() {
                if (this._appRef)
                    this._appRef.detachView(this);
                else if (this._viewContainerRef) {
                    const e = this._viewContainerRef.indexOf(this);
                    e > -1 && this._viewContainerRef.detach(e),
                        this._viewContainerRef = null
                }
                Ar(this._lView[1], this._lView)
            }
            onDestroy(e) {
                Zs(this._lView[1], this._lView, null, e)
            }
            markForCheck() {
                mr(this._cdRefInjectingView || this._lView)
            }
            detach() {
                this._lView[2] &= -129
            }
            reattach() {
                this._lView[2] |= 128
            }
            detectChanges() {
                gr(this._lView[1], this._lView, this.context)
            }
            checkNoChanges() {
                !function(e, t, n) {
                    Kt(!0);
                    try {
                        gr(e, t, n)
                    } finally {
                        Kt(!1)
                    }
                }(this._lView[1], this._lView, this.context)
            }
            attachToViewContainerRef(e) {
                if (this._appRef)
                    throw new Error("This view is already attached directly to the ApplicationRef!");
                this._viewContainerRef = e
            }
            detachFromAppRef() {
                var e;
                this._appRef = null,
                    Lr(this._lView[1], e = this._lView, e[11], 2, null, null)
            }
            attachToAppRef(e) {
                if (this._viewContainerRef)
                    throw new Error("This view is already attached to a ViewContainer!");
                this._appRef = e
            }
        }
        class qr extends zr {
            constructor(e) {
                super(e),
                    this._view = e
            }
            detectChanges() {
                yr(this._view)
            }
            checkNoChanges() {
                !function(e) {
                    Kt(!0);
                    try {
                        yr(e)
                    } finally {
                        Kt(!1)
                    }
                }(this._view)
            }
            get context() {
                return null
            }
        }
        let Ur, Gr, Wr;
        function Qr(e, t, n) {
            return Ur || (Ur = class extends e {
                }
            ),
                new Ur(Ot(t, n))
        }
        function Zr(e, t, n, s) {
            return Gr || (Gr = class extends e {
                    constructor(e, t, n) {
                        super(),
                            this._declarationView = e,
                            this._declarationTContainer = t,
                            this.elementRef = n
                    }
                    createEmbeddedView(e) {
                        const t = this._declarationTContainer.tViews
                            , n = js(this._declarationView, t, e, 16, null, t.node);
                        n[17] = this._declarationView[this._declarationTContainer.index];
                        const s = this._declarationView[19];
                        return null !== s && (n[19] = s.createEmbeddedView(t)),
                            Hs(t, n, e),
                            new zr(n)
                    }
                }
            ),
                0 === n.type ? new Gr(s,n,Qr(t, n, s)) : null
        }
        function Kr(e, t, n, s) {
            let r;
            Wr || (Wr = class extends e {
                    constructor(e, t, n) {
                        super(),
                            this._lContainer = e,
                            this._hostTNode = t,
                            this._hostView = n
                    }
                    get element() {
                        return Qr(t, this._hostTNode, this._hostView)
                    }
                    get injector() {
                        return new Zn(this._hostTNode,this._hostView)
                    }
                    get parentInjector() {
                        const e = Hn(this._hostTNode, this._hostView)
                            , t = In(e, this._hostView)
                            , n = function(e, t, n) {
                            if (n.parent && -1 !== n.parent.injectorIndex) {
                                const e = n.parent.injectorIndex;
                                let t = n.parent;
                                for (; null != t.parent && e == t.parent.injectorIndex; )
                                    t = t.parent;
                                return t
                            }
                            let s = kn(e)
                                , r = t
                                , i = t[6];
                            for (; s > 1; )
                                r = r[15],
                                    i = r[6],
                                    s--;
                            return i
                        }(e, this._hostView, this._hostTNode);
                        return xn(e) && null != n ? new Zn(n,t) : new Zn(null,this._hostView)
                    }
                    clear() {
                        for (; this.length > 0; )
                            this.remove(this.length - 1)
                    }
                    get(e) {
                        return null !== this._lContainer[8] && this._lContainer[8][e] || null
                    }
                    get length() {
                        return this._lContainer.length - 10
                    }
                    createEmbeddedView(e, t, n) {
                        const s = e.createEmbeddedView(t || {});
                        return this.insert(s, n),
                            s
                    }
                    createComponent(e, t, n, s, r) {
                        const i = n || this.parentInjector;
                        if (!r && null == e.ngModule && i) {
                            const e = i.get(Ze, null);
                            e && (r = e)
                        }
                        const o = e.create(i, s, void 0, r);
                        return this.insert(o.hostView, t),
                            o
                    }
                    insert(e, t) {
                        const n = e._lView
                            , s = n[1];
                        if (e.destroyed)
                            throw new Error("Cannot insert a destroyed View in a ViewContainer!");
                        if (this.allocateContainerIfNeeded(),
                            bt(n[3])) {
                            const t = this.indexOf(e);
                            if (-1 !== t)
                                this.detach(t);
                            else {
                                const t = n[3]
                                    , s = new Wr(t,t[6],t[3]);
                                s.detach(s.indexOf(e))
                            }
                        }
                        const r = this._adjustIndex(t);
                        return function(e, t, n, s) {
                            const r = 10 + s
                                , i = n.length;
                            s > 0 && (n[r - 1][4] = t),
                                s < i - 10 ? (t[4] = n[r],
                                    Ye(n, 10 + s, t)) : (n.push(t),
                                    t[4] = null),
                                t[3] = n;
                            const o = t[17];
                            null !== o && n !== o && function(e, t) {
                                const n = e[9];
                                t[16] !== t[3][3][16] && (e[2] = !0),
                                    null === n ? e[9] = [t] : n.push(t)
                            }(o, t);
                            const a = t[19];
                            null !== a && a.insertView(e),
                                t[2] |= 128
                        }(s, n, this._lContainer, r),
                            Tr(s, n, !0, Rr(r, this._lContainer)),
                            e.attachToViewContainerRef(this),
                            Ye(this._lContainer[8], r, e),
                            e
                    }
                    move(e, t) {
                        if (e.destroyed)
                            throw new Error("Cannot move a destroyed View in a ViewContainer!");
                        return this.insert(e, t)
                    }
                    indexOf(e) {
                        const t = this._lContainer[8];
                        return null !== t ? t.indexOf(e) : -1
                    }
                    remove(e) {
                        this.allocateContainerIfNeeded();
                        const t = this._adjustIndex(e, -1);
                        !function(e, t) {
                            const n = Ir(e, t);
                            n && Ar(n[1], n)
                        }(this._lContainer, t),
                            Je(this._lContainer[8], t)
                    }
                    detach(e) {
                        this.allocateContainerIfNeeded();
                        const t = this._adjustIndex(e, -1)
                            , n = Ir(this._lContainer, t);
                        return n && null != Je(this._lContainer[8], t) ? new zr(n) : null
                    }
                    _adjustIndex(e, t=0) {
                        return null == e ? this.length + t : e
                    }
                    allocateContainerIfNeeded() {
                        null === this._lContainer[8] && (this._lContainer[8] = [])
                    }
                }
            );
            const i = s[n.index];
            if (bt(i))
                r = i;
            else {
                let e;
                if (4 === n.type)
                    e = It(i);
                else if (e = s[11].createComment(""),
                    St(s)) {
                    const t = s[11]
                        , r = Ot(n, s);
                    Dr(t, Mr(t, r), e, function(e, t) {
                        return Tt(e) ? e.nextSibling(t) : t.nextSibling
                    }(t, r))
                } else
                    Vr(s[1], s, e, n);
                s[n.index] = r = hr(i, s, e, n),
                    fr(s, r)
            }
            return new Wr(r,n,s)
        }
        const Yr = new Me("Set Injector scope.")
            , Jr = {}
            , Xr = {}
            , ei = [];
        let ti = void 0;
        function ni() {
            return void 0 === ti && (ti = new Qe),
                ti
        }
        function si(e, t=null, n=null, s) {
            return new ri(e,n,t || ni(),s)
        }
        class ri {
            constructor(e, t, n, s=null) {
                this.parent = n,
                    this.records = new Map,
                    this.injectorDefTypes = new Set,
                    this.onDestroy = new Set,
                    this._destroyed = !1;
                const r = [];
                t && Ke(t, n => this.processProvider(n, e, t)),
                    Ke([e], e => this.processInjectorType(e, [], r)),
                    this.records.set(Ve, ai(void 0, this));
                const i = this.records.get(Yr);
                this.scope = null != i ? i.value : null,
                    this.source = s || ("object" == typeof e ? null : ye(e))
            }
            get destroyed() {
                return this._destroyed
            }
            destroy() {
                this.assertNotDestroyed(),
                    this._destroyed = !0;
                try {
                    this.onDestroy.forEach(e => e.ngOnDestroy())
                } finally {
                    this.records.clear(),
                        this.onDestroy.clear(),
                        this.injectorDefTypes.clear()
                }
            }
            get(e, t=Re, n=re.Default) {
                this.assertNotDestroyed();
                const s = $e(this);
                try {
                    if (!(n & re.SkipSelf)) {
                        let t = this.records.get(e);
                        if (void 0 === t) {
                            const n = ("function" == typeof (r = e) || "object" == typeof r && r instanceof Me) && ce(e);
                            t = n && this.injectableDefInScope(n) ? ai(ii(e), Jr) : null,
                                this.records.set(e, t)
                        }
                        if (null != t)
                            return this.hydrate(e, t)
                    }
                    return (n & re.Self ? ni() : this.parent).get(e, t = n & re.Optional && t === Re ? null : t)
                } catch (i) {
                    if ("NullInjectorError" === i.name) {
                        if ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(ye(e)),
                            s)
                            throw i;
                        return function(e, t, n, s) {
                            const r = e.ngTempTokenPath;
                            throw t.__source && r.unshift(t.__source),
                                e.message = function(e, t, n, s=null) {
                                    e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.substr(2) : e;
                                    let r = ye(t);
                                    if (Array.isArray(t))
                                        r = t.map(ye).join(" -> ");
                                    else if ("object" == typeof t) {
                                        let e = [];
                                        for (let n in t)
                                            if (t.hasOwnProperty(n)) {
                                                let s = t[n];
                                                e.push(n + ":" + ("string" == typeof s ? JSON.stringify(s) : ye(s)))
                                            }
                                        r = `{${e.join(", ")}}`
                                    }
                                    return `${n}${s ? "(" + s + ")" : ""}[${r}]: ${e.replace(je, "\n  ")}`
                                    /**
                                     * @license
                                     * Copyright Google LLC All Rights Reserved.
                                     *
                                     * Use of this source code is governed by an MIT-style license that can be
                                     * found in the LICENSE file at https://angular.io/license
                                     */
                                }("\n" + e.message, r, n, s),
                                e.ngTokenPath = r,
                                e.ngTempTokenPath = null,
                                e
                        }(i, e, "R3InjectorError", this.source)
                    }
                    throw i
                } finally {
                    $e(s)
                }
                var r;
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
            _resolveInjectorDefTypes() {
                this.injectorDefTypes.forEach(e => this.get(e))
            }
            toString() {
                const e = [];
                return this.records.forEach( (t, n) => e.push(ye(n))),
                    `R3Injector[${e.join(", ")}]`
            }
            assertNotDestroyed() {
                if (this._destroyed)
                    throw new Error("Injector has already been destroyed.")
            }
            processInjectorType(e, t, n) {
                if (!(e = we(e)))
                    return !1;
                let s = he(e);
                const r = null == s && e.ngModule || void 0
                    , i = void 0 === r ? e : r
                    , o = -1 !== n.indexOf(i);
                if (void 0 !== r && (s = he(r)),
                null == s)
                    return !1;
                if (null != s.imports && !o) {
                    let e;
                    n.push(i);
                    try {
                        Ke(s.imports, s => {
                                this.processInjectorType(s, t, n) && (void 0 === e && (e = []),
                                    e.push(s))
                            }
                        )
                    } finally {}
                    if (void 0 !== e)
                        for (let t = 0; t < e.length; t++) {
                            const {ngModule: n, providers: s} = e[t];
                            Ke(s, e => this.processProvider(e, n, s || ei))
                        }
                }
                this.injectorDefTypes.add(i),
                    this.records.set(i, ai(s.factory, Jr));
                const a = s.providers;
                if (null != a && !o) {
                    const t = e;
                    Ke(a, e => this.processProvider(e, t, a))
                }
                return void 0 !== r && void 0 !== e.providers
            }
            processProvider(e, t, n) {
                let s = ci(e = we(e)) ? e : we(e && e.provide);
                const r = function(e, t, n) {
                    return li(e) ? ai(void 0, e.useValue) : ai(oi(e, t, n), Jr)
                }(e, t, n);
                if (ci(e) || !0 !== e.multi) {
                    const e = this.records.get(s);
                    e && void 0 !== e.multi && ds()
                } else {
                    let t = this.records.get(s);
                    t ? void 0 === t.multi && ds() : (t = ai(void 0, Jr, !0),
                        t.factory = () => We(t.multi),
                        this.records.set(s, t)),
                        s = e,
                        t.multi.push(e)
                }
                this.records.set(s, r)
            }
            hydrate(e, t) {
                var n;
                return t.value === Xr ? function(e) {
                    throw new Error("Cannot instantiate cyclic dependency! " + e)
                }(ye(e)) : t.value === Jr && (t.value = Xr,
                    t.value = t.factory()),
                "object" == typeof t.value && t.value && null !== (n = t.value) && "object" == typeof n && "function" == typeof n.ngOnDestroy && this.onDestroy.add(t.value),
                    t.value
            }
            injectableDefInScope(e) {
                return !!e.providedIn && ("string" == typeof e.providedIn ? "any" === e.providedIn || e.providedIn === this.scope : this.injectorDefTypes.has(e.providedIn))
            }
        }
        function ii(e) {
            const t = ce(e)
                , n = null !== t ? t.factory : gt(e);
            if (null !== n)
                return n;
            const s = he(e);
            if (null !== s)
                return s.factory;
            if (e instanceof Me)
                throw new Error(`Token ${ye(e)} is missing a \u0275prov definition.`);
            if (e instanceof Function)
                return function(e) {
                    const t = e.length;
                    if (t > 0) {
                        const n = function(e, t) {
                            const n = [];
                            for (let s = 0; s < e; s++)
                                n.push("?");
                            return n
                        }(t);
                        throw new Error(`Can't resolve all parameters for ${ye(e)}: (${n.join(", ")}).`)
                    }
                    const n = function(e) {
                        const t = e && (e[de] || e[me] || e[fe] && e[fe]());
                        if (t) {
                            const n = function(e) {
                                if (e.hasOwnProperty("name"))
                                    return e.name;
                                const t = ("" + e).match(/^function\s*([^\s(]+)/);
                                return null === t ? "" : t[1]
                            }(e);
                            return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`),
                                t
                        }
                        return null
                    }(e);
                    return null !== n ? () => n.factory(e) : () => new e
                }(e);
            throw new Error("unreachable")
        }
        function oi(e, t, n) {
            let s = void 0;
            if (ci(e)) {
                const t = we(e);
                return gt(t) || ii(t)
            }
            if (li(e))
                s = () => we(e.useValue);
            else if ((r = e) && r.useFactory)
                s = () => e.useFactory(...We(e.deps || []));
            else if (function(e) {
                return !(!e || !e.useExisting)
            }(e))
                s = () => Ue(we(e.useExisting));
            else {
                const r = we(e && (e.useClass || e.provide));
                if (r || function(e, t, n) {
                    let s = "";
                    throw e && t && (s = ` - only instances of Provider and Type are allowed, got: [${t.map(e => e == n ? "?" + n + "?" : "...").join(", ")}]`),
                        new Error(`Invalid provider for the NgModule '${ye(e)}'` + s)
                }(t, n, e),
                    !function(e) {
                        return !!e.deps
                    }(e))
                    return gt(r) || ii(r);
                s = () => new r(...We(e.deps))
            }
            var r;
            return s
        }
        function ai(e, t, n=!1) {
            return {
                factory: e,
                value: t,
                multi: n ? [] : void 0
            }
        }
        function li(e) {
            return null !== e && "object" == typeof e && Le in e
        }
        function ci(e) {
            return "function" == typeof e
        }
        const ui = function(e, t, n) {
            return function(e, t=null, n=null, s) {
                const r = si(e, t, n, s);
                return r._resolveInjectorDefTypes(),
                    r
            }({
                name: n
            }, t, e, n)
        };
        let hi = ( () => {
                class e {
                    static create(e, t) {
                        return Array.isArray(e) ? ui(e, t, "") : ui(e.providers, e.parent, e.name || "")
                    }
                }
                return e.THROW_IF_NOT_FOUND = Re,
                    e.NULL = new Qe,
                    e.\u0275prov = ae({
                        token: e,
                        providedIn: "any",
                        factory: () => Ue(Ve)
                    }),
                    e.__NG_ELEMENT_ID__ = -1,
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function di(e, t, n) {
            let s = n ? e.styles : null
                , r = n ? e.classes : null
                , i = 0;
            if (null !== t)
                for (let o = 0; o < t.length; o++) {
                    const e = t[o];
                    "number" == typeof e ? i = e : 1 == i ? r = _e(r, e) : 2 == i && (s = _e(s, e + ": " + t[++o] + ";"))
                }
            n ? e.styles = s : e.stylesWithoutHost = s,
                n ? e.classes = r : e.classesWithoutHost = r
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        let pi = null;
        function fi() {
            if (!pi) {
                const e = ke.Symbol;
                if (e && e.iterator)
                    pi = e.iterator;
                else {
                    const e = Object.getOwnPropertyNames(Map.prototype);
                    for (let t = 0; t < e.length; ++t) {
                        const n = e[t];
                        "entries" !== n && "size" !== n && Map.prototype[n] === Map.prototype.entries && (pi = n)
                    }
                }
            }
            return pi
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class mi {
            constructor(e) {
                this.wrapped = e
            }
            static wrap(e) {
                return new mi(e)
            }
            static unwrap(e) {
                return mi.isWrapped(e) ? e.wrapped : e
            }
            static isWrapped(e) {
                return e instanceof mi
            }
        }
        function gi(e) {
            return !!yi(e) && (Array.isArray(e) || !(e instanceof Map) && fi()in e)
        }
        function yi(e) {
            return null !== e && ("function" == typeof e || "object" == typeof e)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function _i(e, t, n) {
            return !Object.is(e[t], n) && (e[t] = n,
                !0)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function bi(e, t, n, s) {
            const r = $t();
            return _i(r, Yt(), t) && (zt(),
                function(e, t, n, s, r, i) {
                    const o = Ot(e, t)
                        , a = t[11];
                    if (null == s)
                        Tt(a) ? a.removeAttribute(o, n, i) : o.removeAttribute(n);
                    else {
                        const t = null == r ? An(s) : r(s, e.tagName || "", n);
                        Tt(a) ? a.setAttribute(o, n, t, i) : i ? o.setAttributeNS(i, n, t) : o.setAttribute(n, t)
                    }
                }(pn(), r, e, t, n, s)),
                bi
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function vi(e, t, n, s) {
            return _i(e, Yt(), n) ? t + An(n) + s : Cs
        }
        function wi(e, t, n, s, r, i, o, a) {
            const l = $t()
                , c = zt()
                , u = e + 20
                , h = c.firstCreatePass ? /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                function(e, t, n, s, r, i, o, a, l) {
                    const c = t.consts
                        , u = Ls(t, n[6], e, 0, o || null, Rt(c, a));
                    Xs(t, n, u, Rt(c, l)),
                        fn(t, u);
                    const h = u.tViews = Qs(2, -1, s, r, i, t.directiveRegistry, t.pipeRegistry, null, t.schemas, c)
                        , d = Ks(0, null, 2, -1, null, null);
                    return d.injectorIndex = u.injectorIndex,
                        h.node = d,
                    null !== t.queries && (t.queries.template(t, u),
                        h.queries = t.queries.embeddedTView(u)),
                        u
                }(e, c, l, t, n, s, r, i, o) : c.data[u];
            Gt(h, !1);
            const d = l[11].createComment("");
            Vr(c, l, d, h),
                us(d, l),
                fr(l, l[u] = hr(d, l, d, h)),
            Et(h) && Us(c, l, h),
            null != o && Gs(l, h, a)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Ei(e) {
            return Dt(Ht.lFrame.contextLView, e)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Ci(e, t=re.Default) {
            const n = $t();
            return null == n ? Ue(e, t) : $n(Ut(), n, we(e), t)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Si(e, t, n) {
            const s = $t();
            return _i(s, Yt(), t) && Js(zt(), pn(), s, e, t, s[11], n, !1),
                Si
        }
        function xi(e, t, n, s, r) {
            const i = r ? "class" : "style";
            Er(e, n, t.inputs[i], i, s)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Ti(e, t, n, s) {
            const r = $t()
                , i = zt()
                , o = 20 + e
                , a = r[11]
                , l = r[o] = Rs(t, a, Ht.lFrame.currentNamespace)
                , c = i.firstCreatePass ? function(e, t, n, s, r, i, o) {
                const a = t.consts
                    , l = Rt(a, i)
                    , c = Ls(t, n[6], e, 3, r, l);
                return Xs(t, n, c, Rt(a, o)),
                null !== c.attrs && di(c, c.attrs, !1),
                null !== c.mergedAttrs && di(c, c.mergedAttrs, !0),
                null !== t.queries && t.queries.elementStart(t, c),
                    c
            }(e, i, r, 0, t, n, s) : i.data[o];
            Gt(c, !0);
            const u = c.mergedAttrs;
            null !== u && wn(a, l, u);
            const h = c.classes;
            null !== h && $r(a, l, h);
            const d = c.styles;
            null !== d && Br(a, l, d),
                Vr(i, r, l, c),
            0 === Ht.lFrame.elementDepthCount && us(l, r),
                Ht.lFrame.elementDepthCount++,
            Et(c) && (Us(i, r, c),
                qs(i, c, r)),
            null !== s && Gs(r, c)
        }
        function ki() {
            let e = Ut();
            Wt() ? Qt() : (e = e.parent,
                Gt(e, !1));
            const t = e;
            Ht.lFrame.elementDepthCount--;
            const n = zt();
            n.firstCreatePass && (fn(n, e),
            vt(e) && n.queries.elementEnd(e)),
            null != t.classesWithoutHost && function(e) {
                return 0 != (16 & e.flags)
            }(t) && xi(n, t, $t(), t.classesWithoutHost, !0),
            null != t.stylesWithoutHost && function(e) {
                return 0 != (32 & e.flags)
            }/**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
                (t) && xi(n, t, $t(), t.stylesWithoutHost, !1)
        }
        function Ii(e, t, n, s) {
            Ti(e, t, n, s),
                ki()
        }
        function Ai() {
            return $t()
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Oi(e) {
            return !!e && "function" == typeof e.then
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Ni(e, t, n=!1, s) {
            const r = $t()
                , i = zt()
                , o = Ut();
            return function(e, t, n, s, r, i, o=!1, a) {
                const l = Et(s)
                    , c = e.firstCreatePass && (e.cleanup || (e.cleanup = []))
                    , u = vr(t);
                let h = !0;
                if (3 === s.type) {
                    const d = Ot(s, t)
                        , p = a ? a(d) : rt
                        , f = p.target || d
                        , m = u.length
                        , g = a ? e => a(It(e[s.index])).target : s.index;
                    if (Tt(n)) {
                        let o = null;
                        if (!a && l && (o = function(e, t, n, s) {
                            const r = e.cleanup;
                            if (null != r)
                                for (let i = 0; i < r.length - 1; i += 2) {
                                    const e = r[i];
                                    if (e === n && r[i + 1] === s) {
                                        const e = t[7]
                                            , n = r[i + 2];
                                        return e.length > n ? e[n] : null
                                    }
                                    "string" == typeof e && (i += 2)
                                }
                            return null
                        }(e, t, r, s.index)),
                        null !== o)
                            (o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i,
                                o.__ngLastListenerFn__ = i,
                                h = !1;
                        else {
                            i = Fi(s, t, i, !1);
                            const e = n.listen(p.name || f, r, i);
                            u.push(i, e),
                            c && c.push(r, g, m, m + 1)
                        }
                    } else
                        i = Fi(s, t, i, !0),
                            f.addEventListener(r, i, o),
                            u.push(i),
                        c && c.push(r, g, m, o)
                }
                const d = s.outputs;
                let p;
                if (h && null !== d && (p = d[r])) {
                    const e = p.length;
                    if (e)
                        for (let n = 0; n < e; n += 2) {
                            const e = t[p[n]][p[n + 1]].subscribe(i)
                                , o = u.length;
                            u.push(i, e),
                            c && c.push(r, s.index, o, -(o + 1))
                        }
                }
            }(i, r, r[11], o, e, t, n, s),
                Ni
        }
        function Di(e, t, n) {
            try {
                return !1 !== t(n)
            } catch (s) {
                return wr(e, s),
                    !1
            }
        }
        function Fi(e, t, n, s) {
            return function r(i) {
                if (i === Function)
                    return n;
                const o = 2 & e.flags ? Ft(e.index, t) : t;
                0 == (32 & t[2]) && mr(o);
                let a = Di(t, n, i)
                    , l = r.__ngNextListenerFn__;
                for (; l; )
                    a = Di(t, l, i) && a,
                        l = l.__ngNextListenerFn__;
                return s && !1 === a && (i.preventDefault(),
                    i.returnValue = !1),
                    a
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
        }
        function Pi(e=1) {
            return function(e) {
                return (Ht.lFrame.contextLView = function(e, t) {
                    for (; e > 0; )
                        t = t[15],
                            e--;
                    return t
                }(e, Ht.lFrame.contextLView))[8]
            }(e)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Mi(e, t, n) {
            return Vi(e, "", t, "", n),
                Mi
        }
        function Vi(e, t, n, s, r) {
            const i = $t()
                , o = vi(i, t, n, s);
            return o !== Cs && Js(zt(), pn(), i, e, o, i[11], r, !1),
                Vi
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Ri = [];
        function ji(e, t, n, s, r) {
            const i = e[n + 1]
                , o = null === t;
            let a = s ? Ns(i) : Fs(i)
                , l = !1;
            for (; 0 !== a && (!1 === l || o); ) {
                const n = e[a + 1];
                Li(e[a], t) && (l = !0,
                    e[a + 1] = s ? Ms(n) : Ds(n)),
                    a = s ? Ns(n) : Fs(n)
            }
            l && (e[n + 1] = s ? Ds(i) : Ms(i))
        }
        function Li(e, t) {
            return null === e || null == t || (Array.isArray(e) ? e[1] : e) === t || !(!Array.isArray(e) || "string" != typeof t) && tt(e, t) >= 0
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Hi = {
            textEnd: 0,
            key: 0,
            keyEnd: 0,
            value: 0,
            valueEnd: 0
        };
        function Bi(e) {
            return e.substring(Hi.key, Hi.keyEnd)
        }
        function $i(e, t) {
            const n = Hi.textEnd;
            return n === t ? -1 : (t = Hi.keyEnd = function(e, t, n) {
                for (; t < n && e.charCodeAt(t) > 32; )
                    t++;
                return t
            }(e, Hi.key = t, n),
                zi(e, t, n))
        }
        function zi(e, t, n) {
            for (; t < n && e.charCodeAt(t) <= 32; )
                t++;
            return t
        }
        function qi(e, t) {
            return function(e, t, n, s) {
                const r = $t()
                    , i = zt()
                    , o = Jt(2);
                i.firstUpdatePass && Wi(i, e, o, !0),
                t !== Cs && _i(r, o, t) && Ki(i, i.data[hn() + 20], r, r[11], e, r[o + 1] = function(e, t) {
                    return null == e || "object" == typeof e && (e = ye(ss(e))),
                        e
                }(t), !0, o)
            }(e, t),
                qi
        }
        function Ui(e, t) {
            for (let n = function(e) {
                return function(e) {
                    Hi.key = 0,
                        Hi.keyEnd = 0,
                        Hi.value = 0,
                        Hi.valueEnd = 0,
                        Hi.textEnd = e.length
                }(e),
                    $i(e, zi(e, 0, Hi.textEnd))
            }(t); n >= 0; n = $i(t, n))
                Xe(e, Bi(t), !0)
        }
        function Gi(e, t) {
            return t >= e.expandoStartIndex
        }
        function Wi(e, t, n, s) {
            const r = e.data;
            if (null === r[n + 1]) {
                const i = r[hn() + 20]
                    , o = Gi(e, n);
                Xi(i, s) && null === t && !o && (t = !1),
                    t = function(e, t, n, s) {
                        const r = function(e) {
                            const t = Ht.lFrame.currentDirectiveIndex;
                            return -1 === t ? null : e[t]
                        }(e);
                        let i = s ? t.residualClasses : t.residualStyles;
                        if (null === r)
                            0 === (s ? t.classBindings : t.styleBindings) && (n = Zi(n = Qi(null, e, t, n, s), t.attrs, s),
                                i = null);
                        else {
                            const o = t.directiveStylingLast;
                            if (-1 === o || e[o] !== r)
                                if (n = Qi(r, e, t, n, s),
                                null === i) {
                                    let n = function(e, t, n) {
                                        const s = n ? t.classBindings : t.styleBindings;
                                        if (0 !== Fs(s))
                                            return e[Ns(s)]
                                    }(e, t, s);
                                    void 0 !== n && Array.isArray(n) && (n = Qi(null, e, t, n[1], s),
                                        n = Zi(n, t.attrs, s),
                                        function(e, t, n, s) {
                                            e[Ns(n ? t.classBindings : t.styleBindings)] = s
                                        }(e, t, s, n))
                                } else
                                    i = function(e, t, n) {
                                        let s = void 0;
                                        const r = t.directiveEnd;
                                        for (let i = 1 + t.directiveStylingLast; i < r; i++)
                                            s = Zi(s, e[i].hostAttrs, n);
                                        return Zi(s, t.attrs, n)
                                    }(e, t, s)
                        }
                        return void 0 !== i && (s ? t.residualClasses = i : t.residualStyles = i),
                            n
                    }(r, i, t, s),
                    function(e, t, n, s, r, i) {
                        let o = i ? t.classBindings : t.styleBindings
                            , a = Ns(o)
                            , l = Fs(o);
                        e[s] = n;
                        let c, u = !1;
                        if (Array.isArray(n)) {
                            const e = n;
                            c = e[1],
                            (null === c || tt(e, c) > 0) && (u = !0)
                        } else
                            c = n;
                        if (r)
                            if (0 !== l) {
                                const t = Ns(e[a + 1]);
                                e[s + 1] = Os(t, a),
                                0 !== t && (e[t + 1] = Ps(e[t + 1], s)),
                                    e[a + 1] = 131071 & e[a + 1] | s << 17
                            } else
                                e[s + 1] = Os(a, 0),
                                0 !== a && (e[a + 1] = Ps(e[a + 1], s)),
                                    a = s;
                        else
                            e[s + 1] = Os(l, 0),
                                0 === a ? a = s : e[l + 1] = Ps(e[l + 1], s),
                                l = s;
                        u && (e[s + 1] = Ds(e[s + 1])),
                            ji(e, c, s, !0),
                            ji(e, c, s, !1),
                            function(e, t, n, s, r) {
                                const i = r ? e.residualClasses : e.residualStyles;
                                null != i && "string" == typeof t && tt(i, t) >= 0 && (n[s + 1] = Ms(n[s + 1]))
                            }(t, c, e, s, i),
                            o = Os(a, l),
                            i ? t.classBindings = o : t.styleBindings = o
                    }(r, i, t, n, o, s)
            }
        }
        function Qi(e, t, n, s, r) {
            let i = null;
            const o = n.directiveEnd;
            let a = n.directiveStylingLast;
            for (-1 === a ? a = n.directiveStart : a++; a < o && (i = t[a],
                s = Zi(s, i.hostAttrs, r),
            i !== e); )
                a++;
            return null !== e && (n.directiveStylingLast = a),
                s
        }
        function Zi(e, t, n) {
            const s = n ? 1 : 2;
            let r = -1;
            if (null !== t)
                for (let i = 0; i < t.length; i++) {
                    const o = t[i];
                    "number" == typeof o ? r = o : r === s && (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                        Xe(e, o, !!n || t[++i]))
                }
            return void 0 === e ? null : e
        }
        function Ki(e, t, n, s, r, i, o, a) {
            if (3 !== t.type)
                return;
            const l = e.data
                , c = l[a + 1];
            Ji(1 == (1 & c) ? Yi(l, t, n, r, Fs(c), o) : void 0) || (Ji(i) || function(e) {
                return 2 == (2 & e)
            }(c) && (i = Yi(l, null, n, r, a, o)),
                function(e, t, n, s, r) {
                    const i = Tt(e);
                    if (t)
                        r ? i ? e.addClass(n, s) : n.classList.add(s) : i ? e.removeClass(n, s) : n.classList.remove(s);
                    else {
                        const t = -1 == s.indexOf("-") ? void 0 : 2;
                        null == r ? i ? e.removeStyle(n, s, t) : n.style.removeProperty(s) : i ? e.setStyle(n, s, r, t) : n.style.setProperty(s, r)
                    }
                }(s, o, At(hn(), n), r, i))
        }
        function Yi(e, t, n, s, r, i) {
            const o = null === t;
            let a = void 0;
            for (; r > 0; ) {
                const t = e[r]
                    , i = Array.isArray(t)
                    , l = i ? t[1] : t
                    , c = null === l;
                let u = n[r + 1];
                u === Cs && (u = c ? Ri : void 0);
                let h = c ? et(u, s) : l === s ? u : void 0;
                if (i && !Ji(h) && (h = et(t, s)),
                Ji(h) && (a = h,
                    o))
                    return a;
                const d = e[r + 1];
                r = o ? Ns(d) : Fs(d)
            }
            if (null !== t) {
                let e = i ? t.residualClasses : t.residualStyles;
                null != e && (a = et(e, s))
            }
            return a
        }
        function Ji(e) {
            return void 0 !== e
        }
        function Xi(e, t) {
            return 0 != (e.flags & (t ? 16 : 32))
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function eo(e, t="") {
            const n = $t()
                , s = zt()
                , r = e + 20
                , i = s.firstCreatePass ? Ls(s, n[6], e, 3, null, null) : s.data[r]
                , o = n[r] = function(e, t) {
                return Tt(t) ? t.createText(e) : t.createTextNode(e)
            }(t, n[11]);
            Vr(s, n, o, i),
                Gt(i, !1)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function to(e) {
            return no("", e, ""),
                to
        }
        function no(e, t, n) {
            const s = $t()
                , r = vi(s, e, t, n);
            return r !== Cs && function(e, t, n) {
                const s = At(t, e)
                    , r = e[11];
                Tt(r) ? r.setValue(s, n) : s.textContent = n
            }/**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
                (s, hn(), r),
                no
        }
        function so(e, t) {
            const n = Pt(e)[1]
                , s = n.data.length - 1;
            fn(n, {
                directiveStart: s,
                directiveEnd: s + 1
            })
        }
        function ro(e) {
            let t = Object.getPrototypeOf(e.type.prototype).constructor
                , n = !0;
            const s = [e];
            for (; t; ) {
                let r = void 0;
                if (Ct(e))
                    r = t.\u0275cmp || t.\u0275dir;
                else {
                    if (t.\u0275cmp)
                        throw new Error("Directives cannot inherit Components");
                    r = t.\u0275dir
                }
                if (r) {
                    if (n) {
                        s.push(r);
                        const t = e;
                        t.inputs = io(e.inputs),
                            t.declaredInputs = io(e.declaredInputs),
                            t.outputs = io(e.outputs);
                        const n = r.hostBindings;
                        n && lo(e, n);
                        const i = r.viewQuery
                            , o = r.contentQueries;
                        if (i && oo(e, i),
                        o && ao(e, o),
                            oe(e.inputs, r.inputs),
                            oe(e.declaredInputs, r.declaredInputs),
                            oe(e.outputs, r.outputs),
                        Ct(r) && r.data.animation) {
                            const t = e.data;
                            t.animation = (t.animation || []).concat(r.data.animation)
                        }
                        t.afterContentChecked = t.afterContentChecked || r.afterContentChecked,
                            t.afterContentInit = e.afterContentInit || r.afterContentInit,
                            t.afterViewChecked = e.afterViewChecked || r.afterViewChecked,
                            t.afterViewInit = e.afterViewInit || r.afterViewInit,
                            t.doCheck = e.doCheck || r.doCheck,
                            t.onDestroy = e.onDestroy || r.onDestroy,
                            t.onInit = e.onInit || r.onInit
                    }
                    const t = r.features;
                    if (t)
                        for (let s = 0; s < t.length; s++) {
                            const r = t[s];
                            r && r.ngInherit && r(e),
                            r === ro && (n = !1)
                        }
                }
                t = Object.getPrototypeOf(t)
            }
            !function(e) {
                let t = 0
                    , n = null;
                for (let s = e.length - 1; s >= 0; s--) {
                    const r = e[s];
                    r.hostVars = t += r.hostVars,
                        r.hostAttrs = Cn(r.hostAttrs, n = Cn(n, r.hostAttrs))
                }
            }(s)
        }
        function io(e) {
            return e === rt ? {} : e === it ? [] : e
        }
        function oo(e, t) {
            const n = e.viewQuery;
            e.viewQuery = n ? (e, s) => {
                    t(e, s),
                        n(e, s)
                }
                : t
        }
        function ao(e, t) {
            const n = e.contentQueries;
            e.contentQueries = n ? (e, s, r) => {
                    t(e, s, r),
                        n(e, s, r)
                }
                : t
        }
        function lo(e, t) {
            const n = e.hostBindings;
            e.hostBindings = n ? (e, s) => {
                    t(e, s),
                        n(e, s)
                }
                : t
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class co {
            constructor(e, t, n) {
                this.previousValue = e,
                    this.currentValue = t,
                    this.firstChange = n
            }
            isFirstChange() {
                return this.firstChange
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function uo(e) {
            e.type.prototype.ngOnChanges && (e.setInput = ho,
                    e.onChanges = function() {
                        const e = po(this)
                            , t = e && e.current;
                        if (t) {
                            const n = e.previous;
                            if (n === rt)
                                e.previous = t;
                            else
                                for (let e in t)
                                    n[e] = t[e];
                            e.current = null,
                                this.ngOnChanges(t)
                        }
                    }
            )
        }
        function ho(e, t, n, s) {
            const r = po(e) || function(e, t) {
                return e.__ngSimpleChanges__ = t
            }/**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
                (e, {
                    previous: rt,
                    current: null
                })
                , i = r.current || (r.current = {})
                , o = r.previous
                , a = this.declaredInputs[n]
                , l = o[a];
            i[a] = new co(l && l.currentValue,t,o === rt),
                e[s] = t
        }
        function po(e) {
            return e.__ngSimpleChanges__ || null
        }
        function fo(e, t, n, s, r) {
            if (e = we(e),
                Array.isArray(e))
                for (let i = 0; i < e.length; i++)
                    fo(e[i], t, n, s, r);
            else {
                const i = zt()
                    , o = $t();
                let a = ci(e) ? e : we(e.provide)
                    , l = oi(e);
                const c = Ut()
                    , u = 65535 & c.providerIndexes
                    , h = c.directiveStart
                    , d = c.providerIndexes >> 16;
                if (ci(e) || !e.multi) {
                    const s = new vn(l,r,Ci)
                        , p = yo(a, t, r ? u : u + d, h);
                    -1 === p ? (Bn(Rn(c, o), i, a),
                        mo(i, e, t.length),
                        t.push(a),
                        c.directiveStart++,
                        c.directiveEnd++,
                    r && (c.providerIndexes += 65536),
                        n.push(s),
                        o.push(s)) : (n[p] = s,
                        o[p] = s)
                } else {
                    const p = yo(a, t, u + d, h)
                        , f = yo(a, t, u, u + d)
                        , m = p >= 0 && n[p]
                        , g = f >= 0 && n[f];
                    if (r && !g || !r && !m) {
                        Bn(Rn(c, o), i, a);
                        const u = function(e, t, n, s, r) {
                            const i = new vn(e,n,Ci);
                            return i.multi = [],
                                i.index = t,
                                i.componentProviders = 0,
                                go(i, r, s && !n),
                                i
                        }(r ? bo : _o, n.length, r, s, l);
                        !r && g && (n[f].providerFactory = u),
                            mo(i, e, t.length, 0),
                            t.push(a),
                            c.directiveStart++,
                            c.directiveEnd++,
                        r && (c.providerIndexes += 65536),
                            n.push(u),
                            o.push(u)
                    } else
                        mo(i, e, p > -1 ? p : f, go(n[r ? f : p], l, !r && s));
                    !r && s && g && n[f].componentProviders++
                }
            }
        }
        function mo(e, t, n, s) {
            const r = ci(t);
            if (r || t.useClass) {
                const i = (t.useClass || t).prototype.ngOnDestroy;
                if (i) {
                    const o = e.destroyHooks || (e.destroyHooks = []);
                    if (!r && t.multi) {
                        const e = o.indexOf(n);
                        -1 === e ? o.push(n, [s, i]) : o[e + 1].push(s, i)
                    } else
                        o.push(n, i)
                }
            }
        }
        function go(e, t, n) {
            return n && e.componentProviders++,
            e.multi.push(t) - 1
        }
        function yo(e, t, n, s) {
            for (let r = n; r < s; r++)
                if (t[r] === e)
                    return r;
            return -1
        }
        function _o(e, t, n, s) {
            return vo(this.multi, [])
        }
        function bo(e, t, n, s) {
            const r = this.multi;
            let i;
            if (this.providerFactory) {
                const e = this.providerFactory.componentProviders
                    , t = Gn(n, n[1], this.providerFactory.index, s);
                i = t.slice(0, e),
                    vo(r, i);
                for (let n = e; n < t.length; n++)
                    i.push(t[n])
            } else
                i = [],
                    vo(r, i);
            return i
        }
        function vo(e, t) {
            for (let n = 0; n < e.length; n++)
                t.push((0,
                    e[n])());
            return t
        }
        function wo(e, t=[]) {
            return n => {
                n.providersResolver = (n, s) => function(e, t, n) {
                    const s = zt();
                    if (s.firstCreatePass) {
                        const r = Ct(e);
                        fo(n, s.data, s.blueprint, r, !0),
                            fo(t, s.data, s.blueprint, r, !1)
                    }
                }(n, s ? s(e) : e, t)
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        uo.ngInherit = !0;
        class Eo {
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Co {
            resolveComponentFactory(e) {
                throw function(e) {
                    const t = Error(`No component factory found for ${ye(e)}. Did you add it to @NgModule.entryComponents?`);
                    return t.ngComponent = e,
                        t
                }(e)
            }
        }
        let So = ( () => {
                class e {
                }
                return e.NULL = new Co,
                    e
            }
        )()
            , xo = ( () => {
                class e {
                    constructor(e) {
                        this.nativeElement = e
                    }
                }
                return e.__NG_ELEMENT_ID__ = () => To(e),
                    e
            }
        )();
        const To = function(e) {
            return Qr(e, Ut(), $t())
        };
        class ko {
        }
        var Io = function(e) {
            return e[e.Important = 1] = "Important",
                e[e.DashCase = 2] = "DashCase",
                e
        }({});
        let Ao = ( () => {
                class e {
                }
                return e.__NG_ELEMENT_ID__ = () => Oo(),
                    e
            }
        )();
        const Oo = function() {
            const e = $t()
                , t = Ft(Ut().index, e);
            return function(e) {
                const t = e[11];
                if (Tt(t))
                    return t;
                throw new Error("Cannot inject Renderer2 when the application uses Renderer3!")
            }(_t(t) ? t : e)
        };
        let No = ( () => {
                class e {
                }
                return e.\u0275prov = ae({
                    token: e,
                    providedIn: "root",
                    factory: () => null
                }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Do {
            constructor(e) {
                this.full = e,
                    this.major = e.split(".")[0],
                    this.minor = e.split(".")[1],
                    this.patch = e.split(".").slice(2).join(".")
            }
        }
        const Fo = new Do("10.0.3");
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Po {
            constructor() {}
            supports(e) {
                return gi(e)
            }
            create(e) {
                return new Vo(e)
            }
        }
        const Mo = (e, t) => t;
        class Vo {
            constructor(e) {
                this.length = 0,
                    this._linkedRecords = null,
                    this._unlinkedRecords = null,
                    this._previousItHead = null,
                    this._itHead = null,
                    this._itTail = null,
                    this._additionsHead = null,
                    this._additionsTail = null,
                    this._movesHead = null,
                    this._movesTail = null,
                    this._removalsHead = null,
                    this._removalsTail = null,
                    this._identityChangesHead = null,
                    this._identityChangesTail = null,
                    this._trackByFn = e || Mo
            }
            forEachItem(e) {
                let t;
                for (t = this._itHead; null !== t; t = t._next)
                    e(t)
            }
            forEachOperation(e) {
                let t = this._itHead
                    , n = this._removalsHead
                    , s = 0
                    , r = null;
                for (; t || n; ) {
                    const i = !n || t && t.currentIndex < Ho(n, s, r) ? t : n
                        , o = Ho(i, s, r)
                        , a = i.currentIndex;
                    if (i === n)
                        s--,
                            n = n._nextRemoved;
                    else if (t = t._next,
                    null == i.previousIndex)
                        s++;
                    else {
                        r || (r = []);
                        const e = o - s
                            , t = a - s;
                        if (e != t) {
                            for (let n = 0; n < e; n++) {
                                const s = n < r.length ? r[n] : r[n] = 0
                                    , i = s + n;
                                t <= i && i < e && (r[n] = s + 1)
                            }
                            r[i.previousIndex] = t - e
                        }
                    }
                    o !== a && e(i, o, a)
                }
            }
            forEachPreviousItem(e) {
                let t;
                for (t = this._previousItHead; null !== t; t = t._nextPrevious)
                    e(t)
            }
            forEachAddedItem(e) {
                let t;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                    e(t)
            }
            forEachMovedItem(e) {
                let t;
                for (t = this._movesHead; null !== t; t = t._nextMoved)
                    e(t)
            }
            forEachRemovedItem(e) {
                let t;
                for (t = this._removalsHead; null !== t; t = t._nextRemoved)
                    e(t)
            }
            forEachIdentityChange(e) {
                let t;
                for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange)
                    e(t)
            }
            diff(e) {
                if (null == e && (e = []),
                    !gi(e))
                    throw new Error(`Error trying to diff '${ye(e)}'. Only arrays and iterables are allowed`);
                return this.check(e) ? this : null
            }
            onDestroy() {}
            check(e) {
                this._reset();
                let t, n, s, r = this._itHead, i = !1;
                if (Array.isArray(e)) {
                    this.length = e.length;
                    for (let t = 0; t < this.length; t++)
                        n = e[t],
                            s = this._trackByFn(t, n),
                            null !== r && Object.is(r.trackById, s) ? (i && (r = this._verifyReinsertion(r, n, s, t)),
                            Object.is(r.item, n) || this._addIdentityChange(r, n)) : (r = this._mismatch(r, n, s, t),
                                i = !0),
                            r = r._next
                } else
                    t = 0,
                        function(e, t) {
                            if (Array.isArray(e))
                                for (let n = 0; n < e.length; n++)
                                    t(e[n]);
                            else {
                                const n = e[fi()]();
                                let s;
                                for (; !(s = n.next()).done; )
                                    t(s.value)
                            }
                        }(e, e => {
                                s = this._trackByFn(t, e),
                                    null !== r && Object.is(r.trackById, s) ? (i && (r = this._verifyReinsertion(r, e, s, t)),
                                    Object.is(r.item, e) || this._addIdentityChange(r, e)) : (r = this._mismatch(r, e, s, t),
                                        i = !0),
                                    r = r._next,
                                    t++
                            }
                        ),
                        this.length = t;
                return this._truncate(r),
                    this.collection = e,
                    this.isDirty
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }
            _reset() {
                if (this.isDirty) {
                    let e, t;
                    for (e = this._previousItHead = this._itHead; null !== e; e = e._next)
                        e._nextPrevious = e._next;
                    for (e = this._additionsHead; null !== e; e = e._nextAdded)
                        e.previousIndex = e.currentIndex;
                    for (this._additionsHead = this._additionsTail = null,
                             e = this._movesHead; null !== e; e = t)
                        e.previousIndex = e.currentIndex,
                            t = e._nextMoved;
                    this._movesHead = this._movesTail = null,
                        this._removalsHead = this._removalsTail = null,
                        this._identityChangesHead = this._identityChangesTail = null
                }
            }
            _mismatch(e, t, n, s) {
                let r;
                return null === e ? r = this._itTail : (r = e._prev,
                    this._remove(e)),
                    null !== (e = null === this._linkedRecords ? null : this._linkedRecords.get(n, s)) ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                        this._moveAfter(e, r, s)) : null !== (e = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                        this._reinsertAfter(e, r, s)) : e = this._addAfter(new Ro(t,n), r, s),
                    e
            }
            _verifyReinsertion(e, t, n, s) {
                let r = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
                return null !== r ? e = this._reinsertAfter(r, e._prev, s) : e.currentIndex != s && (e.currentIndex = s,
                    this._addToMoves(e, s)),
                    e
            }
            _truncate(e) {
                for (; null !== e; ) {
                    const t = e._next;
                    this._addToRemovals(this._unlink(e)),
                        e = t
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                null !== this._additionsTail && (this._additionsTail._nextAdded = null),
                null !== this._movesTail && (this._movesTail._nextMoved = null),
                null !== this._itTail && (this._itTail._next = null),
                null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
                null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }
            _reinsertAfter(e, t, n) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
                const s = e._prevRemoved
                    , r = e._nextRemoved;
                return null === s ? this._removalsHead = r : s._nextRemoved = r,
                    null === r ? this._removalsTail = s : r._prevRemoved = s,
                    this._insertAfter(e, t, n),
                    this._addToMoves(e, n),
                    e
            }
            _moveAfter(e, t, n) {
                return this._unlink(e),
                    this._insertAfter(e, t, n),
                    this._addToMoves(e, n),
                    e
            }
            _addAfter(e, t, n) {
                return this._insertAfter(e, t, n),
                    this._additionsTail = null === this._additionsTail ? this._additionsHead = e : this._additionsTail._nextAdded = e,
                    e
            }
            _insertAfter(e, t, n) {
                const s = null === t ? this._itHead : t._next;
                return e._next = s,
                    e._prev = t,
                    null === s ? this._itTail = e : s._prev = e,
                    null === t ? this._itHead = e : t._next = e,
                null === this._linkedRecords && (this._linkedRecords = new Lo),
                    this._linkedRecords.put(e),
                    e.currentIndex = n,
                    e
            }
            _remove(e) {
                return this._addToRemovals(this._unlink(e))
            }
            _unlink(e) {
                null !== this._linkedRecords && this._linkedRecords.remove(e);
                const t = e._prev
                    , n = e._next;
                return null === t ? this._itHead = n : t._next = n,
                    null === n ? this._itTail = t : n._prev = t,
                    e
            }
            _addToMoves(e, t) {
                return e.previousIndex === t || (this._movesTail = null === this._movesTail ? this._movesHead = e : this._movesTail._nextMoved = e),
                    e
            }
            _addToRemovals(e) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new Lo),
                    this._unlinkedRecords.put(e),
                    e.currentIndex = null,
                    e._nextRemoved = null,
                    null === this._removalsTail ? (this._removalsTail = this._removalsHead = e,
                        e._prevRemoved = null) : (e._prevRemoved = this._removalsTail,
                        this._removalsTail = this._removalsTail._nextRemoved = e),
                    e
            }
            _addIdentityChange(e, t) {
                return e.item = t,
                    this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = e : this._identityChangesTail._nextIdentityChange = e,
                    e
            }
        }
        class Ro {
            constructor(e, t) {
                this.item = e,
                    this.trackById = t,
                    this.currentIndex = null,
                    this.previousIndex = null,
                    this._nextPrevious = null,
                    this._prev = null,
                    this._next = null,
                    this._prevDup = null,
                    this._nextDup = null,
                    this._prevRemoved = null,
                    this._nextRemoved = null,
                    this._nextAdded = null,
                    this._nextMoved = null,
                    this._nextIdentityChange = null
            }
        }
        class jo {
            constructor() {
                this._head = null,
                    this._tail = null
            }
            add(e) {
                null === this._head ? (this._head = this._tail = e,
                    e._nextDup = null,
                    e._prevDup = null) : (this._tail._nextDup = e,
                    e._prevDup = this._tail,
                    e._nextDup = null,
                    this._tail = e)
            }
            get(e, t) {
                let n;
                for (n = this._head; null !== n; n = n._nextDup)
                    if ((null === t || t <= n.currentIndex) && Object.is(n.trackById, e))
                        return n;
                return null
            }
            remove(e) {
                const t = e._prevDup
                    , n = e._nextDup;
                return null === t ? this._head = n : t._nextDup = n,
                    null === n ? this._tail = t : n._prevDup = t,
                null === this._head
            }
        }
        class Lo {
            constructor() {
                this.map = new Map
            }
            put(e) {
                const t = e.trackById;
                let n = this.map.get(t);
                n || (n = new jo,
                    this.map.set(t, n)),
                    n.add(e)
            }
            get(e, t) {
                const n = this.map.get(e);
                return n ? n.get(e, t) : null
            }
            remove(e) {
                const t = e.trackById;
                return this.map.get(t).remove(e) && this.map.delete(t),
                    e
            }
            get isEmpty() {
                return 0 === this.map.size
            }
            clear() {
                this.map.clear()
            }
        }
        function Ho(e, t, n) {
            const s = e.previousIndex;
            if (null === s)
                return s;
            let r = 0;
            return n && s < n.length && (r = n[s]),
            s + t + r
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Bo {
            constructor() {}
            supports(e) {
                return e instanceof Map || yi(e)
            }
            create() {
                return new $o
            }
        }
        class $o {
            constructor() {
                this._records = new Map,
                    this._mapHead = null,
                    this._appendAfter = null,
                    this._previousMapHead = null,
                    this._changesHead = null,
                    this._changesTail = null,
                    this._additionsHead = null,
                    this._additionsTail = null,
                    this._removalsHead = null,
                    this._removalsTail = null
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
            }
            forEachItem(e) {
                let t;
                for (t = this._mapHead; null !== t; t = t._next)
                    e(t)
            }
            forEachPreviousItem(e) {
                let t;
                for (t = this._previousMapHead; null !== t; t = t._nextPrevious)
                    e(t)
            }
            forEachChangedItem(e) {
                let t;
                for (t = this._changesHead; null !== t; t = t._nextChanged)
                    e(t)
            }
            forEachAddedItem(e) {
                let t;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                    e(t)
            }
            forEachRemovedItem(e) {
                let t;
                for (t = this._removalsHead; null !== t; t = t._nextRemoved)
                    e(t)
            }
            diff(e) {
                if (e) {
                    if (!(e instanceof Map || yi(e)))
                        throw new Error(`Error trying to diff '${ye(e)}'. Only maps and objects are allowed`)
                } else
                    e = new Map;
                return this.check(e) ? this : null
            }
            onDestroy() {}
            check(e) {
                this._reset();
                let t = this._mapHead;
                if (this._appendAfter = null,
                    this._forEach(e, (e, n) => {
                            if (t && t.key === n)
                                this._maybeAddToChanges(t, e),
                                    this._appendAfter = t,
                                    t = t._next;
                            else {
                                const s = this._getOrCreateRecordForKey(n, e);
                                t = this._insertBeforeOrAppend(t, s)
                            }
                        }
                    ),
                    t) {
                    t._prev && (t._prev._next = null),
                        this._removalsHead = t;
                    for (let e = t; null !== e; e = e._nextRemoved)
                        e === this._mapHead && (this._mapHead = null),
                            this._records.delete(e.key),
                            e._nextRemoved = e._next,
                            e.previousValue = e.currentValue,
                            e.currentValue = null,
                            e._prev = null,
                            e._next = null
                }
                return this._changesTail && (this._changesTail._nextChanged = null),
                this._additionsTail && (this._additionsTail._nextAdded = null),
                    this.isDirty
            }
            _insertBeforeOrAppend(e, t) {
                if (e) {
                    const n = e._prev;
                    return t._next = e,
                        t._prev = n,
                        e._prev = t,
                    n && (n._next = t),
                    e === this._mapHead && (this._mapHead = t),
                        this._appendAfter = e,
                        e
                }
                return this._appendAfter ? (this._appendAfter._next = t,
                    t._prev = this._appendAfter) : this._mapHead = t,
                    this._appendAfter = t,
                    null
            }
            _getOrCreateRecordForKey(e, t) {
                if (this._records.has(e)) {
                    const n = this._records.get(e);
                    this._maybeAddToChanges(n, t);
                    const s = n._prev
                        , r = n._next;
                    return s && (s._next = r),
                    r && (r._prev = s),
                        n._next = null,
                        n._prev = null,
                        n
                }
                const n = new zo(e);
                return this._records.set(e, n),
                    n.currentValue = t,
                    this._addToAdditions(n),
                    n
            }
            _reset() {
                if (this.isDirty) {
                    let e;
                    for (this._previousMapHead = this._mapHead,
                             e = this._previousMapHead; null !== e; e = e._next)
                        e._nextPrevious = e._next;
                    for (e = this._changesHead; null !== e; e = e._nextChanged)
                        e.previousValue = e.currentValue;
                    for (e = this._additionsHead; null != e; e = e._nextAdded)
                        e.previousValue = e.currentValue;
                    this._changesHead = this._changesTail = null,
                        this._additionsHead = this._additionsTail = null,
                        this._removalsHead = null
                }
            }
            _maybeAddToChanges(e, t) {
                Object.is(t, e.currentValue) || (e.previousValue = e.currentValue,
                    e.currentValue = t,
                    this._addToChanges(e))
            }
            _addToAdditions(e) {
                null === this._additionsHead ? this._additionsHead = this._additionsTail = e : (this._additionsTail._nextAdded = e,
                    this._additionsTail = e)
            }
            _addToChanges(e) {
                null === this._changesHead ? this._changesHead = this._changesTail = e : (this._changesTail._nextChanged = e,
                    this._changesTail = e)
            }
            _forEach(e, t) {
                e instanceof Map ? e.forEach(t) : Object.keys(e).forEach(n => t(e[n], n))
            }
        }
        class zo {
            constructor(e) {
                this.key = e,
                    this.previousValue = null,
                    this.currentValue = null,
                    this._nextPrevious = null,
                    this._next = null,
                    this._prev = null,
                    this._nextAdded = null,
                    this._nextRemoved = null,
                    this._nextChanged = null
            }
        }
        let qo = ( () => {
                class e {
                    constructor(e) {
                        this.factories = e
                    }
                    static create(t, n) {
                        if (null != n) {
                            const e = n.factories.slice();
                            t = t.concat(e)
                        }
                        return new e(t)
                    }
                    static extend(t) {
                        return {
                            provide: e,
                            useFactory: n => {
                                if (!n)
                                    throw new Error("Cannot extend IterableDiffers without a parent injector");
                                return e.create(t, n)
                            }
                            ,
                            deps: [[e, new se, new te]]
                        }
                    }
                    find(e) {
                        const t = this.factories.find(t => t.supports(e));
                        if (null != t)
                            return t;
                        throw new Error(`Cannot find a differ supporting object '${e}' of type '${n = e,
                        n.name || typeof n}'`);
                        var n
                    }
                }
                return e.\u0275prov = ae({
                    token: e,
                    providedIn: "root",
                    factory: () => new e([new Po])
                }),
                    e
            }
        )()
            , Uo = ( () => {
                class e {
                    constructor(e) {
                        this.factories = e
                    }
                    static create(t, n) {
                        if (n) {
                            const e = n.factories.slice();
                            t = t.concat(e)
                        }
                        return new e(t)
                    }
                    static extend(t) {
                        return {
                            provide: e,
                            useFactory: n => {
                                if (!n)
                                    throw new Error("Cannot extend KeyValueDiffers without a parent injector");
                                return e.create(t, n)
                            }
                            ,
                            deps: [[e, new se, new te]]
                        }
                    }
                    find(e) {
                        const t = this.factories.find(t => t.supports(e));
                        if (t)
                            return t;
                        throw new Error(`Cannot find a differ supporting object '${e}'`)
                    }
                }
                return e.\u0275prov = ae({
                    token: e,
                    providedIn: "root",
                    factory: () => new e([new Bo])
                }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Go = [new Bo]
            , Wo = new qo([new Po])
            , Qo = new Uo(Go);
        let Zo = ( () => {
                class e {
                }
                return e.__NG_ELEMENT_ID__ = () => Ko(e, xo),
                    e
            }
        )();
        const Ko = function(e, t) {
            return Zr(e, t, Ut(), $t())
        };
        let Yo = ( () => {
                class e {
                }
                return e.__NG_ELEMENT_ID__ = () => Jo(e, xo),
                    e
            }
        )();
        const Jo = function(e, t) {
            return Kr(e, t, Ut(), $t())
        }
            , Xo = {};
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class ea extends So {
            constructor(e) {
                super(),
                    this.ngModule = e
            }
            resolveComponentFactory(e) {
                const t = mt(e);
                return new sa(t,this.ngModule)
            }
        }
        function ta(e) {
            const t = [];
            for (let n in e)
                e.hasOwnProperty(n) && t.push({
                    propName: e[n],
                    templateName: n
                });
            return t
        }
        const na = new Me("SCHEDULER_TOKEN",{
            providedIn: "root",
            factory: () => Nn
        });
        class sa extends Eo {
            constructor(e, t) {
                super(),
                    this.componentDef = e,
                    this.ngModule = t,
                    this.componentType = e.type,
                    this.selector = e.selectors.map(Es).join(","),
                    this.ngContentSelectors = e.ngContentSelectors ? e.ngContentSelectors : [],
                    this.isBoundToModule = !!t
            }
            get inputs() {
                return ta(this.componentDef.inputs)
            }
            get outputs() {
                return ta(this.componentDef.outputs)
            }
            create(e, t, n, s) {
                const r = (s = s || this.ngModule) ? function(e, t) {
                    return {
                        get: (n, s, r) => {
                            const i = e.get(n, Xo, r);
                            return i !== Xo || s === Xo ? i : t.get(n, s, r)
                        }
                    }
                }(e, s.injector) : e
                    , i = r.get(ko, kt)
                    , o = r.get(No, null)
                    , a = i.createRenderer(null, this.componentDef)
                    , l = this.componentDef.selectors[0][0] || "div"
                    , c = n ? function(e, t, n) {
                    if (Tt(e))
                        return e.selectRootElement(t, n === st.ShadowDom);
                    let s = "string" == typeof t ? e.querySelector(t) : t;
                    return s.textContent = "",
                        s
                }(a, n, this.componentDef.encapsulation) : Rs(l, i.createRenderer(null, this.componentDef), function(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "http://www.w3.org/2000/svg" : "math" === t ? "http://www.w3.org/1998/MathML/" : null
                }(l))
                    , u = this.componentDef.onPush ? 576 : 528
                    , h = {
                    components: [],
                    scheduler: Nn,
                    clean: br,
                    playerHandler: null,
                    flags: 0
                }
                    , d = Qs(0, -1, null, 1, 0, null, null, null, null, null)
                    , p = js(null, d, h, u, null, null, i, a, o, r);
                let f, m;
                rn(p, null);
                try {
                    const e = function(e, t, n, s, r, i) {
                        const o = n[1];
                        n[20] = e;
                        const a = Ls(o, null, 0, 3, null, null)
                            , l = a.mergedAttrs = t.hostAttrs;
                        null !== l && (di(a, l, !0),
                        null !== e && (wn(r, e, l),
                        null !== a.classes && $r(r, e, a.classes),
                        null !== a.styles && Br(r, e, a.styles)));
                        const c = s.createRenderer(e, t)
                            , u = js(n, Ws(t), null, t.onPush ? 64 : 16, n[20], a, s, c, void 0);
                        return o.firstCreatePass && (Bn(Rn(a, n), o, t.type),
                            rr(o, a),
                            or(a, n.length, 1)),
                            fr(n, u),
                            n[20] = u
                    }(c, this.componentDef, p, i, a);
                    if (c)
                        if (n)
                            wn(a, c, ["ng-version", Fo.full]);
                        else {
                            const {attrs: e, classes: t} = function(e) {
                                const t = []
                                    , n = [];
                                let s = 1
                                    , r = 2;
                                for (; s < e.length; ) {
                                    let i = e[s];
                                    if ("string" == typeof i)
                                        2 === r ? "" !== i && t.push(i, e[++s]) : 8 === r && n.push(i);
                                    else {
                                        if (!_s(r))
                                            break;
                                        r = i
                                    }
                                    s++
                                }
                                return {
                                    attrs: t,
                                    classes: n
                                }
                            }(this.componentDef.selectors[0]);
                            e && wn(a, c, e),
                            t && t.length > 0 && $r(a, c, t.join(" "))
                        }
                    if (m = Nt(d, 0),
                    void 0 !== t) {
                        const e = m.projection = [];
                        for (let n = 0; n < this.ngContentSelectors.length; n++) {
                            const s = t[n];
                            e.push(null != s ? Array.from(s) : null)
                        }
                    }
                    f = function(e, t, n, s, r) {
                        const i = n[1]
                            , o = function(e, t, n) {
                            const s = Ut();
                            e.firstCreatePass && (n.providersResolver && n.providersResolver(n),
                                sr(e, s, 1),
                                ar(e, t, n));
                            const r = Gn(t, e, t.length - 1, s);
                            us(r, t);
                            const i = Ot(s, t);
                            return i && us(i, t),
                                r
                        }(i, n, t);
                        s.components.push(o),
                            e[8] = o,
                        r && r.forEach(e => e(o, t)),
                        t.contentQueries && t.contentQueries(1, o, n.length - 1);
                        const a = Ut();
                        if (i.firstCreatePass && (null !== t.hostBindings || null !== t.hostAttrs)) {
                            dn(a.index - 20);
                            const e = n[1];
                            er(e, t),
                                tr(e, n, t.hostVars),
                                nr(t, o)
                        }
                        return o
                    }(e, this.componentDef, p, h, [so]),
                        Hs(d, p, null)
                } finally {
                    un()
                }
                const g = new ra(this.componentType,f,Qr(xo, m, p),p,m);
                return d.node.child = m,
                    g
            }
        }
        class ra extends class {
        }
        {
            constructor(e, t, n, s, r) {
                super(),
                    this.location = n,
                    this._rootLView = s,
                    this._tNode = r,
                    this.destroyCbs = [],
                    this.instance = t,
                    this.hostView = this.changeDetectorRef = new qr(s),
                    function(e, t, n, s) {
                        let r = e.node;
                        null == r && (e.node = r = Ks(0, null, 2, -1, null, null)),
                            s[6] = r
                    }(s[1], 0, 0, s),
                    this.componentType = e
            }
            get injector() {
                return new Zn(this._tNode,this._rootLView)
            }
            destroy() {
                this.destroyCbs && (this.destroyCbs.forEach(e => e()),
                    this.destroyCbs = null,
                !this.hostView.destroyed && this.hostView.destroy())
            }
            onDestroy(e) {
                this.destroyCbs && this.destroyCbs.push(e)
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const ia = void 0;
        var oa = ["en", [["a", "p"], ["AM", "PM"], ia], [["AM", "PM"], ia, ia], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], ia, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], ia, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", ia, "{1} 'at' {0}", ia], [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"], ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", function(e) {
            let t = Math.floor(Math.abs(e))
                , n = e.toString().replace(/^[^.]*\.?/, "").length;
            return 1 === t && 0 === n ? 1 : 5
        }
        ];
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        let aa = {};
        function la(e) {
            const t = function(e) {
                return e.toLowerCase().replace(/_/g, "-")
            }/**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
                (e);
            let n = ca(t);
            if (n)
                return n;
            const s = t.split("-")[0];
            if (n = ca(s),
                n)
                return n;
            if ("en" === s)
                return oa;
            throw new Error(`Missing locale data for the locale "${e}".`)
        }
        function ca(e) {
            return e in aa || (aa[e] = ke.ng && ke.ng.common && ke.ng.common.locales && ke.ng.common.locales[e]),
                aa[e]
        }
        var ua = function(e) {
            return e[e.LocaleId = 0] = "LocaleId",
                e[e.DayPeriodsFormat = 1] = "DayPeriodsFormat",
                e[e.DayPeriodsStandalone = 2] = "DayPeriodsStandalone",
                e[e.DaysFormat = 3] = "DaysFormat",
                e[e.DaysStandalone = 4] = "DaysStandalone",
                e[e.MonthsFormat = 5] = "MonthsFormat",
                e[e.MonthsStandalone = 6] = "MonthsStandalone",
                e[e.Eras = 7] = "Eras",
                e[e.FirstDayOfWeek = 8] = "FirstDayOfWeek",
                e[e.WeekendRange = 9] = "WeekendRange",
                e[e.DateFormat = 10] = "DateFormat",
                e[e.TimeFormat = 11] = "TimeFormat",
                e[e.DateTimeFormat = 12] = "DateTimeFormat",
                e[e.NumberSymbols = 13] = "NumberSymbols",
                e[e.NumberFormats = 14] = "NumberFormats",
                e[e.CurrencyCode = 15] = "CurrencyCode",
                e[e.CurrencySymbol = 16] = "CurrencySymbol",
                e[e.CurrencyName = 17] = "CurrencyName",
                e[e.Currencies = 18] = "Currencies",
                e[e.Directionality = 19] = "Directionality",
                e[e.PluralCase = 20] = "PluralCase",
                e[e.ExtraData = 21] = "ExtraData",
                e
        }({});
        let ha = "en-US";
        function da(e) {
            var t, n;
            n = "Expected localeId to be defined",
            null == (t = e) && function(e, t, n, s) {
                throw new Error("ASSERTION ERROR: " + e + ` [Expected=> null != ${t} <=Actual]`)
            }(n, t),
            "string" == typeof e && (ha = e.toLowerCase().replace(/_/g, "-"))
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const pa = new Map;
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class fa extends Ze {
            constructor(e, t) {
                super(),
                    this._parent = t,
                    this._bootstrapComponents = [],
                    this.injector = this,
                    this.destroyCbs = [],
                    this.componentFactoryResolver = new ea(this);
                const n = yt(e)
                    , s = e[De] || null;
                s && da(s),
                    this._bootstrapComponents = Fn(n.bootstrap),
                    this._r3Injector = si(e, t, [{
                        provide: Ze,
                        useValue: this
                    }, {
                        provide: So,
                        useValue: this.componentFactoryResolver
                    }], ye(e)),
                    this._r3Injector._resolveInjectorDefTypes(),
                    this.instance = this.get(e)
            }
            get(e, t=hi.THROW_IF_NOT_FOUND, n=re.Default) {
                return e === hi || e === Ze || e === Ve ? this : this._r3Injector.get(e, t, n)
            }
            destroy() {
                const e = this._r3Injector;
                !e.destroyed && e.destroy(),
                    this.destroyCbs.forEach(e => e()),
                    this.destroyCbs = null
            }
            onDestroy(e) {
                this.destroyCbs.push(e)
            }
        }
        class ma extends class {
        }
            /**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
        {
            constructor(e) {
                super(),
                    this.moduleType = e,
                null !== yt(e) && function e(t) {
                    if (null !== t.\u0275mod.id) {
                        const e = t.\u0275mod.id;
                        (function(e, t, n) {
                                if (t && t !== n)
                                    throw new Error(`Duplicate module registered for ${e} - ${ye(t)} vs ${ye(t.name)}`)
                            }
                        )(e, pa.get(e), t),
                            pa.set(e, t)
                    }
                    let n = t.\u0275mod.imports;
                    n instanceof Function && (n = n()),
                    n && n.forEach(t => e(t))
                }(e)
            }
            create(e) {
                return new fa(this.moduleType,e)
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function ga(e, t, n, s) {
            const r = $t()
                , i = Dt(r, e);
            return function(e, t) {
                return mi.isWrapped(t) && (t = mi.unwrap(t),
                    e[Ht.lFrame.bindingIndex] = Cs),
                    t
            }/**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
                (r, function(e, t) {
                    return e[1].data[t + 20].pure
                }(r, e) ? function(e, t, n, s, r, i, o) {
                    const a = t + n;
                    return function(e, t, n, s) {
                        const r = _i(e, t, n);
                        return _i(e, t + 1, s) || r
                    }(e, a, r, i) ? function(e, t, n) {
                        return e[t] = n
                    }(e, a + 2, o ? s.call(o, r, i) : s(r, i)) : function(e, t) {
                        const n = e[t];
                        return n === Cs ? void 0 : n
                    }(e, a + 2)
                }(r, function() {
                    const e = Ht.lFrame;
                    let t = e.bindingRootIndex;
                    return -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                        t
                }(), t, i.transform, n, s, i) : i.transform(n, s))
        }
        const ya = class extends C {
                constructor(e=!1) {
                    super(),
                        this.__isAsync = e
                }
                emit(e) {
                    super.next(e)
                }
                subscribe(e, t, n) {
                    let s, r = e => null, i = () => null;
                    e && "object" == typeof e ? (s = this.__isAsync ? t => {
                            setTimeout( () => e.next(t))
                        }
                        : t => {
                            e.next(t)
                        }
                        ,
                    e.error && (r = this.__isAsync ? t => {
                                setTimeout( () => e.error(t))
                            }
                            : t => {
                                e.error(t)
                            }
                    ),
                    e.complete && (i = this.__isAsync ? () => {
                                setTimeout( () => e.complete())
                            }
                            : () => {
                                e.complete()
                            }
                    )) : (s = this.__isAsync ? t => {
                            setTimeout( () => e(t))
                        }
                        : t => {
                            e(t)
                        }
                        ,
                    t && (r = this.__isAsync ? e => {
                                setTimeout( () => t(e))
                            }
                            : e => {
                                t(e)
                            }
                    ),
                    n && (i = this.__isAsync ? () => {
                                setTimeout( () => n())
                            }
                            : () => {
                                n()
                            }
                    ));
                    const o = super.subscribe(s, r, i);
                    return e instanceof h && e.add(o),
                        o
                }
            }
        ;
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function _a() {
            return this._results[fi()]()
        }
        class ba {
            constructor() {
                this.dirty = !0,
                    this._results = [],
                    this.changes = new ya,
                    this.length = 0;
                const e = fi()
                    , t = ba.prototype;
                t[e] || (t[e] = _a)
            }
            map(e) {
                return this._results.map(e)
            }
            filter(e) {
                return this._results.filter(e)
            }
            find(e) {
                return this._results.find(e)
            }
            reduce(e, t) {
                return this._results.reduce(e, t)
            }
            forEach(e) {
                this._results.forEach(e)
            }
            some(e) {
                return this._results.some(e)
            }
            toArray() {
                return this._results.slice()
            }
            toString() {
                return this._results.toString()
            }
            reset(e) {
                this._results = function e(t, n) {
                    void 0 === n && (n = t);
                    for (let s = 0; s < t.length; s++) {
                        let r = t[s];
                        Array.isArray(r) ? (n === t && (n = t.slice(0, s)),
                            e(r, n)) : n !== t && n.push(r)
                    }
                    return n
                }(e),
                    this.dirty = !1,
                    this.length = this._results.length,
                    this.last = this._results[this.length - 1],
                    this.first = this._results[0]
            }
            notifyOnChanges() {
                this.changes.emit(this)
            }
            setDirty() {
                this.dirty = !0
            }
            destroy() {
                this.changes.complete(),
                    this.changes.unsubscribe()
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
        }
        class va {
            constructor(e) {
                this.queryList = e,
                    this.matches = null
            }
            clone() {
                return new va(this.queryList)
            }
            setDirty() {
                this.queryList.setDirty()
            }
        }
        class wa {
            constructor(e=[]) {
                this.queries = e
            }
            createEmbeddedView(e) {
                const t = e.queries;
                if (null !== t) {
                    const n = null !== e.contentQueries ? e.contentQueries[0] : t.length
                        , s = [];
                    for (let e = 0; e < n; e++) {
                        const n = t.getByIndex(e);
                        s.push(this.queries[n.indexInDeclarationView].clone())
                    }
                    return new wa(s)
                }
                return null
            }
            insertView(e) {
                this.dirtyQueriesWithMatches(e)
            }
            detachView(e) {
                this.dirtyQueriesWithMatches(e)
            }
            dirtyQueriesWithMatches(e) {
                for (let t = 0; t < this.queries.length; t++)
                    null !== Da(e, t).matches && this.queries[t].setDirty()
            }
        }
        class Ea {
            constructor(e, t, n, s=null) {
                this.predicate = e,
                    this.descendants = t,
                    this.isStatic = n,
                    this.read = s
            }
        }
        class Ca {
            constructor(e=[]) {
                this.queries = e
            }
            elementStart(e, t) {
                for (let n = 0; n < this.queries.length; n++)
                    this.queries[n].elementStart(e, t)
            }
            elementEnd(e) {
                for (let t = 0; t < this.queries.length; t++)
                    this.queries[t].elementEnd(e)
            }
            embeddedTView(e) {
                let t = null;
                for (let n = 0; n < this.length; n++) {
                    const s = null !== t ? t.length : 0
                        , r = this.getByIndex(n).embeddedTView(e, s);
                    r && (r.indexInDeclarationView = n,
                        null !== t ? t.push(r) : t = [r])
                }
                return null !== t ? new Ca(t) : null
            }
            template(e, t) {
                for (let n = 0; n < this.queries.length; n++)
                    this.queries[n].template(e, t)
            }
            getByIndex(e) {
                return this.queries[e]
            }
            get length() {
                return this.queries.length
            }
            track(e) {
                this.queries.push(e)
            }
        }
        class Sa {
            constructor(e, t=-1) {
                this.metadata = e,
                    this.matches = null,
                    this.indexInDeclarationView = -1,
                    this.crossesNgTemplate = !1,
                    this._appliesToNextNode = !0,
                    this._declarationNodeIndex = t
            }
            elementStart(e, t) {
                this.isApplyingToNode(t) && this.matchTNode(e, t)
            }
            elementEnd(e) {
                this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1)
            }
            template(e, t) {
                this.elementStart(e, t)
            }
            embeddedTView(e, t) {
                return this.isApplyingToNode(e) ? (this.crossesNgTemplate = !0,
                    this.addMatch(-e.index, t),
                    new Sa(this.metadata)) : null
            }
            isApplyingToNode(e) {
                if (this._appliesToNextNode && !1 === this.metadata.descendants) {
                    const t = this._declarationNodeIndex;
                    let n = e.parent;
                    for (; null !== n && 4 === n.type && n.index !== t; )
                        n = n.parent;
                    return t === (null !== n ? n.index : -1)
                }
                return this._appliesToNextNode
            }
            matchTNode(e, t) {
                if (Array.isArray(this.metadata.predicate)) {
                    const n = this.metadata.predicate;
                    for (let s = 0; s < n.length; s++)
                        this.matchTNodeWithReadOption(e, t, xa(t, n[s]))
                } else {
                    const n = this.metadata.predicate;
                    n === Zo ? 0 === t.type && this.matchTNodeWithReadOption(e, t, -1) : this.matchTNodeWithReadOption(e, t, Un(t, e, n, !1, !1))
                }
            }
            matchTNodeWithReadOption(e, t, n) {
                if (null !== n) {
                    const s = this.metadata.read;
                    if (null !== s)
                        if (s === xo || s === Yo || s === Zo && 0 === t.type)
                            this.addMatch(t.index, -2);
                        else {
                            const n = Un(t, e, s, !1, !1);
                            null !== n && this.addMatch(t.index, n)
                        }
                    else
                        this.addMatch(t.index, n)
                }
            }
            addMatch(e, t) {
                null === this.matches ? this.matches = [e, t] : this.matches.push(e, t)
            }
        }
        function xa(e, t) {
            const n = e.localNames;
            if (null !== n)
                for (let s = 0; s < n.length; s += 2)
                    if (n[s] === t)
                        return n[s + 1];
            return null
        }
        function Ta(e, t, n, s) {
            return -1 === n ? function(e, t) {
                return 3 === e.type || 4 === e.type ? Qr(xo, e, t) : 0 === e.type ? Zr(Zo, xo, e, t) : null
            }(t, e) : -2 === n ? function(e, t, n) {
                return n === xo ? Qr(xo, t, e) : n === Zo ? Zr(Zo, xo, t, e) : n === Yo ? Kr(Yo, xo, t, e) : void 0
            }(e, t, s) : Gn(e, e[1], n, t)
        }
        function ka(e, t, n, s) {
            const r = t[19].queries[s];
            if (null === r.matches) {
                const s = e.data
                    , i = n.matches
                    , o = [];
                for (let e = 0; e < i.length; e += 2) {
                    const r = i[e];
                    o.push(r < 0 ? null : Ta(t, s[r], i[e + 1], n.metadata.read))
                }
                r.matches = o
            }
            return r.matches
        }
        function Ia(e) {
            const t = $t()
                , n = zt()
                , s = tn();
            nn(s + 1);
            const r = Da(n, s);
            if (e.dirty && Mt(t) === r.metadata.isStatic) {
                if (null === r.matches)
                    e.reset([]);
                else {
                    const i = r.crossesNgTemplate ? function e(t, n, s, r) {
                        const i = t.queries.getByIndex(s)
                            , o = i.matches;
                        if (null !== o) {
                            const a = ka(t, n, i, s);
                            for (let t = 0; t < o.length; t += 2) {
                                const s = o[t];
                                if (s > 0)
                                    r.push(a[t / 2]);
                                else {
                                    const i = o[t + 1]
                                        , a = n[-s];
                                    for (let t = 10; t < a.length; t++) {
                                        const n = a[t];
                                        n[17] === n[3] && e(n[1], n, i, r)
                                    }
                                    if (null !== a[9]) {
                                        const t = a[9];
                                        for (let n = 0; n < t.length; n++) {
                                            const s = t[n];
                                            e(s[1], s, i, r)
                                        }
                                    }
                                }
                            }
                        }
                        return r
                    }(n, t, s, []) : ka(n, t, r, s);
                    e.reset(i),
                        e.notifyOnChanges()
                }
                return !0
            }
            return !1
        }
        function Aa(e, t, n) {
            Oa(zt(), $t(), e, t, n, !1)
        }
        function Oa(e, t, n, s, r, i) {
            e.firstCreatePass && (function(e, t, n) {
                null === e.queries && (e.queries = new Ca),
                    e.queries.track(new Sa(t,-1))
            }(e, new Ea(n,s,i,r)),
            i && (e.staticViewQueries = !0)),
                function(e, t) {
                    const n = new ba;
                    Zs(e, t, n, n.destroy),
                    null === t[19] && (t[19] = new wa),
                        t[19].queries.push(new va(n))
                }(e, t)
        }
        function Na() {
            return e = $t(),
                t = tn(),
                e[19].queries[t].queryList;
            var e, t
        }
        function Da(e, t) {
            return e.queries.getByIndex(t)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Fa = new Me("Application Initializer");
        let Pa = ( () => {
                class e {
                    constructor(e) {
                        this.appInits = e,
                            this.initialized = !1,
                            this.done = !1,
                            this.donePromise = new Promise( (e, t) => {
                                    this.resolve = e,
                                        this.reject = t
                                }
                            )
                    }
                    runInitializers() {
                        if (this.initialized)
                            return;
                        const e = []
                            , t = () => {
                                this.done = !0,
                                    this.resolve()
                            }
                        ;
                        if (this.appInits)
                            for (let n = 0; n < this.appInits.length; n++) {
                                const t = this.appInits[n]();
                                Oi(t) && e.push(t)
                            }
                        Promise.all(e).then( () => {
                                t()
                            }
                        ).catch(e => {
                                this.reject(e)
                            }
                        ),
                        0 === e.length && t(),
                            this.initialized = !0
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(Fa, 8))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Ma = new Me("AppId")
            , Va = {
            provide: Ma,
            useFactory: function() {
                return `${Ra()}${Ra()}${Ra()}`
            },
            deps: []
        };
        function Ra() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }
        const ja = new Me("Platform Initializer")
            , La = new Me("Platform ID")
            , Ha = new Me("appBootstrapListener");
        let Ba = ( () => {
                class e {
                    log(e) {
                        console.log(e)
                    }
                    warn(e) {
                        console.warn(e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const $a = new Me("LocaleId")
            , za = new Me("DefaultCurrencyCode");
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class qa {
            constructor(e, t) {
                this.ngModuleFactory = e,
                    this.componentFactories = t
            }
        }
        const Ua = function(e) {
            return new ma(e)
        }
            , Ga = Ua
            , Wa = function(e) {
            return Promise.resolve(Ua(e))
        }
            , Qa = function(e) {
            const t = Ua(e)
                , n = Fn(yt(e).declarations).reduce( (e, t) => {
                    const n = mt(t);
                    return n && e.push(new sa(n)),
                        e
                }
                , []);
            return new qa(t,n)
        }
            , Za = Qa
            , Ka = function(e) {
            return Promise.resolve(Qa(e))
        };
        let Ya = ( () => {
                class e {
                    constructor() {
                        this.compileModuleSync = Ga,
                            this.compileModuleAsync = Wa,
                            this.compileModuleAndAllComponentsSync = Za,
                            this.compileModuleAndAllComponentsAsync = Ka
                    }
                    clearCache() {}
                    clearCacheFor(e) {}
                    getModuleId(e) {}
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        const Ja = ( () => Promise.resolve(0))();
        function Xa(e) {
            "undefined" == typeof Zone ? Ja.then( () => {
                    e && e.apply(null, null)
                }
            ) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class el {
            constructor({enableLongStackTrace: e=!1, shouldCoalesceEventChangeDetection: t=!1}) {
                if (this.hasPendingMacrotasks = !1,
                    this.hasPendingMicrotasks = !1,
                    this.isStable = !0,
                    this.onUnstable = new ya(!1),
                    this.onMicrotaskEmpty = new ya(!1),
                    this.onStable = new ya(!1),
                    this.onError = new ya(!1),
                "undefined" == typeof Zone)
                    throw new Error("In this configuration Angular requires Zone.js");
                Zone.assertZonePatched(),
                    this._nesting = 0,
                    this._outer = this._inner = Zone.current,
                Zone.wtfZoneSpec && (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
                Zone.TaskTrackingZoneSpec && (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec)),
                e && Zone.longStackTraceZoneSpec && (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
                    this.shouldCoalesceEventChangeDetection = t,
                    this.lastRequestAnimationFrameId = -1,
                    this.nativeRequestAnimationFrame = function() {
                        let e = ke.requestAnimationFrame
                            , t = ke.cancelAnimationFrame;
                        if ("undefined" != typeof Zone && e && t) {
                            const n = e[Zone.__symbol__("OriginalDelegate")];
                            n && (e = n);
                            const s = t[Zone.__symbol__("OriginalDelegate")];
                            s && (t = s)
                        }
                        return {
                            nativeRequestAnimationFrame: e,
                            nativeCancelAnimationFrame: t
                        }
                    }().nativeRequestAnimationFrame,
                    function(e) {
                        const t = !!e.shouldCoalesceEventChangeDetection && e.nativeRequestAnimationFrame && ( () => {
                                !function(e) {
                                    -1 === e.lastRequestAnimationFrameId && (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(ke, () => {
                                            e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                                    e.lastRequestAnimationFrameId = -1,
                                                        rl(e),
                                                        sl(e)
                                                }
                                                , void 0, () => {}
                                                , () => {}
                                            )),
                                                e.fakeTopEventTask.invoke()
                                        }
                                    ),
                                        rl(e))
                                }(e)
                            }
                        );
                        e._inner = e._inner.fork({
                            name: "angular",
                            properties: {
                                isAngularZone: !0,
                                maybeDelayChangeDetection: t
                            },
                            onInvokeTask: (n, s, r, i, o, a) => {
                                try {
                                    return il(e),
                                        n.invokeTask(r, i, o, a)
                                } finally {
                                    t && "eventTask" === i.type && t(),
                                        ol(e)
                                }
                            }
                            ,
                            onInvoke: (t, n, s, r, i, o, a) => {
                                try {
                                    return il(e),
                                        t.invoke(s, r, i, o, a)
                                } finally {
                                    ol(e)
                                }
                            }
                            ,
                            onHasTask: (t, n, s, r) => {
                                t.hasTask(s, r),
                                n === s && ("microTask" == r.change ? (e._hasPendingMicrotasks = r.microTask,
                                    rl(e),
                                    sl(e)) : "macroTask" == r.change && (e.hasPendingMacrotasks = r.macroTask))
                            }
                            ,
                            onHandleError: (t, n, s, r) => (t.handleError(s, r),
                                e.runOutsideAngular( () => e.onError.emit(r)),
                                !1)
                        })
                    }(this)
            }
            static isInAngularZone() {
                return !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone() {
                if (!el.isInAngularZone())
                    throw new Error("Expected to be in Angular Zone, but it is not!")
            }
            static assertNotInAngularZone() {
                if (el.isInAngularZone())
                    throw new Error("Expected to not be in Angular Zone, but it is!")
            }
            run(e, t, n) {
                return this._inner.run(e, t, n)
            }
            runTask(e, t, n, s) {
                const r = this._inner
                    , i = r.scheduleEventTask("NgZoneEvent: " + s, e, nl, tl, tl);
                try {
                    return r.runTask(i, t, n)
                } finally {
                    r.cancelTask(i)
                }
            }
            runGuarded(e, t, n) {
                return this._inner.runGuarded(e, t, n)
            }
            runOutsideAngular(e) {
                return this._outer.run(e)
            }
        }
        function tl() {}
        const nl = {};
        function sl(e) {
            if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
                try {
                    e._nesting++,
                        e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--,
                        !e.hasPendingMicrotasks)
                        try {
                            e.runOutsideAngular( () => e.onStable.emit(null))
                        } finally {
                            e.isStable = !0
                        }
                }
        }
        function rl(e) {
            e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || e.shouldCoalesceEventChangeDetection && -1 !== e.lastRequestAnimationFrameId)
        }
        function il(e) {
            e._nesting++,
            e.isStable && (e.isStable = !1,
                e.onUnstable.emit(null))
        }
        function ol(e) {
            e._nesting--,
                sl(e)
        }
        class al {
            constructor() {
                this.hasPendingMicrotasks = !1,
                    this.hasPendingMacrotasks = !1,
                    this.isStable = !0,
                    this.onUnstable = new ya,
                    this.onMicrotaskEmpty = new ya,
                    this.onStable = new ya,
                    this.onError = new ya
            }
            run(e, t, n) {
                return e.apply(t, n)
            }
            runGuarded(e, t, n) {
                return e.apply(t, n)
            }
            runOutsideAngular(e) {
                return e()
            }
            runTask(e, t, n, s) {
                return e.apply(t, n)
            }
        }
        let ll = ( () => {
                class e {
                    constructor(e) {
                        this._ngZone = e,
                            this._pendingCount = 0,
                            this._isZoneStable = !0,
                            this._didWork = !1,
                            this._callbacks = [],
                            this.taskTrackingZone = null,
                            this._watchAngularEvents(),
                            e.run( () => {
                                    this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
                                }
                            )
                    }
                    _watchAngularEvents() {
                        this._ngZone.onUnstable.subscribe({
                            next: () => {
                                this._didWork = !0,
                                    this._isZoneStable = !1
                            }
                        }),
                            this._ngZone.runOutsideAngular( () => {
                                    this._ngZone.onStable.subscribe({
                                        next: () => {
                                            el.assertNotInAngularZone(),
                                                Xa( () => {
                                                        this._isZoneStable = !0,
                                                            this._runCallbacksIfReady()
                                                    }
                                                )
                                        }
                                    })
                                }
                            )
                    }
                    increasePendingRequestCount() {
                        return this._pendingCount += 1,
                            this._didWork = !0,
                            this._pendingCount
                    }
                    decreasePendingRequestCount() {
                        if (this._pendingCount -= 1,
                        this._pendingCount < 0)
                            throw new Error("pending async requests below zero");
                        return this._runCallbacksIfReady(),
                            this._pendingCount
                    }
                    isStable() {
                        return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                    }
                    _runCallbacksIfReady() {
                        if (this.isStable())
                            Xa( () => {
                                    for (; 0 !== this._callbacks.length; ) {
                                        let e = this._callbacks.pop();
                                        clearTimeout(e.timeoutId),
                                            e.doneCb(this._didWork)
                                    }
                                    this._didWork = !1
                                }
                            );
                        else {
                            let e = this.getPendingTasks();
                            this._callbacks = this._callbacks.filter(t => !t.updateCb || !t.updateCb(e) || (clearTimeout(t.timeoutId),
                                !1)),
                                this._didWork = !0
                        }
                    }
                    getPendingTasks() {
                        return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(e => ({
                            source: e.source,
                            creationLocation: e.creationLocation,
                            data: e.data
                        })) : []
                    }
                    addCallback(e, t, n) {
                        let s = -1;
                        t && t > 0 && (s = setTimeout( () => {
                                this._callbacks = this._callbacks.filter(e => e.timeoutId !== s),
                                    e(this._didWork, this.getPendingTasks())
                            }
                            , t)),
                            this._callbacks.push({
                                doneCb: e,
                                timeoutId: s,
                                updateCb: n
                            })
                    }
                    whenStable(e, t, n) {
                        if (n && !this.taskTrackingZone)
                            throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                        this.addCallback(e, t, n),
                            this._runCallbacksIfReady()
                    }
                    getPendingRequestCount() {
                        return this._pendingCount
                    }
                    findProviders(e, t, n) {
                        return []
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(el))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )()
            , cl = ( () => {
                class e {
                    constructor() {
                        this._applications = new Map,
                            dl.addToWindow(this)
                    }
                    registerApplication(e, t) {
                        this._applications.set(e, t)
                    }
                    unregisterApplication(e) {
                        this._applications.delete(e)
                    }
                    unregisterAllApplications() {
                        this._applications.clear()
                    }
                    getTestability(e) {
                        return this._applications.get(e) || null
                    }
                    getAllTestabilities() {
                        return Array.from(this._applications.values())
                    }
                    getAllRootElements() {
                        return Array.from(this._applications.keys())
                    }
                    findTestabilityInTree(e, t=!0) {
                        return dl.findTestabilityInTree(this, e, t)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        class ul {
            addToWindow(e) {}
            findTestabilityInTree(e, t, n) {
                return null
            }
        }
        let hl, dl = new ul;
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const pl = new Me("AllowMultipleToken");
        function fl(e, t, n=[]) {
            const s = "Platform: " + t
                , r = new Me(s);
            return (t=[]) => {
                let i = ml();
                if (!i || i.injector.get(pl, !1))
                    if (e)
                        e(n.concat(t).concat({
                            provide: r,
                            useValue: !0
                        }));
                    else {
                        const e = n.concat(t).concat({
                            provide: r,
                            useValue: !0
                        }, {
                            provide: Yr,
                            useValue: "platform"
                        });
                        !function(e) {
                            if (hl && !hl.destroyed && !hl.injector.get(pl, !1))
                                throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                            hl = e.get(gl);
                            const t = e.get(ja, null);
                            t && t.forEach(e => e())
                        }(hi.create({
                            providers: e,
                            name: s
                        }))
                    }
                return function(e) {
                    const t = ml();
                    if (!t)
                        throw new Error("No platform exists!");
                    if (!t.injector.get(e, null))
                        throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                    return t
                }(r)
            }
        }
        function ml() {
            return hl && !hl.destroyed ? hl : null
        }
        let gl = ( () => {
                class e {
                    constructor(e) {
                        this._injector = e,
                            this._modules = [],
                            this._destroyListeners = [],
                            this._destroyed = !1
                    }
                    bootstrapModuleFactory(e, t) {
                        const n = function(e, t) {
                            let n;
                            return n = "noop" === e ? new al : ("zone.js" === e ? void 0 : e) || new el({
                                enableLongStackTrace: is(),
                                shouldCoalesceEventChangeDetection: t
                            }),
                                n
                        }(t ? t.ngZone : void 0, t && t.ngZoneEventCoalescing || !1)
                            , s = [{
                            provide: el,
                            useValue: n
                        }];
                        return n.run( () => {
                                const t = hi.create({
                                    providers: s,
                                    parent: this.injector,
                                    name: e.moduleType.name
                                })
                                    , r = e.create(t)
                                    , i = r.injector.get(ts, null);
                                if (!i)
                                    throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                                return r.onDestroy( () => bl(this._modules, r)),
                                    n.runOutsideAngular( () => n.onError.subscribe({
                                        next: e => {
                                            i.handleError(e)
                                        }
                                    })),
                                    function(e, t, n) {
                                        try {
                                            const s = n();
                                            return Oi(s) ? s.catch(n => {
                                                    throw t.runOutsideAngular( () => e.handleError(n)),
                                                        n
                                                }
                                            ) : s
                                        } catch (s) {
                                            throw t.runOutsideAngular( () => e.handleError(s)),
                                                s
                                        }
                                    }(i, n, () => {
                                            const e = r.injector.get(Pa);
                                            return e.runInitializers(),
                                                e.donePromise.then( () => (da(r.injector.get($a, "en-US") || "en-US"),
                                                    this._moduleDoBootstrap(r),
                                                    r))
                                        }
                                    )
                            }
                        )
                    }
                    bootstrapModule(e, t=[]) {
                        const n = yl({}, t);
                        return function(e, t, n) {
                            const s = new ma(n);
                            return Promise.resolve(s)
                        }(0, 0, e).then(e => this.bootstrapModuleFactory(e, n))
                    }
                    _moduleDoBootstrap(e) {
                        const t = e.injector.get(_l);
                        if (e._bootstrapComponents.length > 0)
                            e._bootstrapComponents.forEach(e => t.bootstrap(e));
                        else {
                            if (!e.instance.ngDoBootstrap)
                                throw new Error(`The module ${ye(e.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);
                            e.instance.ngDoBootstrap(t)
                        }
                        this._modules.push(e)
                    }
                    onDestroy(e) {
                        this._destroyListeners.push(e)
                    }
                    get injector() {
                        return this._injector
                    }
                    destroy() {
                        if (this._destroyed)
                            throw new Error("The platform has already been destroyed!");
                        this._modules.slice().forEach(e => e.destroy()),
                            this._destroyListeners.forEach(e => e()),
                            this._destroyed = !0
                    }
                    get destroyed() {
                        return this._destroyed
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(hi))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        function yl(e, t) {
            return Array.isArray(t) ? t.reduce(yl, e) : Object.assign(Object.assign({}, e), t)
        }
        let _l = ( () => {
                class e {
                    constructor(e, t, n, s, r, i) {
                        this._zone = e,
                            this._console = t,
                            this._injector = n,
                            this._exceptionHandler = s,
                            this._componentFactoryResolver = r,
                            this._initStatus = i,
                            this._bootstrapListeners = [],
                            this._views = [],
                            this._runningTick = !1,
                            this._enforceNoNewChanges = !1,
                            this._stable = !0,
                            this.componentTypes = [],
                            this.components = [],
                            this._enforceNoNewChanges = is(),
                            this._zone.onMicrotaskEmpty.subscribe({
                                next: () => {
                                    this._zone.run( () => {
                                            this.tick()
                                        }
                                    )
                                }
                            });
                        const o = new _(e => {
                                this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks,
                                    this._zone.runOutsideAngular( () => {
                                            e.next(this._stable),
                                                e.complete()
                                        }
                                    )
                            }
                        )
                            , a = new _(e => {
                                let t;
                                this._zone.runOutsideAngular( () => {
                                        t = this._zone.onStable.subscribe( () => {
                                                el.assertNotInAngularZone(),
                                                    Xa( () => {
                                                            this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0,
                                                                e.next(!0))
                                                        }
                                                    )
                                            }
                                        )
                                    }
                                );
                                const n = this._zone.onUnstable.subscribe( () => {
                                        el.assertInAngularZone(),
                                        this._stable && (this._stable = !1,
                                            this._zone.runOutsideAngular( () => {
                                                    e.next(!1)
                                                }
                                            ))
                                    }
                                );
                                return () => {
                                    t.unsubscribe(),
                                        n.unsubscribe()
                                }
                            }
                        );
                        this.isStable = q(o, a.pipe(e => {
                                return U()((t = Y,
                                        function(e) {
                                            let n;
                                            n = "function" == typeof t ? t : function() {
                                                return t
                                            }
                                            ;
                                            const s = Object.create(e, Z);
                                            return s.source = e,
                                                s.subjectFactory = n,
                                                s
                                        }
                                )(e));
                                var t
                            }
                        ))
                    }
                    bootstrap(e, t) {
                        if (!this._initStatus.done)
                            throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                        let n;
                        n = e instanceof Eo ? e : this._componentFactoryResolver.resolveComponentFactory(e),
                            this.componentTypes.push(n.componentType);
                        const s = n.isBoundToModule ? void 0 : this._injector.get(Ze)
                            , r = n.create(hi.NULL, [], t || n.selector, s);
                        r.onDestroy( () => {
                                this._unloadComponent(r)
                            }
                        );
                        const i = r.injector.get(ll, null);
                        return i && r.injector.get(cl).registerApplication(r.location.nativeElement, i),
                            this._loadComponent(r),
                        is() && this._console.log("Angular is running in development mode. Call enableProdMode() to enable production mode."),
                            r
                    }
                    tick() {
                        if (this._runningTick)
                            throw new Error("ApplicationRef.tick is called recursively");
                        try {
                            this._runningTick = !0;
                            for (let e of this._views)
                                e.detectChanges();
                            if (this._enforceNoNewChanges)
                                for (let e of this._views)
                                    e.checkNoChanges()
                        } catch (e) {
                            this._zone.runOutsideAngular( () => this._exceptionHandler.handleError(e))
                        } finally {
                            this._runningTick = !1
                        }
                    }
                    attachView(e) {
                        const t = e;
                        this._views.push(t),
                            t.attachToAppRef(this)
                    }
                    detachView(e) {
                        const t = e;
                        bl(this._views, t),
                            t.detachFromAppRef()
                    }
                    _loadComponent(e) {
                        this.attachView(e.hostView),
                            this.tick(),
                            this.components.push(e),
                            this._injector.get(Ha, []).concat(this._bootstrapListeners).forEach(t => t(e))
                    }
                    _unloadComponent(e) {
                        this.detachView(e.hostView),
                            bl(this.components, e)
                    }
                    ngOnDestroy() {
                        this._views.slice().forEach(e => e.destroy())
                    }
                    get viewCount() {
                        return this._views.length
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(el),Ue(Ba),Ue(hi),Ue(ts),Ue(So),Ue(Pa))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        function bl(e, t) {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }
        const vl = fl(null, "core", [{
            provide: La,
            useValue: "unknown"
        }, {
            provide: gl,
            deps: [hi]
        }, {
            provide: cl,
            deps: []
        }, {
            provide: Ba,
            deps: []
        }])
            , wl = [{
            provide: _l,
            useClass: _l,
            deps: [el, Ba, hi, ts, So, Pa]
        }, {
            provide: na,
            deps: [el],
            useFactory: function(e) {
                let t = [];
                return e.onStable.subscribe( () => {
                        for (; t.length; )
                            t.pop()()
                    }
                ),
                    function(e) {
                        t.push(e)
                    }
            }
        }, {
            provide: Pa,
            useClass: Pa,
            deps: [[new te, Fa]]
        }, {
            provide: Ya,
            useClass: Ya,
            deps: []
        }, Va, {
            provide: qo,
            useFactory: /**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
            function() {
                return Wo
            },
            deps: []
        }, {
            provide: Uo,
            useFactory: function() {
                return Qo
            },
            deps: []
        }, {
            provide: $a,
            useFactory: function(e) {
                return da(e = e || "undefined" != typeof $localize && $localize.locale || "en-US"),
                    e
            },
            deps: [[new ee($a), new te, new se]]
        }, {
            provide: za,
            useValue: "USD"
        }];
        let El = ( () => {
                class e {
                    constructor(e) {}
                }
                return e.\u0275mod = ht({
                    type: e
                }),
                    e.\u0275inj = le({
                        factory: function(t) {
                            return new (t || e)(Ue(_l))
                        },
                        providers: wl
                    }),
                    e
            }
        )()
            , Cl = null;
        function Sl() {
            return Cl
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const xl = new Me("DocumentToken");
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        var Tl = function(e) {
            return e[e.Zero = 0] = "Zero",
                e[e.One = 1] = "One",
                e[e.Two = 2] = "Two",
                e[e.Few = 3] = "Few",
                e[e.Many = 4] = "Many",
                e[e.Other = 5] = "Other",
                e
        }({})
            , kl = function(e) {
            return e[e.Format = 0] = "Format",
                e[e.Standalone = 1] = "Standalone",
                e
        }({})
            , Il = function(e) {
            return e[e.Narrow = 0] = "Narrow",
                e[e.Abbreviated = 1] = "Abbreviated",
                e[e.Wide = 2] = "Wide",
                e[e.Short = 3] = "Short",
                e
        }({})
            , Al = function(e) {
            return e[e.Short = 0] = "Short",
                e[e.Medium = 1] = "Medium",
                e[e.Long = 2] = "Long",
                e[e.Full = 3] = "Full",
                e
        }({})
            , Ol = function(e) {
            return e[e.Decimal = 0] = "Decimal",
                e[e.Group = 1] = "Group",
                e[e.List = 2] = "List",
                e[e.PercentSign = 3] = "PercentSign",
                e[e.PlusSign = 4] = "PlusSign",
                e[e.MinusSign = 5] = "MinusSign",
                e[e.Exponential = 6] = "Exponential",
                e[e.SuperscriptingExponent = 7] = "SuperscriptingExponent",
                e[e.PerMille = 8] = "PerMille",
                e[e[1 / 0] = 9] = "Infinity",
                e[e.NaN = 10] = "NaN",
                e[e.TimeSeparator = 11] = "TimeSeparator",
                e[e.CurrencyDecimal = 12] = "CurrencyDecimal",
                e[e.CurrencyGroup = 13] = "CurrencyGroup",
                e
        }({});
        function Nl(e, t) {
            return Vl(la(e)[ua.DateFormat], t)
        }
        function Dl(e, t) {
            return Vl(la(e)[ua.TimeFormat], t)
        }
        function Fl(e, t) {
            return Vl(la(e)[ua.DateTimeFormat], t)
        }
        function Pl(e, t) {
            const n = la(e)
                , s = n[ua.NumberSymbols][t];
            if (void 0 === s) {
                if (t === Ol.CurrencyDecimal)
                    return n[ua.NumberSymbols][Ol.Decimal];
                if (t === Ol.CurrencyGroup)
                    return n[ua.NumberSymbols][Ol.Group]
            }
            return s
        }
        function Ml(e) {
            if (!e[ua.ExtraData])
                throw new Error(`Missing extra locale data for the locale "${e[ua.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`)
        }
        function Vl(e, t) {
            for (let n = t; n > -1; n--)
                if (void 0 !== e[n])
                    return e[n];
            throw new Error("Locale data API: locale data undefined")
        }
        function Rl(e) {
            const [t,n] = e.split(":");
            return {
                hours: +t,
                minutes: +n
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const jl = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/
            , Ll = {}
            , Hl = /((?:[^GyMLwWdEabBhHmsSzZO']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
        var Bl = function(e) {
            return e[e.Short = 0] = "Short",
                e[e.ShortGMT = 1] = "ShortGMT",
                e[e.Long = 2] = "Long",
                e[e.Extended = 3] = "Extended",
                e
        }({})
            , $l = function(e) {
            return e[e.FullYear = 0] = "FullYear",
                e[e.Month = 1] = "Month",
                e[e.Date = 2] = "Date",
                e[e.Hours = 3] = "Hours",
                e[e.Minutes = 4] = "Minutes",
                e[e.Seconds = 5] = "Seconds",
                e[e.FractionalSeconds = 6] = "FractionalSeconds",
                e[e.Day = 7] = "Day",
                e
        }({})
            , zl = function(e) {
            return e[e.DayPeriods = 0] = "DayPeriods",
                e[e.Days = 1] = "Days",
                e[e.Months = 2] = "Months",
                e[e.Eras = 3] = "Eras",
                e
        }({});
        function ql(e, t) {
            return t && (e = e.replace(/\{([^}]+)}/g, (function(e, n) {
                    return null != t && n in t ? t[n] : e
                }
            ))),
                e
        }
        function Ul(e, t, n="-", s, r) {
            let i = "";
            (e < 0 || r && e <= 0) && (r ? e = 1 - e : (e = -e,
                i = n));
            let o = String(e);
            for (; o.length < t; )
                o = "0" + o;
            return s && (o = o.substr(o.length - t)),
            i + o
        }
        function Gl(e, t, n=0, s=!1, r=!1) {
            return function(i, o) {
                let a = function(e, t) {
                    switch (e) {
                        case $l.FullYear:
                            return t.getFullYear();
                        case $l.Month:
                            return t.getMonth();
                        case $l.Date:
                            return t.getDate();
                        case $l.Hours:
                            return t.getHours();
                        case $l.Minutes:
                            return t.getMinutes();
                        case $l.Seconds:
                            return t.getSeconds();
                        case $l.FractionalSeconds:
                            return t.getMilliseconds();
                        case $l.Day:
                            return t.getDay();
                        default:
                            throw new Error(`Unknown DateType value "${e}".`)
                    }
                }(e, i);
                if ((n > 0 || a > -n) && (a += n),
                e === $l.Hours)
                    0 === a && -12 === n && (a = 12);
                else if (e === $l.FractionalSeconds)
                    return l = t,
                        Ul(a, 3).substr(0, l);
                var l;
                const c = Pl(o, Ol.MinusSign);
                return Ul(a, t, c, s, r)
            }
        }
        function Wl(e, t, n=kl.Format, s=!1) {
            return function(r, i) {
                return function(e, t, n, s, r, i) {
                    switch (n) {
                        case zl.Months:
                            return function(e, t, n) {
                                const s = la(e)
                                    , r = Vl([s[ua.MonthsFormat], s[ua.MonthsStandalone]], t);
                                return Vl(r, n)
                            }(t, r, s)[e.getMonth()];
                        case zl.Days:
                            return function(e, t, n) {
                                const s = la(e)
                                    , r = Vl([s[ua.DaysFormat], s[ua.DaysStandalone]], t);
                                return Vl(r, n)
                            }(t, r, s)[e.getDay()];
                        case zl.DayPeriods:
                            const o = e.getHours()
                                , a = e.getMinutes();
                            if (i) {
                                const e = function(e) {
                                    const t = la(e);
                                    return Ml(t),
                                        (t[ua.ExtraData][2] || []).map(e => "string" == typeof e ? Rl(e) : [Rl(e[0]), Rl(e[1])])
                                }(t)
                                    , n = function(e, t, n) {
                                    const s = la(e);
                                    Ml(s);
                                    const r = Vl([s[ua.ExtraData][0], s[ua.ExtraData][1]], t) || [];
                                    return Vl(r, n) || []
                                }(t, r, s)
                                    , i = e.findIndex(e => {
                                        if (Array.isArray(e)) {
                                            const [t,n] = e
                                                , s = o >= t.hours && a >= t.minutes
                                                , r = o < n.hours || o === n.hours && a < n.minutes;
                                            if (t.hours < n.hours) {
                                                if (s && r)
                                                    return !0
                                            } else if (s || r)
                                                return !0
                                        } else if (e.hours === o && e.minutes === a)
                                            return !0;
                                        return !1
                                    }
                                );
                                if (-1 !== i)
                                    return n[i]
                            }
                            return function(e, t, n) {
                                const s = la(e)
                                    , r = Vl([s[ua.DayPeriodsFormat], s[ua.DayPeriodsStandalone]], t);
                                return Vl(r, n)
                            }(t, r, s)[o < 12 ? 0 : 1];
                        case zl.Eras:
                            return function(e, t) {
                                return Vl(la(e)[ua.Eras], t)
                            }(t, s)[e.getFullYear() <= 0 ? 0 : 1];
                        default:
                            throw new Error("unexpected translation type " + n)
                    }
                }(r, i, e, t, n, s)
            }
        }
        function Ql(e) {
            return function(t, n, s) {
                const r = -1 * s
                    , i = Pl(n, Ol.MinusSign)
                    , o = r > 0 ? Math.floor(r / 60) : Math.ceil(r / 60);
                switch (e) {
                    case Bl.Short:
                        return (r >= 0 ? "+" : "") + Ul(o, 2, i) + Ul(Math.abs(r % 60), 2, i);
                    case Bl.ShortGMT:
                        return "GMT" + (r >= 0 ? "+" : "") + Ul(o, 1, i);
                    case Bl.Long:
                        return "GMT" + (r >= 0 ? "+" : "") + Ul(o, 2, i) + ":" + Ul(Math.abs(r % 60), 2, i);
                    case Bl.Extended:
                        return 0 === s ? "Z" : (r >= 0 ? "+" : "") + Ul(o, 2, i) + ":" + Ul(Math.abs(r % 60), 2, i);
                    default:
                        throw new Error(`Unknown zone width "${e}"`)
                }
            }
        }
        function Zl(e, t=!1) {
            return function(n, s) {
                let r;
                if (t) {
                    const e = new Date(n.getFullYear(),n.getMonth(),1).getDay() - 1
                        , t = n.getDate();
                    r = 1 + Math.floor((t + e) / 7)
                } else {
                    const e = function(e) {
                        const t = new Date(e,0,1).getDay();
                        return new Date(e,0,1 + (t <= 4 ? 4 : 11) - t)
                    }(n.getFullYear())
                        , t = (i = n,
                        new Date(i.getFullYear(),i.getMonth(),i.getDate() + (4 - i.getDay()))).getTime() - e.getTime();
                    r = 1 + Math.round(t / 6048e5)
                }
                var i;
                return Ul(r, e, Pl(s, Ol.MinusSign))
            }
        }
        const Kl = {};
        function Yl(e, t) {
            e = e.replace(/:/g, "");
            const n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
            return isNaN(n) ? t : n
        }
        function Jl(e) {
            return e instanceof Date && !isNaN(e.valueOf())
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Xl {
        }
        let ec = ( () => {
                class e extends Xl {
                    constructor(e) {
                        super(),
                            this.locale = e
                    }
                    getPluralCategory(e, t) {
                        switch (function(e) {
                            return la(e)[ua.PluralCase]
                        }(t || this.locale)(e)) {
                            case Tl.Zero:
                                return "zero";
                            case Tl.One:
                                return "one";
                            case Tl.Two:
                                return "two";
                            case Tl.Few:
                                return "few";
                            case Tl.Many:
                                return "many";
                            default:
                                return "other"
                        }
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue($a))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function tc(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
                const e = n.indexOf("=")
                    , [s,r] = -1 == e ? [n, ""] : [n.slice(0, e), n.slice(e + 1)];
                if (s.trim() === t)
                    return decodeURIComponent(r)
            }
            return null
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class nc {
            constructor(e, t, n, s) {
                this.$implicit = e,
                    this.ngForOf = t,
                    this.index = n,
                    this.count = s
            }
            get first() {
                return 0 === this.index
            }
            get last() {
                return this.index === this.count - 1
            }
            get even() {
                return this.index % 2 == 0
            }
            get odd() {
                return !this.even
            }
        }
        let sc = ( () => {
                class e {
                    constructor(e, t, n) {
                        this._viewContainer = e,
                            this._template = t,
                            this._differs = n,
                            this._ngForOf = null,
                            this._ngForOfDirty = !0,
                            this._differ = null
                    }
                    set ngForOf(e) {
                        this._ngForOf = e,
                            this._ngForOfDirty = !0
                    }
                    set ngForTrackBy(e) {
                        is() && null != e && "function" != typeof e && console && console.warn && console.warn(`trackBy must be a function, but received ${JSON.stringify(e)}. See https://angular.io/api/common/NgForOf#change-propagation for more information.`),
                            this._trackByFn = e
                    }
                    get ngForTrackBy() {
                        return this._trackByFn
                    }
                    set ngForTemplate(e) {
                        e && (this._template = e)
                    }
                    ngDoCheck() {
                        if (this._ngForOfDirty) {
                            this._ngForOfDirty = !1;
                            const n = this._ngForOf;
                            if (!this._differ && n)
                                try {
                                    this._differ = this._differs.find(n).create(this.ngForTrackBy)
                                } catch (t) {
                                    throw new Error(`Cannot find a differ supporting object '${n}' of type '${e = n,
                                    e.name || typeof e}'. NgFor only supports binding to Iterables such as Arrays.`)
                                }
                        }
                        var e;
                        if (this._differ) {
                            const e = this._differ.diff(this._ngForOf);
                            e && this._applyChanges(e)
                        }
                    }
                    _applyChanges(e) {
                        const t = [];
                        e.forEachOperation( (e, n, s) => {
                                if (null == e.previousIndex) {
                                    const n = this._viewContainer.createEmbeddedView(this._template, new nc(null,this._ngForOf,-1,-1), null === s ? void 0 : s)
                                        , r = new rc(e,n);
                                    t.push(r)
                                } else if (null == s)
                                    this._viewContainer.remove(null === n ? void 0 : n);
                                else if (null !== n) {
                                    const r = this._viewContainer.get(n);
                                    this._viewContainer.move(r, s);
                                    const i = new rc(e,r);
                                    t.push(i)
                                }
                            }
                        );
                        for (let n = 0; n < t.length; n++)
                            this._perViewChange(t[n].view, t[n].record);
                        for (let n = 0, s = this._viewContainer.length; n < s; n++) {
                            const e = this._viewContainer.get(n);
                            e.context.index = n,
                                e.context.count = s,
                                e.context.ngForOf = this._ngForOf
                        }
                        e.forEachIdentityChange(e => {
                                this._viewContainer.get(e.currentIndex).context.$implicit = e.item
                            }
                        )
                    }
                    _perViewChange(e, t) {
                        e.context.$implicit = t.item
                    }
                    static ngTemplateContextGuard(e, t) {
                        return !0
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(Yo),Ci(Zo),Ci(qo))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["", "ngFor", "", "ngForOf", ""]],
                        inputs: {
                            ngForOf: "ngForOf",
                            ngForTrackBy: "ngForTrackBy",
                            ngForTemplate: "ngForTemplate"
                        }
                    }),
                    e
            }
        )();
        class rc {
            constructor(e, t) {
                this.record = e,
                    this.view = t
            }
        }
        let ic = ( () => {
                class e {
                    constructor(e, t) {
                        this._viewContainer = e,
                            this._context = new oc,
                            this._thenTemplateRef = null,
                            this._elseTemplateRef = null,
                            this._thenViewRef = null,
                            this._elseViewRef = null,
                            this._thenTemplateRef = t
                    }
                    set ngIf(e) {
                        this._context.$implicit = this._context.ngIf = e,
                            this._updateView()
                    }
                    set ngIfThen(e) {
                        ac("ngIfThen", e),
                            this._thenTemplateRef = e,
                            this._thenViewRef = null,
                            this._updateView()
                    }
                    set ngIfElse(e) {
                        ac("ngIfElse", e),
                            this._elseTemplateRef = e,
                            this._elseViewRef = null,
                            this._updateView()
                    }
                    _updateView() {
                        this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(),
                            this._elseViewRef = null,
                        this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(),
                            this._thenViewRef = null,
                        this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                    }
                    static ngTemplateContextGuard(e, t) {
                        return !0
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(Yo),Ci(Zo))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["", "ngIf", ""]],
                        inputs: {
                            ngIf: "ngIf",
                            ngIfThen: "ngIfThen",
                            ngIfElse: "ngIfElse"
                        }
                    }),
                    e
            }
        )();
        class oc {
            constructor() {
                this.$implicit = null,
                    this.ngIf = null
            }
        }
        function ac(e, t) {
            if (t && !t.createEmbeddedView)
                throw new Error(`${e} must be a TemplateRef, but received '${ye(t)}'.`)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        let lc = ( () => {
                class e {
                    constructor(e) {
                        this.locale = e
                    }
                    transform(t, n="mediumDate", s, r) {
                        if (null == t || "" === t || t != t)
                            return null;
                        try {
                            return function(e, t, n, s) {
                                let r = function(e) {
                                    if (Jl(e))
                                        return e;
                                    if ("number" == typeof e && !isNaN(e))
                                        return new Date(e);
                                    if ("string" == typeof e) {
                                        e = e.trim();
                                        const t = parseFloat(e);
                                        if (!isNaN(e - t))
                                            return new Date(t);
                                        if (/^(\d{4}-\d{1,2}-\d{1,2})$/.test(e)) {
                                            const [t,n,s] = e.split("-").map(e => +e);
                                            return new Date(t,n - 1,s)
                                        }
                                        let n;
                                        if (n = e.match(jl))
                                            return function(e) {
                                                const t = new Date(0);
                                                let n = 0
                                                    , s = 0;
                                                const r = e[8] ? t.setUTCFullYear : t.setFullYear
                                                    , i = e[8] ? t.setUTCHours : t.setHours;
                                                e[9] && (n = Number(e[9] + e[10]),
                                                    s = Number(e[9] + e[11])),
                                                    r.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
                                                const o = Number(e[4] || 0) - n
                                                    , a = Number(e[5] || 0) - s
                                                    , l = Number(e[6] || 0)
                                                    , c = Math.round(1e3 * parseFloat("0." + (e[7] || 0)));
                                                return i.call(t, o, a, l, c),
                                                    t
                                            }(n)
                                    }
                                    const t = new Date(e);
                                    if (!Jl(t))
                                        throw new Error(`Unable to convert "${e}" into a date`);
                                    return t
                                }(e);
                                t = function e(t, n) {
                                    const s = function(e) {
                                        return la(e)[ua.LocaleId]
                                    }(t);
                                    if (Ll[s] = Ll[s] || {},
                                        Ll[s][n])
                                        return Ll[s][n];
                                    let r = "";
                                    switch (n) {
                                        case "shortDate":
                                            r = Nl(t, Al.Short);
                                            break;
                                        case "mediumDate":
                                            r = Nl(t, Al.Medium);
                                            break;
                                        case "longDate":
                                            r = Nl(t, Al.Long);
                                            break;
                                        case "fullDate":
                                            r = Nl(t, Al.Full);
                                            break;
                                        case "shortTime":
                                            r = Dl(t, Al.Short);
                                            break;
                                        case "mediumTime":
                                            r = Dl(t, Al.Medium);
                                            break;
                                        case "longTime":
                                            r = Dl(t, Al.Long);
                                            break;
                                        case "fullTime":
                                            r = Dl(t, Al.Full);
                                            break;
                                        case "short":
                                            const n = e(t, "shortTime")
                                                , s = e(t, "shortDate");
                                            r = ql(Fl(t, Al.Short), [n, s]);
                                            break;
                                        case "medium":
                                            const i = e(t, "mediumTime")
                                                , o = e(t, "mediumDate");
                                            r = ql(Fl(t, Al.Medium), [i, o]);
                                            break;
                                        case "long":
                                            const a = e(t, "longTime")
                                                , l = e(t, "longDate");
                                            r = ql(Fl(t, Al.Long), [a, l]);
                                            break;
                                        case "full":
                                            const c = e(t, "fullTime")
                                                , u = e(t, "fullDate");
                                            r = ql(Fl(t, Al.Full), [c, u])
                                    }
                                    return r && (Ll[s][n] = r),
                                        r
                                }(n, t) || t;
                                let i, o = [];
                                for (; t; ) {
                                    if (i = Hl.exec(t),
                                        !i) {
                                        o.push(t);
                                        break
                                    }
                                    {
                                        o = o.concat(i.slice(1));
                                        const e = o.pop();
                                        if (!e)
                                            break;
                                        t = e
                                    }
                                }
                                let a = r.getTimezoneOffset();
                                s && (a = Yl(s, a),
                                    r = function(e, t, n) {
                                        const s = e.getTimezoneOffset();
                                        return function(e, t) {
                                            return (e = new Date(e.getTime())).setMinutes(e.getMinutes() + t),
                                                e
                                        }(e, -1 * (Yl(t, s) - s))
                                    }(r, s));
                                let l = "";
                                return o.forEach(e => {
                                        const t = function(e) {
                                            if (Kl[e])
                                                return Kl[e];
                                            let t;
                                            switch (e) {
                                                case "G":
                                                case "GG":
                                                case "GGG":
                                                    t = Wl(zl.Eras, Il.Abbreviated);
                                                    break;
                                                case "GGGG":
                                                    t = Wl(zl.Eras, Il.Wide);
                                                    break;
                                                case "GGGGG":
                                                    t = Wl(zl.Eras, Il.Narrow);
                                                    break;
                                                case "y":
                                                    t = Gl($l.FullYear, 1, 0, !1, !0);
                                                    break;
                                                case "yy":
                                                    t = Gl($l.FullYear, 2, 0, !0, !0);
                                                    break;
                                                case "yyy":
                                                    t = Gl($l.FullYear, 3, 0, !1, !0);
                                                    break;
                                                case "yyyy":
                                                    t = Gl($l.FullYear, 4, 0, !1, !0);
                                                    break;
                                                case "M":
                                                case "L":
                                                    t = Gl($l.Month, 1, 1);
                                                    break;
                                                case "MM":
                                                case "LL":
                                                    t = Gl($l.Month, 2, 1);
                                                    break;
                                                case "MMM":
                                                    t = Wl(zl.Months, Il.Abbreviated);
                                                    break;
                                                case "MMMM":
                                                    t = Wl(zl.Months, Il.Wide);
                                                    break;
                                                case "MMMMM":
                                                    t = Wl(zl.Months, Il.Narrow);
                                                    break;
                                                case "LLL":
                                                    t = Wl(zl.Months, Il.Abbreviated, kl.Standalone);
                                                    break;
                                                case "LLLL":
                                                    t = Wl(zl.Months, Il.Wide, kl.Standalone);
                                                    break;
                                                case "LLLLL":
                                                    t = Wl(zl.Months, Il.Narrow, kl.Standalone);
                                                    break;
                                                case "w":
                                                    t = Zl(1);
                                                    break;
                                                case "ww":
                                                    t = Zl(2);
                                                    break;
                                                case "W":
                                                    t = Zl(1, !0);
                                                    break;
                                                case "d":
                                                    t = Gl($l.Date, 1);
                                                    break;
                                                case "dd":
                                                    t = Gl($l.Date, 2);
                                                    break;
                                                case "E":
                                                case "EE":
                                                case "EEE":
                                                    t = Wl(zl.Days, Il.Abbreviated);
                                                    break;
                                                case "EEEE":
                                                    t = Wl(zl.Days, Il.Wide);
                                                    break;
                                                case "EEEEE":
                                                    t = Wl(zl.Days, Il.Narrow);
                                                    break;
                                                case "EEEEEE":
                                                    t = Wl(zl.Days, Il.Short);
                                                    break;
                                                case "a":
                                                case "aa":
                                                case "aaa":
                                                    t = Wl(zl.DayPeriods, Il.Abbreviated);
                                                    break;
                                                case "aaaa":
                                                    t = Wl(zl.DayPeriods, Il.Wide);
                                                    break;
                                                case "aaaaa":
                                                    t = Wl(zl.DayPeriods, Il.Narrow);
                                                    break;
                                                case "b":
                                                case "bb":
                                                case "bbb":
                                                    t = Wl(zl.DayPeriods, Il.Abbreviated, kl.Standalone, !0);
                                                    break;
                                                case "bbbb":
                                                    t = Wl(zl.DayPeriods, Il.Wide, kl.Standalone, !0);
                                                    break;
                                                case "bbbbb":
                                                    t = Wl(zl.DayPeriods, Il.Narrow, kl.Standalone, !0);
                                                    break;
                                                case "B":
                                                case "BB":
                                                case "BBB":
                                                    t = Wl(zl.DayPeriods, Il.Abbreviated, kl.Format, !0);
                                                    break;
                                                case "BBBB":
                                                    t = Wl(zl.DayPeriods, Il.Wide, kl.Format, !0);
                                                    break;
                                                case "BBBBB":
                                                    t = Wl(zl.DayPeriods, Il.Narrow, kl.Format, !0);
                                                    break;
                                                case "h":
                                                    t = Gl($l.Hours, 1, -12);
                                                    break;
                                                case "hh":
                                                    t = Gl($l.Hours, 2, -12);
                                                    break;
                                                case "H":
                                                    t = Gl($l.Hours, 1);
                                                    break;
                                                case "HH":
                                                    t = Gl($l.Hours, 2);
                                                    break;
                                                case "m":
                                                    t = Gl($l.Minutes, 1);
                                                    break;
                                                case "mm":
                                                    t = Gl($l.Minutes, 2);
                                                    break;
                                                case "s":
                                                    t = Gl($l.Seconds, 1);
                                                    break;
                                                case "ss":
                                                    t = Gl($l.Seconds, 2);
                                                    break;
                                                case "S":
                                                    t = Gl($l.FractionalSeconds, 1);
                                                    break;
                                                case "SS":
                                                    t = Gl($l.FractionalSeconds, 2);
                                                    break;
                                                case "SSS":
                                                    t = Gl($l.FractionalSeconds, 3);
                                                    break;
                                                case "Z":
                                                case "ZZ":
                                                case "ZZZ":
                                                    t = Ql(Bl.Short);
                                                    break;
                                                case "ZZZZZ":
                                                    t = Ql(Bl.Extended);
                                                    break;
                                                case "O":
                                                case "OO":
                                                case "OOO":
                                                case "z":
                                                case "zz":
                                                case "zzz":
                                                    t = Ql(Bl.ShortGMT);
                                                    break;
                                                case "OOOO":
                                                case "ZZZZ":
                                                case "zzzz":
                                                    t = Ql(Bl.Long);
                                                    break;
                                                default:
                                                    return null
                                            }
                                            return Kl[e] = t,
                                                t
                                        }(e);
                                        l += t ? t(r, n, a) : "''" === e ? "'" : e.replace(/(^'|'$)/g, "").replace(/''/g, "'")
                                    }
                                ),
                                    l
                            }(t, n, r || this.locale, s)
                        } catch (i) {
                            /**
                             * @license
                             * Copyright Google LLC All Rights Reserved.
                             *
                             * Use of this source code is governed by an MIT-style license that can be
                             * found in the LICENSE file at https://angular.io/license
                             */
                            throw function(e, t) {
                                return Error(`InvalidPipeArgument: '${t}' for pipe '${ye(e)}'`)
                            }/**
                             * @license
                             * Copyright Google LLC All Rights Reserved.
                             *
                             * Use of this source code is governed by an MIT-style license that can be
                             * found in the LICENSE file at https://angular.io/license
                             */
                                (e, i.message)
                        }
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci($a))
                }
                    ,
                    e.\u0275pipe = ft({
                        name: "date",
                        type: e,
                        pure: !0
                    }),
                    e
            }
        )()
            , cc = ( () => {
                class e {
                }
                return e.\u0275mod = ht({
                    type: e
                }),
                    e.\u0275inj = le({
                        factory: function(t) {
                            return new (t || e)
                        },
                        providers: [{
                            provide: Xl,
                            useClass: ec
                        }]
                    }),
                    e
            }
        )();
        class uc extends /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
            /**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
            /**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
            /**
             * @license Angular v10.0.3
             * (c) 2010-2020 Google LLC. https://angular.io/
             * License: MIT
             */
            /**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
            class extends class {
            }
            {
                constructor() {
                    super()
                }
                supportsDOMEvents() {
                    return !0
                }
            }
            /**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
        {
            static makeCurrent() {
                var e;
                e = new uc,
                Cl || (Cl = e)
            }
            getProperty(e, t) {
                return e[t]
            }
            log(e) {
                window.console && window.console.log && window.console.log(e)
            }
            logGroup(e) {
                window.console && window.console.group && window.console.group(e)
            }
            logGroupEnd() {
                window.console && window.console.groupEnd && window.console.groupEnd()
            }
            onAndCancel(e, t, n) {
                return e.addEventListener(t, n, !1),
                    () => {
                        e.removeEventListener(t, n, !1)
                    }
            }
            dispatchEvent(e, t) {
                e.dispatchEvent(t)
            }
            remove(e) {
                return e.parentNode && e.parentNode.removeChild(e),
                    e
            }
            getValue(e) {
                return e.value
            }
            createElement(e, t) {
                return (t = t || this.getDefaultDocument()).createElement(e)
            }
            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument() {
                return document
            }
            isElementNode(e) {
                return e.nodeType === Node.ELEMENT_NODE
            }
            isShadowRoot(e) {
                return e instanceof DocumentFragment
            }
            getGlobalEventTarget(e, t) {
                return "window" === t ? window : "document" === t ? e : "body" === t ? e.body : null
            }
            getHistory() {
                return window.history
            }
            getLocation() {
                return window.location
            }
            getBaseHref(e) {
                const t = dc || (dc = document.querySelector("base"),
                    dc) ? dc.getAttribute("href") : null;
                return null == t ? null : (n = t,
                hc || (hc = document.createElement("a")),
                    hc.setAttribute("href", n),
                    "/" === hc.pathname.charAt(0) ? hc.pathname : "/" + hc.pathname);
                var n;
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
            resetBaseElement() {
                dc = null
            }
            getUserAgent() {
                return window.navigator.userAgent
            }
            performanceNow() {
                return window.performance && window.performance.now ? window.performance.now() : (new Date).getTime()
            }
            supportsCookies() {
                return !0
            }
            getCookie(e) {
                return tc(document.cookie, e)
            }
        }
        let hc, dc = null;
        const pc = new Me("TRANSITION_ID")
            , fc = [{
            provide: Fa,
            useFactory: function(e, t, n) {
                return () => {
                    n.get(Pa).donePromise.then( () => {
                            const n = Sl();
                            Array.prototype.slice.apply(t.querySelectorAll("style[ng-transition]")).filter(t => t.getAttribute("ng-transition") === e).forEach(e => n.remove(e))
                        }
                    )
                }
            },
            deps: [pc, xl, hi],
            multi: !0
        }];
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class mc {
            static init() {
                var e;
                e = new mc,
                    dl = e
            }
            addToWindow(e) {
                ke.getAngularTestability = (t, n=!0) => {
                    const s = e.findTestabilityInTree(t, n);
                    if (null == s)
                        throw new Error("Could not find testability for element.");
                    return s
                }
                    ,
                    ke.getAllAngularTestabilities = () => e.getAllTestabilities(),
                    ke.getAllAngularRootElements = () => e.getAllRootElements(),
                ke.frameworkStabilizers || (ke.frameworkStabilizers = []),
                    ke.frameworkStabilizers.push(e => {
                            const t = ke.getAllAngularTestabilities();
                            let n = t.length
                                , s = !1;
                            const r = function(t) {
                                s = s || t,
                                    n--,
                                0 == n && e(s)
                            };
                            t.forEach((function(e) {
                                    e.whenStable(r)
                                }
                            ))
                        }
                    )
            }
            findTestabilityInTree(e, t, n) {
                if (null == t)
                    return null;
                const s = e.getTestability(t);
                return null != s ? s : n ? Sl().isShadowRoot(t) ? this.findTestabilityInTree(e, t.host, !0) : this.findTestabilityInTree(e, t.parentElement, !0) : null
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const gc = new Me("EventManagerPlugins");
        let yc = ( () => {
                class e {
                    constructor(e, t) {
                        this._zone = t,
                            this._eventNameToPlugin = new Map,
                            e.forEach(e => e.manager = this),
                            this._plugins = e.slice().reverse()
                    }
                    addEventListener(e, t, n) {
                        return this._findPluginFor(t).addEventListener(e, t, n)
                    }
                    addGlobalEventListener(e, t, n) {
                        return this._findPluginFor(t).addGlobalEventListener(e, t, n)
                    }
                    getZone() {
                        return this._zone
                    }
                    _findPluginFor(e) {
                        const t = this._eventNameToPlugin.get(e);
                        if (t)
                            return t;
                        const n = this._plugins;
                        for (let s = 0; s < n.length; s++) {
                            const t = n[s];
                            if (t.supports(e))
                                return this._eventNameToPlugin.set(e, t),
                                    t
                        }
                        throw new Error("No event manager plugin found for event " + e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(gc),Ue(el))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        class _c {
            constructor(e) {
                this._doc = e
            }
            addGlobalEventListener(e, t, n) {
                const s = Sl().getGlobalEventTarget(this._doc, e);
                if (!s)
                    throw new Error(`Unsupported event target ${s} for event ${t}`);
                return this.addEventListener(s, t, n)
            }
        }
        let bc = ( () => {
                class e {
                    constructor() {
                        this._stylesSet = new Set
                    }
                    addStyles(e) {
                        const t = new Set;
                        e.forEach(e => {
                                this._stylesSet.has(e) || (this._stylesSet.add(e),
                                    t.add(e))
                            }
                        ),
                            this.onStylesAdded(t)
                    }
                    onStylesAdded(e) {}
                    getAllStyles() {
                        return Array.from(this._stylesSet)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )()
            , vc = ( () => {
                class e extends bc {
                    constructor(e) {
                        super(),
                            this._doc = e,
                            this._hostNodes = new Set,
                            this._styleNodes = new Set,
                            this._hostNodes.add(e.head)
                    }
                    _addStylesToHost(e, t) {
                        e.forEach(e => {
                                const n = this._doc.createElement("style");
                                n.textContent = e,
                                    this._styleNodes.add(t.appendChild(n))
                            }
                        )
                    }
                    addHost(e) {
                        this._addStylesToHost(this._stylesSet, e),
                            this._hostNodes.add(e)
                    }
                    removeHost(e) {
                        this._hostNodes.delete(e)
                    }
                    onStylesAdded(e) {
                        this._hostNodes.forEach(t => this._addStylesToHost(e, t))
                    }
                    ngOnDestroy() {
                        this._styleNodes.forEach(e => Sl().remove(e))
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(xl))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const wc = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        }
            , Ec = /%COMP%/g;
        function Cc(e, t, n) {
            for (let s = 0; s < t.length; s++) {
                let r = t[s];
                Array.isArray(r) ? Cc(e, r, n) : (r = r.replace(Ec, e),
                    n.push(r))
            }
            return n
        }
        function Sc(e) {
            return t => {
                if ("__ngUnwrap__" === t)
                    return e;
                !1 === e(t) && (t.preventDefault(),
                    t.returnValue = !1)
            }
        }
        let xc = ( () => {
                class e {
                    constructor(e, t, n) {
                        this.eventManager = e,
                            this.sharedStylesHost = t,
                            this.appId = n,
                            this.rendererByCompId = new Map,
                            this.defaultRenderer = new Tc(e)
                    }
                    createRenderer(e, t) {
                        if (!e || !t)
                            return this.defaultRenderer;
                        switch (t.encapsulation) {
                            case st.Emulated:
                            {
                                let n = this.rendererByCompId.get(t.id);
                                return n || (n = new kc(this.eventManager,this.sharedStylesHost,t,this.appId),
                                    this.rendererByCompId.set(t.id, n)),
                                    n.applyToHost(e),
                                    n
                            }
                            case st.Native:
                            case st.ShadowDom:
                                return new Ic(this.eventManager,this.sharedStylesHost,e,t);
                            default:
                                if (!this.rendererByCompId.has(t.id)) {
                                    const e = Cc(t.id, t.styles, []);
                                    this.sharedStylesHost.addStyles(e),
                                        this.rendererByCompId.set(t.id, this.defaultRenderer)
                                }
                                return this.defaultRenderer
                        }
                    }
                    begin() {}
                    end() {}
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(yc),Ue(vc),Ue(Ma))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        class Tc {
            constructor(e) {
                this.eventManager = e,
                    this.data = Object.create(null)
            }
            destroy() {}
            createElement(e, t) {
                return t ? document.createElementNS(wc[t] || t, e) : document.createElement(e)
            }
            createComment(e) {
                return document.createComment(e)
            }
            createText(e) {
                return document.createTextNode(e)
            }
            appendChild(e, t) {
                e.appendChild(t)
            }
            insertBefore(e, t, n) {
                e && e.insertBefore(t, n)
            }
            removeChild(e, t) {
                e && e.removeChild(t)
            }
            selectRootElement(e, t) {
                let n = "string" == typeof e ? document.querySelector(e) : e;
                if (!n)
                    throw new Error(`The selector "${e}" did not match any elements`);
                return t || (n.textContent = ""),
                    n
            }
            parentNode(e) {
                return e.parentNode
            }
            nextSibling(e) {
                return e.nextSibling
            }
            setAttribute(e, t, n, s) {
                if (s) {
                    t = s + ":" + t;
                    const r = wc[s];
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n)
                } else
                    e.setAttribute(t, n)
            }
            removeAttribute(e, t, n) {
                if (n) {
                    const s = wc[n];
                    s ? e.removeAttributeNS(s, t) : e.removeAttribute(`${n}:${t}`)
                } else
                    e.removeAttribute(t)
            }
            addClass(e, t) {
                e.classList.add(t)
            }
            removeClass(e, t) {
                e.classList.remove(t)
            }
            setStyle(e, t, n, s) {
                s & Io.DashCase ? e.style.setProperty(t, n, s & Io.Important ? "important" : "") : e.style[t] = n
            }
            removeStyle(e, t, n) {
                n & Io.DashCase ? e.style.removeProperty(t) : e.style[t] = ""
            }
            setProperty(e, t, n) {
                e[t] = n
            }
            setValue(e, t) {
                e.nodeValue = t
            }
            listen(e, t, n) {
                return "string" == typeof e ? this.eventManager.addGlobalEventListener(e, t, Sc(n)) : this.eventManager.addEventListener(e, t, Sc(n))
            }
        }
        class kc extends Tc {
            constructor(e, t, n, s) {
                super(e),
                    this.component = n;
                const r = Cc(s + "-" + n.id, n.styles, []);
                t.addStyles(r),
                    this.contentAttr = "_ngcontent-%COMP%".replace(Ec, s + "-" + n.id),
                    this.hostAttr = function(e) {
                        return "_nghost-%COMP%".replace(Ec, e)
                    }(s + "-" + n.id)
            }
            applyToHost(e) {
                super.setAttribute(e, this.hostAttr, "")
            }
            createElement(e, t) {
                const n = super.createElement(e, t);
                return super.setAttribute(n, this.contentAttr, ""),
                    n
            }
        }
        class Ic extends Tc {
            constructor(e, t, n, s) {
                super(e),
                    this.sharedStylesHost = t,
                    this.hostEl = n,
                    this.component = s,
                    this.shadowRoot = s.encapsulation === st.ShadowDom ? n.attachShadow({
                        mode: "open"
                    }) : n.createShadowRoot(),
                    this.sharedStylesHost.addHost(this.shadowRoot);
                const r = Cc(s.id, s.styles, []);
                for (let i = 0; i < r.length; i++) {
                    const e = document.createElement("style");
                    e.textContent = r[i],
                        this.shadowRoot.appendChild(e)
                }
            }
            nodeOrShadowRoot(e) {
                return e === this.hostEl ? this.shadowRoot : e
            }
            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
            appendChild(e, t) {
                return super.appendChild(this.nodeOrShadowRoot(e), t)
            }
            insertBefore(e, t, n) {
                return super.insertBefore(this.nodeOrShadowRoot(e), t, n)
            }
            removeChild(e, t) {
                return super.removeChild(this.nodeOrShadowRoot(e), t)
            }
            parentNode(e) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))
            }
        }
        let Ac = ( () => {
                class e extends _c {
                    constructor(e) {
                        super(e)
                    }
                    supports(e) {
                        return !0
                    }
                    addEventListener(e, t, n) {
                        return e.addEventListener(t, n, !1),
                            () => this.removeEventListener(e, t, n)
                    }
                    removeEventListener(e, t, n) {
                        return e.removeEventListener(t, n)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(xl))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Oc = ["alt", "control", "meta", "shift"]
            , Nc = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }
            , Dc = {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
            E: "5",
            F: "6",
            G: "7",
            H: "8",
            I: "9",
            J: "*",
            K: "+",
            M: "-",
            N: ".",
            O: "/",
            "`": "0",
            "\x90": "NumLock"
        }
            , Fc = {
            alt: e => e.altKey,
            control: e => e.ctrlKey,
            meta: e => e.metaKey,
            shift: e => e.shiftKey
        };
        let Pc = ( () => {
                class e extends _c {
                    constructor(e) {
                        super(e)
                    }
                    supports(t) {
                        return null != e.parseEventName(t)
                    }
                    addEventListener(t, n, s) {
                        const r = e.parseEventName(n)
                            , i = e.eventCallback(r.fullKey, s, this.manager.getZone());
                        return this.manager.getZone().runOutsideAngular( () => Sl().onAndCancel(t, r.domEventName, i))
                    }
                    static parseEventName(t) {
                        const n = t.toLowerCase().split(".")
                            , s = n.shift();
                        if (0 === n.length || "keydown" !== s && "keyup" !== s)
                            return null;
                        const r = e._normalizeKey(n.pop());
                        let i = "";
                        if (Oc.forEach(e => {
                                const t = n.indexOf(e);
                                t > -1 && (n.splice(t, 1),
                                    i += e + ".")
                            }
                        ),
                            i += r,
                        0 != n.length || 0 === r.length)
                            return null;
                        const o = {};
                        return o.domEventName = s,
                            o.fullKey = i,
                            o
                    }
                    static getEventFullKey(e) {
                        let t = ""
                            , n = function(e) {
                            let t = e.key;
                            if (null == t) {
                                if (t = e.keyIdentifier,
                                null == t)
                                    return "Unidentified";
                                t.startsWith("U+") && (t = String.fromCharCode(parseInt(t.substring(2), 16)),
                                3 === e.location && Dc.hasOwnProperty(t) && (t = Dc[t]))
                            }
                            return Nc[t] || t
                        }(e);
                        return n = n.toLowerCase(),
                            " " === n ? n = "space" : "." === n && (n = "dot"),
                            Oc.forEach(s => {
                                    s != n && (0,
                                        Fc[s])(e) && (t += s + ".")
                                }
                            ),
                            t += n,
                            t
                    }
                    static eventCallback(t, n, s) {
                        return r => {
                            e.getEventFullKey(r) === t && s.runGuarded( () => n(r))
                        }
                    }
                    static _normalizeKey(e) {
                        switch (e) {
                            case "esc":
                                return "escape";
                            default:
                                return e
                        }
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(xl))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        const Mc = fl(vl, "browser", [{
            provide: La,
            useValue: "browser"
        }, {
            provide: ja,
            useValue: /**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
            function() {
                uc.makeCurrent(),
                    mc.init()
            },
            multi: !0
        }, {
            provide: xl,
            useFactory: function() {
                return function(e) {
                    xt = e
                }(document),
                    document
            },
            deps: []
        }])
            , Vc = [[], {
            provide: Yr,
            useValue: "root"
        }, {
            provide: ts,
            useFactory: function() {
                return new ts
            },
            deps: []
        }, {
            provide: gc,
            useClass: Ac,
            multi: !0,
            deps: [xl, el, La]
        }, {
            provide: gc,
            useClass: Pc,
            multi: !0,
            deps: [xl]
        }, [], {
            provide: xc,
            useClass: xc,
            deps: [yc, vc, Ma]
        }, {
            provide: ko,
            useExisting: xc
        }, {
            provide: bc,
            useExisting: vc
        }, {
            provide: vc,
            useClass: vc,
            deps: [xl]
        }, {
            provide: ll,
            useClass: ll,
            deps: [el]
        }, {
            provide: yc,
            useClass: yc,
            deps: [gc, el]
        }, []];
        let Rc = ( () => {
                class e {
                    constructor(e) {
                        if (e)
                            throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
                    }
                    static withServerTransition(t) {
                        return {
                            ngModule: e,
                            providers: [{
                                provide: Ma,
                                useValue: t.appId
                            }, {
                                provide: pc,
                                useExisting: Ma
                            }, fc]
                        }
                    }
                }
                return e.\u0275mod = ht({
                    type: e
                }),
                    e.\u0275inj = le({
                        factory: function(t) {
                            return new (t || e)(Ue(e, 12))
                        },
                        providers: Vc,
                        imports: [cc, El]
                    }),
                    e
            }
        )();
        "undefined" != typeof window && window;
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license Angular v10.0.3
         * (c) 2010-2020 Google LLC. https://angular.io/
         * License: MIT
         */
        class jc {
        }
        function Lc(e, t) {
            return {
                type: 7,
                name: e,
                definitions: t,
                options: {}
            }
        }
        function Hc(e, t=null) {
            return {
                type: 4,
                styles: t,
                timings: e
            }
        }
        function Bc(e, t=null) {
            return {
                type: 2,
                steps: e,
                options: t
            }
        }
        function $c(e) {
            return {
                type: 6,
                styles: e,
                offset: null
            }
        }
        function zc(e, t, n=null) {
            return {
                type: 1,
                expr: e,
                animation: t,
                options: n
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function qc(e) {
            Promise.resolve(null).then(e)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Uc {
            constructor(e=0, t=0) {
                this._onDoneFns = [],
                    this._onStartFns = [],
                    this._onDestroyFns = [],
                    this._started = !1,
                    this._destroyed = !1,
                    this._finished = !1,
                    this.parentPlayer = null,
                    this.totalTime = e + t
            }
            _onFinish() {
                this._finished || (this._finished = !0,
                    this._onDoneFns.forEach(e => e()),
                    this._onDoneFns = [])
            }
            onStart(e) {
                this._onStartFns.push(e)
            }
            onDone(e) {
                this._onDoneFns.push(e)
            }
            onDestroy(e) {
                this._onDestroyFns.push(e)
            }
            hasStarted() {
                return this._started
            }
            init() {}
            play() {
                this.hasStarted() || (this._onStart(),
                    this.triggerMicrotask()),
                    this._started = !0
            }
            triggerMicrotask() {
                qc( () => this._onFinish())
            }
            _onStart() {
                this._onStartFns.forEach(e => e()),
                    this._onStartFns = []
            }
            pause() {}
            restart() {}
            finish() {
                this._onFinish()
            }
            destroy() {
                this._destroyed || (this._destroyed = !0,
                this.hasStarted() || this._onStart(),
                    this.finish(),
                    this._onDestroyFns.forEach(e => e()),
                    this._onDestroyFns = [])
            }
            reset() {}
            setPosition(e) {}
            getPosition() {
                return 0
            }
            triggerCallback(e) {
                const t = "start" == e ? this._onStartFns : this._onDoneFns;
                t.forEach(e => e()),
                    t.length = 0
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
        }
        class Gc {
            constructor(e) {
                this._onDoneFns = [],
                    this._onStartFns = [],
                    this._finished = !1,
                    this._started = !1,
                    this._destroyed = !1,
                    this._onDestroyFns = [],
                    this.parentPlayer = null,
                    this.totalTime = 0,
                    this.players = e;
                let t = 0
                    , n = 0
                    , s = 0;
                const r = this.players.length;
                0 == r ? qc( () => this._onFinish()) : this.players.forEach(e => {
                        e.onDone( () => {
                                ++t == r && this._onFinish()
                            }
                        ),
                            e.onDestroy( () => {
                                    ++n == r && this._onDestroy()
                                }
                            ),
                            e.onStart( () => {
                                    ++s == r && this._onStart()
                                }
                            )
                    }
                ),
                    this.totalTime = this.players.reduce( (e, t) => Math.max(e, t.totalTime), 0)
            }
            _onFinish() {
                this._finished || (this._finished = !0,
                    this._onDoneFns.forEach(e => e()),
                    this._onDoneFns = [])
            }
            init() {
                this.players.forEach(e => e.init())
            }
            onStart(e) {
                this._onStartFns.push(e)
            }
            _onStart() {
                this.hasStarted() || (this._started = !0,
                    this._onStartFns.forEach(e => e()),
                    this._onStartFns = [])
            }
            onDone(e) {
                this._onDoneFns.push(e)
            }
            onDestroy(e) {
                this._onDestroyFns.push(e)
            }
            hasStarted() {
                return this._started
            }
            play() {
                this.parentPlayer || this.init(),
                    this._onStart(),
                    this.players.forEach(e => e.play())
            }
            pause() {
                this.players.forEach(e => e.pause())
            }
            restart() {
                this.players.forEach(e => e.restart())
            }
            finish() {
                this._onFinish(),
                    this.players.forEach(e => e.finish())
            }
            destroy() {
                this._onDestroy()
            }
            _onDestroy() {
                this._destroyed || (this._destroyed = !0,
                    this._onFinish(),
                    this.players.forEach(e => e.destroy()),
                    this._onDestroyFns.forEach(e => e()),
                    this._onDestroyFns = [])
            }
            reset() {
                this.players.forEach(e => e.reset()),
                    this._destroyed = !1,
                    this._finished = !1,
                    this._started = !1
            }
            setPosition(e) {
                const t = e * this.totalTime;
                this.players.forEach(e => {
                        const n = e.totalTime ? Math.min(1, t / e.totalTime) : 1;
                        e.setPosition(n)
                    }
                )
            }
            getPosition() {
                let e = 0;
                return this.players.forEach(t => {
                        const n = t.getPosition();
                        e = Math.min(n, e)
                    }
                ),
                    e
            }
            beforeDestroy() {
                this.players.forEach(e => {
                        e.beforeDestroy && e.beforeDestroy()
                    }
                )
            }
            triggerCallback(e) {
                const t = "start" == e ? this._onStartFns : this._onDoneFns;
                t.forEach(e => e()),
                    t.length = 0
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
        }
        function Wc() {
            return "undefined" != typeof process && "[object process]" === {}.toString.call(process)
        }
        function Qc(e) {
            switch (e.length) {
                case 0:
                    return new Uc;
                case 1:
                    return e[0];
                default:
                    return new Gc(e)
            }
        }
        function Zc(e, t, n, s, r={}, i={}) {
            const o = []
                , a = [];
            let l = -1
                , c = null;
            if (s.forEach(e => {
                    const n = e.offset
                        , s = n == l
                        , u = s && c || {};
                    Object.keys(e).forEach(n => {
                            let s = n
                                , a = e[n];
                            if ("offset" !== n)
                                switch (s = t.normalizePropertyName(s, o),
                                    a) {
                                    case "!":
                                        a = r[n];
                                        break;
                                    case "*":
                                        a = i[n];
                                        break;
                                    default:
                                        a = t.normalizeStyleValue(n, s, a, o)
                                }
                            u[s] = a
                        }
                    ),
                    s || a.push(u),
                        c = u,
                        l = n
                }
            ),
                o.length) {
                const e = "\n - ";
                throw new Error(`Unable to animate due to the following errors:${e}${o.join(e)}`)
            }
            return a
        }
        function Kc(e, t, n, s) {
            switch (t) {
                case "start":
                    e.onStart( () => s(n && Yc(n, "start", e)));
                    break;
                case "done":
                    e.onDone( () => s(n && Yc(n, "done", e)));
                    break;
                case "destroy":
                    e.onDestroy( () => s(n && Yc(n, "destroy", e)))
            }
        }
        function Yc(e, t, n) {
            const s = n.totalTime
                , r = Jc(e.element, e.triggerName, e.fromState, e.toState, t || e.phaseName, null == s ? e.totalTime : s, !!n.disabled)
                , i = e._data;
            return null != i && (r._data = i),
                r
        }
        function Jc(e, t, n, s, r="", i=0, o) {
            return {
                element: e,
                triggerName: t,
                fromState: n,
                toState: s,
                phaseName: r,
                totalTime: i,
                disabled: !!o
            }
        }
        function Xc(e, t, n) {
            let s;
            return e instanceof Map ? (s = e.get(t),
            s || e.set(t, s = n)) : (s = e[t],
            s || (s = e[t] = n)),
                s
        }
        function eu(e) {
            const t = e.indexOf(":");
            return [e.substring(1, t), e.substr(t + 1)]
        }
        let tu = (e, t) => !1
            , nu = (e, t) => !1
            , su = (e, t, n) => [];
        const ru = Wc();
        (ru || "undefined" != typeof Element) && (tu = (e, t) => e.contains(t),
                nu = ( () => {
                        if (ru || Element.prototype.matches)
                            return (e, t) => e.matches(t);
                        {
                            const e = Element.prototype
                                , t = e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector;
                            return t ? (e, n) => t.apply(e, [n]) : nu
                        }
                    }
                )(),
                su = (e, t, n) => {
                    let s = [];
                    if (n)
                        s.push(...e.querySelectorAll(t));
                    else {
                        const n = e.querySelector(t);
                        n && s.push(n)
                    }
                    return s
                }
        );
        let iu = null
            , ou = !1;
        function au(e) {
            iu || (iu = ("undefined" != typeof document ? document.body : null) || {},
                ou = !!iu.style && "WebkitAppearance"in iu.style);
            let t = !0;
            return iu.style && !function(e) {
                return "ebkit" == e.substring(1, 6)
            }(e) && (t = e in iu.style,
            !t && ou) && (t = "Webkit" + e.charAt(0).toUpperCase() + e.substr(1)in iu.style),
                t
        }
        const lu = nu
            , cu = tu
            , uu = su;
        function hu(e) {
            const t = {};
            return Object.keys(e).forEach(n => {
                    const s = n.replace(/([a-z])([A-Z])/g, "$1-$2");
                    t[s] = e[n]
                }
            ),
                t
        }
        let du = ( () => {
                class e {
                    validateStyleProperty(e) {
                        return au(e)
                    }
                    matchesElement(e, t) {
                        return lu(e, t)
                    }
                    containsElement(e, t) {
                        return cu(e, t)
                    }
                    query(e, t, n) {
                        return uu(e, t, n)
                    }
                    computeStyle(e, t, n) {
                        return n || ""
                    }
                    animate(e, t, n, s, r, i=[], o) {
                        return new Uc(n,s)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )()
            , pu = ( () => {
                class e {
                }
                return e.NOOP = new du,
                    e
            }
        )();
        function fu(e) {
            if ("number" == typeof e)
                return e;
            const t = e.match(/^(-?[\.\d]+)(m?s)/);
            return !t || t.length < 2 ? 0 : mu(parseFloat(t[1]), t[2])
        }
        function mu(e, t) {
            switch (t) {
                case "s":
                    return 1e3 * e;
                default:
                    return e
            }
        }
        function gu(e, t, n) {
            return e.hasOwnProperty("duration") ? e : function(e, t, n) {
                let s, r = 0, i = "";
                if ("string" == typeof e) {
                    const n = e.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
                    if (null === n)
                        return t.push(`The provided timing value "${e}" is invalid.`),
                            {
                                duration: 0,
                                delay: 0,
                                easing: ""
                            };
                    s = mu(parseFloat(n[1]), n[2]);
                    const o = n[3];
                    null != o && (r = mu(parseFloat(o), n[4]));
                    const a = n[5];
                    a && (i = a)
                } else
                    s = e;
                if (!n) {
                    let n = !1
                        , i = t.length;
                    s < 0 && (t.push("Duration values below 0 are not allowed for this animation step."),
                        n = !0),
                    r < 0 && (t.push("Delay values below 0 are not allowed for this animation step."),
                        n = !0),
                    n && t.splice(i, 0, `The provided timing value "${e}" is invalid.`)
                }
                return {
                    duration: s,
                    delay: r,
                    easing: i
                }
            }(e, t, n)
        }
        function yu(e, t={}) {
            return Object.keys(e).forEach(n => {
                    t[n] = e[n]
                }
            ),
                t
        }
        function _u(e, t, n={}) {
            if (t)
                for (let s in e)
                    n[s] = e[s];
            else
                yu(e, n);
            return n
        }
        function bu(e, t, n) {
            return n ? t + ":" + n + ";" : ""
        }
        function vu(e) {
            let t = "";
            for (let n = 0; n < e.style.length; n++) {
                const s = e.style.item(n);
                t += bu(0, s, e.style.getPropertyValue(s))
            }
            for (const n in e.style)
                e.style.hasOwnProperty(n) && !n.startsWith("_") && (t += bu(0, n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), e.style[n]));
            e.setAttribute("style", t)
        }
        function wu(e, t, n) {
            e.style && (Object.keys(t).forEach(s => {
                    const r = Au(s);
                    n && !n.hasOwnProperty(s) && (n[s] = e.style[r]),
                        e.style[r] = t[s]
                }
            ),
            Wc() && vu(e))
        }
        function Eu(e, t) {
            e.style && (Object.keys(t).forEach(t => {
                    const n = Au(t);
                    e.style[n] = ""
                }
            ),
            Wc() && vu(e))
        }
        function Cu(e) {
            return Array.isArray(e) ? 1 == e.length ? e[0] : Bc(e) : e
        }
        const Su = new RegExp("{{\\s*(.+?)\\s*}}","g");
        function xu(e) {
            let t = [];
            if ("string" == typeof e) {
                let n;
                for (; n = Su.exec(e); )
                    t.push(n[1]);
                Su.lastIndex = 0
            }
            return t
        }
        function Tu(e, t, n) {
            const s = e.toString()
                , r = s.replace(Su, (e, s) => {
                    let r = t[s];
                    return t.hasOwnProperty(s) || (n.push("Please provide a value for the animation param " + s),
                        r = ""),
                        r.toString()
                }
            );
            return r == s ? e : r
        }
        function ku(e) {
            const t = [];
            let n = e.next();
            for (; !n.done; )
                t.push(n.value),
                    n = e.next();
            return t
        }
        const Iu = /-+([a-z0-9])/g;
        function Au(e) {
            return e.replace(Iu, (...e) => e[1].toUpperCase())
        }
        function Ou(e, t) {
            return 0 === e || 0 === t
        }
        function Nu(e, t, n) {
            const s = Object.keys(n);
            if (s.length && t.length) {
                let i = t[0]
                    , o = [];
                if (s.forEach(e => {
                        i.hasOwnProperty(e) || o.push(e),
                            i[e] = n[e]
                    }
                ),
                    o.length)
                    for (var r = 1; r < t.length; r++) {
                        let n = t[r];
                        o.forEach((function(t) {
                                n[t] = Fu(e, t)
                            }
                        ))
                    }
            }
            return t
        }
        function Du(e, t, n) {
            switch (t.type) {
                case 7:
                    return e.visitTrigger(t, n);
                case 0:
                    return e.visitState(t, n);
                case 1:
                    return e.visitTransition(t, n);
                case 2:
                    return e.visitSequence(t, n);
                case 3:
                    return e.visitGroup(t, n);
                case 4:
                    return e.visitAnimate(t, n);
                case 5:
                    return e.visitKeyframes(t, n);
                case 6:
                    return e.visitStyle(t, n);
                case 8:
                    return e.visitReference(t, n);
                case 9:
                    return e.visitAnimateChild(t, n);
                case 10:
                    return e.visitAnimateRef(t, n);
                case 11:
                    return e.visitQuery(t, n);
                case 12:
                    return e.visitStagger(t, n);
                default:
                    throw new Error("Unable to resolve animation metadata node #" + t.type)
            }
        }
        function Fu(e, t) {
            return window.getComputedStyle(e)[t]
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Pu(e, t) {
            const n = [];
            return "string" == typeof e ? e.split(/\s*,\s*/).forEach(e => function(e, t, n) {
                if (":" == e[0]) {
                    const s = function(e, t) {
                        switch (e) {
                            case ":enter":
                                return "void => *";
                            case ":leave":
                                return "* => void";
                            case ":increment":
                                return (e, t) => parseFloat(t) > parseFloat(e);
                            case ":decrement":
                                return (e, t) => parseFloat(t) < parseFloat(e);
                            default:
                                return t.push(`The transition alias value "${e}" is not supported`),
                                    "* => *"
                        }
                    }(e, n);
                    if ("function" == typeof s)
                        return void t.push(s);
                    e = s
                }
                const s = e.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                if (null == s || s.length < 4)
                    return n.push(`The provided transition expression "${e}" is not supported`),
                        t;
                const r = s[1]
                    , i = s[2]
                    , o = s[3];
                t.push(Ru(r, o)),
                "<" != i[0] || "*" == r && "*" == o || t.push(Ru(o, r))
            }(e, n, t)) : n.push(e),
                n
        }
        const Mu = new Set(["true", "1"])
            , Vu = new Set(["false", "0"]);
        function Ru(e, t) {
            const n = Mu.has(e) || Vu.has(e)
                , s = Mu.has(t) || Vu.has(t);
            return (r, i) => {
                let o = "*" == e || e == r
                    , a = "*" == t || t == i;
                return !o && n && "boolean" == typeof r && (o = r ? Mu.has(e) : Vu.has(e)),
                !a && s && "boolean" == typeof i && (a = i ? Mu.has(t) : Vu.has(t)),
                o && a
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
        }
        const ju = new RegExp("s*:selfs*,?","g");
        function Lu(e, t, n) {
            return new Hu(e).build(t, n)
        }
        class Hu {
            constructor(e) {
                this._driver = e
            }
            build(e, t) {
                const n = new Bu(t);
                return this._resetContextStyleTimingState(n),
                    Du(this, Cu(e), n)
            }
            _resetContextStyleTimingState(e) {
                e.currentQuerySelector = "",
                    e.collectedStyles = {},
                    e.collectedStyles[""] = {},
                    e.currentTime = 0
            }
            visitTrigger(e, t) {
                let n = t.queryCount = 0
                    , s = t.depCount = 0;
                const r = []
                    , i = [];
                return "@" == e.name.charAt(0) && t.errors.push("animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"),
                    e.definitions.forEach(e => {
                            if (this._resetContextStyleTimingState(t),
                            0 == e.type) {
                                const n = e
                                    , s = n.name;
                                s.toString().split(/\s*,\s*/).forEach(e => {
                                        n.name = e,
                                            r.push(this.visitState(n, t))
                                    }
                                ),
                                    n.name = s
                            } else if (1 == e.type) {
                                const r = this.visitTransition(e, t);
                                n += r.queryCount,
                                    s += r.depCount,
                                    i.push(r)
                            } else
                                t.errors.push("only state() and transition() definitions can sit inside of a trigger()")
                        }
                    ),
                    {
                        type: 7,
                        name: e.name,
                        states: r,
                        transitions: i,
                        queryCount: n,
                        depCount: s,
                        options: null
                    }
            }
            visitState(e, t) {
                const n = this.visitStyle(e.styles, t)
                    , s = e.options && e.options.params || null;
                if (n.containsDynamicStyles) {
                    const r = new Set
                        , i = s || {};
                    if (n.styles.forEach(e => {
                            if ($u(e)) {
                                const t = e;
                                Object.keys(t).forEach(e => {
                                        xu(t[e]).forEach(e => {
                                                i.hasOwnProperty(e) || r.add(e)
                                            }
                                        )
                                    }
                                )
                            }
                        }
                    ),
                        r.size) {
                        const n = ku(r.values());
                        t.errors.push(`state("${e.name}", ...) must define default values for all the following style substitutions: ${n.join(", ")}`)
                    }
                }
                return {
                    type: 0,
                    name: e.name,
                    style: n,
                    options: s ? {
                        params: s
                    } : null
                }
            }
            visitTransition(e, t) {
                t.queryCount = 0,
                    t.depCount = 0;
                const n = Du(this, Cu(e.animation), t);
                return {
                    type: 1,
                    matchers: Pu(e.expr, t.errors),
                    animation: n,
                    queryCount: t.queryCount,
                    depCount: t.depCount,
                    options: zu(e.options)
                }
            }
            visitSequence(e, t) {
                return {
                    type: 2,
                    steps: e.steps.map(e => Du(this, e, t)),
                    options: zu(e.options)
                }
            }
            visitGroup(e, t) {
                const n = t.currentTime;
                let s = 0;
                const r = e.steps.map(e => {
                        t.currentTime = n;
                        const r = Du(this, e, t);
                        return s = Math.max(s, t.currentTime),
                            r
                    }
                );
                return t.currentTime = s,
                    {
                        type: 3,
                        steps: r,
                        options: zu(e.options)
                    }
            }
            visitAnimate(e, t) {
                const n = function(e, t) {
                    let n = null;
                    if (e.hasOwnProperty("duration"))
                        n = e;
                    else if ("number" == typeof e)
                        return qu(gu(e, t).duration, 0, "");
                    const s = e;
                    if (s.split(/\s+/).some(e => "{" == e.charAt(0) && "{" == e.charAt(1))) {
                        const e = qu(0, 0, "");
                        return e.dynamic = !0,
                            e.strValue = s,
                            e
                    }
                    return n = n || gu(s, t),
                        qu(n.duration, n.delay, n.easing)
                }(e.timings, t.errors);
                let s;
                t.currentAnimateTimings = n;
                let r = e.styles ? e.styles : $c({});
                if (5 == r.type)
                    s = this.visitKeyframes(r, t);
                else {
                    let r = e.styles
                        , i = !1;
                    if (!r) {
                        i = !0;
                        const e = {};
                        n.easing && (e.easing = n.easing),
                            r = $c(e)
                    }
                    t.currentTime += n.duration + n.delay;
                    const o = this.visitStyle(r, t);
                    o.isEmptyStep = i,
                        s = o
                }
                return t.currentAnimateTimings = null,
                    {
                        type: 4,
                        timings: n,
                        style: s,
                        options: null
                    }
            }
            visitStyle(e, t) {
                const n = this._makeStyleAst(e, t);
                return this._validateStyleAst(n, t),
                    n
            }
            _makeStyleAst(e, t) {
                const n = [];
                Array.isArray(e.styles) ? e.styles.forEach(e => {
                        "string" == typeof e ? "*" == e ? n.push(e) : t.errors.push(`The provided style string value ${e} is not allowed.`) : n.push(e)
                    }
                ) : n.push(e.styles);
                let s = !1
                    , r = null;
                return n.forEach(e => {
                        if ($u(e)) {
                            const t = e
                                , n = t.easing;
                            if (n && (r = n,
                                delete t.easing),
                                !s)
                                for (let e in t)
                                    if (t[e].toString().indexOf("{{") >= 0) {
                                        s = !0;
                                        break
                                    }
                        }
                    }
                ),
                    {
                        type: 6,
                        styles: n,
                        easing: r,
                        offset: e.offset,
                        containsDynamicStyles: s,
                        options: null
                    }
            }
            _validateStyleAst(e, t) {
                const n = t.currentAnimateTimings;
                let s = t.currentTime
                    , r = t.currentTime;
                n && r > 0 && (r -= n.duration + n.delay),
                    e.styles.forEach(e => {
                            "string" != typeof e && Object.keys(e).forEach(n => {
                                    if (!this._driver.validateStyleProperty(n))
                                        return void t.errors.push(`The provided animation property "${n}" is not a supported CSS property for animations`);
                                    const i = t.collectedStyles[t.currentQuerySelector]
                                        , o = i[n];
                                    let a = !0;
                                    o && (r != s && r >= o.startTime && s <= o.endTime && (t.errors.push(`The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${r}ms" and "${s}ms"`),
                                        a = !1),
                                        r = o.startTime),
                                    a && (i[n] = {
                                        startTime: r,
                                        endTime: s
                                    }),
                                    t.options && function(e, t, n) {
                                        const s = t.params || {}
                                            , r = xu(e);
                                        r.length && r.forEach(e => {
                                                s.hasOwnProperty(e) || n.push(`Unable to resolve the local animation param ${e} in the given list of values`)
                                            }
                                        )
                                    }(e[n], t.options, t.errors)
                                }
                            )
                        }
                    )
            }
            visitKeyframes(e, t) {
                const n = {
                    type: 5,
                    styles: [],
                    options: null
                };
                if (!t.currentAnimateTimings)
                    return t.errors.push("keyframes() must be placed inside of a call to animate()"),
                        n;
                let s = 0;
                const r = [];
                let i = !1
                    , o = !1
                    , a = 0;
                const l = e.steps.map(e => {
                        const n = this._makeStyleAst(e, t);
                        let l = null != n.offset ? n.offset : function(e) {
                            if ("string" == typeof e)
                                return null;
                            let t = null;
                            if (Array.isArray(e))
                                e.forEach(e => {
                                        if ($u(e) && e.hasOwnProperty("offset")) {
                                            const n = e;
                                            t = parseFloat(n.offset),
                                                delete n.offset
                                        }
                                    }
                                );
                            else if ($u(e) && e.hasOwnProperty("offset")) {
                                const n = e;
                                t = parseFloat(n.offset),
                                    delete n.offset
                            }
                            return t
                        }(n.styles)
                            , c = 0;
                        return null != l && (s++,
                            c = n.offset = l),
                            o = o || c < 0 || c > 1,
                            i = i || c < a,
                            a = c,
                            r.push(c),
                            n
                    }
                );
                o && t.errors.push("Please ensure that all keyframe offsets are between 0 and 1"),
                i && t.errors.push("Please ensure that all keyframe offsets are in order");
                const c = e.steps.length;
                let u = 0;
                s > 0 && s < c ? t.errors.push("Not all style() steps within the declared keyframes() contain offsets") : 0 == s && (u = 1 / (c - 1));
                const h = c - 1
                    , d = t.currentTime
                    , p = t.currentAnimateTimings
                    , f = p.duration;
                return l.forEach( (e, s) => {
                        const i = u > 0 ? s == h ? 1 : u * s : r[s]
                            , o = i * f;
                        t.currentTime = d + p.delay + o,
                            p.duration = o,
                            this._validateStyleAst(e, t),
                            e.offset = i,
                            n.styles.push(e)
                    }
                ),
                    n
            }
            visitReference(e, t) {
                return {
                    type: 8,
                    animation: Du(this, Cu(e.animation), t),
                    options: zu(e.options)
                }
            }
            visitAnimateChild(e, t) {
                return t.depCount++,
                    {
                        type: 9,
                        options: zu(e.options)
                    }
            }
            visitAnimateRef(e, t) {
                return {
                    type: 10,
                    animation: this.visitReference(e.animation, t),
                    options: zu(e.options)
                }
            }
            visitQuery(e, t) {
                const n = t.currentQuerySelector
                    , s = e.options || {};
                t.queryCount++,
                    t.currentQuery = e;
                const [r,i] = function(e) {
                    const t = !!e.split(/\s*,\s*/).find(e => ":self" == e);
                    return t && (e = e.replace(ju, "")),
                        [e = e.replace(/@\*/g, ".ng-trigger").replace(/@\w+/g, e => ".ng-trigger-" + e.substr(1)).replace(/:animating/g, ".ng-animating"), t]
                }(e.selector);
                t.currentQuerySelector = n.length ? n + " " + r : r,
                    Xc(t.collectedStyles, t.currentQuerySelector, {});
                const o = Du(this, Cu(e.animation), t);
                return t.currentQuery = null,
                    t.currentQuerySelector = n,
                    {
                        type: 11,
                        selector: r,
                        limit: s.limit || 0,
                        optional: !!s.optional,
                        includeSelf: i,
                        animation: o,
                        originalSelector: e.selector,
                        options: zu(e.options)
                    }
            }
            visitStagger(e, t) {
                t.currentQuery || t.errors.push("stagger() can only be used inside of query()");
                const n = "full" === e.timings ? {
                    duration: 0,
                    delay: 0,
                    easing: "full"
                } : gu(e.timings, t.errors, !0);
                return {
                    type: 12,
                    animation: Du(this, Cu(e.animation), t),
                    timings: n,
                    options: null
                }
            }
        }
        class Bu {
            constructor(e) {
                this.errors = e,
                    this.queryCount = 0,
                    this.depCount = 0,
                    this.currentTransition = null,
                    this.currentQuery = null,
                    this.currentQuerySelector = null,
                    this.currentAnimateTimings = null,
                    this.currentTime = 0,
                    this.collectedStyles = {},
                    this.options = null
            }
        }
        function $u(e) {
            return !Array.isArray(e) && "object" == typeof e
        }
        function zu(e) {
            var t;
            return e ? (e = yu(e)).params && (e.params = (t = e.params) ? yu(t) : null) : e = {},
                e
        }
        function qu(e, t, n) {
            return {
                duration: e,
                delay: t,
                easing: n
            }
        }
        function Uu(e, t, n, s, r, i, o=null, a=!1) {
            return {
                type: 1,
                element: e,
                keyframes: t,
                preStyleProps: n,
                postStyleProps: s,
                duration: r,
                delay: i,
                totalTime: r + i,
                easing: o,
                subTimeline: a
            }
        }
        class Gu {
            constructor() {
                this._map = new Map
            }
            consume(e) {
                let t = this._map.get(e);
                return t ? this._map.delete(e) : t = [],
                    t
            }
            append(e, t) {
                let n = this._map.get(e);
                n || this._map.set(e, n = []),
                    n.push(...t)
            }
            has(e) {
                return this._map.has(e)
            }
            clear() {
                this._map.clear()
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Wu = new RegExp(":enter","g")
            , Qu = new RegExp(":leave","g");
        function Zu(e, t, n, s, r, i={}, o={}, a, l, c=[]) {
            return (new Ku).buildKeyframes(e, t, n, s, r, i, o, a, l, c)
        }
        class Ku {
            buildKeyframes(e, t, n, s, r, i, o, a, l, c=[]) {
                l = l || new Gu;
                const u = new Ju(e,t,l,s,r,c,[]);
                u.options = a,
                    u.currentTimeline.setStyles([i], null, u.errors, a),
                    Du(this, n, u);
                const h = u.timelines.filter(e => e.containsAnimation());
                if (h.length && Object.keys(o).length) {
                    const e = h[h.length - 1];
                    e.allowOnlyTimelineStyles() || e.setStyles([o], null, u.errors, a)
                }
                return h.length ? h.map(e => e.buildKeyframes()) : [Uu(t, [], [], [], 0, 0, "", !1)]
            }
            visitTrigger(e, t) {}
            visitState(e, t) {}
            visitTransition(e, t) {}
            visitAnimateChild(e, t) {
                const n = t.subInstructions.consume(t.element);
                if (n) {
                    const s = t.createSubContext(e.options)
                        , r = t.currentTimeline.currentTime
                        , i = this._visitSubInstructions(n, s, s.options);
                    r != i && t.transformIntoNewTimeline(i)
                }
                t.previousNode = e
            }
            visitAnimateRef(e, t) {
                const n = t.createSubContext(e.options);
                n.transformIntoNewTimeline(),
                    this.visitReference(e.animation, n),
                    t.transformIntoNewTimeline(n.currentTimeline.currentTime),
                    t.previousNode = e
            }
            _visitSubInstructions(e, t, n) {
                let s = t.currentTimeline.currentTime;
                const r = null != n.duration ? fu(n.duration) : null
                    , i = null != n.delay ? fu(n.delay) : null;
                return 0 !== r && e.forEach(e => {
                        const n = t.appendInstructionToTimeline(e, r, i);
                        s = Math.max(s, n.duration + n.delay)
                    }
                ),
                    s
            }
            visitReference(e, t) {
                t.updateOptions(e.options, !0),
                    Du(this, e.animation, t),
                    t.previousNode = e
            }
            visitSequence(e, t) {
                const n = t.subContextCount;
                let s = t;
                const r = e.options;
                if (r && (r.params || r.delay) && (s = t.createSubContext(r),
                    s.transformIntoNewTimeline(),
                null != r.delay)) {
                    6 == s.previousNode.type && (s.currentTimeline.snapshotCurrentStyles(),
                        s.previousNode = Yu);
                    const e = fu(r.delay);
                    s.delayNextStep(e)
                }
                e.steps.length && (e.steps.forEach(e => Du(this, e, s)),
                    s.currentTimeline.applyStylesToKeyframe(),
                s.subContextCount > n && s.transformIntoNewTimeline()),
                    t.previousNode = e
            }
            visitGroup(e, t) {
                const n = [];
                let s = t.currentTimeline.currentTime;
                const r = e.options && e.options.delay ? fu(e.options.delay) : 0;
                e.steps.forEach(i => {
                        const o = t.createSubContext(e.options);
                        r && o.delayNextStep(r),
                            Du(this, i, o),
                            s = Math.max(s, o.currentTimeline.currentTime),
                            n.push(o.currentTimeline)
                    }
                ),
                    n.forEach(e => t.currentTimeline.mergeTimelineCollectedStyles(e)),
                    t.transformIntoNewTimeline(s),
                    t.previousNode = e
            }
            _visitTiming(e, t) {
                if (e.dynamic) {
                    const n = e.strValue;
                    return gu(t.params ? Tu(n, t.params, t.errors) : n, t.errors)
                }
                return {
                    duration: e.duration,
                    delay: e.delay,
                    easing: e.easing
                }
            }
            visitAnimate(e, t) {
                const n = t.currentAnimateTimings = this._visitTiming(e.timings, t)
                    , s = t.currentTimeline;
                n.delay && (t.incrementTime(n.delay),
                    s.snapshotCurrentStyles());
                const r = e.style;
                5 == r.type ? this.visitKeyframes(r, t) : (t.incrementTime(n.duration),
                    this.visitStyle(r, t),
                    s.applyStylesToKeyframe()),
                    t.currentAnimateTimings = null,
                    t.previousNode = e
            }
            visitStyle(e, t) {
                const n = t.currentTimeline
                    , s = t.currentAnimateTimings;
                !s && n.getCurrentStyleProperties().length && n.forwardFrame();
                const r = s && s.easing || e.easing;
                e.isEmptyStep ? n.applyEmptyStep(r) : n.setStyles(e.styles, r, t.errors, t.options),
                    t.previousNode = e
            }
            visitKeyframes(e, t) {
                const n = t.currentAnimateTimings
                    , s = t.currentTimeline.duration
                    , r = n.duration
                    , i = t.createSubContext().currentTimeline;
                i.easing = n.easing,
                    e.styles.forEach(e => {
                            i.forwardTime((e.offset || 0) * r),
                                i.setStyles(e.styles, e.easing, t.errors, t.options),
                                i.applyStylesToKeyframe()
                        }
                    ),
                    t.currentTimeline.mergeTimelineCollectedStyles(i),
                    t.transformIntoNewTimeline(s + r),
                    t.previousNode = e
            }
            visitQuery(e, t) {
                const n = t.currentTimeline.currentTime
                    , s = e.options || {}
                    , r = s.delay ? fu(s.delay) : 0;
                r && (6 === t.previousNode.type || 0 == n && t.currentTimeline.getCurrentStyleProperties().length) && (t.currentTimeline.snapshotCurrentStyles(),
                    t.previousNode = Yu);
                let i = n;
                const o = t.invokeQuery(e.selector, e.originalSelector, e.limit, e.includeSelf, !!s.optional, t.errors);
                t.currentQueryTotal = o.length;
                let a = null;
                o.forEach( (n, s) => {
                        t.currentQueryIndex = s;
                        const o = t.createSubContext(e.options, n);
                        r && o.delayNextStep(r),
                        n === t.element && (a = o.currentTimeline),
                            Du(this, e.animation, o),
                            o.currentTimeline.applyStylesToKeyframe(),
                            i = Math.max(i, o.currentTimeline.currentTime)
                    }
                ),
                    t.currentQueryIndex = 0,
                    t.currentQueryTotal = 0,
                    t.transformIntoNewTimeline(i),
                a && (t.currentTimeline.mergeTimelineCollectedStyles(a),
                    t.currentTimeline.snapshotCurrentStyles()),
                    t.previousNode = e
            }
            visitStagger(e, t) {
                const n = t.parentContext
                    , s = t.currentTimeline
                    , r = e.timings
                    , i = Math.abs(r.duration)
                    , o = i * (t.currentQueryTotal - 1);
                let a = i * t.currentQueryIndex;
                switch (r.duration < 0 ? "reverse" : r.easing) {
                    case "reverse":
                        a = o - a;
                        break;
                    case "full":
                        a = n.currentStaggerTime
                }
                const l = t.currentTimeline;
                a && l.delayNextStep(a);
                const c = l.currentTime;
                Du(this, e.animation, t),
                    t.previousNode = e,
                    n.currentStaggerTime = s.currentTime - c + (s.startTime - n.currentTimeline.startTime)
            }
        }
        const Yu = {};
        class Ju {
            constructor(e, t, n, s, r, i, o, a) {
                this._driver = e,
                    this.element = t,
                    this.subInstructions = n,
                    this._enterClassName = s,
                    this._leaveClassName = r,
                    this.errors = i,
                    this.timelines = o,
                    this.parentContext = null,
                    this.currentAnimateTimings = null,
                    this.previousNode = Yu,
                    this.subContextCount = 0,
                    this.options = {},
                    this.currentQueryIndex = 0,
                    this.currentQueryTotal = 0,
                    this.currentStaggerTime = 0,
                    this.currentTimeline = a || new Xu(this._driver,t,0),
                    o.push(this.currentTimeline)
            }
            get params() {
                return this.options.params
            }
            updateOptions(e, t) {
                if (!e)
                    return;
                const n = e;
                let s = this.options;
                null != n.duration && (s.duration = fu(n.duration)),
                null != n.delay && (s.delay = fu(n.delay));
                const r = n.params;
                if (r) {
                    let e = s.params;
                    e || (e = this.options.params = {}),
                        Object.keys(r).forEach(n => {
                                t && e.hasOwnProperty(n) || (e[n] = Tu(r[n], e, this.errors))
                            }
                        )
                }
            }
            _copyOptions() {
                const e = {};
                if (this.options) {
                    const t = this.options.params;
                    if (t) {
                        const n = e.params = {};
                        Object.keys(t).forEach(e => {
                                n[e] = t[e]
                            }
                        )
                    }
                }
                return e
            }
            createSubContext(e=null, t, n) {
                const s = t || this.element
                    , r = new Ju(this._driver,s,this.subInstructions,this._enterClassName,this._leaveClassName,this.errors,this.timelines,this.currentTimeline.fork(s, n || 0));
                return r.previousNode = this.previousNode,
                    r.currentAnimateTimings = this.currentAnimateTimings,
                    r.options = this._copyOptions(),
                    r.updateOptions(e),
                    r.currentQueryIndex = this.currentQueryIndex,
                    r.currentQueryTotal = this.currentQueryTotal,
                    r.parentContext = this,
                    this.subContextCount++,
                    r
            }
            transformIntoNewTimeline(e) {
                return this.previousNode = Yu,
                    this.currentTimeline = this.currentTimeline.fork(this.element, e),
                    this.timelines.push(this.currentTimeline),
                    this.currentTimeline
            }
            appendInstructionToTimeline(e, t, n) {
                const s = {
                    duration: null != t ? t : e.duration,
                    delay: this.currentTimeline.currentTime + (null != n ? n : 0) + e.delay,
                    easing: ""
                }
                    , r = new eh(this._driver,e.element,e.keyframes,e.preStyleProps,e.postStyleProps,s,e.stretchStartingKeyframe);
                return this.timelines.push(r),
                    s
            }
            incrementTime(e) {
                this.currentTimeline.forwardTime(this.currentTimeline.duration + e)
            }
            delayNextStep(e) {
                e > 0 && this.currentTimeline.delayNextStep(e)
            }
            invokeQuery(e, t, n, s, r, i) {
                let o = [];
                if (s && o.push(this.element),
                e.length > 0) {
                    e = (e = e.replace(Wu, "." + this._enterClassName)).replace(Qu, "." + this._leaveClassName);
                    let t = this._driver.query(this.element, e, 1 != n);
                    0 !== n && (t = n < 0 ? t.slice(t.length + n, t.length) : t.slice(0, n)),
                        o.push(...t)
                }
                return r || 0 != o.length || i.push(`\`query("${t}")\` returned zero elements. (Use \`query("${t}", { optional: true })\` if you wish to allow this.)`),
                    o
            }
        }
        class Xu {
            constructor(e, t, n, s) {
                this._driver = e,
                    this.element = t,
                    this.startTime = n,
                    this._elementTimelineStylesLookup = s,
                    this.duration = 0,
                    this._previousKeyframe = {},
                    this._currentKeyframe = {},
                    this._keyframes = new Map,
                    this._styleSummary = {},
                    this._pendingStyles = {},
                    this._backFill = {},
                    this._currentEmptyStepKeyframe = null,
                this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map),
                    this._localTimelineStyles = Object.create(this._backFill, {}),
                    this._globalTimelineStyles = this._elementTimelineStylesLookup.get(t),
                this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles,
                    this._elementTimelineStylesLookup.set(t, this._localTimelineStyles)),
                    this._loadKeyframe()
            }
            containsAnimation() {
                switch (this._keyframes.size) {
                    case 0:
                        return !1;
                    case 1:
                        return this.getCurrentStyleProperties().length > 0;
                    default:
                        return !0
                }
            }
            getCurrentStyleProperties() {
                return Object.keys(this._currentKeyframe)
            }
            get currentTime() {
                return this.startTime + this.duration
            }
            delayNextStep(e) {
                const t = 1 == this._keyframes.size && Object.keys(this._pendingStyles).length;
                this.duration || t ? (this.forwardTime(this.currentTime + e),
                t && this.snapshotCurrentStyles()) : this.startTime += e
            }
            fork(e, t) {
                return this.applyStylesToKeyframe(),
                    new Xu(this._driver,e,t || this.currentTime,this._elementTimelineStylesLookup)
            }
            _loadKeyframe() {
                this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
                    this._currentKeyframe = this._keyframes.get(this.duration),
                this._currentKeyframe || (this._currentKeyframe = Object.create(this._backFill, {}),
                    this._keyframes.set(this.duration, this._currentKeyframe))
            }
            forwardFrame() {
                this.duration += 1,
                    this._loadKeyframe()
            }
            forwardTime(e) {
                this.applyStylesToKeyframe(),
                    this.duration = e,
                    this._loadKeyframe()
            }
            _updateStyle(e, t) {
                this._localTimelineStyles[e] = t,
                    this._globalTimelineStyles[e] = t,
                    this._styleSummary[e] = {
                        time: this.currentTime,
                        value: t
                    }
            }
            allowOnlyTimelineStyles() {
                return this._currentEmptyStepKeyframe !== this._currentKeyframe
            }
            applyEmptyStep(e) {
                e && (this._previousKeyframe.easing = e),
                    Object.keys(this._globalTimelineStyles).forEach(e => {
                            this._backFill[e] = this._globalTimelineStyles[e] || "*",
                                this._currentKeyframe[e] = "*"
                        }
                    ),
                    this._currentEmptyStepKeyframe = this._currentKeyframe
            }
            setStyles(e, t, n, s) {
                t && (this._previousKeyframe.easing = t);
                const r = s && s.params || {}
                    , i = function(e, t) {
                    const n = {};
                    let s;
                    return e.forEach(e => {
                            "*" === e ? (s = s || Object.keys(t),
                                s.forEach(e => {
                                        n[e] = "*"
                                    }
                                )) : _u(e, !1, n)
                        }
                    ),
                        n
                }(e, this._globalTimelineStyles);
                Object.keys(i).forEach(e => {
                        const t = Tu(i[e], r, n);
                        this._pendingStyles[e] = t,
                        this._localTimelineStyles.hasOwnProperty(e) || (this._backFill[e] = this._globalTimelineStyles.hasOwnProperty(e) ? this._globalTimelineStyles[e] : "*"),
                            this._updateStyle(e, t)
                    }
                )
            }
            applyStylesToKeyframe() {
                const e = this._pendingStyles
                    , t = Object.keys(e);
                0 != t.length && (this._pendingStyles = {},
                    t.forEach(t => {
                            this._currentKeyframe[t] = e[t]
                        }
                    ),
                    Object.keys(this._localTimelineStyles).forEach(e => {
                            this._currentKeyframe.hasOwnProperty(e) || (this._currentKeyframe[e] = this._localTimelineStyles[e])
                        }
                    ))
            }
            snapshotCurrentStyles() {
                Object.keys(this._localTimelineStyles).forEach(e => {
                        const t = this._localTimelineStyles[e];
                        this._pendingStyles[e] = t,
                            this._updateStyle(e, t)
                    }
                )
            }
            getFinalKeyframe() {
                return this._keyframes.get(this.duration)
            }
            get properties() {
                const e = [];
                for (let t in this._currentKeyframe)
                    e.push(t);
                return e
            }
            mergeTimelineCollectedStyles(e) {
                Object.keys(e._styleSummary).forEach(t => {
                        const n = this._styleSummary[t]
                            , s = e._styleSummary[t];
                        (!n || s.time > n.time) && this._updateStyle(t, s.value)
                    }
                )
            }
            buildKeyframes() {
                this.applyStylesToKeyframe();
                const e = new Set
                    , t = new Set
                    , n = 1 === this._keyframes.size && 0 === this.duration;
                let s = [];
                this._keyframes.forEach( (r, i) => {
                        const o = _u(r, !0);
                        Object.keys(o).forEach(n => {
                                const s = o[n];
                                "!" == s ? e.add(n) : "*" == s && t.add(n)
                            }
                        ),
                        n || (o.offset = i / this.duration),
                            s.push(o)
                    }
                );
                const r = e.size ? ku(e.values()) : []
                    , i = t.size ? ku(t.values()) : [];
                if (n) {
                    const e = s[0]
                        , t = yu(e);
                    e.offset = 0,
                        t.offset = 1,
                        s = [e, t]
                }
                return Uu(this.element, s, r, i, this.duration, this.startTime, this.easing, !1)
            }
        }
        class eh extends Xu {
            constructor(e, t, n, s, r, i, o=!1) {
                super(e, t, i.delay),
                    this.element = t,
                    this.keyframes = n,
                    this.preStyleProps = s,
                    this.postStyleProps = r,
                    this._stretchStartingKeyframe = o,
                    this.timings = {
                        duration: i.duration,
                        delay: i.delay,
                        easing: i.easing
                    }
            }
            containsAnimation() {
                return this.keyframes.length > 1
            }
            buildKeyframes() {
                let e = this.keyframes
                    , {delay: t, duration: n, easing: s} = this.timings;
                if (this._stretchStartingKeyframe && t) {
                    const r = []
                        , i = n + t
                        , o = t / i
                        , a = _u(e[0], !1);
                    a.offset = 0,
                        r.push(a);
                    const l = _u(e[0], !1);
                    l.offset = th(o),
                        r.push(l);
                    const c = e.length - 1;
                    for (let s = 1; s <= c; s++) {
                        let o = _u(e[s], !1);
                        o.offset = th((t + o.offset * n) / i),
                            r.push(o)
                    }
                    n = i,
                        t = 0,
                        s = "",
                        e = r
                }
                return Uu(this.element, e, this.preStyleProps, this.postStyleProps, n, t, s, !0)
            }
        }
        function th(e, t=3) {
            const n = Math.pow(10, t - 1);
            return Math.round(e * n) / n
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class nh {
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class sh extends nh {
            normalizePropertyName(e, t) {
                return Au(e)
            }
            normalizeStyleValue(e, t, n, s) {
                let r = "";
                const i = n.toString().trim();
                if (rh[t] && 0 !== n && "0" !== n)
                    if ("number" == typeof n)
                        r = "px";
                    else {
                        const t = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
                        t && 0 == t[1].length && s.push(`Please provide a CSS unit value for ${e}:${n}`)
                    }
                return i + r
            }
        }
        const rh = ( () => function(e) {
            const t = {};
            return e.forEach(e => t[e] = !0),
                t
        }("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(",")))();
        function ih(e, t, n, s, r, i, o, a, l, c, u, h, d) {
            return {
                type: 0,
                element: e,
                triggerName: t,
                isRemovalTransition: r,
                fromState: n,
                fromStyles: i,
                toState: s,
                toStyles: o,
                timelines: a,
                queriedElements: l,
                preStyleProps: c,
                postStyleProps: u,
                totalTime: h,
                errors: d
            }
        }
        const oh = {};
        class ah {
            constructor(e, t, n) {
                this._triggerName = e,
                    this.ast = t,
                    this._stateStyles = n
            }
            match(e, t, n, s) {
                return function(e, t, n, s, r) {
                    return e.some(e => e(t, n, s, r))
                }(this.ast.matchers, e, t, n, s)
            }
            buildStyles(e, t, n) {
                const s = this._stateStyles["*"]
                    , r = this._stateStyles[e]
                    , i = s ? s.buildStyles(t, n) : {};
                return r ? r.buildStyles(t, n) : i
            }
            build(e, t, n, s, r, i, o, a, l, c) {
                const u = []
                    , h = this.ast.options && this.ast.options.params || oh
                    , d = this.buildStyles(n, o && o.params || oh, u)
                    , p = a && a.params || oh
                    , f = this.buildStyles(s, p, u)
                    , m = new Set
                    , g = new Map
                    , y = new Map
                    , _ = "void" === s
                    , b = {
                    params: Object.assign(Object.assign({}, h), p)
                }
                    , v = c ? [] : Zu(e, t, this.ast.animation, r, i, d, f, b, l, u);
                let w = 0;
                if (v.forEach(e => {
                        w = Math.max(e.duration + e.delay, w)
                    }
                ),
                    u.length)
                    return ih(t, this._triggerName, n, s, _, d, f, [], [], g, y, w, u);
                v.forEach(e => {
                        const n = e.element
                            , s = Xc(g, n, {});
                        e.preStyleProps.forEach(e => s[e] = !0);
                        const r = Xc(y, n, {});
                        e.postStyleProps.forEach(e => r[e] = !0),
                        n !== t && m.add(n)
                    }
                );
                const E = ku(m.values());
                return ih(t, this._triggerName, n, s, _, d, f, v, E, g, y, w)
            }
        }
        class lh {
            constructor(e, t) {
                this.styles = e,
                    this.defaultParams = t
            }
            buildStyles(e, t) {
                const n = {}
                    , s = yu(this.defaultParams);
                return Object.keys(e).forEach(t => {
                        const n = e[t];
                        null != n && (s[t] = n)
                    }
                ),
                    this.styles.styles.forEach(e => {
                            if ("string" != typeof e) {
                                const r = e;
                                Object.keys(r).forEach(e => {
                                        let i = r[e];
                                        i.length > 1 && (i = Tu(i, s, t)),
                                            n[e] = i
                                    }
                                )
                            }
                        }
                    ),
                    n
            }
        }
        class ch {
            constructor(e, t) {
                this.name = e,
                    this.ast = t,
                    this.transitionFactories = [],
                    this.states = {},
                    t.states.forEach(e => {
                            this.states[e.name] = new lh(e.style,e.options && e.options.params || {})
                        }
                    ),
                    uh(this.states, "true", "1"),
                    uh(this.states, "false", "0"),
                    t.transitions.forEach(t => {
                            this.transitionFactories.push(new ah(e,t,this.states))
                        }
                    ),
                    this.fallbackTransition = new ah(e,{
                        type: 1,
                        animation: {
                            type: 2,
                            steps: [],
                            options: null
                        },
                        matchers: [ (e, t) => !0],
                        options: null,
                        queryCount: 0,
                        depCount: 0
                    },this.states)
            }
            get containsQueries() {
                return this.ast.queryCount > 0
            }
            matchTransition(e, t, n, s) {
                return this.transitionFactories.find(r => r.match(e, t, n, s)) || null
            }
            matchStyles(e, t, n) {
                return this.fallbackTransition.buildStyles(e, t, n)
            }
        }
        function uh(e, t, n) {
            e.hasOwnProperty(t) ? e.hasOwnProperty(n) || (e[n] = e[t]) : e.hasOwnProperty(n) && (e[t] = e[n])
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const hh = new Gu;
        class dh {
            constructor(e, t, n) {
                this.bodyNode = e,
                    this._driver = t,
                    this._normalizer = n,
                    this._animations = {},
                    this._playersById = {},
                    this.players = []
            }
            register(e, t) {
                const n = []
                    , s = Lu(this._driver, t, n);
                if (n.length)
                    throw new Error("Unable to build the animation due to the following errors: " + n.join("\n"));
                this._animations[e] = s
            }
            _buildPlayer(e, t, n) {
                const s = e.element
                    , r = Zc(0, this._normalizer, 0, e.keyframes, t, n);
                return this._driver.animate(s, r, e.duration, e.delay, e.easing, [], !0)
            }
            create(e, t, n={}) {
                const s = []
                    , r = this._animations[e];
                let i;
                const o = new Map;
                if (r ? (i = Zu(this._driver, t, r, "ng-enter", "ng-leave", {}, {}, n, hh, s),
                    i.forEach(e => {
                            const t = Xc(o, e.element, {});
                            e.postStyleProps.forEach(e => t[e] = null)
                        }
                    )) : (s.push("The requested animation doesn't exist or has already been destroyed"),
                    i = []),
                    s.length)
                    throw new Error("Unable to create the animation due to the following errors: " + s.join("\n"));
                o.forEach( (e, t) => {
                        Object.keys(e).forEach(n => {
                                e[n] = this._driver.computeStyle(t, n, "*")
                            }
                        )
                    }
                );
                const a = Qc(i.map(e => {
                        const t = o.get(e.element);
                        return this._buildPlayer(e, {}, t)
                    }
                ));
                return this._playersById[e] = a,
                    a.onDestroy( () => this.destroy(e)),
                    this.players.push(a),
                    a
            }
            destroy(e) {
                const t = this._getPlayer(e);
                t.destroy(),
                    delete this._playersById[e];
                const n = this.players.indexOf(t);
                n >= 0 && this.players.splice(n, 1)
            }
            _getPlayer(e) {
                const t = this._playersById[e];
                if (!t)
                    throw new Error("Unable to find the timeline player referenced by " + e);
                return t
            }
            listen(e, t, n, s) {
                const r = Jc(t, "", "", "");
                return Kc(this._getPlayer(e), n, r, s),
                    () => {}
            }
            command(e, t, n, s) {
                if ("register" == n)
                    return void this.register(e, s[0]);
                if ("create" == n)
                    return void this.create(e, t, s[0] || {});
                const r = this._getPlayer(e);
                switch (n) {
                    case "play":
                        r.play();
                        break;
                    case "pause":
                        r.pause();
                        break;
                    case "reset":
                        r.reset();
                        break;
                    case "restart":
                        r.restart();
                        break;
                    case "finish":
                        r.finish();
                        break;
                    case "init":
                        r.init();
                        break;
                    case "setPosition":
                        r.setPosition(parseFloat(s[0]));
                        break;
                    case "destroy":
                        this.destroy(e)
                }
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const ph = []
            , fh = {
            namespaceId: "",
            setForRemoval: !1,
            setForMove: !1,
            hasAnimation: !1,
            removedBeforeQueried: !1
        }
            , mh = {
            namespaceId: "",
            setForMove: !1,
            setForRemoval: !1,
            hasAnimation: !1,
            removedBeforeQueried: !0
        };
        class gh {
            constructor(e, t="") {
                this.namespaceId = t;
                const n = e && e.hasOwnProperty("value");
                if (this.value = null != (s = n ? e.value : e) ? s : null,
                    n) {
                    const t = yu(e);
                    delete t.value,
                        this.options = t
                } else
                    this.options = {};
                var s;
                this.options.params || (this.options.params = {})
            }
            get params() {
                return this.options.params
            }
            absorbOptions(e) {
                const t = e.params;
                if (t) {
                    const e = this.options.params;
                    Object.keys(t).forEach(n => {
                            null == e[n] && (e[n] = t[n])
                        }
                    )
                }
            }
        }
        const yh = new gh("void");
        class _h {
            constructor(e, t, n) {
                this.id = e,
                    this.hostElement = t,
                    this._engine = n,
                    this.players = [],
                    this._triggers = {},
                    this._queue = [],
                    this._elementListeners = new Map,
                    this._hostClassName = "ng-tns-" + e,
                    xh(t, this._hostClassName)
            }
            listen(e, t, n, s) {
                if (!this._triggers.hasOwnProperty(t))
                    throw new Error(`Unable to listen on the animation trigger event "${n}" because the animation trigger "${t}" doesn't exist!`);
                if (null == n || 0 == n.length)
                    throw new Error(`Unable to listen on the animation trigger "${t}" because the provided event is undefined!`);
                if ("start" != (r = n) && "done" != r)
                    throw new Error(`The provided animation trigger event "${n}" for the animation trigger "${t}" is not supported!`);
                var r;
                const i = Xc(this._elementListeners, e, [])
                    , o = {
                    name: t,
                    phase: n,
                    callback: s
                };
                i.push(o);
                const a = Xc(this._engine.statesByElement, e, {});
                return a.hasOwnProperty(t) || (xh(e, "ng-trigger"),
                    xh(e, "ng-trigger-" + t),
                    a[t] = yh),
                    () => {
                        this._engine.afterFlush( () => {
                                const e = i.indexOf(o);
                                e >= 0 && i.splice(e, 1),
                                this._triggers[t] || delete a[t]
                            }
                        )
                    }
            }
            register(e, t) {
                return !this._triggers[e] && (this._triggers[e] = t,
                    !0)
            }
            _getTrigger(e) {
                const t = this._triggers[e];
                if (!t)
                    throw new Error(`The provided animation trigger "${e}" has not been registered!`);
                return t
            }
            trigger(e, t, n, s=!0) {
                const r = this._getTrigger(t)
                    , i = new vh(this.id,t,e);
                let o = this._engine.statesByElement.get(e);
                o || (xh(e, "ng-trigger"),
                    xh(e, "ng-trigger-" + t),
                    this._engine.statesByElement.set(e, o = {}));
                let a = o[t];
                const l = new gh(n,this.id);
                if (!(n && n.hasOwnProperty("value")) && a && l.absorbOptions(a.options),
                    o[t] = l,
                a || (a = yh),
                "void" !== l.value && a.value === l.value) {
                    if (!function(e, t) {
                        const n = Object.keys(e)
                            , s = Object.keys(t);
                        if (n.length != s.length)
                            return !1;
                        for (let r = 0; r < n.length; r++) {
                            const s = n[r];
                            if (!t.hasOwnProperty(s) || e[s] !== t[s])
                                return !1
                        }
                        return !0
                    }(a.params, l.params)) {
                        const t = []
                            , n = r.matchStyles(a.value, a.params, t)
                            , s = r.matchStyles(l.value, l.params, t);
                        t.length ? this._engine.reportError(t) : this._engine.afterFlush( () => {
                                Eu(e, n),
                                    wu(e, s)
                            }
                        )
                    }
                    return
                }
                const c = Xc(this._engine.playersByElement, e, []);
                c.forEach(e => {
                        e.namespaceId == this.id && e.triggerName == t && e.queued && e.destroy()
                    }
                );
                let u = r.matchTransition(a.value, l.value, e, l.params)
                    , h = !1;
                if (!u) {
                    if (!s)
                        return;
                    u = r.fallbackTransition,
                        h = !0
                }
                return this._engine.totalQueuedPlayers++,
                    this._queue.push({
                        element: e,
                        triggerName: t,
                        transition: u,
                        fromState: a,
                        toState: l,
                        player: i,
                        isFallbackTransition: h
                    }),
                h || (xh(e, "ng-animate-queued"),
                    i.onStart( () => {
                            Th(e, "ng-animate-queued")
                        }
                    )),
                    i.onDone( () => {
                            let t = this.players.indexOf(i);
                            t >= 0 && this.players.splice(t, 1);
                            const n = this._engine.playersByElement.get(e);
                            if (n) {
                                let e = n.indexOf(i);
                                e >= 0 && n.splice(e, 1)
                            }
                        }
                    ),
                    this.players.push(i),
                    c.push(i),
                    i
            }
            deregister(e) {
                delete this._triggers[e],
                    this._engine.statesByElement.forEach( (t, n) => {
                            delete t[e]
                        }
                    ),
                    this._elementListeners.forEach( (t, n) => {
                            this._elementListeners.set(n, t.filter(t => t.name != e))
                        }
                    )
            }
            clearElementCache(e) {
                this._engine.statesByElement.delete(e),
                    this._elementListeners.delete(e);
                const t = this._engine.playersByElement.get(e);
                t && (t.forEach(e => e.destroy()),
                    this._engine.playersByElement.delete(e))
            }
            _signalRemovalForInnerTriggers(e, t) {
                const n = this._engine.driver.query(e, ".ng-trigger", !0);
                n.forEach(e => {
                        if (e.__ng_removed)
                            return;
                        const n = this._engine.fetchNamespacesByElement(e);
                        n.size ? n.forEach(n => n.triggerLeaveAnimation(e, t, !1, !0)) : this.clearElementCache(e)
                    }
                ),
                    this._engine.afterFlushAnimationsDone( () => n.forEach(e => this.clearElementCache(e)))
            }
            triggerLeaveAnimation(e, t, n, s) {
                const r = this._engine.statesByElement.get(e);
                if (r) {
                    const i = [];
                    if (Object.keys(r).forEach(t => {
                            if (this._triggers[t]) {
                                const n = this.trigger(e, t, "void", s);
                                n && i.push(n)
                            }
                        }
                    ),
                        i.length)
                        return this._engine.markElementAsRemoved(this.id, e, !0, t),
                        n && Qc(i).onDone( () => this._engine.processLeaveNode(e)),
                            !0
                }
                return !1
            }
            prepareLeaveAnimationListeners(e) {
                const t = this._elementListeners.get(e);
                if (t) {
                    const n = new Set;
                    t.forEach(t => {
                            const s = t.name;
                            if (n.has(s))
                                return;
                            n.add(s);
                            const r = this._triggers[s].fallbackTransition
                                , i = this._engine.statesByElement.get(e)[s] || yh
                                , o = new gh("void")
                                , a = new vh(this.id,s,e);
                            this._engine.totalQueuedPlayers++,
                                this._queue.push({
                                    element: e,
                                    triggerName: s,
                                    transition: r,
                                    fromState: i,
                                    toState: o,
                                    player: a,
                                    isFallbackTransition: !0
                                })
                        }
                    )
                }
            }
            removeNode(e, t) {
                const n = this._engine;
                if (e.childElementCount && this._signalRemovalForInnerTriggers(e, t),
                    this.triggerLeaveAnimation(e, t, !0))
                    return;
                let s = !1;
                if (n.totalAnimations) {
                    const t = n.players.length ? n.playersByQueriedElement.get(e) : [];
                    if (t && t.length)
                        s = !0;
                    else {
                        let t = e;
                        for (; t = t.parentNode; )
                            if (n.statesByElement.get(t)) {
                                s = !0;
                                break
                            }
                    }
                }
                if (this.prepareLeaveAnimationListeners(e),
                    s)
                    n.markElementAsRemoved(this.id, e, !1, t);
                else {
                    const s = e.__ng_removed;
                    s && s !== fh || (n.afterFlush( () => this.clearElementCache(e)),
                        n.destroyInnerAnimations(e),
                        n._onRemovalComplete(e, t))
                }
            }
            insertNode(e, t) {
                xh(e, this._hostClassName)
            }
            drainQueuedTransitions(e) {
                const t = [];
                return this._queue.forEach(n => {
                        const s = n.player;
                        if (s.destroyed)
                            return;
                        const r = n.element
                            , i = this._elementListeners.get(r);
                        i && i.forEach(t => {
                                if (t.name == n.triggerName) {
                                    const s = Jc(r, n.triggerName, n.fromState.value, n.toState.value);
                                    s._data = e,
                                        Kc(n.player, t.phase, s, t.callback)
                                }
                            }
                        ),
                            s.markedForDestroy ? this._engine.afterFlush( () => {
                                    s.destroy()
                                }
                            ) : t.push(n)
                    }
                ),
                    this._queue = [],
                    t.sort( (e, t) => {
                            const n = e.transition.ast.depCount
                                , s = t.transition.ast.depCount;
                            return 0 == n || 0 == s ? n - s : this._engine.driver.containsElement(e.element, t.element) ? 1 : -1
                        }
                    )
            }
            destroy(e) {
                this.players.forEach(e => e.destroy()),
                    this._signalRemovalForInnerTriggers(this.hostElement, e)
            }
            elementContainsData(e) {
                let t = !1;
                return this._elementListeners.has(e) && (t = !0),
                    t = !!this._queue.find(t => t.element === e) || t,
                    t
            }
        }
        class bh {
            constructor(e, t, n) {
                this.bodyNode = e,
                    this.driver = t,
                    this._normalizer = n,
                    this.players = [],
                    this.newHostElements = new Map,
                    this.playersByElement = new Map,
                    this.playersByQueriedElement = new Map,
                    this.statesByElement = new Map,
                    this.disabledNodes = new Set,
                    this.totalAnimations = 0,
                    this.totalQueuedPlayers = 0,
                    this._namespaceLookup = {},
                    this._namespaceList = [],
                    this._flushFns = [],
                    this._whenQuietFns = [],
                    this.namespacesByHostElement = new Map,
                    this.collectedEnterElements = [],
                    this.collectedLeaveElements = [],
                    this.onRemovalComplete = (e, t) => {}
            }
            _onRemovalComplete(e, t) {
                this.onRemovalComplete(e, t)
            }
            get queuedPlayers() {
                const e = [];
                return this._namespaceList.forEach(t => {
                        t.players.forEach(t => {
                                t.queued && e.push(t)
                            }
                        )
                    }
                ),
                    e
            }
            createNamespace(e, t) {
                const n = new _h(e,t,this);
                return t.parentNode ? this._balanceNamespaceList(n, t) : (this.newHostElements.set(t, n),
                    this.collectEnterElement(t)),
                    this._namespaceLookup[e] = n
            }
            _balanceNamespaceList(e, t) {
                const n = this._namespaceList.length - 1;
                if (n >= 0) {
                    let s = !1;
                    for (let r = n; r >= 0; r--)
                        if (this.driver.containsElement(this._namespaceList[r].hostElement, t)) {
                            this._namespaceList.splice(r + 1, 0, e),
                                s = !0;
                            break
                        }
                    s || this._namespaceList.splice(0, 0, e)
                } else
                    this._namespaceList.push(e);
                return this.namespacesByHostElement.set(t, e),
                    e
            }
            register(e, t) {
                let n = this._namespaceLookup[e];
                return n || (n = this.createNamespace(e, t)),
                    n
            }
            registerTrigger(e, t, n) {
                let s = this._namespaceLookup[e];
                s && s.register(t, n) && this.totalAnimations++
            }
            destroy(e, t) {
                if (!e)
                    return;
                const n = this._fetchNamespace(e);
                this.afterFlush( () => {
                        this.namespacesByHostElement.delete(n.hostElement),
                            delete this._namespaceLookup[e];
                        const t = this._namespaceList.indexOf(n);
                        t >= 0 && this._namespaceList.splice(t, 1)
                    }
                ),
                    this.afterFlushAnimationsDone( () => n.destroy(t))
            }
            _fetchNamespace(e) {
                return this._namespaceLookup[e]
            }
            fetchNamespacesByElement(e) {
                const t = new Set
                    , n = this.statesByElement.get(e);
                if (n) {
                    const e = Object.keys(n);
                    for (let s = 0; s < e.length; s++) {
                        const r = n[e[s]].namespaceId;
                        if (r) {
                            const e = this._fetchNamespace(r);
                            e && t.add(e)
                        }
                    }
                }
                return t
            }
            trigger(e, t, n, s) {
                if (wh(t)) {
                    const r = this._fetchNamespace(e);
                    if (r)
                        return r.trigger(t, n, s),
                            !0
                }
                return !1
            }
            insertNode(e, t, n, s) {
                if (!wh(t))
                    return;
                const r = t.__ng_removed;
                if (r && r.setForRemoval) {
                    r.setForRemoval = !1,
                        r.setForMove = !0;
                    const e = this.collectedLeaveElements.indexOf(t);
                    e >= 0 && this.collectedLeaveElements.splice(e, 1)
                }
                if (e) {
                    const s = this._fetchNamespace(e);
                    s && s.insertNode(t, n)
                }
                s && this.collectEnterElement(t)
            }
            collectEnterElement(e) {
                this.collectedEnterElements.push(e)
            }
            markElementAsDisabled(e, t) {
                t ? this.disabledNodes.has(e) || (this.disabledNodes.add(e),
                    xh(e, "ng-animate-disabled")) : this.disabledNodes.has(e) && (this.disabledNodes.delete(e),
                    Th(e, "ng-animate-disabled"))
            }
            removeNode(e, t, n, s) {
                if (wh(t)) {
                    const r = e ? this._fetchNamespace(e) : null;
                    if (r ? r.removeNode(t, s) : this.markElementAsRemoved(e, t, !1, s),
                        n) {
                        const n = this.namespacesByHostElement.get(t);
                        n && n.id !== e && n.removeNode(t, s)
                    }
                } else
                    this._onRemovalComplete(t, s)
            }
            markElementAsRemoved(e, t, n, s) {
                this.collectedLeaveElements.push(t),
                    t.__ng_removed = {
                        namespaceId: e,
                        setForRemoval: s,
                        hasAnimation: n,
                        removedBeforeQueried: !1
                    }
            }
            listen(e, t, n, s, r) {
                return wh(t) ? this._fetchNamespace(e).listen(t, n, s, r) : () => {}
            }
            _buildInstruction(e, t, n, s, r) {
                return e.transition.build(this.driver, e.element, e.fromState.value, e.toState.value, n, s, e.fromState.options, e.toState.options, t, r)
            }
            destroyInnerAnimations(e) {
                let t = this.driver.query(e, ".ng-trigger", !0);
                t.forEach(e => this.destroyActiveAnimationsForElement(e)),
                0 != this.playersByQueriedElement.size && (t = this.driver.query(e, ".ng-animating", !0),
                    t.forEach(e => this.finishActiveQueriedAnimationOnElement(e)))
            }
            destroyActiveAnimationsForElement(e) {
                const t = this.playersByElement.get(e);
                t && t.forEach(e => {
                        e.queued ? e.markedForDestroy = !0 : e.destroy()
                    }
                )
            }
            finishActiveQueriedAnimationOnElement(e) {
                const t = this.playersByQueriedElement.get(e);
                t && t.forEach(e => e.finish())
            }
            whenRenderingDone() {
                return new Promise(e => {
                        if (this.players.length)
                            return Qc(this.players).onDone( () => e());
                        e()
                    }
                )
            }
            processLeaveNode(e) {
                const t = e.__ng_removed;
                if (t && t.setForRemoval) {
                    if (e.__ng_removed = fh,
                        t.namespaceId) {
                        this.destroyInnerAnimations(e);
                        const n = this._fetchNamespace(t.namespaceId);
                        n && n.clearElementCache(e)
                    }
                    this._onRemovalComplete(e, t.setForRemoval)
                }
                this.driver.matchesElement(e, ".ng-animate-disabled") && this.markElementAsDisabled(e, !1),
                    this.driver.query(e, ".ng-animate-disabled", !0).forEach(e => {
                            this.markElementAsDisabled(e, !1)
                        }
                    )
            }
            flush(e=-1) {
                let t = [];
                if (this.newHostElements.size && (this.newHostElements.forEach( (e, t) => this._balanceNamespaceList(e, t)),
                    this.newHostElements.clear()),
                this.totalAnimations && this.collectedEnterElements.length)
                    for (let n = 0; n < this.collectedEnterElements.length; n++)
                        xh(this.collectedEnterElements[n], "ng-star-inserted");
                if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
                    const n = [];
                    try {
                        t = this._flushAnimations(n, e)
                    } finally {
                        for (let e = 0; e < n.length; e++)
                            n[e]()
                    }
                } else
                    for (let n = 0; n < this.collectedLeaveElements.length; n++)
                        this.processLeaveNode(this.collectedLeaveElements[n]);
                if (this.totalQueuedPlayers = 0,
                    this.collectedEnterElements.length = 0,
                    this.collectedLeaveElements.length = 0,
                    this._flushFns.forEach(e => e()),
                    this._flushFns = [],
                    this._whenQuietFns.length) {
                    const e = this._whenQuietFns;
                    this._whenQuietFns = [],
                        t.length ? Qc(t).onDone( () => {
                                e.forEach(e => e())
                            }
                        ) : e.forEach(e => e())
                }
            }
            reportError(e) {
                throw new Error("Unable to process animations due to the following failed trigger transitions\n " + e.join("\n"))
            }
            _flushAnimations(e, t) {
                const n = new Gu
                    , s = []
                    , r = new Map
                    , i = []
                    , o = new Map
                    , a = new Map
                    , l = new Map
                    , c = new Set;
                this.disabledNodes.forEach(e => {
                        c.add(e);
                        const t = this.driver.query(e, ".ng-animate-queued", !0);
                        for (let n = 0; n < t.length; n++)
                            c.add(t[n])
                    }
                );
                const u = this.bodyNode
                    , h = Array.from(this.statesByElement.keys())
                    , d = Sh(h, this.collectedEnterElements)
                    , p = new Map;
                let f = 0;
                d.forEach( (e, t) => {
                        const n = "ng-enter" + f++;
                        p.set(t, n),
                            e.forEach(e => xh(e, n))
                    }
                );
                const m = []
                    , g = new Set
                    , y = new Set;
                for (let O = 0; O < this.collectedLeaveElements.length; O++) {
                    const e = this.collectedLeaveElements[O]
                        , t = e.__ng_removed;
                    t && t.setForRemoval && (m.push(e),
                        g.add(e),
                        t.hasAnimation ? this.driver.query(e, ".ng-star-inserted", !0).forEach(e => g.add(e)) : y.add(e))
                }
                const _ = new Map
                    , b = Sh(h, Array.from(g));
                b.forEach( (e, t) => {
                        const n = "ng-leave" + f++;
                        _.set(t, n),
                            e.forEach(e => xh(e, n))
                    }
                ),
                    e.push( () => {
                            d.forEach( (e, t) => {
                                    const n = p.get(t);
                                    e.forEach(e => Th(e, n))
                                }
                            ),
                                b.forEach( (e, t) => {
                                        const n = _.get(t);
                                        e.forEach(e => Th(e, n))
                                    }
                                ),
                                m.forEach(e => {
                                        this.processLeaveNode(e)
                                    }
                                )
                        }
                    );
                const v = []
                    , w = [];
                for (let O = this._namespaceList.length - 1; O >= 0; O--)
                    this._namespaceList[O].drainQueuedTransitions(t).forEach(e => {
                            const t = e.player
                                , r = e.element;
                            if (v.push(t),
                                this.collectedEnterElements.length) {
                                const e = r.__ng_removed;
                                if (e && e.setForMove)
                                    return void t.destroy()
                            }
                            const c = !u || !this.driver.containsElement(u, r)
                                , h = _.get(r)
                                , d = p.get(r)
                                , f = this._buildInstruction(e, n, d, h, c);
                            if (f.errors && f.errors.length)
                                w.push(f);
                            else {
                                if (c)
                                    return t.onStart( () => Eu(r, f.fromStyles)),
                                        t.onDestroy( () => wu(r, f.toStyles)),
                                        void s.push(t);
                                if (e.isFallbackTransition)
                                    return t.onStart( () => Eu(r, f.fromStyles)),
                                        t.onDestroy( () => wu(r, f.toStyles)),
                                        void s.push(t);
                                f.timelines.forEach(e => e.stretchStartingKeyframe = !0),
                                    n.append(r, f.timelines),
                                    i.push({
                                        instruction: f,
                                        player: t,
                                        element: r
                                    }),
                                    f.queriedElements.forEach(e => Xc(o, e, []).push(t)),
                                    f.preStyleProps.forEach( (e, t) => {
                                            const n = Object.keys(e);
                                            if (n.length) {
                                                let e = a.get(t);
                                                e || a.set(t, e = new Set),
                                                    n.forEach(t => e.add(t))
                                            }
                                        }
                                    ),
                                    f.postStyleProps.forEach( (e, t) => {
                                            const n = Object.keys(e);
                                            let s = l.get(t);
                                            s || l.set(t, s = new Set),
                                                n.forEach(e => s.add(e))
                                        }
                                    )
                            }
                        }
                    );
                if (w.length) {
                    const e = [];
                    w.forEach(t => {
                            e.push(`@${t.triggerName} has failed due to:\n`),
                                t.errors.forEach(t => e.push(`- ${t}\n`))
                        }
                    ),
                        v.forEach(e => e.destroy()),
                        this.reportError(e)
                }
                const E = new Map
                    , C = new Map;
                i.forEach(e => {
                        const t = e.element;
                        n.has(t) && (C.set(t, t),
                            this._beforeAnimationBuild(e.player.namespaceId, e.instruction, E))
                    }
                ),
                    s.forEach(e => {
                            const t = e.element;
                            this._getPreviousPlayers(t, !1, e.namespaceId, e.triggerName, null).forEach(e => {
                                    Xc(E, t, []).push(e),
                                        e.destroy()
                                }
                            )
                        }
                    );
                const S = m.filter(e => Ih(e, a, l))
                    , x = new Map;
                Ch(x, this.driver, y, l, "*").forEach(e => {
                        Ih(e, a, l) && S.push(e)
                    }
                );
                const T = new Map;
                d.forEach( (e, t) => {
                        Ch(T, this.driver, new Set(e), a, "!")
                    }
                ),
                    S.forEach(e => {
                            const t = x.get(e)
                                , n = T.get(e);
                            x.set(e, Object.assign(Object.assign({}, t), n))
                        }
                    );
                const k = []
                    , I = []
                    , A = {};
                i.forEach(e => {
                        const {element: t, player: i, instruction: o} = e;
                        if (n.has(t)) {
                            if (c.has(t))
                                return i.onDestroy( () => wu(t, o.toStyles)),
                                    i.disabled = !0,
                                    i.overrideTotalTime(o.totalTime),
                                    void s.push(i);
                            let e = A;
                            if (C.size > 1) {
                                let n = t;
                                const s = [];
                                for (; n = n.parentNode; ) {
                                    const t = C.get(n);
                                    if (t) {
                                        e = t;
                                        break
                                    }
                                    s.push(n)
                                }
                                s.forEach(t => C.set(t, e))
                            }
                            const n = this._buildAnimation(i.namespaceId, o, E, r, T, x);
                            if (i.setRealPlayer(n),
                            e === A)
                                k.push(i);
                            else {
                                const t = this.playersByElement.get(e);
                                t && t.length && (i.parentPlayer = Qc(t)),
                                    s.push(i)
                            }
                        } else
                            Eu(t, o.fromStyles),
                                i.onDestroy( () => wu(t, o.toStyles)),
                                I.push(i),
                            c.has(t) && s.push(i)
                    }
                ),
                    I.forEach(e => {
                            const t = r.get(e.element);
                            if (t && t.length) {
                                const n = Qc(t);
                                e.setRealPlayer(n)
                            }
                        }
                    ),
                    s.forEach(e => {
                            e.parentPlayer ? e.syncPlayerEvents(e.parentPlayer) : e.destroy()
                        }
                    );
                for (let O = 0; O < m.length; O++) {
                    const e = m[O]
                        , t = e.__ng_removed;
                    if (Th(e, "ng-leave"),
                    t && t.hasAnimation)
                        continue;
                    let n = [];
                    if (o.size) {
                        let t = o.get(e);
                        t && t.length && n.push(...t);
                        let s = this.driver.query(e, ".ng-animating", !0);
                        for (let e = 0; e < s.length; e++) {
                            let t = o.get(s[e]);
                            t && t.length && n.push(...t)
                        }
                    }
                    const s = n.filter(e => !e.destroyed);
                    s.length ? kh(this, e, s) : this.processLeaveNode(e)
                }
                return m.length = 0,
                    k.forEach(e => {
                            this.players.push(e),
                                e.onDone( () => {
                                        e.destroy();
                                        const t = this.players.indexOf(e);
                                        this.players.splice(t, 1)
                                    }
                                ),
                                e.play()
                        }
                    ),
                    k
            }
            elementContainsData(e, t) {
                let n = !1;
                const s = t.__ng_removed;
                return s && s.setForRemoval && (n = !0),
                this.playersByElement.has(t) && (n = !0),
                this.playersByQueriedElement.has(t) && (n = !0),
                this.statesByElement.has(t) && (n = !0),
                this._fetchNamespace(e).elementContainsData(t) || n
            }
            afterFlush(e) {
                this._flushFns.push(e)
            }
            afterFlushAnimationsDone(e) {
                this._whenQuietFns.push(e)
            }
            _getPreviousPlayers(e, t, n, s, r) {
                let i = [];
                if (t) {
                    const t = this.playersByQueriedElement.get(e);
                    t && (i = t)
                } else {
                    const t = this.playersByElement.get(e);
                    if (t) {
                        const e = !r || "void" == r;
                        t.forEach(t => {
                                t.queued || (e || t.triggerName == s) && i.push(t)
                            }
                        )
                    }
                }
                return (n || s) && (i = i.filter(e => !(n && n != e.namespaceId || s && s != e.triggerName))),
                    i
            }
            _beforeAnimationBuild(e, t, n) {
                const s = t.element
                    , r = t.isRemovalTransition ? void 0 : e
                    , i = t.isRemovalTransition ? void 0 : t.triggerName;
                for (const o of t.timelines) {
                    const e = o.element
                        , a = e !== s
                        , l = Xc(n, e, []);
                    this._getPreviousPlayers(e, a, r, i, t.toState).forEach(e => {
                            const t = e.getRealPlayer();
                            t.beforeDestroy && t.beforeDestroy(),
                                e.destroy(),
                                l.push(e)
                        }
                    )
                }
                Eu(s, t.fromStyles)
            }
            _buildAnimation(e, t, n, s, r, i) {
                const o = t.triggerName
                    , a = t.element
                    , l = []
                    , c = new Set
                    , u = new Set
                    , h = t.timelines.map(t => {
                        const h = t.element;
                        c.add(h);
                        const d = h.__ng_removed;
                        if (d && d.removedBeforeQueried)
                            return new Uc(t.duration,t.delay);
                        const p = h !== a
                            , f = function(e) {
                            const t = [];
                            return function e(t, n) {
                                for (let s = 0; s < t.length; s++) {
                                    const r = t[s];
                                    r instanceof Gc ? e(r.players, n) : n.push(r)
                                }
                            }(e, t),
                                t
                        }((n.get(h) || ph).map(e => e.getRealPlayer())).filter(e => !!e.element && e.element === h)
                            , m = r.get(h)
                            , g = i.get(h)
                            , y = Zc(0, this._normalizer, 0, t.keyframes, m, g)
                            , _ = this._buildPlayer(t, y, f);
                        if (t.subTimeline && s && u.add(h),
                            p) {
                            const t = new vh(e,o,h);
                            t.setRealPlayer(_),
                                l.push(t)
                        }
                        return _
                    }
                );
                l.forEach(e => {
                        Xc(this.playersByQueriedElement, e.element, []).push(e),
                            e.onDone( () => function(e, t, n) {
                                let s;
                                if (e instanceof Map) {
                                    if (s = e.get(t),
                                        s) {
                                        if (s.length) {
                                            const e = s.indexOf(n);
                                            s.splice(e, 1)
                                        }
                                        0 == s.length && e.delete(t)
                                    }
                                } else if (s = e[t],
                                    s) {
                                    if (s.length) {
                                        const e = s.indexOf(n);
                                        s.splice(e, 1)
                                    }
                                    0 == s.length && delete e[t]
                                }
                                return s
                            }(this.playersByQueriedElement, e.element, e))
                    }
                ),
                    c.forEach(e => xh(e, "ng-animating"));
                const d = Qc(h);
                return d.onDestroy( () => {
                        c.forEach(e => Th(e, "ng-animating")),
                            wu(a, t.toStyles)
                    }
                ),
                    u.forEach(e => {
                            Xc(s, e, []).push(d)
                        }
                    ),
                    d
            }
            _buildPlayer(e, t, n) {
                return t.length > 0 ? this.driver.animate(e.element, t, e.duration, e.delay, e.easing, n) : new Uc(e.duration,e.delay)
            }
        }
        class vh {
            constructor(e, t, n) {
                this.namespaceId = e,
                    this.triggerName = t,
                    this.element = n,
                    this._player = new Uc,
                    this._containsRealPlayer = !1,
                    this._queuedCallbacks = {},
                    this.destroyed = !1,
                    this.markedForDestroy = !1,
                    this.disabled = !1,
                    this.queued = !0,
                    this.totalTime = 0
            }
            setRealPlayer(e) {
                this._containsRealPlayer || (this._player = e,
                    Object.keys(this._queuedCallbacks).forEach(t => {
                            this._queuedCallbacks[t].forEach(n => Kc(e, t, void 0, n))
                        }
                    ),
                    this._queuedCallbacks = {},
                    this._containsRealPlayer = !0,
                    this.overrideTotalTime(e.totalTime),
                    this.queued = !1)
            }
            getRealPlayer() {
                return this._player
            }
            overrideTotalTime(e) {
                this.totalTime = e
            }
            syncPlayerEvents(e) {
                const t = this._player;
                t.triggerCallback && e.onStart( () => t.triggerCallback("start")),
                    e.onDone( () => this.finish()),
                    e.onDestroy( () => this.destroy())
            }
            _queueEvent(e, t) {
                Xc(this._queuedCallbacks, e, []).push(t)
            }
            onDone(e) {
                this.queued && this._queueEvent("done", e),
                    this._player.onDone(e)
            }
            onStart(e) {
                this.queued && this._queueEvent("start", e),
                    this._player.onStart(e)
            }
            onDestroy(e) {
                this.queued && this._queueEvent("destroy", e),
                    this._player.onDestroy(e)
            }
            init() {
                this._player.init()
            }
            hasStarted() {
                return !this.queued && this._player.hasStarted()
            }
            play() {
                !this.queued && this._player.play()
            }
            pause() {
                !this.queued && this._player.pause()
            }
            restart() {
                !this.queued && this._player.restart()
            }
            finish() {
                this._player.finish()
            }
            destroy() {
                this.destroyed = !0,
                    this._player.destroy()
            }
            reset() {
                !this.queued && this._player.reset()
            }
            setPosition(e) {
                this.queued || this._player.setPosition(e)
            }
            getPosition() {
                return this.queued ? 0 : this._player.getPosition()
            }
            triggerCallback(e) {
                const t = this._player;
                t.triggerCallback && t.triggerCallback(e)
            }
        }
        function wh(e) {
            return e && 1 === e.nodeType
        }
        function Eh(e, t) {
            const n = e.style.display;
            return e.style.display = null != t ? t : "none",
                n
        }
        function Ch(e, t, n, s, r) {
            const i = [];
            n.forEach(e => i.push(Eh(e)));
            const o = [];
            s.forEach( (n, s) => {
                    const i = {};
                    n.forEach(e => {
                            const n = i[e] = t.computeStyle(s, e, r);
                            n && 0 != n.length || (s.__ng_removed = mh,
                                o.push(s))
                        }
                    ),
                        e.set(s, i)
                }
            );
            let a = 0;
            return n.forEach(e => Eh(e, i[a++])),
                o
        }
        function Sh(e, t) {
            const n = new Map;
            if (e.forEach(e => n.set(e, [])),
            0 == t.length)
                return n;
            const s = new Set(t)
                , r = new Map;
            return t.forEach(e => {
                    const t = function e(t) {
                        if (!t)
                            return 1;
                        let i = r.get(t);
                        if (i)
                            return i;
                        const o = t.parentNode;
                        return i = n.has(o) ? o : s.has(o) ? 1 : e(o),
                            r.set(t, i),
                            i
                    }(e);
                    1 !== t && n.get(t).push(e)
                }
            ),
                n
        }
        function xh(e, t) {
            if (e.classList)
                e.classList.add(t);
            else {
                let n = e.$$classes;
                n || (n = e.$$classes = {}),
                    n[t] = !0
            }
        }
        function Th(e, t) {
            if (e.classList)
                e.classList.remove(t);
            else {
                let n = e.$$classes;
                n && delete n[t]
            }
        }
        function kh(e, t, n) {
            Qc(n).onDone( () => e.processLeaveNode(t))
        }
        function Ih(e, t, n) {
            const s = n.get(e);
            if (!s)
                return !1;
            let r = t.get(e);
            return r ? s.forEach(e => r.add(e)) : t.set(e, s),
                n.delete(e),
                !0
        }
        class Ah {
            constructor(e, t, n) {
                this.bodyNode = e,
                    this._driver = t,
                    this._triggerCache = {},
                    this.onRemovalComplete = (e, t) => {}
                    ,
                    this._transitionEngine = new bh(e,t,n),
                    this._timelineEngine = new dh(e,t,n),
                    this._transitionEngine.onRemovalComplete = (e, t) => this.onRemovalComplete(e, t)
            }
            registerTrigger(e, t, n, s, r) {
                const i = e + "-" + s;
                let o = this._triggerCache[i];
                if (!o) {
                    const e = []
                        , t = Lu(this._driver, r, e);
                    if (e.length)
                        throw new Error(`The animation trigger "${s}" has failed to build due to the following errors:\n - ${e.join("\n - ")}`);
                    o = function(e, t) {
                        return new ch(e,t)
                    }(s, t),
                        this._triggerCache[i] = o
                }
                this._transitionEngine.registerTrigger(t, s, o)
            }
            register(e, t) {
                this._transitionEngine.register(e, t)
            }
            destroy(e, t) {
                this._transitionEngine.destroy(e, t)
            }
            onInsert(e, t, n, s) {
                this._transitionEngine.insertNode(e, t, n, s)
            }
            onRemove(e, t, n, s) {
                this._transitionEngine.removeNode(e, t, s || !1, n)
            }
            disableAnimations(e, t) {
                this._transitionEngine.markElementAsDisabled(e, t)
            }
            process(e, t, n, s) {
                if ("@" == n.charAt(0)) {
                    const [e,r] = eu(n);
                    this._timelineEngine.command(e, t, r, s)
                } else
                    this._transitionEngine.trigger(e, t, n, s)
            }
            listen(e, t, n, s, r) {
                if ("@" == n.charAt(0)) {
                    const [e,s] = eu(n);
                    return this._timelineEngine.listen(e, t, s, r)
                }
                return this._transitionEngine.listen(e, t, n, s, r)
            }
            flush(e=-1) {
                this._transitionEngine.flush(e)
            }
            get players() {
                return this._transitionEngine.players.concat(this._timelineEngine.players)
            }
            whenRenderingDone() {
                return this._transitionEngine.whenRenderingDone()
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Oh(e, t) {
            let n = null
                , s = null;
            return Array.isArray(t) && t.length ? (n = Dh(t[0]),
            t.length > 1 && (s = Dh(t[t.length - 1]))) : t && (n = Dh(t)),
                n || s ? new Nh(e,n,s) : null
        }
        let Nh = ( () => {
                class e {
                    constructor(t, n, s) {
                        this._element = t,
                            this._startStyles = n,
                            this._endStyles = s,
                            this._state = 0;
                        let r = e.initialStylesByElement.get(t);
                        r || e.initialStylesByElement.set(t, r = {}),
                            this._initialStyles = r
                    }
                    start() {
                        this._state < 1 && (this._startStyles && wu(this._element, this._startStyles, this._initialStyles),
                            this._state = 1)
                    }
                    finish() {
                        this.start(),
                        this._state < 2 && (wu(this._element, this._initialStyles),
                        this._endStyles && (wu(this._element, this._endStyles),
                            this._endStyles = null),
                            this._state = 1)
                    }
                    destroy() {
                        this.finish(),
                        this._state < 3 && (e.initialStylesByElement.delete(this._element),
                        this._startStyles && (Eu(this._element, this._startStyles),
                            this._endStyles = null),
                        this._endStyles && (Eu(this._element, this._endStyles),
                            this._endStyles = null),
                            wu(this._element, this._initialStyles),
                            this._state = 3)
                    }
                }
                return e.initialStylesByElement = new WeakMap,
                    e
            }
        )();
        function Dh(e) {
            let t = null;
            const n = Object.keys(e);
            for (let s = 0; s < n.length; s++) {
                const r = n[s];
                Fh(r) && (t = t || {},
                    t[r] = e[r])
            }
            return t
        }
        function Fh(e) {
            return "display" === e || "position" === e
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Ph {
            constructor(e, t, n, s, r, i, o) {
                this._element = e,
                    this._name = t,
                    this._duration = n,
                    this._delay = s,
                    this._easing = r,
                    this._fillMode = i,
                    this._onDoneFn = o,
                    this._finished = !1,
                    this._destroyed = !1,
                    this._startTime = 0,
                    this._position = 0,
                    this._eventFn = e => this._handleCallback(e)
            }
            apply() {
                !function(e, t) {
                    const n = Hh(e, "").trim();
                    n.length && (function(e, t) {
                        let n = 0;
                        for (let s = 0; s < e.length; s++)
                            "," === e.charAt(s) && n++
                    }(n),
                        t = `${n}, ${t}`),
                        Lh(e, "", t)
                }(this._element, `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`),
                    jh(this._element, this._eventFn, !1),
                    this._startTime = Date.now()
            }
            pause() {
                Mh(this._element, this._name, "paused")
            }
            resume() {
                Mh(this._element, this._name, "running")
            }
            setPosition(e) {
                const t = Vh(this._element, this._name);
                this._position = e * this._duration,
                    Lh(this._element, "Delay", `-${this._position}ms`, t)
            }
            getPosition() {
                return this._position
            }
            _handleCallback(e) {
                const t = e._ngTestManualTimestamp || Date.now()
                    , n = 1e3 * parseFloat(e.elapsedTime.toFixed(3));
                e.animationName == this._name && Math.max(t - this._startTime, 0) >= this._delay && n >= this._duration && this.finish()
            }
            finish() {
                this._finished || (this._finished = !0,
                    this._onDoneFn(),
                    jh(this._element, this._eventFn, !0))
            }
            destroy() {
                this._destroyed || (this._destroyed = !0,
                    this.finish(),
                    function(e, t) {
                        const n = Hh(e, "").split(",")
                            , s = Rh(n, t);
                        s >= 0 && (n.splice(s, 1),
                            Lh(e, "", n.join(",")))
                    }(this._element, this._name))
            }
        }
        function Mh(e, t, n) {
            Lh(e, "PlayState", n, Vh(e, t))
        }
        function Vh(e, t) {
            const n = Hh(e, "");
            return n.indexOf(",") > 0 ? Rh(n.split(","), t) : Rh([n], t)
        }
        function Rh(e, t) {
            for (let n = 0; n < e.length; n++)
                if (e[n].indexOf(t) >= 0)
                    return n;
            return -1
        }
        function jh(e, t, n) {
            n ? e.removeEventListener("animationend", t) : e.addEventListener("animationend", t)
        }
        function Lh(e, t, n, s) {
            const r = "animation" + t;
            if (null != s) {
                const t = e.style[r];
                if (t.length) {
                    const e = t.split(",");
                    e[s] = n,
                        n = e.join(",")
                }
            }
            e.style[r] = n
        }
        function Hh(e, t) {
            return e.style["animation" + t]
        }
        class Bh {
            constructor(e, t, n, s, r, i, o, a) {
                this.element = e,
                    this.keyframes = t,
                    this.animationName = n,
                    this._duration = s,
                    this._delay = r,
                    this._finalStyles = o,
                    this._specialStyles = a,
                    this._onDoneFns = [],
                    this._onStartFns = [],
                    this._onDestroyFns = [],
                    this._started = !1,
                    this.currentSnapshot = {},
                    this._state = 0,
                    this.easing = i || "linear",
                    this.totalTime = s + r,
                    this._buildStyler()
            }
            onStart(e) {
                this._onStartFns.push(e)
            }
            onDone(e) {
                this._onDoneFns.push(e)
            }
            onDestroy(e) {
                this._onDestroyFns.push(e)
            }
            destroy() {
                this.init(),
                this._state >= 4 || (this._state = 4,
                    this._styler.destroy(),
                    this._flushStartFns(),
                    this._flushDoneFns(),
                this._specialStyles && this._specialStyles.destroy(),
                    this._onDestroyFns.forEach(e => e()),
                    this._onDestroyFns = [])
            }
            _flushDoneFns() {
                this._onDoneFns.forEach(e => e()),
                    this._onDoneFns = []
            }
            _flushStartFns() {
                this._onStartFns.forEach(e => e()),
                    this._onStartFns = []
            }
            finish() {
                this.init(),
                this._state >= 3 || (this._state = 3,
                    this._styler.finish(),
                    this._flushStartFns(),
                this._specialStyles && this._specialStyles.finish(),
                    this._flushDoneFns())
            }
            setPosition(e) {
                this._styler.setPosition(e)
            }
            getPosition() {
                return this._styler.getPosition()
            }
            hasStarted() {
                return this._state >= 2
            }
            init() {
                this._state >= 1 || (this._state = 1,
                    this._styler.apply(),
                this._delay && this._styler.pause())
            }
            play() {
                this.init(),
                this.hasStarted() || (this._flushStartFns(),
                    this._state = 2,
                this._specialStyles && this._specialStyles.start()),
                    this._styler.resume()
            }
            pause() {
                this.init(),
                    this._styler.pause()
            }
            restart() {
                this.reset(),
                    this.play()
            }
            reset() {
                this._styler.destroy(),
                    this._buildStyler(),
                    this._styler.apply()
            }
            _buildStyler() {
                this._styler = new Ph(this.element,this.animationName,this._duration,this._delay,this.easing,"forwards", () => this.finish())
            }
            triggerCallback(e) {
                const t = "start" == e ? this._onStartFns : this._onDoneFns;
                t.forEach(e => e()),
                    t.length = 0
            }
            beforeDestroy() {
                this.init();
                const e = {};
                if (this.hasStarted()) {
                    const t = this._state >= 3;
                    Object.keys(this._finalStyles).forEach(n => {
                            "offset" != n && (e[n] = t ? this._finalStyles[n] : Fu(this.element, n))
                        }
                    )
                }
                this.currentSnapshot = e
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class $h extends Uc {
            constructor(e, t) {
                super(),
                    this.element = e,
                    this._startingStyles = {},
                    this.__initialized = !1,
                    this._styles = hu(t)
            }
            init() {
                !this.__initialized && this._startingStyles && (this.__initialized = !0,
                    Object.keys(this._styles).forEach(e => {
                            this._startingStyles[e] = this.element.style[e]
                        }
                    ),
                    super.init())
            }
            play() {
                this._startingStyles && (this.init(),
                    Object.keys(this._styles).forEach(e => this.element.style.setProperty(e, this._styles[e])),
                    super.play())
            }
            destroy() {
                this._startingStyles && (Object.keys(this._startingStyles).forEach(e => {
                        const t = this._startingStyles[e];
                        t ? this.element.style.setProperty(e, t) : this.element.style.removeProperty(e)
                    }
                ),
                    this._startingStyles = null,
                    super.destroy())
            }
        }
        class zh {
            constructor() {
                this._count = 0,
                    this._head = document.querySelector("head"),
                    this._warningIssued = !1
            }
            validateStyleProperty(e) {
                return au(e)
            }
            matchesElement(e, t) {
                return lu(e, t)
            }
            containsElement(e, t) {
                return cu(e, t)
            }
            query(e, t, n) {
                return uu(e, t, n)
            }
            computeStyle(e, t, n) {
                return window.getComputedStyle(e)[t]
            }
            buildKeyframeElement(e, t, n) {
                n = n.map(e => hu(e));
                let s = `@keyframes ${t} {\n`
                    , r = "";
                n.forEach(e => {
                        r = " ";
                        const t = parseFloat(e.offset);
                        s += `${r}${100 * t}% {\n`,
                            r += " ",
                            Object.keys(e).forEach(t => {
                                    const n = e[t];
                                    switch (t) {
                                        case "offset":
                                            return;
                                        case "easing":
                                            return void (n && (s += `${r}animation-timing-function: ${n};\n`));
                                        default:
                                            return void (s += `${r}${t}: ${n};\n`)
                                    }
                                }
                            ),
                            s += r + "}\n"
                    }
                ),
                    s += "}\n";
                const i = document.createElement("style");
                return i.innerHTML = s,
                    i
            }
            animate(e, t, n, s, r, i=[], o) {
                o && this._notifyFaultyScrubber();
                const a = i.filter(e => e instanceof Bh)
                    , l = {};
                Ou(n, s) && a.forEach(e => {
                        let t = e.currentSnapshot;
                        Object.keys(t).forEach(e => l[e] = t[e])
                    }
                );
                const c = function(e) {
                    let t = {};
                    return e && (Array.isArray(e) ? e : [e]).forEach(e => {
                            Object.keys(e).forEach(n => {
                                    "offset" != n && "easing" != n && (t[n] = e[n])
                                }
                            )
                        }
                    ),
                        t
                }(t = Nu(e, t, l));
                if (0 == n)
                    return new $h(e,c);
                const u = "gen_css_kf_" + this._count++
                    , h = this.buildKeyframeElement(e, u, t);
                document.querySelector("head").appendChild(h);
                const d = Oh(e, t)
                    , p = new Bh(e,t,u,n,s,r,c,d);
                return p.onDestroy( () => {
                        var e;
                        (e = h).parentNode.removeChild(e)
                    }
                ),
                    p
            }
            _notifyFaultyScrubber() {
                this._warningIssued || (console.warn("@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n", "  visit http://bit.ly/IWukam to learn more about using the web-animation-js polyfill."),
                    this._warningIssued = !0)
            }
        }
        class qh {
            constructor(e, t, n, s) {
                this.element = e,
                    this.keyframes = t,
                    this.options = n,
                    this._specialStyles = s,
                    this._onDoneFns = [],
                    this._onStartFns = [],
                    this._onDestroyFns = [],
                    this._initialized = !1,
                    this._finished = !1,
                    this._started = !1,
                    this._destroyed = !1,
                    this.time = 0,
                    this.parentPlayer = null,
                    this.currentSnapshot = {},
                    this._duration = n.duration,
                    this._delay = n.delay || 0,
                    this.time = this._duration + this._delay
            }
            _onFinish() {
                this._finished || (this._finished = !0,
                    this._onDoneFns.forEach(e => e()),
                    this._onDoneFns = [])
            }
            init() {
                this._buildPlayer(),
                    this._preparePlayerBeforeStart()
            }
            _buildPlayer() {
                if (this._initialized)
                    return;
                this._initialized = !0;
                const e = this.keyframes;
                this.domPlayer = this._triggerWebAnimation(this.element, e, this.options),
                    this._finalKeyframe = e.length ? e[e.length - 1] : {},
                    this.domPlayer.addEventListener("finish", () => this._onFinish())
            }
            _preparePlayerBeforeStart() {
                this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
            }
            _triggerWebAnimation(e, t, n) {
                return e.animate(t, n)
            }
            onStart(e) {
                this._onStartFns.push(e)
            }
            onDone(e) {
                this._onDoneFns.push(e)
            }
            onDestroy(e) {
                this._onDestroyFns.push(e)
            }
            play() {
                this._buildPlayer(),
                this.hasStarted() || (this._onStartFns.forEach(e => e()),
                    this._onStartFns = [],
                    this._started = !0,
                this._specialStyles && this._specialStyles.start()),
                    this.domPlayer.play()
            }
            pause() {
                this.init(),
                    this.domPlayer.pause()
            }
            finish() {
                this.init(),
                this._specialStyles && this._specialStyles.finish(),
                    this._onFinish(),
                    this.domPlayer.finish()
            }
            reset() {
                this._resetDomPlayerState(),
                    this._destroyed = !1,
                    this._finished = !1,
                    this._started = !1
            }
            _resetDomPlayerState() {
                this.domPlayer && this.domPlayer.cancel()
            }
            restart() {
                this.reset(),
                    this.play()
            }
            hasStarted() {
                return this._started
            }
            destroy() {
                this._destroyed || (this._destroyed = !0,
                    this._resetDomPlayerState(),
                    this._onFinish(),
                this._specialStyles && this._specialStyles.destroy(),
                    this._onDestroyFns.forEach(e => e()),
                    this._onDestroyFns = [])
            }
            setPosition(e) {
                this.domPlayer.currentTime = e * this.time
            }
            getPosition() {
                return this.domPlayer.currentTime / this.time
            }
            get totalTime() {
                return this._delay + this._duration
            }
            beforeDestroy() {
                const e = {};
                this.hasStarted() && Object.keys(this._finalKeyframe).forEach(t => {
                        "offset" != t && (e[t] = this._finished ? this._finalKeyframe[t] : Fu(this.element, t))
                    }
                ),
                    this.currentSnapshot = e
            }
            triggerCallback(e) {
                const t = "start" == e ? this._onStartFns : this._onDoneFns;
                t.forEach(e => e()),
                    t.length = 0
            }
        }
        class Uh {
            constructor() {
                this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(Gh().toString()),
                    this._cssKeyframesDriver = new zh
            }
            validateStyleProperty(e) {
                return au(e)
            }
            matchesElement(e, t) {
                return lu(e, t)
            }
            containsElement(e, t) {
                return cu(e, t)
            }
            query(e, t, n) {
                return uu(e, t, n)
            }
            computeStyle(e, t, n) {
                return window.getComputedStyle(e)[t]
            }
            overrideWebAnimationsSupport(e) {
                this._isNativeImpl = e
            }
            animate(e, t, n, s, r, i=[], o) {
                if (!o && !this._isNativeImpl)
                    return this._cssKeyframesDriver.animate(e, t, n, s, r, i);
                const a = {
                    duration: n,
                    delay: s,
                    fill: 0 == s ? "both" : "forwards"
                };
                r && (a.easing = r);
                const l = {}
                    , c = i.filter(e => e instanceof qh);
                Ou(n, s) && c.forEach(e => {
                        let t = e.currentSnapshot;
                        Object.keys(t).forEach(e => l[e] = t[e])
                    }
                );
                const u = Oh(e, t = Nu(e, t = t.map(e => _u(e, !1)), l));
                return new qh(e,t,a,u)
            }
        }
        function Gh() {
            return "undefined" != typeof window && void 0 !== window.document && Element.prototype.animate || {}
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license Angular v10.0.3
         * (c) 2010-2020 Google LLC. https://angular.io/
         * License: MIT
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        let Wh = ( () => {
                class e extends jc {
                    constructor(e, t) {
                        super(),
                            this._nextAnimationId = 0,
                            this._renderer = e.createRenderer(t.body, {
                                id: "0",
                                encapsulation: st.None,
                                styles: [],
                                data: {
                                    animation: []
                                }
                            })
                    }
                    build(e) {
                        const t = this._nextAnimationId.toString();
                        this._nextAnimationId++;
                        const n = Array.isArray(e) ? Bc(e) : e;
                        return Kh(this._renderer, null, t, "register", [n]),
                            new Qh(t,this._renderer)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(ko),Ue(xl))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        class Qh extends class {
        }
            /**
             * @license
             * Copyright Google LLC All Rights Reserved.
             *
             * Use of this source code is governed by an MIT-style license that can be
             * found in the LICENSE file at https://angular.io/license
             */
        {
            constructor(e, t) {
                super(),
                    this._id = e,
                    this._renderer = t
            }
            create(e, t) {
                return new Zh(this._id,e,t || {},this._renderer)
            }
        }
        class Zh {
            constructor(e, t, n, s) {
                this.id = e,
                    this.element = t,
                    this._renderer = s,
                    this.parentPlayer = null,
                    this._started = !1,
                    this.totalTime = 0,
                    this._command("create", n)
            }
            _listen(e, t) {
                return this._renderer.listen(this.element, `@@${this.id}:${e}`, t)
            }
            _command(e, ...t) {
                return Kh(this._renderer, this.element, this.id, e, t)
            }
            onDone(e) {
                this._listen("done", e)
            }
            onStart(e) {
                this._listen("start", e)
            }
            onDestroy(e) {
                this._listen("destroy", e)
            }
            init() {
                this._command("init")
            }
            hasStarted() {
                return this._started
            }
            play() {
                this._command("play"),
                    this._started = !0
            }
            pause() {
                this._command("pause")
            }
            restart() {
                this._command("restart")
            }
            finish() {
                this._command("finish")
            }
            destroy() {
                this._command("destroy")
            }
            reset() {
                this._command("reset")
            }
            setPosition(e) {
                this._command("setPosition", e)
            }
            getPosition() {
                return 0
            }
        }
        function Kh(e, t, n, s, r) {
            return e.setProperty(t, `@@${n}:${s}`, r)
        }
        let Yh = ( () => {
                class e {
                    constructor(e, t, n) {
                        this.delegate = e,
                            this.engine = t,
                            this._zone = n,
                            this._currentId = 0,
                            this._microtaskId = 1,
                            this._animationCallbacksBuffer = [],
                            this._rendererCache = new Map,
                            this._cdRecurDepth = 0,
                            this.promise = Promise.resolve(0),
                            t.onRemovalComplete = (e, t) => {
                                t && t.parentNode(e) && t.removeChild(e.parentNode, e)
                            }
                    }
                    createRenderer(e, t) {
                        const n = this.delegate.createRenderer(e, t);
                        if (!(e && t && t.data && t.data.animation)) {
                            let e = this._rendererCache.get(n);
                            return e || (e = new Jh("",n,this.engine),
                                this._rendererCache.set(n, e)),
                                e
                        }
                        const s = t.id
                            , r = t.id + "-" + this._currentId;
                        this._currentId++,
                            this.engine.register(r, e);
                        const i = t => {
                                Array.isArray(t) ? t.forEach(i) : this.engine.registerTrigger(s, r, e, t.name, t)
                            }
                        ;
                        return t.data.animation.forEach(i),
                            new Xh(this,r,n,this.engine)
                    }
                    begin() {
                        this._cdRecurDepth++,
                        this.delegate.begin && this.delegate.begin()
                    }
                    _scheduleCountTask() {
                        this.promise.then( () => {
                                this._microtaskId++
                            }
                        )
                    }
                    scheduleListenerCallback(e, t, n) {
                        e >= 0 && e < this._microtaskId ? this._zone.run( () => t(n)) : (0 == this._animationCallbacksBuffer.length && Promise.resolve(null).then( () => {
                                this._zone.run( () => {
                                        this._animationCallbacksBuffer.forEach(e => {
                                                const [t,n] = e;
                                                t(n)
                                            }
                                        ),
                                            this._animationCallbacksBuffer = []
                                    }
                                )
                            }
                        ),
                            this._animationCallbacksBuffer.push([t, n]))
                    }
                    end() {
                        this._cdRecurDepth--,
                        0 == this._cdRecurDepth && this._zone.runOutsideAngular( () => {
                                this._scheduleCountTask(),
                                    this.engine.flush(this._microtaskId)
                            }
                        ),
                        this.delegate.end && this.delegate.end()
                    }
                    whenRenderingDone() {
                        return this.engine.whenRenderingDone()
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(ko),Ue(Ah),Ue(el))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        class Jh {
            constructor(e, t, n) {
                this.namespaceId = e,
                    this.delegate = t,
                    this.engine = n,
                    this.destroyNode = this.delegate.destroyNode ? e => t.destroyNode(e) : null
            }
            get data() {
                return this.delegate.data
            }
            destroy() {
                this.engine.destroy(this.namespaceId, this.delegate),
                    this.delegate.destroy()
            }
            createElement(e, t) {
                return this.delegate.createElement(e, t)
            }
            createComment(e) {
                return this.delegate.createComment(e)
            }
            createText(e) {
                return this.delegate.createText(e)
            }
            appendChild(e, t) {
                this.delegate.appendChild(e, t),
                    this.engine.onInsert(this.namespaceId, t, e, !1)
            }
            insertBefore(e, t, n) {
                this.delegate.insertBefore(e, t, n),
                    this.engine.onInsert(this.namespaceId, t, e, !0)
            }
            removeChild(e, t, n) {
                this.engine.onRemove(this.namespaceId, t, this.delegate, n)
            }
            selectRootElement(e, t) {
                return this.delegate.selectRootElement(e, t)
            }
            parentNode(e) {
                return this.delegate.parentNode(e)
            }
            nextSibling(e) {
                return this.delegate.nextSibling(e)
            }
            setAttribute(e, t, n, s) {
                this.delegate.setAttribute(e, t, n, s)
            }
            removeAttribute(e, t, n) {
                this.delegate.removeAttribute(e, t, n)
            }
            addClass(e, t) {
                this.delegate.addClass(e, t)
            }
            removeClass(e, t) {
                this.delegate.removeClass(e, t)
            }
            setStyle(e, t, n, s) {
                this.delegate.setStyle(e, t, n, s)
            }
            removeStyle(e, t, n) {
                this.delegate.removeStyle(e, t, n)
            }
            setProperty(e, t, n) {
                "@" == t.charAt(0) && "@.disabled" == t ? this.disableAnimations(e, !!n) : this.delegate.setProperty(e, t, n)
            }
            setValue(e, t) {
                this.delegate.setValue(e, t)
            }
            listen(e, t, n) {
                return this.delegate.listen(e, t, n)
            }
            disableAnimations(e, t) {
                this.engine.disableAnimations(e, t)
            }
        }
        class Xh extends Jh {
            constructor(e, t, n, s) {
                super(t, n, s),
                    this.factory = e,
                    this.namespaceId = t
            }
            setProperty(e, t, n) {
                "@" == t.charAt(0) ? "." == t.charAt(1) && "@.disabled" == t ? this.disableAnimations(e, n = void 0 === n || !!n) : this.engine.process(this.namespaceId, e, t.substr(1), n) : this.delegate.setProperty(e, t, n)
            }
            listen(e, t, n) {
                if ("@" == t.charAt(0)) {
                    const s = function(e) {
                        switch (e) {
                            case "body":
                                return document.body;
                            case "document":
                                return document;
                            case "window":
                                return window;
                            default:
                                return e
                        }
                    }(e);
                    let r = t.substr(1)
                        , i = "";
                    return "@" != r.charAt(0) && ([r,i] = function(e) {
                        const t = e.indexOf(".");
                        return [e.substring(0, t), e.substr(t + 1)]
                    }(r)),
                        this.engine.listen(this.namespaceId, s, r, i, e => {
                                this.factory.scheduleListenerCallback(e._data || -1, n, e)
                            }
                        )
                }
                return this.delegate.listen(e, t, n)
            }
        }
        let ed = ( () => {
                class e extends Ah {
                    constructor(e, t, n) {
                        super(e.body, t, n)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(xl),Ue(pu),Ue(nh))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        const td = [{
            provide: pu,
            useFactory: function() {
                return "function" == typeof Gh() ? new Uh : new zh
            }
        }, {
            provide: new Me("AnimationModuleType"),
            useValue: "BrowserAnimations"
        }, {
            provide: jc,
            useClass: Wh
        }, {
            provide: nh,
            useFactory: function() {
                return new sh
            }
        }, {
            provide: Ah,
            useClass: ed
        }, {
            provide: ko,
            useFactory: function(e, t, n) {
                return new Yh(e,t,n)
            },
            deps: [xc, Ah, el]
        }];
        let nd = ( () => {
                class e {
                }
                return e.\u0275mod = ht({
                    type: e
                }),
                    e.\u0275inj = le({
                        factory: function(t) {
                            return new (t || e)
                        },
                        providers: td,
                        imports: [Rc]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class sd extends h {
            constructor(e, t) {
                super()
            }
            schedule(e, t=0) {
                return this
            }
        }
        class rd extends sd {
            constructor(e, t) {
                super(e, t),
                    this.scheduler = e,
                    this.work = t,
                    this.pending = !1
            }
            schedule(e, t=0) {
                if (this.closed)
                    return this;
                this.state = e;
                const n = this.id
                    , s = this.scheduler;
                return null != n && (this.id = this.recycleAsyncId(s, n, t)),
                    this.pending = !0,
                    this.delay = t,
                    this.id = this.id || this.requestAsyncId(s, this.id, t),
                    this
            }
            requestAsyncId(e, t, n=0) {
                return setInterval(e.flush.bind(e, this), n)
            }
            recycleAsyncId(e, t, n=0) {
                if (null !== n && this.delay === n && !1 === this.pending)
                    return t;
                clearInterval(t)
            }
            execute(e, t) {
                if (this.closed)
                    return new Error("executing a cancelled action");
                this.pending = !1;
                const n = this._execute(e, t);
                if (n)
                    return n;
                !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
            }
            _execute(e, t) {
                let n = !1
                    , s = void 0;
                try {
                    this.work(e)
                } catch (r) {
                    n = !0,
                        s = !!r && r || new Error(r)
                }
                if (n)
                    return this.unsubscribe(),
                        s
            }
            _unsubscribe() {
                const e = this.id
                    , t = this.scheduler
                    , n = t.actions
                    , s = n.indexOf(this);
                this.work = null,
                    this.state = null,
                    this.pending = !1,
                    this.scheduler = null,
                -1 !== s && n.splice(s, 1),
                null != e && (this.id = this.recycleAsyncId(t, e, null)),
                    this.delay = null
            }
        }
        class id extends rd {
            constructor(e, t) {
                super(e, t),
                    this.scheduler = e,
                    this.work = t
            }
            schedule(e, t=0) {
                return t > 0 ? super.schedule(e, t) : (this.delay = t,
                    this.state = e,
                    this.scheduler.flush(this),
                    this)
            }
            execute(e, t) {
                return t > 0 || this.closed ? super.execute(e, t) : this._execute(e, t)
            }
            requestAsyncId(e, t, n=0) {
                return null !== n && n > 0 || null === n && this.delay > 0 ? super.requestAsyncId(e, t, n) : e.flush(this)
            }
        }
        let od = ( () => {
                class e {
                    constructor(t, n=e.now) {
                        this.SchedulerAction = t,
                            this.now = n
                    }
                    schedule(e, t=0, n) {
                        return new this.SchedulerAction(this,e).schedule(n, t)
                    }
                }
                return e.now = () => Date.now(),
                    e
            }
        )();
        class ad extends od {
            constructor(e, t=od.now) {
                super(e, () => ad.delegate && ad.delegate !== this ? ad.delegate.now() : t()),
                    this.actions = [],
                    this.active = !1,
                    this.scheduled = void 0
            }
            schedule(e, t=0, n) {
                return ad.delegate && ad.delegate !== this ? ad.delegate.schedule(e, t, n) : super.schedule(e, t, n)
            }
            flush(e) {
                const {actions: t} = this;
                if (this.active)
                    return void t.push(e);
                let n;
                this.active = !0;
                do {
                    if (n = e.execute(e.state, e.delay))
                        break
                } while (e = t.shift());
                if (this.active = !1,
                    n) {
                    for (; e = t.shift(); )
                        e.unsubscribe();
                    throw n
                }
            }
        }
        class ld extends ad {
        }
        const cd = new ld(id)
            , ud = new _(e => e.complete());
        function hd(...e) {
            let t = e[e.length - 1];
            return x(t) ? (e.pop(),
                j(e, t)) : z(e)
        }
        let dd = ( () => {
                class e {
                    constructor(e, t, n) {
                        this.kind = e,
                            this.value = t,
                            this.error = n,
                            this.hasValue = "N" === e
                    }
                    observe(e) {
                        switch (this.kind) {
                            case "N":
                                return e.next && e.next(this.value);
                            case "E":
                                return e.error && e.error(this.error);
                            case "C":
                                return e.complete && e.complete()
                        }
                    }
                    do(e, t, n) {
                        switch (this.kind) {
                            case "N":
                                return e && e(this.value);
                            case "E":
                                return t && t(this.error);
                            case "C":
                                return n && n()
                        }
                    }
                    accept(e, t, n) {
                        return e && "function" == typeof e.next ? this.observe(e) : this.do(e, t, n)
                    }
                    toObservable() {
                        switch (this.kind) {
                            case "N":
                                return hd(this.value);
                            case "E":
                                return e = this.error,
                                    new _(t => t.error(e));
                            case "C":
                                return ud
                        }
                        var e;
                        throw new Error("unexpected notification kind value")
                    }
                    static createNext(t) {
                        return void 0 !== t ? new e("N",t) : e.undefinedValueNotification
                    }
                    static createError(t) {
                        return new e("E",void 0,t)
                    }
                    static createComplete() {
                        return e.completeNotification
                    }
                }
                return e.completeNotification = new e("C"),
                    e.undefinedValueNotification = new e("N",void 0),
                    e
            }
        )();
        class pd extends f {
            constructor(e, t, n=0) {
                super(e),
                    this.scheduler = t,
                    this.delay = n
            }
            static dispatch(e) {
                const {notification: t, destination: n} = e;
                t.observe(n),
                    this.unsubscribe()
            }
            scheduleMessage(e) {
                this.destination.add(this.scheduler.schedule(pd.dispatch, this.delay, new fd(e,this.destination)))
            }
            _next(e) {
                this.scheduleMessage(dd.createNext(e))
            }
            _error(e) {
                this.scheduleMessage(dd.createError(e)),
                    this.unsubscribe()
            }
            _complete() {
                this.scheduleMessage(dd.createComplete()),
                    this.unsubscribe()
            }
        }
        class fd {
            constructor(e, t) {
                this.notification = e,
                    this.destination = t
            }
        }
        class md extends C {
            constructor(e=Number.POSITIVE_INFINITY, t=Number.POSITIVE_INFINITY, n) {
                super(),
                    this.scheduler = n,
                    this._events = [],
                    this._infiniteTimeWindow = !1,
                    this._bufferSize = e < 1 ? 1 : e,
                    this._windowTime = t < 1 ? 1 : t,
                    t === Number.POSITIVE_INFINITY ? (this._infiniteTimeWindow = !0,
                        this.next = this.nextInfiniteTimeWindow) : this.next = this.nextTimeWindow
            }
            nextInfiniteTimeWindow(e) {
                const t = this._events;
                t.push(e),
                t.length > this._bufferSize && t.shift(),
                    super.next(e)
            }
            nextTimeWindow(e) {
                this._events.push(new gd(this._getNow(),e)),
                    this._trimBufferThenGetEvents(),
                    super.next(e)
            }
            _subscribe(e) {
                const t = this._infiniteTimeWindow
                    , n = t ? this._events : this._trimBufferThenGetEvents()
                    , s = this.scheduler
                    , r = n.length;
                let i;
                if (this.closed)
                    throw new v;
                if (this.isStopped || this.hasError ? i = h.EMPTY : (this.observers.push(e),
                    i = new w(this,e)),
                s && e.add(e = new pd(e,s)),
                    t)
                    for (let o = 0; o < r && !e.closed; o++)
                        e.next(n[o]);
                else
                    for (let o = 0; o < r && !e.closed; o++)
                        e.next(n[o].value);
                return this.hasError ? e.error(this.thrownError) : this.isStopped && e.complete(),
                    i
            }
            _getNow() {
                return (this.scheduler || cd).now()
            }
            _trimBufferThenGetEvents() {
                const e = this._getNow()
                    , t = this._bufferSize
                    , n = this._windowTime
                    , s = this._events
                    , r = s.length;
                let i = 0;
                for (; i < r && !(e - s[i].time < n); )
                    i++;
                return r > t && (i = Math.max(i, r - t)),
                i > 0 && s.splice(0, i),
                    s
            }
        }
        class gd {
            constructor(e, t) {
                this.time = e,
                    this.value = t
            }
        }
        class yd {
            constructor(e) {
                this.project = e
            }
            call(e, t) {
                return t.subscribe(new _d(e,this.project))
            }
        }
        class _d extends P {
            constructor(e, t) {
                super(e),
                    this.project = t,
                    this.index = 0
            }
            _next(e) {
                let t;
                const n = this.index++;
                try {
                    t = this.project(e, n)
                } catch (s) {
                    return void this.destination.error(s)
                }
                this._innerSub(t, e, n)
            }
            _innerSub(e, t, n) {
                const s = this.innerSubscription;
                s && s.unsubscribe();
                const r = new T(this,t,n)
                    , i = this.destination;
                i.add(r),
                    this.innerSubscription = F(this, e, void 0, void 0, r),
                this.innerSubscription !== r && i.add(this.innerSubscription)
            }
            _complete() {
                const {innerSubscription: e} = this;
                e && !e.closed || super._complete(),
                    this.unsubscribe()
            }
            _unsubscribe() {
                this.innerSubscription = null
            }
            notifyComplete(e) {
                this.destination.remove(e),
                    this.innerSubscription = null,
                this.isStopped && super._complete()
            }
            notifyNext(e, t, n, s, r) {
                this.destination.next(t)
            }
        }
        /**
         * @license Angular v10.0.3
         * (c) 2010-2020 Google LLC. https://angular.io/
         * License: MIT
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const bd = ( () => {
                const e = Element.prototype;
                return e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector
            }
        )()
            , vd = {
            schedule(e, t) {
                const n = setTimeout(e, t);
                return () => clearTimeout(n)
            },
            scheduleBeforeRender(e) {
                if ("undefined" == typeof window)
                    return vd.schedule(e, 0);
                if (void 0 === window.requestAnimationFrame)
                    return vd.schedule(e, 16);
                const t = window.requestAnimationFrame(e);
                return () => window.cancelAnimationFrame(t)
            }
        };
        function wd(e, t, n) {
            let s = n;
            return function(e) {
                return !!e && e.nodeType === Node.ELEMENT_NODE
            }(e) && t.some( (t, n) => !("*" === t || !function(e, t) {
                return bd.call(e, t)
            }(e, t) || (s = n,
                0))),
                s
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Ed {
            constructor(e, t) {
                this.componentFactory = t.get(So).resolveComponentFactory(e)
            }
            create(e) {
                return new Cd(this.componentFactory,e)
            }
        }
        class Cd {
            constructor(e, t) {
                this.componentFactory = e,
                    this.injector = t,
                    this.eventEmitters = new md(1),
                    this.events = this.eventEmitters.pipe(function e(t, n) {
                        return "function" == typeof n ? s => s.pipe(e( (e, s) => L(t(e, s)).pipe(M( (t, r) => n(e, t, s, r))))) : e => e.lift(new yd(t))
                    }(e => q(...e))),
                    this.componentRef = null,
                    this.inputChanges = null,
                    this.implementsOnChanges = !1,
                    this.scheduledChangeDetectionFn = null,
                    this.scheduledDestroyFn = null,
                    this.initialInputValues = new Map,
                    this.unchangedInputs = new Set
            }
            connect(e) {
                if (null !== this.scheduledDestroyFn)
                    return this.scheduledDestroyFn(),
                        void (this.scheduledDestroyFn = null);
                null === this.componentRef && this.initializeComponent(e)
            }
            disconnect() {
                null !== this.componentRef && null === this.scheduledDestroyFn && (this.scheduledDestroyFn = vd.schedule( () => {
                        null !== this.componentRef && (this.componentRef.destroy(),
                            this.componentRef = null)
                    }
                    , 10))
            }
            getInputValue(e) {
                return null === this.componentRef ? this.initialInputValues.get(e) : this.componentRef.instance[e]
            }
            setInputValue(e, t) {
                var n, s;
                null !== this.componentRef ? ((n = t) !== (s = this.getInputValue(e)) && (n == n || s == s) || void 0 === t && this.unchangedInputs.has(e)) && (this.recordInputChange(e, t),
                    this.componentRef.instance[e] = t,
                    this.scheduleDetectChanges()) : this.initialInputValues.set(e, t)
            }
            initializeComponent(e) {
                const t = hi.create({
                    providers: [],
                    parent: this.injector
                })
                    , n = /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                    function(e, t) {
                        const n = e.childNodes
                            , s = t.map( () => []);
                        let r = -1;
                        t.some( (e, t) => "*" === e && (r = t,
                            !0));
                        for (let i = 0, o = n.length; i < o; ++i) {
                            const e = n[i]
                                , o = wd(e, t, r);
                            -1 !== o && s[o].push(e)
                        }
                        return s
                    }(e, this.componentFactory.ngContentSelectors);
                this.componentRef = this.componentFactory.create(t, n, e),
                    this.implementsOnChanges = "function" == typeof this.componentRef.instance.ngOnChanges,
                    this.initializeInputs(),
                    this.initializeOutputs(this.componentRef),
                    this.detectChanges(),
                    this.injector.get(_l).attachView(this.componentRef.hostView)
            }
            initializeInputs() {
                this.componentFactory.inputs.forEach( ({propName: e}) => {
                        this.implementsOnChanges && this.unchangedInputs.add(e),
                        this.initialInputValues.has(e) && this.setInputValue(e, this.initialInputValues.get(e))
                    }
                ),
                    this.initialInputValues.clear()
            }
            initializeOutputs(e) {
                const t = this.componentFactory.outputs.map( ({propName: t, templateName: n}) => e.instance[t].pipe(M(e => ({
                    name: n,
                    value: e
                }))));
                this.eventEmitters.next(t)
            }
            callNgOnChanges(e) {
                if (!this.implementsOnChanges || null === this.inputChanges)
                    return;
                const t = this.inputChanges;
                this.inputChanges = null,
                    e.instance.ngOnChanges(t)
            }
            scheduleDetectChanges() {
                this.scheduledChangeDetectionFn || (this.scheduledChangeDetectionFn = vd.scheduleBeforeRender( () => {
                        this.scheduledChangeDetectionFn = null,
                            this.detectChanges()
                    }
                ))
            }
            recordInputChange(e, t) {
                if (null !== this.componentRef && !this.implementsOnChanges)
                    return;
                null === this.inputChanges && (this.inputChanges = {});
                const n = this.inputChanges[e];
                if (n)
                    return void (n.currentValue = t);
                const s = this.unchangedInputs.has(e);
                this.unchangedInputs.delete(e);
                const r = s ? void 0 : this.getInputValue(e);
                this.inputChanges[e] = new co(r,t,s)
            }
            detectChanges() {
                null !== this.componentRef && (this.callNgOnChanges(this.componentRef),
                    this.componentRef.changeDetectorRef.detectChanges())
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Sd extends HTMLElement {
            constructor() {
                super(...arguments),
                    this.ngElementEventsSubscription = null
            }
        }
        function xd(e, t) {
            const n = function(e, t) {
                return t.get(So).resolveComponentFactory(e).inputs
            }(e, t.injector)
                , s = t.strategyFactory || new Ed(e,t.injector)
                , r = function(e) {
                const t = {};
                return e.forEach( ({propName: e, templateName: n}) => {
                        var s;
                        t[(s = n,
                            s.replace(/[A-Z]/g, e => "-" + e.toLowerCase()))] = e
                    }
                ),
                    t
            }(n);
            class i extends Sd {
                constructor(e) {
                    super(),
                        this.injector = e
                }
                get ngElementStrategy() {
                    if (!this._ngElementStrategy) {
                        const e = this._ngElementStrategy = s.create(this.injector || t.injector)
                            , r = n.filter( ({propName: e}) => this.hasOwnProperty(e)).map( ({propName: e}) => [e, this[e]]);
                        this instanceof i ? r.forEach( ([e]) => delete this[e]) : Td(n, this),
                            r.forEach( ([t,n]) => e.setInputValue(t, n))
                    }
                    return this._ngElementStrategy
                }
                attributeChangedCallback(e, t, n, s) {
                    this.ngElementStrategy.setInputValue(r[e], n)
                }
                connectedCallback() {
                    let e = !1;
                    this.ngElementStrategy.events && (this.subscribeToEvents(),
                        e = !0),
                        this.ngElementStrategy.connect(this),
                    e || this.subscribeToEvents()
                }
                disconnectedCallback() {
                    this._ngElementStrategy && this._ngElementStrategy.disconnect(),
                    this.ngElementEventsSubscription && (this.ngElementEventsSubscription.unsubscribe(),
                        this.ngElementEventsSubscription = null)
                }
                subscribeToEvents() {
                    this.ngElementEventsSubscription = this.ngElementStrategy.events.subscribe(e => {
                            const t = function(e, t, n) {
                                if ("function" != typeof CustomEvent) {
                                    const s = e.createEvent("CustomEvent");
                                    return s.initCustomEvent(t, !1, !1, n),
                                        s
                                }
                                return new CustomEvent(t,{
                                    bubbles: !1,
                                    cancelable: !1,
                                    detail: n
                                })
                            }(this.ownerDocument, e.name, e.value);
                            this.dispatchEvent(t)
                        }
                    )
                }
            }
            return i.observedAttributes = Object.keys(r),
                Object.defineProperty(i.prototype, "ngElementStrategy", {
                    enumerable: !0
                }),
                Td(n, i.prototype),
                i
        }
        function Td(e, t) {
            e.forEach( ({propName: e}) => {
                    Object.defineProperty(t, e, {
                        get() {
                            return this.ngElementStrategy.getInputValue(e)
                        },
                        set(t) {
                            this.ngElementStrategy.setInputValue(e, t)
                        },
                        configurable: !0,
                        enumerable: !0
                    })
                }
            )
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function kd(e, t) {
            if (1 & e) {
                const e = Ai();
                Ti(0, "button", 2),
                    Ni("click", (function() {
                            qt(e);
                            const n = t.$implicit;
                            return Pi().setTheme(n)
                        }
                    )),
                    eo(1),
                    ki()
            }
            if (2 & e) {
                const e = t.$implicit;
                qi("btn-active", e === Pi().theme),
                    Is(1),
                    no(" ", e, " ")
            }
        }
        let Id = ( () => {
                class e {
                    constructor() {
                        this.text = "Select theme",
                            this.themeChange = new ya,
                            this.themes = ["blue", "grey", "red"]
                    }
                    setTheme(e) {
                        this.theme = e,
                            this.themeChange.emit(this.theme)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275cmp = at({
                        type: e,
                        selectors: [["chat-config"]],
                        inputs: {
                            theme: "theme",
                            text: "text"
                        },
                        outputs: {
                            themeChange: "themeChange"
                        },
                        decls: 3,
                        vars: 2,
                        consts: [[1, "chat-config"], ["class", "btn", 3, "btn-active", "click", 4, "ngFor", "ngForOf"], [1, "btn", 3, "click"]],
                        template: function(e, t) {
                            1 & e && (Ti(0, "div", 0),
                                eo(1),
                                wi(2, kd, 2, 3, "button", 1),
                                ki()),
                            2 & e && (Is(1),
                                no(" ", t.text, " "),
                                Is(1),
                                Si("ngForOf", t.themes))
                        },
                        directives: [sc],
                        styles: [".chat-config[_ngcontent-%COMP%] {\n      padding: 20px;\n    }\n    .btn[_ngcontent-%COMP%] {\n      padding: 5px;\n      margin: 0px 2px;\n      border: 1px solid #dedede;\n      outline: none;\n    }\n    .btn-active[_ngcontent-%COMP%] {\n      border: 1px solid #a0a0a0;\n    }\n    .btn[_ngcontent-%COMP%]:focus {\n      border: 1px solid #333;\n    }"]
                    }),
                    e
            }
        )();
        const Ad = Lc("fadeInOut", [zc(":enter", [$c({
            opacity: 0
        }), Hc(250)]), zc("* => void", [Hc(250, $c({
            opacity: 0
        }))])])
            , Od = Lc("fadeIn", [zc(":enter", [$c({
            opacity: 0
        }), Hc(500)]), zc(":leave", [$c({
            opacity: 0
        }), Hc(1)])]);
        class Nd {
            constructor(e, t) {
                this.predicate = e,
                    this.thisArg = t
            }
            call(e, t) {
                return t.subscribe(new Dd(e,this.predicate,this.thisArg))
            }
        }
        class Dd extends f {
            constructor(e, t, n) {
                super(e),
                    this.predicate = t,
                    this.thisArg = n,
                    this.count = 0
            }
            _next(e) {
                let t;
                try {
                    t = this.predicate.call(this.thisArg, e, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                t && this.destination.next(e)
            }
        }
        /**
         * @license Angular v10.0.3
         * (c) 2010-2020 Google LLC. https://angular.io/
         * License: MIT
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Fd {
        }
        class Pd {
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Md {
            constructor(e) {
                this.normalizedNames = new Map,
                    this.lazyUpdate = null,
                    e ? this.lazyInit = "string" == typeof e ? () => {
                                this.headers = new Map,
                                    e.split("\n").forEach(e => {
                                            const t = e.indexOf(":");
                                            if (t > 0) {
                                                const n = e.slice(0, t)
                                                    , s = n.toLowerCase()
                                                    , r = e.slice(t + 1).trim();
                                                this.maybeSetNormalizedName(n, s),
                                                    this.headers.has(s) ? this.headers.get(s).push(r) : this.headers.set(s, [r])
                                            }
                                        }
                                    )
                            }
                            : () => {
                                this.headers = new Map,
                                    Object.keys(e).forEach(t => {
                                            let n = e[t];
                                            const s = t.toLowerCase();
                                            "string" == typeof n && (n = [n]),
                                            n.length > 0 && (this.headers.set(s, n),
                                                this.maybeSetNormalizedName(t, s))
                                        }
                                    )
                            }
                        : this.headers = new Map
            }
            has(e) {
                return this.init(),
                    this.headers.has(e.toLowerCase())
            }
            get(e) {
                this.init();
                const t = this.headers.get(e.toLowerCase());
                return t && t.length > 0 ? t[0] : null
            }
            keys() {
                return this.init(),
                    Array.from(this.normalizedNames.values())
            }
            getAll(e) {
                return this.init(),
                this.headers.get(e.toLowerCase()) || null
            }
            append(e, t) {
                return this.clone({
                    name: e,
                    value: t,
                    op: "a"
                })
            }
            set(e, t) {
                return this.clone({
                    name: e,
                    value: t,
                    op: "s"
                })
            }
            delete(e, t) {
                return this.clone({
                    name: e,
                    value: t,
                    op: "d"
                })
            }
            maybeSetNormalizedName(e, t) {
                this.normalizedNames.has(t) || this.normalizedNames.set(t, e)
            }
            init() {
                this.lazyInit && (this.lazyInit instanceof Md ? this.copyFrom(this.lazyInit) : this.lazyInit(),
                    this.lazyInit = null,
                this.lazyUpdate && (this.lazyUpdate.forEach(e => this.applyUpdate(e)),
                    this.lazyUpdate = null))
            }
            copyFrom(e) {
                e.init(),
                    Array.from(e.headers.keys()).forEach(t => {
                            this.headers.set(t, e.headers.get(t)),
                                this.normalizedNames.set(t, e.normalizedNames.get(t))
                        }
                    )
            }
            clone(e) {
                const t = new Md;
                return t.lazyInit = this.lazyInit && this.lazyInit instanceof Md ? this.lazyInit : this,
                    t.lazyUpdate = (this.lazyUpdate || []).concat([e]),
                    t
            }
            applyUpdate(e) {
                const t = e.name.toLowerCase();
                switch (e.op) {
                    case "a":
                    case "s":
                        let n = e.value;
                        if ("string" == typeof n && (n = [n]),
                        0 === n.length)
                            return;
                        this.maybeSetNormalizedName(e.name, t);
                        const s = ("a" === e.op ? this.headers.get(t) : void 0) || [];
                        s.push(...n),
                            this.headers.set(t, s);
                        break;
                    case "d":
                        const r = e.value;
                        if (r) {
                            let e = this.headers.get(t);
                            if (!e)
                                return;
                            e = e.filter(e => -1 === r.indexOf(e)),
                                0 === e.length ? (this.headers.delete(t),
                                    this.normalizedNames.delete(t)) : this.headers.set(t, e)
                        } else
                            this.headers.delete(t),
                                this.normalizedNames.delete(t)
                }
            }
            forEach(e) {
                this.init(),
                    Array.from(this.normalizedNames.keys()).forEach(t => e(this.normalizedNames.get(t), this.headers.get(t)))
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
        }
        class Vd {
            encodeKey(e) {
                return Rd(e)
            }
            encodeValue(e) {
                return Rd(e)
            }
            decodeKey(e) {
                return decodeURIComponent(e)
            }
            decodeValue(e) {
                return decodeURIComponent(e)
            }
        }
        function Rd(e) {
            return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/gi, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%2B/gi, "+").replace(/%3D/gi, "=").replace(/%3F/gi, "?").replace(/%2F/gi, "/")
        }
        class jd {
            constructor(e={}) {
                if (this.updates = null,
                    this.cloneFrom = null,
                    this.encoder = e.encoder || new Vd,
                    e.fromString) {
                    if (e.fromObject)
                        throw new Error("Cannot specify both fromString and fromObject.");
                    this.map = function(e, t) {
                        const n = new Map;
                        return e.length > 0 && e.split("&").forEach(e => {
                                const s = e.indexOf("=")
                                    , [r,i] = -1 == s ? [t.decodeKey(e), ""] : [t.decodeKey(e.slice(0, s)), t.decodeValue(e.slice(s + 1))]
                                    , o = n.get(r) || [];
                                o.push(i),
                                    n.set(r, o)
                            }
                        ),
                            n
                    }(e.fromString, this.encoder)
                } else
                    e.fromObject ? (this.map = new Map,
                        Object.keys(e.fromObject).forEach(t => {
                                const n = e.fromObject[t];
                                this.map.set(t, Array.isArray(n) ? n : [n])
                            }
                        )) : this.map = null
            }
            has(e) {
                return this.init(),
                    this.map.has(e)
            }
            get(e) {
                this.init();
                const t = this.map.get(e);
                return t ? t[0] : null
            }
            getAll(e) {
                return this.init(),
                this.map.get(e) || null
            }
            keys() {
                return this.init(),
                    Array.from(this.map.keys())
            }
            append(e, t) {
                return this.clone({
                    param: e,
                    value: t,
                    op: "a"
                })
            }
            set(e, t) {
                return this.clone({
                    param: e,
                    value: t,
                    op: "s"
                })
            }
            delete(e, t) {
                return this.clone({
                    param: e,
                    value: t,
                    op: "d"
                })
            }
            toString() {
                return this.init(),
                    this.keys().map(e => {
                            const t = this.encoder.encodeKey(e);
                            return this.map.get(e).map(e => t + "=" + this.encoder.encodeValue(e)).join("&")
                        }
                    ).filter(e => "" !== e).join("&")
            }
            clone(e) {
                const t = new jd({
                    encoder: this.encoder
                });
                return t.cloneFrom = this.cloneFrom || this,
                    t.updates = (this.updates || []).concat([e]),
                    t
            }
            init() {
                null === this.map && (this.map = new Map),
                null !== this.cloneFrom && (this.cloneFrom.init(),
                    this.cloneFrom.keys().forEach(e => this.map.set(e, this.cloneFrom.map.get(e))),
                    this.updates.forEach(e => {
                            switch (e.op) {
                                case "a":
                                case "s":
                                    const t = ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                                    t.push(e.value),
                                        this.map.set(e.param, t);
                                    break;
                                case "d":
                                    if (void 0 === e.value) {
                                        this.map.delete(e.param);
                                        break
                                    }
                                {
                                    let t = this.map.get(e.param) || [];
                                    const n = t.indexOf(e.value);
                                    -1 !== n && t.splice(n, 1),
                                        t.length > 0 ? this.map.set(e.param, t) : this.map.delete(e.param)
                                }
                            }
                        }
                    ),
                    this.cloneFrom = this.updates = null)
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
        }
        function Ld(e) {
            return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
        }
        function Hd(e) {
            return "undefined" != typeof Blob && e instanceof Blob
        }
        function Bd(e) {
            return "undefined" != typeof FormData && e instanceof FormData
        }
        class $d {
            constructor(e, t, n, s) {
                let r;
                if (this.url = t,
                    this.body = null,
                    this.reportProgress = !1,
                    this.withCredentials = !1,
                    this.responseType = "json",
                    this.method = e.toUpperCase(),
                    function(e) {
                        switch (e) {
                            case "DELETE":
                            case "GET":
                            case "HEAD":
                            case "OPTIONS":
                            case "JSONP":
                                return !1;
                            default:
                                return !0
                        }
                    }(this.method) || s ? (this.body = void 0 !== n ? n : null,
                        r = s) : r = n,
                r && (this.reportProgress = !!r.reportProgress,
                    this.withCredentials = !!r.withCredentials,
                r.responseType && (this.responseType = r.responseType),
                r.headers && (this.headers = r.headers),
                r.params && (this.params = r.params)),
                this.headers || (this.headers = new Md),
                    this.params) {
                    const e = this.params.toString();
                    if (0 === e.length)
                        this.urlWithParams = t;
                    else {
                        const n = t.indexOf("?");
                        this.urlWithParams = t + (-1 === n ? "?" : n < t.length - 1 ? "&" : "") + e
                    }
                } else
                    this.params = new jd,
                        this.urlWithParams = t
            }
            serializeBody() {
                return null === this.body ? null : Ld(this.body) || Hd(this.body) || Bd(this.body) || "string" == typeof this.body ? this.body : this.body instanceof jd ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
            }
            detectContentTypeHeader() {
                return null === this.body || Bd(this.body) ? null : Hd(this.body) ? this.body.type || null : Ld(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof jd ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || Array.isArray(this.body) ? "application/json" : null
            }
            clone(e={}) {
                const t = e.method || this.method
                    , n = e.url || this.url
                    , s = e.responseType || this.responseType
                    , r = void 0 !== e.body ? e.body : this.body
                    , i = void 0 !== e.withCredentials ? e.withCredentials : this.withCredentials
                    , o = void 0 !== e.reportProgress ? e.reportProgress : this.reportProgress;
                let a = e.headers || this.headers
                    , l = e.params || this.params;
                return void 0 !== e.setHeaders && (a = Object.keys(e.setHeaders).reduce( (t, n) => t.set(n, e.setHeaders[n]), a)),
                e.setParams && (l = Object.keys(e.setParams).reduce( (t, n) => t.set(n, e.setParams[n]), l)),
                    new $d(t,n,r,{
                        params: l,
                        headers: a,
                        reportProgress: o,
                        responseType: s,
                        withCredentials: i
                    })
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
        }
        var zd = function(e) {
            return e[e.Sent = 0] = "Sent",
                e[e.UploadProgress = 1] = "UploadProgress",
                e[e.ResponseHeader = 2] = "ResponseHeader",
                e[e.DownloadProgress = 3] = "DownloadProgress",
                e[e.Response = 4] = "Response",
                e[e.User = 5] = "User",
                e
        }({});
        class qd {
            constructor(e, t=200, n="OK") {
                this.headers = e.headers || new Md,
                    this.status = void 0 !== e.status ? e.status : t,
                    this.statusText = e.statusText || n,
                    this.url = e.url || null,
                    this.ok = this.status >= 200 && this.status < 300
            }
        }
        class Ud extends qd {
            constructor(e={}) {
                super(e),
                    this.type = zd.ResponseHeader
            }
            clone(e={}) {
                return new Ud({
                    headers: e.headers || this.headers,
                    status: void 0 !== e.status ? e.status : this.status,
                    statusText: e.statusText || this.statusText,
                    url: e.url || this.url || void 0
                })
            }
        }
        class Gd extends qd {
            constructor(e={}) {
                super(e),
                    this.type = zd.Response,
                    this.body = void 0 !== e.body ? e.body : null
            }
            clone(e={}) {
                return new Gd({
                    body: void 0 !== e.body ? e.body : this.body,
                    headers: e.headers || this.headers,
                    status: void 0 !== e.status ? e.status : this.status,
                    statusText: e.statusText || this.statusText,
                    url: e.url || this.url || void 0
                })
            }
        }
        class Wd extends qd {
            constructor(e) {
                super(e, 0, "Unknown Error"),
                    this.name = "HttpErrorResponse",
                    this.ok = !1,
                    this.message = this.status >= 200 && this.status < 300 ? "Http failure during parsing for " + (e.url || "(unknown url)") : `Http failure response for ${e.url || "(unknown url)"}: ${e.status} ${e.statusText}`,
                    this.error = e.error || null
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
        }
        function Qd(e, t) {
            return {
                body: t,
                headers: e.headers,
                observe: e.observe,
                params: e.params,
                reportProgress: e.reportProgress,
                responseType: e.responseType,
                withCredentials: e.withCredentials
            }
        }
        let Zd = ( () => {
                class e {
                    constructor(e) {
                        this.handler = e
                    }
                    request(e, t, n={}) {
                        let s;
                        if (e instanceof $d)
                            s = e;
                        else {
                            let r = void 0;
                            r = n.headers instanceof Md ? n.headers : new Md(n.headers);
                            let i = void 0;
                            n.params && (i = n.params instanceof jd ? n.params : new jd({
                                fromObject: n.params
                            })),
                                s = new $d(e,t,void 0 !== n.body ? n.body : null,{
                                    headers: r,
                                    params: i,
                                    reportProgress: n.reportProgress,
                                    responseType: n.responseType || "json",
                                    withCredentials: n.withCredentials
                                })
                        }
                        const r = hd(s).pipe(H(e => this.handler.handle(e), void 0, 1));
                        if (e instanceof $d || "events" === n.observe)
                            return r;
                        const i = r.pipe((o = e => e instanceof Gd,
                                function(e) {
                                    return e.lift(new Nd(o,void 0))
                                }
                        ));
                        var o;
                        switch (n.observe || "body") {
                            case "body":
                                switch (s.responseType) {
                                    case "arraybuffer":
                                        return i.pipe(M(e => {
                                                if (null !== e.body && !(e.body instanceof ArrayBuffer))
                                                    throw new Error("Response is not an ArrayBuffer.");
                                                return e.body
                                            }
                                        ));
                                    case "blob":
                                        return i.pipe(M(e => {
                                                if (null !== e.body && !(e.body instanceof Blob))
                                                    throw new Error("Response is not a Blob.");
                                                return e.body
                                            }
                                        ));
                                    case "text":
                                        return i.pipe(M(e => {
                                                if (null !== e.body && "string" != typeof e.body)
                                                    throw new Error("Response is not a string.");
                                                return e.body
                                            }
                                        ));
                                    case "json":
                                    default:
                                        return i.pipe(M(e => e.body))
                                }
                            case "response":
                                return i;
                            default:
                                throw new Error(`Unreachable: unhandled observe type ${n.observe}}`)
                        }
                    }
                    delete(e, t={}) {
                        return this.request("DELETE", e, t)
                    }
                    get(e, t={}) {
                        return this.request("GET", e, t)
                    }
                    head(e, t={}) {
                        return this.request("HEAD", e, t)
                    }
                    jsonp(e, t) {
                        return this.request("JSONP", e, {
                            params: (new jd).append(t, "JSONP_CALLBACK"),
                            observe: "body",
                            responseType: "json"
                        })
                    }
                    options(e, t={}) {
                        return this.request("OPTIONS", e, t)
                    }
                    patch(e, t, n={}) {
                        return this.request("PATCH", e, Qd(n, t))
                    }
                    post(e, t, n={}) {
                        return this.request("POST", e, Qd(n, t))
                    }
                    put(e, t, n={}) {
                        return this.request("PUT", e, Qd(n, t))
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(Fd))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Kd {
            constructor(e, t) {
                this.next = e,
                    this.interceptor = t
            }
            handle(e) {
                return this.interceptor.intercept(e, this.next)
            }
        }
        const Yd = new Me("HTTP_INTERCEPTORS");
        let Jd = ( () => {
                class e {
                    intercept(e, t) {
                        return t.handle(e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Xd = /^\)\]\}',?\n/;
        class ep {
        }
        let tp = ( () => {
                class e {
                    constructor() {}
                    build() {
                        return new XMLHttpRequest
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )()
            , np = ( () => {
                class e {
                    constructor(e) {
                        this.xhrFactory = e
                    }
                    handle(e) {
                        if ("JSONP" === e.method)
                            throw new Error("Attempted to construct Jsonp request without JsonpClientModule installed.");
                        return new _(t => {
                                const n = this.xhrFactory.build();
                                if (n.open(e.method, e.urlWithParams),
                                e.withCredentials && (n.withCredentials = !0),
                                    e.headers.forEach( (e, t) => n.setRequestHeader(e, t.join(","))),
                                e.headers.has("Accept") || n.setRequestHeader("Accept", "application/json, text/plain, */*"),
                                    !e.headers.has("Content-Type")) {
                                    const t = e.detectContentTypeHeader();
                                    null !== t && n.setRequestHeader("Content-Type", t)
                                }
                                if (e.responseType) {
                                    const t = e.responseType.toLowerCase();
                                    n.responseType = "json" !== t ? t : "text"
                                }
                                const s = e.serializeBody();
                                let r = null;
                                const i = () => {
                                        if (null !== r)
                                            return r;
                                        const t = 1223 === n.status ? 204 : n.status
                                            , s = n.statusText || "OK"
                                            , i = new Md(n.getAllResponseHeaders())
                                            , o = function(e) {
                                            return "responseURL"in e && e.responseURL ? e.responseURL : /^X-Request-URL:/m.test(e.getAllResponseHeaders()) ? e.getResponseHeader("X-Request-URL") : null
                                        }(n) || e.url;
                                        return r = new Ud({
                                            headers: i,
                                            status: t,
                                            statusText: s,
                                            url: o
                                        }),
                                            r
                                    }
                                    , o = () => {
                                        let {headers: s, status: r, statusText: o, url: a} = i()
                                            , l = null;
                                        204 !== r && (l = void 0 === n.response ? n.responseText : n.response),
                                        0 === r && (r = l ? 200 : 0);
                                        let c = r >= 200 && r < 300;
                                        if ("json" === e.responseType && "string" == typeof l) {
                                            const e = l;
                                            l = l.replace(Xd, "");
                                            try {
                                                l = "" !== l ? JSON.parse(l) : null
                                            } catch (u) {
                                                l = e,
                                                c && (c = !1,
                                                    l = {
                                                        error: u,
                                                        text: l
                                                    })
                                            }
                                        }
                                        c ? (t.next(new Gd({
                                            body: l,
                                            headers: s,
                                            status: r,
                                            statusText: o,
                                            url: a || void 0
                                        })),
                                            t.complete()) : t.error(new Wd({
                                            error: l,
                                            headers: s,
                                            status: r,
                                            statusText: o,
                                            url: a || void 0
                                        }))
                                    }
                                    , a = e => {
                                        const {url: s} = i()
                                            , r = new Wd({
                                            error: e,
                                            status: n.status || 0,
                                            statusText: n.statusText || "Unknown Error",
                                            url: s || void 0
                                        });
                                        t.error(r)
                                    }
                                ;
                                let l = !1;
                                const c = s => {
                                        l || (t.next(i()),
                                            l = !0);
                                        let r = {
                                            type: zd.DownloadProgress,
                                            loaded: s.loaded
                                        };
                                        s.lengthComputable && (r.total = s.total),
                                        "text" === e.responseType && n.responseText && (r.partialText = n.responseText),
                                            t.next(r)
                                    }
                                    , u = e => {
                                        let n = {
                                            type: zd.UploadProgress,
                                            loaded: e.loaded
                                        };
                                        e.lengthComputable && (n.total = e.total),
                                            t.next(n)
                                    }
                                ;
                                return n.addEventListener("load", o),
                                    n.addEventListener("error", a),
                                e.reportProgress && (n.addEventListener("progress", c),
                                null !== s && n.upload && n.upload.addEventListener("progress", u)),
                                    n.send(s),
                                    t.next({
                                        type: zd.Sent
                                    }),
                                    () => {
                                        n.removeEventListener("error", a),
                                            n.removeEventListener("load", o),
                                        e.reportProgress && (n.removeEventListener("progress", c),
                                        null !== s && n.upload && n.upload.removeEventListener("progress", u)),
                                        n.readyState !== n.DONE && n.abort()
                                    }
                            }
                        )
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(ep))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const sp = new Me("XSRF_COOKIE_NAME")
            , rp = new Me("XSRF_HEADER_NAME");
        class ip {
        }
        let op = ( () => {
                class e {
                    constructor(e, t, n) {
                        this.doc = e,
                            this.platform = t,
                            this.cookieName = n,
                            this.lastCookieString = "",
                            this.lastToken = null,
                            this.parseCount = 0
                    }
                    getToken() {
                        if ("server" === this.platform)
                            return null;
                        const e = this.doc.cookie || "";
                        return e !== this.lastCookieString && (this.parseCount++,
                            this.lastToken = tc(e, this.cookieName),
                            this.lastCookieString = e),
                            this.lastToken
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(xl),Ue(La),Ue(sp))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )()
            , ap = ( () => {
                class e {
                    constructor(e, t) {
                        this.tokenService = e,
                            this.headerName = t
                    }
                    intercept(e, t) {
                        const n = e.url.toLowerCase();
                        if ("GET" === e.method || "HEAD" === e.method || n.startsWith("http://") || n.startsWith("https://"))
                            return t.handle(e);
                        const s = this.tokenService.getToken();
                        return null === s || e.headers.has(this.headerName) || (e = e.clone({
                            headers: e.headers.set(this.headerName, s)
                        })),
                            t.handle(e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(ip),Ue(rp))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )()
            , lp = ( () => {
                class e {
                    constructor(e, t) {
                        this.backend = e,
                            this.injector = t,
                            this.chain = null
                    }
                    handle(e) {
                        if (null === this.chain) {
                            const e = this.injector.get(Yd, []);
                            this.chain = e.reduceRight( (e, t) => new Kd(e,t), this.backend)
                        }
                        return this.chain.handle(e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(Pd),Ue(hi))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )()
            , cp = ( () => {
                class e {
                    static disable() {
                        return {
                            ngModule: e,
                            providers: [{
                                provide: ap,
                                useClass: Jd
                            }]
                        }
                    }
                    static withOptions(t={}) {
                        return {
                            ngModule: e,
                            providers: [t.cookieName ? {
                                provide: sp,
                                useValue: t.cookieName
                            } : [], t.headerName ? {
                                provide: rp,
                                useValue: t.headerName
                            } : []]
                        }
                    }
                }
                return e.\u0275mod = ht({
                    type: e
                }),
                    e.\u0275inj = le({
                        factory: function(t) {
                            return new (t || e)
                        },
                        providers: [ap, {
                            provide: Yd,
                            useExisting: ap,
                            multi: !0
                        }, {
                            provide: ip,
                            useClass: op
                        }, {
                            provide: sp,
                            useValue: "XSRF-TOKEN"
                        }, {
                            provide: rp,
                            useValue: "X-XSRF-TOKEN"
                        }]
                    }),
                    e
            }
        )()
            , up = ( () => {
                class e {
                }
                return e.\u0275mod = ht({
                    type: e
                }),
                    e.\u0275inj = le({
                        factory: function(t) {
                            return new (t || e)
                        },
                        providers: [Zd, {
                            provide: Fd,
                            useClass: lp
                        }, np, {
                            provide: Pd,
                            useExisting: np
                        }, tp, {
                            provide: ep,
                            useExisting: tp
                        }],
                        imports: [[cp.withOptions({
                            cookieName: "XSRF-TOKEN",
                            headerName: "X-XSRF-TOKEN"
                        })]]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function hp() {}
        function dp(e, t, n) {
            return function(s) {
                return s.lift(new pp(e,t,n))
            }
        }
        class pp {
            constructor(e, t, n) {
                this.nextOrObserver = e,
                    this.error = t,
                    this.complete = n
            }
            call(e, t) {
                return t.subscribe(new fp(e,this.nextOrObserver,this.error,this.complete))
            }
        }
        class fp extends f {
            constructor(e, t, n, r) {
                super(e),
                    this._tapNext = hp,
                    this._tapError = hp,
                    this._tapComplete = hp,
                    this._tapError = n || hp,
                    this._tapComplete = r || hp,
                    s(t) ? (this._context = this,
                        this._tapNext = t) : t && (this._context = t,
                        this._tapNext = t.next || hp,
                        this._tapError = t.error || hp,
                        this._tapComplete = t.complete || hp)
            }
            _next(e) {
                try {
                    this._tapNext.call(this._context, e)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.destination.next(e)
            }
            _error(e) {
                try {
                    this._tapError.call(this._context, e)
                } catch (e) {
                    return void this.destination.error(e)
                }
                this.destination.error(e)
            }
            _complete() {
                try {
                    this._tapComplete.call(this._context)
                } catch (e) {
                    return void this.destination.error(e)
                }
                return this.destination.complete()
            }
        }
        let mp = ( () => {
                class e {
                    constructor(e) {
                        this.httpClient = e
                    }
                    getConfigJSON(e) {
                        return this.httpClient.get(e).pipe(dp(e => {
                                this.applicationInfo = e.applicationInfo
                            }
                        ))
                    }
                    startSession(e) {
                        console.log("login");
                        const t = {
                            headers: new Md({
                                "Content-Type": "application/json"})
                        };
                        return this.httpClient.post(this.applicationInfo.apiURL + "/webChat", {
                            MessagingInfo: {
                                type: "InitChat",
                                tenantId: this.applicationInfo.tenantId,
                                target: this.applicationInfo.target,
                                params: JSON.parse(JSON.stringify(e))
                            }
                        }, t).pipe(dp(e => {
                                console.log(`sessionId is ${null == e ? void 0 : e.sessionId} `),
                                    this.sessionId = e.sessionId
                            }
                        ))
                    }
                    endSession() {
                        return console.log("endSession"),
                            this.httpClient.post(this.applicationInfo.apiURL + "/webChat", {
                                MessagingInfo: {
                                    type: "EndChat",
                                    tenantId: this.applicationInfo.tenantId,
                                    target: this.applicationInfo.target,
                                    sessionId: this.sessionId
                                }
                            })
                    }
                    getStatus() {
                        return console.log("getStatus"),
                            this.httpClient.get(`${this.applicationInfo.apiURL}/webChatKeepAlive/${this.applicationInfo.tenantId}/${this.sessionId}`)
                    }
                    sendMessage(e) {
                        return console.log("sendMessage"),
                            this.httpClient.post(this.applicationInfo.apiURL + "/webChat", {
                                MessagingInfo: {
                                    type: "ChatMessage",
                                    tenantId: this.applicationInfo.tenantId,
                                    target: this.applicationInfo.target,
                                    sessionId: this.sessionId,
                                    params: [e]
                                }
                            })
                    }
                    uploadFile(e, t) {
                        return (new Md).set("Authorization", "Basic " + btoa("CKgREsEN:CWgaAvUQLAcHK")),
                            this.httpClient.post(`${this.applicationInfo.apiURL}/putMedia/${t}?type=webchat&target=${this.applicationInfo.target}&sessionId=${this.sessionId}&tenantId=${this.applicationInfo.tenantId}`, e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(Zd))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    }),
                    e
            }
        )();
        const gp = new ad(rd);
        function yp(e) {
            const {subscriber: t, counter: n, period: s} = e;
            t.next(n),
                this.schedule({
                    subscriber: t,
                    counter: n + 1,
                    period: s
                }, s)
        }
        let _p = ( () => {
                class e {
                    constructor(e) {
                        this.repository = e,
                            this.onMessagesRecieved = new C,
                            this.onSessionStatusChanged = new C,
                            this.sessionStatus = 0
                    }
                    isSessionStarted() {
                        return 1 == this.sessionStatus
                    }
                    startSession(e) {
                        return new Promise( (t, n) => {
                                console.log("startSession"),
                                e && (this.params = e),
                                    this.isSessionStarted() ? (t(!1),
                                        console.log("session allready started!")) : this.repository.startSession(this.params).subscribe({
                                        next: e => {
                                            t(!0),
                                                this.sessionStatus = 1,
                                                this.onSessionStatusChanged.next(this.sessionStatus),
                                                this.statusSubscription = function(e=0, t=gp) {
                                                    var n;
                                                    return (l(n = e) || !(n - parseFloat(n) + 1 >= 0) || e < 0) && (e = 0),
                                                    t && "function" == typeof t.schedule || (t = gp),
                                                        new _(n => (n.add(t.schedule(yp, e, {
                                                            subscriber: n,
                                                            counter: 0,
                                                            period: e
                                                        })),
                                                            n))
                                                }(8e3).subscribe(e => {
                                                        this.getStatus()
                                                    }
                                                )
                                        }
                                        ,
                                        error: e => {
                                            n("failed to start chat session"),
                                                console.log(e)
                                        }
                                    })
                            }
                        )
                    }
                    endSession() {
                        this.repository.endSession().subscribe({
                            next: e => {
                                this.onSessionEnded(0)
                            }
                            ,
                            error: e => {
                                this.onSessionEnded(0)
                            }
                        })
                    }
                    onSessionEnded(e) {
                        console.log("onSessionEnded"),
                        this.statusSubscription.closed || this.statusSubscription.unsubscribe(),
                            this.sessionStatus = e,
                            this.onSessionStatusChanged.next(this.sessionStatus)
                    }
                    getStatus() {
                        this.reopsitorySubscription = this.repository.getStatus().subscribe(e => {
                                console.log(e),
                                e.messages && e.messages.length > 0 && this.onMessagesRecieved.next(e.messages),
                                "EndChat" == e.status && this.onSessionEnded(2),
                                    this.reopsitorySubscription.unsubscribe()
                            }
                        )
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ue(mp))
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    }),
                    e
            }
        )();
        function bp(e, t) {
            return new _(n => {
                    const s = e.length;
                    if (0 === s)
                        return void n.complete();
                    const r = new Array(s);
                    let i = 0
                        , o = 0;
                    for (let a = 0; a < s; a++) {
                        const l = L(e[a]);
                        let c = !1;
                        n.add(l.subscribe({
                            next: e => {
                                c || (c = !0,
                                    o++),
                                    r[a] = e
                            }
                            ,
                            error: e => n.error(e),
                            complete: () => {
                                i++,
                                i !== s && c || (o === s && n.next(t ? t.reduce( (e, t, n) => (e[t] = r[n],
                                    e), {}) : r),
                                    n.complete())
                            }
                        }))
                    }
                }
            )
        }
        /**
         * @license Angular v10.0.3
         * (c) 2010-2020 Google LLC. https://angular.io/
         * License: MIT
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const vp = new Me("NgValueAccessor")
            , wp = {
            provide: vp,
            useExisting: ve( () => Ep),
            multi: !0
        };
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        let Ep = ( () => {
                class e {
                    constructor(e, t) {
                        this._renderer = e,
                            this._elementRef = t,
                            this.onChange = e => {}
                            ,
                            this.onTouched = () => {}
                    }
                    writeValue(e) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "checked", e)
                    }
                    registerOnChange(e) {
                        this.onChange = e
                    }
                    registerOnTouched(e) {
                        this.onTouched = e
                    }
                    setDisabledState(e) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(Ao),Ci(xo))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["input", "type", "checkbox", "formControlName", ""], ["input", "type", "checkbox", "formControl", ""], ["input", "type", "checkbox", "ngModel", ""]],
                        hostBindings: function(e, t) {
                            1 & e && Ni("change", (function(e) {
                                    return t.onChange(e.target.checked)
                                }
                            ))("blur", (function() {
                                    return t.onTouched()
                                }
                            ))
                        },
                        features: [wo([wp])]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Cp = {
            provide: vp,
            useExisting: ve( () => xp),
            multi: !0
        }
            , Sp = new Me("CompositionEventMode");
        let xp = ( () => {
                class e {
                    constructor(e, t, n) {
                        this._renderer = e,
                            this._elementRef = t,
                            this._compositionMode = n,
                            this.onChange = e => {}
                            ,
                            this.onTouched = () => {}
                            ,
                            this._composing = !1,
                        null == this._compositionMode && (this._compositionMode = !function() {
                            const e = Sl() ? Sl().getUserAgent() : "";
                            return /android (\d+)/.test(e.toLowerCase())
                        }())
                    }
                    writeValue(e) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "value", null == e ? "" : e)
                    }
                    registerOnChange(e) {
                        this.onChange = e
                    }
                    registerOnTouched(e) {
                        this.onTouched = e
                    }
                    setDisabledState(e) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
                    }
                    _handleInput(e) {
                        (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(e)
                    }
                    _compositionStart() {
                        this._composing = !0
                    }
                    _compositionEnd(e) {
                        this._composing = !1,
                        this._compositionMode && this.onChange(e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(Ao),Ci(xo),Ci(Sp, 8))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["input", "formControlName", "", 3, "type", "checkbox"], ["textarea", "formControlName", ""], ["input", "formControl", "", 3, "type", "checkbox"], ["textarea", "formControl", ""], ["input", "ngModel", "", 3, "type", "checkbox"], ["textarea", "ngModel", ""], ["", "ngDefaultControl", ""]],
                        hostBindings: function(e, t) {
                            1 & e && Ni("input", (function(e) {
                                    return t._handleInput(e.target.value)
                                }
                            ))("blur", (function() {
                                    return t.onTouched()
                                }
                            ))("compositionstart", (function() {
                                    return t._compositionStart()
                                }
                            ))("compositionend", (function(e) {
                                    return t._compositionEnd(e.target.value)
                                }
                            ))
                        },
                        features: [wo([Cp])]
                    }),
                    e
            }
        )()
            , Tp = ( () => {
                class e {
                    get value() {
                        return this.control ? this.control.value : null
                    }
                    get valid() {
                        return this.control ? this.control.valid : null
                    }
                    get invalid() {
                        return this.control ? this.control.invalid : null
                    }
                    get pending() {
                        return this.control ? this.control.pending : null
                    }
                    get disabled() {
                        return this.control ? this.control.disabled : null
                    }
                    get enabled() {
                        return this.control ? this.control.enabled : null
                    }
                    get errors() {
                        return this.control ? this.control.errors : null
                    }
                    get pristine() {
                        return this.control ? this.control.pristine : null
                    }
                    get dirty() {
                        return this.control ? this.control.dirty : null
                    }
                    get touched() {
                        return this.control ? this.control.touched : null
                    }
                    get status() {
                        return this.control ? this.control.status : null
                    }
                    get untouched() {
                        return this.control ? this.control.untouched : null
                    }
                    get statusChanges() {
                        return this.control ? this.control.statusChanges : null
                    }
                    get valueChanges() {
                        return this.control ? this.control.valueChanges : null
                    }
                    get path() {
                        return null
                    }
                    reset(e) {
                        this.control && this.control.reset(e)
                    }
                    hasError(e, t) {
                        return !!this.control && this.control.hasError(e, t)
                    }
                    getError(e, t) {
                        return this.control ? this.control.getError(e, t) : null
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275dir = pt({
                        type: e
                    }),
                    e
            }
        )()
            , kp = ( () => {
                class e extends Tp {
                    get formDirective() {
                        return null
                    }
                    get path() {
                        return null
                    }
                }
                return e.\u0275fac = function(t) {
                    return Ip(t || e)
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        features: [ro]
                    }),
                    e
            }
        )();
        const Ip = Yn(kp);
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Ap() {
            throw new Error("unimplemented")
        }
        class Op extends Tp {
            constructor() {
                super(...arguments),
                    this._parent = null,
                    this.name = null,
                    this.valueAccessor = null,
                    this._rawValidators = [],
                    this._rawAsyncValidators = []
            }
            get validator() {
                return Ap()
            }
            get asyncValidator() {
                return Ap()
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class Np {
            constructor(e) {
                this._cd = e
            }
            get ngClassUntouched() {
                return !!this._cd.control && this._cd.control.untouched
            }
            get ngClassTouched() {
                return !!this._cd.control && this._cd.control.touched
            }
            get ngClassPristine() {
                return !!this._cd.control && this._cd.control.pristine
            }
            get ngClassDirty() {
                return !!this._cd.control && this._cd.control.dirty
            }
            get ngClassValid() {
                return !!this._cd.control && this._cd.control.valid
            }
            get ngClassInvalid() {
                return !!this._cd.control && this._cd.control.invalid
            }
            get ngClassPending() {
                return !!this._cd.control && this._cd.control.pending
            }
        }
        let Dp = ( () => {
                class e extends Np {
                    constructor(e) {
                        super(e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(Op, 2))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
                        hostVars: 14,
                        hostBindings: function(e, t) {
                            2 & e && qi("ng-untouched", t.ngClassUntouched)("ng-touched", t.ngClassTouched)("ng-pristine", t.ngClassPristine)("ng-dirty", t.ngClassDirty)("ng-valid", t.ngClassValid)("ng-invalid", t.ngClassInvalid)("ng-pending", t.ngClassPending)
                        },
                        features: [ro]
                    }),
                    e
            }
        )()
            , Fp = ( () => {
                class e extends Np {
                    constructor(e) {
                        super(e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(kp, 2))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["", "formGroupName", ""], ["", "formArrayName", ""], ["", "ngModelGroup", ""], ["", "formGroup", ""], ["form", 3, "ngNoForm", ""], ["", "ngForm", ""]],
                        hostVars: 14,
                        hostBindings: function(e, t) {
                            2 & e && qi("ng-untouched", t.ngClassUntouched)("ng-touched", t.ngClassTouched)("ng-pristine", t.ngClassPristine)("ng-dirty", t.ngClassDirty)("ng-valid", t.ngClassValid)("ng-invalid", t.ngClassInvalid)("ng-pending", t.ngClassPending)
                        },
                        features: [ro]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function Pp(e) {
            return null == e || 0 === e.length
        }
        function Mp(e) {
            return null != e && "number" == typeof e.length
        }
        const Vp = new Me("NgValidators")
            , Rp = new Me("NgAsyncValidators")
            , jp = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        class Lp {
            static min(e) {
                return t => {
                    if (Pp(t.value) || Pp(e))
                        return null;
                    const n = parseFloat(t.value);
                    return !isNaN(n) && n < e ? {
                        min: {
                            min: e,
                            actual: t.value
                        }
                    } : null
                }
            }
            static max(e) {
                return t => {
                    if (Pp(t.value) || Pp(e))
                        return null;
                    const n = parseFloat(t.value);
                    return !isNaN(n) && n > e ? {
                        max: {
                            max: e,
                            actual: t.value
                        }
                    } : null
                }
            }
            static required(e) {
                return Pp(e.value) ? {
                    required: !0
                } : null
            }
            static requiredTrue(e) {
                return !0 === e.value ? null : {
                    required: !0
                }
            }
            static email(e) {
                return Pp(e.value) || jp.test(e.value) ? null : {
                    email: !0
                }
            }
            static minLength(e) {
                return t => Pp(t.value) || !Mp(t.value) ? null : t.value.length < e ? {
                    minlength: {
                        requiredLength: e,
                        actualLength: t.value.length
                    }
                } : null
            }
            static maxLength(e) {
                return t => Mp(t.value) && t.value.length > e ? {
                    maxlength: {
                        requiredLength: e,
                        actualLength: t.value.length
                    }
                } : null
            }
            static pattern(e) {
                if (!e)
                    return Lp.nullValidator;
                let t, n;
                return "string" == typeof e ? (n = "",
                "^" !== e.charAt(0) && (n += "^"),
                    n += e,
                "$" !== e.charAt(e.length - 1) && (n += "$"),
                    t = new RegExp(n)) : (n = e.toString(),
                    t = e),
                    e => {
                        if (Pp(e.value))
                            return null;
                        const s = e.value;
                        return t.test(s) ? null : {
                            pattern: {
                                requiredPattern: n,
                                actualValue: s
                            }
                        }
                    }
            }
            static nullValidator(e) {
                return null
            }
            static compose(e) {
                if (!e)
                    return null;
                const t = e.filter(Hp);
                return 0 == t.length ? null : function(e) {
                    return $p(function(e, t) {
                        return t.map(t => t(e))
                    }(e, t))
                }
            }
            static composeAsync(e) {
                if (!e)
                    return null;
                const t = e.filter(Hp);
                return 0 == t.length ? null : function(e) {
                    return function(...e) {
                        if (1 === e.length) {
                            const t = e[0];
                            if (l(t))
                                return bp(t, null);
                            if (c(t) && Object.getPrototypeOf(t) === Object.prototype) {
                                const e = Object.keys(t);
                                return bp(e.map(e => t[e]), e)
                            }
                        }
                        if ("function" == typeof e[e.length - 1]) {
                            const t = e.pop();
                            return bp(e = 1 === e.length && l(e[0]) ? e[0] : e, null).pipe(M(e => t(...e)))
                        }
                        return bp(e, null)
                    }(function(e, t) {
                        return t.map(t => t(e))
                    }(e, t).map(Bp)).pipe(M($p))
                }
            }
        }
        function Hp(e) {
            return null != e
        }
        function Bp(e) {
            const t = Oi(e) ? L(e) : e;
            if (!(n = t) || "function" != typeof n.subscribe)
                throw new Error("Expected validator to return Promise or Observable.");
            var n;
            return t
        }
        function $p(e) {
            let t = {};
            return e.forEach(e => {
                    t = null != e ? Object.assign(Object.assign({}, t), e) : t
                }
            ),
                0 === Object.keys(t).length ? null : t
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function zp(e) {
            return e.validate ? t => e.validate(t) : e
        }
        function qp(e) {
            return e.validate ? t => e.validate(t) : e
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Up = {
            provide: vp,
            useExisting: ve( () => Gp),
            multi: !0
        };
        let Gp = ( () => {
                class e {
                    constructor(e, t) {
                        this._renderer = e,
                            this._elementRef = t,
                            this.onChange = e => {}
                            ,
                            this.onTouched = () => {}
                    }
                    writeValue(e) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "value", null == e ? "" : e)
                    }
                    registerOnChange(e) {
                        this.onChange = t => {
                            e("" == t ? null : parseFloat(t))
                        }
                    }
                    registerOnTouched(e) {
                        this.onTouched = e
                    }
                    setDisabledState(e) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(Ao),Ci(xo))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["input", "type", "number", "formControlName", ""], ["input", "type", "number", "formControl", ""], ["input", "type", "number", "ngModel", ""]],
                        hostBindings: function(e, t) {
                            1 & e && Ni("input", (function(e) {
                                    return t.onChange(e.target.value)
                                }
                            ))("blur", (function() {
                                    return t.onTouched()
                                }
                            ))
                        },
                        features: [wo([Up])]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Wp = {
            provide: vp,
            useExisting: ve( () => Zp),
            multi: !0
        };
        let Qp = ( () => {
                class e {
                    constructor() {
                        this._accessors = []
                    }
                    add(e, t) {
                        this._accessors.push([e, t])
                    }
                    remove(e) {
                        for (let t = this._accessors.length - 1; t >= 0; --t)
                            if (this._accessors[t][1] === e)
                                return void this._accessors.splice(t, 1)
                    }
                    select(e) {
                        this._accessors.forEach(t => {
                                this._isSameGroup(t, e) && t[1] !== e && t[1].fireUncheck(e.value)
                            }
                        )
                    }
                    _isSameGroup(e, t) {
                        return !!e[0].control && e[0]._parent === t._control._parent && e[1].name === t.name
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )()
            , Zp = ( () => {
                class e {
                    constructor(e, t, n, s) {
                        this._renderer = e,
                            this._elementRef = t,
                            this._registry = n,
                            this._injector = s,
                            this.onChange = () => {}
                            ,
                            this.onTouched = () => {}
                    }
                    ngOnInit() {
                        this._control = this._injector.get(Op),
                            this._checkName(),
                            this._registry.add(this._control, this)
                    }
                    ngOnDestroy() {
                        this._registry.remove(this)
                    }
                    writeValue(e) {
                        this._state = e === this.value,
                            this._renderer.setProperty(this._elementRef.nativeElement, "checked", this._state)
                    }
                    registerOnChange(e) {
                        this._fn = e,
                            this.onChange = () => {
                                e(this.value),
                                    this._registry.select(this)
                            }
                    }
                    fireUncheck(e) {
                        this.writeValue(e)
                    }
                    registerOnTouched(e) {
                        this.onTouched = e
                    }
                    setDisabledState(e) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
                    }
                    _checkName() {
                        this.name && this.formControlName && this.name !== this.formControlName && this._throwNameError(),
                        !this.name && this.formControlName && (this.name = this.formControlName)
                    }
                    _throwNameError() {
                        throw new Error('\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    ')
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(Ao),Ci(xo),Ci(Qp),Ci(hi))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["input", "type", "radio", "formControlName", ""], ["input", "type", "radio", "formControl", ""], ["input", "type", "radio", "ngModel", ""]],
                        hostBindings: function(e, t) {
                            1 & e && Ni("change", (function() {
                                    return t.onChange()
                                }
                            ))("blur", (function() {
                                    return t.onTouched()
                                }
                            ))
                        },
                        inputs: {
                            name: "name",
                            formControlName: "formControlName",
                            value: "value"
                        },
                        features: [wo([Wp])]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Kp = {
            provide: vp,
            useExisting: ve( () => Yp),
            multi: !0
        };
        let Yp = ( () => {
                class e {
                    constructor(e, t) {
                        this._renderer = e,
                            this._elementRef = t,
                            this.onChange = e => {}
                            ,
                            this.onTouched = () => {}
                    }
                    writeValue(e) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "value", parseFloat(e))
                    }
                    registerOnChange(e) {
                        this.onChange = t => {
                            e("" == t ? null : parseFloat(t))
                        }
                    }
                    registerOnTouched(e) {
                        this.onTouched = e
                    }
                    setDisabledState(e) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(Ao),Ci(xo))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["input", "type", "range", "formControlName", ""], ["input", "type", "range", "formControl", ""], ["input", "type", "range", "ngModel", ""]],
                        hostBindings: function(e, t) {
                            1 & e && Ni("change", (function(e) {
                                    return t.onChange(e.target.value)
                                }
                            ))("input", (function(e) {
                                    return t.onChange(e.target.value)
                                }
                            ))("blur", (function() {
                                    return t.onTouched()
                                }
                            ))
                        },
                        features: [wo([Kp])]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Jp = '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });'
            , Xp = '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });';
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        class ef {
            static controlParentException() {
                throw new Error("formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + Jp)
            }
            static ngModelGroupException() {
                throw new Error(`formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ${Xp}\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        \n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>`)
            }
            static missingFormException() {
                throw new Error("formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " + Jp)
            }
            static groupParentException() {
                throw new Error("formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + Xp)
            }
            static arrayParentException() {
                throw new Error(`formArrayName must be used with a parent formGroup directive.  You\'ll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        \n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i;">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });`)
            }
            static disabledAttrWarning() {
                console.warn("\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n\n      Example:\n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    ")
            }
            static ngModelWarning(e) {
                console.warn(`\n    It looks like you're using ngModel on the same form field as ${e}.\n    Support for using the ngModel input property and ngModelChange event with\n    reactive form directives has been deprecated in Angular v6 and will be removed\n    in a future version of Angular.\n\n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/${"formControl" === e ? "FormControlDirective" : "FormControlName"}#use-with-ngmodel\n    `)
            }
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const tf = {
            provide: vp,
            useExisting: ve( () => nf),
            multi: !0
        };
        let nf = ( () => {
                class e {
                    constructor(e, t) {
                        this._renderer = e,
                            this._elementRef = t,
                            this._optionMap = new Map,
                            this._idCounter = 0,
                            this.onChange = e => {}
                            ,
                            this.onTouched = () => {}
                            ,
                            this._compareWith = Object.is
                    }
                    set compareWith(e) {
                        if ("function" != typeof e)
                            throw new Error("compareWith must be a function, but received " + JSON.stringify(e));
                        this._compareWith = e
                    }
                    writeValue(e) {
                        this.value = e;
                        const t = this._getOptionId(e);
                        null == t && this._renderer.setProperty(this._elementRef.nativeElement, "selectedIndex", -1);
                        const n = function(e, t) {
                            return null == e ? "" + t : (t && "object" == typeof t && (t = "Object"),
                                `${e}: ${t}`.slice(0, 50))
                        }(t, e);
                        this._renderer.setProperty(this._elementRef.nativeElement, "value", n)
                    }
                    registerOnChange(e) {
                        this.onChange = t => {
                            this.value = this._getOptionValue(t),
                                e(this.value)
                        }
                    }
                    registerOnTouched(e) {
                        this.onTouched = e
                    }
                    setDisabledState(e) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
                    }
                    _registerOption() {
                        return (this._idCounter++).toString()
                    }
                    _getOptionId(e) {
                        for (const t of Array.from(this._optionMap.keys()))
                            if (this._compareWith(this._optionMap.get(t), e))
                                return t;
                        return null
                    }
                    _getOptionValue(e) {
                        const t = function(e) {
                            return e.split(":")[0]
                        }(e);
                        return this._optionMap.has(t) ? this._optionMap.get(t) : e
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(Ao),Ci(xo))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["select", "formControlName", "", 3, "multiple", ""], ["select", "formControl", "", 3, "multiple", ""], ["select", "ngModel", "", 3, "multiple", ""]],
                        hostBindings: function(e, t) {
                            1 & e && Ni("change", (function(e) {
                                    return t.onChange(e.target.value)
                                }
                            ))("blur", (function() {
                                    return t.onTouched()
                                }
                            ))
                        },
                        inputs: {
                            compareWith: "compareWith"
                        },
                        features: [wo([tf])]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const sf = {
            provide: vp,
            useExisting: ve( () => rf),
            multi: !0
        };
        let rf = ( () => {
                class e {
                    constructor(e, t) {
                        this._renderer = e,
                            this._elementRef = t,
                            this._optionMap = new Map,
                            this._idCounter = 0,
                            this.onChange = e => {}
                            ,
                            this.onTouched = () => {}
                            ,
                            this._compareWith = Object.is
                    }
                    set compareWith(e) {
                        if ("function" != typeof e)
                            throw new Error("compareWith must be a function, but received " + JSON.stringify(e));
                        this._compareWith = e
                    }
                    writeValue(e) {
                        let t;
                        if (this.value = e,
                            Array.isArray(e)) {
                            const n = e.map(e => this._getOptionId(e));
                            t = (e, t) => {
                                e._setSelected(n.indexOf(t.toString()) > -1)
                            }
                        } else
                            t = (e, t) => {
                                e._setSelected(!1)
                            }
                            ;
                        this._optionMap.forEach(t)
                    }
                    registerOnChange(e) {
                        this.onChange = t => {
                            const n = [];
                            if (void 0 !== t.selectedOptions) {
                                const e = t.selectedOptions;
                                for (let t = 0; t < e.length; t++) {
                                    const s = e.item(t)
                                        , r = this._getOptionValue(s.value);
                                    n.push(r)
                                }
                            } else {
                                const e = t.options;
                                for (let t = 0; t < e.length; t++) {
                                    const s = e.item(t);
                                    if (s.selected) {
                                        const e = this._getOptionValue(s.value);
                                        n.push(e)
                                    }
                                }
                            }
                            this.value = n,
                                e(n)
                        }
                    }
                    registerOnTouched(e) {
                        this.onTouched = e
                    }
                    setDisabledState(e) {
                        this._renderer.setProperty(this._elementRef.nativeElement, "disabled", e)
                    }
                    _registerOption(e) {
                        const t = (this._idCounter++).toString();
                        return this._optionMap.set(t, e),
                            t
                    }
                    _getOptionId(e) {
                        for (const t of Array.from(this._optionMap.keys()))
                            if (this._compareWith(this._optionMap.get(t)._value, e))
                                return t;
                        return null
                    }
                    _getOptionValue(e) {
                        const t = function(e) {
                            return e.split(":")[0]
                        }(e);
                        return this._optionMap.has(t) ? this._optionMap.get(t)._value : e
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(Ao),Ci(xo))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["select", "multiple", "", "formControlName", ""], ["select", "multiple", "", "formControl", ""], ["select", "multiple", "", "ngModel", ""]],
                        hostBindings: function(e, t) {
                            1 & e && Ni("change", (function(e) {
                                    return t.onChange(e.target)
                                }
                            ))("blur", (function() {
                                    return t.onTouched()
                                }
                            ))
                        },
                        inputs: {
                            compareWith: "compareWith"
                        },
                        features: [wo([sf])]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function of(e, t) {
            return [...t.path, e]
        }
        function af(e, t) {
            e || hf(t, "Cannot find control with"),
            t.valueAccessor || hf(t, "No value accessor for form control with"),
                e.validator = Lp.compose([e.validator, t.validator]),
                e.asyncValidator = Lp.composeAsync([e.asyncValidator, t.asyncValidator]),
                t.valueAccessor.writeValue(e.value),
                function(e, t) {
                    t.valueAccessor.registerOnChange(n => {
                            e._pendingValue = n,
                                e._pendingChange = !0,
                                e._pendingDirty = !0,
                            "change" === e.updateOn && lf(e, t)
                        }
                    )
                }(e, t),
                function(e, t) {
                    e.registerOnChange( (e, n) => {
                            t.valueAccessor.writeValue(e),
                            n && t.viewToModelUpdate(e)
                        }
                    )
                }(e, t),
                function(e, t) {
                    t.valueAccessor.registerOnTouched( () => {
                            e._pendingTouched = !0,
                            "blur" === e.updateOn && e._pendingChange && lf(e, t),
                            "submit" !== e.updateOn && e.markAsTouched()
                        }
                    )
                }(e, t),
            t.valueAccessor.setDisabledState && e.registerOnDisabledChange(e => {
                    t.valueAccessor.setDisabledState(e)
                }
            ),
                t._rawValidators.forEach(t => {
                        t.registerOnValidatorChange && t.registerOnValidatorChange( () => e.updateValueAndValidity())
                    }
                ),
                t._rawAsyncValidators.forEach(t => {
                        t.registerOnValidatorChange && t.registerOnValidatorChange( () => e.updateValueAndValidity())
                    }
                )
        }
        function lf(e, t) {
            e._pendingDirty && e.markAsDirty(),
                e.setValue(e._pendingValue, {
                    emitModelToViewChange: !1
                }),
                t.viewToModelUpdate(e._pendingValue),
                e._pendingChange = !1
        }
        function cf(e, t) {
            null == e && hf(t, "Cannot find control with"),
                e.validator = Lp.compose([e.validator, t.validator]),
                e.asyncValidator = Lp.composeAsync([e.asyncValidator, t.asyncValidator])
        }
        function uf(e) {
            return hf(e, "There is no FormControl instance attached to form control element with")
        }
        function hf(e, t) {
            let n;
            throw n = e.path.length > 1 ? `path: '${e.path.join(" -> ")}'` : e.path[0] ? `name: '${e.path}'` : "unspecified name attribute",
                new Error(`${t} ${n}`)
        }
        function df(e) {
            return null != e ? Lp.compose(e.map(zp)) : null
        }
        function pf(e) {
            return null != e ? Lp.composeAsync(e.map(qp)) : null
        }
        const ff = [Ep, Yp, Gp, nf, rf, Zp];
        function mf(e) {
            const t = yf(e) ? e.validators : e;
            return Array.isArray(t) ? df(t) : t || null
        }
        function gf(e, t) {
            const n = yf(t) ? t.asyncValidators : e;
            return Array.isArray(n) ? pf(n) : n || null
        }
        function yf(e) {
            return null != e && !Array.isArray(e) && "object" == typeof e
        }
        class _f {
            constructor(e, t) {
                this.validator = e,
                    this.asyncValidator = t,
                    this._onCollectionChange = () => {}
                    ,
                    this.pristine = !0,
                    this.touched = !1,
                    this._onDisabledChange = []
            }
            get parent() {
                return this._parent
            }
            get valid() {
                return "VALID" === this.status
            }
            get invalid() {
                return "INVALID" === this.status
            }
            get pending() {
                return "PENDING" == this.status
            }
            get disabled() {
                return "DISABLED" === this.status
            }
            get enabled() {
                return "DISABLED" !== this.status
            }
            get dirty() {
                return !this.pristine
            }
            get untouched() {
                return !this.touched
            }
            get updateOn() {
                return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
            }
            setValidators(e) {
                this.validator = mf(e)
            }
            setAsyncValidators(e) {
                this.asyncValidator = gf(e)
            }
            clearValidators() {
                this.validator = null
            }
            clearAsyncValidators() {
                this.asyncValidator = null
            }
            markAsTouched(e={}) {
                this.touched = !0,
                this._parent && !e.onlySelf && this._parent.markAsTouched(e)
            }
            markAllAsTouched() {
                this.markAsTouched({
                    onlySelf: !0
                }),
                    this._forEachChild(e => e.markAllAsTouched())
            }
            markAsUntouched(e={}) {
                this.touched = !1,
                    this._pendingTouched = !1,
                    this._forEachChild(e => {
                            e.markAsUntouched({
                                onlySelf: !0
                            })
                        }
                    ),
                this._parent && !e.onlySelf && this._parent._updateTouched(e)
            }
            markAsDirty(e={}) {
                this.pristine = !1,
                this._parent && !e.onlySelf && this._parent.markAsDirty(e)
            }
            markAsPristine(e={}) {
                this.pristine = !0,
                    this._pendingDirty = !1,
                    this._forEachChild(e => {
                            e.markAsPristine({
                                onlySelf: !0
                            })
                        }
                    ),
                this._parent && !e.onlySelf && this._parent._updatePristine(e)
            }
            markAsPending(e={}) {
                this.status = "PENDING",
                !1 !== e.emitEvent && this.statusChanges.emit(this.status),
                this._parent && !e.onlySelf && this._parent.markAsPending(e)
            }
            disable(e={}) {
                const t = this._parentMarkedDirty(e.onlySelf);
                this.status = "DISABLED",
                    this.errors = null,
                    this._forEachChild(t => {
                            t.disable(Object.assign(Object.assign({}, e), {
                                onlySelf: !0
                            }))
                        }
                    ),
                    this._updateValue(),
                !1 !== e.emitEvent && (this.valueChanges.emit(this.value),
                    this.statusChanges.emit(this.status)),
                    this._updateAncestors(Object.assign(Object.assign({}, e), {
                        skipPristineCheck: t
                    })),
                    this._onDisabledChange.forEach(e => e(!0))
            }
            enable(e={}) {
                const t = this._parentMarkedDirty(e.onlySelf);
                this.status = "VALID",
                    this._forEachChild(t => {
                            t.enable(Object.assign(Object.assign({}, e), {
                                onlySelf: !0
                            }))
                        }
                    ),
                    this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: e.emitEvent
                    }),
                    this._updateAncestors(Object.assign(Object.assign({}, e), {
                        skipPristineCheck: t
                    })),
                    this._onDisabledChange.forEach(e => e(!1))
            }
            _updateAncestors(e) {
                this._parent && !e.onlySelf && (this._parent.updateValueAndValidity(e),
                e.skipPristineCheck || this._parent._updatePristine(),
                    this._parent._updateTouched())
            }
            setParent(e) {
                this._parent = e
            }
            updateValueAndValidity(e={}) {
                this._setInitialStatus(),
                    this._updateValue(),
                this.enabled && (this._cancelExistingSubscription(),
                    this.errors = this._runValidator(),
                    this.status = this._calculateStatus(),
                "VALID" !== this.status && "PENDING" !== this.status || this._runAsyncValidator(e.emitEvent)),
                !1 !== e.emitEvent && (this.valueChanges.emit(this.value),
                    this.statusChanges.emit(this.status)),
                this._parent && !e.onlySelf && this._parent.updateValueAndValidity(e)
            }
            _updateTreeValidity(e={
                emitEvent: !0
            }) {
                this._forEachChild(t => t._updateTreeValidity(e)),
                    this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: e.emitEvent
                    })
            }
            _setInitialStatus() {
                this.status = this._allControlsDisabled() ? "DISABLED" : "VALID"
            }
            _runValidator() {
                return this.validator ? this.validator(this) : null
            }
            _runAsyncValidator(e) {
                if (this.asyncValidator) {
                    this.status = "PENDING";
                    const t = Bp(this.asyncValidator(this));
                    this._asyncValidationSubscription = t.subscribe(t => this.setErrors(t, {
                        emitEvent: e
                    }))
                }
            }
            _cancelExistingSubscription() {
                this._asyncValidationSubscription && this._asyncValidationSubscription.unsubscribe()
            }
            setErrors(e, t={}) {
                this.errors = e,
                    this._updateControlsErrors(!1 !== t.emitEvent)
            }
            get(e) {
                return function(e, t, n) {
                    if (null == t)
                        return null;
                    if (Array.isArray(t) || (t = t.split(".")),
                    Array.isArray(t) && 0 === t.length)
                        return null;
                    let s = e;
                    return t.forEach(e => {
                            s = s instanceof vf ? s.controls.hasOwnProperty(e) ? s.controls[e] : null : s instanceof wf && s.at(e) || null
                        }
                    ),
                        s
                }(this, e)
            }
            getError(e, t) {
                const n = t ? this.get(t) : this;
                return n && n.errors ? n.errors[e] : null
            }
            hasError(e, t) {
                return !!this.getError(e, t)
            }
            get root() {
                let e = this;
                for (; e._parent; )
                    e = e._parent;
                return e
            }
            _updateControlsErrors(e) {
                this.status = this._calculateStatus(),
                e && this.statusChanges.emit(this.status),
                this._parent && this._parent._updateControlsErrors(e)
            }
            _initObservables() {
                this.valueChanges = new ya,
                    this.statusChanges = new ya
            }
            _calculateStatus() {
                return this._allControlsDisabled() ? "DISABLED" : this.errors ? "INVALID" : this._anyControlsHaveStatus("PENDING") ? "PENDING" : this._anyControlsHaveStatus("INVALID") ? "INVALID" : "VALID"
            }
            _anyControlsHaveStatus(e) {
                return this._anyControls(t => t.status === e)
            }
            _anyControlsDirty() {
                return this._anyControls(e => e.dirty)
            }
            _anyControlsTouched() {
                return this._anyControls(e => e.touched)
            }
            _updatePristine(e={}) {
                this.pristine = !this._anyControlsDirty(),
                this._parent && !e.onlySelf && this._parent._updatePristine(e)
            }
            _updateTouched(e={}) {
                this.touched = this._anyControlsTouched(),
                this._parent && !e.onlySelf && this._parent._updateTouched(e)
            }
            _isBoxedValue(e) {
                return "object" == typeof e && null !== e && 2 === Object.keys(e).length && "value"in e && "disabled"in e
            }
            _registerOnCollectionChange(e) {
                this._onCollectionChange = e
            }
            _setUpdateStrategy(e) {
                yf(e) && null != e.updateOn && (this._updateOn = e.updateOn)
            }
            _parentMarkedDirty(e) {
                return !e && this._parent && this._parent.dirty && !this._parent._anyControlsDirty()
            }
        }
        class bf extends _f {
            constructor(e=null, t, n) {
                super(mf(t), gf(n, t)),
                    this._onChange = [],
                    this._applyFormState(e),
                    this._setUpdateStrategy(t),
                    this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !1
                    }),
                    this._initObservables()
            }
            setValue(e, t={}) {
                this.value = this._pendingValue = e,
                this._onChange.length && !1 !== t.emitModelToViewChange && this._onChange.forEach(e => e(this.value, !1 !== t.emitViewToModelChange)),
                    this.updateValueAndValidity(t)
            }
            patchValue(e, t={}) {
                this.setValue(e, t)
            }
            reset(e=null, t={}) {
                this._applyFormState(e),
                    this.markAsPristine(t),
                    this.markAsUntouched(t),
                    this.setValue(this.value, t),
                    this._pendingChange = !1
            }
            _updateValue() {}
            _anyControls(e) {
                return !1
            }
            _allControlsDisabled() {
                return this.disabled
            }
            registerOnChange(e) {
                this._onChange.push(e)
            }
            _clearChangeFns() {
                this._onChange = [],
                    this._onDisabledChange = [],
                    this._onCollectionChange = () => {}
            }
            registerOnDisabledChange(e) {
                this._onDisabledChange.push(e)
            }
            _forEachChild(e) {}
            _syncPendingControls() {
                return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(),
                this._pendingTouched && this.markAsTouched(),
                    !this._pendingChange) || (this.setValue(this._pendingValue, {
                    onlySelf: !0,
                    emitModelToViewChange: !1
                }),
                    0))
            }
            _applyFormState(e) {
                this._isBoxedValue(e) ? (this.value = this._pendingValue = e.value,
                    e.disabled ? this.disable({
                        onlySelf: !0,
                        emitEvent: !1
                    }) : this.enable({
                        onlySelf: !0,
                        emitEvent: !1
                    })) : this.value = this._pendingValue = e
            }
        }
        class vf extends _f {
            constructor(e, t, n) {
                super(mf(t), gf(n, t)),
                    this.controls = e,
                    this._initObservables(),
                    this._setUpdateStrategy(t),
                    this._setUpControls(),
                    this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !1
                    })
            }
            registerControl(e, t) {
                return this.controls[e] ? this.controls[e] : (this.controls[e] = t,
                    t.setParent(this),
                    t._registerOnCollectionChange(this._onCollectionChange),
                    t)
            }
            addControl(e, t) {
                this.registerControl(e, t),
                    this.updateValueAndValidity(),
                    this._onCollectionChange()
            }
            removeControl(e) {
                this.controls[e] && this.controls[e]._registerOnCollectionChange( () => {}
                ),
                    delete this.controls[e],
                    this.updateValueAndValidity(),
                    this._onCollectionChange()
            }
            setControl(e, t) {
                this.controls[e] && this.controls[e]._registerOnCollectionChange( () => {}
                ),
                    delete this.controls[e],
                t && this.registerControl(e, t),
                    this.updateValueAndValidity(),
                    this._onCollectionChange()
            }
            contains(e) {
                return this.controls.hasOwnProperty(e) && this.controls[e].enabled
            }
            setValue(e, t={}) {
                this._checkAllValuesPresent(e),
                    Object.keys(e).forEach(n => {
                            this._throwIfControlMissing(n),
                                this.controls[n].setValue(e[n], {
                                    onlySelf: !0,
                                    emitEvent: t.emitEvent
                                })
                        }
                    ),
                    this.updateValueAndValidity(t)
            }
            patchValue(e, t={}) {
                Object.keys(e).forEach(n => {
                        this.controls[n] && this.controls[n].patchValue(e[n], {
                            onlySelf: !0,
                            emitEvent: t.emitEvent
                        })
                    }
                ),
                    this.updateValueAndValidity(t)
            }
            reset(e={}, t={}) {
                this._forEachChild( (n, s) => {
                        n.reset(e[s], {
                            onlySelf: !0,
                            emitEvent: t.emitEvent
                        })
                    }
                ),
                    this._updatePristine(t),
                    this._updateTouched(t),
                    this.updateValueAndValidity(t)
            }
            getRawValue() {
                return this._reduceChildren({}, (e, t, n) => (e[n] = t instanceof bf ? t.value : t.getRawValue(),
                    e))
            }
            _syncPendingControls() {
                let e = this._reduceChildren(!1, (e, t) => !!t._syncPendingControls() || e);
                return e && this.updateValueAndValidity({
                    onlySelf: !0
                }),
                    e
            }
            _throwIfControlMissing(e) {
                if (!Object.keys(this.controls).length)
                    throw new Error("\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                if (!this.controls[e])
                    throw new Error(`Cannot find form control with name: ${e}.`)
            }
            _forEachChild(e) {
                Object.keys(this.controls).forEach(t => e(this.controls[t], t))
            }
            _setUpControls() {
                this._forEachChild(e => {
                        e.setParent(this),
                            e._registerOnCollectionChange(this._onCollectionChange)
                    }
                )
            }
            _updateValue() {
                this.value = this._reduceValue()
            }
            _anyControls(e) {
                for (const t of Object.keys(this.controls)) {
                    const n = this.controls[t];
                    if (this.contains(t) && e(n))
                        return !0
                }
                return !1
            }
            _reduceValue() {
                return this._reduceChildren({}, (e, t, n) => ((t.enabled || this.disabled) && (e[n] = t.value),
                    e))
            }
            _reduceChildren(e, t) {
                let n = e;
                return this._forEachChild( (e, s) => {
                        n = t(n, e, s)
                    }
                ),
                    n
            }
            _allControlsDisabled() {
                for (const e of Object.keys(this.controls))
                    if (this.controls[e].enabled)
                        return !1;
                return Object.keys(this.controls).length > 0 || this.disabled
            }
            _checkAllValuesPresent(e) {
                this._forEachChild( (t, n) => {
                        if (void 0 === e[n])
                            throw new Error(`Must supply a value for form control with name: '${n}'.`)
                    }
                )
            }
        }
        class wf extends _f {
            constructor(e, t, n) {
                super(mf(t), gf(n, t)),
                    this.controls = e,
                    this._initObservables(),
                    this._setUpdateStrategy(t),
                    this._setUpControls(),
                    this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !1
                    })
            }
            at(e) {
                return this.controls[e]
            }
            push(e) {
                this.controls.push(e),
                    this._registerControl(e),
                    this.updateValueAndValidity(),
                    this._onCollectionChange()
            }
            insert(e, t) {
                this.controls.splice(e, 0, t),
                    this._registerControl(t),
                    this.updateValueAndValidity()
            }
            removeAt(e) {
                this.controls[e] && this.controls[e]._registerOnCollectionChange( () => {}
                ),
                    this.controls.splice(e, 1),
                    this.updateValueAndValidity()
            }
            setControl(e, t) {
                this.controls[e] && this.controls[e]._registerOnCollectionChange( () => {}
                ),
                    this.controls.splice(e, 1),
                t && (this.controls.splice(e, 0, t),
                    this._registerControl(t)),
                    this.updateValueAndValidity(),
                    this._onCollectionChange()
            }
            get length() {
                return this.controls.length
            }
            setValue(e, t={}) {
                this._checkAllValuesPresent(e),
                    e.forEach( (e, n) => {
                            this._throwIfControlMissing(n),
                                this.at(n).setValue(e, {
                                    onlySelf: !0,
                                    emitEvent: t.emitEvent
                                })
                        }
                    ),
                    this.updateValueAndValidity(t)
            }
            patchValue(e, t={}) {
                e.forEach( (e, n) => {
                        this.at(n) && this.at(n).patchValue(e, {
                            onlySelf: !0,
                            emitEvent: t.emitEvent
                        })
                    }
                ),
                    this.updateValueAndValidity(t)
            }
            reset(e=[], t={}) {
                this._forEachChild( (n, s) => {
                        n.reset(e[s], {
                            onlySelf: !0,
                            emitEvent: t.emitEvent
                        })
                    }
                ),
                    this._updatePristine(t),
                    this._updateTouched(t),
                    this.updateValueAndValidity(t)
            }
            getRawValue() {
                return this.controls.map(e => e instanceof bf ? e.value : e.getRawValue())
            }
            clear() {
                this.controls.length < 1 || (this._forEachChild(e => e._registerOnCollectionChange( () => {}
                )),
                    this.controls.splice(0),
                    this.updateValueAndValidity())
            }
            _syncPendingControls() {
                let e = this.controls.reduce( (e, t) => !!t._syncPendingControls() || e, !1);
                return e && this.updateValueAndValidity({
                    onlySelf: !0
                }),
                    e
            }
            _throwIfControlMissing(e) {
                if (!this.controls.length)
                    throw new Error("\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                if (!this.at(e))
                    throw new Error("Cannot find form control at index " + e)
            }
            _forEachChild(e) {
                this.controls.forEach( (t, n) => {
                        e(t, n)
                    }
                )
            }
            _updateValue() {
                this.value = this.controls.filter(e => e.enabled || this.disabled).map(e => e.value)
            }
            _anyControls(e) {
                return this.controls.some(t => t.enabled && e(t))
            }
            _setUpControls() {
                this._forEachChild(e => this._registerControl(e))
            }
            _checkAllValuesPresent(e) {
                this._forEachChild( (t, n) => {
                        if (void 0 === e[n])
                            throw new Error(`Must supply a value for form control at index: ${n}.`)
                    }
                )
            }
            _allControlsDisabled() {
                for (const e of this.controls)
                    if (e.enabled)
                        return !1;
                return this.controls.length > 0 || this.disabled
            }
            _registerControl(e) {
                e.setParent(this),
                    e._registerOnCollectionChange(this._onCollectionChange)
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
            }
        }
        let Ef = ( () => {
                class e extends kp {
                    ngOnInit() {
                        this._checkParentType(),
                            this.formDirective.addFormGroup(this)
                    }
                    ngOnDestroy() {
                        this.formDirective && this.formDirective.removeFormGroup(this)
                    }
                    get control() {
                        return this.formDirective.getFormGroup(this)
                    }
                    get path() {
                        return of(null == this.name ? this.name : this.name.toString(), this._parent)
                    }
                    get formDirective() {
                        return this._parent ? this._parent.formDirective : null
                    }
                    get validator() {
                        return df(this._validators)
                    }
                    get asyncValidator() {
                        return pf(this._asyncValidators)
                    }
                    _checkParentType() {}
                }
                return e.\u0275fac = function(t) {
                    return Cf(t || e)
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        features: [ro]
                    }),
                    e
            }
        )();
        const Cf = Yn(Ef);
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        let Sf = ( () => {
                class e {
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
                        hostAttrs: ["novalidate", ""]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const xf = new Me("NgModelWithFormControlWarning")
            , Tf = {
            provide: kp,
            useExisting: ve( () => kf)
        };
        let kf = ( () => {
                class e extends kp {
                    constructor(e, t) {
                        super(),
                            this._validators = e,
                            this._asyncValidators = t,
                            this.submitted = !1,
                            this.directives = [],
                            this.form = null,
                            this.ngSubmit = new ya
                    }
                    ngOnChanges(e) {
                        this._checkFormPresent(),
                        e.hasOwnProperty("form") && (this._updateValidators(),
                            this._updateDomValue(),
                            this._updateRegistrations())
                    }
                    get formDirective() {
                        return this
                    }
                    get control() {
                        return this.form
                    }
                    get path() {
                        return []
                    }
                    addControl(e) {
                        const t = this.form.get(e.path);
                        return af(t, e),
                            t.updateValueAndValidity({
                                emitEvent: !1
                            }),
                            this.directives.push(e),
                            t
                    }
                    getControl(e) {
                        return this.form.get(e.path)
                    }
                    removeControl(e) {
                        !function(e, t) {
                            const n = e.indexOf(t);
                            n > -1 && e.splice(n, 1)
                        }(this.directives, e)
                    }
                    addFormGroup(e) {
                        const t = this.form.get(e.path);
                        cf(t, e),
                            t.updateValueAndValidity({
                                emitEvent: !1
                            })
                    }
                    removeFormGroup(e) {}
                    getFormGroup(e) {
                        return this.form.get(e.path)
                    }
                    addFormArray(e) {
                        const t = this.form.get(e.path);
                        cf(t, e),
                            t.updateValueAndValidity({
                                emitEvent: !1
                            })
                    }
                    removeFormArray(e) {}
                    getFormArray(e) {
                        return this.form.get(e.path)
                    }
                    updateModel(e, t) {
                        this.form.get(e.path).setValue(t)
                    }
                    onSubmit(e) {
                        return this.submitted = !0,
                            t = this.directives,
                            this.form._syncPendingControls(),
                            t.forEach(e => {
                                    const t = e.control;
                                    "submit" === t.updateOn && t._pendingChange && (e.viewToModelUpdate(t._pendingValue),
                                        t._pendingChange = !1)
                                }
                            ),
                            this.ngSubmit.emit(e),
                            !1;
                        var t
                    }
                    onReset() {
                        this.resetForm()
                    }
                    resetForm(e) {
                        this.form.reset(e),
                            this.submitted = !1
                    }
                    _updateDomValue() {
                        this.directives.forEach(e => {
                                const t = this.form.get(e.path);
                                e.control !== t && (function(e, t) {
                                    t.valueAccessor.registerOnChange( () => uf(t)),
                                        t.valueAccessor.registerOnTouched( () => uf(t)),
                                        t._rawValidators.forEach(e => {
                                                e.registerOnValidatorChange && e.registerOnValidatorChange(null)
                                            }
                                        ),
                                        t._rawAsyncValidators.forEach(e => {
                                                e.registerOnValidatorChange && e.registerOnValidatorChange(null)
                                            }
                                        ),
                                    e && e._clearChangeFns()
                                }(e.control, e),
                                t && af(t, e),
                                    e.control = t)
                            }
                        ),
                            this.form._updateTreeValidity({
                                emitEvent: !1
                            })
                    }
                    _updateRegistrations() {
                        this.form._registerOnCollectionChange( () => this._updateDomValue()),
                        this._oldForm && this._oldForm._registerOnCollectionChange( () => {}
                        ),
                            this._oldForm = this.form
                    }
                    _updateValidators() {
                        const e = df(this._validators);
                        this.form.validator = Lp.compose([this.form.validator, e]);
                        const t = pf(this._asyncValidators);
                        this.form.asyncValidator = Lp.composeAsync([this.form.asyncValidator, t])
                    }
                    _checkFormPresent() {
                        this.form || ef.missingFormException()
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(Vp, 10),Ci(Rp, 10))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["", "formGroup", ""]],
                        hostBindings: function(e, t) {
                            1 & e && Ni("submit", (function(e) {
                                    return t.onSubmit(e)
                                }
                            ))("reset", (function() {
                                    return t.onReset()
                                }
                            ))
                        },
                        inputs: {
                            form: ["formGroup", "form"]
                        },
                        outputs: {
                            ngSubmit: "ngSubmit"
                        },
                        exportAs: ["ngForm"],
                        features: [wo([Tf]), ro, uo]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const If = {
            provide: kp,
            useExisting: ve( () => Af)
        };
        let Af = ( () => {
                class e extends Ef {
                    constructor(e, t, n) {
                        super(),
                            this._parent = e,
                            this._validators = t,
                            this._asyncValidators = n
                    }
                    _checkParentType() {
                        Df(this._parent) && ef.groupParentException()
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(kp, 13),Ci(Vp, 10),Ci(Rp, 10))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["", "formGroupName", ""]],
                        inputs: {
                            name: ["formGroupName", "name"]
                        },
                        features: [wo([If]), ro]
                    }),
                    e
            }
        )();
        const Of = {
            provide: kp,
            useExisting: ve( () => Nf)
        };
        let Nf = ( () => {
                class e extends kp {
                    constructor(e, t, n) {
                        super(),
                            this._parent = e,
                            this._validators = t,
                            this._asyncValidators = n
                    }
                    ngOnInit() {
                        this._checkParentType(),
                            this.formDirective.addFormArray(this)
                    }
                    ngOnDestroy() {
                        this.formDirective && this.formDirective.removeFormArray(this)
                    }
                    get control() {
                        return this.formDirective.getFormArray(this)
                    }
                    get formDirective() {
                        return this._parent ? this._parent.formDirective : null
                    }
                    get path() {
                        return of(null == this.name ? this.name : this.name.toString(), this._parent)
                    }
                    get validator() {
                        return df(this._validators)
                    }
                    get asyncValidator() {
                        return pf(this._asyncValidators)
                    }
                    _checkParentType() {
                        Df(this._parent) && ef.arrayParentException()
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(kp, 13),Ci(Vp, 10),Ci(Rp, 10))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["", "formArrayName", ""]],
                        inputs: {
                            name: ["formArrayName", "name"]
                        },
                        features: [wo([Of]), ro]
                    }),
                    e
            }
        )();
        function Df(e) {
            return !(e instanceof Af || e instanceof kf || e instanceof Nf)
        }
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        const Ff = {
            provide: Op,
            useExisting: ve( () => Pf)
        };
        let Pf = ( () => {
                class e extends Op {
                    constructor(e, t, n, s, r) {
                        super(),
                            this._ngModelWarningConfig = r,
                            this._added = !1,
                            this.update = new ya,
                            this._ngModelWarningSent = !1,
                            this._parent = e,
                            this._rawValidators = t || [],
                            this._rawAsyncValidators = n || [],
                            this.valueAccessor = function(e, t) {
                                if (!t)
                                    return null;
                                Array.isArray(t) || hf(e, "Value accessor was not provided as an array for form control with");
                                let n = void 0
                                    , s = void 0
                                    , r = void 0;
                                return t.forEach(t => {
                                        var i;
                                        t.constructor === xp ? n = t : (i = t,
                                            ff.some(e => i.constructor === e) ? (s && hf(e, "More than one built-in value accessor matches form control with"),
                                                s = t) : (r && hf(e, "More than one custom value accessor matches form control with"),
                                                r = t))
                                    }
                                ),
                                r || s || n || (hf(e, "No valid value accessor for form control with"),
                                    null)
                            }(this, s)
                    }
                    set isDisabled(e) {
                        ef.disabledAttrWarning()
                    }
                    ngOnChanges(t) {
                        var n, s;
                        /**
                         * @license
                         * Copyright Google LLC All Rights Reserved.
                         *
                         * Use of this source code is governed by an MIT-style license that can be
                         * found in the LICENSE file at https://angular.io/license
                         */
                        this._added || this._setUpControl(),
                        function(e, t) {
                            if (!e.hasOwnProperty("model"))
                                return !1;
                            const n = e.model;
                            return !!n.isFirstChange() || !Object.is(t, n.currentValue)
                        }(t, this.viewModel) && ("formControlName",
                            n = e,
                            this,
                            s = this._ngModelWarningConfig,
                        is() && "never" !== s && ((null !== s && "once" !== s || n._ngModelWarningSentOnce) && ("always" !== s || this._ngModelWarningSent) || (ef.ngModelWarning("formControlName"),
                            n._ngModelWarningSentOnce = !0,
                            this._ngModelWarningSent = !0)),
                            this.viewModel = this.model,
                            this.formDirective.updateModel(this, this.model))
                    }
                    ngOnDestroy() {
                        this.formDirective && this.formDirective.removeControl(this)
                    }
                    viewToModelUpdate(e) {
                        this.viewModel = e,
                            this.update.emit(e)
                    }
                    get path() {
                        return of(null == this.name ? this.name : this.name.toString(), this._parent)
                    }
                    get formDirective() {
                        return this._parent ? this._parent.formDirective : null
                    }
                    get validator() {
                        return df(this._rawValidators)
                    }
                    get asyncValidator() {
                        return pf(this._rawAsyncValidators)
                    }
                    _checkParentType() {
                        !(this._parent instanceof Af) && this._parent instanceof Ef ? ef.ngModelGroupException() : this._parent instanceof Af || this._parent instanceof kf || this._parent instanceof Nf || ef.controlParentException()
                    }
                    _setUpControl() {
                        this._checkParentType(),
                            this.control = this.formDirective.addControl(this),
                        this.control.disabled && this.valueAccessor.setDisabledState && this.valueAccessor.setDisabledState(!0),
                            this._added = !0
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(kp, 13),Ci(Vp, 10),Ci(Rp, 10),Ci(vp, 10),Ci(xf, 8))
                }
                    ,
                    e.\u0275dir = pt({
                        type: e,
                        selectors: [["", "formControlName", ""]],
                        inputs: {
                            isDisabled: ["disabled", "isDisabled"],
                            name: ["formControlName", "name"],
                            model: ["ngModel", "model"]
                        },
                        outputs: {
                            update: "ngModelChange"
                        },
                        features: [wo([Ff]), ro, uo]
                    }),
                    e._ngModelWarningSentOnce = !1,
                    e
            }
        )()
            , Mf = ( () => {
                class e {
                }
                return e.\u0275mod = ht({
                    type: e
                }),
                    e.\u0275inj = le({
                        factory: function(t) {
                            return new (t || e)
                        }
                    }),
                    e
            }
        )()
            , Vf = ( () => {
                class e {
                    group(e, t=null) {
                        const n = this._reduceControls(e);
                        let s = null
                            , r = null
                            , i = void 0;
                        return null != t && (/**
                         * @license
                         * Copyright Google LLC All Rights Reserved.
                         *
                         * Use of this source code is governed by an MIT-style license that can be
                         * found in the LICENSE file at https://angular.io/license
                         */
                            function(e) {
                                return void 0 !== e.asyncValidators || void 0 !== e.validators || void 0 !== e.updateOn
                            }(t) ? (s = null != t.validators ? t.validators : null,
                                r = null != t.asyncValidators ? t.asyncValidators : null,
                                i = null != t.updateOn ? t.updateOn : void 0) : (s = null != t.validator ? t.validator : null,
                                r = null != t.asyncValidator ? t.asyncValidator : null)),
                            new vf(n,{
                                asyncValidators: r,
                                updateOn: i,
                                validators: s
                            })
                    }
                    control(e, t, n) {
                        return new bf(e,t,n)
                    }
                    array(e, t, n) {
                        const s = e.map(e => this._createControl(e));
                        return new wf(s,t,n)
                    }
                    _reduceControls(e) {
                        const t = {};
                        return Object.keys(e).forEach(n => {
                                t[n] = this._createControl(e[n])
                            }
                        ),
                            t
                    }
                    _createControl(e) {
                        return e instanceof bf || e instanceof vf || e instanceof wf ? e : Array.isArray(e) ? this.control(e[0], e.length > 1 ? e[1] : null, e.length > 2 ? e[2] : null) : this.control(e)
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275prov = ae({
                        token: e,
                        factory: e.\u0275fac
                    }),
                    e
            }
        )()
            , Rf = ( () => {
                class e {
                    static withConfig(t) {
                        return {
                            ngModule: e,
                            providers: [{
                                provide: xf,
                                useValue: t.warnOnNgModelWithFormControl
                            }]
                        }
                    }
                }
                return e.\u0275mod = ht({
                    type: e
                }),
                    e.\u0275inj = le({
                        factory: function(t) {
                            return new (t || e)
                        },
                        providers: [Vf, Qp],
                        imports: [Mf]
                    }),
                    e
            }
        )();
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        /**
         * @license
         * Copyright Google LLC All Rights Reserved.
         *
         * Use of this source code is governed by an MIT-style license that can be
         * found in the LICENSE file at https://angular.io/license
         */
        function jf(e, t) {
            1 & e && (Ti(0, "small", 11),
                eo(1, "field required "),
                ki())
        }
        function Lf(e, t) {
            if (1 & e && (Ti(0, "small", 11),
                eo(1),
                ki()),
            2 & e) {
                const e = Pi().$implicit
                    , t = Pi();
                Is(1),
                    no(" The minimum length for this field is ", t.loginForm.get(e.name).errors.minlength.requiredLength, " characters. ")
            }
        }
        function Hf(e, t) {
            if (1 & e && (Ti(0, "small", 11),
                eo(1),
                ki()),
            2 & e) {
                const e = Pi().$implicit
                    , t = Pi();
                Is(1),
                    no(" The maximum length for this field is ", t.loginForm.get(e.name).errors.maxlength.requiredLength, " characters. ")
            }
        }
        function Bf(e, t) {
            if (1 & e && (Ti(0, "div", 8),
                Ti(1, "label"),
                eo(2),
                ki(),
                Ii(3, "input", 9),
                wi(4, jf, 2, 0, "small", 10),
                wi(5, Lf, 2, 1, "small", 10),
                wi(6, Hf, 2, 1, "small", 10),
                ki()),
            2 & e) {
                const e = t.$implicit
                    , n = Pi();
                Is(2),
                    to(e.label),
                    Is(1),
                    Si("type", e.type)("formControlName", e.name)("value", e.value),
                    Is(1),
                    Si("ngIf", n.loginForm.get(e.name).hasError("required")),
                    Is(1),
                    Si("ngIf", n.loginForm.get(e.name).hasError("minlength")),
                    Is(1),
                    Si("ngIf", n.loginForm.get(e.name).hasError("maxlength"))
            }
        }
        function $f(e, t) {
            if (1 & e) {
                const e = Ai();
                Ti(0, "button", 12),
                    Ni("click", (function() {
                            return qt(e),
                                Pi().onCallBackbutton()
                        }
                    )),
                    eo(1, "call back"),
                    ki()
            }
            2 & e && Si("disabled", !Pi().loginForm.valid)
        }
        function zf(e, t) {
            if (1 & e && (Ti(0, "small", 13),
                eo(1),
                ki()),
            2 & e) {
                const e = Pi();
                Is(1),
                    no(" ", e.errLbl, " ")
            }
        }
        function qf(e, t) {
            1 & e && Ii(0, "div", 14)
        }
        let Uf = ( () => {
                class e {
                    constructor(e, t, n) {
                        this.repository = e,
                            this.fb = t,
                            this.chatSessionHandler = n,
                            this.loginChanged = new ya,
                            this.errorSessionSub = new h
                    }
                    ngOnInit() {
                        this.loginForm = this.fb.group({}),
                            this.errLbl = this.repository.applicationInfo.lables.loginError,
                            this.loginButton = this.repository.applicationInfo.lables.loginButton,
                            this.title = this.repository.applicationInfo.lables.loginTitle,
                            this.isCallBackButton = this.repository.applicationInfo.callBackButton,
                            this.jsonFormData = {
                                controls: this.repository.applicationInfo.loginFields
                            },
                            this.createForm(this.jsonFormData.controls)
                    }
                    ngOnDestroy() {
                        this.errorSessionSub.unsubscribe()
                    }
                    createForm(e) {
                        for (const t of e) {
                            const e = [];
                            for (const [n,s] of Object.entries(t.validators))
                                switch (n) {
                                    case "min":
                                        e.push(Lp.min(s));
                                        break;
                                    case "max":
                                        e.push(Lp.max(s));
                                        break;
                                    case "required":
                                        s && e.push(Lp.required);
                                        break;
                                    case "requiredTrue":
                                        s && e.push(Lp.requiredTrue);
                                        break;
                                    case "email":
                                        s && e.push(Lp.email);
                                        break;
                                    case "minLength":
                                        e.push(Lp.minLength(s));
                                        break;
                                    case "maxLength":
                                        e.push(Lp.maxLength(s));
                                        break;
                                    case "pattern":
                                        e.push(Lp.pattern(s));
                                        break;
                                    case "nullValidator":
                                        s && e.push(Lp.nullValidator)
                                }
                            this.loginForm.addControl(t.name, this.fb.control(t.value, e))
                        }
                    }
                    get controls() {
                        return this.loginForm.get("aliases")
                    }
                    onLogin() {
                        this.isErr = !1,
                            this.isLoading = !0,
                            console.log("Form valid: ", this.loginForm.valid),
                            console.log("Form values: ", this.loginForm.value);
                        var e = [];
                        for (const n in this.loginForm.value) {
                            var t = this.jsonFormData.controls.find(e => e.name === n);
                            e.push({
                                name: n,
                                value: this.loginForm.value[n],
                                nameDisplay: null == t ? void 0 : t.label
                            })
                        }
                        this.chatSessionHandler.startSession(e).then(e => this.isLoading = !1, e => {
                                this.isErr = !0,
                                    this.isLoading = !1
                            }
                        )
                    }
                    onCallBackbutton() {
                        console.log("onCallBackbutton")
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(mp),Ci(Vf),Ci(_p))
                }
                    ,
                    e.\u0275cmp = at({
                        type: e,
                        selectors: [["app-login-form"]],
                        inputs: {
                            configSource: "configSource",
                            theme: "theme"
                        },
                        outputs: {
                            loginChanged: "loginChanged"
                        },
                        decls: 10,
                        vars: 8,
                        consts: [[2, "height", "100%", "overflow-y", "auto", "padding", "10px", "background", "linear-gradient(200deg, #e6e6e6 20%, #eee 100%)", 3, "formGroup", "ngSubmit"], [2, "text-align", "center"], ["style", "margin: 5px;", 4, "ngFor", "ngForOf"], [2, "display", "flex", "margin-top", "20px"], ["type", "submit", 1, "submit", 3, "disabled"], ["class", "submit", "type", "button", 3, "disabled", "click", 4, "ngIf"], ["class", "text-danger", "style", "text-align: center; margin-top: 5px;", 4, "ngIf"], ["class", "loader", 4, "ngIf"], [2, "margin", "5px"], [1, "full-width", 3, "type", "formControlName", "value"], ["class", "text-danger", 4, "ngIf"], [1, "text-danger"], ["type", "button", 1, "submit", 3, "disabled", "click"], [1, "text-danger", 2, "text-align", "center", "margin-top", "5px"], [1, "loader"]],
                        template: function(e, t) {
                            1 & e && (Ti(0, "form", 0),
                                Ni("ngSubmit", (function() {
                                        return t.onLogin()
                                    }
                                )),
                                Ti(1, "h2", 1),
                                eo(2),
                                ki(),
                                wi(3, Bf, 7, 7, "div", 2),
                                Ti(4, "div", 3),
                                Ti(5, "button", 4),
                                eo(6),
                                ki(),
                                wi(7, $f, 2, 1, "button", 5),
                                ki(),
                                wi(8, zf, 2, 1, "small", 6),
                                wi(9, qf, 1, 0, "div", 7),
                                ki()),
                            2 & e && (Si("formGroup", t.loginForm),
                                Is(2),
                                to(t.title),
                                Is(1),
                                Si("ngForOf", null == t.jsonFormData ? null : t.jsonFormData.controls),
                                Is(2),
                                Si("disabled", !t.loginForm.valid),
                                Is(1),
                                to(t.loginButton),
                                Is(1),
                                Si("ngIf", t.isCallBackButton),
                                Is(1),
                                Si("ngIf", t.isErr),
                                Is(1),
                                Si("ngIf", t.isLoading))
                        },
                        directives: [Sf, Fp, kf, sc, ic, xp, Dp, Pf],
                        styles: ["small[_ngcontent-%COMP%]{font-size:x-small}.text-danger[_ngcontent-%COMP%]{color:#dd0031;display:block}.full-width[_ngcontent-%COMP%]{width:100%}.blue[_ngcontent-%COMP%]{background:#1976d2}.submit[_ngcontent-%COMP%]{margin:auto;border-radius:5px;width:25%}.loader[_ngcontent-%COMP%]{border:2px solid #f3f3f3;border-top-color:#3498db;border-radius:50%;width:20px;height:20px;display:flex;margin:5px auto auto;justify-content:center;-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}@-webkit-keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}"]
                    }),
                    e
            }
        )()
            , Gf = ( () => {
                class e {
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275cmp = at({
                        type: e,
                        selectors: [["chat-avatar"]],
                        inputs: {
                            image: "image"
                        },
                        decls: 1,
                        vars: 1,
                        consts: [[1, "avatar"]],
                        template: function(e, t) {
                            1 & e && Ii(0, "img", 0),
                            2 & e && bi("src", t.image, cs)
                        },
                        styles: [".avatar[_ngcontent-%COMP%] {\n      height: 30px;\n      width: 30px;\n      border-radius: 50%;\n      float: left;\n      margin-right: 10px;\n    }"]
                    }),
                    e
            }
        )();
        const Wf = ["message"]
            , Qf = ["fileUpload"];
        function Zf(e, t) {
            if (1 & e) {
                const e = Ai();
                Ti(0, "div", 5),
                    Ti(1, "input", 6, 7),
                    Ni("change", (function(t) {
                            return qt(e),
                                Pi().onFileSelected(t)
                        }
                    )),
                    ki(),
                    Ti(3, "img", 8),
                    Ni("click", (function() {
                            return qt(e),
                                Ei(2).click()
                        }
                    )),
                    ki(),
                    Ti(4, "img", 8),
                    Ni("click", (function() {
                            return qt(e),
                                Pi().onLocation()
                        }
                    )),
                    ki(),
                    Ii(5, "div"),
                    ki()
            }
            if (2 & e) {
                const e = Pi();
                Is(3),
                    Si("src", e.attachmentIcon, cs),
                    Is(1),
                    Si("src", e.locationIcon, cs)
            }
        }
        let Kf = ( () => {
                class e {
                    constructor() {
                        this.buttonText = "\u21a9\ufe0e",
                            this.placeHolder = "",
                            this.focus = new ya,
                            this.send = new ya,
                            this.sendfile = new ya,
                            this.sendLocation = new ya,
                            this.dismiss = new ya,
                            this.readLocation = (e, t, n) => {
                                if (navigator.geolocation) {
                                    const s = navigator.geolocation.watchPosition(t => {
                                            const s = t.coords.latitude
                                                , r = t.coords.longitude;
                                            e({
                                                lat: s,
                                                lng: r
                                            }),
                                                n(t.coords.accuracy),
                                                console.log({
                                                    lat: s,
                                                    lng: r
                                                }, t.coords.accuracy),
                                            t.coords.accuracy > 10 && console.log("The GPS accuracy isn't good enough")
                                        }
                                        , e => {
                                            console.log(e.message),
                                                t(e.message)
                                        }
                                        , {
                                            enableHighAccuracy: !0,
                                            maximumAge: 0,
                                            timeout: 5
                                        });
                                    return () => {
                                        console.log("Clear watch called"),
                                            window.navigator.geolocation.clearWatch(s)
                                    }
                                }
                            }
                    }
                    ngOnInit() {
                        this.focus.subscribe( () => this.focusMessage())
                    }
                    focusMessage() {
                        this.message.nativeElement.focus()
                    }
                    getMessage() {
                        return this.message.nativeElement.value
                    }
                    clearMessage() {
                        this.message.nativeElement.value = ""
                    }
                    onSubmit() {
                        this.isMenuOpen = !1;
                        const e = this.getMessage();
                        "" !== e.trim() && (this.send.emit({
                            name: "text",
                            value: e
                        }),
                            this.clearMessage(),
                            this.focusMessage())
                    }
                    onLocation() {
                        this.isMenuOpen = !1,
                            this.getCurrentLocation().then(e => {
                                    this.send.emit({
                                        name: "geolocation",
                                        value: `acc: ${Math.round(e.acc)}, lat: ${e.lat}, lng: ${e.lng}`,
                                        location: e
                                    })
                                }
                            ).catch(e => {
                                    console.log("error: " + e)
                                }
                            )
                    }
                    onFileSelected(e) {
                        this.isMenuOpen = !1;
                        const t = e.target.files[0];
                        console.log("file size: " + t.size),
                        t && (t.size > 7e6 ? alert("File is too big! " + t.size) : (this.sendfile.emit({
                            file: t
                        }),
                            this.fileUpload.nativeElement.value = ""))
                    }
                    getCurrentLocation() {
                        return new Promise( (e, t) => {
                                navigator.geolocation ? navigator.geolocation.getCurrentPosition(t => {
                                        t && (console.log("Latitude: " + t.coords.latitude + "Longitude: " + t.coords.longitude),
                                            e({
                                                acc: t.coords.accuracy,
                                                lat: t.coords.latitude,
                                                lng: t.coords.longitude
                                            }))
                                    }
                                    , e => console.log(e)) : t("Geolocation is not supported by this browser.")
                            }
                        )
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)
                }
                    ,
                    e.\u0275cmp = at({
                        type: e,
                        selectors: [["chat-input"]],
                        viewQuery: function(e, t) {
                            var n, s;
                            1 & e && (s = Wf,
                                !0,
                                Oa(zt(), $t(), s, !0, void 0, !0),
                                Aa(Qf, !0)),
                            2 & e && (Ia(n = Na()) && (t.message = n.first),
                            Ia(n = Na()) && (t.fileUpload = n.first))
                        },
                        inputs: {
                            buttonText: "buttonText",
                            placeHolder: "placeHolder",
                            attachmentIcon: "attachmentIcon",
                            locationIcon: "locationIcon",
                            focus: "focus"
                        },
                        outputs: {
                            send: "send",
                            sendfile: "sendfile",
                            sendLocation: "sendLocation",
                            dismiss: "dismiss"
                        },
                        decls: 8,
                        vars: 3,
                        consts: [[2, "display", "flex", "justify-content", "space-between", "margin", "7px"], ["rows", "1", "type", "text", 1, "chat-input-text", 3, "placeholder", "keydown.enter", "keyup.enter", "keyup.escape"], ["message", ""], ["type", "submit", 1, "chat-input-submit", 3, "click"], ["class", "menu", 4, "ngIf"], [1, "menu"], ["type", "file", 2, "display", "none", 3, "change"], ["fileUpload", ""], ["alt", "image", 2, "width", "24px", "height", "24px", 3, "src", "click"]],
                        template: function(e, t) {
                            if (1 & e) {
                                const e = Ai();
                                Ti(0, "div", 0),
                                    Ti(1, "textarea", 1, 2),
                                    Ni("keydown.enter", (function() {
                                            return t.onSubmit()
                                        }
                                    ))("keyup.enter", (function() {
                                            return qt(e),
                                                Ei(2).value = ""
                                        }
                                    ))("keyup.escape", (function() {
                                            return t.dismiss.emit()
                                        }
                                    )),
                                    ki(),
                                    Ti(3, "button", 3),
                                    Ni("click", (function() {
                                            return t.onSubmit()
                                        }
                                    )),
                                    eo(4),
                                    ki(),
                                    Ti(5, "button", 3),
                                    Ni("click", (function() {
                                            return t.isMenuOpen = !t.isMenuOpen
                                        }
                                    )),
                                    eo(6, " \u2630 "),
                                    ki(),
                                    wi(7, Zf, 6, 2, "div", 4),
                                    ki()
                            }
                            2 & e && (Is(1),
                                Si("placeholder", t.placeHolder),
                                Is(3),
                                no(" ", t.buttonText, " "),
                                Is(3),
                                Si("ngIf", t.isMenuOpen))
                        },
                        directives: [ic],
                        styles: [".chat-input-text{width:80%;resize:none;border:none;overflow:auto;outline:none;box-shadow:none;font-size:14px;background-color:inherit;color:inherit;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}.menu{position:absolute;right:1px;bottom:45px;padding:5px;background-color:#696969;border-radius:5px}.chat-input-text::-webkit-input-placeholder{color:inherit}.chat-input-text::-moz-placeholder{color:inherit}.chat-input-text::-ms-input-placeholder{color:inherit}.chat-input-submit{background-color:inherit;color:inherit;font-size:24px;border:0;outline:none}"],
                        encapsulation: 3
                    }),
                    e
            }
        )();
        const Yf = ["bottom"];
        function Jf(e, t) {
            if (1 & e) {
                const e = Ai();
                Ti(0, "app-login-form", 10),
                    Ni("loginChanged", (function(t) {
                            return qt(e),
                                Pi(2).onloginChanged(t)
                        }
                    )),
                    ki()
            }
            if (2 & e) {
                const e = Pi(2);
                Si("theme", e.theme)("configSource", e.configSource)
            }
        }
        function Xf(e, t) {
            1 & e && Ii(0, "img", 30),
            2 & e && Si("src", Pi().$implicit.url, cs)
        }
        function em(e, t) {
            if (1 & e && (Ti(0, "div"),
                Ti(1, "a", 31),
                eo(2, "location"),
                ki(),
                ki()),
            2 & e) {
                const e = Pi().$implicit;
                Is(1),
                    Si("href", e.url, cs)
            }
        }
        function tm(e, t) {
            1 & e && (Ti(0, "span", 32),
                eo(1, "\u2714"),
                ki())
        }
        function nm(e, t) {
            if (1 & e && (function(e, t, n) {
                const s = $t()
                    , r = zt()
                    , i = r.firstCreatePass ? /**
                     * @license
                     * Copyright Google LLC All Rights Reserved.
                     *
                     * Use of this source code is governed by an MIT-style license that can be
                     * found in the LICENSE file at https://angular.io/license
                     */
                    function(e, t, n, s, r) {
                        const i = t.consts
                            , o = Rt(i, void 0)
                            , a = Ls(t, n[6], 0, 4, "ng-container", o);
                        return null !== o && di(a, o, !0),
                            Xs(t, n, a, Rt(i, void 0)),
                        null !== t.queries && t.queries.elementStart(t, a),
                            a
                    }(0, r, s) : r.data[20];
                Gt(i, !0);
                const o = s[20] = s[11].createComment("");
                Vr(r, s, o, i),
                    us(o, s),
                Et(i) && (Us(r, s, i),
                    qs(r, i, s))
            }(),
                Ti(1, "div", 24),
                Ti(2, "div"),
                Ii(3, "chat-avatar", 25),
                Ti(4, "div", 26),
                wi(5, Xf, 1, 1, "img", 27),
                wi(6, em, 3, 1, "div", 4),
                Ti(7, "label"),
                eo(8),
                ki(),
                ki(),
                ki(),
                Ti(9, "div", 28),
                eo(10),
                /**
                 * @license
                 * Copyright Google LLC All Rights Reserved.
                 *
                 * Use of this source code is governed by an MIT-style license that can be
                 * found in the LICENSE file at https://angular.io/license
                 */
                function(e, t) {
                    const n = zt();
                    let s;
                    n.firstCreatePass ? (s = function(e, t) {
                        if (t)
                            for (let n = t.length - 1; n >= 0; n--) {
                                const e = t[n];
                                if ("date" === e.name)
                                    return e
                            }
                        throw new Error("The pipe 'date' could not be found!")
                    }(0, n.pipeRegistry),
                        n.data[31] = s,
                    s.onDestroy && (n.destroyHooks || (n.destroyHooks = [])).push(31, s.onDestroy)) : s = n.data[31];
                    const r = s.factory || (s.factory = gt(s.type))
                        , i = ze(Ci)
                        , o = Mn(!1)
                        , a = r();
                    Mn(o),
                        ze(i),
                        function(e, t, n, s) {
                            31 >= e.data.length && (e.data[31] = null,
                                e.blueprint[31] = null),
                                t[31] = s
                        }(n, $t(), 0, a)
                }(),
                wi(12, tm, 2, 0, "span", 29),
                ki(),
                ki(),
                function() {
                    let e = Ut();
                    const t = zt();
                    Wt() ? Qt() : (e = e.parent,
                        Gt(e, !1)),
                    t.firstCreatePass && (fn(t, e),
                    vt(e) && t.queries.elementEnd(e))
                }()),
            2 & e) {
                const e = t.$implicit;
                Is(1),
                    qi("chat-message-received", "received" === e.type)("chat-message-sent", "sent" === e.type),
                    Si("@fadeIn", void 0),
                    Is(2),
                    Si("image", e.from.avatar),
                    Is(2),
                    Si("ngIf", "text" != e.mediaType && "geolocation" != e.mediaType),
                    Is(1),
                    Si("ngIf", "geolocation" == e.mediaType),
                    Is(2),
                    no(" ", e.text, ""),
                    Is(2),
                    no(" ", ga(11, 11, e.date, "short"), " "),
                    Is(2),
                    Si("ngIf", e.sent)
            }
        }
        function sm(e, t) {
            if (1 & e) {
                const e = Ai();
                Ti(0, "div", 11),
                    Ti(1, "div", 12),
                    Ti(2, "div"),
                    Ii(3, "chat-avatar", 13),
                    Ti(4, "label", 14),
                    eo(5),
                    ki(),
                    ki(),
                    Ti(6, "div", 15),
                    eo(7),
                    Ti(8, "span"),
                    eo(9, "\u25cf"),
                    ki(),
                    Ti(10, "button", 16),
                    Ni("click", (function() {
                            return qt(e),
                                Pi(2).endSession()
                        }
                    )),
                    eo(11, "\u2715"),
                    ki(),
                    ki(),
                    ki(),
                    Ti(12, "div", 17),
                    Ii(13, "div", 18, 19),
                    Ti(15, "label", 20, 19),
                    eo(17),
                    ki(),
                    wi(18, nm, 13, 14, "ng-container", 21),
                    ki(),
                    Ti(19, "div", 22),
                    Ti(20, "chat-input", 23),
                    Ni("send", (function(t) {
                            return qt(e),
                                Pi(2).sendMessage(t)
                        }
                    ))("sendfile", (function(t) {
                            return qt(e),
                                Pi(2).sendFile(t)
                        }
                    ))("dismiss", (function() {
                            return qt(e),
                                Pi(2).toggleChat()
                        }
                    )),
                    ki(),
                    ki(),
                    ki()
            }
            if (2 & e) {
                const e = Pi(2);
                Is(3),
                    Si("image", e.operator.avatar),
                    Is(2),
                    no(" ", e.operator.name, " "),
                    Is(2),
                    no(" ", 1 == e.operator.status ? e.repository.applicationInfo.lables.online : e.repository.applicationInfo.lables.offline, " "),
                    Is(1),
                    qi("operator-status-offline", 1 != e.operator.status)("operator-status-online", 1 == e.operator.status),
                    Is(9),
                    no(" ", 1 == e.operator.status ? "session on" : "session off", " "),
                    Is(1),
                    Si("ngForOf", e.messages),
                    Is(2),
                    Si("placeHolder", e.repository.applicationInfo.lables.messagePlaceHolder)("locationIcon", e.locationIcon)("attachmentIcon", e.attachmentIcon)("focus", e.focus)
            }
        }
        function rm(e, t) {
            if (1 & e) {
                const e = Ai();
                Ti(0, "div", 5),
                    Ii(1, "div", 6),
                    Ti(2, "button", 7),
                    Ni("click", (function() {
                            return qt(e),
                                Pi().toggleChat()
                        }
                    )),
                    eo(3, "\u2212"),
                    ki(),
                    wi(4, Jf, 1, 2, "app-login-form", 8),
                    wi(5, sm, 21, 13, "div", 9),
                    ki()
            }
            if (2 & e) {
                const e = Pi();
                Si("@fadeInOut", e.visible),
                    Is(4),
                    Si("ngIf", !e.isLoggedIn),
                    Is(1),
                    Si("ngIf", e.isLoggedIn)
            }
        }
        function im(e, t) {
            if (1 & e && (Ti(0, "span", 33),
                eo(1),
                ki()),
            2 & e) {
                const e = Pi();
                Is(1),
                    to(e.pendingMessages)
            }
        }
        function om(e, t) {
            1 & e && (Ti(0, "span"),
                eo(1, "\u2212"),
                ki()),
            2 & e && Si("@fadeIn", void 0)
        }
        function am(e, t) {
            1 & e && (Ti(0, "span"),
                eo(1, "?"),
                ki()),
            2 & e && Si("@fadeIn", void 0)
        }
        let lm = ( () => {
                class e {
                    constructor(e, t, n) {
                        this.repository = e,
                            this.chatSessionHandler = t,
                            this.fb = n,
                            this.theme = "grey",
                            this.isLoggedIn = !1,
                            this._visible = !1,
                            this.chatSessionSubs = new h,
                            this.focus = new C,
                            this.operator = {
                                name: "",
                                status: 0,
                                avatar: ""
                            },
                            this.client = {
                                name: "",
                                avatar: ""
                            },
                            this.messages = []
                    }
                    get visible() {
                        return this._visible
                    }
                    set visible(e) {
                        this._visible = e,
                        this._visible && (this.pendingMessages = 0,
                            setTimeout( () => {
                                    this.scrollToBottom(),
                                        this.focusMessage()
                                }
                                , 0))
                    }
                    ngOnInit() {
                        this.repository.getConfigJSON(this.configSource).subscribe(e => {
                                console.log(e),
                                    this.operator.avatar = `${e.applicationInfo.assetsLocation}/${e.applicationInfo.supportIcon}`,
                                    this.operator.name = e.applicationInfo.lables.chatTitle,
                                    this.client.avatar = `${e.applicationInfo.assetsLocation}/${e.applicationInfo.clientIcon}`,
                                    this.attachmentIcon = `${e.applicationInfo.assetsLocation}/${e.applicationInfo.attachmentIcon}`,
                                    this.locationIcon = `${e.applicationInfo.assetsLocation}/${e.applicationInfo.locationIcon}`
                            }
                        );
                        var e = this.chatSessionHandler.onMessagesRecieved.subscribe(e => {
                                e.forEach(e => this.addMessage(this.operator, e.value, "received", "text")),
                                this._visible || (this.pendingMessages += e.length)
                            }
                        )
                            , t = this.chatSessionHandler.onSessionStatusChanged.subscribe(e => {
                                console.log("onSessionStatusChanged: " + e),
                                0 == e && (this.messages = []),
                                    this.isLoggedIn = e > 0,
                                    this.operator.status = e
                            }
                        );
                        this.chatSessionSubs.add(e),
                            this.chatSessionSubs.add(t)
                    }
                    ngOnDestroy() {
                        this.chatSessionSubs.unsubscribe()
                    }
                    addMessage(e, t, n, s, r=!1, i=null) {
                        return this.messages.unshift({
                            from: e,
                            text: t,
                            type: n,
                            date: (new Date).getTime(),
                            mediaType: s,
                            url: i,
                            sent: r
                        }),
                            this.scrollToBottom(),
                            this.messages[0]
                    }
                    scrollToBottom() {
                        void 0 !== this.bottom && this.bottom.nativeElement.scrollIntoView()
                    }
                    focusMessage() {
                        this.focus.next(!0)
                    }
                    toggleChat() {
                        this.visible = !this.visible
                    }
                    endSession() {
                        this.chatSessionHandler.endSession()
                    }
                    sendMessage(e) {
                        if ("" !== e.value.trim()) {
                            var t = this.addMessage(this.client, e.value, "sent", e.name, !0);
                            "geolocation" == e.name && (t.text = "",
                                t.url = `https://maps.google.com/?q=${e.location.lat},${e.location.lng}`),
                                this.chatSessionHandler.isSessionStarted() ? this.repository.sendMessage(e).subscribe(e => {
                                        t.sent = !0
                                    }
                                ) : this.chatSessionHandler.startSession().then(n => {
                                        this.repository.sendMessage(e).subscribe(e => {
                                                t.sent = !0
                                            }
                                        )
                                    }
                                    , e => console.error(e))
                        }
                    }
                    handleKeyboardEvent(e) {
                        "/" === e.key && this.focusMessage(),
                        "?" !== e.key || this._visible || this.toggleChat()
                    }
                    sendFile({file: e}) {
                        var t = this.addMessage(this.client, e.name, "sent", "file", !1);
                        console.log(e.name),
                            this.getAsDataUrl(e).then(e => t.url = e);
                        var n = this.repository.uploadFile(e, e.name).subscribe(e => {
                                n.unsubscribe(),
                                    t.sent = !0
                            }
                        )
                    }
                    getAsByteArray(e) {
                        return new Promise( (t, n) => {
                                let s = new FileReader;
                                s.addEventListener("loadend", e => {
                                        t(new Uint8Array(e.target.result))
                                    }
                                ),
                                    s.addEventListener("error", n),
                                    s.readAsArrayBuffer(e)
                            }
                        )
                    }
                    getAsDataUrl(e) {
                        return new Promise( (t, n) => {
                                -1 == e.type.indexOf("image") && t(`${this.repository.applicationInfo.assetsLocation}/${this.repository.applicationInfo.fileIcon}`);
                                let s = new FileReader;
                                s.addEventListener("loadend", e => {
                                        t(e.target.result)
                                    }
                                ),
                                    s.addEventListener("error", e => t(`${this.repository.applicationInfo.assetsLocation}/${this.repository.applicationInfo.fileIcon}`)),
                                    s.readAsDataURL(e)
                            }
                        )
                    }
                }
                return e.\u0275fac = function(t) {
                    return new (t || e)(Ci(mp),Ci(_p),Ci(Vf))
                }
                    ,
                    e.\u0275cmp = at({
                        type: e,
                        selectors: [["chat-widget"]],
                        viewQuery: function(e, t) {
                            var n;
                            1 & e && Aa(Yf, !0),
                            2 & e && Ia(n = Na()) && (t.bottom = n.first)
                        },
                        hostBindings: function(e, t) {
                            1 & e && Ni("keypress", (function(e) {
                                    return t.handleKeyboardEvent(e)
                                }
                            ), !1, Dn)
                        },
                        inputs: {
                            theme: "theme",
                            configSource: "configSource",
                            visible: "visible"
                        },
                        decls: 6,
                        vars: 8,
                        consts: [[3, "dir"], ["class", "chat-box", 4, "ngIf"], [1, "chat-button", 3, "click"], ["class", "counter-badge", 4, "ngIf"], [4, "ngIf"], [1, "chat-box"], [1, "pointer"], [1, "back-button", 3, "click"], ["class", "main-component", 3, "theme", "configSource", "loginChanged", 4, "ngIf"], ["class", "main-component", 4, "ngIf"], [1, "main-component", 3, "theme", "configSource", "loginChanged"], [1, "main-component"], [1, "chat-box-header", 2, "display", "flex", "justify-content", "space-between"], [2, "vertical-align", "-webkit-baseline-middle", 3, "image"], [1, "operator-name", 2, "vertical-align", "middle"], [1, "operator-status"], [1, "chat-button-header", 3, "click"], [1, "chat-box-main"], [1, "chat-message-bottom"], ["bottom", ""], [2, "text-align", "center", "font-style", "italic"], [4, "ngFor", "ngForOf"], [1, "chat-box-footer"], [3, "placeHolder", "locationIcon", "attachmentIcon", "focus", "send", "sendfile", "dismiss"], [1, "chat-message"], [1, "chat-message-from-avatar", 3, "image"], [1, "chat-message-text"], ["style", "height: 40px; display: flex; margin: auto;", 3, "src", 4, "ngIf"], [1, "chat-message-date"], ["style", "font-size: 10px; color: #1976d2;", 4, "ngIf"], [2, "height", "40px", "display", "flex", "margin", "auto", 3, "src"], ["target", "_blank", 3, "href"], [2, "font-size", "10px", "color", "#1976d2"], [1, "counter-badge"]],
                        template: function(e, t) {
                            /**
                             * @license
                             * Copyright Google LLC All Rights Reserved.
                             *
                             * Use of this source code is governed by an MIT-style license that can be
                             * found in the LICENSE file at https://angular.io/license
                             */
                            var n, s, r;
                            1 & e && (Ti(0, "div", 0),
                                wi(1, rm, 6, 3, "div", 1),
                                Ti(2, "button", 2),
                                Ni("click", (function() {
                                        return t.toggleChat()
                                    }
                                )),
                                wi(3, im, 2, 1, "span", 3),
                                wi(4, om, 2, 1, "span", 4),
                                wi(5, am, 2, 1, "span", 4),
                                ki(),
                                ki()),
                            2 & e && (n = "wrapper ",
                                s = t.theme,
                                r = "",
                                function(e, t, n, s) {
                                    const r = zt()
                                        , i = Jt(2);
                                    r.firstUpdatePass && Wi(r, null, i, !0);
                                    const o = $t();
                                    if (n !== Cs && _i(o, i, n)) {
                                        const s = r.data[hn() + 20];
                                        if (Xi(s, !0) && !Gi(r, i)) {
                                            let e = s.classesWithoutHost;
                                            null !== e && (n = _e(e, n || "")),
                                                xi(r, s, o, n, !0)
                                        } else
                                            !function(e, t, n, s, r, i, o, a) {
                                                r === Cs && (r = Ri);
                                                let l = 0
                                                    , c = 0
                                                    , u = 0 < r.length ? r[0] : null
                                                    , h = 0 < i.length ? i[0] : null;
                                                for (; null !== u || null !== h; ) {
                                                    const o = l < r.length ? r[l + 1] : void 0
                                                        , d = c < i.length ? i[c + 1] : void 0;
                                                    let p = null
                                                        , f = void 0;
                                                    u === h ? (l += 2,
                                                        c += 2,
                                                    o !== d && (p = h,
                                                        f = d)) : null === h || null !== u && u < h ? (l += 2,
                                                        p = u) : (c += 2,
                                                        p = h,
                                                        f = d),
                                                    null !== p && Ki(e, t, n, s, p, f, !0, a),
                                                        u = l < r.length ? r[l] : null,
                                                        h = c < i.length ? i[c] : null
                                                }
                                            }(r, s, o, o[11], o[i + 1], o[i + 1] = function(e, t, n) {
                                                if (null == n || "" === n)
                                                    return Ri;
                                                const s = []
                                                    , r = ss(n);
                                                if (Array.isArray(r))
                                                    for (let i = 0; i < r.length; i++)
                                                        e(s, r[i], !0);
                                                else if ("object" == typeof r)
                                                    for (const i in r)
                                                        r.hasOwnProperty(i) && e(s, i, r[i]);
                                                else
                                                    "string" == typeof r && t(s, r);
                                                return s
                                            }(e, t, n), 0, i)
                                    }
                                }(Xe, Ui, vi($t(), n, s, r)),
                                Mi("dir", null == t.repository || null == t.repository.applicationInfo ? null : t.repository.applicationInfo.direction),
                                Is(1),
                                Si("ngIf", t.visible),
                                Is(2),
                                Si("ngIf", !t.visible && t.pendingMessages > 0),
                                Is(1),
                                Si("ngIf", t.visible),
                                Is(1),
                                Si("ngIf", !t.visible))
                        },
                        directives: [ic, Uf, Gf, sc, Kf],
                        pipes: [lc],
                        styles: ['*{box-sizing:border-box;color-scheme:light only;position:relative;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}.wrapper{height:550px;width:300px;position:absolute;bottom:0;right:auto}.pointer{position:absolute;content:" ";border-radius:4px;rotate:45deg;margin-left:30px;margin-right:30px;bottom:-7px;border:10px solid #1976d2;z-index:0}.chat-button{width:60px;height:60px;position:absolute;bottom:0;margin:15px;box-shadow:0 5px 40px rgba(0,0,0,.16);background:#1976d2;border-radius:50%;border:none;outline:none;color:#fff;font-size:32px}.chat-button-header{font-weight:700;color:#fff;border:0;background-color:inherit;padding:5px 9px;margin-left:5px}.chat-button:focus{border:2px solid #fff}.chat-box{padding:2px;margin:0;display:flex;flex-direction:column;height:450px;border-radius:5px;box-shadow:0 5px 40px rgba(0,0,0,.16);background:#1976d2}.main-component{height:100%}.chat-box-hidden{display:none}.chat-box-header{padding:10px;color:#fff}.chat-box-main{direction:ltr;flex:1;height:355px;background:linear-gradient(200deg,#eff8ff 20%,#eee);display:flex;flex-direction:column-reverse;overflow:auto}.chat-box-footer{color:#fff}.operator-name{margin:0;padding:1px}.operator-status{float:right}.operator-status span{margin-left:4px}.operator-status-online{color:#7cfc00}.operator-status-offline{color:red}.operator-avatar{height:30px;width:30px;border-radius:50%;float:left;margin-right:10px}.chat-message{display:block;width:auto;margin:5px;align-self:flex-start;flex-direction:row;max-width:80%;word-wrap:break-word}.chat-message-date{font-size:11px;color:#8d898d;padding:5px}.chat-message-from-avatar{height:35px;width:35px;border-radius:50%}.chat-message-text{margin-left:10px;padding:5px;border-radius:3px}.chat-message-received{margin-right:50px}.chat-message-received .chat-message-text{background:#ccd1d3;margin-left:50px;border-bottom-left-radius:0}.chat-message-received .chat-message-text:before{position:absolute;content:" ";left:-10px;bottom:0;border-right:10px solid #ccd1d3;border-top:10px solid transparent;z-index:0}.chat-message-received .chat-message-date{margin-left:50px}.chat-message-received .chat-message-from-avatar{position:absolute;left:0;bottom:-15px}.chat-message-sent{align-self:flex-end}.chat-message-sent .chat-message-from{float:right}.chat-message-sent .chat-message-text{background:#c8ddc8;margin-right:50px;border-bottom-right-radius:0}.chat-message-sent .chat-message-text:after{position:absolute;content:" ";right:-10px;bottom:0;border-left:10px solid #c8ddc8;border-top:10px solid transparent;z-index:0}.chat-message-sent .chat-message-date{text-align:right;padding-right:50px}small{font-size:x-small}.text-danger{color:#dd0031;display:block}.chat-message-sent .chat-message-from-avatar{position:absolute;right:0;bottom:-15px}.blue .chat-box,.blue .chat-button{background:#1976d2}.blue .pointer{border-color:#1976d2}.grey .chat-box,.grey .chat-button{background:#454549}.grey .pointer{border-color:#454549}.red .chat-box,.red .chat-button{background:#dd0031}.red .pointer{border-color:#dd0031}::-webkit-scrollbar{width:17px;background:transparent;padding:5px}::-webkit-scrollbar-track{box-shadow:inset 0 0 5px transparent;border-radius:10px}::-webkit-scrollbar-thumb{background:grey;border-radius:10px;border:5px solid #eee}::-webkit-scrollbar-thumb:hover{background:grey}.counter-badge{position:absolute;font-size:12px;background-color:#fff;color:#696969;border:1px solid #696969;top:0;right:0;height:20px;width:20px;border-radius:50%}.back-button{background-color:transparent;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;border-color:transparent;font-size:35px;color:#fff;display:none;z-index:2}@media (max-width:900px){.chat-box{height:100%;width:100%;z-index:2}.main-component{height:94%}.wrapper{height:90vh;width:90vw;margin:auto;top:0;left:0;right:0}.back-button{display:inline}.chat-box-main{height:85%}.pointer{display:none}}'],
                        encapsulation: 3,
                        data: {
                            animation: [Ad, Od]
                        }
                    }),
                    e
            }
        )()
            , cm = ( () => {
                class e {
                }
                return e.\u0275mod = ht({
                    type: e
                }),
                    e.\u0275inj = le({
                        factory: function(t) {
                            return new (t || e)
                        },
                        imports: [[cc, up, Rf]]
                    }),
                    e
            }
        )()
            , um = ( () => {
                class e {
                    constructor(e) {
                        this.injector = e
                    }
                    ngDoBootstrap() {
                        const e = xd(Id, {
                            injector: this.injector
                        })
                            , t = xd(lm, {
                            injector: this.injector
                        });
                        customElements.define("chat-config", e),
                            customElements.define("chat-widget", t)
                    }
                }
                return e.\u0275mod = ht({
                    type: e
                }),
                    e.\u0275inj = le({
                        factory: function(t) {
                            return new (t || e)(Ue(hi))
                        },
                        imports: [[Rc, nd, cm], cm]
                    }),
                    e
            }
        )();
        Mc().bootstrapModule(um).catch(e => console.log(e))
    },
    crnd: function(e, t) {
        function n(e) {
            return Promise.resolve().then((function() {
                    var t = new Error("Cannot find module '" + e + "'");
                    throw t.code = "MODULE_NOT_FOUND",
                        t
                }
            ))
        }
        n.keys = function() {
            return []
        }
            ,
            n.resolve = n,
            e.exports = n,
            n.id = "crnd"
    }
}, [[0, 0]]]);
