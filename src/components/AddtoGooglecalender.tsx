import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CalendarApp = function () {
  const CLIENT_ID = 'YOUR_CLIENT_ID';
  const API_KEY = 'YOUR_API_KEY';
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  useEffect(() => {
    const DISCOVERY_DOCS = [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    ];

    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => gapi.client.load('calendar', 'v3'))
        .catch((error) => {
          console.error('Error loading calendar:', error);
        });
    });
  }, [API_KEY, CLIENT_ID, SCOPES]);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const addEvent = async () => {
    const event = {
      summary: '新しいイベント',
      location: 'オンライン',
      description: '説明を入力',
      start: {
        dateTime: '2024-11-05T10:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2024-11-05T12:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
    };

    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      console.log('イベントが作成されました:', response);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleAuthClick}>
        Googleにサインイン
      </button>
      <button type="button" onClick={handleSignOutClick}>
        サインアウト
      </button>
      <button type="button" onClick={addEvent}>
        イベントを追加
      </button>
    </div>
  );
};

export default CalendarApp;
