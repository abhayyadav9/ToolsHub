import ShortUrl from "../models/ShortUrl.js";
import { generateShortCode } from "../utils/generateShortCode.js";
import redis from "../config/redis.js";

/**
 * CREATE SHORT URL
 */
function extractDomain(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return null;
  }
}


export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "URL required" });
    }

    let shortCode;
    let exists = true;

    while (exists) {
      shortCode = generateShortCode();
      exists = await ShortUrl.findOne({ shortCode });
    }

    await ShortUrl.create({
      originalUrl,
      shortCode,
    });

    await redis.hSet("short_urls", shortCode, originalUrl);

    const domain = extractDomain(originalUrl);

    res.status(201).json({
      shortUrl: `https://toolshub.me/url/${shortCode}`,   // real link
      displayUrl: `${domain}/${shortCode}`,          // cosmetic
      code: shortCode,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/**
 * REDIRECT SHORT URL
 */
export const redirectShortUrl = async (req, res) => {
  try {
    const { code } = req.params;

    // 1️⃣ Redis lookup (FAST)
    const cachedUrl = await redis.hGet("short_urls", code);


    if (cachedUrl) {
      // 🔥 Update clicks in background (don’t block redirect)
      ShortUrl.updateOne(
        { shortCode: code },
        { $inc: { clicks: 1 } }
      ).exec();

      return res.redirect(cachedUrl);
    }

    // 2️⃣ Mongo fallback
    const urlDoc = await ShortUrl.findOne({
      shortCode: code,
      isActive: true,
    });

    if (!urlDoc) {
      return res.status(404).send("Link not found");
    }

    // 3️⃣ Update Mongo clicks
    urlDoc.clicks += 1;
    await urlDoc.save();

    // 4️⃣ Cache in Redis
    await redis.hset("short_urls", code, urlDoc.originalUrl);

    res.redirect(urlDoc.originalUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
