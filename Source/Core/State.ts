import { EntityManager } from "./EntityManager";
import { EntityQueryBuilder } from "./EntityQueryBuilder";

export class State {
    constructor(
        public readonly em: EntityManager,
        public readonly eqb: EntityQueryBuilder
    ) {}
}