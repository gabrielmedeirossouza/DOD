export abstract class HttpController {
    abstract handle(data: any): Promise<void>
}
