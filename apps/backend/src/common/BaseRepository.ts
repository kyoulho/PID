import { NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { UUID } from '@mid/shared';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseRepository<Entity> extends Repository<Entity> {
  private readonly entityName: string;

  constructor(entity, entityManager: EntityManager) {
    super(entity, entityManager);
    this.entityName = entity.name;
  }

  async findOneByOrFail(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Entity> {
    const entity = await this.findOneBy(where);
    if (!entity) {
      throw new NotFoundException(`${this.entityName} 를 찾을 수 없습니다.`);
    }
    return entity;
  }

  async findOneOrFail(options: FindOneOptions<Entity>): Promise<Entity> {
    const entity = await this.findOne(options);
    if (!entity) {
      throw new NotFoundException(`${this.entityName} 를 찾을 수 없습니다.`);
    }
    return entity;
  }

  async preloadOrFail(id: UUID, data: DeepPartial<Entity>): Promise<Entity> {
    const entity = await this.preload({
      id,
      ...data,
    });

    if (!entity) {
      throw new NotFoundException(
        `${this.entityName} 를 찾을 수 없습니다. ID: [${id}]`,
      );
    }

    return entity;
  }

  async updateOrFail(
    id: UUID,
    data: QueryDeepPartialEntity<Entity>,
  ): Promise<void> {
    const result = await this.update(id, data);

    if (result.affected === 0) {
      throw new NotFoundException(
        `${this.entityName} 를 찾을 수 없습니다. ID: [${id}]`,
      );
    }
  }

  async deleteOrFail(findOption: FindOptionsWhere<Entity>): Promise<void> {
    const result = await this.delete(findOption);
    if (result.affected === 0) {
      throw new NotFoundException(`${this.entityName} 를 찾을 수 없습니다.`);
    }
  }
}
