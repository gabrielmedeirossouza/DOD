import { EntityManager } from "./EntityManager";
import { EntityQueryBuilder } from "./EntityQueryBuilder";
import { SystemManager } from "./SystemManager";

export class World {
    readonly entityManager = new EntityManager
    readonly systemManager = new SystemManager(this.entityManager)

    get entityQueryBuilder() {
        return new EntityQueryBuilder(this.entityManager.componentStores)
    }
}
