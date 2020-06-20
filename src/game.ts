import 'phaser';

import LevelSelectorScene from './scenes/LevelSelector';
import LoadingScreen from './scenes/LoadingScreen';
import TestScene from './scenes/TestScene';
import { LEVEL_TestLevel } from './levels/testLevel';
import LevelScene from './scenes/LevelScene';

let w = 1440;
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    title: "BLOCKY TRIP",
    width: w,
    height: Math.round(w / 1.7777777),
    parent: "gameContainer",
    physics: {
        default: 'matter',
        matter: {
            debug: {
                showBody: true,
                showStaticBody: true,

                showBounds: false,
                
                
                showCollisions: true,
                
            },
            gravity: {
                x: 0,
                y: 0,
            }
        }
    },
    // scene: [LoadingScreen, LevelSelectorScene]
    // scene: TestScene
};


const game = new Phaser.Game(config);

game.scene.add(LEVEL_TestLevel.id, LevelScene, true, LEVEL_TestLevel);



