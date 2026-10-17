import cv2
import mediapipe as mp
import numpy as np

def analyze_shots(video_path):
    mp_face_detection = mp.solutions.face_detection
    face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)
    
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_skip = int(fps) # 1 frame per second is enough
    
    frame_idx = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        if frame_idx % frame_skip == 0:
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = face_detection.process(image)
            sec = frame_idx / fps
            
            if results.detections:
                bbox = results.detections[0].location_data.relative_bounding_box
                face_height = bbox.height
                shot_type = "CLOSE-UP" if face_height > 0.15 else "MEDIUM"
                print(f"Sec {sec:.1f}: Face height = {face_height:.3f} -> {shot_type}")
            else:
                print(f"Sec {sec:.1f}: No face detected")
                
        frame_idx += 1
        
    cap.release()

analyze_shots("public/anselmo/anselmo_full.mp4")
