import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
  const token = configService.get('TELEGRAM_TOKEN');
  const chatId = configService.get('TELEGRAM_CHAT_ID') ?? '';
  if (!token) {
    throw new Error('No TELEGRAM_TOKEN');
  }
  return {
    token,
    chatId,
  };
};
