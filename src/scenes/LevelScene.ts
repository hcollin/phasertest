import { LevelSceneInterface, LevelConfiguration, PlayerObject, GeneralObject, AssetConfiguration, AssetType, AtlasAssetConfiguration } from "../interfaces/Interfaces";
import { TEXT_Massive } from "../textStyles/textStyles";





export default class LevelScene extends Phaser.Scene implements LevelSceneInterface {

    private settings: LevelConfiguration;

    private player: PlayerObject;
    private objects: GeneralObject[] = [];


    private loading: boolean = false;

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
        this.loading = true;
        const loadingText = this.add.text(center[0], center[1] + 10, "Loading Level...", TEXT_Massive).setOrigin(0.5, 0.5);
        loadingText.setAlpha(1);
        const tween = this.tweens.add({
            targets: loadingText,
            loop: 50,
            yoyo: true,
            y: center[1] - 10,
            duration: 1000,
            ease: "Sine.easeInOut"
        });

        const fadeTween = this.tweens.create({
            targets: loadingText,
            alpha: 0,
            duration: 700,
            ease: "Power2",
            delay: 300
        });

        this.load.on("complete", () => {
            loadingText.setText("READY!");
            this.tweens.makeActive(fadeTween);

            setTimeout(() => {
                loadingText.destroy();
                tween.complete();
                fadeTween.complete();
                this.loading = false;
            }, 1000);
        });

        this.settings.assets.forEach((asset: AssetConfiguration) => {
            console.log("ASSET!", asset);
            
            switch(asset.type) {
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

    }

    update() {

    }
}


function getCanvasCenter(scene: Phaser.Scene): [number, number] {
    return [ scene.sys.canvas.width /2, scene.sys.canvas.height / 2];
}