import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';

import { CreateRoomDto } from './dto/create-room.dto';
import { RaiseHandDto } from './dto/hand-raise.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() dto: CreateRoomDto) { return this.roomsService.create(dto); }

  @Get()
  findAll() { return this.roomsService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.roomsService.findOne(id); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoomDto) { return this.roomsService.update(id, dto); }

  @Delete(':id')
  close(@Param('id') id: string) { return this.roomsService.close(id); }

  @Post(':id/join')
  join(@Param('id') id: string, @Body('userId') userId: string) { return this.roomsService.join(id, userId); }

  @Post(':id/leave')
  leave(@Param('id') id: string, @Body('userId') userId: string) { return this.roomsService.leave(id, userId); }

  @Post(':id/raise-hand')
  raiseHand(@Param('id') id: string, @Body() dto: RaiseHandDto) { return this.roomsService.raiseHand(id, dto); }

  @Get(':id/raise-hand')
  listRaiseHands(@Param('id') id: string) { return this.roomsService.listRaiseHands(id); }

  @Post(':id/raise-hand/:raiseId/approve')
  approveRaise(@Param('id') id: string, @Param('raiseId') raiseId: string) { return this.roomsService.approveRaise(id, raiseId); }

  @Post(':id/raise-hand/:raiseId/reject')
  rejectRaise(@Param('id') id: string, @Param('raiseId') raiseId: string) { return this.roomsService.rejectRaise(id, raiseId); }

  @Post(':id/mute-all')
  muteAll(@Param('id') id: string) { return this.roomsService.muteAll(id); }
}
