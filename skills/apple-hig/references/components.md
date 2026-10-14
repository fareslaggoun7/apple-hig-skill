# Components

English HIG snapshot: 2026-10-14. Read applicable cards; verify exact measurements and changing behavior in the linked official sections. Cards condense guidance and are not exhaustive transcriptions.

<!-- topic:action-sheets -->
<a id="action-sheets"></a>
## Action sheets
Source: [Action sheets](https://developer.apple.com/design/human-interface-guidelines/action-sheets).
Platforms in page metadata: ios, ipados, macos, tvos, watchos.

Offer an action sheet for clarifying choices after someone deliberately starts an action, and keep these interruptions infrequent. Keep titles brief, add explanatory messages only when necessary, and visibly distinguish destructive options. Provide cancellation when needed. On iPhone and iPad, avoid scrolling choices; on Apple Watch, aim for no more than three choices plus Cancel.

Scope / uncertainty: The platform section excludes visionOS despite broader introductory SwiftUI wording.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/action-sheets#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/action-sheets#iOS-iPadOS), [watchOS](https://developer.apple.com/design/human-interface-guidelines/action-sheets#watchOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/action-sheets#Platform-considerations).

<!-- topic:activity-rings -->
<a id="activity-rings"></a>
## Activity rings
Source: [Activity rings](https://developer.apple.com/design/human-interface-guidelines/activity-rings).
Platforms in page metadata: ios, ipados, watchos.

Include Activity rings only when personal activity progress fits the app’s purpose. Preserve their Move, Exercise, and Stand meanings and represent one individual. Retain ring colors and opacity, display them against black, and preserve outer margins. Adapt the surrounding interface to the rings rather than restyling or repurposing these progress graphics.

Scope / uncertainty: The page excludes macOS, tvOS, and visionOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/activity-rings), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/activity-rings#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/activity-rings#Platform-considerations).

<!-- topic:activity-views -->
<a id="activity-views"></a>
## Activity views
Source: [Activity views](https://developer.apple.com/design/human-interface-guidelines/activity-views).
Platforms in page metadata: ios, ipados, visionos.

Use the activity view to expose sharing and other tasks relevant to the current content. Add custom activities when they offer something beyond the common actions already present. Give each custom action a concise, informative name and consider a recognizable symbol. Extensions can make custom sharing or actions available from other apps.

Scope / uncertainty: This page covers iOS, iPadOS, and visionOS; it excludes macOS, tvOS, and watchOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/activity-views), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/activity-views#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/activity-views#Platform-considerations).

<!-- topic:alerts -->
<a id="alerts"></a>
## Alerts
Source: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Reserve alerts for immediately important information, problems, or consequential decisions. Avoid routine informational announcements, startup interruptions, and confirmations for ordinary actions that people can undo. On iPhone and iPad, use an action sheet when an intentional action needs additional choices. Respect each platform’s alert presentation rather than assuming one shared visual treatment.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/alerts), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/alerts#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/alerts#iOS-iPadOS), [Anatomy](https://developer.apple.com/design/human-interface-guidelines/alerts#Anatomy).

<!-- topic:app-shortcuts -->
<a id="app-shortcuts"></a>
## App Shortcuts
Source: [App Shortcuts](https://developer.apple.com/design/human-interface-guidelines/app-shortcuts).
Platforms in page metadata: ios, ipados, visionos, watchos.

Expose frequent, valuable tasks through App Shortcuts, especially distinctive functionality that app schemas do not already cover. Allow useful parameter choices and clarify incomplete requests. Choose snippets for brief information or confirmation and Live Activities for changing information relevant over time. Make spoken responses sufficiently informative when no screen is available.

Scope / uncertainty: The page excludes macOS and tvOS; distinguish App Shortcuts from broader App Intents support.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/app-shortcuts#Best-practices), [Responding-to-App-Shortcuts](https://developer.apple.com/design/human-interface-guidelines/app-shortcuts#Responding-to-App-Shortcuts), [macOS](https://developer.apple.com/design/human-interface-guidelines/app-shortcuts#macOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/app-shortcuts#Platform-considerations).

<!-- topic:boxes -->
<a id="boxes"></a>
## Boxes
Source: [Boxes](https://developer.apple.com/design/human-interface-guidelines/boxes).
Platforms in page metadata: ios, ipados, macos, visionos.

Use a box to make a logically related group distinct within a larger view. Prefer a modest footprint and use spacing and alignment to express subgroups rather than relying on extra containers. Add a short descriptive title only when it clarifies the contents, and account for platform differences in background treatment and title placement.

Scope / uncertainty: The page excludes tvOS and watchOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/boxes), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/boxes#Best-practices), [Content](https://developer.apple.com/design/human-interface-guidelines/boxes#Content), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/boxes#Platform-considerations).

<!-- topic:buttons -->
<a id="buttons"></a>
## Buttons
Source: [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use buttons for immediate actions and make their purpose recognizable through clear text or familiar imagery. Prefer system styles for built-in states and adaptation; give custom buttons a pressed appearance. Emphasize the likely action through visual style rather than a larger size. Assign roles deliberately: this page advises against giving destructive buttons the primary role. Keep labels distinguishable from the content behind them.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/buttons#Best-practices), [Content](https://developer.apple.com/design/human-interface-guidelines/buttons#Content), [Style](https://developer.apple.com/design/human-interface-guidelines/buttons#Style), [Role](https://developer.apple.com/design/human-interface-guidelines/buttons#Role).

<!-- topic:charts -->
<a id="charts"></a>
## Charts
Source: [Charts](https://developer.apple.com/design/human-interface-guidelines/charts).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Choose chart marks according to the question the data should answer, such as comparing categories or revealing change over time. Establish a clear visual hierarchy and keep essential insights visible without requiring interaction. Supplement color with other distinctions. Give important or interactive chart elements meaningful accessibility labels and consider Audio Graphs for VoiceOver users.

Evidence sections: [Marks](https://developer.apple.com/design/human-interface-guidelines/charts#Marks), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/charts#Best-practices), [Color](https://developer.apple.com/design/human-interface-guidelines/charts#Color), [Enhancing-the-accessibility-of-a-chart](https://developer.apple.com/design/human-interface-guidelines/charts#Enhancing-the-accessibility-of-a-chart).

<!-- topic:collections -->
<a id="collections"></a>
## Collections
Source: [Collections](https://developer.apple.com/design/human-interface-guidelines/collections).
Platforms in page metadata: ios, ipados, macos, tvos, visionos.

Favor collections for ordered, visually rich content and consider a list or table for predominantly textual items. Start with familiar row or grid arrangements and make selecting an item straightforward. Add custom interactions only when needed and consider animation to explain insertion, deletion, or reordering. Treat dynamic layout changes cautiously on iPhone and iPad.

Scope / uncertainty: The page excludes watchOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/collections), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/collections#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/collections#iOS-iPadOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/collections#Platform-considerations).

<!-- topic:color-wells -->
<a id="color-wells"></a>
## Color wells
Source: [Color wells](https://developer.apple.com/design/human-interface-guidelines/color-wells).
Platforms in page metadata: ios, ipados, macos, visionos.

Use a color well when people need to adjust the color of an onscreen element, and consider the system picker to provide familiar selection behavior. On Mac, preserve the active well’s highlighted feedback and the expected ability to drag colors among wells and from the picker, rather than treating the component as a static swatch.

Scope / uncertainty: The page excludes tvOS and watchOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/color-wells), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/color-wells#Best-practices), [macOS](https://developer.apple.com/design/human-interface-guidelines/color-wells#macOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/color-wells#Platform-considerations).

<!-- topic:column-views -->
<a id="column-views"></a>
## Column views
Source: [Column views](https://developer.apple.com/design/human-interface-guidelines/column-views).
Platforms in page metadata: macos.

Consider a column view for a deep hierarchy that people traverse repeatedly when table sorting is unnecessary. Begin with the hierarchy’s root, let people adjust column widths, and consider showing details when the selected item has no children. For hierarchical content on iPad or Vision Pro, consider a split view instead.

Scope / uncertainty: The column-view component described here is limited to macOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/column-views), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/column-views#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/column-views#Platform-considerations).

<!-- topic:combo-boxes -->
<a id="combo-boxes"></a>
## Combo boxes
Source: [Combo boxes](https://developer.apple.com/design/human-interface-guidelines/combo-boxes).
Platforms in page metadata: macos.

Use a combo box to combine editable text entry with a list of suggested choices. Start from a meaningful listed value, explain the expected kind of input with an introductory label, and keep suggestions relevant. Ensure the text field is wide enough for the listed items so choices remain understandable when selected.

Scope / uncertainty: The page describes a macOS component and excludes the other listed Apple platforms.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/combo-boxes), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/combo-boxes#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/combo-boxes#Platform-considerations).

<!-- topic:complications -->
<a id="complications"></a>
## Complications
Source: [Complications](https://developer.apple.com/design/human-interface-guidelines/complications).
Platforms in page metadata: watchos.

Choose essential, changing information that people benefit from seeing on their watch face. When possible, support every complication family and consider multiple useful variants. Give different complications distinct destinations in the app. Plan updates around usefulness and privacy, and select visual forms such as rings or gauges according to the data’s meaning.

Scope / uncertainty: Complications in this page are a watchOS experience.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/complications#Best-practices), [Visual-design](https://developer.apple.com/design/human-interface-guidelines/complications#Visual-design), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/complications#Platform-considerations).

<!-- topic:components -->
<a id="components"></a>
## Components
Source: [Components](https://developer.apple.com/design/human-interface-guidelines/components).
Platforms in page metadata: not specified.

This collection organizes system component guidance by content, organization, actions, navigation, presentation, input, status, and system experiences, emphasizing familiarity and consistency.

Scope / uncertainty: The collection supplies an introduction and topic navigation rather than detailed component rules.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/components).

<!-- topic:content -->
<a id="content"></a>
## Content
Source: [Content](https://developer.apple.com/design/human-interface-guidelines/content).
Platforms in page metadata: not specified.

This collection links to guidance for presenting charts, images, styled text, and embedded web content; consult the individual pages for component decisions.

Scope / uncertainty: Navigation-only collection; it contains no substantive body guidance.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/content).

<!-- topic:context-menus -->
<a id="context-menus"></a>
## Context menus
Source: [Context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus).
Platforms in page metadata: ios, ipados, macos, tvos, visionos.

Keep context menus short and directly relevant to the selected item, while also exposing their commands through the main interface. Support them consistently, hide unavailable entries, and limit submenu depth. On iPhone and iPad, choose either an edit menu or a context menu for an item. Consider context menus for frequent functionality in visionOS.

Scope / uncertainty: The page excludes watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/context-menus#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/context-menus#iOS-iPadOS), [visionOS](https://developer.apple.com/design/human-interface-guidelines/context-menus#visionOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/context-menus#Platform-considerations).

<!-- topic:controls -->
<a id="controls"></a>
## Controls
Source: [Controls](https://developer.apple.com/design/human-interface-guidelines/controls).
Platforms in page metadata: ios, ipados, macos.

Offer system quick-access controls for valuable actions people can perform without opening the app. Use a descriptive symbol, meaningful title and state, update after relevant events, and animate symbols to communicate changes. For a locked-device camera experience, maintain familiar camera UI; tasks beyond capture require authentication and unlocking.

Scope / uncertainty: Here Controls refers to system quick access; the page excludes watchOS, tvOS, and visionOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/controls#Best-practices), [Anatomy](https://developer.apple.com/design/human-interface-guidelines/controls#Anatomy), [Camera-experiences-on-a-locked-device](https://developer.apple.com/design/human-interface-guidelines/controls#Camera-experiences-on-a-locked-device), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/controls#Platform-considerations).

<!-- topic:digit-entry-views -->
<a id="digit-entry-views"></a>
## Digit entry views
Source: [Digit entry views](https://developer.apple.com/design/human-interface-guidelines/digit-entry-views).
Platforms in page metadata: tvos.

Use a digit entry view for a full-screen request for a sequence of numbers, such as a PIN, with its dedicated numeric keyboard. Explain the request through a clear title and prompt. Whenever the numbers are sensitive, use secure fields so the display masks the entered digits.

Scope / uncertainty: The page describes the tvOS component and excludes the other listed platforms.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/digit-entry-views), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/digit-entry-views#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/digit-entry-views#Platform-considerations).

<!-- topic:disclosure-controls -->
<a id="disclosure-controls"></a>
## Disclosure controls
Source: [Disclosure controls](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls).
Platforms in page metadata: ios, ipados, macos, visionos.

Hide secondary details behind disclosure controls until they become relevant. Distinguish a triangle that expands a view or list from a disclosure button associated with a particular control; their indicator directions differ. Give triangles descriptive labels so people can understand the information they will reveal.

Scope / uncertainty: The platform section excludes tvOS and watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls#Best-practices), [Disclosure-triangles](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls#Disclosure-triangles), [Disclosure-buttons](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls#Disclosure-buttons), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls#Platform-considerations).

<!-- topic:dock-menus -->
<a id="dock-menus"></a>
## Dock menus
Source: [Dock menus](https://developer.apple.com/design/human-interface-guidelines/dock-menus).
Platforms in page metadata: macos.

Use custom Dock menu entries to make especially valuable app tasks accessible from the app’s Dock icon. Label them briefly and arrange them logically alongside system entries. Also provide those commands elsewhere in the app, so people can discover and perform the tasks without knowing about secondary clicking the Dock icon.

Scope / uncertainty: Dock menus described here are a macOS feature.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/dock-menus), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/dock-menus#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/dock-menus#Platform-considerations).

<!-- topic:edit-menus -->
<a id="edit-menus"></a>
## Edit menus
Source: [Edit menus](https://developer.apple.com/design/human-interface-guidelines/edit-menus).
Platforms in page metadata: ios, ipados, macos, visionos.

Prefer the system edit menu and familiar selection gestures. Offer commands that apply to the current content, removing or disabling irrelevant ones, and place custom commands near related standard actions. When useful, allow copying text even if it is not editable. Support undo and redo where possible and avoid redundant editing controls.

Scope / uncertainty: The page excludes tvOS and watchOS; macOS menu-bar ordering has separate guidance.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/edit-menus#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/edit-menus#Platform-considerations).

<!-- topic:gauges -->
<a id="gauges"></a>
## Gauges
Source: [Gauges](https://developer.apple.com/design/human-interface-guidelines/gauges).
Platforms in page metadata: ios, ipados, macos, visionos, watchos.

Use a gauge to position a numerical value within a meaningful range. Label the present value and range endpoints concisely so people can interpret the display. Consider a gradient when it helps explain what the scale represents. On macOS, also evaluate the platform’s level indicator for values within a range.

Scope / uncertainty: The page excludes tvOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/gauges), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/gauges#Best-practices), [macOS](https://developer.apple.com/design/human-interface-guidelines/gauges#macOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/gauges#Platform-considerations).

<!-- topic:home-screen-quick-actions -->
<a id="home-screen-quick-actions"></a>
## Home Screen quick actions
Source: [Home Screen quick actions](https://developer.apple.com/design/human-interface-guidelines/home-screen-quick-actions).
Platforms in page metadata: ios, ipados.

Choose compelling, high-value tasks for Home Screen quick actions and keep changes predictable. Give each action a brief title that explains its outcome and a familiar interface icon. Use the supplied design template for custom icons, and use a symbol or designed icon rather than substituting an emoji.

Scope / uncertainty: This page covers iOS and iPadOS and excludes the other listed platforms.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/home-screen-quick-actions#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/home-screen-quick-actions#Platform-considerations).

<!-- topic:image-views -->
<a id="image-views"></a>
## Image views
Source: [Image views](https://developer.apple.com/design/human-interface-guidelines/image-views).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Choose an image view when the view’s main job is displaying imagery; consider a symbol or interface icon for interface commands. Protect the readability of any overlaid text and keep animated frames consistently sized. On Mac, use an image well for editable imagery. Account for visionOS support for spatial imagery.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/image-views#Best-practices), [Content](https://developer.apple.com/design/human-interface-guidelines/image-views#Content), [macOS](https://developer.apple.com/design/human-interface-guidelines/image-views#macOS), [visionOS](https://developer.apple.com/design/human-interface-guidelines/image-views#visionOS).

<!-- topic:image-wells -->
<a id="image-wells"></a>
## Image wells
Source: [Image wells](https://developer.apple.com/design/human-interface-guidelines/image-wells).
Platforms in page metadata: macos.

Choose an image well when people need to replace or manipulate an image rather than merely view it. Support dropping a replacement image without requiring prior selection. If an image is mandatory, restore a default after deletion. When copy and paste are supported, expose the usual menu commands and keyboard interactions.

Scope / uncertainty: The component described here is limited to macOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/image-wells), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/image-wells#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/image-wells#Platform-considerations).

<!-- topic:labels -->
<a id="labels"></a>
## Labels
Source: [Labels](https://developer.apple.com/design/human-interface-guidelines/labels).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use a label for a small amount of text that people read rather than edit. Prefer system typography and semantic label colors to communicate the information’s relative importance. Allow selection when copying the text would be useful. Avoid treating a static label as the appropriate component for editable or extensive content.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/labels), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/labels#Best-practices).

<!-- topic:layout-and-organization -->
<a id="layout-and-organization"></a>
## Layout and organization
Source: [Layout and organization](https://developer.apple.com/design/human-interface-guidelines/layout-and-organization).
Platforms in page metadata: not specified.

This collection groups components for arranging content and hierarchy, including lists, collections, split views, outlines, columns, tabs, labels, boxes, and disclosure controls.

Scope / uncertainty: Navigation-only collection; substantive recommendations live in its linked component pages.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/layout-and-organization).

<!-- topic:lists-and-tables -->
<a id="lists-and-tables"></a>
## Lists and tables
Source: [Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Favor lists or tables for textual data. Keep rows concise, preserve readability when text is long, and give multicolumn tables descriptive headings. Show appropriate selection feedback and allow editing when useful. Sorting by column can help on Mac, while limiting the number of rows generally suits Apple Watch.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables#Best-practices), [Content](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables#Content), [macOS](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables#macOS), [watchOS](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables#watchOS).

<!-- topic:live-activities -->
<a id="live-activities"></a>
## Live Activities
Source: [Live Activities](https://developer.apple.com/design/human-interface-guidelines/live-activities).
Platforms in page metadata: ios, ipados, macos, watchos.

Use Live Activities for bounded tasks or events whose progress matters at a glance. Exclude promotions and protect sensitive information with innocuous summaries, redaction, and documented person-controlled choices. Keep interactions simple and deep-link to related content. Adapt compact and minimal layouts for limited-width Dynamic Island contexts on iPhone using abbreviations or graphics, with a leading-only view when appropriate. Use container-relative corner geometry rather than hard-coded radii. Start at expected moments, offer controls to stop, and update when information changes. End immediately when the task ends; subsequent dismissal timing can differ by presentation.

Scope / uncertainty: The page excludes tvOS and visionOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/live-activities#Best-practices), [Creating-Live-Activity-layouts](https://developer.apple.com/design/human-interface-guidelines/live-activities#Creating-Live-Activity-layouts), [Offering-interactivity](https://developer.apple.com/design/human-interface-guidelines/live-activities#Offering-interactivity), [Starting-updating-and-ending-a-Live-Activity](https://developer.apple.com/design/human-interface-guidelines/live-activities#Starting-updating-and-ending-a-Live-Activity), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/live-activities#Platform-considerations).

<!-- topic:lockups -->
<a id="lockups"></a>
## Lockups
Source: [Lockups](https://developer.apple.com/design/human-interface-guidelines/lockups).
Platforms in page metadata: tvos.

Use a lockup to combine related views into one selectable unit on Apple TV. Keep units consistently sized within a group or row and allow space for their expansion when focused. The header, content, and footer expand together. Choose among cards, caption buttons, monograms, and posters according to the app’s needs.

Scope / uncertainty: Lockups described here are a tvOS component.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/lockups), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/lockups#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/lockups#Platform-considerations).

<!-- topic:menus -->
<a id="menus"></a>
## Menus
Source: [Menus](https://developer.apple.com/design/human-interface-guidelines/menus).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use menus for commands that can remain concealed until people request them. Write concise, descriptive labels with platform-consistent capitalization; indicate when a command cannot be used. Add an ellipsis when completing an action requires further input. Choose menu layouts appropriate to the platform instead of assuming all icon-only or size arrangements are universally available.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/menus), [Labels](https://developer.apple.com/design/human-interface-guidelines/menus#Labels), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/menus#iOS-iPadOS), [visionOS](https://developer.apple.com/design/human-interface-guidelines/menus#visionOS).

<!-- topic:menus-and-actions -->
<a id="menus-and-actions"></a>
## Menus and actions
Source: [Menus and actions](https://developer.apple.com/design/human-interface-guidelines/menus-and-actions).
Platforms in page metadata: not specified.

This collection connects guidance for buttons, menus, sharing, toolbars, ornaments, and system action entry points; individual pages define their distinct purposes and interactions.

Scope / uncertainty: Navigation-only collection; no standalone design rules appear in its body.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/menus-and-actions).

<!-- topic:navigation-and-search -->
<a id="navigation-and-search"></a>
## Navigation and search
Source: [Navigation and search](https://developer.apple.com/design/human-interface-guidelines/navigation-and-search).
Platforms in page metadata: not specified.

This collection links to sidebars, tab bars, search fields, path controls, and token fields for navigating app content and entering structured search information.

Scope / uncertainty: Navigation-only collection; consult its linked pages for supported platforms and design choices.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/navigation-and-search).

<!-- topic:notifications -->
<a id="notifications"></a>
## Notifications
Source: [Notifications](https://developer.apple.com/design/human-interface-guidelines/notifications).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Send brief, useful notifications for timely information that people can grasp quickly. Avoid repeated notices for an unchanged event and avoid sensitive content. Handle delivery thoughtfully while the app is open. Use alerts for errors rather than notifications. On Apple Watch, account for the different information needs of short-look and long-look presentations.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/notifications#Best-practices), [watchOS](https://developer.apple.com/design/human-interface-guidelines/notifications#watchOS).

<!-- topic:ornaments -->
<a id="ornaments"></a>
## Ornaments
Source: [Ornaments](https://developer.apple.com/design/human-interface-guidelines/ornaments).
Platforms in page metadata: visionos.

Consider an ornament for frequently needed controls or information associated with a visionOS window. Generally keep it visible and avoid covering the window’s content. Balance multiple ornaments and aim for a width no greater than the associated window. Prefer system toolbars and tab bars unless customization is needed, and consider borderless buttons.

Scope / uncertainty: Ornaments described here are specific to visionOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/ornaments), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/ornaments#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/ornaments#Platform-considerations).

<!-- topic:outline-views -->
<a id="outline-views"></a>
## Outline views
Source: [Outline views](https://developer.apple.com/design/human-interface-guidelines/outline-views).
Platforms in page metadata: macos.

Use an outline view for hierarchical, usually textual data, and a table for data without hierarchy. Show the hierarchy only in the first column, supply informative headings, and allow resizing. Consider sorting through column headings. Make expanding and collapsing nested content straightforward, often alongside related content in a split view.

Scope / uncertainty: The outline-view component described here is limited to macOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/outline-views), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/outline-views#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/outline-views#Platform-considerations).

<!-- topic:page-controls -->
<a id="page-controls"></a>
## Page controls
Source: [Page controls](https://developer.apple.com/design/human-interface-guidelines/page-controls).
Platforms in page metadata: ios, ipados, tvos, visionos, watchos.

Use page indicators for movement through an ordered, flat sequence, avoiding an excessive number of pages. Place the control centrally near the view’s bottom where appropriate to the platform. On Apple TV, apply it to full-screen page collections. In visionOS, the indicators communicate position but do not provide interactive navigation.

Scope / uncertainty: The page excludes macOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/page-controls#Best-practices), [tvOS](https://developer.apple.com/design/human-interface-guidelines/page-controls#tvOS), [visionOS](https://developer.apple.com/design/human-interface-guidelines/page-controls#visionOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/page-controls#Platform-considerations).

<!-- topic:panels -->
<a id="panels"></a>
## Panels
Source: [Panels](https://developer.apple.com/design/human-interface-guidelines/panels).
Platforms in page metadata: macos.

Use a floating panel to keep supplementary controls or information readily available for the active window or selection. Consider it for inspectors and prefer straightforward adjustment controls with a brief purpose-specific title. Show and hide panels appropriately, keep them out of the Window menu’s document list, and generally omit minimization.

Scope / uncertainty: Panels described here are a macOS component.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/panels), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/panels#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/panels#Platform-considerations).

<!-- topic:path-controls -->
<a id="path-controls"></a>
## Path controls
Source: [Path controls](https://developer.apple.com/design/human-interface-guidelines/path-controls).
Platforms in page metadata: macos.

Use a path control to show the selected file or folder’s place in the file system. Choose a linear path or a compact pop-up presentation according to the desired display. Put it within the window’s content area; the page explicitly excludes placement in toolbars, the window frame, and status bars.

Scope / uncertainty: The component described here is limited to macOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/path-controls), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/path-controls#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/path-controls#Platform-considerations).

<!-- topic:pickers -->
<a id="pickers"></a>
## Pickers
Source: [Pickers](https://developer.apple.com/design/human-interface-guidelines/pickers).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Consider a picker for a medium or long set of distinct choices. Arrange values predictably and avoid making people leave the current view just to select one. Use date and time picker styles suited to the platform and task; reduce minute precision when appropriate. On Apple Watch, design for precise selection with the Digital Crown.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/pickers#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/pickers#iOS-iPadOS), [macOS](https://developer.apple.com/design/human-interface-guidelines/pickers#macOS), [watchOS](https://developer.apple.com/design/human-interface-guidelines/pickers#watchOS).

<!-- topic:pop-up-buttons -->
<a id="pop-up-buttons"></a>
## Pop-up buttons
Source: [Pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons).
Platforms in page metadata: ios, ipados, macos, visionos.

Use a pop-up button for a flat set of mutually exclusive options, especially when space is limited. Supply a useful default and enough context to predict the choices before opening the menu. For commands, multiple selection, or submenus, choose a pull-down button instead. Consider a Custom option when occasional choices would otherwise clutter the interface.

Scope / uncertainty: The page excludes tvOS and watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons#Platform-considerations).

<!-- topic:popovers -->
<a id="popovers"></a>
## Popovers
Source: [Popovers](https://developer.apple.com/design/human-interface-guidelines/popovers).
Platforms in page metadata: ios, ipados, macos, visionos.

Use a popover for a small, temporary amount of contextual information or functionality. Position it appropriately, present only one at once, and avoid layering another view above it. Preserve work when a nonmodal popover closes automatically. Avoid popovers in compact iPhone or iPad views; a Mac popover may become a detachable panel.

Scope / uncertainty: The page excludes tvOS and watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/popovers#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/popovers#iOS-iPadOS), [macOS](https://developer.apple.com/design/human-interface-guidelines/popovers#macOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/popovers#Platform-considerations).

<!-- topic:presentation -->
<a id="presentation"></a>
## Presentation
Source: [Presentation](https://developer.apple.com/design/human-interface-guidelines/presentation).
Platforms in page metadata: not specified.

This collection groups guidance for temporary presentations, windows, scrolling, and pagination, including sheets, alerts, action sheets, panels, popovers, page controls, and scroll views.

Scope / uncertainty: Navigation-only collection; presentation behavior and platform scope require its linked pages.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/presentation).

<!-- topic:progress-indicators -->
<a id="progress-indicators"></a>
## Progress indicators
Source: [Progress indicators](https://developer.apple.com/design/human-interface-guidelines/progress-indicators).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Prefer measurable progress when the operation permits an accurate estimate, and keep indicators moving during ongoing work. On Mac, an indeterminate bar can become determinate when enough information is available; avoid changing from circular to bar form. Keep placement stable and add a short description when helpful. Remove the indicator when the operation finishes.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/progress-indicators), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/progress-indicators#Best-practices), [macOS](https://developer.apple.com/design/human-interface-guidelines/progress-indicators#macOS).

<!-- topic:pull-down-buttons -->
<a id="pull-down-buttons"></a>
## Pull-down buttons
Source: [Pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons).
Platforms in page metadata: ios, ipados, macos, visionos.

Group commands or items directly related to a button’s action in its pull-down menu, such as variants of adding or sorting. Keep the menu manageable and avoid concentrating every action in the view behind one button. For mutually exclusive choices that are not commands, choose a pop-up button instead.

Scope / uncertainty: The page excludes tvOS and watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons#Platform-considerations).

<!-- topic:rating-indicators -->
<a id="rating-indicators"></a>
## Rating indicators
Source: [Rating indicators](https://developer.apple.com/design/human-interface-guidelines/rating-indicators).
Platforms in page metadata: macos.

Use a rating indicator to express rank with repeated symbols, normally stars. The described component rounds to whole symbols rather than showing fractional ones. Let people adjust an individual item’s rating directly within a list, and replace stars only when the alternative symbol still communicates a rating scale clearly.

Scope / uncertainty: The rating-indicator component described here is limited to macOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/rating-indicators), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/rating-indicators#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/rating-indicators#Platform-considerations).

<!-- topic:scroll-views -->
<a id="scroll-views"></a>
## Scroll views
Source: [Scroll views](https://developer.apple.com/design/human-interface-guidelines/scroll-views).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Support familiar scrolling gestures and keyboard commands, and make additional content discoverable. Avoid nesting scroll views that move along the same axis. Consider paging when it fits the content, and automatically reveal a selected or edited location when needed. Prefer vertical movement on Apple Watch and respect platform-specific scroll indicator behavior.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/scroll-views#Best-practices), [watchOS](https://developer.apple.com/design/human-interface-guidelines/scroll-views#watchOS), [visionOS](https://developer.apple.com/design/human-interface-guidelines/scroll-views#visionOS), [tvOS](https://developer.apple.com/design/human-interface-guidelines/scroll-views#tvOS).

<!-- topic:search-fields -->
<a id="search-fields"></a>
## Search fields
Source: [Search fields](https://developer.apple.com/design/human-interface-guidelines/search-fields).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Explain the searchable scope through a useful placeholder. When feasible, begin searching as people type, suggest likely queries, and simplify the resulting display. Consider filters for narrowing matches. Choose the entry point and input presentation for the platform; Apple Watch presents text input full-screen, and Apple TV combines a keyboard with results below it.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/search-fields#Best-practices), [iOS](https://developer.apple.com/design/human-interface-guidelines/search-fields#iOS), [tvOS](https://developer.apple.com/design/human-interface-guidelines/search-fields#tvOS), [watchOS](https://developer.apple.com/design/human-interface-guidelines/search-fields#watchOS).

<!-- topic:segmented-controls -->
<a id="segmented-controls"></a>
## Segmented controls
Source: [Segmented controls](https://developer.apple.com/design/human-interface-guidelines/segmented-controls).
Platforms in page metadata: ios, ipados, macos, tvos, visionos.

Use a segmented control for a few closely related choices that affect a view, state, or object and benefit from visible selection. Keep segment types, content format, and sizing consistent; generally choose either text or imagery throughout. On Apple TV, consider a split view when filtering content rather than assuming segments are the best fit.

Scope / uncertainty: The page excludes watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/segmented-controls#Best-practices), [Content](https://developer.apple.com/design/human-interface-guidelines/segmented-controls#Content), [tvOS](https://developer.apple.com/design/human-interface-guidelines/segmented-controls#tvOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/segmented-controls#Platform-considerations).

<!-- topic:selection-and-input -->
<a id="selection-and-input"></a>
## Selection and input
Source: [Selection and input](https://developer.apple.com/design/human-interface-guidelines/selection-and-input).
Platforms in page metadata: not specified.

This collection links to components for choosing values, entering text or digits, editing images and colors, adjusting ranges, and managing opposing states.

Scope / uncertainty: Navigation-only collection; select a component using the substantive guidance in its linked page.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/selection-and-input).

<!-- topic:sheets -->
<a id="sheets"></a>
## Sheets
Source: [Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Choose a sheet for a limited task tied to the current context, considering alternatives for long or complicated flows. Show only one from the main interface at a time. Use a nonmodal view for supplementary controls affecting the parent task. Always pair Done with Cancel or Back, and avoid showing all three together. Follow each platform’s sheet conventions.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/sheets), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/sheets#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/sheets#iOS-iPadOS), [watchOS](https://developer.apple.com/design/human-interface-guidelines/sheets#watchOS).

<!-- topic:sidebars -->
<a id="sidebars"></a>
## Sidebars
Source: [Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars).
Platforms in page metadata: ios, ipados, macos, tvos, visionos.

Use a leading sidebar for app areas or major content collections. Keep hierarchy shallow, generally within two levels, and use clear group labels and disclosure where needed. Consider familiar symbols, customization, and the ability to hide the sidebar. On visionOS, a sidebar within a tab can help with deeper content organization.

Scope / uncertainty: The page excludes watchOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/sidebars), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/sidebars#Best-practices), [visionOS](https://developer.apple.com/design/human-interface-guidelines/sidebars#visionOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/sidebars#Platform-considerations).

<!-- topic:sliders -->
<a id="sliders"></a>
## Sliders
Source: [Sliders](https://developer.apple.com/design/human-interface-guidelines/sliders).
Platforms in page metadata: ios, ipados, macos, visionos, watchos.

Use sliders for adjusting values within a range and preserve expected directions from minimum to maximum. Consider an accompanying text field and stepper when exact entry matters. Prefer horizontal sliders in visionOS. For audio volume on iPhone and iPad, use the dedicated volume view rather than repurposing an ordinary slider.

Scope / uncertainty: The page excludes tvOS and describes different slider interactions on watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/sliders#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/sliders#iOS-iPadOS), [visionOS](https://developer.apple.com/design/human-interface-guidelines/sliders#visionOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/sliders#Platform-considerations).

<!-- topic:snippets -->
<a id="snippets"></a>
## Snippets
Source: [Snippets](https://developer.apple.com/design/human-interface-guidelines/snippets).
Platforms in page metadata: ios, ipados, macos.

Use snippets for compact task results and optional confirmations from Siri, Spotlight, or Shortcuts. Keep custom content brief and legible across appearances and text sizes; deep-link to the app for longer details. Label confirmation actions specifically. Make the custom view communicate its purpose while retaining meaningful spoken dialogue for interactions without a visible screen.

Scope / uncertainty: The page excludes tvOS, visionOS, and watchOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/snippets), [Anatomy](https://developer.apple.com/design/human-interface-guidelines/snippets#Anatomy), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/snippets#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/snippets#Platform-considerations).

<!-- topic:split-views -->
<a id="split-views"></a>
## Split views
Source: [Split views](https://developer.apple.com/design/human-interface-guidelines/split-views).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use adjacent panes to connect navigation and related content, preserving selection highlights along the path to the detail view. Consider drag and drop between panes. Prefer a regular-width environment on iPhone; pane arrangements vary elsewhere. In visionOS, favor a split view for supplementary information, while watchOS displays its list or detail one full-screen view at a time.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/split-views#Best-practices), [iOS](https://developer.apple.com/design/human-interface-guidelines/split-views#iOS), [visionOS](https://developer.apple.com/design/human-interface-guidelines/split-views#visionOS), [watchOS](https://developer.apple.com/design/human-interface-guidelines/split-views#watchOS).

<!-- topic:status -->
<a id="status"></a>
## Status
Source: [Status](https://developer.apple.com/design/human-interface-guidelines/status).
Platforms in page metadata: not specified.

This collection links to Activity rings, gauges, progress indicators, and rating indicators, with each page defining the meaning and appropriate use of its display.

Scope / uncertainty: Navigation-only collection; it does not supply independent rules for status displays.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/status).

<!-- topic:status-bars -->
<a id="status-bars"></a>
## Status bars
Source: [Status bars](https://developer.apple.com/design/human-interface-guidelines/status-bars).
Platforms in page metadata: ios, ipados.

Keep the device status bar readable by obscuring app content underneath it. Consider hiding it temporarily for full-screen media when that improves the experience, but avoid permanently withholding the device information people expect there, such as the time and battery level.

Scope / uncertainty: This page covers iOS and iPadOS and excludes the other listed platforms.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/status-bars), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/status-bars#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/status-bars#Platform-considerations).

<!-- topic:steppers -->
<a id="steppers"></a>
## Steppers
Source: [Steppers](https://developer.apple.com/design/human-interface-guidelines/steppers).
Platforms in page metadata: ios, ipados, macos, visionos.

Use a stepper for incremental increases and decreases, and make the associated value easy to identify. When people may need a large change, consider a companion text field instead of requiring many small steps. On Mac, consider supporting Shift-click for faster adjustment through a large value range.

Scope / uncertainty: The page excludes watchOS and tvOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/steppers), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/steppers#Best-practices), [macOS](https://developer.apple.com/design/human-interface-guidelines/steppers#macOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/steppers#Platform-considerations).

<!-- topic:system-experiences -->
<a id="system-experiences"></a>
## System experiences
Source: [System experiences](https://developer.apple.com/design/human-interface-guidelines/system-experiences).
Platforms in page metadata: not specified.

This collection groups integrations with system surfaces, including shortcuts, complications, quick controls, Live Activities, notifications, snippets, status bars, Top Shelf, watch faces, and widgets.

Scope / uncertainty: Navigation-only collection; availability and interaction rules belong to the linked experiences.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/system-experiences).

<!-- topic:tab-bars -->
<a id="tab-bars"></a>
## Tab bars
Source: [Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars).
Platforms in page metadata: ios, ipados, macos, tvos, visionos.

Use a tab bar for navigating top-level app sections and keep it available as people move among them. Label tabs clearly, avoid overflow where possible, and keep tabs present even when their content is unavailable. Respect platform placement: iPhone tabs float near the bottom, iPad tabs near the top, and visionOS tabs vertically beside the window.

Scope / uncertainty: The platform section excludes watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/tab-bars#Best-practices), [iOS](https://developer.apple.com/design/human-interface-guidelines/tab-bars#iOS), [iPadOS](https://developer.apple.com/design/human-interface-guidelines/tab-bars#iPadOS), [visionOS](https://developer.apple.com/design/human-interface-guidelines/tab-bars#visionOS).

<!-- topic:tab-views -->
<a id="tab-views"></a>
## Tab views
Source: [Tab views](https://developer.apple.com/design/human-interface-guidelines/tab-views).
Platforms in page metadata: macos, watchos.

Use a tab view for closely related, mutually exclusive content panes, and keep each pane’s controls scoped to its own content. Name tabs by their contents, avoid a pop-up selector for switching, and avoid more than six tabs. For comparable iPhone or iPad functionality, consider segments; Apple Watch represents tab views through page controls.

Scope / uncertainty: The page excludes its described component on iOS, iPadOS, tvOS, and visionOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/tab-views#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/tab-views#iOS-iPadOS), [watchOS](https://developer.apple.com/design/human-interface-guidelines/tab-views#watchOS), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/tab-views#Platform-considerations).

<!-- topic:text-fields -->
<a id="text-fields"></a>
## Text fields
Source: [Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use text fields for small, specific inputs. Supply a helpful hint, mask sensitive entry, and size and space fields for the expected information. Keep keyboard focus order predictable and validate when useful. Offer a trailing clear control on iPhone and iPad; use text entry sparingly on Apple Watch.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/text-fields#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/text-fields#iOS-iPadOS), [watchOS](https://developer.apple.com/design/human-interface-guidelines/text-fields#watchOS).

<!-- topic:text-views -->
<a id="text-views"></a>
## Text views
Source: [Text views](https://developer.apple.com/design/human-interface-guidelines/text-views).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Choose a text view for lengthy, formatted, or editable text, using simpler labels or fields for short content. Maintain legibility with adaptable typography and accessibility testing, and consider allowing useful information to be selected and copied. Match the input keyboard to the content on iPhone and iPad. On Apple TV, editable text uses fields instead.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/text-views#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/text-views#iOS-iPadOS), [tvOS](https://developer.apple.com/design/human-interface-guidelines/text-views#tvOS).

<!-- topic:the-menu-bar -->
<a id="the-menu-bar"></a>
## The menu bar
Source: [The menu bar](https://developer.apple.com/design/human-interface-guidelines/the-menu-bar).
Platforms in page metadata: ipados, macos.

Preserve standard menus, their order, and their familiar keyboard shortcuts. Keep the set of commands stable and use short menu titles and recognizable imagery. Add modifier-dependent commands only as discoverable alternatives to actions available elsewhere. On Mac, menu bar extras can expose app functionality while another app is active, but available space can constrain their visibility.

Scope / uncertainty: This page covers Mac and iPad; it excludes iOS, tvOS, visionOS, and watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/the-menu-bar#Best-practices), [Dynamic-menu-items](https://developer.apple.com/design/human-interface-guidelines/the-menu-bar#Dynamic-menu-items), [Menu-bar-extras](https://developer.apple.com/design/human-interface-guidelines/the-menu-bar#Menu-bar-extras), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/the-menu-bar#Platform-considerations).

<!-- topic:toggles -->
<a id="toggles"></a>
## Toggles
Source: [Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Use toggles for opposing states, identify what changes, and communicate state through more than color alone. On iPhone and iPad, reserve switches for list rows and use toggle-like buttons elsewhere. On Mac, choose switches, checkboxes, or radio groups according to emphasis, hierarchy, and exclusivity; show a mixed checkbox state when subordinate choices differ.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/toggles#Best-practices), [iOS-iPadOS](https://developer.apple.com/design/human-interface-guidelines/toggles#iOS-iPadOS), [Checkboxes](https://developer.apple.com/design/human-interface-guidelines/toggles#Checkboxes), [Radio-buttons](https://developer.apple.com/design/human-interface-guidelines/toggles#Radio-buttons).

<!-- topic:token-fields -->
<a id="token-fields"></a>
## Token fields
Source: [Token fields](https://developer.apple.com/design/human-interface-guidelines/token-fields).
Platforms in page metadata: macos.

Use a token field when entered text benefits from becoming individually selectable, manipulable tokens. Consider a context menu for useful actions on a token and additional shortcuts for creating tokens. Suggestions can help during entry; consider delaying them when immediate presentation would distract people from typing.

Scope / uncertainty: The token-field component described here is limited to macOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/token-fields), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/token-fields#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/token-fields#Platform-considerations).

<!-- topic:toolbars -->
<a id="toolbars"></a>
## Toolbars
Source: [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars).
Platforms in page metadata: ios, ipados, macos, tvos, visionos, watchos.

Choose toolbar items deliberately so frequent actions remain easy to find without crowding. Prefer standard components, reduce unnecessary backgrounds and tinting, and keep labels distinct from underlying content. Group additional actions in a More menu where appropriate. Consider customization on iPad and Mac. On Mac, also expose every toolbar item as a menu-bar command so hiding or customizing the toolbar preserves access.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/toolbars#Best-practices), [iOS](https://developer.apple.com/design/human-interface-guidelines/toolbars#iOS), [iPadOS](https://developer.apple.com/design/human-interface-guidelines/toolbars#iPadOS), [macOS](https://developer.apple.com/design/human-interface-guidelines/toolbars#macOS).

<!-- topic:top-shelf -->
<a id="top-shelf"></a>
## Top Shelf
Source: [Top Shelf](https://developer.apple.com/design/human-interface-guidelines/top-shelf).
Platforms in page metadata: tvos.

Use Apple TV’s Top Shelf to help people enter compelling content quickly. Feature fresh or personalized material, avoid advertisements and prices, and prefer engaging dynamic presentations. Supply at least a static fallback when the recommended full-screen content is absent, and choose among the documented layouts according to the content being showcased.

Scope / uncertainty: Top Shelf described here is a tvOS experience.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/top-shelf), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/top-shelf#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/top-shelf#Platform-considerations).

<!-- topic:virtual-keyboards -->
<a id="virtual-keyboards"></a>
## Virtual keyboards
Source: [Virtual keyboards](https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards).
Platforms in page metadata: ios, ipados, tvos, visionos, watchos.

Match keyboard type to the input task and consider a Return-key label that explains the action. Consider a custom keyboard for distinctive systemwide input needs, with an obvious route to other keyboards, avoiding duplicate features. Account for secure-entry exceptions and platform differences, including direct or indirect input on visionOS and device-dependent keyboard availability on Apple Watch.

Scope / uncertainty: The page excludes macOS; custom input views and keyboard extensions have different scopes.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards#Best-practices), [Custom-keyboards](https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards#Custom-keyboards), [visionOS](https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards#visionOS), [watchOS](https://developer.apple.com/design/human-interface-guidelines/virtual-keyboards#watchOS).

<!-- topic:watch-faces -->
<a id="watch-faces"></a>
## Watch faces
Source: [Watch faces](https://developer.apple.com/design/human-interface-guidelines/watch-faces).
Platforms in page metadata: watchos.

Help people discover useful complications by sharing watch-face configurations that include them. Show a preview of each shared face, aim to provide options across Apple Watch devices, and handle an incompatible selection gracefully. Consider offering a compatible alternative configuration instead of displaying an error when a face cannot be used.

Scope / uncertainty: The watch-face experience described here is specific to watchOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/watch-faces), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/watch-faces#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/watch-faces#Platform-considerations).

<!-- topic:web-views -->
<a id="web-views"></a>
## Web views
Source: [Web views](https://developer.apple.com/design/human-interface-guidelines/web-views).
Platforms in page metadata: ios, ipados, macos, visionos.

Use a web view for rich web material inside the app’s current context. When people may visit several pages, explicitly provide forward and back navigation and corresponding controls; those interactions are not automatically exposed. Keep the experience focused on contextual content rather than attempting to reproduce a full browser’s functionality.

Scope / uncertainty: The page excludes tvOS and watchOS.

Evidence sections: [Overview](https://developer.apple.com/design/human-interface-guidelines/web-views), [Best-practices](https://developer.apple.com/design/human-interface-guidelines/web-views#Best-practices), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/web-views#Platform-considerations).

<!-- topic:widgets -->
<a id="widgets"></a>
## Widgets
Source: [Widgets](https://developer.apple.com/design/human-interface-guidelines/widgets).
Platforms in page metadata: ios, ipados, macos, watchos, visionos.

Choose a focused widget purpose with information people want frequently, and offer additional sizes only when useful. Match refreshes to the data; widgets do not continuously update in real time. Keep interactions simple and link directly to related app content. Adapt content to platform layouts and provide realistic previews and recognizable loading placeholders. On Apple HomeView, consider whose connected-device content other household members can see: the Modular face is shared, while enrolled members have separate personalized Home Screens.

Scope / uncertainty: The page excludes tvOS; visionOS widgets have spatial placement and treatment considerations.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/widgets#Best-practices), [Updating-widget-content](https://developer.apple.com/design/human-interface-guidelines/widgets#Updating-widget-content), [Adding-interactivity](https://developer.apple.com/design/human-interface-guidelines/widgets#Adding-interactivity), [Previews-and-placeholders](https://developer.apple.com/design/human-interface-guidelines/widgets#Previews-and-placeholders), [Apple-HomeView](https://developer.apple.com/design/human-interface-guidelines/widgets#Apple-HomeView).

<!-- topic:windows -->
<a id="windows"></a>
## Windows
Source: [Windows](https://developer.apple.com/design/human-interface-guidelines/windows).
Platforms in page metadata: ipados, macos, visionos.

Make windows adapt smoothly as people resize and multitask, and open new windows at appropriate moments. Prefer system window controls and consider an explicit option to open content separately. In visionOS, favor a glass-backed window for familiar interface tasks and a volume for bounded, rich 3D content that people inspect from different angles.

Scope / uncertainty: The page covers iPadOS, macOS, and visionOS; it excludes iOS, tvOS, and watchOS.

Evidence sections: [Best-practices](https://developer.apple.com/design/human-interface-guidelines/windows#Best-practices), [visionOS-windows](https://developer.apple.com/design/human-interface-guidelines/windows#visionOS-windows), [visionOS-volumes](https://developer.apple.com/design/human-interface-guidelines/windows#visionOS-volumes), [Platform-considerations](https://developer.apple.com/design/human-interface-guidelines/windows#Platform-considerations).
