export async function GET() {


  await new Promise(r => setTimeout(r, 2000));
  return Response.json({ message: 'Hello hihi' })
}

//get
//POST
//put
//delete
//this is CRUD