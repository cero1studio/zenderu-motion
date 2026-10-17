import os
os.environ["PYTORCH_ENABLE_MPS_FALLBACK"] = "1"
os.environ["CUDA_VISIBLE_DEVICES"] = ""

import sys
import torch
from TTS.api import TTS

def main():
    if len(sys.argv) < 4:
        print("Uso: python clone_voice.py <archivo_referencia.wav> '<texto a hablar>' <archivo_salida.wav>")
        sys.exit(1)
        
    reference_audio = sys.argv[1]
    text = sys.argv[2]
    output_audio = sys.argv[3]
    
    # Forzar CPU por completo
    device = "cpu"
    print(f"Cargando XTTS-v2 en {device.upper()}...")
    
    # Inicializar el modelo XTTS desactivando la detección de GPU
    tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=False)
    
    print(f"Clonando voz de {reference_audio}...")
    print(f"Texto: {text}")
    
    # Generar audio
    tts.tts_to_file(
        text=text,
        speaker_wav=reference_audio,
        language="es",
        file_path=output_audio
    )
    
    print(f"✅ ¡Clonación terminada! Guardado en {output_audio}")

if __name__ == "__main__":
    main()
