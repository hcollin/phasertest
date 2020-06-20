import { GameObject } from "../../interfaces/GameObject";
import { GameLevelSceneInterface } from "../../interfaces/Level";

export interface BallCircleConfig {
    x: number;
    y: number;
    balls: number;
    distance: number;

}

export default function BallCircle(conf: BallCircleConfig): GameObject {

    
    let text: Phaser.GameObjects.Text;
    let ball: Phaser.Physics.Matter.Sprite;
    let pixel: Phaser.Physics.Matter.Sprite;

    let point;

    let group: Phaser.GameObjects.Group;

    

    function preload(scene: GameLevelSceneInterface) { 
        scene.load.image('CrackedBall', 'assets/sprites/ball.png');
    }
    function create(scene: GameLevelSceneInterface) {
        group = scene.add.group();
        const max = conf.balls;

        for(let i = 0; i < max; i++) {
            const dens = Math.round(10 + ((1/max) * i * 20));
            const angs = 0.1 + (max/100) - (i/100);
            const scal = 0.85 + ((1/max) * i/4);
            const b: Phaser.Physics.Matter.Sprite = scene.matter.add.sprite(100, 100, "CrackedBall", null, { 
                label: "Ball",
                circleRadius: 32, 
                frictionAir: 0, 
                friction: 0,
                frictionStatic: 0,
                restitution: 1,
                density: dens
            });
            b.setAngularVelocity(angs);            
            b.setScale(scal);
            b.setName(`Obstacle`);
            
            

            b.setOnCollide((e) => {
                const ex = e.collision.supports[0].x;
                const ey = e.collision.supports[0].y;
                // scene.add.sprite(ex, ey, "SmallExplosion").play("fullSmallExplosion");
                
            });
            group.add(b);

        }
        point = new Phaser.Geom.Point(conf.x, conf.y);
     }
    function update(scene: GameLevelSceneInterface) {
        Phaser.Actions.RotateAroundDistance(group.getChildren(), point, 0.03, conf.distance);
     }

    return {
        preload,
        create,
        update,
    }
}