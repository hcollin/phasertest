import { levelZero } from "../levels/level0";
import { startLevel } from "../utils/levelUtils";

export default class LevelSelectorScene extends Phaser.Scene {

    private bgImage: Phaser.GameObjects.Image;

    private starting: boolean = false;

    private menuMusic: Phaser.Sound.BaseSound;

    private title: Phaser.GameObjects.Text;
    private clickText: Phaser.GameObjects.Text;

    constructor() {
        super('LevelSelector');
    }


    preload() {
        this.load.image("bg", "assets/stars.jpg");
    }

    create() {
        const cw = this.sys.canvas.width;
        const ch = this.sys.canvas.height;
        
        this.bgImage = this.add.image(0, 0, "bg");
        this.bgImage.setOrigin(0,0);
        
        this.title = this.add.text(cw/2, ch/2, this.game.config.gameTitle, { fill: "#BBDDFF"});
        this.title.setFontFamily("Arial Black");
        this.title.setFontSize(64);
        this.title.setOrigin(0.5, 0.5);
        this.title.setStroke("#000000", 8);

        this.menuMusic = this.sound.add("menumusic");

        this.clickText = this.add.text(cw/2, ch/2 + 100, "Click to start!", { fill: "#88AACC"});
        this.clickText.setFontFamily("Arial Black");
        this.clickText.setFontSize(24);
        this.clickText.setOrigin(0.5, 0.5);
        this.clickText.setStroke("#000000", 3);

        this.menuMusic.play({ loop: true, seek: 34.7, delay: 0.5});
        this.sound.volume = 1;


        
        this.input.once("pointerup", () => {
            this.starting = true;
            console.log("POINTER UP!");
            // startLevel(this, levelZero);
        });


    }

    update() {

        if(this.starting) {
            this.sound.volume -= 0.01;
            this.bgImage.setAlpha(this.bgImage.alpha - 0.01);
            this.title.setAlpha(this.title.alpha - 0.01);
            this.clickText.setAlpha(this.clickText.alpha - 0.01);


            if(this.sound.volume <= 0) {
                this.starting = false;
                this.sound.stopAll();
                this.sound.volume = 1;
                startLevel(this, levelZero);
            }
            

        }

    }
}
