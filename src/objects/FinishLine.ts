import { GameObject } from "../interfaces/GameObject";
import { playerData } from "../data/playerData";
import { GameLevelSceneInterface } from "../interfaces/Level";
import endLevel from "../utils/endLevel";

export default function FinishLine(x: number): GameObject {


    let finishLine: Phaser.GameObjects.Rectangle[] = [];

    let endLevelCalled = false;

    function preload(scene: GameLevelSceneInterface) {

    }

    function create(scene: GameLevelSceneInterface) {
        const ch = scene.sys.canvas.height;
        let s = 0;
        while (s < ch) {
            const b = scene.add.rectangle(x, s, 20, 50, 0x005500, 0.5)
            b.setScrollFactor(1);
            finishLine.push(b);
            s += 100;
        }
    }

    function update(scene: GameLevelSceneInterface) {

        if (playerData.xPos > x && !endLevelCalled) {
            endLevelCalled = true;
            endLevel(scene);
        }

    }

    return {
        preload,
        create,
        update,
    }

}