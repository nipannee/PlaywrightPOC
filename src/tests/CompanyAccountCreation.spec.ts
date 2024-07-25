import accountDetails from '../shared/data/accountDetails.json';
import loginData from '../shared/data/loginData.json';
import { expect, test } from '../shared/fixtures/base.ts';

test.describe('Account Creation for Company', ()=> {
    test('Account Creation with full data', async ({ loginPage, pageUtils, accountPage, page }) => {
        await page.goto(loginData.URL);
        await accountPage.accountSubMenu().click();
        await pageUtils.selectDropdown('New Account');
    
        await page.waitForLoadState('networkidle');
        await accountPage.company().fill(accountDetails.companyAccount.CompanyName);

        Promise.all([
            page.waitForLoadState('networkidle'),
            accountPage.searchButton().click()
        ])
    
        await accountPage.createAccount().scrollIntoViewIfNeeded();
        await accountPage.createAccount().click();
        await pageUtils.selectDropdown(accountDetails.companyAccount.account);
    
        await accountPage.officePhone().fill(accountDetails.companyAccount.officePhone);
        await accountPage.primaryEmail().fill(accountDetails.companyAccount.primaryEmail);
      

        Promise.all([ 
            page.waitForLoadState('load'), 
            (await accountPage.country().nth(0).selectOption(accountDetails.companyAccount.country))
        ])
        
        await accountPage.addressLine1().click();
        await accountPage.addressLine1().fill(accountDetails.companyAccount.address1);
        await accountPage.city().fill(accountDetails.companyAccount.town);
        await accountPage.postalCode().click();
        await accountPage.postalCode().fill(accountDetails.companyAccount.postalCode)
        
        await accountPage.addressType().selectOption(accountDetails.companyAccount.addressType);
        await accountPage.orgType().selectOption(accountDetails.companyAccount.orgType);
        
        await accountPage.orgSearch().click();
        await page.waitForLoadState('networkidle')
        await accountPage.organization().fill(accountDetails.organization);
        await accountPage.orgNameSearch().click()
        await accountPage.orgSelect().click()
    
        await page.waitForLoadState('networkidle')
        await accountPage.producerCode().selectOption(accountDetails.producerCode)
        await accountPage.updateButton().click()
    
        await page.waitForLoadState('networkidle')
        
        await expect(await accountPage.accountHolderPostCreation()).toHaveText(accountDetails.companyAccount.CompanyName)
        
    })
})