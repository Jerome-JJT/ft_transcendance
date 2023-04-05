import { Logger, Request, UseFilters, UseGuards } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WsAuthGuard } from 'src/auth/auth-strategy/ws-auth.guard';
import { WebsocketExceptionsFilter } from 'src/_common/filters/ws-exception.filter';

import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';
import { GamesService } from './games.service';
import { Interval } from '@nestjs/schedule';




@WebSocketGateway({ path: '/socket-game/', cors: { origin: '*' } })
@UseFilters(WebsocketExceptionsFilter)
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() server: Server;
	constructor(
		private readonly gamesService: GamesService,
	) { }

	private readonly logger = new Logger('adasd');

	handleConnection(@ConnectedSocket() client: Socket): void {


	}

	handleDisconnect(@ConnectedSocket() client: Socket): void {

		// Dont remove from set => multiple connections => let interval manage
	}



	@Interval('syncConnecteds', 3000)
	syncConnecteds() {

		let connected: Set<number> = new Set<number>();

		this.server.sockets.sockets.forEach((value) => {
			if (value.data.loggedId !== undefined)
				connected.add(value.data.loggedId);
		});

		this.gamesService.connecteds = connected;
	}





	@SubscribeMessage('identify')
	@UseGuards(WsAuthGuard)
	async identify(@ConnectedSocket() client: Socket): Promise<{ error: string | undefined }> {

		const user = (client.handshake as any).user as LoggedUserDto;

		if (!user || user.id == undefined) {
			return { error: 'Not logged' };
		}

		client.data = { ...client.data, loggedId: user.id };

		if (client.data.loggedId !== undefined)
			this.gamesService.connecteds.add(client.data.loggedId)


		return { error: undefined };
	}


	@SubscribeMessage('inviteGame')
	async inviteGame(client: Socket, body: { invited_id: number }): Promise<void> {

		if (client.data.loggedId === undefined) {
			throw new WsException('Not identified');
		}

		let game_id = client.data.loggedId;
		let game_function = () => {
			this.gamesService.gameLife(this.server, game_id);
		}

		this.gamesService.createGame(client, client.data.loggedId, body.invited_id, game_id, game_function);
	}


	@SubscribeMessage('joinGame')
	async joinGame(client: Socket, body: { game_id: number }): Promise<void> {

		if (client.data.loggedId === undefined) {
			throw new WsException('Not identified');
		}

		this.gamesService.joinGame(client, client.data.loggedId, body.game_id);
	}


	@SubscribeMessage('sendAction')
	async sendAction(client: Socket, body: { game_id: number, actions: string[] }): Promise<void> {

		if (client.data.loggedId === undefined) {
			throw new WsException('Not identified');
		}
		// console.log('play')

		this.gamesService.playGame(client.data.loggedId, body.game_id, body.actions);

	}



}
