import { GameObject } from "../interfaces/GameObject";
import { playerData } from "../data/player";



interface BarOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    fillStyle: any;
}

interface BarObject extends GameObject{
    action: (action: string, data: any) =>  void;
}

export default function Bar(opts: BarOptions): BarObject {

    let bar: Phaser.GameObjects.Graphics;
    let rect: Phaser.Geom.Rectangle;
    



    function preload(scene: Phaser.Scene) { }
    function create(scene: Phaser.Scene) {

        rect = new Phaser.Geom.Rectangle(opts.x,opts.y,opts.width,opts.height);
        // const healthRect = new Phaser.Geom.Rectangle(x,y,w,h);

        bar = scene.add.graphics({ fillStyle: opts.fillStyle })
        // const healthBar = scene.add.graphics({ fillStyle: { color: 0xff0000, alpha: 0.7 } })
        bar.fillRectShape(rect);
        bar.setScrollFactor(0);

        // healthBar.fillRectShape(healthRect);
        // healthBar.setScrollFactor(0);
     }

    function update(scene: Phaser.Scene) { 
        
    }

    function action(action: string, data: any): void {
        switch(action) {
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
        fillStyle: { color: 0x000000, alpha: 0.5}
    });

    const health = Bar({
        x: 10,
        y: 10,
        width: 200,
        height: 40,
        fillStyle: { color: 0xff0000, alpha: 0.7}
    });

    function preload(scene: Phaser.Scene) {
        barBg.preload(scene);
        health.preload(scene);
     }
    function create(scene: Phaser.Scene) { 
        barBg.create(scene);
        health.create(scene);
    }
    function update(scene: Phaser.Scene) {
        
        if(oldHealth !== playerData.health) {
            const healthPerc = playerData.health / 100;
            oldHealth = playerData.health;
            if(playerData.health >= 0) {
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