import https from 'https'
import chalk from 'chalk'
import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const currency = () => {
    const url = 'https://api.exchangerate-api.com/v4/latest/USD';
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            const exchangeRates = JSON.parse(data);

            rl.question("Enter amount usd: ", (amount) => {
                rl.question("Convert to: ", (currency) => {
                    const rate = exchangeRates.rates[currency.toUpperCase()];
                    if (rate) {
                        const convertedAmount = amount * rate;
                        console.log(chalk.green(`Amount in ${currency}: ${convertedAmount.toFixed(2)}`));
                    } else {
                        console.log(chalk.red('Invalid currency code. Please try again.'));
                    }
                    rl.close();
                });
            });


        });
    });
}
currency();
