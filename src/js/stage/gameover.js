import {
  Stage,
  game,
  input,
  state,
  Sprite,
  loader,
  event,
  audio,
} from "melonjs/dist/melonjs.module.js";

class GameOverScreen extends Stage {
  onResetEvent() {
    // new sprite for the game over screen, position at the center of the game viewport
    var backgroundImage = new Sprite(
      game.viewport.width / 2,
      game.viewport.height / 2,
      {
        image: loader.getImage("GameOver"),
      }
    );

    // scale to fit with the viewport size
    backgroundImage.scale(
      game.viewport.width / backgroundImage.width,
      game.viewport.height / backgroundImage.height
    );

    // add to the world container
    game.world.addChild(backgroundImage, 1);

    audio.stopTrack();

    // change to play state on press Enter or click/tap
    input.bindKey(input.KEY.ENTER, "enter", true);
    input.bindKey(input.KEY.C, "C");
    input.bindKey(input.KEY.Q, "Q");
    //input.bindPointer(input.pointer.UP, input.KEY.C);
    //input.bindPointer(input.pointer.DOWN, input.KEY.Q);

    this.handler = event.on(event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "C") {
        // play something on tap / enter
        state.restart(state.PLAY);
        state.change(state.PLAY);
        audio.play("Coin");
      } else if (action === "Q") {
        // takes you to the main menu
        state.change(state.MENU);
      }
    });
  }
  /**
   *  action to whether continue or quit the game
   */
  onDestroyEvent() {
    input.unbindKey(input.KEY.ENTER);
    input.unbindPointer(input.pointer.UP);
    input.unbindPointer(input.pointer.DOWN);
    event.off(event.KEYDOWN, this.handler);
  }
}
export default GameOverScreen;
