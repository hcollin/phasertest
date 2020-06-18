import { GameObject } from "../interfaces/GameObject";
import ShapeOne from "./polygons/ShapeOne";
import ShapeTwo from "./polygons/ShapeTwo";

export default function Player(): GameObject {
    let playerSprite;
    let shapes: Phaser.Types.Physics.Matter.MatterBody[] = [];
    let currentShape: number = 0;
    let cursor: Phaser.Types.Input.Keyboard.CursorKeys;

    let keyW, keyS, keyA, keyD;

    let w: number;
    let h: number;

    const speed: number = 5;

    function preload(scene: Phaser.Scene) {
        scene.load.image("player", "assets/blocky.png");
    }

    function create(scene: Phaser.Scene) {
        

        shapes.push(
            ShapeOne(scene, -200, -200)
            // ShapeTwo(scene, -200, -200)
        );

        // playerSprite = (shapes[currentShape] as Phaser.GameObjects.GameObject).setInteractive();
        playerSprite = scene.matter.add.image(100, 100, "player");    

        

        // playerSprite = ShapeOne(scene, 800, 400);

        playerSprite.cursor = scene.input.keyboard.createCursorKeys();
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
