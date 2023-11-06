console.log(process.env);

const { SHELL } = process.env;

export const characters = ["Flash", "Superman", "Green Lantern", "Batman"];

const [, , , batman] = characters;