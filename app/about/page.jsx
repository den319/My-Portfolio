"use client"

import {useState, useEffect} from "react";
import {skills, experiences} from "@/constants/utils";
import ContactToAdmin from "@/components/aboutPage/contactToAdmin";
import Image from "next/image";
import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default function About() {
  const [clientSide, setClientSide]= useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  return (
    <section className="max-container" >
      <h1 className="head-text">
        Hi, I am <span className="blue-gradient_text font-semibold drop-shadow">Dharmik</span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          A Software Engineer, excited to solve real-life problems and 
           to build products that make a difference. I enjoy exploring new 
           technologies and pushing the boundaries of what's possible.
        </p>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map(skill => {
            return (
              <div key={skill.name} className="block-container w-20 h-20"> 
                <div className="btn-back rounded-xl"></div>
                <div className="w-1/2 h-1/2 object-contain btn-front rounded-xl flex flex-wrap
                    justify-center items-center">
                  <Image src={skill.imagePath} alt={skill.name} height={50} width={50} className="w-[50px] h-[50px]" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Work Experience</h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>In my journey as a Software Engineer, I worked with diverse group of people and levelled up my skills. 
              Here is the rundown:</p>
        </div>

        <div className="mt-12 flex">
        {
          clientSide && <VerticalTimeline visible={true}>
            {
              experiences.map(experience => (
                <VerticalTimelineElement 
                  key={experience.index } 
                  date={experience.date} 
                  visible={true}
                  icon={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-[60%] h-[60%] object-contain flex justify-center items-center">
                        <Image src= {experience.icon} 
                          alt= {experience.companyName}
                          width= {50} 
                          height={50}
                        />
                      </div>
                    </div>
                  }
                  iconStyle= {{
                    background: experience.iconBg,  
                  }}
                  contentStyle= {{
                    borderBottom: "8px",
                    borderStyle: "solid",
                    borderBottomColor: experience.iconBg,
                    boxShadow: "none",

                  }}
                  >
                  <div>
                    <h3 className="text-black text-xl font-poppins font-semibold">
                      {experience.title}
                    </h3> 

                    <p className="text-black-500 font-medium font-base m-0" >
                      {experience.companyName}
                    </p>
                  </div>

                  <ul className="my-5 list-disc ml-5 space-y-2">
                    {
                      experience.points.map((point, index) => (
                        <li key={index} className="text-black-500/50 font-normal pl-1 text-sm">
                          {point}
                        </li>
                      ))
                    }
                  </ul>
                </VerticalTimelineElement>
              ))
            }
          </VerticalTimeline>
        }
        </div>
      </div>

      <hr className="border-slate-200" />

      <ContactToAdmin />
    </section>
  );
}