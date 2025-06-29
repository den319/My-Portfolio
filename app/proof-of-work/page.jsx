"use client"



import {projects} from "@/constants/utils";
import ContactToAdmin from "@/components/aboutPage/contactToAdmin";
import Image from "next/image";
import Link from "next/link";

export default function ProofOfWork() {
  return (
    <section className="max-container" >
      <h1 className="head-text">
        My <span className="blue-gradient_text font-semibold drop-shadow">Projects</span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          I have embarked on numerous projects throughout the years, but these 
          are the ones I hold closest to my heart.
          You will find a curated collection of my latest work, ranging from 
          web applications to software solutions. 
          Each project represents a unique opportunity for me to demonstrate 
          my skills, creativity, and passion for development.
        </p>
      </div>

      <div className="flex flex-wrap gap-16 my-20">
        {
          projects.map(project => (
            <div key={project.name} className="w-full lg:w-[400px]">
              <div className="w-12 h-12 block-container">
                <div className={`btn-back rounded-xl ${project.theme}`}></div>
                <div className="w-[50%] h-[50%] flex justify-center items-center btn-front rounded-xl">
                  <Image 
                    src= {project.iconPath}
                    alt= {project.name}
                    width={35}
                    height={35} />
                </div>
              </div>

              <div className="flex flex-col mt-5">
                <h4 className="font-semobold text-2xl font-poppins">{project.name}</h4>
                <p className="mt-2 text-slate-500">{project.description}</p>
                <div className="mt-5 font-poppins">
                  <Link href={project.link}
                      target= "_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 font-semibold text-blue-600 cursor-pointer">
                      <p>Live Link</p>
                      <div className="flex items-center w-4 h-4 object-contain">
                        <Image 
                          src= "/3D_assets/icons/arrow.svg"
                          alt= "arrow"
                          width={48}
                          height={48} 
                        />
                      </div>
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      <hr className="border-slate-200" />

      <ContactToAdmin />
    </section>
  );
}