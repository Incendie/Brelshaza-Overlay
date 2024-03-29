
- [Introduction](#introduction)
- [Mechanics](#mechanics)
  - [Enrage Timer](#enrage-timer)
  - [Blue Meteor](#blue-meteor)
  - [Tile Regeneration](#tile-regeneration)
- [How this app works](#how-this-app-works)
  - [Instructions](#instructions)
  - [How it works](#how-it-works)
  - [Functionality](#functionality)
    - [Timers](#timers)
    - [Copy to Clipboard](#copy-to-clipboard)
    - [Buttons](#buttons)
      - [Start/Reset](#startreset)
      - [Meteor](#meteor)
      - [Broken Tile](#broken-tile)
      - [Both](#both)
# Introduction
This is just to take the load off trying to calculate 100 seconds ahead for Brelshaza Gate 6. Still requires some alt+tab interaction with it so it's not completely free.

I don't have a Patreon or anything, but if you want to say thanks, feel free to subscribe to my friend, [Aiyulol](https://www.twitch.tv/aiyulol) at https://www.twitch.tv/aiyulol.

It is Desktop and Mobile friendly for browsers.

Can be accessed at: [https://incendie.github.io/Brelshaza-Overlay/](https://incendie.github.io/Brelshaza-Overlay/)

# Mechanics
## Enrage Timer
20 minute enrage timer (1200 secoonds)

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

*Note: You will probably have to click the Blue Meteor button again after the first Shandi/Chanmi mechanic because the blue meteor timer gets out of sync due to the mechanics.
## How it works
## Functionality

### Timers
All timers will show the countdown time, where at 0 the event will happen, as well as the equivalent time to the enrage timer. For example, if there is 23 seconds left until the blue meteor mechanic, then the timer will show `0:23` to indicate the 23 seconds left, as well as something like `14:37` to indicate that the meteor mechanic will start at 14:37 left on the enrage timer.

### Copy to Clipboard
Clicking on the timers' text or the `Copy` button will copy a message indicating the countdown time, the equivalent enrage time, as well as the event to the clipboard. You can then paste this in chat.

Example:
```
Next Tile regenerates at 18:19
```

### Buttons

#### Start/Reset
Once you click `Start`, the enrage timer will start counting down and initializes the meteor and tile timers to 0. This button will then change to a `Reset` button. Click it again to end the fight and reset the app.

#### Meteor
If you click the blue `Meteor` button, it will start/restart the 1 minute timer for the blue meteors. At 5 seconds before the next meteor, a message and an audio cue will inform you about the incoming meteor. Click it again to restart the timer to countdown from 1 minute again.

#### Broken Tile
If you click the golden `Broken Tile` button, it will start a 1:40 timer to tell you when the tile will regenerate. At 5 seconds before the tile regenerates, a message and an audio cue will inform you that the tile is about to come back. Click it again to restart the timer to countdown from 1 minute 40 seconds again.

#### Both
If you click the  `Both` button, it will start both the meteor and tile timers simultaneously. Click it again to restart both the timers to start counting down again. If there isn't enough time left for one of the timers, it will not start.
