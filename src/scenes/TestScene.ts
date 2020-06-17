import 'phaser';
import { GameObject } from '../interfaces/GameObject';
import Player from '../objects/Player';
import Background from '../objects/Background';
import Block from '../objects/Block';




export default class TestScene extends Phaser.Scene {

    
    private player: GameObject;
    private bg: GameObject;

    private blocks: GameObject[] = [];

    private xpos: number = 0;

    constructor() {
        super('TestScene');
        this.player = Player();
        this.bg = Background("starsbg", "assets/stars.jpg");
    }


    preload() {

        // this.matter.world.setBounds(0,0, 1440,800);

        this.bg.preload(this);
        this.player.preload(this);
        
        for(let i = 0; i < 10; i++) {
            const b = Block(700 + ( 200*i), Math.floor(Math.random() * 900), 100, 300);
            b.preload(this);
            this.blocks.push(b);
            
        }

    }

    create() {
        this.bg.create(this);
        this.player.create(this);

        
        this.blocks.forEach((b: GameObject) => {
            b.create(this);
        })

        

    }

    update() {
        
        this.cameras.main.scrollX = this.xpos;
        this.matter.world.setBounds(this.xpos, 0, this.cameras.main.width, this.cameras.main.height);

        this.bg.update(this);
        

        this.player.update(this);

        this.blocks.forEach((b: GameObject) => {
            b.update(this);
        });



        this.xpos += 1;
        
    }

}