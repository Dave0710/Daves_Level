import {
  audio,
  loader,
  state,
  device,
  video,
  utils,
  plugin,
  pool,
  input,
} from "melonjs/dist/melonjs.module.js";

import "index.css";

import TitleScreen from "js/stage/title.js";
import LevelScreen from "js/stage/level.js";
import Tutorial from "./js/stage/tutorial.js";
import PlayScreen from "js/stage/play.js";
import GameOverScreen from "js/stage/gameover.js";
import PlayerEntity from "js/renderables/player.js";
import CoinEntity from "js/renderables/coin.js";
import HealthEntity from "js/renderables/healthbar.js";
import EnemyEntity from "js/renderables/enemy.js";
import DataManifest from "manifest.js";

device.onReady(() => {
  // initialize the display canvas once the device/browser is ready
  if (!video.init(960, 640, { parent: "screen", scale: "auto" })) {
    alert("Your browser does not support HTML5 canvas.");
    return;
  }

  // initialize the debug plugin in development mode.
  if (process.env.NODE_ENV === "development") {
    import("js/plugin/debug/debugPanel.js").then((debugPlugin) => {
      // automatically register the debug panel
      utils.function.defer(
        plugin.register,
        this,
        debugPlugin.DebugPanelPlugin,
        "debugPanel"
      );
    });
  }

  // Initialize the audio.
  audio.init("mp3,ogg");

  // allow cross-origin for image/texture loading
  loader.crossOrigin = "anonymous";

  // set and load all resources.
  loader.preload(DataManifest, function () {
    // set the user defined game stages

    state.set(state.MENU, new TitleScreen());
    //state.set(state.LEVEL, new LevelScreen());
    state.set(state.READY, new Tutorial());
    state.set(state.PLAY, new PlayScreen());
    state.set(state.GAMEOVER, new GameOverScreen());

    state.transition("fade", "#FFFFFF", 250);

    // add our player entity in the entity pool
    pool.register("mainPlayer", PlayerEntity);
    // add coin to entity pool
    pool.register("CoinEntity", CoinEntity);

    pool.register("Enemy", EnemyEntity);

    // add health bar to entity
    pool.register("HealthBarEntity", HealthEntity);

    input.bindKey(input.KEY.LEFT, "left");
    input.bindKey(input.KEY.RIGHT, "right");
    // map X, Up Arrow and Space for jump
    input.bindKey(input.KEY.X, "jump", true);
    input.bindKey(input.KEY.UP, "jump", true);
    input.bindKey(input.KEY.SPACE, "jump", true);
    // Start the game.
    state.change(state.MENU);
  });
});
