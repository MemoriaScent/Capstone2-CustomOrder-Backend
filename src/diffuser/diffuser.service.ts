import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from 'src/dto/response/default.response';
import { CustomDiffuserEntity } from 'src/entity/customDiffuserEntity';
import { DiffuserEntity } from 'src/entity/diffuser.entity';
import { Repository } from 'typeorm';
import { AddDiffuserRequest } from '../dto/request/add-diffuser.request';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class DiffuserService {
  constructor(
    @InjectRepository(DiffuserEntity)
    private diffuserRepository: Repository<DiffuserEntity>,
    @InjectRepository(CustomDiffuserEntity)
    private customDiffuserRepository: Repository<CustomDiffuserEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly logger: Logger,
  ) {}

  //일반 디퓨저 정보 저장
  async addDiffuser(body: AddDiffuserRequest) {
    const diffuserEntity: DiffuserEntity = new DiffuserEntity();
    diffuserEntity.Name = body.Name;
    diffuserEntity.Image = body.Image;
    diffuserEntity.Price = body.Price;
    const result = await this.diffuserRepository.save(diffuserEntity);

    const res: DefaultResponseDto = new DefaultResponseDto();

    res.status = result ? 201 : 404;

    res.data = result ? { message: '실행 완료' } : { message: '오류' };

    return res;
  }

  //일반 디퓨저 정보 가져오기
  async getDiffuser() {
    const res: DefaultResponseDto = new DefaultResponseDto();

    const diffuserData = await this.diffuserRepository.find();

    if (diffuserData == null) {
      res.status = 404;
      return res;
    }

    return diffuserData;
  }

  //커스텀 디퓨저 저장
  async addCustomDiffuser(id: number, body) {
    const res: DefaultResponseDto = new DefaultResponseDto();

    let customDiffuserEntity: CustomDiffuserEntity = new CustomDiffuserEntity();
    customDiffuserEntity = body;

    const userEntity: UserEntity = await this.userEntityRepository.findOne({
      where: { id: id },
    });

    customDiffuserEntity.userEntity = userEntity;
    const addCustomDiffuser = await this.customDiffuserRepository.save(body);

    res.status = addCustomDiffuser ? 201 : 404;

    res.data = addCustomDiffuser
      ? { message: '실행 완료' }
      : { message: '오류' };

    return res;
  }

  //커스텀 디퓨저 정보 가져오기
  async getCustomDiffuser() {
    const res: DefaultResponseDto = new DefaultResponseDto();

    const customDiffuserData = await this.customDiffuserRepository.find();

    if (customDiffuserData == null) {
      res.status = 404;
      return res;
    }

    return customDiffuserData;
  }
}
