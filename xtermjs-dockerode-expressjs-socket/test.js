!function(e) {
    var n = "object" == typeof window && window || "object" == typeof self && self;
    "undefined" != typeof exports ? e(exports) : n && (n.hljs = e({}), "function" == typeof define && define.amd && define([], function() {
        return n.hljs
    }))
}(function(e) {
    function n(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    function t(e) {
        return e.nodeName.toLowerCase()
    }
    function r(e, n) {
        var t = e && e.exec(n);
        return t && 0 === t.index
    }
    function a(e) {
        return k.test(e)
    }
    function i(e) {
        var n,
            t,
            r,
            i,
            o = e.className + " ";
        if (o += e.parentNode ? e.parentNode.className : "", t = B.exec(o))
            return w(t[1]) ? t[1] : "no-highlight";
        for (o = o.split(/\s+/), n = 0, r = o.length; r > n; n++)
            if (i = o[n], a(i) || w(i))
                return i
    }
    function o(e) {
        var n,
            t = {},
            r = Array.prototype.slice.call(arguments, 1);
        for (n in e)
            t[n] = e[n];
        return r.forEach(function(e) {
            for (n in e)
                t[n] = e[n]
        }), t
    }
    function u(e) {
        var n = [];
        return function r(e, a) {
            for (var i = e.firstChild; i; i = i.nextSibling)
                3 === i.nodeType ? a += i.nodeValue.length : 1 === i.nodeType && (n.push({
                    event: "start",
                    offset: a,
                    node: i
                }), a = r(i, a), t(i).match(/br|hr|img|input/) || n.push({
                    event: "stop",
                    offset: a,
                    node: i
                }));
            return a
        }(e, 0), n
    }
    function c(e, r, a) {
        function i() {
            return e.length && r.length ? e[0].offset !== r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" === r[0].event ? e : r : e.length ? e : r
        }
        function o(e) {
            function r(e) {
                return " " + e.nodeName + '="' + n(e.value).replace('"', "&quot;") + '"'
            }
            s += "<" + t(e) + E.map.call(e.attributes, r).join("") + ">"
        }
        function u(e) {
            s += "</" + t(e) + ">"
        }
        function c(e) {
            ("start" === e.event ? o : u)(e.node)
        }
        for (var l = 0, s = "", f = []; e.length || r.length;) {
            var g = i();
            if (s += n(a.substring(l, g[0].offset)), l = g[0].offset, g === e) {
                f.reverse().forEach(u);
                do {
                    c(g.splice(0, 1)[0]), g = i()
                } while (g === e && g.length && g[0].offset === l);
                f.reverse().forEach(o)
            } else
                "start" === g[0].event ? f.push(g[0].node) : f.pop(), c(g.splice(0, 1)[0])
        }
        return s + n(a.substr(l))
    }
    function l(e) {
        return e.v && !e.cached_variants && (e.cached_variants = e.v.map(function(n) {
            return o(e, {
                v: null
            }, n)
        })), e.cached_variants || e.eW && [o(e)] || [e]
    }
    function s(e) {
        function n(e) {
            return e && e.source || e
        }
        function t(t, r) {
            return new RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""))
        }
        function r(a, i) {
            if (!a.compiled) {
                if (a.compiled = !0, a.k = a.k || a.bK, a.k) {
                    var o = {},
                        u = function(n, t) {
                            e.cI && (t = t.toLowerCase()), t.split(" ").forEach(function(e) {
                                var t = e.split("|");
                                o[t[0]] = [n, t[1] ? Number(t[1]) : 1]
                            })
                        };
                    "string" == typeof a.k ? u("keyword", a.k) : x(a.k).forEach(function(e) {
                        u(e, a.k[e])
                    }), a.k = o
                }
                a.lR = t(a.l || /\w+/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = t(a.i)), null == a.r && (a.r = 1), a.c || (a.c = []), a.c = Array.prototype.concat.apply([], a.c.map(function(e) {
                    return l("self" === e ? a : e)
                })), a.c.forEach(function(e) {
                    r(e, a)
                }), a.starts && r(a.starts, i);
                var c = a.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([a.tE, a.i]).map(n).filter(Boolean);
                a.t = c.length ? t(c.join("|"), !0) : {
                    exec: function() {
                        return null
                    }
                }
            }
        }
        r(e)
    }
    function f(e, t, a, i) {
        function o(e, n) {
            var t,
                a;
            for (t = 0, a = n.c.length; a > t; t++)
                if (r(n.c[t].bR, e))
                    return n.c[t]
        }
        function u(e, n) {
            if (r(e.eR, n)) {
                for (; e.endsParent && e.parent;)
                    e = e.parent;
                return e
            }
            return e.eW ? u(e.parent, n) : void 0
        }
        function c(e, n) {
            return !a && r(n.iR, e)
        }
        function l(e, n) {
            var t = N.cI ? n[0].toLowerCase() : n[0];
            return e.k.hasOwnProperty(t) && e.k[t]
        }
        function p(e, n, t, r) {
            var a = r ? "" : I.classPrefix,
                i = '<span class="' + a,
                o = t ? "" : C;
            return i += e + '">', i + n + o
        }
        function h() {
            var e,
                t,
                r,
                a;
            if (!E.k)
                return n(k);
            for (a = "", t = 0, E.lR.lastIndex = 0, r = E.lR.exec(k); r;)
                a += n(k.substring(t, r.index)), e = l(E, r), e ? (B += e[1], a += p(e[0], n(r[0]))) : a += n(r[0]), t = E.lR.lastIndex, r = E.lR.exec(k);
            return a + n(k.substr(t))
        }
        function d() {
            var e = "string" == typeof E.sL;
            if (e && !y[E.sL])
                return n(k);
            var t = e ? f(E.sL, k, !0, x[E.sL]) : g(k, E.sL.length ? E.sL : void 0);
            return E.r > 0 && (B += t.r), e && (x[E.sL] = t.top), p(t.language, t.value, !1, !0)
        }
        function b() {
            L += null != E.sL ? d() : h(), k = ""
        }
        function v(e) {
            L += e.cN ? p(e.cN, "", !0) : "", E = Object.create(e, {
                parent: {
                    value: E
                }
            })
        }
        function m(e, n) {
            if (k += e, null == n)
                return b(), 0;
            var t = o(n, E);
            if (t)
                return t.skip ? k += n : (t.eB && (k += n), b(), t.rB || t.eB || (k = n)), v(t, n), t.rB ? 0 : n.length;
            var r = u(E, n);
            if (r) {
                var a = E;
                a.skip ? k += n : (a.rE || a.eE || (k += n), b(), a.eE && (k = n));
                do {
                    E.cN && (L += C), E.skip || (B += E.r), E = E.parent
                } while (E !== r.parent);
                return r.starts && v(r.starts, ""), a.rE ? 0 : n.length
            }
            if (c(n, E))
                throw new Error('Illegal lexeme "' + n + '" for mode "' + (E.cN || "<unnamed>") + '"');
            return k += n, n.length || 1
        }
        var N = w(e);
        if (!N)
            throw new Error('Unknown language: "' + e + '"');
        s(N);
        var R,
            E = i || N,
            x = {},
            L = "";
        for (R = E; R !== N; R = R.parent)
            R.cN && (L = p(R.cN, "", !0) + L);
        var k = "",
            B = 0;
        try {
            for (var M, j, O = 0;;) {
                if (E.t.lastIndex = O, M = E.t.exec(t), !M)
                    break;
                j = m(t.substring(O, M.index), M[0]), O = M.index + j
            }
            for (m(t.substr(O)), R = E; R.parent; R = R.parent)
                R.cN && (L += C);
            return {
                r: B,
                value: L,
                language: e,
                top: E
            }
        } catch (T) {
            if (T.message && -1 !== T.message.indexOf("Illegal"))
                return {
                    r: 0,
                    value: n(t)
                };
            throw T
        }
    }
    function g(e, t) {
        t = t || I.languages || x(y);
        var r = {
                r: 0,
                value: n(e)
            },
            a = r;
        return t.filter(w).forEach(function(n) {
            var t = f(n, e, !1);
            t.language = n, t.r > a.r && (a = t), t.r > r.r && (a = r, r = t)
        }), a.language && (r.second_best = a), r
    }
    function p(e) {
        return I.tabReplace || I.useBR ? e.replace(M, function(e, n) {
            return I.useBR && "\n" === e ? "<br>" : I.tabReplace ? n.replace(/\t/g, I.tabReplace) : ""
        }) : e
    }
    function h(e, n, t) {
        var r = n ? L[n] : t,
            a = [e.trim()];
        return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(r) && a.push(r), a.join(" ").trim()
    }
    function d(e) {
        var n,
            t,
            r,
            o,
            l,
            s = i(e);
        a(s) || (I.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e, l = n.textContent, r = s ? f(s, l, !0) : g(l), t = u(n), t.length && (o = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), o.innerHTML = r.value, r.value = c(t, u(o), l)), r.value = p(r.value), e.innerHTML = r.value, e.className = h(e.className, s, r.language), e.result = {
            language: r.language,
            re: r.r
        }, r.second_best && (e.second_best = {
            language: r.second_best.language,
            re: r.second_best.r
        }))
    }
    function b(e) {
        I = o(I, e)
    }
    function v() {
        if (!v.called) {
            v.called = !0;
            var e = document.querySelectorAll("pre code");
            E.forEach.call(e, d)
        }
    }
    function m() {
        addEventListener("DOMContentLoaded", v, !1), addEventListener("load", v, !1)
    }
    function N(n, t) {
        var r = y[n] = t(e);
        r.aliases && r.aliases.forEach(function(e) {
            L[e] = n
        })
    }
    function R() {
        return x(y)
    }
    function w(e) {
        return e = (e || "").toLowerCase(), y[e] || y[L[e]]
    }
    var E = [],
        x = Object.keys,
        y = {},
        L = {},
        k = /^(no-?highlight|plain|text)$/i,
        B = /\blang(?:uage)?-([\w-]+)\b/i,
        M = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
        C = "</span>",
        I = {
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0
        };
    return e.highlight = f, e.highlightAuto = g, e.fixMarkup = p, e.highlightBlock = d, e.configure = b, e.initHighlighting = v, e.initHighlightingOnLoad = m, e.registerLanguage = N, e.listLanguages = R, e.getLanguage = w, e.inherit = o, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, e.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [e.BE]
    }, e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    }, e.PWM = {
        b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    }, e.C = function(n, t, r) {
        var a = e.inherit({
            cN: "comment",
            b: n,
            e: t,
            c: []
        }, r || {});
        return a.c.push(e.PWM), a.c.push({
            cN: "doctag",
            b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            r: 0
        }), a
    }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    }, e.CNM = {
        cN: "number",
        b: e.CNR,
        r: 0
    }, e.BNM = {
        cN: "number",
        b: e.BNR,
        r: 0
    }, e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [e.BE]
        }]
    }, e.TM = {
        cN: "title",
        b: e.IR,
        r: 0
    }, e.UTM = {
        cN: "title",
        b: e.UIR,
        r: 0
    }, e.METHOD_GUARD = {
        b: "\\.\\s*" + e.UIR,
        r: 0
    }, e
});
hljs.registerLanguage("bash", function(e) {
    var t = {
            cN: "variable",
            v: [{
                b: /\$[\w\d#@][\w\d_]*/
            }, {
                b: /\$\{(.*?)}/
            }]
        },
        s = {
            cN: "string",
            b: /"/,
            e: /"/,
            c: [e.BE, t, {
                cN: "variable",
                b: /\$\(/,
                e: /\)/,
                c: [e.BE]
            }]
        },
        a = {
            cN: "string",
            b: /'/,
            e: /'/
        };
    return {
        aliases: ["sh", "zsh"],
        l: /\b-?[a-z\._]+\b/,
        k: {
            keyword: "if then else elif fi for while in do done case esac function",
            literal: "true false",
            built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
            _: "-ne -eq -lt -gt -f -d -e -s -l -a"
        },
        c: [{
            cN: "meta",
            b: /^#![^\n]+sh\s*$/,
            r: 10
        }, {
            cN: "function",
            b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            rB: !0,
            c: [e.inherit(e.TM, {
                b: /\w[\w\d_]*/
            })],
            r: 0
        }, e.HCM, s, a, t]
    }
});
hljs.registerLanguage("dockerfile", function(e) {
    return {
        aliases: ["docker"],
        cI: !0,
        k: "from maintainer expose env arg user onbuild stopsignal",
        c: [e.HCM, e.ASM, e.QSM, e.NM, {
            bK: "run cmd entrypoint volume add copy workdir label healthcheck shell",
            starts: {
                e: /[^\\]\n/,
                sL: "bash"
            }
        }],
        i: "</"
    }
});
hljs.registerLanguage("cpp", function(t) {
    var e = {
            cN: "keyword",
            b: "\\b[a-z\\d_]*_t\\b"
        },
        r = {
            cN: "string",
            v: [{
                b: '(u8?|U)?L?"',
                e: '"',
                i: "\\n",
                c: [t.BE]
            }, {
                b: '(u8?|U)?R"',
                e: '"',
                c: [t.BE]
            }, {
                b: "'\\\\?.",
                e: "'",
                i: "."
            }]
        },
        s = {
            cN: "number",
            v: [{
                b: "\\b(0b[01']+)"
            }, {
                b: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
            }, {
                b: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
            }],
            r: 0
        },
        i = {
            cN: "meta",
            b: /#\s*[a-z]+\b/,
            e: /$/,
            k: {
                "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include"
            },
            c: [{
                b: /\\\n/,
                r: 0
            }, t.inherit(r, {
                cN: "meta-string"
            }), {
                cN: "meta-string",
                b: /<[^\n>]*>/,
                e: /$/,
                i: "\\n"
            }, t.CLCM, t.CBCM]
        },
        a = t.IR + "\\s*\\(",
        c = {
            keyword: "int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and or not",
            built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",
            literal: "true false nullptr NULL"
        },
        n = [e, t.CLCM, t.CBCM, s, r];
    return {
        aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
        k: c,
        i: "</",
        c: n.concat([i, {
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            k: c,
            c: ["self", e]
        }, {
            b: t.IR + "::",
            k: c
        }, {
            v: [{
                b: /=/,
                e: /;/
            }, {
                b: /\(/,
                e: /\)/
            }, {
                bK: "new throw return else",
                e: /;/
            }],
            k: c,
            c: n.concat([{
                b: /\(/,
                e: /\)/,
                k: c,
                c: n.concat(["self"]),
                r: 0
            }]),
            r: 0
        }, {
            cN: "function",
            b: "(" + t.IR + "[\\*&\\s]+)+" + a,
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: c,
            i: /[^\w\s\*&]/,
            c: [{
                b: a,
                rB: !0,
                c: [t.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: c,
                r: 0,
                c: [t.CLCM, t.CBCM, r, s, e]
            }, t.CLCM, t.CBCM, i]
        }, {
            cN: "class",
            bK: "class struct",
            e: /[{;:]/,
            c: [{
                b: /</,
                e: />/,
                c: ["self"]
            }, t.TM]
        }]),
        exports: {
            preprocessor: i,
            strings: r,
            k: c
        }
    }
});
hljs.registerLanguage("python", function(e) {
    var r = {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        b = {
            cN: "meta",
            b: /^(>>>|\.\.\.) /
        },
        c = {
            cN: "subst",
            b: /\{/,
            e: /\}/,
            k: r,
            i: /#/
        },
        a = {
            cN: "string",
            c: [e.BE],
            v: [{
                b: /(u|b)?r?'''/,
                e: /'''/,
                c: [b],
                r: 10
            }, {
                b: /(u|b)?r?"""/,
                e: /"""/,
                c: [b],
                r: 10
            }, {
                b: /(fr|rf|f)'''/,
                e: /'''/,
                c: [b, c]
            }, {
                b: /(fr|rf|f)"""/,
                e: /"""/,
                c: [b, c]
            }, {
                b: /(u|r|ur)'/,
                e: /'/,
                r: 10
            }, {
                b: /(u|r|ur)"/,
                e: /"/,
                r: 10
            }, {
                b: /(b|br)'/,
                e: /'/
            }, {
                b: /(b|br)"/,
                e: /"/
            }, {
                b: /(fr|rf|f)'/,
                e: /'/,
                c: [c]
            }, {
                b: /(fr|rf|f)"/,
                e: /"/,
                c: [c]
            }, e.ASM, e.QSM]
        },
        s = {
            cN: "number",
            r: 0,
            v: [{
                b: e.BNR + "[lLjJ]?"
            }, {
                b: "\\b(0o[0-7]+)[lLjJ]?"
            }, {
                b: e.CNR + "[lLjJ]?"
            }]
        },
        i = {
            cN: "params",
            b: /\(/,
            e: /\)/,
            c: ["self", b, s, a]
        };
    return c.c = [a, s, b], {
        aliases: ["py", "gyp"],
        k: r,
        i: /(<\/|->|\?)|=>/,
        c: [b, s, a, e.HCM, {
            v: [{
                cN: "function",
                bK: "def"
            }, {
                cN: "class",
                bK: "class"
            }],
            e: /:/,
            i: /[${=;\n,]/,
            c: [e.UTM, i, {
                b: /->/,
                eW: !0,
                k: "None"
            }]
        }, {
            cN: "meta",
            b: /^[\t ]*@/,
            e: /$/
        }, {
            b: /\b(print|exec)\(/
        }]
    }
});
hljs.registerLanguage("ruby", function(e) {
    var b = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
        r = {
            keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
            literal: "true false nil"
        },
        c = {
            cN: "doctag",
            b: "@[A-Za-z]+"
        },
        a = {
            b: "#<",
            e: ">"
        },
        s = [e.C("#", "$", {
            c: [c]
        }), e.C("^\\=begin", "^\\=end", {
            c: [c],
            r: 10
        }), e.C("^__END__", "\\n$")],
        n = {
            cN: "subst",
            b: "#\\{",
            e: "}",
            k: r
        },
        t = {
            cN: "string",
            c: [e.BE, n],
            v: [{
                b: /'/,
                e: /'/
            }, {
                b: /"/,
                e: /"/
            }, {
                b: /`/,
                e: /`/
            }, {
                b: "%[qQwWx]?\\(",
                e: "\\)"
            }, {
                b: "%[qQwWx]?\\[",
                e: "\\]"
            }, {
                b: "%[qQwWx]?{",
                e: "}"
            }, {
                b: "%[qQwWx]?<",
                e: ">"
            }, {
                b: "%[qQwWx]?/",
                e: "/"
            }, {
                b: "%[qQwWx]?%",
                e: "%"
            }, {
                b: "%[qQwWx]?-",
                e: "-"
            }, {
                b: "%[qQwWx]?\\|",
                e: "\\|"
            }, {
                b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
            }, {
                b: /<<(-?)\w+$/,
                e: /^\s*\w+$/
            }]
        },
        i = {
            cN: "params",
            b: "\\(",
            e: "\\)",
            endsParent: !0,
            k: r
        },
        d = [t, a, {
            cN: "class",
            bK: "class module",
            e: "$|;",
            i: /=/,
            c: [e.inherit(e.TM, {
                b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
            }), {
                b: "<\\s*",
                c: [{
                    b: "(" + e.IR + "::)?" + e.IR
                }]
            }].concat(s)
        }, {
            cN: "function",
            bK: "def",
            e: "$|;",
            c: [e.inherit(e.TM, {
                b: b
            }), i].concat(s)
        }, {
            b: e.IR + "::"
        }, {
            cN: "symbol",
            b: e.UIR + "(\\!|\\?)?:",
            r: 0
        }, {
            cN: "symbol",
            b: ":(?!\\s)",
            c: [t, {
                b: b
            }],
            r: 0
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            r: 0
        }, {
            b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
        }, {
            cN: "params",
            b: /\|/,
            e: /\|/,
            k: r
        }, {
            b: "(" + e.RSR + "|unless)\\s*",
            k: "unless",
            c: [a, {
                cN: "regexp",
                c: [e.BE, n],
                i: /\n/,
                v: [{
                    b: "/",
                    e: "/[a-z]*"
                }, {
                    b: "%r{",
                    e: "}[a-z]*"
                }, {
                    b: "%r\\(",
                    e: "\\)[a-z]*"
                }, {
                    b: "%r!",
                    e: "![a-z]*"
                }, {
                    b: "%r\\[",
                    e: "\\][a-z]*"
                }]
            }].concat(s),
            r: 0
        }].concat(s);
    n.c = d, i.c = d;
    var l = "[>?]>",
        o = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
        u = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
        w = [{
            b: /^\s*=>/,
            starts: {
                e: "$",
                c: d
            }
        }, {
            cN: "meta",
            b: "^(" + l + "|" + o + "|" + u + ")",
            starts: {
                e: "$",
                c: d
            }
        }];
    return {
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        k: r,
        i: /\/\*/,
        c: s.concat(w).concat(d)
    }
});
hljs.registerLanguage("makefile", function(e) {
    var i = {
            cN: "variable",
            v: [{
                b: "\\$\\(" + e.UIR + "\\)",
                c: [e.BE]
            }, {
                b: /\$[@%<?\^\+\*]/
            }]
        },
        r = {
            cN: "string",
            b: /"/,
            e: /"/,
            c: [e.BE, i]
        },
        a = {
            cN: "variable",
            b: /\$\([\w-]+\s/,
            e: /\)/,
            k: {
                built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
            },
            c: [i]
        },
        n = {
            b: "^" + e.UIR + "\\s*[:+?]?=",
            i: "\\n",
            rB: !0,
            c: [{
                b: "^" + e.UIR,
                e: "[:+?]?=",
                eE: !0
            }]
        },
        t = {
            cN: "meta",
            b: /^\.PHONY:/,
            e: /$/,
            k: {
                "meta-keyword": ".PHONY"
            },
            l: /[\.\w]+/
        },
        l = {
            cN: "section",
            b: /^[^\s]+:/,
            e: /$/,
            c: [i]
        };
    return {
        aliases: ["mk", "mak"],
        k: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath",
        l: /[\w-]+/,
        c: [e.HCM, i, r, a, n, t, l]
    }
});
hljs.registerLanguage("php", function(e) {
    var c = {
            b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
        },
        i = {
            cN: "meta",
            b: /<\?(php)?|\?>/
        },
        t = {
            cN: "string",
            c: [e.BE, i],
            v: [{
                b: 'b"',
                e: '"'
            }, {
                b: "b'",
                e: "'"
            }, e.inherit(e.ASM, {
                i: null
            }), e.inherit(e.QSM, {
                i: null
            })]
        },
        a = {
            v: [e.BNM, e.CNM]
        };
    return {
        aliases: ["php3", "php4", "php5", "php6"],
        cI: !0,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
        c: [e.HCM, e.C("//", "$", {
            c: [i]
        }), e.C("/\\*", "\\*/", {
            c: [{
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.C("__halt_compiler.+?;", !1, {
            eW: !0,
            k: "__halt_compiler",
            l: e.UIR
        }), {
            cN: "string",
            b: /<<<['"]?\w+['"]?$/,
            e: /^\w+;?$/,
            c: [e.BE, {
                cN: "subst",
                v: [{
                    b: /\$\w+/
                }, {
                    b: /\{\$/,
                    e: /\}/
                }]
            }]
        }, i, {
            cN: "keyword",
            b: /\$this\b/
        }, c, {
            b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
        }, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            eE: !0,
            i: "\\$|\\[|%",
            c: [e.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: ["self", c, e.CBCM, t, a]
            }]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            i: /[:\(\$"]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "namespace",
            e: ";",
            i: /[\.']/,
            c: [e.UTM]
        }, {
            bK: "use",
            e: ";",
            c: [e.UTM]
        }, {
            b: "=>"
        }, t, a]
    }
});
hljs.registerLanguage("nginx", function(e) {
    var r = {
            cN: "variable",
            v: [{
                b: /\$\d+/
            }, {
                b: /\$\{/,
                e: /}/
            }, {
                b: "[\\$\\@]" + e.UIR
            }]
        },
        b = {
            eW: !0,
            l: "[a-z/_]+",
            k: {
                literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
            },
            r: 0,
            i: "=>",
            c: [e.HCM, {
                cN: "string",
                c: [e.BE, r],
                v: [{
                    b: /"/,
                    e: /"/
                }, {
                    b: /'/,
                    e: /'/
                }]
            }, {
                b: "([a-z]+):/",
                e: "\\s",
                eW: !0,
                eE: !0,
                c: [r]
            }, {
                cN: "regexp",
                c: [e.BE, r],
                v: [{
                    b: "\\s\\^",
                    e: "\\s|{|;",
                    rE: !0
                }, {
                    b: "~\\*?\\s+",
                    e: "\\s|{|;",
                    rE: !0
                }, {
                    b: "\\*(\\.[a-z\\-]+)+"
                }, {
                    b: "([a-z\\-]+\\.)+\\*"
                }]
            }, {
                cN: "number",
                b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
            }, {
                cN: "number",
                b: "\\b\\d+[kKmMgGdshdwy]*\\b",
                r: 0
            }, r]
        };
    return {
        aliases: ["nginxconf"],
        c: [e.HCM, {
            b: e.UIR + "\\s+{",
            rB: !0,
            e: "{",
            c: [{
                cN: "section",
                b: e.UIR
            }],
            r: 0
        }, {
            b: e.UIR + "\\s",
            e: ";|{",
            rB: !0,
            c: [{
                cN: "attribute",
                b: e.UIR,
                starts: b
            }],
            r: 0
        }],
        i: "[^\\s\\}]"
    }
});
hljs.registerLanguage("apache", function(e) {
    var r = {
        cN: "number",
        b: "[\\$%]\\d+"
    };
    return {
        aliases: ["apacheconf"],
        cI: !0,
        c: [e.HCM, {
            cN: "section",
            b: "</?",
            e: ">"
        }, {
            cN: "attribute",
            b: /\w+/,
            r: 0,
            k: {
                nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
                e: /$/,
                r: 0,
                k: {
                    literal: "on off all"
                },
                c: [{
                    cN: "meta",
                    b: "\\s\\[",
                    e: "\\]$"
                }, {
                    cN: "variable",
                    b: "[\\$%]\\{",
                    e: "\\}",
                    c: ["self", r]
                }, r, e.QSM]
            }
        }],
        i: /\S/
    }
});
hljs.registerLanguage("xml", function(s) {
    var e = "[A-Za-z0-9\\._:-]+",
        t = {
            eW: !0,
            i: /</,
            r: 0,
            c: [{
                cN: "attr",
                b: e,
                r: 0
            }, {
                b: /=\s*/,
                r: 0,
                c: [{
                    cN: "string",
                    endsParent: !0,
                    v: [{
                        b: /"/,
                        e: /"/
                    }, {
                        b: /'/,
                        e: /'/
                    }, {
                        b: /[^\s"'=<>`]+/
                    }]
                }]
            }]
        };
    return {
        aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist"],
        cI: !0,
        c: [{
            cN: "meta",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{
                b: "\\[",
                e: "\\]"
            }]
        }, s.C("\x3c!--", "--\x3e", {
            r: 10
        }), {
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            b: /<\?(php)?/,
            e: /\?>/,
            sL: "php",
            c: [{
                b: "/\\*",
                e: "\\*/",
                skip: !0
            }]
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                name: "style"
            },
            c: [t],
            starts: {
                e: "</style>",
                rE: !0,
                sL: ["css", "xml"]
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                name: "script"
            },
            c: [t],
            starts: {
                e: "<\/script>",
                rE: !0,
                sL: ["actionscript", "javascript", "handlebars", "xml"]
            }
        }, {
            cN: "meta",
            v: [{
                b: /<\?xml/,
                e: /\?>/,
                r: 10
            }, {
                b: /<\?\w+/,
                e: /\?>/
            }]
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{
                cN: "name",
                b: /[^\/><\s]+/,
                r: 0
            }, t]
        }]
    }
});
hljs.registerLanguage("markdown", function(e) {
    return {
        aliases: ["md", "mkdown", "mkd"],
        c: [{
            cN: "section",
            v: [{
                b: "^#{1,6}",
                e: "$"
            }, {
                b: "^.+?\\n[=-]{2,}$"
            }]
        }, {
            b: "<",
            e: ">",
            sL: "xml",
            r: 0
        }, {
            cN: "bullet",
            b: "^([*+-]|(\\d+\\.))\\s+"
        }, {
            cN: "strong",
            b: "[*_]{2}.+?[*_]{2}"
        }, {
            cN: "emphasis",
            v: [{
                b: "\\*.+?\\*"
            }, {
                b: "_.+?_",
                r: 0
            }]
        }, {
            cN: "quote",
            b: "^>\\s+",
            e: "$"
        }, {
            cN: "code",
            v: [{
                b: "^```w*s*$",
                e: "^```s*$"
            }, {
                b: "`.+?`"
            }, {
                b: "^( {4}|\t)",
                e: "$",
                r: 0
            }]
        }, {
            b: "^[-\\*]{3,}",
            e: "$"
        }, {
            b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
            rB: !0,
            c: [{
                cN: "string",
                b: "\\[",
                e: "\\]",
                eB: !0,
                rE: !0,
                r: 0
            }, {
                cN: "link",
                b: "\\]\\(",
                e: "\\)",
                eB: !0,
                eE: !0
            }, {
                cN: "symbol",
                b: "\\]\\[",
                e: "\\]",
                eB: !0,
                eE: !0
            }],
            r: 10
        }, {
            b: /^\[[^\n]+\]:/,
            rB: !0,
            c: [{
                cN: "symbol",
                b: /\[/,
                e: /\]/,
                eB: !0,
                eE: !0
            }, {
                cN: "link",
                b: /:\s*/,
                e: /$/,
                eB: !0
            }]
        }]
    }
});
hljs.registerLanguage("fsharp", function(e) {
    var t = {
        b: "<",
        e: ">",
        c: [e.inherit(e.TM, {
            b: /'[a-zA-Z0-9_]+/
        })]
    };
    return {
        aliases: ["fs"],
        k: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield",
        i: /\/\*/,
        c: [{
            cN: "keyword",
            b: /\b(yield|return|let|do)!/
        }, {
            cN: "string",
            b: '@"',
            e: '"',
            c: [{
                b: '""'
            }]
        }, {
            cN: "string",
            b: '"""',
            e: '"""'
        }, e.C("\\(\\*", "\\*\\)"), {
            cN: "class",
            bK: "type",
            e: "\\(|=|$",
            eE: !0,
            c: [e.UTM, t]
        }, {
            cN: "meta",
            b: "\\[<",
            e: ">\\]",
            r: 10
        }, {
            cN: "symbol",
            b: "\\B('[A-Za-z])\\b",
            c: [e.BE]
        }, e.CLCM, e.inherit(e.QSM, {
            i: null
        }), e.CNM]
    }
});
hljs.registerLanguage("r", function(e) {
    var r = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";
    return {
        c: [e.HCM, {
            b: r,
            l: r,
            k: {
                keyword: "function if in break next repeat else for return switch while try tryCatch stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...",
                literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10"
            },
            r: 0
        }, {
            cN: "number",
            b: "0[xX][0-9a-fA-F]+[Li]?\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\d+\\.(?!\\d)(?:i\\b)?",
            r: 0
        }, {
            cN: "number",
            b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
            r: 0
        }, {
            b: "`",
            e: "`",
            r: 0
        }, {
            cN: "string",
            c: [e.BE],
            v: [{
                b: '"',
                e: '"'
            }, {
                b: "'",
                e: "'"
            }]
        }]
    }
});
hljs.registerLanguage("css", function(e) {
    var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
        t = {
            b: /[A-Z\_\.\-]+\s*:/,
            rB: !0,
            e: ";",
            eW: !0,
            c: [{
                cN: "attribute",
                b: /\S/,
                e: ":",
                eE: !0,
                starts: {
                    eW: !0,
                    eE: !0,
                    c: [{
                        b: /[\w-]+\(/,
                        rB: !0,
                        c: [{
                            cN: "built_in",
                            b: /[\w-]+/
                        }, {
                            b: /\(/,
                            e: /\)/,
                            c: [e.ASM, e.QSM]
                        }]
                    }, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                        cN: "number",
                        b: "#[0-9A-Fa-f]+"
                    }, {
                        cN: "meta",
                        b: "!important"
                    }]
                }
            }]
        };
    return {
        cI: !0,
        i: /[=\/|'\$]/,
        c: [e.CBCM, {
            cN: "selector-id",
            b: /#[A-Za-z0-9_-]+/
        }, {
            cN: "selector-class",
            b: /\.[A-Za-z0-9_-]+/
        }, {
            cN: "selector-attr",
            b: /\[/,
            e: /\]/,
            i: "$"
        }, {
            cN: "selector-pseudo",
            b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
        }, {
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            b: "@",
            e: "[{;]",
            i: /:/,
            c: [{
                cN: "keyword",
                b: /\w+/
            }, {
                b: /\s/,
                eW: !0,
                eE: !0,
                r: 0,
                c: [e.ASM, e.QSM, e.CSSNM]
            }]
        }, {
            cN: "selector-tag",
            b: c,
            r: 0
        }, {
            b: "{",
            e: "}",
            i: /\S/,
            c: [e.CBCM, t]
        }]
    }
});
hljs.registerLanguage("shell", function(s) {
    return {
        aliases: ["console"],
        c: [{
            cN: "meta",
            b: "^\\s{0,3}[\\w\\d\\[\\]()@-]*[>%$#]",
            starts: {
                e: "$",
                sL: "bash"
            }
        }]
    }
});
hljs.registerLanguage("diff", function(e) {
    return {
        aliases: ["patch"],
        c: [{
            cN: "meta",
            r: 10,
            v: [{
                b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/
            }, {
                b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
            }, {
                b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
            }]
        }, {
            cN: "comment",
            v: [{
                b: /Index: /,
                e: /$/
            }, {
                b: /={3,}/,
                e: /$/
            }, {
                b: /^\-{3}/,
                e: /$/
            }, {
                b: /^\*{3} /,
                e: /$/
            }, {
                b: /^\+{3}/,
                e: /$/
            }, {
                b: /\*{5}/,
                e: /\*{5}$/
            }]
        }, {
            cN: "addition",
            b: "^\\+",
            e: "$"
        }, {
            cN: "deletion",
            b: "^\\-",
            e: "$"
        }, {
            cN: "addition",
            b: "^\\!",
            e: "$"
        }]
    }
});
hljs.registerLanguage("java", function(e) {
    var a = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",
        t = a + "(<" + a + "(\\s*,\\s*" + a + ")*>)?",
        r = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",
        s = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
        c = {
            cN: "number",
            b: s,
            r: 0
        };
    return {
        aliases: ["jsp"],
        k: r,
        i: /<\/|#/,
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{
                b: /\w+@/,
                r: 0
            }, {
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
            cN: "class",
            bK: "class interface",
            e: /[{;=]/,
            eE: !0,
            k: "class interface",
            i: /[:"\[\]]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "new throw return else",
            r: 0
        }, {
            cN: "function",
            b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: r,
            c: [{
                b: e.UIR + "\\s*\\(",
                rB: !0,
                r: 0,
                c: [e.UTM]
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: r,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }, c, {
            cN: "meta",
            b: "@[A-Za-z]+"
        }]
    }
});
hljs.registerLanguage("javascript", function(e) {
    var r = "[A-Za-z$_][0-9A-Za-z$_]*",
        t = {
            keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
        },
        a = {
            cN: "number",
            v: [{
                b: "\\b(0[bB][01]+)"
            }, {
                b: "\\b(0[oO][0-7]+)"
            }, {
                b: e.CNR
            }],
            r: 0
        },
        n = {
            cN: "subst",
            b: "\\$\\{",
            e: "\\}",
            k: t,
            c: []
        },
        c = {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE, n]
        };
    n.c = [e.ASM, e.QSM, c, a, e.RM];
    var s = n.c.concat([e.CBCM, e.CLCM]);
    return {
        aliases: ["js", "jsx"],
        k: t,
        c: [{
            cN: "meta",
            r: 10,
            b: /^\s*['"]use (strict|asm)['"]/
        }, {
            cN: "meta",
            b: /^#!/,
            e: /$/
        }, e.ASM, e.QSM, c, e.CLCM, e.CBCM, a, {
            b: /[{,]\s*/,
            r: 0,
            c: [{
                b: r + "\\s*:",
                rB: !0,
                r: 0,
                c: [{
                    cN: "attr",
                    b: r,
                    r: 0
                }]
            }]
        }, {
            b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [e.CLCM, e.CBCM, e.RM, {
                cN: "function",
                b: "(\\(.*?\\)|" + r + ")\\s*=>",
                rB: !0,
                e: "\\s*=>",
                c: [{
                    cN: "params",
                    v: [{
                        b: r
                    }, {
                        b: /\(\s*\)/
                    }, {
                        b: /\(/,
                        e: /\)/,
                        eB: !0,
                        eE: !0,
                        k: t,
                        c: s
                    }]
                }]
            }, {
                b: /</,
                e: /(\/\w+|\w+\/)>/,
                sL: "xml",
                c: [{
                    b: /<\w+\s*\/>/,
                    skip: !0
                }, {
                    b: /<\w+/,
                    e: /(\/\w+|\w+\/)>/,
                    skip: !0,
                    c: [{
                        b: /<\w+\s*\/>/,
                        skip: !0
                    }, "self"]
                }]
            }],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            eE: !0,
            c: [e.inherit(e.TM, {
                b: r
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                c: s
            }],
            i: /\[|%/
        }, {
            b: /\$[(.]/
        }, e.METHOD_GUARD, {
            cN: "class",
            bK: "class",
            e: /[{;=]/,
            eE: !0,
            i: /[:"\[\]]/,
            c: [{
                bK: "extends"
            }, e.UTM]
        }, {
            bK: "constructor",
            e: /\{/,
            eE: !0
        }],
        i: /#(?!!)/
    }
});
hljs.registerLanguage("http", function(e) {
    var t = "HTTP/[0-9\\.]+";
    return {
        aliases: ["https"],
        i: "\\S",
        c: [{
            b: "^" + t,
            e: "$",
            c: [{
                cN: "number",
                b: "\\b\\d{3}\\b"
            }]
        }, {
            b: "^[A-Z]+ (.*?) " + t + "$",
            rB: !0,
            e: "$",
            c: [{
                cN: "string",
                b: " ",
                e: " ",
                eB: !0,
                eE: !0
            }, {
                b: t
            }, {
                cN: "keyword",
                b: "[A-Z]+"
            }]
        }, {
            cN: "attribute",
            b: "^\\w",
            e: ": ",
            eE: !0,
            i: "\\n|\\s|=",
            starts: {
                e: "$",
                r: 0
            }
        }, {
            b: "\\n\\n",
            starts: {
                sL: [],
                eW: !0
            }
        }]
    }
});
hljs.registerLanguage("sql", function(e) {
    var t = e.C("--", "$");
    return {
        cI: !0,
        i: /[<>{}*#]/,
        c: [{
            bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment",
            e: /;/,
            eW: !0,
            l: /[\w\.]+/,
            k: {
                keyword: "abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
                literal: "true false null",
                built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
            },
            c: [{
                cN: "string",
                b: "'",
                e: "'",
                c: [e.BE, {
                    b: "''"
                }]
            }, {
                cN: "string",
                b: '"',
                e: '"',
                c: [e.BE, {
                    b: '""'
                }]
            }, {
                cN: "string",
                b: "`",
                e: "`",
                c: [e.BE]
            }, e.CNM, e.CBCM, t]
        }, e.CBCM, t]
    }
});
hljs.registerLanguage("json", function(e) {
    var i = {
            literal: "true false null"
        },
        n = [e.QSM, e.CNM],
        r = {
            e: ",",
            eW: !0,
            eE: !0,
            c: n,
            k: i
        },
        t = {
            b: "{",
            e: "}",
            c: [{
                cN: "attr",
                b: /"/,
                e: /"/,
                c: [e.BE],
                i: "\\n"
            }, e.inherit(r, {
                b: /:/
            })],
            i: "\\S"
        },
        c = {
            b: "\\[",
            e: "\\]",
            c: [e.inherit(r)],
            i: "\\S"
        };
    return n.splice(n.length, 0, t, c), {
        c: n,
        k: i,
        i: "\\S"
    }
});
hljs.registerLanguage("go", function(e) {
    var t = {
        keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
        literal: "true false iota nil",
        built_in: "append cap close complex copy imag len make new panic print println real recover delete"
    };
    return {
        aliases: ["golang"],
        k: t,
        i: "</",
        c: [e.CLCM, e.CBCM, {
            cN: "string",
            v: [e.QSM, {
                b: "'",
                e: "[^\\\\]'"
            }, {
                b: "`",
                e: "`"
            }]
        }, {
            cN: "number",
            v: [{
                b: e.CNR + "[dflsi]",
                r: 1
            }, e.CNM]
        }, {
            b: /:=/
        }, {
            cN: "function",
            bK: "func",
            e: /\s*\{/,
            eE: !0,
            c: [e.TM, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: t,
                i: /["']/
            }]
        }]
    }
});
hljs.registerLanguage("cs", function(e) {
    var i = {
            keyword: "abstract as base bool break byte case catch char checked const continue decimal default delegate do double enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long nameof object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending async await by descending dynamic equals from get global group into join let on orderby partial remove select set value var where yield",
            literal: "null false true"
        },
        t = {
            cN: "string",
            b: '@"',
            e: '"',
            c: [{
                b: '""'
            }]
        },
        r = e.inherit(t, {
            i: /\n/
        }),
        a = {
            cN: "subst",
            b: "{",
            e: "}",
            k: i
        },
        c = e.inherit(a, {
            i: /\n/
        }),
        n = {
            cN: "string",
            b: /\$"/,
            e: '"',
            i: /\n/,
            c: [{
                b: "{{"
            }, {
                b: "}}"
            }, e.BE, c]
        },
        s = {
            cN: "string",
            b: /\$@"/,
            e: '"',
            c: [{
                b: "{{"
            }, {
                b: "}}"
            }, {
                b: '""'
            }, a]
        },
        o = e.inherit(s, {
            i: /\n/,
            c: [{
                b: "{{"
            }, {
                b: "}}"
            }, {
                b: '""'
            }, c]
        });
    a.c = [s, n, t, e.ASM, e.QSM, e.CNM, e.CBCM], c.c = [o, n, r, e.ASM, e.QSM, e.CNM, e.inherit(e.CBCM, {
        i: /\n/
    })];
    var l = {
            v: [s, n, t, e.ASM, e.QSM]
        },
        b = e.IR + "(<" + e.IR + "(\\s*,\\s*" + e.IR + ")*>)?(\\[\\])?";
    return {
        aliases: ["csharp"],
        k: i,
        i: /::/,
        c: [e.C("///", "$", {
            rB: !0,
            c: [{
                cN: "doctag",
                v: [{
                    b: "///",
                    r: 0
                }, {
                    b: "\x3c!--|--\x3e"
                }, {
                    b: "</?",
                    e: ">"
                }]
            }]
        }), e.CLCM, e.CBCM, {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
            }
        }, l, e.CNM, {
            bK: "class interface",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.TM, e.CLCM, e.CBCM]
        }, {
            bK: "namespace",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.inherit(e.TM, {
                b: "[a-zA-Z](\\.?\\w)*"
            }), e.CLCM, e.CBCM]
        }, {
            cN: "meta",
            b: "^\\s*\\[",
            eB: !0,
            e: "\\]",
            eE: !0,
            c: [{
                cN: "meta-string",
                b: /"/,
                e: /"/
            }]
        }, {
            bK: "new return throw await else",
            r: 0
        }, {
            cN: "function",
            b: "(" + b + "\\s+)+" + e.IR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: i,
            c: [{
                b: e.IR + "\\s*\\(",
                rB: !0,
                c: [e.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                k: i,
                r: 0,
                c: [l, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }]
    }
});
hljs.registerLanguage("yaml", function(e) {
    var a = {
            literal: "{ } true false yes no Yes No True False null"
        },
        b = "^[ \\-]*",
        r = "[a-zA-Z_][\\w\\-]*",
        t = {
            cN: "attr",
            v: [{
                b: b + r + ":"
            }, {
                b: b + '"' + r + '":'
            }, {
                b: b + "'" + r + "':"
            }]
        },
        c = {
            cN: "template-variable",
            v: [{
                b: "{{",
                e: "}}"
            }, {
                b: "%{",
                e: "}"
            }]
        },
        l = {
            cN: "string",
            r: 0,
            v: [{
                b: /'/,
                e: /'/
            }, {
                b: /"/,
                e: /"/
            }],
            c: [e.BE, c]
        };
    return {
        cI: !0,
        aliases: ["yml", "YAML", "yaml"],
        c: [t, {
            cN: "meta",
            b: "^---s*$",
            r: 10
        }, {
            cN: "string",
            b: "[\\|>] *$",
            rE: !0,
            c: l.c,
            e: t.v[0].b
        }, {
            b: "<%[%=-]?",
            e: "[%-]?%>",
            sL: "ruby",
            eB: !0,
            eE: !0,
            r: 0
        }, {
            cN: "type",
            b: "!!" + e.UIR
        }, {
            cN: "meta",
            b: "&" + e.UIR + "$"
        }, {
            cN: "meta",
            b: "\\*" + e.UIR + "$"
        }, {
            cN: "bullet",
            b: "^ *-",
            r: 0
        }, l, e.HCM, e.CNM],
        k: a
    }
});
!function(a) {
    "use strict";
    function b(a, c) {
        if (!(this instanceof b)) {
            var d = new b(a, c);
            return d.open(), d
        }
        this.id = b.id++, this.setup(a, c), this.chainCallbacks(b._callbackChain)
    }
    function c(a, b) {
        var c = {};
        for (var d in a)
            d in b && (c[d] = a[d], delete a[d]);
        return c
    }
    function d(a, b) {
        var c = {},
            d = new RegExp("^" + b + "([A-Z])(.*)");
        for (var e in a) {
            var f = e.match(d);
            if (f) {
                var g = (f[1] + f[2].replace(/([A-Z])/g, "-$1")).toLowerCase();
                c[g] = a[e]
            }
        }
        return c
    }
    if ("undefined" == typeof a)
        return void ("console" in window && window.console.info("Too much lightness, Featherlight needs jQuery."));
    var e = [],
        f = function(b) {
            return e = a.grep(e, function(a) {
                return a !== b && a.$instance.closest("body").length > 0
            })
        },
        g = {
            allowfullscreen: 1,
            frameborder: 1,
            height: 1,
            longdesc: 1,
            marginheight: 1,
            marginwidth: 1,
            name: 1,
            referrerpolicy: 1,
            scrolling: 1,
            sandbox: 1,
            src: 1,
            srcdoc: 1,
            width: 1
        },
        h = {
            keyup: "onKeyUp",
            resize: "onResize"
        },
        i = function(c) {
            a.each(b.opened().reverse(), function() {
                return c.isDefaultPrevented() || !1 !== this[h[c.type]](c) ? void 0 : (c.preventDefault(), c.stopPropagation(), !1)
            })
        },
        j = function(c) {
            if (c !== b._globalHandlerInstalled) {
                b._globalHandlerInstalled = c;
                var d = a.map(h, function(a, c) {
                    return c + "." + b.prototype.namespace
                }).join(" ");
                a(window)[c ? "on" : "off"](d, i)
            }
        };
    b.prototype = {
        constructor: b,
        namespace: "featherlight",
        targetAttr: "data-featherlight",
        variant: null,
        resetCss: !1,
        background: null,
        openTrigger: "click",
        closeTrigger: "click",
        filter: null,
        root: "body",
        openSpeed: 250,
        closeSpeed: 250,
        closeOnClick: "background",
        closeOnEsc: !0,
        closeIcon: "&#10005;",
        loading: "",
        persist: !1,
        otherClose: null,
        beforeOpen: a.noop,
        beforeContent: a.noop,
        beforeClose: a.noop,
        afterOpen: a.noop,
        afterContent: a.noop,
        afterClose: a.noop,
        onKeyUp: a.noop,
        onResize: a.noop,
        type: null,
        contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
        setup: function(b, c) {
            "object" != typeof b || b instanceof a != !1 || c || (c = b, b = void 0);
            var d = a.extend(this, c, {
                    target: b
                }),
                e = d.resetCss ? d.namespace + "-reset" : d.namespace,
                f = a(d.background || ['<div class="' + e + "-loading " + e + '">', '<div class="' + e + '-content">', '<button class="' + e + "-close-icon " + d.namespace + '-close" aria-label="Close">', d.closeIcon, "</button>", '<div class="' + d.namespace + '-inner">' + d.loading + "</div>", "</div>", "</div>"].join("")),
                g = "." + d.namespace + "-close" + (d.otherClose ? "," + d.otherClose : "");
            return d.$instance = f.clone().addClass(d.variant), d.$instance.on(d.closeTrigger + "." + d.namespace, function(b) {
                var c = a(b.target);
                ("background" === d.closeOnClick && c.is("." + d.namespace) || "anywhere" === d.closeOnClick || c.closest(g).length) && (d.close(b), b.preventDefault())
            }), this
        },
        getContent: function() {
            if (this.persist !== !1 && this.$content)
                return this.$content;
            var b = this,
                c = this.constructor.contentFilters,
                d = function(a) {
                    return b.$currentTarget && b.$currentTarget.attr(a)
                },
                e = d(b.targetAttr),
                f = b.target || e || "",
                g = c[b.type];
            if (!g && f in c && (g = c[f], f = b.target && e), f = f || d("href") || "", !g)
                for (var h in c)
                    b[h] && (g = c[h], f = b[h]);
            if (!g) {
                var i = f;
                if (f = null, a.each(b.contentFilters, function() {
                    return g = c[this], g.test && (f = g.test(i)), !f && g.regex && i.match && i.match(g.regex) && (f = i), !f
                }), !f)
                    return "console" in window && window.console.error("Featherlight: no content filter found " + (i ? ' for "' + i + '"' : " (no target specified)")), !1
            }
            return g.process.call(b, f)
        },
        setContent: function(b) {
            var c = this;
            return b.is("iframe") && c.$instance.addClass(c.namespace + "-iframe"), c.$instance.removeClass(c.namespace + "-loading"), c.$instance.find("." + c.namespace + "-inner").not(b).slice(1).remove().end().replaceWith(a.contains(c.$instance[0], b[0]) ? "" : b), c.$content = b.addClass(c.namespace + "-inner"), c
        },
        open: function(b) {
            var c = this;
            if (c.$instance.hide().appendTo(c.root), !(b && b.isDefaultPrevented() || c.beforeOpen(b) === !1)) {
                b && b.preventDefault();
                var d = c.getContent();
                if (d)
                    return e.push(c), j(!0), c.$instance.fadeIn(c.openSpeed), c.beforeContent(b), a.when(d).always(function(a) {
                        c.setContent(a), c.afterContent(b)
                    }).then(c.$instance.promise()).done(function() {
                        c.afterOpen(b)
                    })
            }
            return c.$instance.detach(), a.Deferred().reject().promise()
        },
        close: function(b) {
            var c = this,
                d = a.Deferred();
            return c.beforeClose(b) === !1 ? d.reject() : (0 === f(c).length && j(!1), c.$instance.fadeOut(c.closeSpeed, function() {
                c.$instance.detach(), c.afterClose(b), d.resolve()
            })), d.promise()
        },
        resize: function(a, b) {
            if (a && b) {
                this.$content.css("width", "").css("height", "");
                var c = Math.max(a / (this.$content.parent().width() - 1), b / (this.$content.parent().height() - 1));
                c > 1 && (c = b / Math.floor(b / c), this.$content.css("width", "" + a / c + "px").css("height", "" + b / c + "px"))
            }
        },
        chainCallbacks: function(b) {
            for (var c in b)
                this[c] = a.proxy(b[c], this, a.proxy(this[c], this))
        }
    }, a.extend(b, {
        id: 0,
        autoBind: "[data-featherlight]",
        defaults: b.prototype,
        contentFilters: {
            jquery: {
                regex: /^[#.]\w/,
                test: function(b) {
                    return b instanceof a && b
                },
                process: function(b) {
                    return this.persist !== !1 ? a(b) : a(b).clone(!0)
                }
            },
            image: {
                regex: /\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,
                process: function(b) {
                    var c = this,
                        d = a.Deferred(),
                        e = new Image,
                        f = a('<img src="' + b + '" alt="" class="' + c.namespace + '-image" />');
                    return e.onload = function() {
                        f.naturalWidth = e.width, f.naturalHeight = e.height, d.resolve(f)
                    }, e.onerror = function() {
                        d.reject(f)
                    }, e.src = b, d.promise()
                }
            },
            html: {
                regex: /^\s*<[\w!][^<]*>/,
                process: function(b) {
                    return a(b)
                }
            },
            ajax: {
                regex: /./,
                process: function(b) {
                    var c = a.Deferred(),
                        d = a("<div></div>").load(b, function(a, b) {
                            "error" !== b && c.resolve(d.contents()), c.fail()
                        });
                    return c.promise()
                }
            },
            iframe: {
                process: function(b) {
                    var e = new a.Deferred,
                        f = a("<iframe/>"),
                        h = d(this, "iframe"),
                        i = c(h, g);
                    return f.hide().attr("src", b).attr(i).css(h).on("load", function() {
                        e.resolve(f.show())
                    }).appendTo(this.$instance.find("." + this.namespace + "-content")), e.promise()
                }
            },
            text: {
                process: function(b) {
                    return a("<div>", {
                        text: b
                    })
                }
            }
        },
        functionAttributes: ["beforeOpen", "afterOpen", "beforeContent", "afterContent", "beforeClose", "afterClose"],
        readElementConfig: function(b, c) {
            var d = this,
                e = new RegExp("^data-" + c + "-(.*)"),
                f = {};
            return b && b.attributes && a.each(b.attributes, function() {
                var b = this.name.match(e);
                if (b) {
                    var c = this.value,
                        g = a.camelCase(b[1]);
                    if (a.inArray(g, d.functionAttributes) >= 0)
                        c = new Function(c);
                    else
                        try {
                            c = JSON.parse(c)
                        } catch (h) {}
                    f[g] = c
                }
            }), f
        },
        extend: function(b, c) {
            var d = function() {
                this.constructor = b
            };
            return d.prototype = this.prototype, b.prototype = new d, b.__super__ = this.prototype, a.extend(b, this, c), b.defaults = b.prototype, b
        },
        attach: function(b, c, d) {
            var e = this;
            "object" != typeof c || c instanceof a != !1 || d || (d = c, c = void 0), d = a.extend({}, d);
            var f,
                g = d.namespace || e.defaults.namespace,
                h = a.extend({}, e.defaults, e.readElementConfig(b[0], g), d),
                i = function(g) {
                    var i = a(g.currentTarget),
                        j = a.extend({
                            $source: b,
                            $currentTarget: i
                        }, e.readElementConfig(b[0], h.namespace), e.readElementConfig(g.currentTarget, h.namespace), d),
                        k = f || i.data("featherlight-persisted") || new e(c, j);
                    "shared" === k.persist ? f = k : k.persist !== !1 && i.data("featherlight-persisted", k), j.$currentTarget.blur && j.$currentTarget.blur(), k.open(g)
                };
            return b.on(h.openTrigger + "." + h.namespace, h.filter, i), i
        },
        current: function() {
            var a = this.opened();
            return a[a.length - 1] || null
        },
        opened: function() {
            var b = this;
            return f(), a.grep(e, function(a) {
                return a instanceof b
            })
        },
        close: function(a) {
            var b = this.current();
            return b ? b.close(a) : void 0
        },
        _onReady: function() {
            var b = this;
            b.autoBind && (a(b.autoBind).each(function() {
                b.attach(a(this))
            }), a(document).on("click", b.autoBind, function(c) {
                if (!c.isDefaultPrevented()) {
                    var d = b.attach(a(c.currentTarget));
                    d(c)
                }
            }))
        },
        _callbackChain: {
            onKeyUp: function(b, c) {
                return 27 === c.keyCode ? (this.closeOnEsc && a.featherlight.close(c), !1) : b(c)
            },
            beforeOpen: function(b, c) {
                return a(document.documentElement).addClass("with-featherlight"), this._previouslyActive = document.activeElement, this._$previouslyTabbable = a("a, input, select, textarea, iframe, button, iframe, [contentEditable=true]").not("[tabindex]").not(this.$instance.find("button")), this._$previouslyWithTabIndex = a("[tabindex]").not('[tabindex="-1"]'), this._previousWithTabIndices = this._$previouslyWithTabIndex.map(function(b, c) {
                    return a(c).attr("tabindex")
                }), this._$previouslyWithTabIndex.add(this._$previouslyTabbable).attr("tabindex", -1), document.activeElement.blur && document.activeElement.blur(), b(c)
            },
            afterClose: function(c, d) {
                var e = c(d),
                    f = this;
                return this._$previouslyTabbable.removeAttr("tabindex"), this._$previouslyWithTabIndex.each(function(b, c) {
                    a(c).attr("tabindex", f._previousWithTabIndices[b])
                }), this._previouslyActive.focus(), 0 === b.opened().length && a(document.documentElement).removeClass("with-featherlight"), e
            },
            onResize: function(a, b) {
                return this.resize(this.$content.naturalWidth, this.$content.naturalHeight), a(b)
            },
            afterContent: function(a, b) {
                var c = a(b);
                return this.$instance.find("[autofocus]:not([disabled])").focus(), this.onResize(b), c
            }
        }
    }), a.featherlight = b, a.fn.featherlight = function(a, c) {
        return b.attach(this, a, c), this
    }, a(document).ready(function() {
        b._onReady()
    })
}(jQuery);
!function(t) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Clipboard = t()
    }
}(function() {
    var t,
        e,
        n;
    return function t(e, n, o) {
        function i(a, c) {
            if (!n[a]) {
                if (!e[a]) {
                    var s = "function" == typeof require && require;
                    if (!c && s)
                        return s(a, !0);
                    if (r)
                        return r(a, !0);
                    var l = new Error("Cannot find module '" + a + "'");
                    throw l.code = "MODULE_NOT_FOUND", l
                }
                var u = n[a] = {
                    exports: {}
                };
                e[a][0].call(u.exports, function(t) {
                    var n = e[a][1][t];
                    return i(n ? n : t)
                }, u, u.exports, t, e, n, o)
            }
            return n[a].exports
        }
        for (var r = "function" == typeof require && require, a = 0; a < o.length; a++)
            i(o[a]);
        return i
    }({
        1: [function(t, e, n) {
            var o = t("matches-selector");
            e.exports = function(t, e, n) {
                for (var i = n ? t : t.parentNode; i && i !== document;) {
                    if (o(i, e))
                        return i;
                    i = i.parentNode
                }
            }
        }, {
            "matches-selector": 5
        }],
        2: [function(t, e, n) {
            function o(t, e, n, o, r) {
                var a = i.apply(this, arguments);
                return t.addEventListener(n, a, r), {
                    destroy: function() {
                        t.removeEventListener(n, a, r)
                    }
                }
            }
            function i(t, e, n, o) {
                return function(n) {
                    n.delegateTarget = r(n.target, e, !0), n.delegateTarget && o.call(t, n)
                }
            }
            var r = t("closest");
            e.exports = o
        }, {
            closest: 1
        }],
        3: [function(t, e, n) {
            n.node = function(t) {
                return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
            }, n.nodeList = function(t) {
                var e = Object.prototype.toString.call(t);
                return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]))
            }, n.string = function(t) {
                return "string" == typeof t || t instanceof String
            }, n.fn = function(t) {
                var e = Object.prototype.toString.call(t);
                return "[object Function]" === e
            }
        }, {}],
        4: [function(t, e, n) {
            function o(t, e, n) {
                if (!t && !e && !n)
                    throw new Error("Missing required arguments");
                if (!c.string(e))
                    throw new TypeError("Second argument must be a String");
                if (!c.fn(n))
                    throw new TypeError("Third argument must be a Function");
                if (c.node(t))
                    return i(t, e, n);
                if (c.nodeList(t))
                    return r(t, e, n);
                if (c.string(t))
                    return a(t, e, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
            }
            function i(t, e, n) {
                return t.addEventListener(e, n), {
                    destroy: function() {
                        t.removeEventListener(e, n)
                    }
                }
            }
            function r(t, e, n) {
                return Array.prototype.forEach.call(t, function(t) {
                    t.addEventListener(e, n)
                }), {
                    destroy: function() {
                        Array.prototype.forEach.call(t, function(t) {
                            t.removeEventListener(e, n)
                        })
                    }
                }
            }
            function a(t, e, n) {
                return s(document.body, t, e, n)
            }
            var c = t("./is"),
                s = t("delegate");
            e.exports = o
        }, {
            "./is": 3,
            delegate: 2
        }],
        5: [function(t, e, n) {
            function o(t, e) {
                if (r)
                    return r.call(t, e);
                for (var n = t.parentNode.querySelectorAll(e), o = 0; o < n.length; ++o)
                    if (n[o] == t)
                        return !0;
                return !1
            }
            var i = Element.prototype,
                r = i.matchesSelector || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector;
            e.exports = o
        }, {}],
        6: [function(t, e, n) {
            function o(t) {
                var e;
                if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName)
                    t.focus(), t.setSelectionRange(0, t.value.length), e = t.value;
                else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var n = window.getSelection(),
                        o = document.createRange();
                    o.selectNodeContents(t), n.removeAllRanges(), n.addRange(o), e = n.toString()
                }
                return e
            }
            e.exports = o
        }, {}],
        7: [function(t, e, n) {
            function o() {}
            o.prototype = {
                on: function(t, e, n) {
                    var o = this.e || (this.e = {});
                    return (o[t] || (o[t] = [])).push({
                        fn: e,
                        ctx: n
                    }), this
                },
                once: function(t, e, n) {
                    function o() {
                        i.off(t, o), e.apply(n, arguments)
                    }
                    var i = this;
                    return o._ = e, this.on(t, o, n)
                },
                emit: function(t) {
                    var e = [].slice.call(arguments, 1),
                        n = ((this.e || (this.e = {}))[t] || []).slice(),
                        o = 0,
                        i = n.length;
                    for (o; i > o; o++)
                        n[o].fn.apply(n[o].ctx, e);
                    return this
                },
                off: function(t, e) {
                    var n = this.e || (this.e = {}),
                        o = n[t],
                        i = [];
                    if (o && e)
                        for (var r = 0, a = o.length; a > r; r++)
                            o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]);
                    return i.length ? n[t] = i : delete n[t], this
                }
            }, e.exports = o
        }, {}],
        8: [function(e, n, o) {
            !function(i, r) {
                if ("function" == typeof t && t.amd)
                    t(["module", "select"], r);
                else if ("undefined" != typeof o)
                    r(n, e("select"));
                else {
                    var a = {
                        exports: {}
                    };
                    r(a, i.select), i.clipboardAction = a.exports
                }
            }(this, function(t, e) {
                "use strict";
                function n(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }
                function o(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }
                var i = n(e),
                    r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
                    },
                    a = function() {
                        function t(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var o = e[n];
                                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                            }
                        }
                        return function(e, n, o) {
                            return n && t(e.prototype, n), o && t(e, o), e
                        }
                    }(),
                    c = function() {
                        function t(e) {
                            o(this, t), this.resolveOptions(e), this.initSelection()
                        }
                        return t.prototype.resolveOptions = function t() {
                            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                            this.action = e.action, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = ""
                        }, t.prototype.initSelection = function t() {
                            this.text ? this.selectFake() : this.target && this.selectTarget()
                        }, t.prototype.selectFake = function t() {
                            var e = this,
                                n = "rtl" == document.documentElement.getAttribute("dir");
                            this.removeFake(), this.fakeHandlerCallback = function() {
                                return e.removeFake()
                            }, this.fakeHandler = document.body.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[n ? "right" : "left"] = "-9999px", this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, document.body.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText()
                        }, t.prototype.removeFake = function t() {
                            this.fakeHandler && (document.body.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null)
                        }, t.prototype.selectTarget = function t() {
                            this.selectedText = (0, i.default)(this.target), this.copyText()
                        }, t.prototype.copyText = function t() {
                            var e = void 0;
                            try {
                                e = document.execCommand(this.action)
                            } catch (n) {
                                e = !1
                            }
                            this.handleResult(e)
                        }, t.prototype.handleResult = function t(e) {
                            e ? this.emitter.emit("success", {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            }) : this.emitter.emit("error", {
                                action: this.action,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            })
                        }, t.prototype.clearSelection = function t() {
                            this.target && this.target.blur(), window.getSelection().removeAllRanges()
                        }, t.prototype.destroy = function t() {
                            this.removeFake()
                        }, a(t, [{
                            key: "action",
                            set: function t() {
                                var e = arguments.length <= 0 || void 0 === arguments[0] ? "copy" : arguments[0];
                                if (this._action = e, "copy" !== this._action && "cut" !== this._action)
                                    throw new Error('Invalid "action" value, use either "copy" or "cut"')
                            },
                            get: function t() {
                                return this._action
                            }
                        }, {
                            key: "target",
                            set: function t(e) {
                                if (void 0 !== e) {
                                    if (!e || "object" !== ("undefined" == typeof e ? "undefined" : r(e)) || 1 !== e.nodeType)
                                        throw new Error('Invalid "target" value, use a valid Element');
                                    if ("copy" === this.action && e.hasAttribute("disabled"))
                                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled")))
                                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                    this._target = e
                                }
                            },
                            get: function t() {
                                return this._target
                            }
                        }]), t
                    }();
                t.exports = c
            })
        }, {
            select: 6
        }],
        9: [function(e, n, o) {
            !function(i, r) {
                if ("function" == typeof t && t.amd)
                    t(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r);
                else if ("undefined" != typeof o)
                    r(n, e("./clipboard-action"), e("tiny-emitter"), e("good-listener"));
                else {
                    var a = {
                        exports: {}
                    };
                    r(a, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = a.exports
                }
            }(this, function(t, e, n, o) {
                "use strict";
                function i(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }
                function r(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                }
                function a(t, e) {
                    if (!t)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }
                function c(t, e) {
                    if ("function" != typeof e && null !== e)
                        throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }
                function s(t, e) {
                    var n = "data-clipboard-" + t;
                    if (e.hasAttribute(n))
                        return e.getAttribute(n)
                }
                var l = i(e),
                    u = i(n),
                    f = i(o),
                    d = function(t) {
                        function e(n, o) {
                            r(this, e);
                            var i = a(this, t.call(this));
                            return i.resolveOptions(o), i.listenClick(n), i
                        }
                        return c(e, t), e.prototype.resolveOptions = function t() {
                            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                            this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText
                        }, e.prototype.listenClick = function t(e) {
                            var n = this;
                            this.listener = (0, f.default)(e, "click", function(t) {
                                return n.onClick(t)
                            })
                        }, e.prototype.onClick = function t(e) {
                            var n = e.delegateTarget || e.currentTarget;
                            this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l.default({
                                action: this.action(n),
                                target: this.target(n),
                                text: this.text(n),
                                trigger: n,
                                emitter: this
                            })
                        }, e.prototype.defaultAction = function t(e) {
                            return s("action", e)
                        }, e.prototype.defaultTarget = function t(e) {
                            var n = s("target", e);
                            return n ? document.querySelector(n) : void 0
                        }, e.prototype.defaultText = function t(e) {
                            return s("text", e)
                        }, e.prototype.destroy = function t() {
                            this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                        }, e
                    }(u.default);
                t.exports = d
            })
        }, {
            "./clipboard-action": 8,
            "good-listener": 4,
            "tiny-emitter": 7
        }]
    }, {}, [9])(9)
});
!function(a, b, c, d) {
    "use strict";
    function e(a, b, c) {
        return setTimeout(j(a, c), b)
    }
    function f(a, b, c) {
        return Array.isArray(a) ? (g(a, c[b], c), !0) : !1
    }
    function g(a, b, c) {
        var e;
        if (a)
            if (a.forEach)
                a.forEach(b, c);
            else if (a.length !== d)
                for (e = 0; e < a.length;)
                    b.call(c, a[e], e, a), e++;
            else
                for (e in a)
                    a.hasOwnProperty(e) && b.call(c, a[e], e, a)
    }
    function h(b, c, d) {
        var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";
        return function() {
            var c = new Error("get-stack-trace"),
                d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                f = a.console && (a.console.warn || a.console.log);
            return f && f.call(a.console, e, d), b.apply(this, arguments)
        }
    }
    function i(a, b, c) {
        var d,
            e = b.prototype;
        d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c)
    }
    function j(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }
    function k(a, b) {
        return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a
    }
    function l(a, b) {
        return a === d ? b : a
    }
    function m(a, b, c) {
        g(q(b), function(b) {
            a.addEventListener(b, c, !1)
        })
    }
    function n(a, b, c) {
        g(q(b), function(b) {
            a.removeEventListener(b, c, !1)
        })
    }
    function o(a, b) {
        for (; a;) {
            if (a == b)
                return !0;
            a = a.parentNode
        }
        return !1
    }
    function p(a, b) {
        return a.indexOf(b) > -1
    }
    function q(a) {
        return a.trim().split(/\s+/g)
    }
    function r(a, b, c) {
        if (a.indexOf && !c)
            return a.indexOf(b);
        for (var d = 0; d < a.length;) {
            if (c && a[d][c] == b || !c && a[d] === b)
                return d;
            d++
        }
        return -1
    }
    function s(a) {
        return Array.prototype.slice.call(a, 0)
    }
    function t(a, b, c) {
        for (var d = [], e = [], f = 0; f < a.length;) {
            var g = b ? a[f][b] : a[f];
            r(e, g) < 0 && d.push(a[f]), e[f] = g, f++
        }
        return c && (d = b ? d.sort(function(a, c) {
            return a[b] > c[b]
        }) : d.sort()), d
    }
    function u(a, b) {
        for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) {
            if (c = ma[g], e = c ? c + f : b, e in a)
                return e;
            g++
        }
        return d
    }
    function v() {
        return ua++
    }
    function w(b) {
        var c = b.ownerDocument || b;
        return c.defaultView || c.parentWindow || a
    }
    function x(a, b) {
        var c = this;
        this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(b) {
            k(a.options.enable, [a]) && c.handler(b)
        }, this.init()
    }
    function y(a) {
        var b,
            c = a.options.inputClass;
        return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z)
    }
    function z(a, b, c) {
        var d = c.pointers.length,
            e = c.changedPointers.length,
            f = b & Ea && d - e === 0,
            g = b & (Ga | Ha) && d - e === 0;
        c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c
    }
    function A(a, b) {
        var c = a.session,
            d = b.pointers,
            e = d.length;
        c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);
        var f = c.firstInput,
            g = c.firstMultiple,
            h = g ? g.center : f.center,
            i = b.center = E(d);
        b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);
        var j = F(b.deltaTime, b.deltaX, b.deltaY);
        b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);
        var k = a.element;
        o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k
    }
    function B(a, b) {
        var c = b.center,
            d = a.offsetDelta || {},
            e = a.prevDelta || {},
            f = a.prevInput || {};
        b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = {
            x: f.deltaX || 0,
            y: f.deltaY || 0
        }, d = a.offsetDelta = {
            x: c.x,
            y: c.y
        }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y)
    }
    function C(a, b) {
        var c,
            e,
            f,
            g,
            h = a.lastInterval || b,
            i = b.timeStamp - h.timeStamp;
        if (b.eventType != Ha && (i > Da || h.velocity === d)) {
            var j = b.deltaX - h.deltaX,
                k = b.deltaY - h.deltaY,
                l = F(i, j, k);
            e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b
        } else
            c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
        b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g
    }
    function D(a) {
        for (var b = [], c = 0; c < a.pointers.length;)
            b[c] = {
                clientX: pa(a.pointers[c].clientX),
                clientY: pa(a.pointers[c].clientY)
            }, c++;
        return {
            timeStamp: ra(),
            pointers: b,
            center: E(b),
            deltaX: a.deltaX,
            deltaY: a.deltaY
        }
    }
    function E(a) {
        var b = a.length;
        if (1 === b)
            return {
                x: pa(a[0].clientX),
                y: pa(a[0].clientY)
            };
        for (var c = 0, d = 0, e = 0; b > e;)
            c += a[e].clientX, d += a[e].clientY, e++;
        return {
            x: pa(c / b),
            y: pa(d / b)
        }
    }
    function F(a, b, c) {
        return {
            x: b / a || 0,
            y: c / a || 0
        }
    }
    function G(a, b) {
        return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma
    }
    function H(a, b, c) {
        c || (c = Qa);
        var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];
        return Math.sqrt(d * d + e * e)
    }
    function I(a, b, c) {
        c || (c = Qa);
        var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];
        return 180 * Math.atan2(e, d) / Math.PI
    }
    function J(a, b) {
        return I(b[1], b[0], Ra) + I(a[1], a[0], Ra)
    }
    function K(a, b) {
        return H(b[0], b[1], Ra) / H(a[0], a[1], Ra)
    }
    function L() {
        this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments)
    }
    function M() {
        this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }
    function N() {
        this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments)
    }
    function O(a, b) {
        var c = s(a.touches),
            d = s(a.changedTouches);
        return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d]
    }
    function P() {
        this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments)
    }
    function Q(a, b) {
        var c = s(a.touches),
            d = this.targetIds;
        if (b & (Ea | Fa) && 1 === c.length)
            return d[c[0].identifier] = !0, [c, c];
        var e,
            f,
            g = s(a.changedTouches),
            h = [],
            i = this.target;
        if (f = c.filter(function(a) {
            return o(a.target, i)
        }), b === Ea)
            for (e = 0; e < f.length;)
                d[f[e].identifier] = !0, e++;
        for (e = 0; e < g.length;)
            d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++;
        return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0
    }
    function R() {
        x.apply(this, arguments);
        var a = j(this.handler, this);
        this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = []
    }
    function S(a, b) {
        a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b)
    }
    function T(a) {
        var b = a.changedPointers[0];
        if (b.identifier === this.primaryTouch) {
            var c = {
                x: b.clientX,
                y: b.clientY
            };
            this.lastTouches.push(c);
            var d = this.lastTouches,
                e = function() {
                    var a = d.indexOf(c);
                    a > -1 && d.splice(a, 1)
                };
            setTimeout(e, cb)
        }
    }
    function U(a) {
        for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) {
            var e = this.lastTouches[d],
                f = Math.abs(b - e.x),
                g = Math.abs(c - e.y);
            if (db >= f && db >= g)
                return !0
        }
        return !1
    }
    function V(a, b) {
        this.manager = a, this.set(b)
    }
    function W(a) {
        if (p(a, jb))
            return jb;
        var b = p(a, kb),
            c = p(a, lb);
        return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb
    }
    function X() {
        if (!fb)
            return !1;
        var b = {},
            c = a.CSS && a.CSS.supports;
        return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(d) {
            b[d] = c ? a.CSS.supports("touch-action", d) : !0
        }), b
    }
    function Y(a) {
        this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = []
    }
    function Z(a) {
        return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : ""
    }
    function $(a) {
        return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : ""
    }
    function _(a, b) {
        var c = b.manager;
        return c ? c.get(a) : a
    }
    function aa() {
        Y.apply(this, arguments)
    }
    function ba() {
        aa.apply(this, arguments), this.pX = null, this.pY = null
    }
    function ca() {
        aa.apply(this, arguments)
    }
    function da() {
        Y.apply(this, arguments), this._timer = null, this._input = null
    }
    function ea() {
        aa.apply(this, arguments)
    }
    function fa() {
        aa.apply(this, arguments)
    }
    function ga() {
        Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }
    function ha(a, b) {
        return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b)
    }
    function ia(a, b) {
        this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function(a) {
            var b = this.add(new a[0](a[1]));
            a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3])
        }, this)
    }
    function ja(a, b) {
        var c = a.element;
        if (c.style) {
            var d;
            g(a.options.cssProps, function(e, f) {
                d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || ""
            }), b || (a.oldCssProps = {})
        }
    }
    function ka(a, c) {
        var d = b.createEvent("Event");
        d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d)
    }
    var la,
        ma = ["", "webkit", "Moz", "MS", "ms", "o"],
        na = b.createElement("div"),
        oa = "function",
        pa = Math.round,
        qa = Math.abs,
        ra = Date.now;
    la = "function" != typeof Object.assign ? function(a) {
        if (a === d || null === a)
            throw new TypeError("Cannot convert undefined or null to object");
        for (var b = Object(a), c = 1; c < arguments.length; c++) {
            var e = arguments[c];
            if (e !== d && null !== e)
                for (var f in e)
                    e.hasOwnProperty(f) && (b[f] = e[f])
        }
        return b
    } : Object.assign;
    var sa = h(function(a, b, c) {
            for (var e = Object.keys(b), f = 0; f < e.length;)
                (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
            return a
        }, "extend", "Use `assign`."),
        ta = h(function(a, b) {
            return sa(a, b, !0)
        }, "merge", "Use `assign`."),
        ua = 1,
        va = /mobile|tablet|ip(ad|hone|od)|android/i,
        wa = "ontouchstart" in a,
        xa = u(a, "PointerEvent") !== d,
        ya = wa && va.test(navigator.userAgent),
        za = "touch",
        Aa = "pen",
        Ba = "mouse",
        Ca = "kinect",
        Da = 25,
        Ea = 1,
        Fa = 2,
        Ga = 4,
        Ha = 8,
        Ia = 1,
        Ja = 2,
        Ka = 4,
        La = 8,
        Ma = 16,
        Na = Ja | Ka,
        Oa = La | Ma,
        Pa = Na | Oa,
        Qa = ["x", "y"],
        Ra = ["clientX", "clientY"];
    x.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler)
        },
        destroy: function() {
            this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler)
        }
    };
    var Sa = {
            mousedown: Ea,
            mousemove: Fa,
            mouseup: Ga
        },
        Ta = "mousedown",
        Ua = "mousemove mouseup";
    i(L, x, {
        handler: function(a) {
            var b = Sa[a.type];
            b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, {
                pointers: [a],
                changedPointers: [a],
                pointerType: Ba,
                srcEvent: a
            }))
        }
    });
    var Va = {
            pointerdown: Ea,
            pointermove: Fa,
            pointerup: Ga,
            pointercancel: Ha,
            pointerout: Ha
        },
        Wa = {
            2: za,
            3: Aa,
            4: Ba,
            5: Ca
        },
        Xa = "pointerdown",
        Ya = "pointermove pointerup pointercancel";
    a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, {
        handler: function(a) {
            var b = this.store,
                c = !1,
                d = a.type.toLowerCase().replace("ms", ""),
                e = Va[d],
                f = Wa[a.pointerType] || a.pointerType,
                g = f == za,
                h = r(b, a.pointerId, "pointerId");
            e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, {
                pointers: b,
                changedPointers: [a],
                pointerType: f,
                srcEvent: a
            }), c && b.splice(h, 1))
        }
    });
    var Za = {
            touchstart: Ea,
            touchmove: Fa,
            touchend: Ga,
            touchcancel: Ha
        },
        $a = "touchstart",
        _a = "touchstart touchmove touchend touchcancel";
    i(N, x, {
        handler: function(a) {
            var b = Za[a.type];
            if (b === Ea && (this.started = !0), this.started) {
                var c = O.call(this, a, b);
                b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: za,
                    srcEvent: a
                })
            }
        }
    });
    var ab = {
            touchstart: Ea,
            touchmove: Fa,
            touchend: Ga,
            touchcancel: Ha
        },
        bb = "touchstart touchmove touchend touchcancel";
    i(P, x, {
        handler: function(a) {
            var b = ab[a.type],
                c = Q.call(this, a, b);
            c && this.callback(this.manager, b, {
                pointers: c[0],
                changedPointers: c[1],
                pointerType: za,
                srcEvent: a
            })
        }
    });
    var cb = 2500,
        db = 25;
    i(R, x, {
        handler: function(a, b, c) {
            var d = c.pointerType == za,
                e = c.pointerType == Ba;
            if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
                if (d)
                    S.call(this, b, c);
                else if (e && U.call(this, c))
                    return;
                this.callback(a, b, c)
            }
        },
        destroy: function() {
            this.touch.destroy(), this.mouse.destroy()
        }
    });
    var eb = u(na.style, "touchAction"),
        fb = eb !== d,
        gb = "compute",
        hb = "auto",
        ib = "manipulation",
        jb = "none",
        kb = "pan-x",
        lb = "pan-y",
        mb = X();
    V.prototype = {
        set: function(a) {
            a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var a = [];
            return g(this.manager.recognizers, function(b) {
                k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
            }), W(a.join(" "))
        },
        preventDefaults: function(a) {
            var b = a.srcEvent,
                c = a.offsetDirection;
            if (this.manager.session.prevented)
                return void b.preventDefault();
            var d = this.actions,
                e = p(d, jb) && !mb[jb],
                f = p(d, lb) && !mb[lb],
                g = p(d, kb) && !mb[kb];
            if (e) {
                var h = 1 === a.pointers.length,
                    i = a.distance < 2,
                    j = a.deltaTime < 250;
                if (h && i && j)
                    return
            }
            return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0
        },
        preventSrc: function(a) {
            this.manager.session.prevented = !0, a.preventDefault()
        }
    };
    var nb = 1,
        ob = 2,
        pb = 4,
        qb = 8,
        rb = qb,
        sb = 16,
        tb = 32;
    Y.prototype = {
        defaults: {},
        set: function(a) {
            return la(this.options, a), this.manager && this.manager.touchAction.update(), this
        },
        recognizeWith: function(a) {
            if (f(a, "recognizeWith", this))
                return this;
            var b = this.simultaneous;
            return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this
        },
        dropRecognizeWith: function(a) {
            return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this)
        },
        requireFailure: function(a) {
            if (f(a, "requireFailure", this))
                return this;
            var b = this.requireFail;
            return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this
        },
        dropRequireFailure: function(a) {
            if (f(a, "dropRequireFailure", this))
                return this;
            a = _(a, this);
            var b = r(this.requireFail, a);
            return b > -1 && this.requireFail.splice(b, 1), this
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function(a) {
            return !!this.simultaneous[a.id]
        },
        emit: function(a) {
            function b(b) {
                c.manager.emit(b, a)
            }
            var c = this,
                d = this.state;
            qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d))
        },
        tryEmit: function(a) {
            return this.canEmit() ? this.emit(a) : void (this.state = tb)
        },
        canEmit: function() {
            for (var a = 0; a < this.requireFail.length;) {
                if (!(this.requireFail[a].state & (tb | nb)))
                    return !1;
                a++
            }
            return !0
        },
        recognize: function(a) {
            var b = la({}, a);
            return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void (this.state = tb))
        },
        process: function(a) {},
        getTouchAction: function() {},
        reset: function() {}
    }, i(aa, Y, {
        defaults: {
            pointers: 1
        },
        attrTest: function(a) {
            var b = this.options.pointers;
            return 0 === b || a.pointers.length === b
        },
        process: function(a) {
            var b = this.state,
                c = a.eventType,
                d = b & (ob | pb),
                e = this.attrTest(a);
            return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb
        }
    }), i(ba, aa, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: Pa
        },
        getTouchAction: function() {
            var a = this.options.direction,
                b = [];
            return a & Na && b.push(lb), a & Oa && b.push(kb), b
        },
        directionTest: function(a) {
            var b = this.options,
                c = !0,
                d = a.distance,
                e = a.direction,
                f = a.deltaX,
                g = a.deltaY;
            return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
        },
        attrTest: function(a) {
            return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a))
        },
        emit: function(a) {
            this.pX = a.deltaX, this.pY = a.deltaY;
            var b = $(a.direction);
            b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a)
        }
    }), i(ca, aa, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [jb]
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob)
        },
        emit: function(a) {
            if (1 !== a.scale) {
                var b = a.scale < 1 ? "in" : "out";
                a.additionalEvent = this.options.event + b
            }
            this._super.emit.call(this, a)
        }
    }), i(da, Y, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 251,
            threshold: 9
        },
        getTouchAction: function() {
            return [hb]
        },
        process: function(a) {
            var b = this.options,
                c = a.pointers.length === b.pointers,
                d = a.distance < b.threshold,
                f = a.deltaTime > b.time;
            if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f)
                this.reset();
            else if (a.eventType & Ea)
                this.reset(), this._timer = e(function() {
                    this.state = rb, this.tryEmit()
                }, b.time, this);
            else if (a.eventType & Ga)
                return rb;
            return tb
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(a) {
            this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input)))
        }
    }), i(ea, aa, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [jb]
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob)
        }
    }), i(fa, aa, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .3,
            direction: Na | Oa,
            pointers: 1
        },
        getTouchAction: function() {
            return ba.prototype.getTouchAction.call(this)
        },
        attrTest: function(a) {
            var b,
                c = this.options.direction;
            return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga
        },
        emit: function(a) {
            var b = $(a.offsetDirection);
            b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a)
        }
    }), i(ga, Y, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 9,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [ib]
        },
        process: function(a) {
            var b = this.options,
                c = a.pointers.length === b.pointers,
                d = a.distance < b.threshold,
                f = a.deltaTime < b.time;
            if (this.reset(), a.eventType & Ea && 0 === this.count)
                return this.failTimeout();
            if (d && f && c) {
                if (a.eventType != Ga)
                    return this.failTimeout();
                var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
                    h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
                this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
                var i = this.count % b.taps;
                if (0 === i)
                    return this.hasRequireFailures() ? (this._timer = e(function() {
                        this.state = rb, this.tryEmit()
                    }, b.interval, this), ob) : rb
            }
            return tb
        },
        failTimeout: function() {
            return this._timer = e(function() {
                this.state = tb
            }, this.options.interval, this), tb
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }), ha.VERSION = "2.0.8", ha.defaults = {
        domEvents: !1,
        touchAction: gb,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [[ea, {
            enable: !1
        }], [ca, {
            enable: !1
        }, ["rotate"]], [fa, {
            direction: Na
        }], [ba, {
            direction: Na
        }, ["swipe"]], [ga], [ga, {
            event: "doubletap",
            taps: 2
        }, ["tap"]], [da]],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var ub = 1,
        vb = 2;
    ia.prototype = {
        set: function(a) {
            return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this
        },
        stop: function(a) {
            this.session.stopped = a ? vb : ub
        },
        recognize: function(a) {
            var b = this.session;
            if (!b.stopped) {
                this.touchAction.preventDefaults(a);
                var c,
                    d = this.recognizers,
                    e = b.curRecognizer;
                (!e || e && e.state & rb) && (e = b.curRecognizer = null);
                for (var f = 0; f < d.length;)
                    c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++
            }
        },
        get: function(a) {
            if (a instanceof Y)
                return a;
            for (var b = this.recognizers, c = 0; c < b.length; c++)
                if (b[c].options.event == a)
                    return b[c];
            return null
        },
        add: function(a) {
            if (f(a, "add", this))
                return this;
            var b = this.get(a.options.event);
            return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a
        },
        remove: function(a) {
            if (f(a, "remove", this))
                return this;
            if (a = this.get(a)) {
                var b = this.recognizers,
                    c = r(b, a);
                -1 !== c && (b.splice(c, 1), this.touchAction.update())
            }
            return this
        },
        on: function(a, b) {
            if (a !== d && b !== d) {
                var c = this.handlers;
                return g(q(a), function(a) {
                    c[a] = c[a] || [], c[a].push(b)
                }), this
            }
        },
        off: function(a, b) {
            if (a !== d) {
                var c = this.handlers;
                return g(q(a), function(a) {
                    b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a]
                }), this
            }
        },
        emit: function(a, b) {
            this.options.domEvents && ka(a, b);
            var c = this.handlers[a] && this.handlers[a].slice();
            if (c && c.length) {
                b.type = a, b.preventDefault = function() {
                    b.srcEvent.preventDefault()
                };
                for (var d = 0; d < c.length;)
                    c[d](b), d++
            }
        },
        destroy: function() {
            this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
    }, la(ha, {
        INPUT_START: Ea,
        INPUT_MOVE: Fa,
        INPUT_END: Ga,
        INPUT_CANCEL: Ha,
        STATE_POSSIBLE: nb,
        STATE_BEGAN: ob,
        STATE_CHANGED: pb,
        STATE_ENDED: qb,
        STATE_RECOGNIZED: rb,
        STATE_CANCELLED: sb,
        STATE_FAILED: tb,
        DIRECTION_NONE: Ia,
        DIRECTION_LEFT: Ja,
        DIRECTION_RIGHT: Ka,
        DIRECTION_UP: La,
        DIRECTION_DOWN: Ma,
        DIRECTION_HORIZONTAL: Na,
        DIRECTION_VERTICAL: Oa,
        DIRECTION_ALL: Pa,
        Manager: ia,
        Input: x,
        TouchAction: V,
        TouchInput: P,
        MouseInput: L,
        PointerEventInput: M,
        TouchMouseInput: R,
        SingleTouchInput: N,
        Recognizer: Y,
        AttrRecognizer: aa,
        Tap: ga,
        Pan: ba,
        Swipe: fa,
        Pinch: ca,
        Rotate: ea,
        Press: da,
        on: m,
        off: n,
        each: g,
        merge: ta,
        extend: sa,
        assign: la,
        inherit: i,
        bindFn: j,
        prefixed: u
    });
    var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};
    wb.Hammer = ha, "function" == typeof define && define.amd ? define(function() {
        return ha
    }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha
}(window, document, "Hammer");
!function(a) {
    "use strict";
    function b(a) {
        var b = a.length,
            d = c.type(a);
        return "function" !== d && !c.isWindow(a) && (!(1 !== a.nodeType || !b) || ("array" === d || 0 === b || "number" == typeof b && b > 0 && b - 1 in a))
    }
    if (!a.jQuery) {
        var c = function(a, b) {
            return new c.fn.init(a, b)
        };
        c.isWindow = function(a) {
            return a && a === a.window
        }, c.type = function(a) {
            return a ? "object" == typeof a || "function" == typeof a ? e[g.call(a)] || "object" : typeof a : a + ""
        }, c.isArray = Array.isArray || function(a) {
            return "array" === c.type(a)
        }, c.isPlainObject = function(a) {
            var b;
            if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a))
                return !1;
            try {
                if (a.constructor && !f.call(a, "constructor") && !f.call(a.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (d) {
                return !1
            }
            for (b in a)
                ;
            return b === undefined || f.call(a, b)
        }, c.each = function(a, c, d) {
            var e = 0,
                f = a.length,
                g = b(a);
            if (d) {
                if (g)
                    for (; e < f && !1 !== c.apply(a[e], d); e++)
                        ;
                else
                    for (e in a)
                        if (a.hasOwnProperty(e) && !1 === c.apply(a[e], d))
                            break
            } else if (g)
                for (; e < f && !1 !== c.call(a[e], e, a[e]); e++)
                    ;
            else
                for (e in a)
                    if (a.hasOwnProperty(e) && !1 === c.call(a[e], e, a[e]))
                        break;
            return a
        }, c.data = function(a, b, e) {
            if (e === undefined) {
                var f = a[c.expando],
                    g = f && d[f];
                if (b === undefined)
                    return g;
                if (g && b in g)
                    return g[b]
            } else if (b !== undefined) {
                var h = a[c.expando] || (a[c.expando] = ++c.uuid);
                return d[h] = d[h] || {}, d[h][b] = e, e
            }
        }, c.removeData = function(a, b) {
            var e = a[c.expando],
                f = e && d[e];
            f && (b ? c.each(b, function(a, b) {
                delete f[b]
            }) : delete d[e])
        }, c.extend = function() {
            var a,
                b,
                d,
                e,
                f,
                g,
                h = arguments[0] || {},
                i = 1,
                j = arguments.length,
                k = !1;
            for ("boolean" == typeof h && (k = h, h = arguments[i] || {}, i++), "object" != typeof h && "function" !== c.type(h) && (h = {}), i === j && (h = this, i--); i < j; i++)
                if (f = arguments[i])
                    for (e in f)
                        f.hasOwnProperty(e) && (a = h[e], d = f[e], h !== d && (k && d && (c.isPlainObject(d) || (b = c.isArray(d))) ? (b ? (b = !1, g = a && c.isArray(a) ? a : []) : g = a && c.isPlainObject(a) ? a : {}, h[e] = c.extend(k, g, d)) : d !== undefined && (h[e] = d)));
            return h
        }, c.queue = function(a, d, e) {
            if (a) {
                d = (d || "fx") + "queue";
                var f = c.data(a, d);
                return e ? (!f || c.isArray(e) ? f = c.data(a, d, function(a, c) {
                    var d = c || [];
                    return a && (b(Object(a)) ? function(a, b) {
                        for (var c = +b.length, d = 0, e = a.length; d < c;)
                            a[e++] = b[d++];
                        if (c !== c)
                            for (; b[d] !== undefined;)
                                a[e++] = b[d++];
                        a.length = e
                    }(d, "string" == typeof a ? [a] : a) : [].push.call(d, a)), d
                }(e)) : f.push(e), f) : f || []
            }
        }, c.dequeue = function(a, b) {
            c.each(a.nodeType ? [a] : a, function(a, d) {
                b = b || "fx";
                var e = c.queue(d, b),
                    f = e.shift();
                "inprogress" === f && (f = e.shift()), f && ("fx" === b && e.unshift("inprogress"), f.call(d, function() {
                    c.dequeue(d, b)
                }))
            })
        }, c.fn = c.prototype = {
            init: function(a) {
                if (a.nodeType)
                    return this[0] = a, this;
                throw new Error("Not a DOM node.")
            },
            offset: function() {
                var b = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: b.top + (a.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: b.left + (a.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            },
            position: function() {
                var a = this[0],
                    b = function(a) {
                        for (var b = a.offsetParent; b && "html" !== b.nodeName.toLowerCase() && b.style && "static" === b.style.position.toLowerCase();)
                            b = b.offsetParent;
                        return b || document
                    }(a),
                    d = this.offset(),
                    e = /^(?:body|html)$/i.test(b.nodeName) ? {
                        top: 0,
                        left: 0
                    } : c(b).offset();
                return d.top -= parseFloat(a.style.marginTop) || 0, d.left -= parseFloat(a.style.marginLeft) || 0, b.style && (e.top += parseFloat(b.style.borderTopWidth) || 0, e.left += parseFloat(b.style.borderLeftWidth) || 0), {
                    top: d.top - e.top,
                    left: d.left - e.left
                }
            }
        };
        var d = {};
        c.expando = "velocity" + (new Date).getTime(), c.uuid = 0;
        for (var e = {}, f = e.hasOwnProperty, g = e.toString, h = "Boolean Number String Function Array Date RegExp Object Error".split(" "), i = 0; i < h.length; i++)
            e["[object " + h[i] + "]"] = h[i].toLowerCase();
        c.fn.init.prototype = c.fn, a.Velocity = {
            Utilities: c
        }
    }
}(window), function(a) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a() : "function" == typeof define && define.amd ? define(a) : a()
}(function() {
    "use strict";
    return function(a, b, c, d) {
        function e(a) {
            for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
                var e = a[b];
                e && d.push(e)
            }
            return d
        }
        function f(a) {
            return u.isWrapped(a) ? a = s.call(a) : u.isNode(a) && (a = [a]), a
        }
        function g(a) {
            var b = o.data(a, "velocity");
            return null === b ? d : b
        }
        function h(a, b) {
            var c = g(a);
            c && c.delayTimer && !c.delayPaused && (c.delayRemaining = c.delay - b + c.delayBegin, c.delayPaused = !0, clearTimeout(c.delayTimer.setTimeout))
        }
        function i(a, b) {
            var c = g(a);
            c && c.delayTimer && c.delayPaused && (c.delayPaused = !1, c.delayTimer.setTimeout = setTimeout(c.delayTimer.next, c.delayRemaining))
        }
        function j(a) {
            return function(b) {
                return Math.round(b * a) * (1 / a)
            }
        }
        function k(a, c, d, e) {
            function f(a, b) {
                return 1 - 3 * b + 3 * a
            }
            function g(a, b) {
                return 3 * b - 6 * a
            }
            function h(a) {
                return 3 * a
            }
            function i(a, b, c) {
                return ((f(b, c) * a + g(b, c)) * a + h(b)) * a
            }
            function j(a, b, c) {
                return 3 * f(b, c) * a * a + 2 * g(b, c) * a + h(b)
            }
            function k(b, c) {
                for (var e = 0; e < p; ++e) {
                    var f = j(c, a, d);
                    if (0 === f)
                        return c;
                    c -= (i(c, a, d) - b) / f
                }
                return c
            }
            function l() {
                for (var b = 0; b < t; ++b)
                    x[b] = i(b * u, a, d)
            }
            function m(b, c, e) {
                var f,
                    g,
                    h = 0;
                do {
                    g = c + (e - c) / 2, f = i(g, a, d) - b, f > 0 ? e = g : c = g
                } while (Math.abs(f) > r && ++h < s);
                return g
            }
            function n(b) {
                for (var c = 0, e = 1, f = t - 1; e !== f && x[e] <= b; ++e)
                    c += u;
                --e;
                var g = (b - x[e]) / (x[e + 1] - x[e]),
                    h = c + g * u,
                    i = j(h, a, d);
                return i >= q ? k(b, h) : 0 === i ? h : m(b, c, c + u)
            }
            function o() {
                y = !0, a === c && d === e || l()
            }
            var p = 4,
                q = .001,
                r = 1e-7,
                s = 10,
                t = 11,
                u = 1 / (t - 1),
                v = "Float32Array" in b;
            if (4 !== arguments.length)
                return !1;
            for (var w = 0; w < 4; ++w)
                if ("number" != typeof arguments[w] || isNaN(arguments[w]) || !isFinite(arguments[w]))
                    return !1;
            a = Math.min(a, 1), d = Math.min(d, 1), a = Math.max(a, 0), d = Math.max(d, 0);
            var x = v ? new Float32Array(t) : new Array(t),
                y = !1,
                z = function(b) {
                    return y || o(), a === c && d === e ? b : 0 === b ? 0 : 1 === b ? 1 : i(n(b), c, e)
                };
            z.getControlPoints = function() {
                return [{
                    x: a,
                    y: c
                }, {
                    x: d,
                    y: e
                }]
            };
            var A = "generateBezier(" + [a, c, d, e] + ")";
            return z.toString = function() {
                return A
            }, z
        }
        function l(a, b) {
            var c = a;
            return u.isString(a) ? y.Easings[a] || (c = !1) : c = u.isArray(a) && 1 === a.length ? j.apply(null, a) : u.isArray(a) && 2 === a.length ? z.apply(null, a.concat([b])) : !(!u.isArray(a) || 4 !== a.length) && k.apply(null, a), !1 === c && (c = y.Easings[y.defaults.easing] ? y.defaults.easing : x), c
        }
        function m(a) {
            if (a) {
                var b = y.timestamp && !0 !== a ? a : r.now(),
                    c = y.State.calls.length;
                c > 1e4 && (y.State.calls = e(y.State.calls), c = y.State.calls.length);
                for (var f = 0; f < c; f++)
                    if (y.State.calls[f]) {
                        var h = y.State.calls[f],
                            i = h[0],
                            j = h[2],
                            k = h[3],
                            l = !k,
                            q = null,
                            s = h[5],
                            t = h[6];
                        if (k || (k = y.State.calls[f][3] = b - 16), s) {
                            if (!0 !== s.resume)
                                continue;
                            k = h[3] = Math.round(b - t - 16), h[5] = null
                        }
                        t = h[6] = b - k;
                        for (var v = Math.min(t / j.duration, 1), w = 0, x = i.length; w < x; w++) {
                            var z = i[w],
                                B = z.element;
                            if (g(B)) {
                                var D = !1;
                                if (j.display !== d && null !== j.display && "none" !== j.display) {
                                    if ("flex" === j.display) {
                                        var E = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                        o.each(E, function(a, b) {
                                            A.setPropertyValue(B, "display", b)
                                        })
                                    }
                                    A.setPropertyValue(B, "display", j.display)
                                }
                                j.visibility !== d && "hidden" !== j.visibility && A.setPropertyValue(B, "visibility", j.visibility);
                                for (var F in z)
                                    if (z.hasOwnProperty(F) && "element" !== F) {
                                        var G,
                                            H = z[F],
                                            I = u.isString(H.easing) ? y.Easings[H.easing] : H.easing;
                                        if (u.isString(H.pattern)) {
                                            var J = 1 === v ? function(a, b, c) {
                                                var d = H.endValue[b];
                                                return c ? Math.round(d) : d
                                            } : function(a, b, c) {
                                                var d = H.startValue[b],
                                                    e = H.endValue[b] - d,
                                                    f = d + e * I(v, j, e);
                                                return c ? Math.round(f) : f
                                            };
                                            G = H.pattern.replace(/{(\d+)(!)?}/g, J)
                                        } else if (1 === v)
                                            G = H.endValue;
                                        else {
                                            var K = H.endValue - H.startValue;
                                            G = H.startValue + K * I(v, j, K)
                                        }
                                        if (!l && G === H.currentValue)
                                            continue;
                                        if (H.currentValue = G, "tween" === F)
                                            q = G;
                                        else {
                                            var L;
                                            if (A.Hooks.registered[F]) {
                                                L = A.Hooks.getRoot(F);
                                                var M = g(B).rootPropertyValueCache[L];
                                                M && (H.rootPropertyValue = M)
                                            }
                                            var N = A.setPropertyValue(B, F, H.currentValue + (p < 9 && 0 === parseFloat(G) ? "" : H.unitType), H.rootPropertyValue, H.scrollData);
                                            A.Hooks.registered[F] && (A.Normalizations.registered[L] ? g(B).rootPropertyValueCache[L] = A.Normalizations.registered[L]("extract", null, N[1]) : g(B).rootPropertyValueCache[L] = N[1]), "transform" === N[0] && (D = !0)
                                        }
                                    }
                                j.mobileHA && g(B).transformCache.translate3d === d && (g(B).transformCache.translate3d = "(0px, 0px, 0px)", D = !0), D && A.flushTransformCache(B)
                            }
                        }
                        j.display !== d && "none" !== j.display && (y.State.calls[f][2].display = !1), j.visibility !== d && "hidden" !== j.visibility && (y.State.calls[f][2].visibility = !1), j.progress && j.progress.call(h[1], h[1], v, Math.max(0, k + j.duration - b), k, q), 1 === v && n(f)
                    }
            }
            y.State.isTicking && C(m)
        }
        function n(a, b) {
            if (!y.State.calls[a])
                return !1;
            for (var c = y.State.calls[a][0], e = y.State.calls[a][1], f = y.State.calls[a][2], h = y.State.calls[a][4], i = !1, j = 0, k = c.length; j < k; j++) {
                var l = c[j].element;
                b || f.loop || ("none" === f.display && A.setPropertyValue(l, "display", f.display), "hidden" === f.visibility && A.setPropertyValue(l, "visibility", f.visibility));
                var m = g(l);
                if (!0 !== f.loop && (o.queue(l)[1] === d || !/\.velocityQueueEntryFlag/i.test(o.queue(l)[1])) && m) {
                    m.isAnimating = !1, m.rootPropertyValueCache = {};
                    var n = !1;
                    o.each(A.Lists.transforms3D, function(a, b) {
                        var c = /^scale/.test(b) ? 1 : 0,
                            e = m.transformCache[b];
                        m.transformCache[b] !== d && new RegExp("^\\(" + c + "[^.]").test(e) && (n = !0, delete m.transformCache[b])
                    }), f.mobileHA && (n = !0, delete m.transformCache.translate3d), n && A.flushTransformCache(l), A.Values.removeClass(l, "velocity-animating")
                }
                if (!b && f.complete && !f.loop && j === k - 1)
                    try {
                        f.complete.call(e, e)
                    } catch (r) {
                        setTimeout(function() {
                            throw r
                        }, 1)
                    }
                h && !0 !== f.loop && h(e), m && !0 === f.loop && !b && (o.each(m.tweensContainer, function(a, b) {
                    if (/^rotate/.test(a) && (parseFloat(b.startValue) - parseFloat(b.endValue)) % 360 == 0) {
                        var c = b.startValue;
                        b.startValue = b.endValue, b.endValue = c
                    }
                    /^backgroundPosition/.test(a) && 100 === parseFloat(b.endValue) && "%" === b.unitType && (b.endValue = 0, b.startValue = 100)
                }), y(l, "reverse", {
                    loop: !0,
                    delay: f.delay
                })), !1 !== f.queue && o.dequeue(l, f.queue)
            }
            y.State.calls[a] = !1;
            for (var p = 0, q = y.State.calls.length; p < q; p++)
                if (!1 !== y.State.calls[p]) {
                    i = !0;
                    break
                }
            !1 === i && (y.State.isTicking = !1, delete y.State.calls, y.State.calls = [])
        }
        var o,
            p = function() {
                if (c.documentMode)
                    return c.documentMode;
                for (var a = 7; a > 4; a--) {
                    var b = c.createElement("div");
                    if (b.innerHTML = "\x3c!--[if IE " + a + "]><span></span><![endif]--\x3e", b.getElementsByTagName("span").length)
                        return b = null, a
                }
                return d
            }(),
            q = function() {
                var a = 0;
                return b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || function(b) {
                        var c,
                            d = (new Date).getTime();
                        return c = Math.max(0, 16 - (d - a)), a = d + c, setTimeout(function() {
                            b(d + c)
                        }, c)
                    }
            }(),
            r = function() {
                var a = b.performance || {};
                if ("function" != typeof a.now) {
                    var c = a.timing && a.timing.navigationStart ? a.timing.navigationStart : (new Date).getTime();
                    a.now = function() {
                        return (new Date).getTime() - c
                    }
                }
                return a
            }(),
            s = function() {
                var a = Array.prototype.slice;
                try {
                    return a.call(c.documentElement), a
                } catch (b) {
                    return function(b, c) {
                        var d = this.length;
                        if ("number" != typeof b && (b = 0), "number" != typeof c && (c = d), this.slice)
                            return a.call(this, b, c);
                        var e,
                            f = [],
                            g = b >= 0 ? b : Math.max(0, d + b),
                            h = c < 0 ? d + c : Math.min(c, d),
                            i = h - g;
                        if (i > 0)
                            if (f = new Array(i), this.charAt)
                                for (e = 0; e < i; e++)
                                    f[e] = this.charAt(g + e);
                            else
                                for (e = 0; e < i; e++)
                                    f[e] = this[g + e];
                        return f
                    }
                }
            }(),
            t = function() {
                return Array.prototype.includes ? function(a, b) {
                    return a.includes(b)
                } : Array.prototype.indexOf ? function(a, b) {
                    return a.indexOf(b) >= 0
                } : function(a, b) {
                    for (var c = 0; c < a.length; c++)
                        if (a[c] === b)
                            return !0;
                    return !1
                }
            },
            u = {
                isNumber: function(a) {
                    return "number" == typeof a
                },
                isString: function(a) {
                    return "string" == typeof a
                },
                isArray: Array.isArray || function(a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                },
                isFunction: function(a) {
                    return "[object Function]" === Object.prototype.toString.call(a)
                },
                isNode: function(a) {
                    return a && a.nodeType
                },
                isWrapped: function(a) {
                    return a && a !== b && u.isNumber(a.length) && !u.isString(a) && !u.isFunction(a) && !u.isNode(a) && (0 === a.length || u.isNode(a[0]))
                },
                isSVG: function(a) {
                    return b.SVGElement && a instanceof b.SVGElement
                },
                isEmptyObject: function(a) {
                    for (var b in a)
                        if (a.hasOwnProperty(b))
                            return !1;
                    return !0
                }
            },
            v = !1;
        if (a.fn && a.fn.jquery ? (o = a, v = !0) : o = b.Velocity.Utilities, p <= 8 && !v)
            throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (p <= 7)
            return void (jQuery.fn.velocity = jQuery.fn.animate);
        var w = 400,
            x = "swing",
            y = {
                State: {
                    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(b.navigator.userAgent),
                    isAndroid: /Android/i.test(b.navigator.userAgent),
                    isGingerbread: /Android 2\.3\.[3-7]/i.test(b.navigator.userAgent),
                    isChrome: b.chrome,
                    isFirefox: /Firefox/i.test(b.navigator.userAgent),
                    prefixElement: c.createElement("div"),
                    prefixMatches: {},
                    scrollAnchor: null,
                    scrollPropertyLeft: null,
                    scrollPropertyTop: null,
                    isTicking: !1,
                    calls: [],
                    delayedElements: {
                        count: 0
                    }
                },
                CSS: {},
                Utilities: o,
                Redirects: {},
                Easings: {},
                Promise: b.Promise,
                defaults: {
                    queue: "",
                    duration: w,
                    easing: x,
                    begin: d,
                    complete: d,
                    progress: d,
                    display: d,
                    visibility: d,
                    loop: !1,
                    delay: !1,
                    mobileHA: !0,
                    _cacheValues: !0,
                    promiseRejectEmpty: !0
                },
                init: function(a) {
                    o.data(a, "velocity", {
                        isSVG: u.isSVG(a),
                        isAnimating: !1,
                        computedStyle: null,
                        tweensContainer: null,
                        rootPropertyValueCache: {},
                        transformCache: {}
                    })
                },
                hook: null,
                mock: !1,
                version: {
                    major: 1,
                    minor: 5,
                    patch: 1
                },
                debug: !1,
                timestamp: !0,
                pauseAll: function(a) {
                    var b = (new Date).getTime();
                    o.each(y.State.calls, function(b, c) {
                        if (c) {
                            if (a !== d && (c[2].queue !== a || !1 === c[2].queue))
                                return !0;
                            c[5] = {
                                resume: !1
                            }
                        }
                    }), o.each(y.State.delayedElements, function(a, c) {
                        c && h(c, b)
                    })
                },
                resumeAll: function(a) {
                    var b = (new Date).getTime();
                    o.each(y.State.calls, function(b, c) {
                        if (c) {
                            if (a !== d && (c[2].queue !== a || !1 === c[2].queue))
                                return !0;
                            c[5] && (c[5].resume = !0)
                        }
                    }), o.each(y.State.delayedElements, function(a, c) {
                        c && i(c, b)
                    })
                }
            };
        b.pageYOffset !== d ? (y.State.scrollAnchor = b, y.State.scrollPropertyLeft = "pageXOffset", y.State.scrollPropertyTop = "pageYOffset") : (y.State.scrollAnchor = c.documentElement || c.body.parentNode || c.body, y.State.scrollPropertyLeft = "scrollLeft", y.State.scrollPropertyTop = "scrollTop");
        var z = function() {
            function a(a) {
                return -a.tension * a.x - a.friction * a.v
            }
            function b(b, c, d) {
                var e = {
                    x: b.x + d.dx * c,
                    v: b.v + d.dv * c,
                    tension: b.tension,
                    friction: b.friction
                };
                return {
                    dx: e.v,
                    dv: a(e)
                }
            }
            function c(c, d) {
                var e = {
                        dx: c.v,
                        dv: a(c)
                    },
                    f = b(c, .5 * d, e),
                    g = b(c, .5 * d, f),
                    h = b(c, d, g),
                    i = 1 / 6 * (e.dx + 2 * (f.dx + g.dx) + h.dx),
                    j = 1 / 6 * (e.dv + 2 * (f.dv + g.dv) + h.dv);
                return c.x = c.x + i * d, c.v = c.v + j * d, c
            }
            return function d(a, b, e) {
                var f,
                    g,
                    h,
                    i = {
                        x: -1,
                        v: 0,
                        tension: null,
                        friction: null
                    },
                    j = [0],
                    k = 0;
                for (a = parseFloat(a) || 500, b = parseFloat(b) || 20, e = e || null, i.tension = a, i.friction = b, f = null !== e, f ? (k = d(a, b), g = k / e * .016) : g = .016;;)
                    if (h = c(h || i, g), j.push(1 + h.x), k += 16, !(Math.abs(h.x) > 1e-4 && Math.abs(h.v) > 1e-4))
                        break;
                return f ? function(a) {
                    return j[a * (j.length - 1) | 0]
                } : k
            }
        }();
        y.Easings = {
            linear: function(a) {
                return a
            },
            swing: function(a) {
                return .5 - Math.cos(a * Math.PI) / 2
            },
            spring: function(a) {
                return 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a)
            }
        }, o.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function(a, b) {
            y.Easings[b[0]] = k.apply(null, b[1])
        });
        var A = y.CSS = {
            RegEx: {
                isHex: /^#([A-f\d]{3}){1,2}$/i,
                valueUnwrap: /^[A-z]+\((.*)\)$/i,
                wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
            },
            Lists: {
                colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"],
                units: ["%", "em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "cm", "mm", "Q", "in", "pc", "pt", "px", "deg", "grad", "rad", "turn", "s", "ms"],
                colorNames: {
                    aliceblue: "240,248,255",
                    antiquewhite: "250,235,215",
                    aquamarine: "127,255,212",
                    aqua: "0,255,255",
                    azure: "240,255,255",
                    beige: "245,245,220",
                    bisque: "255,228,196",
                    black: "0,0,0",
                    blanchedalmond: "255,235,205",
                    blueviolet: "138,43,226",
                    blue: "0,0,255",
                    brown: "165,42,42",
                    burlywood: "222,184,135",
                    cadetblue: "95,158,160",
                    chartreuse: "127,255,0",
                    chocolate: "210,105,30",
                    coral: "255,127,80",
                    cornflowerblue: "100,149,237",
                    cornsilk: "255,248,220",
                    crimson: "220,20,60",
                    cyan: "0,255,255",
                    darkblue: "0,0,139",
                    darkcyan: "0,139,139",
                    darkgoldenrod: "184,134,11",
                    darkgray: "169,169,169",
                    darkgrey: "169,169,169",
                    darkgreen: "0,100,0",
                    darkkhaki: "189,183,107",
                    darkmagenta: "139,0,139",
                    darkolivegreen: "85,107,47",
                    darkorange: "255,140,0",
                    darkorchid: "153,50,204",
                    darkred: "139,0,0",
                    darksalmon: "233,150,122",
                    darkseagreen: "143,188,143",
                    darkslateblue: "72,61,139",
                    darkslategray: "47,79,79",
                    darkturquoise: "0,206,209",
                    darkviolet: "148,0,211",
                    deeppink: "255,20,147",
                    deepskyblue: "0,191,255",
                    dimgray: "105,105,105",
                    dimgrey: "105,105,105",
                    dodgerblue: "30,144,255",
                    firebrick: "178,34,34",
                    floralwhite: "255,250,240",
                    forestgreen: "34,139,34",
                    fuchsia: "255,0,255",
                    gainsboro: "220,220,220",
                    ghostwhite: "248,248,255",
                    gold: "255,215,0",
                    goldenrod: "218,165,32",
                    gray: "128,128,128",
                    grey: "128,128,128",
                    greenyellow: "173,255,47",
                    green: "0,128,0",
                    honeydew: "240,255,240",
                    hotpink: "255,105,180",
                    indianred: "205,92,92",
                    indigo: "75,0,130",
                    ivory: "255,255,240",
                    khaki: "240,230,140",
                    lavenderblush: "255,240,245",
                    lavender: "230,230,250",
                    lawngreen: "124,252,0",
                    lemonchiffon: "255,250,205",
                    lightblue: "173,216,230",
                    lightcoral: "240,128,128",
                    lightcyan: "224,255,255",
                    lightgoldenrodyellow: "250,250,210",
                    lightgray: "211,211,211",
                    lightgrey: "211,211,211",
                    lightgreen: "144,238,144",
                    lightpink: "255,182,193",
                    lightsalmon: "255,160,122",
                    lightseagreen: "32,178,170",
                    lightskyblue: "135,206,250",
                    lightslategray: "119,136,153",
                    lightsteelblue: "176,196,222",
                    lightyellow: "255,255,224",
                    limegreen: "50,205,50",
                    lime: "0,255,0",
                    linen: "250,240,230",
                    magenta: "255,0,255",
                    maroon: "128,0,0",
                    mediumaquamarine: "102,205,170",
                    mediumblue: "0,0,205",
                    mediumorchid: "186,85,211",
                    mediumpurple: "147,112,219",
                    mediumseagreen: "60,179,113",
                    mediumslateblue: "123,104,238",
                    mediumspringgreen: "0,250,154",
                    mediumturquoise: "72,209,204",
                    mediumvioletred: "199,21,133",
                    midnightblue: "25,25,112",
                    mintcream: "245,255,250",
                    mistyrose: "255,228,225",
                    moccasin: "255,228,181",
                    navajowhite: "255,222,173",
                    navy: "0,0,128",
                    oldlace: "253,245,230",
                    olivedrab: "107,142,35",
                    olive: "128,128,0",
                    orangered: "255,69,0",
                    orange: "255,165,0",
                    orchid: "218,112,214",
                    palegoldenrod: "238,232,170",
                    palegreen: "152,251,152",
                    paleturquoise: "175,238,238",
                    palevioletred: "219,112,147",
                    papayawhip: "255,239,213",
                    peachpuff: "255,218,185",
                    peru: "205,133,63",
                    pink: "255,192,203",
                    plum: "221,160,221",
                    powderblue: "176,224,230",
                    purple: "128,0,128",
                    red: "255,0,0",
                    rosybrown: "188,143,143",
                    royalblue: "65,105,225",
                    saddlebrown: "139,69,19",
                    salmon: "250,128,114",
                    sandybrown: "244,164,96",
                    seagreen: "46,139,87",
                    seashell: "255,245,238",
                    sienna: "160,82,45",
                    silver: "192,192,192",
                    skyblue: "135,206,235",
                    slateblue: "106,90,205",
                    slategray: "112,128,144",
                    snow: "255,250,250",
                    springgreen: "0,255,127",
                    steelblue: "70,130,180",
                    tan: "210,180,140",
                    teal: "0,128,128",
                    thistle: "216,191,216",
                    tomato: "255,99,71",
                    turquoise: "64,224,208",
                    violet: "238,130,238",
                    wheat: "245,222,179",
                    whitesmoke: "245,245,245",
                    white: "255,255,255",
                    yellowgreen: "154,205,50",
                    yellow: "255,255,0"
                }
            },
            Hooks: {
                templates: {
                    textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                    boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                    clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                    backgroundPosition: ["X Y", "0% 0%"],
                    transformOrigin: ["X Y Z", "50% 50% 0px"],
                    perspectiveOrigin: ["X Y", "50% 50%"]
                },
                registered: {},
                register: function() {
                    for (var a = 0; a < A.Lists.colors.length; a++) {
                        var b = "color" === A.Lists.colors[a] ? "0 0 0 1" : "255 255 255 1";
                        A.Hooks.templates[A.Lists.colors[a]] = ["Red Green Blue Alpha", b]
                    }
                    var c,
                        d,
                        e;
                    if (p)
                        for (c in A.Hooks.templates)
                            if (A.Hooks.templates.hasOwnProperty(c)) {
                                d = A.Hooks.templates[c], e = d[0].split(" ");
                                var f = d[1].match(A.RegEx.valueSplit);
                                "Color" === e[0] && (e.push(e.shift()), f.push(f.shift()), A.Hooks.templates[c] = [e.join(" "), f.join(" ")])
                            }
                    for (c in A.Hooks.templates)
                        if (A.Hooks.templates.hasOwnProperty(c)) {
                            d = A.Hooks.templates[c], e = d[0].split(" ");
                            for (var g in e)
                                if (e.hasOwnProperty(g)) {
                                    var h = c + e[g],
                                        i = g;
                                    A.Hooks.registered[h] = [c, i]
                                }
                        }
                },
                getRoot: function(a) {
                    var b = A.Hooks.registered[a];
                    return b ? b[0] : a
                },
                getUnit: function(a, b) {
                    var c = (a.substr(b || 0, 5).match(/^[a-z%]+/) || [])[0] || "";
                    return c && t(A.Lists.units, c) ? c : ""
                },
                fixColors: function(a) {
                    return a.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g, function(a, b, c) {
                        return A.Lists.colorNames.hasOwnProperty(c) ? (b || "rgba(") + A.Lists.colorNames[c] + (b ? "" : ",1)") : b + c
                    })
                },
                cleanRootPropertyValue: function(a, b) {
                    return A.RegEx.valueUnwrap.test(b) && (b = b.match(A.RegEx.valueUnwrap)[1]), A.Values.isCSSNullValue(b) && (b = A.Hooks.templates[a][1]), b
                },
                extractValue: function(a, b) {
                    var c = A.Hooks.registered[a];
                    if (c) {
                        var d = c[0],
                            e = c[1];
                        return b = A.Hooks.cleanRootPropertyValue(d, b), b.toString().match(A.RegEx.valueSplit)[e]
                    }
                    return b
                },
                injectValue: function(a, b, c) {
                    var d = A.Hooks.registered[a];
                    if (d) {
                        var e,
                            f = d[0],
                            g = d[1];
                        return c = A.Hooks.cleanRootPropertyValue(f, c), e = c.toString().match(A.RegEx.valueSplit), e[g] = b, e.join(" ")
                    }
                    return c
                }
            },
            Normalizations: {
                registered: {
                    clip: function(a, b, c) {
                        switch (a) {
                        case "name":
                            return "clip";
                        case "extract":
                            var d;
                            return A.RegEx.wrappedValueAlreadyExtracted.test(c) ? d = c : (d = c.toString().match(A.RegEx.valueUnwrap), d = d ? d[1].replace(/,(\s+)?/g, " ") : c), d;
                        case "inject":
                            return "rect(" + c + ")"
                        }
                    },
                    blur: function(a, b, c) {
                        switch (a) {
                        case "name":
                            return y.State.isFirefox ? "filter" : "-webkit-filter";
                        case "extract":
                            var d = parseFloat(c);
                            if (!d && 0 !== d) {
                                var e = c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                d = e ? e[1] : 0
                            }
                            return d;
                        case "inject":
                            return parseFloat(c) ? "blur(" + c + ")" : "none"
                        }
                    },
                    opacity: function(a, b, c) {
                        if (p <= 8)
                            switch (a) {
                            case "name":
                                return "filter";
                            case "extract":
                                var d = c.toString().match(/alpha\(opacity=(.*)\)/i);
                                return c = d ? d[1] / 100 : 1;
                            case "inject":
                                return b.style.zoom = 1, parseFloat(c) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(c), 10) + ")"
                            }
                        else
                            switch (a) {
                            case "name":
                                return "opacity";
                            case "extract":
                            case "inject":
                                return c
                            }
                    }
                },
                register: function() {
                    function a(a, b, c) {
                        if ("border-box" === A.getPropertyValue(b, "boxSizing").toString().toLowerCase() === (c || !1)) {
                            var d,
                                e,
                                f = 0,
                                g = "width" === a ? ["Left", "Right"] : ["Top", "Bottom"],
                                h = ["padding" + g[0], "padding" + g[1], "border" + g[0] + "Width", "border" + g[1] + "Width"];
                            for (d = 0; d < h.length; d++)
                                e = parseFloat(A.getPropertyValue(b, h[d])), isNaN(e) || (f += e);
                            return c ? -f : f
                        }
                        return 0
                    }
                    function b(b, c) {
                        return function(d, e, f) {
                            switch (d) {
                            case "name":
                                return b;
                            case "extract":
                                return parseFloat(f) + a(b, e, c);
                            case "inject":
                                return parseFloat(f) - a(b, e, c) + "px"
                            }
                        }
                    }
                    p && !(p > 9) || y.State.isGingerbread || (A.Lists.transformsBase = A.Lists.transformsBase.concat(A.Lists.transforms3D));
                    for (var c = 0; c < A.Lists.transformsBase.length; c++)
                        !function() {
                            var a = A.Lists.transformsBase[c];
                            A.Normalizations.registered[a] = function(b, c, e) {
                                switch (b) {
                                case "name":
                                    return "transform";
                                case "extract":
                                    return g(c) === d || g(c).transformCache[a] === d ? /^scale/i.test(a) ? 1 : 0 : g(c).transformCache[a].replace(/[()]/g, "");
                                case "inject":
                                    var f = !1;
                                    switch (a.substr(0, a.length - 1)) {
                                    case "translate":
                                        f = !/(%|px|em|rem|vw|vh|\d)$/i.test(e);
                                        break;
                                    case "scal":
                                    case "scale":
                                        y.State.isAndroid && g(c).transformCache[a] === d && e < 1 && (e = 1), f = !/(\d)$/i.test(e);
                                        break;
                                    case "skew":
                                    case "rotate":
                                        f = !/(deg|\d)$/i.test(e)
                                    }
                                    return f || (g(c).transformCache[a] = "(" + e + ")"), g(c).transformCache[a]
                                }
                            }
                        }();
                    for (var e = 0; e < A.Lists.colors.length; e++)
                        !function() {
                            var a = A.Lists.colors[e];
                            A.Normalizations.registered[a] = function(b, c, e) {
                                switch (b) {
                                case "name":
                                    return a;
                                case "extract":
                                    var f;
                                    if (A.RegEx.wrappedValueAlreadyExtracted.test(e))
                                        f = e;
                                    else {
                                        var g,
                                            h = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };
                                        /^[A-z]+$/i.test(e) ? g = h[e] !== d ? h[e] : h.black : A.RegEx.isHex.test(e) ? g = "rgb(" + A.Values.hexToRgb(e).join(" ") + ")" : /^rgba?\(/i.test(e) || (g = h.black), f = (g || e).toString().match(A.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                    }
                                    return (!p || p > 8) && 3 === f.split(" ").length && (f += " 1"), f;
                                case "inject":
                                    return /^rgb/.test(e) ? e : (p <= 8 ? 4 === e.split(" ").length && (e = e.split(/\s+/).slice(0, 3).join(" ")) : 3 === e.split(" ").length && (e += " 1"), (p <= 8 ? "rgb" : "rgba") + "(" + e.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")")
                                }
                            }
                        }();
                    A.Normalizations.registered.innerWidth = b("width", !0), A.Normalizations.registered.innerHeight = b("height", !0), A.Normalizations.registered.outerWidth = b("width"), A.Normalizations.registered.outerHeight = b("height")
                }
            },
            Names: {
                camelCase: function(a) {
                    return a.replace(/-(\w)/g, function(a, b) {
                        return b.toUpperCase()
                    })
                },
                SVGAttribute: function(a) {
                    var b = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                    return (p || y.State.isAndroid && !y.State.isChrome) && (b += "|transform"), new RegExp("^(" + b + ")$", "i").test(a)
                },
                prefixCheck: function(a) {
                    if (y.State.prefixMatches[a])
                        return [y.State.prefixMatches[a], !0];
                    for (var b = ["", "Webkit", "Moz", "ms", "O"], c = 0, d = b.length; c < d; c++) {
                        var e;
                        if (e = 0 === c ? a : b[c] + a.replace(/^\w/, function(a) {
                            return a.toUpperCase()
                        }), u.isString(y.State.prefixElement.style[e]))
                            return y.State.prefixMatches[a] = e, [e, !0]
                    }
                    return [a, !1]
                }
            },
            Values: {
                hexToRgb: function(a) {
                    var b,
                        c = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                        d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                    return a = a.replace(c, function(a, b, c, d) {
                        return b + b + c + c + d + d
                    }), b = d.exec(a), b ? [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)] : [0, 0, 0]
                },
                isCSSNullValue: function(a) {
                    return !a || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)
                },
                getUnitType: function(a) {
                    return /^(rotate|skew)/i.test(a) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a) ? "" : "px"
                },
                getDisplayType: function(a) {
                    var b = a && a.tagName.toString().toLowerCase();
                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b) ? "inline" : /^(li)$/i.test(b) ? "list-item" : /^(tr)$/i.test(b) ? "table-row" : /^(table)$/i.test(b) ? "table" : /^(tbody)$/i.test(b) ? "table-row-group" : "block"
                },
                addClass: function(a, b) {
                    if (a)
                        if (a.classList)
                            a.classList.add(b);
                        else if (u.isString(a.className))
                            a.className += (a.className.length ? " " : "") + b;
                        else {
                            var c = a.getAttribute(p <= 7 ? "className" : "class") || "";
                            a.setAttribute("class", c + (c ? " " : "") + b)
                        }
                },
                removeClass: function(a, b) {
                    if (a)
                        if (a.classList)
                            a.classList.remove(b);
                        else if (u.isString(a.className))
                            a.className = a.className.toString().replace(new RegExp("(^|\\s)" + b.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                        else {
                            var c = a.getAttribute(p <= 7 ? "className" : "class") || "";
                            a.setAttribute("class", c.replace(new RegExp("(^|s)" + b.split(" ").join("|") + "(s|$)", "gi"), " "))
                        }
                }
            },
            getPropertyValue: function(a, c, e, f) {
                function h(a, c) {
                    var e = 0;
                    if (p <= 8)
                        e = o.css(a, c);
                    else {
                        var i = !1;
                        /^(width|height)$/.test(c) && 0 === A.getPropertyValue(a, "display") && (i = !0, A.setPropertyValue(a, "display", A.Values.getDisplayType(a)));
                        var j = function() {
                            i && A.setPropertyValue(a, "display", "none")
                        };
                        if (!f) {
                            if ("height" === c && "border-box" !== A.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                                var k = a.offsetHeight - (parseFloat(A.getPropertyValue(a, "borderTopWidth")) || 0) - (parseFloat(A.getPropertyValue(a, "borderBottomWidth")) || 0) - (parseFloat(A.getPropertyValue(a, "paddingTop")) || 0) - (parseFloat(A.getPropertyValue(a, "paddingBottom")) || 0);
                                return j(), k
                            }
                            if ("width" === c && "border-box" !== A.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                                var l = a.offsetWidth - (parseFloat(A.getPropertyValue(a, "borderLeftWidth")) || 0) - (parseFloat(A.getPropertyValue(a, "borderRightWidth")) || 0) - (parseFloat(A.getPropertyValue(a, "paddingLeft")) || 0) - (parseFloat(A.getPropertyValue(a, "paddingRight")) || 0);
                                return j(), l
                            }
                        }
                        var m;
                        m = g(a) === d ? b.getComputedStyle(a, null) : g(a).computedStyle ? g(a).computedStyle : g(a).computedStyle = b.getComputedStyle(a, null), "borderColor" === c && (c = "borderTopColor"), e = 9 === p && "filter" === c ? m.getPropertyValue(c) : m[c], "" !== e && null !== e || (e = a.style[c]), j()
                    }
                    if ("auto" === e && /^(top|right|bottom|left)$/i.test(c)) {
                        var n = h(a, "position");
                        ("fixed" === n || "absolute" === n && /top|left/i.test(c)) && (e = o(a).position()[c] + "px")
                    }
                    return e
                }
                var i;
                if (A.Hooks.registered[c]) {
                    var j = c,
                        k = A.Hooks.getRoot(j);
                    e === d && (e = A.getPropertyValue(a, A.Names.prefixCheck(k)[0])), A.Normalizations.registered[k] && (e = A.Normalizations.registered[k]("extract", a, e)), i = A.Hooks.extractValue(j, e)
                } else if (A.Normalizations.registered[c]) {
                    var l,
                        m;
                    l = A.Normalizations.registered[c]("name", a), "transform" !== l && (m = h(a, A.Names.prefixCheck(l)[0]), A.Values.isCSSNullValue(m) && A.Hooks.templates[c] && (m = A.Hooks.templates[c][1])), i = A.Normalizations.registered[c]("extract", a, m)
                }
                if (!/^[\d-]/.test(i)) {
                    var n = g(a);
                    if (n && n.isSVG && A.Names.SVGAttribute(c))
                        if (/^(height|width)$/i.test(c))
                            try {
                                i = a.getBBox()[c]
                            } catch (q) {
                                i = 0
                            }
                        else
                            i = a.getAttribute(c);
                    else
                        i = h(a, A.Names.prefixCheck(c)[0])
                }
                return A.Values.isCSSNullValue(i) && (i = 0), y.debug >= 2 && console.log("Get " + c + ": " + i), i
            },
            setPropertyValue: function(a, c, d, e, f) {
                var h = c;
                if ("scroll" === c)
                    f.container ? f.container["scroll" + f.direction] = d : "Left" === f.direction ? b.scrollTo(d, f.alternateValue) : b.scrollTo(f.alternateValue, d);
                else if (A.Normalizations.registered[c] && "transform" === A.Normalizations.registered[c]("name", a))
                    A.Normalizations.registered[c]("inject", a, d), h = "transform", d = g(a).transformCache[c];
                else {
                    if (A.Hooks.registered[c]) {
                        var i = c,
                            j = A.Hooks.getRoot(c);
                        e = e || A.getPropertyValue(a, j), d = A.Hooks.injectValue(i, d, e), c = j
                    }
                    if (A.Normalizations.registered[c] && (d = A.Normalizations.registered[c]("inject", a, d), c = A.Normalizations.registered[c]("name", a)), h = A.Names.prefixCheck(c)[0], p <= 8)
                        try {
                            a.style[h] = d
                        } catch (l) {
                            y.debug && console.log("Browser does not support [" + d + "] for [" + h + "]")
                        }
                    else {
                        var k = g(a);
                        k && k.isSVG && A.Names.SVGAttribute(c) ? a.setAttribute(c, d) : a.style[h] = d
                    }
                    y.debug >= 2 && console.log("Set " + c + " (" + h + "): " + d)
                }
                return [h, d]
            },
            flushTransformCache: function(a) {
                var b = "",
                    c = g(a);
                if ((p || y.State.isAndroid && !y.State.isChrome) && c && c.isSVG) {
                    var d = function(b) {
                            return parseFloat(A.getPropertyValue(a, b))
                        },
                        e = {
                            translate: [d("translateX"), d("translateY")],
                            skewX: [d("skewX")],
                            skewY: [d("skewY")],
                            scale: 1 !== d("scale") ? [d("scale"), d("scale")] : [d("scaleX"), d("scaleY")],
                            rotate: [d("rotateZ"), 0, 0]
                        };
                    o.each(g(a).transformCache, function(a) {
                        /^translate/i.test(a) ? a = "translate" : /^scale/i.test(a) ? a = "scale" : /^rotate/i.test(a) && (a = "rotate"), e[a] && (b += a + "(" + e[a].join(" ") + ") ", delete e[a])
                    })
                } else {
                    var f,
                        h;
                    o.each(g(a).transformCache, function(c) {
                        if (f = g(a).transformCache[c], "transformPerspective" === c)
                            return h = f, !0;
                        9 === p && "rotateZ" === c && (c = "rotate"), b += c + f + " "
                    }), h && (b = "perspective" + h + " " + b)
                }
                A.setPropertyValue(a, "transform", b)
            }
        };
        A.Hooks.register(), A.Normalizations.register(), y.hook = function(a, b, c) {
            var e;
            return a = f(a), o.each(a, function(a, f) {
                if (g(f) === d && y.init(f), c === d)
                    e === d && (e = A.getPropertyValue(f, b));
                else {
                    var h = A.setPropertyValue(f, b, c);
                    "transform" === h[0] && y.CSS.flushTransformCache(f), e = h
                }
            }), e
        };
        var B = function() {
            function a() {
                return k ? z.promise || null : p
            }
            function e(a, e) {
                function f(f) {
                    var k,
                        n;
                    if (i.begin && 0 === D)
                        try {
                            i.begin.call(r, r)
                        } catch (V) {
                            setTimeout(function() {
                                throw V
                            }, 1)
                        }
                    if ("scroll" === G) {
                        var p,
                            q,
                            w,
                            x = /^x$/i.test(i.axis) ? "Left" : "Top",
                            B = parseFloat(i.offset) || 0;
                        i.container ? u.isWrapped(i.container) || u.isNode(i.container) ? (i.container = i.container[0] || i.container, p = i.container["scroll" + x], w = p + o(a).position()[x.toLowerCase()] + B) : i.container = null : (p = y.State.scrollAnchor[y.State["scrollProperty" + x]], q = y.State.scrollAnchor[y.State["scrollProperty" + ("Left" === x ? "Top" : "Left")]], w = o(a).offset()[x.toLowerCase()] + B), j = {
                            scroll: {
                                rootPropertyValue: !1,
                                startValue: p,
                                currentValue: p,
                                endValue: w,
                                unitType: "",
                                easing: i.easing,
                                scrollData: {
                                    container: i.container,
                                    direction: x,
                                    alternateValue: q
                                }
                            },
                            element: a
                        }, y.debug && console.log("tweensContainer (scroll): ", j.scroll, a)
                    } else if ("reverse" === G) {
                        if (!(k = g(a)))
                            return;
                        if (!k.tweensContainer)
                            return void o.dequeue(a, i.queue);
                        "none" === k.opts.display && (k.opts.display = "auto"), "hidden" === k.opts.visibility && (k.opts.visibility = "visible"), k.opts.loop = !1, k.opts.begin = null, k.opts.complete = null, v.easing || delete i.easing, v.duration || delete i.duration, i = o.extend({}, k.opts, i), n = o.extend(!0, {}, k ? k.tweensContainer : null);
                        for (var E in n)
                            if (n.hasOwnProperty(E) && "element" !== E) {
                                var F = n[E].startValue;
                                n[E].startValue = n[E].currentValue = n[E].endValue, n[E].endValue = F, u.isEmptyObject(v) || (n[E].easing = i.easing), y.debug && console.log("reverse tweensContainer (" + E + "): " + JSON.stringify(n[E]), a)
                            }
                        j = n
                    } else if ("start" === G) {
                        k = g(a), k && k.tweensContainer && !0 === k.isAnimating && (n = k.tweensContainer);
                        var H = function(e, f) {
                            var g,
                                l = A.Hooks.getRoot(e),
                                m = !1,
                                p = f[0],
                                q = f[1],
                                r = f[2];
                            if (!(k && k.isSVG || "tween" === l || !1 !== A.Names.prefixCheck(l)[1] || A.Normalizations.registered[l] !== d))
                                return void (y.debug && console.log("Skipping [" + l + "] due to a lack of browser support."));
                            (i.display !== d && null !== i.display && "none" !== i.display || i.visibility !== d && "hidden" !== i.visibility) && /opacity|filter/.test(e) && !r && 0 !== p && (r = 0), i._cacheValues && n && n[e] ? (r === d && (r = n[e].endValue + n[e].unitType), m = k.rootPropertyValueCache[l]) : A.Hooks.registered[e] ? r === d ? (m = A.getPropertyValue(a, l), r = A.getPropertyValue(a, e, m)) : m = A.Hooks.templates[l][1] : r === d && (r = A.getPropertyValue(a, e));
                            var s,
                                t,
                                v,
                                w = !1,
                                x = function(a, b) {
                                    var c,
                                        d;
                                    return d = (b || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(a) {
                                        return c = a, ""
                                    }), c || (c = A.Values.getUnitType(a)), [d, c]
                                };
                            if (r !== p && u.isString(r) && u.isString(p)) {
                                g = "";
                                var z = 0,
                                    B = 0,
                                    C = [],
                                    D = [],
                                    E = 0,
                                    F = 0,
                                    G = 0;
                                for (r = A.Hooks.fixColors(r), p = A.Hooks.fixColors(p); z < r.length && B < p.length;) {
                                    var H = r[z],
                                        I = p[B];
                                    if (/[\d\.-]/.test(H) && /[\d\.-]/.test(I)) {
                                        for (var J = H, K = I, L = ".", N = "."; ++z < r.length;) {
                                            if ((H = r[z]) === L)
                                                L = "..";
                                            else if (!/\d/.test(H))
                                                break;
                                            J += H
                                        }
                                        for (; ++B < p.length;) {
                                            if ((I = p[B]) === N)
                                                N = "..";
                                            else if (!/\d/.test(I))
                                                break;
                                            K += I
                                        }
                                        var O = A.Hooks.getUnit(r, z),
                                            P = A.Hooks.getUnit(p, B);
                                        if (z += O.length, B += P.length, O === P)
                                            J === K ? g += J + O : (g += "{" + C.length + (F ? "!" : "") + "}" + O, C.push(parseFloat(J)), D.push(parseFloat(K)));
                                        else {
                                            var Q = parseFloat(J),
                                                R = parseFloat(K);
                                            g += (E < 5 ? "calc" : "") + "(" + (Q ? "{" + C.length + (F ? "!" : "") + "}" : "0") + O + " + " + (R ? "{" + (C.length + (Q ? 1 : 0)) + (F ? "!" : "") + "}" : "0") + P + ")", Q && (C.push(Q), D.push(0)), R && (C.push(0), D.push(R))
                                        }
                                    } else {
                                        if (H !== I) {
                                            E = 0;
                                            break
                                        }
                                        g += H, z++, B++, 0 === E && "c" === H || 1 === E && "a" === H || 2 === E && "l" === H || 3 === E && "c" === H || E >= 4 && "(" === H ? E++ : (E && E < 5 || E >= 4 && ")" === H && --E < 5) && (E = 0), 0 === F && "r" === H || 1 === F && "g" === H || 2 === F && "b" === H || 3 === F && "a" === H || F >= 3 && "(" === H ? (3 === F && "a" === H && (G = 1), F++) : G && "," === H ? ++G > 3 && (F = G = 0) : (G && F < (G ? 5 : 4) || F >= (G ? 4 : 3) && ")" === H && --F < (G ? 5 : 4)) && (F = G = 0)
                                    }
                                }
                                z === r.length && B === p.length || (y.debug && console.error('Trying to pattern match mis-matched strings ["' + p + '", "' + r + '"]'), g = d), g && (C.length ? (y.debug && console.log('Pattern found "' + g + '" -> ', C, D, "[" + r + "," + p + "]"), r = C, p = D, t = v = "") : g = d)
                            }
                            g || (s = x(e, r), r = s[0], v = s[1], s = x(e, p), p = s[0].replace(/^([+-\/*])=/, function(a, b) {
                                return w = b, ""
                            }), t = s[1], r = parseFloat(r) || 0, p = parseFloat(p) || 0, "%" === t && (/^(fontSize|lineHeight)$/.test(e) ? (p /= 100, t = "em") : /^scale/.test(e) ? (p /= 100, t = "") : /(Red|Green|Blue)$/i.test(e) && (p = p / 100 * 255, t = "")));
                            if (/[\/*]/.test(w))
                                t = v;
                            else if (v !== t && 0 !== r)
                                if (0 === p)
                                    t = v;
                                else {
                                    h = h || function() {
                                        var d = {
                                                myParent: a.parentNode || c.body,
                                                position: A.getPropertyValue(a, "position"),
                                                fontSize: A.getPropertyValue(a, "fontSize")
                                            },
                                            e = d.position === M.lastPosition && d.myParent === M.lastParent,
                                            f = d.fontSize === M.lastFontSize;
                                        M.lastParent = d.myParent, M.lastPosition = d.position, M.lastFontSize = d.fontSize;
                                        var g = {};
                                        if (f && e)
                                            g.emToPx = M.lastEmToPx, g.percentToPxWidth = M.lastPercentToPxWidth, g.percentToPxHeight = M.lastPercentToPxHeight;
                                        else {
                                            var h = k && k.isSVG ? c.createElementNS("http://www.w3.org/2000/svg", "rect") : c.createElement("div");
                                            y.init(h), d.myParent.appendChild(h), o.each(["overflow", "overflowX", "overflowY"], function(a, b) {
                                                y.CSS.setPropertyValue(h, b, "hidden")
                                            }), y.CSS.setPropertyValue(h, "position", d.position), y.CSS.setPropertyValue(h, "fontSize", d.fontSize), y.CSS.setPropertyValue(h, "boxSizing", "content-box"), o.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(a, b) {
                                                y.CSS.setPropertyValue(h, b, "100%")
                                            }), y.CSS.setPropertyValue(h, "paddingLeft", "100em"), g.percentToPxWidth = M.lastPercentToPxWidth = (parseFloat(A.getPropertyValue(h, "width", null, !0)) || 1) / 100, g.percentToPxHeight = M.lastPercentToPxHeight = (parseFloat(A.getPropertyValue(h, "height", null, !0)) || 1) / 100, g.emToPx = M.lastEmToPx = (parseFloat(A.getPropertyValue(h, "paddingLeft")) || 1) / 100, d.myParent.removeChild(h)
                                        }
                                        return null === M.remToPx && (M.remToPx = parseFloat(A.getPropertyValue(c.body, "fontSize")) || 16), null === M.vwToPx && (M.vwToPx = parseFloat(b.innerWidth) / 100, M.vhToPx = parseFloat(b.innerHeight) / 100), g.remToPx = M.remToPx, g.vwToPx = M.vwToPx, g.vhToPx = M.vhToPx, y.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(g), a), g
                                    }();
                                    var S = /margin|padding|left|right|width|text|word|letter/i.test(e) || /X$/.test(e) || "x" === e ? "x" : "y";
                                    switch (v) {
                                    case "%":
                                        r *= "x" === S ? h.percentToPxWidth : h.percentToPxHeight;
                                        break;
                                    case "px":
                                        break;
                                    default:
                                        r *= h[v + "ToPx"]
                                    }
                                    switch (t) {
                                    case "%":
                                        r *= 1 / ("x" === S ? h.percentToPxWidth : h.percentToPxHeight);
                                        break;
                                    case "px":
                                        break;
                                    default:
                                        r *= 1 / h[t + "ToPx"]
                                    }
                                }
                            switch (w) {
                            case "+":
                                p = r + p;
                                break;
                            case "-":
                                p = r - p;
                                break;
                            case "*":
                                p *= r;
                                break;
                            case "/":
                                p = r / p
                            }
                            j[e] = {
                                rootPropertyValue: m,
                                startValue: r,
                                currentValue: r,
                                endValue: p,
                                unitType: t,
                                easing: q
                            }, g && (j[e].pattern = g), y.debug && console.log("tweensContainer (" + e + "): " + JSON.stringify(j[e]), a)
                        };
                        for (var I in s)
                            if (s.hasOwnProperty(I)) {
                                var J = A.Names.camelCase(I),
                                    K = function(b, c) {
                                        var d,
                                            f,
                                            g;
                                        return u.isFunction(b) && (b = b.call(a, e, C)), u.isArray(b) ? (d = b[0], !u.isArray(b[1]) && /^[\d-]/.test(b[1]) || u.isFunction(b[1]) || A.RegEx.isHex.test(b[1]) ? g = b[1] : u.isString(b[1]) && !A.RegEx.isHex.test(b[1]) && y.Easings[b[1]] || u.isArray(b[1]) ? (f = c ? b[1] : l(b[1], i.duration), g = b[2]) : g = b[1] || b[2]) : d = b, c || (f = f || i.easing), u.isFunction(d) && (d = d.call(a, e, C)), u.isFunction(g) && (g = g.call(a, e, C)), [d || 0, f, g]
                                    }(s[I]);
                                if (t(A.Lists.colors, J)) {
                                    var L = K[0],
                                        O = K[1],
                                        P = K[2];
                                    if (A.RegEx.isHex.test(L)) {
                                        for (var Q = ["Red", "Green", "Blue"], R = A.Values.hexToRgb(L), S = P ? A.Values.hexToRgb(P) : d, T = 0; T < Q.length; T++) {
                                            var U = [R[T]];
                                            O && U.push(O), S !== d && U.push(S[T]), H(J + Q[T], U)
                                        }
                                        continue
                                    }
                                }
                                H(J, K)
                            }
                        j.element = a
                    }
                    j.element && (A.Values.addClass(a, "velocity-animating"), N.push(j), k = g(a), k && ("" === i.queue && (k.tweensContainer = j, k.opts = i), k.isAnimating = !0), D === C - 1 ? (y.State.calls.push([N, r, i, null, z.resolver, null, 0]), !1 === y.State.isTicking && (y.State.isTicking = !0, m())) : D++)
                }
                var h,
                    i = o.extend({}, y.defaults, v),
                    j = {};
                switch (g(a) === d && y.init(a), parseFloat(i.delay) && !1 !== i.queue && o.queue(a, i.queue, function(b, c) {
                    if (!0 === c)
                        return !0;
                    y.velocityQueueEntryFlag = !0;
                    var d = y.State.delayedElements.count++;
                    y.State.delayedElements[d] = a;
                    var e = function(a) {
                        return function() {
                            y.State.delayedElements[a] = !1, b()
                        }
                    }(d);
                    g(a).delayBegin = (new Date).getTime(), g(a).delay = parseFloat(i.delay), g(a).delayTimer = {
                        setTimeout: setTimeout(b, parseFloat(i.delay)),
                        next: e
                    }
                }), i.duration.toString().toLowerCase()) {
                case "fast":
                    i.duration = 200;
                    break;
                case "normal":
                    i.duration = w;
                    break;
                case "slow":
                    i.duration = 600;
                    break;
                default:
                    i.duration = parseFloat(i.duration) || 1
                }
                if (!1 !== y.mock && (!0 === y.mock ? i.duration = i.delay = 1 : (i.duration *= parseFloat(y.mock) || 1, i.delay *= parseFloat(y.mock) || 1)), i.easing = l(i.easing, i.duration), i.begin && !u.isFunction(i.begin) && (i.begin = null), i.progress && !u.isFunction(i.progress) && (i.progress = null), i.complete && !u.isFunction(i.complete) && (i.complete = null), i.display !== d && null !== i.display && (i.display = i.display.toString().toLowerCase(), "auto" === i.display && (i.display = y.CSS.Values.getDisplayType(a))), i.visibility !== d && null !== i.visibility && (i.visibility = i.visibility.toString().toLowerCase()), i.mobileHA = i.mobileHA && y.State.isMobile && !y.State.isGingerbread, !1 === i.queue)
                    if (i.delay) {
                        var k = y.State.delayedElements.count++;
                        y.State.delayedElements[k] = a;
                        var n = function(a) {
                            return function() {
                                y.State.delayedElements[a] = !1, f()
                            }
                        }(k);
                        g(a).delayBegin = (new Date).getTime(), g(a).delay = parseFloat(i.delay), g(a).delayTimer = {
                            setTimeout: setTimeout(f, parseFloat(i.delay)),
                            next: n
                        }
                    } else
                        f();
                else
                    o.queue(a, i.queue, function(a, b) {
                        if (!0 === b)
                            return z.promise && z.resolver(r), !0;
                        y.velocityQueueEntryFlag = !0, f(a)
                    });
                "" !== i.queue && "fx" !== i.queue || "inprogress" === o.queue(a)[0] || o.dequeue(a)
            }
            var j,
                k,
                p,
                q,
                r,
                s,
                v,
                x = arguments[0] && (arguments[0].p || o.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || u.isString(arguments[0].properties));
            u.isWrapped(this) ? (k = !1, q = 0, r = this, p = this) : (k = !0, q = 1, r = x ? arguments[0].elements || arguments[0].e : arguments[0]);
            var z = {
                promise: null,
                resolver: null,
                rejecter: null
            };
            if (k && y.Promise && (z.promise = new y.Promise(function(a, b) {
                z.resolver = a, z.rejecter = b
            })), x ? (s = arguments[0].properties || arguments[0].p, v = arguments[0].options || arguments[0].o) : (s = arguments[q], v = arguments[q + 1]), !(r = f(r)))
                return void (z.promise && (s && v && !1 === v.promiseRejectEmpty ? z.resolver() : z.rejecter()));
            var C = r.length,
                D = 0;
            if (!/^(stop|finish|finishAll|pause|resume)$/i.test(s) && !o.isPlainObject(v)) {
                var E = q + 1;
                v = {};
                for (var F = E; F < arguments.length; F++)
                    u.isArray(arguments[F]) || !/^(fast|normal|slow)$/i.test(arguments[F]) && !/^\d/.test(arguments[F]) ? u.isString(arguments[F]) || u.isArray(arguments[F]) ? v.easing = arguments[F] : u.isFunction(arguments[F]) && (v.complete = arguments[F]) : v.duration = arguments[F]
            }
            var G;
            switch (s) {
            case "scroll":
                G = "scroll";
                break;
            case "reverse":
                G = "reverse";
                break;
            case "pause":
                var H = (new Date).getTime();
                return o.each(r, function(a, b) {
                    h(b, H)
                }), o.each(y.State.calls, function(a, b) {
                    var c = !1;
                    b && o.each(b[1], function(a, e) {
                        var f = v === d ? "" : v;
                        return !0 !== f && b[2].queue !== f && (v !== d || !1 !== b[2].queue) || (o.each(r, function(a, d) {
                                if (d === e)
                                    return b[5] = {
                                        resume: !1
                                    }, c = !0, !1
                            }), !c && void 0)
                    })
                }), a();
            case "resume":
                return o.each(r, function(a, b) {
                    i(b, H)
                }), o.each(y.State.calls, function(a, b) {
                    var c = !1;
                    b && o.each(b[1], function(a, e) {
                        var f = v === d ? "" : v;
                        return !0 !== f && b[2].queue !== f && (v !== d || !1 !== b[2].queue) || (!b[5] || (o.each(r, function(a, d) {
                                if (d === e)
                                    return b[5].resume = !0, c = !0, !1
                            }), !c && void 0))
                    })
                }), a();
            case "finish":
            case "finishAll":
            case "stop":
                o.each(r, function(a, b) {
                    g(b) && g(b).delayTimer && (clearTimeout(g(b).delayTimer.setTimeout), g(b).delayTimer.next && g(b).delayTimer.next(), delete g(b).delayTimer), "finishAll" !== s || !0 !== v && !u.isString(v) || (o.each(o.queue(b, u.isString(v) ? v : ""), function(a, b) {
                        u.isFunction(b) && b()
                    }), o.queue(b, u.isString(v) ? v : "", []))
                });
                var I = [];
                return o.each(y.State.calls, function(a, b) {
                    b && o.each(b[1], function(c, e) {
                        var f = v === d ? "" : v;
                        if (!0 !== f && b[2].queue !== f && (v !== d || !1 !== b[2].queue))
                            return !0;
                        o.each(r, function(c, d) {
                            if (d === e)
                                if ((!0 === v || u.isString(v)) && (o.each(o.queue(d, u.isString(v) ? v : ""), function(a, b) {
                                    u.isFunction(b) && b(null, !0)
                                }), o.queue(d, u.isString(v) ? v : "", [])), "stop" === s) {
                                    var h = g(d);
                                    h && h.tweensContainer && !1 !== f && o.each(h.tweensContainer, function(a, b) {
                                        b.endValue = b.currentValue
                                    }), I.push(a)
                                } else
                                    "finish" !== s && "finishAll" !== s || (b[2].duration = 1)
                        })
                    })
                }), "stop" === s && (o.each(I, function(a, b) {
                    n(b, !0)
                }), z.promise && z.resolver(r)), a();
            default:
                if (!o.isPlainObject(s) || u.isEmptyObject(s)) {
                    if (u.isString(s) && y.Redirects[s]) {
                        j = o.extend({}, v);
                        var J = j.duration,
                            K = j.delay || 0;
                        return !0 === j.backwards && (r = o.extend(!0, [], r).reverse()), o.each(r, function(a, b) {
                            parseFloat(j.stagger) ? j.delay = K + parseFloat(j.stagger) * a : u.isFunction(j.stagger) && (j.delay = K + j.stagger.call(b, a, C)), j.drag && (j.duration = parseFloat(J) || (/^(callout|transition)/.test(s) ? 1e3 : w), j.duration = Math.max(j.duration * (j.backwards ? 1 - a / C : (a + 1) / C), .75 * j.duration, 200)), y.Redirects[s].call(b, b, j || {}, a, C, r, z.promise ? z : d)
                        }), a()
                    }
                    var L = "Velocity: First argument (" + s + ") was not a property map, a known action, or a registered redirect. Aborting.";
                    return z.promise ? z.rejecter(new Error(L)) : b.console && console.log(L), a()
                }
                G = "start"
            }
            var M = {
                    lastParent: null,
                    lastPosition: null,
                    lastFontSize: null,
                    lastPercentToPxWidth: null,
                    lastPercentToPxHeight: null,
                    lastEmToPx: null,
                    remToPx: null,
                    vwToPx: null,
                    vhToPx: null
                },
                N = [];
            o.each(r, function(a, b) {
                u.isNode(b) && e(b, a)
            }), j = o.extend({}, y.defaults, v), j.loop = parseInt(j.loop, 10);
            var O = 2 * j.loop - 1;
            if (j.loop)
                for (var P = 0; P < O; P++) {
                    var Q = {
                        delay: j.delay,
                        progress: j.progress
                    };
                    P === O - 1 && (Q.display = j.display, Q.visibility = j.visibility, Q.complete = j.complete), B(r, "reverse", Q)
                }
            return a()
        };
        y = o.extend(B, y), y.animate = B;
        var C = b.requestAnimationFrame || q;
        if (!y.State.isMobile && c.hidden !== d) {
            var D = function() {
                c.hidden ? (C = function(a) {
                    return setTimeout(function() {
                        a(!0)
                    }, 16)
                }, m()) : C = b.requestAnimationFrame || q
            };
            D(), c.addEventListener("visibilitychange", D)
        }
        return a.Velocity = y, a !== b && (a.fn.velocity = B, a.fn.velocity.defaults = y.defaults), o.each(["Down", "Up"], function(a, b) {
            y.Redirects["slide" + b] = function(a, c, e, f, g, h) {
                var i = o.extend({}, c),
                    j = i.begin,
                    k = i.complete,
                    l = {},
                    m = {
                        height: "",
                        marginTop: "",
                        marginBottom: "",
                        paddingTop: "",
                        paddingBottom: ""
                    };
                i.display === d && (i.display = "Down" === b ? "inline" === y.CSS.Values.getDisplayType(a) ? "inline-block" : "block" : "none"), i.begin = function() {
                    0 === e && j && j.call(g, g);
                    for (var c in m)
                        if (m.hasOwnProperty(c)) {
                            l[c] = a.style[c];
                            var d = A.getPropertyValue(a, c);
                            m[c] = "Down" === b ? [d, 0] : [0, d]
                        }
                    l.overflow = a.style.overflow, a.style.overflow = "hidden"
                }, i.complete = function() {
                    for (var b in l)
                        l.hasOwnProperty(b) && (a.style[b] = l[b]);
                    e === f - 1 && (k && k.call(g, g), h && h.resolver(g))
                }, y(a, m, i)
            }
        }), o.each(["In", "Out"], function(a, b) {
            y.Redirects["fade" + b] = function(a, c, e, f, g, h) {
                var i = o.extend({}, c),
                    j = i.complete,
                    k = {
                        opacity: "In" === b ? 1 : 0
                    };
                0 !== e && (i.begin = null), i.complete = e !== f - 1 ? null : function() {
                    j && j.call(g, g), h && h.resolver(g)
                }, i.display === d && (i.display = "In" === b ? "auto" : "none"), y(this, k, i)
            }
        }), y
    }(window.jQuery || window.Zepto || window, window, window ? window.document : undefined)
});
$.fn.tooltip = function(t) {
    return "remove" === t ? (this.each(function() {
        $("#" + $(this).attr("data-tooltip-id")).remove(), $(this).removeAttr("data-tooltip-id"), $(this).off("mouseenter.tooltip mouseleave.tooltip")
    }), !1) : (t = $.extend({
        delay: 350,
        tooltip: "",
        position: "bottom",
        html: !1
    }, t), this.each(function() {
        var i,
            e,
            o,
            a,
            n,
            r,
            s = makeid(),
            p = $(this);
        p.attr("data-tooltip-id") && $("#" + p.attr("data-tooltip-id")).remove(), p.attr("data-tooltip-id", s);
        var l = function() {
            i = p.attr("data-html") ? "true" === p.attr("data-html") : t.html, e = void 0 === (e = p.attr("data-delay")) || "" === e ? t.delay : e, o = void 0 === (o = p.attr("data-position")) || "" === o ? t.position : o, a = void 0 === (a = p.attr("data-tooltip")) || "" === a ? t.tooltip : a
        };
        l();
        var d;
        d = $('<div class="material-tooltip"></div>'), a = i ? $("<span></span>").html(a) : $("<span></span>").text(a), d.append(a).appendTo($("body")).attr("id", s), (r = $('<div class="backdrop"></div>')).appendTo(d), n = d, p.off("mouseenter.tooltip mouseleave.tooltip");
        var f,
            u = !1;
        p.on({
            "mouseenter.tooltip": function(t) {
                f = setTimeout(function() {
                    l(), u = !0, n.velocity("stop"), r.velocity("stop"), n.css({
                        visibility: "visible",
                        left: "0px",
                        top: "0px"
                    });
                    var t,
                        i,
                        e,
                        a,
                        s,
                        d,
                        f = p.outerWidth(),
                        c = p.outerHeight(),
                        h = n.outerHeight(),
                        v = n.outerWidth(),
                        m = "0px",
                        x = "0px",
                        y = r[0].offsetWidth,
                        g = r[0].offsetHeight;
                    "top" === o ? (a = p.offset().top - h - 5, s = p.offset().left + f / 2 - v / 2, d = repositionWithinScreen(s, a, v, h), m = "-10px", r.css({
                        bottom: 0,
                        left: 0,
                        borderRadius: "14px 14px 0 0",
                        transformOrigin: "50% 100%",
                        marginTop: h,
                        marginLeft: v / 2 - y / 2
                    })) : "left" === o ? (a = p.offset().top + c / 2 - h / 2, s = p.offset().left - v - 5, d = repositionWithinScreen(s, a, v, h), x = "-10px", r.css({
                        top: "-7px",
                        right: 0,
                        width: "14px",
                        height: "14px",
                        borderRadius: "14px 0 0 14px",
                        transformOrigin: "95% 50%",
                        marginTop: h / 2,
                        marginLeft: v
                    })) : "right" === o ? (a = p.offset().top + c / 2 - h / 2, s = p.offset().left + f + 5, d = repositionWithinScreen(s, a, v, h), x = "+10px", r.css({
                        top: "-7px",
                        left: 0,
                        width: "14px",
                        height: "14px",
                        borderRadius: "0 14px 14px 0",
                        transformOrigin: "5% 50%",
                        marginTop: h / 2,
                        marginLeft: "0px"
                    })) : (a = p.offset().top + p.outerHeight() + 5, s = p.offset().left + f / 2 - v / 2, d = repositionWithinScreen(s, a, v, h), m = "+10px", r.css({
                        top: 0,
                        left: 0,
                        marginLeft: v / 2 - y / 2
                    })), n.css({
                        top: d.y,
                        left: d.x
                    }), t = Math.SQRT2 * v / parseInt(y), i = Math.SQRT2 * h / parseInt(g), e = Math.max(t, i), n.velocity({
                        translateY: m,
                        translateX: x
                    }, {
                        duration: 350,
                        queue: !1
                    }).velocity({
                        opacity: 1
                    }, {
                        duration: 300,
                        delay: 50,
                        queue: !1
                    }), r.css({
                        visibility: "visible"
                    }).velocity({
                        opacity: 1
                    }, {
                        duration: 55,
                        delay: 0,
                        queue: !1
                    }).velocity({
                        scaleX: e,
                        scaleY: e
                    }, {
                        duration: 300,
                        delay: 0,
                        queue: !1,
                        easing: "easeInOutQuad"
                    })
                }, e)
            },
            "mouseleave.tooltip": function() {
                u = !1, clearTimeout(f), setTimeout(function() {
                    !0 !== u && (n.velocity({
                        opacity: 0,
                        translateY: 0,
                        translateX: 0
                    }, {
                        duration: 225,
                        queue: !1
                    }), r.velocity({
                        opacity: 0,
                        scaleX: 1,
                        scaleY: 1
                    }, {
                        duration: 225,
                        queue: !1,
                        complete: function() {
                            r.css({
                                visibility: "hidden"
                            }), n.css({
                                visibility: "hidden"
                            }), u = !1
                        }
                    }))
                }, 225)
            }
        })
    }))
};
var repositionWithinScreen = function(t, i, e, o) {
    var a = t,
        n = i;
    return a < 0 ? a = 4 : a + e > window.innerWidth && (a -= a + e - window.innerWidth), n < 0 ? n = 4 : n + o > window.innerHeight + $(window).scrollTop && (n -= n + o - window.innerHeight), {
        x: a,
        y: n
    }
};
(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a)
                    return a(o, !0);
                if (i)
                    return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
        s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        var FilterCSS = require("cssfilter").FilterCSS;
        var getDefaultCSSWhiteList = require("cssfilter").getDefaultWhiteList;
        var _ = require("./util");
        function getDefaultWhiteList() {
            return {
                a: ["target", "href", "title"],
                abbr: ["title"],
                address: [],
                area: ["shape", "coords", "href", "alt"],
                article: [],
                aside: [],
                audio: ["autoplay", "controls", "loop", "preload", "src"],
                b: [],
                bdi: ["dir"],
                bdo: ["dir"],
                big: [],
                blockquote: ["cite"],
                br: [],
                caption: [],
                center: [],
                cite: [],
                code: [],
                col: ["align", "valign", "span", "width"],
                colgroup: ["align", "valign", "span", "width"],
                dd: [],
                del: ["datetime"],
                details: ["open"],
                div: [],
                dl: [],
                dt: [],
                em: [],
                font: ["color", "size", "face"],
                footer: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                header: [],
                hr: [],
                i: [],
                img: ["src", "alt", "title", "width", "height"],
                ins: ["datetime"],
                li: [],
                mark: [],
                nav: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                section: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                table: ["width", "border", "align", "valign"],
                tbody: ["align", "valign"],
                td: ["width", "rowspan", "colspan", "align", "valign"],
                tfoot: ["align", "valign"],
                th: ["width", "rowspan", "colspan", "align", "valign"],
                thead: ["align", "valign"],
                tr: ["rowspan", "align", "valign"],
                tt: [],
                u: [],
                ul: [],
                video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]
            }
        }
        var defaultCSSFilter = new FilterCSS;
        function onTag(tag, html, options) {}
        function onIgnoreTag(tag, html, options) {}
        function onTagAttr(tag, name, value) {}
        function onIgnoreTagAttr(tag, name, value) {}
        function escapeHtml(html) {
            return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;")
        }
        function safeAttrValue(tag, name, value, cssFilter) {
            value = friendlyAttrValue(value);
            if (name === "href" || name === "src") {
                value = _.trim(value);
                if (value === "#")
                    return "#";
                if (!(value.substr(0, 7) === "http://" || value.substr(0, 8) === "https://" || value.substr(0, 7) === "mailto:" || value.substr(0, 4) === "tel:" || value[0] === "#" || value[0] === "/")) {
                    return ""
                }
            } else if (name === "background") {
                REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
                if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
                    return ""
                }
            } else if (name === "style") {
                REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
                if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
                    return ""
                }
                REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
                if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
                    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
                    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
                        return ""
                    }
                }
                if (cssFilter !== false) {
                    cssFilter = cssFilter || defaultCSSFilter;
                    value = cssFilter.process(value)
                }
            }
            value = escapeAttrValue(value);
            return value
        }
        var REGEXP_LT = /</g;
        var REGEXP_GT = />/g;
        var REGEXP_QUOTE = /"/g;
        var REGEXP_QUOTE_2 = /&quot;/g;
        var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
        var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
        var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
        var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//gm;
        var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;
        var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;
        var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;
        var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
        var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;
        function escapeQuote(str) {
            return str.replace(REGEXP_QUOTE, "&quot;")
        }
        function unescapeQuote(str) {
            return str.replace(REGEXP_QUOTE_2, '"')
        }
        function escapeHtmlEntities(str) {
            return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
                return code[0] === "x" || code[0] === "X" ? String.fromCharCode(parseInt(code.substr(1), 16)) : String.fromCharCode(parseInt(code, 10))
            })
        }
        function escapeDangerHtml5Entities(str) {
            return str.replace(REGEXP_ATTR_VALUE_COLON, ":").replace(REGEXP_ATTR_VALUE_NEWLINE, " ")
        }
        function clearNonPrintableCharacter(str) {
            var str2 = "";
            for (var i = 0, len = str.length; i < len; i++) {
                str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i)
            }
            return _.trim(str2)
        }
        function friendlyAttrValue(str) {
            str = unescapeQuote(str);
            str = escapeHtmlEntities(str);
            str = escapeDangerHtml5Entities(str);
            str = clearNonPrintableCharacter(str);
            return str
        }
        function escapeAttrValue(str) {
            str = escapeQuote(str);
            str = escapeHtml(str);
            return str
        }
        function onIgnoreTagStripAll() {
            return ""
        }
        function StripTagBody(tags, next) {
            if (typeof next !== "function") {
                next = function() {}
            }
            var isRemoveAllTag = !Array.isArray(tags);
            function isRemoveTag(tag) {
                if (isRemoveAllTag)
                    return true;
                return _.indexOf(tags, tag) !== -1
            }
            var removeList = [];
            var posStart = false;
            return {
                onIgnoreTag: function(tag, html, options) {
                    if (isRemoveTag(tag)) {
                        if (options.isClosing) {
                            var ret = "[/removed]";
                            var end = options.position + ret.length;
                            removeList.push([posStart !== false ? posStart : options.position, end]);
                            posStart = false;
                            return ret
                        } else {
                            if (!posStart) {
                                posStart = options.position
                            }
                            return "[removed]"
                        }
                    } else {
                        return next(tag, html, options)
                    }
                },
                remove: function(html) {
                    var rethtml = "";
                    var lastPos = 0;
                    _.forEach(removeList, function(pos) {
                        rethtml += html.slice(lastPos, pos[0]);
                        lastPos = pos[1]
                    });
                    rethtml += html.slice(lastPos);
                    return rethtml
                }
            }
        }
        function stripCommentTag(html) {
            return html.replace(STRIP_COMMENT_TAG_REGEXP, "")
        }
        var STRIP_COMMENT_TAG_REGEXP = /<!--[\s\S]*?-->/g;
        function stripBlankChar(html) {
            var chars = html.split("");
            chars = chars.filter(function(char) {
                var c = char.charCodeAt(0);
                if (c === 127)
                    return false;
                if (c <= 31) {
                    if (c === 10 || c === 13)
                        return true;
                    return false
                }
                return true
            });
            return chars.join("")
        }
        exports.whiteList = getDefaultWhiteList();
        exports.getDefaultWhiteList = getDefaultWhiteList;
        exports.onTag = onTag;
        exports.onIgnoreTag = onIgnoreTag;
        exports.onTagAttr = onTagAttr;
        exports.onIgnoreTagAttr = onIgnoreTagAttr;
        exports.safeAttrValue = safeAttrValue;
        exports.escapeHtml = escapeHtml;
        exports.escapeQuote = escapeQuote;
        exports.unescapeQuote = unescapeQuote;
        exports.escapeHtmlEntities = escapeHtmlEntities;
        exports.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
        exports.clearNonPrintableCharacter = clearNonPrintableCharacter;
        exports.friendlyAttrValue = friendlyAttrValue;
        exports.escapeAttrValue = escapeAttrValue;
        exports.onIgnoreTagStripAll = onIgnoreTagStripAll;
        exports.StripTagBody = StripTagBody;
        exports.stripCommentTag = stripCommentTag;
        exports.stripBlankChar = stripBlankChar;
        exports.cssFilter = defaultCSSFilter;
        exports.getDefaultCSSWhiteList = getDefaultCSSWhiteList
    }, {
        "./util": 4,
        cssfilter: 8
    }],
    2: [function(require, module, exports) {
        var DEFAULT = require("./default");
        var parser = require("./parser");
        var FilterXSS = require("./xss");
        function filterXSS(html, options) {
            var xss = new FilterXSS(options);
            return xss.process(html)
        }
        exports = module.exports = filterXSS;
        exports.filterXSS = filterXSS;
        exports.FilterXSS = FilterXSS;
        for (var i in DEFAULT)
            exports[i] = DEFAULT[i];
        for (var i in parser)
            exports[i] = parser[i];
        if (typeof window !== "undefined") {
            window.filterXSS = module.exports
        }
        function isWorkerEnv() {
            return typeof self !== "undefined" && typeof DedicatedWorkerGlobalScope !== "undefined" && self instanceof DedicatedWorkerGlobalScope
        }
        if (isWorkerEnv()) {
            self.filterXSS = module.exports
        }
    }, {
        "./default": 1,
        "./parser": 3,
        "./xss": 5
    }],
    3: [function(require, module, exports) {
        var _ = require("./util");
        function getTagName(html) {
            var i = _.spaceIndex(html);
            if (i === -1) {
                var tagName = html.slice(1, -1)
            } else {
                var tagName = html.slice(1, i + 1)
            }
            tagName = _.trim(tagName).toLowerCase();
            if (tagName.slice(0, 1) === "/")
                tagName = tagName.slice(1);
            if (tagName.slice(-1) === "/")
                tagName = tagName.slice(0, -1);
            return tagName
        }
        function isClosing(html) {
            return html.slice(0, 2) === "</"
        }
        function parseTag(html, onTag, escapeHtml) {
            "user strict";
            var rethtml = "";
            var lastPos = 0;
            var tagStart = false;
            var quoteStart = false;
            var currentPos = 0;
            var len = html.length;
            var currentTagName = "";
            var currentHtml = "";
            for (currentPos = 0; currentPos < len; currentPos++) {
                var c = html.charAt(currentPos);
                if (tagStart === false) {
                    if (c === "<") {
                        tagStart = currentPos;
                        continue
                    }
                } else {
                    if (quoteStart === false) {
                        if (c === "<") {
                            rethtml += escapeHtml(html.slice(lastPos, currentPos));
                            tagStart = currentPos;
                            lastPos = currentPos;
                            continue
                        }
                        if (c === ">") {
                            rethtml += escapeHtml(html.slice(lastPos, tagStart));
                            currentHtml = html.slice(tagStart, currentPos + 1);
                            currentTagName = getTagName(currentHtml);
                            rethtml += onTag(tagStart, rethtml.length, currentTagName, currentHtml, isClosing(currentHtml));
                            lastPos = currentPos + 1;
                            tagStart = false;
                            continue
                        }
                        if ((c === '"' || c === "'") && html.charAt(currentPos - 1) === "=") {
                            quoteStart = c;
                            continue
                        }
                    } else {
                        if (c === quoteStart) {
                            quoteStart = false;
                            continue
                        }
                    }
                }
            }
            if (lastPos < html.length) {
                rethtml += escapeHtml(html.substr(lastPos))
            }
            return rethtml
        }
        var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/gim;
        function parseAttr(html, onAttr) {
            "user strict";
            var lastPos = 0;
            var retAttrs = [];
            var tmpName = false;
            var len = html.length;
            function addAttr(name, value) {
                name = _.trim(name);
                name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
                if (name.length < 1)
                    return;
                var ret = onAttr(name, value || "");
                if (ret)
                    retAttrs.push(ret)
            }
            for (var i = 0; i < len; i++) {
                var c = html.charAt(i);
                var v,
                    j;
                if (tmpName === false && c === "=") {
                    tmpName = html.slice(lastPos, i);
                    lastPos = i + 1;
                    continue
                }
                if (tmpName !== false) {
                    if (i === lastPos && (c === '"' || c === "'") && html.charAt(i - 1) === "=") {
                        j = html.indexOf(c, i + 1);
                        if (j === -1) {
                            break
                        } else {
                            v = _.trim(html.slice(lastPos + 1, j));
                            addAttr(tmpName, v);
                            tmpName = false;
                            i = j;
                            lastPos = i + 1;
                            continue
                        }
                    }
                }
                if (/\s|\n|\t/.test(c)) {
                    html = html.replace(/\s|\n|\t/g, " ");
                    if (tmpName === false) {
                        j = findNextEqual(html, i);
                        if (j === -1) {
                            v = _.trim(html.slice(lastPos, i));
                            addAttr(v);
                            tmpName = false;
                            lastPos = i + 1;
                            continue
                        } else {
                            i = j - 1;
                            continue
                        }
                    } else {
                        j = findBeforeEqual(html, i - 1);
                        if (j === -1) {
                            v = _.trim(html.slice(lastPos, i));
                            v = stripQuoteWrap(v);
                            addAttr(tmpName, v);
                            tmpName = false;
                            lastPos = i + 1;
                            continue
                        } else {
                            continue
                        }
                    }
                }
            }
            if (lastPos < html.length) {
                if (tmpName === false) {
                    addAttr(html.slice(lastPos))
                } else {
                    addAttr(tmpName, stripQuoteWrap(_.trim(html.slice(lastPos))))
                }
            }
            return _.trim(retAttrs.join(" "))
        }
        function findNextEqual(str, i) {
            for (; i < str.length; i++) {
                var c = str[i];
                if (c === " ")
                    continue;
                if (c === "=")
                    return i;
                return -1
            }
        }
        function findBeforeEqual(str, i) {
            for (; i > 0; i--) {
                var c = str[i];
                if (c === " ")
                    continue;
                if (c === "=")
                    return i;
                return -1
            }
        }
        function isQuoteWrapString(text) {
            if (text[0] === '"' && text[text.length - 1] === '"' || text[0] === "'" && text[text.length - 1] === "'") {
                return true
            } else {
                return false
            }
        }
        function stripQuoteWrap(text) {
            if (isQuoteWrapString(text)) {
                return text.substr(1, text.length - 2)
            } else {
                return text
            }
        }
        exports.parseTag = parseTag;
        exports.parseAttr = parseAttr
    }, {
        "./util": 4
    }],
    4: [function(require, module, exports) {
        module.exports = {
            indexOf: function(arr, item) {
                var i,
                    j;
                if (Array.prototype.indexOf) {
                    return arr.indexOf(item)
                }
                for (i = 0, j = arr.length; i < j; i++) {
                    if (arr[i] === item) {
                        return i
                    }
                }
                return -1
            },
            forEach: function(arr, fn, scope) {
                var i,
                    j;
                if (Array.prototype.forEach) {
                    return arr.forEach(fn, scope)
                }
                for (i = 0, j = arr.length; i < j; i++) {
                    fn.call(scope, arr[i], i, arr)
                }
            },
            trim: function(str) {
                if (String.prototype.trim) {
                    return str.trim()
                }
                return str.replace(/(^\s*)|(\s*$)/g, "")
            },
            spaceIndex: function(str) {
                var reg = /\s|\n|\t/;
                var match = reg.exec(str);
                return match ? match.index : -1
            }
        }
    }, {}],
    5: [function(require, module, exports) {
        var FilterCSS = require("cssfilter").FilterCSS;
        var DEFAULT = require("./default");
        var parser = require("./parser");
        var parseTag = parser.parseTag;
        var parseAttr = parser.parseAttr;
        var _ = require("./util");
        function isNull(obj) {
            return obj === undefined || obj === null
        }
        function getAttrs(html) {
            var i = _.spaceIndex(html);
            if (i === -1) {
                return {
                    html: "",
                    closing: html[html.length - 2] === "/"
                }
            }
            html = _.trim(html.slice(i + 1, -1));
            var isClosing = html[html.length - 1] === "/";
            if (isClosing)
                html = _.trim(html.slice(0, -1));
            return {
                html: html,
                closing: isClosing
            }
        }
        function shallowCopyObject(obj) {
            var ret = {};
            for (var i in obj) {
                ret[i] = obj[i]
            }
            return ret
        }
        function FilterXSS(options) {
            options = shallowCopyObject(options || {});
            if (options.stripIgnoreTag) {
                if (options.onIgnoreTag) {
                    console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time')
                }
                options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll
            }
            options.whiteList = options.whiteList || DEFAULT.whiteList;
            options.onTag = options.onTag || DEFAULT.onTag;
            options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
            options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
            options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
            options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
            options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
            this.options = options;
            if (options.css === false) {
                this.cssFilter = false
            } else {
                options.css = options.css || {};
                this.cssFilter = new FilterCSS(options.css)
            }
        }
        FilterXSS.prototype.process = function(html) {
            html = html || "";
            html = html.toString();
            if (!html)
                return "";
            var me = this;
            var options = me.options;
            var whiteList = options.whiteList;
            var onTag = options.onTag;
            var onIgnoreTag = options.onIgnoreTag;
            var onTagAttr = options.onTagAttr;
            var onIgnoreTagAttr = options.onIgnoreTagAttr;
            var safeAttrValue = options.safeAttrValue;
            var escapeHtml = options.escapeHtml;
            var cssFilter = me.cssFilter;
            if (options.stripBlankChar) {
                html = DEFAULT.stripBlankChar(html)
            }
            if (!options.allowCommentTag) {
                html = DEFAULT.stripCommentTag(html)
            }
            var stripIgnoreTagBody = false;
            if (options.stripIgnoreTagBody) {
                var stripIgnoreTagBody = DEFAULT.StripTagBody(options.stripIgnoreTagBody, onIgnoreTag);
                onIgnoreTag = stripIgnoreTagBody.onIgnoreTag
            }
            var retHtml = parseTag(html, function(sourcePosition, position, tag, html, isClosing) {
                var info = {
                    sourcePosition: sourcePosition,
                    position: position,
                    isClosing: isClosing,
                    isWhite: whiteList.hasOwnProperty(tag)
                };
                var ret = onTag(tag, html, info);
                if (!isNull(ret))
                    return ret;
                if (info.isWhite) {
                    if (info.isClosing) {
                        return "</" + tag + ">"
                    }
                    var attrs = getAttrs(html);
                    var whiteAttrList = whiteList[tag];
                    var attrsHtml = parseAttr(attrs.html, function(name, value) {
                        var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
                        var ret = onTagAttr(tag, name, value, isWhiteAttr);
                        if (!isNull(ret))
                            return ret;
                        if (isWhiteAttr) {
                            value = safeAttrValue(tag, name, value, cssFilter);
                            if (value) {
                                return name + '="' + value + '"'
                            } else {
                                return name
                            }
                        } else {
                            var ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
                            if (!isNull(ret))
                                return ret;
                            return
                        }
                    });
                    var html = "<" + tag;
                    if (attrsHtml)
                        html += " " + attrsHtml;
                    if (attrs.closing)
                        html += " /";
                    html += ">";
                    return html
                } else {
                    var ret = onIgnoreTag(tag, html, info);
                    if (!isNull(ret))
                        return ret;
                    return escapeHtml(html)
                }
            }, escapeHtml);
            if (stripIgnoreTagBody) {
                retHtml = stripIgnoreTagBody.remove(retHtml)
            }
            return retHtml
        };
        module.exports = FilterXSS
    }, {
        "./default": 1,
        "./parser": 3,
        "./util": 4,
        cssfilter: 8
    }],
    6: [function(require, module, exports) {
        var DEFAULT = require("./default");
        var parseStyle = require("./parser");
        var _ = require("./util");
        function isNull(obj) {
            return obj === undefined || obj === null
        }
        function shallowCopyObject(obj) {
            var ret = {};
            for (var i in obj) {
                ret[i] = obj[i]
            }
            return ret
        }
        function FilterCSS(options) {
            options = shallowCopyObject(options || {});
            options.whiteList = options.whiteList || DEFAULT.whiteList;
            options.onAttr = options.onAttr || DEFAULT.onAttr;
            options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT.onIgnoreAttr;
            options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
            this.options = options
        }
        FilterCSS.prototype.process = function(css) {
            css = css || "";
            css = css.toString();
            if (!css)
                return "";
            var me = this;
            var options = me.options;
            var whiteList = options.whiteList;
            var onAttr = options.onAttr;
            var onIgnoreAttr = options.onIgnoreAttr;
            var safeAttrValue = options.safeAttrValue;
            var retCSS = parseStyle(css, function(sourcePosition, position, name, value, source) {
                var check = whiteList[name];
                var isWhite = false;
                if (check === true)
                    isWhite = check;
                else if (typeof check === "function")
                    isWhite = check(value);
                else if (check instanceof RegExp)
                    isWhite = check.test(value);
                if (isWhite !== true)
                    isWhite = false;
                value = safeAttrValue(name, value);
                if (!value)
                    return;
                var opts = {
                    position: position,
                    sourcePosition: sourcePosition,
                    source: source,
                    isWhite: isWhite
                };
                if (isWhite) {
                    var ret = onAttr(name, value, opts);
                    if (isNull(ret)) {
                        return name + ":" + value
                    } else {
                        return ret
                    }
                } else {
                    var ret = onIgnoreAttr(name, value, opts);
                    if (!isNull(ret)) {
                        return ret
                    }
                }
            });
            return retCSS
        };
        module.exports = FilterCSS
    }, {
        "./default": 7,
        "./parser": 9,
        "./util": 10
    }],
    7: [function(require, module, exports) {
        function getDefaultWhiteList() {
            var whiteList = {};
            whiteList["align-content"] = false;
            whiteList["align-items"] = false;
            whiteList["align-self"] = false;
            whiteList["alignment-adjust"] = false;
            whiteList["alignment-baseline"] = false;
            whiteList["all"] = false;
            whiteList["anchor-point"] = false;
            whiteList["animation"] = false;
            whiteList["animation-delay"] = false;
            whiteList["animation-direction"] = false;
            whiteList["animation-duration"] = false;
            whiteList["animation-fill-mode"] = false;
            whiteList["animation-iteration-count"] = false;
            whiteList["animation-name"] = false;
            whiteList["animation-play-state"] = false;
            whiteList["animation-timing-function"] = false;
            whiteList["azimuth"] = false;
            whiteList["backface-visibility"] = false;
            whiteList["background"] = true;
            whiteList["background-attachment"] = true;
            whiteList["background-clip"] = true;
            whiteList["background-color"] = true;
            whiteList["background-image"] = true;
            whiteList["background-origin"] = true;
            whiteList["background-position"] = true;
            whiteList["background-repeat"] = true;
            whiteList["background-size"] = true;
            whiteList["baseline-shift"] = false;
            whiteList["binding"] = false;
            whiteList["bleed"] = false;
            whiteList["bookmark-label"] = false;
            whiteList["bookmark-level"] = false;
            whiteList["bookmark-state"] = false;
            whiteList["border"] = true;
            whiteList["border-bottom"] = true;
            whiteList["border-bottom-color"] = true;
            whiteList["border-bottom-left-radius"] = true;
            whiteList["border-bottom-right-radius"] = true;
            whiteList["border-bottom-style"] = true;
            whiteList["border-bottom-width"] = true;
            whiteList["border-collapse"] = true;
            whiteList["border-color"] = true;
            whiteList["border-image"] = true;
            whiteList["border-image-outset"] = true;
            whiteList["border-image-repeat"] = true;
            whiteList["border-image-slice"] = true;
            whiteList["border-image-source"] = true;
            whiteList["border-image-width"] = true;
            whiteList["border-left"] = true;
            whiteList["border-left-color"] = true;
            whiteList["border-left-style"] = true;
            whiteList["border-left-width"] = true;
            whiteList["border-radius"] = true;
            whiteList["border-right"] = true;
            whiteList["border-right-color"] = true;
            whiteList["border-right-style"] = true;
            whiteList["border-right-width"] = true;
            whiteList["border-spacing"] = true;
            whiteList["border-style"] = true;
            whiteList["border-top"] = true;
            whiteList["border-top-color"] = true;
            whiteList["border-top-left-radius"] = true;
            whiteList["border-top-right-radius"] = true;
            whiteList["border-top-style"] = true;
            whiteList["border-top-width"] = true;
            whiteList["border-width"] = true;
            whiteList["bottom"] = false;
            whiteList["box-decoration-break"] = true;
            whiteList["box-shadow"] = true;
            whiteList["box-sizing"] = true;
            whiteList["box-snap"] = true;
            whiteList["box-suppress"] = true;
            whiteList["break-after"] = true;
            whiteList["break-before"] = true;
            whiteList["break-inside"] = true;
            whiteList["caption-side"] = false;
            whiteList["chains"] = false;
            whiteList["clear"] = true;
            whiteList["clip"] = false;
            whiteList["clip-path"] = false;
            whiteList["clip-rule"] = false;
            whiteList["color"] = true;
            whiteList["color-interpolation-filters"] = true;
            whiteList["column-count"] = false;
            whiteList["column-fill"] = false;
            whiteList["column-gap"] = false;
            whiteList["column-rule"] = false;
            whiteList["column-rule-color"] = false;
            whiteList["column-rule-style"] = false;
            whiteList["column-rule-width"] = false;
            whiteList["column-span"] = false;
            whiteList["column-width"] = false;
            whiteList["columns"] = false;
            whiteList["contain"] = false;
            whiteList["content"] = false;
            whiteList["counter-increment"] = false;
            whiteList["counter-reset"] = false;
            whiteList["counter-set"] = false;
            whiteList["crop"] = false;
            whiteList["cue"] = false;
            whiteList["cue-after"] = false;
            whiteList["cue-before"] = false;
            whiteList["cursor"] = false;
            whiteList["direction"] = false;
            whiteList["display"] = true;
            whiteList["display-inside"] = true;
            whiteList["display-list"] = true;
            whiteList["display-outside"] = true;
            whiteList["dominant-baseline"] = false;
            whiteList["elevation"] = false;
            whiteList["empty-cells"] = false;
            whiteList["filter"] = false;
            whiteList["flex"] = false;
            whiteList["flex-basis"] = false;
            whiteList["flex-direction"] = false;
            whiteList["flex-flow"] = false;
            whiteList["flex-grow"] = false;
            whiteList["flex-shrink"] = false;
            whiteList["flex-wrap"] = false;
            whiteList["float"] = false;
            whiteList["float-offset"] = false;
            whiteList["flood-color"] = false;
            whiteList["flood-opacity"] = false;
            whiteList["flow-from"] = false;
            whiteList["flow-into"] = false;
            whiteList["font"] = true;
            whiteList["font-family"] = true;
            whiteList["font-feature-settings"] = true;
            whiteList["font-kerning"] = true;
            whiteList["font-language-override"] = true;
            whiteList["font-size"] = true;
            whiteList["font-size-adjust"] = true;
            whiteList["font-stretch"] = true;
            whiteList["font-style"] = true;
            whiteList["font-synthesis"] = true;
            whiteList["font-variant"] = true;
            whiteList["font-variant-alternates"] = true;
            whiteList["font-variant-caps"] = true;
            whiteList["font-variant-east-asian"] = true;
            whiteList["font-variant-ligatures"] = true;
            whiteList["font-variant-numeric"] = true;
            whiteList["font-variant-position"] = true;
            whiteList["font-weight"] = true;
            whiteList["grid"] = false;
            whiteList["grid-area"] = false;
            whiteList["grid-auto-columns"] = false;
            whiteList["grid-auto-flow"] = false;
            whiteList["grid-auto-rows"] = false;
            whiteList["grid-column"] = false;
            whiteList["grid-column-end"] = false;
            whiteList["grid-column-start"] = false;
            whiteList["grid-row"] = false;
            whiteList["grid-row-end"] = false;
            whiteList["grid-row-start"] = false;
            whiteList["grid-template"] = false;
            whiteList["grid-template-areas"] = false;
            whiteList["grid-template-columns"] = false;
            whiteList["grid-template-rows"] = false;
            whiteList["hanging-punctuation"] = false;
            whiteList["height"] = true;
            whiteList["hyphens"] = false;
            whiteList["icon"] = false;
            whiteList["image-orientation"] = false;
            whiteList["image-resolution"] = false;
            whiteList["ime-mode"] = false;
            whiteList["initial-letters"] = false;
            whiteList["inline-box-align"] = false;
            whiteList["justify-content"] = false;
            whiteList["justify-items"] = false;
            whiteList["justify-self"] = false;
            whiteList["left"] = false;
            whiteList["letter-spacing"] = true;
            whiteList["lighting-color"] = true;
            whiteList["line-box-contain"] = false;
            whiteList["line-break"] = false;
            whiteList["line-grid"] = false;
            whiteList["line-height"] = false;
            whiteList["line-snap"] = false;
            whiteList["line-stacking"] = false;
            whiteList["line-stacking-ruby"] = false;
            whiteList["line-stacking-shift"] = false;
            whiteList["line-stacking-strategy"] = false;
            whiteList["list-style"] = true;
            whiteList["list-style-image"] = true;
            whiteList["list-style-position"] = true;
            whiteList["list-style-type"] = true;
            whiteList["margin"] = true;
            whiteList["margin-bottom"] = true;
            whiteList["margin-left"] = true;
            whiteList["margin-right"] = true;
            whiteList["margin-top"] = true;
            whiteList["marker-offset"] = false;
            whiteList["marker-side"] = false;
            whiteList["marks"] = false;
            whiteList["mask"] = false;
            whiteList["mask-box"] = false;
            whiteList["mask-box-outset"] = false;
            whiteList["mask-box-repeat"] = false;
            whiteList["mask-box-slice"] = false;
            whiteList["mask-box-source"] = false;
            whiteList["mask-box-width"] = false;
            whiteList["mask-clip"] = false;
            whiteList["mask-image"] = false;
            whiteList["mask-origin"] = false;
            whiteList["mask-position"] = false;
            whiteList["mask-repeat"] = false;
            whiteList["mask-size"] = false;
            whiteList["mask-source-type"] = false;
            whiteList["mask-type"] = false;
            whiteList["max-height"] = true;
            whiteList["max-lines"] = false;
            whiteList["max-width"] = true;
            whiteList["min-height"] = true;
            whiteList["min-width"] = true;
            whiteList["move-to"] = false;
            whiteList["nav-down"] = false;
            whiteList["nav-index"] = false;
            whiteList["nav-left"] = false;
            whiteList["nav-right"] = false;
            whiteList["nav-up"] = false;
            whiteList["object-fit"] = false;
            whiteList["object-position"] = false;
            whiteList["opacity"] = false;
            whiteList["order"] = false;
            whiteList["orphans"] = false;
            whiteList["outline"] = false;
            whiteList["outline-color"] = false;
            whiteList["outline-offset"] = false;
            whiteList["outline-style"] = false;
            whiteList["outline-width"] = false;
            whiteList["overflow"] = false;
            whiteList["overflow-wrap"] = false;
            whiteList["overflow-x"] = false;
            whiteList["overflow-y"] = false;
            whiteList["padding"] = true;
            whiteList["padding-bottom"] = true;
            whiteList["padding-left"] = true;
            whiteList["padding-right"] = true;
            whiteList["padding-top"] = true;
            whiteList["page"] = false;
            whiteList["page-break-after"] = false;
            whiteList["page-break-before"] = false;
            whiteList["page-break-inside"] = false;
            whiteList["page-policy"] = false;
            whiteList["pause"] = false;
            whiteList["pause-after"] = false;
            whiteList["pause-before"] = false;
            whiteList["perspective"] = false;
            whiteList["perspective-origin"] = false;
            whiteList["pitch"] = false;
            whiteList["pitch-range"] = false;
            whiteList["play-during"] = false;
            whiteList["position"] = false;
            whiteList["presentation-level"] = false;
            whiteList["quotes"] = false;
            whiteList["region-fragment"] = false;
            whiteList["resize"] = false;
            whiteList["rest"] = false;
            whiteList["rest-after"] = false;
            whiteList["rest-before"] = false;
            whiteList["richness"] = false;
            whiteList["right"] = false;
            whiteList["rotation"] = false;
            whiteList["rotation-point"] = false;
            whiteList["ruby-align"] = false;
            whiteList["ruby-merge"] = false;
            whiteList["ruby-position"] = false;
            whiteList["shape-image-threshold"] = false;
            whiteList["shape-outside"] = false;
            whiteList["shape-margin"] = false;
            whiteList["size"] = false;
            whiteList["speak"] = false;
            whiteList["speak-as"] = false;
            whiteList["speak-header"] = false;
            whiteList["speak-numeral"] = false;
            whiteList["speak-punctuation"] = false;
            whiteList["speech-rate"] = false;
            whiteList["stress"] = false;
            whiteList["string-set"] = false;
            whiteList["tab-size"] = false;
            whiteList["table-layout"] = false;
            whiteList["text-align"] = true;
            whiteList["text-align-last"] = true;
            whiteList["text-combine-upright"] = true;
            whiteList["text-decoration"] = true;
            whiteList["text-decoration-color"] = true;
            whiteList["text-decoration-line"] = true;
            whiteList["text-decoration-skip"] = true;
            whiteList["text-decoration-style"] = true;
            whiteList["text-emphasis"] = true;
            whiteList["text-emphasis-color"] = true;
            whiteList["text-emphasis-position"] = true;
            whiteList["text-emphasis-style"] = true;
            whiteList["text-height"] = true;
            whiteList["text-indent"] = true;
            whiteList["text-justify"] = true;
            whiteList["text-orientation"] = true;
            whiteList["text-overflow"] = true;
            whiteList["text-shadow"] = true;
            whiteList["text-space-collapse"] = true;
            whiteList["text-transform"] = true;
            whiteList["text-underline-position"] = true;
            whiteList["text-wrap"] = true;
            whiteList["top"] = false;
            whiteList["transform"] = false;
            whiteList["transform-origin"] = false;
            whiteList["transform-style"] = false;
            whiteList["transition"] = false;
            whiteList["transition-delay"] = false;
            whiteList["transition-duration"] = false;
            whiteList["transition-property"] = false;
            whiteList["transition-timing-function"] = false;
            whiteList["unicode-bidi"] = false;
            whiteList["vertical-align"] = false;
            whiteList["visibility"] = false;
            whiteList["voice-balance"] = false;
            whiteList["voice-duration"] = false;
            whiteList["voice-family"] = false;
            whiteList["voice-pitch"] = false;
            whiteList["voice-range"] = false;
            whiteList["voice-rate"] = false;
            whiteList["voice-stress"] = false;
            whiteList["voice-volume"] = false;
            whiteList["volume"] = false;
            whiteList["white-space"] = false;
            whiteList["widows"] = false;
            whiteList["width"] = true;
            whiteList["will-change"] = false;
            whiteList["word-break"] = true;
            whiteList["word-spacing"] = true;
            whiteList["word-wrap"] = true;
            whiteList["wrap-flow"] = false;
            whiteList["wrap-through"] = false;
            whiteList["writing-mode"] = false;
            whiteList["z-index"] = false;
            return whiteList
        }
        function onAttr(name, value, options) {}
        function onIgnoreAttr(name, value, options) {}
        var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/gim;
        function safeAttrValue(name, value) {
            if (REGEXP_URL_JAVASCRIPT.test(value))
                return "";
            return value
        }
        exports.whiteList = getDefaultWhiteList();
        exports.getDefaultWhiteList = getDefaultWhiteList;
        exports.onAttr = onAttr;
        exports.onIgnoreAttr = onIgnoreAttr;
        exports.safeAttrValue = safeAttrValue
    }, {}],
    8: [function(require, module, exports) {
        var DEFAULT = require("./default");
        var FilterCSS = require("./css");
        function filterCSS(html, options) {
            var xss = new FilterCSS(options);
            return xss.process(html)
        }
        exports = module.exports = filterCSS;
        exports.FilterCSS = FilterCSS;
        for (var i in DEFAULT)
            exports[i] = DEFAULT[i];
        if (typeof window !== "undefined") {
            window.filterCSS = module.exports
        }
    }, {
        "./css": 6,
        "./default": 7
    }],
    9: [function(require, module, exports) {
        var _ = require("./util");
        function parseStyle(css, onAttr) {
            css = _.trimRight(css);
            if (css[css.length - 1] !== ";")
                css += ";";
            var cssLength = css.length;
            var isParenthesisOpen = false;
            var lastPos = 0;
            var i = 0;
            var retCSS = "";
            function addNewAttr() {
                if (!isParenthesisOpen) {
                    var source = _.trim(css.slice(lastPos, i));
                    var j = source.indexOf(":");
                    if (j !== -1) {
                        var name = _.trim(source.slice(0, j));
                        var value = _.trim(source.slice(j + 1));
                        if (name) {
                            var ret = onAttr(lastPos, retCSS.length, name, value, source);
                            if (ret)
                                retCSS += ret + "; "
                        }
                    }
                }
                lastPos = i + 1
            }
            for (; i < cssLength; i++) {
                var c = css[i];
                if (c === "/" && css[i + 1] === "*") {
                    var j = css.indexOf("*/", i + 2);
                    if (j === -1)
                        break;
                    i = j + 1;
                    lastPos = i + 1;
                    isParenthesisOpen = false
                } else if (c === "(") {
                    isParenthesisOpen = true
                } else if (c === ")") {
                    isParenthesisOpen = false
                } else if (c === ";") {
                    if (isParenthesisOpen) {} else {
                        addNewAttr()
                    }
                } else if (c === "\n") {
                    addNewAttr()
                }
            }
            return _.trim(retCSS)
        }
        module.exports = parseStyle
    }, {
        "./util": 10
    }],
    10: [function(require, module, exports) {
        module.exports = {
            indexOf: function(arr, item) {
                var i,
                    j;
                if (Array.prototype.indexOf) {
                    return arr.indexOf(item)
                }
                for (i = 0, j = arr.length; i < j; i++) {
                    if (arr[i] === item) {
                        return i
                    }
                }
                return -1
            },
            forEach: function(arr, fn, scope) {
                var i,
                    j;
                if (Array.prototype.forEach) {
                    return arr.forEach(fn, scope)
                }
                for (i = 0, j = arr.length; i < j; i++) {
                    fn.call(scope, arr[i], i, arr)
                }
            },
            trim: function(str) {
                if (String.prototype.trim) {
                    return str.trim()
                }
                return str.replace(/(^\s*)|(\s*$)/g, "")
            },
            trimRight: function(str) {
                if (String.prototype.trimRight) {
                    return str.trimRight()
                }
                return str.replace(/(\s*$)/g, "")
            }
        }
    }, {}]
}, {}, [2]);
(function() {
    var f = function() {};
    if (!window.console) {
        window.console = {
            log: f,
            info: f,
            warn: f,
            debug: f,
            error: f
        }
    }
})();
(function() {
    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent
})();
Array.prototype.clean = function(deleteValue) {
    var i = this.length;
    while (i--)
        !/\S/.test(this[i]) && this.splice(i, 1);
    return this
};
String.prototype.toCapital = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
};
function pathJoin(parts, sep) {
    var separator = sep || "/";
    var replace = new RegExp(separator + "{1,}", "g");
    return parts.join(separator).replace(replace, separator)
}
function safeTrackJs() {
    if (window.trackJs) {
        trackJs.track(arguments)
    }
}
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 18; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text
}
window.show_confirmation = function(message) {
    var el = $("#confirmation-top");
    el.text(message);
    el.css("top", "0");
    el.css("background", "green");
    setTimeout(function() {
        el.css("top", "-68px")
    }, 3e3)
};
window.show_error = function(message) {
    if (window.trackJs) {
        trackJs.track(message)
    }
    var el = $("#confirmation-top");
    el.text(message);
    el.css("top", "0");
    el.css("background", "red");
    setTimeout(function() {
        el.css("top", "-68px")
    }, 3e3)
};
if (!("localStorage" in window)) {
    console.log("No local storage, faking it");
    window.localStorage = {
        _data: {},
        setItem: function(id, val) {
            return this._data[id] = String(val)
        },
        getItem: function(id) {
            return this._data.hasOwnProperty(id) ? this._data[id] : undefined
        },
        removeItem: function(id) {
            return delete this._data[id]
        },
        clear: function() {
            return this._data = {}
        }
    }
}
function setCookie(name, value) {
    try {
        localStorage.setItem(name, value)
    } catch (e) {}
}
function getCookie(name) {
    try {
        return localStorage.getItem(name)
    } catch (e) {
        return
    }
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ")
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length)
    }
    return null
}
function eraseCookie(name) {
    try {
        localStorage.removeItem(name)
    } catch (e) {}
}
function getCookieValue(a) {
    var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : ""
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}
var CreateEnvironmentModal = function() {
    var _selectors;
    this.init = function(selectors) {
        $("a.primary-btn").click(function(e) {
            e.preventDefault();
            show("");
            return false
        })
    };
    var show = function(level) {
        $.ajax({
            url: "/create",
            type: "POST",
            data: "level=" + level + "&email=" + (window.app.user || {
                email: "annoymous"
            }).email,
            success: function() {
                window.location = "/editor"
            }
        })
    }
};
var Header = function() {
    this.init = function() {
        try {
            var b = $(".button-collapse");
            if (b.sideNav)
                b.sideNav();
            if (b.sidenav)
                b.sidenav();
            var sidenav = $(".sidenav");
            if (sidenav && sidenav.sidenav)
                sidenav.sidenav();
            if (sidenav && sidenav.sideNav)
                sidenav.sideNav();
            var dpbutton = $(".dropdown-button");
            if (dpbutton && dpbutton.dropdown) {
                dpbutton.dropdown({
                    inDuration: 500,
                    outDuration: 500,
                    hover: false,
                    belowOrigin: true,
                    alignment: "right"
                })
            }
            $(".tooltipped").tooltip()
        } catch (e) {
            console.log("Error", e)
        }
    }
};
var App = function() {
    var that = this;
    this.init = function() {
        var s = $("select");
        if (s.material_select)
            s.material_select();
        header = new Header;
        header.init();
        if (window.on_application_load) {
            window.on_application_load(this)
        }
        if (window.on_page_load) {
            window.on_page_load(this)
        }
        $(".localtime").text(function(v, date) {
            return moment(date).local().calendar()
        });
        var share = new ConfigureShareButtons;
        share.init();
        $(".tooltipped").tooltip({
            html: true
        })
    };
    this.loadjs = function(filename, onload) {
        var currentlyLoaded = $("head script[src='" + filename + "'").length;
        if (currentlyLoaded > 0) {
            return
        }
        var fileref = document.createElement("script");
        if (onload) {
            fileref.addEventListener("load", onload, false)
        }
        document.head.appendChild(fileref);
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename)
    };
    this.set_user = function(user) {
        that.user = user
    };
    this.open_registration_modal = function() {
        var modal = $("#registration-modal");
        modal.modal({
            dismissible: false,
            opacity: .8,
            top: "5%"
        }).modal("open");
        $("input[name='redirect']").val(window.location.pathname);
        var redirect = encodeURIComponent(window.location.pathname);
        $(".social.github").attr("href", "/auth/github?redirect=" + redirect);
        $(".social.linkedin").attr("href", "/auth/linkedin?redirect=" + redirect);
        $(".social.twitter").attr("href", "/auth/twitter?redirect=" + redirect);
        $(".social.google").attr("href", "/auth/google?redirect=" + redirect)
    };
    this.open_payment_modal = function() {
        var e = $("#registration-modal");
        e.modal({
            dismissible: false,
            opacity: .8,
            top: "5%"
        }).modal("open");
        e.find("#signup").addClass("hidden");
        e.find("#payment").removeClass("hidden");
        mixpanel.track("shown-payment-dialog", {
            distinct_id: app.user.email,
            _Username: app.user.username
        })
    };
    this.open_restricted_modal = function() {
        var e = $("#restricted-modal");
        e.modal({
            dismissible: false,
            opacity: .8,
            top: "5%"
        }).modal("open")
    };
    this.fireResize = function() {
        setTimeout(function() {
            if (document.createEvent) {
                var ev = document.createEvent("Event");
                ev.initEvent("resize", true, true);
                window.dispatchEvent(ev)
            } else {
                element = document.documentElement;
                var event = document.createEventObject();
                element.fireEvent("onresize", event)
            }
        }, 1)
    }
};
var CourseApplication = function() {
    var that = this;
    var isDirty = false;
    var UPDATE_EDITOR_TEXT = "update-editor-text-event";
    var trackingParameters = "";
    if (window.embedded) {
        trackingParameters += "?embedded=true&host=" + window.host
    }
    if (window.session) {
        if (trackingParameters === "") {
            trackingParameters += "?session=" + window.session
        } else {
            trackingParameters += "&session=" + window.session
        }
    }
    this.init = function(app, pathway, course) {
        if (app === undefined) {
            console.error("App Not Provided")
        }
        if (pathway === undefined) {
            console.error("Pathway Not Provided")
        }
        if (course === undefined) {
            console.error("Course Not Provided")
        }
        this.pathway = pathway;
        this.course = course;
        this.app = app;
        if (app.user === undefined && (course.authenticated === false || window.location.pathname.indexOf("/training/") >= 0)) {
            app.user = {}
        }
        if (app.user === undefined) {
            mixpanel.track("course-unregistered-view", {
                _Course: that.course["pathwayId"],
                _CourseId: that.course.id
            });
            app.open_registration_modal();
            return
        } else {
            if (window.embedded)
                mixpanel.track("embed-start", {
                    _Username: that.app.user.username,
                    _Host: window.host,
                    _Environment: window.image
                });
            else
                mixpanel.track("course-start", {
                    _Username: that.app.user.username,
                    _Course: that.course["pathwayId"],
                    _CourseId: that.course.id
                });
            hook_up_events();
            removeLastLineEndingFromCodeBlocks();
            send_message_to_parent("start", that.course.id)
        }
        if (hljs && hljs.initHighlightingOnLoad) {
            $("#tutorial pre.file").each(function(i, block) {
                hljs.highlightBlock(block)
            })
        }
        $("img").error(function() {
            var imgsrc = $(this).attr("src");
            console.log("Unable to load image", imgsrc);
            if (trackJs)
                trackJs.track("[WARN] Image Error", imgsrc)
        })
    };
    var processQuiz = function() {
        var currentStep = $('div[class^="step"]:not(.hidden)');
        var quiz = currentStep.find(".quiz");
        var form = $(quiz).find("form input");
        var check = currentStep.find("button.primary-btn");
        var solution = currentStep.find("button.answer");
        solution.text("Show Answers");
        check.text("Check Answers");
        var passed = true;
        form.each(function(i2, element) {
            var e2 = $(element);
            var elementLabel = $('label[for="' + e2.attr("id") + '"]');
            var elementAndLabel = elementLabel.add(e2);
            if (e2.attr("type") === "radio" && e2.attr("data-answer") === "correct") {
                passed = e2.is(":checked") === false ? false : true;
                markCorrectOrIncorrect(elementAndLabel, passed)
            } else if (e2.attr("type") === "checkbox" && e2.attr("data-answer") === "correct") {
                passed = e2.is(":checked") === false ? false : true;
                markCorrectOrIncorrect(elementAndLabel, passed)
            } else if (e2.attr("type") === "text" && e2.attr("data-answer") === "match") {
                passed = e2.attr("data-value").toLowerCase().trim() !== e2.val().toLowerCase().trim() ? false : true;
                markCorrectOrIncorrect(elementAndLabel, passed)
            } else if (e2.attr("type") === "text" && e2.attr("data-answer") === "contains") {
                passed = e2.val().toLowerCase().trim().indexOf(e2.attr("data-value").toLowerCase().trim()) === -1 ? false : true;
                markCorrectOrIncorrect(elementAndLabel, passed)
            }
        });
        if (!passed) {
            check.attr("data-tooltip", "Please answer all questions correctly");
            check.addClass("tooltipped").tooltip().trigger("mouseenter");
            setTimeout(function() {
                check.removeClass("tooltipped").off("mouseenter")
            }, 500)
        } else {
            check.attr("data-tooltip", "Congratulations! Everything is correct...");
            check.addClass("tooltipped").tooltip().trigger("mouseenter");
            check.addClass("passed");
            setTimeout(function() {
                check.removeClass("tooltipped").off("mouseenter")
            }, 500);
            check.text("Continue");
            window.course.go_to_next_step()
        }
        return false
    };
    String.prototype.trimEnd = function(c) {
        if (this.length == 0)
            return this;
        c = c ? c : " ";
        var i = this.length - 1;
        for (; i >= 0 && this.charAt(i) == c; i--)
            ;
        return this.substring(0, i + 1)
    };
    var removeLastLineEndingFromCodeBlocks = function() {
        var code = $("pre code");
        code.each(function() {
            var c = $(this);
            c.text(c.text().replace(/\n$/, ""))
        })
    };
    var hook_up_events = function() {
        $("#hide-intro").click(hide_intro);
        if ($("#intro").length === 0 || $("#intro").hasClass("hidden")) {
            hide_intro()
        }
        $("#hide-finish").click(hide_finish);
        $("#next-tutorial").click(track_next_tutorial_cta);
        $("#reload").click(function(e) {
            e.preventDefault();
            window.location.reload();
            return false
        });
        $(".step .next, #step-progress i.fa-caret-right").click(check_if_can_process_next_step);
        $("#step-progress i.fa-caret-left").click(go_to_previous_step);
        $("#download-assets").click(download);
        $(".step .btn.answer").click(show_answer);
        var container = $(".embedded-course-container");
        if (container.length === 0)
            container = $(".course-container");
        var links = $(".step a, #intro a, #finished a:not('.btn')", container);
        links.attr("rel", "nofollow");
        links.each(function(i) {
            var ele = $(links[i]);
            var targetLinkAttr = ele.attr("target");
            ele.attr("target", targetLinkAttr || "_blank")
        });
        $(window).on("beforeunload", function() {
            console.log("Before Unload...");
            window.mighthaveclosed = true;
            if (isDirty) {
                return "Leaving now will close your environment and terminal connection"
            }
        });
        $("#hide-sidebar").click(hide_sidebar);
        $("#show-sidebar").click(show_sidebar);
        $("#tutorial .step").on("DOMMouseScroll mousewheel", function(ev) {
            var $this = $(this),
                scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = $this.height(),
                delta = ev.type == "DOMMouseScroll" ? ev.originalEvent.detail * -40 : ev.originalEvent.wheelDelta,
                up = delta > 0;
            var prevent = function() {
                ev.stopPropagation();
                ev.preventDefault();
                ev.returnValue = false;
                return false
            };
            if (!up && -delta > scrollHeight - height - scrollTop - 50) {
                $this.scrollTop(scrollHeight);
                return prevent()
            } else if (up && delta > scrollTop) {
                $this.scrollTop(0);
                return prevent()
            }
        });
        var fileBlocks = $("#tutorial .step pre.file[data-filename]");
        fileBlocks.prepend('<span class="copyTo copyToEditor"><i class="fa fa-clipboard"></i>Copy to Editor</span>');
        $(fileBlocks).on("click", ".copyToEditor", function(e) {
            e.preventDefault();
            var code = $(this).parent();
            var filename = code.attr("data-filename");
            var target = code.attr("data-target") || "append";
            var marker = code.attr("data-marker") || "REPLACE_WITH_EDITOR_CODE";
            var t = code.text().replace(/^Copy to Editor/, "").replace(/^Copied/, "");
            var editorUpdatedEvent = new CustomEvent(UPDATE_EDITOR_TEXT, {
                detail: {
                    filename: filename,
                    target: target,
                    text: t,
                    marker: marker
                }
            });
            console.log("raising Event");
            document.dispatchEvent(editorUpdatedEvent);
            var e = $(this);
            var text = $(this).html();
            e.html('<i class="fa fa-clipboard"></i>Copied');
            setTimeout(function() {
                e.html(text)
            }, 1500);
            var tab = $('.kfiletab[data-path="' + filename + '"]');
            if (tab.length === 0)
                tab = $('.kfiletab[data-filename="' + filename + '"]');
            if (tab.length > 0)
                tab.click()
        });
        var fileCopyBlocks = $("#tutorial .step pre.file[data-target='clipboard']");
        fileCopyBlocks.prepend('<span class="copyTo copyToClipboard"><i class="fa fa-clipboard"></i>Copy to Clipboard</span>');
        var copyFileToClipboard = new Clipboard(".copyToClipboard", {
            target: function(trigger) {
                return trigger
            },
            text: function(trigger) {
                return $(trigger.parentElement).text().replace(/^Copy to Clipboard/, "").replace(/^Copied/, "")
            }
        });
        copyFileToClipboard.on("success", function(e) {
            var e = $(e.trigger);
            var text = e.html();
            e.html('<i class="fa fa-clipboard"></i>Copied');
            setTimeout(function() {
                e.html(text)
            }, 1500)
        });
        var tutorialContent = document.getElementById("tutorial");
        var terminalEditorSplit = document.getElementById("split-host");
        var iframe = $("iframe").length > 0;
        window.isMobile = window.matchMedia("only screen and (max-width: 601px)");
        if (isMobile.matches) {
            M.toast({
                html: "Swipe header to switch between<br/>Terminal and Instructions"
            });
            var swipeTarget = $("nav")[0];
            if (swipeTarget === undefined) {
                swipeTarget = $(".embedded-course-container")[0]
            }
            var mc = new Hammer(swipeTarget);
            mc.get("swipe").set({
                direction: Hammer.DIRECTION_HORIZONTAL
            });
            mc.on("swipeleft swiperight", function(ev) {
                if (ev.type === "swipeleft") {
                    $("#tutorial").css("display", "none");
                    $("#split-host").css("display", "inherit")
                }
                if (ev.type === "swiperight") {
                    $("#tutorial").css("display", "inherit");
                    $("#split-host").css("display", "none")
                }
            })
        }
        if (!isMobile.matches && tutorialContent && terminalEditorSplit) {
            var defaultWidth = {
                tutorial: tutorialContent.style.width,
                split: terminalEditorSplit.style.width
            };
            resize(tutorialContent, function(e) {
                var transparentDiv = document.getElementById("transparent-inner-box");
                if (transparentDiv) {
                    transparentDiv.removeAttribute("style")
                }
                var minWidth = 60;
                var maxWidth = document.getElementsByTagName("body")[0].clientWidth - 200;
                var width = Math.floor(document.getElementsByTagName("body")[0].clientWidth);
                var x = Math.floor(e.pageX);
                if (x < minWidth) {
                    x = minWidth
                }
                if (x > maxWidth) {
                    x = maxWidth
                }
                if (x === minWidth) {
                    $(tutorialContent).find("#tutorial-resized").removeClass("hidden");
                    tutorialContent.style.width = x + "px";
                    terminalEditorSplit.style.width = Math.floor(width - x - 1) + "px"
                } else {
                    $(tutorialContent).find("#tutorial-resized").addClass("hidden");
                    tutorialContent.style.width = x + "px";
                    terminalEditorSplit.style.width = Math.floor(width - x - 1) + "px"
                }
            });
            $("#tutorial-resized").click(function() {
                $("#tutorial-resized").addClass("hidden");
                tutorialContent.style.width = defaultWidth.tutorial;
                terminalEditorSplit.style.width = defaultWidth.split;
                window.app.fireResize()
            })
        }
        $("#rating input[type=radio]").change(function() {
            var r = this.value;
            $.ajax({
                url: window.location.pathname + "/rating",
                type: "POST",
                data: {
                    rating: r,
                    url: window.location.href,
                    course: course.course.pathwayId,
                    id: course.course.id
                }
            })
        })
    };
    function resize(element, mousemove) {
        element.mousemove = mousemove;
        element.onmousedown = function(e) {
            if (element.clientWidth - e.clientX <= 20) {
                document.documentElement.addEventListener("mousemove", element.doDrag, false);
                document.documentElement.addEventListener("mouseup", element.stopDrag, false)
            }
        };
        element.doDrag = function(e) {
            if (e.which != 1) {
                element.stopDrag(e);
                return
            }
            element.mousemove(e)
        };
        element.stopDrag = function(e) {
            var transparentDiv = document.getElementById("transparent-inner-box");
            if (transparentDiv) {
                transparentDiv.style.display = "none"
            }
            document.documentElement.removeEventListener("mousemove", element.doDrag, false);
            document.documentElement.removeEventListener("mouseup", element.stopDrag, false);
            window.app.fireResize()
        };
        var lastKnownHeight,
            lastKnownWidth;
        $(window).resize(function() {
            var width = $(window).width();
            var height = $(window).height();
            if (lastKnownWidth !== width || lastKnownHeight !== lastKnownHeight) {
                lastKnownWidth = width;
                lastKnownHeight = height;
                mousemove({
                    pageX: $("#tutorial").width()
                })
            }
        })
    }
    var hide_intro = function() {
        var e = $("#intro");
        if (e.length > 0) {
            e.animate({
                left: "-=" + e.width()
            }, 500, function() {
                setTimeout(function() {
                    e.addClass("hidden")
                }, 500);
                go_to_first_step()
            })
        } else {
            go_to_first_step()
        }
        that.is_dirty(true)
    };
    var hide_finish = function() {
        var e = $("#finished");
        e.animate({
            left: "-=" + e.width()
        }, 500, function() {});
        that.is_dirty(true)
    };
    var show_finish = function() {
        var e = $("#finished");
        e.animate({
            left: "0"
        }, 500, function() {});
        that.is_dirty(false);
        track_finish();
        if (that.view && that.view.on_finish) {
            that.view.on_finish()
        }
    };
    var hide_sidebar = function() {
        mixpanel.track("hide-sidebar", {});
        $("#hide-sidebar").addClass("hidden");
        $("#show-sidebar").removeClass("hidden");
        $("#tutorial").addClass("hidden");
        $("#split-host").removeClass("s8, m8").addClass("m12, s12");
        window.app.fireResize()
    };
    var show_sidebar = function() {
        mixpanel.track("show-sidebar", {});
        $("#show-sidebar").addClass("hidden");
        $("#hide-sidebar").removeClass("hidden");
        $("#tutorial").removeClass("hidden");
        $("#split-host").addClass("s8, m8").removeClass("m12, s12");
        window.app.fireResize()
    };
    var check_if_can_process_next_step = function(e) {
        e.preventDefault();
        var currentStep = $('div[class^="step"]:not(.hidden)');
        var quiz = currentStep.find(".quiz") || undefined;
        var form = $(quiz).find("form input") || undefined;
        if (quiz !== undefined && quiz.length > 0 && form !== undefined && form.length > 0) {
            processQuiz()
        } else {
            var step = $(this).parents(".step");
            if (step.length === 0) {
                var n = $("#step-progress-text .current").text();
                step = $("#step-" + n)
            }
            if (that.view && that.view.validate_step_change) {
                that.view.validate_step_change(step)
            } else {
                go_to_next_step(step)
            }
        }
    };
    var block_next_step = function(step) {
        $("button.next", step).removeClass("passed").addClass("tooltipped").tooltip().trigger("mouseenter");
        setTimeout(function() {
            $("button.next", step).removeClass("tooltipped").off("mouseenter")
        }, 500)
    };
    this.block_next_step = block_next_step;
    var go_to_first_step = function() {
        var next_step = $("#step-1");
        if (that.view && that.view.next_step)
            that.view.next_step(1, next_step);
        track_step(1);
        var max = parseInt($("#step-progress").attr("data-steps"), 10);
        if (max === 1)
            track_lastSingleStep(1)
    };
    var go_to_next_step = function() {
        var current = $("#step-progress-text .current");
        var active = parseInt(current.text(), 10);
        var target = active + 1;
        var max = parseInt($("#step-progress").attr("data-steps"), 10);
        $("#step-progress .fa.fa-caret-left").attr("style", "");
        if (target <= max && target >= 1) {
            move_to_step(current, active, target);
            track_step(target);
            if (target === max) {
                track_lastStep(target);
                if (course && course && course.course.environment && course.course.environment.hidefinish && course.course.environment.hidefinish === true) {
                    $("#step-progress .fa.fa-caret-right").attr("style", "color: #0000")
                }
            }
        } else {
            if (!window.hidefinish || window.hidefinish !== true)
                show_finish()
        }
        return false
    };
    this.go_to_next_step = go_to_next_step;
    var go_to_previous_step = function(e) {
        var current = $("#step-progress-text .current");
        var active = parseInt(current.text(), 10);
        var target = active - 1;
        var max = parseInt($("#step-progress").attr("data-steps"), 10);
        if (target <= max && target >= 1) {
            move_to_step(current, active, target)
        }
        if (course && course && course.course.environment && course.course.environment.hidefinish && course.course.environment.hidefinish === true) {
            $("#step-progress .fa.fa-caret-right").attr("style", "")
        }
        if (target === 1) {
            $("#step-progress .fa.fa-caret-left").attr("style", "color: #0000")
        }
        return false
    };
    var move_to_step = function(current, active, target) {
        var step = $("#step-" + active);
        step.addClass("hidden");
        var next_step = $("#step-" + target);
        next_step.removeClass("hidden");
        current.text(target);
        if (that.view && that.view.next_step)
            that.view.next_step(target, next_step)
    };
    var track_step = function(step) {
        mixpanel.track("course-step", {
            _Username: that.app.user.username,
            _Course: that.course["pathwayId"],
            _CourseId: that.course.id,
            _Step: step,
            _Embedded: window.embedded
        });
        var step_url = "/" + that.app.user.username + "/" + that.course["pathwayId"] + "/" + that.course.id + "/start/" + step + trackingParameters;
        console.log(step_url);
        $.ajax({
            type: "POST",
            tryCount: 0,
            retryLimit: 3,
            url: step_url,
            error: function(xhr, textStatus, errorThrown) {
                console.log("Track Step Error", textStatus);
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                    return
                }
                return
            }
        });
        send_message_to_parent("step", that.course.id, "step" + step)
    };
    var track_lastStep = function(step) {
        mixpanel.track("last-step", {
            _Username: that.app.user.username,
            _Course: that.course["pathwayId"],
            _CourseId: that.course.id,
            _Step: step,
            _Embedded: window.embedded
        });
        var step_url = "/" + that.app.user.username + "/" + that.course["pathwayId"] + "/" + that.course.id + "/laststep" + trackingParameters;
        $.ajax({
            type: "POST",
            tryCount: 0,
            retryLimit: 3,
            url: step_url,
            error: function(xhr, textStatus, errorThrown) {
                console.log("Track Last Step Error", textStatus);
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                    return
                }
                return
            }
        });
        send_message_to_parent("last_step", that.course.id)
    };
    var track_lastSingleStep = function(step) {
        mixpanel.track("last-single-step", {
            _Username: that.app.user.username,
            _Course: that.course["pathwayId"],
            _CourseId: that.course.id,
            _Step: step,
            _Embedded: window.embedded
        });
        var step_url = "/" + that.app.user.username + "/" + that.course["pathwayId"] + "/" + that.course.id + "/lastsinglestep" + trackingParameters;
        $.ajax({
            type: "POST",
            tryCount: 0,
            retryLimit: 3,
            url: step_url,
            error: function(xhr, textStatus, errorThrown) {
                console.log("Track Last Single Step Error", textStatus);
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                    return
                }
                return
            }
        });
        send_message_to_parent("last_single_step", that.course.id)
    };
    var track_finish = function() {
        mixpanel.track("course-finished", {
            _Username: that.app.user.username,
            _Course: that.course["pathwayId"],
            _CourseId: that.course.id,
            _Embedded: window.embedded
        });
        var step_url = "/" + that.app.user.username + "/" + that.course["pathwayId"] + "/" + that.course.id + "/finish" + trackingParameters;
        $.ajax({
            type: "POST",
            tryCount: 0,
            retryLimit: 3,
            url: step_url,
            error: function(xhr, textStatus, errorThrown) {
                console.log("Track Finish Error", textStatus);
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                    return
                }
                return
            }
        });
        send_message_to_parent("finish", that.course.id)
    };
    var track_next_tutorial_cta = function() {
        mixpanel.track("course-cta-clicked", {
            _Username: that.app.user.username,
            _Course: that.course["pathwayId"],
            _CourseId: that.course.id,
            _Embedded: window.embedded
        });
        var step_url = "/" + that.app.user.username + "/" + that.course["pathwayId"] + "/" + that.course.id + "/cta" + trackingParameters;
        $.ajax({
            type: "POST",
            tryCount: 0,
            retryLimit: 3,
            url: step_url,
            error: function(xhr, textStatus, errorThrown) {
                console.log("Track Last Step Error", textStatus);
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                    return
                }
                return
            }
        });
        send_message_to_parent("cta_clicked", that.course.id)
    };
    var send_message_to_parent = function(tag, course, label) {
        if (parent && parent.postMessage) {
            if (course === undefined) {
                course = that.course.id
            }
            parent.postMessage({
                action: tag,
                scenario: course,
                label: label
            }, "*")
        }
    };
    this.send_message_to_parent = send_message_to_parent;
    var send_error_to_parent = function(reason) {
        if (parent && parent.postMessage) {
            parent.postMessage({
                action: "error",
                reason: reason
            }, "*")
        }
    };
    this.send_error_to_parent = send_error_to_parent;
    var download = function() {
        mixpanel.track("course-download", {
            _Username: that.app.user.username,
            _Course: that.course["pathwayId"],
            _CourseId: that.course.id
        });
        $("#download-assets").addClass("hidden");
        $("#course-finished-text").addClass("hidden");
        if (that.view && that.view.download) {
            $("#download-started").removeClass("hidden");
            that.view.download()
        } else {
            $("#download-not-supported").removeClass("hidden")
        }
    };
    var show_answer = function() {
        mixpanel.track("course-show-answer", {
            _Username: that.app.user.username,
            _Course: that.course["pathwayId"],
            _CourseId: that.course.id
        });
        var button = $(this);
        var step = button.parents(".step");
        var answer_content = $(".answer-content", step);
        var content = $(".content", step);
        if (answer_content.hasClass("hidden")) {
            content.addClass("hidden");
            answer_content.removeClass("hidden");
            button.html(button.html().replace("Show", "Hide"))
        } else {
            answer_content.addClass("hidden");
            content.removeClass("hidden");
            button.html(button.html().replace("Hide", "Show"))
        }
    };
    this.is_dirty = function(flag) {
        isDirty = flag
    }
};
var JsHtmlView = function() {
    var editor;
    var copied_code = [];
    this.init = function() {
        var files = course.course.files;
        if (!files)
            return;
        for (var i = 0; i < files.length; i++) {
            var id = "file" + i;
            var f = files[i];
            editor = new Editor;
            editor.init("#editor", id, course.course.environment.uisettings);
            if (i >= 1)
                $("#" + id).addClass("hidden")
        }
    };
    this.setCode = function(text, clear) {
        if (!editor)
            return;
        if (clear) {
            editor.clear()
        }
        editor.set_code(text)
    };
    this.getCode = function() {
        if (!editor)
            return;
        return editor.get_code()
    };
    this.download = function() {
        var files = [{
            filename: "app.js",
            body: escape(editor.get_code())
        }];
        var download_url = "/" + app.user.username + "/react/1/assets?editor_files=" + escape(JSON.stringify(files));
        $("body").append("<iframe src='" + download_url + "' style='display: none;' ></iframe>")
    };
    this.next_step = function(id, step) {
        if (copied_code.indexOf(id) === -1) {
            copied_code.push(id);
            editor.append_code(step.attr("data-code"))
        }
    };
    this.on_finish = function() {
        editor.is_dirty(false)
    }
};
var RegistrationModal = function() {
    var selectors;
    this.init = function(_selectors) {
        selectors = _selectors;
        selectors.display_login.click(show_login);
        selectors.display_signup.click(show_signup);
        selectors.signup.find("form").submit(signup);
        selectors.login.find("form").submit(login)
    };
    var remainFree = function(e) {
        e.preventDefault();
        $(this).text("Your Plan");
        $(this).removeClass("green");
        $(this).addClass("blue");
        mixpanel.track("account-upgrade", {
            distinct_id: app.user.email,
            _Username: app.user.username,
            _Plan: "Free",
            _Frequency: "",
            _Price: 0
        });
        if (window.location.pathname === "/signup/upgrade") {
            window.location = "/"
        } else {
            window.location.reload()
        }
        return false
    };
    var upgradeToPro = function(e) {
        e.preventDefault();
        var b = $(this);
        var frequency = $("#payment .frequency select").val();
        var amount = 14400;
        if (frequency === "monthly")
            amount = 1500;
        mixpanel.track("account-upgrade", {
            distinct_id: app.user.email,
            _Username: app.user.username,
            _Plan: "Professional",
            _Frequency: frequency,
            _Price: amount
        });
        payWithStripe(b, "Scrapbook Professional Account", "professional", frequency, amount, function() {
            b.text("Thank you");
            if (window.location.pathname === "/signup/upgrade") {
                $("#payment").html("<div class='center'><h3>Thank you.</h3><p>As an early adopter we value your support and feedback. We'll be in touch shortly regarding payment</p><a href='/' class='btn green'>Continue to Courses</a></div>")
            } else {
                $("#payment-container").html("<div class='center' style='margin: 70px;'><h3>Thank you.</h3><p>As an early adopter we value your support and feedback. We'll be in touch shortly regarding payment</p><a href='#' class='btn green' onclick='javascript:window.location.reload();'>Continue to Scenario</a></div>")
            }
        }, function() {
            b.text("Error Occurred. We'll be in touch.")
        });
        return false
    };
    var upgradeToGuidance = function(e) {
        e.preventDefault();
        var b = $(this);
        var frequency = $("#payment .frequency select").val();
        var amount = 57600;
        if (frequency === "monthly")
            amount = 6e3;
        mixpanel.track("account-upgrade", {
            distinct_id: app.user.email,
            _Username: app.user.username,
            _Plan: "Guidance",
            _Frequency: frequency,
            _Price: amount
        });
        payWithStripe(b, "Scrapbook Guidance Account", "guidance", frequency, amount, function() {
            b.text("Thank you");
            if (window.location.pathname === "/signup/upgrade") {
                $("#payment").html("<div class='center'><h3>Thank you.</h3><p>As an early adopter we value your support and feedback. We'll be in touch shortly regarding payment</p><a href='/' class='btn green'>Continue to Courses</a></div>")
            } else {
                $("#payment-container").html("<div class='center' style='margin: 70px;'><h3>Thank you.</h3><p>As an early adopter we value your support and feedback. We'll be in touch shortly regarding payment</p><a href='#' class='btn green' onclick='javascript:window.location.reload();'>Continue to Scenario</a></div>")
            }
        }, function() {
            b.text("Error Occurred. We'll be in touch.")
        });
        return false
    };
    var show_login = function(e) {
        e.preventDefault();
        selectors.signup.addClass("hidden");
        selectors.login.removeClass("hidden");
        return false
    };
    var show_signup = function(e) {
        e.preventDefault();
        selectors.login.addClass("hidden");
        selectors.signup.removeClass("hidden");
        return false
    };
    var showVoucherCode = function(e) {
        e.preventDefault();
        selectors.displayVoucherCode.addClass("hidden");
        selectors.voucherContainer.removeClass("hidden");
        selectors.use_voucher.removeClass("hidden");
        return false
    };
    var applyVoucher = function(e) {
        e.preventDefault();
        selectors.voucherContainer.html("<p>Successfully applied voucher, the course is now free. We hope you enjoy!</p>");
        selectors.stripe.find("button").text("Continue");
        return false
    };
    var signup = function(e) {
        e.preventDefault();
        var form = $(this);
        selectors.signup.find("button").text("Signing up...");
        selectors.signup.find(".error").text("");
        $.ajax({
            url: "/signup",
            type: "POST",
            data: form.serialize(),
            success: function(data) {
                mixpanel.alias(data.email);
                app.user = {
                    username: data.username,
                    email: data.email
                };
                if (course.pathway.paid === true) {
                    showPaymentScreen(data)
                } else {
                    window.location.reload()
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (window.trackJs)
                    trackJs.track("Signup Error: " + textStatus + " " + errorThrown);
                try {
                    var json = JSON.parse(jqXHR.responseText);
                    selectors.signup.find(".error").text(json && json.error && json.error.message || "Sorry, a problem has occurred")
                } catch (e) {
                    console.log("Unable to parse output", e);
                    selectors.signup.find(".error").text("Sorry, a problem has occurred")
                }
                selectors.signup.find("button").text("Sign Up")
            }
        });
        return false
    };
    var login = function(e) {
        e.preventDefault();
        var form = $(this);
        selectors.login.find("button").text("Logging In...");
        selectors.login.find(".error").text("");
        $.ajax({
            url: "/login",
            type: "POST",
            data: form.serialize(),
            success: function(data) {
                app.user = {
                    username: data.username,
                    email: data.email
                };
                if (course.pathway.paid) {
                    showPaymentScreen(data)
                } else {
                    window.location.reload()
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (window.trackJs)
                    trackJs.track("Login Error: " + textStatus + " " + errorThrown);
                try {
                    var json = JSON.parse(jqXHR.responseText);
                    var msg = json && json.error && json.error.message;
                    if (!msg) {
                        msg = json && json.error && Array.isArray(json.error) && json.error[0]
                    }
                    selectors.login.find(".error").text(msg || "Sorry, a problem has occurred")
                } catch (e) {
                    console.log("Unable to parse output", e);
                    selectors.login.find(".error").text("Sorry, a problem has occurred")
                }
                selectors.login.find("button").text("Login")
            }
        });
        return false
    };
    var showPaymentScreen = function(data) {
        selectors.login.addClass("hidden");
        selectors.signup.addClass("hidden");
        selectors.payment.removeClass("hidden");
        mixpanel.track("shown-payment-dialog", {
            distinct_id: app.user.email,
            _Username: app.user.username
        })
    };
    var loadStripe = function(e) {
        e.preventDefault();
        var b = selectors.stripe.find("button");
        payWithStripe(b, "Docker course on Scrapbook", undefined, undefined, 2900, function() {
            b.text("Success! Redirecting...");
            setTimeout(function() {
                window.location.reload()
            }, 600)
        }, function() {
            b.text("Error Occurred. We'll be in touch.")
        });
        return false
    };
    var showPaymentDetails = function() {
        $.ajax({
            url: "http://ipinfo.io/json",
            success: function(data) {
                var country = data.country;
                $("#country").val(country).material_select()
            }
        })
    };
    var payWithStripe = function(b, description, plan, frequency, amount, callback, err) {
        mixpanel.track("stripe-mvp", {
            distinct_id: app.user.email,
            _Username: app.user.username,
            _Plan: plan,
            _Frequency: frequency
        });
        $.ajax({
            url: "/signup/upgrade",
            type: "POST",
            data: {
                email: app.user.email,
                username: app.user.username,
                plan: plan,
                frequency: frequency
            },
            success: function() {
                callback()
            },
            error: function() {
                callback()
            }
        })
    }
};
var ConfigureShareButtons = function() {
    this.init = function() {
        var context = $(".social-share");
        if (!context)
            return;
        $(".linkedin", context).click(linkedin);
        $(".twitter", context).click(twitter);
        $(".facebook", context).click(facebook)
    };
    var linkedin = function() {
        var message;
        var title;
        if (window.course) {
            title = "I just completed the " + window.course.course.title;
            message = "I just completed the " + window.course.course.title + " scenario on Katacoda!"
        } else {
            title = "Take a look at Katacoda! ";
            message = ""
        }
        var url = "https://www.linkedin.com/shareArticle";
        url += "?title=" + message + "&mini=true&url=" + encodeURIComponent(window.location.href);
        openUrl(url)
    };
    var twitter = function() {
        var message;
        if (window.course)
            message = "I just completed the " + window.course.course.title + " scenario on Katacoda! ";
        else
            message = "Take a look at Katacoda! ";
        var url = "https://twitter.com/intent/tweet?text=" + message + encodeURIComponent(window.location.href);
        openUrl(url)
    };
    var facebook = function() {
        var message;
        if (window.course)
            message = "I just completed the " + window.course.course.title + " scenario on Katacoda! ";
        else
            message = "Take a look at Katacoda! ";
        var url = "https://www.facebook.com/sharer/sharer.php?t=" + message + "&u=" + encodeURIComponent(window.location.href);
        openUrl(url)
    };
    var openUrl = function(url) {
        var win = window.open(url, "_blank");
        if (win && win.focus)
            win.focus()
    }
};
var TabBarView = function() {
    var context = $("#split-host");
    var serviceLauncher = function(id, start, port) {
        if (window.course.view.project === undefined) {
            console.warn("[Katacoda] Service Launcher unable to launch as no connection");
            safeTrackJs("Service Launcher unable to launch as no connection");
            return
        }
        if ($("#" + id).length === 0) {
            window.course.view.write_to_environment(start);
            $("#split-host .tabbar").after('<iframe id="' + id + '" src="/loading/' + id + '" width="100%" height="95%" style="max-height: 95%; height: 95vh;"></iframe>');
            var host = window.course.view.project.hosts[0];
            setTimeout(function() {
                $("#" + id).attr("src", "https://" + host.subdomain + "-" + port + "-" + host.katacodahost + (window.katacodaDomain || ".environments.katacoda.com"))
            }, 3e3)
        }
    };
    var scopeLauncher = function() {
        var cmd = window.course.course.environment.scope || "ssh host01 'docker run --name=scope -d --net=host --pid=host --privileged -v /var/run/docker.sock:/var/run/docker.sock:rw weaveworks/scope:1.11.4 --probe.docker=true'";
        var start = window.course.course.environment.scope || cmd;
        var port = window.course.course.environment.scopeport || 4040;
        serviceLauncher("scope", start, port)
    };
    var ideLauncher = function() {
        var defaultStart = "/opt/start-vscode.sh";
        var start = window.course.course.environment.ide || defaultStart;
        var port = window.course.course.environment.ideport || 23e3;
        serviceLauncher("ide", start, port);
        window.app.loadjs("/javascripts/theiaide-extension.js", function() {
            console.log("Loading IDE");
            if (window.app.ide === undefined) {
                window.app.ide = new Editor;
                window.app.ide.init()
            }
        })
    };
    this.ideLauncher = ideLauncher;
    function detectCookieBlockingBrowsers() {
        var ua = window.navigator.userAgent;
        if (ua.indexOf("Intel Mac OS X") === -1) {
            return false
        }
        var safari = ua.indexOf("Safari/");
        var chrome = ua.indexOf("Chrome/");
        if (safari > 0 && chrome === -1) {
            return parseInt(ua.substring(safari + 7, ua.indexOf(".", safari)), 10)
        }
        return false
    }
    this.init = function() {
        context.on("click", ".ktab", function(e) {
            if ($(this).attr("target") === "_blank") {
                return
            }
            e.preventDefault();
            if ($(this).attr("data-view-id") === "scope") {
                scopeLauncher()
            }
            if ($(this).attr("data-view-id") === "ide") {
                ideLauncher()
            }
            if ($(this).hasClass("new-window")) {
                var url = $(this).attr("data-src");
                var win = window.open(url, "_blank");
                if (win && win.focus)
                    win.focus()
            } else {
                if ($(this).hasClass("iframetab") && detectCookieBlockingBrowsers()) {
                    var url = $(this).attr("data-src");
                    var win = window.open(url, "_blank");
                    if (win && win.focus)
                        win.focus()
                } else {
                    var target = $(this).attr("data-view-id");
                    switchTab(target)
                }
            }
            return false
        });
        $(context).on("click", "a.close-tab", function(e) {
            e.preventDefault();
            var s = "#file0";
            var tabs = $(this).parent().parent().children();
            var tab = $(this).parent();
            var index = tabs.index(tab);
            if (index === 1)
                s = $(tabs.get(index)).attr("data-view-id");
            else if (index > 1)
                s = $(tabs.get(index - 1)).attr("data-view-id");
            var editorId = tab.attr("data-view-id");
            switchTab(s);
            tab.remove();
            $(editorId, context).remove();
            $(".file-loading-progress").remove();
            return false
        })
    };
    function escapeSelector(s) {
        return s.replace(/(:|\.|\[|\])/g, "\\$1").replace(/\//g, "-")
    }
    var switchTab = function(id) {
        if (id === undefined || id === "")
            return;
        var tab = $(".ktab[data-view-id='" + id + "']");
        var localContext = tab.parents(".split");
        if (localContext.length == 0)
            localContext = tab.parents("#split-host");
        $(".ace_editor", localContext).addClass("hidden");
        $(".terminal-container", localContext).addClass("offscreen");
        $("#novnc-display", localContext).addClass("offscreen");
        $("#authoring_information", localContext).addClass("offscreen");
        $("iframe", localContext).addClass("hidden");
        $(".image-displayer", localContext).addClass("hidden");
        $(".ktab.active", localContext).removeClass("active");
        tab.addClass("active");
        if (tab.get(0) && tab.get(0).scrollIntoViewIfNeeded)
            tab.get(0).scrollIntoViewIfNeeded();
        if (id.indexOf("#") === -1)
            id = "#" + id;
        $(escapeSelector(id), localContext).removeClass("hidden").removeClass("offscreen");
        app.fireResize()
    }
};
function bubbleIframeMouseMove(iframe) {
    var existingOnMouseMove = iframe.contentWindow.onmousemove;
    iframe.contentWindow.onmousemove = function(e) {
        if (existingOnMouseMove)
            existingOnMouseMove(e);
        var evt = document.createEvent("MouseEvents");
        var boundingClientRect = iframe.getBoundingClientRect();
        evt.initMouseEvent("mousemove", true, false, window, e.detail, e.screenX, e.screenY, e.clientX + boundingClientRect.left, e.clientY + boundingClientRect.top, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, null);
        iframe.dispatchEvent(evt)
    }
}
function markCorrectOrIncorrect(elementAndLabel, isCorrect) {
    if (isCorrect) {
        $(elementAndLabel).removeClass("incorrect").addClass("correct")
    } else {
        $(elementAndLabel).removeClass("correct").addClass("incorrect")
    }
}


