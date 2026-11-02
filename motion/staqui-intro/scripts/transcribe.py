import json
from faster_whisper import WhisperModel
model = WhisperModel('base.en', device='cpu', compute_type='int8')
from scipy.io.wavfile import read
from scipy.signal import resample_poly
import numpy as np
sr, audio = read('public/voiceover.wav')
audio = resample_poly(audio.astype(np.float32)/32768, 2, 3)
segments, info = model.transcribe(audio, word_timestamps=True)
rows = [dict(start=s.start,end=s.end,text=s.text,words=[dict(start=w.start,end=w.end,word=w.word) for w in s.words]) for s in segments]
open('assets/transcript.json','w').write(json.dumps(rows,indent=2))
for r in rows: print(f"{r['start']:.2f}–{r['end']:.2f}: {r['text']}",flush=True)
