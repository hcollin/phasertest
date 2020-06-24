import { GameObject } from "../interfaces/GameObject";
import { playerData } from "../data/playerData";
import { GameLevelSceneInterface } from "../interfaces/Level";
import { LevelSceneInterface, GeneralObject, HudObject, HudSceneInterface, PlayerDataUpdate } from "../interfaces/Interfaces";
import Events from "../events";




interface BarOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    fillStyle: any;
}

interface BarObject extends HudObject {
    action: (action: string, data: any) => void;
}

export default function Bar(opts: BarOptions): BarObject {

    let bar: Phaser.GameObjects.Graphics;
    let rect: Phaser.Geom.Rectangle;

    function create(scene: HudSceneInterface) {
        rect = new Phaser.Geom.Rectangle(opts.x, opts.y, opts.width, opts.height);
        bar = scene.add.graphics({ fillStyle: opts.fillStyle })

        bar.fillRectShape(rect);
        bar.setScrollFactor(0);
    }

    function update(scene: HudSceneInterface) {

    }

    function action(action: string, data: any): void {
        switch (action) {
            case "rescale":
                bar.setScale(data[0], data[1]);
                break;
        }
    }

    return {
        create,
        update,
        action
    }
}

export function HealthBar(): HudObject {

    let oldHealth = 0;
    let shouldUpdate = false;
    
    let playerData: PlayerDataUpdate = {
        health: 100,
        points: 0,
    }

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

    
    function create(scene: HudSceneInterface) {
        barBg.create(scene);
        health.create(scene);
        
        Events.on<PlayerDataUpdate>("playerUpdate", (data: PlayerDataUpdate) => {
            playerData = {...data};
            shouldUpdate = true;

        });
    }


    function update(scene: HudSceneInterface) {
       
        if(shouldUpdate) {
            const healthPerc = playerData.health / 100;
            if (playerData.health >= 0) {
                health.action("rescale", [healthPerc, 1]);
            }
            shouldUpdate = false;
        }


        barBg.update(scene);
        health.update(scene);
    }

    return {
        create,
        update
    }

}