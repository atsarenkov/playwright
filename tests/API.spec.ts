import { test, expect } from '@playwright/test';

test.describe.serial('Trello API', async () => {
    const boardName = 'My Board';
    let boardId: string;

    test('Create A Board', async ({ request }) => {
        const createBoard = await request.post('boards', {
            params: { name: boardName },
            data: {
                'prefs_permissionLevel': 'public',
                'prefs_background': 'green'
            }
          });
        expect(createBoard.status()).toBe(200);
        const response = await createBoard.json();
        expect(response).toMatchObject({
            'prefs': {
                'permissionLevel': 'public',
                'background': 'green'
            }
        });
        boardId = response.id;   
    });

    test('Get A Board', async ({ request }) => {
        const getBoard = await request.get(`boards/${boardId}`);
        expect(getBoard.status()).toBe(200);
        const response = await getBoard.json();
        expect(response).toHaveProperty('name', boardName);
    });

    test('Update A Board', async ({ request }) => {
        const updateBoard = await request.put(`boards/${boardId}`, {
            params: { desc: 'Agile Board' },
          });
        expect(updateBoard.status()).toBe(200);
        const response = await updateBoard.json();
        expect(response).toHaveProperty('desc', 'Agile Board');
    });

    test('Delete A Board', async ({ request }) => {
        const deleteBoard = await request.delete(`boards/${boardId}`);
        expect(deleteBoard.status()).toBe(200);
    });
});