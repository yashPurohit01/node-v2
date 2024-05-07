import { Body, Controller, Post } from '@nestjs/common';
import { CalcService } from './calc.service';
import { CalcDto } from './calc.dto';

@Controller('calc')
export class CalcController {
  constructor(private readonly calcService: CalcService) {}

  @Post('/')
  calc(@Body() calcBody: CalcDto) {
    console.log(calcBody)
    return this.calcService.calculateExpression(calcBody);
   
  }
}
