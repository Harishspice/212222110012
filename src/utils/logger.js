const LOG_API = 'http://20.244.56.144/evaluation-service/logs';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoYXJpc2hyLnNoYW5rYXJAZ21haWwuY29tIiwiZXhwIjoxNzUyNjYyMTIwLCJpYXQiOjE3NTI2NjEyMjAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2ZTEwMzUzZC1mOWFhLTQ0MDItODEyYS1mMmIzYjYzMzU5YTgiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJoYXJpc2ggciIsInN1YiI6ImY0Y2QyY2EzLWJiOTQtNDZmOC04NDE3LTZhMjM5Nzg0MThiZSJ9LCJlbWFpbCI6ImhhcmlzaHIuc2hhbmthckBnbWFpbC5jb20iLCJuYW1lIjoiaGFyaXNoIHIiLCJyb2xsTm8iOiIyMTIyMjIxMTAwMTIiLCJhY2Nlc3NDb2RlIjoicWd1Q2ZmIiwiY2xpZW50SUQiOiJmNGNkMmNhMy1iYjk0LTQ2ZjgtODQxNy02YTIzOTc4NDE4YmUiLCJjbGllbnRTZWNyZXQiOiJUS2JScktVV1FYR2tOUFdxIn0.weMcNt6pwiYntsJkAZAkAaoaN6Em5LEhkJcG03IO7DU'; 

export async function logEvent({ level = 'info', message = '', stack = 'frontend', pkg = 'shortener' }) {
  try {
    await fetch(LOG_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': TOKEN
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });
  } catch (error) {

  }
}