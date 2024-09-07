import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { UUID } from '@pid/shared';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class CustomRepository<Entity> extends Repository<Entity> {
  async findOneByOrFail(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Entity> {
    const entity = await this.findOneBy(where);
    if (!entity) {
      throw new NotFoundException(
        `해당 조건에 맞는 리소스를 찾을 수 없습니다.`,
      );
    }
    return entity;
  }

  async findOneOrFail(options: FindOneOptions<Entity>): Promise<Entity> {
    const entity = await this.findOne(options);
    if (!entity) {
      throw new NotFoundException(
        `해당 조건에 맞는 리소스를 찾을 수 없습니다.`,
      );
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
        `ID ${id}에 해당하는 리소스를 찾을 수 없습니다.`,
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
        `ID ${id}에 해당하는 리소스를 찾을 수 없습니다.`,
      );
    }
  }

  async deleteOrFail(id: UUID): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 리소스를 찾을 수 없습니다.`,
      );
    }
  }
}
