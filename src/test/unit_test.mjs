import test from 'unit.js';
import {Entity} from "melonjs/dist/melonjs.module.js";
describe("Player tests",function() {
    
    it('Player width and height', function(){  //tests whether the player's width and height has be set correctly
        var player = new Entity(0,0,{width:1,height:2});   
        test
           .number(player.width).isBetween(0,32)
           .number(player.height).isBetween(0,64)

    });
    it('Player velocity', function(){ //tests whether the player's velocity has been set correctly
        var player = new Entity(0,0,{width:1,height:2});
        player.body.setMaxVelocity(3,15);
        test
            .number(player.body.maxVel.x).isBetween(0,5)
            .number(player.body.maxVel.y).isBetween(10,20)

    });

});