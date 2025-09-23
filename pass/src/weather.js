import chalk from 'chalk';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
};
const api_key='4b3e7e6a4b4b4b4b4b4b4b4b4b4b4b4b'
const api_url='https://api.openweathermap.org/data/2.5/weather'

const getWeather = async (city) => {
  const url = `${api_url}?q=${city}&appid=${api_key}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      console.log(chalk.red(data.message));
    } else {
      console.log(
        chalk.blue(
          `🌤️ Current temperature in ${data.name} is ${data.main.temp}°C, feels like ${data.main.feels_like}°C`
        )
      );
    }
  } catch (error) {
    console.log(chalk.red(error.message));
  }
};

const city =  await askQuestion("Enter city name: ");
await getWeather(city);
rl.close();
