import { Body, Controller, NotFoundException, Post, Res, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DefaultResponseDto } from 'src/dto/response/default.response';
import { DeffuserService } from './deffuser.service';
import { Response } from 'express';
import { AddDeffuserRequest } from 'src/dto/request/add-deffuser.request';
import { AddCustomDeffuserRequest } from 'src/dto/request/add-customDeffuser.request';

@ApiTags('디퓨저 API')
@Controller('deffuser')
export class DeffuserController {
    constructor (
        private deffuserService: DeffuserService,
    ) {}
    
    //일반 디퓨저 추가
    @Post('')
    @ApiOperation({summary:'디퓨저 정보 추가', description:'새로운 디퓨저 정보 추가'})
    @ApiResponse({status:201,description:'새로운 디퓨저 정보를 추가했습니다.'})
    @ApiResponse({status:404,description:'새로운 디퓨저 정보를 추가하지 못했습니다.'})
    async addDeffuser(@Body() deffuserDto: AddDeffuserRequest, @Res() response: Response){
        const res: DefaultResponseDto = await this.deffuserService.addDeffuser(deffuserDto);

        if(res.status===201){
            return response.status(201).json({ message: '새로운 디퓨저 정보를 추가했습니다.'})
        }

        throw new NotFoundException('새로운 디퓨저 정보를 추가하지 못했습니다.')
    }

    //일반 디퓨저 정보
    @Get('')
    @ApiOperation({summary:'디퓨저 정보 가져오기', description:'모든 디퓨저 정보를 가져옵니다.' })
    @ApiResponse({status:200,description:'data.'})
    @ApiResponse({status:404,description:'디퓨저 정보가 없습니다.'})
    async getDeffuser(){
        const data = await this.deffuserService.getDeffuser();

        if(data!==null){
            return data;
        }

        throw new NotFoundException('저장된 디퓨저 정보를 불러오지 못했습니다.')
    }

    //커스텀 디퓨저 추가
    @Post('/custom')
    @ApiOperation({summary:'커스텀 디퓨저 정보 추가', description:'새로운 커스텀 디퓨저 정보 추가'})
    @ApiResponse({status:201,description:'새로운 커스텀 디퓨저 정보를 추가했습니다.'})
    @ApiResponse({status:404,description:'새로운 커스텀 디퓨저 정보를 추가하지 못했습니다.'})
    async addCustomDeffuser(@Body() customDeffuserDto: AddCustomDeffuserRequest, @Res() response: Response){
        const res: DefaultResponseDto = await this.deffuserService.addCustomDeffuser(customDeffuserDto);

        if(res.status===201){
            return response.status(201).json({ message: '새로운 커스텀 디퓨저 정보를 추가했습니다.'})
        }

        throw new NotFoundException('새로운 커스텀 디퓨저 정보를 추가하지 못했습니다.')
    }

    //커스텀 디퓨저 정보
    @Get('/custom')
    @ApiOperation({summary:'커스텀 디퓨저 정보 가져오기', description:'모든 커스텀 디퓨저 정보를 가져옵니다.' })
    @ApiResponse({status:201,description:'data.'})
    @ApiResponse({status:404,description:'커스텀 디퓨저 정보가 없습니다.'})
    async getCustomDeffuser(){
        const data = await this.deffuserService.getCustomDeffuser();

        if(data!==null){
            return data;
        }

        throw new NotFoundException('저장된 커스텀 디퓨저 정보를 불러오지 못했습니다.')
    }

}
