const testimonials = [
  {
    name: "Pradiv Singh",
    rank: "TES 52 | AIR 1",
    image: "/images/rankers/1.webp",
    text:
      "LWS's approach to simplifying complex concepts while maintaining a positive and motivating environment made my preparation focused and effective.",
  },
  {
    name: "Adithyan Prasanth",
    rank: "NCC 58 | AIR 2",
    image: "/images/rankers/2.webp",
    text:
      "The way LWS breaks down difficult topics and keeps the preparation environment positive made a huge difference.",
  },
  {
    name: "Abhishek Bhadauriya",
    rank: "NDA 151 | AIR 3",
    image: "/images/rankers/3.webp",
    text:
      "LWS shaped my journey with discipline and direction. Expert assessors and dedicated teachers strengthened my preparation.",
  },
];

export default function Testimonials() {

  return (
    <section
      className="section testimonials"
      id="testimonials"
    >

      <div className="container">

        <div className="section-heading testimonial-heading">

          <span className="section-tag">
            STUDENT STORIES
          </span>

          <h2>
            Voices of
            <span> LWS Achievers</span>
          </h2>

          <p>
            The preparation, discipline, and mentorship behind every confident
            step towards a career in the forces.
          </p>

        </div>

        <div className="testimonial-grid">

          {testimonials.map((item, index) => (

            <article
              className="testimonial-card"
              key={index}
            >

              <div className="testimonial-top">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h3>{item.name}</h3>
                  <span>{item.rank}</span>
                </div>

              </div>

              <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>

              <p>
                “{item.text}”
              </p>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}