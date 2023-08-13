const randomNumber = Math.floor(Math.random() * 900) + 100;
// Authentication 
export const email = process.env.EMAIL!;
export const password = process.env.PASSWORD!;
export const key = process.env.KEY!;
export const token = process.env.TOKEN!;
// Functional tests data
export const workspaceName = `Workspace - ${randomNumber}`;
export const logoPath = './test-data/logo.png';
// API tests data
export const boardName = `Board - ${randomNumber}`;