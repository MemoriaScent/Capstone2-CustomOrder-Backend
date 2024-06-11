import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponseDto } from 'src/dto/response/default.response';
import { CustomDeffuserEntity } from 'src/entity/customDeffuser.entity';
import { DiffuserEntity } from 'src/entity/diffuser.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeffuserService {
    constructor(
        @InjectRepository(DiffuserEntity)
        private deffuserRepository: Repository<DiffuserEntity>,
        @InjectRepository(CustomDeffuserEntity)
        private customDeffuserRepository:Repository<CustomDeffuserEntity>,
    ) { }

    //일반 디퓨저 정보 저장
    async addDeffuser(body) {
        const res: DefaultResponseDto = new DefaultResponseDto();

        const addDeffuser = await this.deffuserRepository.save(body);


        res.status = addDeffuser ? 201 : 404;

        res.data = addDeffuser ? { message: '실행 완료' } : { message: '오류' };

        return res;
    }

    //일반 디퓨저 정보 가져오기
    async getDeffuser(){
        const res: DefaultResponseDto = new DefaultResponseDto();

        const deffuserData =  await this.deffuserRepository.find();
        
        if(deffuserData==null){
            res.status=404;
            return res;
        }

        return deffuserData;
    }

    //커스텀 디퓨저 저장
    async addCustomDeffuser(body) {
        const res: DefaultResponseDto = new DefaultResponseDto();

        const addCustomDeffuser = await this.customDeffuserRepository.save(body);

        res.status = addCustomDeffuser ? 201 : 404;

        res.data = addCustomDeffuser ? { message: '실행 완료' } : { message: '오류' };

        return res;
    }

    //커스텀 디퓨저 정보 가져오기
    async getCustomDeffuser(){
        const res: DefaultResponseDto = new DefaultResponseDto();
        
        const customDeffuserData =  await this.customDeffuserRepository.find();

        if(customDeffuserData==null){
            res.status=404;
            return res;
        }

        return customDeffuserData;
    }


}
