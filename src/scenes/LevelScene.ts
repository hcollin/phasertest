import { LevelSceneInterface, LevelConfiguration, PlayerObject, GeneralObject, AssetConfiguration, AssetType, AtlasAssetConfiguration, BackgroundImageConfiguration, BackgroundImage, DEPTHLEVEL, LEVELSTATUS, ObjectConfiguration, ObjectType, MovingObject, SingleObjectConfiguration, GameObjectType, TileMapConfiguration } from "../interfaces/Interfaces";
import { TEXT_Massive } from "../textStyles/textStyles";
import UserConfigs from "../data/UserConfigs";
import createPlayerObject from "../objects/PlayerObject";
import Crystal from "../objects/Crystal";
import objectBuilder from "../objects/objectBuilder";
import collCategory from "../objects/CollisionCategories";
import { createFinishLine } from "../objects/FinishLine";

interface tilenMapObject {
    map: Phaser.Tilemaps.Tilemap,
    tiles: Phaser.Tilemaps.Tileset[],
    layers: (Phaser.Tilemaps.StaticTilemapLayer | Phaser.Tilemaps.DynamicTilemapLayer)[],
};



export default class LevelScene extends Phaser.Scene implements LevelSceneInterface {

    public settings: LevelConfiguration;

    public player: PlayerObject;
    private objects: GeneralObject[] = [];

    private backgrounds: BackgroundImage[] = [];
    private music: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

    public status: LEVELSTATUS = LEVELSTATUS.INIT;
    private previousStatus: LEVELSTATUS;
    private messageText: Phaser.GameObjects.Text;

    private tilemaps = [];

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
        collCategory.init(this);
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
                case AssetType.TILEMAPJSON:
                    this.load.tilemapTiledJSON(asset.id, asset.json);
                    break;
                default:
                    console.warn(`Asset is unknown!`, asset);
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


        // Tilemap
        this.settings.tilemaps.forEach((tm: TileMapConfiguration) => {
            const map = this.make.tilemap({
                key: tm.tilemap,
            });
            
            const tilesets: Phaser.Tilemaps.Tileset[] = map.tilesets.map((tl: Phaser.Tilemaps.Tileset) => {
                const tiles = map.addTilesetImage('DungeonTileSet', 'dungeon-tiles');
                return tiles;
            })
            
            
            parseTileSetProperties(map.tilesets);

            const layers = map.layers.map((layer: Phaser.Tilemaps.LayerData, index: number) => {

                const layerProperties = parseTileMapLayerProperties(layer);

                if (layerProperties.get("dynamic") === true) {
                    const layer: Phaser.Tilemaps.DynamicTilemapLayer = map.createDynamicLayer(index, tilesets, 0, 0);
                    
                    if (layerProperties.get("collisionAll") === true) {
                        map.setCollisionByExclusion([-1, 0]);
                        this.matter.world.convertTilemapLayer(layer);
                    }
                    return layer;
                } else {
                    return map.createStaticLayer(index, tilesets, 0, 0);
                }

            });

            const tileMap: tilenMapObject = {
                map,
                tiles: tilesets,
                layers,
            }
            this.tilemaps.push(tileMap);
        });        



        // Player
        this.player = createPlayerObject();
        this.player.create(this);

        // Objects
        this.settings.objects.forEach((objConf: ObjectConfiguration) => {
            const objs = objectBuilder(objConf);
            if (objs !== null) {
                objs.forEach((o: GeneralObject) => {
                    o.create(this);
                    this.objects.push(o);
                });
            }
        })

        // Finish Line
        const finish = createFinishLine(this.settings.finishLine);
        finish.create(this);
        this.objects.push(finish);



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

                //TODO: Player causes a type error when pausing
                // This happens when the program has been running for a while
                const nstat = this.status;
                this.previousStatus = nstat;
                this.status = LEVELSTATUS.PAUSED;
                this.sound.pauseAll();
                this.messageText.setText("PAUSED!");
                this.messageText.setVisible(true);
                this.messageText.setAlpha(1);   // If message was faded to alpha 0 before, set it to 1.

                this.objects.forEach((obj: GeneralObject) => {
                    if (!obj.objectIsStatic) {
                        (obj as MovingObject).pause(this);
                    }
                });
                this.player.pause(this);

            }
        });

        // Sound mutiong with key M
        this.input.keyboard.on("keyup-M", () => {
            if (this.status !== LEVELSTATUS.PAUSED) {
                if (this.sound.volume === 0) {
                    this.sound.volume = UserConfigs.mainVolume;
                } else {
                    this.sound.volume = 0;
                }
            }
        });
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


            // Update objects
            this.objects.forEach((obj: GeneralObject) => {
                obj.update(this, time, delta);
            });

            // Update Player
            this.player.update(this, time, delta);

            const playerStatus = this.player.getStatus();

            // Check if player has passed the finishline
            if (playerStatus.position.x >= this.settings.finishLine + 40) {
                this.victory();
            }


            // Move position forward by whatever speed is necessary
            if (this.status !== LEVELSTATUS.HOLD) this.position += playerStatus.shape?.cameraSpeed || 1;
        }
    }

    victory() {
        this.status = LEVELSTATUS.END;
        this.player.pause(this);
        this.messageText.setAlpha(1);
        this.messageText.setText("VICTORY");
        this.messageText.setVisible(true);
        this.music.stop();
    }
}



function createBackgroundImage(config: BackgroundImageConfiguration): BackgroundImage {

    let paused = false;


    let bg: Phaser.GameObjects.TileSprite;

    let bgImages: Phaser.GameObjects.Image[] = [];

    let background: Phaser.GameObjects.Image;
    let background2: Phaser.GameObjects.Image;

    let restartPoint: number = 0;

    let counter: number = 2;

    function create(scene: LevelSceneInterface) {
        const x = config.x !== undefined ? config.x : 0;
        const y = config.y !== undefined ? config.y : 0;
        const w = config.width !== undefined ? config.width : scene.sys.canvas.width;
        const h = config.height !== undefined ? config.height : scene.sys.canvas.height;


        bg = scene.add.tileSprite(x, y, w, h, config.assetId).setOrigin(0, 0);
        bg.setAlpha(config.opacity);
        bg.setScrollFactor(config.speed);
        if (config.tint !== undefined) {
            if (Array.isArray(config.tint)) {
                bg.setTint(config.tint[0], config.tint[1], config.tint[2], config.tint[3]);
            } else {
                bg.setTint(config.tint);
            }
        }

        config.scale && bg.setTileScale(config.scale);
    }

    function update(scene: Phaser.Scene) {

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


interface TiledPropertyObject {
    name: string;
    type: string;
    value: any;
}


function parseTileMapLayerProperties(layer: Phaser.Tilemaps.LayerData): Map<string, any> {

    const properties: Map<string, any> = new Map<string, any>();

    if (Array.isArray(layer.properties)) {
        layer.properties.forEach((val: object, index: number) => {
            const tProp = val as TiledPropertyObject;
            properties.set(tProp.name, tProp.value);
        });
    }
    return properties;
}

function parseTileSetProperties(tiles: any[]) {
    console.log(tiles);
}

function getCanvasCenter(scene: Phaser.Scene): [number, number] {
    return [scene.sys.canvas.width / 2, scene.sys.canvas.height / 2];
}