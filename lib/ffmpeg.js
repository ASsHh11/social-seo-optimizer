import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();

export async function extractAudio(file) {
  if (!ffmpeg.loaded) {
    await ffmpeg.load();
  }

  await ffmpeg.writeFile(
    "input.mp4",
    await fetchFile(file)
  );

  await ffmpeg.exec([
    "-i",
    "input.mp4",
    "-vn",
    "-acodec",
    "libmp3lame",
    "output.mp3"
  ]);

  const data = await ffmpeg.readFile("output.mp3");

  let binary = "";
  const chunkSize = 0x8000;

  for (let i = 0; i < data.length; i += chunkSize) {
    binary += String.fromCharCode(...data.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}
