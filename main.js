document.querySelector('.submit').addEventListener('click', async () => {

    const videoId = document.querySelector('#input-field');

    function youtube_parser(url) {
        let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
        return regex.exec(url)[3];
    }

    const url = `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${youtube_parser(videoId.value)}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '944441af27mshe0218a31a0130c0p1dd4c5jsndcd813120fc7',
            'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);

        if (result.status === 'ok') {
            document.querySelector('.content').innerHTML = `
                <div class="video">
                    <p>${result.title}</p>
                    <img src=${result.thumb} alt="">
                    <a href=${result.link} target="blank">Download MP3</a>
                </div>
            `;
        } else {
            document.querySelector('.content').innerHTML = `
                <div class="error">
                    <p>Url do video invalida ou serviço temporariamente indisponivel</p>
                </div>
            `;
        }

    } catch (error) {
        console.error(error);
    }

});

document.querySelector('.clear')
    .addEventListener('click', () => document.querySelector('#input-field').value = "");