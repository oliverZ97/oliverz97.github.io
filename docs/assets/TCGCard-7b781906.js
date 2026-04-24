import {
  j as r,
  av as N,
  N as $,
  a1 as st,
  ax as it,
  O as l,
  aw as A,
  Q as D,
  r as _,
} from "./index-5e5bfc5f.js";
import { g as ot } from "./quizUtils-a0b3ac88.js";
const p = {
    WIDTH: 330,
    HEIGHT: 450,
    BORDER_RADIUS: 8,
    BORDER_WIDTH: 4,
    MARGIN_Y: 16,
    MARGIN_BOTTOM: 8,
    PADDING: 6.4,
    FONT_SIZE: 18,
    IMAGE_WIDTH: 200,
    IMAGE_HEIGHT: 276,
    INFO_LEFT: -10,
    INFO_BOTTOM: -5,
    INFO_FULL_ART_LEFT: -110,
    INFO_FULL_ART_BOTTOM: -340,
    INFO_WIDTH: 220,
    INFO_BORDER_RADIUS: 15,
    INFO_PADDING_X: 8,
    INFO_PADDING_Y: 0.8,
    INFO_FONT_SIZE: 10,
    STAR_LEFT: 2,
    STAR_SIZE: 10,
    STAR_STROKE_WIDTH: 1.5,
    ID_LEFT: 2,
    ID_BOTTOM: 0,
    ID_FONT_SIZE: 8,
    SLIDE_OUT_DISTANCE: -500,
  },
  m = {
    TOP: 125,
    LEFT_DEFAULT: -160,
    LEFT_FULL_ART: -250,
    BORDER_RADIUS: 14,
    HEIGHT: 50,
    WIDTH: 270,
    PADDING_Y: 0.5 * 8,
    PADDING_X: 2 * 8,
    FONT_SIZE_NORMAL: 18,
    FONT_SIZE_LONG: 14,
    LONG_TEXT_THRESHOLD: 30,
  },
  E = ({ zIndex: n, art: s = "default", size: i = 1 }) => {
    const d = p.STAR_SIZE * i,
      o = p.STAR_STROKE_WIDTH * i;
    return r.jsxs("svg", {
      width: d,
      height: d,
      viewBox: "0 0 25 25",
      style: { zIndex: n },
      children: [
        s === "default" &&
          r.jsx("defs", {
            children: r.jsxs("linearGradient", {
              id: "starGradient",
              x1: "0%",
              y1: "0%",
              x2: "100%",
              y2: "100%",
              children: [
                r.jsx("stop", { offset: "12%", stopColor: "rgba(242, 216, 111, 1)" }),
                r.jsx("stop", { offset: "41%", stopColor: "rgba(244, 223, 139, 1)" }),
                r.jsx("stop", { offset: "57%", stopColor: "rgba(247, 234, 181, 1)" }),
                r.jsx("stop", { offset: "83%", stopColor: "rgba(242, 216, 111, 1)" }),
                r.jsx("stop", { offset: "91%", stopColor: "rgba(242, 216, 111, 1)" }),
              ],
            }),
          }),
        s === "full" &&
          r.jsx("defs", {
            children: r.jsxs("linearGradient", {
              id: "starGradient",
              x1: "0%",
              y1: "0%",
              x2: "100%",
              y2: "100%",
              children: [
                r.jsx("stop", { offset: "12%", stopColor: "rgba(218, 218, 218, 1)" }),
                r.jsx("stop", { offset: "41%", stopColor: "rgba(232, 230, 223, 1)" }),
                r.jsx("stop", { offset: "57%", stopColor: "rgba(248, 248, 249, 1)" }),
                r.jsx("stop", { offset: "83%", stopColor: "rgba(218, 218, 218, 1)" }),
                r.jsx("stop", { offset: "91%", stopColor: "rgba(218, 218, 218, 1)" }),
              ],
            }),
          }),
        r.jsx("polygon", {
          points:
            "12.5,2 15.5,9.5 23.5,9.5 17,14.5 19.5,22.5 12.5,17 5.5,22.5 8,14.5 1.5,9.5 9.5,9.5",
          fill: "url(#starGradient)",
          stroke: "black",
          strokeWidth: o,
        }),
      ],
    });
  };
function w(n) {
  const s = n.Genre.split(" "),
    i = [];
  return (
    s.includes("Action") && i.push($.cards.bg.action),
    s.includes("Comedy") && i.push($.cards.bg.comedy),
    (s.includes("Romance") || s.includes("Romantic")) && i.push($.cards.bg.romance),
    s.includes("Drama") && i.push($.cards.bg.drama),
    (s.includes("Fantasy") || s.includes("Adventure")) && i.push($.cards.bg.fantasy),
    s.includes("Fighting-Shounen") && i.push($.cards.bg.shounen),
    (s.includes("Supernatural") || s.includes("Horror")) && i.push($.cards.bg.supernatural),
    i.length === 1 && i.push(N(i[0], 0.3)),
    i.length === 0 && i.push($.cards.bg.default, N($.cards.bg.default, 0.3)),
    i
  );
}
async function lt(n) {
  const d = "@/assets/tcg/" + (n.toString() + "_full_art") + ".webp";
  return new Promise((o) => {
    const h = new Image();
    (h.onload = () => o(d)), (h.onerror = () => o("")), (h.src = d);
  });
}
function ut(n) {
  return "@/assets/tcg/" + (n.toString() + "_full_art") + ".webp";
}
function xt(n, s, i, d) {
  const o = i === "full" ? "F" : "N";
  let h = "";
  switch (s) {
    case "Common":
      h = "C";
      break;
    case "Uncommon":
      h = "U";
      break;
    case "Rare":
      h = "R";
      break;
    case "SuperRare":
      h = "SR";
      break;
    case "UltraRare":
      h = "UR";
      break;
    case "SecretRare":
      h = "SSR";
      break;
  }
  return `${d}-${n}-${h}-${o}`;
}
function ft(n) {
  const s = st();
  s &&
    (s.collection
      ? (s.collection.cards.push(n),
        (s.collection.totalCards += 1),
        (s.collection.lastUpdated = new Date().toISOString()))
      : (s.collection = { cards: [n], totalCards: 1, lastUpdated: new Date().toISOString() }),
    it(s));
}
function mt(n, s) {
  return n.filter((i) => s.mainAnime.includes(i.Anime_Id));
}
const ct = ({ card: n, text: s, isFullArt: i, size: d = 1 }) => {
    const o = s.length > m.LONG_TEXT_THRESHOLD,
      h = m.TOP * d,
      I = i ? m.LEFT_FULL_ART * d : m.LEFT_DEFAULT * d,
      u = `${m.BORDER_RADIUS * d}px`,
      e = `${m.HEIGHT * d}px`,
      a = `${m.WIDTH * d}px`,
      x = (m.PADDING_Y * d) / 8,
      t = (m.PADDING_X * d) / 8,
      g = (o ? m.FONT_SIZE_LONG : m.FONT_SIZE_NORMAL) * d;
    return r.jsx(l, {
      sx: { display: "flex", position: "absolute", top: h, left: I },
      children: r.jsxs(l, {
        sx: {
          borderRadius: u,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(90deg)",
          height: e,
          maxWidth: a,
          minWidth: a,
          width: a,
          paddingY: x,
          paddingX: t,
        },
        children: [
          i &&
            r.jsx(l, {
              sx: {
                background: `linear-gradient(90deg,${A($.cards.rare, 0.3)} 0%, ${
                  $.cards.rare
                } 50%, ${A($.cards.rare, 0.3)} 100%)`,
                position: "absolute",
                minWidth: "100%",
                height: "100%",
                borderRadius: u,
                zIndex: -1,
                opacity: 0.8,
              },
            }),
          r.jsx(D, {
            sx: {
              fontFamily: '"Exo 2", sans-serif',
              fontSize: g,
              color: A(w(n.character)[0], 0.3),
              whiteSpace: o ? "normal" : "nowrap",
              wordBreak: o ? "break-word" : "normal",
              textAlign: "center",
              lineHeight: 1.2,
            },
            children: s,
          }),
        ],
      }),
    });
  },
  dt = ({
    width: n = "330px",
    height: s = "450px",
    intensity: i = 0.5,
    enabled: d = !0,
    animating: o = !0,
  }) => {
    const [h, I] = _.useState(0);
    if (
      (_.useEffect(() => {
        if (!o) return;
        let a = Date.now();
        const x = () => {
            const g = (Date.now() - a) / 2e3;
            I(g), requestAnimationFrame(x);
          },
          t = requestAnimationFrame(x);
        return () => cancelAnimationFrame(t);
      }, [o]),
      !d)
    )
      return null;
    const e = -25 + Math.sin((h * Math.PI) / 5) * 40;
    return r.jsx(l, {
      sx: {
        position: "absolute",
        left: 0,
        top: 0,
        width: n,
        height: s,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 100,
        backfaceVisibility: "hidden",
      },
      children: r.jsx(l, {
        sx: {
          background: "black",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundPosition: "center",
          mixBlendMode: "color-dodge",
          opacity: i * 0.1,
          backgroundImage: `linear-gradient(
                        ${e}deg,
                        hsl(0, 0%, 0%) 0%,
                        hsl(0, 0%, 0%) 10%,
                        hsl(275, 100%, 60%) 20%,
                        hsl(240, 100%, 70%) 30%,
                        hsl(180, 100%, 60%) 40%,
                        hsl(120, 100%, 50%) 50%,
                        hsl(60, 100%, 50%) 60%,
                        hsl(30, 100%, 50%) 70%,
                        hsl(0, 100%, 50%) 80%,
                        hsl(0, 0%, 0%) 90%,
                        hsl(0, 0%, 0%) 100%
                    )`,
          transition: "background-image 0.1s linear",
        },
        children: r.jsx(l, {
          sx: {
            background: "black",
            mixBlendMode: "multiply",
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundPosition: "center",
            backgroundImage: `repeating-linear-gradient(
                            ${e + 115}deg,
                            hsl(0, 0%, 0%) 0px,
                            hsl(0, 0%, 100%) 1px,
                            hsl(0, 0%, 100%) 3px,
                            hsl(0, 0%, 0%) 4px,
                            hsl(0, 0%, 0%) 8px
                        )`,
            transition: "background-image 0.1s linear",
          },
        }),
      }),
    });
  },
  ht = ({ width: n, height: s, intensity: i = 0.5, enabled: d = !0, animating: o = !1 }) => {
    const [h, I] = _.useState(0);
    if (
      (_.useEffect(() => {
        if (!o) return;
        let F = Date.now();
        const T = () => {
            const j = (Date.now() - F) / 1e3;
            I(j), requestAnimationFrame(T);
          },
          k = requestAnimationFrame(T);
        return () => cancelAnimationFrame(k);
      }, [o]),
      !d)
    )
      return null;
    const u = o ? Math.sin((h * Math.PI) / 5) * 40 : 0,
      e = 50 + u * 0.5,
      a = 50 + (o ? Math.cos((h * Math.PI) / 5) * 20 : 0),
      x = 50 + u * 0.8,
      t = 50 + (o ? Math.sin((h * Math.PI) / 5) * 15 : 0),
      g = 1.2,
      f = 200;
    return r.jsxs(l, {
      sx: {
        position: "absolute",
        left: 0,
        top: 0,
        width: n,
        height: s,
        pointerEvents: "none",
        overflow: "hidden",
        borderRadius: "8px",
        zIndex: 50,
      },
      children: [
        r.jsx(l, {
          sx: {
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `
            repeating-linear-gradient(
              45deg,
              hsla(0,0%,100%, 0.05) 0%,
              hsla(0,0%,100%, 0.05) ${g}%,
              hsla(0,0%,100%, 0.15) ${g + 0.01}%,
              hsla(0,0%,100%, 0.15) ${g * 2}%,
              hsla(0,0%,100%, 0.08) ${g * 2 + 0.01}%,
              hsla(0,0%,100%, 0.08) ${g * 3}%,
              hsla(0,0%,100%, 0.05) ${g * 3 + 0.01}%,
              hsla(0,0%,100%, 0.05) ${g * 4}%
            ),
            repeating-linear-gradient(
              -45deg,
              hsla(0,0%,100%, 0.05) 0%,
              hsla(0,0%,100%, 0.05) ${g}%,
              hsla(0,0%,100%, 0.15) ${g + 0.01}%,
              hsla(0,0%,100%, 0.15) ${g * 2}%,
              hsla(0,0%,100%, 0.08) ${g * 2 + 0.01}%,
              hsla(0,0%,100%, 0.08) ${g * 3}%,
              hsla(0,0%,100%, 0.05) ${g * 3 + 0.01}%,
              hsla(0,0%,100%, 0.05) ${g * 4}%
            )
          `,
            backgroundSize: "210% 210%, 210% 210%",
            backgroundPosition: `
            ${(x - 50) * 1.5 + 50}% ${(t - 50) * 1.5 + 50}%,
            ${(x - 50) * 1.5 + 50}% ${(t - 50) * 1.5 + 50}%
          `,
            mixBlendMode: "overlay",
            opacity: i * 0.6,
          },
        }),
        r.jsx(l, {
          sx: {
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `
            repeating-linear-gradient(
              55deg,
              hsla(3, 95%, 85%, 0.15) ${f * 1}px,
              hsla(207, 100%, 84%, 0.15) ${f * 2}px,
              hsla(29, 100%, 85%, 0.15) ${f * 3}px,
              hsla(160, 100%, 86%, 0.15) ${f * 4}px,
              hsla(309, 94%, 87%, 0.15) ${f * 5}px,
              hsla(188, 95%, 85%, 0.15) ${f * 6}px,
              hsla(3, 95%, 85%, 0.15) ${f * 7}px
            )
          `,
            backgroundSize: "400% 100%",
            backgroundPosition: `
            ${(x - 50) * -2.5 + 50}% ${(t - 50) * -2.5 + 50}%
          `,
            mixBlendMode: "screen",
            opacity: i * 0.4,
          },
        }),
        r.jsx(l, {
          sx: {
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `
            radial-gradient(
              farthest-corner circle at ${e}% ${a}%,
              hsla(0, 0%, 100%, 0.2) 0%,
              transparent 50%
            )
          `,
            mixBlendMode: "overlay",
            opacity: i * 0.5,
          },
        }),
      ],
    });
  },
  pt = ({ width: n, height: s, intensity: i = 0.5, enabled: d = !0, animating: o = !1 }) => {
    const [h, I] = _.useState(0);
    if (
      (_.useEffect(() => {
        if (!o) return;
        let g = Date.now();
        const f = () => {
            const T = (Date.now() - g) / 1e3;
            I(T), requestAnimationFrame(f);
          },
          F = requestAnimationFrame(f);
        return () => cancelAnimationFrame(F);
      }, [o]),
      !d)
    )
      return null;
    const e = 50 + (o ? Math.sin((h * Math.PI) / 5) * 40 : 0) * 0.8,
      a = 50 + (o ? Math.sin((h * Math.PI) / 5) * 15 : 0),
      x = o ? (h * 2) % 1 : 0.5,
      t = o ? Math.sin(x * Math.PI * 2) * 0.5 + 0.5 : 0.6;
    return r.jsxs(l, {
      sx: {
        position: "absolute",
        left: 0,
        top: 0,
        width: n,
        height: s,
        pointerEvents: "none",
        overflow: "hidden",
        borderRadius: "8px",
        zIndex: 60,
      },
      children: [
        r.jsx(l, {
          sx: {
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `
            radial-gradient(circle at 12% 18%, hsla(0, 0%, 100%, ${t * 1}) 0%, transparent 0.8%),
            radial-gradient(circle at 22% 25%, hsla(60, 100%, 90%, ${
              t * 0.9
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 8% 35%, hsla(180, 100%, 90%, ${t * 1}) 0%, transparent 0.75%),
            radial-gradient(circle at 18% 48%, hsla(0, 0%, 100%, ${t * 0.85}) 0%, transparent 0.7%),
            radial-gradient(circle at 15% 62%, hsla(120, 100%, 90%, ${
              t * 0.9
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 25% 75%, hsla(300, 100%, 90%, ${
              t * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 10% 88%, hsla(200, 100%, 90%, ${
              t * 0.85
            }) 0%, transparent 0.7%),
            
            radial-gradient(circle at 38% 12%, hsla(0, 0%, 100%, ${t * 1}) 0%, transparent 0.75%),
            radial-gradient(circle at 45% 28%, hsla(270, 100%, 90%, ${
              t * 0.9
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 42% 42%, hsla(0, 0%, 100%, ${t * 1}) 0%, transparent 0.7%),
            radial-gradient(circle at 35% 58%, hsla(45, 100%, 90%, ${
              t * 0.85
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 48% 68%, hsla(180, 100%, 90%, ${t * 1}) 0%, transparent 0.8%),
            radial-gradient(circle at 40% 82%, hsla(0, 0%, 100%, ${t * 0.9}) 0%, transparent 0.7%),
            
            radial-gradient(circle at 58% 8%, hsla(60, 100%, 90%, ${t * 1}) 0%, transparent 0.75%),
            radial-gradient(circle at 65% 22%, hsla(0, 0%, 100%, ${t * 1}) 0%, transparent 0.7%),
            radial-gradient(circle at 62% 38%, hsla(300, 100%, 90%, ${
              t * 0.9
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 55% 52%, hsla(120, 100%, 90%, ${
              t * 0.85
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 68% 65%, hsla(0, 0%, 100%, ${t * 1}) 0%, transparent 0.7%),
            radial-gradient(circle at 60% 78%, hsla(200, 100%, 90%, ${
              t * 0.9
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 58% 92%, hsla(270, 100%, 90%, ${
              t * 0.85
            }) 0%, transparent 0.75%),
            
            radial-gradient(circle at 78% 15%, hsla(0, 0%, 100%, ${t * 1}) 0%, transparent 0.7%),
            radial-gradient(circle at 85% 28%, hsla(180, 100%, 90%, ${
              t * 0.9
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 82% 45%, hsla(45, 100%, 90%, ${t * 1}) 0%, transparent 0.8%),
            radial-gradient(circle at 75% 58%, hsla(0, 0%, 100%, ${t * 0.85}) 0%, transparent 0.7%),
            radial-gradient(circle at 88% 72%, hsla(60, 100%, 90%, ${t * 1}) 0%, transparent 0.75%),
            radial-gradient(circle at 80% 85%, hsla(300, 100%, 90%, ${
              t * 0.9
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 92% 95%, hsla(0, 0%, 100%, ${t * 0.85}) 0%, transparent 0.7%)
          `,
            backgroundPosition: `
            ${e * 0.4 + 8}% ${a * 0.3 + 15}%,
            ${e * -0.3 + 18}% ${a * 0.4 + 22}%,
            ${e * 0.5 + 5}% ${a * -0.2 + 32}%,
            ${e * -0.4 + 15}% ${a * 0.5 + 45}%,
            ${e * 0.3 + 12}% ${a * -0.3 + 59}%,
            ${e * -0.5 + 22}% ${a * 0.4 + 72}%,
            ${e * 0.4 + 7}% ${a * -0.4 + 85}%,
            
            ${e * -0.3 + 35}% ${a * 0.5 + 9}%,
            ${e * 0.4 + 42}% ${a * -0.2 + 25}%,
            ${e * -0.4 + 39}% ${a * 0.3 + 39}%,
            ${e * 0.5 + 32}% ${a * -0.4 + 55}%,
            ${e * -0.3 + 45}% ${a * 0.4 + 65}%,
            ${e * 0.3 + 37}% ${a * -0.5 + 79}%,
            
            ${e * -0.4 + 55}% ${a * 0.5 + 5}%,
            ${e * 0.5 + 62}% ${a * -0.3 + 19}%,
            ${e * -0.5 + 59}% ${a * 0.4 + 35}%,
            ${e * 0.4 + 52}% ${a * -0.4 + 49}%,
            ${e * -0.3 + 65}% ${a * 0.3 + 62}%,
            ${e * 0.5 + 57}% ${a * -0.5 + 75}%,
            ${e * -0.4 + 55}% ${a * 0.4 + 89}%,
            
            ${e * 0.5 + 75}% ${a * -0.3 + 12}%,
            ${e * -0.4 + 82}% ${a * 0.4 + 25}%,
            ${e * 0.4 + 79}% ${a * -0.5 + 42}%,
            ${e * -0.5 + 72}% ${a * 0.5 + 55}%,
            ${e * 0.3 + 85}% ${a * -0.3 + 69}%,
            ${e * -0.4 + 77}% ${a * 0.4 + 82}%,
            ${e * 0.5 + 89}% ${a * -0.4 + 92}%
          `,
            mixBlendMode: "screen",
            opacity: i * 1,
            filter: "blur(0.5px)",
          },
        }),
        r.jsx(l, {
          sx: {
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `
            radial-gradient(circle at 15% 12%, hsla(0, 0%, 100%, ${
              (1 - t) * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 5% 28%, hsla(270, 100%, 90%, ${
              (1 - t) * 0.9
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 20% 42%, hsla(180, 100%, 90%, ${
              (1 - t) * 1
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 10% 55%, hsla(45, 100%, 90%, ${
              (1 - t) * 0.85
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 18% 70%, hsla(0, 0%, 100%, ${
              (1 - t) * 1
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 8% 85%, hsla(60, 100%, 90%, ${
              (1 - t) * 0.9
            }) 0%, transparent 0.8%),
            
            radial-gradient(circle at 32% 8%, hsla(120, 100%, 90%, ${
              (1 - t) * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 42% 22%, hsla(0, 0%, 100%, ${
              (1 - t) * 0.9
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 38% 38%, hsla(300, 100%, 90%, ${
              (1 - t) * 1
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 48% 52%, hsla(200, 100%, 90%, ${
              (1 - t) * 0.85
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 35% 68%, hsla(0, 0%, 100%, ${
              (1 - t) * 1
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 45% 88%, hsla(180, 100%, 90%, ${
              (1 - t) * 0.9
            }) 0%, transparent 0.8%),
            
            radial-gradient(circle at 62% 15%, hsla(0, 0%, 100%, ${
              (1 - t) * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 55% 32%, hsla(45, 100%, 90%, ${
              (1 - t) * 0.9
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 68% 48%, hsla(270, 100%, 90%, ${
              (1 - t) * 1
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 58% 62%, hsla(0, 0%, 100%, ${
              (1 - t) * 0.85
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 65% 78%, hsla(60, 100%, 90%, ${
              (1 - t) * 1
            }) 0%, transparent 0.7%),
            
            radial-gradient(circle at 85% 10%, hsla(300, 100%, 90%, ${
              (1 - t) * 1
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 78% 25%, hsla(0, 0%, 100%, ${
              (1 - t) * 0.9
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 88% 42%, hsla(120, 100%, 90%, ${
              (1 - t) * 1
            }) 0%, transparent 0.7%),
            radial-gradient(circle at 82% 58%, hsla(180, 100%, 90%, ${
              (1 - t) * 0.85
            }) 0%, transparent 0.8%),
            radial-gradient(circle at 75% 75%, hsla(0, 0%, 100%, ${
              (1 - t) * 1
            }) 0%, transparent 0.75%),
            radial-gradient(circle at 90% 88%, hsla(200, 100%, 90%, ${
              (1 - t) * 0.9
            }) 0%, transparent 0.7%)
          `,
            backgroundPosition: `
            ${e * -0.4 + 12}% ${a * 0.5 + 9}%,
            ${e * 0.5 + 2}% ${a * -0.3 + 25}%,
            ${e * -0.5 + 17}% ${a * 0.4 + 39}%,
            ${e * 0.4 + 7}% ${a * -0.4 + 52}%,
            ${e * -0.3 + 15}% ${a * 0.5 + 67}%,
            ${e * 0.5 + 5}% ${a * -0.5 + 82}%,
            
            ${e * -0.5 + 29}% ${a * 0.4 + 5}%,
            ${e * 0.4 + 39}% ${a * -0.5 + 19}%,
            ${e * -0.3 + 35}% ${a * 0.5 + 35}%,
            ${e * 0.5 + 45}% ${a * -0.4 + 49}%,
            ${e * -0.4 + 32}% ${a * 0.3 + 65}%,
            ${e * 0.4 + 42}% ${a * -0.5 + 85}%,
            
            ${e * -0.3 + 59}% ${a * 0.5 + 12}%,
            ${e * 0.5 + 52}% ${a * -0.4 + 29}%,
            ${e * -0.5 + 65}% ${a * 0.4 + 45}%,
            ${e * 0.4 + 55}% ${a * -0.3 + 59}%,
            ${e * -0.4 + 62}% ${a * 0.5 + 75}%,
            
            ${e * 0.5 + 82}% ${a * -0.4 + 7}%,
            ${e * -0.4 + 75}% ${a * 0.5 + 22}%,
            ${e * 0.3 + 85}% ${a * -0.5 + 39}%,
            ${e * -0.5 + 79}% ${a * 0.4 + 55}%,
            ${e * 0.4 + 72}% ${a * -0.3 + 72}%,
            ${e * -0.3 + 87}% ${a * 0.5 + 85}%
          `,
            mixBlendMode: "screen",
            opacity: i * 0.8,
            filter: "blur(0.5px)",
          },
        }),
      ],
    });
  },
  bt = ["Common", "Uncommon", "Rare", "SuperRare", "UltraRare", "SecretRare"],
  It = ({
    card: n,
    visible: s,
    slideOnClick: i = !1,
    move: d = !1,
    size: o = "large",
    showRarityAnimation: h = !0,
    showInspectAnimation: I = !1,
  }) => {
    const [u, e] = _.useState(!1),
      [a, x] = _.useState(""),
      t = h || (s && h),
      g = (d && !u) || I,
      f = n.rarity === "SuperRare" && t,
      F = n.rarity === "UltraRare" && t,
      T = n.rarity === "SecretRare" && t,
      k = n.rarity === "UltraRare" && t,
      j = (n.rarity === "UltraRare" || n.rarity === "SecretRare") && t,
      b = n.art === "full" && a !== "",
      R = w(n.character),
      c = o === "small" ? 2 / 3 : 1,
      S = `${p.WIDTH * c}px`,
      O = `${p.HEIGHT * c}px`,
      C = `${p.BORDER_RADIUS * c}px`,
      L = p.BORDER_WIDTH * c,
      P = (p.MARGIN_Y * c) / 8,
      B = (p.MARGIN_BOTTOM * c) / 8,
      G = (p.PADDING * c) / 8,
      M = p.FONT_SIZE * c,
      H = `${p.IMAGE_WIDTH * c}px`,
      U = `${p.IMAGE_HEIGHT * c}px`,
      v = p.INFO_LEFT * c,
      z = p.INFO_BOTTOM * c,
      W = p.INFO_FULL_ART_LEFT * c,
      X = p.INFO_FULL_ART_BOTTOM * c,
      Y = `${p.INFO_WIDTH * c}px`,
      Z = p.INFO_BORDER_RADIUS * c,
      q = (p.INFO_PADDING_X * c) / 8,
      K = (p.INFO_PADDING_Y * c) / 8,
      y = p.INFO_FONT_SIZE * c,
      Q = p.STAR_LEFT * c,
      V = o === "small" ? -5.5 : -4.5,
      J = p.ID_LEFT * c,
      tt = p.ID_BOTTOM * c,
      at = p.ID_FONT_SIZE * c,
      et = p.SLIDE_OUT_DISTANCE * c;
    function rt() {
      i && !u && e(!0);
    }
    return (
      _.useEffect(() => {
        lt(n.characterId).then((nt) => {
          x(nt);
        });
      }, [n.characterId]),
      r.jsxs(l, {
        onClick: rt,
        sx: {
          width: S,
          height: O,
          borderRadius: C,
          borderColor: n.rarity === "SecretRare" ? $.cards.secretRareBorder : $.cards.border,
          borderWidth: L,
          borderStyle: "solid",
          boxShadow: 2,
          background: b ? R[1] : void 0,
          backgroundImage: b ? `url(${a})` : `linear-gradient(230deg,${R[0]} 29%, ${R[1]} 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          animation: u
            ? "slideOut 1s forwards"
            : g
            ? "inspect 5s infinite ease-in-out alternate"
            : void 0,
          pointerEvents: u ? "none" : "auto",
          "@keyframes inspect": {
            from: { transform: "rotateY(-20deg) rotateX(10deg)" },
            to: { transform: "rotateY(20deg) rotateX(-10deg)" },
          },
          "@keyframes slideOut": {
            from: { transform: "translateX(0px)" },
            to: { transform: `translateX(${et}px)`, zIndex: -1 },
          },
          cursor: i ? "pointer" : "default",
          overflow: "hidden",
        },
        children: [
          r.jsxs(l, {
            sx: { display: "flex", flexDirection: "column", alignItems: "center", marginY: P },
            children: [
              r.jsxs(l, {
                sx: {
                  marginBottom: B,
                  textAlign: "center",
                  boxShadow: 1,
                  borderRadius: 1,
                  width: "90%",
                  height: "40px",
                  position: "relative",
                },
                children: [
                  r.jsx(l, {
                    sx: {
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(180deg,${A(R[0], 0.2)} 0%, ${R[0]} 50%, ${A(
                        R[0],
                        0.2,
                      )} 100%)`,
                      opacity: b ? 0.5 : 1,
                      borderRadius: 1,
                    },
                  }),
                  r.jsx(l, {
                    sx: {
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      padding: G,
                      backgroundColor: "transparent",
                      top: o === "small" ? "6.5px" : "0",
                    },
                    children: r.jsx(D, {
                      sx: { fontFamily: '"Exo 2", sans-serif', fontSize: M, fontWeight: "bold" },
                      children: n == null ? void 0 : n.character.Name,
                    }),
                  }),
                ],
              }),
              r.jsxs(l, {
                sx: { position: "relative" },
                children: [
                  r.jsx(ct, {
                    card: n,
                    text: n == null ? void 0 : n.character.Anime,
                    isFullArt: b,
                    size: c,
                  }),
                  n.art === "default" &&
                    r.jsx(l, {
                      width: H,
                      component: "img",
                      height: U,
                      sx: {
                        objectFit: "cover",
                        border: "1px solid black",
                        borderColor: $.cards.border,
                        borderRadius: 1,
                      },
                      src: ot(n.characterId),
                    }),
                  r.jsxs(l, {
                    sx: {
                      position: "absolute",
                      left: b ? W : v,
                      bottom: b ? X : z,
                      background:
                        "linear-gradient(180deg,rgba(224, 224, 224, 1) 34%, rgba(224, 224, 224, 1) 0%, rgba(250, 250, 250, 1) 49%, rgba(199, 199, 199, 1) 71%)",
                      width: Y,
                      borderRadius: Z,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingX: q,
                      paddingY: K,
                      boxShadow: 1,
                      gap: 1,
                    },
                    children: [
                      r.jsx(D, {
                        sx: { fontFamily: '"Exo 2", sans-serif', fontSize: y },
                        children: `DOB: ${(n == null ? void 0 : n.character.Birthday) ?? "???"}`,
                      }),
                      r.jsx(D, {
                        sx: { fontFamily: '"Exo 2", sans-serif', fontSize: y },
                        children: `HT: ${(n == null ? void 0 : n.character.Height) ?? "???"}`,
                      }),
                    ],
                  }),
                ],
              }),
              r.jsxs(l, {
                children: [
                  r.jsxs(l, {
                    sx: { position: "absolute", left: Q, bottom: V, zIndex: 20 },
                    children: [
                      !b &&
                        n.rarity === "Common" &&
                        r.jsx(l, {
                          sx: {
                            width: "7px",
                            height: "7px",
                            backgroundColor: $.cards.rare,
                            position: "absolute",
                            top: "-14px",
                            left: 2,
                            zIndex: 100,
                            border: "1px solid black",
                            borderRadius: "50%",
                          },
                        }),
                      n.rarity === "Uncommon" &&
                        r.jsx(l, {
                          sx: {
                            width: "6px",
                            height: "6px",
                            backgroundColor: $.cards.rare,
                            position: "absolute",
                            top: "-14px",
                            left: 2,
                            zIndex: 100,
                            border: "1px solid black",
                            transform: "rotate(45deg)",
                          },
                        }),
                      n.rarity !== "Common" &&
                        n.rarity !== "Uncommon" &&
                        r.jsx(E, { zIndex: 30, size: c }),
                      b && n.rarity === "Common" && r.jsx(E, { zIndex: 30, art: "full", size: c }),
                      (n.rarity === "SecretRare" || n.rarity === "UltraRare") &&
                        r.jsx(E, { art: b ? "full" : "default", zIndex: 30, size: c }),
                      n.rarity === "SecretRare" &&
                        r.jsx(E, { zIndex: 30, art: b ? "full" : "default", size: c }),
                    ],
                  }),
                  r.jsxs(l, {
                    children: [
                      r.jsx(l, {
                        sx: {
                          position: "absolute",
                          right: 2,
                          bottom: 1,
                          width: "50px",
                          height: "12px",
                          backdropFilter: "blur(2px)",
                          zIndex: 1,
                          borderRadius: "50%",
                        },
                      }),
                      r.jsx(l, {
                        sx: { position: "absolute", right: J, bottom: tt, zIndex: 30 },
                        children: r.jsx(D, {
                          sx: { fontFamily: '"Exo 2", sans-serif', fontSize: at },
                          children: n.cardId,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          F &&
            r.jsx(l, {
              sx: {
                position: "absolute",
                left: -4,
                top: -4,
                height: O,
                width: S,
                background: $.cards.ultraRare,
                backgroundSize: "300% 100%",
                backgroundPosition: "0% 0%",
                animation: t ? "shimmer 3s infinite linear alternate" : "none",
                "@keyframes shimmer": {
                  from: { backgroundPosition: "0% 0%" },
                  to: { backgroundPosition: "100% 0%" },
                },
              },
            }),
          f &&
            r.jsx(l, {
              sx: {
                position: "absolute",
                left: -4,
                top: -4,
                height: O,
                width: S,
                background: $.cards.shimmer,
                backgroundSize: "300%",
                backgroundPositionX: "100%",
                animation: t ? "shimmer 2.5s infinite linear alternate" : "none",
                "@keyframes shimmer": {
                  from: { backgroundPosition: "0% 0%" },
                  to: { backgroundPosition: "100% 0%" },
                },
              },
            }),
          r.jsx(dt, { width: S, height: O, intensity: 1, enabled: T, animating: t }),
          r.jsx(ht, { width: S, height: O, intensity: 0.7, enabled: k, animating: t }),
          r.jsx(pt, { width: S, height: O, intensity: 0.7, enabled: j, animating: t }),
        ],
      })
    );
  };
export { bt as R, It as T, xt as a, ut as b, ft as c, mt as f, lt as g };
