import { GeneralObject, LevelSceneInterface, GameObjectType, SingleObjectConfiguration } from "../interfaces/Interfaces";

export default function FinishLine(config: SingleObjectConfiguration): GeneralObject {

    // let finishLine: Phaser.GameObjects.Rectangle[] = [];

    let finishLine: Phaser.GameObjects.Container;

    let endLevelCalled = false;

    function create(scene: LevelSceneInterface) {
        const x = config.x;
        const ch = scene.sys.canvas.height;
        let s = 0;
        finishLine = scene.add.container(x, 0);
        while (s < ch) {
            const b = scene.add.rectangle(0, s, 20, 50, 0x005500, 0.5)
            b.setScrollFactor(1);
            finishLine.add(b);
            s += 100;
        }
    }

    function update(scene: LevelSceneInterface) {

    }

    return {
        myType: GameObjectType.FINISHLINE,
        objectIsStatic: true,
        create,
        update
    }

}


export function createFinishLine(x: number): GeneralObject {
    const conf: SingleObjectConfiguration = {
        target: GameObjectType.FINISHLINE,
        x: x,
        y: 0,
    };
    return FinishLine(conf);
}