export abstract class Controller {
    abstract handle(data: any): Promise<void>
}
