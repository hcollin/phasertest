


interface eventContainer {
    id: string;
    key: string;
    cb: (data: any) => void;
}

export interface EventsInterface {
    on: <T>(key: string, callback: ((data: T) => void)) => (() => void);
    emit: <T>(key: string, data: T) => void;
}

let idNum: number = 0;


function createEventBus(): EventsInterface {

    const listeners: Map<string, eventContainer[]> = new Map<string, eventContainer[]>();

    function on<T>(key: string, callback: (data: T) => void): () => void {
        if (!listeners.has(key)) {
            listeners.set(key, []);
        }
        const clist: eventContainer[] = [...listeners.get(key)];
        const id = `id-${idNum++}-${Math.round(Math.random() * 1000)}`;
        clist.push({
            id: id,
            cb: callback,
            key: key
        });
        listeners.set(key, clist);

        return () => {
            const clist = listeners.get(key);
            if (clist) {
                listeners.set(key, clist.filter((ec: eventContainer) => ec.id !== id));
            }
        }

    }

    function emit<T>(key: string, data: T) {
        const clist = listeners.get(key);
        if (clist) {
            clist.forEach((ec: eventContainer) => {
                ec.cb(data);
            });
        }
    }

    return {
        on,
        emit
    }
}

const Events = createEventBus();

export default Events;