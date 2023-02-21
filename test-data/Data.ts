const randomNumber = Math.floor(Math.random() * 900) + 100;

export class Data {
    // Authentication 
    public static email = `${process.env.EMAIL}`;
    public static password = `${process.env.PASSWORD}`;
    public static key = `${process.env.KEY}`;
    public static token = `${process.env.TOKEN}`;

    // Functional tests data
    public static workspaceName = `Workspace - ${randomNumber}`;
    public static logoPath = './test-data/logo.png';

    // API tests data
    public static boardName = `Board - ${randomNumber}`;
}