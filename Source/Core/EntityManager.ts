import { Class } from "./Helpers"
import { Component } from "./Component"
import { Entity } from "./Entity"

export type ComponentStore = Map<string, Component>
export type ComponentStores = Map<Entity, ComponentStore>

export type BufferStore<T extends Component = Component> = Map<string, T[]>
export type BufferStores<T extends Component = Component> = Map<Entity, BufferStore<T>>

export class EntityManager {
    private nextEntityId = 1
    componentStores: ComponentStores = new Map
    bufferStores: BufferStores = new Map

    createEntity(name: string): Entity {
        const entity = new Entity(this.nextEntityId++, name)

        this.componentStores.set(
            entity,
            new Map
        )

        this.bufferStores.set(
            entity,
            new Map
        )

        return entity
    }

    addComponent(entity: Entity, component: Component) {
        const componentStore = this.getComponentStore(entity)
        componentStore.set(component.constructor.name, component)
    }

    removeComponent(entity: Entity, componentClass: Class<Component>) {
        const componentStore = this.getComponentStore(entity)
        componentStore.delete(componentClass.name)
    }

    getComponent<T extends Class<Component>>(entity: Entity, componentClass: T): InstanceType<T> {
        const componentStore = this.getComponentStore(entity)
        const component = componentStore.get(componentClass.name)

        if (!component) {
            throw new Error(`Component ${componentClass.name} linked to ${entity} not found!`)
        }

        return component as InstanceType<T>
    }

    hasComponent(entity: Entity, componentClass: Class<Component>) {
        const componentStore = this.getComponentStore(entity)
        return componentStore.has(componentClass.name)
    }

    addBuffer<T extends Class<Component>>(entity: Entity, bufferClass: T): InstanceType<T>[] {
        const bufferStore = this.bufferStores.get(entity)

        if (!bufferStore) {
            this.bufferStores.set(entity, new Map([[bufferClass.name, []]]))
            return this.getBuffer(entity, bufferClass)
        }

        if (bufferStore.get(bufferClass.name)) {
            throw new Error(`Already exists a buffer ${bufferClass.name} linked to ${entity}.`)
        }

        bufferStore.set(bufferClass.name, [])
        return this.getBuffer(entity, bufferClass)
    }

    getBuffer<T extends Class<Component>>(entity: Entity, bufferClass: T): InstanceType<T>[] {
        const bufferStore = this.getBufferStore(entity)

        const buffer = bufferStore.get(bufferClass.name)

        if (!buffer) {
            throw new Error(`Buffer store with buffer ${bufferClass.name} not found!`)
        }

        return buffer as InstanceType<T>[]
    }

    private getComponentStore(entity: Entity): ComponentStore {
        const componentStore = this.componentStores.get(entity)

        if (!componentStore) {
            throw new Error(`Component store of entity ${entity} not found!`)
        }

        return componentStore
    }

    private getBufferStore(entity: Entity): BufferStore {
        const bufferStore = this.bufferStores.get(entity)

        if (!bufferStore) {
            throw new Error(`Buffer store of entity ${entity} not found!`)
        }

        return bufferStore
    }
}