


// Objects that populate the level

export interface GeneralObject {
    objectIsStatic: boolean;
    myType: GameObjectType;

    create: (scene: LevelSceneInterface) => void;
    update: (scene: LevelSceneInterface, time?: number, delta?: number) => void;
}


export interface StaticObject extends GeneralObject {
    objectIsStatic: true;
    
}

export interface MovingObject extends GeneralObject {
    objectIsStatic: false;
    pause: (scene: LevelSceneInterface) => void;
}

export interface PickupObject extends MovingObject {

}

export interface ConstructionObject extends StaticObject {

}

export interface EnemyObject extends MovingObject {

}

export enum GameObjectType {
    WALL = "Wall",

    CRYSTAL = "Crystal",

    PLAYER = "Player",

    FINISHLINE = "Finish Line",
}


// Player Objects

export interface PlayerObject extends MovingObject {
    myType: GameObjectType.PLAYER;
    shape: PlayerShapeObject;
    
    create: (scene: LevelSceneInterface) => void;
    
    getStatus: () => PlayerLevelStatus;
    action: (direction: string, scene: LevelSceneInterface) => void;
}

export interface PlayerLevelStatus {
    health: number;
    shape: PlayerShapeObject;
    position: Phaser.Geom.Point;
}

export interface PlayerShapeObject {
    // collisionPolygon: Phaser.Math.Vector2[] | Phaser.Geom.Polygon | Phaser.Geom.Point[] | string;
    collisionPolygon: string | any[];
    spriteId: string;
    rotationVelocity: number;
    movementVelocity: number;
    cameraSpeed: number;
    name: string;
}



// Level interfaces

export interface LevelConfiguration {
    id: string;
    name: string;
    finishLine: number;
    playerStartX: number;
    playerStartY: number;
    objects: ObjectConfiguration[];
    assets: AssetConfiguration[];
    tilemaps: TileMapConfiguration[];

    backgroundMusic: string;
    backgroundImages: BackgroundImageConfiguration[];
}


export interface BackgroundImageConfiguration {
    assetId: string;
    speed: number;
    opacity: number;
    depth: DEPTHLEVEL;
    tint?: number | [number, number, number, number];
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    tx?: number;
    ty?: number;
    scale?: number;
}

export interface ObjectConfiguration {
    target: GameObjectType;
    coords: [number, number][];
    multiplier?: number;
    config?: Record<string, any>;
}

export interface SingleObjectConfiguration {
    target: GameObjectType,
    x: number;
    y: number;
    config?: Record<string, any>;
}

export interface TileMapConfiguration {
    tilemap: string;
    tiles: string;
}

export enum AssetType {
    IMAGE = "Image",
    ATLAS = "Atlas",
    AUDIO = "Audio",
    JSON = "Json",
    TILEMAPCSV = "TileMapCSV",
    TILEMAPJSON = "TileMapJSON",
}

export enum ObjectType {
    Crystal = "Crystal",
    Wall = "Wall",
}


export type AssetConfiguration = ImageAssetConfiguration | AudioAssetConfiguration | AtlasAssetConfiguration | TileMapJsonAssetConfiguration;

export interface ImageAssetConfiguration {
    id: string;
    filename: string;
    type: AssetType.IMAGE;
}

export interface AudioAssetConfiguration {
    id: string;
    filename: string;
    type: AssetType.AUDIO;
}


export interface AtlasAssetConfiguration {
    id: string;
    filename: string;
    type: AssetType.ATLAS;
    json: string;
}

export interface TileMapJsonAssetConfiguration {
    id: string;
    json: string;
    type: AssetType.TILEMAPJSON;
    tileImages: string;
}


export enum DEPTHLEVEL {
    BG_BASE = 0,
    BG_LOW = 1,
    BG_MIDDLE = 2,
    BG_HIGH = 4,
    TILES = 10,
    PLAYER = 15,
    OBJECTS_STATIC = 20,
    OBJECTS_MOVING = 30,
    BOOSTERS = 30,
    
    BG_TOP_1 = 50,
    BG_TOP_2 = 55,

    GUI_BG = 70,
    GUI_VALUES = 75,

    MESSAGE = 90,
}

// Background scroller
export interface BackgroundImage {
    create: (scene: LevelSceneInterface) => void;
    update: (scene: LevelSceneInterface, time?: number, delta?: number) => void;
    pause: () => void;
    resume: () => void;

}


export enum LEVELSTATUS {
    INIT = "Init",
    LOAD = "Loading",
    READY = "Ready",
    RUN = "Running",
    PAUSED = "Paused",  // Pause the whole progress of the game
    HOLD = "Hold",      // Stop just the camera
    END = "Ended",
}


// Scene types and substypes
export interface LevelSceneInterface extends Phaser.Scene {
    position: number;
    settings: LevelConfiguration;
    player: PlayerObject;
    status: LEVELSTATUS;

    init: (configuration: LevelConfiguration) => void;
}



export interface USERCONFIGS {
    mainVolume: number;
    inputMethod: "KEYS"|"PAD";

}