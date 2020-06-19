import { GameObject } from "../../interfaces/GameObject";

export interface WallConfig {
    x: number,
    y: number,
    height: number,
    width?: number
}

export default function Wall(conf: WallConfig): GameObject {

    let wall: MatterJS.BodyType;
    let rect: Phaser.GameObjects.Rectangle;

    function preload(scene: Phaser.Scene) { }
    function create(scene: Phaser.Scene) {

        rect = scene.add.rectangle(conf.x, conf.y, conf.width || 20 , conf.height, 0x998877);
        
        rect.setScrollFactor(1);

        wall = scene.matter.add.rectangle(conf.x, conf.y, conf.width || 20, conf.height, { isStatic: true, render: { fillColor: 0xFF0000 } })
        
        wall.type = "WALL";
        

    }
    function update(scene: Phaser.Scene) {
        // wall.setVelocity(0);
    }

    return {
        preload,
        create,
        update
    }
}