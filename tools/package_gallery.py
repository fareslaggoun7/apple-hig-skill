#!/usr/bin/env python3
"""Reproducible standalone gallery archive; serve it with any static HTTP server."""
import argparse
import hashlib
import io
from pathlib import Path
import zipfile
from package import archives_equivalent

ROOT=Path(__file__).resolve().parents[1]

def archive_bytes():
    buffer=io.BytesIO()
    with zipfile.ZipFile(buffer,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
        for file in sorted((ROOT/'examples/gallery').rglob('*')):
            if not file.is_file() or file.suffix not in {'.html','.css','.mjs','.json','.webp'}:continue
            info=zipfile.ZipInfo('apple-hig-gallery/'+file.relative_to(ROOT/'examples/gallery').as_posix(),date_time=(2026,10,13,0,0,0))
            info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;info.create_system=3
            archive.writestr(info,file.read_bytes())
        info=zipfile.ZipInfo('apple-hig-gallery/README.txt',date_time=(2026,10,13,0,0,0))
        archive.writestr(info,'Run from this folder: python -m http.server 8000 --bind 127.0.0.1\nOpen http://127.0.0.1:8000 in a browser. No build step.\n173 original web topic routes, 54 studies in 10 ordered workshops and 24 motion examples; integration and device behavior are simulated.\nSource snapshot: 14 October 2026. No native fidelity or numerical accuracy guarantee.\nFull guide: https://github.com/fareslaggoun7/apple-hig-skill/blob/main/examples/gallery/README.md\n')
        for name in ['LICENSE','NOTICE']:
            info=zipfile.ZipInfo('apple-hig-gallery/'+name,date_time=(2026,10,13,0,0,0));archive.writestr(info,(ROOT/name).read_bytes())
    return buffer.getvalue()

def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--check',action='store_true');args=parser.parse_args()
    data=archive_bytes();dest=ROOT/'dist/apple-hig-gallery.zip';checks=ROOT/'dist/GALLERY_SHA256SUMS'
    if args.check:
        valid=dest.exists() and checks.exists()
        if valid:valid=archives_equivalent(dest.read_bytes(),data) and checks.read_text()==hashlib.sha256(dest.read_bytes()).hexdigest()+'  apple-hig-gallery.zip\n'
        if not valid:parser.exit(1,'Gallery distribution is stale. Run python tools/package_gallery.py.\n')
        print('Gallery distribution matches the runnable source.');return
    dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data);checks.write_text(hashlib.sha256(data).hexdigest()+'  apple-hig-gallery.zip\n',encoding='ascii',newline='\n');print('Built gallery ZIP ('+str(len(data))+' bytes).')

if __name__=='__main__':main()
