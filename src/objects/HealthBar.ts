import { GameObject } from "../interfaces/GameObject";
import { playerData } from "../data/playerData";
import { GameLevelSceneInterface } from "../interfaces/Level";




interface BarOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    fillStyle: any;
}

interface BarObject extends GameObject {
    action: (action: string, data: any) => void;
}

export default function Bar(opts: BarOptions): BarObject {

    let bar: Phaser.GameObjects.Graphics;
    let rect: Phaser.Geom.Rectangle;

    function preload(scene: GameLevelSceneInterface) { }

    function create(scene: GameLevelSceneInterface) {
        rect = new Phaser.Geom.Rectangle(opts.x, opts.y, opts.width, opts.height);
        bar = scene.add.graphics({ fillStyle: opts.fillStyle })
        
        bar.fillRectShape(rect);
        bar.setScrollFactor(0);
    }

    function update(scene: GameLevelSceneInterface) {

    }

    function action(action: string, data: any): void {
        switch (action) {
            case "rescale":
                bar.setScale(data[0], data[1]);
                break;
        }
    }

    return {
        preload,
        create,
        update,
        action
    }
}

export function HealthBar(): GameObject {

    let oldHealth = 0;
    const barBg = Bar({
        x: 8,
        y: 8,
        width: 204,
        height: 44,
        fillStyle: { color: 0x000000, alpha: 0.5 }
    });

    const health = Bar({
        x: 10,
        y: 10,
        width: 200,
        height: 40,
        fillStyle: { color: 0xff0000, alpha: 0.7 }
    });

    function preload(scene: GameLevelSceneInterface) {
        barBg.preload(scene);
        health.preload(scene);
    }
    function create(scene: GameLevelSceneInterface) {
        barBg.create(scene);
        health.create(scene);
    }


    function update(scene: GameLevelSceneInterface) {
        const status = playerData.getStatus();
        if (oldHealth !== status.health) {
            const healthPerc = status.health / 100;
            oldHealth = status.health;
            if (status.health >= 0) {
                health.action("rescale", [healthPerc, 1]);
            }
        }



        barBg.update(scene);
        health.update(scene);



    }

    return {
        preload,
        create,
        update
    }

}