import { LevelConfiguration, AssetType } from "../interfaces/Interfaces";



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
        }
    ],
    objects: [],
    finishLine: 2000,
    backgroundMusic: "",
    playerStartX: 100,
    playerStartY: 400,
    name: "Test level",
    backgroundImages: []
}


