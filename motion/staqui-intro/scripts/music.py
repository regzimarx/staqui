"""Original, deterministic ambient underscore. No sampled or third-party music."""
import numpy as np
from scipy.io.wavfile import write
SR=48000
D=34
n=int(SR*D)
a=np.zeros((n,2),dtype=np.float64)
def note(start,dur,midi,amp,pan=0,kind='pad'):
    begin=int(start*SR); count=min(int(dur*SR),n-begin)
    if count<=0:return
    t=np.arange(count)/SR; freq=440*2**((midi-69)/12)
    if kind=='pad':
        env=np.minimum(t/1.6,1)*np.minimum((dur-t)/2,1)
        wave=(np.sin(2*np.pi*freq*t)+.18*np.sin(2*np.pi*freq*2*t)+.1*np.sin(2*np.pi*freq*1.0015*t))*.65
    else:
        env=(1-np.exp(-t*60))*np.exp(-t*2.6)*np.minimum((dur-t)/.3,1)
        wave=np.sin(2*np.pi*freq*t)+.16*np.sin(2*np.pi*freq*2*t)*np.exp(-t*5)
    sound=wave*env*amp
    a[begin:begin+count,0]+=sound*np.sqrt((1-pan)/2)
    a[begin:begin+count,1]+=sound*np.sqrt((1+pan)/2)
# D major / B minor / G major / A suspended, voiced above the narration fundamentals.
chords=[[50,57,61,66],[47,54,62,66],[43,55,59,62],[45,57,62,64],[50,57,61,66]]
for k,start in enumerate([0,7,14,21,27]):
    for j,m in enumerate(chords[k]):note(start,9.8,m,.028,[-.65,.5,-.25,.7][j])
pattern=[74,78,81,78,73,78,81,85]
for i,start in enumerate(np.arange(5.0,29,.6666667)):
    note(float(start),2.1,pattern[i%8],.025 if start<23 else .016,(-.55 if i%2 else .55),'pluck')
# Sparse, soft low pulse; keep the middle clear for speech.
for start in np.arange(10,23,1.333333):note(float(start),.8,38,.012,0,'pluck')
for delay,gain in [(.23,.14),(.47,.09),(.71,.05)]:
    d=int(delay*SR);a[d:]+=a[:-d,::-1].copy()*gain
fadein=np.minimum(np.arange(n)/SR/1.8,1)
fadeout=np.minimum((D-np.arange(n)/SR)/2.6,1)
a*= (fadein*fadeout)[:,None]
write('public/music-original.wav',SR,np.int16(np.clip(a,-1,1)*32767))
