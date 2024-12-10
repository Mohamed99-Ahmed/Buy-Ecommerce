import React from "react";
import { useState } from "react";

export default function Footer() {
  return (
    <>
      <div className=" bg-green-400 text-gray-900   py-6">
        <div className="container space-y-4 flex flex-col-reverse gap-2 items-center justify-center">
          <p>
            © Copyright DevFolio. All Rights Reserved Designed by BootstrapMade
          </p>
          <div className="socials text-lg space-x-5">
            <a href="https://github.com/Mohamed99-Ahmed" target="_blank">
              <i className="fa-brands fa-github text-xl"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/eng-mohamed-ahmed/"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin-in text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
