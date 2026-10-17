import cv2
import mediapipe as mp
import numpy as np

def detect_hand_glitches(video_path):
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
    
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    
    # Analyze 5 frames per second to save time
    frame_skip = int(fps / 5)
    
    hand_positions = []
    
    frame_idx = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        if frame_idx % frame_skip == 0:
            # Convert to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(image)
            
            sec = frame_idx / fps
            
            if results.pose_landmarks:
                landmarks = results.pose_landmarks.landmark
                # Left and right wrists
                l_wrist = landmarks[mp_pose.PoseLandmark.LEFT_WRIST]
                r_wrist = landmarks[mp_pose.PoseLandmark.RIGHT_WRIST]
                
                # y is 0 at top, 1 at bottom.
                l_y = l_wrist.y if l_wrist.visibility > 0.5 else 1.0
                r_y = r_wrist.y if r_wrist.visibility > 0.5 else 1.0
                
                # A hand is "up" if its y is < 0.75 (adjust based on vertical video framing)
                # Let's say if y < 0.85 it's in the frame for a portrait video
                hand_positions.append({'sec': sec, 'l_y': l_y, 'r_y': r_y})
            else:
                hand_positions.append({'sec': sec, 'l_y': 1.0, 'r_y': 1.0})
                
        frame_idx += 1
        
    cap.release()
    
    # Analyze positions to find static high hands
    glitch_segments = []
    is_glitching = False
    start_sec = 0
    
    # Look at a moving window
    window_size = 5 # 1 second (since we have 5 samples/sec)
    for i in range(len(hand_positions) - window_size):
        window = hand_positions[i:i+window_size]
        
        # Check if hands are high
        # We assume they are glitching if they are consistently high and movement is near zero
        l_ys = [p['l_y'] for p in window]
        r_ys = [p['r_y'] for p in window]
        
        # Are hands up?
        l_up = all(y < 0.85 for y in l_ys)
        r_up = all(y < 0.85 for y in r_ys)
        
        # Is movement extremely low?
        l_static = np.var(l_ys) < 0.0001
        r_static = np.var(r_ys) < 0.0001
        
        glitching_now = (l_up and l_static) or (r_up and r_static)
        
        sec = window[-1]['sec']
        
        if glitching_now and not is_glitching:
            is_glitching = True
            start_sec = window[0]['sec']
        elif not glitching_now and is_glitching:
            is_glitching = False
            # Add padding
            if sec - start_sec > 1.0: # Must be stuck for at least 1 sec
                glitch_segments.append((start_sec - 0.5, sec + 0.5))
                
    if is_glitching and (hand_positions[-1]['sec'] - start_sec > 1.0):
        glitch_segments.append((start_sec - 0.5, hand_positions[-1]['sec']))

    # Print results
    print("GLITCH_SEGMENTS:", glitch_segments)
    
detect_hand_glitches("public/anselmo/anselmo_full.mp4")
