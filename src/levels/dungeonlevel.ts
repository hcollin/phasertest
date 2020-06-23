import { LevelConfiguration, AssetType, GameObjectType } from "../interfaces/Interfaces";



export const LEVEL_DungeonLevel: LevelConfiguration = {
    id: "DungeonLevel",
    assets: [
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
            id: "dungeon-tiles",
            type: AssetType.IMAGE,
            filename: "assets/atlasses/DungeonTileSet.png"
        },{
            id: "dungeon-map",
            type: AssetType.TILEMAPJSON,
            json: "assets/json/dungeonmap.json",
            tileImages: "DungeonTileSet"
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
            coords: [[1600,400], [1700, 200], [1900, 550], [2300, 500], [2500, 300]],
        },
        
    ],
    tilemaps: [
        {
            tilemap: "white-tile-map",
            tiles: "white-tiles"
        },
        // {
        //     tilemap: "dungeon-map",
        //     tiles: "dungeon-tiles"
        // }
    ],
    finishLine: 6100,
    backgroundMusic: "audio-music-escapism",
    playerStartX: 100,
    playerStartY: 400,
    name: "Dungeon level",
    backgroundImages: []
}


