import { Model, PopulateOptions } from 'mongoose';

export abstract class BaseRepository<Interface, UpdateDto, RegisterDto> {
    private _repository: Model<Interface>;

    protected _populateOnFind: PopulateOptions[];

    constructor(
        repository: Model<Interface>,
        populateOnFind: PopulateOptions[] = [],
    ) {
        this._repository = repository;
        this._populateOnFind = populateOnFind;
    }

    async list(): Promise<Interface[] | null> {
        return await this._repository
            .find({}, {}, { populate: this._populateOnFind })
            .exec();
    }

    async count(): Promise<number> {
        return await this._repository.countDocuments();
    }

    async getById(_id: string): Promise<Interface> {
        return (await this._repository
            .findById(_id, {}, { populate: this._populateOnFind })
            .exec()) as Interface;
    }

    async register(dto: RegisterDto): Promise<Interface> {
        return (await this._repository.create(dto)) as Interface;
    }

    async update(_id: string, dto: UpdateDto): Promise<Interface> {
        return await this._repository.findOneAndUpdate({ _id }, dto, {
            new: true,
        });
    }

    async softDelete(_id: string) {
        await this._repository.findByIdAndUpdate(_id, {
            $set: {
                deleted: true,
            },
        });
    }

    async hardDelete(_id: string) {
        await this._repository.findByIdAndDelete(_id);
    }
}
