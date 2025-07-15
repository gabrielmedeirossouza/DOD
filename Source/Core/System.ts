import { Component } from "./Component";
import { Entity } from "./Entity";
import { Class } from "./Helpers";
import { State } from "./State";

export function With<T extends Class<Component>[]>(...classComponents: T) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.set(target, "__requiredComponents", classComponents.map(cc => cc.name))
    }
}

export function Without<T extends Class<Component>[]>(...classComponents: T) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.set(target, "__excludedComponents", classComponents.map(cc => cc.name))
    }
}

export interface System {
    execute(entity: Entity, state: State): Promise<void> | void
}

export interface QuerableSystem extends System {
    __requiredComponents?: string[]
    __excludedComponents?: string[]
    __queryTrace?: Record<any, any>[]
}