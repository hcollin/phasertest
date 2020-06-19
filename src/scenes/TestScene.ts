



export default class  TestScene extends Phaser.Scene implements Phaser.Scene {


    constructor() {
        super('TestScene');
    }

    preload() {
        this.load.atlas('CrystalBall', 'assets/atlasses/CrystalBall.png', 'assets/atlasses/CrystalBall.json');
        this.load.atlas("Explosion", "assets/atlasses/Explosion.png","assets/atlasses/Explosion.json")
    }

    create() {
        // this.anims.create({ key: 'everything', frames: this.anims.generateFrameNames('CrystalBall'), repeat: -1});
        // this.add.sprite(200, 100, 'CrystalBall').setScale(1).play('everything');

        const px = 300;
        const py = 300;



        this.anims.create({ key: 'fullExplosion', frames: this.anims.generateFrameNames('Explosion'), repeat: 0, hideOnComplete: true });
        this.add.sprite(px, py, "Explosion").play("fullExplosion");
        const max = 8;
        let done = 0;
        
        for(let e=0; e < max; e++) {
            const sc = ((Math.round(Math.random()*15))/10) +0.5;
            setTimeout(() => {
                const x = px - (Math.round(Math.random()* 80) - 40);
                const y = py - (Math.round(Math.random()* 80) - 40);
                const s = this.add.sprite(x, y, "Explosion").setScale(sc).play("fullExplosion");
                s.once("animationcomplete", () => {
                    s.destroy();
                    done++;
                    if(done === max) {
                        console.log("Explosion done!");
                    }
                })
            }, 100 * e * sc);
            
        }

        
        


    }

    update() {

    }


}