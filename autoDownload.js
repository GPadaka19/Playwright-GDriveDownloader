const { chromium } = require('playwright');
const fs = require('fs');

const links = [
    "https://drive.google.com/open?id=1zeZ5N0qKw7QQ8UAy0yM5N-h3SAHPe8tY",
    "https://drive.google.com/open?id=1YuG69wP5VrCHl6ZVCJTAHdAr2cphTTZm",
    // Tambahkan semua link lainnya di sini
];

const names = [
    "SLB Santi Rama-Alfie Ghazy Aziz",
    "SLB B-C Ar-Rahman-Slb Bc Arrahman",
    // Tambahkan semua nama file di sini
];

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        acceptDownloads: true
    });

    const page = await context.newPage();

    for (let i = 0; i < links.length; i++) {
        console.log(`Downloading ${names[i]}...`);
        await page.goto(links[i]);

        // Tunggu hingga tombol download muncul dan klik tombol download
        const [download] = await Promise.all([
            page.waitForEvent('download'), // Tunggu event download
            page.click('text=Download') // Ganti dengan selector tombol download yang sesuai
        ]);

        // Simpan file dengan nama yang sesuai
        const path = `./downloads/${names[i]}.zip`;
        await download.saveAs(path);
        console.log(`Downloaded ${names[i]} to ${path}`);
    }

    await browser.close();
})();