
import 'phaser';
import { GameLevelSceneInterface } from './Level';

export interface GameObject {
    preload(scene: GameLevelSceneInterface): void;
    create(scene: GameLevelSceneInterface): void;
    update(scene:GameLevelSceneInterface, player?: Phaser.GameObjects.GameObject): void;
    obj?: Phaser.GameObjects.GameObject;
}