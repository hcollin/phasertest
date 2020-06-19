import 'phaser';

import TestScene from './scenes/TestScene';

// export default class Demo extends Phaser.Scene {
//     constructor() {
//         super('demo');
//     }

//     preload() {
//         this.load.image('logo', 'assets/phaser3-logo.png');
//         this.load.image('libs', 'assets/libs.png');
//         this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
//         this.load.glsl('stars', 'assets/starfields.glsl.js');
//     }

//     create() {
//         this.add.shader('RGB Shift Field', 0, 0, 800, 600).setOrigin(0);
//         this.add.shader('Plasma', 0, 412, 800, 172).setOrigin(0);
//         this.add.image(400, 300, 'libs');
//         const logo = this.add.image(400, 70, 'logo');

//         this.tweens.add({
//             targets: logo,
//             y: 350,
//             duration: 1500,
//             ease: 'Sine.inOut',
//             yoyo: true,
//             repeat: -1
//         })
//     }
// }

let w = 1440;
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
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
    scene: TestScene
};

const game = new Phaser.Game(config);


