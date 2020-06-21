


// Objects that populate the level



export interface GeneralObject {

    myType: GameObjectTypes;
    
    update: (scene: LevelSceneInterface, time?: number, delta?: number) => void;
}


export interface StaticObject extends GeneralObject {
    objectIsStatic: true;
}

export interface MovingObject extends GeneralObject {
    objectIsStatic: false;
}

export interface PickupObject extends StaticObject {

}

export interface ConstructionObject extends StaticObject {

}

export interface EnemyObject extends MovingObject {

}

export enum GameObjectTypes {
    WALL = "Wall",

    CRYSTAL = "Crystal",

    PLAYER = "Player",
}


// Player Objects

export interface PlayerObject extends GeneralObject {
    myType: GameObjectTypes.PLAYER;
    shape: PlayerShapeObject;
    
    create: (scene: LevelSceneInterface) => void;
    
    getStatus: () => PlayerLevelStatus;
    action: (direction: string, scene: LevelSceneInterface) => void;
}

export interface PlayerLevelStatus {
    health: number;
    shape: PlayerShapeObject;
}

export interface PlayerShapeObject {
    collisionPolygon: Phaser.Math.Vector2[];
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
    objects: GeneralObject[];
    assets: AssetConfiguration[];
    backgroundMusic: string;

    backgroundImages: BackgroundImageConfiguration[];
}


export interface BackgroundImageConfiguration {
    assetId: string;
    speed: number;
    opacity: number;
    depth: DEPTHLEVEL;
    tint?: number;
    
}

export enum AssetType {
    IMAGE = "Image",
    ATLAS = "Atlas",
    AUDIO = "Audio",
}

export interface AssetConfiguration {
    id: string;
    type: AssetType;
    filename: string;
}

export interface ImageAssetConfiguration extends AssetConfiguration {
    type: AssetType.IMAGE;
}

export interface AudioAssetConfiguration extends AssetConfiguration {
    type: AssetType.AUDIO;
}

export interface AtlasAssetConfiguration extends AssetConfiguration {
    type: AssetType.ATLAS;
    json: string;
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