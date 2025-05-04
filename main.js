document.querySelector(".submit").addEventListener("click", async () => {
  const videoId = document.querySelector("#input-field");

  function youtube_parser(url) {
    let regex =
      /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    return regex.exec(url)[3];
  }

  const url = `https://youtube-video-fast-downloader-24-7.p.rapidapi.com/download_audio/${youtube_parser(
    videoId.value
  )}?quality=251`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "789b9f8786msha9f715d7770eab4p1cf63ajsn61ec18d193a1",
      "X-RapidAPI-Host": "youtube-video-fast-downloader-24-7.p.rapidapi.com",
    },
  };

  try {
    document.querySelector(
      ".content"
    ).innerHTML = `<div class="video"><p>Aguarde alguns instantes...</p></div>`;
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.file) {
      document.querySelector(".content").innerHTML = `
                <div class="video">
                <a href=${result.file} target="blank">Download MP3</a>
                </div>
            `;
    } else {
      document.querySelector(".content").innerHTML = `
                <div class="error">
                    <p>Url do video invalida ou serviço temporariamente indisponivel</p>
                </div>
            `;
    }
  } catch (error) {
    console.error(error);
  }
});

document
  .querySelector(".clear")
  .addEventListener(
    "click",
    () => (document.querySelector("#input-field").value = "")
  );
