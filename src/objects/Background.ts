import { GameObject } from "../interfaces/GameObject";



export default function (name: string, filePathName: string): GameObject {


    let restartPoint = 0;

    let bg1;
    let bg2;

    let speed = 1;
    let counter = 2;
    

    let spriteSize = 0;

    function preload(scene: Phaser.Scene) {
        scene.load.image(name, filePathName);
    }


    function create(scene: Phaser.Scene) {
        bg1 = scene.add.image(0, 0, name).setOrigin(0);
        bg2 = scene.add.image(bg1.width, 0, name).setOrigin(0).setFlipX(true);
        // const bg3 = scene.add.image(bg1.width*2, 0, name).setOrigin(0);
        spriteSize = bg1.width;
        bg1.setScrollFactor(speed);
        bg2.setScrollFactor(speed);
        restartPoint = bg1.width;
    }


    function update(scene: Phaser.Scene) {
        if (scene.cameras.main.scrollX === restartPoint) {
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