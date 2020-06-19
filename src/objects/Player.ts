import { GameObject } from "../interfaces/GameObject";
import ShapeOne from "./polygons/ShapeOne";
import ShapeTwo from "./polygons/ShapeTwo";
import ShapeThree from "./polygons/ShapeThree";

import { playerData} from '../data/player';

export default function Player(): GameObject {
    let playerSprite;
    let shapes: ((scene: Phaser.Scene, x: number, y: number) => Phaser.Types.Physics.Matter.MatterBody)[] = [];
    
    let cursor: Phaser.Types.Input.Keyboard.CursorKeys;

    let keyW, keyS, keyA, keyD;

    const speed: number = 5;

    function preload(scene: Phaser.Scene) {
        scene.load.image("player", "assets/blocky.png");
    }

    function create(scene: Phaser.Scene) {

        shapes.push(
            ShapeOne,
            ShapeTwo,
            ShapeThree,
        );

        playerSprite = shapes[playerData.shapeno](scene, 100, scene.sys.canvas.height/2);
        // playerSprite = scene.matter.add.image(100, 100, "player");    

        playerSprite.x = 100;
        playerSprite.y = scene.sys.canvas.height/2;
        playerSprite.onCollide = true;
        playerSprite.name = "PLAYER";

        // playerSprite = ShapeTwo(scene, 800, 400);

        cursor = scene.input.keyboard.createCursorKeys();
        // if (playerSprite) {
        //     // playerSprite.setCollideWorldBounds(true);

        //     w = playerSprite.width;
        //     h = playerSprite.height;
        //     playerSprite.setFixedRotation();
        //     playerSprite.setInteractive();
        // }

        keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        scene.input.keyboard.on("keyup-W", () => {
            playerData.shapeno++;
            if (playerData.shapeno >= shapes.length) playerData.shapeno = 0;
            replacePlayerSpite(scene);
        });

        scene.input.keyboard.on("keyup-S", () => {
            playerData.shapeno--;
            if (playerData.shapeno < 0) playerData.shapeno = shapes.length - 1;
            replacePlayerSpite(scene);
        });

        scene.matter.world.on('collisionactive', (e, ba, bb) => {
            
            if(ba.gameObject?.name === "PLAYER" || bb.gameObject?.name === "PLAYER") {
                playerData.health--;
                if(playerData.health <= 0) {
                    console.log("DEATH!");
                    scene.scene.stop();
                    
                }
            }
        });

    }

    function replacePlayerSpite(scene: Phaser.Scene) {
        const nowx = playerSprite.x;
        const nowy = playerSprite.y;
        const nowa = playerSprite.angle;
        playerSprite.destroy();
        playerSprite = shapes[playerData.shapeno](scene, nowx, nowy);
        playerSprite.angle = nowa;
        playerSprite.onCollide = true;
        playerSprite.name = "PLAYER";
    }

    function update(scene: Phaser.Scene) {
        playerSprite.setVelocity(0);

        playerSprite.setAngularVelocity(0);
        // // console.log(scene.cameras.main.scrollX, playerSprite.x);

        playerSprite.setVelocityX(1);

        if (cursor.left.isDown) {
            playerSprite.setVelocityX(speed * -1);
        } else if (cursor.right.isDown) {
            playerSprite.setVelocityX(speed);
        }

        if (cursor.up.isDown) {
            playerSprite.setVelocityY(speed * -1);
        } else if (cursor.down.isDown) {
            playerSprite.setVelocityY(speed);
        }

        if (keyA.isDown) {
            playerSprite.setAngularVelocity(0.1);
        }

        if (keyD.isDown) {
            playerSprite.setAngularVelocity(-0.1);
        }



    }

    return {
        preload,
        create,
        update,
    };
}
