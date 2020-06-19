import { GameObject } from "../interfaces/GameObject";
import { GameLevelSceneInterface } from "../interfaces/Level";

export default function (name: string, filePathName: string): GameObject {


    let restartPoint = 0;

    let bg1: Phaser.GameObjects.Image;
    let bg2: Phaser.GameObjects.Image;

    let speed = 1;
    let counter = 2;
    
    let spriteSize = 0;

    function preload(scene: GameLevelSceneInterface) {
        scene.load.image(name, filePathName);
    }

    function create(scene: GameLevelSceneInterface) {
        bg1 = scene.add.image(0, 0, name).setOrigin(0);
        bg2 = scene.add.image(bg1.width, 0, name).setOrigin(0).setFlipX(true);
        // const bg3 = scene.add.image(bg1.width*2, 0, name).setOrigin(0);
        spriteSize = bg1.width;
        bg1.setScrollFactor(1);
        bg2.setScrollFactor(1);
        bg1.setAlpha(0.6);
        bg2.setAlpha(0.6);
        
        restartPoint = bg1.width;
    }

    function update(scene: GameLevelSceneInterface) {
        if (scene.cameras.main.scrollX >= restartPoint) {
            console.log("Next bg ", counter,);
            // const bg = scene.add.image((spriteSize) * counter, 0, name).setOrigin(0).setFlipX(counter % 2 !== 0);
            
            if(counter % 2 === 0) {
                bg1.x = counter * bg1.width;
            } else {
                bg2.x = counter * bg2.width;
            }

            restartPoint = bg1.width * counter;
            counter++;
            
        }
    }


    return {
        preload,
        create,
        update
    };

}