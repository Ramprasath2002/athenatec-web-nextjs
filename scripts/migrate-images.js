const fs = require("fs");
const path = require("path");
const axios = require("axios");
const sharp = require("sharp");
const fse = require("fs-extra");

const IMAGE_LIST_FILE = "image-urls.txt";
const OUTPUT_DIR = "public/assets/images/";
const MAX_WIDTH = 1200;
const QUALITY = 80;

async function downloadAndConvert(url, index) {
  try {
    const outputFile = path.join(
      OUTPUT_DIR,
      `let-connect${String(index + 1).padStart(2, "0")}.webp`
    );

    console.log(`Downloading [${index + 1}]`, url);

    const response = await axios({
      url,
      responseType: "arraybuffer",
      timeout: 15000,
    });

    await sharp(response.data)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputFile);

    console.log("Saved:", outputFile);

  } catch (error) {
    console.error("❌ Failed:", url);
    console.error(error.message);
  }
}

async function run() {
  await fse.ensureDir(OUTPUT_DIR);

  const urls = fs
    .readFileSync(IMAGE_LIST_FILE, "utf-8")
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  console.log(`Total images found: ${urls.length}\n`);

  for (let i = 0; i < urls.length; i++) {
    await downloadAndConvert(urls[i], i);
  }

  console.log("\n✅ All images processed.");
}

run();