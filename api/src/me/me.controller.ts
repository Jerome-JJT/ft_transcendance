import { Controller, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, UseGuards, Request, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { AllowLogged, AllowPublic } from 'src/auth/auth.decorators';
import { MeService } from './me.service';
import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';


import { FriendModel } from 'src/friends/models/friend.model';
import { UserModel } from 'src/users/models/user.model';
import { BlockedModel } from 'src/blockeds/models/blocked.model';
import { ChatParticipantModel } from 'src/chat_participants/models/chat_participant.model';



@Controller('api/me')
@ApiTags('api/me')
@AllowLogged()
export class MeController {
    constructor(private meService: MeService) { }

    
    @Get()
    @ApiOkResponse({ description: 'User infos retrieved successfully', type: LoggedUserDto})
    getMe(@Request() req: any): LoggedUserDto {
        return req.user as LoggedUserDto;
    }


    @Get('friends')
    @ApiOkResponse({ description: 'Friends retrieved successfully', type: [FriendModel] })
    public listFriendships(@Request() req: any): Promise<UserModel[]> {

        return this.meService.listFriends(req.user as LoggedUserDto);
    }
    
    @Post('friends/:id')
    @ApiCreatedResponse({ description: 'Friend created successfully', type: FriendModel })
    @ApiBadRequestResponse({ description: 'Friend validation error' })
    public createFriendship(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<FriendModel> {

        return this.meService.addFriend(req.user as LoggedUserDto, id);
    }

    @Delete('friends/:id')
    @ApiNoContentResponse({ description: 'Friend deleted successfully' })
    @ApiBadRequestResponse({ description: 'Friend validation error' })
    public deleteFriendship(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<void> {

        return this.meService.removeFriend(req.user as LoggedUserDto, id);
    }

    @Get('blockeds')
    @ApiOkResponse({ description: 'Blockeds retrieved successfully', type: [FriendModel] })
    public listBlockeds(@Request() req: any): Promise<BlockedModel[]> {

        return this.meService.listBlockeds(req.user as LoggedUserDto);
    }

    @Get('blockedby')
    @ApiOkResponse({ description: 'Blockeds by retrieved successfully', type: [FriendModel] })
    public listBlockedBy(@Request() req: any): Promise<BlockedModel[]> {

        return this.meService.listBlockedBy(req.user as LoggedUserDto);
    }
    
    @Post('frienblockedds/:id')
    @ApiCreatedResponse({ description: 'Blocked created successfully', type: BlockedModel })
    @ApiBadRequestResponse({ description: 'Blocked validation error' })
    public createBlocked(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<BlockedModel> {

        return this.meService.addBlocked(req.user as LoggedUserDto, id);
    }

    @Delete('blocked/:id')
    @ApiNoContentResponse({ description: 'Blocked deleted successfully' })
    @ApiBadRequestResponse({ description: 'Blocked validation error' })
    public deleteBlocked(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<void> {

        return this.meService.removeBlocked(req.user as LoggedUserDto, id);
    }


    @Get('chats')
    @ApiOkResponse({ description: 'Blockeds retrieved successfully', type: [ChatParticipantModel] })
    public chats(@Request() req: any): Promise<ChatParticipantModel[]> {

        return this.meService.listChats(req.user as LoggedUserDto);
    }

    // @Get('blockedby')
    // @ApiOkResponse({ description: 'Blockeds by retrieved successfully', type: [FriendModel] })
    // public listBlockedBy(@Request() req: any): Promise<BlockedModel[]> {

    //     return this.meService.listBlockedBy(req.user as LoggedUserDto);
    // }
    
    // @Post('frienblockedds/:id')
    // @ApiCreatedResponse({ description: 'Blocked created successfully', type: BlockedModel })
    // @ApiBadRequestResponse({ description: 'Blocked validation error' })
    // public createBlocked(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<BlockedModel> {

    //     return this.meService.addBlocked(req.user as LoggedUserDto, id);
    // }

    // @Delete('blocked/:id')
    // @ApiNoContentResponse({ description: 'Blocked deleted successfully' })
    // @ApiBadRequestResponse({ description: 'Blocked validation error' })
    // public deleteBlocked(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<void> {

    //     return this.meService.removeBlocked(req.user as LoggedUserDto, id);
    // }
}