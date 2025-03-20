import React from "react";

const Skills = () => {
  return (
    <section className="">
      {/* Skills Section */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Problem solving, communication, teamwork, attention to detail, creativity, adaptability
        </p>
      </div>

      {/* Knowledge Section */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Knowledge</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Web development: HTML, CSS, JavaScript, React, Bootstrap, Sass, Node.js, Apache Cordova
        </p>
      </div>

      {/* Languages Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Languages</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">English, Croatian</p>
      </div>
    </section>
  );
};

export default Skills;
