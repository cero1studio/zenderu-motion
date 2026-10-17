import whisper
import json
model = whisper.load_model("base")
result = model.transcribe("public/expert3/expert3_audio.wav", word_timestamps=True, language="es")
subs = []
for segment in result["segments"]:
    for word in segment["words"]:
        subs.append({"word": word["word"].strip(), "start": word["start"], "end": word["end"]})
with open("violeta_words.json", "w") as f:
    json.dump(subs, f, indent=2)
