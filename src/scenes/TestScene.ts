



export default class TestScene extends Phaser.Scene implements Phaser.Scene {

    private text: Phaser.GameObjects.Text;
    private ball: Phaser.Physics.Matter.Sprite;
    private pixel: Phaser.Physics.Matter.Sprite;

    private point;

    private group: Phaser.GameObjects.Group;

    private spr: SpringyNumber;

    constructor() {
        super('TestScene');
    }

    preload() {
        // this.load.atlas('CrystalBall', 'assets/atlasses/CrystalBall.png', 'assets/atlasses/CrystalBall.json');
        this.load.atlas("SmallExplosion", "assets/atlasses/SmallExplosion.png","assets/atlasses/SmallExplosion.json");

        this.load.image('CrackedBall', 'assets/sprites/ball.png');
        this.load.image('EmptyPixel', 'assets/sprites/emptyPixel.png');
    }

    create() {

        this.matter.world.setBounds();
        // this.add.sprite(100, 100, "CrackedBall");
        this.anims.create({ key: 'fullSmallExplosion', frames: this.anims.generateFrameNames('SmallExplosion'), repeat: 0, hideOnComplete: true });

        this.spr = createSpringyNumber(200, 350, 1, 300);

        this.group = this.add.group();
        const max = 9;

        for(let i = 0; i < max; i++) {
            const dens = Math.round(10 + ((1/max) * i * 20));
            const angs = 0.1 + (max/100) - (i/100);
            const scal = 0.85 + ((1/max) * i/4);
            const b: Phaser.Physics.Matter.Sprite = this.matter.add.sprite(100, 100, "CrackedBall", null, { 
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
            b.setName(`RotatorRock ${i}`);

            b.setOnCollide((e) => {
                
                // console.log("Collide!", e, e.bodyA.gameObject?.name, e.bodyB.gameObject?.name);
                const ex = e.collision.supports[0].x;
                const ey = e.collision.supports[0].y;
                this.add.sprite(ex, ey, "SmallExplosion").play("fullSmallExplosion");
                
            });
            console.log(`${i}: \nD: ${dens} \nA: ${angs} \nS: ${scal}`);
            this.group.add(b);


        }

        
        

        this.point = new Phaser.Geom.Point(this.sys.canvas.width/2,this.sys.canvas.height/2);

        // this.pixel = this.matter.add.sprite(400, 350, "EmptyPixel", null, { label: "Pixel", isStatic: true });

        // console.log(ball as any);
        // const constraint = this.matter.add.constraint(this.ball.body as MatterJS.BodyType, this.pixel.body as MatterJS.BodyType, 300, 1);

        // const vec: Phaser.Math.Vector2 = new Phaser.Math.Vector2(1, 0);

        // this.ball.applyForce(vec);
        // this.ball.setAngularVelocity(-0.1);




        // this.text = this.add.text(10,700, "TEXT", { fill: "#ffffff", font: "24px Arial"}).setOrigin(0,0);


    }

    update() {
        const now = this.spr.update();
        Phaser.Actions.RotateAroundDistance(this.group.getChildren(), this.point, 0.03, now);
        
        // this.text.setText(`${this.ball.x}, ${this.ball.y}`);

    }


}


interface SpringyNumber {
    update: () => number;
}

function createSpringyNumber(min: number, max: number, speed: number, start?: number): SpringyNumber {

    let current = start || min;
    let dir = 1;
    let curSpeed = speed;

    const steps = (max - min) / speed;
    
    

    function update(): number {
        
        current += curSpeed * dir;


        if(current >= max) {
            current = max;
            dir = -1;
        }
        if(current <= min) {
            current = min;
            dir = 1;
        }
        return current;
    }

    return {
        update
    }

}


// CRYSTAL BALL ANIMATION
//
// this.anims.create({ key: 'everything', frames: this.anims.generateFrameNames('CrystalBall'), repeat: -1});
// this.add.sprite(200, 100, 'CrystalBall').setScale(1).play('everything');


// EXPLOSION
//
// const px = 300;
// const py = 300;
//
// this.anims.create({ key: 'fullExplosion', frames: this.anims.generateFrameNames('Explosion'), repeat: 0, hideOnComplete: true });
// this.add.sprite(px, py, "Explosion").play("fullExplosion");
// const max = 8;
// let done = 0;

// for(let e=0; e < max; e++) {
//     const sc = ((Math.round(Math.random()*15))/10) +0.5;
//     setTimeout(() => {
//         const x = px - (Math.round(Math.random()* 80) - 40);
//         const y = py - (Math.round(Math.random()* 80) - 40);
//         const s = this.add.sprite(x, y, "Explosion").setScale(sc).play("fullExplosion");
//         s.once("animationcomplete", () => {
//             s.destroy();
//             done++;
//             if(done === max) {
//                 console.log("Explosion done!");
//             }
//         })
//     }, 100 * e * sc);

// }

