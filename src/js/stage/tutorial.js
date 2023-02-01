//import { level } from 'index';
import {
  Stage,
  game,
  input,
  state,
  Sprite,
  loader,
  event,
  level,
} from "melonjs/dist/melonjs.module.js";

class Tutorial extends Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    var tutorialImage = new Sprite(
      game.viewport.width / 2,
      game.viewport.height / 2,
      {
        image: loader.getImage("Tutorial"),
      }
    );
    tutorialImage.scale(
      game.viewport.width / tutorialImage.width,
      game.viewport.height / tutorialImage.height
    );

    game.world.addChild(tutorialImage, 1);

    input.bindKey(input.KEY.ENTER, "enter", true);

    this.handler = event.on(event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        if (edge) {
          state.change(state.PLAY);
        }
      }
    });
  }

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent() {
    input.unbindKey(input.KEY.ENTER);
    event.off(event.KEYDOWN, this.handler);
  }
}

export default Tutorial;
