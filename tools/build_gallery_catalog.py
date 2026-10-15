#!/usr/bin/env python3
"""Map every indexed HIG topic to an explicit runnable educational example."""
import argparse
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
CASES='''
accessibility|accessibility|Read a travel plan with adaptable text|Enlarge text
action-button|hardware|Choose a quick action for a hiking session|Start waypoint
action-sheets|action-sheet|Choose what to do with a field recording|Choose action
activity-rings|rings|Explore a fictional person's daily activity|Add activity
activity-views|share|Share a weekend itinerary|Copy itinerary
airplay|integration|Choose a playback destination for a lecture|Connect display
alerts|dialog|Confirm removal of an unsaved draft|Review removal
always-on|always-on|Keep a fictional timer glanceable|Dim display
app-clips|integration|Complete a small parking-meter task|Begin parking
app-icons|app-icon|Preview an original notebook app icon|Change variant
app-shortcuts|assistant|Run a fictional shortcut to capture a note|Capture note
apple-in-app-purchase|payment|Preview a subscription choice without making a purchase|Preview plan
apple-pay|payment|Review a fictional bakery order without charging|Preview checkout
apple-pencil-and-scribble|drawing|Sketch a trail with pointer or keyboard controls|Clear sketch
augmented-reality|spatial|Place a virtual chair in an illustrated room|Place chair
boxes|boxes|Group related export settings|Apply settings
branding|branding|Compare a recognizable original brand treatment|Switch accent
buttons|buttons|Save a field note with distinct action styles|Save note
camera-control|hardware|Explore camera adjustments without camera access|Change exposure
carekit|care|Record a fictional care-task check-in|Mark complete
carplay|car|Preview a simplified driving destination choice|Select destination
charting-data|chart|Inspect weekly reading time with labels|Change period
charts|chart|Compare labeled fictional energy totals|Show detail
collaboration-and-sharing|collaboration|Invite an example collaborator to a draft|Preview invitation
collections|collection|Browse a compact collection of field notes|Open note
color|palette|Compare semantic colors in a small dashboard|Change palette
color-wells|color-well|Choose an annotation color|Apply color
column-views|columns|Navigate a small project folder hierarchy|Open folder
combo-boxes|combo|Choose or enter a document category|Apply category
complications|complication|Preview a watch-sized departure countdown|Change value
context-menus|context-menu|Open contextual actions for a photograph|Show actions
controls|controls|Adjust a compact set of workspace preferences|Reset controls
dark-mode|appearance|Compare a reading card in light and dark|Switch appearance
design-principles|principles|Refine a focused note-taking task|Choose principle
designing-for-games|game|Move a token through a keyboard-friendly game|Move token
designing-for-ios|workshop|Explore six source-guided iOS tasks with navigation, editing, saved state and recovery|Choose an iOS study
designing-for-ipados|tablet-screen|Edit a note beside its collection|Choose collection
designing-for-iphone-duo|adaptive-screen|Compare compact and expanded reading layouts|Change layout
designing-for-macos|window|Work with a document window and command strip|Open inspector
designing-for-tvos|tv-screen|Choose a documentary with visible focus|Select film
designing-for-visionos|spatial|Explore a calm spatial planning board|Change depth
designing-for-watchos|watch-screen|Complete a glanceable timer task|Start timer
digit-entry-views|digit-entry|Enter a fictional six-digit pickup code|Verify code
digital-crown|hardware|Adjust a watch timer using a rotary-control model|Adjust minutes
disclosure-controls|disclosure|Reveal optional export details|Show details
dock-menus|menu|Choose a task from an example Dock menu|Show tasks
drag-and-drop|reorder|Reorder a packing list with drag or buttons|Move item
edit-menus|edit-menu|Apply an editing action to sample text|Show edit actions
entering-data|form|Add a reading goal with inline validation|Save goal
eyes|hardware|Explore a gaze-selection model using pointer focus|Select focused item
feedback|feedback|Complete a local save and read its result|Save changes
file-management|files|Rename and organize example documents|Create folder
focus-and-selection|focus|Move through a selectable film grid|Select item
game-center|integration|Preview a fictional leaderboard and invitation|Preview match
game-controls|game|Control a token using keys or onscreen arrows|Move token
gauges|gauge|Read and adjust a fictional storage gauge|Add file
generative-ai|assistant|Review a labeled example AI suggestion before applying it|Preview suggestion
gestures|gesture|Drag a card and release it to a snap point|Reset card
going-full-screen|fullscreen|Focus on a distraction-free reading panel|Toggle reading mode
gyro-and-accelerometer|hardware|Explore a tilt model with explicit controls|Tilt model
healthkit|health|Review fictional health-sharing permissions|Review permissions
home-screen-quick-actions|menu|Choose a capture task from quick actions|Show quick actions
homekit|home|Adjust a fictional room's lights locally|Toggle lights
icloud|sync|Preview local-to-cloud sync states with sample files|Simulate sync
icons|icons|Compare original icons with text labels|Change label mode
id-verifier|verification|Walk through an illustrative identity-check request|Review request
image-views|image|Inspect an original landscape illustration|Fit image
image-wells|image-well|Choose an original cover illustration|Choose cover
images|image|Compare fit and fill on an original landscape|Change fitting
imessage-apps-and-stickers|stickers|Choose an original sticker for a sample message|Add sticker
immersive-experiences|spatial|Compare a contained scene and a wider spatial stage|Change immersion
inclusion|inclusion|Choose inclusive sample profile preferences|Update profile
keyboards|keyboard|Use visible keyboard commands in a tiny editor|Try command
labels|labels|Compare informative and ambiguous control labels|Improve labels
launching|launch|Move from a simple launch state into a useful screen|Open workspace
layout|adaptive-screen|Resize an example document layout|Change width
lists-and-tables|table|Sort a fictional document table|Sort by name
live-activities|live|Follow and end a fictional delivery task|Advance delivery
live-photos|live-photo|Play a short original still-to-motion illustration|Play moment
live-viewing-apps|integration|Connect to a fictional live event with explicit status|Preview connection
loading|progress|Load a local sample collection with visible status|Load collection
lockups|lockups|Explore related image-title-description groups|Select feature
mac-catalyst|adaptive-screen|Compare one document task across compact and desktop layouts|Change context
machine-learning|assistant|Review a fictional image classification with uncertainty|Inspect prediction
managing-accounts|accounts|Choose a local demo profile or guest mode|Continue as guest
managing-notifications|notification-settings|Choose which sample notifications are relevant|Save preferences
maps|map|Explore a small illustrated route with labeled stops|Choose stop
materials|materials|Compare a functional translucent layer and a solid alternative|Toggle transparency
menus|menu|Choose an export format from a structured menu|Open menu
modality|dialog|Complete a focused task and return to its context|Open task
motion|motion|Compare purposeful transitions with a reduced-motion equivalent|Replay transition
multitasking|multitasking|Switch between two local document workspaces|Switch workspace
nearby-interactions|hardware|Explore a nearby-item distance model|Move closer
nfc|verification|Preview a tap-to-read task with explicit consent|Begin preview
notifications|notification|Inspect a contextual event notification|Show notification
offering-help|help|Find contextual guidance without leaving the task|Open help
onboarding|onboarding|Set up a small notebook in three optional steps|Continue
ornaments|ornament|Keep a tool palette associated with a spatial board|Choose tool
outline-views|outline|Expand and select a nested outline|Expand section
page-controls|pages|Move between three short introductory pages|Next page
panels|panel|Open a nonmodal inspector beside a document|Toggle inspector
path-controls|breadcrumbs|Navigate a labeled folder path|Go to folder
photo-editing|photo-editing|Adjust an original illustration without affecting a source file|Adjust warmth
pickers|picker|Choose a date and document category|Apply selection
playing-audio|audio|Play an optional locally generated tone with visible status|Play tone
playing-haptics|hardware|Compare a meaningful feedback event with a visual equivalent|Preview feedback
playing-video|video|Control an original animated scene and its captions|Play scene
pointing-devices|pointer|Explore hover, focus, and direct pointer feedback|Select target
pop-up-buttons|select|Choose one persistent export format|Apply format
popovers|popover|Open contextual details beside their source|Show details
printing|print|Review a printable document layout|Preview print
privacy|consent|Choose what to share for a fictional location task|Save privacy choices
progress-indicators|progress|Compare measurable and indeterminate loading|Start loading
pull-down-buttons|menu|Choose an action from a compact pull-down menu|Open actions
rating-indicators|rating|Set an editable rating with a readable value|Rate item
ratings-and-reviews|review|Write a local example review at a chosen moment|Preview review
remotes|remote|Navigate a film grid with a remote-control model|Move focus
researchkit|survey|Walk through a fictional research consent and survey|Review consent
right-to-left|rtl|Compare the same interface in both reading directions|Change direction
scroll-views|scroll|Read a bounded article with natural scrolling|Go to section
search-fields|search|Find an item in a local reading collection|Search titles
searching|search|Refine a local search and recover from no results|Search collection
segmented-controls|segments|Switch between two related views of a reading goal|Change view
settings|settings|Change local demo preferences with explicit values|Restore defaults
sf-symbols|icons|Preview original substitute icons and purposeful symbol motion|Change emphasis
shareplay|collaboration|Coordinate a fictional shared viewing session|Advance shared state
shazamkit|audio-match|Explore a simulated song-match result without microphone access|Preview match
sheets|sheet|Edit a note in a focused sheet with clear exit choices|Edit note
sidebars|sidebar|Navigate collections beside a selected document|Choose collection
sign-in-with-apple|accounts|Preview a sign-in choice without authentication|Review account choices
siri|assistant|Review a fictional voice-intent result with confirmation|Preview request
sliders|slider|Adjust narration volume with a visible value|Change volume
snippets|snippet|Review a concise example assistant result and its action|Inspect result
spatial-layout|spatial|Arrange a small spatial board with a stable reference frame|Change position
split-views|split|Inspect a document beside its selection list|Select document
status-bars|status-strip|Read a small app's connection and save states|Change status
steppers|stepper|Adjust a bounded number of reading sessions|Increase sessions
tab-bars|tabs|Move among stable app destinations|Open destination
tab-views|tabs|Switch between related document views|Change view
tap-to-pay-on-iphone|payment|Preview a merchant payment request without a transaction|Review amount
text-fields|form|Enter and validate a short document title|Save title
text-views|editor|Edit a longer note with a character count|Save note
the-menu-bar|menu-bar|Access a document command independently of its toolbar|Open File menu
toggles|toggle|Change an independent reading preference|Enable reminders
token-fields|tokens|Add and remove named collaborators as tokens|Add person
toolbars|toolbar|Act on the current document using a compact toolbar|Export document
top-shelf|tv-screen|Preview directly relevant featured film content|Open feature
typography|typography|Compare scalable text hierarchy in a reading card|Change type scale
undo-and-redo|undo|Edit a short title and recover earlier states|Undo edit
virtual-keyboards|virtual-keyboard|Enter a short query with onscreen keys|Enter query
voiceover|accessibility|Explore semantic labels and a readable result sequence|Show semantic outline
wallet|pass|Preview a fictional event pass without adding it to Wallet|Inspect pass
watch-faces|watch-screen|Preview a simple watch-style clock composition|Change composition
web-views|web-view|Read self-contained help content in a bounded frame|Open help page
widgets|widget|Choose a compact local information widget|Change size
windows|window|Open and restore a document window with clear commands|Open inspector
workouts|workout|Start, pause, and end a fictional walking session|Start workout
writing|writing|Replace vague UI messages with concrete example copy|Compare wording
'''

SIMULATED={'hardware','payment','integration','spatial','car','verification','health','care','home','sync','assistant','audio-match','pass','complication','watch-screen','rings','live','survey','accounts','always-on'}

def build(check=False):
    source=json.loads((ROOT/'skills/apple-hig/references/catalog.json').read_text(encoding='utf-8'))
    cases={}
    for line in CASES.strip().splitlines():
        slug,kind,scenario,action=line.split('|')
        if slug in cases:raise ValueError('Duplicate example '+slug)
        cases[slug]={'kind':kind,'scenario':scenario,'action':action}
    result=[]
    for page in source['pages']:
        slug=page['slug']
        if page['topic_children']:
            case={'kind':'topic-browser','scenario':'Explore the '+page['title'].lower()+' example collection','action':'Choose example'}
        else:
            if slug not in cases:raise ValueError('Topic needs an explicit example: '+slug)
            case=cases.pop(slug)
        card=(ROOT/'skills/apple-hig'/page['guidance_file']).read_text(encoding='utf-8').split('<!-- topic:'+slug+' -->',1)[1].split('<!-- topic:',1)[0].strip()
        guidance=card.split('\n\n')[1]
        anchors=page['evidence_sections'];anchor=next((a for a in anchors if a!='Overview'),None)
        result.append({'slug':slug,'title':page['title'],'category':page['category'],'platforms':page['supported_platforms'],
            **case,'guidance':guidance,'mode':'simulation' if case['kind'] in SIMULATED or slug=='shareplay' else 'web-adaptation',
            'source':page['url']+('#'+anchor if anchor else ''),'children':[s.split('/')[-1] for s in page['topic_children']]})
    if cases:raise ValueError('Unmatched examples: '+str(sorted(cases)))
    output={'version':'1.4.0','snapshot':source['snapshot_date'],'scope':'Original runnable web adaptations and explicitly labeled simulations; no native SDK or device conformance claim.','topics':result}
    destination=ROOT/'examples/gallery/catalog.json'
    files={destination:json.dumps(output,ensure_ascii=False,indent=2)+'\n'}
    index=['# All 173 topic examples', '', 'Every row links to a runnable browser task, its actual rendered preview, and the applicable Apple source. Collection topics open a topic browser. SDK and device examples are explicitly labeled simulations.', '', 'Run the gallery using [these instructions](README.md). Serve the gallery locally to run these HTML routes; all previews are included in the repository.', '']
    for category in ['getting-started','foundations','patterns','components','inputs','technologies']:
        index += ['## '+category.replace('-',' ').title(), '', '| Topic and runnable route | Concrete task | Scope | Picture | Apple source |', '| --- | --- | --- | --- | --- |']
        for t in result:
            if t['category']==category:
                index.append(f"| [{t['title']}](index.html?topic={t['slug']}) | {t['scenario']} | {t['mode']} | [Preview](previews/{t['slug']}.webp) | [Source]({t['source']}) |")
        index.append('')
    files[ROOT/'examples/gallery/TOPICS.md']='\n'.join(index)
    for path,content in files.items():
        if check:
            if not path.exists() or path.read_text(encoding='utf-8')!=content:raise ValueError('Generated gallery file is stale: '+str(path))
        else:
            path.parent.mkdir(parents=True,exist_ok=True)
            path.write_text(content,encoding='utf-8',newline='\n')
    print('Mapped '+str(len(result))+' topics to '+str(len({r['kind'] for r in result}))+' explicit example kinds.')

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check',action='store_true')
    build(parser.parse_args().check)
