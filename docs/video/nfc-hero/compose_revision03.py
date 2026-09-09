"""Controlled postproduction of the authorized Higgsfield base shot.

Requires pillow, numpy, opencv-python-headless, imageio-ffmpeg.
No network calls, generation or credit consumption. Original files stay intact.
"""
from pathlib import Path
import json, math
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'artifacts/nfc-hero/revision-03-composite'
OUT.mkdir(parents=True, exist_ok=True)
SW, SH = 390, 820

def font(n, bold=False):
    return ImageFont.truetype('C:/Windows/Fonts/' + ('segoeuib.ttf' if bold else 'segoeui.ttf'), n)

def photo(name, box):
    im = Image.open(ROOT / 'public/images/projects' / name).convert('RGB')
    w,h = im.size
    return im.crop(tuple(int(v * (w if i%2==0 else h)) for i,v in enumerate(box)))

CAFE = photo('cafe-vogel-retina.webp', (.52,.12,.98,.70))
GARDEN = photo('falkenried-retina.webp', (.51,.12,.98,.67))

def screen(kind, scroll=0):
    im=Image.new('RGB',(SW,SH),'#faf9f6');d=ImageDraw.Draw(im)
    def tx(x,y,s,size=25,b=False,color='#242422'):
        d.text((x,y),s,font=font(size,b),fill=color)
    def button(y,text,color='#262820'):
        d.rounded_rectangle((26,y,364,y+57),radius=13,fill=color)
        tx(43,y+11,text,24,True,'white')
    tx(24,30,'9:41',17,True)
    d.rounded_rectangle((324,38,360,49),radius=3,fill='#242422')
    if kind in ('idle','nfc'):
        # Illustrative unlocked Safari start page, with a system-style banner.
        for y in range(72,765):
            k=(y-72)/693
            d.line((0,y,389,y),fill=(int(228-31*k),int(234-18*k),int(239-9*k)))
        tx(28,280,'Favoriten',29,True)
        for x,label,col in [(28,'Apple','#555d67'),(143,'Wikipedia','#737e8c'),(258,'Suche','#4285f4')]:
            d.rounded_rectangle((x,335,x+80,415),radius=18,fill='white')
            tx(x+26,349,label[0],36,True,col)
            tx(x,429,label,16,color='#454b52')
        d.rounded_rectangle((20,680,370,738),radius=18,fill='#f2f4f6')
        tx(64,698,'Suchen oder Website eingeben',17,color='#69717a')
        if kind=='nfc':
            d.rounded_rectangle((10,82,380,191),radius=25,fill='#bac3cc')
            d.rounded_rectangle((10,78,380,187),radius=25,fill='#f1f3f5')
            # NFC system icon: radiating tag-reading waves, not a menu button.
            d.rounded_rectangle((24,106,70,152),radius=11,fill='#727b84')
            for radius in (8,14,20):
                d.arc((36-radius,129-radius,36+radius,129+radius),-65,65,fill='white',width=2)
            tx(82,96,'NFC-Tag einer Website',21,True)
            tx(82,124,'Öffne „cafe-vogel.example“',18,color='#25272a')
            tx(82,150,'in Safari',18,color='#25272a')
    elif kind=='menu':
        tx(26,90,'CAFÉ VOGEL',20,True,color='#766042')
        tx(26,129,'Unser Menü',37,True)
        tx(26,182,'Kaffee & Patisserie',22,color='#756a5e')
        im.paste(ImageOps.fit(CAFE,(338,214)),(26,235)); d=ImageDraw.Draw(im)
        content=Image.new('RGB',(338,420),'#faf9f6');cd=ImageDraw.Draw(content)
        y=0
        for title,sub in [('Kaffee','Espresso · Cappuccino'),('Patisserie','Croissant · Kuchen'),('Für eine kleine Pause','Frisch auswählen & geniessen')]:
            cd.text((0,y),title,font=font(30,True),fill='#242422')
            cd.text((0,y+43),sub,font=font(21),fill='#716b61')
            cd.line((0,y+83,338,y+83),fill='#d9d5ce',width=1)
            y+=124
        im.paste(content.crop((0,int(scroll),338,int(scroll)+274)),(26,478));d=ImageDraw.Draw(im)
    elif kind=='google':
        x=26
        for c,col in zip('Google',['#4285f4','#ea4335','#fbbc05','#4285f4','#34a853','#ea4335']):
            tx(x,87,c,40,True,col);x+=d.textlength(c,font=font(40,True))
        tx(26,163,'Café Vogel',27,True)
        tx(26,219,'Bewertung',33,True);tx(26,260,'schreiben',33,True)
        tx(26,324,'Wie war dein Besuch?',22)
        for j in range(5):
            cx=52+j*71;cy=412;points=[]
            for k in range(10):
                r=26 if k%2==0 else 11;a=-math.pi/2+k*math.pi/5
                points.append((cx+r*math.cos(a),cy+r*math.sin(a)))
            d.polygon(points,fill='white',outline='#70757a',width=3)
        d.rounded_rectangle((26,473,364,648),radius=12,outline='#dadce0',width=2)
        tx(42,495,'Deine Erfahrung',24,color='#747775');tx(42,529,'beschreiben …',24,color='#747775')
        tx(26,685,'Noch nicht gesendet',21,color='#6a7379')
    elif kind in ('instagram','facebook'):
        is_ig=kind=='instagram';tx(26,88,'Instagram' if is_ig else 'facebook',37,True,'#242422' if is_ig else '#1877f2')
        d.ellipse((26,161,104,239),fill='#ded2bb');tx(44,174,'CV',31,True)
        tx(122,164,'Café Vogel',28,True);tx(122,205,'Kaffee & Genuss',20,color='#777')
        button(265,'Profil ansehen' if is_ig else 'Kontakt aufnehmen','#bc3673' if is_ig else '#1877f2')
        tx(26,345,'Beiträge' if is_ig else 'Neuigkeiten',26,True)
        im.paste(ImageOps.fit(CAFE,(338,239)),(26,397));d=ImageDraw.Draw(im)
        tx(26,661,'Ein Stück Alltag geniessen.',22)
    elif kind=='airbnb':
        tx(26,88,'airbnb',39,True,'#ff385c');tx(26,157,'Dein Aufenthalt',31,True)
        im.paste(ImageOps.fit(GARDEN,(338,254)),(26,227));d=ImageDraw.Draw(im)
        tx(26,511,'Ankommen. Wohlfühlen.',26,True)
        tx(26,558,'Informationen zur Unterkunft',21,color='#777')
        button(624,'Unterkunft ansehen','#e8325c')
    d.rectangle((0,765,390,820),fill='#faf9f6')
    tx(26,774,'Demoansicht',16,color='#888')
    d.rounded_rectangle((144,810,246,814),radius=2,fill='#222')
    return cv2.cvtColor(np.array(im),cv2.COLOR_RGB2BGR)

S={k:screen(k) for k in ['idle','nfc','menu','google','instagram','facebook','airbnb']}
for k,s in S.items():cv2.imwrite(str(OUT/f'screen-{k}.png'),s)

CARD_SPECS={
    'menu':('menu-round-black-78746a65bfe4.png',(231,246,1021,1035),'circle'),
    'google':('review-round-black-4554e8ac3153.png',(196,184,1061,1048),'circle'),
    'instagram':('nfc-014-instagram-e94ce06a2966.png',(289,181,977,1106),'rect'),
    'facebook':('nfc-020-facebook-10ab09650ef7.png',(326,292,1095,1039),'rect'),
    'airbnb':('nfc-032-airbnb-87be1722e571.png',(143,110,941,919),'circle'),
}
CARDS={}
for kind,(name,box,shape) in CARD_SPECS.items():
    im=Image.open(ROOT/'public/images/products/main'/name).convert('RGBA').crop(box)
    mask=Image.new('L',im.size);md=ImageDraw.Draw(mask)
    if shape=='circle':md.ellipse((2,2,im.width-3,im.height-3),fill=255)
    else:md.rounded_rectangle((2,2,im.width-3,im.height-3),radius=32,fill=255)
    im.putalpha(mask);im=im.resize((round(237*im.width/im.height),237),Image.Resampling.LANCZOS)
    CARDS[kind]=np.array(im)

cap=cv2.VideoCapture(str(ROOT/'artifacts/nfc-hero/revision-02-base.mp4'))
frames=[]
while True:
    ok,f=cap.read()
    if not ok:break
    frames.append(f)
cap.release();H,W=frames[0].shape[:2]

# The circular product and pedestal are pixel-stationary in this base shot.
# Reconstruct only the small background area behind the card for silhouette changes.
ys,xs=np.mgrid[:H,:W];oval=((xs-726.5)/123)**2+((ys-256.5)/122)**2
sample=(xs>570)&(xs<851)&(ys>110)&(ys<374)&(oval>1.1)
sample &= np.min(frames[0],axis=2)>155
xn=(xs-726)/200;yn=(ys-256)/200
basis=np.stack([np.ones_like(xn),xn,yn,xn*yn,xn*xn,yn*yn],axis=-1)
coef=np.linalg.lstsq(basis[sample],frames[0][sample].astype(float),rcond=None)[0]
clean=np.clip(basis@coef,0,255).astype(np.uint8)
erase=np.clip((1.025-oval)*90,0,1).astype(np.float32)

def add_card(f,kind):
    a=erase[:,:,None];f=(f*(1-a)+clean*a).astype('uint8')
    p=CARDS[kind];h,w=p.shape[:2];x=round(726.5-w/2);y=138
    alpha=p[:,:,3:4]/255.;f[y:y+h,x:x+w]=(f[y:y+h,x:x+w]*(1-alpha)+p[:,:,:3][:,:,::-1]*alpha).astype('uint8')
    return f

def screen_quad(f):
    b,g,r=cv2.split(f.astype(np.int16))
    m=((b-r>5)&(g-r>0)&(r>80)&(r<210)&(b-g<30)).astype('uint8')*255
    m[:,:820]=0
    m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
    cs,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
    if not cs:return None
    c=max(cs,key=cv2.contourArea)
    if cv2.contourArea(c)<1500:return None
    rect=cv2.minAreaRect(c);quad=cv2.boxPoints(rect)
    sums=quad.sum(1);diff=np.diff(quad,axis=1).ravel()
    dst=np.float32([quad[sums.argmin()],quad[diff.argmin()],quad[sums.argmax()],quad[diff.argmax()]])
    x,y,w,h=cv2.boundingRect(c)
    if x+w>=W-2 or y+h>=H-2:
        # Extrapolate the off-frame part instead of squeezing a whole UI into it.
        w=max(w,208);h=max(h,436)
        dst=np.float32([[x,y],[x+w,y],[x+w,y+h],[x,y+h]])
    return dst

ANCHOR_INDEX=312
ANCHOR=screen_quad(frames[ANCHOR_INDEX])

def stabilize(f,weight):
    quad=screen_quad(f)
    if quad is None:return f,None
    target=quad*(1-weight)+ANCHOR*weight
    # Align phone, bezel and holding hand together; the camera/background stays fixed.
    matrix=cv2.getPerspectiveTransform(quad,target)
    # Remove the source product before warping the foreground so its edge cannot double.
    prepared=np.uint8(f*(1-erase[:,:,None])+clean*erase[:,:,None])
    aligned=cv2.warpPerspective(prepared,matrix,(W,H),borderMode=cv2.BORDER_REPLICATE)
    feather=np.clip((xs-780)/25,0,1).astype(np.float32)[:,:,None]
    return np.uint8(f*(1-feather)+aligned*feather),target

def add_screen(f,pixels,dst=None):
    if dst is None:dst=screen_quad(f)
    if dst is None:return f,False
    b,g,r=cv2.split(f.astype(np.int16))
    src=np.float32([[0,0],[SW-1,0],[SW-1,SH-1],[0,SH-1]])
    transform=cv2.getPerspectiveTransform(src,dst)
    warp=cv2.warpPerspective(pixels,transform,(W,H))
    # Keep the original finger and camera island above the screen insert.
    rounded=Image.new('L',(SW,SH));ImageDraw.Draw(rounded).rounded_rectangle((0,0,SW-1,SH-1),radius=45,fill=255)
    region=cv2.warpPerspective(np.array(rounded),transform,(W,H))
    mask=region
    occlusion=((r-b>10)&(r>90))|((r<75)&(g<75)&(b<75))
    mask[occlusion]=0
    mask=cv2.GaussianBlur(mask,(3,3),.5)/255.
    return np.uint8(f*(1-mask[:,:,None])+warp*mask[:,:,None]),True

FPS=30
writer=imageio_ffmpeg.write_frames(str(OUT/'nfc-hero-revision-03.mp4'),(W,H),fps=FPS,codec='libx264',pix_fmt_in='rgb24',pix_fmt_out='yuv420p',output_params=['-crf','18','-movflags','+faststart'])
writer.send(None)
review_times=[0,1.4,2.4,3.4,4.4,5.6,6.4,7.2,8,8.8,10.5,12.5,14,14.9]
review_indices={round(t*FPS) for t in review_times};tracking=[]
for i in range(450):
    t=i/FPS
    # Compress the long pre-tap wait and retain an extended demonstration hold.
    st=t*2 if t<4 else (13 if t<12.5 else 13+(t-12.5)*2/2.5)
    f=frames[min(round(st*24),len(frames)-1)].copy()
    weight=min(1,max(0,(t-.85)/.35)) if t<4 else (1 if t<12.5 else 0)
    weight=weight*weight*(3-2*weight)
    f,quad=stabilize(f,weight)
    kind='menu'
    for start,key in [(5.2,'google'),(6.0,'instagram'),(6.8,'facebook'),(7.6,'airbnb'),(8.4,'menu')]:
        if t>=start:kind=key
    if t<1.05:sk='idle'
    elif t<3.6:sk='nfc'
    else:sk=kind
    pixels=S[sk]
    if sk=='menu' and 9<t<12.5:pixels=screen('menu',int(min(1,(t-9)/2)*65))
    f,tracked=add_screen(f,pixels,quad);tracking.append(tracked)
    f=add_card(f,kind)
    writer.send(cv2.cvtColor(f,cv2.COLOR_BGR2RGB).tobytes())
    if i in review_indices:cv2.imwrite(str(OUT/f'frame-{t:05.2f}.jpg'),f)
writer.close()
(OUT/'render-record.json').write_text(json.dumps({'fps':30,'frames':450,'duration':15,'sourceNativeFps':24,'sourceFile':'revision-02-base.mp4','screenTrackingFrameCount':sum(tracking),'matchingCardAndScreenSwitchesSeconds':[5.2,6,6.8,7.6,8.4],'sourceToOutput':'0-8 to 0-4; 8-13 to 4-12.5; 13-15 to 12.5-15','screens':'Designed illustrative UI, exactly typeset locally; no real customer accounts','review':'Pending visual export inspection'},indent=2),encoding='utf-8')
print(OUT/'nfc-hero-revision-03.mp4')
