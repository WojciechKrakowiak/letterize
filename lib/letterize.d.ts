declare type Targets = NodeList | HTMLCollection | HTMLElement[] | HTMLElement | string;
interface Params {
    targets: Targets;
    wrapper?: string;
    className?: string;
}
export default class Letterize {
    get listAll(): Element[];
    get list(): Element[][];
    get targets(): Targets;
    get className(): string;
    get wrapper(): string;
    static numInstances: number;
    private _wrapper;
    private _className;
    private _targets;
    private _list;
    private _listAll;
    constructor(params: Params);
    deletterize(): void;
}
export {};
