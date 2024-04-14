import Testimonial from "../../models/testimonialSchema.js";

export async function getTestimonials(req, res) {

  try {
    const foundTestimonials = await Testimonial.find().populate({
      path:'user',
      select:'firstName lastName'
    }).limit(5).exec();

    if (foundTestimonials.length <= 0) {
      return res.json({ error: "couldn't find any testimonials" });
    }
    return res.status(200).json(foundTestimonials);
  
  } catch (err) {
    console.log(err)
    return res.json({"error get testimonials":err});
  }
}
