import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FarazSmsService {
  private readonly logger = new Logger(FarazSmsService.name);

  async sendOtp(phone: string, code: string) {
    // TODO: integrate Faraz SMS HTTP API with API key/line number.
    this.logger.log(`Mock Faraz SMS -> ${phone}: ${code}`);
    return { ok: true };
  }
}
