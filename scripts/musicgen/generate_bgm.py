import os
import sys
import scipy.io.wavfile
import torch
from transformers import AutoProcessor, MusicgenForConditionalGeneration

def generate_music(prompt, output_filename, duration_seconds=15):
    print(f"Loading MusicGen model (this takes a moment the first time)...")
    
    # Usamos el modelo "small" porque es más rápido para iterar localmente en Mac
    processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
    model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

    # Si hay GPU o chip M-series disponible, enviamos el modelo a ese procesador
    device = "mps" if torch.backends.mps.is_available() else "cpu"
    print(f"Using device: {device.upper()}")
    model.to(device)

    print(f"Generating audio for prompt: '{prompt}'")
    print(f"Duration: {duration_seconds} seconds...")

    inputs = processor(
        text=[prompt],
        padding=True,
        return_tensors="pt",
    ).to(device)

    # MusicGen genera tokens, aprox 50 tokens por segundo de audio (250 tokens = 5s)
    # Por defecto model.generation_config.max_length controla esto, pero calculamos los tokens
    # 256 tokens es lo máximo que genera normalmente en una pasada (aprox 15 segundos)
    max_new_tokens = int(256 * (duration_seconds / 15.0))
    
    audio_values = model.generate(**inputs, max_new_tokens=max_new_tokens)

    # Extraer el audio y la frecuencia de muestreo
    audio_array = audio_values[0, 0].cpu().numpy()
    sampling_rate = model.config.audio_encoder.sampling_rate

    # Guardar a .wav
    scipy.io.wavfile.write(output_filename, rate=sampling_rate, data=audio_array)
    print(f"✅ Success! Audio saved to {output_filename}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python generate_bgm.py '<prompt>' <output.wav> [duration_in_seconds]")
        sys.exit(1)
        
    prompt_text = sys.argv[1]
    out_file = sys.argv[2]
    duration = int(sys.argv[3]) if len(sys.argv) > 3 else 15
    
    generate_music(prompt_text, out_file, duration)
