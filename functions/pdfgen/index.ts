import type { Handler } from "@netlify/functions";
import PDFDocument from "pdfkit";

const makePDF = async (text:string) => {
  
  return new Promise(resolve => {
    const doc = new PDFDocument()

    doc.text(text)
    const buffers:any[] = []
    doc.on("data", buffers.push.bind(buffers))
    doc.on("end", () => {
      const pdf = Buffer.concat(buffers)
      
      resolve(pdf);
    })
    doc.end()
  });
}



const handler: Handler = async (event, context) => {

  const stream:any = await makePDF('testing the pdf');

  const response:any = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/pdf",
    },
    body: stream.toString("base64"),
    isBase64Encoded: true,
  }

  return response;
};

export { handler };
