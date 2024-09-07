import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class CustomRepository<Entity> {
  constructor(private readonly repository: Repository<Entity>) {}

  async findOneByOrFail(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Entity> {
    const entity = await this.repository.findOneBy(where);
    if (!entity) {
      throw new NotFoundException(
        `해당 조건에 맞는 리소스를 찾을 수 없습니다.`,
      );
    }
    return entity;
  }
}
