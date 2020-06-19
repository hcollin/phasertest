import LevelSelectorScene from "./LevelSelector";



export default class LoadingScreen extends Phaser.Scene {

    constructor() {
        super('LoadingScreen');
    }

    preload() {
        this.load.audio("menumusic", "assets/EscapismTheme.mp3");
        this.load.audio("plink", "assets/menuSelect.mp3");
    }


    create() {
        const cw = this.sys.canvas.width;
        const ch = this.sys.canvas.height;

        const loadingText = this.add.text(cw/2, ch/2, "Loading...", { fill: "#DDEEFF"});
        loadingText.setFontFamily("Arial Black");
        loadingText.setFontSize(64);
        loadingText.setOrigin(0.5, 0.5);
        loadingText.setStroke("#000000", 8);

        const plink = this.sound.add("plink", { loop: false });

        this.input.once("pointerup", () => {
            plink.play();
            
            
            this.scene.sendToBack();
            this.scene.setActive(false);
            this.scene.setVisible(false);
            this.scene.start("LevelSelector");

            
        });


    }

    update() {

    }

}