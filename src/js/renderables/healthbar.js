import {
  Entity,
  input,
  game,
  Collectable,
} from "melonjs/dist/melonjs.module.js";
import PlayerEntity from "./player";

import * as me from "melonjs/dist/melonjs.module.js";

let entities = {};

class HealthEntity extends Collectable {
  constructor(x, y, settings) {
    super(x, y, settings);
    this.body.collisiontype = me.collision.types.COLLECTABLE_OBJECT;
    this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
  }

  onCollision(response, other) {
    audio.play("heartPickup");
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    game.world.removeChild(this);

    return false;
  }
}

entities.HealthEntity = HealthEntity;
export default entities;
