import { GameObject } from "../interfaces/GameObject";
import { playerData } from '../data/playerData';
import { PlayerShape, createPlayerShape } from "./polygons/PlayerShape";
import { GameLevelSceneInterface } from "../interfaces/Level";
import endLevel from "../utils/endLevel";

export default function Player(): GameObject {
    let playerSprite;
    let shapes: PlayerShape[] = playerData.shapes;

    let cursor: Phaser.Types.Input.Keyboard.CursorKeys;

    let keyW, keyS, keyA, keyD;

    const speed: number = 5;

    let destroyed = false;

    function preload(scene: GameLevelSceneInterface) {
        
        scene.load.atlas("Explosion", "assets/atlasses/Explosion.png","assets/atlasses/Explosion.json")

    }

    function create(scene: GameLevelSceneInterface) {

        changePlayerShape(scene, 100, scene.sys.canvas.height / 2, 0);
       
        playerSprite.onCollide = true;
        playerSprite.name = "PLAYER";
        

        destroyed = false;
        cursor = scene.input.keyboard.createCursorKeys();

        // keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        // keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        scene.input.keyboard.on("keyup-W", () => {
            playerData.nextShape();
            changePlayerShape(scene);
        });

        scene.input.keyboard.on("keyup-S", () => {
            playerData.prevShape();
            changePlayerShape(scene);
        });

        

        scene.matter.world.on('collisionactive', (e: Phaser.Physics.Matter.Events.CollisionActiveEvent, ba: MatterJS.BodyType, bb: MatterJS.BodyType) => {

            const playerobj: MatterJS.BodyType | null = ba.gameObject?.name === "PLAYER" ? ba : bb.gameObject?.name === "PLAYER" ? bb : null;
            const diamond: MatterJS.BodyType | null = ba.gameObject?.type === "DIAMOND" ? ba : bb.gameObject?.type === "DIAMOND" ? bb : null;

            if (playerobj !== null && diamond === null) {
                const status = playerData.getStatus();
                
                if(status.health > 0) {
                    console.log("COLLISION", status.health, "\nNames: ", ba.gameObject?.name, bb.gameObject?.name, "\nTypes:", ba.gameObject?.type, bb.gameObject?.type);
                    const alive = playerData.setDamage(1);
                    if (!alive) {
                        console.log("DEATH!");
                        playerData.death();
                        scene.cameras.main.centerOnX(playerSprite.x);
                        deathAnimation(scene);   
                    }
                }
                
            }


        });

    }

    function changePlayerShape(scene: Phaser.Scene, x?: number, y?: number, a?: number) {
        const nowx = x !== undefined ? x : playerSprite.x;
        const nowy = y !== undefined ? y : playerSprite.y;
        const nowa = a !== undefined ? a : playerSprite.angle;
        if (playerSprite) {
            playerSprite.destroy();
        }

        playerSprite = createPlayerShape(scene, playerData.getShape(), nowx, nowy);
        playerSprite.angle = nowa;
        playerSprite.onCollide = true;
        playerSprite.name = "PLAYER";
    }

    function deathAnimation(scene: Phaser.Scene) {
        
        scene.anims.create({ key: 'fullExplosion', frames: scene.anims.generateFrameNames('Explosion'), repeat: 0, hideOnComplete: true });
        
        let explosions = [];

        const px = playerSprite.x;
        const py = playerSprite.y;
        const max = 12;
        let done = 0;
        let opacityPart = 1 / max;
        for(let e = 0; e < max; e++) {
            const sc = ((Math.round(Math.random()*15))/10) +0.5;
            setTimeout(() => {
                const x = px - (Math.round(Math.random()* 80) - 40);
                const y = py - (Math.round(Math.random()* 80) - 40);
                const exp = scene.add.sprite(x, y, "Explosion").setScale(sc).play("fullExplosion");
                exp.once("animationcomplete", () => {
                    exp.destroy();
                    done++;
                    // if(done === max / 2) {
                    //     playerSprite.setVisible(false);
                    // }
                    playerSprite.setAlpha( 1 - (done * opacityPart));
                    if(done === max) {
                        destroyed = true;
                        playerSprite.destroy();
                        setTimeout(() => {
                            endLevel(scene);
                        }, 1000);
                        
                    }
                })
            }, 120 * sc * e);
            
            
            
        }
        

        
        // const exp1 = scene.sprite.add.sprite(config.x, config.y, "CrystalBall", null, { isSensor: true, ignoreGravity: true });
    }   

    function update(scene: GameLevelSceneInterface) {

        const status = playerData.getStatus();
        const pShape = playerData.getShape();

        if(destroyed) return;
        playerSprite.setVelocity(0);
        playerSprite.setAngularVelocity(0);
        // // console.log(scene.cameras.main.scrollX, playerSprite.x);

        if(status.alive) {
            playerSprite.setVelocityX(pShape.cameraSpeed);
            
            if (cursor.left.isDown) {
                playerSprite.setVelocityX((pShape.acceleration * -1) + pShape.cameraSpeed);
            } else if (cursor.right.isDown) {
                playerSprite.setVelocityX((pShape.acceleration));
            }
    
            if (cursor.up.isDown) {
                playerSprite.setVelocityY(pShape.acceleration * -1);
            } else if (cursor.down.isDown) {
                playerSprite.setVelocityY(pShape.acceleration);
            }
    
            if (keyA.isDown) {
                playerSprite.setAngularVelocity(pShape.rotationSpeed);
            }
    
            if (keyD.isDown) {
                playerSprite.setAngularVelocity(pShape.rotationSpeed * -1);
            }

            playerData.xPos = playerSprite.x;
        }
        
        
    }

    return {
        preload,
        create,
        update,
    };
}
