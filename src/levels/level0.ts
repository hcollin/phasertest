import { GameLevelSceneSettings } from "../interfaces/Level";


export const levelZero: GameLevelSceneSettings = {
    id: "ZeroLevel",
    diamonds: [
        {x: 800, y: 300},
        {x: 1200, y: 700}
    ],
    walls: [
        { x: 700, y: 490, height: 800 },
        { x: 1000, y: 90, height: 20, width: 600 },
    ],
    finishLine: 2000,
    startX: 100,
    startY: 400,
    backgroundImage: "assets/stars.jpg",
    backgroundMusic: 'assets/LevelTrance.mp3',
    atlasses: [
        ['CrystalBall', 'assets/atlasses/CrystalBall.png', 'assets/atlasses/CrystalBall.json']
    ]
};

