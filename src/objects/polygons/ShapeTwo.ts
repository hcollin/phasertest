import "phaser";

export default function ShapeTwo(scene: Phaser.Scene, x: number, y: number): Phaser.Types.Physics.Matter.MatterBody {

    const coords = `0, 0, 40, 0, 40, 200, 0, 200, 0, 0`;

    const shape = scene.add.polygon(x, y, coords, 0x22ff44);

    const obj = scene.matter.add.gameObject(shape, { shape: { type: 'fromVerts', verts: coords, flagInternal: true } });

    return obj;
}
