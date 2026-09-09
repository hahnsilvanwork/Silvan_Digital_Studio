from pathlib import Path
import cv2, json, numpy as np
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parents[3]
OUT=ROOT/'artifacts/nfc-hero/revision-03-composite'
def inspect(path):
    cap=cv2.VideoCapture(str(path));fps=cap.get(cv2.CAP_PROP_FPS)
    count=0;previous=None;diffs=[];selected={}
    samples=[2.4,3.4,3.9,4,4.2,6.4,12.4,12.5,12.6,14]
    indices={round(t*fps):t for t in samples}
    while True:
        ok,f=cap.read()
        if not ok:break
        t=count/fps
        if 4.2<=t<12.4:
            roi=f[450:650,1110:1230].astype(float)
            if previous is not None:diffs.append(float(np.mean(np.abs(roi-previous))))
            previous=roi
        if count in indices:selected[indices[count]]=f
        count+=1
    cap.release()
    return dict(frames=count,fps=fps,duration=count/fps,holdingHandMeanFrameDifference=float(np.mean(diffs))),selected
new,shots=inspect(OUT/'nfc-hero-revision-03.mp4')
old,_=inspect(ROOT/'artifacts/nfc-hero/revision-02-composite/nfc-hero-revision-02.mp4')
assert new['frames']==450 and new['fps']==30
assert new['holdingHandMeanFrameDifference']<old['holdingHandMeanFrameDifference']
sheet=Image.new('RGB',(1000,420*2),'#eee')
for j,(t,f) in enumerate(shots.items()):
    crop=Image.fromarray(cv2.cvtColor(f[:,800:],cv2.COLOR_BGR2RGB)).resize((200,300))
    x=j%5*200;y=j//5*420
    sheet.paste(crop,(x,y+25));ImageDraw.Draw(sheet).text((x+5,y+5),str(t)+' s',fill='black')
sheet.save(OUT/'transition-review.jpg')
record={'revision03':new,'revision02':old,'popup':'Reconstructed illustrative German iPhone NFC website notification; reserved demo domain, not a captured OS notification','stabilization':'Phone and hand aligned during tap; fixed source frame for 4–12.5 s montage','creditsConsumed':0,'decodedEveryFrame':True}
(OUT/'verification.json').write_text(json.dumps(record,indent=2),encoding='utf-8')
render=json.loads((OUT/'render-record.json').read_text(encoding='utf-8'))
render['sourceToOutput']='0-8 to 0-4, pose stabilized; source frame at 13 s fixed for 4-12.5; 13-15 to 12.5-15'
render['review']='All 450 frames decoded; hold ROI comparison passed; transition stills exported for visual inspection'
(OUT/'render-record.json').write_text(json.dumps(render,indent=2),encoding='utf-8')
print(json.dumps(record,indent=2))
