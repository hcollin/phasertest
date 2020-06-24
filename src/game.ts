import 'phaser';

// import LevelSelectorScene from './scenes/LevelSelector';
// import LoadingScreen from './scenes/LoadingScreen';
// import TestScene from './scenes/TestScene';
import { LEVEL_TestLevel } from './levels/testLevel';
import LevelScene from './scenes/LevelScene';
import HudScene from './scenes/HudScene';

// import { LEVEL_DungeonLevel } from './levels/dungeonlevel';

const w = 1440;
const h = Math.round(1440 / 1.7777777);

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    title: "BLOCKY TRIP",
    width: 1440,
    height: 32*25,
    parent: "gameContainer",
    physics: {
        default: 'matter',
        matter: {
            debug: {
                showBody: true,
                showStaticBody: true,

                // showBounds: true,


                
                showCollisions: true,
                
            },
            gravity: {
                x: 0,
                y: 0,
            }
        }
    },
    // scene: [LoadingScreen, LevelSelectorScene]
    // scene: [HudScene]
};


const game = new Phaser.Game(config);

// game.scene.add(LEVEL_DungeonLevel.id, LevelScene, true, LEVEL_DungeonLevel);
game.scene.add(LEVEL_TestLevel.id, LevelScene, true, LEVEL_TestLevel);
game.scene.add("HudScene", HudScene, true, {levelId: LEVEL_TestLevel.id});



