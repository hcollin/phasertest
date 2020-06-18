import "phaser";

export default function ShapeOne(scene: Phaser.Scene, x: number, y: number): Phaser.Types.Physics.Matter.MatterBody {

    const coords = `0, 0, 40, 0, 40, 40, 80, 40, 80, 80, 40, 80, 40, 120, 0, 120, 0, 0`;
    
    const shape = scene.add.polygon(x, y, coords, 0x2244ff);
    
    const obj =  scene.matter.add.gameObject(shape, {shape: { type: 'fromVerts', verts: coords, flagInternal: true } });

    return obj;
}
