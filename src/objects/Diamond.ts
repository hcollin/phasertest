import { GameObject } from "../interfaces/GameObject";
import { playerData } from "../data/playerData";
import { GameLevelSceneInterface } from "../interfaces/Level";


export interface DiamondConfig {
    x: number,
    y: number
}

export default function Diamond(config: DiamondConfig): GameObject {

    let diamond: Phaser.Physics.Matter.Image;

    let ball: Phaser.Physics.Matter.Sprite;

    let vel = -1;
    let dir = 1;

    let picked = false;

    function preload(scene: GameLevelSceneInterface) {
        // scene.load.image("diamond_1", "assets/icons/material_02.png");        
        // scene.load.image("diamond_2", "assets/icons/material_06.png");
        scene.load.atlas('CrystalBall', 'assets/atlasses/CrystalBall.png', 'assets/atlasses/CrystalBall.json');
    }

    function create(scene: GameLevelSceneInterface) {

        scene.anims.create({ key: 'everything', frames: scene.anims.generateFrameNames('CrystalBall'), repeat: -1 });
        // scene.add.sprite(200, 100, 'CrystalBall').setScale(1).play('everything');

        ball = scene.matter.add.sprite(config.x, config.y, "CrystalBall", null, { isSensor: true, ignoreGravity: true });
        ball.play('everything');
        // diamond = scene.matter.add.image(config.x, config.y, "diamond_1", null, {isSensor: true, ignoreGravity: true});
        // diamond.setScale(2);
        // diamond.type ="DIAMOND";


        // diamond.setOnCollide((target) => {
        ball.setOnCollide((target) => {
            if (target.bodyA?.gameObject?.name === "PLAYER" || target.bodyB?.gameObject?.name === "PLAYER") {
                playerData.pickDiamond();
                // diamond.destroy();
                ball.destroy();
                picked = true;
            }
        });

    }

    function update(scene: GameLevelSceneInterface) {

        if (ball && !picked) {
            ball.setVelocityY(vel);
            vel += dir * 0.1;
            if (vel >= 1) { dir = -1 };
            if (vel <= -1) { dir = 1 };
        }


    }

    return {
        preload,
        create,
        update,
    }

}