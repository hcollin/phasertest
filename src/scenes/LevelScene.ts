import { LevelSceneInterface, LevelConfiguration, PlayerObject, GeneralObject, AssetConfiguration, AssetType, AtlasAssetConfiguration, BackgroundImageConfiguration, BackgroundImage, DEPTHLEVEL, LEVELSTATUS } from "../interfaces/Interfaces";
import { TEXT_Massive } from "../textStyles/textStyles";
import UserConfigs from "../data/UserConfigs";
import createPlayerObject from "../objects/PlayerObject";

export default class LevelScene extends Phaser.Scene implements LevelSceneInterface {

    public settings: LevelConfiguration;

    public player: PlayerObject;
    private objects: GeneralObject[] = [];

    private backgrounds: BackgroundImage[] = [];
    private music: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

    public status: LEVELSTATUS = LEVELSTATUS.INIT;
    private previousStatus: LEVELSTATUS;
    private messageText: Phaser.GameObjects.Text;


    public position: number = 0;

    constructor(id: string) {
        super(id);
    }

    init(configuration: LevelConfiguration) {
        this.settings = configuration;
        console.log("INIT", configuration);
    }

    /**
     * Load all assets and show loading text
     */
    preload() {
        console.log("PRELOAD", this.settings);
        const center = getCanvasCenter(this);
        this.status = LEVELSTATUS.LOAD;

        // Message Text
        this.messageText = this.add.text(center[0], center[1] + 10, "Loading Level...", TEXT_Massive).setOrigin(0.5, 0.5);
        this.messageText.setAlpha(1);
        this.messageText.setDepth(DEPTHLEVEL.MESSAGE);
        this.messageText.setScrollFactor(0);
        const tween = this.tweens.add({
            targets: this.messageText,
            loop: 2,
            yoyo: true,
            y: center[1] - 10,
            duration: 1000,
            ease: "Sine.easeInOut"
        });


        this.load.on("complete", () => {
            tween.complete();
            this.messageText.setText("Click to start!");
            this.status = LEVELSTATUS.READY;
        });

        this.settings.assets.forEach((asset: AssetConfiguration) => {

            switch (asset.type) {
                case AssetType.IMAGE:
                    this.load.image(asset.id, asset.filename);
                    break;
                case AssetType.AUDIO:
                    this.load.audio(asset.id, asset.filename);
                    break;
                case AssetType.ATLAS:
                    const atlasAsset = asset as AtlasAssetConfiguration;
                    this.load.atlas(atlasAsset.id, atlasAsset.filename, atlasAsset.json);
                    break;
                default:
                    console.warn(`Asset type ${asset.type} is unknown!`, asset);
                    break;
            }
        });
    }

    create() {

        this.matter.world.setBounds();

        // Background music track
        this.music = this.sound.add(this.settings.backgroundMusic, { loop: true });
        this.sound.volume = UserConfigs.mainVolume;
        this.sound.pauseOnBlur = false;


        // Background images
        this.settings.backgroundImages.forEach((bgconf: BackgroundImageConfiguration) => {
            const bg = createBackgroundImage(bgconf);
            bg.create(this);
            this.backgrounds.push(bg);
        });


        // Player
        this.player = createPlayerObject();
        this.player.create(this);


        
        console.log("WORLD WALLS", this.matter.world.walls);

        // Fade the message out.
        const fadeTween = this.tweens.create({
            targets: this.messageText,
            alpha: 0,
            duration: 500,
            ease: "Power2",
        });


        const start = () => {
            if (this.status === LEVELSTATUS.READY) {
                this.tweens.makeActive(fadeTween);
                this.status = LEVELSTATUS.RUN;
                this.music.play();
            }
        }


        // Start either with key up or with pointerclick
        this.input.once("pointerup", () => {
            start();
        });

        this.input.keyboard.once("keydown", () => {
            start();
        })


        // Pause functionality
        this.input.keyboard.on("keyup-P", () => {
            if (this.status === LEVELSTATUS.PAUSED) {
                
                this.status = this.previousStatus;
                this.sound.resumeAll();
                this.messageText.setVisible(false);
            } else {
                const nstat = this.status;
                this.previousStatus = nstat;
                this.status = LEVELSTATUS.PAUSED;
                this.sound.pauseAll();
                this.messageText.setText("PAUSED!");
                this.messageText.setVisible(true);
                this.messageText.setAlpha(1);   // If message was faded to alpha 0 before, set it to 1.
            }
        });

        // Sound mutiong with key M
        this.input.keyboard.on("keyup-M", () => {
            if(this.status !== LEVELSTATUS.PAUSED) {
                if(this.sound.volume === 0) {
                    this.sound.volume = UserConfigs.mainVolume;
                } else {
                    this.sound.volume = 0;
                }
            }
        })


    }

    update(time: number, delta: number) {
        if (this.status === LEVELSTATUS.RUN || this.status === LEVELSTATUS.HOLD) {

            
            // Update camera position
            if (this.status !== LEVELSTATUS.HOLD) {
                // Move camera
                this.cameras.main.scrollX = this.position;

                // Set new world bounds based on the camera
                this.matter.world.setBounds(this.position, 0, this.cameras.main.width, this.cameras.main.height, 64, true, true, true, true);
            }


            // Update backgrounds
            this.backgrounds.forEach((bg: BackgroundImage) => {
                bg.update(this);
            });

            // Update Player
            this.player.update(this, time, delta);

            const playerStatus = this.player.getStatus();
            // Move position forward by whatever speed is necessary
            if (this.status !== LEVELSTATUS.HOLD) this.position += playerStatus.shape?.cameraSpeed || 1;
        }
    }
}



function createBackgroundImage(config: BackgroundImageConfiguration): BackgroundImage {

    let paused = false;

    let background: Phaser.GameObjects.Image;
    let background2: Phaser.GameObjects.Image;

    let restartPoint: number = 0;

    let counter: number = 2;

    function create(scene: Phaser.Scene) {
        background = scene.add.image(0, 0, config.assetId).setOrigin(0);
        background2 = scene.add.image(background.width, 0, config.assetId).setOrigin(0).setFlipX(true);
        background.setDepth(config.depth);
        background2.setDepth(config.depth);

        background.setScrollFactor(config.speed);
        background2.setScrollFactor(config.speed);
        background.setAlpha(config.opacity);
        background2.setAlpha(config.opacity);

        restartPoint = background.width;
    }

    function update(scene: Phaser.Scene) {
        if (scene.cameras.main.scrollX >= restartPoint) {
            if (counter % 2 === 0) {
                background.x = counter * background.width;
            } else {
                background2.x = counter * background2.width;
            }

            restartPoint = background.width * counter;
            counter++;
        }
    }

    function pause() {
        paused = true;
    }

    function resume() {
        paused = false;
    }

    return {
        create,
        update,
        pause,
        resume
    };


}




function getCanvasCenter(scene: Phaser.Scene): [number, number] {
    return [scene.sys.canvas.width / 2, scene.sys.canvas.height / 2];
}