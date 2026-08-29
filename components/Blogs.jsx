const blogs = [
  {
    image: "/images/blog-1.jpg",
    title:
      "How to Prepare for NDA, CDS, AFCAT & SSB",
    date: "August 15, 2026",
  },
  {
    image: "/images/blog-2.jpg",
    title:
      "Defence Coaching After Class 10",
    date: "August 15, 2026",
  },
  {
    image: "/images/blog-3.jpg",
    title:
      "NDA vs CDS vs AFCAT",
    date: "August 15, 2026",
  },
];

export default function Blogs() {

  return (
    <section
      className="section blogs"
      id="blogs"
    >

      <div className="container">

        <div className="section-heading">

          <span className="section-tag">
            FROM THE BLOG
          </span>

          <h2>
            Latest Defence
            <span> Updates</span>
          </h2>

        </div>

        <div className="blog-grid">

          {blogs.map((blog, index) => (

            <article
              className="blog-card"
              key={index}
            >

              <img
                src={blog.image}
                alt={blog.title}
              />

              <div className="blog-content">

                <span>{blog.date}</span>

                <h3>
                  {blog.title}
                </h3>

                <a href="#">
                  Read Full Article →
                </a>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}