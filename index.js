const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Function to create a new WebDriver instance for Chrome
async function createChromeInstance () {
  let options = new chrome.Options();
  options.addArguments('start-maximized'); // Maximize the browser window

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
    await driver.get('https://quizne.com');

    // // Find an element and perform an action (e.g., click a link)
    // const link = await driver.findElement(By.linkText('Example Link'));
    // await link.click();

    // // Wait for a specific condition (e.g., element to be visible)
    // await driver.wait(until.elementIsVisible(link), 5000);

    await driver.get("https://www.quizne.com/")
    // 2 | setWindowSize | 1920x993 | 
    // await driver.manage().window().setRect({ width: 1920, height: 993 })
    // // 3 | click | css=.hover\3A cursor-pointer:nth-child(1) > .relative > .rounded-lg | 
    // await driver.findElement(By.css(".hover\\3A cursor-pointer:nth-child(1) > .relative > .rounded-lg")).click()
    // // 4 | click | css=.abc-backdrop | 
    // await driver.findElement(By.css(".abc-backdrop")).click()
    // // 5 | click | css=.hover\3A cursor-pointer:nth-child(2) > .relative > .rounded-lg | 
    // await driver.findElement(By.css(".hover\\3A cursor-pointer:nth-child(2) > .relative > .rounded-lg")).click()
    // // 6 | click | css=.abc-backdrop | 
    // await driver.findElement(By.css(".abc-backdrop")).click()
    // // 7 | click | css=.hover\3A cursor-pointer:nth-child(3) > .relative > .rounded-lg | 
    // await driver.findElement(By.css(".hover\\3A cursor-pointer:nth-child(3) > .relative > .rounded-lg")).click()
    // // 8 | click | css=.abc-backdrop | 
    // await driver.findElement(By.css(".abc-backdrop")).click()
    await driver.pause(5000);

  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Create and run multiple instances of Chrome concurrently
async function main () {
  const numberOfInstances = 10; // Change this to the number of instances you want to run

  const drivers = [];
  for (let i = 0; i < numberOfInstances; i++) {
    const driver = await createChromeInstance();
    drivers.push(driver);


  }

  // Perform actions on each WebDriver instance concurrently
  await Promise.all(drivers.map(driver => performActions(driver)));
}

main();
