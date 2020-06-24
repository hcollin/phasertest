import { PlayerObject, GameObjectType, LevelSceneInterface, PlayerShapeObject, PlayerLevelStatus, LEVELSTATUS, DEPTHLEVEL, PlayerDataUpdate } from "../interfaces/Interfaces";
import UserConfigs from "../data/UserConfigs";
import collCategory from "./CollisionCategories";
import Events from "../events";


interface PlayerSoundEffects {
    shapeshift: Phaser.Sound.BaseSound|Phaser.Sound.WebAudioSound|Phaser.Sound.HTML5AudioSound|null;
    thrust: Phaser.Sound.BaseSound|Phaser.Sound.WebAudioSound|Phaser.Sound.HTML5AudioSound|null;
    rotate: Phaser.Sound.BaseSound|Phaser.Sound.WebAudioSound|Phaser.Sound.HTML5AudioSound|null;
    damage: Phaser.Sound.BaseSound|Phaser.Sound.WebAudioSound|Phaser.Sound.HTML5AudioSound|null;

}



export default function createPlayerObject(): PlayerObject {

    // Publicly available 
    let myType: GameObjectType = GameObjectType.PLAYER;
    let shape: PlayerShapeObject;


    // private values
    const objectIsStatic = false;
    let health: number = 100;
    let points: number = 0;
    const shapes: PlayerShapeObject[] = [shapeOne, shapeTwo];
    let currentShapeIndex: number = 0;

    // User control method handler
    let userControl: ControlInterface;

    // Current player sprite
    let sprite: Phaser.Physics.Matter.Sprite;

    // Sound Effects
    const soundEffects: PlayerSoundEffects = {
        shapeshift: null,
        thrust: null,
        rotate: null,
        damage: null,
    }

    function getStatus(): PlayerLevelStatus {

        return {
            health,
            shape,
            position: new Phaser.Geom.Point(sprite.x, sprite.y)
        }
    }

    function nextShape(scene: LevelSceneInterface) {
        currentShapeIndex++;
        if (currentShapeIndex >= shapes.length) {
            currentShapeIndex = 0;
        }
        console.log("NEXT SHAPE!", currentShapeIndex);
        if(soundEffects.shapeshift !== null) soundEffects.shapeshift.play();
        createShape(scene);
    }

    function prevShape(scene: LevelSceneInterface) {
        currentShapeIndex--;
        if (currentShapeIndex < 0) {
            currentShapeIndex = shapes.length - 1;
        }
        console.log("PREVIOUS SHAPE!", currentShapeIndex);
        if(soundEffects.shapeshift !== null) soundEffects.shapeshift.play();
        createShape(scene);
    }

    /**
     * Movement commands
     * @param direction 
     */
    function action(direction: string, scene: LevelSceneInterface) {

        switch (direction) {
            case "left":
                sprite.setVelocityX(shape.movementVelocity * -1);
                break;
            case "right":
                sprite.setVelocityX(shape.movementVelocity + shape.cameraSpeed);
                break;
            case "up":
                sprite.setVelocityY(shape.movementVelocity * -1);
                break;
            case "down":
                sprite.setVelocityY(shape.movementVelocity);
                break;
            case "rotateLeft":
                sprite.setAngularVelocity(shape.rotationVelocity * -1);
                break;
            case "rotateRight":
                sprite.setAngularVelocity(shape.rotationVelocity);
                break;
            case "prevShape":
                prevShape(scene);
                break;
            case "nextShape":
                nextShape(scene);
                break;
        }
    }

    function create(scene: LevelSceneInterface) {

        // createShape
        createShape(scene);

        // Create sound effects
        soundEffects.shapeshift = scene.sound.add("player-shape-shift", {loop: false, volume: 0.3, detune: 10});


        // Initialize user control method (Only KEYBOARD for now)
        if (UserConfigs.inputMethod === "KEYS") {
            userControl = createKeyboardInterface();
            userControl.create(scene);
        }

    }


    function update(scene: LevelSceneInterface, time?: number, delta?: number) {
        if(!sprite.active) {
            sprite.setActive(true);
        }
        // Reset velocity before adjusting it via controls
        if(scene.status === LEVELSTATUS.RUN) {
            sprite.setVelocity(shape.cameraSpeed || 1, 0);
        } else {
            sprite.setVelocity(0);
        }
        sprite.setAngularVelocity(0);

        // User Controls
        userControl.update(scene, time, delta);

    }

    function pause(scene: LevelSceneInterface) {
        console.log("PLAYER PAUSED");
        sprite.setActive(false);
        sprite.setVelocity(0);
        sprite.setAngularVelocity(0);
    }


    function createShape(scene: LevelSceneInterface) {
        shape = shapes[currentShapeIndex];

        const cx = sprite ? sprite.x : scene.settings.playerStartX;
        const cy = sprite ? sprite.y : scene.settings.playerStartY;
        const ca = sprite ? sprite.angle : 0;

        if (sprite) {
            sprite.destroy();
        }

        const mSetBConf: Phaser.Types.Physics.Matter.MatterSetBodyConfig = {
            type: "fromVerts",
            verts: shape.collisionPolygon,
            flagInternal: true
        };

        const mbConf: Phaser.Types.Physics.Matter.MatterBodyConfig = {
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
            density: 10,
            ignoreGravity: true,
            label: "PLAYER",
            shape: mSetBConf,
        };

        const plainSprite = scene.add.sprite(cx, cy, shape.spriteId);
        sprite = scene.matter.add.gameObject(plainSprite, mbConf) as Phaser.Physics.Matter.Sprite;


        sprite.setCollisionCategory(collCategory.Player);
        sprite.setDepth(DEPTHLEVEL.PLAYER);
        // sprite.setCollidesWith([collCategory.Enemy, collCategory.Pickup, collCategory.Static]); 
        
        // Collision Handler
        sprite.setOnCollide((e) => {
            console.log("PLAYER COLLISION!");
            health -= 1;
            const d: PlayerDataUpdate = {
                health,
                points,
            };
            Events.emit<PlayerDataUpdate>("playerUpdate", d);
        })
        // sprite.setOnCollideActive((e) => {
        //     console.log("ACTIVE COLLISION!", e);
        // })
        sprite.angle = ca;
        sprite.name = "PLAYER";

        console.log(sprite.toJSON());
    }

    return {
        objectIsStatic,
        myType,
        shape,
        update,
        create,
        pause,
        getStatus,
        action
    }
}



/**
 * Keyboard controller
 * 
 * This function creates provides the player an ability to control the sprite by using their keyboard
 * 
 * 
 * 
 */
function createKeyboardInterface(): ControlInterface {

    let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    let rotateLeft: Phaser.Input.Keyboard.Key;
    let rotateRight: Phaser.Input.Keyboard.Key;

    function create(scene: LevelSceneInterface) {
        // Initialize Keyboard cursor inputs
        cursors = scene.input.keyboard.createCursorKeys();

        rotateLeft = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        rotateRight = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);



        scene.input.keyboard.on("keyup-W", () => {
            scene.player.action("nextShape", scene);
        });

        scene.input.keyboard.on("keyup-S", () => {
            scene.player.action("prevShape", scene);
        });
    }

    function update(scene: LevelSceneInterface, time?: number, delta?: number) {

        if (cursors.right.isDown) {
            scene.player.action("right", scene);
        } else if (cursors.left.isDown) {
            scene.player.action("left", scene);
        }

        if (cursors.up.isDown) {
            scene.player.action("up", scene);
        } else if (cursors.down.isDown) {
            scene.player.action("down", scene);
        }

        if (rotateLeft.isDown) {
            scene.player.action("rotateLeft", scene);
        } else if (rotateRight.isDown) {
            scene.player.action("rotateRight", scene);
        }

    }

    return {
        type: "KEYS",
        create,
        update
    };
}



const shapeOne: PlayerShapeObject = {
    name: "Default Shape",
    cameraSpeed: 1,
    movementVelocity: 4,
    rotationVelocity: 0.05,
    collisionPolygon: '0, 0, 80, 0, 80, 80, 0, 80, 0, 0',
    // collisionPolygon: [
    //     new Phaser.Geom.Point(0, 0),
    //     new Phaser.Geom.Point(80, 0),
    //     new Phaser.Geom.Point(80, 80),
    //     new Phaser.Geom.Point(0, 80),
    //     new Phaser.Geom.Point(0, 0),
    // ],
    // collisionPolygon: [
    //     new Phaser.Math.Vector2(0, 0),
    //     new Phaser.Math.Vector2(80, 0),
    //     new Phaser.Math.Vector2(80, 80),
    //     new Phaser.Math.Vector2(0, 80),
    //     new Phaser.Math.Vector2(0, 0),
    // ],
    spriteId: "player-shape-one"
};

const shapeTwo: PlayerShapeObject = {
    name: "Second Shape",
    cameraSpeed: 3,
    movementVelocity: 1,
    rotationVelocity: 0.02,
    collisionPolygon: '0, 0, 160, 0, 160, 40, 0, 40, 0, 0',
    // collisionPolygon: [
    //     new Phaser.Math.Vector2(0, 0),
    //     new Phaser.Math.Vector2(160, 0),
    //     new Phaser.Math.Vector2(160, 40),
    //     new Phaser.Math.Vector2(0, 40),
    //     new Phaser.Math.Vector2(0, 0),
    // ],
    spriteId: "player-shape-two"
};

interface ControlInterface {
    type: "KEYS" | "PAD";
    create: (scene: LevelSceneInterface) => void;
    update: (scene: LevelSceneInterface, time?: number, delta?: number) => void;
}

// {
//     "type": "fromPhysicsEditor",
//     "label": "banana",
//     "isStatic": false,
//     "density": 0.1,
//     "restitution": 0.1,
//     "friction": 0.1,
//     "frictionAir": 0.01,
//     "frictionStatic": 0.5,
//     "collisionFilter": {
//         "group": 0,
//         "category": 1,
//         "mask": 255
//     },
//     "fixtures": [
//         {
//             "label": "banana-fixture",
//             "isSensor": false,
//             "vertices": [
//                 [ { "x":107, "y":2 }, { "x":95.26110076904297, "y":0.6820602416992188 }, { "x":89, "y":6 }, { "x":94.2380142211914, "y":23.872116088867188 }, { "x":104, "y":22 } ],
//                 [ { "x":4, "y":94 }, { "x":1, "y":105 }, { "x":23.985790252685547, "y":119.92895221710205 }, { "x":50, "y":128 }, { "x":27, "y":94 } ],
//                 [ { "x":27, "y":94 }, { "x":50, "y":128 }, { "x":79, "y":123 }, { "x":102, "y":110 }, { "x":51.83658981323242, "y":88.44049835205078 } ],
//                 [ { "x":51.83658981323242, "y":88.44049835205078 }, { "x":102, "y":110 }, { "x":118.56483459472656, "y":88.44049835205078 }, { "x":71, "y":77 } ],
//                 [ { "x":71, "y":77 }, { "x":118.56483459472656, "y":88.44049835205078 }, { "x":126, "y":66 }, { "x":123, "y":40 }, { "x":84.91651916503906, "y":58.429840087890625 } ],
//                 [ { "x":123, "y":40 }, { "x":104, "y":22 }, { "x":92, "y":39 }, { "x":84.91651916503906, "y":58.429840087890625 } ],
//                 [ { "x":94.2380142211914, "y":23.872116088867188 }, { "x":92, "y":39 }, { "x":104, "y":22 } ]
//             ]
//         }
//     ]
// }