import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from 'src/dto/response/default.response';
import { CustomDeffuserEntity } from 'src/entity/customDeffuser.entity';
import { DiffuserEntity } from 'src/entity/diffuser.entity';
import { Repository } from 'typeorm';
import { AddDeffuserRequest } from "../dto/request/add-deffuser.request";

@Injectable()
export class DiffuserService {
  constructor(
    @InjectRepository(DiffuserEntity)
    private diffuserRepository: Repository<DiffuserEntity>,
    @InjectRepository(CustomDeffuserEntity)
    private customDiffuserRepository: Repository<CustomDeffuserEntity>,
    private readonly logger: Logger,
  ) {}

  //일반 디퓨저 정보 저장
  async addDiffuser(body: AddDeffuserRequest) {
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
  async getDeffuser() {
    const res: DefaultResponseDto = new DefaultResponseDto();

    const deffuserData = await this.diffuserRepository.find();

    if (deffuserData == null) {
      res.status = 404;
      return res;
    }

    return deffuserData;
  }

  //커스텀 디퓨저 저장
  async addCustomDeffuser(body) {
    const res: DefaultResponseDto = new DefaultResponseDto();

    const addCustomDeffuser = await this.customDiffuserRepository.save(body);

    res.status = addCustomDeffuser ? 201 : 404;

    res.data = addCustomDeffuser
      ? { message: '실행 완료' }
      : { message: '오류' };

    return res;
  }

  //커스텀 디퓨저 정보 가져오기
  async getCustomDeffuser() {
    const res: DefaultResponseDto = new DefaultResponseDto();

    const customDeffuserData = await this.customDiffuserRepository.find();

    if (customDeffuserData == null) {
      res.status = 404;
      return res;
    }

    return customDeffuserData;
  }
}
