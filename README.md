# Logical Staffing Module (LSM)

*Note: This is still a work in progress*

Logical Staffing Module helps with the tedious process of hiring and naming your staff.

## Description

LSM helps you automate the staffing levels and patrol areas of your parks.

## Motivation

Clicking. I pretty much know what I want, I'm just tired of clicking a lot. I like programming, not clicking.

The best tycoon games *involve designing complex policies*, not tedium that makes you not want to optimize. Transport Tycoon Deluxe was fun because you could set up vast networks; being a signal operator would have become tedious or impossible, but setting up the rules for junctions is fun. Here, we don't have to go in tile by tile, and adjust again when we change, we just set rules and let the plugin make adjustments.

## How To

### Install

Place the logicalstaffingmodule.js file into the plugins folder.
* For Windows (untested) `C:Users\{User}\Documents\OpenRCT2\plugin`
* For Ubuntu and likely other Linux distributions `~/.config/OpenRCT2/plugin`

### Configure Names

Currently, there is not an in-game way to adjust the list of pre-defined names. However, you can modify the OpenRCT2 user config to
adjust the list of names. In Ubuntu, this file, I think, by default is in `$HOME/.config/OpenRCT2/plugin.store.json`. You can carefully
edit this file to add or modify the list of names it picks from.

### Use the plug-in

*describe the UI*

## Policy Descriptions

### Handymen

Polar - creates a polar coordinate plane centered on the middle of the 4 extreme corners of footpaths. Then, divides the plane into equal sectors for each handyman. Perfect on Leafy Lake.

## Roadmap & Known Bugs

### Roadmap

* Automatically configure staff zones
** Basic divisions
** Mechanics tied to a roller coaster and nearby rides
** AI that learns where breakdowns are, vomit is, trash cans are full, etc.
* Automatically adjust numbers
** Handymen per X guests
** Handymen hired when X grossness
** Mechanics per Rides/Coasters/Etc.
* Save choices across parks
* Staff Names

## Acknowledgements

* https://github.com/wisnia74/openrct2-typescript-mod-template
* https://github.com/jujpenabe for the idea
