const webdriver = require("selenium-webdriver");

function createDriver() {
    const driver = new webdriver.Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    driver.manage().timeouts().setScriptTimeout(10000);
    return driver;
}

const driver = createDriver();

driver.get('https://time.epam.com')
    .then(() => logTitle())                                                                                                      // LOCATORS
    .then(() => driver.findElement(webdriver.By.xpath(".//div[@class='uui-caption _14hb7 _1Tyuz _28Nyy']")).click())             // week
    .then(() => driver.findElement(webdriver.By.className("JournalHeader_total-norm__1u04u")).getText(40))                       // 40h per week
    .then(() => driver.findElement(webdriver.By.className("TaskName_add-activity-action__1R0En")).click())                       // add task
    .then(() => driver.findElement(webdriver.By.css("input.ActivityName_activity-name-input__95T_F  ")).sendKeys(Task))          // input task
    .then(() => driver.findElement(webdriver.By.className("date-value")).getText('Sep 30 - Oct 6'))                              // week date
    .then(() => driver.sleep(5000))
    .then(() => logResult())
    .then(() => driver.findElement(webdriver.By.css("ProjectName_project-name__jOOU0")).getText('WKL-GLA'))                       // task header
    .then(() => driver.findElement(webdriver.By.css("ProjectName_project-name__jOOU0")).click())                                  // close tasks
    .then(() => driver.findElement(webdriver.By.css("ProjectName_project-name__jOOU0")).click())                                  // close tasks
    .then(() => driver.findElement(webdriver.By.css("input.ActivityName_activity-name-input__95T_F  ")).clear())                  // clear task
    .then(() => driver.findElement(webdriver.By.css("input.ActivityName_activity-name-input__95T_F  ")).sendKeys(NewTaskName))    // new task
    .then(() => driver.findElement(webdriver.By.css('span.VacationCell_duration__1AcxC"]')).click())                              // new time
    .then(() => driver.findElement(webdriver.By.xpath(".//input[@class='JournalCellInput_cell-input__3fMEB']")).sendKeys(4.5))    // input time
    .then(() => driver.findElement(webdriver.By.xpath(".//button[@data-name='SAVE']")).click())                                   // save time
    .then(() => driver.sleep(5000))
    .then(() => logResult())
    .then(() => driver.quit());

function logResult() {
    driver.findElement(webdriver.By.cssContainingText(".uui-caption _14hb7 _1Tyuz _3nLHU", Today)).getText().then((text) => console.log("latest performed operation result is ", text));
}

function logTitle() {
    driver.getTitle().then(function (title) {
        console.log('Current Page Title: ' + title);
    });
}