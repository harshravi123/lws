const experts = [
  {
    image: "/images/expert-1.jpg",
    name: "Lt Gen A K Sahgal",
    role: "LWS Interviewing Officer",
    info: "Former DG, Army Air Defence",
  },
  {
    image: "/images/expert-2.jpg",
    name: "Brigadier Ramit Mehta",
    role: "LWS Interviewing Officer",
    info: "Ex President, SSB",
  },
  {
    image: "/images/expert-3.jpg",
    name: "Col Rabi Mukerjee",
    role: "LWS GTO Expert",
    info: "Experienced SSB Professional",
  },
  {
    image: "/images/expert-4.jpg",
    name: "Col Ashwini Thakur",
    role: "LWS GTO Expert",
    info: "Former GTO in Indian Army",
  },
  {
    image: "/images/expert-5.jpg",
    name: "Cdr Vikas Yadav",
    role: "Co-Founder LWS SSB Wing",
    info: "Former Senior GTO",
  },
  {
    image: "/images/expert-6.jpg",
    name: "Gp Capt Daman Vermani",
    role: "LWS Interviewing Officer",
    info: "Former IO at AFSB",
  },
];

export default function Experts() {

  return (
    <section className="section experts">

      <div className="container">

        <div className="section-heading">

          <span className="section-tag">
            OUR FACULTY
          </span>

          <h2>
            Meet the
            <span> SSB Interview Experts</span>
          </h2>

        </div>

        <div className="experts-grid">

          {experts.map((expert, index) => (

            <article
              className="expert-card"
              key={index}
            >

              <img
                src={expert.image}
                alt={expert.name}
              />

              <div className="expert-info">

                <h3>{expert.name}</h3>

                <span>
                  {expert.role}
                </span>

                <p>
                  {expert.info}
                </p>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}