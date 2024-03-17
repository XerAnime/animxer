import React from "react";

const loading = () => {
  return (
    <section
      id="loading"
      className="min-h-[90vh] flex items-center justify-center flex-col"
    >
      <div className="loader book">
        <figure className="page"></figure>
        <figure className="page"></figure>
        <figure className="page"></figure>
      </div>
      <h1 className="loading-txt">Loading</h1>
    </section>
  );
};

export default loading;
