import { ObjectType, SingleObjectConfiguration, GeneralObject, ObjectConfiguration, GameObjectType } from "../interfaces/Interfaces";
import Crystal from "./Crystal";
import FinishLine from "./FinishLine";
import Wall from "./Wall";


const ObjectFactories: Map<GameObjectType, ((config: SingleObjectConfiguration) => GeneralObject)> = new Map<GameObjectType, ((config: SingleObjectConfiguration) => GeneralObject)>();
ObjectFactories.set(GameObjectType.CRYSTAL, Crystal);
ObjectFactories.set(GameObjectType.FINISHLINE, FinishLine);
ObjectFactories.set(GameObjectType.WALL, Wall)


export default function objectBuilder(config: ObjectConfiguration): GeneralObject[] | null {

    const objects: GeneralObject[] = [];
   
    const Factory = ObjectFactories.get(config.target);
    if (Factory) {
        const m = config.multiplier > 1 ? config.multiplier : 0;
        config.coords.forEach((coord: [number, number]) => {
            const sConf: SingleObjectConfiguration = {
                target: config.target,
                x: coord[0] * m,
                y: coord[1] * m,
                config: config.config
            };
            objects.push(Factory(sConf));
        });
        return objects;
    }

    return null;
}


