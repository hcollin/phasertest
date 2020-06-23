import { LevelConfiguration, AssetType, DEPTHLEVEL, ObjectType, GameObjectType } from "../interfaces/Interfaces";



export const LEVEL_TestLevel: LevelConfiguration = {
    id: "TestLevel",
    assets: [
        {
            id: "bg-image-stars",
            type: AssetType.IMAGE,
            filename: "assets/stars.jpg"
        },
        {
            id: "bg-image-clouds",
            type: AssetType.IMAGE,
            filename: "assets/clouds.png"
        },
        {
            id: "audio-music-escapism",
            type: AssetType.AUDIO,
            filename: "assets/EscapismTheme.mp3"
        },
        {
            id: "crystal-pickup",
            type: AssetType.AUDIO,
            filename: "assets/audio/CrystalPickup.ogg"
        },
        {
            id: "player-shape-shift",
            type: AssetType.AUDIO,
            filename: "assets/audio/ShapeShifting.mp3"
        },
        {
            id: "audio-music-trance",
            type: AssetType.AUDIO,
            filename: "assets/LevelTrance.mp3"
        },
        {
            id: "player-shape-one",
            type: AssetType.IMAGE,
            filename: "assets/sprites/playerShapeSquare.png"
        },
        {
            id: "player-shape-two",
            type: AssetType.IMAGE,
            filename: "assets/sprites/playerShapeTall.png"
        },
        {
            id: "pickup-crystal",
            type: AssetType.ATLAS,
            filename: "assets/atlasses/CrystalBall.png",
            json: "assets/atlasses/CrystalBall.json"
        },
        {
            id: "white-tiles",
            type: AssetType.IMAGE,
            filename: "assets/atlasses/whiteTiles.png"
        },{
            id: "white-tile-map",
            type: AssetType.TILEMAPJSON,
            json: "assets/json/testlevel2.json",
            tileImages: "whiteTiles"
        },
    ],
    objects: [
        {
            target: GameObjectType.CRYSTAL,
            multiplier: 32,
            coords: [[35,3.5], [38, 21], [75, 3.5], [77, 12], [99, 3.5], [105,20], [121,3], [124,5], [118,22]],
        },
    ],
    tilemaps: [
        {
            tilemap: "white-tile-map",
            tiles: "white-tiles"
        },
    ],
    finishLine: 6600,
    backgroundMusic: "audio-music-trance",
    playerStartX: 32*4,
    playerStartY: 400,
    name: "Test level",
    backgroundImages: [
        {
            assetId: "bg-image-stars",
            opacity: 1,
            speed: 0.1,
            depth: DEPTHLEVEL.BG_BASE,
            width: 5000,
        },
        {
            assetId: "bg-image-clouds",
            opacity: 0.6,
            speed: 0.3,
            depth: DEPTHLEVEL.BG_LOW,
            width: 5500,
            scale: 0.5,
            tint: [0x880000, 0xff0000, 0x000088, 0x0000ff],
            
        },
        {
            assetId: "bg-image-clouds",
            opacity: 0.5,
            speed: 1,
            depth: DEPTHLEVEL.BG_MIDDLE,
            width: 5000,
        }
    ]
}


