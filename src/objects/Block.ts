import { GameObject } from "../interfaces/GameObject";


export default function Block(x: number, y: number, w: number, h: number): GameObject {

    let block;
    let graphs;

    function preload(scene: Phaser.Scene) {
        scene.load.image("obstacle", "assets/obstacle.png");
    }
    function create(scene: Phaser.Scene) {
        block = scene.matter.add.image(x, y, 'obstacle').setStatic(true);

    }
    function update(scene: Phaser.Scene) {




    }

    return {
        preload,
        create,
        update,
    }
}