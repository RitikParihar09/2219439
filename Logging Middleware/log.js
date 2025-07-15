const fetch = require("node-fetch");
async function Log(level, package, message) {
  try {
    const validLevels = ["debug", "info", "warn", "error", "fatal"];
    if (!validLevels.includes(level.toLowerCase())) throw new Error("Invalid log level");
    if (package.toLowerCase() !== "api") throw new Error("Invalid package for frontend");

    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyaXRpa3BhcmloYXIuMjIwMTE1NTRAZ2VodS5hYy5pbiIsImV4cCI6MTc1MjU1NzgwNywiaWF0IjoxNzUyNTU2OTA3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTUwYzA1ZTctYWMyMC00NjgzLWJhYmUtZjRlMGM0MmU0Y2NjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicml0aWsgcGFyaWhhciIsInN1YiI6IjQyYWEzY2M2LTU4MjAtNDllNi1hNjY2LTZhMjAwZjc0NTRjNiJ9LCJlbWFpbCI6InJpdGlrcGFyaWhhci4yMjAxMTU1NEBnZWh1LmFjLmluIiwibmFtZSI6InJpdGlrIHBhcmloYXIiLCJyb2xsTm8iOiIyMjE5NDM5IiwiYWNjZXNzQ29kZSI6IlFBaERVciIsImNsaWVudElEIjoiNDJhYTNjYzYtNTgyMC00OWU2LWE2NjYtNmEyMDBmNzQ1NGM2IiwiY2xpZW50U2VjcmV0IjoidFpQRkRoSmFKemdTd1hQcCJ9.UT9c4BKenbbjGYniN1dP4OwFAcLLzNqUXgIMh6xOrbI"
      },
      body: JSON.stringify({
        stack: "frontend",
        level: level.toLowerCase(),
        package: package.toLowerCase(),
        message: message
      })
    });

    const responseBody = await res.json();
    console.log("✅ Log sent:", responseBody);
  } catch (err) {
    console.error("❌ Log failed:", err.message);
  }
}
Log("info", "api", "User clicked login button");
