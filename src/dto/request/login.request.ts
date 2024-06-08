import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest{
    @ApiProperty({
        example: '123',
        description: '사용자 이메일',
    })
    email:string;

    @ApiProperty({
        example: '234',
        description: '사용자 비밀번호',
    })
    pw:string;
}
