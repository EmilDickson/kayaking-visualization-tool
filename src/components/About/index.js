import React from "react";
const About = () => (
    <div className='simpleContainer'>
        <h1>About the Kayaking Visualization Tool</h1>
        <div>
            This tool was designed, developed and implemented by{" "}
            <a
                href='http://www.emildickson.se/portfolio'
                target='_blank'
                rel='noopener noreferrer'
            >
                Emil Dickson
            </a>{" "}
            as a part of a master's thesis degree project at the Royal Institute
            of Technology (KTH) in Stockholm, Sweden. It was done in
            collaboration with the Swedish Olympic Academy and{" "}
            <a href='https://sok.se/' target='_blank' rel='noopener noreferrer'>
                Swedish Olympic Committee
            </a>{" "}
            and was carried out in the spring of 2020.
        </div>
        <div>
            The tool is primarily intended to function as a high-fidelity
            prototype and provide a way of conducting user tests.
        </div>
    </div>
);
export default About;
