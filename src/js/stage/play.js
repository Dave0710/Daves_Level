import {
  Stage,
  game,
  ColorLayer,
  BitmapText,
  level,
  audio,
} from "melonjs/dist/melonjs.module.js";

class PlayScreen extends Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    // add a gray background to the default Stage
    game.world.addChild(new ColorLayer("background", "#23f67a"));

    level.load("testCoinPickup");
    audio.setVolume(0.5);
    audio.playTrack("space-120280");
  }
}

// More Testing
export default PlayScreen;
