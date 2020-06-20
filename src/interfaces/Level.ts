import { DiamondConfig } from "../objects/Diamond";
import { WallConfig } from "../objects/obstacles/Wall";
import { GameObject } from "./GameObject";


export interface LevelObject {
    type: String;
    configs: any;
}

export interface GameLevelSceneSettings {
    id: string;
    diamonds: DiamondConfig[];
    walls: WallConfig[];
    objects: LevelObject[],
    startX?: number;
    startY?: number;
    finishLine: number;
    backgroundImage: string;
    backgroundMusic: string;
    atlasses: [string, string, string][];
}


export interface GameLevelSceneInterface extends Phaser.Scene {
    settings: GameLevelSceneSettings;
    player: GameObject; 
}
