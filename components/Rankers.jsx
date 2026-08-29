const rankers = [
  "ranker-1.jpg",
  "ranker-2.jpg",
  "ranker-3.jpg",
  "ranker-4.jpg",
  "ranker-5.jpg",
  "ranker-6.jpg",
  "ranker-7.jpg",
  "ranker-8.jpg",
];

export default function Rankers() {

  return (
    <section className="section rankers" id="results">

      <div className="container">

        <div className="section-heading">

          <span className="section-tag">
            OUR RESULTS
          </span>

          <h2>
            Top Rankers in
            <span> NDA 156</span>
          </h2>

          <p>
            Our students continue to make us proud
            with outstanding results.
          </p>

        </div>

        <div className="ranker-grid">

          {rankers.map((image, index) => (

            <div
              className="ranker-card"
              key={index}
            >

              <img
                src={`/images/${image}`}
                alt={`LWS Ranker ${index + 1}`}
              />

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}