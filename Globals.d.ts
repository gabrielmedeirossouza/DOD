import {
    Context as _Context,
    Entity as _Entity,
    Component as _Component,
    HttpPresenterHandler as _HttpPresenterHandler,
    HttpResponse as _HttpResponse,
    HttpStatus as _HttpStatus,
    HttpPresenter as _HttpPresenter,
    System as _System,
} from "./Source/Core"

declare global {
    type Component = _Component
    type HttpPresenterHandler = _HttpPresenterHandler
    type HttpResponse = _HttpResponse
    type System = _System

    const HttpStatus: typeof _HttpStatus

    class Entity extends _Entity {}
    class Context extends _Context {}

    abstract class HttpPresenter extends _HttpPresenter {}
}
