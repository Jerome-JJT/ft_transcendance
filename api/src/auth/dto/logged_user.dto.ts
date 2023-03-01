import { ApiProperty } from '@nestjs/swagger';


export class LoggedUserDto {
    @ApiProperty({ type: Number })
    id: number;

    @ApiProperty({ type: String })
    login_name: string;

    @ApiProperty({ type: String })
    pseudo: string;

    @ApiProperty({ type: String })
    avatar_url?: string;

    @ApiProperty({ type: Boolean })
    is_admin: boolean;

    @ApiProperty({ type: Boolean })
    is_tfa: boolean;
}
