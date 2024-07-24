import accountDetails from '../shared/data/accountDetails.json';
import { expect, test } from '../shared/fixtures/base';
import loginData from '../shared/data/loginData.json';


test('Test to Enter Both Person and Company Details', async ({ loginPage, accountPage, page }) => {
   
    await page.goto(loginData.URL);
    await accountPage.accountSubMenu().click();
    await accountPage.dropdown().click();

    await accountPage.company().click()
    await accountPage.company().fill(accountDetails.negTC_both.company);
    await accountPage.firstName().fill(accountDetails.firstName);
    await accountPage.lastName().fill(accountDetails.lastName);

   Promise.all([
        page.waitForLoadState('load'),
        accountPage.searchButton().click()
    ])
    
    await expect(await accountPage.errorMessage()).toHaveText(accountDetails.negTC_both.errorMsg);

})