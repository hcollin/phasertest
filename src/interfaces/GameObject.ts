
import 'phaser';

export interface GameObject {
    preload(scene: Phaser.Scene): void;
    create(scene:Phaser.Scene): void;
    update(scene:Phaser.Scene, player?: Phaser.GameObjects.GameObject): void;
    obj?: Phaser.GameObjects.GameObject;
}