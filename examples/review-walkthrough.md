# Worked reviews

These findings follow from the stated hypothetical observations. They are not claims about a real app that was inspected.

## A sheet with one exit

**Observed:** a task sheet exposes only Done. A person cannot abandon the edit through a visible alternative.

**Impact:** the exit implies that completing or saving is the only path.

**Source:** [Sheets → Best practices](https://developer.apple.com/design/human-interface-guidelines/sheets#Best-practices).

**Correction:** give Done the appropriate Cancel or Back alternative, preserving each action's meaning. Check completion, abandonment, and return behavior in the actual implementation.

![Original before-and-after review illustration, not an Apple screenshot](../docs/assets/review-example.png)

## A hidden Mac toolbar command

**Observed:** hiding a customizable toolbar removes the only entry point to Export.

**Impact:** the command becomes inaccessible through the interface.

**Source:** [Toolbars → macOS](https://developer.apple.com/design/human-interface-guidelines/toolbars#macOS).

**Correction:** provide the toolbar command in the menu bar too. Test the command with the toolbar visible, hidden, and customized. Do not transfer this macOS rule to a platform without a menu bar.

## A web adaptation

The [runnable demo](web-adaptation/README.md) uses named native HTML controls, a real dialog, focus styling, status feedback, and responsive CSS. These are original implementation choices for the web. The [Writing](https://developer.apple.com/design/human-interface-guidelines/writing), [Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback), and [Modality](https://developer.apple.com/design/human-interface-guidelines/modality) topics provide relevant design context; web accessibility behavior must be checked in the browser.

The example does not establish native Apple component behavior, exact HIG geometry, or full accessibility conformance. A screenshot alone cannot verify keyboard, screen-reader, or recovery behavior.
