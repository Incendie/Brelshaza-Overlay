- [Brelshaza-Overlay](#brelshaza-overlay)
- [Mechanics](#mechanics)
  - [Enrage Timer](#enrage-timer)
  - [Blue Meteor](#blue-meteor)
  - [Tile Regeneration](#tile-regeneration)
- [How this app works](#how-this-app-works)
  - [Instructions](#instructions)
  - [How it works](#how-it-works)
# Brelshaza-Overlay
Overlay a timer and buttons for Brelshaza Gate 6

# Mechanics

## Enrage Timer
20 minute enrage timer (1200 minutes or 72000 secoonds)

## Blue Meteor
Blue meteor drops every minute (60 seconds)

## Tile Regeneration
Tiles regenerate 1 minute and 40 seconds (100 seconds) after it breaks.

# How this app works

## Instructions
1. Open the file in public/index.html
2. Click `Start` when you enter the fight and the enrage timer will start counting down.
3. Click the Blue `Meteor` button when the last blue meteor drops
4. Click the Gold `Broken Tile` button when a tile is broken
5. Click the (colour) `Both` (?) button INSTEAD of (3) or (4) if the blue meteor dropping and the tile breaking happens at the same time.
6. Click the `Reset` button to reset the app to its initial state, Allowing you to click `Start` when you begin the fight again.

## How it works
Once you click `Start`, the enrage timer will start counting down and initializes the app.

If you click the blue `Meteor` button, it will start/restart the 1 minute counter for the blue meteors. At 5 seconds before the next meteor, a message will show up alerting you about the next meteor. (Maybe it will play a sound).

If you click the golden `Broken Tile` button, it will start a 1:40 timer to tell you when the tile will regenerate. At 5 seconds before the tile regenerates, a message will show up informing you that the tile is about to come back. (Maybe it will play a sound).

If you click the (?colour) `Both` button, it will start both timers simultaneously.
