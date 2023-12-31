const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const base62 = initBase62();
const N_SHORT = 5;
const fs = require("fs").promises;
const PATH = "./public/data/urls.json";

// key: origin url, vaue: short
const url_short_map = require(PATH);

// key: short, vaue: origin url
const short_url_map = {};

function initBase62() {
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += i;
  }
  for (let i = 65; i <= 90; i++) {
    result += String.fromCharCode(i);
  }
  for (let i = 97; i <= 122; i++) {
    result += String.fromCharCode(i);
  }
  return result;
}

function getShort(url) {
  if (url_short_map.hasOwnProperty(url)) {
    // console.log(`url_short_map -> ${url_short_map[url]}`);
    return url_short_map[url];
  }
  let short = generateHash();
  while (short_url_map.hasOwnProperty(short)) {
    short = generateHash();
  }
  // console.log(`short: ${short}, url: ${url}`);
  url_short_map[url] = short;
  short_url_map[short] = url;
  writeFile();
  return short;
}

// 生成 Short 雜湊值
function generateHash() {
  let hash = "";
  let rand;
  for (let i = 0; i < N_SHORT; i++) {
    rand = Math.floor(Math.random() * 62);
    hash += base62.substring(rand, rand + 1);
  }
  return hash;
}

async function writeFile() {
  try {
    await fs.writeFile(PATH, JSON.stringify(url_short_map));
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/shortener", (req, res) => {
  let url = req.query.url;
  const short = getShort(url);
  res.json({ result: `http://localhost:${port}/${short}` });
});

app.get("/:short", (req, res) => {
  let short = req.params.short;
  if (short_url_map.hasOwnProperty(short)) {
    res.redirect(short_url_map[short]);
  } else {
    res.status(404).send("Not Found");
  }
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
  const entries = Object.entries(url_short_map);
  entries.forEach(([url, short]) => {
    short_url_map[short] = url;
  });
});
