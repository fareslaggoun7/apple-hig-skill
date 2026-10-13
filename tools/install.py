#!/usr/bin/env python3
"""Copy the portable skill to a local client directory, preserving existing data."""
from __future__ import annotations
import argparse
import os
from pathlib import Path
import shutil

SOURCE=Path(__file__).resolve().parents[1]/'skills/apple-hig'

def snapshot(path):
    return {p.relative_to(path).as_posix():p.read_bytes() for p in path.rglob('*')
        if p.is_file() and '__pycache__' not in p.parts and p.suffix!='.pyc'}

def install(parent,source=SOURCE,dry_run=False):
    parent=Path(parent).expanduser().resolve()
    destination=parent/'apple-hig'
    if not (source/'SKILL.md').is_file():raise ValueError('Source skill is missing SKILL.md')
    if destination.is_symlink():raise FileExistsError('Destination is a symlink; leave it untouched: '+str(destination))
    if destination.exists():
        if not destination.is_dir():raise FileExistsError('Destination is not a directory: '+str(destination))
        if snapshot(source)==snapshot(destination):return 'Already up to date: '+str(destination)
        raise FileExistsError('Existing skill differs; back it up before replacing it: '+str(destination))
    if dry_run:return 'Would copy apple-hig to '+str(destination)
    parent.mkdir(parents=True,exist_ok=True)
    shutil.copytree(source,destination,ignore=shutil.ignore_patterns('__pycache__','*.pyc'))
    return 'Installed apple-hig at '+str(destination)

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--target',required=True,choices=['claude-code','codex'])
    p.add_argument('--skills-dir',type=Path,help='Explicit parent directory for the apple-hig folder')
    p.add_argument('--dry-run',action='store_true')
    args=p.parse_args()
    parent=args.skills_dir
    if parent is None:
        parent=Path.home()/'.claude/skills' if args.target=='claude-code' else Path(os.environ.get('CODEX_HOME',str(Path.home()/'.codex')))/'skills'
    try:print(install(parent,dry_run=args.dry_run))
    except (OSError,ValueError) as exc:p.exit(1,str(exc)+'\n')

if __name__=='__main__':main()
