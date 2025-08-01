import { Component } from "../Components/Component"
import { Class } from "../Miscellaneous/Helpers"

export class Entity {
    private components: Map<string, Component> = new Map()

    constructor(
        public readonly name: string
    ) {}

    add(component: Component): void {
        this.components.set(component.constructor.name, component)
    }

    get<T extends Class<Component>>(componentClass: T): InstanceType<T> {
        const component = this.components.get(componentClass.name)
        if (!component) {
            throw new Error(`Component ${componentClass.name} not found in entity ${this.name}`)
        }
        return component as InstanceType<T>
    }

    getAll(): Component[] {
        return Array.from(this.components.values())
    }

    attemptGet<T extends Class<Component>>(componentClass: T): InstanceType<T> | undefined {
        return this.components.get(componentClass.name) as InstanceType<T> | undefined
    }

    has(componentName: string): boolean
    has(componentClass: Class<Component>): boolean
    has(componentClassOrName: Class<Component> | string): boolean {
        if (typeof componentClassOrName === "string") {
            return this.components.has(componentClassOrName)
        }

        const componentClass = componentClassOrName
        return this.components.has(componentClass.name)
    }

    remove(componentClass: Class<Component>): void {
        if (!this.components.delete(componentClass.name)) {
            throw new Error(`Component ${componentClass.name} not found in entity ${this.name}`)
        }
    }
}
