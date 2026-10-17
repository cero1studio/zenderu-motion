import cv2
import mediapipe as mp
import sys

video_path = sys.argv[1]
mp_face_detection = mp.solutions.face_detection
face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)

cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)
if fps == 0: fps = 30
frame_skip = int(fps) * 5 # sample every 5 seconds

frame_idx = 0
faces = []
while cap.isOpened():
    ret, frame = cap.read()
    if not ret: break
    if frame_idx % frame_skip == 0:
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_detection.process(image)
        if results.detections:
            bbox = results.detections[0].location_data.relative_bounding_box
            faces.append(bbox.height)
    frame_idx += 1
cap.release()
avg_face = sum(faces) / len(faces) if faces else 0
print(f"{video_path}: Avg Face Height = {avg_face:.3f}")
