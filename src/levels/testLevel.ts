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
            id: "wall-blue",
            type: AssetType.IMAGE,
            filename: "assets/sprites/whitewall.png",
        },
        {
            id: "map-test-level",
            type: AssetType.TILEMAPJSON,
            json: "assets/json/testlevel.json",
            tileImages: "assets/json/WhiteSpaceTiles.json",
        }
    ],
    objects: [
        {
            target: GameObjectType.CRYSTAL,
            coords: [[1600,400], [1700, 200], [1900, 600], [2300, 700], [2500, 300]],
        },
        {
            target: GameObjectType.WALL,
            coords: [[1200, 400]],
            config: {
                width: 32,
                height: 400
            }
        }
    ],
    tilemaps: [
        {
            tilemap: "map-test-level",
        }
    ],
    finishLine: 3000,
    backgroundMusic: "audio-music-trance",
    playerStartX: 100,
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


