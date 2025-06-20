import { ExecutionContext } from "@nestjs/common"

export class MetadataResponseDTO {
    type: string
    start?: number
    limit?: number
    total?: number

    constructor(request: ExecutionContext, data: any) {
        const query = request.getArgs()[0]?.query || {}
        const isList = Array.isArray(data)

        this.type = isList ? 'list' : 'item'

        if (isList) {
            this.start = query.start ? parseInt(query.start, 10) : 1
            this.limit = query.limit ? parseInt(query.limit, 10) : 10
            this.total = data.length
        }
    }
}