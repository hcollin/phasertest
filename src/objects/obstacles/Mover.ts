import { GameObject } from "../../interfaces/GameObject";
import { GameLevelSceneInterface } from "../../interfaces/Level";

export interface MoverConfig {
    x: number;
    y: number;
}

export default function Mover(conf: MoverConfig): GameObject {

    function preload(scene: GameLevelSceneInterface) { }
    function create(scene: GameLevelSceneInterface) { }
    function update(scene: GameLevelSceneInterface) { }

    return {
        preload,
        create,
        update,
    }
}