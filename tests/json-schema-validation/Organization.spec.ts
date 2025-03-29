import { test, expect } from '@playwright/test';
import { workspaceName } from '../../test-data/Data';
import { organizationSchema } from '../../zod-json-schemas/Organization';

test.describe('JSON Schema Validation', { 
  tag: ['@api', '@schemaValidation'] 
}, async () => {
  let organizationId: string;

  test('Create An Organization', async ({ request }) => {
    const createOrganization = await request.post('organizations', {
      data: {
        'displayName': workspaceName,
        'website': "https://trello.com/"
      }
    });
    expect(createOrganization.status()).toBe(200);
    const response = await createOrganization.json();
    organizationId = response.id;   
  });

  test('Validate The Organization JSON Schema', async ({ request }) => {
    const getOrganization = await request.get(`organizations/${organizationId}`);
    expect(getOrganization.status()).toBe(200);
    const response = await getOrganization.json();
    expect(() => organizationSchema.parse(response)).not.toThrow();
  });

  test('Delete The Organization', async ({ request }) => {
    const deleteBoard = await request.delete(`organizations/${organizationId}`);
    expect(deleteBoard.status()).toBe(200);
  });
});