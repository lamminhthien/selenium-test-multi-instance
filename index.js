const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const roomCode = "e7kmc"
const minuteWaiting = 10 * 1000 * 1000;

// Function to create a new WebDriver instance for Chrome
async function createChromeInstance () {
  // Set up Chrome options for headless mode
  let options = new chrome.Options();
  options.addArguments('--headless'); // Maximize the browser window

  // Create a new WebDriver instance using Chrome options
  let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  return driver;
}

// Function to perform actions on a WebDriver instance
async function performActions (driver) {
  try {
    // Navigate to a website
    await driver.get(`https://www.quizne.com/room/${roomCode}/multiple-play`)
    await driver.manage().window().setRect({ width: 1920, height: 993 })
    await driver.sleep(10000);
    await driver.findElement(By.name("name")).sendKeys("a")
    await driver.actions().sendKeys(Key.RETURN).perform();

  } finally {
    // Waiting
    await driver.sleep(minuteWaiting);
    // Close the browser
    await driver.quit();
  }
}

// Create and run multiple instances of Chrome concurrently
async function main () {
  const numberOfInstances = 3; // Change this to the number of instances you want to run

  const drivers = [];
  for (let i = 0; i < numberOfInstances; i++) {
    const driver = await createChromeInstance();
    drivers.push(driver);
  }

  // Perform actions on each WebDriver instance concurrently
  await Promise.all(drivers.map(driver => performActions(driver)));
}

main();
