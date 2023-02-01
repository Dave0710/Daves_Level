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

class TitleScreen extends Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    var backgroundImage = new Sprite(
      game.viewport.width / 2,
      game.viewport.height / 2,
      {
        image: loader.getImage("title_screen"),
      }
    );
    backgroundImage.scale(
      game.viewport.width / backgroundImage.width,
      game.viewport.height / backgroundImage.height
    );

    game.world.addChild(backgroundImage, 1);

    input.bindKey(input.KEY.ENTER, "enter", true);

    this.handler = event.on(event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        if (edge) {
          state.change(state.READY);
          //state.change(state.LOADING);
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

export default TitleScreen;
