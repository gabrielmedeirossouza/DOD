import {
    ChildReference as _ChildReference,
    Component as _Component,
    Entity as _Entity,
    EntityManager as _EntityManager,
    EntityQueryBuilder as _EntityQueryBuilder,
    HttpPresenter as _HttpPresenter,
    HttpResponse as _HttpResponse,
    HttpStatus as _HttpStatus,
    PresenterSystem as _PresenterSystem,
    State as _State,
    System as _System,
    With as _With,
    Without as _Without,
    SystemManager as _SystemManager,
    World as _World,
} from "./Source/Core"

declare global {
    type Component = _Component
    type HttpPresenter = _HttpPresenter
    type HttpResponse = _HttpResponse
    type System = _System

    const HttpStatus: typeof _HttpStatus

    function With(...components: Component[]): MethodDecorator
    function Without(...components: Component[]): MethodDecorator

    class ChildReference extends _ChildReference {}
    class Entity extends _Entity {}
    class EntityManager extends _EntityManager {}
    class EntityQueryBuilder extends _EntityQueryBuilder {}
    class State extends _State {}
    class SystemManager extends _SystemManager {}
    class World extends _World {}

    abstract class PresenterSystem extends _PresenterSystem {}
}
