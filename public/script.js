const link = "https://joshweb.click/tiktokdl?url=";
const videoUrlInput = document.querySelector("#videoUrl");
const downloadButton = document.querySelector("button");
const downloadStatus = document.querySelector("#downloadStatus");

async function downloadVideo() {
    const url = videoUrlInput.value.trim();
    if (!url) {
        downloadStatus.textContent = "PLEASE ENTER A TIKTOK VIDEO URL";
        return;
    }

    downloadButton.disabled = true;
    downloadStatus.textContent = "DOWNLOADING THE VIDEO PLEASE WAIT";

    try {
        const res = await fetch(link + encodeURIComponent(url));
        const json = await res.json();

        const blob = await fetch(json.result).then(response => response.blob());
        const blobUrl = URL.createObjectURL(blob);

        const randomFilename = 'tiktok_video_' + Math.random().toString(36).substr(2, 9) + '.mp4';

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = randomFilename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        downloadStatus.textContent = "";
        downloadButton.disabled = false;
    } catch (err) {
        console.error("Error:", err);
        downloadStatus.textContent = "Failed to download the TikTok video.";
        downloadButton.disabled = false;
    }
          }
