# ChemiBot
A simple chemistry bot for slack to give basic info about elements, compounds and some fun facts about a daily element.

<img src = 'Chemibot-screenshot.png' alt = 'ChemiBot screenshot'>

## Commands
| Command | Description |
| --- | --- |
| `/chemibot-ping` | Check latency | 
| `/chemibot-help` | Get a list of all available commands |
| `/chemibot-element [Atomic number]` | Get data about a specific element |
| `/chemibot-daily` | Get some info and fun facts about a daily element (Rotates through all 118) |
| `/chemibot-molar-mass [Formula]` | Get the molar mass of a compound |

## How to run
### Prerequisites
- Node.js
- A slack bot and connected workspace
### Setup
1. Clone repo
```bash
git clone https://github.com/RasmusStenlund/ChemiBot.git
cd ChemiBot
```
2. Install dependencies
```bash
npm install dotenv axios @slack/bolt
```
3. Create .env file and replace with your tokens
```
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_APP_TOKEN=xapp-your-app-token-here
```
4. Run app
```bash
node index.js
```

## Credits
<a href="https://periodictableofelements.org">Data from PeriodicTableOfElements.org</a>
