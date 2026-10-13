import hashlib
import json
from pathlib import Path
import unittest
import zipfile

ROOT=Path(__file__).resolve().parents[1]

class GalleryDistributionTests(unittest.TestCase):
    def test_gallery_archive_is_self_contained_and_matches_source(self):
        with zipfile.ZipFile(ROOT/'dist/apple-hig-gallery.zip') as archive:
            self.assertIsNone(archive.testzip())
            self.assertEqual(len(archive.namelist()),len(set(archive.namelist())))
            for name in ['index.html','gallery.mjs','specimens.mjs','motion.mjs','gallery.css','catalog.json','LICENSE','NOTICE','README.txt']:
                self.assertIn('apple-hig-gallery/'+name,archive.namelist())
            topics=json.loads(archive.read('apple-hig-gallery/catalog.json'))['topics']
            self.assertEqual(len(topics),173)
            for topic in topics:
                name='apple-hig-gallery/previews/'+topic['slug']+'.webp'
                self.assertIn(name,archive.namelist())
                self.assertGreater(len(archive.read(name)),500)
            for name in archive.namelist():
                self.assertTrue(name.startswith('apple-hig-gallery/'))
                self.assertNotIn('..',Path(name).parts)
                local=ROOT/'examples/gallery'/name.removeprefix('apple-hig-gallery/')
                if local.exists():self.assertEqual(archive.read(name),local.read_bytes(),name)
        checksum=hashlib.sha256((ROOT/'dist/apple-hig-gallery.zip').read_bytes()).hexdigest()
        self.assertEqual((ROOT/'dist/GALLERY_SHA256SUMS').read_text(),checksum+'  apple-hig-gallery.zip\n')

    def test_each_picture_and_motion_preview_exists(self):
        topics=json.loads((ROOT/'examples/gallery/catalog.json').read_text())['topics']
        self.assertEqual({p.stem for p in (ROOT/'examples/gallery/previews').glob('*.webp')},{t['slug'] for t in topics})
        gifs=list((ROOT/'docs/assets').glob('motion-*.gif'))
        self.assertEqual(len(gifs),10)
        for gif in gifs:
            self.assertTrue(gif.read_bytes().startswith((b'GIF87a',b'GIF89a')))
            self.assertGreater(gif.stat().st_size,1000)

if __name__=='__main__':unittest.main()
