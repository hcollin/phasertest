


// Objects that populate the level



export interface GeneralObject {

    myType: GameObjectTypes;

    
    update: (scene: Phaser.Scene, time?: number, delta?: number) => void;
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
}

export interface PlayerShapeObject {
    collisionPolygon: Phaser.Geom.Polygon;
    sprite: Phaser.Physics.Matter.Sprite;
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
    id: string;
    filename: string;
    speed: number;
    opacity: number;
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



// Scene types and substypes
export interface LevelSceneInterface extends Phaser.Scene {
    init: (configuration: LevelConfiguration) => void;
}

export interface BackgroundSceneInterface extends Phaser.Scene {

}

export interface GUISceneInterface extends Phaser.Scene {

}



