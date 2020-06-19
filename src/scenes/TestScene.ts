import 'phaser';
import { GameObject } from '../interfaces/GameObject';
import Player from '../objects/Player';
import Background from '../objects/Background';
import Block from '../objects/obstacles/Block';
import Bar, { HealthBar } from '../objects/HealthBar';
import Wall, { WallConfig } from '../objects/obstacles/Wall';



const gameWalls: WallConfig[] = [
    { x: 700, y: 490, height: 800 },
    { x: 1000, y: 90, height: 20, width: 600 },
]


export default class TestScene extends Phaser.Scene {


    private player: GameObject;
    private bg: GameObject;
    private blocks: GameObject[] = [];
    private walls: GameObject[] = [];
    private xpos: number = 0;

    private bar: GameObject;

    constructor() {
        super('TestScene');
        this.player = Player();
        this.bg = Background("starsbg", "assets/stars.jpg");
        this.bar = HealthBar();
    }


    preload() {

        // this.matter.world.setBounds(0,0, 1440,800);

        this.bg.preload(this);
        this.player.preload(this);
        this.bar.preload(this);

        // for (let i = 0; i < 10; i++) {
        //     const b = Block(700 + (200 * i), Math.floor(Math.random() * 900), 2, 2);
        //     b.preload(this);
        //     this.blocks.push(b);
        // }
        const canvasH = this.sys.canvas.height;

        gameWalls.forEach(wconf => {
            const wall = Wall(wconf);
            wall.preload(this);
            this.walls.push(wall);
        });
    }

    create() {
        this.bg.create(this);
        this.player.create(this);
        this.bar.create(this);

        this.blocks.forEach((b: GameObject) => {
            b.create(this);
        });

        this.walls.forEach((w: GameObject) => {
            w.create(this);
        })



    }

    update() {

        this.cameras.main.scrollX = this.xpos;
        this.matter.world.setBounds(this.xpos, 0, this.cameras.main.width, this.cameras.main.height);

        this.bg.update(this);
        this.bar.update(this);

        this.player.update(this);

        this.blocks.forEach((b: GameObject) => {
            b.update(this);
        });

        this.walls.forEach((w: GameObject) => {
            w.update(this);
        })


        this.xpos += 1;

    }

}
