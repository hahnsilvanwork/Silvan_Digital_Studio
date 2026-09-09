from pathlib import Path
import cv2,json,numpy as np
ROOT=Path(__file__).resolve().parents[3]
reports={}
for version in ('03','04'):
    folder=ROOT/f'artifacts/nfc-hero/revision-{version}-composite'
    cap=cv2.VideoCapture(str(folder/f'nfc-hero-revision-{version}.mp4'))
    count=0;prev=None;changes=[]
    while True:
        ok,f=cap.read()
        if not ok:break
        if 30<=count<120:
            # Background above the phone, left bezel, lower holding hand.
            roi=np.concatenate([f[40:95,850:1180].ravel(),f[215:290,856:871].ravel(),f[580:650,1080:1200].ravel()]).astype(float)
            if prev is not None:changes.append(float(np.mean(np.abs(roi-prev))))
            prev=roi
        count+=1
    cap.release()
    reports[version]={'decodedFrames':count,'meanStationaryRegionFrameDifferenceSeconds1To4':float(np.mean(changes))}
assert reports['04']['decodedFrames']==450
assert reports['04']['meanStationaryRegionFrameDifferenceSeconds1To4']<reports['03']['meanStationaryRegionFrameDifferenceSeconds1To4']*.15
out=ROOT/'artifacts/nfc-hero/revision-04-composite'
(out/'verification.json').write_text(json.dumps(reports,indent=2),encoding='utf-8')
print(json.dumps(reports,indent=2))
