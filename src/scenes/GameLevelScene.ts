import 'phaser';
import { GameObject } from '../interfaces/GameObject';
import FinishLine from '../objects/FinishLine';
import Player from '../objects/Player';

import Background from '../objects/Background';
import { HealthBar } from '../objects/HealthBar';
import Wall from '../objects/obstacles/Wall';
import { playerData } from '../data/playerData';
import Diamond from '../objects/Diamond';
import Points from '../objects/Points';
import { GameLevelSceneSettings, GameLevelSceneInterface } from '../interfaces/Level';



export default class GameLevelScene extends Phaser.Scene implements GameLevelSceneInterface {

    public settings: GameLevelSceneSettings;
    public player: GameObject;

    private bg: GameObject;

    private mySceneObjects: GameObject[] = [];

    private xpos: number = 0;
    private healthBar: GameObject;

    private music: Phaser.Sound.BaseSound;

    private finishLine: GameObject;
    private started = false;

    constructor(levelSettings: GameLevelSceneSettings) {
        super("activeLevel");
    }

    init(configs: GameLevelSceneSettings) {
        this.bg = Background("background", configs.backgroundImage);
        this.healthBar = HealthBar();
        this.finishLine = FinishLine(configs.finishLine);
        this.player = Player();


        this.settings = configs;
    }



    preload() {

        this.load.audio('bgmusic', this.settings.backgroundMusic);
        

        this.settings.atlasses.forEach((atConf: [string, string, string]) => {
            this.load.atlas(atConf[0], atConf[1], atConf[2]);
        });

        this.bg.preload(this);
        this.player.preload(this);
        this.healthBar.preload(this);

        this.finishLine.preload(this);

        const canvasH = this.sys.canvas.height;

        this.settings.walls.forEach(wconf => {
            const wall = Wall(wconf);
            wall.preload(this);
            this.mySceneObjects.push(wall);
        });

        this.settings.diamonds.forEach(dconf => {
            const dia = Diamond(dconf);
            dia.preload(this);
            this.mySceneObjects.push(dia);
        });

        const points = Points();
        this.mySceneObjects.push(points);

    }

    create() {
        this.sound.pauseOnBlur = false;

        this.bg.create(this);
        this.player.create(this);
        this.healthBar.create(this);

        this.finishLine.create(this);

        this.mySceneObjects.forEach((w: GameObject) => {
            w.create(this);
        });


        let text = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "CLICK TO START!", { font: '32px Arial', fill: '#00ff00' });
        text.setOrigin(0.5, 0.5);
        this.music = this.sound.add('bgmusic', {loop: true});

        
        playerData.reset();
        this.sound.stopAll();
        
        this.music.play();

        this.started = true;
        text.destroy();
       
    }

    update() {
        if (this.started) {

            const status = playerData.getStatus();
            
            // Do not move the camera if player is dead.
            if(status.health > 0) {
                this.cameras.main.scrollX = this.xpos;
            }
            
            this.matter.world.setBounds(this.xpos, 0, this.cameras.main.width, this.cameras.main.height);

            this.bg.update(this);
            this.healthBar.update(this);
            this.finishLine.update(this);

            this.player.update(this);

            this.mySceneObjects.forEach((w: GameObject) => {
                w.update(this);
            });


            const pShape = playerData.getShape();

            this.xpos += pShape.cameraSpeed || 1;

        } else {

        }

    }

}
