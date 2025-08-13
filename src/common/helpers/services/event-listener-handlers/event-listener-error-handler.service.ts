import { Injectable } from '@nestjs/common';

@Injectable()
export class EventListenerErrorHandlerService {
  async eventListenerErrorHandler(event: string, handler: () => Promise<void>) {
    try {
      await handler();
    } catch (error) {
      console.error(`Error in event listener for event ${event}`, error);
      throw error;
    }
  }
}
