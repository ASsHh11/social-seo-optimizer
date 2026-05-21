import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();

function base64FromBytes(data) {
  let binary = "";
  const chunkSize = 0x8000;

  for (let i = 0; i < data.length; i += chunkSize) {
    binary += String.fromCharCode(...data.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

async function encodeFileToBase64(file) {
  const data = await fetchFile(file);
  return base64FromBytes(data);
}

export async function prepareMediaPayload(file) {
  if (!file?.type) {
    throw new Error("Unsupported media file");
  }

  if (file.type.startsWith("image/")) {
    return {
      mimeType: file.type,
      data: await encodeFileToBase64(file)
    };
  }

  if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
    if (!ffmpeg.loaded) {
      await ffmpeg.load();
    }

    const extension = file.type.split("/")[1] || "bin";
    const inputName = `input.${extension}`;

    await ffmpeg.writeFile(inputName, await fetchFile(file));

    await ffmpeg.exec([
      "-i",
      inputName,
      "-vn",
      "-acodec",
      "libmp3lame",
      "output.mp3"
    ]);

    const data = await ffmpeg.readFile("output.mp3");

    return {
      mimeType: "audio/mp3",
      data: base64FromBytes(data)
    };
  }

  throw new Error("Unsupported media type. Please upload image, audio, or video.");
}
