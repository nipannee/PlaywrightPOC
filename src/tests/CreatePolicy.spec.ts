import { expect, test } from '../shared/fixtures/base.ts';

test.describe('Create Policy', ()=> {
    test('Create D&O Policy', async ({ readAndWriteExcel, homePage, accountPage, submissionPage, page }) => {
        
        await page.goto('/pc/PolicyCenter.do');
        let accNumber:string = await accountPage.createNewAccount(readAndWriteExcel);
         
        const submId = await submissionPage.createSubmission(accNumber);
        await expect(submId).toMatch(submissionPage.idNumberFormat);

        await submissionPage.quoteSubmission();
        await expect(submissionPage.submStatus()).toHaveText('Quoted')

        await submissionPage.issuePolicy();
        await expect( homePage.pageTitle()).toHaveText('Submission Bound');
    })
})