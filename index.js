const inquirer = require('inquirer');
const fetch = require('node-fetch');
const chalk = require('chalk');


const getInput = (message) => new Promise((resolve, reject) => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "input",
                message: message
            }
        ])
        .then(res => resolve(res))
        .catch(err => reject(err));
});

const main = async () => {
    console.log(`\r\n\u2580\u2588\u2580\u2003\u2588\u2003\u2588\u2584\u2580\u2003\u2580\u2588\u2580\u2003\u2588\u2580\u2588\u2003\u2588\u2584\u2580\u2003 \u2003\u2588\u2580\u2584\u2003\u2588\u2580\u2588\u2003\u2588\u2591\u2588\u2591\u2588\u2003\u2588\u2584\u2591\u2588\u2003\u2588\u2591\u2591\u2003\u2588\u2580\u2588\u2003\u2584\u2580\u2588\u2003\u2588\u2580\u2584\u2003\u2588\u2580\u2580\u2003\u2588\u2580\u2588\u2003 \u2003\u2588\u2584\u2591\u2588\u2003\u2588\u2580\u2588\u2003 \u2003\u2588\u2591\u2588\u2591\u2588\u2003\u2588\u2580\u2584\u2580\u2588\r\n\u2591\u2588\u2591\u2003\u2588\u2003\u2588\u2591\u2588\u2003\u2591\u2588\u2591\u2003\u2588\u2584\u2588\u2003\u2588\u2591\u2588\u2003 \u2003\u2588\u2584\u2580\u2003\u2588\u2584\u2588\u2003\u2580\u2584\u2580\u2584\u2580\u2003\u2588\u2591\u2580\u2588\u2003\u2588\u2584\u2584\u2003\u2588\u2584\u2588\u2003\u2588\u2580\u2588\u2003\u2588\u2584\u2580\u2003\u2588\u2588\u2584\u2003\u2588\u2580\u2584\u2003 \u2003\u2588\u2591\u2580\u2588\u2003\u2588\u2584\u2588\u2003 \u2003\u2580\u2584\u2580\u2584\u2580\u2003\u2588\u2591\u2580\u2591\u2588`);
    try {
        const lokasi = await getInput("Masukkan Url Tiktok:");
        const lokasidata = lokasi.input;
        // console.log(chalk.blue('Hello world!'));
        const videooo = lokasidata.includes("/video/")
        const videoId = lokasidata.split("/video/")[1];
        if (videoId < 19) {
            console.log(`Link Video Salah`);
        } else {
            return videoId;
        }
    } catch (error) {
        console.error(`error`, error);
    }
};

const DataApiTiktok = async (videoId) => {
    try {
        if (videoId) {
            const headers = {
                'User-Agent': 'TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet'
            };

            const response = await fetch(`https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${videoId}`, {
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();


            console.log(chalk.green(`[*] Link Videonya :`, data.aweme_list[0].video.play_addr.url_list[0]));
            console.log(chalk.redBright(`[*] Credit By Ridwan`));


        } else {
            console.log('videoId is required');
        }
    } catch (error) {
        console.error(error);
    }
}


const gabungan = async () => {
    const videoId = await main();
    if (videoId) {
        await DataApiTiktok(videoId);
    } else {
    }
}
gabungan();