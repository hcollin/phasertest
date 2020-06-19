import { GameObject } from "../../interfaces/GameObject";
import { GameLevelSceneInterface } from "../../interfaces/Level";

export default function Block(x: number, y: number, w: number, h: number): GameObject {

    let block: Phaser.GameObjects.GameObject;
    let graphs;

    function preload(scene: GameLevelSceneInterface) {
        scene.load.image("obstacle", "assets/obstacle.png");
    }

    function create(scene: GameLevelSceneInterface) {
        block = scene.matter.add.image(x, y, 'obstacle').setStatic(true);
    }

    function update(scene: GameLevelSceneInterface) {

        
    }

    return {
        preload,
        create,
        update,
    }
}