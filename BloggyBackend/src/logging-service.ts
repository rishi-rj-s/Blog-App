// logging.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);

  logRequest(req: any, method: string, type: string) {
    // Only log non-OPTIONS requests
    if (method !== 'OPTIONS') {
      const logParts = [
        `Request Type: ${type}`,
        `Method: ${method}`,
        `URL: ${req.url}`,
      ];

      if (req.body && Object.keys(req.body).length > 0) {
        logParts.push(`Body: ${JSON.stringify(req.body)}`);
      }

      const logMessage = logParts.join(', ');
      this.logger.log(logMessage);
    }
  }
}