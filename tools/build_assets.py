#!/usr/bin/env python3
"""Create the project's original diagram assets (optional development: Pillow)."""
from pathlib import Path
from html import escape
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/assets'
INK='#152b46';MUTED='#53677f';BLUE='#285fcb';PALE='#edf3fb';TEAL='#2c7869';LINE='#d9e2ed'

def font(size,bold=False):
    candidates=([r'C:\Windows\Fonts\seguisb.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'] if bold else [r'C:\Windows\Fonts\segoeui.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'])
    for candidate in candidates:
        if Path(candidate).exists():return ImageFont.truetype(candidate,size*2)
    return ImageFont.load_default(size=size*2)

class Canvas:
    def __init__(self,w,h,title):
        self.w=w;self.h=h;self.image=Image.new('RGB',(w*2,h*2),'#f5f8fc');self.d=ImageDraw.Draw(self.image)
        self.svg=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title"><title id="title">{escape(title)}</title><rect width="100%" height="100%" fill="#f5f8fc"/>']
    def rect(self,x,y,w,h,fill='white',r=20,stroke=None):
        self.d.rounded_rectangle((x*2,y*2,(x+w)*2,(y+h)*2),radius=r*2,fill=fill,outline=stroke,width=2)
        self.svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}"'+(f' stroke="{stroke}"' if stroke else '')+'/>')
    def text(self,x,y,text,size=24,fill=INK,bold=False):
        self.d.text((x*2,y*2),text,font=font(size,bold),fill=fill,anchor='lt')
        self.svg.append(f'<text x="{x}" y="{y+size*.82}" font-family="Segoe UI,Arial,sans-serif" font-size="{size}" font-weight="{650 if bold else 400}" fill="{fill}">{escape(text)}</text>')
    def line(self,x1,y1,x2,y2,fill=LINE,width=2):
        self.d.line((x1*2,y1*2,x2*2,y2*2),fill=fill,width=width*2)
        self.svg.append(f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{fill}" stroke-width="{width}"/>')
    def arrow(self,x1,y,x2):
        self.line(x1,y,x2,y,BLUE,2);self.line(x2-8,y-6,x2,y,BLUE,2);self.line(x2-8,y+6,x2,y,BLUE,2)
    def save(self,name):
        OUT.mkdir(parents=True,exist_ok=True)
        self.image.resize((self.w,self.h),Image.Resampling.LANCZOS).save(OUT/(name+'.png'),optimize=True)
        (OUT/(name+'.svg')).write_text('\n'.join(self.svg+['</svg>']),encoding='utf-8')

def hero():
    c=Canvas(1200,640,'Apple HIG Skill: a portable reference for source-backed interface decisions')
    c.rect(24,24,1152,592,'#ffffff',28)
    c.text(66,69,'THE PORTABLE DESIGN REFERENCE',17,MUTED,True)
    c.text(64,128,'Apple HIG',76,INK,True);c.text(64,210,'Skill',76,INK,True)
    c.text(68,320,'From guidelines to decisions.',29,INK)
    c.text(68,367,'Traceable sources. Platform context.',21,MUTED)
    c.text(68,402,'Built for Claude and Codex.',21,MUTED)
    for x,big,small in [(68,'173','indexed pages'),(270,'6','topic families'),(468,'Live','source checks')]:
        c.text(x,490,big,34,BLUE,True);c.text(x,536,small,16,MUTED)
    c.rect(725,89,355,409,PALE,24)
    c.rect(700,113,355,409,'#e0e9f7',24)
    c.rect(675,137,355,409,'white',24,LINE)
    c.rect(698,160,309,46,INK,12);c.text(714,173,'A decision, with evidence',18,'white',True)
    for y,title,detail in [(239,'01  Establish context','Platform / task / inputs'),(318,'02  Read the source','Topic / section / scope'),(397,'03  Apply and check','Implementation / validation')]:
        c.text(703,y,title,22,INK,True);c.text(703,y+34,detail,16,MUTED)
        if y<397:c.line(703,y+62,1003,y+62)
    c.text(703,495,'Independent community skill',15,TEAL,True)
    c.save('hero')

def workflow():
    c=Canvas(1200,355,'Five steps from a platform-specific question to a validated interface decision')
    c.text(38,35,'A repeatable path from question to evidence.',30,INK,True)
    data=[('Context','Platform, task,','inputs and states'),('Find','Relevant topics','and source cards'),('Verify','Current official','sections and scope'),('Apply','A concrete design','or implementation'),('Check','Changed behavior','and remaining gaps')]
    for i,(title,a,b) in enumerate(data):
        x=38+i*232;c.rect(x,110,196,190,'white',17,LINE)
        c.text(x+18,132,f'0{i+1}',17,BLUE,True);c.text(x+18,170,title,27,INK,True)
        c.text(x+18,219,a,17,MUTED);c.text(x+18,247,b,17,MUTED)
        if i<4:c.arrow(x+204,205,x+224)
    c.save('workflow')

def install_paths():
    c=Canvas(1200,450,'Install the same portable skill in Claude chat, Claude Code, or Codex')
    c.text(38,35,'One skill folder. Three ways to use it.',32,INK,True)
    rows=[('Claude chat','Upload the prepared ZIP','Customize → Skills','Enable apple-hig'),('Claude Code','Copy the skill folder','~/.claude/skills/apple-hig','Invoke /apple-hig'),('Codex','Copy the skill folder','~/.codex/skills/apple-hig','Invoke $apple-hig')]
    for i,(title,a,b,d) in enumerate(rows):
        x=38+i*390;c.rect(x,111,344,262,'white',20,LINE)
        c.rect(x+22,134,44,44,PALE,11);c.text(x+35,145,str(i+1),22,BLUE,True)
        c.text(x+22,198,title,28,INK,True);c.text(x+22,248,a,19,MUTED)
        c.text(x+22,283,b,17,MUTED);c.text(x+22,320,d,18,TEAL,True)
    c.text(40,405,'Use the installation guide for current controls, account settings, and custom paths.',17,MUTED)
    c.save('install-paths')

def review():
    c=Canvas(1200,680,'Illustrative review: clarify actions, give an exit alternative, and provide status feedback')
    c.text(38,35,'A review connects an observation to a correction.',30,INK,True)
    c.text(40,82,'Original educational mockup — not an Apple screenshot or exact geometry specification.',17,MUTED)
    for x,label in [(40,'Before / restricted exit'),(640,'After / clear alternatives')]:
        c.text(x,142,label,23,INK,True);c.rect(x,187,520,334,'white',22,LINE)
        c.text(x+27,217,'Edit recipe',26,INK,True);c.text(x+27,269,'Recipe name',17,MUTED,True)
        c.rect(x+26,301,468,57,'#f7f9fc',10,LINE);c.text(x+40,319,'Lemon & olive oil cake',20,INK)
    c.rect(420,419,110,54,INK,11);c.text(450,435,'Done',19,'white',True)
    c.rect(666,419,115,54,'white',11,LINE);c.text(691,435,'Cancel',19,INK,True)
    c.rect(985,419,145,54,BLUE,11);c.text(1005,435,'Save recipe',19,'white',True)
    c.text(667,487,'Changes stay in this demo only.',16,MUTED)
    c.arrow(578,351,621)
    c.text(40,559,'Observed: completion appears to be',20,MUTED);c.text(40,590,'the only visible way to exit.',20,MUTED)
    c.text(640,559,'Proposed: named actions, a cancel path,',20,TEAL);c.text(640,590,'and explicit feedback. Validate behavior.',20,TEAL)
    c.save('review-example')

if __name__=='__main__':
    hero();workflow();install_paths();review();print('Built four original PNG/SVG diagram pairs in docs/assets/.')
