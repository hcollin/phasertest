import { PickupObject, LevelSceneInterface, GameObjectType, SingleObjectConfiguration, DEPTHLEVEL } from "../interfaces/Interfaces";
import collCategory from "./CollisionCategories";


let crystalIdCounter: number = 0;

export default function Crystal(config: SingleObjectConfiguration): PickupObject {
    const myType: GameObjectType = GameObjectType.CRYSTAL;
    const objectIsStatic = false;

    let sprite: Phaser.Physics.Matter.Sprite;

    let pickedUp: boolean = false;

    let vel = -1;
    let dir = 1;

    const name = `Crystal ${crystalIdCounter++}`;

    function create(scene: LevelSceneInterface) {

        const pickup = scene.sound.add("crystal-pickup", {loop: false});

        scene.anims.create({ key: 'pickup-crystal-animation', frames: scene.anims.generateFrameNames('pickup-crystal'), repeat: -1 });
        sprite = scene.matter.add.sprite(config.x, config.y, "pickup-crystal", null, { isSensor: true, ignoreGravity: true, shape: { type: "circle", radius: 24} });
        
        sprite.play('pickup-crystal-animation');
        sprite.setName(name);
        sprite.setCollisionCategory(collCategory.Pickup);
        sprite.setCollidesWith([collCategory.Static]);
        sprite.setDepth(DEPTHLEVEL.BOOSTERS);
        // sprite.setCollisionGroup(CollisionCategory.Pickup);
              

        sprite.setOnCollide((e) => {
            console.log("Crystal Collision", name, e);
            pickup.play();
            pickedUp = true;
            sprite.destroy();
            
        });
    }

    function update(scene: LevelSceneInterface) {
        if(sprite && !pickedUp) {
            sprite.setVelocityY(vel);
            vel += dir * 0.1;
            if (vel >= 1) { dir = -1 };
            if (vel <= -1) { dir = 1 };
        }
    }

    function pause(scene: LevelSceneInterface) {
        if(sprite) {
            sprite.setVelocity(0);
        }
    }


    return { 
        myType,
        objectIsStatic,
        create,
        update,
        pause

    };
}