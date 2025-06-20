import axios from 'axios';

interface ZoomMeeting {
  topic: string;
  type: number;
  start_time: string;
  duration: number;
  timezone: string;
  settings: {
    host_video: boolean;
    participant_video: boolean;
    join_before_host: boolean;
    waiting_room: boolean;
  };
}

export default {
  async createZoomMeeting(eventData: any) {
    try {
      const { ZOOM_API_KEY, ZOOM_API_SECRET, ZOOM_USER_ID } = process.env;

      if (!ZOOM_API_KEY || !ZOOM_API_SECRET || !ZOOM_USER_ID) {
        throw new Error('Missing Zoom API configuration');
      }

      // Generate JWT token for Zoom API authentication
      const token = await this.generateZoomJWT(ZOOM_API_KEY, ZOOM_API_SECRET);

      // Calculate meeting duration in minutes
      const startTime = new Date(eventData.date);
      const duration = 60; // Default 1 hour duration

      const meetingConfig: ZoomMeeting = {
        topic: eventData.title,
        type: 2, // Scheduled meeting
        start_time: startTime.toISOString(),
        duration,
        timezone: 'Europe/Istanbul',
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          waiting_room: true,
        },
      };

      const response = await axios.post(
        `https://api.zoom.us/v2/users/${ZOOM_USER_ID}/meetings`,
        meetingConfig,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        meetingId: response.data.id,
        joinUrl: response.data.join_url,
        startUrl: response.data.start_url,
      };
    } catch (error) {
      console.error('Error creating Zoom meeting:', error);
      throw error;
    }
  },

  async generateZoomJWT(apiKey: string, apiSecret: string): Promise<string> {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const payload = {
      iss: apiKey,
      exp: ((new Date()).getTime() + 5000),
    };

    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const crypto = require('crypto');
    const signature = crypto.createHmac('sha256', apiSecret)
      .update(signatureInput)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    return `${signatureInput}.${signature}`;
  },

  async deleteZoomMeeting(meetingId: string) {
    try {
      const { ZOOM_API_KEY, ZOOM_API_SECRET, ZOOM_USER_ID } = process.env;

      if (!ZOOM_API_KEY || !ZOOM_API_SECRET || !ZOOM_USER_ID) {
        throw new Error('Missing Zoom API configuration');
      }

      const token = await this.generateZoomJWT(ZOOM_API_KEY, ZOOM_API_SECRET);

      await axios.delete(
        `https://api.zoom.us/v2/meetings/${meetingId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error deleting Zoom meeting:', error);
      throw error;
    }
  },
}; 