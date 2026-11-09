const $ = (id) => document.getElementById(id);
const money = (p) => new Intl.NumberFormat("en-US", { style: "currency", currency: p.currency }).format(p.price);
const gradient = (p) => `linear-gradient(135deg, ${p.accent[0]}, ${p.accent[1]})`;
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

async function load() {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Could not load catalogue");
  return res.json();
}

function renderHome(data) {
  const cats = $("categories");
  data.categories.forEach((c) => cats.append(el("div", "chip", c.name)));
  const list = $("featured");
  data.products.filter((p) => p.featured).forEach((p) => {
    const a = el("a", "card");
    a.href = `/products/${p.slug}`;
    const mock = el("div", "mock", p.title);
    mock.style.background = gradient(p);
    const body = el("div", "body");
    body.append(el("div", "price", money(p)), el("div", "muted", p.tagline));
    a.append(mock, body);
    list.append(a);
  });
}

function renderProduct(data) {
  const slug = location.pathname.split("/").filter(Boolean).pop();
  const p = data.products.find((x) => x.slug === slug);
  const root = $("product");
  if (!p) { root.append(el("p", "muted", "Product not found.")); return; }
  document.title = `${p.title} | DIY Arena`;
  const mock = el("div", "mock", p.title);
  mock.style.background = gradient(p);
  const info = el("div");
  const buy = el("button", "btn", p.checkoutUrl ? "Buy now" : "Coming soon");
  if (p.checkoutUrl) buy.onclick = () => (location.href = p.checkoutUrl);
  else buy.disabled = true;
  const ul = el("ul");
  p.includes.forEach((i) => ul.append(el("li", "", i)));
  info.append(el("h1", "", p.title), el("p", "muted", p.tagline), el("p", "price", money(p)), buy, el("h2", "", "What's included"), ul, el("p", "", p.description));
  root.append(mock, info);
}

load().then((d) => (document.body.dataset.page === "product" ? renderProduct(d) : renderHome(d)))
  .catch(() => document.querySelector("main").append(el("p", "muted", "Something went wrong loading products.")));
