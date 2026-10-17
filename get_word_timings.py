import whisper
import json
model = whisper.load_model("base")
result = model.transcribe("public/stella/68e1a57b8dd8466cb1f49df7961e36e5.wav", word_timestamps=True, language="es")
subs = []
for segment in result["segments"]:
    for word in segment["words"]:
        subs.append({"word": word["word"].strip(), "start": word["start"], "end": word["end"]})
with open("stella_words.json", "w") as f:
    json.dump(subs, f, indent=2)
