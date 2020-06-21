import { SingleObjectConfiguration, GeneralObject, LevelSceneInterface, GameObjectType, StaticObject } from "../interfaces/Interfaces";


interface MatterGameObject extends Phaser.GameObjects.GameObject, Phaser.Physics.Matter.Components.Bounce, Phaser.Physics.Matter.Components.Collision, Phaser.Physics.Matter.Components.Friction, Phaser.Physics.Matter.Components.Gravity, Phaser.Physics.Matter.Components.Mass, Phaser.Physics.Matter.Components.Sensor, Phaser.Physics.Matter.Components.Sleep, Phaser.Physics.Matter.Components.Static {

}


export default function Wall(config: SingleObjectConfiguration): StaticObject {

    const myType: GameObjectType = GameObjectType.WALL;
    const objectIsStatic = true;

    let wall: MatterGameObject;

    function create(scene: LevelSceneInterface) {

        console.log("Create wall!", config);

        const w = config.config.width || 32;
        const h = config.config.height || 32;

        const tileSprite = scene.add.tileSprite(config.x, config.y, w, h, "wall-blue").setOrigin(0,0).setDisplayOrigin(0,0);

        const mbConf: Phaser.Types.Physics.Matter.MatterBodyConfig = {
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
            density: 60,
            ignoreGravity: true,
            label: "WALL",
            isStatic: true,
        };


        wall = scene.matter.add.gameObject(tileSprite, mbConf) as MatterGameObject;
        
        

    }
    function update(scene: LevelSceneInterface, time?: number, delta?: number) {

    }


    return {
        myType,
        objectIsStatic,
        create,
        update
    }

}