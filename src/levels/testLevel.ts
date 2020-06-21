import { LevelConfiguration, AssetType, DEPTHLEVEL } from "../interfaces/Interfaces";



export const LEVEL_TestLevel: LevelConfiguration = {
    id: "TestLevel",
    assets: [
        {
            id: "bg-image-stars",
            type: AssetType.IMAGE,
            filename: "assets/stars.jpg"
        },
        {
            id: "audio-music-escapism",
            type: AssetType.AUDIO,
            filename: "assets/EscapismTheme.mp3"
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
        }
    ],
    objects: [],
    finishLine: 2000,
    backgroundMusic: "audio-music-trance",
    playerStartX: 100,
    playerStartY: 400,
    name: "Test level",
    backgroundImages: [
        {
            assetId: "bg-image-stars",
            opacity: 1,
            speed: 1,
            depth: DEPTHLEVEL.BG_BASE,
        }
    ]
}


