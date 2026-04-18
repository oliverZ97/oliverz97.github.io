import {
  r as d,
  u as Cr,
  a as qt,
  b as ht,
  s as Xr,
  _ as R,
  c as jt,
  j as t,
  g as Ve,
  d as Ue,
  e as se,
  f as X,
  h as Ke,
  i as Pe,
  k as ue,
  l as Xe,
  m as we,
  n as bo,
  B as Ot,
  o as Zt,
  p as pt,
  q as Wo,
  t as vt,
  I as jr,
  P as vo,
  A as Qr,
  v as Sr,
  w as wr,
  x as Re,
  y as Wt,
  z as Yt,
  T as Jr,
  C as Zr,
  D as Go,
  M as en,
  E as kr,
  F as tn,
  G as on,
  H as rn,
  R as nn,
  J as sn,
  K as ln,
  L as ge,
  N as a,
  O as l,
  Q as g,
  S as Be,
  U as De,
  V as zr,
  W as Rr,
  X as an,
  Y as St,
  Z as Tt,
  $ as Oe,
  a0 as cn,
  a1 as dn,
  a2 as Fe,
  a3 as un,
  a4 as pn,
  a5 as co,
  a6 as fn,
  a7 as xn,
  a8 as hn,
  a9 as yo,
  aa as gn,
  ab as eo,
  ac as yt,
  ad as Yo,
  ae as mn,
} from "./index-5e5bfc5f.js";
import {
  g as Ne,
  c as Vo,
  i as Co,
  a as Gt,
  Q as re,
  b as rt,
  s as bn,
  S as Ce,
  d as vn,
  h as Pt,
  e as jo,
  f as So,
  j as wo,
  k as Mt,
  l as yn,
  m as Cn,
  n as _t,
  o as jn,
  p as uo,
  q as to,
  r as Uo,
  t as Sn,
  u as wn,
  V as kn,
  v as zn,
  w as Rn,
} from "./quizUtils-a0b3ac88.js";
import { b as In } from "./bg-86427976.js";
import { P as Ir, T as nt, L as $r, d as $n } from "./AutoAwesomeMotion-914c82e0.js";
import { S as Tn, F as _n, a as An, b as Ht } from "./Switch-fba4b425.js";
let Ct;
function Tr() {
  if (Ct) return Ct;
  const e = document.createElement("div"),
    o = document.createElement("div");
  return (
    (o.style.width = "10px"),
    (o.style.height = "1px"),
    e.appendChild(o),
    (e.dir = "rtl"),
    (e.style.fontSize = "14px"),
    (e.style.width = "4px"),
    (e.style.height = "1px"),
    (e.style.position = "absolute"),
    (e.style.top = "-1000px"),
    (e.style.overflow = "scroll"),
    document.body.appendChild(e),
    (Ct = "reverse"),
    e.scrollLeft > 0
      ? (Ct = "default")
      : ((e.scrollLeft = 1), e.scrollLeft === 0 && (Ct = "negative")),
    document.body.removeChild(e),
    Ct
  );
}
function Ko(e, o) {
  const r = e.scrollLeft;
  if (o !== "rtl") return r;
  switch (Tr()) {
    case "negative":
      return e.scrollWidth - e.clientWidth + r;
    case "reverse":
      return e.scrollWidth - e.clientWidth - r;
    default:
      return r;
  }
}
const On = (e) => {
    const o = d.useRef({});
    return (
      d.useEffect(() => {
        o.current = e;
      }),
      o.current
    );
  },
  Pn = On;
function Xo(e) {
  return typeof e.normalize < "u" ? e.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : e;
}
function En(e = {}) {
  const {
    ignoreAccents: o = !0,
    ignoreCase: r = !0,
    limit: i,
    matchFrom: u = "any",
    stringify: p,
    trim: c = !1,
  } = e;
  return (s, { inputValue: n, getOptionLabel: f }) => {
    let x = c ? n.trim() : n;
    r && (x = x.toLowerCase()), o && (x = Xo(x));
    const h = x
      ? s.filter((b) => {
          let v = (p || f)(b);
          return (
            r && (v = v.toLowerCase()),
            o && (v = Xo(v)),
            u === "start" ? v.indexOf(x) === 0 : v.indexOf(x) > -1
          );
        })
      : s;
    return typeof i == "number" ? h.slice(0, i) : h;
  };
}
function oo(e, o) {
  for (let r = 0; r < e.length; r += 1) if (o(e[r])) return r;
  return -1;
}
const Nn = En(),
  Qo = 5,
  Bn = (e) => {
    var o;
    return (
      e.current !== null &&
      ((o = e.current.parentElement) == null ? void 0 : o.contains(document.activeElement))
    );
  };
function Dn(e) {
  const {
      unstable_isActiveElementInListbox: o = Bn,
      unstable_classNamePrefix: r = "Mui",
      autoComplete: i = !1,
      autoHighlight: u = !1,
      autoSelect: p = !1,
      blurOnSelect: c = !1,
      clearOnBlur: s = !e.freeSolo,
      clearOnEscape: n = !1,
      componentName: f = "useAutocomplete",
      defaultValue: x = e.multiple ? [] : null,
      disableClearable: h = !1,
      disableCloseOnSelect: b = !1,
      disabled: v,
      disabledItemsFocusable: j = !1,
      disableListWrap: k = !1,
      filterOptions: w = Nn,
      filterSelectedOptions: O = !1,
      freeSolo: D = !1,
      getOptionDisabled: _,
      getOptionLabel: N = (y) => {
        var m;
        return (m = y.label) != null ? m : y;
      },
      groupBy: V,
      handleHomeEndKeys: $ = !e.freeSolo,
      id: S,
      includeInputInList: G = !1,
      inputValue: A,
      isOptionEqualToValue: C = (y, m) => y === m,
      multiple: z = !1,
      onChange: M,
      onClose: W,
      onHighlightChange: E,
      onInputChange: B,
      onOpen: ae,
      open: te,
      openOnFocus: L = !1,
      options: P,
      readOnly: fe = !1,
      selectOnFocus: Ae = !e.freeSolo,
      value: T,
    } = e,
    U = Cr(S);
  let q = N;
  q = (y) => {
    const m = N(y);
    return typeof m != "string" ? String(m) : m;
  };
  const oe = d.useRef(!1),
    ce = d.useRef(!0),
    ne = d.useRef(null),
    me = d.useRef(null),
    [Q, ie] = d.useState(null),
    [xe, Te] = d.useState(-1),
    et = u ? 0 : -1,
    je = d.useRef(et),
    [Y, it] = qt({ controlled: T, default: x, name: f }),
    [he, Qe] = qt({ controlled: A, default: "", name: f, state: "inputValue" }),
    [We, dt] = d.useState(!1),
    Ee = d.useCallback(
      (y, m) => {
        if (!(z ? Y.length < m.length : m !== null) && !s) return;
        let K;
        if (z) K = "";
        else if (m == null) K = "";
        else {
          const pe = q(m);
          K = typeof pe == "string" ? pe : "";
        }
        he !== K && (Qe(K), B && B(y, K, "reset"));
      },
      [q, he, z, B, Qe, s, Y],
    ),
    [Le, ut] = qt({ controlled: te, default: !1, name: f, state: "open" }),
    [st, mt] = d.useState(!0),
    bt = !z && Y != null && he === q(Y),
    Ie = Le && !fe,
    I = Ie
      ? w(
          P.filter((y) => !(O && (z ? Y : [Y]).some((m) => m !== null && C(y, m)))),
          { inputValue: bt && st ? "" : he, getOptionLabel: q },
        )
      : [],
    H = Pn({ filteredOptions: I, value: Y });
  d.useEffect(() => {
    const y = Y !== H.value;
    (We && !y) || (D && !y) || Ee(null, Y);
  }, [Y, Ee, We, H.value, D]);
  const J = Le && I.length > 0 && !fe,
    Z = ht((y) => {
      y === -1 ? ne.current.focus() : Q.querySelector(`[data-tag-index="${y}"]`).focus();
    });
  d.useEffect(() => {
    z && xe > Y.length - 1 && (Te(-1), Z(-1));
  }, [Y, z, xe, Z]);
  function be(y, m) {
    if (!me.current || y === -1) return -1;
    let F = y;
    for (;;) {
      if ((m === "next" && F === I.length) || (m === "previous" && F === -1)) return -1;
      const K = me.current.querySelector(`[data-option-index="${F}"]`),
        pe = j ? !1 : !K || K.disabled || K.getAttribute("aria-disabled") === "true";
      if ((K && !K.hasAttribute("tabindex")) || pe) F += m === "next" ? 1 : -1;
      else return F;
    }
  }
  const ye = ht(({ event: y, index: m, reason: F = "auto" }) => {
      if (
        ((je.current = m),
        m === -1
          ? ne.current.removeAttribute("aria-activedescendant")
          : ne.current.setAttribute("aria-activedescendant", `${U}-option-${m}`),
        E && E(y, m === -1 ? null : I[m], F),
        !me.current)
      )
        return;
      const K = me.current.querySelector(`[role="option"].${r}-focused`);
      K && (K.classList.remove(`${r}-focused`), K.classList.remove(`${r}-focusVisible`));
      const pe = me.current.parentElement.querySelector('[role="listbox"]');
      if (!pe) return;
      if (m === -1) {
        pe.scrollTop = 0;
        return;
      }
      const $e = me.current.querySelector(`[data-option-index="${m}"]`);
      if (
        $e &&
        ($e.classList.add(`${r}-focused`),
        F === "keyboard" && $e.classList.add(`${r}-focusVisible`),
        pe.scrollHeight > pe.clientHeight && F !== "mouse")
      ) {
        const Se = $e,
          Ze = pe.clientHeight + pe.scrollTop,
          Fo = Se.offsetTop + Se.offsetHeight;
        Fo > Ze
          ? (pe.scrollTop = Fo - pe.clientHeight)
          : Se.offsetTop - Se.offsetHeight * (V ? 1.3 : 0) < pe.scrollTop &&
            (pe.scrollTop = Se.offsetTop - Se.offsetHeight * (V ? 1.3 : 0));
      }
    }),
    ke = ht(({ event: y, diff: m, direction: F = "next", reason: K = "auto" }) => {
      if (!Ie) return;
      const $e = be(
        (() => {
          const Se = I.length - 1;
          if (m === "reset") return et;
          if (m === "start") return 0;
          if (m === "end") return Se;
          const Ze = je.current + m;
          return Ze < 0
            ? Ze === -1 && G
              ? -1
              : (k && je.current !== -1) || Math.abs(m) > 1
              ? 0
              : Se
            : Ze > Se
            ? Ze === Se + 1 && G
              ? -1
              : k || Math.abs(m) > 1
              ? Se
              : 0
            : Ze;
        })(),
        F,
      );
      if ((ye({ index: $e, reason: K, event: y }), i && m !== "reset"))
        if ($e === -1) ne.current.value = he;
        else {
          const Se = q(I[$e]);
          (ne.current.value = Se),
            Se.toLowerCase().indexOf(he.toLowerCase()) === 0 &&
              he.length > 0 &&
              ne.current.setSelectionRange(he.length, Se.length);
        }
    }),
    Ge = () => {
      const y = (m, F) => {
        const K = m ? q(m) : "",
          pe = F ? q(F) : "";
        return K === pe;
      };
      if (
        je.current !== -1 &&
        H.filteredOptions &&
        H.filteredOptions.length !== I.length &&
        (z
          ? Y.length === H.value.length && H.value.every((m, F) => q(Y[F]) === q(m))
          : y(H.value, Y))
      ) {
        const m = H.filteredOptions[je.current];
        if (m && I.some((K) => q(K) === q(m))) return !0;
      }
      return !1;
    },
    wt = d.useCallback(() => {
      if (!Ie || Ge()) return;
      const y = z ? Y[0] : Y;
      if (I.length === 0 || y == null) {
        ke({ diff: "reset" });
        return;
      }
      if (me.current) {
        if (y != null) {
          const m = I[je.current];
          if (z && m && oo(Y, (K) => C(m, K)) !== -1) return;
          const F = oo(I, (K) => C(K, y));
          F === -1 ? ke({ diff: "reset" }) : ye({ index: F });
          return;
        }
        if (je.current >= I.length - 1) {
          ye({ index: I.length - 1 });
          return;
        }
        ye({ index: je.current });
      }
    }, [I.length, z ? !1 : Y, O, ke, ye, Ie, he, z]),
    Ut = ht((y) => {
      Xr(me, y), y && wt();
    });
  d.useEffect(() => {
    wt();
  }, [wt]);
  const qe = (y) => {
      Le || (ut(!0), mt(!0), ae && ae(y));
    },
    tt = (y, m) => {
      Le && (ut(!1), W && W(y, m));
    },
    Je = (y, m, F, K) => {
      if (z) {
        if (Y.length === m.length && Y.every((pe, $e) => pe === m[$e])) return;
      } else if (Y === m) return;
      M && M(y, m, F, K), it(m);
    },
    ze = d.useRef(!1),
    ve = (y, m, F = "selectOption", K = "options") => {
      let pe = F,
        $e = m;
      if (z) {
        $e = Array.isArray(Y) ? Y.slice() : [];
        const Se = oo($e, (Ze) => C(m, Ze));
        Se === -1 ? $e.push(m) : K !== "freeSolo" && ($e.splice(Se, 1), (pe = "removeOption"));
      }
      Ee(y, $e),
        Je(y, $e, pe, { option: m }),
        !b && (!y || (!y.ctrlKey && !y.metaKey)) && tt(y, pe),
        (c === !0 || (c === "touch" && ze.current) || (c === "mouse" && !ze.current)) &&
          ne.current.blur();
    };
  function Ye(y, m) {
    if (y === -1) return -1;
    let F = y;
    for (;;) {
      if ((m === "next" && F === Y.length) || (m === "previous" && F === -1)) return -1;
      const K = Q.querySelector(`[data-tag-index="${F}"]`);
      if (
        !K ||
        !K.hasAttribute("tabindex") ||
        K.disabled ||
        K.getAttribute("aria-disabled") === "true"
      )
        F += m === "next" ? 1 : -1;
      else return F;
    }
  }
  const Kt = (y, m) => {
      if (!z) return;
      he === "" && tt(y, "toggleInput");
      let F = xe;
      xe === -1
        ? he === "" && m === "previous" && (F = Y.length - 1)
        : ((F += m === "next" ? 1 : -1), F < 0 && (F = 0), F === Y.length && (F = -1)),
        (F = Ye(F, m)),
        Te(F),
        Z(F);
    },
    Nt = (y) => {
      (oe.current = !0), Qe(""), B && B(y, "", "clear"), Je(y, z ? [] : null, "clear");
    },
    Mo = (y) => (m) => {
      if (
        (y.onKeyDown && y.onKeyDown(m),
        !m.defaultMuiPrevented &&
          (xe !== -1 && ["ArrowLeft", "ArrowRight"].indexOf(m.key) === -1 && (Te(-1), Z(-1)),
          m.which !== 229))
      )
        switch (m.key) {
          case "Home":
            Ie &&
              $ &&
              (m.preventDefault(),
              ke({ diff: "start", direction: "next", reason: "keyboard", event: m }));
            break;
          case "End":
            Ie &&
              $ &&
              (m.preventDefault(),
              ke({ diff: "end", direction: "previous", reason: "keyboard", event: m }));
            break;
          case "PageUp":
            m.preventDefault(),
              ke({ diff: -Qo, direction: "previous", reason: "keyboard", event: m }),
              qe(m);
            break;
          case "PageDown":
            m.preventDefault(),
              ke({ diff: Qo, direction: "next", reason: "keyboard", event: m }),
              qe(m);
            break;
          case "ArrowDown":
            m.preventDefault(),
              ke({ diff: 1, direction: "next", reason: "keyboard", event: m }),
              qe(m);
            break;
          case "ArrowUp":
            m.preventDefault(),
              ke({ diff: -1, direction: "previous", reason: "keyboard", event: m }),
              qe(m);
            break;
          case "ArrowLeft":
            Kt(m, "previous");
            break;
          case "ArrowRight":
            Kt(m, "next");
            break;
          case "Enter":
            if (je.current !== -1 && Ie) {
              const F = I[je.current],
                K = _ ? _(F) : !1;
              if ((m.preventDefault(), K)) return;
              ve(m, F, "selectOption"),
                i && ne.current.setSelectionRange(ne.current.value.length, ne.current.value.length);
            } else
              D &&
                he !== "" &&
                bt === !1 &&
                (z && m.preventDefault(), ve(m, he, "createOption", "freeSolo"));
            break;
          case "Escape":
            Ie
              ? (m.preventDefault(), m.stopPropagation(), tt(m, "escape"))
              : n &&
                (he !== "" || (z && Y.length > 0)) &&
                (m.preventDefault(), m.stopPropagation(), Nt(m));
            break;
          case "Backspace":
            if (z && !fe && he === "" && Y.length > 0) {
              const F = xe === -1 ? Y.length - 1 : xe,
                K = Y.slice();
              K.splice(F, 1), Je(m, K, "removeOption", { option: Y[F] });
            }
            break;
          case "Delete":
            if (z && !fe && he === "" && Y.length > 0 && xe !== -1) {
              const F = xe,
                K = Y.slice();
              K.splice(F, 1), Je(m, K, "removeOption", { option: Y[F] });
            }
            break;
        }
    },
    Xt = (y) => {
      dt(!0), L && !oe.current && qe(y);
    },
    kt = (y) => {
      if (o(me)) {
        ne.current.focus();
        return;
      }
      dt(!1),
        (ce.current = !0),
        (oe.current = !1),
        p && je.current !== -1 && Ie
          ? ve(y, I[je.current], "blur")
          : p && D && he !== ""
          ? ve(y, he, "blur", "freeSolo")
          : s && Ee(y, Y),
        tt(y, "blur");
    },
    zt = (y) => {
      const m = y.target.value;
      he !== m && (Qe(m), mt(!1), B && B(y, m, "input")),
        m === "" ? !h && !z && Je(y, null, "clear") : qe(y);
    },
    Rt = (y) => {
      ye({
        event: y,
        index: Number(y.currentTarget.getAttribute("data-option-index")),
        reason: "mouse",
      });
    },
    It = () => {
      ze.current = !0;
    },
    $t = (y) => {
      const m = Number(y.currentTarget.getAttribute("data-option-index"));
      ve(y, I[m], "selectOption"), (ze.current = !1);
    },
    de = (y) => (m) => {
      const F = Y.slice();
      F.splice(y, 1), Je(m, F, "removeOption", { option: Y[y] });
    },
    _e = (y) => {
      Le ? tt(y, "toggleInput") : qe(y);
    },
    lt = (y) => {
      y.target.getAttribute("id") !== U && y.preventDefault();
    },
    Qt = () => {
      ne.current.focus(),
        Ae &&
          ce.current &&
          ne.current.selectionEnd - ne.current.selectionStart === 0 &&
          ne.current.select(),
        (ce.current = !1);
    },
    Kr = (y) => {
      (he === "" || !Le) && _e(y);
    };
  let Jt = D && he.length > 0;
  Jt = Jt || (z ? Y.length > 0 : Y !== null);
  let Ho = I;
  return (
    V &&
      (Ho = I.reduce((y, m, F) => {
        const K = V(m);
        return (
          y.length > 0 && y[y.length - 1].group === K
            ? y[y.length - 1].options.push(m)
            : y.push({ key: F, index: F, group: K, options: [m] }),
          y
        );
      }, [])),
    v && We && kt(),
    {
      getRootProps: (y = {}) =>
        R({ "aria-owns": J ? `${U}-listbox` : null }, y, {
          onKeyDown: Mo(y),
          onMouseDown: lt,
          onClick: Qt,
        }),
      getInputLabelProps: () => ({ id: `${U}-label`, htmlFor: U }),
      getInputProps: () => ({
        id: U,
        value: he,
        onBlur: kt,
        onFocus: Xt,
        onChange: zt,
        onMouseDown: Kr,
        "aria-activedescendant": Ie ? "" : null,
        "aria-autocomplete": i ? "both" : "list",
        "aria-controls": J ? `${U}-listbox` : void 0,
        "aria-expanded": J,
        autoComplete: "off",
        ref: ne,
        autoCapitalize: "none",
        spellCheck: "false",
        role: "combobox",
        disabled: v,
      }),
      getClearProps: () => ({ tabIndex: -1, onClick: Nt }),
      getPopupIndicatorProps: () => ({ tabIndex: -1, onClick: _e }),
      getTagProps: ({ index: y }) =>
        R({ key: y, "data-tag-index": y, tabIndex: -1 }, !fe && { onDelete: de(y) }),
      getListboxProps: () => ({
        role: "listbox",
        id: `${U}-listbox`,
        "aria-labelledby": `${U}-label`,
        ref: Ut,
        onMouseDown: (y) => {
          y.preventDefault();
        },
      }),
      getOptionProps: ({ index: y, option: m }) => {
        const F = (z ? Y : [Y]).some((pe) => pe != null && C(m, pe)),
          K = _ ? _(m) : !1;
        return {
          key: q(m),
          tabIndex: -1,
          role: "option",
          id: `${U}-option-${y}`,
          onMouseOver: Rt,
          onClick: $t,
          onTouchStart: It,
          "data-option-index": y,
          "aria-disabled": K,
          "aria-selected": F,
        };
      },
      id: U,
      inputValue: he,
      value: Y,
      dirty: Jt,
      popupOpen: Ie,
      focused: We || xe !== -1,
      anchorEl: Q,
      setAnchorEl: ie,
      focusedTag: xe,
      groupedOptions: Ho,
    }
  );
}
const Ln = jt(
  t.jsx("path", {
    d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  }),
  "Close",
);
function qn(e) {
  return Ve("MuiListSubheader", e);
}
Ue("MuiListSubheader", ["root", "colorPrimary", "colorInherit", "gutters", "inset", "sticky"]);
const Mn = ["className", "color", "component", "disableGutters", "disableSticky", "inset"],
  Hn = (e) => {
    const { classes: o, color: r, disableGutters: i, inset: u, disableSticky: p } = e,
      c = {
        root: [
          "root",
          r !== "default" && `color${X(r)}`,
          !i && "gutters",
          u && "inset",
          !p && "sticky",
        ],
      };
    return Xe(c, qn, o);
  },
  Fn = se("li", {
    name: "MuiListSubheader",
    slot: "Root",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [
        o.root,
        r.color !== "default" && o[`color${X(r.color)}`],
        !r.disableGutters && o.gutters,
        r.inset && o.inset,
        !r.disableSticky && o.sticky,
      ];
    },
  })(({ theme: e, ownerState: o }) =>
    R(
      {
        boxSizing: "border-box",
        lineHeight: "48px",
        listStyle: "none",
        color: (e.vars || e).palette.text.secondary,
        fontFamily: e.typography.fontFamily,
        fontWeight: e.typography.fontWeightMedium,
        fontSize: e.typography.pxToRem(14),
      },
      o.color === "primary" && { color: (e.vars || e).palette.primary.main },
      o.color === "inherit" && { color: "inherit" },
      !o.disableGutters && { paddingLeft: 16, paddingRight: 16 },
      o.inset && { paddingLeft: 72 },
      !o.disableSticky && {
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: (e.vars || e).palette.background.paper,
      },
    ),
  ),
  _r = d.forwardRef(function (o, r) {
    const i = Ke({ props: o, name: "MuiListSubheader" }),
      {
        className: u,
        color: p = "default",
        component: c = "li",
        disableGutters: s = !1,
        disableSticky: n = !1,
        inset: f = !1,
      } = i,
      x = Pe(i, Mn),
      h = R({}, i, { color: p, component: c, disableGutters: s, disableSticky: n, inset: f }),
      b = Hn(h);
    return t.jsx(Fn, R({ as: c, className: ue(b.root, u), ref: r, ownerState: h }, x));
  });
_r.muiSkipListHighlight = !0;
const Wn = _r,
  Gn = jt(
    t.jsx("path", {
      d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z",
    }),
    "Cancel",
  );
function Yn(e) {
  return Ve("MuiChip", e);
}
const Vn = Ue("MuiChip", [
    "root",
    "sizeSmall",
    "sizeMedium",
    "colorError",
    "colorInfo",
    "colorPrimary",
    "colorSecondary",
    "colorSuccess",
    "colorWarning",
    "disabled",
    "clickable",
    "clickableColorPrimary",
    "clickableColorSecondary",
    "deletable",
    "deletableColorPrimary",
    "deletableColorSecondary",
    "outlined",
    "filled",
    "outlinedPrimary",
    "outlinedSecondary",
    "filledPrimary",
    "filledSecondary",
    "avatar",
    "avatarSmall",
    "avatarMedium",
    "avatarColorPrimary",
    "avatarColorSecondary",
    "icon",
    "iconSmall",
    "iconMedium",
    "iconColorPrimary",
    "iconColorSecondary",
    "label",
    "labelSmall",
    "labelMedium",
    "deleteIcon",
    "deleteIconSmall",
    "deleteIconMedium",
    "deleteIconColorPrimary",
    "deleteIconColorSecondary",
    "deleteIconOutlinedColorPrimary",
    "deleteIconOutlinedColorSecondary",
    "deleteIconFilledColorPrimary",
    "deleteIconFilledColorSecondary",
    "focusVisible",
  ]),
  le = Vn,
  Un = [
    "avatar",
    "className",
    "clickable",
    "color",
    "component",
    "deleteIcon",
    "disabled",
    "icon",
    "label",
    "onClick",
    "onDelete",
    "onKeyDown",
    "onKeyUp",
    "size",
    "variant",
    "tabIndex",
    "skipFocusWhenDisabled",
  ],
  Kn = (e) => {
    const {
        classes: o,
        disabled: r,
        size: i,
        color: u,
        iconColor: p,
        onDelete: c,
        clickable: s,
        variant: n,
      } = e,
      f = {
        root: [
          "root",
          n,
          r && "disabled",
          `size${X(i)}`,
          `color${X(u)}`,
          s && "clickable",
          s && `clickableColor${X(u)}`,
          c && "deletable",
          c && `deletableColor${X(u)}`,
          `${n}${X(u)}`,
        ],
        label: ["label", `label${X(i)}`],
        avatar: ["avatar", `avatar${X(i)}`, `avatarColor${X(u)}`],
        icon: ["icon", `icon${X(i)}`, `iconColor${X(p)}`],
        deleteIcon: [
          "deleteIcon",
          `deleteIcon${X(i)}`,
          `deleteIconColor${X(u)}`,
          `deleteIcon${X(n)}Color${X(u)}`,
        ],
      };
    return Xe(f, Yn, o);
  },
  Xn = se("div", {
    name: "MuiChip",
    slot: "Root",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e,
        { color: i, iconColor: u, clickable: p, onDelete: c, size: s, variant: n } = r;
      return [
        { [`& .${le.avatar}`]: o.avatar },
        { [`& .${le.avatar}`]: o[`avatar${X(s)}`] },
        { [`& .${le.avatar}`]: o[`avatarColor${X(i)}`] },
        { [`& .${le.icon}`]: o.icon },
        { [`& .${le.icon}`]: o[`icon${X(s)}`] },
        { [`& .${le.icon}`]: o[`iconColor${X(u)}`] },
        { [`& .${le.deleteIcon}`]: o.deleteIcon },
        { [`& .${le.deleteIcon}`]: o[`deleteIcon${X(s)}`] },
        { [`& .${le.deleteIcon}`]: o[`deleteIconColor${X(i)}`] },
        { [`& .${le.deleteIcon}`]: o[`deleteIcon${X(n)}Color${X(i)}`] },
        o.root,
        o[`size${X(s)}`],
        o[`color${X(i)}`],
        p && o.clickable,
        p && i !== "default" && o[`clickableColor${X(i)})`],
        c && o.deletable,
        c && i !== "default" && o[`deletableColor${X(i)}`],
        o[n],
        o[`${n}${X(i)}`],
      ];
    },
  })(
    ({ theme: e, ownerState: o }) => {
      const r = we(e.palette.text.primary, 0.26),
        i = e.palette.mode === "light" ? e.palette.grey[700] : e.palette.grey[300];
      return R(
        {
          maxWidth: "100%",
          fontFamily: e.typography.fontFamily,
          fontSize: e.typography.pxToRem(13),
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 32,
          color: (e.vars || e).palette.text.primary,
          backgroundColor: (e.vars || e).palette.action.selected,
          borderRadius: 32 / 2,
          whiteSpace: "nowrap",
          transition: e.transitions.create(["background-color", "box-shadow"]),
          cursor: "default",
          outline: 0,
          textDecoration: "none",
          border: 0,
          padding: 0,
          verticalAlign: "middle",
          boxSizing: "border-box",
          [`&.${le.disabled}`]: {
            opacity: (e.vars || e).palette.action.disabledOpacity,
            pointerEvents: "none",
          },
          [`& .${le.avatar}`]: {
            marginLeft: 5,
            marginRight: -6,
            width: 24,
            height: 24,
            color: e.vars ? e.vars.palette.Chip.defaultAvatarColor : i,
            fontSize: e.typography.pxToRem(12),
          },
          [`& .${le.avatarColorPrimary}`]: {
            color: (e.vars || e).palette.primary.contrastText,
            backgroundColor: (e.vars || e).palette.primary.dark,
          },
          [`& .${le.avatarColorSecondary}`]: {
            color: (e.vars || e).palette.secondary.contrastText,
            backgroundColor: (e.vars || e).palette.secondary.dark,
          },
          [`& .${le.avatarSmall}`]: {
            marginLeft: 4,
            marginRight: -4,
            width: 18,
            height: 18,
            fontSize: e.typography.pxToRem(10),
          },
          [`& .${le.icon}`]: R(
            { marginLeft: 5, marginRight: -6 },
            o.size === "small" && { fontSize: 18, marginLeft: 4, marginRight: -4 },
            o.iconColor === o.color &&
              R(
                { color: e.vars ? e.vars.palette.Chip.defaultIconColor : i },
                o.color !== "default" && { color: "inherit" },
              ),
          ),
          [`& .${le.deleteIcon}`]: R(
            {
              WebkitTapHighlightColor: "transparent",
              color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.26)` : r,
              fontSize: 22,
              cursor: "pointer",
              margin: "0 5px 0 -6px",
              "&:hover": {
                color: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / 0.4)` : we(r, 0.4),
              },
            },
            o.size === "small" && { fontSize: 16, marginRight: 4, marginLeft: -4 },
            o.color !== "default" && {
              color: e.vars
                ? `rgba(${e.vars.palette[o.color].contrastTextChannel} / 0.7)`
                : we(e.palette[o.color].contrastText, 0.7),
              "&:hover, &:active": { color: (e.vars || e).palette[o.color].contrastText },
            },
          ),
        },
        o.size === "small" && { height: 24 },
        o.color !== "default" && {
          backgroundColor: (e.vars || e).palette[o.color].main,
          color: (e.vars || e).palette[o.color].contrastText,
        },
        o.onDelete && {
          [`&.${le.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : we(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
        },
        o.onDelete &&
          o.color !== "default" && {
            [`&.${le.focusVisible}`]: { backgroundColor: (e.vars || e).palette[o.color].dark },
          },
      );
    },
    ({ theme: e, ownerState: o }) =>
      R(
        {},
        o.clickable && {
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
              : we(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
                ),
          },
          [`&.${le.focusVisible}`]: {
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
              : we(
                  e.palette.action.selected,
                  e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
                ),
          },
          "&:active": { boxShadow: (e.vars || e).shadows[1] },
        },
        o.clickable &&
          o.color !== "default" && {
            [`&:hover, &.${le.focusVisible}`]: {
              backgroundColor: (e.vars || e).palette[o.color].dark,
            },
          },
      ),
    ({ theme: e, ownerState: o }) =>
      R(
        {},
        o.variant === "outlined" && {
          backgroundColor: "transparent",
          border: e.vars
            ? `1px solid ${e.vars.palette.Chip.defaultBorder}`
            : `1px solid ${e.palette.mode === "light" ? e.palette.grey[400] : e.palette.grey[700]}`,
          [`&.${le.clickable}:hover`]: { backgroundColor: (e.vars || e).palette.action.hover },
          [`&.${le.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
          [`& .${le.avatar}`]: { marginLeft: 4 },
          [`& .${le.avatarSmall}`]: { marginLeft: 2 },
          [`& .${le.icon}`]: { marginLeft: 4 },
          [`& .${le.iconSmall}`]: { marginLeft: 2 },
          [`& .${le.deleteIcon}`]: { marginRight: 5 },
          [`& .${le.deleteIconSmall}`]: { marginRight: 3 },
        },
        o.variant === "outlined" &&
          o.color !== "default" && {
            color: (e.vars || e).palette[o.color].main,
            border: `1px solid ${
              e.vars
                ? `rgba(${e.vars.palette[o.color].mainChannel} / 0.7)`
                : we(e.palette[o.color].main, 0.7)
            }`,
            [`&.${le.clickable}:hover`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[o.color].mainChannel} / ${
                    e.vars.palette.action.hoverOpacity
                  })`
                : we(e.palette[o.color].main, e.palette.action.hoverOpacity),
            },
            [`&.${le.focusVisible}`]: {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette[o.color].mainChannel} / ${
                    e.vars.palette.action.focusOpacity
                  })`
                : we(e.palette[o.color].main, e.palette.action.focusOpacity),
            },
            [`& .${le.deleteIcon}`]: {
              color: e.vars
                ? `rgba(${e.vars.palette[o.color].mainChannel} / 0.7)`
                : we(e.palette[o.color].main, 0.7),
              "&:hover, &:active": { color: (e.vars || e).palette[o.color].main },
            },
          },
      ),
  ),
  Qn = se("span", {
    name: "MuiChip",
    slot: "Label",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e,
        { size: i } = r;
      return [o.label, o[`label${X(i)}`]];
    },
  })(({ ownerState: e }) =>
    R(
      {
        overflow: "hidden",
        textOverflow: "ellipsis",
        paddingLeft: 12,
        paddingRight: 12,
        whiteSpace: "nowrap",
      },
      e.size === "small" && { paddingLeft: 8, paddingRight: 8 },
    ),
  );
function Jo(e) {
  return e.key === "Backspace" || e.key === "Delete";
}
const Jn = d.forwardRef(function (o, r) {
    const i = Ke({ props: o, name: "MuiChip" }),
      {
        avatar: u,
        className: p,
        clickable: c,
        color: s = "default",
        component: n,
        deleteIcon: f,
        disabled: x = !1,
        icon: h,
        label: b,
        onClick: v,
        onDelete: j,
        onKeyDown: k,
        onKeyUp: w,
        size: O = "medium",
        variant: D = "filled",
        tabIndex: _,
        skipFocusWhenDisabled: N = !1,
      } = i,
      V = Pe(i, Un),
      $ = d.useRef(null),
      S = bo($, r),
      G = (P) => {
        P.stopPropagation(), j && j(P);
      },
      A = (P) => {
        P.currentTarget === P.target && Jo(P) && P.preventDefault(), k && k(P);
      },
      C = (P) => {
        P.currentTarget === P.target &&
          (j && Jo(P) ? j(P) : P.key === "Escape" && $.current && $.current.blur()),
          w && w(P);
      },
      z = c !== !1 && v ? !0 : c,
      M = z || j ? Ot : n || "div",
      W = R({}, i, {
        component: M,
        disabled: x,
        size: O,
        color: s,
        iconColor: (d.isValidElement(h) && h.props.color) || s,
        onDelete: !!j,
        clickable: z,
        variant: D,
      }),
      E = Kn(W),
      B =
        M === Ot
          ? R(
              { component: n || "div", focusVisibleClassName: E.focusVisible },
              j && { disableRipple: !0 },
            )
          : {};
    let ae = null;
    j &&
      (ae =
        f && d.isValidElement(f)
          ? d.cloneElement(f, { className: ue(f.props.className, E.deleteIcon), onClick: G })
          : t.jsx(Gn, { className: ue(E.deleteIcon), onClick: G }));
    let te = null;
    u &&
      d.isValidElement(u) &&
      (te = d.cloneElement(u, { className: ue(E.avatar, u.props.className) }));
    let L = null;
    return (
      h &&
        d.isValidElement(h) &&
        (L = d.cloneElement(h, { className: ue(E.icon, h.props.className) })),
      t.jsxs(
        Xn,
        R(
          {
            as: M,
            className: ue(E.root, p),
            disabled: z && x ? !0 : void 0,
            onClick: v,
            onKeyDown: A,
            onKeyUp: C,
            ref: S,
            tabIndex: N && x ? -1 : _,
            ownerState: W,
          },
          B,
          V,
          {
            children: [
              te || L,
              t.jsx(Qn, { className: ue(E.label), ownerState: W, children: b }),
              ae,
            ],
          },
        ),
      )
    );
  }),
  Zn = Jn;
function ei(e) {
  return Ve("MuiAutocomplete", e);
}
const ti = Ue("MuiAutocomplete", [
    "root",
    "fullWidth",
    "focused",
    "focusVisible",
    "tag",
    "tagSizeSmall",
    "tagSizeMedium",
    "hasPopupIcon",
    "hasClearIcon",
    "inputRoot",
    "input",
    "inputFocused",
    "endAdornment",
    "clearIndicator",
    "popupIndicator",
    "popupIndicatorOpen",
    "popper",
    "popperDisablePortal",
    "paper",
    "listbox",
    "loading",
    "noOptions",
    "option",
    "groupLabel",
    "groupUl",
  ]),
  ee = ti;
var Zo, er;
const oi = [
    "autoComplete",
    "autoHighlight",
    "autoSelect",
    "blurOnSelect",
    "ChipProps",
    "className",
    "clearIcon",
    "clearOnBlur",
    "clearOnEscape",
    "clearText",
    "closeText",
    "componentsProps",
    "defaultValue",
    "disableClearable",
    "disableCloseOnSelect",
    "disabled",
    "disabledItemsFocusable",
    "disableListWrap",
    "disablePortal",
    "filterOptions",
    "filterSelectedOptions",
    "forcePopupIcon",
    "freeSolo",
    "fullWidth",
    "getLimitTagsText",
    "getOptionDisabled",
    "getOptionLabel",
    "isOptionEqualToValue",
    "groupBy",
    "handleHomeEndKeys",
    "id",
    "includeInputInList",
    "inputValue",
    "limitTags",
    "ListboxComponent",
    "ListboxProps",
    "loading",
    "loadingText",
    "multiple",
    "noOptionsText",
    "onChange",
    "onClose",
    "onHighlightChange",
    "onInputChange",
    "onOpen",
    "open",
    "openOnFocus",
    "openText",
    "options",
    "PaperComponent",
    "PopperComponent",
    "popupIcon",
    "readOnly",
    "renderGroup",
    "renderInput",
    "renderOption",
    "renderTags",
    "selectOnFocus",
    "size",
    "slotProps",
    "value",
  ],
  ri = (e) => {
    const {
        classes: o,
        disablePortal: r,
        focused: i,
        fullWidth: u,
        hasClearIcon: p,
        hasPopupIcon: c,
        inputFocused: s,
        popupOpen: n,
        size: f,
      } = e,
      x = {
        root: ["root", i && "focused", u && "fullWidth", p && "hasClearIcon", c && "hasPopupIcon"],
        inputRoot: ["inputRoot"],
        input: ["input", s && "inputFocused"],
        tag: ["tag", `tagSize${X(f)}`],
        endAdornment: ["endAdornment"],
        clearIndicator: ["clearIndicator"],
        popupIndicator: ["popupIndicator", n && "popupIndicatorOpen"],
        popper: ["popper", r && "popperDisablePortal"],
        paper: ["paper"],
        listbox: ["listbox"],
        loading: ["loading"],
        noOptions: ["noOptions"],
        option: ["option"],
        groupLabel: ["groupLabel"],
        groupUl: ["groupUl"],
      };
    return Xe(x, ei, o);
  },
  ni = se("div", {
    name: "MuiAutocomplete",
    slot: "Root",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e,
        { fullWidth: i, hasClearIcon: u, hasPopupIcon: p, inputFocused: c, size: s } = r;
      return [
        { [`& .${ee.tag}`]: o.tag },
        { [`& .${ee.tag}`]: o[`tagSize${X(s)}`] },
        { [`& .${ee.inputRoot}`]: o.inputRoot },
        { [`& .${ee.input}`]: o.input },
        { [`& .${ee.input}`]: c && o.inputFocused },
        o.root,
        i && o.fullWidth,
        p && o.hasPopupIcon,
        u && o.hasClearIcon,
      ];
    },
  })(({ ownerState: e }) =>
    R(
      {
        [`&.${ee.focused} .${ee.clearIndicator}`]: { visibility: "visible" },
        "@media (pointer: fine)": { [`&:hover .${ee.clearIndicator}`]: { visibility: "visible" } },
      },
      e.fullWidth && { width: "100%" },
      {
        [`& .${ee.tag}`]: R(
          { margin: 3, maxWidth: "calc(100% - 6px)" },
          e.size === "small" && { margin: 2, maxWidth: "calc(100% - 4px)" },
        ),
        [`& .${ee.inputRoot}`]: {
          flexWrap: "wrap",
          [`.${ee.hasPopupIcon}&, .${ee.hasClearIcon}&`]: { paddingRight: 26 + 4 },
          [`.${ee.hasPopupIcon}.${ee.hasClearIcon}&`]: { paddingRight: 52 + 4 },
          [`& .${ee.input}`]: { width: 0, minWidth: 30 },
        },
        [`& .${Zt.root}`]: {
          paddingBottom: 1,
          "& .MuiInput-input": { padding: "4px 4px 4px 0px" },
        },
        [`& .${Zt.root}.${pt.sizeSmall}`]: { [`& .${Zt.input}`]: { padding: "2px 4px 3px 0" } },
        [`& .${Wo.root}`]: {
          padding: 9,
          [`.${ee.hasPopupIcon}&, .${ee.hasClearIcon}&`]: { paddingRight: 26 + 4 + 9 },
          [`.${ee.hasPopupIcon}.${ee.hasClearIcon}&`]: { paddingRight: 52 + 4 + 9 },
          [`& .${ee.input}`]: { padding: "7.5px 4px 7.5px 6px" },
          [`& .${ee.endAdornment}`]: { right: 9 },
        },
        [`& .${Wo.root}.${pt.sizeSmall}`]: {
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 6,
          [`& .${ee.input}`]: { padding: "2.5px 4px 2.5px 6px" },
        },
        [`& .${vt.root}`]: {
          paddingTop: 19,
          paddingLeft: 8,
          [`.${ee.hasPopupIcon}&, .${ee.hasClearIcon}&`]: { paddingRight: 26 + 4 + 9 },
          [`.${ee.hasPopupIcon}.${ee.hasClearIcon}&`]: { paddingRight: 52 + 4 + 9 },
          [`& .${vt.input}`]: { padding: "7px 4px" },
          [`& .${ee.endAdornment}`]: { right: 9 },
        },
        [`& .${vt.root}.${pt.sizeSmall}`]: {
          paddingBottom: 1,
          [`& .${vt.input}`]: { padding: "2.5px 4px" },
        },
        [`& .${pt.hiddenLabel}`]: { paddingTop: 8 },
        [`& .${vt.root}.${pt.hiddenLabel}`]: {
          paddingTop: 0,
          paddingBottom: 0,
          [`& .${ee.input}`]: { paddingTop: 16, paddingBottom: 17 },
        },
        [`& .${vt.root}.${pt.hiddenLabel}.${pt.sizeSmall}`]: {
          [`& .${ee.input}`]: { paddingTop: 8, paddingBottom: 9 },
        },
        [`& .${ee.input}`]: R(
          { flexGrow: 1, textOverflow: "ellipsis", opacity: 0 },
          e.inputFocused && { opacity: 1 },
        ),
      },
    ),
  ),
  ii = se("div", {
    name: "MuiAutocomplete",
    slot: "EndAdornment",
    overridesResolver: (e, o) => o.endAdornment,
  })({ position: "absolute", right: 0, top: "calc(50% - 14px)" }),
  si = se(jr, {
    name: "MuiAutocomplete",
    slot: "ClearIndicator",
    overridesResolver: (e, o) => o.clearIndicator,
  })({ marginRight: -2, padding: 4, visibility: "hidden" }),
  li = se(jr, {
    name: "MuiAutocomplete",
    slot: "PopupIndicator",
    overridesResolver: ({ ownerState: e }, o) =>
      R({}, o.popupIndicator, e.popupOpen && o.popupIndicatorOpen),
  })(({ ownerState: e }) =>
    R({ padding: 2, marginRight: -2 }, e.popupOpen && { transform: "rotate(180deg)" }),
  ),
  ai = se(Ir, {
    name: "MuiAutocomplete",
    slot: "Popper",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [
        { [`& .${ee.option}`]: o.option },
        o.popper,
        r.disablePortal && o.popperDisablePortal,
      ];
    },
  })(({ theme: e, ownerState: o }) =>
    R({ zIndex: (e.vars || e).zIndex.modal }, o.disablePortal && { position: "absolute" }),
  ),
  ci = se(vo, { name: "MuiAutocomplete", slot: "Paper", overridesResolver: (e, o) => o.paper })(
    ({ theme: e }) => R({}, e.typography.body1, { overflow: "auto" }),
  ),
  di = se("div", {
    name: "MuiAutocomplete",
    slot: "Loading",
    overridesResolver: (e, o) => o.loading,
  })(({ theme: e }) => ({ color: (e.vars || e).palette.text.secondary, padding: "14px 16px" })),
  ui = se("div", {
    name: "MuiAutocomplete",
    slot: "NoOptions",
    overridesResolver: (e, o) => o.noOptions,
  })(({ theme: e }) => ({ color: (e.vars || e).palette.text.secondary, padding: "14px 16px" })),
  pi = se("div", {
    name: "MuiAutocomplete",
    slot: "Listbox",
    overridesResolver: (e, o) => o.listbox,
  })(({ theme: e }) => ({
    listStyle: "none",
    margin: 0,
    padding: "8px 0",
    maxHeight: "40vh",
    overflow: "auto",
    position: "relative",
    [`& .${ee.option}`]: {
      minHeight: 48,
      display: "flex",
      overflow: "hidden",
      justifyContent: "flex-start",
      alignItems: "center",
      cursor: "pointer",
      paddingTop: 6,
      boxSizing: "border-box",
      outline: "0",
      WebkitTapHighlightColor: "transparent",
      paddingBottom: 6,
      paddingLeft: 16,
      paddingRight: 16,
      [e.breakpoints.up("sm")]: { minHeight: "auto" },
      [`&.${ee.focused}`]: {
        backgroundColor: (e.vars || e).palette.action.hover,
        "@media (hover: none)": { backgroundColor: "transparent" },
      },
      '&[aria-disabled="true"]': {
        opacity: (e.vars || e).palette.action.disabledOpacity,
        pointerEvents: "none",
      },
      [`&.${ee.focusVisible}`]: { backgroundColor: (e.vars || e).palette.action.focus },
      '&[aria-selected="true"]': {
        backgroundColor: e.vars
          ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`
          : we(e.palette.primary.main, e.palette.action.selectedOpacity),
        [`&.${ee.focused}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
            : we(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.hoverOpacity,
              ),
          "@media (hover: none)": { backgroundColor: (e.vars || e).palette.action.selected },
        },
        [`&.${ee.focusVisible}`]: {
          backgroundColor: e.vars
            ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`
            : we(
                e.palette.primary.main,
                e.palette.action.selectedOpacity + e.palette.action.focusOpacity,
              ),
        },
      },
    },
  })),
  fi = se(Wn, {
    name: "MuiAutocomplete",
    slot: "GroupLabel",
    overridesResolver: (e, o) => o.groupLabel,
  })(({ theme: e }) => ({ backgroundColor: (e.vars || e).palette.background.paper, top: -8 })),
  xi = se("ul", {
    name: "MuiAutocomplete",
    slot: "GroupUl",
    overridesResolver: (e, o) => o.groupUl,
  })({ padding: 0, [`& .${ee.option}`]: { paddingLeft: 24 } }),
  hi = d.forwardRef(function (o, r) {
    var i, u, p, c;
    const s = Ke({ props: o, name: "MuiAutocomplete" }),
      {
        autoComplete: n = !1,
        autoHighlight: f = !1,
        autoSelect: x = !1,
        blurOnSelect: h = !1,
        ChipProps: b,
        className: v,
        clearIcon: j = Zo || (Zo = t.jsx(Ln, { fontSize: "small" })),
        clearOnBlur: k = !s.freeSolo,
        clearOnEscape: w = !1,
        clearText: O = "Clear",
        closeText: D = "Close",
        componentsProps: _ = {},
        defaultValue: N = s.multiple ? [] : null,
        disableClearable: V = !1,
        disableCloseOnSelect: $ = !1,
        disabled: S = !1,
        disabledItemsFocusable: G = !1,
        disableListWrap: A = !1,
        disablePortal: C = !1,
        filterSelectedOptions: z = !1,
        forcePopupIcon: M = "auto",
        freeSolo: W = !1,
        fullWidth: E = !1,
        getLimitTagsText: B = (de) => `+${de}`,
        getOptionLabel: ae = (de) => {
          var _e;
          return (_e = de.label) != null ? _e : de;
        },
        groupBy: te,
        handleHomeEndKeys: L = !s.freeSolo,
        includeInputInList: P = !1,
        limitTags: fe = -1,
        ListboxComponent: Ae = "ul",
        ListboxProps: T,
        loading: U = !1,
        loadingText: q = "Loading…",
        multiple: oe = !1,
        noOptionsText: ce = "No options",
        openOnFocus: ne = !1,
        openText: me = "Open",
        PaperComponent: Q = vo,
        PopperComponent: ie = Ir,
        popupIcon: xe = er || (er = t.jsx(Qr, {})),
        readOnly: Te = !1,
        renderGroup: et,
        renderInput: je,
        renderOption: Y,
        renderTags: it,
        selectOnFocus: he = !s.freeSolo,
        size: Qe = "medium",
        slotProps: We = {},
      } = s,
      dt = Pe(s, oi),
      {
        getRootProps: Ee,
        getInputProps: Le,
        getInputLabelProps: ut,
        getPopupIndicatorProps: st,
        getClearProps: mt,
        getTagProps: bt,
        getListboxProps: Ie,
        getOptionProps: I,
        value: H,
        dirty: J,
        id: Z,
        popupOpen: be,
        focused: ye,
        focusedTag: ke,
        anchorEl: Ge,
        setAnchorEl: wt,
        inputValue: Ut,
        groupedOptions: qe,
      } = Dn(R({}, s, { componentName: "Autocomplete" })),
      tt = !V && !S && J && !Te,
      Je = (!W || M === !0) && M !== !1,
      ze = R({}, s, {
        disablePortal: C,
        focused: ye,
        fullWidth: E,
        hasClearIcon: tt,
        hasPopupIcon: Je,
        inputFocused: ke === -1,
        popupOpen: be,
        size: Qe,
      }),
      ve = ri(ze);
    let Ye;
    if (oe && H.length > 0) {
      const de = (_e) => R({ className: ve.tag, disabled: S }, bt(_e));
      it
        ? (Ye = it(H, de, ze))
        : (Ye = H.map((_e, lt) => t.jsx(Zn, R({ label: ae(_e), size: Qe }, de({ index: lt }), b))));
    }
    if (fe > -1 && Array.isArray(Ye)) {
      const de = Ye.length - fe;
      !ye &&
        de > 0 &&
        ((Ye = Ye.splice(0, fe)),
        Ye.push(t.jsx("span", { className: ve.tag, children: B(de) }, Ye.length)));
    }
    const Nt =
        et ||
        ((de) =>
          t.jsxs(
            "li",
            {
              children: [
                t.jsx(fi, {
                  className: ve.groupLabel,
                  ownerState: ze,
                  component: "div",
                  children: de.group,
                }),
                t.jsx(xi, { className: ve.groupUl, ownerState: ze, children: de.children }),
              ],
            },
            de.key,
          )),
      Xt = Y || ((de, _e) => t.jsx("li", R({}, de, { children: ae(_e) }))),
      kt = (de, _e) => {
        const lt = I({ option: de, index: _e });
        return Xt(R({}, lt, { className: ve.option }), de, {
          selected: lt["aria-selected"],
          index: _e,
          inputValue: Ut,
        });
      },
      zt = (i = We.clearIndicator) != null ? i : _.clearIndicator,
      Rt = (u = We.paper) != null ? u : _.paper,
      It = (p = We.popper) != null ? p : _.popper,
      $t = (c = We.popupIndicator) != null ? c : _.popupIndicator;
    return t.jsxs(d.Fragment, {
      children: [
        t.jsx(
          ni,
          R({ ref: r, className: ue(ve.root, v), ownerState: ze }, Ee(dt), {
            children: je({
              id: Z,
              disabled: S,
              fullWidth: !0,
              size: Qe === "small" ? "small" : void 0,
              InputLabelProps: ut(),
              InputProps: R(
                { ref: wt, className: ve.inputRoot, startAdornment: Ye },
                (tt || Je) && {
                  endAdornment: t.jsxs(ii, {
                    className: ve.endAdornment,
                    ownerState: ze,
                    children: [
                      tt
                        ? t.jsx(
                            si,
                            R({}, mt(), { "aria-label": O, title: O, ownerState: ze }, zt, {
                              className: ue(ve.clearIndicator, zt == null ? void 0 : zt.className),
                              children: j,
                            }),
                          )
                        : null,
                      Je
                        ? t.jsx(
                            li,
                            R(
                              {},
                              st(),
                              {
                                disabled: S,
                                "aria-label": be ? D : me,
                                title: be ? D : me,
                                ownerState: ze,
                              },
                              $t,
                              {
                                className: ue(
                                  ve.popupIndicator,
                                  $t == null ? void 0 : $t.className,
                                ),
                                children: xe,
                              },
                            ),
                          )
                        : null,
                    ],
                  }),
                },
              ),
              inputProps: R({ className: ve.input, disabled: S, readOnly: Te }, Le()),
            }),
          }),
        ),
        Ge
          ? t.jsx(
              ai,
              R(
                {
                  as: ie,
                  disablePortal: C,
                  style: { width: Ge ? Ge.clientWidth : null },
                  ownerState: ze,
                  role: "presentation",
                  anchorEl: Ge,
                  open: be,
                },
                It,
                {
                  className: ue(ve.popper, It == null ? void 0 : It.className),
                  children: t.jsxs(
                    ci,
                    R({ ownerState: ze, as: Q }, Rt, {
                      className: ue(ve.paper, Rt == null ? void 0 : Rt.className),
                      children: [
                        U && qe.length === 0
                          ? t.jsx(di, { className: ve.loading, ownerState: ze, children: q })
                          : null,
                        qe.length === 0 && !W && !U
                          ? t.jsx(ui, {
                              className: ve.noOptions,
                              ownerState: ze,
                              role: "presentation",
                              onMouseDown: (de) => {
                                de.preventDefault();
                              },
                              children: ce,
                            })
                          : null,
                        qe.length > 0
                          ? t.jsx(
                              pi,
                              R({ as: Ae, className: ve.listbox, ownerState: ze }, Ie(), T, {
                                children: qe.map((de, _e) =>
                                  te
                                    ? Nt({
                                        key: de.key,
                                        group: de.group,
                                        children: de.options.map((lt, Qt) => kt(lt, de.index + Qt)),
                                      })
                                    : kt(de, _e),
                                ),
                              }),
                            )
                          : null,
                      ],
                    }),
                  ),
                },
              ),
            )
          : null,
      ],
    });
  }),
  Ar = hi;
function gi(e) {
  return Ve("MuiCircularProgress", e);
}
Ue("MuiCircularProgress", [
  "root",
  "determinate",
  "indeterminate",
  "colorPrimary",
  "colorSecondary",
  "svg",
  "circle",
  "circleDeterminate",
  "circleIndeterminate",
  "circleDisableShrink",
]);
const mi = [
  "className",
  "color",
  "disableShrink",
  "size",
  "style",
  "thickness",
  "value",
  "variant",
];
let Vt = (e) => e,
  tr,
  or,
  rr,
  nr;
const at = 44,
  bi = Sr(
    tr ||
      (tr = Vt`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`),
  ),
  vi = Sr(
    or ||
      (or = Vt`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`),
  ),
  yi = (e) => {
    const { classes: o, variant: r, color: i, disableShrink: u } = e,
      p = {
        root: ["root", r, `color${X(i)}`],
        svg: ["svg"],
        circle: ["circle", `circle${X(r)}`, u && "circleDisableShrink"],
      };
    return Xe(p, gi, o);
  },
  Ci = se("span", {
    name: "MuiCircularProgress",
    slot: "Root",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [o.root, o[r.variant], o[`color${X(r.color)}`]];
    },
  })(
    ({ ownerState: e, theme: o }) =>
      R(
        { display: "inline-block" },
        e.variant === "determinate" && { transition: o.transitions.create("transform") },
        e.color !== "inherit" && { color: (o.vars || o).palette[e.color].main },
      ),
    ({ ownerState: e }) =>
      e.variant === "indeterminate" &&
      wr(
        rr ||
          (rr = Vt`
      animation: ${0} 1.4s linear infinite;
    `),
        bi,
      ),
  ),
  ji = se("svg", { name: "MuiCircularProgress", slot: "Svg", overridesResolver: (e, o) => o.svg })({
    display: "block",
  }),
  Si = se("circle", {
    name: "MuiCircularProgress",
    slot: "Circle",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [o.circle, o[`circle${X(r.variant)}`], r.disableShrink && o.circleDisableShrink];
    },
  })(
    ({ ownerState: e, theme: o }) =>
      R(
        { stroke: "currentColor" },
        e.variant === "determinate" && { transition: o.transitions.create("stroke-dashoffset") },
        e.variant === "indeterminate" && { strokeDasharray: "80px, 200px", strokeDashoffset: 0 },
      ),
    ({ ownerState: e }) =>
      e.variant === "indeterminate" &&
      !e.disableShrink &&
      wr(
        nr ||
          (nr = Vt`
      animation: ${0} 1.4s ease-in-out infinite;
    `),
        vi,
      ),
  ),
  wi = d.forwardRef(function (o, r) {
    const i = Ke({ props: o, name: "MuiCircularProgress" }),
      {
        className: u,
        color: p = "primary",
        disableShrink: c = !1,
        size: s = 40,
        style: n,
        thickness: f = 3.6,
        value: x = 0,
        variant: h = "indeterminate",
      } = i,
      b = Pe(i, mi),
      v = R({}, i, { color: p, disableShrink: c, size: s, thickness: f, value: x, variant: h }),
      j = yi(v),
      k = {},
      w = {},
      O = {};
    if (h === "determinate") {
      const D = 2 * Math.PI * ((at - f) / 2);
      (k.strokeDasharray = D.toFixed(3)),
        (O["aria-valuenow"] = Math.round(x)),
        (k.strokeDashoffset = `${(((100 - x) / 100) * D).toFixed(3)}px`),
        (w.transform = "rotate(-90deg)");
    }
    return t.jsx(
      Ci,
      R(
        {
          className: ue(j.root, u),
          style: R({ width: s, height: s }, w, n),
          ownerState: v,
          ref: r,
          role: "progressbar",
        },
        O,
        b,
        {
          children: t.jsx(ji, {
            className: j.svg,
            ownerState: v,
            viewBox: `${at / 2} ${at / 2} ${at} ${at}`,
            children: t.jsx(Si, {
              className: j.circle,
              style: k,
              ownerState: v,
              cx: at,
              cy: at,
              r: (at - f) / 2,
              fill: "none",
              strokeWidth: f,
            }),
          }),
        },
      ),
    );
  }),
  ki = wi,
  zi = [
    "addEndListener",
    "appear",
    "children",
    "container",
    "direction",
    "easing",
    "in",
    "onEnter",
    "onEntered",
    "onEntering",
    "onExit",
    "onExited",
    "onExiting",
    "style",
    "timeout",
    "TransitionComponent",
  ];
function Ri(e, o, r) {
  const i = o.getBoundingClientRect(),
    u = r && r.getBoundingClientRect(),
    p = Yt(o);
  let c;
  if (o.fakeTransform) c = o.fakeTransform;
  else {
    const f = p.getComputedStyle(o);
    c = f.getPropertyValue("-webkit-transform") || f.getPropertyValue("transform");
  }
  let s = 0,
    n = 0;
  if (c && c !== "none" && typeof c == "string") {
    const f = c.split("(")[1].split(")")[0].split(",");
    (s = parseInt(f[4], 10)), (n = parseInt(f[5], 10));
  }
  return e === "left"
    ? u
      ? `translateX(${u.right + s - i.left}px)`
      : `translateX(${p.innerWidth + s - i.left}px)`
    : e === "right"
    ? u
      ? `translateX(-${i.right - u.left - s}px)`
      : `translateX(-${i.left + i.width - s}px)`
    : e === "up"
    ? u
      ? `translateY(${u.bottom + n - i.top}px)`
      : `translateY(${p.innerHeight + n - i.top}px)`
    : u
    ? `translateY(-${i.top - u.top + i.height - n}px)`
    : `translateY(-${i.top + i.height - n}px)`;
}
function Ii(e) {
  return typeof e == "function" ? e() : e;
}
function Bt(e, o, r) {
  const i = Ii(r),
    u = Ri(e, o, i);
  u && ((o.style.webkitTransform = u), (o.style.transform = u));
}
const $i = d.forwardRef(function (o, r) {
    const i = Re(),
      u = { enter: i.transitions.easing.easeOut, exit: i.transitions.easing.sharp },
      p = {
        enter: i.transitions.duration.enteringScreen,
        exit: i.transitions.duration.leavingScreen,
      },
      {
        addEndListener: c,
        appear: s = !0,
        children: n,
        container: f,
        direction: x = "down",
        easing: h = u,
        in: b,
        onEnter: v,
        onEntered: j,
        onEntering: k,
        onExit: w,
        onExited: O,
        onExiting: D,
        style: _,
        timeout: N = p,
        TransitionComponent: V = Jr,
      } = o,
      $ = Pe(o, zi),
      S = d.useRef(null),
      G = bo(n.ref, S, r),
      A = (L) => (P) => {
        L && (P === void 0 ? L(S.current) : L(S.current, P));
      },
      C = A((L, P) => {
        Bt(x, L, f), Zr(L), v && v(L, P);
      }),
      z = A((L, P) => {
        const fe = Go({ timeout: N, style: _, easing: h }, { mode: "enter" });
        (L.style.webkitTransition = i.transitions.create("-webkit-transform", R({}, fe))),
          (L.style.transition = i.transitions.create("transform", R({}, fe))),
          (L.style.webkitTransform = "none"),
          (L.style.transform = "none"),
          k && k(L, P);
      }),
      M = A(j),
      W = A(D),
      E = A((L) => {
        const P = Go({ timeout: N, style: _, easing: h }, { mode: "exit" });
        (L.style.webkitTransition = i.transitions.create("-webkit-transform", P)),
          (L.style.transition = i.transitions.create("transform", P)),
          Bt(x, L, f),
          w && w(L);
      }),
      B = A((L) => {
        (L.style.webkitTransition = ""), (L.style.transition = ""), O && O(L);
      }),
      ae = (L) => {
        c && c(S.current, L);
      },
      te = d.useCallback(() => {
        S.current && Bt(x, S.current, f);
      }, [x, f]);
    return (
      d.useEffect(() => {
        if (b || x === "down" || x === "right") return;
        const L = Wt(() => {
            S.current && Bt(x, S.current, f);
          }),
          P = Yt(S.current);
        return (
          P.addEventListener("resize", L),
          () => {
            L.clear(), P.removeEventListener("resize", L);
          }
        );
      }, [x, b, f]),
      d.useEffect(() => {
        b || te();
      }, [b, te]),
      t.jsx(
        V,
        R(
          {
            nodeRef: S,
            onEnter: C,
            onEntered: M,
            onEntering: z,
            onExit: E,
            onExited: B,
            onExiting: W,
            addEndListener: ae,
            appear: s,
            in: b,
            timeout: N,
          },
          $,
          {
            children: (L, P) =>
              d.cloneElement(
                n,
                R(
                  {
                    ref: G,
                    style: R(
                      { visibility: L === "exited" && !b ? "hidden" : void 0 },
                      _,
                      n.props.style,
                    ),
                  },
                  P,
                ),
              ),
          },
        ),
      )
    );
  }),
  Ti = $i;
function _i(e) {
  return Ve("MuiDrawer", e);
}
Ue("MuiDrawer", [
  "root",
  "docked",
  "paper",
  "paperAnchorLeft",
  "paperAnchorRight",
  "paperAnchorTop",
  "paperAnchorBottom",
  "paperAnchorDockedLeft",
  "paperAnchorDockedRight",
  "paperAnchorDockedTop",
  "paperAnchorDockedBottom",
  "modal",
]);
const Ai = ["BackdropProps"],
  Oi = [
    "anchor",
    "BackdropProps",
    "children",
    "className",
    "elevation",
    "hideBackdrop",
    "ModalProps",
    "onClose",
    "open",
    "PaperProps",
    "SlideProps",
    "TransitionComponent",
    "transitionDuration",
    "variant",
  ],
  Or = (e, o) => {
    const { ownerState: r } = e;
    return [o.root, (r.variant === "permanent" || r.variant === "persistent") && o.docked, o.modal];
  },
  Pi = (e) => {
    const { classes: o, anchor: r, variant: i } = e,
      u = {
        root: ["root"],
        docked: [(i === "permanent" || i === "persistent") && "docked"],
        modal: ["modal"],
        paper: ["paper", `paperAnchor${X(r)}`, i !== "temporary" && `paperAnchorDocked${X(r)}`],
      };
    return Xe(u, _i, o);
  },
  Ei = se(en, { name: "MuiDrawer", slot: "Root", overridesResolver: Or })(({ theme: e }) => ({
    zIndex: (e.vars || e).zIndex.drawer,
  })),
  ir = se("div", {
    shouldForwardProp: kr,
    name: "MuiDrawer",
    slot: "Docked",
    skipVariantsResolver: !1,
    overridesResolver: Or,
  })({ flex: "0 0 auto" }),
  Ni = se(vo, {
    name: "MuiDrawer",
    slot: "Paper",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [
        o.paper,
        o[`paperAnchor${X(r.anchor)}`],
        r.variant !== "temporary" && o[`paperAnchorDocked${X(r.anchor)}`],
      ];
    },
  })(({ theme: e, ownerState: o }) =>
    R(
      {
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flex: "1 0 auto",
        zIndex: (e.vars || e).zIndex.drawer,
        WebkitOverflowScrolling: "touch",
        position: "fixed",
        top: 0,
        outline: 0,
      },
      o.anchor === "left" && { left: 0 },
      o.anchor === "top" && { top: 0, left: 0, right: 0, height: "auto", maxHeight: "100%" },
      o.anchor === "right" && { right: 0 },
      o.anchor === "bottom" && {
        top: "auto",
        left: 0,
        bottom: 0,
        right: 0,
        height: "auto",
        maxHeight: "100%",
      },
      o.anchor === "left" &&
        o.variant !== "temporary" && { borderRight: `1px solid ${(e.vars || e).palette.divider}` },
      o.anchor === "top" &&
        o.variant !== "temporary" && { borderBottom: `1px solid ${(e.vars || e).palette.divider}` },
      o.anchor === "right" &&
        o.variant !== "temporary" && { borderLeft: `1px solid ${(e.vars || e).palette.divider}` },
      o.anchor === "bottom" &&
        o.variant !== "temporary" && { borderTop: `1px solid ${(e.vars || e).palette.divider}` },
    ),
  ),
  Pr = { left: "right", right: "left", top: "down", bottom: "up" };
function Bi(e) {
  return ["left", "right"].indexOf(e) !== -1;
}
function Di(e, o) {
  return e.direction === "rtl" && Bi(o) ? Pr[o] : o;
}
const Li = d.forwardRef(function (o, r) {
    const i = Ke({ props: o, name: "MuiDrawer" }),
      u = Re(),
      p = {
        enter: u.transitions.duration.enteringScreen,
        exit: u.transitions.duration.leavingScreen,
      },
      {
        anchor: c = "left",
        BackdropProps: s,
        children: n,
        className: f,
        elevation: x = 16,
        hideBackdrop: h = !1,
        ModalProps: { BackdropProps: b } = {},
        onClose: v,
        open: j = !1,
        PaperProps: k = {},
        SlideProps: w,
        TransitionComponent: O = Ti,
        transitionDuration: D = p,
        variant: _ = "temporary",
      } = i,
      N = Pe(i.ModalProps, Ai),
      V = Pe(i, Oi),
      $ = d.useRef(!1);
    d.useEffect(() => {
      $.current = !0;
    }, []);
    const S = Di(u, c),
      A = R({}, i, { anchor: c, elevation: x, open: j, variant: _ }, V),
      C = Pi(A),
      z = t.jsx(
        Ni,
        R({ elevation: _ === "temporary" ? x : 0, square: !0 }, k, {
          className: ue(C.paper, k.className),
          ownerState: A,
          children: n,
        }),
      );
    if (_ === "permanent")
      return t.jsx(
        ir,
        R({ className: ue(C.root, C.docked, f), ownerState: A, ref: r }, V, { children: z }),
      );
    const M = t.jsx(
      O,
      R({ in: j, direction: Pr[S], timeout: D, appear: $.current }, w, { children: z }),
    );
    return _ === "persistent"
      ? t.jsx(
          ir,
          R({ className: ue(C.root, C.docked, f), ownerState: A, ref: r }, V, { children: M }),
        )
      : t.jsx(
          Ei,
          R(
            {
              BackdropProps: R({}, s, b, { transitionDuration: D }),
              className: ue(C.root, C.modal, f),
              open: j,
              ownerState: A,
              onClose: v,
              hideBackdrop: h,
              ref: r,
            },
            V,
            N,
            { children: M },
          ),
        );
  }),
  qi = Li;
function Mi(e, o, r, i, u) {
  const [p, c] = d.useState(() => (u && r ? r(e).matches : i ? i(e).matches : o));
  return (
    rn(() => {
      let s = !0;
      if (!r) return;
      const n = r(e),
        f = () => {
          s && c(n.matches);
        };
      return (
        f(),
        n.addListener(f),
        () => {
          (s = !1), n.removeListener(f);
        }
      );
    }, [e, r]),
    p
  );
}
const Er = nn["useSyncExternalStore"];
function Hi(e, o, r, i, u) {
  const p = d.useCallback(() => o, [o]),
    c = d.useMemo(() => {
      if (u && r) return () => r(e).matches;
      if (i !== null) {
        const { matches: x } = i(e);
        return () => x;
      }
      return p;
    }, [p, e, i, u, r]),
    [s, n] = d.useMemo(() => {
      if (r === null) return [p, () => () => {}];
      const x = r(e);
      return [
        () => x.matches,
        (h) => (
          x.addListener(h),
          () => {
            x.removeListener(h);
          }
        ),
      ];
    }, [p, r, e]);
  return Er(n, s, c);
}
function Fi(e, o = {}) {
  const r = tn(),
    i = typeof window < "u" && typeof window.matchMedia < "u",
    {
      defaultMatches: u = !1,
      matchMedia: p = i ? window.matchMedia : null,
      ssrMatchMedia: c = null,
      noSsr: s = !1,
    } = on({ name: "MuiUseMediaQuery", props: o, theme: r });
  let n = typeof e == "function" ? e(r) : e;
  return (n = n.replace(/^@media( ?)/m, "")), (Er !== void 0 ? Hi : Mi)(n, u, p, c, s);
}
const Wi = jt(
    t.jsx("path", {
      d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
    }),
    "RadioButtonUnchecked",
  ),
  Gi = jt(
    t.jsx("path", {
      d: "M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z",
    }),
    "RadioButtonChecked",
  ),
  Yi = se("span")({ position: "relative", display: "flex" }),
  Vi = se(Wi)({ transform: "scale(1)" }),
  Ui = se(Gi)(({ theme: e, ownerState: o }) =>
    R(
      {
        left: 0,
        position: "absolute",
        transform: "scale(0)",
        transition: e.transitions.create("transform", {
          easing: e.transitions.easing.easeIn,
          duration: e.transitions.duration.shortest,
        }),
      },
      o.checked && {
        transform: "scale(1)",
        transition: e.transitions.create("transform", {
          easing: e.transitions.easing.easeOut,
          duration: e.transitions.duration.shortest,
        }),
      },
    ),
  );
function Nr(e) {
  const { checked: o = !1, classes: r = {}, fontSize: i } = e,
    u = R({}, e, { checked: o });
  return t.jsxs(Yi, {
    className: r.root,
    ownerState: u,
    children: [
      t.jsx(Vi, { fontSize: i, className: r.background, ownerState: u }),
      t.jsx(Ui, { fontSize: i, className: r.dot, ownerState: u }),
    ],
  });
}
const Ki = d.createContext(void 0),
  Br = Ki;
function Xi() {
  return d.useContext(Br);
}
function Qi(e) {
  return Ve("MuiRadio", e);
}
const Ji = Ue("MuiRadio", ["root", "checked", "disabled", "colorPrimary", "colorSecondary"]),
  sr = Ji,
  Zi = ["checked", "checkedIcon", "color", "icon", "name", "onChange", "size", "className"],
  es = (e) => {
    const { classes: o, color: r } = e,
      i = { root: ["root", `color${X(r)}`] };
    return R({}, o, Xe(i, Qi, o));
  },
  ts = se(Tn, {
    shouldForwardProp: (e) => kr(e) || e === "classes",
    name: "MuiRadio",
    slot: "Root",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [o.root, o[`color${X(r.color)}`]];
    },
  })(({ theme: e, ownerState: o }) =>
    R(
      { color: (e.vars || e).palette.text.secondary },
      !o.disableRipple && {
        "&:hover": {
          backgroundColor: e.vars
            ? `rgba(${
                o.color === "default"
                  ? e.vars.palette.action.activeChannel
                  : e.vars.palette[o.color].mainChannel
              } / ${e.vars.palette.action.hoverOpacity})`
            : we(
                o.color === "default" ? e.palette.action.active : e.palette[o.color].main,
                e.palette.action.hoverOpacity,
              ),
          "@media (hover: none)": { backgroundColor: "transparent" },
        },
      },
      o.color !== "default" && {
        [`&.${sr.checked}`]: { color: (e.vars || e).palette[o.color].main },
      },
      { [`&.${sr.disabled}`]: { color: (e.vars || e).palette.action.disabled } },
    ),
  );
function os(e, o) {
  return typeof o == "object" && o !== null ? e === o : String(e) === String(o);
}
const lr = t.jsx(Nr, { checked: !0 }),
  ar = t.jsx(Nr, {}),
  rs = d.forwardRef(function (o, r) {
    var i, u;
    const p = Ke({ props: o, name: "MuiRadio" }),
      {
        checked: c,
        checkedIcon: s = lr,
        color: n = "primary",
        icon: f = ar,
        name: x,
        onChange: h,
        size: b = "medium",
        className: v,
      } = p,
      j = Pe(p, Zi),
      k = R({}, p, { color: n, size: b }),
      w = es(k),
      O = Xi();
    let D = c;
    const _ = sn(h, O && O.onChange);
    let N = x;
    return (
      O && (typeof D > "u" && (D = os(O.value, p.value)), typeof N > "u" && (N = O.name)),
      t.jsx(
        ts,
        R(
          {
            type: "radio",
            icon: d.cloneElement(f, { fontSize: (i = ar.props.fontSize) != null ? i : b }),
            checkedIcon: d.cloneElement(s, { fontSize: (u = lr.props.fontSize) != null ? u : b }),
            ownerState: k,
            classes: w,
            name: N,
            checked: D,
            onChange: _,
            ref: r,
            className: ue(w.root, v),
          },
          j,
        ),
      )
    );
  }),
  ro = rs,
  ns = ["actions", "children", "defaultValue", "name", "onChange", "value"],
  is = d.forwardRef(function (o, r) {
    const { actions: i, children: u, defaultValue: p, name: c, onChange: s, value: n } = o,
      f = Pe(o, ns),
      x = d.useRef(null),
      [h, b] = qt({ controlled: n, default: p, name: "RadioGroup" });
    d.useImperativeHandle(
      i,
      () => ({
        focus: () => {
          let w = x.current.querySelector("input:not(:disabled):checked");
          w || (w = x.current.querySelector("input:not(:disabled)")), w && w.focus();
        },
      }),
      [],
    );
    const v = bo(r, x),
      j = Cr(c),
      k = d.useMemo(
        () => ({
          name: j,
          onChange(w) {
            b(w.target.value), s && s(w, w.target.value);
          },
          value: h,
        }),
        [j, s, b, h],
      );
    return t.jsx(Br.Provider, {
      value: k,
      children: t.jsx(_n, R({ role: "radiogroup", ref: v }, f, { children: u })),
    });
  }),
  ss = is;
function ls(e) {
  return Ve("MuiTab", e);
}
const as = Ue("MuiTab", [
    "root",
    "labelIcon",
    "textColorInherit",
    "textColorPrimary",
    "textColorSecondary",
    "selected",
    "disabled",
    "fullWidth",
    "wrapped",
    "iconWrapper",
  ]),
  ft = as,
  cs = [
    "className",
    "disabled",
    "disableFocusRipple",
    "fullWidth",
    "icon",
    "iconPosition",
    "indicator",
    "label",
    "onChange",
    "onClick",
    "onFocus",
    "selected",
    "selectionFollowsFocus",
    "textColor",
    "value",
    "wrapped",
  ],
  ds = (e) => {
    const {
        classes: o,
        textColor: r,
        fullWidth: i,
        wrapped: u,
        icon: p,
        label: c,
        selected: s,
        disabled: n,
      } = e,
      f = {
        root: [
          "root",
          p && c && "labelIcon",
          `textColor${X(r)}`,
          i && "fullWidth",
          u && "wrapped",
          s && "selected",
          n && "disabled",
        ],
        iconWrapper: ["iconWrapper"],
      };
    return Xe(f, ls, o);
  },
  us = se(Ot, {
    name: "MuiTab",
    slot: "Root",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [
        o.root,
        r.label && r.icon && o.labelIcon,
        o[`textColor${X(r.textColor)}`],
        r.fullWidth && o.fullWidth,
        r.wrapped && o.wrapped,
      ];
    },
  })(({ theme: e, ownerState: o }) =>
    R(
      {},
      e.typography.button,
      {
        maxWidth: 360,
        minWidth: 90,
        position: "relative",
        minHeight: 48,
        flexShrink: 0,
        padding: "12px 16px",
        overflow: "hidden",
        whiteSpace: "normal",
        textAlign: "center",
      },
      o.label && {
        flexDirection: o.iconPosition === "top" || o.iconPosition === "bottom" ? "column" : "row",
      },
      { lineHeight: 1.25 },
      o.icon &&
        o.label && {
          minHeight: 72,
          paddingTop: 9,
          paddingBottom: 9,
          [`& > .${ft.iconWrapper}`]: R(
            {},
            o.iconPosition === "top" && { marginBottom: 6 },
            o.iconPosition === "bottom" && { marginTop: 6 },
            o.iconPosition === "start" && { marginRight: e.spacing(1) },
            o.iconPosition === "end" && { marginLeft: e.spacing(1) },
          ),
        },
      o.textColor === "inherit" && {
        color: "inherit",
        opacity: 0.6,
        [`&.${ft.selected}`]: { opacity: 1 },
        [`&.${ft.disabled}`]: { opacity: (e.vars || e).palette.action.disabledOpacity },
      },
      o.textColor === "primary" && {
        color: (e.vars || e).palette.text.secondary,
        [`&.${ft.selected}`]: { color: (e.vars || e).palette.primary.main },
        [`&.${ft.disabled}`]: { color: (e.vars || e).palette.text.disabled },
      },
      o.textColor === "secondary" && {
        color: (e.vars || e).palette.text.secondary,
        [`&.${ft.selected}`]: { color: (e.vars || e).palette.secondary.main },
        [`&.${ft.disabled}`]: { color: (e.vars || e).palette.text.disabled },
      },
      o.fullWidth && { flexShrink: 1, flexGrow: 1, flexBasis: 0, maxWidth: "none" },
      o.wrapped && { fontSize: e.typography.pxToRem(12) },
    ),
  ),
  ps = d.forwardRef(function (o, r) {
    const i = Ke({ props: o, name: "MuiTab" }),
      {
        className: u,
        disabled: p = !1,
        disableFocusRipple: c = !1,
        fullWidth: s,
        icon: n,
        iconPosition: f = "top",
        indicator: x,
        label: h,
        onChange: b,
        onClick: v,
        onFocus: j,
        selected: k,
        selectionFollowsFocus: w,
        textColor: O = "inherit",
        value: D,
        wrapped: _ = !1,
      } = i,
      N = Pe(i, cs),
      V = R({}, i, {
        disabled: p,
        disableFocusRipple: c,
        selected: k,
        icon: !!n,
        iconPosition: f,
        label: !!h,
        fullWidth: s,
        textColor: O,
        wrapped: _,
      }),
      $ = ds(V),
      S =
        n && h && d.isValidElement(n)
          ? d.cloneElement(n, { className: ue($.iconWrapper, n.props.className) })
          : n,
      G = (C) => {
        !k && b && b(C, D), v && v(C);
      },
      A = (C) => {
        w && !k && b && b(C, D), j && j(C);
      };
    return t.jsxs(
      us,
      R(
        {
          focusRipple: !c,
          className: ue($.root, u),
          ref: r,
          role: "tab",
          "aria-selected": k,
          disabled: p,
          onClick: G,
          onFocus: A,
          ownerState: V,
          tabIndex: k ? 0 : -1,
        },
        N,
        {
          children: [
            f === "top" || f === "start"
              ? t.jsxs(d.Fragment, { children: [S, h] })
              : t.jsxs(d.Fragment, { children: [h, S] }),
            x,
          ],
        },
      ),
    );
  }),
  Me = ps,
  fs = jt(
    t.jsx("path", { d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" }),
    "KeyboardArrowLeft",
  ),
  xs = jt(
    t.jsx("path", { d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" }),
    "KeyboardArrowRight",
  );
function hs(e) {
  return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2;
}
function gs(e, o, r, i = {}, u = () => {}) {
  const { ease: p = hs, duration: c = 300 } = i;
  let s = null;
  const n = o[e];
  let f = !1;
  const x = () => {
      f = !0;
    },
    h = (b) => {
      if (f) {
        u(new Error("Animation cancelled"));
        return;
      }
      s === null && (s = b);
      const v = Math.min(1, (b - s) / c);
      if (((o[e] = p(v) * (r - n) + n), v >= 1)) {
        requestAnimationFrame(() => {
          u(null);
        });
        return;
      }
      requestAnimationFrame(h);
    };
  return n === r
    ? (u(new Error("Element already at target position")), x)
    : (requestAnimationFrame(h), x);
}
const ms = ["onChange"],
  bs = { width: 99, height: 99, position: "absolute", top: -9999, overflow: "scroll" };
function vs(e) {
  const { onChange: o } = e,
    r = Pe(e, ms),
    i = d.useRef(),
    u = d.useRef(null),
    p = () => {
      i.current = u.current.offsetHeight - u.current.clientHeight;
    };
  return (
    d.useEffect(() => {
      const c = Wt(() => {
          const n = i.current;
          p(), n !== i.current && o(i.current);
        }),
        s = Yt(u.current);
      return (
        s.addEventListener("resize", c),
        () => {
          c.clear(), s.removeEventListener("resize", c);
        }
      );
    }, [o]),
    d.useEffect(() => {
      p(), o(i.current);
    }, [o]),
    t.jsx("div", R({ style: bs, ref: u }, r))
  );
}
function ys(e) {
  return Ve("MuiTabScrollButton", e);
}
const Cs = Ue("MuiTabScrollButton", ["root", "vertical", "horizontal", "disabled"]),
  js = Cs;
var cr, dr;
const Ss = ["className", "direction", "orientation", "disabled"],
  ws = (e) => {
    const { classes: o, orientation: r, disabled: i } = e;
    return Xe({ root: ["root", r, i && "disabled"] }, ys, o);
  },
  ks = se(Ot, {
    name: "MuiTabScrollButton",
    slot: "Root",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [o.root, r.orientation && o[r.orientation]];
    },
  })(({ ownerState: e }) =>
    R(
      { width: 40, flexShrink: 0, opacity: 0.8, [`&.${js.disabled}`]: { opacity: 0 } },
      e.orientation === "vertical" && {
        width: "100%",
        height: 40,
        "& svg": { transform: `rotate(${e.isRtl ? -90 : 90}deg)` },
      },
    ),
  ),
  zs = d.forwardRef(function (o, r) {
    const i = Ke({ props: o, name: "MuiTabScrollButton" }),
      { className: u, direction: p } = i,
      c = Pe(i, Ss),
      n = Re().direction === "rtl",
      f = R({ isRtl: n }, i),
      x = ws(f);
    return t.jsx(
      ks,
      R(
        {
          component: "div",
          className: ue(x.root, u),
          ref: r,
          role: null,
          ownerState: f,
          tabIndex: null,
        },
        c,
        {
          children:
            p === "left"
              ? cr || (cr = t.jsx(fs, { fontSize: "small" }))
              : dr || (dr = t.jsx(xs, { fontSize: "small" })),
        },
      ),
    );
  }),
  Rs = zs;
function Is(e) {
  return Ve("MuiTabs", e);
}
const $s = Ue("MuiTabs", [
    "root",
    "vertical",
    "flexContainer",
    "flexContainerVertical",
    "centered",
    "scroller",
    "fixed",
    "scrollableX",
    "scrollableY",
    "hideScrollbar",
    "scrollButtons",
    "scrollButtonsHideMobile",
    "indicator",
  ]),
  no = $s,
  Ts = [
    "aria-label",
    "aria-labelledby",
    "action",
    "centered",
    "children",
    "className",
    "component",
    "allowScrollButtonsMobile",
    "indicatorColor",
    "onChange",
    "orientation",
    "ScrollButtonComponent",
    "scrollButtons",
    "selectionFollowsFocus",
    "TabIndicatorProps",
    "TabScrollButtonProps",
    "textColor",
    "value",
    "variant",
    "visibleScrollbar",
  ],
  ur = (e, o) =>
    e === o ? e.firstChild : o && o.nextElementSibling ? o.nextElementSibling : e.firstChild,
  pr = (e, o) =>
    e === o ? e.lastChild : o && o.previousElementSibling ? o.previousElementSibling : e.lastChild,
  Dt = (e, o, r) => {
    let i = !1,
      u = r(e, o);
    for (; u; ) {
      if (u === e.firstChild) {
        if (i) return;
        i = !0;
      }
      const p = u.disabled || u.getAttribute("aria-disabled") === "true";
      if (!u.hasAttribute("tabindex") || p) u = r(e, u);
      else {
        u.focus();
        return;
      }
    }
  },
  _s = (e) => {
    const {
      vertical: o,
      fixed: r,
      hideScrollbar: i,
      scrollableX: u,
      scrollableY: p,
      centered: c,
      scrollButtonsHideMobile: s,
      classes: n,
    } = e;
    return Xe(
      {
        root: ["root", o && "vertical"],
        scroller: [
          "scroller",
          r && "fixed",
          i && "hideScrollbar",
          u && "scrollableX",
          p && "scrollableY",
        ],
        flexContainer: ["flexContainer", o && "flexContainerVertical", c && "centered"],
        indicator: ["indicator"],
        scrollButtons: ["scrollButtons", s && "scrollButtonsHideMobile"],
        scrollableX: [u && "scrollableX"],
        hideScrollbar: [i && "hideScrollbar"],
      },
      Is,
      n,
    );
  },
  As = se("div", {
    name: "MuiTabs",
    slot: "Root",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [
        { [`& .${no.scrollButtons}`]: o.scrollButtons },
        { [`& .${no.scrollButtons}`]: r.scrollButtonsHideMobile && o.scrollButtonsHideMobile },
        o.root,
        r.vertical && o.vertical,
      ];
    },
  })(({ ownerState: e, theme: o }) =>
    R(
      { overflow: "hidden", minHeight: 48, WebkitOverflowScrolling: "touch", display: "flex" },
      e.vertical && { flexDirection: "column" },
      e.scrollButtonsHideMobile && {
        [`& .${no.scrollButtons}`]: { [o.breakpoints.down("sm")]: { display: "none" } },
      },
    ),
  ),
  Os = se("div", {
    name: "MuiTabs",
    slot: "Scroller",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [
        o.scroller,
        r.fixed && o.fixed,
        r.hideScrollbar && o.hideScrollbar,
        r.scrollableX && o.scrollableX,
        r.scrollableY && o.scrollableY,
      ];
    },
  })(({ ownerState: e }) =>
    R(
      { position: "relative", display: "inline-block", flex: "1 1 auto", whiteSpace: "nowrap" },
      e.fixed && { overflowX: "hidden", width: "100%" },
      e.hideScrollbar && { scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } },
      e.scrollableX && { overflowX: "auto", overflowY: "hidden" },
      e.scrollableY && { overflowY: "auto", overflowX: "hidden" },
    ),
  ),
  Ps = se("div", {
    name: "MuiTabs",
    slot: "FlexContainer",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [o.flexContainer, r.vertical && o.flexContainerVertical, r.centered && o.centered];
    },
  })(({ ownerState: e }) =>
    R(
      { display: "flex" },
      e.vertical && { flexDirection: "column" },
      e.centered && { justifyContent: "center" },
    ),
  ),
  Es = se("span", { name: "MuiTabs", slot: "Indicator", overridesResolver: (e, o) => o.indicator })(
    ({ ownerState: e, theme: o }) =>
      R(
        {
          position: "absolute",
          height: 2,
          bottom: 0,
          width: "100%",
          transition: o.transitions.create(),
        },
        e.indicatorColor === "primary" && { backgroundColor: (o.vars || o).palette.primary.main },
        e.indicatorColor === "secondary" && {
          backgroundColor: (o.vars || o).palette.secondary.main,
        },
        e.vertical && { height: "100%", width: 2, right: 0 },
      ),
  ),
  Ns = se(vs, { name: "MuiTabs", slot: "ScrollbarSize" })({
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
  }),
  fr = {},
  Bs = d.forwardRef(function (o, r) {
    const i = Ke({ props: o, name: "MuiTabs" }),
      u = Re(),
      p = u.direction === "rtl",
      {
        "aria-label": c,
        "aria-labelledby": s,
        action: n,
        centered: f = !1,
        children: x,
        className: h,
        component: b = "div",
        allowScrollButtonsMobile: v = !1,
        indicatorColor: j = "primary",
        onChange: k,
        orientation: w = "horizontal",
        ScrollButtonComponent: O = Rs,
        scrollButtons: D = "auto",
        selectionFollowsFocus: _,
        TabIndicatorProps: N = {},
        TabScrollButtonProps: V = {},
        textColor: $ = "primary",
        value: S,
        variant: G = "standard",
        visibleScrollbar: A = !1,
      } = i,
      C = Pe(i, Ts),
      z = G === "scrollable",
      M = w === "vertical",
      W = M ? "scrollTop" : "scrollLeft",
      E = M ? "top" : "left",
      B = M ? "bottom" : "right",
      ae = M ? "clientHeight" : "clientWidth",
      te = M ? "height" : "width",
      L = R({}, i, {
        component: b,
        allowScrollButtonsMobile: v,
        indicatorColor: j,
        orientation: w,
        vertical: M,
        scrollButtons: D,
        textColor: $,
        variant: G,
        visibleScrollbar: A,
        fixed: !z,
        hideScrollbar: z && !A,
        scrollableX: z && !M,
        scrollableY: z && M,
        centered: f && !z,
        scrollButtonsHideMobile: !v,
      }),
      P = _s(L),
      [fe, Ae] = d.useState(!1),
      [T, U] = d.useState(fr),
      [q, oe] = d.useState({ start: !1, end: !1 }),
      [ce, ne] = d.useState({ overflow: "hidden", scrollbarWidth: 0 }),
      me = new Map(),
      Q = d.useRef(null),
      ie = d.useRef(null),
      xe = () => {
        const I = Q.current;
        let H;
        if (I) {
          const Z = I.getBoundingClientRect();
          H = {
            clientWidth: I.clientWidth,
            scrollLeft: I.scrollLeft,
            scrollTop: I.scrollTop,
            scrollLeftNormalized: Ko(I, u.direction),
            scrollWidth: I.scrollWidth,
            top: Z.top,
            bottom: Z.bottom,
            left: Z.left,
            right: Z.right,
          };
        }
        let J;
        if (I && S !== !1) {
          const Z = ie.current.children;
          if (Z.length > 0) {
            const be = Z[me.get(S)];
            J = be ? be.getBoundingClientRect() : null;
          }
        }
        return { tabsMeta: H, tabMeta: J };
      },
      Te = ht(() => {
        const { tabsMeta: I, tabMeta: H } = xe();
        let J = 0,
          Z;
        if (M) (Z = "top"), H && I && (J = H.top - I.top + I.scrollTop);
        else if (((Z = p ? "right" : "left"), H && I)) {
          const ye = p ? I.scrollLeftNormalized + I.clientWidth - I.scrollWidth : I.scrollLeft;
          J = (p ? -1 : 1) * (H[Z] - I[Z] + ye);
        }
        const be = { [Z]: J, [te]: H ? H[te] : 0 };
        if (isNaN(T[Z]) || isNaN(T[te])) U(be);
        else {
          const ye = Math.abs(T[Z] - be[Z]),
            ke = Math.abs(T[te] - be[te]);
          (ye >= 1 || ke >= 1) && U(be);
        }
      }),
      et = (I, { animation: H = !0 } = {}) => {
        H ? gs(W, Q.current, I, { duration: u.transitions.duration.standard }) : (Q.current[W] = I);
      },
      je = (I) => {
        let H = Q.current[W];
        M ? (H += I) : ((H += I * (p ? -1 : 1)), (H *= p && Tr() === "reverse" ? -1 : 1)), et(H);
      },
      Y = () => {
        const I = Q.current[ae];
        let H = 0;
        const J = Array.from(ie.current.children);
        for (let Z = 0; Z < J.length; Z += 1) {
          const be = J[Z];
          if (H + be[ae] > I) {
            Z === 0 && (H = I);
            break;
          }
          H += be[ae];
        }
        return H;
      },
      it = () => {
        je(-1 * Y());
      },
      he = () => {
        je(Y());
      },
      Qe = d.useCallback((I) => {
        ne({ overflow: null, scrollbarWidth: I });
      }, []),
      We = () => {
        const I = {};
        I.scrollbarSizeListener = z
          ? t.jsx(Ns, { onChange: Qe, className: ue(P.scrollableX, P.hideScrollbar) })
          : null;
        const H = q.start || q.end,
          J = z && ((D === "auto" && H) || D === !0);
        return (
          (I.scrollButtonStart = J
            ? t.jsx(
                O,
                R(
                  {
                    orientation: w,
                    direction: p ? "right" : "left",
                    onClick: it,
                    disabled: !q.start,
                  },
                  V,
                  { className: ue(P.scrollButtons, V.className) },
                ),
              )
            : null),
          (I.scrollButtonEnd = J
            ? t.jsx(
                O,
                R(
                  {
                    orientation: w,
                    direction: p ? "left" : "right",
                    onClick: he,
                    disabled: !q.end,
                  },
                  V,
                  { className: ue(P.scrollButtons, V.className) },
                ),
              )
            : null),
          I
        );
      },
      dt = ht((I) => {
        const { tabsMeta: H, tabMeta: J } = xe();
        if (!(!J || !H)) {
          if (J[E] < H[E]) {
            const Z = H[W] + (J[E] - H[E]);
            et(Z, { animation: I });
          } else if (J[B] > H[B]) {
            const Z = H[W] + (J[B] - H[B]);
            et(Z, { animation: I });
          }
        }
      }),
      Ee = ht(() => {
        if (z && D !== !1) {
          const {
            scrollTop: I,
            scrollHeight: H,
            clientHeight: J,
            scrollWidth: Z,
            clientWidth: be,
          } = Q.current;
          let ye, ke;
          if (M) (ye = I > 1), (ke = I < H - J - 1);
          else {
            const Ge = Ko(Q.current, u.direction);
            (ye = p ? Ge < Z - be - 1 : Ge > 1), (ke = p ? Ge > 1 : Ge < Z - be - 1);
          }
          (ye !== q.start || ke !== q.end) && oe({ start: ye, end: ke });
        }
      });
    d.useEffect(() => {
      const I = Wt(() => {
          Q.current && (Te(), Ee());
        }),
        H = Yt(Q.current);
      H.addEventListener("resize", I);
      let J;
      return (
        typeof ResizeObserver < "u" &&
          ((J = new ResizeObserver(I)),
          Array.from(ie.current.children).forEach((Z) => {
            J.observe(Z);
          })),
        () => {
          I.clear(), H.removeEventListener("resize", I), J && J.disconnect();
        }
      );
    }, [Te, Ee]);
    const Le = d.useMemo(
      () =>
        Wt(() => {
          Ee();
        }),
      [Ee],
    );
    d.useEffect(
      () => () => {
        Le.clear();
      },
      [Le],
    ),
      d.useEffect(() => {
        Ae(!0);
      }, []),
      d.useEffect(() => {
        Te(), Ee();
      }),
      d.useEffect(() => {
        dt(fr !== T);
      }, [dt, T]),
      d.useImperativeHandle(n, () => ({ updateIndicator: Te, updateScrollButtons: Ee }), [Te, Ee]);
    const ut = t.jsx(
      Es,
      R({}, N, {
        className: ue(P.indicator, N.className),
        ownerState: L,
        style: R({}, T, N.style),
      }),
    );
    let st = 0;
    const mt = d.Children.map(x, (I) => {
        if (!d.isValidElement(I)) return null;
        const H = I.props.value === void 0 ? st : I.props.value;
        me.set(H, st);
        const J = H === S;
        return (
          (st += 1),
          d.cloneElement(
            I,
            R(
              {
                fullWidth: G === "fullWidth",
                indicator: J && !fe && ut,
                selected: J,
                selectionFollowsFocus: _,
                onChange: k,
                textColor: $,
                value: H,
              },
              st === 1 && S === !1 && !I.props.tabIndex ? { tabIndex: 0 } : {},
            ),
          )
        );
      }),
      bt = (I) => {
        const H = ie.current,
          J = ln(H).activeElement;
        if (J.getAttribute("role") !== "tab") return;
        let be = w === "horizontal" ? "ArrowLeft" : "ArrowUp",
          ye = w === "horizontal" ? "ArrowRight" : "ArrowDown";
        switch ((w === "horizontal" && p && ((be = "ArrowRight"), (ye = "ArrowLeft")), I.key)) {
          case be:
            I.preventDefault(), Dt(H, J, pr);
            break;
          case ye:
            I.preventDefault(), Dt(H, J, ur);
            break;
          case "Home":
            I.preventDefault(), Dt(H, null, ur);
            break;
          case "End":
            I.preventDefault(), Dt(H, null, pr);
            break;
        }
      },
      Ie = We();
    return t.jsxs(
      As,
      R({ className: ue(P.root, h), ownerState: L, ref: r, as: b }, C, {
        children: [
          Ie.scrollButtonStart,
          Ie.scrollbarSizeListener,
          t.jsxs(Os, {
            className: P.scroller,
            ownerState: L,
            style: {
              overflow: ce.overflow,
              [M ? `margin${p ? "Left" : "Right"}` : "marginBottom"]: A
                ? void 0
                : -ce.scrollbarWidth,
            },
            ref: Q,
            onScroll: Le,
            children: [
              t.jsx(Ps, {
                "aria-label": c,
                "aria-labelledby": s,
                "aria-orientation": w === "vertical" ? "vertical" : null,
                className: P.flexContainer,
                ownerState: L,
                onKeyDown: bt,
                ref: ie,
                role: "tablist",
                children: mt,
              }),
              fe && ut,
            ],
          }),
          Ie.scrollButtonEnd,
        ],
      }),
    );
  }),
  Ds = Bs;
function Ls(e) {
  return Ve("MuiToggleButton", e);
}
const qs = Ue("MuiToggleButton", [
    "root",
    "disabled",
    "selected",
    "standard",
    "primary",
    "secondary",
    "sizeSmall",
    "sizeMedium",
    "sizeLarge",
  ]),
  xr = qs,
  Ms = [
    "children",
    "className",
    "color",
    "disabled",
    "disableFocusRipple",
    "fullWidth",
    "onChange",
    "onClick",
    "selected",
    "size",
    "value",
  ],
  Hs = (e) => {
    const { classes: o, fullWidth: r, selected: i, disabled: u, size: p, color: c } = e,
      s = { root: ["root", i && "selected", u && "disabled", r && "fullWidth", `size${X(p)}`, c] };
    return Xe(s, Ls, o);
  },
  Fs = se(Ot, {
    name: "MuiToggleButton",
    slot: "Root",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [o.root, o[`size${X(r.size)}`]];
    },
  })(({ theme: e, ownerState: o }) => {
    let r = o.color === "standard" ? e.palette.text.primary : e.palette[o.color].main,
      i;
    return (
      e.vars &&
        ((r = o.color === "standard" ? e.vars.palette.text.primary : e.vars.palette[o.color].main),
        (i =
          o.color === "standard"
            ? e.vars.palette.text.primaryChannel
            : e.vars.palette[o.color].mainChannel)),
      R(
        {},
        e.typography.button,
        {
          borderRadius: (e.vars || e).shape.borderRadius,
          padding: 11,
          border: `1px solid ${(e.vars || e).palette.divider}`,
          color: (e.vars || e).palette.action.active,
        },
        o.fullWidth && { width: "100%" },
        {
          [`&.${xr.disabled}`]: {
            color: (e.vars || e).palette.action.disabled,
            border: `1px solid ${(e.vars || e).palette.action.disabledBackground}`,
          },
          "&:hover": {
            textDecoration: "none",
            backgroundColor: e.vars
              ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`
              : we(e.palette.text.primary, e.palette.action.hoverOpacity),
            "@media (hover: none)": { backgroundColor: "transparent" },
          },
          [`&.${xr.selected}`]: {
            color: r,
            backgroundColor: e.vars
              ? `rgba(${i} / ${e.vars.palette.action.selectedOpacity})`
              : we(r, e.palette.action.selectedOpacity),
            "&:hover": {
              backgroundColor: e.vars
                ? `rgba(${i} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`
                : we(r, e.palette.action.selectedOpacity + e.palette.action.hoverOpacity),
              "@media (hover: none)": {
                backgroundColor: e.vars
                  ? `rgba(${i} / ${e.vars.palette.action.selectedOpacity})`
                  : we(r, e.palette.action.selectedOpacity),
              },
            },
          },
        },
        o.size === "small" && { padding: 7, fontSize: e.typography.pxToRem(13) },
        o.size === "large" && { padding: 15, fontSize: e.typography.pxToRem(15) },
      )
    );
  }),
  Ws = d.forwardRef(function (o, r) {
    const i = Ke({ props: o, name: "MuiToggleButton" }),
      {
        children: u,
        className: p,
        color: c = "standard",
        disabled: s = !1,
        disableFocusRipple: n = !1,
        fullWidth: f = !1,
        onChange: x,
        onClick: h,
        selected: b,
        size: v = "medium",
        value: j,
      } = i,
      k = Pe(i, Ms),
      w = R({}, i, { color: c, disabled: s, disableFocusRipple: n, fullWidth: f, size: v }),
      O = Hs(w),
      D = (_) => {
        (h && (h(_, j), _.defaultPrevented)) || (x && x(_, j));
      };
    return t.jsx(
      Fs,
      R(
        {
          className: ue(O.root, p),
          disabled: s,
          focusRipple: !n,
          ref: r,
          onClick: D,
          onChange: x,
          value: j,
          ownerState: w,
          "aria-pressed": b,
        },
        k,
        { children: u },
      ),
    );
  }),
  At = Ws;
function Gs(e, o) {
  return o === void 0 || e === void 0 ? !1 : Array.isArray(o) ? o.indexOf(e) >= 0 : e === o;
}
function Ys(e) {
  return Ve("MuiToggleButtonGroup", e);
}
const Vs = Ue("MuiToggleButtonGroup", [
    "root",
    "selected",
    "vertical",
    "disabled",
    "grouped",
    "groupedHorizontal",
    "groupedVertical",
  ]),
  ot = Vs,
  Us = [
    "children",
    "className",
    "color",
    "disabled",
    "exclusive",
    "fullWidth",
    "onChange",
    "orientation",
    "size",
    "value",
  ],
  Ks = (e) => {
    const { classes: o, orientation: r, fullWidth: i, disabled: u } = e,
      p = {
        root: ["root", r === "vertical" && "vertical", i && "fullWidth"],
        grouped: ["grouped", `grouped${X(r)}`, u && "disabled"],
      };
    return Xe(p, Ys, o);
  },
  Xs = se("div", {
    name: "MuiToggleButtonGroup",
    slot: "Root",
    overridesResolver: (e, o) => {
      const { ownerState: r } = e;
      return [
        { [`& .${ot.grouped}`]: o.grouped },
        { [`& .${ot.grouped}`]: o[`grouped${X(r.orientation)}`] },
        o.root,
        r.orientation === "vertical" && o.vertical,
        r.fullWidth && o.fullWidth,
      ];
    },
  })(({ ownerState: e, theme: o }) =>
    R(
      { display: "inline-flex", borderRadius: (o.vars || o).shape.borderRadius },
      e.orientation === "vertical" && { flexDirection: "column" },
      e.fullWidth && { width: "100%" },
      {
        [`& .${ot.grouped}`]: R(
          {},
          e.orientation === "horizontal"
            ? {
                "&:not(:first-of-type)": {
                  marginLeft: -1,
                  borderLeft: "1px solid transparent",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
                "&:not(:last-of-type)": { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                [`&.${ot.selected} + .${ot.grouped}.${ot.selected}`]: {
                  borderLeft: 0,
                  marginLeft: 0,
                },
              }
            : {
                "&:not(:first-of-type)": {
                  marginTop: -1,
                  borderTop: "1px solid transparent",
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                },
                "&:not(:last-of-type)": { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
                [`&.${ot.selected} + .${ot.grouped}.${ot.selected}`]: {
                  borderTop: 0,
                  marginTop: 0,
                },
              },
        ),
      },
    ),
  ),
  Qs = d.forwardRef(function (o, r) {
    const i = Ke({ props: o, name: "MuiToggleButtonGroup" }),
      {
        children: u,
        className: p,
        color: c = "standard",
        disabled: s = !1,
        exclusive: n = !1,
        fullWidth: f = !1,
        onChange: x,
        orientation: h = "horizontal",
        size: b = "medium",
        value: v,
      } = i,
      j = Pe(i, Us),
      k = R({}, i, { disabled: s, fullWidth: f, orientation: h, size: b }),
      w = Ks(k),
      O = (_, N) => {
        if (!x) return;
        const V = v && v.indexOf(N);
        let $;
        v && V >= 0 ? (($ = v.slice()), $.splice(V, 1)) : ($ = v ? v.concat(N) : [N]), x(_, $);
      },
      D = (_, N) => {
        x && x(_, v === N ? null : N);
      };
    return t.jsx(
      Xs,
      R({ role: "group", className: ue(w.root, p), ref: r, ownerState: k }, j, {
        children: d.Children.map(u, (_) =>
          d.isValidElement(_)
            ? d.cloneElement(_, {
                className: ue(w.grouped, _.props.className),
                onChange: n ? D : O,
                selected: _.props.selected === void 0 ? Gs(_.props.value, v) : _.props.selected,
                size: _.props.size || b,
                fullWidth: f,
                color: _.props.color || c,
                disabled: _.props.disabled || s,
              })
            : null,
        ),
      }),
    );
  }),
  Dr = Qs,
  gt = d.forwardRef(
    (
      {
        cardText: e,
        cardTitle: o,
        costs: r,
        onReveal: i,
        disabled: u,
        sx: p,
        revealFromOutside: c,
      },
      s,
    ) => {
      const [n, f] = d.useState(!1),
        x = () => {
          f(!1);
        },
        h = () => {
          f(!0);
        };
      d.useEffect(() => {
        c && f(!0), n && i && i();
      }, [n, c, i]),
        d.useImperativeHandle(s, () => ({ resetHint: x, revealHint: h }));
      function b(v) {
        const j = v.split(";");
        return j.length > 1
          ? j
              .filter((k) => k !== "-")
              .map((k, w) =>
                t.jsx(
                  g,
                  {
                    sx: { color: a.quiz.primary_text, textTransform: "capitalize" },
                    fontSize: "13px",
                    children: k,
                  },
                  w,
                ),
              )
          : t.jsx(g, {
              sx: { color: a.quiz.primary_text, textTransform: "capitalize" },
              children: v,
            });
      }
      return t.jsxs(ge, {
        sx: {
          position: "relative",
          cursor: "pointer",
          width: "100%",
          minHeight: "58px",
          padding: 0,
          borderRadius: "9px",
          border: `2px solid ${u ? a.quiz.disabled_border : a.quiz.light}`,
          ...p,
        },
        onClick: () => f(!0),
        disabled: u,
        children: [
          t.jsx(l, {
            sx: {
              padding: 2,
              backgroundColor: u ? a.quiz.disabled : a.quiz.main,
              borderRadius: "8px",
              width: "100%",
              minHeight: "58px",
              height: "100%",
            },
            children: b(e),
          }),
          t.jsx(l, {
            sx: {
              width: "100%",
              position: "absolute",
              zIndex: 2,
              height: "100%",
              borderRadius: "8px",
              top: 0,
              background: n ? "rgba(255, 255, 255, 0.0)" : u ? a.quiz.disabled : a.quiz.main_rgba,
              "@keyframes removeBlur": {
                "0%": { background: a.quiz.main_rgba },
                "100%": { background: "rgba(255, 255, 255, 0.0)" },
              },
              animation: n ? "removeBlur 1000ms ease-in-out" : void 0,
            },
          }),
          t.jsxs(l, {
            sx: {
              width: "100%",
              padding: 2,
              position: "absolute",
              top: 0,
              borderRadius: "8px",
              zIndex: 3,
              opacity: n ? 0 : 1,
              display: "flex",
              justifyContent: "space-between",
              height: "100%",
              alignItems: "center",
              "@keyframes hideTitle": { "0%": { opacity: 1 }, "100%": { opacity: 0 } },
              animation: n ? "hideTitle 1000ms ease-in-out" : void 0,
            },
            children: [
              t.jsx(g, { sx: { textTransform: "capitalize", color: "black" }, children: o }),
              r &&
                t.jsx(l, {
                  sx: {
                    padding: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#12616e",
                    borderRadius: "4px",
                  },
                  children: t.jsx(g, { sx: { color: a.quiz.primary_text }, children: r }),
                }),
            ],
          }),
        ],
      });
    },
  );
var ko = {},
  Js = De;
Object.defineProperty(ko, "__esModule", { value: !0 });
var zo = (ko.default = void 0),
  Zs = Js(Be()),
  el = t,
  tl = (0, Zs.default)(
    (0, el.jsx)("path", { d: "m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" }),
    "ArrowUpward",
  );
zo = ko.default = tl;
var Ro = {},
  ol = De;
Object.defineProperty(Ro, "__esModule", { value: !0 });
var Io = (Ro.default = void 0),
  rl = ol(Be()),
  nl = t,
  il = (0, rl.default)(
    (0, nl.jsx)("path", { d: "m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" }),
    "ArrowDownward",
  );
Io = Ro.default = il;
function sl({ searchHistory: e, targetChar: o }) {
  const r = Re();
  function i(n, f) {
    if (!(!n || !f)) return n > f ? t.jsx(Io, {}) : n < f ? t.jsx(zo, {}) : void 0;
  }
  function u(n, f) {
    var x;
    return (x = f.ValidFields) != null && x.includes(n)
      ? `2px solid ${a.quiz.success_light}`
      : `2px solid ${a.quiz.light}`;
  }
  function p(n, f) {
    var x;
    return (x = f.ValidFields) != null && x.includes(n) ? a.quiz.success : a.quiz.main;
  }
  function c(n, f) {
    return !f || JSON.stringify(n.Origin) === JSON.stringify(f.Origin)
      ? !1
      : !!(n.Origin.includes(f.Origin) || f.Origin.includes(n.Origin));
  }
  function s(n, f) {
    if (!f || JSON.stringify(n.Genre) === JSON.stringify(f.Genre)) return !1;
    if (n.Genre === "Slice of Life" && f.Genre === "Slice of Life") return !0;
    const x = f.Genre.split(" ").map((v) => v.trim());
    return n.Genre.split(" ")
      .map((v) => v.trim())
      .some((v) =>
        (v === "Romance" && x.some((j) => j === "Romantic" || j === "Romance")) ||
        (v === "Romantic" && x.some((j) => j === "Romance" || j === "Romantic"))
          ? !0
          : x.includes(v),
      );
  }
  return t.jsx(l, {
    children: t.jsxs(l, {
      sx: {
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        maxHeight: "400px",
        overflowX: "hidden",
        overflowY: "auto",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        border: e.length > 0 ? `1px solid ${a.quiz.light}` : "none",
        borderBottom: 0,
        background: a.gradient,
        [r.breakpoints.down("md")]: { overflowX: "scroll" },
      },
      children: [
        e.length > 0 &&
          t.jsxs(l, {
            sx: {
              display: "grid",
              gridTemplateColumns: "60px repeat(8, 1fr)",
              gap: 2,
              paddingX: 2,
            },
            children: [
              " ",
              t.jsx(l, {
                sx: {
                  gridColumn: "1 / 2",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Image",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "2 / 3",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Sex",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "3 / 4",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Age Group",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "4 / 5",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Hair Color",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "5 / 6",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Eye Color",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "6 / 7",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Height",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "7 / 8",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Origin",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "8 / 9",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Anime Release",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "9 / 10",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Anime Genre",
              }),
            ],
          }),
        e.map((n) =>
          t.jsxs(
            l,
            {
              sx: {
                display: "grid",
                gridTemplateColumns: "60px repeat(8, 1fr)",
                gap: 2,
                paddingX: 2,
                marginBottom: 2,
              },
              children: [
                t.jsx(l, {
                  sx: {
                    gridColumn: "1 / 2",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(nt, {
                    title: n.Name,
                    placement: "bottom",
                    slotProps: {
                      popper: { modifiers: [{ name: "offset", options: { offset: [0, -24] } }] },
                    },
                    children: t.jsx(l, {
                      sx: { maxWidth: "60px", height: "75px", objectFit: "cover" },
                      component: "img",
                      src: Ne(n.id),
                    }),
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "2 / 3",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: p("Sex", n),
                      height: "100%",
                      borderRadius: "4px",
                      border: u("Sex", n),
                    },
                    children: t.jsx(g, { children: n.Sex }),
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "3 / 4",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsxs(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: p("Age_Group", n),
                      height: "100%",
                      borderRadius: "4px",
                      border: u("Age_Group", n),
                    },
                    children: [
                      t.jsx(g, { children: n.Age_Group }),
                      i(
                        Vo(n.Age_Group) ?? 0,
                        Vo((o == null ? void 0 : o.Age_Group) ?? "12-18") ?? 0,
                      ),
                    ],
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "4 / 5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: p("Hair_Color", n),
                      height: "100%",
                      borderRadius: "4px",
                      border: u("Hair_Color", n),
                    },
                    children: t.jsx(g, { children: n.Hair_Color }),
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "5 / 6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: p("Eye_Color", n),
                      height: "100%",
                      borderRadius: "4px",
                      border: u("Eye_Color", n),
                    },
                    children: t.jsx(g, { children: n.Eye_Color }),
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "6 / 7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsxs(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: p("Height", n),
                      height: "100%",
                      borderRadius: "4px",
                      border: u("Height", n),
                    },
                    children: [
                      t.jsx(g, { children: n.Height ?? "?" }),
                      i(n.Height ?? 0, (o == null ? void 0 : o.Height) ?? 0),
                    ],
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "7 / 8",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: c(n, o) ? a.quiz.warning : p("Origin", n),
                      height: "100%",
                      borderRadius: "4px",
                      border: c(n, o) ? `2px solid ${a.quiz.warning_light}` : u("Origin", n),
                    },
                    children: t.jsx(g, { children: n.Origin }),
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "8 / 9",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsxs(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: p("First_Release_Year", n),
                      height: "100%",
                      borderRadius: "4px",
                      border: u("First_Release_Year", n),
                    },
                    children: [
                      t.jsx(g, { children: n.First_Release_Year }),
                      i(
                        n.First_Release_Year ?? 0,
                        (o == null ? void 0 : o.First_Release_Year) ?? 0,
                      ),
                    ],
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "9 / 10",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: s(n, o) ? a.quiz.warning : p("Genre", n),
                      height: "100%",
                      borderRadius: "4px",
                      border: s(n, o) ? `2px solid ${a.quiz.warning_light}` : u("Genre", n),
                    },
                    children: t.jsx(g, { children: n.Genre }),
                  }),
                }),
              ],
            },
            n.Name,
          ),
        ),
      ],
    }),
  });
}
function Lr({
  charData: e,
  disabled: o,
  value: r,
  handleSearchChange: i,
  showPreviewImage: u,
  id: p,
  width: c,
  difficulty: s,
}) {
  return t.jsx(Ar, {
    disablePortal: !0,
    options: s ? e.filter((n) => Co(n, s)) : e,
    getOptionLabel: (n) => `${n.Name} (${n.id})`,
    sx: {
      width: c ?? 300,
      backgroundColor: "white",
      borderRadius: "8px",
      "& .MuiOutlinedInput-root": {
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: a.quiz.secondary,
          borderRadius: "8px",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: a.quiz.tertiary,
          borderRadius: "8px",
        },
      },
    },
    renderInput: (n) => (
      !u && r && (n.inputProps.value = r.Name),
      t.jsx(zr, { ...n, label: "Guess Today's Character" })
    ),
    renderOption: (n, f) =>
      t.jsxs(l, {
        component: "li",
        sx: { "& > *": { m: 0.5 } },
        ...n,
        children: [
          u &&
            t.jsx(l, {
              sx: { width: "40px", objectFit: "cover", height: "60px" },
              component: "img",
              src: Ne(f.id),
            }),
          t.jsx(g, { sx: { marginLeft: 2 }, variant: "body2", children: f.Name }),
        ],
      }),
    onChange: (n, f, x) => i(n, f, x, p),
    clearOnBlur: !0,
    disabled: o,
    value: r,
    filterOptions: (n, { inputValue: f }) =>
      f !== "" ? n.filter((x) => x.Name.toLowerCase().includes(f.toLowerCase())) : [],
  });
}
const ll = se(An)(({ theme: e }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: a.quiz.success,
    "&:hover": { backgroundColor: we(a.quiz.success, e.palette.action.hoverOpacity) },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: a.quiz.success },
}));
function qr({
  points: e,
  searchHistory: o,
  isCorrect: r,
  selectedOption: i,
  charData: u,
  handleSearchChange: p,
  init: c,
  setDifficulty: s,
  difficulty: n,
  showGiveUp: f,
  gaveUp: x,
  handleGiveUp: h,
  endlessMode: b = !0,
  originalCharData: v,
  showPreviewImage: j = !0,
  showAnimeHintOption: k = !0,
  mode: w = "normal",
  quizKey: O,
}) {
  var S, G;
  const [D, _] = d.useState(Rr("autoRevealBasicQuizHints")),
    N = Re(),
    V = (A, C) => {
      C &&
        C !== n &&
        (s(C),
        setTimeout(() => {
          c();
        }, 400));
    };
  function $(A) {
    return A.length > 0 ? rt(A, { endlessMode: !1, isPrevious: !0, quizMode: w }) : null;
  }
  return t.jsxs(l, {
    sx: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      alignItems: "center",
      justifyContent: "space-between",
      background: a.gradient,
      borderRadius: 2,
      border: `1px solid ${a.quiz.light}`,
      width: "100%",
      [N.breakpoints.down("md")]: { flexDirection: "column", padding: 2 },
    },
    children: [
      (k || !b) &&
        t.jsxs(l, {
          sx: {
            display: "flex",
            alignItems: "center",
            width: "100%",
            background: a.gradientBar,
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            paddingX: 2,
            paddingY: 1,
            justifyContent: "space-between",
          },
          children: [
            !b &&
              v &&
              t.jsxs(l, {
                sx: { display: "flex", alignItems: "center", gap: 2 },
                children: [
                  t.jsx(g, {
                    fontSize: "16px",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "white",
                    children: "Yesterdays character:",
                  }),
                  t.jsx(nt, {
                    title: (S = $(v)) == null ? void 0 : S.Name,
                    placement: "bottom",
                    slotProps: {
                      popper: { modifiers: [{ name: "offset", options: { offset: [0, -24] } }] },
                    },
                    children: t.jsx(l, {
                      sx: { maxWidth: "60px", height: "50px", objectFit: "cover" },
                      component: "img",
                      src: Ne(((G = $(v)) == null ? void 0 : G.id) ?? 0),
                    }),
                  }),
                ],
              }),
            k &&
              t.jsx(Ht, {
                control: t.jsx(ll, {
                  onChange: (A, C) => {
                    _(C), an("autoRevealBasicQuizHints", C);
                  },
                  checked: D,
                  inputProps: { "aria-label": "Switch demo" },
                }),
                sx: { color: "white", "& .MuiFormControlLabel-label": { fontSize: "14px" } },
                label: "Reveal Hints automatically",
              }),
          ],
        }),
      t.jsxs(l, {
        sx: {
          width: "100%",
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          marginBottom: 2,
          paddingX: 2,
          [N.breakpoints.down("md")]: { flexDirection: "column", padding: 2 },
        },
        children: [
          t.jsxs(l, {
            sx: {
              position: "absolute",
              left: 16,
              [N.breakpoints.down("md")]: { position: "initial" },
            },
            children: [
              t.jsx(g, {
                sx: { color: "white" },
                children: "Points: " + (r ? Gt(O ?? re.CHAR).points : x ? 0 : e),
              }),
              t.jsx(g, {
                sx: { color: "white" },
                children: "Tries: " + (r ? Gt(O ?? re.CHAR).tries : x ? 0 : o.length),
              }),
            ],
          }),
          t.jsx(l, {
            sx: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              position: "relative",
              marginTop: b ? 2 : 0,
              width: "60%",
              [N.breakpoints.down("md")]: { width: "100%" },
            },
            children: t.jsx(Lr, {
              difficulty: n,
              charData: u.sort((A, C) => A.Name.localeCompare(C.Name)),
              disabled: r,
              value: i,
              handleSearchChange: p,
              showPreviewImage: j,
            }),
          }),
          t.jsxs(l, {
            sx: {
              position: "absolute",
              right: 16,
              display: "flex",
              gap: 1,
              [N.breakpoints.down("md")]: { flexDirection: "column", position: "initial" },
            },
            children: [
              f &&
                !x &&
                t.jsx(ge, {
                  onClick: h,
                  color: "error",
                  variant: "contained",
                  children: "Give Up!",
                }),
              b &&
                t.jsxs(Dr, {
                  value: n,
                  exclusive: !0,
                  onChange: V,
                  "aria-label": "text alignment",
                  size: "small",
                  sx: { backgroundColor: a.quiz.main, border: `2px solid ${a.quiz.light}` },
                  children: [
                    t.jsx(At, {
                      value: "A",
                      "aria-label": "left aligned",
                      children: t.jsx(g, { sx: { color: "white" }, children: "Easy" }),
                    }),
                    t.jsx(At, {
                      value: "B",
                      "aria-label": "centered",
                      children: t.jsx(g, { sx: { color: "white" }, children: "Normal" }),
                    }),
                    t.jsx(At, {
                      value: "C",
                      "aria-label": "right aligned",
                      children: t.jsx(g, { sx: { color: "white" }, children: "Hard" }),
                    }),
                  ],
                }),
              b &&
                t.jsx(ge, {
                  onClick: c,
                  sx: {
                    backgroundColor: a.quiz.main,
                    border: `2px solid ${a.quiz.light}`,
                    color: "white",
                    "&:hover": {
                      backgroundColor: a.quiz.secondary,
                      border: `2px solid ${a.quiz.light}`,
                    },
                  },
                  variant: "outlined",
                  children: "RESET QUIZ",
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
const Et = d.forwardRef(({ streakKey: e, colorRotate: o = "0deg", sx: r }, i) => {
    const [u, p] = d.useState({ streak: 0, date: void 0 }),
      c = Re(),
      { refreshKey: s } = St();
    d.useEffect(() => {
      if (e) {
        const f = n();
        p(f);
      }
    }, [e, s]),
      d.useImperativeHandle(i, () => ({
        setStreak() {
          const f = n();
          if (f) {
            const x = new Date();
            if ((x.setHours(4), x.setMinutes(0), x.setSeconds(0), x.setMilliseconds(0), f.date)) {
              const v = new Date(parseInt(f.date));
              if (bn(v, x)) return;
            }
            const h = { date: x.getTime().toString(), streak: f.streak + 1 },
              b = Tt(Ce.longestStreak);
            ((b && h.streak > b) || !b) && Oe([Ce.longestStreak], h.streak), cn(e, h), p(h);
          }
        },
      }));
    function n() {
      var x;
      let f = localStorage.getItem(e);
      if (!f) {
        const h = dn(),
          b = localStorage.getItem(`stats_${h == null ? void 0 : h.id}`);
        if (b) {
          const v = JSON.parse(b);
          if ((x = v == null ? void 0 : v.streaks) != null && x[`${e}`]) {
            const j = v.streaks[`${e}`];
            f = JSON.stringify({ date: j.date, streak: j.streak });
          }
        }
      }
      if (f) {
        localStorage.removeItem(e);
        const h = JSON.parse(f);
        if (!h.date) return { streak: 0, date: void 0 };
        const b = new Date(parseInt(h.date)),
          v = new Date();
        return v.setHours(4), vn(b, v) ? { streak: 0, date: void 0 } : h;
      } else return { streak: 0, date: void 0 };
    }
    return t.jsx(l, {
      sx: {
        padding: 2,
        position: "absolute",
        top: 12,
        right: 0,
        [c.breakpoints.down("md")]: { top: -200 },
        ...r,
      },
      children: t.jsx(g, {
        sx: {
          filter: u.streak < 1 ? "grayscale(100%)" : `grayscale(0%) hue-rotate(${o});`,
          color: a.quiz.primary_text,
        },
        fontSize: 32,
        children: `🔥 ${u.streak ?? 0}`,
      }),
    });
  }),
  $o = ({ onClick: e, text: o }) =>
    t.jsxs(l, {
      component: "button",
      sx: {
        backgroundColor: a.quiz.main,
        marginTop: 4,
        cursor: "pointer",
        border: `2px solid ${a.quiz.light}`,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 1,
        width: "300px",
        gap: 2,
        "&:hover .wiggle-img": { animation: "wiggle 2s linear infinite" },
        "@keyframes wiggle": {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(8deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(7deg)" },
          "40%": { transform: "rotate(-7deg)" },
          "50%": { transform: "rotate(6deg)" },
          "60%": { transform: "rotate(-6deg)" },
          "70%": { transform: "rotate(5deg)" },
          "80%": { transform: "rotate(-5deg)" },
          "90%": { transform: "rotate(5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      onClick: e,
      children: [
        t.jsx(l, {
          className: "wiggle-img",
          component: "img",
          src: "@/assets/Remon.png",
          width: "40px",
        }),
        t.jsx(g, {
          flexGrow: 1,
          fontWeight: "bold",
          fontSize: "16px",
          fontFamily: "roboto",
          color: "white",
          children: o,
        }),
      ],
    }),
  al = 150,
  cl = 10;
function dl(e, o, r, i, u) {
  const p = Math.max(o.length, 1) * al;
  let c = 2;
  r === "B" && (c = 1.5), r === "C" && (c = 1);
  let s = p - e * cl * c;
  u(i - s < 0 ? 0 : i - s);
}
function ul(e, o, r) {
  const i = o.indexOf(e),
    u = o;
  u.splice(i, 1), r(u);
}
const pl = re.CHAR + "Solved";
function hr({ charData: e, endlessMode: o = !0, changeQuizMode: r }) {
  const [i, u] = d.useState([]),
    [p, c] = d.useState(null),
    [s, n] = d.useState(null),
    [f, x] = d.useState(1e4),
    [h, b] = d.useState(0),
    [v, j] = d.useState(!1),
    [k, w] = d.useState([]),
    [O, D] = d.useState([]),
    [_, N] = d.useState("C"),
    [V, $] = d.useState(!1),
    [S, G] = d.useState(!1),
    [A, C] = d.useState(!1),
    z = d.useRef(null),
    M = d.useRef(null),
    W = d.useRef(null),
    E = d.useRef(null),
    B = d.useRef(null),
    ae = Re(),
    { refreshKey: te } = St(),
    L = o ? "charStreak" : "dailyCharStreak";
  d.useEffect(() => {
    e.length > 0 && k.length === 0 && w(e);
  }, [k, e]),
    d.useEffect(() => {
      k.length > 0 && !s && Ae();
    }, [k, Ae, s]),
    d.useEffect(() => {
      p &&
        setTimeout(() => {
          c(null);
        }, 100);
    }, [p]),
    d.useEffect(() => {
      const q = Fe(re.CHAR);
      P(q);
    }, [te]),
    d.useEffect(() => {
      f <= 0 && $(!0);
    }, [f]);
  function P(q) {
    if (q) {
      const oe = q.slice(0, 3);
      D(oe);
    }
  }
  function fe() {
    w([...e.sort((q, oe) => (q.Name < oe.Name ? -1 : 1))]),
      u([]),
      x(1e4),
      b(0),
      $(!1),
      G(!1),
      z.current && z.current.resetHint(),
      M.current && (M == null || M.current.resetHint()),
      W.current && (W == null || W.current.resetHint()),
      E.current && (E == null || E.current.resetHint());
  }
  function Ae() {
    j(!1), fe();
    let q = rt(e, { endlessMode: o });
    if (o) for (; !Co(q, _); ) q = rt(e, { endlessMode: o });
    else {
      const oe = Pt(re.CHAR),
        ce = jo(re.CHAR);
      oe && j(!0),
        ce && G(!0),
        (oe || ce) &&
          (M.current && M.current.revealHint(),
          E.current && E.current.revealHint(),
          z.current && z.current.revealHint(),
          W.current && W.current.revealHint());
    }
    n(q);
  }
  function T(q, oe, ce) {
    if (oe && s) {
      const ne = So(oe, s);
      if (
        (console.log("Compare Result: ", ne),
        (oe.ValidFields = ne.all),
        oe.ValidFields.includes("Anime") && Rr("autoRevealBasicQuizHints") && C(!0),
        c(oe),
        ul(oe, k, w),
        u([oe, ...i]),
        ne.all.length + 1 === Object.keys(s).length)
      ) {
        Oe([Ce.totalCharacterGuesses], i.length + 1),
          wo(ce, G, j, o, pl, re.CHAR, f, s, ne, i.length + 1);
        const me = Fe(re.CHAR);
        P(me), B.current && B.current.setStreak();
      }
      dl(ne.short.length, i, _, f, x);
    }
  }
  function U(q) {
    b(h + 1), x(f - q < 0 ? 0 : f - q);
  }
  return t.jsxs(l, {
    sx: { position: "relative" },
    children: [
      t.jsxs(l, {
        sx: {
          borderRadius: 2,
          background: a.gradient,
          marginBottom: 4,
          border: `1px solid ${a.quiz.light}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingY: 2,
        },
        children: [
          t.jsx(l, {
            sx: { display: "flex", flexDirection: "column", alignItems: "center" },
            children:
              !o &&
              t.jsxs(l, {
                sx: { display: "flex", height: "70px", alignItems: "center" },
                children: [
                  O.map((q, oe) =>
                    t.jsxs(
                      l,
                      {
                        sx: {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          paddingX: 2,
                          color: "white",
                        },
                        children: [
                          oe === 0 && t.jsx(g, { fontSize: "24px", children: "🏆" }),
                          oe === 1 && t.jsx(g, { fontSize: "24px", children: "🥈" }),
                          oe === 2 && t.jsx(g, { fontSize: "24px", children: "🥉" }),
                          t.jsx(g, { fontSize: "12px", children: "Points: " + q.points }),
                          t.jsx(g, { fontSize: "12px", children: "Date: " + q.date }),
                        ],
                      },
                      oe,
                    ),
                  ),
                  O.length === 0 &&
                    t.jsxs(g, {
                      sx: { color: a.quiz.primary_text },
                      textAlign: "center",
                      children: [
                        t.jsx(g, { component: "span", children: "No Scores available." }),
                        t.jsx("br", {}),
                        t.jsx(g, {
                          component: "span",
                          children: "You should definitely change that (*≧ω≦*)",
                        }),
                      ],
                    }),
                ],
              }),
          }),
          t.jsxs(l, {
            sx: {
              width: "100%",
              paddingX: 2,
              marginTop: 2,
              borderRadius: 2,
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              [ae.breakpoints.down("md")]: { flexWrap: "wrap" },
            },
            children: [
              t.jsx(gt, {
                costs: 500,
                onReveal: v || S ? void 0 : () => U(500),
                ref: E,
                cardText: (s == null ? void 0 : s.Tags) ?? "",
                cardTitle: "Tags",
              }),
              t.jsx(gt, {
                costs: 500,
                onReveal: v || S ? void 0 : () => U(500),
                ref: z,
                cardText:
                  [s == null ? void 0 : s.Subgenre1, s == null ? void 0 : s.Subgenre2].join(";") ??
                  "",
                cardTitle: "Subgenres",
              }),
              t.jsx(gt, {
                costs: 500,
                onReveal: v || S ? void 0 : () => U(500),
                ref: W,
                cardText: (s == null ? void 0 : s.Studio) ?? "",
                cardTitle: "Studio",
              }),
              t.jsx(gt, {
                costs: A ? 0 : 1e3,
                onReveal: v || S ? void 0 : () => U(A ? 0 : 1e3),
                ref: M,
                cardText: (s == null ? void 0 : s.Anime) ?? "",
                cardTitle: "Anime",
                revealFromOutside: A,
              }),
            ],
          }),
          !o && t.jsx(Et, { ref: B, streakKey: L }),
        ],
      }),
      t.jsx(qr, {
        difficulty: _,
        setDifficulty: N,
        points: f,
        searchHistory: i,
        isCorrect: v,
        selectedOption: p,
        charData: k,
        handleSearchChange: T,
        init: Ae,
        handleGiveUp: () => T(null, s, "giveUp"),
        showGiveUp: V,
        gaveUp: S,
        endlessMode: o,
        originalCharData: e,
        quizKey: re.CHAR,
      }),
      s &&
        v &&
        t.jsxs(l, {
          sx: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
          children: [
            t.jsxs(l, {
              sx: {
                backgroundColor: S ? a.quiz.failed : a.quiz.success,
                width: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingX: 2,
                paddingY: 3,
                marginTop: 4,
                borderRadius: 2,
                border: S
                  ? `2px solid ${a.quiz.failed_light}`
                  : `2px solid ${a.quiz.success_light}`,
              },
              children: [
                t.jsx(g, {
                  fontWeight: "bold",
                  fontSize: "24px",
                  marginBottom: 1,
                  textAlign: "center",
                  children: s == null ? void 0 : s.Name,
                }),
                t.jsx(l, {
                  width: "200px",
                  component: "img",
                  height: "276px",
                  sx: { objectFit: "cover" },
                  src: Ne(s == null ? void 0 : s.id),
                }),
              ],
            }),
            !o &&
              t.jsx($o, {
                onClick: (q) => (r == null ? void 0 : r(q, 1)),
                text: "Next: Image Quiz",
              }),
          ],
        }),
      (o || (!o && !v)) && t.jsx(sl, { searchHistory: i, targetChar: s }),
    ],
  });
}
function Mr({ animeData: e, disabled: o, value: r, handleSearchChange: i, id: u, width: p }) {
  return t.jsx(Ar, {
    disablePortal: !0,
    options: e,
    sx: {
      width: p ?? 300,
      backgroundColor: "white",
      borderRadius: "8px",
      "& .MuiOutlinedInput-root": {
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: a.quiz.secondary,
          borderRadius: "8px",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: a.quiz.tertiary,
          borderRadius: "8px",
        },
      },
    },
    renderInput: (c) => t.jsx(zr, { ...c, label: "Anime" }),
    renderOption: (c, s) =>
      t.jsx(l, {
        component: "li",
        sx: { "& > *": { m: 0.5 } },
        ...c,
        children: t.jsx(g, { sx: { marginLeft: 2 }, variant: "body2", children: s.Name }),
      }),
    onChange: (c, s, n) => i(c, s, n, u),
    clearOnBlur: !0,
    disabled: o,
    value: r,
    getOptionLabel: (c) => c.Name,
    filterOptions: (c, { inputValue: s }) =>
      s !== "" ? c.filter((n) => n.Name.toLowerCase().includes(s.toLowerCase())) : [],
  });
}
const fl = 1e3,
  xl = 1500,
  io = re.IMAGE + "_daily_answers",
  so = re.IMAGE + "_daily_score",
  hl = re.IMAGE + "Solved",
  ct = { character: null, anime: null, isCharacterCorrect: !1, isAnimeCorrect: !1 };
function gr({ charData: e, animeData: o, endlessMode: r = !0, changeQuizMode: i }) {
  const [u, p] = d.useState(!1),
    [c, s] = d.useState([{ ...ct }, { ...ct }, { ...ct }, { ...ct }]),
    [n, f] = d.useState(null),
    [x, h] = d.useState(0),
    b = d.useRef(null),
    v = r ? "imageStreak" : "dailyImageStreak";
  d.useEffect(() => {
    n || k();
  }),
    d.useEffect(() => {
      u && N();
    }, [u]);
  function j() {
    s([{ ...ct }, { ...ct }, { ...ct }, { ...ct }]), k(), h(0), p(!1);
  }
  function k() {
    let $ = [];
    r
      ? ($ = D(4))
      : (Pt(re.IMAGE) ? p(!0) : (localStorage.removeItem(io), localStorage.removeItem(so)),
        ($ = D(4, !1))),
      f($);
  }
  const w = ($, S, G, A) => {
      if (typeof A == "number") {
        const C = [...c];
        (C[A].character = S), s(C);
      }
    },
    O = ($, S, G, A) => {
      if (typeof A == "number") {
        const C = [...c];
        (C[A].anime = S), s(C);
      }
    };
  function D($, S = !0) {
    let G = 0,
      A = [];
    if (S)
      for (; G < Math.max(0, $); ) {
        const C = rt(e);
        A.some((z) => z.Name === C.Name) || (A.push(C), G++);
      }
    else {
      const C = new Date(),
        z = Math.floor(
          (C.getTime() - new Date(C.getFullYear(), 0, 0).getTime()) / (1e3 * 60 * 60 * 24),
        ),
        M = `${C.getFullYear()}`;
      let W = z;
      for (let P = 0; P < M.length; P++) W += M.charCodeAt(P);
      const E = 31;
      W = W * E;
      const B = (z * E) % e.length,
        te = [...[...e.slice(B), ...e.slice(0, B)]].sort((P, fe) => {
          const Ae = (W * (P.Name.length + P.Anime.length)) % e.length,
            T = (W * (fe.Name.length + fe.Anime.length)) % e.length;
          return Ae - T;
        });
      A = [];
      let L = 0;
      for (; A.length < $ && L < te.length; )
        A.some((P) => P.Name === te[L].Name) || A.push(te[L]), L++;
    }
    return A;
  }
  function _($, S) {
    n && (localStorage.setItem(io, JSON.stringify($)), localStorage.setItem(so, JSON.stringify(S)));
  }
  function N() {
    var $, S, G;
    if (n) {
      if (Pt(re.IMAGE) && !r) {
        const W = localStorage.getItem(io),
          E = localStorage.getItem(so);
        if (W && E) {
          const B = JSON.parse(W),
            ae = JSON.parse(E);
          s(B), h(ae);
          return;
        }
      }
      const A = [...c];
      let C = 0,
        z = 0;
      for (let W = 0; W < (n == null ? void 0 : n.length); W++) {
        const E = n[W],
          B = A[W];
        if ((($ = B.anime) == null ? void 0 : $.Name) === E.Anime) (B.isAnimeCorrect = !0), C++;
        else {
          const ae = o.filter((te) => te.Name === E.Anime)[0];
          (B.anime = ae), (B.isAnimeCorrect = !1);
        }
        ((S = B.character) == null ? void 0 : S.Name) === E.Name
          ? ((B.isCharacterCorrect = !0), z++)
          : ((B.character = E), (B.isCharacterCorrect = !1));
      }
      const M = V(C, z);
      if (
        (M === 1e4 && Oe([Ce.imageQuizMaxPoints], 1),
        h(M),
        s(A),
        b && ((G = b.current) == null || G.setStreak()),
        !r)
      ) {
        _(A, M);
        const W = Mt(),
          E = { date: W.toISOString() };
        un(hl, E),
          yn(W.toISOString(), M, re.IMAGE),
          Oe([Ce.totalWins, Ce.totalGamesPlayed], 1),
          Oe([Ce.totalCharacterImagesGuessed], 4),
          Oe([Ce.totalScore], M),
          pn(15);
      }
    }
  }
  function V($, S) {
    const G = $ * fl,
      A = S * xl;
    return G + A;
  }
  return t.jsxs(l, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    children: [
      t.jsxs(l, {
        sx: {
          position: "relative",
          background: a.gradient,
          padding: 4,
          borderRadius: 2,
          border: `1px solid ${a.quiz.light}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        },
        children: [
          !r && t.jsx(Et, { ref: b, streakKey: v, colorRotate: "250deg", sx: { top: "-5px" } }),
          t.jsx(l, {
            children: t.jsx(l, {
              sx: { display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" },
              children:
                n &&
                n.map(($, S) => {
                  var G, A;
                  return t.jsxs(
                    l,
                    {
                      sx: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 2,
                      },
                      children: [
                        t.jsx(l, {
                          width: "200px",
                          component: "img",
                          height: "276px",
                          sx: { objectFit: "cover" },
                          src: Ne($.id),
                        }),
                        !u &&
                          t.jsx(Lr, {
                            width: 200,
                            charData: e.sort((C, z) => C.Name.localeCompare(z.Name)),
                            disabled: !1,
                            value: c[S].character,
                            handleSearchChange: w,
                            id: S,
                          }),
                        !u &&
                          t.jsx(Mr, {
                            width: 200,
                            animeData: o,
                            disabled: !1,
                            value: c[S].anime,
                            handleSearchChange: O,
                            id: S,
                          }),
                        u &&
                          t.jsxs(l, {
                            sx: { width: 200 },
                            children: [
                              t.jsx(g, {
                                sx: {
                                  fontWeight: "bold",
                                  color: c[S].isCharacterCorrect ? a.quiz.correct : a.quiz.failed,
                                  marginBottom: 1,
                                },
                                children: ((G = c[S].character) == null ? void 0 : G.Name) ?? "-",
                              }),
                              t.jsx(g, {
                                sx: {
                                  fontWeight: "bold",
                                  color: c[S].isAnimeCorrect ? a.quiz.correct : a.quiz.failed,
                                  whiteSpace: "break-spaces",
                                },
                                children:
                                  c[S].anime === null
                                    ? "-"
                                    : (A = c[S].anime) == null
                                    ? void 0
                                    : A.Name,
                              }),
                            ],
                          }),
                      ],
                    },
                    $.Name,
                  );
                }),
            }),
          }),
          t.jsxs(l, {
            sx: { display: "flex", justifyContent: "space-between", marginTop: 4, width: "100%" },
            children: [
              r &&
                t.jsx(ge, {
                  sx: {
                    color: a.quiz.light,
                    borderColor: a.quiz.light,
                    "&:hover": { fontWeight: "bold", borderColor: a.quiz.tertiary },
                  },
                  variant: "outlined",
                  onClick: j,
                  children: "Reset",
                }),
              !r && t.jsx(l, {}),
              u && t.jsxs(g, { color: "white", fontSize: "24px", children: ["🏆 ", x] }),
              t.jsx(ge, {
                sx: {
                  backgroundColor: a.quiz.tertiary,
                  "&:hover": { backgroundColor: a.quiz.tertiary_hover },
                },
                variant: "contained",
                onClick: () => p(!0),
                children: "Solve",
              }),
            ],
          }),
        ],
      }),
      !r &&
        u &&
        t.jsx($o, { onClick: ($) => (i == null ? void 0 : i($, 2)), text: "Next: Anime Quiz" }),
    ],
  });
}
function Lt({ children: e, position: o, icon: r, sx: i, title: u, onOpenFn: p }) {
  const [c, s] = d.useState(!1),
    n = Re(),
    f = (x) => (h) => {
      (h.type === "keydown" && (h.key === "Tab" || h.key === "Shift")) || (s(x), p && p());
    };
  return t.jsxs(l, {
    sx: { display: "flex", [n.breakpoints.down("md")]: { width: "100%" } },
    children: [
      t.jsx(nt, {
        title: u,
        arrow: !0,
        placement: "right",
        children: t.jsx(ge, {
          variant: "contained",
          sx: {
            backgroundColor: a.quiz.secondary,
            height: "60px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            "&:hover": { backgroundColor: a.quiz.main },
            [n.breakpoints.down("md")]: { position: "initial", width: "100%", borderRadius: 0 },
          },
          onClick: f(!0),
          children: r,
        }),
      }),
      t.jsx(qi, {
        open: c,
        onClose: f(!1),
        children: t.jsx(l, {
          role: "presentation",
          onClick: f(!1),
          onKeyDown: f(!1),
          sx: { backgroundColor: a.quiz.secondary, ...i },
          children: e,
        }),
      }),
    ],
  });
}
var To = {},
  gl = De;
Object.defineProperty(To, "__esModule", { value: !0 });
var po = (To.default = void 0),
  ml = gl(Be()),
  bl = t,
  vl = (0, ml.default)(
    (0, bl.jsx)("path", {
      d: "m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    }),
    "Favorite",
  );
po = To.default = vl;
let xt = 0;
const Ft = "multiple_choice_quiz";
let Hr = [];
Hr = Fe(Ft);
function yl({ charData: e }) {
  const [o, r] = d.useState([]),
    [i, u] = d.useState(null),
    [p, c] = d.useState(1),
    [s, n] = d.useState(3),
    [f, x] = d.useState([]),
    [h, b] = d.useState(!1),
    [v, j] = d.useState(null),
    [k, w] = d.useState(Hr),
    [O, D] = d.useState("idle"),
    [_, N] = d.useState("idle"),
    [V, $] = d.useState(!1),
    S = d.useRef(null),
    G = Re(),
    { refreshKey: A } = St();
  d.useEffect(() => {
    i || E(), B();
  }, [i]);
  function C() {
    E(), c(p + 1), $(!1);
  }
  d.useEffect(() => {
    const T = Fe(Ft);
    z(T);
  }, [A]);
  function z(T) {
    if (T) {
      const U = T.slice(0, 3);
      w(U);
    }
  }
  function M() {
    var oe, ce;
    const T = {
      points: xt,
      date: new Date().toLocaleString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    };
    let U = Fe(Ft),
      q;
    U ? ((q = U), q.push(T)) : (q = [T]),
      q.sort((ne, me) => (ne.points < me.points ? 1 : -1)),
      w(q.slice(0, 3)),
      co(Ft, T),
      S && ((oe = S.current) == null || oe.setStreak()),
      S && ((ce = S.current) == null || ce.setStreak());
  }
  function W() {
    r([{ character: "", anime: "", isTarget: !1, isJokerAnswer: !1 }]),
      x([]),
      (xt = 0),
      c(1),
      n(3),
      D("idle"),
      N("idle"),
      b(!1),
      E(),
      B();
  }
  function E() {
    let T = rt(e);
    for (; f.includes(T.Name); ) T = rt(e);
    j(null), u(T), x((U) => [...U, T.Name]);
  }
  function B() {
    if (i) {
      let T = [];
      const U = { anime: i.Anime, character: i.Name, isTarget: !0, isJokerAnswer: !0 };
      T.push(U);
      let q = !1;
      for (; T.length < 4; ) {
        let ce = rt(e);
        !T.some((me) => me.character === ce.Name) &&
          ce.Name !== U.character &&
          (T.push({ anime: ce.Anime, character: ce.Name, isTarget: !1, isJokerAnswer: !q }),
          (q = !0),
          O !== "idle" && (q = !1));
      }
      T = ae(T);
      const oe = T.slice(0, 4);
      if (!oe.some((ce) => ce.isTarget)) {
        const ce = T.find((ne) => ne.isTarget);
        if (ce) {
          const ne = Math.floor(Math.random() * 4);
          oe[ne] = ce;
        }
      }
      r(oe);
    }
  }
  function ae(T) {
    for (let U = T.length - 1; U >= 0; U--) {
      const q = Math.floor(Math.random() * (U + 1));
      [T[U], T[q]] = [T[q], T[U]];
    }
    return T;
  }
  function te(T) {
    if (
      ($(!0),
      T.isTarget ? L() : (n(s - 1), s < 1 && (b(!0), M())),
      O === "active" && D("used"),
      j(T),
      f.length + 1 === e.length)
    ) {
      b(!0), M();
      return;
    } else
      setTimeout(() => {
        C();
      }, 1e3);
  }
  function L() {
    xt++;
  }
  function P(T) {
    return v
      ? (T == null ? void 0 : T.character) === (i == null ? void 0 : i.Name)
        ? a.quiz.success
        : a.quiz.failed
      : O === "active"
      ? T != null && T.isJokerAnswer
        ? a.quiz.main
        : a.quiz.disabled
      : a.quiz.main;
  }
  function fe() {
    D("active");
  }
  function Ae() {
    N("active"), C(), (xt = Math.max(xt - 3, 0)), N("used");
  }
  return t.jsxs(l, {
    position: "relative",
    sx: { overflowX: "hidden" },
    children: [
      t.jsx(l, {
        sx: {
          borderRadius: 2,
          background: a.gradient,
          marginBottom: 4,
          border: `1px solid ${a.quiz.light}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingY: 2,
          position: "relative",
        },
        children: t.jsxs(l, {
          sx: { display: "flex", height: "70px", alignItems: "center" },
          children: [
            k.map((T, U) =>
              t.jsxs(
                l,
                {
                  sx: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingX: 2,
                    color: "white",
                  },
                  children: [
                    U === 0 && t.jsx(g, { fontSize: "24px", children: "🏆" }),
                    U === 1 && t.jsx(g, { fontSize: "24px", children: "🥈" }),
                    U === 2 && t.jsx(g, { fontSize: "24px", children: "🥉" }),
                    t.jsx(g, { fontSize: "12px", children: "Points: " + T.points }),
                    t.jsx(g, { fontSize: "12px", children: "Date: " + T.date }),
                  ],
                },
                U,
              ),
            ),
            k.length === 0 &&
              t.jsxs(g, {
                sx: { color: a.quiz.primary_text },
                textAlign: "center",
                children: [
                  t.jsx(g, { component: "span", children: "No Scores available." }),
                  t.jsx("br", {}),
                  t.jsx(g, {
                    component: "span",
                    children: "You should definitely change that (*≧ω≦*)",
                  }),
                ],
              }),
          ],
        }),
      }),
      t.jsx(Et, { ref: S, streakKey: "choiceStreak", colorRotate: "70deg" }),
      t.jsxs(l, {
        sx: {
          position: "relative",
          background: a.gradient,
          padding: 4,
          borderRadius: 2,
          border: `1px solid ${a.quiz.light}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "500px",
        },
        children: [
          t.jsxs(l, {
            sx: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              position: "relative",
              flexGrow: 1,
            },
            children: [
              !h &&
                t.jsxs(l, {
                  sx: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    position: "relative",
                  },
                  children: [
                    t.jsxs(l, {
                      position: "absolute",
                      sx: { left: 0, top: 0, [G.breakpoints.down("md")]: { left: 60 } },
                      children: [
                        Array.from({ length: s }, (T, U) =>
                          t.jsx(po, { sx: { color: a.quiz.hearts }, color: "error" }, U),
                        ),
                        s === 0 &&
                          t.jsx(po, {
                            sx: {
                              color: a.quiz.hearts,
                              "@keyframes blinking": {
                                "0%": { color: a.quiz.hearts },
                                "50%": { color: "transparent" },
                                "100%": { color: a.quiz.hearts },
                              },
                              animation: "blinking 3s ease-out infinite",
                            },
                          }),
                        t.jsx(g, {
                          sx: { color: "white", fontSize: "24px", paddingLeft: "2px" },
                          children: `${String(xt).padStart(4, "0")}`,
                        }),
                        t.jsx(g, {
                          sx: { color: "white", fontSize: "18px", paddingLeft: "2px" },
                          children: `#${p}`,
                        }),
                      ],
                    }),
                    t.jsxs(l, {
                      position: "absolute",
                      sx: {
                        right: 0,
                        top: 0,
                        display: "flex",
                        gap: 1,
                        [G.breakpoints.down("md")]: { right: 60 },
                      },
                      children: [
                        t.jsxs(ge, {
                          disabled: O !== "idle",
                          onClick: fe,
                          sx: {
                            backgroundColor: a.quiz.main,
                            "&:hover": { backgroundColor: a.quiz.main_hover },
                          },
                          variant: "contained",
                          children: [
                            t.jsx("sup", { children: "50" }),
                            "/",
                            t.jsx("sup", { children: "50" }),
                          ],
                        }),
                        t.jsx(ge, {
                          disabled: _ === "used",
                          onClick: Ae,
                          sx: {
                            backgroundColor: a.quiz.main,
                            "&:hover": { backgroundColor: a.quiz.main_hover },
                          },
                          variant: "contained",
                          children: ">>",
                        }),
                      ],
                    }),
                    t.jsxs(l, {
                      sx: {
                        display: "flex",
                        gap: 4,
                        [G.breakpoints.down("md")]: { marginTop: "100px" },
                      },
                      children: [
                        i &&
                          t.jsx(l, {
                            width: "200px",
                            component: "img",
                            height: "276px",
                            sx: { objectFit: "cover" },
                            src: Ne(i.id),
                          }),
                        !i &&
                          t.jsx(l, {
                            width: "200px",
                            height: "275px",
                            sx: {
                              backgroundColor: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            },
                            children: t.jsx(ki, { size: 50, color: "info" }),
                          }),
                      ],
                    }),
                    t.jsx(l, {
                      sx: {
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        width: "70%",
                        gap: 2,
                      },
                      children:
                        i &&
                        o.map((T) =>
                          t.jsxs(
                            ge,
                            {
                              sx: {
                                border: `1px solid ${a.quiz.light}`,
                                width: "450px",
                                paddingX: 2,
                                paddingY: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                color: "white",
                                cursor: "pointer",
                                backgroundColor: P(T),
                                textTransform: "capitalize",
                                "&:hover": { backgroundColor: v ? P(T) : a.quiz.main_hover },
                                "&:active": { backgroundColor: P(T) },
                                "&.Mui-disabled": { color: "white" },
                              },
                              disabled: (O === "active" && !T.isJokerAnswer) || V,
                              onClick: () => te(T),
                              children: [
                                t.jsx(g, { fontWeight: "bold", children: T.character }),
                                t.jsx(g, { children: T.anime }),
                              ],
                            },
                            T.character,
                          ),
                        ),
                    }),
                  ],
                }),
              h &&
                t.jsxs(l, {
                  sx: { height: "100%", width: "100%" },
                  children: [
                    t.jsx(g, {
                      marginBottom: 2,
                      textAlign: "center",
                      variant: "h4",
                      color: a.quiz.light,
                      children: "Game Over!",
                    }),
                    t.jsx(l, {
                      width: "200px",
                      component: "img",
                      src: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODN6MGVsaW5rYmZwdnQxaHl5M293M2V1eDZtcnltd2JyM2ZyYXExaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a6pzK009rlCak/giphy.gif",
                    }),
                    t.jsxs(l, {
                      sx: { display: "flex", flexDirection: "column", alignItems: "center" },
                      children: [
                        t.jsx(g, { fontSize: "40px", children: "🏆" }),
                        t.jsx(g, {
                          fontSize: "20px",
                          textAlign: "center",
                          color: "white",
                          children: `Your Score: ${xt}`,
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          t.jsx(l, {
            sx: { display: "flex", justifyContent: "space-between", marginTop: 4, width: "100%" },
            children: t.jsx(ge, {
              sx: {
                color: a.quiz.light,
                borderColor: a.quiz.light,
                "&:hover": { fontWeight: "bold", borderColor: a.quiz.tertiary },
              },
              variant: "outlined",
              onClick: W,
              children: "Reset",
            }),
          }),
        ],
      }),
    ],
  });
}
var _o = {},
  Cl = De;
Object.defineProperty(_o, "__esModule", { value: !0 });
var fo = (_o.default = void 0),
  jl = Cl(Be()),
  Sl = t,
  wl = (0, jl.default)(
    (0, Sl.jsx)("path", { d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" }),
    "Menu",
  );
fo = _o.default = wl;
var Ao = {},
  kl = De;
Object.defineProperty(Ao, "__esModule", { value: !0 });
var xo = (Ao.default = void 0),
  zl = kl(Be()),
  Rl = t,
  Il = (0, zl.default)(
    (0, Rl.jsx)("path", {
      d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z",
    }),
    "HelpOutline",
  );
xo = Ao.default = Il;
var Oo = {},
  $l = De;
Object.defineProperty(Oo, "__esModule", { value: !0 });
var ho = (Oo.default = void 0),
  Tl = $l(Be()),
  _l = t,
  Al = (0, Tl.default)(
    (0, _l.jsx)("path", {
      d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
    }),
    "Article",
  );
ho = Oo.default = Al;
const lo = (e) => ({
    border: "1px solid",
    borderColor: a.quiz.light,
    fontSize: "20px",
    width: "40px",
    height: "40px",
    minWidth: "inherit",
    backgroundColor: e ? a.quiz.light : a.quiz.secondary,
    "&: hover": {
      transform: "scale(1.1)",
      transition: "transform 100ms ease-in-out",
      backgroundColor: e ? a.quiz.light : a.quiz.tertiary,
    },
  }),
  Ol = d.forwardRef(({ selectionStates: e, updateSelectionStates: o }, r) => {
    const [i, u] = d.useState("none");
    d.useImperativeHandle(r, () => ({
      resetState() {
        u("none");
      },
    }));
    function p(c) {
      u(i !== c ? c : "none"), o(c);
    }
    return t.jsxs(l, {
      display: "flex",
      gap: 2,
      children: [
        t.jsx(ge, {
          disabled: (e.kiss && i !== "kiss") || (i !== "none" && i !== "kiss"),
          sx: lo(i === "kiss"),
          onClick: () => p("kiss"),
          children: "💋",
        }),
        t.jsx(ge, {
          disabled: (e.marry && i !== "marry") || (i !== "none" && i !== "marry"),
          sx: lo(i === "marry"),
          onClick: () => p("marry"),
          children: "💍",
        }),
        t.jsx(ge, {
          disabled: (e.kill && i !== "kill") || (i !== "none" && i !== "kill"),
          sx: lo(i === "kill"),
          onClick: () => p("kill"),
          children: "💀",
        }),
      ],
    });
  });
var Po = {},
  Pl = De;
Object.defineProperty(Po, "__esModule", { value: !0 });
var Fr = (Po.default = void 0),
  El = Pl(Be()),
  Nl = t,
  Bl = (0, El.default)(
    (0, Nl.jsx)("path", {
      d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
    }),
    "Refresh",
  );
Fr = Po.default = Bl;
const Dl = ({ charData: e }) => {
    const [o, r] = d.useState(null),
      [i, u] = d.useState({ kiss: !1, marry: !1, kill: !1 }),
      [p, c] = d.useState("all"),
      s = d.useRef([]),
      n = Object.values(i).every(Boolean);
    function f(h) {
      const b = { ...i };
      (b[h] = !b[h]), u(b);
    }
    d.useEffect(() => {
      x();
    }, []);
    function x() {
      n &&
        (Oe([Ce.kissMarryKillGamesPlayed], 1),
        p === "male"
          ? Oe([Ce.kissMarryKillMaleGamesPlayed], 1)
          : p === "female" && Oe([Ce.kissMarryKillFemaleGamesPlayed], 1)),
        s.current.length > 0 &&
          s.current.forEach((v) => {
            v !== null && v.resetState();
          });
      const b = Cn([...e], 3, p);
      r(b), u({ kiss: !1, marry: !1, kill: !1 });
    }
    return t.jsx(l, {
      position: "relative",
      children: t.jsxs(l, {
        sx: {
          position: "relative",
          background: a.gradient,
          padding: 4,
          borderRadius: 2,
          border: `1px solid ${a.quiz.light}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "500px",
        },
        children: [
          t.jsxs(l, {
            children: [
              t.jsx(l, {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 2,
                children: t.jsxs(fn, {
                  children: [
                    t.jsx(xn, {
                      sx: {
                        color: a.quiz.primary_text,
                        "&.Mui-focused": { color: a.quiz.primary_text },
                      },
                      children: "Gender",
                    }),
                    t.jsxs(ss, {
                      "aria-labelledby": "demo-radio-buttons-group-label",
                      defaultValue: "all",
                      name: "radio-buttons-group",
                      row: !0,
                      onChange: (h) => c(h == null ? void 0 : h.target.value),
                      children: [
                        t.jsx(Ht, {
                          sx: { color: a.quiz.primary_text },
                          value: "all",
                          control: t.jsx(ro, {}),
                          label: "All",
                        }),
                        t.jsx(Ht, {
                          sx: { color: a.quiz.primary_text },
                          value: "female",
                          control: t.jsx(ro, {}),
                          label: "Female",
                        }),
                        t.jsx(Ht, {
                          sx: { color: a.quiz.primary_text },
                          value: "male",
                          control: t.jsx(ro, {}),
                          label: "Male",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              t.jsx(l, {
                sx: { display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" },
                children:
                  o &&
                  o.map((h, b) =>
                    t.jsxs(
                      l,
                      {
                        sx: {
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: 2,
                        },
                        children: [
                          t.jsx(l, {
                            width: "200px",
                            component: "img",
                            height: "276px",
                            sx: { objectFit: "cover" },
                            src: Ne(h.id),
                          }),
                          t.jsx(l, {
                            sx: { width: 200 },
                            children: t.jsx(g, {
                              sx: {
                                fontWeight: "bold",
                                marginBottom: 1,
                                textAlign: "center",
                                color: a.quiz.primary_text,
                              },
                              children: h.Name,
                            }),
                          }),
                          t.jsx(Ol, {
                            ref: (v) => (s.current[b] = v),
                            selectionStates: i,
                            updateSelectionStates: f,
                          }),
                        ],
                      },
                      h.Name,
                    ),
                  ),
              }),
            ],
          }),
          t.jsx(l, {
            sx: { width: "100%", marginTop: 6, display: "flex", justifyContent: "flex-end" },
            children: t.jsx(ge, {
              sx: {
                backgroundColor: a.quiz.tertiary,
                "&:hover": {
                  backgroundColor: a.quiz.tertiary,
                  transform: "scale(1.1)",
                  transition: "transform 100ms ease-in-out",
                },
              },
              variant: "contained",
              onClick: x,
              children: t.jsx(Fr, { fontSize: "medium", sx: { color: a.quiz.primary_text } }),
            }),
          }),
        ],
      }),
    });
  },
  mr = ({ animeData: e }) => {
    const o = Re();
    return t.jsxs(l, {
      sx: { [o.breakpoints.down("md")]: { padding: 2 } },
      children: [
        t.jsx(g, {
          sx: { fontSize: "24px", fontWeight: "bold", marginBottom: 2, color: a.quiz.primary_text },
          children: "Anime Index",
        }),
        e.map((r, i) =>
          t.jsxs(
            hn.Fragment,
            {
              children: [
                (i === 0 || r.Name[0] !== e[i - 1].Name[0]) &&
                  t.jsx(g, {
                    sx: { fontWeight: "bold", color: "white", marginTop: 1 },
                    children: r.Name[0],
                  }),
                t.jsx(
                  g,
                  { fontSize: "12px", color: a.quiz.primary_text, children: r.Name },
                  r.Name,
                ),
              ],
            },
            r.Name,
          ),
        ),
      ],
    });
  };
function Ll({ searchHistory: e, targetAnime: o }) {
  const r = Re();
  function i(s, n) {
    return s > n ? t.jsx(Io, {}) : s < n ? t.jsx(zo, {}) : void 0;
  }
  function u(s, n) {
    var f;
    return (f = n.ValidFields) != null && f.includes(s)
      ? `2px solid ${a.quiz.success_light}`
      : `2px solid ${a.quiz.light}`;
  }
  function p(s, n) {
    var f;
    return (f = n.ValidFields) != null && f.includes(s) ? a.quiz.success : a.quiz.main;
  }
  function c(s, n, f = "Genre") {
    if (!n || !s[f] || !n[f] || JSON.stringify(s[f]) === JSON.stringify(n[f])) return !1;
    if (f === "Genre" && s.Genre === "Slice of Life" && n.Genre === "Slice of Life") return !0;
    const x = f === "Genre" ? " " : ";",
      h = n[f] || "";
    if (!h) return !1;
    const b = h
        .split(x)
        .map((w) => w.trim())
        .filter(Boolean),
      v = s[f] || "";
    if (!v) return !1;
    const j = v
      .split(x)
      .map((w) => w.trim())
      .filter(Boolean);
    if ((f === "Subgenre1" || f === "Subgenre2") && !j.some((w) => b.includes(w))) {
      const w = f === "Subgenre1" ? "Subgenre2" : "Subgenre1";
      if (n[w] && s[w]) {
        const D = (n[w] || "")
          .split(";")
          .map((_) => _.trim())
          .filter(Boolean);
        return j.some((_) => D.includes(_));
      }
    }
    return j.some((w) =>
      f === "Genre" &&
      ((w === "Romance" && b.some((O) => O === "Romantic" || O === "Romance")) ||
        (w === "Romantic" && b.some((O) => O === "Romance" || O === "Romantic")))
        ? !0
        : b.includes(w),
    );
  }
  return t.jsx(l, {
    children: t.jsxs(l, {
      sx: {
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        maxHeight: "400px",
        overflowX: "hidden",
        overflowY: "auto",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        border: e.length > 0 ? `1px solid ${a.quiz.light}` : "none",
        borderBottom: 0,
        background: a.gradient,
        [r.breakpoints.down("md")]: { overflowX: "scroll" },
      },
      children: [
        e.length > 0 &&
          t.jsxs(l, {
            sx: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, paddingX: 2 },
            children: [
              " ",
              t.jsx(l, {
                sx: {
                  gridColumn: "1 / 2",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Name",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "2 / 3",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Release Year",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "3 / 4",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Studio",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "4 / 5",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Genre",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "5 / 6",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Subgenre",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "6 / 7",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Subgenre 2",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "7 / 8",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Tags",
              }),
            ],
          }),
        e.map((s) =>
          t.jsxs(
            l,
            {
              sx: {
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
                paddingX: 2,
                marginBottom: 2,
              },
              children: [
                t.jsx(l, {
                  sx: {
                    gridColumn: "1 / 2",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: p("Name", s),
                      height: "100%",
                      borderRadius: "4px",
                      border: u("Name", s),
                    },
                    children: t.jsx(g, { children: s.Name }),
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "2 / 3",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsxs(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: p("First_Release_Year", s),
                      height: "100%",
                      borderRadius: "4px",
                      border: u("First_Release_Year", s),
                    },
                    children: [
                      t.jsx(g, { children: s.First_Release_Year }),
                      i(
                        s.First_Release_Year ?? 0,
                        (o == null ? void 0 : o.First_Release_Year) ?? 0,
                      ),
                    ],
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "3 / 4",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: p("Studio", s),
                      height: "100%",
                      borderRadius: "4px",
                      border: u("Studio", s),
                    },
                    children: t.jsx(g, { children: s.Studio }),
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "4 / 5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: c(s, o) ? a.quiz.warning : p("Genre", s),
                      height: "100%",
                      borderRadius: "4px",
                      border: c(s, o) ? `2px solid ${a.quiz.warning_light}` : u("Genre", s),
                    },
                    children: t.jsx(g, { children: s.Genre }),
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "5 / 6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: c(s, o, "Subgenre1") ? a.quiz.warning : p("Subgenre1", s),
                      height: "100%",
                      borderRadius: "4px",
                      border: c(s, o, "Subgenre1")
                        ? `2px solid ${a.quiz.warning_light}`
                        : u("Subgenre1", s),
                    },
                    children: t.jsx(g, { children: s.Subgenre1 }),
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "6 / 7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: c(s, o, "Subgenre2") ? a.quiz.warning : p("Subgenre2", s),
                      height: "100%",
                      borderRadius: "4px",
                      border: c(s, o, "Subgenre2")
                        ? `2px solid ${a.quiz.warning_light}`
                        : u("Subgenre2", s),
                    },
                    children: t.jsx(g, { children: s.Subgenre2 }),
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "7 / 8",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: c(s, o, "Tags") ? a.quiz.warning : p("Tags", s),
                      height: "100%",
                      borderRadius: "4px",
                      border: c(s, o, "Tags") ? `2px solid ${a.quiz.warning_light}` : u("Tags", s),
                    },
                    children: t.jsx(g, { children: s.Tags }),
                  }),
                }),
              ],
            },
            s.Name,
          ),
        ),
      ],
    }),
  });
}
var Eo = {},
  ql = De;
Object.defineProperty(Eo, "__esModule", { value: !0 });
var Wr = (Eo.default = void 0),
  Ml = ql(Be()),
  Hl = t,
  Fl = (0, Ml.default)(
    (0, Hl.jsx)("path", { d: "m4 18 8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" }),
    "FastForward",
  );
Wr = Eo.default = Fl;
function Wl({
  points: e,
  searchHistory: o,
  isCorrect: r,
  selectedOption: i,
  animeData: u,
  handleSearchChange: p,
  init: c,
  showGiveUp: s,
  gaveUp: n,
  handleGiveUp: f,
  endlessMode: x = !0,
  originalAnimeData: h,
  targetAnime: b,
  charData: v,
}) {
  var $;
  const [j, k] = d.useState(5),
    [w, O] = d.useState(0);
  o.length % 5 !== 0 || o.length;
  const D = Re();
  d.useEffect(() => {
    (r || n) && k(0);
  }, [r, n]);
  function _(S) {
    return S.length > 0 ? uo(S, { endlessMode: !1, isPrevious: !0 }).Name : "-";
  }
  function N() {
    O(0), k(5), c();
  }
  function V() {
    let S = !1;
    return (
      o.length % 5 === 0 && o.length !== 0 && (S = !0),
      ((w === 0 && o.length >= 5) || (w === 1 && o.length >= 10)) && (S = !0),
      w > 2 && (S = !1),
      S
    );
  }
  return t.jsxs(l, {
    sx: { display: "flex", flexDirection: "column", alignItems: "center", width: "100%" },
    children: [
      !r &&
        w > 0 &&
        t.jsx(l, {
          sx: {
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "center",
            justifyContent: "space-between",
            background: a.gradient,
            borderRadius: 2,
            border: `1px solid ${a.quiz.light}`,
            width: "500px",
            [D.breakpoints.down("md")]: { flexDirection: "column", padding: 2 },
            paddingY: 2,
            marginBottom: 4,
          },
          children:
            b &&
            t.jsxs(l, {
              sx: { display: "flex", gap: 4, alignItems: "center" },
              children: [
                w > 1 &&
                  t.jsx(l, {
                    sx: {
                      width: "200px",
                      height: "276px",
                      backgroundImage: `url(${_t(b == null ? void 0 : b.id)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: `blur(${j}px)`,
                      zIndex: 1,
                    },
                  }),
                w > 0 &&
                  t.jsxs(l, {
                    textAlign: "center",
                    children: [
                      t.jsx(g, { sx: { color: "white" }, children: "Character from this anime:" }),
                      t.jsx(g, {
                        sx: { fontWeight: "bold", color: "white", fontSize: 20 },
                        children:
                          ($ = jn(b == null ? void 0 : b.id, v, h)) == null ? void 0 : $.Name,
                      }),
                    ],
                  }),
              ],
            }),
        }),
      t.jsxs(l, {
        sx: {
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          background: a.gradient,
          borderRadius: 2,
          border: `1px solid ${a.quiz.light}`,
          width: "100%",
          paddingY: x ? 2 : 0,
          [D.breakpoints.down("md")]: { flexDirection: "column", padding: 2 },
        },
        children: [
          !x &&
            h &&
            t.jsx(l, {
              display: "flex",
              alignItems: "center",
              gap: 2,
              sx: {
                background: a.gradientBar,
                width: "100%",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                paddingX: 2,
                paddingY: 1,
              },
              children: t.jsx(g, {
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                children: "Yesterdays anime: " + _(h),
              }),
            }),
          t.jsxs(l, {
            sx: {
              width: "100%",
              display: "flex",
              gap: 4,
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 2,
              paddingX: 2,
              paddingBottom: x ? 0 : 2,
              [D.breakpoints.down("md")]: { flexDirection: "column", padding: 2 },
            },
            children: [
              t.jsxs(l, {
                children: [
                  t.jsx(g, {
                    sx: { color: "white" },
                    children: "Points: " + (r ? Gt(re.ANIME).points : n ? 0 : e),
                  }),
                  t.jsx(g, {
                    sx: { color: "white" },
                    children: "Tries: " + (r ? Gt(re.ANIME).tries : n ? 0 : o.length),
                  }),
                ],
              }),
              t.jsxs(l, {
                sx: {
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  position: "relative",
                  marginTop: 0,
                },
                children: [
                  t.jsx(Mr, { animeData: u, disabled: r, value: i, handleSearchChange: p }),
                  !V() &&
                    o.length <= 10 &&
                    t.jsx(g, {
                      sx: { color: "white", fontStyle: "italic" },
                      children: `Next clue in ${o.length > 5 ? 10 - o.length : 5 - o.length} Tries`,
                    }),
                  V() &&
                    t.jsx(ge, {
                      sx: {
                        backgroundColor: a.quiz.light_red,
                        "&:hover": { backgroundColor: a.quiz.light_red_hover },
                      },
                      onClick: () => O(w + 1),
                      endIcon: t.jsx(Wr, {}),
                      variant: "contained",
                      children: "Next Clue",
                    }),
                  s &&
                    !n &&
                    t.jsx(ge, {
                      onClick: f,
                      sx: {
                        position: "absolute",
                        right: -100,
                        backgroundColor: a.quiz.failed,
                        "&:hover": { backgroundColor: a.quiz.failed_light },
                      },
                      variant: "contained",
                      children: "Give Up!",
                    }),
                ],
              }),
              t.jsx(l, {
                sx: { display: "flex", gap: 1 },
                children:
                  x &&
                  t.jsx(ge, {
                    onClick: N,
                    sx: {
                      backgroundColor: a.quiz.main,
                      color: "white",
                      "&:hover": { backgroundColor: a.quiz.secondary },
                    },
                    variant: "contained",
                    children: "RESET QUIZ",
                  }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const Gl = 150,
  Yl = 10;
function Vl(e, o, r, i) {
  const u = Math.max(o.length, 1) * Gl;
  let p = 2,
    c = u - e * Yl * p;
  i(r - c < 0 ? 0 : r - c);
}
function Ul(e, o, r) {
  const i = o.indexOf(e),
    u = o;
  u.splice(i, 1), r(u);
}
const Kl = re.ANIME + "Solved",
  br = ({ animeData: e, charData: o, endlessMode: r = !0, changeQuizMode: i }) => {
    const [u, p] = d.useState([]),
      [c, s] = d.useState(null),
      [n, f] = d.useState(null),
      [x, h] = d.useState(1e4),
      [b, v] = d.useState(!1),
      [j, k] = d.useState([]),
      [w, O] = d.useState([]),
      [D, _] = d.useState(!1),
      [N, V] = d.useState(!1),
      $ = d.useRef(null),
      S = Re(),
      { refreshKey: G } = St(),
      A = r ? "animeStreak" : "dailyAnimeStreak";
    d.useEffect(() => {
      e.length > 0 && j.length === 0 && k(e);
    }, [j, e]),
      d.useEffect(() => {
        j.length > 0 && !n && M();
      }, [j, M, n]),
      d.useEffect(() => {
        c &&
          setTimeout(() => {
            s(null);
          }, 100);
      }, [c]),
      d.useEffect(() => {
        const E = Fe(re.ANIME);
        C(E);
      }, [G]),
      d.useEffect(() => {
        x <= 0 && _(!0);
      }, [x]);
    function C(E) {
      if (E) {
        const B = E.slice(0, 3);
        O(B);
      }
    }
    function z() {
      k([...e.sort((E, B) => (E.Name < B.Name ? -1 : 1))]), p([]), h(1e4), _(!1), V(!1);
    }
    function M() {
      v(!1), z();
      let E = uo(e, { endlessMode: r });
      if (r) E = uo(e, {});
      else {
        const B = Pt(re.ANIME),
          ae = jo(re.ANIME);
        B && v(!0), ae && V(!0);
      }
      f(E);
    }
    function W(E, B, ae) {
      if (B && n) {
        const te = So(B, n);
        if (
          ((B.ValidFields = te.all),
          s(B),
          Ul(B, j, k),
          p([B, ...u]),
          te.all.length + 1 === Object.keys(n).length)
        ) {
          Oe([Ce.totalAnimeGuesses], u.length + 1),
            wo(ae, V, v, r, Kl, re.ANIME, x, n, te, u.length + 1);
          const L = Fe(re.ANIME);
          C(L), $.current && $.current.setStreak();
        }
        Vl(te.short.length, u, x, h);
      }
    }
    return t.jsxs(l, {
      sx: { position: "relative", paddingTop: r ? 2 : 0 },
      children: [
        !r &&
          t.jsxs(l, {
            sx: {
              borderRadius: 2,
              background: a.gradient,
              marginBottom: 4,
              border: `1px solid ${a.quiz.light}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingY: 2,
            },
            children: [
              t.jsx(l, {
                sx: { display: "flex", flexDirection: "column", alignItems: "center" },
                children: t.jsxs(l, {
                  sx: { display: "flex", height: "70px", alignItems: "center" },
                  children: [
                    w.map((E, B) =>
                      t.jsxs(
                        l,
                        {
                          sx: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingX: 2,
                            color: "white",
                          },
                          children: [
                            B === 0 && t.jsx(g, { fontSize: "24px", children: "🏆" }),
                            B === 1 && t.jsx(g, { fontSize: "24px", children: "🥈" }),
                            B === 2 && t.jsx(g, { fontSize: "24px", children: "🥉" }),
                            t.jsx(g, { fontSize: "12px", children: "Points: " + E.points }),
                            t.jsx(g, { fontSize: "12px", children: "Date: " + E.date }),
                          ],
                        },
                        B,
                      ),
                    ),
                    w.length === 0 &&
                      t.jsxs(g, {
                        sx: { color: a.quiz.primary_text },
                        textAlign: "center",
                        children: [
                          t.jsx(g, { component: "span", children: "No Scores available." }),
                          t.jsx("br", {}),
                          t.jsx(g, {
                            component: "span",
                            children: "You should definitely change that (*≧ω≦*)",
                          }),
                        ],
                      }),
                  ],
                }),
              }),
              t.jsx(l, {
                sx: {
                  width: "100%",
                  paddingX: 2,
                  marginTop: 2,
                  borderRadius: 2,
                  display: "flex",
                  gap: 2,
                  justifyContent: "space-between",
                  [S.breakpoints.down("md")]: { flexWrap: "wrap" },
                },
                children: t.jsx(Et, { ref: $, streakKey: A }),
              }),
            ],
          }),
        t.jsx(Wl, {
          points: x,
          searchHistory: u,
          isCorrect: b,
          selectedOption: c,
          animeData: j,
          handleSearchChange: W,
          init: M,
          handleGiveUp: () => W(null, n, "giveUp"),
          showGiveUp: D,
          gaveUp: N,
          endlessMode: r,
          originalAnimeData: e,
          targetAnime: n,
          charData: o,
        }),
        n &&
          b &&
          t.jsxs(l, {
            sx: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
            children: [
              t.jsxs(l, {
                sx: {
                  backgroundColor: N ? a.quiz.failed : a.quiz.success,
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingX: 2,
                  paddingY: 3,
                  marginTop: 4,
                  borderRadius: 2,
                  border: N
                    ? `2px solid ${a.quiz.failed_light}`
                    : `2px solid ${a.quiz.success_light}`,
                },
                children: [
                  t.jsx(g, {
                    sx: { fontWeight: "bold", fontSize: "20px", marginBottom: 1 },
                    children: D ? "Better luck next time!" : "Congratulations!",
                  }),
                  t.jsx(g, { sx: { marginBottom: 3 }, children: "The Anime was:" }),
                  t.jsx(g, {
                    sx: {
                      marginBottom: 2,
                      fontWeight: "bold",
                      fontSize: "24px",
                      textAlign: "center",
                    },
                    children: n == null ? void 0 : n.Name,
                  }),
                  t.jsx(l, {
                    width: "200px",
                    component: "img",
                    height: "276px",
                    sx: { objectFit: "cover" },
                    src: _t(n == null ? void 0 : n.id),
                  }),
                ],
              }),
              !r &&
                t.jsx($o, {
                  onClick: (E) => (i == null ? void 0 : i(E, 3)),
                  text: "Next: Blurred Character Quiz",
                }),
            ],
          }),
        (r || (!r && !b)) && t.jsx(Ll, { searchHistory: u, targetAnime: n }),
      ],
    });
  };
function Xl({ searchHistory: e, targetChar: o }) {
  const r = Re();
  function i(p) {
    return p.Name === (o == null ? void 0 : o.Name)
      ? `2px solid ${a.quiz.success_light}`
      : `2px solid ${a.quiz.light}`;
  }
  function u(p) {
    return p.Name === (o == null ? void 0 : o.Name) ? a.quiz.success : a.quiz.main;
  }
  return t.jsx(l, {
    sx: { width: "100%", display: "flex", justifyContent: "center" },
    children: t.jsxs(l, {
      sx: {
        width: "600px",
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        maxHeight: "400px",
        overflowX: "hidden",
        overflowY: "auto",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        border: e.length > 0 ? `1px solid ${a.quiz.light}` : "none",
        borderBottom: 0,
        background: a.gradient,
        [r.breakpoints.down("md")]: { overflowX: "scroll" },
      },
      children: [
        e.length > 0 &&
          t.jsxs(l, {
            sx: {
              display: "grid",
              gridTemplateColumns: "60px repeat(1, 1fr)",
              gap: 2,
              paddingX: 2,
            },
            children: [
              " ",
              t.jsx(l, {
                sx: {
                  gridColumn: "1 / 2",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Image",
              }),
              t.jsx(l, {
                sx: {
                  gridColumn: "2 / 3",
                  textAlign: "center",
                  marginY: 2,
                  fontWeight: "bold",
                  color: a.quiz.primary_text,
                },
                children: "Name",
              }),
            ],
          }),
        e.map((p) =>
          t.jsxs(
            l,
            {
              sx: {
                display: "grid",
                gridTemplateColumns: "60px repeat(1, 1fr)",
                gap: 2,
                paddingX: 2,
                marginBottom: 2,
              },
              children: [
                t.jsx(l, {
                  sx: {
                    gridColumn: "1 / 2",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(nt, {
                    title: p.Name,
                    placement: "bottom",
                    slotProps: {
                      popper: { modifiers: [{ name: "offset", options: { offset: [0, -24] } }] },
                    },
                    children: t.jsx(l, {
                      sx: { maxWidth: "60px", height: "75px", objectFit: "cover" },
                      component: "img",
                      src: Ne(p.id),
                    }),
                  }),
                }),
                t.jsx(l, {
                  sx: {
                    gridColumn: "2 / 3",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 50,
                  },
                  children: t.jsx(l, {
                    sx: {
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: u(p),
                      height: "100%",
                      borderRadius: "4px",
                      border: i(p),
                    },
                    children: t.jsx(g, { children: p.Name }),
                  }),
                }),
              ],
            },
            p.Name,
          ),
        ),
      ],
    }),
  });
}
const Ql = 1e3,
  Jl = re.BLUR + "Solved";
function vr({ charData: e, endlessMode: o = !0 }) {
  const [r, i] = d.useState([]),
    [u, p] = d.useState(null),
    [c, s] = d.useState(null),
    [n, f] = d.useState(1e4),
    [x, h] = d.useState(!1),
    [b, v] = d.useState([]),
    [j, k] = d.useState([]),
    [w, O] = d.useState("C"),
    [D, _] = d.useState(!1),
    [N, V] = d.useState(!1),
    [$, S] = d.useState(50),
    [G, A] = d.useState(!1),
    [C, z] = d.useState(50),
    [M, W] = d.useState(!1),
    [E, B] = d.useState(Date.now()),
    ae = Re(),
    te = d.useRef(null),
    L = d.useRef(null),
    P = d.useRef(null),
    fe = d.useRef(null),
    { refreshKey: Ae } = St(),
    T = o ? "blurStreak" : "dailyBlurStreak";
  d.useEffect(() => {
    e.length > 0 && b.length === 0 && v(e);
  }, [b, e]),
    d.useEffect(() => {
      b.length > 0 && !c && ce();
    }, [b, ce, c]),
    d.useEffect(() => {
      c && !x && !N && q(50);
    }, [c, x, N]),
    d.useEffect(() => {
      u &&
        setTimeout(() => {
          p(null);
        }, 100);
    }, [u]),
    d.useEffect(() => {
      const Q = Fe(re.BLUR);
      U(Q);
    }, [Ae]),
    d.useEffect(() => {
      n <= 0 && !D && (_(!0), A(!0), z($));
    }, [n, D, $]),
    d.useEffect(() => {
      $ === 0 && !x && !N && c && !G && q(50);
    }, [$, x, N, c, G]);
  function U(Q) {
    if (Q) {
      const ie = Q.slice(0, 3);
      k(ie);
    }
  }
  function q(Q) {
    S(G ? (Q === 0 ? 0 : C) : Q);
  }
  function oe() {
    A(!1),
      z(50),
      S(50),
      v([...e.sort((Q, ie) => (Q.Name < ie.Name ? -1 : 1))]),
      i([]),
      f(1e4),
      _(!1),
      V(!1),
      te.current && te.current.resetHint(),
      L.current && (L == null || L.current.resetHint()),
      P.current && (P == null || P.current.resetHint());
  }
  function ce() {
    h(!1), W(!1), B(Date.now()), oe();
    let Q = rt(e, { endlessMode: o, quizMode: "blurred" });
    if (o) for (; !Co(Q, w); ) Q = rt(e, { endlessMode: o, quizMode: "blurred" });
    else {
      const ie = Pt(re.BLUR),
        xe = jo(re.BLUR);
      ie && (h(!0), S(0), z(0), W(!0), B(Date.now())),
        xe && (V(!0), S(0), z(0), W(!0), B(Date.now())),
        (ie || xe) &&
          (L.current && L.current.revealHint(),
          te.current && te.current.revealHint(),
          P.current && P.current.revealHint());
    }
    s(Q);
  }
  function ne(Q) {
    const ie = b.indexOf(Q),
      xe = b;
    xe.splice(ie, 1), v(xe);
  }
  function me(Q, ie, xe) {
    if (ie && c) {
      const Te = So(ie, c);
      if (
        ((ie.ValidFields = Te.all),
        p(ie),
        ne(ie),
        i([ie, ...r]),
        Te.all.length + 1 === Object.keys(c).length)
      ) {
        q(0),
          S(0),
          z(0),
          W(!0),
          B(Date.now()),
          Oe([Ce.totalBlurredCharacterGuesses], r.length + 1),
          wo(xe, V, h, o, Jl, re.BLUR, n, c, Te, r.length + 1);
        const it = Fe(re.BLUR);
        U(it), fe.current && fe.current.setStreak();
        return;
      }
      const je = n,
        Y = Math.max(0, n - Ql);
      f(Y), je > 0 && Y <= 0 ? (A(!0), z($)) : G || q($ - 5);
    }
  }
  return t.jsxs(l, {
    sx: { position: "relative", paddingTop: o ? 2 : 0 },
    children: [
      !o &&
        t.jsxs(l, {
          sx: {
            borderRadius: 2,
            background: a.gradient,
            marginBottom: 4,
            border: `1px solid ${a.quiz.light}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingY: 2,
          },
          children: [
            t.jsx(l, {
              sx: { display: "flex", flexDirection: "column", alignItems: "center" },
              children: t.jsxs(l, {
                sx: { display: "flex", height: "70px", alignItems: "center" },
                children: [
                  j.map((Q, ie) =>
                    t.jsxs(
                      l,
                      {
                        sx: {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          paddingX: 2,
                          color: "white",
                        },
                        children: [
                          ie === 0 && t.jsx(g, { fontSize: "24px", children: "🏆" }),
                          ie === 1 && t.jsx(g, { fontSize: "24px", children: "🥈" }),
                          ie === 2 && t.jsx(g, { fontSize: "24px", children: "🥉" }),
                          t.jsx(g, { fontSize: "12px", children: "Points: " + Q.points }),
                          t.jsx(g, { fontSize: "12px", children: "Date: " + Q.date }),
                        ],
                      },
                      ie,
                    ),
                  ),
                  j.length === 0 &&
                    t.jsxs(g, {
                      sx: { color: a.quiz.primary_text },
                      textAlign: "center",
                      children: [
                        t.jsx(g, { component: "span", children: "No Scores available." }),
                        t.jsx("br", {}),
                        t.jsx(g, {
                          component: "span",
                          children: "You should definitely change that (*≧ω≦*)",
                        }),
                      ],
                    }),
                ],
              }),
            }),
            t.jsx(Et, { ref: fe, streakKey: T }),
          ],
        }),
      t.jsx(l, {
        sx: {
          borderRadius: 2,
          background: a.gradient,
          marginBottom: 4,
          border: `1px solid ${a.quiz.light}`,
          paddingY: 2,
        },
        children: t.jsxs(l, {
          sx: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            width: "100%",
            position: "relative",
            [ae.breakpoints.down("md")]: { flexDirection: "column" },
          },
          children: [
            t.jsxs(l, {
              sx: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 2,
                position: "absolute",
                left: "calc(50% - 420px)",
                zIndex: 1,
                [ae.breakpoints.down("md")]: { position: "initial" },
              },
              children: [
                t.jsx(gt, {
                  onReveal: () => {},
                  ref: P,
                  cardText: (c == null ? void 0 : c.Studio) ?? "",
                  cardTitle: "Studio",
                  disabled: x || N ? !1 : r.length <= 3,
                  sx: { width: "250px" },
                }),
                t.jsx(gt, {
                  onReveal: () => {},
                  ref: te,
                  cardText: (c == null ? void 0 : c.First_Release_Year.toString()) ?? "",
                  cardTitle: "First Release Year",
                  disabled: x || N ? !1 : r.length <= 6,
                  sx: { width: "250px" },
                }),
                t.jsx(gt, {
                  onReveal: () => {},
                  ref: L,
                  cardText: (c == null ? void 0 : c.Anime.toString()) ?? "",
                  cardTitle: "Anime",
                  disabled: x || N ? !1 : r.length <= 8,
                  sx: { width: "250px" },
                }),
              ],
            }),
            c &&
              t.jsxs(
                l,
                {
                  sx: {
                    gap: 2,
                    position: "relative",
                    width: "300px",
                    height: "420px",
                    overflow: "hidden",
                    backgroundColor: "rgba(200, 200, 200, 0.2)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  },
                  children: [
                    t.jsx(l, {
                      sx: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "300px",
                        height: "420px",
                        backgroundImage: `url(${Ne(c.id)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: `blur(${G ? C : $}px)`,
                        transform: "scale(1.05)",
                        zIndex: 1,
                        willChange: "filter, opacity",
                      },
                    }),
                    t.jsx(l, {
                      component: "img",
                      src: Ne(c.id),
                      sx: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "300px",
                        height: "420px",
                        objectFit: "cover",
                        filter: `blur(${G ? C : $}px)`,
                        opacity: $ > 0 ? 0.5 : 0,
                        zIndex: 1,
                      },
                      loading: "eager",
                    }),
                    t.jsx(
                      l,
                      {
                        component: "img",
                        src: Ne(c.id),
                        sx: {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "300px",
                          height: "420px",
                          objectFit: "cover",
                          opacity: M || x || N ? 1 : 0,
                          transition: "opacity 0.3s ease",
                          zIndex: 10,
                        },
                        loading: "eager",
                        onError: (Q) => {
                          const ie = Q.currentTarget,
                            xe = ie.src;
                          (ie.src = ""),
                            setTimeout(() => {
                              ie.src = xe;
                            }, 200);
                        },
                      },
                      `clean-image-${E}`,
                    ),
                  ],
                },
                `${c.Name}-container-${Date.now()}`,
              ),
            (x || N) &&
              t.jsxs(l, {
                sx: {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "absolute",
                  left: "calc(50% + 180px)",
                  zIndex: 1,
                  [ae.breakpoints.down("md")]: { position: "initial" },
                },
                children: [
                  t.jsx(g, {
                    sx: { color: "white", fontSize: 20 },
                    children: "Todays Character was:",
                  }),
                  t.jsx(g, {
                    sx: { fontSize: 24, fontWeight: "bold", color: "white" },
                    children: c == null ? void 0 : c.Name,
                  }),
                ],
              }),
          ],
        }),
      }),
      t.jsx(qr, {
        difficulty: w,
        setDifficulty: O,
        points: n,
        searchHistory: r,
        isCorrect: x,
        selectedOption: u,
        charData: b,
        handleSearchChange: me,
        init: () => {
          A(!1), ce();
        },
        handleGiveUp: () => {
          z($), A(!0), me(null, c, "giveUp");
        },
        showGiveUp: D,
        gaveUp: N,
        endlessMode: o,
        originalCharData: e,
        showPreviewImage: !1,
        showAnimeHintOption: !1,
        mode: "blurred",
        quizKey: re.BLUR,
      }),
      (o || (!o && !x)) && t.jsx(Xl, { searchHistory: r, targetChar: c }),
    ],
  });
}
function He(e) {
  return { id: `simple-tab-${e}`, "aria-controls": `simple-tabpanel-${e}` };
}
function Gr({ value: e, handleChange: o }) {
  const r = Re(),
    i = Fi(r.breakpoints.down("md"));
  return t.jsxs(Ds, {
    variant: i ? "fullWidth" : "standard",
    orientation: "vertical",
    sx: { "& .MuiTabs-indicator": { backgroundColor: a.quiz.light } },
    value: e,
    onChange: o,
    "aria-label": "basic tabs example",
    children: [
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Daily Character Quiz",
        ...He(0),
      }),
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Daily Image Quiz",
        ...He(1),
      }),
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Daily Anime Quiz",
        ...He(2),
      }),
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Daily Blurred Character Quiz",
        ...He(3),
      }),
      t.jsx(yo, { sx: { backgroundColor: "white", marginX: 1 } }),
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Endless Character Quiz",
        ...He(5),
      }),
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Endless Image Quiz",
        ...He(6),
      }),
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Endless Anime Quiz",
        ...He(7),
      }),
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Endless Blurred Character Quiz",
        ...He(8),
      }),
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Multiple Choice Quiz",
        ...He(9),
      }),
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Kiss, Marry, Kill",
        ...He(10),
      }),
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Higher or Lower",
        ...He(11),
      }),
      t.jsx(Me, {
        sx: { color: a.quiz.light, "&.Mui-selected": { color: "white" } },
        label: "Character Birthdays",
        ...He(12),
      }),
    ],
  });
}
var No = {},
  Zl = De;
Object.defineProperty(No, "__esModule", { value: !0 });
var Yr = (No.default = void 0),
  ea = Zl(Be()),
  ta = t,
  oa = (0, ea.default)(
    (0, ta.jsx)("path", { d: "M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z" }),
    "BarChart",
  );
Yr = No.default = oa;
var Bo = {},
  ra = De;
Object.defineProperty(Bo, "__esModule", { value: !0 });
var Vr = (Bo.default = void 0),
  na = ra(Be()),
  ia = t,
  sa = (0, na.default)(
    (0, ia.jsx)("path", {
      d: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z",
    }),
    "CalendarMonth",
  );
Vr = Bo.default = sa;
var Do = {},
  la = De;
Object.defineProperty(Do, "__esModule", { value: !0 });
var go = (Do.default = void 0),
  aa = la(Be()),
  ca = t,
  da = (0, aa.default)(
    (0, ca.jsx)("path", { d: "M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" }),
    "KeyboardArrowUp",
  );
go = Do.default = da;
var Lo = {},
  ua = De;
Object.defineProperty(Lo, "__esModule", { value: !0 });
var mo = (Lo.default = void 0),
  pa = ua(Be()),
  fa = t,
  xa = (0, pa.default)(
    (0, fa.jsx)("path", { d: "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }),
    "KeyboardArrowDown",
  );
mo = Lo.default = xa;
const ha = ({ charData: e, animeData: o }) => {
  const [r, i] = d.useState("height"),
    [u, p] = d.useState(null),
    [c, s] = d.useState(null),
    [n, f] = d.useState(null),
    [x, h] = d.useState(null),
    [b, v] = d.useState(0),
    [j, k] = d.useState(!1),
    [w, O] = d.useState(!1),
    { refreshKey: D } = St();
  d.useEffect(() => {
    if (r === "height") {
      const C = Fe(re.HIGHERLOWER_HEIGHT);
      p(C[0] || null);
    } else if (r === "animeReleaseYear") {
      const C = Fe(re.HIGHERLOWER_ANIME);
      p(C[0] || null);
    }
  }, [D, r]);
  function _(C) {
    const z = Fe(r === "height" ? re.HIGHERLOWER_HEIGHT : re.HIGHERLOWER_ANIME);
    C && (z.length === 0 || C.points > z[0].points) && (co(re.HIGHERLOWER_HEIGHT, C), p(C));
  }
  function N() {
    if ((v(0), O(!1), r === "height")) {
      const C = e.filter((E) => E.Height !== null),
        z = C[Math.floor(Math.random() * C.length)];
      let M = C[Math.floor(Math.random() * C.length)],
        W = C[Math.floor(Math.random() * C.length)];
      s(z), f(M), h(W);
    } else if (r === "animeReleaseYear") {
      const C = o[Math.floor(Math.random() * o.length)];
      s(C);
      let z = o[Math.floor(Math.random() * o.length)];
      f(z);
      let M = o[Math.floor(Math.random() * o.length)];
      h(M);
    }
  }
  function V(C) {
    r === "height" ? G(C) : r === "animeReleaseYear" && A(C);
  }
  function $() {
    s(n), f(x);
    const C = e.filter((M) => M.Height !== null),
      z = C[Math.floor(Math.random() * C.length)];
    if (z.id === (c == null ? void 0 : c.id) || z.id === (n == null ? void 0 : n.id)) {
      $();
      return;
    }
    h(z);
  }
  function S() {
    s(n), f(x);
    const C = o[Math.floor(Math.random() * o.length)];
    if (C.id === (n == null ? void 0 : n.id) || C.id === (x == null ? void 0 : x.id)) {
      S();
      return;
    }
    h(C);
  }
  function G(C) {
    if (c && n && "Height" in c && "Height" in n)
      if (C === "higher" && n.Height > c.Height)
        v(b + 1),
          k(!0),
          setTimeout(() => {
            $(), k(!1);
          }, 500);
      else if (C === "lower" && n.Height < c.Height)
        v(b + 1),
          k(!0),
          setTimeout(() => {
            $(), k(!1);
          }, 500);
      else {
        O(!0);
        const z = {
          points: b ?? 0,
          date: new Date().toLocaleString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        };
        Oe([Ce.higherlowerHeightGamesPlayed], (Tt(Ce.higherlowerHeightGamesPlayed) ?? 0) + 1),
          Oe(
            [Ce.higherlowerHeightPointsTotal],
            (Tt(Ce.higherlowerHeightPointsTotal) ?? 0) + (b ?? 0),
          ),
          _(z);
        return;
      }
  }
  function A(C) {
    if (c && n && "First_Release_Year" in c && "First_Release_Year" in n)
      if (C === "higher" && n.First_Release_Year > c.First_Release_Year)
        v(b + 1),
          k(!0),
          setTimeout(() => {
            S(), k(!1);
          }, 500);
      else if (C === "lower" && n.First_Release_Year < c.First_Release_Year)
        v(b + 1),
          k(!0),
          setTimeout(() => {
            S(), k(!1);
          }, 500);
      else if (n.First_Release_Year === c.First_Release_Year)
        v(b + 1),
          k(!0),
          setTimeout(() => {
            S(), k(!1);
          }, 500);
      else {
        const z = {
          points: b ?? 0,
          date: new Date().toLocaleString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        };
        co(re.HIGHERLOWER_ANIME, z),
          Oe([Ce.higherlowerAnimeGamesPlayed], (Tt(Ce.higherlowerAnimeGamesPlayed) ?? 0) + 1),
          Oe(
            [Ce.higherlowerAnimePointsTotal],
            (Tt(Ce.higherlowerAnimePointsTotal) ?? 0) + (b ?? 0),
          ),
          _(z),
          N();
        return;
      }
  }
  return (
    d.useEffect(() => {
      N();
    }, [r]),
    t.jsxs(l, {
      children: [
        t.jsxs(l, {
          sx: {
            position: "relative",
            background: a.gradient,
            padding: 4,
            borderRadius: 2,
            border: `1px solid ${a.quiz.light}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 4,
          },
          children: [
            u &&
              t.jsxs(l, {
                sx: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingX: 2,
                  color: "white",
                  position: "absolute",
                  left: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                },
                children: [
                  t.jsx(g, { fontSize: "24px", children: "🏆" }),
                  t.jsx(g, { fontSize: "12px", children: "Points: " + u.points }),
                  t.jsx(g, { fontSize: "12px", children: "Date: " + u.date }),
                ],
              }),
            t.jsxs(g, {
              sx: { fontWeight: "bold", fontSize: "28px", color: "white" },
              children: [
                t.jsx(g, {
                  sx: { color: a.quiz.success, fontWeight: "bold", fontSize: "32px" },
                  component: "span",
                  children: "Higher",
                }),
                " ",
                "or",
                " ",
                t.jsx(g, {
                  sx: { color: a.quiz.failed, fontWeight: "bold", fontSize: "32px" },
                  component: "span",
                  children: "Lower",
                }),
              ],
            }),
            t.jsx(g, {
              sx: {
                color: "white",
                marginBottom: 1,
                fontSize: "20px",
                fontWeight: "bold",
                marginTop: 2,
              },
              children: "Game Mode",
            }),
            t.jsxs(Dr, {
              value: r,
              exclusive: !0,
              onChange: (C, z) => {
                z !== null && i(z);
              },
              "aria-label": "game mode",
              sx: { backgroundColor: a.quiz.main },
              children: [
                t.jsx(At, {
                  value: "height",
                  "aria-label": "height",
                  children: t.jsx(g, {
                    sx: { color: r === "height" ? "white" : "inherit" },
                    children: "Height",
                  }),
                }),
                t.jsx(At, {
                  sx: { backgroundColor: r === "animeReleaseYear" ? a.quiz.light : "transparent" },
                  value: "animeReleaseYear",
                  "aria-label": "animeReleaseYear",
                  children: t.jsx(g, {
                    sx: { color: r === "animeReleaseYear" ? "white" : "inherit" },
                    children: "Anime Release Year",
                  }),
                }),
              ],
            }),
          ],
        }),
        t.jsxs(l, {
          sx: {
            position: "relative",
            background: a.gradient,
            padding: 4,
            borderRadius: 2,
            border: `1px solid ${a.quiz.light}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "500px",
          },
          children: [
            t.jsx(l, {
              position: "absolute",
              sx: { left: 20, top: 20, [gn.breakpoints.down("md")]: { left: 60 } },
              children: t.jsx(g, {
                sx: { color: "white", fontSize: "24px", paddingLeft: "2px" },
                children: `${String(b).padStart(4, "0")}`,
              }),
            }),
            t.jsxs(l, {
              sx: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                width: "100%",
                position: "relative",
              },
              children: [
                t.jsxs(l, {
                  sx: { display: "flex", alignItems: "center", position: "relative" },
                  children: [
                    c &&
                      t.jsx(
                        l,
                        {
                          width: "300px",
                          component: "img",
                          height: "400px",
                          sx: { objectFit: "cover" },
                          src:
                            r === "height"
                              ? Ne(c == null ? void 0 : c.id)
                              : _t(c == null ? void 0 : c.id),
                        },
                        c.id,
                      ),
                    t.jsx(l, {
                      sx: {
                        backgroundColor: a.quiz.primary_text,
                        padding: 2,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "60px",
                        width: "60px",
                        flexShrink: 0,
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10,
                      },
                      children: t.jsx(g, { sx: { fontWeight: "bold" }, children: "VS." }),
                    }),
                    t.jsxs(l, {
                      sx: { position: "relative", width: "300px", height: "400px" },
                      children: [
                        n &&
                          t.jsx(
                            l,
                            {
                              width: "300px",
                              component: "img",
                              height: "400px",
                              sx: {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                objectFit: "cover",
                                transition: "transform 0.5s ease-in-out",
                                transform: j ? "translateX(-300px)" : "translateX(0)",
                                zIndex: 2,
                              },
                              src:
                                r === "height"
                                  ? Ne(n == null ? void 0 : n.id)
                                  : _t(n == null ? void 0 : n.id),
                            },
                            n.id,
                          ),
                        x &&
                          t.jsx(
                            l,
                            {
                              width: "300px",
                              component: "img",
                              height: "400px",
                              sx: {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                objectFit: "cover",
                                zIndex: 1,
                              },
                              src:
                                r === "height"
                                  ? Ne(x == null ? void 0 : x.id)
                                  : _t(x == null ? void 0 : x.id),
                            },
                            x.id,
                          ),
                      ],
                    }),
                  ],
                }),
                w &&
                  t.jsxs(l, {
                    sx: {
                      position: "absolute",
                      width: "600px",
                      height: "400px",
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      zIndex: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    },
                    children: [
                      t.jsx(g, {
                        sx: { color: "white", fontSize: "32px", fontWeight: "bold" },
                        children: "Game Over",
                      }),
                      t.jsxs(g, {
                        sx: { color: "white", fontSize: "24px", marginTop: 2 },
                        children: ["Your final score: ", b],
                      }),
                      t.jsx(ge, {
                        variant: "contained",
                        sx: { marginTop: 3 },
                        onClick: () => N(),
                        children: "Restart",
                      }),
                    ],
                  }),
                c &&
                  !w &&
                  r === "height" &&
                  t.jsxs(l, {
                    sx: {
                      position: "absolute",
                      left: "7%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      color: "white",
                      maxWidth: "200px",
                    },
                    children: [
                      t.jsx(g, {
                        sx: {
                          fontSize: "24px",
                          wordWrap: "break-word",
                          textAlign: "center",
                          whiteSpace: "break-spaces",
                        },
                        children: c.Name,
                      }),
                      t.jsx(g, { children: "is" }),
                      t.jsxs(g, {
                        sx: { fontWeight: "bold", fontSize: "28px" },
                        children: [c.Height, " cm"],
                      }),
                    ],
                  }),
                c &&
                  !w &&
                  r === "animeReleaseYear" &&
                  t.jsxs(l, {
                    sx: {
                      position: "absolute",
                      left: "7%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      color: "white",
                      maxWidth: "200px",
                    },
                    children: [
                      t.jsx(g, {
                        sx: {
                          fontSize: "24px",
                          wordWrap: "break-word",
                          textAlign: "center",
                          whiteSpace: "break-spaces",
                        },
                        children: c.Name,
                      }),
                      t.jsx(g, { children: "is from" }),
                      t.jsx(g, {
                        sx: { fontWeight: "bold", fontSize: "28px" },
                        children: c.First_Release_Year,
                      }),
                    ],
                  }),
                n &&
                  !w &&
                  r === "height" &&
                  t.jsxs(l, {
                    sx: {
                      position: "absolute",
                      right: "7%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      color: "white",
                      maxWidth: "200px",
                    },
                    children: [
                      t.jsxs(g, {
                        sx: {
                          fontSize: "24px",
                          wordWrap: "break-word",
                          textAlign: "center",
                          whiteSpace: "break-spaces",
                        },
                        children: [n.Name, "'s height is"],
                      }),
                      t.jsx(ge, {
                        sx: {
                          backgroundColor: a.quiz.success,
                          width: "100px",
                          "&:hover": { backgroundColor: a.quiz.success_light },
                        },
                        onClick: () => V("higher"),
                        endIcon: t.jsx(go, {}),
                        variant: "contained",
                        children: "Higher",
                      }),
                      t.jsx(ge, {
                        sx: {
                          backgroundColor: a.quiz.failed,
                          width: "100px",
                          "&:hover": { backgroundColor: a.quiz.failed_light },
                        },
                        onClick: () => V("lower"),
                        endIcon: t.jsx(mo, {}),
                        variant: "contained",
                        children: "Lower",
                      }),
                    ],
                  }),
                n &&
                  !w &&
                  r === "animeReleaseYear" &&
                  t.jsxs(l, {
                    sx: {
                      position: "absolute",
                      right: "7%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      color: "white",
                      maxWidth: "200px",
                    },
                    children: [
                      t.jsxs(g, {
                        sx: {
                          fontSize: "24px",
                          wordWrap: "break-word",
                          textAlign: "center",
                          whiteSpace: "break-spaces",
                        },
                        children: [n.Name, "'s first release year is"],
                      }),
                      t.jsx(ge, {
                        sx: {
                          backgroundColor: a.quiz.success,
                          width: "100px",
                          "&:hover": { backgroundColor: a.quiz.success_light },
                        },
                        onClick: () => V("higher"),
                        endIcon: t.jsx(go, {}),
                        variant: "contained",
                        children: "Higher",
                      }),
                      t.jsx(ge, {
                        sx: {
                          backgroundColor: a.quiz.failed,
                          width: "100px",
                          "&:hover": { backgroundColor: a.quiz.failed_light },
                        },
                        onClick: () => V("lower"),
                        endIcon: t.jsx(mo, {}),
                        variant: "contained",
                        children: "Lower",
                      }),
                    ],
                  }),
              ],
            }),
          ],
        }),
      ],
    })
  );
};
var qo = {},
  ga = De;
Object.defineProperty(qo, "__esModule", { value: !0 });
var Ur = (qo.default = void 0),
  ma = ga(Be()),
  ba = t,
  va = (0, ma.default)(
    (0, ba.jsx)("path", {
      d: "m21.9 8.89-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zm-2.99-3.9 1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52 9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41-.25-.29-.37-.68-.33-1.07zm-4.45-.16L5.05 5h1.97l-.58 4.86c-.08.65-.6 1.14-1.21 1.14-.49 0-.8-.29-.93-.47-.27-.32-.36-.75-.26-1.17zM5 19v-6.03c.08.01.15.03.23.03.87 0 1.66-.36 2.24-.95.6.6 1.4.95 2.31.95.87 0 1.65-.36 2.23-.93.59.57 1.39.93 2.29.93.84 0 1.64-.35 2.24-.95.58.59 1.37.95 2.24.95.08 0 .15-.02.23-.03V19H5z",
    }),
    "Storefront",
  );
Ur = qo.default = va;
const ao = ({ title: e, icon: o, onClick: r, disabled: i, variant: u = "default" }) =>
    t.jsx(nt, {
      title: e,
      arrow: !0,
      placement: "right",
      children: t.jsx(l, {
        sx: { zIndex: 1e3 },
        children: t.jsx(ge, {
          variant: "outlined",
          sx: {
            backgroundColor: u === "comingsoon" ? a.quiz.light_red_hover : a.quiz.secondary,
            color: "white",
            borderColor: "transparent",
            height: "60px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            "&:hover": { backgroundColor: a.quiz.main, borderColor: "transparent" },
          },
          onClick: () => {
            r();
          },
          disabled: i,
          children: o,
        }),
      }),
    }),
  yr = ({ title: e, icon: o, href: r, disabled: i, variant: u = "default" }) => {
    const p = u === "comingsoon" ? a.quiz.light_red_hover : a.quiz.secondary,
      c = u && i ? p : i ? a.quiz.disabled : u === "comingsoon" ? a.quiz.light_red : a.quiz.main;
    return t.jsx(nt, {
      title: e,
      arrow: !0,
      placement: "right",
      children: t.jsx(l, {
        sx: { zIndex: 1e3 },
        children: t.jsx($r, {
          href: r,
          component: "button",
          disabled: i,
          children: t.jsx(l, {
            sx: {
              width: "68px",
              backgroundColor: p,
              color: "white",
              borderColor: "transparent",
              height: "60px",
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: i ? "default" : "pointer",
              "&:hover": { backgroundColor: c, borderColor: "transparent" },
            },
            children: o,
          }),
        }),
      }),
    });
  },
  ya = ({ value: e, handleChange: o, userAvailableCredits: r, getTotalScore: i }) =>
    t.jsxs(l, {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      children: [
        t.jsxs(l, {
          children: [
            t.jsx(Gr, { value: e, handleChange: o }),
            t.jsx(yo, { sx: { backgroundColor: "white", marginX: 1 } }),
          ],
        }),
        t.jsx(l, {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          children: t.jsxs(l, {
            sx: { display: "flex", justifyContent: "space-between", width: "100%" },
            children: [
              t.jsxs(l, {
                padding: 2,
                sx: { color: "white" },
                children: [
                  t.jsx(g, { children: "Today's score:" }),
                  t.jsxs(g, {
                    children: [
                      t.jsx(g, {
                        component: "span",
                        sx: { fontWeight: "bold", color: a.quiz.light_red, marginRight: 1 },
                        children: i,
                      }),
                      t.jsx(g, { component: "span", fontSize: 12, children: "/40000" }),
                    ],
                  }),
                ],
              }),
              t.jsxs($r, {
                href: "/tcg",
                sx: {
                  color: "white",
                  display: "flex",
                  gap: 0.5,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  cursor: "pointer",
                  padding: 2,
                },
                children: [t.jsx(g, { children: "🪙" }), t.jsx(g, { children: r })],
              }),
            ],
          }),
        }),
      ],
    }),
  za = () => {
    const [e, o] = d.useState([]),
      [r, i] = d.useState([]),
      [u, p] = d.useState(to(Mt().toISOString())),
      [c, s] = d.useState(eo()),
      n = Re();
    function f() {
      const j = zn();
      return Rn(j);
    }
    d.useEffect(() => {
      if (
        (e.length === 0 && o([...Uo.sort((j, k) => (j.Name < k.Name ? -1 : 1))]),
        e && r.length === 0)
      ) {
        const j = Sn(e);
        i(j.sort((k, w) => (k.Name < w.Name ? -1 : 1)));
      }
    }, [e, Uo, r]);
    function x(j) {
      const { children: k, value: w, index: O, ...D } = j;
      return t.jsx("div", {
        role: "tabpanel",
        hidden: w !== O,
        id: `simple-tabpanel-${O}`,
        "aria-labelledby": `simple-tab-${O}`,
        ...D,
        children: w === O && t.jsx(l, { sx: { paddingY: 3 }, children: k }),
      });
    }
    const [h, b] = d.useState(0),
      v = (j, k) => {
        b(k);
      };
    return t.jsx(t.Fragment, {
      children: t.jsxs(l, {
        sx: {
          backgroundColor: a.quiz.background,
          background: `url(${In})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          maxWidth: "100%",
          minHeight: "100vh",
          position: "relative",
        },
        children: [
          t.jsxs(l, {
            position: "relative",
            sx: { [n.breakpoints.down("md")]: { display: "none" } },
            children: [
              t.jsxs(l, {
                sx: {
                  position: "absolute",
                  top: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                children: [
                  t.jsx(Lt, {
                    title: "Gamemodes",
                    icon: t.jsx(fo, { fontSize: "large" }),
                    onOpenFn: () => {
                      p(to(Mt().toISOString())), s(eo());
                    },
                    children: t.jsx(ya, {
                      value: h,
                      handleChange: v,
                      getTotalScore: u,
                      userAvailableCredits: c,
                    }),
                  }),
                  t.jsx(Lt, {
                    title: "Anime Index",
                    icon: t.jsx(ho, { fontSize: "large" }),
                    sx: { padding: 2 },
                    children: t.jsx(mr, { animeData: r }),
                  }),
                  t.jsx(yr, {
                    title: "Coming Soon: TCG Shop",
                    icon: t.jsx(Ur, { fontSize: "large" }),
                    href: "/tcg",
                    disabled: !0,
                    variant: "comingsoon",
                  }),
                  t.jsx(yr, {
                    title: "Coming Soon: Collection",
                    icon: t.jsx($n, { fontSize: "large" }),
                    href: "/collection",
                    disabled: !0,
                    variant: "comingsoon",
                  }),
                  t.jsx(ao, {
                    title: "How to play",
                    icon: t.jsx(xo, { fontSize: "large" }),
                    onClick: () => {
                      yt.openDialog("howToPlay");
                    },
                  }),
                  t.jsx(ao, {
                    title: "Score Calendar",
                    icon: t.jsx(Vr, { fontSize: "large" }),
                    onClick: () => {
                      yt.openDialog("scoreCalendar", f());
                    },
                  }),
                  t.jsx(ao, {
                    title: "Statistics",
                    icon: t.jsx(Yr, { fontSize: "large" }),
                    onClick: () => {
                      yt.openDialog("statistics");
                    },
                  }),
                ],
              }),
              t.jsx(nt, {
                title: "Profile",
                arrow: !0,
                placement: "right",
                children: t.jsx(l, {
                  sx: { position: "absolute", top: 40, right: 0, zIndex: 1e3 },
                  children: t.jsx(ge, {
                    variant: "outlined",
                    sx: {
                      backgroundColor: a.quiz.secondary,
                      color: "white",
                      borderColor: "transparent",
                      height: "80px",
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      "&:hover": { backgroundColor: a.quiz.main, borderColor: "transparent" },
                      paddingY: 2,
                    },
                    onClick: () => {
                      yt.openDialog("settings");
                    },
                    children: t.jsx(Yo, {}),
                  }),
                }),
              }),
            ],
          }),
          t.jsx(l, {
            sx: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              [n.breakpoints.down("md")]: { minHeight: "100vh" },
            },
            children: t.jsxs(l, {
              sx: { width: "80%", [n.breakpoints.down("md")]: { width: "95%" } },
              children: [
                t.jsx(x, {
                  value: h,
                  index: 0,
                  children: t.jsx(hr, {
                    charData: e,
                    endlessMode: !1,
                    changeQuizMode: (j, k) => v(j, k),
                  }),
                }),
                t.jsx(x, {
                  value: h,
                  index: 1,
                  children: t.jsx(gr, {
                    animeData: r,
                    charData: e,
                    endlessMode: !1,
                    changeQuizMode: (j, k) => v(j, k),
                  }),
                }),
                t.jsx(x, {
                  value: h,
                  index: 2,
                  children: t.jsx(br, {
                    animeData: r,
                    endlessMode: !1,
                    changeQuizMode: (j, k) => v(j, k),
                    charData: e,
                  }),
                }),
                t.jsx(x, {
                  value: h,
                  index: 3,
                  children: t.jsx(vr, { charData: e, endlessMode: !1 }),
                }),
                t.jsx(x, {
                  value: h,
                  index: 5,
                  children: t.jsx(hr, { charData: e, endlessMode: !0 }),
                }),
                t.jsx(x, {
                  value: h,
                  index: 6,
                  children: t.jsx(gr, { animeData: r, charData: e, endlessMode: !0 }),
                }),
                t.jsx(x, {
                  value: h,
                  index: 7,
                  children: t.jsx(br, { animeData: r, endlessMode: !0, charData: e }),
                }),
                t.jsx(x, { value: h, index: 8, children: t.jsx(vr, { charData: e }) }),
                t.jsx(x, {
                  value: h,
                  index: 9,
                  children: t.jsx(yl, { animeData: r, charData: e }),
                }),
                t.jsx(x, { value: h, index: 10, children: t.jsx(Dl, { charData: e }) }),
                t.jsx(x, {
                  value: h,
                  index: 11,
                  children: t.jsx(ha, { charData: e, animeData: r }),
                }),
                t.jsx(x, {
                  value: h,
                  index: 12,
                  children: t.jsx(mn, { title: "Birthdays", data: wn(e) }),
                }),
              ],
            }),
          }),
          t.jsx(l, {
            sx: {
              position: "absolute",
              bottom: 0,
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              [n.breakpoints.down("md")]: { display: "none" },
            },
            children: t.jsx(g, { sx: { color: "white", padding: 1 }, children: "Version " + kn }),
          }),
          t.jsxs(l, {
            position: "sticky",
            sx: {
              bottom: 0,
              display: "flex",
              zIndex: 1e3,
              [n.breakpoints.up("md")]: { display: "none" },
            },
            children: [
              t.jsx(l, {
                sx: { backgroundColor: "red", display: "flex", justifyContent: "center" },
                flexGrow: 1,
                children: t.jsx(Lt, {
                  title: "Anime Index",
                  icon: t.jsx(ho, { fontSize: "large" }),
                  children: t.jsx(mr, { animeData: r }),
                }),
              }),
              t.jsx(l, {
                sx: { backgroundColor: "green", display: "flex", justifyContent: "center" },
                flexGrow: 1,
                children: t.jsx(Lt, {
                  title: "Gamemodes",
                  icon: t.jsx(fo, { fontSize: "large" }),
                  onOpenFn: () => {
                    p(to(Mt().toISOString())), s(eo());
                  },
                  children: t.jsxs(l, {
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    children: [
                      t.jsxs(l, {
                        children: [
                          t.jsx(Gr, { value: h, handleChange: v }),
                          t.jsx(yo, { sx: { backgroundColor: "white", marginX: 1 } }),
                        ],
                      }),
                      t.jsxs(l, {
                        sx: { display: "flex", justifyContent: "space-between" },
                        children: [
                          t.jsxs(l, {
                            padding: 2,
                            sx: { color: "white" },
                            children: [
                              t.jsx(g, { children: "Today's score:" }),
                              t.jsxs(g, {
                                children: [
                                  t.jsx(g, {
                                    component: "span",
                                    sx: {
                                      fontWeight: "bold",
                                      color: a.quiz.light_red,
                                      marginRight: 1,
                                    },
                                    children: u,
                                  }),
                                  t.jsx(g, { component: "span", fontSize: 12, children: "/40000" }),
                                ],
                              }),
                            ],
                          }),
                          t.jsxs(l, {
                            padding: 2,
                            sx: {
                              color: "white",
                              display: "flex",
                              gap: 0.5,
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                            },
                            children: [t.jsx(g, { children: "🪙" }), t.jsx(g, { children: c })],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
              t.jsx(l, {
                sx: { display: "flex", justifyContent: "center", maxWidth: "25%", boxShadow: 1 },
                flexGrow: 1,
                children: t.jsx(nt, {
                  title: "How to play",
                  arrow: !0,
                  placement: "right",
                  children: t.jsx(l, {
                    sx: { width: "100%" },
                    children: t.jsx(ge, {
                      variant: "outlined",
                      sx: {
                        backgroundColor: a.quiz.secondary,
                        color: "white",
                        borderColor: "transparent",
                        height: "60px",
                        borderRadius: 0,
                        "&:hover": { backgroundColor: a.quiz.main, borderColor: "transparent" },
                        width: "100%",
                        boxShadow: 1,
                      },
                      onClick: () => {
                        yt.openDialog("howToPlay");
                      },
                      children: t.jsx(xo, { fontSize: "large" }),
                    }),
                  }),
                }),
              }),
              t.jsx(l, {
                sx: { display: "flex", justifyContent: "center", maxWidth: "25%", boxShadow: 1 },
                flexGrow: 1,
                children: t.jsx(nt, {
                  title: "Profile",
                  arrow: !0,
                  placement: "right",
                  children: t.jsx(l, {
                    sx: { width: "100%" },
                    children: t.jsx(ge, {
                      variant: "outlined",
                      sx: {
                        backgroundColor: a.quiz.secondary,
                        color: "white",
                        borderColor: "transparent",
                        height: "60px",
                        "&:hover": { backgroundColor: a.quiz.main, borderColor: "transparent" },
                        width: "100%",
                        boxShadow: 1,
                      },
                      onClick: () => {
                        yt.openDialog("settings");
                      },
                      children: t.jsx(Yo, { size: 40 }),
                    }),
                  }),
                }),
              }),
            ],
          }),
        ],
      }),
    });
  };
export { za as default };
