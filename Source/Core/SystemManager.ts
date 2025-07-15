import { EntityManager } from "./EntityManager";
import { EntityQueryBuilder } from "./EntityQueryBuilder";
import { Class } from "./Helpers";
import { State } from "./State";
import { QuerableSystem, System } from "./System";

export class SystemManager {
    private systems: Map<string, QuerableSystem> = new Map

    constructor(
        private entityManager: EntityManager
    ) {}

    addSystem(system: System) {
        this.systems.set(system.constructor.name, system)
    }

    removeSystem<T extends Class<System>>(systemClass: T) {
        this.systems.delete(systemClass.name)
    }

    async executeSystems(debbug = false) {
        for (const system of this.systems.values()) {
            for (const [entity, componentStore] of this.entityManager.componentStores) {
                const queryDetail: Record<any, any> = {}

                const componentsMatchAllRequiredComponents =
                    system.__requiredComponents?.every(rc => {
                        const match = componentStore.has(rc)

                        if (!match) {
                            queryDetail.missingComponents
                                ? queryDetail.missingComponents.push(rc)
                                : queryDetail.missingComponents = [rc]
                        }

                        return match
                    })
    
                const componentsDoNotMatchAnyExcludedComponents =
                    !system.__excludedComponents?.some(ec => {
                        const match = componentStore.has(ec)

                        // TODO
                        return match
                    })
    
                if (
                    componentsMatchAllRequiredComponents &&
                    componentsDoNotMatchAnyExcludedComponents
                ) {
                    const state = new State(
                        this.entityManager,
                        new EntityQueryBuilder(this.entityManager.componentStores)
                    )

                    await system.execute(entity, state)
                } else {
                    if (system.__queryTrace) {
                        system.__queryTrace.push({
                            entity,
                            details: queryDetail
                        })
                    } else {
                        Reflect.set(system, "__queryTrace", [{
                            entity,
                            details: queryDetail
                        }])
                    }
                }
            }

            if (debbug) {
                console.log(JSON.stringify(system.__queryTrace, null, 2))
            }
        }
    }
}