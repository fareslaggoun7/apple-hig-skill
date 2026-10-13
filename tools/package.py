#!/usr/bin/env python3
"""Reproducibly build the single-root skill ZIP for Claude and other clients."""
from __future__ import annotations
import argparse
import hashlib
import io
from pathlib import Path
import zipfile

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'skills/apple-hig'

def archive_bytes(source=SOURCE):
    buffer=io.BytesIO()
    with zipfile.ZipFile(buffer,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
        for path in sorted(source.rglob('*'),key=lambda p:p.relative_to(source).as_posix()):
            if not path.is_file() or '__pycache__' in path.parts or path.suffix=='.pyc' or path.relative_to(source).parts[0]=='work':continue
            name='apple-hig/'+path.relative_to(source).as_posix()
            info=zipfile.ZipInfo(name,date_time=(2026,10,13,0,0,0))
            info.compress_type=zipfile.ZIP_DEFLATED
            info.external_attr=0o100644<<16
            info.create_system=3
            archive.writestr(info,path.read_bytes(),compress_type=zipfile.ZIP_DEFLATED,compresslevel=9)
    return buffer.getvalue()

def archives_equivalent(current_bytes,expected_bytes):
    """ZIP ordering and compression can differ; names and contents must agree."""
    try:
        with zipfile.ZipFile(io.BytesIO(current_bytes)) as current,zipfile.ZipFile(io.BytesIO(expected_bytes)) as expected:
            names=current.namelist();expected_names=expected.namelist()
            return (current.testzip() is None and len(names)==len(set(names))
                and set(names)==set(expected_names)
                and all(current.read(n)==expected.read(n) for n in expected_names))
    except (OSError,zipfile.BadZipFile):return False

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--check',action='store_true');args=p.parse_args()
    data=archive_bytes();dest=ROOT/'dist/apple-hig.zip'
    checksum=hashlib.sha256(data).hexdigest()+'  apple-hig.zip\n'
    checksum_file=ROOT/'dist/SHA256SUMS'
    if args.check:
        valid=dest.exists() and checksum_file.exists()
        if valid:
            # Compare entries across Python/zlib versions rather than assuming
            # compressors produce identical byte streams on every platform.
            try:
                valid=archives_equivalent(dest.read_bytes(),data)
                valid=valid and checksum_file.read_text()==hashlib.sha256(dest.read_bytes()).hexdigest()+'  apple-hig.zip\n'
            except (OSError,zipfile.BadZipFile):valid=False
        if not valid:
            p.exit(1,'Distribution is stale. Run python tools/package.py and commit dist/.\n')
        print('Distribution matches the current skill.');return
    dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
    checksum_file.write_text(checksum,encoding='ascii',newline='\n')
    print('Built dist/apple-hig.zip ('+str(len(data))+' bytes)')

if __name__=='__main__':main()
