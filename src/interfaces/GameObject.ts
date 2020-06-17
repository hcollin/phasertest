
import 'phaser';

export interface GameObject {
    preload(scene: Phaser.Scene): void;
    create(scene:Phaser.Scene): void;
    update(scene:Phaser.Scene): void;
}