import { Entity, input, game, Sprite } from "melonjs/dist/melonjs.module.js";
import * as me from "melonjs/dist/melonjs.module.js";
class EnemyEntity extends me.Sprite {
  constructor(x, y, settings) {
    let width = settings.width;

    super(x, y, settings);

    this.body = new me.Body(this);
    this.body.collisiontype = me.collision.types.ENEMY_OBJECT;

    this.body.addShape(new me.Rect(0, 0, this.width, this.height));

    this.body.setMaxVelocity(1, 5);
    this.body.setFriction(0.4, 0);

    this.addAnimation("stand", [0, 1, 2], 200);
    this.addAnimation("walk", [0, 1, 2]);

    this.setCurrentAnimation("stand");

    x = this.pos.x;
        this.startX = x;
        this.pos.x = this.endX = x + width - this.width;
        //this.pos.x  = x + width - this.width;

        // to remember which side we were walking
        this.walkLeft = false;

        // make it "alive"
        this.alive = true;
  }

  update(dt) {
    if (this.alive)
        {
            if (this.walkLeft === true) {
                if (this.pos.x <= this.startX) {
                    // if reach start position
                    this.walkLeft = false;
                    this.flipX(false);
                } else {
                    this.body.force.x = -this.body.maxVel.x;
                }
            }

            if (this.walkLeft === false) {
                if (this.pos.x >= this.endX) {
                    // if reach the end position
                    this.walkLeft = true;
                    this.flipX(true);
                } else {
                    this.body.force.x = this.body.maxVel.x;
                }
            }
        
    // return true if we moved or if the renderable was updated
    return super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0;
  }
}

  onCollision(response, other) {
    // Make all other objects solid
    if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
            this.flicker(750, () => {
                me.game.world.removeChild(this);
            });
        }
        return false;
    }
    return true;
  }
}
export default EnemyEntity;
