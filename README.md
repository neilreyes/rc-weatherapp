# Test scenario #1: WeatherApp

## Installation

1. Clone the repository

```bash
git clone https://github.com/neilreyes/rc-weatherapp.git
```

2. Create `.env` file to root directory and replace your Accuweather API Key to the above code

```
REACT_APP_ACCUWEATHER_KEY=YOUR_API_KEY_HERE
```

3. Run `npm install`

4. Run `npm run start`

## Todo list improvements

- [ ] Add loading interaction when button is clicked
- [ ] Add animation when page loads
- [ ] 3 day forecasts boxes clickable, in carousel
- [ ] Use routing feature (react router)
- [ ] Autopopulate top 50 locations (Accuweather request) when user clicks on the search box

## Dependencies

```json
{
...
"axios": "^0.27.2",
"bootstrap": "^5.1.3",
"react-bootstrap": "^2.3.1",
"react-moment": "^1.1.2",
"sass": "^1.51.0",
...
}
```
