export declare enum TypeStateEnum {
    NO_EVALUABLE = "no_evaluable",
    PRIMITIVE = "primitive",
    OBJECT = "object",
    RECORD = "record",
    ARRAY = "array",
    FUNCTION = "function"
}
export declare class TypeState {
    private readonly _type;
    constructor(_value: any);
    get type(): TypeStateEnum;
    get isValuable(): boolean;
    get isPrimitive(): boolean;
    get isArray(): boolean;
    get isObject(): boolean;
    get isRecord(): boolean;
    get isFunction(): boolean;
}
//# sourceMappingURL=type-state.d.ts.map