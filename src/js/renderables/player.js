import { Entity, input, game, state } from "melonjs/dist/melonjs.module.js";


import * as me from "melonjs/dist/melonjs.module.js";
//let entities = {};

class PlayerEntity extends Entity {
  /**
   * constructor
   */
  constructor(x, y, settings) {
    // call the parent constructor
    super(x, y, settings);

    //Set player velocity and friction
    this.body.setMaxVelocity(3, 15);
    this.body.setFriction(0.4, 0);

    //this.body.collisionType = collision.types.PLAYER_OBJECT; //player object, opposed to collectible
    this.body.collisionType = me.collision.types.PLAYER_OBJECT;
    // set the display to follow our position on both axis
    game.viewport.follow(this.pos, game.viewport.AXIS.BOTH, 0.4);

    // ensure the player is updated even when outside of the viewport
    this.alwaysUpdate = true;

    // define a basic walking animation (using three frames)
    this.renderable.addAnimation("walk", [0, 1, 2]);

    // define a standing animation (using the first frame)
    this.renderable.addAnimation("stand", [0]);

    // set the standing animation as default
    this.renderable.setCurrentAnimation("stand");

    //set jumping animation
    this.renderable.addAnimation("jump", [3]);
  }

  /**
   * update the entity
   */
  update(dt) {
    // change body force based on inputs
    //....

    if (input.isKeyPressed("left")) {
      this.body.force.x = -this.body.maxVel.x;
      this.renderable.flipX(true);
      if (!this.renderable.isCurrentAnimation("walk")) {
        this.renderable.setCurrentAnimation("walk");
      }
    } else if (input.isKeyPressed("right")) {
      this.body.force.x = this.body.maxVel.x;
      this.renderable.flipX(false);
      if (!this.renderable.isCurrentAnimation("walk")) {
        this.renderable.setCurrentAnimation("walk");
      }
    } else {
      // change to the standing animation
      this.renderable.setCurrentAnimation("stand");
    }

    // for now we only want to jump on the ground
    if (input.isKeyPressed("jump") && !this.body.falling) {
      this.body.jumping = true;
      this.body.force.y = -this.body.maxVel.y;
      if (!this.renderable.isCurrentAnimation("jump")) {
        this.renderable.setCurrentAnimation("jump");
      }
      //this.vel.y = this.body.gravity; //Makes chracter fall slower if the jump button is held
    }
    // we will either have a double jump power up, or a permanent double jump

    // call the parent method
    return super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0;
  }

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision(response, other) {
    if (
      response.b.body.collisionType === me.collision.types.COLLECTABLE_OBJECT
    ) {
      return false;
    } else if (
      response.b.body.collisionType === me.collision.types.ENEMY_OBJECT
    ) {
      this.renderable.flicker(750);
      state.change(state.GAMEOVER);
    }
    return true;
  }
}

//entities.PlayerEntity = PlayerEntity;

export default PlayerEntity;
