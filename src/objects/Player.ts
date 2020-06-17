import { GameObject } from "../interfaces/GameObject";

export default function Player(): GameObject {

    let playerSprite: Phaser.Physics.Matter.Image | undefined = undefined;
    let cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined = undefined;


    let keyW, keyS, keyA, keyD;

    let w: number;
    let h: number;

    const speed: number = 5;

    function preload(scene: Phaser.Scene) {

        scene.load.image("player", "assets/blocky.png");
    }

    function create(scene: Phaser.Scene) {
        playerSprite = scene.matter.add.image(100, 100, "player");

        cursor = scene.input.keyboard.createCursorKeys();
        if (playerSprite) {
            // playerSprite.setCollideWorldBounds(true);

            w = playerSprite.width;
            h = playerSprite.height;
            playerSprite.setFixedRotation();
            playerSprite.setInteractive();
            

        }

        keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }


    function update(scene: Phaser.Scene) {
        playerSprite.setVelocity(0);

        playerSprite.setAngularVelocity(0);
        // console.log(scene.cameras.main.scrollX, playerSprite.x);

        playerSprite.setVelocityX(1);

        if (cursor.left.isDown) {
            playerSprite.setVelocityX(speed * -1);
        }
        else if (cursor.right.isDown) {
            playerSprite.setVelocityX(speed);
        }

        if (cursor.up.isDown) {
            playerSprite.setVelocityY(speed * -1);
        }
        else if (cursor.down.isDown) {
            playerSprite.setVelocityY(speed);
        }

        if (keyA.isDown) {
            playerSprite.setAngularVelocity(0.1);

        }

        if (keyD.isDown) {
            playerSprite.setAngularVelocity(-0.1);

        }

        if (keyW.isDown) {
            if (playerSprite.scaleX > 0.3) {
                // playerSprite.setScale(playerSprite.scaleX - 0.1, playerSprite.scaleY + 0.1);
                w -= 10;
                h += 10;
                
                playerSprite.setDisplaySize(w ,h);
                playerSprite.setSize(w,h);

                console.log(playerSprite.input.hitArea);

                // playerSprite.scaleX -= 0.1
                // playerSprite.scaleY += 0.1
            }
        }

        if (keyS.isDown) {
            if (playerSprite.scaleY > 0.3) {
                // playerSprite.setScale(playerSprite.scaleX + 0.1, playerSprite.scaleY - 0.1);
                w += 10;
                h -= 10;
                playerSprite.setDisplaySize(w ,h);
                playerSprite.setSize(w,h);

                // playerSprite.scaleX += 0.1
                // playerSprite.scaleY -= 0.1
            }
        }

    }


    return {
        preload,
        create,
        update
    }
}

