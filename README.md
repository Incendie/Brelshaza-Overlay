- [Brelshaza-Overlay](#brelshaza-overlay)
- [Mechanics](#mechanics)
  - [Enrage Timer](#enrage-timer)
  - [Blue Meteor](#blue-meteor)
  - [Tile Regeneration](#tile-regeneration)
- [How this app works](#how-this-app-works)
  - [Instructions](#instructions)
  - [How it works](#how-it-works)
    - [Timers](#timers)
    - [Clipboard functionality](#clipboard-functionality)
    - [Buttons](#buttons)
      - [Start/Reset](#startreset)
      - [Meteor](#meteor)
      - [Broken Tile](#broken-tile)
      - [Both](#both)
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
2. Click `Start` when you enter the fight and the enrage timer will start counting down. This will then change to a `Reset` button.
3. Click the `Meteor` button when the last blue meteor drops
4. Click the `Broken Tile` button when a tile is broken
5. Click the `Both` (?) button INSTEAD of (3) or (4) if the blue meteor dropping and the tile breaking happens at the same time.
6. Click the `Reset` button to reset the app to its initial state, Allowing you to click `Start` when you begin the fight again.

## How it works

### Timers
All timers will show the countdown time, where at 0 the event will happen, as well as the equivalent time to the enrage timer. For example, if there is 23 seconds left until the blue meteor mechanic, then the timer will show `0:23` to indicate the 23 seconds left, as well as something like `14:37` to indicate that the meteor mechanic will start at 14:37 left on the enrage timer.

### Clipboard functionality
Clicking on the timers or the `Copy` button will copy a message indicating the countdown time, the equivalent enrage time, as well as the event to the clipboard. You can then paste this in chat.

Example:
```
Next blue meteor in 23 seconds or at Enrage Timer of 14:37
```

### Buttons

#### Start/Reset
Once you click `Start`, the enrage timer will start counting down and initializes the meteor and tile timers to 0. This button will then change to a `Reset` button. Click it again to end the fight and reset the app.

#### Meteor
If you click the blue `Meteor` button, it will start/restart the 1 minute timer for the blue meteors. At 3 seconds before the next meteor, a message will show up alerting you about the incoming meteor. Click it again to restart the timer to countdown from 1 minute again.

#### Broken Tile
If you click the golden `Broken Tile` button, it will start a 1:40 timer to tell you when the tile will regenerate. At 3 seconds before the tile regenerates, a message will show up informing you that the tile is about to come back. Click it again to restart the timer to countdown from 1 minute 40 seconds again.

#### Both
If you click the  `Both` button, it will start both the meteor and tile timers simultaneously. Click it again to restart both the timers to start counting down again. If there isn't enough time left for one of the timers, it will not start.
