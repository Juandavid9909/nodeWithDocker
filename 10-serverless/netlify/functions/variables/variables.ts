import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;

    if(!myImportantVariable) {
        throw "Missing MY_IMPORTANT_VARIABLE";
    }
    
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "Hola Mundo!!" })
    };
};

export { handler };