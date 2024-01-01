import { test, expect } from '@playwright/test';
import { organizationId } from '../test-data/Data';
import { organizationSchema } from '../zod-schemas/organization';

test.describe('@api @schemaValidation', async () => {
  test('Validate JSON Schema', async ({ request }) => {
    const getOrganization = await request.get(`organization/${organizationId}`);
    expect(getOrganization.status()).toBe(200);
    const response = await getOrganization.json();
    expect(() => organizationSchema.parse(response)).not.toThrow();
  });
});