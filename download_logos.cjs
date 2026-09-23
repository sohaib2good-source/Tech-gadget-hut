const fs = require('fs');
const https = require('https');
const path = require('path');

const brands = [
  'samsung', 'apple', 'lenovo', 'vivo', 'anker', 'jbl', 'sony', 
  'dell', 'hp', 'oppo', 'amazfit', 'asus', 'acer', 'lg', 
  'google', 'microsoft', 'intel', 'amd', 'nokia', 'motorola',
  'xiaomi', 'mi', 'huawei', 'realme', 'oneplus', 'zte', 'meizu',
  'infinix', 'tecno', 'tcl', 'alcatel', 'panasonic', 'philips',
  'bose', 'sennheiser', 'corsair', 'razer', 'logitech', 'steelseries',
  'hyperx', 'roccat', 'beats', 'skullcandy', 'jabra', 'garmin',
  'fitbit', 'gopro', 'dji', 'canon', 'nikon', 'nintendo', 'playstation'
];

const dir = path.join(__dirname, 'public', 'brands');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Helper to download with redirect support
function downloadImage(url, dest, brand) {
  https.get(url, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
      downloadImage(res.headers.location, dest, brand);
      return;
    }
    
    if (res.statusCode !== 200) {
      console.log(`Failed to download ${brand}: ${res.statusCode}`);
      return;
    }

    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${brand}`);
    });
  }).on('error', (err) => {
    console.error(`Error with ${brand}:`, err.message);
  });
}

brands.forEach(brand => {
  const dest = path.join(dir, `${brand}.png`);
  downloadImage(`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${brand}.com&size=128`, dest, brand);
});
