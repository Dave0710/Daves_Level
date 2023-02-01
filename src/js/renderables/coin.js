import * as me from "melonjs/dist/melonjs.module.js";
import {
  Entity,
  input,
  game,
  Collectable,
  audio,
} from "melonjs/dist/melonjs.module.js";
import PlayerEntity from "./player";

//let entities = {};

class CoinEntity extends Collectable {
  constructor(x, y, settings) {
    super(x, y, settings);
    this.body.collisiontype = me.collision.types.COLLECTABLE_OBJECT;
    this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
    /* trying to debug
        console.log(PlayerEntity);
        console.log(CoinEntity);
        console.log(Collectable);
        console.log(entities);
        */
  }

  onCollision(response, other) {
    audio.play("Coin");
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    game.world.removeChild(this);

    return false;
  }
}

//entities.CoinEntity = CoinEntity;
export default CoinEntity;
