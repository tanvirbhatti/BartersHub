import  {connectToDb}  from "../../db.js";

export async function getTestimonials(req, res) {
  const db = await connectToDb();

  try {
    const cursor = db.collection("testimonials").find().limit(3);
    const foundTestimonials = await cursor.toArray();

    if (foundTestimonials.length <= 0) {
      return res.json({ error: "couldn't find any testimonials" });
    }
    return res.status(200).json(foundTestimonials);
  
  } catch (err) {
    console.log(err)
    return res.json({"error get testimonials":err});
  }
}
